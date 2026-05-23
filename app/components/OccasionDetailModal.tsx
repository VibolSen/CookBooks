"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { XCircle } from "lucide-react";

interface OccasionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  occasion: {
    id: string;
    name: string;
    occasion_image: string;
    category?: { category_name: string } | null;
  } | null;
}

const OccasionDetailModal: React.FC<OccasionDetailModalProps> = ({
  isOpen,
  onClose,
  occasion,
}) => {
  if (!isOpen || !occasion) return null;

  return (
    <motion.div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <motion.div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Occasion Details</h3>
          <button onClick={onClose}><XCircle className="w-6 h-6" /></button>
        </div>

        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <Image
              src={occasion.occasion_image || "/placeholder.svg"}
              alt={occasion.name}
              fill
              className="rounded-full object-cover shadow-md"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">{occasion.name}</h2>
          {occasion.category && (
            <p className="text-purple-600 font-semibold mb-2">{occasion.category.category_name}</p>
          )}
          <p className="text-xs text-gray-500 break-all">ID: {occasion.id}</p>
        </div>

        <div className="flex justify-end mt-8">
          <button onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-xl font-bold">Close</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OccasionDetailModal;