// // app/drinks/[id]/page.tsx
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { getRecipeById } from '@/app/actions/recipeActions';
// import { useParams } from 'next/navigation';
// import { FaStar } from 'react-icons/fa';

// interface Recipe {
//   recipe_id: number;
//   recipe_name: string;
//   description: string;
//   prep_time: number;
//   cook_time: number;
//   image_url: string;
//   rating: number;
//   ingredients: string;
//   author: string;
//   date: string;
// }

// const DrinksPage: React.FC = () => {
//   const { id: recipeId } = useParams();
//   const [recipe, setRecipe] = useState<Recipe | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchDrinksRecipe = async () => {
//       try {
//         if (!recipeId) {
//           setError('Invalid recipe ID');
//           return;
//         }

//         // Pass recipeId as a number to the function
//         const data = await getRecipeById(Number(recipeId));
//         setRecipe(data);
//       } catch (error) {
//         console.error('Error fetching drink recipe:', error);
//         setError('Failed to load recipe.');
//       }
//     };



//     fetchDrinksRecipe();
//   }, [recipeId]);

//   if (error) {
//     return <p className="text-red-500">{error}</p>;
//   }

//   if (!recipe) {
//     return <p className="text-gray-600">Loading...</p>;
//   }



"use client"
import React, { useEffect, useState } from 'react';
// import { getRecipeById } from '@/app/actions/recipeActions';
// import { useParams } from 'next/navigation';
// import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { FaRegBookmark, FaStar } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import { FiClock } from 'react-icons/fi';
import { ImSpoonKnife } from 'react-icons/im';
import { BsSun } from 'react-icons/bs';

const LatteRecipe = () => {
  return (
    <div className="container mx-auto px-44 py-8 ">
      {/* Title and Author */}
      <h1 className="text-3xl font-bold mb-2">Latte</h1>
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <div className="flex items-center mr-4">
          <FaStar className="text-yellow-500 mr-1" />
          <FaStar className="text-yellow-500 mr-1" />
          <FaStar className="text-yellow-500 mr-1" />
          <FaStar className="text-yellow-500 mr-1" />
          <AiOutlineStar className="text-yellow-500 mr-1" />
          <span className="ml-1">4.0</span>
          <span>(27)</span>
        </div>
      </div>
      <div className="flex items-center text-sm text-gray-600 mb-4">
        <span className="mr-2">By VIBOL SEN</span>
        <span>January 10, 2024</span>
      </div>

      {/* Image */}
      <div className="mb-4 ">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg"  // Replace with your image path
          alt="Latte"
          width={800}
          height={400}
          layout="responsive"
          objectFit="cover"
          className="rounded-lg "
        />
      </div>

      {/* Save and Rate buttons (Styling to be added) */}
      <div className="flex items-center mb-4">
        <button className="flex items-center bg-blue-500 text-white border  border-gray-300 rounded-md px-4 py-2 mr-2 hover:bg-blue-700 transition-colors">
          <FaRegBookmark className="mr-1" />
          <span>Save</span>
        </button>
        <button className="flex items-center bg-blue-500 text-white border border-gray-300 rounded-md px-4 py-2 hover:bg-blue-700 transition-colors">
          <span >☆</span>
          <span>Rate</span>
        </button>
      </div>

      {/* Overview */}
      <h2 className="text-2xl font-semibold mb-2">Overview</h2>
      <p className="text-gray-700 mb-4">
        Latte coffee, commonly known simply as a "latte," is a popular espresso-based drink that combines rich,
        bold espresso with creamy steamed milk, resulting in a smooth and flavorful beverage. Originating from
        Italy, where it is known as "caffe latte" (which means "milk coffee" in Italian), the drink has gained
        international fame and become a staple in coffee shops worldwide. The latte is characterized by its
        harmonious balance of strong coffee and the natural sweetness of milk, creating a velvety texture that is
        both comforting and energizing.
      </p>
      <p className="text-gray-700 mb-4">
        The drink typically starts with a shot of espresso, which is made by forcing hot water through finely-ground
        coffee beans under high pressure, resulting in a concentrated and robust coffee base. To this, a larger
        quantity of steamed milk is added, which has been heated to create a smooth, frothy texture. The final
        touch is a thin layer of milk foam, which adds a light, airy finish to the drink. The standard ratio for a latte is
        one part espresso to three or four parts steamed milk, although this can be adjusted to suit individual
        preferences for strength and creaminess.
      </p>

      {/* How to do Tips */}
      <h2 className="text-2xl font-semibold mb-2">How to do Tips</h2>
      <ul className="list-disc pl-5 text-gray-700 mb-4">
        <li>Whole milk creates the creamiest texture, but you can use non-dairy milk such as almond, oat, or soy.</li>
        <li>Pre-warm your cup to keep your latte hotter for longer.</li>
        <li>Use freshly ground coffee beans for the best-tasting espresso.</li>
      </ul>

      {/* Time Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6 rounded-lg">
        {/* Prep Time */}
        <div className="flex flex-col bg-gray-300 items-center rounded-lg shadow-md p-4">
          <div className="w-12 h-12  rounded-full flex items-center justify-center">
            <FiClock className="text-3xl text-red-600" />
          </div>
          <h3 className="mt-2 font-semibold text-orange-600">Prep Time</h3>
          <p>30 mins</p>
        </div>

        {/* Cook Time */}
        <div className="flex flex-col bg-gray-300 items-center rounded-lg shadow-md p-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <ImSpoonKnife className="text-3xl text-purple-700" />
          </div>
          <h3 className="mt-2 font-semibold text-blue-600">Cook Time</h3>
          <p>10 mins</p>
        </div>

        {/* Total Time */}
        <div className="flex flex-col bg-gray-300 items-center rounded-lg shadow-md p-4">
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <BsSun className="text-3xl text-yellow-600" />
          </div>
          <h3 className="mt-2 font-semibold text-green-700">Total Time</h3>
          <p>40 mins</p>
        </div>
      </div>


      <div className="container mx-auto px-4 py-8">
      {/* Ingredients Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
        <h3 className="text-lg font-medium mb-2">To Roast the Peanuts:</h3>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Light Soy Sauce</li>
          <li>Light Soy Sauce</li>
          <li>Light Soy Sauce</li>
          <li>Light Soy Sauce</li>
          <li>Light Soy Sauce</li>
        </ul>
      </section>

      {/* Latte Image */}
      <section className="mb-8">
        <Image
          src="https://www.wfla.com/wp-content/uploads/sites/71/2023/04/GettyImages-1407832840.jpg?w=2560&h=1440&crop=1"  // Replace with your image path
          alt="Latte Art"
          width={800}
          height={400}
          layout="responsive"
          objectFit="cover"
          className="rounded-lg"
        />
      </section>

      {/* Substitutions Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Substitutions</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Almond Milk Latte: A lighter alternative, with a subtle nutty flavor. Works well for those avoiding dairy.</li>
          <li>Oat Milk Latte: Creamy and naturally sweet, oat milk has become a popular non-dairy option.</li>
          <li>Soy Milk Latte: A classic dairy-free choice that offers a creamy consistency similar to regular milk.</li>
          <li>Coconut Milk Latte: Provides a tropical touch with a slightly sweet and coconutty flavor.</li>
          <li>Cashew Milk or Macadamia Milk Latte: Offers a rich and creamy texture similar to dairy milk, with a mild nutty flavor.</li>
        </ul>
      </section>

      {/* Why Do Some People Like Latte Coffee? */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Why do some people like to drink Latte coffee?</h2>
        <p className="text-gray-700 mb-4">
          People enjoy drinking latte coffee for various reasons, ranging from its taste and texture to the social and cultural experience it offers. Here are some key reasons why lattes are popular:
        </p>
        <ol className="list-decimal pl-5 text-gray-700">
          <li>
            <span className="font-medium">Balanced Flavor:</span> Lattes have a harmonious balance between the strong, bold flavor of espresso and the smooth, creamy texture of steamed milk. The milk mellows the intensity of the espresso, making it less bitter and more approachable for those who might not enjoy the taste of black coffee.
          </li>
          <li>
            <span className="font-medium">Creamy Texture:</span> The steamed milk in a latte creates a velvety, creamy texture that is comforting and satisfying. The addition of milk foam on top adds a light, airy finish, making the drink feel indulgent.
          </li>
          <li>
            <span className="font-medium">Versatility in Customization:</span> Lattes can be customized to suit individual preferences, such as adding flavored syrups (vanilla, caramel, hazelnut), using different types of milk (almond, oat, soy), or adjusting the strength by changing the espresso-to-milk ratio. This flexibility allows people to personalize their drinks to their taste.
          </li>
          <li>
            <span className="font-medium">Milder Caffeine Kick:</span> Compared to other espresso-based drinks like an Americano or straight espresso, lattes provide a gentler caffeine boost because the espresso is diluted with a larger amount of milk. This makes lattes a suitable choice for people who want some energy without the intensity of a stronger coffee.
          </li>
          <li>
            <span className="font-medium">Social and Cultural Experience:</span> Drinking a latte can be part of a larger social ritual, such as meeting friends at a café, starting the day with a comforting beverage, or taking a break during work. The culture surrounding coffee shops and café visits adds a social aspect that many people find appealing.
          </li>
        </ol>
      </section>
    </div>

    <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
      {/* Left Image (Larger) */}
      <div className="col-span-2 row-span-2">
        <Image
          src="https://i.natgeofe.com/n/aed9f829-849c-4902-88bb-27e570c2a398/GettyImages-180258510_3x2.jpg" // Replace with your image path
          alt="Coffee and Cake"
          width={600}
          height={600}
          layout="responsive"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Top Right Image */}
      <div>
        <Image
          src="https://cdn.georgeinstitute.org/sites/default/files/2020-10/world-food-day-2020.png" // Replace with your image path
          alt="Heart Latte Art"
          width={300}
          height={300}
          layout="responsive"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Bottom Right Image */}
      <div>
        <Image
          src="https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg" // Replace with your image path
          alt="Latte Art"
          width={300}
          height={300}
          layout="responsive"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
    </div>

    </div>
  );
};

export default LatteRecipe;
