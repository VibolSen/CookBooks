// import pool from '../lib/db';

// // Fetch all recipes
// export async function getAllRecipes() {
//   try {
//     const [rows] = await pool.query('SELECT * FROM recipe');
//     return rows;
//   } catch (error) {
//     console.error('Error fetching all recipes:', error);
//     throw error;
//   }
// }

// // Fetch a single recipe by ID
// export async function getRecipeById(recipeId) {
//   try {
//     const [rows] = await pool.query(
//       'SELECT * FROM recipes WHERE recipe_id = ?',
//       [recipeId]
//     );
//     if (rows.length === 0) {
//       return null; // Recipe not found
//     }
//     return rows[0];
//   } catch (error) {
//     console.error('Error fetching recipe by ID:', error);
//     throw error;
//   }
// }