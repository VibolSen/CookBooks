"use client";
"use client";

import { useState } from "react";
import { register } from "@/app/actions/actions";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true); // Set loading state to true
    setError(""); // Clear any previous errors

    const formData = new FormData(event.currentTarget);

    try {
      const response = await register(formData);

      const result = response;

      if (result.error) {
        throw new Error(result.error);
      }

      if (result && result.error) {
        setError(result.error); // Display error message
      } else if (result && result.success) {
        alert("Registration successful! Redirecting to home page..."); // Show success message
        router.push("/"); // Redirect to home page on success
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Your Account
        </h1>
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-100 border border-red-300 py-2 px-4 rounded-md">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <div>
            {/* <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            > */}
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

          <div>
            {/* <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            > */}
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
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading} // Disable button when loading
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Register"}{" "}
            {/* Show loading text */}
            {isLoading ? "Registering..." : "Register"}{" "}
            {/* Show loading text */}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

