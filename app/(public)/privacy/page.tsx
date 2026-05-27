"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck, ArrowLeft, Key, Lock, EyeOff, Globe } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <Key className="w-5 h-5 text-brand-primary" />,
      title: "Data Collection",
      content: "We only ask for personal information (such as your username, email, and recipe preferences) when we truly need it to provide a seamless cooking and sharing experience. We collect this data transparently and with your full consent."
    },
    {
      icon: <Lock className="w-5 h-5 text-[#FF6B00]" />,
      title: "Data Protection & Retention",
      content: "We retain collected information only for as long as necessary to provide you with your requested services. What data we store, we protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification."
    },
    {
      icon: <EyeOff className="w-5 h-5 text-indigo-500" />,
      title: "Third-Party Sharing",
      content: "We do not share any personally identifying information publicly or with third parties, except when required to do so by law (such as essential processing for secure OAuth login with Google)."
    },
    {
      icon: <Globe className="w-5 h-5 text-emerald-500" />,
      title: "User Rights",
      content: "You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services (like recipe saving or custom chef profiles)."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/30 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        className="w-full max-w-5xl mx-auto"
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

        {/* Main Glassmorphic Container */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-[2.5rem] border border-gray-150/40 dark:border-gray-800/40 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Policy text */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center border border-brand-primary/10">
                  <ShieldCheck className="w-6 h-6 text-brand-primary animate-pulse" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
                    Privacy Policy
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    Your trust and safety are our highest priorities.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-brand-primary pl-4 py-1.5 mb-8 bg-gray-50/50 dark:bg-gray-950/20 rounded-r-xl">
                <p className="text-sm text-gray-600 dark:text-gray-300 italic leading-relaxed">
                  &ldquo;At CookBook, we protect your personal credentials and recipe details like they are our own. We collect only what is necessary to power your account.&rdquo;
                </p>
              </div>

              {/* Sections list */}
              <div className="space-y-6">
                {sections.map((sec, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-9 h-9 bg-gray-50 dark:bg-gray-850 rounded-xl flex items-center justify-center border border-gray-100 dark:border-gray-800 shrink-0 mt-0.5">
                      {sec.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-base mb-1.5">{sec.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed text-justify">{sec.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800/60 text-xs text-gray-400 dark:text-gray-500">
              Have questions regarding data collection or security measures? Feel free to{" "}
              <Link href="/contact-us" className="text-brand-primary dark:text-blue-450 hover:underline font-bold">
                contact our support team
              </Link>.
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 relative bg-gradient-to-br from-brand-primary/5 to-indigo-950/5 dark:from-brand-primary/10 dark:to-transparent min-h-[350px] lg:min-h-auto flex items-center justify-center p-8 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-800/80">
            <div className="w-full h-full relative max-w-sm lg:max-w-none aspect-[4/5] rounded-[2rem] overflow-hidden border border-gray-150/50 dark:border-gray-700/50 shadow-md">
              <Image 
                src="/privacy.png" 
                alt="Privacy and Security" 
                fill 
                sizes="(max-width: 1024px) 100vw, 40vw" 
                style={{ objectFit: "cover" }} 
                priority 
                className="transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-60 pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 dark:bg-black/20 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <p className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Active Security Shields
                </p>
                <p className="text-[10px] text-blue-100 font-light mt-1">
                  Protected with industry standard SSL certificates and MongoDB Atlas network firewalls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
