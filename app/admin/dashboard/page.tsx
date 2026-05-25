"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/app/actions/dashboardActions";
import { getCategories } from "@/app/actions/categoryActions";
import { getOccasions } from "@/app/actions/occasionActions";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  User,
  MenuIcon as RestaurantMenu,
  ActivityIcon as Event,
  TypeIcon as CategoryIcon,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const { status } = useSession();
  const [stats, setStats] = useState({ userCount: 0, recipeCount: 0, eventCount: 0, categoryCount: 0 });
  const [categories, setCategories] = useState<any[]>([]);
  const [occasions, setOccasions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      const [sRes, cRes, oRes] = await Promise.all([
        getDashboardStats(),
        getCategories(),
        getOccasions(),
      ]);

      if (sRes.success && sRes.data) setStats(sRes.data);
      if (cRes.success && cRes.data) setCategories(cRes.data);
      if (oRes.success && oRes.data) setOccasions(oRes.data);
      setLoading(false);
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, router]);

  if (loading || status === "loading") return <div className="p-20 text-center">Loading Dashboard...</div>;



  return (
    <motion.main className="max-w-7xl mx-auto p-8 space-y-8">
      {/* Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-xl">
        <h1 className="text-5xl font-bold mb-4">Hello, Admin! 👋</h1>
        <p className="text-xl opacity-90">Manage your cookbook empire with style.</p>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Users", count: stats.userCount, color: "bg-blue-500", icon: User, path: `/admin/users` },
          { label: "Recipes", count: stats.recipeCount, color: "bg-green-500", icon: RestaurantMenu, path: `/admin/recipes` },
          { label: "Events", count: stats.eventCount, color: "bg-purple-500", icon: Event, path: `/admin/events` },
          { label: "Categories", count: stats.categoryCount, color: "bg-orange-500", icon: CategoryIcon, path: `/admin/categories` },
        ].map((item) => (
          <Link key={item.label} href={item.path}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100 dark:border-gray-700">
               <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                  <item.icon />
               </div>
               <h3 className="text-gray-500 font-medium">{item.label}</h3>
               <p className="text-3xl font-bold">{item.count}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Categories Horizontal Scroll */}
      <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Link href={`/admin/categories`} className="text-blue-600 flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map(cat => (
            <div key={cat.id} className="min-w-[150px] text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl shadow">
              <div className="relative w-20 h-20 mx-auto mb-2"><Image src={cat.imageUrl || "/placeholder.svg"} alt={cat.name} fill className="object-cover rounded-full" /></div>
              <p className="font-bold">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Occasions Horizontal Scroll */}
      <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Occasions</h2>
          <Link href={`/admin/occasions`} className="text-blue-600 flex items-center gap-1">View All <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {occasions.map(occ => (
            <div key={occ.id} className="min-w-[150px] text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl shadow">
               <div className="relative w-20 h-20 mx-auto mb-2"><Image src={occ.imageUrl || "/placeholder.svg"} alt={occ.name} fill className="object-cover rounded-full" /></div>
               <p className="font-bold">{occ.name}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.main>
  );
}