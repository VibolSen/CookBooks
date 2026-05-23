"use client";

import { useState, useEffect } from "react";
import { getRecipeOfTheWeek } from "@/app/actions/recipeActions";
import RecipeCard from "@/app/components/recipe-card";
import { useSession } from "next-auth/react";

export default function RecipeOfTheWeekPage() {
  const { data: session } = useSession();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getRecipeOfTheWeek();
        if (!result.success || !result.data) {
          setRecipes([]);
          return;
        }
        const data = Array.isArray(result.data) ? result.data : [result.data];
        const mapped = data.filter((r: any) => r !== null).map((r: any) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          images: r.images,
          createdAt: r.createdAt,
          ingredients: r.ingredients,
          instructions: r.instructions,
          cookTime: r.cookTime,
          category: r.category,
        }));

        setRecipes(mapped);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Recipe of the Week
        </h2>
        <p className="text-gray-600">Handpicked just for you!</p>
      </div>

      {loading ? (
        <div className="flex justify-center h-64 items-center bg-gray-100 rounded-2xl animate-pulse">Loading...</div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              index={index}
              reviews={[]}
              user={session?.user as any}
              savedRecipes={[]}
              onSaveRecipe={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">No special recipes this week.</div>
      )}
    </section>
  );
}