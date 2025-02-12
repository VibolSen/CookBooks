import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { supabase } from "@/app/lib/db";
import ProfileImageModal from "../../components/ProfileImageModal";
import SidebarNav from "../../components/Sidebar"

// User type definition
interface User {
  user_id: number;
  user_name: string;
  email: string;
  about_me?: string;
  image_url?: string;
}

// The Profile component
const Profile = async () => {
  let user: User | null = null;
  let error: string | null = null;

  // Fetch cookies safely (awaited to avoid error)
  const cookieStore = await cookies(); // <-- Use await
  const userCookie = cookieStore.get("user");

  // If no user session is found, show a login link
  if (!userCookie) {
    console.warn("⚠️ No user cookie found.");
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 text-lg font-semibold">
          No user session found. Please{" "}
          <Link href="/login" className="text-blue-500 underline">
            log in
          </Link>.
        </p>
      </div>
    );
  }

  // Parse the user cookie and handle errors
  try {
    const userData = JSON.parse(userCookie.value);
    console.log("✅ User data from cookie:", userData);

    // Ensure the user id is an integer before querying Supabase
    const userId = parseInt(userData.id, 10); // <-- Convert string to integer if needed

    if (isNaN(userId)) {
      throw new Error("Invalid user ID in cookie.");
    }

    // Fetch user data from Supabase
    const { data, error: fetchError } = await supabase
      .from("users")
      .select("user_id, user_name, email, about_me, image_url")
      .eq("user_id", userId) // <-- Use integer user_id
      .single();

    if (fetchError) {
      throw fetchError;
    }

    // Handle no data found
    if (!data) {
      console.warn("⚠️ No user found in Supabase.");
      error = "User not found. Please try again.";
    } else {
      user = data;
      console.log("✅ User found:", user);
    }
  } catch (err) {
    console.error("❌ Error fetching user data:", err);
    error = "Failed to fetch user data. Please try again later.";
  }

  // Render the profile UI
  return (
    <div className="container mx-auto px-10 py-10">
      <h1 className="text-3xl font-bold mb-6 ml-[100px]">My Profile</h1>
      <div className="flex justify-center space-x-8">
<SidebarNav />

        {/* Profile Information */}
        <div className="w-3/4 bg-white rounded-lg shadow-lg flex flex-col p-6">
          {error ? (
            <p className="text-red-500">{error}</p> // Error Message
          ) : user ? (
            <>
              {/* Profile details */}
              <div className="flex items-center">
                <ProfileImageModal imageUrl={user.image_url} /> {/* Profile Image Modal */}
                <div className="ml-4">
                  <h1 className="text-2xl font-bold">{user.user_name}</h1>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              {/* About Me Section */}
              <h2 className="text-2xl font-semibold mt-6">About Me</h2>
              <p className="mt-2">{user.about_me || "No information available."}</p>
            </>
          ) : (
            <p className="text-gray-700">Loading user information...</p> // Loading Message
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
