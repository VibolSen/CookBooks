"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Search, 
  ChevronDown, 
  LayoutDashboard, 
  User as UserIcon, 
  LogOut, 
  Flame, 
  Compass, 
  BookOpen, 
  Sparkles 
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { getCategories } from "@/app/actions/categoryActions";
import { motion, AnimatePresence } from "framer-motion";

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

  const isAdmin = (session?.user as any)?.role === "Admin";

  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();
  const [search, setSearch] = useState("");
  
  // Custom interactive states
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [catsOpen, setCatsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

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

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/recipe", label: "Recipes" },
    { href: "/event", label: "Events" },
  ];

  return (
    <div className="sticky top-0 z-50">
      {/* Top Premium Gradient Bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-brand-primary via-[#7B2CBF] to-[#FF6B00]" />

      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-150/40 dark:border-gray-800/40 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] transition-all duration-300 min-h-[72px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section with Framer Motion hover */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2.5 group">
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <Image 
                    src="/cook-book.png" 
                    alt="Logo" 
                    width={36} 
                    height={36} 
                    className="object-contain"
                  />
                </motion.div>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-brand-primary via-[#7B2CBF] to-[#FF6B00] bg-clip-text text-transparent hidden sm:block font-sans">
                  CookBook
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative py-1 text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-white transition-colors font-semibold text-sm"
                >
                  {link.label}
                  <AnimatePresence>
                    {hoveredLink === link.href && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary to-[#7B2CBF] rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              ))}
              
              {/* Categories Hover Dropdown with AnimatePresence */}
              <div 
                className="relative"
                onMouseEnter={() => setCatsOpen(true)}
                onMouseLeave={() => setCatsOpen(false)}
              >
                <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-white transition-colors font-semibold text-sm cursor-pointer">
                  Categories
                  <motion.div
                    animate={{ rotate: catsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {catsOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute left-0 mt-2 w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-150/40 dark:border-gray-800/40 z-50 py-2.5 overflow-hidden"
                    >
                      <Link 
                        href="/popular" 
                        onClick={() => setCatsOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-orange-50/50 dark:hover:bg-gray-800/50 hover:text-brand-primary transition-colors"
                      >
                        <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                        Popular Recipes
                      </Link>
                      <Link 
                        href="/occasion" 
                        onClick={() => setCatsOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 hover:bg-blue-50/40 dark:hover:bg-gray-800/50 hover:text-brand-primary transition-colors"
                      >
                        <Compass className="w-4 h-4 text-brand-primary shrink-0" />
                        Occasions
                      </Link>
                      <div className="border-t border-gray-100 dark:border-gray-800 my-1.5"></div>
                      
                      <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {categories.map(cat => (
                          <Link 
                            key={cat.id} 
                            href={`/category/${cat.id}`}
                            onClick={() => setCatsOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-brand-primary transition-colors"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                            <span className="truncate">{cat.category_name}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop Expanding Search Box */}
            <div className="flex-1 max-w-xs mx-6 hidden md:block">
              <form onSubmit={handleSubmit} className="relative">
                <motion.div
                  animate={{ width: searchFocused ? "260px" : "200px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="relative ml-auto"
                >
                  <input
                    type="text"
                    placeholder="Search recipes..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-gray-50/80 border border-gray-200/60 dark:bg-gray-800/80 dark:border-gray-700/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 dark:text-white"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </motion.div>
              </form>
            </div>

            {/* Desktop Profile Dropdown & Actions */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href="/add-recipe" 
                      className="flex items-center gap-1.5 bg-gradient-to-r from-brand-primary to-[#7B2CBF] hover:from-brand-secondary hover:to-[#621B9F] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      <Plus className="w-4 h-4" /> Add Recipe
                    </Link>
                  </motion.div>

                  <div 
                    className="relative"
                    onMouseEnter={() => setProfileOpen(true)}
                    onMouseLeave={() => setProfileOpen(false)}
                  >
                    <button className="flex items-center gap-1.5 focus:outline-none border border-gray-150/85 dark:border-gray-800 p-1 pr-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-200 cursor-pointer">
                      <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700">
                        <Image
                          src={user.image_url || "/default-avatar.png"}
                          alt="Profile"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <motion.div
                        animate={{ rotate: profileOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute right-0 mt-2 w-52 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-150/40 dark:border-gray-800/40 z-50 py-1.5 overflow-hidden"
                        >
                          <div className="px-4 py-2.5 border-b dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Logged in as</p>
                            <p className="font-bold text-sm text-gray-800 dark:text-gray-200 truncate mt-0.5">{user.user_name}</p>
                          </div>

                          {/* Admin Shortcut */}
                          {isAdmin && (
                            <Link 
                              href="/admin/dashboard" 
                              onClick={() => setProfileOpen(false)}
                              className="px-4 py-2.5 hover:bg-blue-50/50 dark:hover:bg-gray-800/50 hover:text-brand-primary dark:hover:text-white transition-colors duration-200 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 text-brand-primary text-xs font-bold"
                            >
                              <LayoutDashboard className="w-4 h-4 shrink-0" />
                              Admin Portal
                            </Link>
                          )}

                          <div className="py-1">
                            <Link 
                              href={`/profile/${user.user_id}/profile`} 
                              onClick={() => setProfileOpen(false)}
                              className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 text-gray-750 dark:text-gray-300 hover:text-brand-primary dark:hover:text-white transition duration-200 flex items-center gap-2.5 text-sm"
                            >
                              <UserIcon className="w-4 h-4 text-gray-400" />
                              View Profile
                            </Link>
                            <button 
                              onClick={() => signOut({ callbackUrl: "/login" })} 
                              className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 transition duration-200 flex items-center gap-2.5 text-sm cursor-pointer"
                            >
                              <LogOut className="w-4 h-4 shrink-0" />
                              Log Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                    href="/login" 
                    className="bg-brand-primary hover:bg-brand-secondary text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-blue-500/10 hover:shadow-lg"
                  >
                    Log In
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Mobile Hamburger toggle */}
            <div className="flex md:hidden items-center gap-3">
              {user && (
                <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-gray-100 dark:border-gray-700">
                  <Image
                    src={user.image_url || "/default-avatar.png"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none transition-colors"
                aria-label="Toggle Menu"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <motion.line
                    x1="3" y1="12" x2="21" y2="12"
                    animate={{ 
                      rotate: mobileMenuOpen ? 45 : 0, 
                      y: mobileMenuOpen ? 0 : 0, 
                      x1: mobileMenuOpen ? 6 : 3, 
                      y1: mobileMenuOpen ? 6 : 12, 
                      x2: mobileMenuOpen ? 18 : 21, 
                      y2: mobileMenuOpen ? 18 : 12 
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.line
                    x1="3" y1="6" x2="21" y2="6"
                    animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                    transition={{ duration: 0.15 }}
                  />
                  <motion.line
                    x1="3" y1="18" x2="21" y2="18"
                    animate={{ 
                      rotate: mobileMenuOpen ? -45 : 0, 
                      y: mobileMenuOpen ? 0 : 0, 
                      x1: mobileMenuOpen ? 6 : 3, 
                      y1: mobileMenuOpen ? 18 : 18, 
                      x2: mobileMenuOpen ? 18 : 21, 
                      y2: mobileMenuOpen ? 6 : 18 
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </svg>
              </button>
            </div>
            
          </div>
        </div>
      </nav>

      {/* Mobile Drawer menu with slide down */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-b border-gray-150/60 dark:border-gray-800/60 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-4">
              
              {/* Search bar inside mobile menu */}
              <form onSubmit={handleSubmit} className="relative w-full">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </form>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl hover:text-brand-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Category Shortcuts */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-3">
                <p className="px-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">Explore</p>
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    href="/popular" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <Flame className="w-3.5 h-3.5 text-orange-500" />
                    Popular
                  </Link>
                  <Link 
                    href="/occasion" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-xl"
                  >
                    <Compass className="w-3.5 h-3.5 text-brand-primary" />
                    Occasions
                  </Link>
                </div>
              </div>

              {/* Actions & Profiles */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col gap-2">
                {user ? (
                  <>
                    <Link 
                      href="/add-recipe" 
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-brand-primary to-[#7B2CBF] text-white text-xs font-bold py-2.5 rounded-xl transition"
                    >
                      <Plus className="w-4 h-4" /> Add Recipe
                    </Link>

                    {isAdmin && (
                      <Link 
                        href="/admin/dashboard" 
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full flex items-center justify-center gap-2 bg-blue-50 dark:bg-gray-800 text-brand-primary dark:text-blue-400 text-xs font-bold py-2.5 rounded-xl border border-blue-100 dark:border-gray-700"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Portal
                      </Link>
                    )}

                    <Link
                      href={`/profile/${user.user_id}/profile`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center text-sm text-gray-650 dark:text-gray-300 py-2 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-850"
                    >
                      My Profile
                    </Link>

                    <button 
                      onClick={() => {
                        setMobileMenuOpen(false);
                        signOut({ callbackUrl: "/login" });
                      }}
                      className="w-full text-center text-sm text-red-600 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition cursor-pointer"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <Link 
                    href="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center bg-brand-primary text-white text-sm font-bold py-2.5 rounded-xl transition"
                  >
                    Log In
                  </Link>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
