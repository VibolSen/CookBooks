"use client";

import { useEffect, useState } from "react";
import { getUserById } from "@/app/actions/userActions"; // Assuming you have this function to get user data
import Link from "next/link";

interface NavbarProps {
  user: { id: string; image_url?: string } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const isLoggedIn = !!user;
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Local state for image_url

  useEffect(() => {
    // Fetch user data (including image_url) if the user is logged in
    const fetchUserData = async () => {
      if (user && user.id) {
        try {
          const userData = await getUserById(Number(user.id)); // Fetch user data
          setImageUrl(userData?.image_url || "/default-avatar.png"); // Update imageUrl state
        } catch (error) {
          console.error("Error fetching user data:", error);
          setImageUrl("/default-avatar.png"); // Fallback if error occurs
        }
      }
    };

    if (isLoggedIn) {
      fetchUserData(); // Call async function to fetch user data
    }
  }, [isLoggedIn, user]); // Dependency array, re-run when 'user' or 'isLoggedIn' changes



  return (
    <div className="div">
      <nav className="shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-[110px]">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img
                  src="/logo.png"
                  alt="CookBook Logo"
                  className="w-[50px] h-[50px] md:w-[70px] md:h-[70px] object-contain"
                />
              </Link>
            </div>
            <div className="hidden md:flex space-x-10 text-lg">
              <Link
                href="/user/home"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Home
              </Link>
              <Link
                href="/recipe"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                Recipe
              </Link>
              <Link
                href="/user/about-us"
                className="text-gray-600 hover:text-blue-600 font-medium"
              >
                About Us
              </Link>
            </div>
            <div className="flex items-center space-x-20">
              <div className="relative flex items-center">
                <input
                  type="text"
                  className="border border-gray-500 rounded-full pl-4 pr-10 py-3 text-sm"
                  placeholder="Search by name"
                />
              </div>
              <Link
                href={isLoggedIn ? "/add-recipe" : "/login"}
                className="text-lg font-medium text-blue-600 hover:text-blue-800"
              >
                + Add a Recipe
              </Link>
              <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                  <>
                    <Link href="/save" className="hover:text-gray-700">
                      <span className="material-icons text-gray-600 w-5 h-5">
                        bookmark_border
                      </span>
                    </Link>
                    {/* Profile link */}
                    <Link href="/profile/profileUser">
                      <img
                        src={imageUrl || "/default-avatar.png"} // Use the imageUrl state here
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-gray-300"
                      />
                    </Link>

                  </>
                ) : (
                  <Link
                    href="/login"
                    className="bg-blue-500 text-white px-4 py-2 rounded-full text-lg hover:bg-blue-600 transition"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="text-lg">
        <ul className="space-x-10 ml-[180px] py-4">
          <Link
            href="/event"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Event
          </Link>
          <Link
            href="/popular"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Popular
          </Link>
          <Link
            href="/soup"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Soup
          </Link>
          <Link
            href="/stir-frieds"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Stir Frieds
          </Link>
          <Link
            href="/occasions"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Occasions
          </Link>
          <Link
            href="/drinks"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Drinks
          </Link>
          <Link
            href="/dessert"
            className="text-gray-600 hover:text-blue-600 font-medium"
          >
            Dessert
          </Link>
        </ul>
      </div>
    </div>
  );
}
