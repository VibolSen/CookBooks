"use client";

import { type ReactNode, useState } from "react";
import SidebarNav from "@/app/components/SidebarNav";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { Menu, X, Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertProvider } from "@/app/context/AlertContext";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = session?.user
    ? {
        user_id: (session.user as any).id || "",
        user_name: session.user.name || "User",
        email: session.user.email || "",
        image_url: session.user.image || null,
      }
    : null;

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AlertProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-violet-50/30 via-pink-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-violet-900/10 dark:to-gray-800">
        <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-20">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
            <Navbar user={user} />
          </div>
        </motion.header>

        <div className="flex flex-1 relative">
          {/* Mobile Toggle */}
          <button
            className="fixed top-20 left-4 md:hidden z-30 bg-white/90 dark:bg-gray-800/90 p-3 rounded-xl shadow-lg border border-gray-200/50"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div className="fixed inset-0 bg-black/50 z-20 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} />
            )}
          </AnimatePresence>

          {/* Sidebar */}
          <aside className={`fixed inset-y-0 left-0 w-72 z-25 md:relative md:translate-x-0 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:w-80`}>
            <div className="h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-r border-gray-200/50 shadow-xl">
              <div className="p-6 pt-8 md:pt-6">
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 rounded-full border border-violet-200 mb-3">
                    <Sparkles className="h-3 w-3 text-violet-500 mr-1.5" />
                    <span className="text-xs font-medium text-violet-700 dark:text-violet-300">Dashboard</span>
                  </div>
                  <h2 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Welcome back!</h2>
                  {user && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{user.user_name}</p>}
                </div>
                <SidebarNav user={user} />
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 relative z-10">
            <div className="min-h-full md:p-8 p-4">
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 min-h-[calc(100vh-12rem)]">
                <div className="p-6 md:p-8">{children}</div>
              </div>
            </div>
          </main>
        </div>

        <footer className="mt-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200/50">
            <Footer />
          </div>
        </footer>
      </div>
    </AlertProvider>
  );
};

export default UserLayout;