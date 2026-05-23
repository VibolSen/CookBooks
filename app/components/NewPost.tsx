"use client";

import { useState, useEffect } from "react";
import { getNewRecipes } from "@/app/actions/recipeActions";
import RecipeCard from "@/app/components/recipe-card";
import { motion } from "framer-motion";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NewPostPage() {
  const { data: session } = useSession();
  const [newRecipes, setNewRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getNewRecipes();
        if (!result.success) throw new Error(result.error);

        // Map to match RecipeCard expectations if necessary
        const mapped = (result.data || []).map((r: any) => ({
          recipe_id: r.id,
          recipe_name: r.title,
          description: r.description,
          image_recipe: r.imageUrl ? [{ image_url: r.imageUrl }] : [],
          created_at: r.createdAt,
          // Add default values for other missing fields
          ingredients: r.ingredients.join("\n"),
          instructions: r.instructions.join("\n"),
          prep_time: "0:00:00",
          cook_time: "0:00:00",
        }));

        setNewRecipes(mapped);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div className="container mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Fresh New Recipes
        </h2>
        <p className="text-gray-600">Discover the latest culinary creations!</p>
      </div>

      <div className="flex justify-end mb-8">
        <Link href="/recipe" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
          View More →
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-2xl"></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newRecipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.recipe_id}
              recipe={recipe}
              index={index}
              reviews={[]} // reviews handled inside card or fetched separately
              user={session?.user as any}
              savedRecipes={[]}
              onSaveRecipe={() => {}}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
