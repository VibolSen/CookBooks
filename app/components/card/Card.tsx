// // components/RecipeCard.tsx
// import { FaBookmark, FaStar } from 'react-icons/fa';
// import Link from 'next/link';

// interface RecipeData {
//     title: string;
//     cookingTime: string;
//     rating: number;
//     image: string;
// }

// const RecipeCard = ({ title, cookingTime, rating, image }: RecipeData) => {
//     return (
//         <div className="w-90 h-90 rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 duration-300 ease-in-out">
//             <div className="relative h-48">
//                 <img className="w-full h-full object-cover" src={image} alt={title} />
//                 <Link href="/save-recipe" className="absolute top-1 left-2">
//                     <FaBookmark className='h-[50px] w-[30px] text-white hover:text-blue-600' />
//                 </Link>
//             </div>
//             <div className="p-4 h-32 flex flex-col justify-between">
//                 <h2 className="text-lg font-bold">{title}</h2>
//                 <p className="text-gray-600">Cooking time: {cookingTime}</p>
//                 <div className="flex items-center mt-2">
//                     {Array.from({ length: 5 }, (_, index) => (
//                         <FaStar key={index} className={index < rating ? 'text-yellow-400' : 'text-gray-300'} />
//                     ))}
//                     <span className="ml-2 text-gray-600">({rating})</span>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RecipeCard;