"use client";

import { useState, useEffect } from "react";
import { getCategories } from "@/app/actions/categoryActions";
import { getOccasions } from "@/app/actions/occasionActions";
import { motion } from "framer-motion";

interface RecipeModalProps {
 isOpen: boolean;
 onClose: () => void;
 onCategorySelect: (category: { id: string; name: string }, occasion: { id: string; name: string }) => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, onCategorySelect }) => {
 const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
 const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
 const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
 const [occasions, setOccasions] = useState<{ id: string; name: string }[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
 const fetchData = async () => {
 setLoading(true);
 setError(null);
 try {
 const [catData, occData] = await Promise.all([getCategories(), getOccasions()]);
 if (catData.success) setCategories(catData.data || []);
 if (occData.success) setOccasions(occData.data || []);
 } catch (err: any) {
 setError(err.message);
 } finally {
 setLoading(false);
 }
 };
 fetchData();
 }, []);

 const handleSave = () => {
 if (!selectedCategory || !selectedOccasion) {
 setError("Please select both a category and an occasion.");
 return;
 }
 const category = categories.find((c) => c.id === selectedCategory);
 const occasion = occasions.find((o) => o.id === selectedOccasion);
 if (category && occasion) {
 onCategorySelect(category, occasion);
 }
 };

 if (!isOpen) return null;

 return (
 <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
 <motion.div
 className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-[600px] shadow-2xl p-8"
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.9 }}
 >
 <h2 className="text-3xl font-bold mb-2 text-center text-gray-800 dark:text-white">
 Which type of your <span className="text-orange-600">Recipe?</span>
 </h2>
 <p className="mb-8 text-center text-gray-600 dark:text-gray-400">
 Please choose a category and occasion for your recipe before posting!
 </p>

 {loading ? (
 <div className="flex flex-col items-center py-10">
 <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
 <p className="mt-4 text-gray-500">Loading your options...</p>
 </div>
 ) : (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
 <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar">
 <h3 className="font-bold mb-4 text-lg text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Category</h3>
 {categories.map((category) => (
 <label key={category.id} className="flex items-center mb-4 cursor-pointer group">
 <input
 type="radio"
 name="category"
 value={category.id}
 checked={selectedCategory === category.id}
 onChange={(e) => setSelectedCategory(e.target.value)}
 className="mr-3 w-5 h-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded-full"
 />
 <span className={`text-lg transition-colors ${selectedCategory === category.id ? "text-orange-600 font-medium" : "text-gray-700 dark:text-gray-300 group-hover:text-orange-500"}`}>
 {category.name}
 </span>
 </label>
 ))}
 </div>

 <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar">
 <h3 className="font-bold mb-4 text-lg text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Occasion</h3>
 {occasions.map((occasion) => (
 <label key={occasion.id} className="flex items-center mb-4 cursor-pointer group">
 <input
 type="radio"
 name="occasion"
 value={occasion.id}
 checked={selectedOccasion === occasion.id}
 onChange={(e) => setSelectedOccasion(e.target.value)}
 className="mr-3 w-5 h-5 text-orange-600 focus:ring-orange-500 border-gray-300 rounded-full"
 />
 <span className={`text-lg transition-colors ${selectedOccasion === occasion.id ? "text-orange-600 font-medium" : "text-gray-700 dark:text-gray-300 group-hover:text-orange-500"}`}>
 {occasion.name}
 </span>
 </label>
 ))}
 </div>
 </div>
 )}

 {error && (
 <p className="text-red-500 text-sm mb-4 text-center bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
 {error}
 </p>
 )}

 <div className="flex justify-end gap-4 mt-4">
 <button
 onClick={onClose}
 className="px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
 >
 Cancel
 </button>
 <button
 onClick={handleSave}
 disabled={!selectedCategory || !selectedOccasion || loading}
 className="px-8 py-3 bg-brand-primary text-brand-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
 >
 Save Choice
 </button>
 </div>
 </motion.div>
 </div>
 );
};

export default RecipeModal;
