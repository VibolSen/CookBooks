"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, Send, Heart } from "lucide-react";
import { upsertReview, getUserReviewForRecipe } from "@/app/actions/reviewActions";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

interface InteractiveRatingProps {
 recipeId: string;
 onRatingSubmitted?: () => void;
}

const InteractiveRating = ({
 recipeId,
 onRatingSubmitted,
}: InteractiveRatingProps) => {
 const { data: session } = useSession();
 const userId = (session?.user as any)?.id;
 const [rating, setRating] = useState(0);
 const [hoverRating, setHoverRating] = useState(0);
 const [comment, setComment] = useState("");
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [hasRated, setHasRated] = useState(false);
 const [showSuccess, setShowSuccess] = useState(false);

 const checkExistingRating = useCallback(async () => {
 if (!userId) return;
 const res = await getUserReviewForRecipe(recipeId, userId);
 if (res.success && res.data) {
 setRating(res.data.rating);
 setComment(res.data.comment || "");
 setHasRated(true);
 }
 }, [recipeId, userId]);

 useEffect(() => {
 checkExistingRating();
 }, [checkExistingRating]);

 const submitRating = async () => {
 if (!userId || rating === 0) return;

 setIsSubmitting(true);
 try {
 const res = await upsertReview(recipeId, userId, {
 rating,
 comment: comment.trim(),
 });

 if (res.success) {
 setHasRated(true);
 setShowSuccess(true);
 setTimeout(() => setShowSuccess(false), 3000);
 if (onRatingSubmitted) onRatingSubmitted();
 } else {
 alert(res.error);
 }
 } catch (error) {
 console.error("Error submitting rating:", error);
 } finally {
 setIsSubmitting(false);
 }
 };

 if (!session?.user) {
 return (
 <div className="bg-gray-50 rounded-3xl p-8 text-center border-2 border-dashed border-orange-200 dark:border-gray-700">
 <Star className="h-12 w-12 text-orange-300 mx-auto mb-4" />
 <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Want to rate this recipe?</h3>
 <p className="text-gray-600 dark:text-gray-400 mb-6">Log in to share your culinary feedback!</p>
 <button className="px-8 py-3 bg-brand-primary text-brand-white rounded-xl font-bold shadow-lg hover:scale-105 transition-all">
 Sign In to Rate
 </button>
 </div>
 );
 }

 return (
 <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-8">
 <div className="flex items-center mb-6">
 <div className="bg-orange-500 w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-lg">
 <Star className="h-6 w-6 text-white fill-current" />
 </div>
 <div>
 <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{hasRated ? "Update Review" : "What's Your Take?"}</h3>
 <p className="text-gray-500">Your feedback inspires our kitchen!</p>
 </div>
 </div>

 {showSuccess && (
 <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 p-4 rounded-2xl mb-6 flex items-center gap-2 border border-emerald-100 dark:border-emerald-800">
 <Heart size={20} fill="currentColor" /> {hasRated ? "Review updated! Thank you!" : "Thanks for your feedback!"}
 </motion.div>
 )}

 <div className="mb-8">
 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 text-center">Tap to Rate</label>
 <div className="flex justify-center gap-2">
 {[1, 2, 3, 4, 5].map((star) => (
 <button key={star} onClick={() => setRating(star)} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} className="transition-transform hover:scale-125">
 <Star size={40} className={`${star <= (hoverRating || rating) ? "text-yellow-400 fill-current" : "text-gray-200 dark:text-gray-700"}`} />
 </button>
 ))}
 </div>
 {rating > 0 && <p className="text-center mt-4 font-bold text-orange-600">{rating} out of 5 stars</p>}
 </div>

 <div className="mb-8">
 <textarea
 value={comment}
 onChange={(e) => setComment(e.target.value)}
 placeholder="What did you love about this dish? Any tweaks you'd recommend?"
 className="w-full p-5 bg-gray-50 dark:bg-gray-700 border-2 border-gray-100 dark:border-gray-600 rounded-2xl focus:border-orange-500 outline-none transition-all resize-none"
 rows={4}
 />
 </div>

 <button
 onClick={submitRating}
 disabled={rating === 0 || isSubmitting}
 className="w-full py-4 bg-brand-primary text-brand-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
 >
 {isSubmitting ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send size={20} />}
 {hasRated ? "Update My Review" : "Submit Review"}
 </button>
 </div>
 );
};

export default InteractiveRating;
