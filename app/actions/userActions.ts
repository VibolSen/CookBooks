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

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to fetch user data.");
  }
}

// Update user by ID
export async function updateUser(userId: number, userData: any) {
  try {
    const { user_name, email, about_me, image_url } = userData;

    // Validate required fields
    if (!user_name || !email) {
      return { success: false, error: "Name and email are required." };
    }

    // Check if the email already exists for another user (skip if it belongs to the same user)
    const { data: existingUserWithEmail, error: emailError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .neq("user_id", userId);

    if (emailError) throw emailError;
    if (existingUserWithEmail.length > 0) {
      return {
        success: false,
        error: "Email already exists. Please use a different email.",
      };
    }

    // Update user data
    const { error } = await supabase
      .from("users")
      .update({ user_name, email, about_me, image_url })
      .eq("user_id", userId);

    if (error) throw error;
    return { success: true, message: "Profile updated successfully!" };
  } catch (error) {
    console.error("Error updating user data:", error);

    // Handle network errors
    if (error instanceof Error && error.message === "Network Error") {
      return {
        success: false,
        error: "Network error. Please try again later.",
      };
    }

    return { success: false, error: "Failed to update user data." };
  }
}
