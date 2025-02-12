
"use client"

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/db"; // Ensure you're importing your Supabase instance
import Link from "next/link";
import Image from "next/image";

// Fetch users from the database
async function getUsers() {
  try {
    const { data, error } = await supabase.from("users").select();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [adminName, setAdminName] = useState("Admin"); // Placeholder, change it to dynamic if needed

  useEffect(() => {
    // Fetch users when the component is mounted
    getUsers().then(setUsers);
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);
      if (error) {
        console.error("Error deleting user:", error);
        return;
      }
      setUsers(users.filter((user) => user.id !== id)); // Update state after successful delete
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

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
              { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
              { href: "/admin/users", label: "Users", icon: "people" },
              { href: "/admin/recipes", label: "Recipes", icon: "restaurant_menu" },
              { href: "/admin/events", label: "Events", icon: "event" },
            ].map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    href === "/admin/users" ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
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
            <span className="font-medium">{adminName}</span>
          </div>
        </header>

        <h1 className="text-2xl font-semibold mb-4">Users Management</h1>
        <p className="mb-4 text-gray-600">
          Manage users here. This section will allow you to add, edit, or remove users in the system.
        </p>

        <div className="overflow-x-auto mt-6 bg-white p-4 rounded-lg shadow">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Date Created</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{user.id}</td>
                    <td className="py-3 px-6 text-left">{user.name}</td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 text-left">
                      {user.is_admin ? "Admin" : "User"}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          user.status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-left">
                      <Link
                        href={`/admin/users/edit?id=${user.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <span className="mx-2">|</span>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-3 px-6 text-center text-gray-600">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <Link
            href="/admin/users/add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Add New User
          </Link>
        </div>
      </main>
    </div>
  );
}
