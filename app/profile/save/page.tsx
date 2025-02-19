// src/app/pages/save-page.tsx

"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SidebarNav from '@/app/components/Sidebar';
import { supabase } from '@/app/lib/db';

export default function SavePage() {
  const [savedItems, setSavedItems] = useState<any[]>([]); // Adjust type as per your API response
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  useEffect(() => {
    // Fetch saved items from Supabase
    const fetchSavedItems = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('saved_recipe') // Ensure this is the correct table name
          .select('*'); // Adjust column names as needed

        if (error) {
          console.error('Error fetching saved items:', error.message); // Log the actual error message
          throw new Error(error.message);
        }

        if (!data || data.length === 0) {
          console.log('No saved items found.');
        }

        setSavedItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching saved items:", error); // Enhanced error logging
      } finally {
        setLoading(false);
      }
    };

    fetchSavedItems();
  }, []);

  // Filter items based on search term
  useEffect(() => {
    setFilteredItems(
      savedItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, savedItems]);

  // Remove an item
  const handleRemove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_recipe') // Your table name
        .delete()
        .eq('id', id); // Adjust if your column name differs

      if (error) {
        console.error('Error removing item:', error.message);
        throw new Error(error.message);
      }

      setSavedItems(savedItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div className="container mx-auto px-10 py-10">
      <h1 className="text-3xl font-bold mb-6 ml-[100px]">Saved Items</h1>
      <div className="flex flex-col lg:flex-row justify-center space-x-8">
        <SidebarNav />

        {/* Saved Items List */}
        <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Saved Items</h2>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search saved items..."
              className="w-full border border-gray-300 rounded-md p-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
            </div>
          ) : (
            <>
              {filteredItems.length > 0 ? (
                <ul className="space-y-4">
                  {filteredItems.map((item) => (
                    <li
                      key={item.id}
                      className="border-b pb-4 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                        <div className="mt-2">
                          <Link
                            href={`/recipe/${item.id}`} // Replace with dynamic route
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View Item
                          </Link>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">You have no saved items.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
