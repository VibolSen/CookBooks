import { useState } from 'react';
import { FaBookmark, FaStar } from 'react-icons/fa';
import Link from 'next/link';

interface RecipeData {
  recipe_id: number;
  recipe_name: string;
  cook_time   : string;
  rating: number;
  image_url: string;
}

const Soup: React.FC<RecipeData> = ({ 
  recipe_id, 
  recipe_name, 
  cook_time, 
  rating: initialRating,
  image_url, 

}) => {
  const [rating, setRating] = useState(initialRating);
  
  const handleStarClick = (index: number) => {
    setRating(index + 1);
    // Here you can also send the new rating to your backend if needed
  };

  return (
    <div className="w-80 h-auto rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 duration-300 ease-in-out">
    <Link href={`/user/drinks/${recipe_id}`} className="block">
      <div className="relative h-48">
        <img
          className="w-full h-full object-cover"
          src={image_url}
          alt={recipe_name}
        />
      </div>
    </Link>

    {/* Save Recipe Button */}
    <div className="absolute top-2 left-2">
      <Link href={`/user/save-recipe/${recipe_id}`}>
        <FaBookmark className="h-6 w-6 text-white hover:text-blue-600 transition-colors duration-300" />
      </Link>
    </div>

    {/* Recipe Details */}
    <div className="p-4">
      {/* Recipe Title */}
      <h2 className="text-lg font-bold text-gray-800">{recipe_name}</h2>

      {/* Cooking Time */}
      <p className="text-sm text-gray-600">Cooking time: {cook_time} mins</p>

      {/* Rating */}
      <div className="flex items-center mt-2">
        {Array.from({ length: 5 }, (_, index) => (
          <FaStar
            key={index}
            className={`h-5 w-5 cursor-pointer ${index < rating ? 'text-green-800' : 'text-yellow-200'}`}
            onClick={() => handleStarClick(index)}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating})</span>
      </div>

      {/* View Detail Button */}
      <div className="mt-4">
        <Link href={`/user/dessert/${recipe_id}`}>
          <button className='px-5 text-white py-2 rounded-lg bg-blue-600'>
            View Detail
          </button>
        </Link>
      </div>
    </div>
  </div>
  );
};

export default Soup;
