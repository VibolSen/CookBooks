"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { createReview } from "@/app/actions/reviewActions";
import { motion } from "framer-motion";

interface Review {
  id: string;
  userId: string;
  comment: string | null;
  createdAt: Date;
  rating: number;
  user?: {
    userName: string;
  };
}

interface CommentSectionProps {
  recipeId: string;
  initialReviews: Review[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ recipeId, initialReviews }) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Review[]>(initialReviews);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setComments(initialReviews);
  }, [initialReviews]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      alert("You must be logged in to comment.");
      return;
    }

    setIsSubmitting(true);
    try {
      const userId = (session.user as any).id;
      const res = await createReview(recipeId, userId, comment);

      if (res.success) {
        setComment("");
        // Optimistically add the comment or just let the revalidation handle it if this was a server component
        // Since we are in client, we manually update for instant feedback
        setComments((prev) => [res.data as any, ...prev]);
      } else {
        alert(res.error);
      }
    } catch (error: any) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div className="space-y-6">
      <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">Community Reviews</h4>

      <form onSubmit={handleCommentSubmit} className="space-y-3">
        <textarea
          className="w-full p-4 border rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm dark:border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
          placeholder={session?.user ? "Share your thoughts on this recipe..." : "Log in to join the conversation"}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={!session?.user || isSubmitting}
          rows={3}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-2 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
            disabled={!comment.trim() || isSubmitting || !session?.user}
          >
            {isSubmitting ? "Posting..." : "Post Review"}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {displayedComments.length > 0 ? (
          displayedComments.map((review) => (
            <motion.div
              key={review.id}
              className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex justify-between items-start mb-2">
                <p className="font-bold text-gray-800 dark:text-gray-200">
                  {review.user?.userName || "Chef"}
                </p>
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rating ? "fill-current" : "text-gray-300"}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-3 italic">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
             <p className="text-gray-500">No reviews yet. Be the first to try this recipe!</p>
          </div>
        )}

        {comments.length > 3 && (
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="w-full py-2 text-orange-600 font-medium hover:underline transition-all"
          >
            {showAllComments ? "Show Less" : `View All ${comments.length} Reviews`}
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
