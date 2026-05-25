"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AdminSidebar from "@/app/components/AdminSlideBa";
import AdminHeader from "@/app/components/AdminHeader";
import { Noto_Sans_Khmer } from "next/font/google";

const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ["khmer"],
  weight: ["400", "700"],
});

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    if (status !== "loading") {
      if (status === "unauthenticated" || (session?.user as any)?.role !== "Admin") {
        router.push("/");
        return;
      }
      const timer = setTimeout(() => setIsLayoutReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [status, session, router]);

  const adminName = (session?.user as any)?.name || "Admin";
  const adminEmail = (session?.user as any)?.email || null;
  const adminImageUrl = (session?.user as any)?.image || null;
  const userId = (session?.user as any)?.id || null;

  const layoutVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  if (status === "loading" || !isLayoutReady) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      className={`h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden transition-colors duration-300 ${notoSansKhmer.className}`}
      variants={layoutVariants}
      initial="hidden"
      animate={isLayoutReady ? "visible" : "hidden"}
    >
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        isLayoutReady={isLayoutReady}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader
          onMobileMenuClick={() => setSidebarOpen(true)}
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onSearchFocus={() => setIsSearchFocused(true)}
          onSearchBlur={() => setIsSearchFocused(false)}
          isSearchFocused={isSearchFocused}
          adminName={adminName}
          adminImageUrl={adminImageUrl}
          adminEmail={adminEmail}
          onLogoutClick={() => signOut({ callbackUrl: "/login" })}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          isLayoutReady={isLayoutReady}
          userId={userId}
        />

        <motion.main
          className="flex-1 overflow-y-auto p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.2 } }}
        >
          <div className="mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">សូមស្វាគមន៍ {adminName} 👋</h1>
                  <p className="text-blue-100">ត្រៀមដើម្បីគ្រប់គ្រងសៀវភៅចំអិនម្ហូបរបស់អ្នក។ មកចាប់ផ្តើមបង្កើតអ្វីឆ្ងាញ់ៗថ្ងៃនេះ។</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🍳</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>{children}</div>
        </motion.main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </motion.div>
  );
};

export default AdminLayout;