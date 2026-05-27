"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserProfile } from "@/app/actions/userActions";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Heart, Edit3, Calendar, Coffee } from "lucide-react";
import Link from "next/link";

const containerVariants = {
 hidden: { opacity: 0 },
 visible: {
 opacity: 1,
 transition: { duration: 0.6, delayChildren: 0.2, staggerChildren: 0.1 }
 }
};

const itemVariants = {
 hidden: { y: 30, opacity: 0 },
 visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
};

export default function ProfilePage() {
 const { data: session } = useSession();
 const [user, setUser] = useState<any>(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
 const fetchUserData = async () => {
 if (!session?.user) return;
 setLoading(true);
 try {
 const userId = (session.user as any).id;
 const res = await getUserProfile(userId);
 if (res.success) {
 setUser(res.data);
 }
 } catch {
 // Silent error
 } finally {
 setLoading(false);
 }
 };
 fetchUserData();
 }, [session]);

 if (loading) return (
 <div className="min-h-screen flex items-center justify-center">
 <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
 </div>
 );

 if (!user) return <div className="text-center py-20">User not found</div>;

 return (
 <motion.div
 className="min-h-screen bg-gray-50 py-12 px-6"
 variants={containerVariants}
 initial="hidden"
 animate="visible"
 >
 <div className="max-w-4xl mx-auto">
 <motion.div className="text-center mb-10" variants={itemVariants}>
 <h1 className="text-4xl font-bold text-brand-black">Welcome, {user.userName}!</h1>
 </motion.div>

 <motion.div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden" variants={itemVariants}>
 <div className="bg-gray-50 p-8 flex items-center gap-6">
 <Image
 src={user.imageUrl || "/placeholder.svg"}
 alt="Avatar"
 width={120}
 height={120}
 className="rounded-full border-4 border-white shadow-lg object-cover w-32 h-32"
 />
 <div className="text-white">
 <h2 className="text-3xl font-bold">{user.userName}</h2>
 <div className="flex items-center gap-2 opacity-90">
 <Mail size={16} /> {user.email}
 </div>
 <div className="flex items-center gap-2 mt-2 text-sm opacity-80">
 <Calendar size={14} /> Joined {new Date(user.createdAt).toLocaleDateString()}
 </div>
 </div>
 <Link href={`/profile/${user.id}/edit-profile`} className="ml-auto bg-white/20 p-3 rounded-full hover:bg-white/30 transition">
 <Edit3 className="text-white" />
 </Link>
 </div>

 <div className="p-8 space-y-8">
 <div>
 <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
 <Heart className="text-pink-500" /> About Me
 </h3>
 <p className="text-gray-700 dark:text-gray-300 bg-violet-50 dark:bg-violet-900/10 p-6 rounded-2xl border border-violet-100 dark:border-violet-800/50">
 {user.aboutMe || "No bio yet. Add something about yourself!"}
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 flex items-center gap-4">
 <Coffee className="text-emerald-600" />
 <div>
 <div className="text-sm text-gray-500">Recipes Created</div>
 <div className="text-2xl font-bold">{user._count?.recipes || 0}</div>
 </div>
 </div>
 <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 flex items-center gap-4">
 <Heart className="text-blue-600" />
 <div>
 <div className="text-sm text-gray-500">Recipes Saved</div>
 <div className="text-2xl font-bold">{user._count?.savedRecipes || 0}</div>
 </div>
 </div>
 </div>
 </div>
 </motion.div>
 </div>
 </motion.div>
 );
}
