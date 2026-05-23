"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/app/lib/cloudinaryHelper";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" }
    });
    return { success: true, data: categories };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createCategory(formData: FormData) {
  try {
    const name = formData.get("category_name") as string;
    const imageFile = formData.get("image") as File | null;

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageFile);
      imageUrl = await uploadToCloudinary(uploadFormData, "categories");
    }

    const category = await prisma.category.create({
      data: {
        name,
        imageUrl,
      },
    });

    revalidatePath("/admin/[id]/categories", "page");
    return { success: true, data: category };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCategory(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("category_name") as string;
    const imageFile = formData.get("image") as File | null;

    const existing = await prisma.category.findUnique({ where: { id } });
    if (!existing) throw new Error("Category not found");

    let imageUrl = existing.imageUrl;
    if (imageFile && imageFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageFile);
      imageUrl = await uploadToCloudinary(uploadFormData, "categories");
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        imageUrl,
      },
    });

    revalidatePath("/admin/[id]/categories", "page");
    return { success: true, data: category };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({
      where: { id },
    });
    revalidatePath("/admin/[id]/categories", "page");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
