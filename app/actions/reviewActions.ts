"use server";

import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createReview(recipeId: string, userId: string, comment: string, rating: number = 5) {
  try {
    const review = await prisma.review.create({
      data: {
        recipeId,
        userId,
        comment,
        rating,
      },
      include: {
        user: true
      }
    });

    revalidatePath(`/recipe/${recipeId}`);
    return { success: true, data: review };
  } catch (error: any) {
    console.error("Error creating review:", error);
    return { success: false, error: error.message };
  }
}

export async function upsertReview(recipeId: string, userId: string, data: { rating: number, comment: string }) {
  try {
    const review = await (prisma.review as any).upsert({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      },
      update: {
        rating: data.rating,
        comment: data.comment,
      },
      create: {
        recipeId,
        userId,
        rating: data.rating,
        comment: data.comment,
      }
    });

    revalidatePath(`/recipe/${recipeId}`);
    return { success: true, data: review };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getUserReviewForRecipe(recipeId: string, userId: string) {
  try {
    const review = await (prisma.review as any).findUnique({
      where: {
        userId_recipeId: {
          userId,
          recipeId
        }
      }
    });
    return { success: true, data: review };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getReviewsByRecipe(recipeId: string) {
  try {
    const reviews = await prisma.review.findMany({
      where: { recipeId },
      include: {
        user: true
      },
      orderBy: { createdAt: "desc" }
    });
    return { success: true, data: reviews };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
