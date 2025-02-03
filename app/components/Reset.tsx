'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match.");
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      // Mock API call to reset password
      // Replace this with an actual API call to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-10 py-10">
      <h1 className="text-3xl font-bold mb-6 ml-[100px]">Reset Password</h1>
      <div className="flex justify-center space-x-8">
        {/* Sidebar */}
        <nav className="mt-8">
          <ul className="space-y-4">
            {[
              { href: "/profile", label: "Home", icon: "home" },
              { href: "/edit-profile", label: "Edit Profile", icon: "edit" },
              { href: "/my-recipes", label: "My Recipes", icon: "work" },
              { href: "/reset-password", label: "Reset Password", icon: "lock", active: true },
              { href: "/save", label: "Save", icon: "save" },
            ].map(({ href, label, icon, active }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-6 py-3 rounded-lg ${active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"}`}
                >
                  <span className="material-icons mr-3">{icon}</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Reset Password Form */}
        <div className="w-3/4 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Reset Your Password</h2>
          <form onSubmit={handleResetPassword} className="space-y-6">
            {error && (
              <div className="bg-red-100 text-red-600 p-4 rounded-md">
                <p>{error}</p>
              </div>
            )}
            {success && (
              <div className="bg-green-100 text-green-600 p-4 rounded-md">
                <p>Password reset successfully!</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Old Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-2"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">New Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md p-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Button aligned to the right */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
