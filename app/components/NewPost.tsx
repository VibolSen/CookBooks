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

        setNewRecipes(result.data || []);
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
        <h2 className="text-3xl font-bold text-brand-black mb-4">
          Fresh New Recipes
        </h2>
        <p className="text-gray-600">Discover the latest culinary creations!</p>
      </div>

      <div className="flex justify-end mb-8">
        <Link href="/recipe" className="bg-brand-primary text-brand-white px-6 py-2 rounded-full font-medium hover:bg-brand-secondary hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
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
              key={recipe.id}
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
