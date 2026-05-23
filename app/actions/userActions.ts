"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" }
    });
    return { success: true, data: users };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getUserProfile(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: { 
            recipes: true,
            savedRecipes: true
          }
        }
      }
    });
    return { success: true, data: user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateUser(id: string, data: any) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: {
        userName: data.userName || data.name,
        email: data.email,
        imageUrl: data.imageUrl,
        aboutMe: data.aboutMe,
      },
    });
    revalidatePath("/admin/[id]/users");
    revalidatePath(`/profile/${id}/profile`);
    return { success: true, data: user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateUserProfile(id: string, data: any) {
  return updateUser(id, data);
}

export async function changePassword(userId: string, data: { oldPassword?: string, newPassword: string }) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    if (data.oldPassword && user.password) {
      const isValid = await bcrypt.compare(data.oldPassword, user.password);
      if (!isValid) throw new Error("Invalid current password");
    }

    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword }
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });
    revalidatePath("/admin/[id]/users");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

import { uploadToCloudinary } from "@/app/lib/cloudinaryHelper";

export async function uploadUserImage(formData: FormData) {
  try {
    const url = await uploadToCloudinary(formData, "users");
    return { success: true, url };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
