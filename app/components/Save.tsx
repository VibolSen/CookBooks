'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SavePage() {
  const [savedItems, setSavedItems] = useState<any[]>([]); // Adjust type as per your API response
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState<any[]>([]);

  useEffect(() => {
    // Fetch saved items
    const fetchSavedItems = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/saved'); // Replace with your API endpoint
        const data = await response.json();
        setSavedItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching saved items:", error);
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
      await fetch(`/api/saved/${id}`, { method: 'DELETE' }); // Replace with your API endpoint
      setSavedItems(savedItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="container mx-auto px-10 py-10">
      <h1 className="text-3xl font-bold mb-6 ml-[100px]">Saved Items</h1>
      <div className="flex flex-col lg:flex-row justify-center space-x-8">
        {/* Sidebar */}
        <nav className="mt-8">
          <ul className="space-y-4">
            {[
              { href: "/profile", label: "Home", icon: "home" },
              { href: "/edit-profile", label: "Edit Profile", icon: "edit" },
              { href: "/my-recipes", label: "My Recipes", icon: "work" },
              { href: "/reset-password", label: "Reset Password", icon: "lock" },
              { href: "/save", label: "Save", icon: "save", active: true },
            ].map(({ href, label, icon, active }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-6 py-3 rounded-lg ${active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`}
                >
                  <span className="material-icons mr-3">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

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
