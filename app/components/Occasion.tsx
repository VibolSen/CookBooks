"use client";

import { useEffect, useState, useCallback } from "react";
import { getOccasions } from "@/app/actions/occasionActions";
import { getRecipes } from "@/app/actions/recipeActions";
import Link from "next/link";
import Image from "next/image";
import { Search, ChefHat, Sparkles, X, Heart, Clock } from "lucide-react";

export default function OccasionPage() {
  const [occasions, setOccasions] = useState<any[]>([]);
  const [filter, setFilter] = useState("");
  const [selectedOccasion, setSelectedOccasion] = useState<any>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);

  const fetchOccasions = useCallback(async () => {
    setIsLoading(true);
    const result = await getOccasions();
    if (result.success && result.data) {
      const all = result.data;
      setOccasions(filter ? all.filter((o: any) => o.name.toLowerCase().includes(filter.toLowerCase())) : all);
    }
    setIsLoading(false);
  }, [filter]);

  const fetchRecipes = useCallback(async (occasionId?: string) => {
    setIsLoadingRecipes(true);
    const data = await getRecipes(occasionId ? { occasionId } : {});
    setRecipes(data);
    setIsLoadingRecipes(false);
  }, []);

  useEffect(() => {
    fetchOccasions();
    fetchRecipes();
  }, [fetchOccasions, fetchRecipes]);

  const handleSelectOccasion = (occasion: any) => {
    setSelectedOccasion(occasion);
    fetchRecipes(occasion.id);
  };

  const handleClearFilter = () => {
    setSelectedOccasion(null);
    fetchRecipes();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white">
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">Browse by Occasion</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">Discover perfect recipes for every special moment and celebration</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5 z-10" />
            <input
              type="text"
              placeholder="Search occasions... 🔍"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/90 dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="sticky top-8">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
                <div className="flex items-center mb-6">
                  <ChefHat className="h-6 w-6 text-orange-500 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Occasions</h2>
                </div>
                {isLoading ? (
                  <div className="space-y-3">{[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />)}</div>
                ) : (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {occasions.map((occasion) => (
                      <button
                        key={occasion.id}
                        onClick={() => handleSelectOccasion(occasion)}
                        className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          selectedOccasion?.id === occasion.id
                            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg"
                            : "bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-orange-50"
                        }`}
                      >
                        {occasion.name}
                      </button>
                    ))}
                  </div>
                )}
                {selectedOccasion && (
                  <button onClick={handleClearFilter} className="mt-6 flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium">
                    <X className="h-4 w-4 mr-2" /> Clear Filter
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                {selectedOccasion ? (
                  <span className="flex items-center"><Heart className="h-8 w-8 text-red-500 mr-3" /> Recipes for &quot;{selectedOccasion.name}&quot;</span>
                ) : (
                  <span className="flex items-center"><Sparkles className="h-8 w-8 text-purple-500 mr-3" /> All Recipes</span>
                )}
              </h2>
              <div className="text-sm text-gray-500 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">{recipes.length} recipes found</div>
            </div>

            {isLoadingRecipes ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse" />)}
              </div>
            ) : recipes.length === 0 ? (
              <div className="text-center py-16">
                <ChefHat className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">No recipes found</h3>
                <p className="text-gray-500">{selectedOccasion ? `No recipes for "${selectedOccasion.name}" yet.` : "No recipes available."}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <Link
                    key={recipe.id}
                    href={`/recipe/${recipe.id}`}
                    className="group relative bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                  >
                    <div className="relative overflow-hidden">
                      <Image src={recipe.imageUrl || "/placeholder.svg"} alt={recipe.title} width={400} height={200} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2 group-hover:text-orange-600 transition-colors">{recipe.title}</h3>
                      {recipe.description && <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">{recipe.description}</p>}
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{new Date(recipe.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
