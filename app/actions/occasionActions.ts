"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/app/lib/cloudinaryHelper";

export async function getOccasions() {
  try {
    const occasions = await prisma.occasion.findMany({
      orderBy: { name: "asc" }
    });
    return { success: true, data: occasions };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createOccasion(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const imageFile = formData.get("image") as File | null;

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageFile);
      imageUrl = await uploadToCloudinary(uploadFormData, "occasions");
    }

    const occasion = await (prisma.occasion as any).create({
      data: {
        name,
        imageUrl,
      },
    });

    revalidatePath("/admin/[id]/occasions", "page");
    return { success: true, data: occasion };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateOccasion(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const imageFile = formData.get("image") as File | null;

    const existing = await prisma.occasion.findUnique({ where: { id } });
    if (!existing) throw new Error("Occasion not found");

    let imageUrl = (existing as any).imageUrl;
    if (imageFile && imageFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageFile);
      imageUrl = await uploadToCloudinary(uploadFormData, "occasions");
    }

    const occasion = await (prisma.occasion as any).update({
      where: { id },
      data: {
        name,
        imageUrl,
      },
    });

    revalidatePath("/admin/[id]/occasions", "page");
    return { success: true, data: occasion };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteOccasion(id: string) {
  try {
    await prisma.occasion.delete({
      where: { id },
    });
    revalidatePath("/admin/[id]/occasions", "page");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
