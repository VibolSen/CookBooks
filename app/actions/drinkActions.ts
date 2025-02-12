// 'use server';// 

// import { query } from '@/app/lib/db'; // Import your MySQL query function

// interface Recipe {
//   recipe_id: number;
//   recipe_name: string;
//   description: string;
//   prep_time: number;
//   cook_time: number;
//   image_url: string;
//   rating: number;
//   ingredients: string;
// }

// // Server Action to fetch all drink recipes
// export async function getDrinkRecipes(): Promise<Recipe[]> {
//   try {
//     const results = await query(
//       'SELECT * FROM recipe WHERE category_id = 20' // Fetch only drinks (category_id = 20)
//     );
//     return results as Recipe[];
//   } catch (error) {
//     console.error('Error fetching drink recipes:', error);
//     throw new Error('Failed to fetch drink recipes');
//   }
// }

// // Server Action to fetch a single drink recipe by ID
// export async function getDrinkRecipeById(recipeId: number): Promise<Recipe | null> {
//   try {
//     const results = await query(
//       'SELECT * FROM recipe WHERE recipe_id = ? AND category_id = 20', // Fetch only drinks
//       [recipeId]
//     );

//     // Return the first result or null if no results found
//     return results.length > 0 ? (results[0] as Recipe) : null;
//   } catch (error) {
//     console.error('Error fetching drink recipe:', error);
//     throw new Error('Failed to fetch drink recipe'); // Propagate error for handling in the component
//   }
// }

// export async function getAllDrinks() {
//   try {
//     const [rows] = await pool.query(
//       'SELECT * FROM recipe WHERE category_id = 20'
//     );
//     return rows;
//   } catch (error) {
//     console.error('Error fetching drink recipes:', error);
//     throw error;
//   }
// }