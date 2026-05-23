"use server";

import prisma from "@/app/lib/prisma";
import { uploadToCloudinary } from "@/app/lib/cloudinaryHelper";
import { revalidatePath } from "next/cache";

export async function getActiveEvents() {
  try {
    const now = new Date();
    const events = await prisma.event.findMany({
      where: {
        endDate: {
          gte: now,
        },
      },
      orderBy: {
        startDate: "asc",
      },
    });
    return { success: true, data: events };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: "desc" }
    });
    return { success: true, data: events };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createEvent(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = formData.get("endDate") ? new Date(formData.get("endDate") as string) : null;
    const imageFile = formData.get("image") as File | null;

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageFile);
      imageUrl = await uploadToCloudinary(uploadFormData, "events");
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        startDate,
        endDate,
        imageUrl,
      },
    });

    revalidatePath("/admin/[id]/events");
    return { success: true, data: event };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateEvent(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = formData.get("endDate") ? new Date(formData.get("endDate") as string) : null;
    const imageFile = formData.get("image") as File | null;

    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) throw new Error("Event not found");

    let imageUrl = existing.imageUrl;
    if (imageFile && imageFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", imageFile);
      imageUrl = await uploadToCloudinary(uploadFormData, "events");
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        startDate,
        endDate,
        imageUrl,
      },
    });

    revalidatePath("/admin/[id]/events");
    return { success: true, data: event };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({
      where: { id },
    });
    revalidatePath("/admin/[id]/events");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getEventById(id: string) {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });
    return event;
  } catch (error: any) {
    console.error("Error fetching event by ID:", error);
    return null;
  }
}
