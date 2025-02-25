import { supabase } from '@/app/lib/db'; // Import Supabase client

interface Recipe {
  recipe_id: number;
  recipe_name: string;
  description: string;
  prep_time: number;
  cook_time: number;
  image_url: string;
  average_rating: number; // Change this to average_rating
  ingredients: string;
  author: string;
  date: string;
}

// Function to fetch a recipe by its ID
export async function getRecipeById(recipeId: number): Promise<Recipe | null> {
  try {
    const { data, error } = await supabase
      .from("recipe")
      .select(`
        *,
        image_recipe(image_url),
        users(user_name),
        reviews(rating)  
      `)
      .eq("recipe_id", recipeId)
      .single(); // Ensures only one recipe is returned

    if (error) throw error;

    if (!data) {
      console.warn("No recipe found for the ID:", recipeId);
      return null;
    }

    // Calculate average rating from reviews
    const ratings = data.reviews.map((review: { rating: number }) => review.rating);
    const average_rating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

    return {
      ...data,
      image_url: data.image_recipe?.[0]?.image_url || " ", // Handle array response
      average_rating, // Include average rating
      author: data.users?.user_name || "Unknown User", // Include author
    };
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}

export async function getDrinkRecipes(): Promise<Recipe[]> {
  try {
    const { data, error } = await supabase
      .from("recipe")
      .select("*, image_recipe(image_url), reviews(rating)")
      .eq("category_id", 4); // Filter for drinks

    if (error) throw error;

    console.log("Fetched recipes:", data); // Debugging: Check the response

    // Calculate average rating from reviews
    return data.map((recipe: any) => {
      const ratings = recipe.reviews.map((review: any) => review.rating);
      const averageRating = ratings.length > 0 ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length : 0;

      return {
        ...recipe,
        image_url: recipe.image_recipe?.[0]?.image_url ?? " ",
        average_rating: averageRating || 0, // Add average rating to the returned object
      };
    }) as Recipe[];
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


// Fetch saved items from Supabase
export const removeSavedItem = async (recipeId, userId) => {
  try {
    const { error } = await supabase
      .from("saved_recipes")
      .delete()
      .eq("recipe_id", recipeId)
      .eq("user_id", userId);

    if (error) {
      console.error("Error removing item:", error.message);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Unexpected error removing item:", error);
    return false;
  }
};


// Remove a saved item from Supabase
export const fetchSavedItems = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("saved_recipes")
      .select(`
        recipe_id,
        recipe:recipe_id (
          recipe_name,
          description,
          image_url
        )
      `)
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching saved recipes:", error.message);
      return [];
    }
    return data || [];
  } catch (error) {
    console.error("Unexpected error fetching saved recipes:", error);
    return [];
  }
};
