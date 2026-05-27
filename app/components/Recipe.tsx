"use client";

import { useState, useEffect } from "react";
import { getRecipes } from "@/app/actions/recipeActions";
import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";
import RecipeCard from "@/app/components/recipe-card";
import { useSession } from "next-auth/react";

const AllRecipesPage = () => {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [savedRecipes] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const recipesData = await getRecipes();
        setRecipes(recipesData);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveRecipe = async (recipeId: string) => {
    // TODO: Implement save recipe action
    console.log("Saving recipe:", recipeId);
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
          Explore Our Collection
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          From healthy snacks to gourmet meals, find your next favorite dish here.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 rounded-3xl animate-pulse" />)}
        </div>
      ) : recipes.length === 0 ? (
        <div className="text-center py-20">
          <ChefHat className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No recipes found yet. Check back later!</p>
        </div>
      ) : (
        <motion.div
          className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              reviews={[]}
              user={session?.user}
              savedRecipes={savedRecipes}
              onSaveRecipe={handleSaveRecipe}
              index={index}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AllRecipesPage;
