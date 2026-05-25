"use client";

import { useState, useEffect, useCallback } from "react";
import { getOccasions, deleteOccasion } from "@/app/actions/occasionActions";
import Image from "next/image";
import AddOccasionModal from "@/app/components/AddOccasionModal";
import EditOccasionModal from "@/app/components/EditOccasionModal";
import DeleteConfirmationModal from "@/app/components/DeleteConfirmationModal";
import OccasionDetailModal from "@/app/components/OccasionDetailModal";
import { motion } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Grid3X3,
  List,
  Calendar,
  PartyPopper,
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
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);

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

  const fetchOccasions = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getOccasions();
      if (!result.success) throw new Error(result.error);
      const data = (result.data || []).map((occ: any) => ({
        id: occ.id,
        name: occ.name,
        occasion_image: occ.occasion_image || "",
        categoryId: occ.categoryId,
        category: occ.category ? { category_name: occ.category.category_name } : null,
      }));
      setOccasions(data);
    } catch (err: any) {
      setError(err.message || "Error fetching occasions");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOccasion = async (id: string) => {
    try {
      const result = await deleteOccasion(id);
      if (!result.success) throw new Error(result.error);
      setSuccessMessage("Occasion deleted successfully!");
      fetchOccasions();
    } catch (error: any) {
      setError(`Error deleting occasion: ${error.message}`);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <PartyPopper className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Loading Occasions
          </h3>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section */}
      <motion.div className="mb-8" variants={cardVariants}>
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
            <PartyPopper className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Occasions
            </h1>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Total Occasions
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {occasions.length}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Success/Error Messages */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-4">
        {successMessage && (
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage(null)}>×</button>
          </div>
        )}
        {error && (
          <div className="bg-red-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <span>{error}</span>
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}
      </div>

      {/* Search and Controls */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 mb-8"
        variants={cardVariants}
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search occasions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button onClick={() => setViewMode("grid")} className={`p-2 rounded-md ${viewMode === "grid" ? "bg-white text-purple-600" : "text-gray-500"}`}><Grid3X3 className="w-5 h-5"/></button>
              <button onClick={() => setViewMode("list")} className={`p-2 rounded-md ${viewMode === "list" ? "bg-white text-purple-600" : "text-gray-500"}`}><List className="w-5 h-5"/></button>
            </div>

            <button
              onClick={() => setShowAddOccasionModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Occasion
            </button>
          </div>
        </div>
      </motion.div>

      {/* Occasions Display */}
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
        variants={cardVariants}
      >
        {viewMode === "grid" ? (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredOccasions.map((occasion) => (
                <div key={occasion.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-md">
                   <div className="relative w-full h-40 mb-4 bg-gray-200 rounded-lg overflow-hidden">
                      <Image src={occasion.occasion_image || "/placeholder.svg"} alt={occasion.name} fill className="object-cover" />
                   </div>
                   <h3 className="font-bold text-center">{occasion.name}</h3>
                   <div className="flex justify-center gap-2 mt-4">
                      <button onClick={() => { setSelectedOccasion(occasion); setShowOccasionDetailModal(true); }} className="p-2 bg-blue-500 text-white rounded-lg"><Eye className="w-4 h-4"/></button>
                      <button onClick={() => handleEditOccasion(occasion)} className="p-2 bg-amber-500 text-white rounded-lg"><Edit className="w-4 h-4"/></button>
                      <button onClick={() => handleDeleteItem(occasion.id)} className="p-2 bg-red-500 text-white rounded-lg"><Trash2 className="w-4 h-4"/></button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 uppercase text-xs font-bold text-gray-500">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOccasions.map((occasion) => (
                  <tr key={occasion.id} className="border-b dark:border-gray-600">
                    <td className="px-6 py-4 font-bold">{occasion.name}</td>
                    <td className="px-6 py-4">{occasion.category?.category_name}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => { setSelectedOccasion(occasion); setShowOccasionDetailModal(true); }} className="p-2 bg-blue-500 text-white rounded-lg"><Eye className="w-4 h-4"/></button>
                        <button onClick={() => handleEditOccasion(occasion)} className="p-2 bg-amber-500 text-white rounded-lg"><Edit className="w-4 h-4"/></button>
                        <button onClick={() => handleDeleteItem(occasion.id)} className="p-2 bg-red-500 text-white rounded-lg"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Modals */}
      <AddOccasionModal isOpen={showAddOccasionModal} onClose={() => setShowAddOccasionModal(false)} onOccasionAdded={fetchOccasions} />
      <EditOccasionModal isOpen={showEditOccasionModal} onClose={() => setShowEditOccasionModal(false)} occasion={currentOccasion} onOccasionUpdated={fetchOccasions} />
      <OccasionDetailModal isOpen={showOccasionDetailModal} onClose={() => setShowOccasionDetailModal(false)} occasion={selectedOccasion} />
      <DeleteConfirmationModal isOpen={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)} onConfirm={handleConfirmDelete} itemType="occasion" />
    </motion.div>
  );
}