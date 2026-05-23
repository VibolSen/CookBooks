"use client";

import { motion } from "framer-motion";
import { BookmarkIcon, Clock, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


interface RecipeCardProps {
  recipe: any;
  reviews: any[];
  user: any | null;
  savedRecipes: string[];
  onSaveRecipe: (recipeId: string) => void;
  index?: number;
}

const RecipeCard = ({
  recipe,
  user,
  savedRecipes,
  onSaveRecipe,
  index = 0,
}: RecipeCardProps) => {
  const imageUrl = recipe.images?.[0]?.url || "/default-recipe.jpg";

  
  const recipeCardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -8, scale: 1.02 },
  };

  return (
    <Link href={`/recipe/${recipe.id}`} passHref legacyBehavior>
      <motion.a
        className="block group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden cursor-pointer"
        variants={recipeCardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ delay: index * 0.1 }}
      >
        <div className="relative overflow-hidden rounded-t-3xl">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={recipe.title}
            width={300}
            height={200}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            priority
            unoptimized
          />
        </div>

        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300 line-clamp-2 flex-1 mr-3">
              {recipe.title}
            </h3>

            {user && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSaveRecipe(recipe.id);
                }}
                className={`relative p-3 rounded-full transition-all duration-300 transform hover:scale-110 z-10 ${
                  savedRecipes.includes(recipe.id)
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/20"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                <BookmarkIcon className={`h-5 w-5 ${savedRecipes.includes(recipe.id) ? "fill-current" : ""}`} />
              </button>
            )}
          </div>

          {recipe.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
              {recipe.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-auto">
             <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{recipe.cookTime || '20m'}</span>
             </div>
             <div className="bg-orange-100 text-orange-600 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                {recipe.category?.name || "Recipe"}
             </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 rounded-full shadow-xl">
            <Eye className="h-4 w-4" />
          </div>
        </div>
      </motion.a>
    </Link>
  );
};

export default RecipeCard;
