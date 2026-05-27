"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, Users, Star, Sparkles, Heart, Share2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { getEventById } from "@/app/actions/eventActions";
import { motion } from "framer-motion";
import { Badge } from "@/app/components/ui/badge";

interface EventData {
 id: string;
 title: string;
 description: string | null;
 startDate: string | Date;
 endDate: string | Date | null;
 imageUrl: string | null;
 createdAt: string | Date;
 updatedAt: string | Date;
}

const EventDetailPage: React.FC = () => {
 const { id } = useParams();
 const router = useRouter();
 const eventId = id as string;
 const [event, setEvent] = useState<EventData | null>(null);
 const [error, setError] = useState<string | null>(null);
 const [loading, setLoading] = useState<boolean>(true);

 useEffect(() => {
 const fetchEvent = async () => {
 setLoading(true);
 setError(null);
 try {
 if (!eventId) { setError("Invalid event ID."); return; }
 const eventData = await getEventById(eventId);
 if (eventData) { setEvent(eventData); } else { setError("Event not found."); }
 } catch (err) {
 console.error("Error fetching event:", err);
 setError("Failed to load event.");
 } finally {
 setLoading(false);
 }
 };
 fetchEvent();
 }, [eventId]);

 const isUpcoming = (dateString: string | Date) => new Date(dateString) > new Date();
 const isToday = (dateString: string | Date) => {
 const today = new Date();
 const eventDate = new Date(dateString);
 return today.getDate() === eventDate.getDate() && today.getMonth() === eventDate.getMonth() && today.getFullYear() === eventDate.getFullYear();
 };

 const handleShare = async () => {
 if (navigator.share) {
 try { await navigator.share({ title: event?.title, text: event?.description || "Check out this event!", url: window.location.href }); }
 catch (err) { console.log("Error sharing:", err); }
 } else {
 navigator.clipboard.writeText(window.location.href);
 alert("Link copied to clipboard!");
 }
 };

 if (loading) return (
 <div className="min-h-screen bg-gray-50 flex items-center justify-center">
 <div className="text-center">
 <Calendar className="h-16 w-16 text-purple-500 animate-bounce mx-auto mb-4" />
 <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">Loading event details...</h2>
 </div>
 </div>
 );

 if (error || !event) return (
 <div className="min-h-screen flex items-center justify-center">
 <div className="text-center max-w-md p-8">
 <div className="text-6xl mb-4"></div>
 <h2 className="text-2xl font-bold mb-2">Oops!</h2>
 <p className="text-red-500 mb-4">{error || "Event not found."}</p>
 <button onClick={() => router.back()} className="px-6 py-3 bg-red-500 text-white rounded-xl">Go Back</button>
 </div>
 </div>
 );

 return (
 <div className="min-h-screen bg-gray-50 ">
 <motion.div className="container mx-auto px-4 md:px-8 lg:px-16 py-8" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.8 } }}>
 <motion.button onClick={() => router.back()} className="flex items-center mb-6 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
 <ArrowLeft className="h-5 w-5 mr-2" /> Back to Events
 </motion.button>

 <div className="relative mb-12">
 <div className="relative overflow-hidden rounded-3xl shadow-2xl">
 <Image src={event.imageUrl || "/placeholder.svg"} alt={event.title} width={1200} height={600} unoptimized className="w-full h-64 md:h-96 lg:h-[500px] object-cover" />
 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
 <div className="absolute top-6 left-6">
 {isToday(event.startDate) ? <Badge className="bg-red-500 text-white border-0 px-4 py-2 font-bold animate-pulse"> HAPPENING NOW!</Badge>
 : isUpcoming(event.startDate) ? <Badge className="bg-green-500 text-white border-0 px-4 py-2 font-bold"> Upcoming Event</Badge>
 : <Badge className="bg-gray-500 text-white border-0 px-4 py-2 font-bold"> Past Event</Badge>}
 </div>
 <div className="absolute top-6 right-6 flex space-x-3">
 <button onClick={handleShare} className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30"><Share2 className="h-5 w-5" /></button>
 <button className="bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30"><Heart className="h-5 w-5" /></button>
 </div>
 <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
 <motion.h1 className="text-3xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>{event.title}</motion.h1>
 </div>
 </div>
 </div>

 <div className="mb-12">
 <motion.section className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg p-8" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
 <div className="flex items-center mb-6">
 <div className="bg-gray-50 w-12 h-12 rounded-full flex items-center justify-center mr-4"><Sparkles className="h-6 w-6 text-white" /></div>
 <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">About This Event</h2>
 </div>
 <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{event.description || "Join us for an unforgettable culinary experience!"}</p>
 </motion.section>
 </div>

 <motion.section className="bg-gray-50 rounded-2xl shadow-lg p-8 mb-8" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
 <div className="text-center">
 <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Ready for an Amazing Experience? </h3>
 <div className="flex items-center justify-center space-x-8 text-sm text-gray-600 dark:text-gray-400">
 <div className="flex items-center"><Star className="h-4 w-4 text-yellow-400 mr-1" /><span>5-star rated events</span></div>
 <div className="flex items-center"><Users className="h-4 w-4 text-blue-500 mr-1" /><span>Community focused</span></div>
 <div className="flex items-center"><Heart className="h-4 w-4 text-red-500 mr-1" /><span>Made with love</span></div>
 </div>
 </div>
 </motion.section>
 </motion.div>
 </div>
 );
};

export default EventDetailPage;
