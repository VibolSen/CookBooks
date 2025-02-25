"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/actions";

const SidebarNav = () => {
  const pathname = usePathname(); // Get current route

  const menuItems = [
    { href: "/profile/profileUser", label: "Home", icon: "home" },
    { href: "/profile/edit-profile", label: "Edit Profile", icon: "edit" },
    { href: "/profile/my-recipes", label: "My Recipes", icon: "work" },
    { href: "/profile/reset-password", label: "Reset Password", icon: "lock" },
    { href: "/profile/save-recipe", label: "Save", icon: "save" },
  ];

  return (
    <nav className="mt-8">
      <ul className="space-y-4">
        {menuItems.map(({ href, label, icon }) => (
          <li key={href}>
            <Link
              href={href}
              className={`flex items-center px-6 py-3 rounded-lg transition ${
                pathname === href ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="material-icons mr-3">{icon}</span>
              {label}
            </Link>
          </li>
        ))}

        {/* Logout Button */}
        <li>
          <form
            action={async () => {
              await logout(); // Call logout function
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-200 transition"
            >
              <span className="material-icons mr-3">logout</span>
              Logout
            </button>
          </form>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
