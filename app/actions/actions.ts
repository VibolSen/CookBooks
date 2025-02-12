"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { supabase } from "@/app/lib/db";
import { redirect } from "next/navigation";

// 🟢 LOGIN FUNCTION
export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("Login attempt:", { email, password });

  if (!email || !password) {
    console.log("❌ Email and password are required.");
    return { ok: false, error: "Email and password are required." };
  }

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      console.log("❌ User not found.");
      return { ok: false, error: "User not found." };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("❌ Invalid password.");
      return { ok: false, error: "Invalid password." };
    }

    const userData = {
      id: user.user_id.toString(),
      user_name: user.user_name,
      email: user.email,
      role: user.role,
    };

    await (
      await cookies()
    ).set("user", JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return {
      ok: true,
      success: true,
      redirect: user.role === "Admin" ? "/admin/dashboard" : "/user/home",
    };
  } catch (error) {
    console.error("❌ Login error:", error);
    return {
      ok: false,
      error: "An error occurred during login. Please try again.",
    };
  }
}

// 🟢 REGISTER FUNCTION
export async function register(formData: FormData) {
  const user_name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log("📝 Registration attempt:", { user_name, email, password });

  if (!user_name || !email || !password) {
    console.log("❌ All fields are required.");
    return { error: "All fields are required." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const { data: existingUser, error: emailError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (emailError) throw emailError;
    if (existingUser.length > 0) {
      console.log("❌ Email already exists.");
      return { error: "Email already exists. Please use a different email." };
    }

    const { error } = await supabase.from("users").insert([
      {
        user_name,
        email,
        password: hashedPassword,
        role: "User",
        status: true,
      },
    ]);

    if (error) throw error;

    const newUser = {
      user_name,
      email,
      role: "User",
    };

    await (
      await cookies()
    ).set("user", JSON.stringify(newUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return {
      success: true,
      user: newUser,
      message: "Registration successful!",
    };
  } catch (error) {
    console.error("❌ Registration error:", error);
    return { error: "Registration failed. Please try again." };
  }
}


export async function logout() {
  const cookieStore = cookies();
  const user = cookieStore.get("user");

  if (!user) {
    return redirect("/login"); // 🔄 Redirect if already logged out
  }

  cookieStore.delete("user"); // ❌ Remove the cookie
  return redirect("/"); // 🔄 Redirect to login page
}
