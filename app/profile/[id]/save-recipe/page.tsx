"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { getSavedRecipes, toggleSaveRecipe } from "@/app/actions/recipeActions";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Heart, Search, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/app/context/AlertContext";

export default function SavedRecipesPage() {
  const { data: session } = useSession();
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);
  const { showAlert } = useAlert();

  const fetchSavedRecipes = useCallback(async () => {
    if (!session?.user) return;
    setLoading(true);
    try {
      const userId = (session.user as any).id;
      const res = await getSavedRecipes(userId);
      if (res.success) {
        setSavedRecipes(res.data || []);
      }
    } catch {
      showAlert("Failed to load saved recipes.", "error");
    } finally {
      setLoading(false);
    }
  }, [session, showAlert]);

  useEffect(() => {
    fetchSavedRecipes();
  }, [fetchSavedRecipes]);

  const handleConfirmDelete = async () => {
    if (!recipeToDelete || !session?.user) return;
    try {
      const userId = (session.user as any).id;
      const res = await toggleSaveRecipe(recipeToDelete, userId);

      if (res.success) {
        setSavedRecipes((prev) => prev.filter((r) => r.id !== recipeToDelete));
        showAlert("Removed from favorites!", "success");
      } else {
        showAlert(res.error, "error");
      }
    } catch {
      showAlert("Failed to remove recipe.", "error");
    } finally {
      setRecipeToDelete(null);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-orange-500 font-bold">Loading Favorites...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 dark:from-gray-900 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-3">
              <Heart className="text-pink-500 fill-current" /> My Saved Kitchen
            </h1>
            <p className="text-gray-500 mt-2">All your favorite dishes in one place</p>
          </div>
          <button onClick={() => router.back()} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition text-gray-600 dark:text-gray-300">
             <ArrowLeft size={18} /> Back to Recipes
          </button>
        </div>

        {savedRecipes.length === 0 ? (
          <div className="text-center py-20 bg-white/50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
             <Search size={48} className="mx-auto text-gray-300 mb-4" />
             <p className="text-xl text-gray-500">Your collection is empty. Start exploring!</p>
             <Link href="/" className="mt-6 inline-block bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition">Browse Recipes</Link>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {savedRecipes.map((recipe) => (
              <motion.div key={recipe.id} className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all" layout>
                <div className="relative h-56 overflow-hidden">
                  <Image src={recipe.images?.[0]?.url || "/placeholder.svg"} alt={recipe.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button onClick={() => setRecipeToDelete(recipe.id)} className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-md text-red-500 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all transform hover:rotate-12">
                    <Trash2 size={20} />
                  </button>
                </div>
                <Link href={`/recipe/${recipe.id}`} className="p-6 block">
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">{recipe.category?.name || "Recipe"}</span>
                  <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-gray-100 group-hover:text-orange-500 transition-colors">{recipe.title}</h3>
                  <p className="text-gray-500 mt-2 line-clamp-2">{recipe.description}</p>
                  <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold uppercase">{recipe.user?.userName?.[0]}</div>
                    By {recipe.user?.userName || "Anonymous"}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {recipeToDelete && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">💔</div>
              <h3 className="text-2xl font-bold mb-2">Unsave Recipe?</h3>
              <p className="text-gray-500 mb-8">This will remove the dish from your favorites collection.</p>
              <div className="flex gap-4">
                <button onClick={() => setRecipeToDelete(null)} className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 font-bold rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 transition">Cancel</button>
                <button onClick={handleConfirmDelete} className="flex-1 py-4 bg-red-500 text-white font-bold rounded-2xl hover:bg-red-600 transition shadow-lg shadow-red-500/20">Remove</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}