"use client";

import React, { useState, useEffect } from "react";
import { updateCategory } from "@/app/actions/categoryActions";
import { motion } from "framer-motion";
import { XCircle, ImageIcon, AlertTriangle } from "lucide-react";
import Image from "next/image";

type Category = {
  id: string;
  category_name: string;
  image: string;
};

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
  onCategoryUpdated: () => void;
}

const EditCategoryModal = ({
  isOpen,
  onClose,
  category,
  onCategoryUpdated,
}: EditCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      setCategoryName(category.category_name);
      setImagePreview(category.image);
    }
  }, [category]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > 5 * 1024 * 1024) {
        setError("Image file is too large. Maximum size is 5MB.");
        setImageFile(null);
        setImagePreview(null);
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("id", category.id);
    formData.append("category_name", categoryName);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const result = await updateCategory(formData);

      if (!result.success) {
        throw new Error(result.error);
      }

      onCategoryUpdated();
      onClose();
    } catch (dbErr: unknown) {
      console.error("Category update error:", dbErr);
      setError(
        dbErr instanceof Error ? dbErr.message : "Category update failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <>
      {isOpen && category && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full"
            variants={modalVariants}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Edit Category
              </h3>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="categoryName"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="imageFile"
                  className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                >
                  Image (Optional)
                </label>
                <label
                  htmlFor="imageFile"
                  className="relative cursor-pointer bg-gray-100 dark:bg-gray-700 border border-dashed border-gray-400 dark:border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <ImageIcon className="w-6 h-6 text-gray-500 dark:text-gray-500 mb-2" />
                  <span className="text-gray-500 dark:text-gray-500 text-sm">
                    Click to Upload
                  </span>
                  <input
                    type="file"
                    id="imageFile"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0"
                    accept="image/*"
                  />
                </label>
                {imagePreview && (
                  <div className="mt-2 relative w-24 h-24 mx-auto">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-semibold rounded focus:outline-none focus:shadow-outline transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded focus:outline-none focus:shadow-outline transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default EditCategoryModal;