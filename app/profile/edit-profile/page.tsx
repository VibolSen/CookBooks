"use client"

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/db"; // Import your supabase client
import SidebarNav from "@/app/components/Sidebar";
import { getUserById } from "@/app/actions/userActions"; // Import your server-side actions

const EditProfile = () => {
  const [user, setUser] = useState<any>(null); // For holding the user data
  const [loading, setLoading] = useState(false); // For managing loading state during submission
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const aboutMeRef = useRef<HTMLTextAreaElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  // Get user ID from the current session or pass it from props
  const userId = 7; // Replace this with actual logged-in user ID from session/authentication

  useEffect(() => {
    // Fetch the user data when the component mounts
    const fetchUserData = async () => {
      try {
        const fetchedUser = await getUserById(userId); // Fetch user by ID
        setUser(fetchedUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]); // Run effect whenever userId changes

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameRef.current?.value || !emailRef.current?.value) {
      alert("Name and Email are required!");
      return;
    }

    setLoading(true); // Set loading state to true while updating the profile

    const updatedUser = {
      user_name: nameRef.current?.value,
      email: emailRef.current?.value,
      about_me: aboutMeRef.current?.value,
      image_url: imageUrlRef.current?.value,
    };

    // Call API to update the user
    const result = await updateUser(userId, updatedUser); // Call the server-side updateUser function

    if (result.success) {
      alert(result.message); // Show success message
      setUser({ ...user, ...updatedUser }); // Update local state with new user data
    } else {
      alert(result.error); // Show error message
    }

    setLoading(false); // Set loading state back to false
  };

  return (
    <div className="container mx-auto px-10 py-10">
      <h1 className="text-3xl font-bold mb-6 ml-[100px]">My Profile</h1>
      <div className="flex justify-center space-x-8">
        {/* Sidebar Navigation */}
        <SidebarNav />

        {/* Profile Information */}
        <div className="w-3/4 bg-white rounded-lg shadow-lg flex flex-col p-4">
          <div className="flex items-center p-6">
            <img
              src={user?.image_url || "/default-profile.png"} // Fallback image
              alt="User Avatar"
              className="rounded-full border-2 border-blue-500 w-24 h-24 object-cover"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{user?.user_name}</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-4 px-10">Edit Profile</h2>

          <form onSubmit={handleSubmit} className="px-10 py-6">
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                ref={nameRef}
                className="w-full border border-gray-300 rounded-md p-2"
                required
                defaultValue={user?.user_name || ""} // Pre-fill the name field
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                ref={emailRef}
                className="w-full border border-gray-300 rounded-md p-2"
                required
                defaultValue={user?.email || ""} // Pre-fill the email field
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">About Me</label>
              <textarea
                ref={aboutMeRef}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Tell us about yourself"
                rows={4}
                defaultValue={user?.about_me || ""} // Pre-fill the About Me field
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Profile Image URL</label>
              <input
                type="text"
                ref={imageUrlRef}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter image URL"
                defaultValue={user?.image_url || ""} // Pre-fill the image URL field
              />
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                disabled={loading} // Disable button when loading
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
