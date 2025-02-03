import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { supabase } from "@/app/lib/db"; // Import your database query function
import ProfileImageModal from "./ProfileImageModal"; // Import the Client Component

interface User {
  user_id: number;
  user_name: string;
  email: string;
  about_me: string;
  image_url: string; // Ensure this field exists in your database
}

const Profile = async () => {
  // Get the user ID from the cookie
  const userCookie = (await cookies()).get("user"); // Await the cookies() function
  console.log("User cookie:", userCookie); // Debug log

  let userData = null;
  try {
    if (userCookie) {
      userData = JSON.parse(userCookie.value); // Parse the cookie value
      console.log("User data from cookie:", userData); // Debug log
    } else {
      console.log("No user cookie found."); // Debug log
    }
  } catch (err) {
    console.error("Failed to parse user cookie:", err); // Debug log
    return <p className="text-red-500">Invalid user data. Please log in again.</p>;
  }

  let user: User | null = null;
  let error: string | null = null;

  if (userData) {
    try {
      console.log("Fetching user data from Supabase..."); // Debug log
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', userData.id)
        .single();

      if (fetchError) {
        throw fetchError;
      }

      user = data;
      console.log("User found:", user); // Debug log
    } catch (err) {
      console.error("Failed to fetch user data:", err); // Debug log
      error = "Failed to fetch user data. Please try again later.";
    }
  } else {
    console.log("No user data found in cookies."); // Debug log
    error = "No user data found. Please log in.";
  }

  return (
    <div className="container mx-auto px-10 py-10">
      <h1 className="text-3xl font-bold mb-6 ml-[100px]">My Profile</h1>
      <div className="flex justify-center space-x-8">
        {/* Sidebar */}
        <nav className="mt-8">
          <ul className="space-y-4">
            {[
              { href: "/", label: "Home", icon: "home", active: true },
              { href: "/edit-profile", label: "Edit Profile", icon: "edit", active: false },
              { href: "/my-recipes", label: "My Recipes", icon: "work", active: false },
              { href: "/reset-password", label: "Reset Password", icon: "lock", active: false },
              { href: "/save", label: "Save", icon: "save", active: false },
            ].map(({ href, label, icon, active }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    active
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
        {/* Profile Information */}
        <div className="w-3/4 bg-white rounded-lg shadow-lg flex flex-col p-4">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : user ? (
            <>
              <div className="flex items-center p-6">
                {/* Use the ProfileImageModal component */}
                <ProfileImageModal imageUrl={user.image_url} />
                <div className="ml-4">
                  <h1 className="text-2xl font-bold">{user.user_name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <h2 className="text-2xl font-semibold mt-4 px-10">About Me</h2>
              <p className="mt-2 px-10">
                {user.about_me || "No information available."}
              </p>
            </>
          ) : (
            <p className="text-gray-700">Loading user information...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

