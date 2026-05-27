"use client";

import type React from "react";
import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  ChevronLeft, 
  ChevronRight,
  LayoutDashboard, 
  Users, 
  ChefHat, 
  CalendarRange, 
  BookOpen, 
  Calendar 
} from "lucide-react";
import { motion } from "framer-motion";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  isLayoutReady: boolean;
}

const AdminSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
  isLayoutReady,
}: AdminSidebarProps) => {
  const pathname = usePathname();

  const toggleSidebarCollapse = useCallback(() => {
    setSidebarCollapsed(!sidebarCollapsed);
  }, [sidebarCollapsed, setSidebarCollapsed]);

  const menuItems = [
    {
      id: "dashboard",
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "users",
      href: "/admin/users",
      label: "Users",
      icon: Users,
    },
    {
      id: "categories",
      href: "/admin/categories",
      label: "Categories",
      icon: ChefHat,
    },
    {
      id: "occasions",
      href: "/admin/occasions",
      label: "Occasions",
      icon: CalendarRange,
    },
    {
      id: "recipes",
      href: "/admin/recipes",
      label: "Recipes",
      icon: BookOpen,
    },
    {
      id: "events",
      href: "/admin/events",
      label: "Events",
      icon: Calendar,
    },
  ];

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.aside
      className={`bg-white dark:bg-gray-800 h-screen z-40 transform transition-all duration-300 ease-in-out ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } ${
        sidebarCollapsed ? "w-20" : "w-64"
      } fixed md:relative md:translate-x-0 border-r border-gray-100 dark:border-gray-700 flex flex-col`}
      variants={sidebarVariants}
    >
      {/* Logo and Toggle Section */}
      <div className="relative flex items-center justify-between p-4 min-h-[80px]">
        {/* Logo Container */}
        <div className={`flex items-center ${sidebarCollapsed ? "mx-auto" : "pl-2"}`}>
          <Link href="/" className="flex items-center gap-2">
            <div className={`transition-all duration-300 ${sidebarCollapsed ? "scale-90" : ""}`}>
              <Image
                src="/cook-book.png"
                alt="CookBook Logo"
                width={40}
                height={40}
                style={{ width: "36px", height: "auto" }}
                className="object-contain"
              />
            </div>
            {!sidebarCollapsed && (
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                CookBook Admin
              </span>
            )}
          </Link>
        </div>

        {/* Toggle Button - Collapsed state toggle */}
        {!sidebarCollapsed ? (
          <button
            onClick={toggleSidebarCollapse}
            className="p-1.5 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 hidden md:flex items-center justify-center"
            title="Collapse sidebar"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={toggleSidebarCollapse}
            className="absolute -right-3 top-7 z-50 p-1 rounded-full border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 shadow-sm hidden md:flex items-center justify-center"
            title="Expand sidebar"
          >
            <ChevronRight className="h-3 w-3" />
          </button>
        )}

        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-1.5 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-400 md:hidden"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      {/* Divider */}
      <div className="px-4 mb-4">
        <div className="border-b border-gray-100 dark:border-gray-700"></div>
      </div>

      {/* Navigation */}
      <nav className="px-3 flex-1 overflow-y-auto scrollbar-thin">
        <ul className="space-y-1">
          {menuItems.map(({ id, href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <motion.li
                key={id}
                variants={menuItemVariants}
                initial="hidden"
                animate={isLayoutReady ? "visible" : "hidden"}
              >
                <Link
                  href={href}
                  className={`flex items-center px-3.5 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-brand-primary text-brand-white shadow-sm font-semibold"
                      : "text-gray-500 hover:text-brand-primary hover:bg-blue-50/40 dark:text-gray-300 dark:hover:bg-gray-700/50"
                  } ${sidebarCollapsed ? "md:justify-center md:px-2" : ""}`}
                  title={sidebarCollapsed ? label : ""}
                >
                  <Icon className={`h-5 w-5 shrink-0 ${isActive ? "text-white" : "text-gray-400 group-hover:text-brand-primary"}`} />
                  {!sidebarCollapsed && (
                    <span className="ml-3 text-sm font-medium tracking-wide">
                      {label}
                    </span>
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default AdminSidebar;
