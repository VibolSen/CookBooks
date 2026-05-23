"use server";

import prisma from "@/app/lib/prisma";

export async function getDashboardStats() {
  try {
    const [userCount, recipeCount, eventCount, categoryCount] = await Promise.all([
      prisma.user.count(),
      prisma.recipe.count(),
      prisma.event.count(),
      prisma.category.count(),
    ]);

    return {
      success: true,
      data: {
        userCount,
        recipeCount,
        eventCount,
        categoryCount,
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
