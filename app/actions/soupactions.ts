import { supabase } from '@/app/lib/db'; // Import Supabase client

interface Recipe {
  recipe_id: number;
  recipe_name: string;
  description: string;
  prep_time: number;
  cook_time: number;
  image_url: string;
  rating: number;
  ingredients: string;
  author: string;
  date: string;
}

export async function getSoupRecipeById(recipeId: number): Promise<Recipe | null> {
  try {
    const { data, error } = await supabase
      .from("recipe")
      .select("*")
      .eq("recipe_id", recipeId) // Use recipe_id from database
      .single(); // Fetch a single record

    if (error) {
      console.error("Error fetching drink recipe:", error.message);
      return null;
    }

    if (!data) {
      console.log("No recipe found for the ID:", recipeId);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error fetching drink recipe:", error);
    return null;
  }
}



// Fetch all drink recipes
export async function getSoupRecipes(): Promise<Recipe[]> {
  try {
    const { data, error } = await supabase
      .from("recipe")
      .select("*")
      .eq("category_id", 2); // Filter by category (e.g., drinks)

    if (error) {
      console.error("Error fetching drink recipes:", error.message);
      throw new Error("Failed to fetch drink recipes");
    }

    return data as Recipe[];
  } catch (error) {
    console.error("Error fetching drink recipes:", error);
    throw new Error("Failed to fetch drink recipes");
  }
}
