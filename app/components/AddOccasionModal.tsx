"use client";

import React, { useState, useEffect } from "react";
import { createOccasion } from "@/app/actions/occasionActions";
import { getCategories } from "@/app/actions/categoryActions";
import { motion } from "framer-motion";
import { XCircle, AlertTriangle } from "lucide-react";
import Image from "next/image";

interface AddOccasionModalProps {
 isOpen: boolean;
 onClose: () => void;
 onOccasionAdded: () => void;
}

const AddOccasionModal: React.FC<AddOccasionModalProps> = ({
 isOpen,
 onClose,
 onOccasionAdded,
}) => {
 const [occasionName, setOccasionName] = useState("");
 const [imageFile, setImageFile] = useState<File | null>(null);
 const [imagePreview, setImagePreview] = useState<string | null>(null);
 const [categoryId, setCategoryId] = useState<string>("");
 const [categories, setCategories] = useState<{ id: string; category_name: string }[]>([]);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
 const fetchCategories = async () => {
 const result = await getCategories();
 if (result.success && result.data) {
 const data = result.data.map((cat: any) => ({
 id: cat.id,
 category_name: cat.name || cat.category_name,
 }));
 setCategories(data);
 if (data.length > 0) {
 setCategoryId(data[0].id);
 }
 }
 };
 fetchCategories();
 }, []);

 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 if (e.target.files && e.target.files[0]) {
 const file = e.target.files[0];
 setImageFile(file);
 setImagePreview(URL.createObjectURL(file));
 }
 };

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 setError(null);

 const formData = new FormData();
 formData.append("name", occasionName);
 formData.append("category_id", categoryId);
 if (imageFile) {
 formData.append("image", imageFile);
 }

 try {
 const result = await createOccasion(formData);
 if (!result.success) throw new Error(result.error);

 onOccasionAdded();
 onClose();
 setOccasionName("");
 setImageFile(null);
 setImagePreview(null);
 } catch (err: any) {
 setError(err.message || "Failed to add occasion");
 } finally {
 setLoading(false);
 }
 };

 if (!isOpen) return null;

 return (
 <motion.div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
 <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full">
 <div className="flex items-center justify-between mb-6">
 <h3 className="text-xl font-bold">Add New Occasion</h3>
 <button onClick={onClose}><XCircle className="w-6 h-6" /></button>
 </div>

 {error && (
 <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4 flex items-center">
 <AlertTriangle className="w-5 h-5 mr-2" />
 {error}
 </div>
 )}

 <form onSubmit={handleSubmit} className="space-y-4">
 <div>
 <label className="block text-sm font-bold mb-2">Name</label>
 <input
 type="text"
 className="w-full p-2 border rounded dark:bg-gray-700"
 value={occasionName}
 onChange={(e) => setOccasionName(e.target.value)}
 required
 />
 </div>

 <div>
 <label className="block text-sm font-bold mb-2">Category</label>
 <select
 className="w-full p-2 border rounded dark:bg-gray-700"
 value={categoryId}
 onChange={(e) => setCategoryId(e.target.value)}
 required
 >
 {categories.map((cat) => (
 <option key={cat.id} value={cat.id}>{cat.category_name}</option>
 ))}
 </select>
 </div>

 <div>
 <label className="block text-sm font-bold mb-2">Image</label>
 <input type="file" onChange={handleImageChange} className="w-full" accept="image/*" />
 {imagePreview && (
 <div className="mt-2 relative w-24 h-24 mx-auto">
 <Image src={imagePreview} alt="Preview" fill className="object-cover rounded-full" />
 </div>
 )}
 </div>

 <div className="flex justify-end gap-2 mt-6">
 <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
 <button type="submit" disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50">
 {loading ? "Adding..." : "Add Occasion"}
 </button>
 </div>
 </form>
 </motion.div>
 </motion.div>
 );
};

export default AddOccasionModal;