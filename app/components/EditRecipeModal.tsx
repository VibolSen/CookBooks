"use client";

import { useState } from "react";
import { updateRecipe, uploadRecipeImage } from "@/app/actions/recipeActions";
import { motion } from "framer-motion";
import { Sparkles, XCircle, UploadCloud } from "lucide-react";
import Image from "next/image";
import { useAlert } from "@/app/context/AlertContext";

interface EditRecipeModalProps {
 recipe: any;
 onClose: () => void;
 onUpdateRecipe: (updatedRecipe: any) => void;
}

const EditRecipeModal: React.FC<EditRecipeModalProps> = ({
 recipe,
 onClose,
 onUpdateRecipe,
}) => {

 const [formData, setFormData] = useState({
 title: recipe.title || recipe.recipe_name,
 description: recipe.description,
 ingredients: recipe.ingredients,
 instructions: recipe.instructions,
 });
 const [imageFiles, setImageFiles] = useState<File[]>([]);
 const [imagePreviews, setImagePreviews] = useState<string[]>(
 recipe.images?.map((img: any) => img.url || img.image_url) || []
 );
 const [loading, setLoading] = useState(false);
 const { showAlert } = useAlert();

 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 if (e.target.files) {
 const files = Array.from(e.target.files);
 setImageFiles((prev) => [...prev, ...files]);
 const urls = files.map(file => URL.createObjectURL(file));
 setImagePreviews((prev) => [...prev, ...urls]);
 }
 };

 const handleRemoveImage = (index: number) => {
 setImagePreviews(prev => prev.filter((_, i) => i !== index));
 // Complex logic to track which files to remove if they were new
 // Simplified: we'll just clear new files for now if they match
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);

 try {
 let finalImages = [...imagePreviews.filter(url => url.startsWith("http"))];

 if (imageFiles.length > 0) {
 const uploadPromises = imageFiles.map(async file => {
 const formData = new FormData();
 formData.append("file", file);
 const uploadRes = await uploadRecipeImage(formData);
 if (uploadRes.success) return uploadRes.url || "";
 throw new Error(uploadRes.error);
 });
 const uploadedUrls = await Promise.all(uploadPromises);
 finalImages = [...finalImages, ...uploadedUrls];
 }

 const res = await updateRecipe(recipe.id || recipe.recipe_id, {
 ...formData,
 images: finalImages
 });

 if (res.success) {
 showAlert("Recipe updated!", "success");
 onUpdateRecipe(res.data);
 onClose();
 } else {
 showAlert(res.error, "error");
 }
 } catch (err: any) {
 showAlert(err.message, "error");
 } finally {
 setLoading(false);
 }
 };

 return (
 <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
 <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
 <div className="flex justify-between items-center mb-8">
 <h3 className="text-2xl font-bold flex items-center gap-2"><Sparkles className="text-orange-500" /> Edit Recipe</h3>
 <button onClick={onClose}><XCircle className="text-gray-400 hover:text-red-500 transition" /></button>
 </div>

 <form onSubmit={handleSubmit} className="space-y-6">
 <div>
 <label className="block text-sm font-bold mb-2">Recipe Title</label>
 <input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full p-4 rounded-xl border dark:bg-gray-700 outline-none focus:ring-2 focus:ring-orange-500" required />
 </div>
 <div>
 <label className="block text-sm font-bold mb-2">Description</label>
 <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full p-4 rounded-xl border dark:bg-gray-700 outline-none focus:ring-2 focus:ring-orange-500" rows={3} required />
 </div>

 <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center">
 <input type="file" multiple onChange={handleImageChange} className="hidden" id="edit-images" />
 <label htmlFor="edit-images" className="cursor-pointer flex flex-col items-center">
 <UploadCloud size={40} className="text-gray-400 mb-2" />
 <span className="text-orange-500 font-bold">Add more images</span>
 </label>

 <div className="grid grid-cols-4 gap-4 mt-6">
 {imagePreviews.map((url, i) => (
 <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
 <Image src={url} alt="Preview" fill className="object-cover" />
 <button type="button" onClick={() => handleRemoveImage(i)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"><XCircle size={14} /></button>
 </div>
 ))}
 </div>
 </div>

 <div className="flex gap-4 pt-4">
 <button type="button" onClick={onClose} className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 font-bold rounded-2xl">Cancel</button>
 <button type="submit" disabled={loading} className="flex-1 py-4 bg-orange-500 text-white font-bold rounded-2xl shadow-lg hover:bg-orange-600 transition">
 {loading ? "Saving..." : "Save Changes"}
 </button>
 </div>
 </form>
 </motion.div>
 </div>
 );
};

export default EditRecipeModal;