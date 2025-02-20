"use client";

import { useEffect, useState } from "react";
import { getUserById } from "@/app/actions/userActions";
import Link from "next/link";

interface User {
  user_id: number;
  image_url?: string;
}

interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const isLoggedIn = !!user;
  const [imageUrl, setImageUrl] = useState<string>("/default-avatar.png");

  useEffect(() => {
    if (!isLoggedIn || !user?.user_id) {
      console.log("🚨 No user ID found, skipping fetch.");
      return;
    }

    console.log("🔄 Fetching profile for user:", user.user_id);

    const fetchUserData = async () => {
      try {
        const userData = await getUserById(user.user_id);
        console.log("🔍 Debugging User Data:", userData); // Log full data
    
        if (userData?.image_url) {
          console.log("✅ Profile Image Found:", userData.image_url);
          setImageUrl(userData.image_url);
        } else {
          console.log("⚠️ No Profile Image Found, Using Default");
          setImageUrl("/default-avatar.png");
        }
      } catch (error) {
        console.error("❌ Error Fetching User Data:", error);
        setImageUrl("/default-avatar.png"); // Fallback in case of error
      }
    };
    

    fetchUserData();
  }, [user?.user_id, isLoggedIn]);

  return (
    <div>
      <nav className="shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[110px]">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="CookBook Logo"
                  className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] object-contain"
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-10 text-lg">
              <Link href="/user/home" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
              <Link href="/user/recipe" className="text-gray-600 hover:text-blue-600 font-medium">Recipe</Link>
              <Link href="/user/about-us" className="text-gray-600 hover:text-blue-600 font-medium">About Us</Link>
            </div>

            {/* Right Section (Search, Add Recipe, Profile) */}
            <div className="flex items-center space-x-20">
              {/* Search Bar */}
              <input type="text" className="border border-gray-500 rounded-full pl-4 pr-10 py-3 text-sm" placeholder="Search by name" />

              {/* Add Recipe Link */}
              <Link href={isLoggedIn ? "/add-recipe" : "/login"} className="text-lg font-medium text-blue-600 hover:text-blue-800">
                + Add a Recipe
              </Link>

              {/* Profile Section */}
              <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                  <>
                    <Link href="/save" className="hover:text-gray-700">
                      <span className="material-icons text-gray-600 w-5 h-5">bookmark_border</span>
                    </Link>
                    <Link href="/profile/profileUser">
                      <img
                        src={imageUrl || "/default-avatar.png"} // Ensure default image is used
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                      />
                    </Link>
                  </>
                ) : (
                  <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-full text-lg hover:bg-blue-600 transition">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Secondary Navigation */}
      <div className="text-lg">
        <ul className="space-x-10 ml-[180px] py-4">
          <Link href="/user/event" className="text-gray-600 hover:text-blue-600 font-medium">Event</Link>
          <Link href="/user/popular" className="text-gray-600 hover:text-blue-600 font-medium">Popular</Link>
          <Link href="/user/soup" className="text-gray-600 hover:text-blue-600 font-medium">Soup</Link>
          <Link href="/user/stir-frieds" className="text-gray-600 hover:text-blue-600 font-medium">Stir Frieds</Link>
          <Link href="/user/occasion" className="text-gray-600 hover:text-blue-600 font-medium">Occasions</Link>
          <Link href="/user/drinks" className="text-gray-600 hover:text-blue-600 font-medium">Drinks</Link>
          <Link href="/user/dessert" className="text-gray-600 hover:text-blue-600 font-medium">Dessert</Link>
        </ul>
      </div>
    </div>
  );
}
