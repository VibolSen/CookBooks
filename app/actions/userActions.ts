"use server";

import { supabase } from "@/app/lib/db";

// Fetch user by ID
export async function getUserById(userId: number) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user data:", error.message);
      throw new Error("Failed to fetch user data.");
    }

    return data;
  } catch (error) {
    console.error("Error in getUserById:", error instanceof Error ? error.message : error);
    throw new Error("An unexpected error occurred while fetching the user data.");
  }
}

// Update user profile
export async function updateUser(userId: number, userData: any) {
  try {
    const { user_name, email, about_me, image_url } = userData;

    // Validate required fields
    if (!user_name || !email) {
      return { success: false, error: "Name and email are required." };
    }

    // Get the currently authenticated user
    const currentUser = supabase.auth.user();

    // If no user is authenticated, return an error
    if (!currentUser) {
      return { success: false, error: "You must be logged in to update your profile." };
    }

    // Check if the current user is trying to update their own profile
    if (currentUser.id !== userId) {
      return { success: false, error: "You can only edit your own profile." };
    }

    // Check if email already exists for another user (skip if it belongs to the same user)
    const { data: existingUserWithEmail, error: emailError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .neq("user_id", userId); // Ensure that the current user is excluded

    if (emailError) {
      console.error("Error checking email uniqueness:", emailError.message);
      return { success: false, error: "Error checking email uniqueness." };
    }

    // If the email already exists for another user, return an error
    if (existingUserWithEmail && existingUserWithEmail.length > 0) {
      return { success: false, error: "Email already exists. Please use a different email." };
    }

    // Proceed to update user data in Supabase
    const { error } = await supabase
      .from("users")
      .update({ user_name, email, about_me, image_url })
      .eq("user_id", userId);

    if (error) {
      console.error("Error updating user data:", error.message);
      return { success: false, error: "Failed to update user data." };
    }

    console.log("User updated successfully!");
    return { success: true, message: "Profile updated successfully!" };
  } catch (err) {
    console.error("Error in updateUser:", err instanceof Error ? err.message : err);
    return { success: false, error: "An unexpected error occurred while updating the profile." };
  }
}
