// import { useState } from 'react';
// import { getAllDrinks } from '../../actions/drinkActions';

// export async function getServerSideProps() {
//   try {
//     const drinks = await getAllDrinks();
//     return {
//       props: {
//         drinks,
//       },
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       props: {
//         drinks: [],
//       },
//     };
//   }
// }

// export default function Drinks({ drinks }) {
//   const [selectedDrink, setSelectedDrink] = useState(null);

//   const handleDrinkClick = (drink) => {
//     setSelectedDrink(drink);
//   };

//   const closeDetails = () => {
//     setSelectedDrink(null);
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Drink Recipes</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {drinks.map((drink) => (
//           <div
//             key={drink.recipe_id}
//             className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
//             onClick={() => handleDrinkClick(drink)}
//           >
//             <img
//               src={drink.image_url}
//               alt={drink.recipe_name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-6">
//               <h2 className="text-xl font-semibold text-gray-800">{drink.recipe_name}</h2>
//               <p className="text-gray-600 mt-2">{drink.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for detailed view */}
//       {selectedDrink && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
//           <div className="bg-white rounded-lg w-full max-w-2xl overflow-hidden">
//             <img
//               src={selectedDrink.image_url}
//               alt={selectedDrink.recipe_name}
//               className="w-full h-64 object-cover"
//             />
//             <div className="p-6">
//               <h1 className="text-3xl font-bold text-orange-600 mb-4">{selectedDrink.recipe_name}</h1>
//               <p className="text-gray-700 mb-4">{selectedDrink.description}</p>

//               <h2 className="text-2xl font-semibold text-gray-800 mb-2">Ingredients</h2>
//               <ul className="list-disc list-inside mb-4">
//                 {selectedDrink.ingredients.split(',').map((ingredient, index) => (
//                   <li key={index} className="text-gray-700">{ingredient.trim()}</li>
//                 ))}
//               </ul>

//               <h2 className="text-2xl font-semibold text-gray-800 mb-2">Preparation Time</h2>
//               <p className="text-gray-700 mb-4">{selectedDrink.prep_time} minutes</p>

//               <h2 className="text-2xl font-semibold text-gray-800 mb-2">Occasion</h2>
//               <p className="text-gray-700">{selectedDrink.occasion_id}</p>

//               <button
//                 onClick={closeDetails}
//                 className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-300"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }