"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { getCategories } from "@/app/actions/categoryActions";

type Category = {
  id: string;
  category_name: string;
};

export default function Navbar({ user: propUser }: { user: any }) {
  const { data: session } = useSession();
  const user = propUser || (session?.user ? {
    user_id: (session.user as any).id,
    user_name: session.user.name,
    image_url: session.user.image,
  } : null);

  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const [search, setSearch] = useState("");


  useEffect(() => {
    const fetchCats = async () => {
      const result = await getCategories();
      if (result.success && result.data) {
        setCategories(result.data.map((c: any) => ({ id: c.id, category_name: c.name })));
      }
    };
    fetchCats();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search?query=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className="relative z-30">
      <nav className="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Logo" width={40} height={40} />
                <span className="font-bold text-xl hidden sm:block">CookBook</span>
              </Link>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="hover:text-blue-600 transition">Home</Link>
              <Link href="/recipe" className="hover:text-blue-600 transition">Recipes</Link>
              <Link href="/event" className="hover:text-blue-600 transition">Events</Link>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xs mx-4 hidden sm:block">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </form>
            </div>

            {/* Profile */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link href="/add-recipe" className="hidden lg:flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">
                    <Plus className="w-4 h-4" /> Add
                  </Link>
                  <div className="relative group">
                    <Image
                      src={user.image_url || "/default-avatar.png"}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full border cursor-pointer"
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-gray-100 dark:border-gray-700 z-50">
                      <div className="p-4 border-b dark:border-gray-700">
                        <p className="font-bold truncate">{user.user_name}</p>
                      </div>
                      <Link href={`/profile/${user.user_id}/profile`} className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700">Profile</Link>
                      <button onClick={() => signOut()} className="w-full text-left p-3 text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700">Logout</button>
                    </div>
                  </div>
                </>
              ) : (
                <Link href="/login" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">Login</Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Categories Bar */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 overflow-x-auto whitespace-nowrap py-2">
        <div className="max-w-7xl mx-auto px-4 flex gap-4">
          <Link href="/popular" className="text-sm font-medium hover:text-blue-600">Popular</Link>
          <Link href="/occasion" className="text-sm font-medium hover:text-blue-600">Occasion</Link>
          {categories.map(cat => (
            <Link key={cat.id} href={`/category/${cat.id}`} className="text-sm font-medium hover:text-blue-600">{cat.category_name}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
