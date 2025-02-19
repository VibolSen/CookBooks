"use server";

import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getUserById = async (userId: number) => {
  console.log("🔍 Fetching user ID:", userId);

  const { data, error } = await supabase
    .from("users")
    .select("user_id, image_url")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("❌ Supabase fetch error:", error.message);
    return null;
  }

  console.log("✅ User fetched:", data);
  return data;
};




export async function updateUser(
  userId: string, // Supabase uses UUID for user IDs
  userData: { user_name: string; email: string; about_me?: string; image_url?: string }
) {
  try {
    const { user_name, email, about_me, image_url } = userData;

    // Validate input
    if (!user_name || !email) {
      return { success: false, error: "Name and email are required." };
    }

    // Ensure the user is logged in
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData?.user) {
      return { success: false, error: "You must be logged in to update your profile." };
    }

    const currentUserId = authData.user.id; // Supabase Auth user ID (UUID)

    if (currentUserId !== userId) {
      return { success: false, error: "You can only edit your own profile." };
    }

    // Check if the email already exists for another user
    const { data: existingUser, error: emailCheckError } = await supabase
      .from("users")
      .select("user_id")
      .eq("email", email)
      .neq("user_id", userId) // Exclude the current user
      .single();

    if (emailCheckError) {
      console.error("Error checking email uniqueness:", emailCheckError.message);
      return { success: false, error: "Error checking email uniqueness." };
    }

    if (existingUser) {
      return { success: false, error: "Email already exists. Please use a different email." };
    }

    // Update user data in Supabase
    const { error } = await supabase
      .from("users")
      .update({ user_name, email, about_me, image_url })
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating user data:", error.message);
      return { success: false, error: "Failed to update user data." };
    }

    return { success: true, message: "Profile updated successfully!" };
  } catch (err) {
    console.error("Error in updateUser:", err instanceof Error ? err.message : err);
    return { success: false, error: "An unexpected error occurred while updating the profile." };
  }
}

// Fetch Recipes
export const fetchRecipes = async () => {
  try {
    const { data, error } = await supabase.from("recipe").select("*");
    if (error) {
      console.error("Error fetching recipes:", error.message);
      throw new Error("Failed to fetch recipes.");
    }
    return data;
  } catch (error) {
    console.error("Error in fetchRecipes:", error instanceof Error ? error.message : error);
    return [];
  }
};

// Delete Recipe
export const deleteRecipe = async (id: number) => {
  try {
    if (!id) throw new Error("Invalid recipe ID");

    const { error } = await supabase.from("recipe").delete().eq("recipe_id", id);
    if (error) {
      console.error("Error deleting recipe:", error.message);
      throw new Error("Failed to delete recipe.");
    }
    return true;
  } catch (error) {
    console.error("Error in deleteRecipe:", error instanceof Error ? error.message : error);
    return false;
  }
};


export const resetPassword = async (email: string) => {
  try {
    if (!email || !email.includes('@')) {
      return { success: false, error: "Please provide a valid email." };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/user/reset-password', // Replace with your actual redirect URL
    });

    if (error) {
      console.error("Error sending reset password email:", error.message);
      return { success: false, error: "Failed to send password reset email." };
    }

    return { success: true, message: "Password reset email sent successfully!" };
  } catch (error) {
    console.error("Error in resetPassword:", error instanceof Error ? error.message : error);
    return { success: false, error: "An unexpected error occurred while sending the reset password email." };
  }
};

