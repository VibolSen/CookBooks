"use client";

import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "@/app/actions/eventActions";
import {
  Calendar,
  Plus,
  Search,
  Grid3X3,
  List,
  Edit,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";
import EventModal from "@/app/components/Event-modal";
import { motion, AnimatePresence } from "framer-motion";

export default function EventsManagement() {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Custom Delete Modal State
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getEvents();
      if (result.success && result.data) {
        setEvents(result.data);
        setFilteredEvents(result.data);
      }
    } catch (err) {
      console.error("Failed to load events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.filter((e) =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (e.description && e.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [searchTerm, events]);

  const handleDelete = async () => {
    if (!deletingEventId) return;
    setError(null);
    const res = await deleteEvent(deletingEventId);
    if (res.success) {
      fetchData();
    } else {
      setError(res.error);
    }
    setDeletingEventId(null);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-brand-primary rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Loading Events...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-900/10 text-brand-primary rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Events Management</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">View, schedule, and organize community culinary events.</p>
          </div>
        </div>
        <button
          onClick={() => {
            setEditingEvent(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-brand-white text-sm font-semibold rounded-xl transition flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Event
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{error}</span>
          <button onClick={() => setError(null)} className="ml-auto text-sm font-bold">Dismiss</button>
        </div>
      )}

      {/* Search and Filters Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search events by title or description..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary dark:text-white transition duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-750 rounded-xl p-1 self-stretch sm:self-auto justify-center">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 rounded-lg transition-all duration-200 flex items-center ${
              viewMode === "grid"
                ? "bg-white dark:bg-gray-800 text-brand-primary shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg transition-all duration-200 flex items-center ${
              viewMode === "list"
                ? "bg-white dark:bg-gray-800 text-brand-primary shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Events Display Content */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden">
        {filteredEvents.length > 0 ? (
          viewMode === "grid" ? (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((e) => (
                <div
                  key={e.id}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-750 rounded-xl overflow-hidden flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full border-b border-gray-100 dark:border-gray-800">
                    <Image
                      src={e.imageUrl || "/placeholder.svg"}
                      alt={e.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base text-gray-800 dark:text-gray-100 line-clamp-1">
                        {e.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {e.description || "No description provided."}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-5 pt-3 border-t border-gray-100 dark:border-gray-800/80">
                      <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">
                        {new Date(e.startDate).toLocaleDateString()}
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => {
                            setEditingEvent(e);
                            setIsModalOpen(true);
                          }}
                          className="p-1 text-gray-400 hover:text-brand-primary hover:bg-white dark:hover:bg-gray-800 rounded transition border border-transparent hover:border-gray-100"
                          title="Edit Event"
                        >
                          <Edit className="w-4.5 h-4.5" />
                        </button>
                        <button
                          onClick={() => setDeletingEventId(e.id)}
                          className="p-1 text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-gray-800 rounded transition border border-transparent hover:border-gray-100"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 dark:bg-gray-700/30 text-xs font-bold text-gray-400 uppercase border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Start Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                  {filteredEvents.map((e) => (
                    <tr key={e.id} className="hover:bg-gray-50/30 dark:hover:bg-gray-700/10 transition-colors">
                      <td className="px-6 py-3.5 font-bold text-gray-800 dark:text-gray-200">
                        {e.title}
                      </td>
                      <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400 font-medium">
                        {new Date(e.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <div className="inline-flex gap-1.5">
                          <button
                            onClick={() => {
                              setEditingEvent(e);
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 text-gray-400 hover:text-brand-primary hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg transition"
                          >
                            <Edit className="w-4.5 h-4.5" />
                          </button>
                          <button
                            onClick={() => setDeletingEventId(e.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-gray-750 rounded-lg transition"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="text-center py-12 text-gray-400 dark:text-gray-500">
            <Calendar className="w-10 h-10 mx-auto mb-2 text-gray-300 dark:text-gray-700" />
            <p className="text-sm font-medium">No events found.</p>
          </div>
        )}
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingEvent={editingEvent}
        onEventSaved={() => fetchData()}
        onError={(msg) => setError(msg)}
      />

      {/* Delete Confirmation Modal */}
      {deletingEventId && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-sm w-full text-center shadow-xl border border-gray-100 dark:border-gray-700"
          >
            <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3 animate-pulse" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Delete Event?</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Are you sure you want to delete this event? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeletingEventId(null)}
                className="flex-1 py-2 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-750 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition shadow-sm shadow-red-200 dark:shadow-none"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
