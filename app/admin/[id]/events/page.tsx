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
} from "lucide-react";
import Image from "next/image";
import EventModal from "@/app/components/Event-modal";

export default function EventsManagement() {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const result = await getEvents();
    if (result.success && result.data) {
      setEvents(result.data);
      setFilteredEvents(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.filter(e => 
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, events]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      const res = await deleteEvent(id);
      if (res.success) fetchData();
      else setError(res.error);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading Events...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-2"><Calendar className="text-indigo-500" /> Events Management</h1>
        <button onClick={() => { setEditingEvent(null); setIsModalOpen(true); }} className="bg-indigo-600 text-white px-6 py-2 rounded-xl flex items-center gap-2">
           <Plus /> Add Event
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl flex items-center gap-2">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-auto font-bold">×</button>
        </div>
      )}

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
           <input 
             type="text" 
             placeholder="Search events..." 
             className="w-full pl-10 pr-4 py-2 border rounded-xl"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
        <div className="flex gap-2">
           <button onClick={() => setViewMode("grid")} className={`p-2 rounded ${viewMode === "grid" ? "bg-indigo-100 text-indigo-600" : ""}`}><Grid3X3 /></button>
           <button onClick={() => setViewMode("list")} className={`p-2 rounded ${viewMode === "list" ? "bg-indigo-100 text-indigo-600" : ""}`}><List /></button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredEvents.map(e => (
            <div key={e.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <div className="relative h-48">
                 <Image src={e.imageUrl || "/placeholder.svg"} alt={e.title} fill className="object-cover" />
              </div>
              <div className="p-6 flex-1">
                 <h3 className="font-bold text-xl mb-2">{e.title}</h3>
                 <p className="text-gray-500 text-sm mb-4 line-clamp-2">{e.description}</p>
                 <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs font-bold text-gray-400">{new Date(e.startDate).toLocaleDateString()}</span>
                    <div className="flex gap-2">
                       <button onClick={() => { setEditingEvent(e); setIsModalOpen(true); }} className="text-amber-500"><Edit className="w-5 h-5" /></button>
                       <button onClick={() => handleDelete(e.id)} className="text-red-500"><Trash2 className="w-5 h-5" /></button>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow overflow-hidden">
           <table className="w-full text-left">
              <thead className="bg-gray-50 border-b">
                 <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Start Date</th>
                    <th className="p-4">Actions</th>
                 </tr>
              </thead>
              <tbody>
                 {filteredEvents.map(e => (
                    <tr key={e.id} className="border-b">
                       <td className="p-4 font-bold">{e.title}</td>
                       <td className="p-4">{new Date(e.startDate).toLocaleDateString()}</td>
                       <td className="p-4 flex gap-4">
                          <button onClick={() => { setEditingEvent(e); setIsModalOpen(true); }} className="text-amber-500"><Edit /></button>
                          <button onClick={() => handleDelete(e.id)} className="text-red-500"><Trash2 /></button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}

      <EventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editingEvent={editingEvent} 
        onEventSaved={() => fetchData()} 
        onError={(msg) => alert(msg)} 
      />
    </div>
  );
}
