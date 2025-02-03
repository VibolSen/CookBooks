import { FaBookmark, FaStar } from 'react-icons/fa';
import Link from 'next/link';

interface RecipeData {
  recipe_id: number;
  title: string;
  cookingTime: string;
  rating: number;
  image: string;
  description: string;
  ingredients: string;
}

const DrinksCard = ({ recipe_id, title, cookingTime, rating, image, description, ingredients }: RecipeData) => {
  return (
    <div className="w-80 h-auto rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 duration-300 ease-in-out">
      {/* Recipe Image */}
      <div className="relative h-48">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt={title}
        />
        {/* Save Recipe Button */}
        <Link href={`/save-recipe/${recipe_id}`} className="absolute top-2 left-2">
          <FaBookmark className="h-6 w-6 text-white hover:text-blue-600 transition-colors duration-300" />
        </Link>
      </div>

      {/* Recipe Details */}
      <div className="p-4">
        {/* Recipe Title */}
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>

        {/* Cooking Time */}
        <p className="text-sm text-gray-600">Cooking time: {cookingTime}</p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          {Array.from({ length: 5 }, (_, index) => (
            <FaStar
              key={index}
              className={`h-5 w-5 ${
                index < rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({rating})</span>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-700">{description}</p>

        {/* Ingredients */}
        <p className="mt-4 text-gray-700"><strong>Ingredients:</strong> {ingredients}</p>

        {/* View Recipe Button */}
        <Link
          href={`/drinks/${recipe_id}`}
          className="mt-4 block text-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default DrinksCard;