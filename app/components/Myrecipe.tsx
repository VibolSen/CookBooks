'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MyRecipe() {
  const [recipes, setRecipes] = useState<any[]>([]); // Adjust type as per your API response
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5; // Number of recipes to show per page

  // Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/recipes'); // Call your API endpoint
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Delete a recipe
  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/recipes/${id}`, { method: 'DELETE' }); // Call your API endpoint
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="container mx-auto px-10 py-10">
      <h1 className="text-3xl font-bold mb-6 ml-[100px]">My Recipes</h1>
      <div className="flex flex-col lg:flex-row justify-center space-x-8">
        {/* Sidebar */}
        <nav className="mt-8">
          <ul className="space-y-4">
            {[
              { href: '/profile', label: 'Home', icon: 'home' },
              { href: '/edit-profile', label: 'Edit Profile', icon: 'edit' },
              { href: '/my-recipes', label: 'My Recipes', icon: 'work', active: true },
              { href: '/reset-password', label: 'Reset Password', icon: 'lock' },
              { href: '/save', label: 'Save', icon: 'save' },
            ].map(({ href, label, icon, active }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="material-icons mr-3">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Recipes List */}
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
                      <li key={recipe.id} className="border-b py-4 flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-bold">{recipe.title}</h3>
                          <p className="text-gray-600">{recipe.description}</p>
                          <div className="mt-2">
                            <Link
                              href={`/recipe/${recipe.id}`}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View Recipe
                            </Link>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(recipe.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Pagination */}
                  <div className="flex justify-center mt-6 space-x-4">
                    {Array.from({ length: Math.ceil(recipes.length / recipesPerPage) }, (_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 rounded-lg ${
                          currentPage === index + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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