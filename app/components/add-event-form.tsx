"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { createEvent } from "@/app/actions/eventActions";

interface AddEventFormProps {
  onEventSaved: (message: string) => void;
  onError: (error: string) => void;
}

export default function AddEventForm({ onEventSaved, onError }: AddEventFormProps) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("startDate", form.startDate);
      formData.append("endDate", form.endDate);
      if (imageFile) formData.append("image", imageFile);

      const res = await createEvent(formData);
      if (res.success) {
        onEventSaved("Event created successfully!");
        setForm({ title: "", description: "", startDate: "", endDate: "" });
        setImageFile(null);
        setImagePreview(null);
      } else {
        throw new Error(res.error);
      }
    } catch (err: any) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required className="w-full p-3 border rounded-xl" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-3 border rounded-xl" />
        <div className="grid grid-cols-2 gap-4">
          <input type="datetime-local" name="startDate" value={form.startDate} onChange={handleChange} required className="p-3 border rounded-xl" />
          <input type="datetime-local" name="endDate" value={form.endDate} onChange={handleChange} className="p-3 border rounded-xl" />
        </div>
        <input type="file" onChange={handleFileChange} className="w-full" />
        {imagePreview && <div className="relative h-40 w-full"><Image src={imagePreview} alt="Preview" fill className="object-cover rounded-xl" /></div>}
        <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white p-4 rounded-xl font-bold">
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
