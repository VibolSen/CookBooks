"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getEvents } from "@/app/actions/eventActions";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const result = await getEvents();
      if (result.success && result.data) setEvents(result.data);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -8, scale: 1.02 },
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short", year: "numeric", month: "short", day: "numeric",
    });
  };

  const getEventStatus = (startDate: string, endDate: string | null) => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const start = new Date(startDate); start.setHours(0, 0, 0, 0);
    const end = endDate ? new Date(endDate) : null;
    if (end) end.setHours(0, 0, 0, 0);
    const eventEnd = end || start;
    if (start <= today && eventEnd >= today) return "live";
    if (start > today) return "upcoming";
    return "past";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live": return <div className="bg-brand-primary text-brand-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">Ongoing</div>;
      case "upcoming": return <div className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-xs font-bold">Upcoming</div>;
      case "past": return <div className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold">Past</div>;
      default: return null;
    }
  };

  const categorizeEvents = () => {
    const ongoingEvent: any[] = [], upcomingEvents: any[] = [], pastEvents: any[] = [];
    events.forEach((event) => {
      const status = getEventStatus(event.startDate, event.endDate);
      if (status === "live") ongoingEvent.push(event);
      else if (status === "upcoming") upcomingEvents.push(event);
      else pastEvents.push(event);
    });
    return { ongoingEvent, upcomingEvents, pastEvents };
  };

  const { ongoingEvent, upcomingEvents, pastEvents } = categorizeEvents();

  const renderEventCard = (event: any, index: number) => {
    const status = getEventStatus(event.startDate, event.endDate);
    return (
      <Link href={`/${event.id}/event-detail`} key={event.id}>
        <motion.div
          className="group relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden cursor-pointer"
          variants={itemVariants}
          whileHover="hover"
          transition={{ delay: index * 0.1 }}
        >
          <div className="absolute top-4 left-4 z-10">{getStatusBadge(status)}</div>
          <div className="relative overflow-hidden rounded-t-3xl">
            <Image src={event.imageUrl || "/placeholder.svg"} alt={event.title} width={500} height={300} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">{event.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">{event.description || "Join us for an amazing experience!"}</p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600"><Calendar className="h-4 w-4 text-brand-primary mr-2" /><span>Starts: {formatDate(event.startDate)}</span></div>
              {event.endDate && <div className="flex items-center text-sm text-gray-600"><Clock className="h-4 w-4 text-brand-primary mr-2" /><span>Ends: {formatDate(event.endDate)}</span></div>}
            </div>
          </div>
        </motion.div>
      </Link>
    );
  };

  const renderSection = (title: string, evts: any[], emoji: string) => {
    if (!evts.length) return null;
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{title} ({evts.length})</h2>
        <motion.div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" variants={containerVariants} initial="initial" animate="animate">
          {evts.map((e, i) => renderEventCard(e, i))}
        </motion.div>
      </div>
    );
  };

  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-4">Amazing Events</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Join our incredible community events and create unforgettable memories!</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="text-sm bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full font-medium">{events.length} total events</div>
          <div className="text-sm bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full font-medium">{ongoingEvent.length} ongoing</div>
          <div className="text-sm bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full font-medium">{upcomingEvents.length} upcoming</div>
          <div className="text-sm bg-gray-100/50 text-gray-600 px-4 py-2 rounded-full font-medium">{pastEvents.length} past</div>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {[...Array(6)].map((_, i) => <div key={i} className="h-80 bg-gray-200 dark:bg-gray-700 rounded-3xl animate-pulse" />)}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16">
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No events yet. Stay tuned!</p>
        </div>
      ) : (
        <div>
          {renderSection("Ongoing Events", ongoingEvent, "")}
          {renderSection("Upcoming Events", upcomingEvents, "")}
          {renderSection("Past Events", pastEvents, "")}
        </div>
      )}
    </div>
  );
}
