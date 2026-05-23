"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRecipes } from "@/app/actions/recipeActions";
import { getCategories } from "@/app/actions/categoryActions";
import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";
import RecipeCard from "@/app/components/recipe-card";
import { useSession } from "next-auth/react";

export default function CategoryPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savedRecipes] = useState<string[]>([]);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [recipeData, catData] = await Promise.all([
          getRecipes({ categoryId: id as string }),
          getCategories(),
        ]);
        setRecipes(recipeData);
        if (catData.success && catData.data) {
          const cat = catData.data.find((c: any) => c.id === id);
          setCategoryName(cat?.name || "Category");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.main className="container mx-auto px-4 py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {categoryName ? `${categoryName} Recipes` : "Category"}
          </h1>
          <div className="mt-6 text-sm text-gray-500 bg-white/50 dark:bg-gray-800/50 px-4 py-2 rounded-full inline-block">
            {recipes.length} recipes in this category
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => <div key={i} className="h-64 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse" />)}
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500">{error}</div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-16">
            <ChefHat className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No recipes in this category yet.</p>
          </div>
        ) : (
          <motion.div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4" variants={containerVariants} initial="initial" animate="animate">
            {recipes.map((recipe, index) => (
              <RecipeCard key={recipe.id} recipe={recipe} reviews={[]} user={session?.user} savedRecipes={savedRecipes} onSaveRecipe={() => {}} index={index} />
            ))}
          </motion.div>
        )}
      </motion.main>
    </div>
  );
}
