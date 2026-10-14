"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, BookOpen, Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Disclaimer() {
  const points = [
    {
      icon: <BookOpen className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />,
      title: "Educational & Informational Purpose",
      description: "All recipes, cooking techniques, nutrition details, and instructions provided on CookBook are curated for general educational and inspirational use. We do not provide professional culinary or dietary advice."
    },
    {
      icon: <Heart className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />,
      title: "Allergy & Dietary Disclaimers",
      description: "Users are solely responsible for reviewing ingredients list to ensure suitability regarding food allergies, health conditions, or personal dietary restrictions before preparing any recipes."
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
      title: "Preparation & Safety Risk",
      description: "Cooking involves inherent kitchen risks (such as knives, heat, and machinery). Please practice standard kitchen safety procedures and utilize proper tools when preparing any recipes."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/30 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        className="w-full max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-white transition-colors uppercase tracking-wider gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Notice Card */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-[2.5rem] border border-gray-150/40 dark:border-gray-800/40 shadow-xl overflow-hidden">
          
          {/* Warning Header */}
          <div className="bg-gradient-to-br from-amber-500 via-[#FF6B00] to-red-500 py-10 px-6 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 mb-3 animate-pulse">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Important Notice</h1>
              <p className="text-amber-100 text-xs sm:text-sm mt-1.5 font-light">Please read this recipe disclaimer carefully</p>
            </div>
          </div>

          {/* Points Listing */}
          <div className="p-8 sm:p-10 space-y-6">
            {points.map((point, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-9 h-9 bg-gray-50 dark:bg-gray-850 rounded-xl flex items-center justify-center border border-gray-100 dark:border-gray-800 shrink-0">
                  {point.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1">{point.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed text-justify">{point.description}</p>
                </div>
              </div>
            ))}

            {/* Bottom Agreement Text */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800/80 text-center">
              <p className="text-[11px] text-gray-400 dark:text-gray-500 italic leading-relaxed">
                By continuing to browse and prepare recipes on this platform, you acknowledge and agree that you are using this site at your own discretion.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
