'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SidebarNav from '@/app/components/Sidebar';
import { fetchRecipes, deleteRecipe } from '@/app/actions/userActions';

export default function MyRecipe() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      const data = await fetchRecipes();
      setRecipes(data);
      setLoading(false);
    };

    getRecipes();
  }, []);

  const handleDelete = async (id: string) => {
    const success = await deleteRecipe(id);
    if (success) {
      setRecipes(recipes.filter((recipe) => recipe.recipe_id !== id));
    }
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-10 py-10">
      <h1 className="text-3xl font-bold mb-6 ml-[100px]">My Recipes</h1>
      <div className="flex flex-col lg:flex-row justify-center space-x-8">
        <SidebarNav />

        <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Recipes</h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
            </div>
          ) : (
            <>
              {recipes.length > 0 ? (
                <>
                  <ul>
                    {currentRecipes.map((recipe) => (
                      <li key={recipe.recipe_id} className="border-b py-4 flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-bold">{recipe.recipe_name}</h3>
                          <p className="text-gray-600">{recipe.description}</p>
                          <div className="mt-2">
                            <Link href={`/recipe/${recipe.id}`} className="text-blue-600 hover:text-blue-800">
                              View Recipe
                            </Link>
                          </div>
                        </div>
                        <button onClick={() => handleDelete(recipe.recipe_id)} className="text-red-500 hover:text-red-700">
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="flex justify-center mt-6 space-x-4">
                    {Array.from({ length: Math.ceil(recipes.length / recipesPerPage) }, (_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-600">You have no recipes yet.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
