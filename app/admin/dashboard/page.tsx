"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/app/actions/dashboardActions";
import { getRecipes } from "@/app/actions/recipeActions";
import { getUsers } from "@/app/actions/userActions";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  Users,
  BookOpen,
  Calendar,
  ChefHat,
  ArrowRight,
  Plus,
  Eye,
  ShieldAlert,
  CalendarDays,
  UtensilsCrossed,
} from "lucide-react";

export default function Dashboard() {
  const { status } = useSession();
  const [stats, setStats] = useState({ userCount: 0, recipeCount: 0, eventCount: 0, categoryCount: 0 });
  const [recentRecipes, setRecentRecipes] = useState<any[]>([]);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsRes, recipesRes, usersRes] = await Promise.all([
          getDashboardStats(),
          getRecipes(),
          getUsers(),
        ]);

        if (statsRes.success && statsRes.data) {
          setStats(statsRes.data);
        }
        
        // recipesRes returns array of recipes directly
        if (Array.isArray(recipesRes)) {
          setRecentRecipes(recipesRes.slice(0, 5));
        }

        if (usersRes.success && usersRes.data) {
          setRecentUsers(usersRes.data.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, router]);

  if (loading || status === "loading") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-brand-primary rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Loading Dashboard...</p>
      </div>
    );
  }

  const cards = [
    { label: "Total Users", count: stats.userCount, color: "text-blue-500 bg-blue-50 dark:bg-blue-900/10", icon: Users, path: "/admin/users" },
    { label: "Total Recipes", count: stats.recipeCount, color: "text-orange-500 bg-orange-50 dark:bg-orange-900/10", icon: BookOpen, path: "/admin/recipes" },
    { label: "Total Events", count: stats.eventCount, color: "text-purple-500 bg-purple-50 dark:bg-purple-900/10", icon: Calendar, path: "/admin/events" },
    { label: "Categories", count: stats.categoryCount, color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/10", icon: ChefHat, path: "/admin/categories" },
  ];

  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-7xl mx-auto"
    >
      {/* Banner / Welcome */}
      <section className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back, Administrator!</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Here is what is happening across your cookbook network today.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/add-recipe" className="px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-brand-white text-sm font-semibold rounded-xl transition flex items-center gap-2 shadow-sm">
            <Plus className="w-4 h-4" /> Add Recipe
          </Link>
        </div>
      </section>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((item) => (
          <Link key={item.label} href={item.path}>
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 rounded-2xl shadow-sm flex items-center justify-between hover:shadow-md transition-shadow duration-200 group">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{item.label}</h3>
                <p className="text-2xl font-black text-gray-900 dark:text-white">{item.count}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 duration-200 ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Recipes Table - Column 1 & 2 */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Recent Recipes</h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">The latest recipes submitted by members.</p>
            </div>
            <Link href="/admin/recipes" className="text-xs font-semibold text-brand-primary hover:text-brand-secondary flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          
          <div className="overflow-x-auto flex-1">
            {recentRecipes.length > 0 ? (
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 dark:bg-gray-700/30 text-xs font-bold text-gray-400 uppercase border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    <th className="px-5 py-3.5">Recipe</th>
                    <th className="px-5 py-3.5">Category</th>
                    <th className="px-5 py-3.5">Author</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                  {recentRecipes.map((recipe) => (
                    <tr key={recipe.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-700/10 transition-colors">
                      <td className="px-5 py-3.5 flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700 shrink-0">
                          <Image 
                            src={recipe.images?.[0]?.url || "/placeholder.svg"} 
                            alt={recipe.title} 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                        <span className="font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{recipe.title}</span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400">
                        {recipe.category?.name || "Uncategorized"}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 dark:text-gray-400 font-medium">
                        {recipe.user?.userName || "Anonymous"}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link href={`/recipe/${recipe.id}`} target="_blank" className="inline-flex p-1.5 text-gray-400 hover:text-brand-primary dark:hover:text-brand-white transition-colors" title="View details">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-gray-400 dark:text-gray-500">No recipes found.</div>
            )}
          </div>
        </div>

        {/* Recent Users list - Column 3 */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">Recent Users</h2>
              <p className="text-xs text-gray-400 dark:text-gray-500">Newly registered profiles.</p>
            </div>
            <Link href="/admin/users" className="text-xs font-semibold text-brand-primary hover:text-brand-secondary flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-5 flex-1 divide-y divide-gray-100 dark:divide-gray-700/50">
            {recentUsers.length > 0 ? (
              recentUsers.map((user) => (
                <div key={user.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-100 dark:border-gray-750">
                      <Image 
                        src={user.imageUrl || "/default-avatar.png"} 
                        alt={user.userName} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{user.userName}</p>
                      <p className="text-[11px] text-gray-400 dark:text-gray-500 line-clamp-1">{user.email}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${user.role === 'Admin' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'}`}>
                    {user.role}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-400 dark:text-gray-500">No users found.</div>
            )}
          </div>
        </div>

      </div>

      {/* Quick Actions & System Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Quick actions panel */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-2">
            <Link href="/admin/categories" className="flex items-center gap-3 p-3 rounded-xl border border-gray-150 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-white transition duration-200">
              <UtensilsCrossed className="w-5 h-5 text-gray-400" />
              <div className="text-left">
                <p className="text-sm font-bold">Manage Categories</p>
                <p className="text-[10px] text-gray-400">View, add or edit recipes categories</p>
              </div>
            </Link>
            <Link href="/admin/events" className="flex items-center gap-3 p-3 rounded-xl border border-gray-150 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-white transition duration-200">
              <CalendarDays className="w-5 h-5 text-gray-400" />
              <div className="text-left">
                <p className="text-sm font-bold">Manage Events</p>
                <p className="text-[10px] text-gray-400">View, schedule, or delete events</p>
              </div>
            </Link>
          </div>
        </div>

        {/* System security / alert stats */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Security & Status</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Prisma database connection is healthy. Image uploads are routed via Cloudinary.</p>
          </div>
          <div className="pt-4 flex items-center gap-3 text-emerald-600 dark:text-emerald-400">
            <div className="w-3 h-3 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-ping"></div>
            <span className="text-xs font-bold uppercase tracking-wider">All Systems Operational</span>
          </div>
        </div>

        {/* Support / Quick Help Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Admin Guidelines</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Please avoid publishing copyrighted content. Ensure event details have complete time stamps, and monitor user roles regularly.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 dark:text-gray-500">
            <ShieldAlert className="w-4 h-4 text-gray-300 dark:text-gray-600" />
            <span>Policy Version 1.2.0</span>
          </div>
        </div>

      </div>
    </motion.main>
  );
}