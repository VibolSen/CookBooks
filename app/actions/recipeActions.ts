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

export async function getRecipeById(recipeId: number): Promise<Recipe | null> {
  try {
    const { data, error } = await supabase
      .from("recipe")
      .select("*, image_recipe(image_url)")
      .eq("recipe_id", recipeId)
      .single(); // Ensures only one recipe is returned

    if (error) throw error;

    if (!data) {
      console.warn("No recipe found for the ID:", recipeId);
      return null;
    }

    return {
      ...data,
      image_url: data.image_recipe?.[0]?.image_url || " " // Handle array response
    };
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}


// Fetch all drink recipes
export async function getDrinkRecipes(): Promise<Recipe[]> {
  try {
    const { data, error } = await supabase
      .from("recipe")
      .select("*, image_recipe(image_url)") // Ensure image_url is selected
      .eq("category_id", 4); // Filter for drinks

    if (error) throw error;

    console.log("Fetched recipes:", data); // Debugging: Check the response

    return data.map((recipe: any) => ({
      ...recipe,
      image_url: recipe.image_recipe?.[0]?.image_url ?? " "
    })) as Recipe[];
  } catch (error) {
    console.error("Error fetching drink recipes:", error);
    return [];
  }
}



// Fetch all soup recipes
export async function getSoupRecipes(): Promise<Recipe[]> {
  try {
    const { data, error } = await supabase
      .from("recipe")
      .select("*, image_recipe(image_url)") // Ensure images are included
      .eq("category_id", 2); // Filter for soups

    if (error) throw error;

    console.log("Fetched soup recipes:", data); // Debugging: Check the response

    return data.map((recipe: any) => ({
      ...recipe,
      image_url: recipe.image_recipe?.[0]?.image_url || " " // Handle possible array response
    })) as Recipe[];
  } catch (error) {
    console.error("Error fetching soup recipes:", error);
    return [];
  }
}


// Fetch all drink Occasion
export async function getOccasionRecipes(): Promise<Recipe[]> {
  try {
    const { data, error } = await supabase
      .from("recipe")
      .select("*, image_recipe(image_url)") // Include image data
      .eq("category_id", 1); // Filter for occasion recipes

    if (error) throw error;

    console.log("Fetched occasion recipes:", data); // Debugging

    return data.map((recipe: any) => ({
      ...recipe,
      image_url: recipe.image_recipe?.[0]?.image_url || " " // Handle missing images
    })) as Recipe[];
  } catch (error) {
    console.error("Error fetching occasion recipes:", error);
    return [];
  }
}



// Fetch all  Dessert
export async function getDessertRecipes(): Promise<Recipe[]> {
  try {
    const { data, error } = await supabase
      .from("recipe")
      .select("*, image_recipe(image_url)") // Include image data
      .eq("category_id", 5); // Filter for occasion recipes

    if (error) throw error;

    console.log("Fetched occasion recipes:", data); // Debugging

    return data.map((recipe: any) => ({
      ...recipe,
      image_url: recipe.image_recipe?.[0]?.image_url || " " // Handle missing images
    })) as Recipe[];
  } catch (error) {
    console.error("Error fetching occasion recipes:", error);
    return [];
  }
}



// Fetch all drink Occasion
export async function getfriedRecipes(): Promise<Recipe[]> {
  try {
    const { data, error } = await supabase
      .from("recipe")
      .select("*, image_recipe(image_url)") // Include image data
      .eq("category_id", 3); // Filter for occasion recipes

    if (error) throw error;

    console.log("Fetched occasion recipes:", data); // Debugging

    return data.map((recipe: any) => ({
      ...recipe,
      image_url: recipe.image_recipe?.[0]?.image_url || " " // Handle missing images
    })) as Recipe[];
  } catch (error) {
    console.error("Error fetching occasion recipes:", error);
    return [];
  }
}
