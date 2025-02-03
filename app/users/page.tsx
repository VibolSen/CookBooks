// app/users/page.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "@/app/lib/db";
import Link from "next/link";
import Image from "next/image";

// Fetch users from the database
async function getUsers() {
  try {
    const { data: users, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

// Fetch users count from the database
async function getUsersCount() {
  try {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    return count;
  } catch (error) {
    console.error("Error fetching users count:", error);
    return 0;
  }
}

export default async function UsersPage() {
  const userCookie = (await cookies()).get("user");

  // Redirect if user is not logged in
  if (!userCookie) {
    redirect("/login");
  }

  let user;
  try {
    user = JSON.parse(userCookie.value);
  } catch (e) {
    console.error("Error parsing user cookie:", e);
    redirect("/login");
  }

  // Redirect if user is not an admin
  if (!user.is_admin) {
    redirect("/");
  }

  // Fetch users from the database
  const users = await getUsers();
  const usersCount = await getUsersCount();

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
              { href: "/dashboard", label: `Dashboard (${usersCount})`, icon: "dashboard" },
              { href: "/users", label: "Users", icon: "people", active: true },
              { href: "/recipes", label: "Recipes", icon: "restaurant_menu" },
              { href: "/events", label: "Events", icon: "event" },
            ].map(({ href, label, icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-6 py-3 rounded-lg ${
                    href === "/users"
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
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Bar */}
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
            <span className="font-medium">{user.name}</span>
          </div>
        </header>

        {/* Page Title */}
        <h1 className="text-2xl font-semibold mb-4">Users Management</h1>
        <p>
          Manage users here. This section will allow you to add, edit, or remove
          users in the system.
        </p>

        {/* Users Table */}
        <div className="overflow-x-auto mt-6">
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
              {users.map((user) => (
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
                      href={`/users/edit?id=${user.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <span className="mx-2">|</span>
                    <form
                      action={`/api/users/delete?id=${user.id}`}
                      method="POST"
                    >
                      <button
                        type="submit"
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
