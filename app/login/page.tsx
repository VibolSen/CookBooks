"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/actions/actions";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
export default function LoginPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [userProfile, setUserProfile] = useState(null); // User profile state
  const router = useRouter();

  useEffect(() => {
    // Fetch user profile from cookies or API if needed
    const fetchUserProfile = async () => {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const profile = await response.json();
        setUserProfile(profile);
      }
    };
    fetchUserProfile();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true
    setError(""); // Clear any previous errors

    const formData = new FormData(event.currentTarget);
    console.log("Form Data:", {
      email: formData.get("email"),
      password: formData.get("password"),
    }); // Log form data

    try {
      const result = await login(formData);
      console.log("Login Result:", result); // Log the result from the backend

      if (!result || !result.ok) {
        throw new Error("Network response was not ok");
      }

      if (result && result.error) {
        setError(result.error); // Display error message
      } else if (result && result.success) {
        // Redirect based on the response from the server
        console.log("Redirecting to:", result.redirect || "/"); // Log the redirect path
        router.push(result.redirect || "/"); // Default to '/' if no redirect path is provided
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Form Header */}
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h1>
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100 border border-red-300 py-2 px-4 rounded-md">
            {error}
          </p>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading} // Disable button when loading
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"} {/* Show loading text */}
          </button>
        </form>

        {/* Redirect to Register */}
        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
