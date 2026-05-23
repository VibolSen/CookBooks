"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import BannerSwiper from "@/app/components/BannerSwiper";
import Popular from "@/app/components/Popular";
import NewPost from "@/app/components/NewPost";
import RecipeoftheWeek from "@/app/components/RecipeoftheWeek";

export default function HomePage() {
  const { data: session } = useSession();
  const user = session?.user ? {
    user_id: (session.user as any).id,
    user_name: session.user.name || "User",
    email: session.user.email || "",
    image_url: session.user.image || null,
  } : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar user={user} />
      <div className="w-full">
        <BannerSwiper />
      </div>
      <main className="container mx-auto px-4 py-6">
        <section>
          <NewPost />
        </section>
        <section className="mt-8 mb-4">
          <RecipeoftheWeek />
        </section>
        <section>
          <Popular />
        </section>
      </main>
      <Footer />
    </main>
  );
}
