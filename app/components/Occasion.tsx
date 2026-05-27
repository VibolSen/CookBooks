"use client";

import { useEffect, useState, useCallback } from "react";
import { getOccasions } from "@/app/actions/occasionActions";
import { getRecipes } from "@/app/actions/recipeActions";
import { useSession } from "next-auth/react";
import RecipeCard from "@/app/components/recipe-card";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChefHat, Sparkles, X, Compass } from "lucide-react";

export default function OccasionPage() {
  const { data: session } = useSession();
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
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/30">
      {/* Top Banner section */}
      <div className="relative overflow-hidden border-b border-gray-150/40 dark:border-gray-800/40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md py-12 md:py-16">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-primary via-[#7B2CBF] to-[#FF6B00]" />
        
        <div className="relative max-w-6xl mx-auto px-4 text-center z-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary dark:text-blue-450 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-brand-primary/10"
          >
            <Compass className="w-3.5 h-3.5" />
            Celebrations & Moments
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white">
            Browse by Occasion
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover the perfect menu for your special events, holiday dinners, family gatherings, and everyday celebrations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Search Bar section */}
        <div className="mb-10 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4.5 w-4.5 z-10" />
            <input
              type="text"
              placeholder="Search occasions... "
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/80 dark:bg-gray-900/80 border border-gray-200/60 dark:border-gray-800/60 rounded-2xl text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 shadow-sm shadow-gray-200/5 dark:shadow-none"
            />
          </div>
        </div>

        {/* Sidebar + Main Grid Split */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left Panel: Occasions Sidebar */}
          <div className="w-full lg:w-1/4 lg:sticky lg:top-24">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-[2rem] border border-gray-150/40 dark:border-gray-800/40 p-6 shadow-sm">
              <div className="flex items-center mb-6 border-b border-gray-100 dark:border-gray-800 pb-3">
                <ChefHat className="h-5 w-5 text-orange-500 mr-2.5" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">Filter Occasions</h2>
              </div>
              
              {isLoading ? (
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2 max-h-80 lg:max-h-[25rem] overflow-y-auto pr-1.5 custom-scrollbar">
                  {occasions.map((occasion) => {
                    const isSelected = selectedOccasion?.id === occasion.id;
                    return (
                      <motion.button
                        key={occasion.id}
                        onClick={() => handleSelectOccasion(occasion)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-gradient-to-r from-brand-primary to-[#7B2CBF] text-white shadow-md shadow-blue-500/10"
                            : "bg-gray-50/50 dark:bg-gray-950/20 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-100 dark:hover:border-gray-750"
                        }`}
                        whileTap={{ scale: 0.98 }}
                      >
                        {occasion.name}
                      </motion.button>
                    );
                  })}
                </div>
              )}
              
              <AnimatePresence>
                {selectedOccasion && (
                  <motion.button 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={handleClearFilter} 
                    className="mt-6 flex items-center justify-center w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700/80 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-xs uppercase tracking-wider border border-gray-200/30 dark:border-gray-700/30 transition cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5 mr-1.5" /> Clear Filter
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Panel: Recipes Grid */}
          <div className="w-full lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                {selectedOccasion ? (
                  <span className="flex items-center">
                    <Sparkles className="h-5 w-5 text-brand-primary mr-2" /> 
                    Recipes for &ldquo;{selectedOccasion.name}&rdquo;
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Sparkles className="h-5 w-5 text-purple-500 mr-2" /> 
                    All Recipes
                  </span>
                )}
              </h2>
              <div className="text-xs font-bold text-gray-500 bg-white dark:bg-gray-900 border border-gray-150/40 dark:border-gray-800/40 px-3.5 py-1.5 rounded-full shadow-sm">
                {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"} found
              </div>
            </div>

            {isLoadingRecipes ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-white dark:bg-gray-900 animate-pulse rounded-3xl border border-gray-150/40 dark:border-gray-800/40" />
                ))}
              </div>
            ) : recipes.length === 0 ? (
              <div className="text-center py-16 bg-white/40 dark:bg-gray-900/40 border border-dashed border-gray-200 dark:border-gray-800 rounded-[2rem]">
                <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">No recipes found</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                  {selectedOccasion ? `No recipes for "${selectedOccasion.name}" have been added yet.` : "There are currently no recipes available."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe, index) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    index={index}
                    reviews={recipe.reviews || []}
                    user={session?.user as any}
                    savedRecipes={[]}
                    onSaveRecipe={() => {}}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
