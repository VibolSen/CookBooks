// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import SidebarNav from "@/app/components/Sidebar";
// import { fetchSavedItems, removeSavedItem } from "@/app/actions/recipeActions";
// import { supabase } from "@/app/lib/db";

// export default function SavePage() {
//   const [savedItems, setSavedItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [userId, setUserId] = useState(null);

//   // Fetch user ID
//   useEffect(() => {
//     const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
//       if (session?.user) {
//         setUserId(session.user.id);
//       } else {
//         setUserId(null);
//       }
//     });
  
//     return () => {
//       authListener?.subscription?.unsubscribe();
//     };
//   }, []);
  
  

//   // Fetch saved recipes
//   useEffect(() => {
//     if (!userId) return;

//     const fetchItems = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchSavedItems(userId);
//         if (data) {
//           setSavedItems(data);
//           setFilteredItems(data);
//         }
//       } catch (err) {
//         console.error("Error fetching saved items:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, [userId]);

//   // Search functionality
//   useEffect(() => {
//     setFilteredItems(
//       savedItems.filter((item) =>
//         item.recipe?.recipe_name?.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [searchTerm, savedItems]);

//   // Remove saved item
//   const handleRemove = async (recipeId) => {
//     if (!userId) return;

//     try {
//       const success = await removeSavedItem(recipeId, userId);
//       if (success) {
//         setSavedItems((prev) => prev.filter((item) => item.recipe_id !== recipeId));
//         setFilteredItems((prev) => prev.filter((item) => item.recipe_id !== recipeId));
//       }
//     } catch (err) {
//       console.error("Error removing saved item:", err.message);
//     }
//   };

//   return (
//     <div className="container mx-auto px-10 py-10">
//       <h1 className="text-3xl font-bold mb-6 ml-[100px]">Saved Recipes</h1>
//       <div className="flex flex-col lg:flex-row justify-center space-x-8">
//         <SidebarNav />
//         <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-2xl font-semibold mb-4">Your Saved Recipes</h2>

//           {/* Search Bar */}
//           <div className="mb-4">
//             <input
//               type="text"
//               placeholder="Search saved recipes..."
//               className="w-full border border-gray-300 rounded-md p-2"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Loading Indicator */}
//           {loading ? (
//             <div className="flex justify-center items-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500"></div>
//             </div>
//           ) : (
//             <>
//               {filteredItems.length > 0 ? (
//                 <ul className="space-y-4">
//                   {filteredItems.map((item) => (
//                     <li key={item.recipe_id} className="border-b pb-4 flex justify-between items-center">
//                       <div>
//                         {item.recipe ? (
//                           <>
//                             <h3 className="text-xl font-bold">
//                               {item.recipe.recipe_name || "Unknown Recipe"}
//                             </h3>
//                             <p className="text-gray-600">
//                               {item.recipe.description || "No description available."}
//                             </p>
//                             {item.recipe.image_url && (
//                               <img
//                                 src={item.recipe.image_url}
//                                 alt={item.recipe.recipe_name}
//                                 className="w-32 h-32 object-cover rounded-lg"
//                               />
//                             )}
//                             <div className="mt-2">
//                               <Link
//                                 href={`/recipe/${item.recipe_id}`}
//                                 className="text-blue-600 hover:text-blue-800"
//                               >
//                                 View Recipe
//                               </Link>
//                             </div>
//                           </>
//                         ) : (
//                           <p className="text-gray-600">Recipe details not found.</p>
//                         )}
//                       </div>
//                       <button
//                         onClick={() => handleRemove(item.recipe_id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         Remove
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-600">You have no saved recipes.</p>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




export default function SavePage () {
  return (
    <div>
      Hello Save Page
    </div>
  )
}
