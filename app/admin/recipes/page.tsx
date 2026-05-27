"use client";

import { useEffect, useState, useCallback } from "react";
import { getRecipes, deleteRecipe } from "@/app/actions/recipeActions";
import { getCategories } from "@/app/actions/categoryActions";
import {
  Trash2,
  AlertTriangle,
  Search,
  Grid3X3,
  List,
  Plus,
  BookOpen,
  Edit,
  Eye,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import EditRecipeModal from "@/app/components/EditRecipeModal";
import { AnimatePresence, motion } from "framer-motion";

export default function RecipeManagement() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [loading, setLoading] = useState(true);

  // Edit State
  const [editingRecipe, setEditingRecipe] = useState<any | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [recipesRes, categoriesRes] = await Promise.all([
        getRecipes(),
        getCategories(),
      ]);
      if (recipesRes) setRecipes(recipesRes);
      if (categoriesRes.success && categoriesRes.data) setCategories(categoriesRes.data);
    } catch (error) {
      console.error("Failed to load recipes data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterRecipes = useCallback(() => {
    let filtered = recipes;
    if (searchTerm) {
      filtered = filtered.filter((r) => r.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (categoryFilter !== "all") {
      filtered = filtered.filter((r) => r.categoryId === categoryFilter);
    }
    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, categoryFilter]);

  useEffect(() => {
    filterRecipes();
  }, [filterRecipes]);

  const handleDelete = async () => {
    if (!selectedRecipeId) return;
    const result = await deleteRecipe(selectedRecipeId);
    if (result.success) {
      fetchData();
    }
    setIsDeleteModalOpen(false);
  };

  const handleRecipeUpdated = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-brand-primary rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Loading Recipes...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-900/10 text-brand-primary rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Recipe Management</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">View, edit, and moderate recipe details across the site.</p>
          </div>
        </div>
        <Link
          href="/add-recipe"
          className="px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-brand-white text-sm font-semibold rounded-xl transition flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Recipe
        </Link>
      </div>

      {/* Filters Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search recipes by title..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary dark:text-white transition duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 self-stretch sm:self-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary dark:text-white cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name || c.category_name}
              </option>
            ))}
          </select>

          <div className="flex bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-750 rounded-xl p-1 justify-center shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all duration-200 flex items-center ${
                viewMode === "grid"
                  ? "bg-white dark:bg-gray-800 text-brand-primary shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-all duration-200 flex items-center ${
                viewMode === "list"
                  ? "bg-white dark:bg-gray-800 text-brand-primary shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recipes Display Content */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        {filteredRecipes.length > 0 ? (
          viewMode === "list" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 dark:bg-gray-700/30 text-xs font-bold text-gray-400 uppercase border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                  {filteredRecipes.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-700/10 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                          <Image
                            src={r.images?.[0]?.url || "/placeholder.svg"}
                            alt={r.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-3.5 font-bold text-gray-800 dark:text-gray-200">
                        {r.title}
                      </td>
                      <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400">
                        {r.category?.name || "Uncategorized"}
                      </td>
                      <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400 font-medium">
                        {r.user?.userName || "Anonymous"}
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <div className="inline-flex gap-1.5">
                          <Link
                            href={`/recipe/${r.id}`}
                            target="_blank"
                            className="p-1.5 text-gray-400 hover:text-brand-primary hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg transition"
                            title="View Recipe Page"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setEditingRecipe(r)}
                            className="p-1.5 text-gray-400 hover:text-brand-primary hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg transition"
                            title="Edit Recipe"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedRecipeId(r.id);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-gray-750 rounded-lg transition"
                            title="Delete Recipe"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredRecipes.map((r) => (
                <div
                  key={r.id}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-750 p-4 rounded-xl flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-40 w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-750">
                      <Image
                        src={r.images?.[0]?.url || "/placeholder.svg"}
                        alt={r.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 mt-3 line-clamp-1">
                      {r.title}
                    </h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      By {r.user?.userName || "Anonymous"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-brand-primary bg-blue-50 dark:bg-blue-900/10 px-2 py-0.5 rounded-full shrink-0">
                      {r.category?.name || "Recipe"}
                    </span>
                    <div className="flex gap-1">
                      <Link
                        href={`/recipe/${r.id}`}
                        target="_blank"
                        className="p-1.5 text-gray-400 hover:text-brand-primary rounded transition hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-100"
                        title="View details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => setEditingRecipe(r)}
                        className="p-1.5 text-gray-400 hover:text-brand-primary rounded transition hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-100"
                        title="Edit recipe"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRecipeId(r.id);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-500 rounded transition hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-100"
                        title="Delete recipe"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12 text-gray-400 dark:text-gray-500">
            <BookOpen className="w-10 h-10 mx-auto mb-2 text-gray-300 dark:text-gray-700" />
            <p className="text-sm font-medium">No recipes found.</p>
          </div>
        )}
      </div>

      {/* Edit Recipe Modal */}
      <AnimatePresence>
        {editingRecipe && (
          <EditRecipeModal
            recipe={editingRecipe}
            onClose={() => setEditingRecipe(null)}
            onUpdateRecipe={handleRecipeUpdated}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-sm w-full text-center shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3 animate-pulse" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Delete Recipe?</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to delete this recipe? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-750 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition shadow-sm shadow-red-200 dark:shadow-none"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
