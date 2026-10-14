"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BannerSwiper from "@/components/BannerSwiper";
import Popular from "@/components/Popular";
import NewPost from "@/components/NewPost";
import RecipeoftheWeek from "@/components/RecipeoftheWeek";

export default function HomePage() {
  const { data: session } = useSession();
  const user = session?.user ? {
    user_id: (session.user as any).id,
    user_name: session.user.name || "User",
    email: session.user.email || "",
    image_url: session.user.image || null,
  } : null;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar user={user} />
      
      <div className="w-full flex-none">
        <BannerSwiper />
      </div>
      
      <div className="container mx-auto px-4 py-12 flex-1 flex flex-col gap-16">
        <NewPost />
        <RecipeoftheWeek />
        <Popular />
      </div>
      
      <Footer />
    </main>
  );
}
