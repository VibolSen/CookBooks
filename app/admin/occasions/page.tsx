"use client";

import { useState, useEffect, useCallback } from "react";
import { getOccasions, deleteOccasion } from "@/app/actions/occasionActions";
import Image from "next/image";
import AddOccasionModal from "@/app/components/AddOccasionModal";
import EditOccasionModal from "@/app/components/EditOccasionModal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import OccasionDetailModal from "@/app/components/OccasionDetailModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Grid3X3,
  List,
  CalendarRange,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

interface Occasion {
  id: string;
  name: string;
  occasion_image: string;
  categoryId: string;
  category: { category_name: string } | null;
}

export default function OccasionManagement() {
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [filteredOccasions, setFilteredOccasions] = useState<Occasion[]>([]);
  const [showAddOccasionModal, setShowAddOccasionModal] = useState(false);
  const [showEditOccasionModal, setShowEditOccasionModal] = useState(false);
  const [currentOccasion, setCurrentOccasion] = useState<Occasion | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string>("");
  const [showOccasionDetailModal, setShowOccasionDetailModal] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

  const fetchOccasions = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getOccasions();
      if (!result.success) throw new Error(result.error);
      
      // Map Prisma Occasion (imageUrl) to component key (occasion_image).
      // Prisma schema has no Category relation for Occasions, so we ignore relations.
      const data = (result.data || []).map((occ: any) => ({
        id: occ.id,
        name: occ.name,
        occasion_image: occ.imageUrl || "",
        categoryId: "",
        category: null,
      }));
      setOccasions(data);
    } catch (err: any) {
      setError(err.message || "Error fetching occasions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOccasions();
  }, []);

  const filterOccasions = useCallback(() => {
    let filtered = occasions;
    if (searchTerm) {
      filtered = filtered.filter((occasion) =>
        occasion.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredOccasions(filtered);
  }, [occasions, searchTerm]);

  useEffect(() => {
    filterOccasions();
  }, [filterOccasions]);

  const handleDeleteOccasion = async (id: string) => {
    try {
      setError(null);
      const result = await deleteOccasion(id);
      if (!result.success) throw new Error(result.error);
      
      setSuccessMessage("Occasion deleted successfully!");
      setTimeout(() => setSuccessMessage(null), 3000);
      fetchOccasions();
    } catch (err: any) {
      setError(`Error deleting occasion: ${err.message}`);
    }
  };

  const handleDeleteItem = (id: string) => {
    setItemToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    handleDeleteOccasion(itemToDelete);
    setShowDeleteConfirmation(false);
  };

  const handleEditOccasion = (occasion: Occasion) => {
    setCurrentOccasion(occasion);
    setShowEditOccasionModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-brand-primary rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Loading Occasions...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-900/10 text-brand-primary rounded-xl">
            <CalendarRange className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Occasions</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Manage dietary themes and special event occasions.</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddOccasionModal(true)}
          className="px-4 py-2 bg-brand-primary hover:bg-brand-secondary text-brand-white text-sm font-semibold rounded-xl transition flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Occasion
        </button>
      </div>

      {/* Success/Error Alerts */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{successMessage}</span>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-3"
          >
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-medium">{error}</span>
            <button onClick={() => setError(null)} className="ml-auto text-sm font-bold">Dismiss</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Mode Controls */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search occasions by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary dark:text-white transition duration-200"
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

      {/* Occasions Display */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden p-6">
        {filteredOccasions.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredOccasions.map((occasion) => (
                <div
                  key={occasion.id}
                  className="bg-gray-50 dark:bg-gray-900 border border-gray-155 dark:border-gray-755 p-4 rounded-xl flex flex-col items-center justify-between text-center group"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 shrink-0">
                    <Image
                      src={occasion.occasion_image || "/placeholder.svg"}
                      alt={occasion.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 mt-3 line-clamp-1">
                    {occasion.name}
                  </h3>
                  <div className="flex gap-1.5 mt-4 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => {
                        setSelectedOccasion(occasion);
                        setShowOccasionDetailModal(true);
                      }}
                      className="p-1 text-gray-400 hover:text-brand-primary hover:bg-white dark:hover:bg-gray-800 rounded transition border border-transparent hover:border-gray-100"
                      title="View Details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleEditOccasion(occasion)}
                      className="p-1 text-gray-400 hover:text-brand-primary hover:bg-white dark:hover:bg-gray-800 rounded transition border border-transparent hover:border-gray-100"
                      title="Edit Occasion"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(occasion.id)}
                      className="p-1 text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-gray-800 rounded transition border border-transparent hover:border-gray-100"
                      title="Delete Occasion"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto border border-gray-100 dark:border-gray-750 rounded-xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50/50 dark:bg-gray-700/30 text-xs font-bold text-gray-400 uppercase border-b border-gray-100 dark:border-gray-700">
                  <tr>
                    <th className="px-5 py-3">Image</th>
                    <th className="px-5 py-3">Occasion Name</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                  {filteredOccasions.map((occasion) => (
                    <tr
                      key={occasion.id}
                      className="hover:bg-gray-50/30 dark:hover:bg-gray-700/10 transition-colors"
                    >
                      <td className="px-5 py-2.5">
                        <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                          <Image
                            src={occasion.occasion_image || "/placeholder.svg"}
                            alt={occasion.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-5 py-2.5 font-bold text-gray-800 dark:text-gray-200">
                        {occasion.name}
                      </td>
                      <td className="px-5 py-2.5 text-right">
                        <div className="inline-flex gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedOccasion(occasion);
                              setShowOccasionDetailModal(true);
                            }}
                            className="p-1.5 text-gray-400 hover:text-brand-primary hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg transition"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditOccasion(occasion)}
                            className="p-1.5 text-gray-400 hover:text-brand-primary hover:bg-gray-50 dark:hover:bg-gray-750 rounded-lg transition"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(occasion.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-gray-750 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
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
            <CalendarRange className="w-10 h-10 mx-auto mb-2 text-gray-300 dark:text-gray-700" />
            <p className="text-sm font-medium">No occasions found.</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddOccasionModal
        isOpen={showAddOccasionModal}
        onClose={() => setShowAddOccasionModal(false)}
        onOccasionAdded={fetchOccasions}
      />
      <EditOccasionModal
        isOpen={showEditOccasionModal}
        onClose={() => setShowEditOccasionModal(false)}
        occasion={currentOccasion}
        onOccasionUpdated={fetchOccasions}
      />
      <OccasionDetailModal
        isOpen={showOccasionDetailModal}
        onClose={() => setShowOccasionDetailModal(false)}
        occasion={selectedOccasion}
      />
      <DeleteConfirmationModal
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={handleConfirmDelete}
        itemType="occasion"
      />
    </div>
  );
}