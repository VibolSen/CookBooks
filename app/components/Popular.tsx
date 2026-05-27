"use client";

import { useEffect, useState } from "react";
import { getPopularRecipes } from "@/app/actions/recipeActions";
import RecipeCard from "@/app/components/recipe-card";
import { motion } from "framer-motion";
import { TrendingUp, ChefHat } from "lucide-react";
import { useSession } from "next-auth/react";

const PopularPage = () => {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getPopularRecipes();
        if (res.success) {
          setRecipes(res.data || []);
        } else {
          setError(res.error);
        }
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-bold mb-4">
            <TrendingUp size={16} /> TRENDING NOW
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">
            Popular Creations
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Discover what the community is cooking and loving right now.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-white/50 dark:bg-gray-800 animate-pulse rounded-3xl border border-gray-100"></div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100">{error}</div>
        ) : recipes.length === 0 ? (
          <div className="text-center py-20">
            <ChefHat size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No popular recipes found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={index}
                reviews={recipe.reviews || []}
                user={session?.user}
                savedRecipes={[]}
                onSaveRecipe={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularPage;
