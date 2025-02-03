'use client'; // Mark this as a Client Component

import React from 'react';
import DrinksCard from '@/app/components/card/DrinksCard';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

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

interface DrinksPageClientProps {
  user: any; // Replace `any` with your user type
  recipes: Recipe[];
}

const DrinksPageClient: React.FC<DrinksPageClientProps> = ({ user, recipes }) => {
  return (
    <div>
      {/* Add the Navbar at the top */}
      <Navbar user={user} />

      {/* Main content */}
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Drinks</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {recipes.map((recipe) => (
            <div className="flex justify-center" key={recipe.recipe_id}>
              <DrinksCard
                recipe_id={recipe.recipe_id}
                title={recipe.recipe_name}
                cookingTime={`${recipe.prep_time + recipe.cook_time} mins`}
                rating={recipe.rating}
                image={recipe.image_url}
                description={recipe.description}
                ingredients={recipe.ingredients}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Add the Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default DrinksPageClient;