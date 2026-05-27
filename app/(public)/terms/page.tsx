"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scale, ArrowLeft, Shield, UserCheck, AlertCircle, FileText } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  const clauses = [
    {
      icon: <UserCheck className="w-5 h-5 text-brand-primary" />,
      title: "1. User Account & Security",
      content: "When registering on CookBook, you must provide accurate, current, and complete profile details. You are fully responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account."
    },
    {
      icon: <FileText className="w-5 h-5 text-[#FF6B00]" />,
      title: "2. Content Contributions",
      content: "You retain ownership of any recipes, images, reviews, and text descriptions that you upload to CookBook. However, by uploading content, you grant CookBook a perpetual, worldwide, royalty-free, non-exclusive license to display, distribute, and feature this content on our platform."
    },
    {
      icon: <Shield className="w-5 h-5 text-indigo-500" />,
      title: "3. Prohibited Conduct",
      content: "You agree not to post content that is abusive, defamatory, copyrighted by others, or otherwise harmful. You may not spam reviews, scrape recipe database elements, or attempt to compromise server infrastructure safety."
    },
    {
      icon: <AlertCircle className="w-5 h-5 text-emerald-500" />,
      title: "4. Account Moderation",
      content: "Our admin moderation team reserves the right to review, edit, or remove recipe posts, comments, or account profiles that violate our community standards, at our sole discretion, without prior notice."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/30 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        className="w-full max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Navigation & Header */}
        <div className="mb-8 flex justify-between items-center">
          <Link href="/" className="inline-flex items-center text-xs font-bold text-gray-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-white transition-colors uppercase tracking-wider gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <span className="text-[10px] bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-brand-primary/10">
            Effective: May 2026
          </span>
        </div>

        {/* Card Document Container */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-[2.5rem] border border-gray-150/40 dark:border-gray-800/40 shadow-xl overflow-hidden">
          
          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center border border-brand-primary/10">
                <Scale className="w-6 h-6 text-brand-primary animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                  Terms of Service
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  General terms and guidelines for using the CookBook platform.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-brand-primary pl-4 py-1.5 mb-8 bg-gray-50/50 dark:bg-gray-950/20 rounded-r-xl">
              <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                By accessing, registering, or sharing recipes on CookBook, you agree to comply with and be bound by the following rules and conditions of service.
              </p>
            </div>

            {/* Clauses List */}
            <div className="space-y-8">
              {clauses.map((clause, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-9 h-9 bg-gray-50 dark:bg-gray-850 rounded-xl flex items-center justify-center border border-gray-100 dark:border-gray-800 shrink-0 mt-0.5">
                    {clause.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1.5">
                      {clause.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed text-justify">
                      {clause.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Footer */}
          <div className="p-8 bg-gray-50/30 dark:bg-gray-950/30 border-t border-gray-100 dark:border-gray-800/80 text-center text-xs text-gray-400 dark:text-gray-500">
            If you have questions about accounts, copyright licensing, or community standards, please reach out to us at{" "}
            <Link href="/contact-us" className="text-brand-primary dark:text-blue-450 hover:underline font-bold">
              hello@cookbook.com
            </Link>.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
