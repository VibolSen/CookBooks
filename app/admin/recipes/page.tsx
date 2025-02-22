"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/db";
import Link from "next/link";
import Image from "next/image";

// Fetch categories and occasions from the database
async function getCategories() {
  try {
    const { data, error } = await supabase.from("categories").select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

async function getOccasions() {
  try {
    const { data, error } = await supabase.from("occasions").select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching occasions:", error);
    return [];
  }
}

export default function RecipeManagement() {
  const [categories, setCategories] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [user, setUser] = useState({ name: "Admin" });

  useEffect(() => {
    getCategories().then(setCategories);
    getOccasions().then(setOccasions);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-center">
          <Image
            src="/logo.png"
            alt="CookBook Logo"
            width={90}
            height={90}
            className="mx-auto"
          />
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            {[
              { href: "/", label: "Home", icon: "home" },
              {
                href: "/admin/dashboard",
                label: "Dashboard",
                icon: "dashboard",
              },
              { href: "/admin/users", label: "Users", icon: "people" },
              {
                href: "/admin/recipes",
                label: "Recipes",
                icon: "restaurant_menu",
              },
              { href: "/admin/events", label: "Events", icon: "event" },
            ].map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    href === "/admin/recipes"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="material-icons mr-3">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Bar */}
        <header className="flex items-center justify-between mb-8">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg w-full max-w-md px-4 py-2"
          />
          <div className="flex items-center space-x-4">
            <Image
              src="/profile.png"
              alt="Admin Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-medium">{user.user_name}</span>{" "}
            {/* User info */}
          </div>
        </header>

        <div className="bg-gray-50 min-h-screen p-8">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Recipes Management</h1>
            <p className="text-gray-600">
              Manage recipes here. Add, edit, or remove recipes from the system.
            </p>
          </header>

          {/* Recipe Category Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Recipe Category</h2>
            <div className="grid grid-cols-4 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                >
                  <Image
                    src={category.image}
                    alt={category.category_name}
                    width={80}
                    height={80}
                    className="w-20 h-20 mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-center mb-2">
                    {category.category_name}
                  </h3>
                  <Link
                    href={`/recipes/category/${category.category_id}`}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg block mx-auto text-center"
                  >
                    View
                  </Link>
                </div>
              ))}
              <div className="flex items-center justify-center bg-gray-100 p-6 rounded-lg border-dashed border-2 border-gray-300">
                <Link
                  href="/recipes/add-category"
                  className="text-orange-500 text-lg font-medium"
                >
                  + Add Category
                </Link>
              </div>
            </div>
          </section>

          {/* Occasion Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Occasion</h2>
            <div className="grid grid-cols-4 gap-6">
              {occasions.map((occasion) => (
                <div
                  key={occasion.occasion_id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
                >
                  <Image
                    src={occasion.image}
                    alt={occasion.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold text-center mb-2">
                    {occasion.name}
                  </h3>
                  <Link
                    href={`/recipes/occasion/${occasion.occasion_id}`}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg block mx-auto text-center"
                  >
                    View
                  </Link>
                </div>
              ))}
              <div className="flex items-center justify-center bg-gray-100 p-6 rounded-lg border-dashed border-2 border-gray-300">
                <Link
                  href="/recipes/add-occasion"
                  className="text-orange-500 text-lg font-medium"
                >
                  + Add Occasion
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
