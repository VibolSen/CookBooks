"use server";

import prisma from "@/app/lib/prisma";
import { uploadToCloudinary } from "@/app/lib/cloudinaryHelper";
import { revalidatePath } from "next/cache";

export async function createRecipe(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const overview = formData.get("overview") as string;
    const description = formData.get("description") as string;
    const ingredients = formData.get("ingredients") as string;
    const instructions = formData.get("instructions") as string;
    const note = formData.get("note") as string;
    const prepTime = formData.get("prepTime") as string;
    const cookTime = formData.get("cookTime") as string;
    const categoryId = formData.get("categoryId") as string;
    const occasionId = formData.get("occasionId") as string;
    const userId = formData.get("userId") as string;

    // Handle multiple images
    const imageFiles = formData.getAll("images") as File[];
    const imageUrls: string[] = [];

    for (const file of imageFiles) {
      if (file && file.size > 0) {
        const imageFormData = new FormData();
        imageFormData.append("file", file);
        const url = await uploadToCloudinary(imageFormData, "recipes");
        imageUrls.push(url);
      }
    }

    const recipe = await prisma.recipe.create({
      data: {
        title,
        overview,
        description,
        ingredients,
        instructions,
        note,
        prepTime,
        cookTime,
        categoryId,
        occasionId,
        userId,
        images: {
          create: imageUrls.map(url => ({ url }))
        }
      },
      include: {
        images: true
      }
    });

    revalidatePath("/");
    revalidatePath("/recipe");
    return { success: true, message: "Recipe created successfully!", data: recipe };
  } catch (error: any) {
    console.error("Error creating recipe:", error);
    return { success: false, error: error.message };
  }
}

export async function getRecipes(filters: any = {}) {
  try {
    const recipes = await prisma.recipe.findMany({
      where: filters,
      include: {
        category: true,
        occasion: true,
        user: true,
        images: true,
        reviews: true,
      },
      orderBy: { createdAt: "desc" }
    });
    return recipes;
  } catch (error: any) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

export async function getRecipeById(id: string) {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        category: true,
        occasion: true,
        user: true,
        images: true,
        reviews: {
          include: {
            user: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    return { success: true, data: recipe };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getNewRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        user: true,
        images: true,
      },
    });
    return { success: true, data: recipes };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteRecipe(id: string) {
  try {
    await prisma.recipe.delete({
      where: { id },
    });
    revalidatePath("/admin/[id]/recipes");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getMyRecipes(userId: string) {
  try {
    const recipes = await prisma.recipe.findMany({
      where: { userId },
      include: {
        images: true,
        category: true
      },
      orderBy: { createdAt: "desc" }
    });
    return { success: true, data: recipes };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateRecipe(id: string, data: any) {
  try {
    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        prepTime: data.prepTime ? String(data.prepTime) : "0",
        cookTime: data.cookTime ? String(data.cookTime) : "0",
        ingredients: data.ingredients,
        instructions: data.instructions,
        categoryId: data.categoryId,
        occasionId: data.occasionId,
      }
    });

    if (data.images && data.images.length > 0) {
      // Delete old images and add new ones (Simplified for now)
      await prisma.image.deleteMany({ where: { recipeId: id } });
      await prisma.image.createMany({
        data: data.images.map((url: string) => ({
          url,
          recipeId: id
        }))
      });
    }

    revalidatePath(`/recipe/${id}`);
    revalidatePath(`/admin/[id]/recipes`);
    return { success: true, data: recipe };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSavedRecipes(userId: string) {
  try {
    const saved = await prisma.savedRecipe.findMany({
      where: { userId },
      include: {
        recipe: {
          include: {
            images: true,
            category: true,
            user: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return { success: true, data: saved.map((s: any) => s.recipe) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleSaveRecipe(recipeId: string, userId: string) {
  try {
    const existing = await prisma.savedRecipe.findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });

    if (existing) {
      await prisma.savedRecipe.delete({
        where: { id: existing.id }
      });
      return { success: true, saved: false };
    } else {
      await prisma.savedRecipe.create({
        data: {
          userId,
          recipeId
        }
      });
      return { success: true, saved: true };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getPopularRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      take: 12,
      include: {
        images: true,
        category: true,
        user: true,
        reviews: true
      }
    });

    return { success: true, data: recipes };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getRecipeOfTheWeek() {
  try {
    const recipe = await prisma.recipe.findFirst({
      include: {
        images: true,
        category: true,
        user: true,
        reviews: true
      }
    });
    return { success: true, data: recipe };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function uploadRecipeImage(formData: FormData) {
  try {
    const url = await uploadToCloudinary(formData, "recipes");
    return { success: true, url };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
