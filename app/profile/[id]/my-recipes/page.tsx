"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { getMyRecipes, deleteRecipe } from "@/app/actions/recipeActions";
import Image from "next/image";
import Link from "next/link";
import { Edit, Trash2, Plus, ChefHat, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EditRecipeModal from "@/app/components/EditRecipeModal";
import { useAlert } from "@/app/context/AlertContext";

export default function MyRecipesPage() {
 const { data: session } = useSession();
 const [recipes, setRecipes] = useState<any[]>([]);
 const [loading, setLoading] = useState(true);
 const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);
 const [recipeToEdit, setRecipeToEdit] = useState<any | null>(null);
 const { showAlert } = useAlert();


 const fetchRecipes = useCallback(async () => {
 if (!session?.user) return;
 setLoading(true);
 try {
 const userId = (session.user as any).id;
 const res = await getMyRecipes(userId);
 if (res.success) {
 setRecipes(res.data || []);
 }
 } catch {
 showAlert("Failed to load recipes", "error");
 } finally {
 setLoading(false);
 }
 }, [session, showAlert]);

 useEffect(() => {
 fetchRecipes();
 }, [fetchRecipes]);

 const handleDelete = async () => {
 if (!recipeToDelete) return;
 try {
 const res = await deleteRecipe(recipeToDelete);
 if (res.success) {
 setRecipes(prev => prev.filter(r => r.id !== recipeToDelete));
 showAlert("Recipe deleted!", "success");
 } else {
 showAlert(res.error, "error");
 }
 } catch {
 showAlert("Deletion failed", "error");
 } finally {
 setRecipeToDelete(null);
 }
 };

 if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-orange-500">Opening Your Kitchen...</div>;

 return (
 <div className="min-h-screen bg-gray-50 py-12 px-6">
 <div className="max-w-7xl mx-auto">
 <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
 <div>
 <h1 className="text-5xl font-black text-brand-black mb-4">My Culinary Works</h1>
 <p className="text-gray-500 text-lg">Manage your personal collection of recipes</p>
 </div>
 <Link href={`/${(session?.user as any)?.id}/add-recipe`} className="px-8 py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-xl hover:bg-orange-600 transition flex items-center gap-2">
 <Plus size={24} /> Create New Recipe
 </Link>
 </div>

 {recipes.length === 0 ? (
 <div className="text-center py-32 bg-white/50 dark:bg-gray-800/50 rounded-3xl border-4 border-dashed border-gray-200 dark:border-gray-700">
 <ChefHat size={64} className="mx-auto text-gray-300 mb-6" />
 <h3 className="text-3xl font-bold text-gray-400 mb-4">No recipes yet</h3>
 <p className="text-gray-500 mb-10">Your personal cookbook is empty. Add your first masterpiece!</p>
 <Link href={`/${(session?.user as any)?.id}/add-recipe`} className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-bold shadow-lg">Get Started</Link>
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
 {recipes.map((r) => (
 <motion.div key={r.id} className="group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden" whileHover={{ y: -10 }}>
 <div className="relative h-64">
 <Image src={r.images?.[0]?.url || "/placeholder.svg"} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
 <div className="absolute top-4 right-4 flex gap-2">
 <button onClick={() => setRecipeToEdit(r)} className="p-3 bg-white/90 backdrop-blur-md text-blue-500 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all"><Edit size={18} /></button>
 <button onClick={() => setRecipeToDelete(r.id)} className="p-3 bg-white/90 backdrop-blur-md text-red-500 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
 </div>
 </div>
 <div className="p-8">
 <div className="flex justify-between items-start mb-4">
 <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{r.category?.name || "Recipe"}</span>
 </div>
 <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 line-clamp-1">{r.title}</h3>
 <p className="text-gray-500 line-clamp-2 mb-6">{r.description}</p>
 <div className="flex items-center gap-2 text-sm text-gray-400 pt-6 border-t border-gray-50">
 <Calendar size={14} /> Created {new Date(r.createdAt).toLocaleDateString()}
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 )}
 </div>

 <AnimatePresence>
 {recipeToDelete && (
 <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
 <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
 <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl"></div>
 <h2 className="text-2xl font-bold mb-2">Delete Permanently?</h2>
 <p className="text-gray-500 mb-8">This will delete your recipe forever. There is no undo.</p>
 <div className="flex gap-4">
 <button onClick={() => setRecipeToDelete(null)} className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 font-bold rounded-xl">No, Wait</button>
 <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/30">Yes, Delete</button>
 </div>
 </motion.div>
 </div>
 )}
 </AnimatePresence>

 <AnimatePresence>
 {recipeToEdit && (
 <EditRecipeModal
 recipe={recipeToEdit}
 onClose={() => setRecipeToEdit(null)}
 onUpdateRecipe={fetchRecipes}
 />
 )}
 </AnimatePresence>
 </div>
 );
}