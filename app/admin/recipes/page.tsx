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
} from "lucide-react";

import Image from "next/image";

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

  const fetchData = async () => {
    setLoading(true);
    const [rRes, cRes] = await Promise.all([
      getRecipes(),
      getCategories(),
    ]);
    if (rRes) setRecipes(rRes);
    if (cRes.success && cRes.data) setCategories(cRes.data);
    setLoading(false);
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

  if (loading) return <div className="p-20 text-center">Loading Recipes...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-2">
           <BookOpen className="text-orange-500" /> Recipe Management
        </h1>
        <button className="bg-orange-500 text-white px-6 py-2 rounded-xl flex items-center gap-2">
           <Plus /> Add Recipe
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-8 flex flex-wrap gap-4 items-center">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search recipes..." 
              className="w-full pl-10 pr-4 py-2 border rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="p-2 border rounded-xl">
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
         </select>
         <div className="flex gap-2">
            <button onClick={() => setViewMode("grid")} className={`p-2 rounded ${viewMode === "grid" ? "bg-orange-100 text-orange-600" : ""}`}><Grid3X3 /></button>
            <button onClick={() => setViewMode("list")} className={`p-2 rounded ${viewMode === "list" ? "bg-orange-100 text-orange-600" : ""}`}><List /></button>
         </div>
      </div>

      {viewMode === "list" ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Author</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecipes.map(r => (
                <tr key={r.id} className="border-b">
                  <td className="p-4">
                    <div className="relative w-12 h-12">
                       <Image src={r.images?.[0]?.url || "/placeholder.svg"} alt={r.title} fill className="object-cover rounded" />
                    </div>
                  </td>
                  <td className="p-4 font-bold">{r.title}</td>
                  <td className="p-4">{r.category?.name}</td>
                  <td className="p-4">{r.user?.userName}</td>
                  <td className="p-4 text-red-500 cursor-pointer" onClick={() => { setSelectedRecipeId(r.id); setIsDeleteModalOpen(true); }}><Trash2 /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {filteredRecipes.map(r => (
             <div key={r.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
                <div className="relative h-40 mb-4">
                   <Image src={r.images?.[0]?.url || "/placeholder.svg"} alt={r.title} fill className="object-cover rounded-xl" />
                </div>
                <h3 className="font-bold mb-2">{r.title}</h3>
                <div className="flex justify-between items-center mt-4">
                   <span className="text-xs bg-gray-100 p-1 rounded font-bold">{r.category?.name}</span>
                   <button onClick={() => { setSelectedRecipeId(r.id); setIsDeleteModalOpen(true); }} className="text-red-500"><Trash2 className="w-5 h-5" /></button>
                </div>
             </div>
           ))}
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl max-w-sm text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Delete Recipe?</h2>
            <p className="text-gray-500 mb-6">This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 p-2 border rounded-xl">Cancel</button>
              <button onClick={handleDelete} className="flex-1 p-2 bg-red-500 text-white rounded-xl">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
