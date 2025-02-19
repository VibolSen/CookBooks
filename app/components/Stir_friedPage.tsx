"use client"; // Mark this as a Client Component

import React from "react";
import Stir_fried from "@/app/components/card/Stir_fried";

interface Recipe {
  recipe_id: number;
  recipe_name: string;
  description: string;
  prep_time: number;
  cook_time: number;
  image_url: string;
  rating: number;
  ingredients: string;
}

interface SoupPageClientProps {
  user: any; // Replace `any` with your user type
  recipes: Recipe[];
}

const Stir_friedPageClient: React.FC<SoupPageClientProps> = ({ user, recipes }) => {
  return (
    <div>
      {/* Main content */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Drinks</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {recipes.map((recipe) => (
            <div className="flex justify-center" key={recipe.recipe_id}>
              <Stir_fried
                recipe_id={recipe.recipe_id}
                recipe_name={recipe.recipe_name}
                cook_time={`${recipe.prep_time + recipe.cook_time} mins`}
                rating={recipe.rating}
                image_url={recipe.image_url}
                description={recipe.description}
                ingredients={recipe.ingredients}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stir_friedPageClient;
