"use server";

import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return { success: false, error: "Missing required fields" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        userName: name,
        email,
        password: hashedPassword,
        role: "User",
      },
    });

    return { success: true, message: "User created successfully!", user: { id: user.id, email: user.email } };
  } catch (error: any) {
    console.error("Registration error:", error);
    return { success: false, error: error.message };
  }
}
