"use client"; // Designate the component as a Client Component

import { useRef, useState } from "react";
import { updateUser } from "@/app/actions/userActions";
import Link from "next/link"; // Import Link for navigation

interface User {
  user_id: number;
  user_name: string;
  email: string;
  about_me?: string;
  image_url?: string;
}

interface EditProfileProps {
  user: User | null;
}

const EditProfile = ({ user }: EditProfileProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  // Refs for form fields
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const aboutMeRef = useRef<HTMLTextAreaElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Get values from refs
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const aboutMe = aboutMeRef.current?.value;
    const imageUrl = imageUrlRef.current?.value;

    // Validate inputs
    if (!name || !email) {
      alert("Name and email are required.");
      return;
    }

    try {
      // Show the confirmation modal
      setShowModal(true);
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("An error occurred during form submission.");
    }
  };

  const handleConfirmUpdate = async () => {
    // Get values from refs
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const aboutMe = aboutMeRef.current?.value;
    const imageUrl = imageUrlRef.current?.value;

    console.log("Form values:", { name, email, aboutMe, imageUrl });

    if (!user) {
      alert("No user data available.");
      return;
    }

    // Create updated user object
    const updatedUser: User = {
      user_id: user.user_id,
      user_name: name || "",
      email: email || "",
      about_me: aboutMe || "",
      image_url: imageUrl || "",
    };

    try {
      // Update user data using Server Action
      const result = await updateUser(updatedUser.user_id, updatedUser);
      console.log("Update result:", result); // Log the result
      alert(result.message);
      setShowModal(false); // Close the modal

      // Refresh the page to reflect the updated data
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  const handleCancelUpdate = () => {
    setShowModal(false); // Close the modal without saving
  };

  if (!user) {
    return (
      <p className="text-gray-700 text-center mt-8">No user data available.</p>
    );
  }

  return (
    <div className="container mx-auto px-10 py-10">
      <h1 className="text-3xl font-bold mb-6 ml-[100px]">My Profile</h1>
      <div className="flex justify-center space-x-8">
        {/* Sidebar Navigation */}
        <nav className="mt-8">
          <ul className="space-y-4">
            {[
              { href: "/profile", label: "Home", icon: "home" },
              {
                href: "/edit-profile",
                label: "Edit Profile",
                icon: "edit",
                active: true,
              },
              { href: "/my-recipes", label: "My Recipes", icon: "work" },
              {
                href: "/reset-password",
                label: "Reset Password",
                icon: "lock",
              },
              { href: "/save", label: "Save", icon: "save" },
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
          <div className="flex items-center p-6">
            <img
              src={user.image_url || "/default-profile.png"} // Fallback image
              alt="User Avatar"
              className="rounded-full border-2 border-blue-500 w-24 h-24 object-cover"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{user.user_name}</h1>
              <p className="text-gray-600">{user.email}</p>
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
                defaultValue={user.user_name} // Pre-fill the name field
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                ref={emailRef}
                className="w-full border border-gray-300 rounded-md p-2"
                required
                defaultValue={user.email} // Pre-fill the email field
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                About Me
              </label>
              <textarea
                ref={aboutMeRef}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Tell us about yourself"
                rows={4}
                defaultValue={user.about_me || ""} // Pre-fill the About Me field
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Profile Image URL
              </label>
              <input
                type="text"
                ref={imageUrlRef}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter image URL"
                defaultValue={user.image_url || ""} // Pre-fill the image URL field
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Update</h2>
            <p>Are you sure you want to update your profile?</p>
            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={handleCancelUpdate}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmUpdate}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
