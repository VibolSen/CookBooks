"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

const PrivacyPolicy = () => (
  <motion.div className="mx-auto p-6 md:p-8 lg:p-12" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.7 } }}>
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-5xl mx-auto overflow-hidden lg:flex lg:flex-row-reverse">
      <div className="hidden lg:block lg:w-1/2 relative bg-blue-50 dark:bg-blue-950">
        <Image src="/privacy.png" alt="Privacy and security" fill sizes="(max-width: 1024px) 100vw, 50vw" style={{ objectFit: "cover" }} priority className="rounded-r-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
        <div className="absolute top-8 left-8 p-4 bg-white/20 backdrop-blur-md rounded-lg shadow-md text-white text-sm font-semibold flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2 text-blue-200" /> Your Trust, Our Priority
        </div>
      </div>
      <div className="p-6 md:p-8 lg:p-10 lg:w-1/2">
        <div className="flex items-center mb-6">
          <ShieldCheck className="w-9 h-9 text-blue-600 dark:text-blue-400 mr-4" />
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Privacy Policy</h2>
        </div>
        <div className="prose prose-base dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-4">
          <p>At CookBook, your privacy is paramount. We only collect personal information when necessary to provide a requested service.</p>
          <p>We retain collected information only for as long as needed. Any data we store is protected using commercially acceptable means.</p>
          <p>We do not share any personally identifying information publicly or with third parties, except where required by law.</p>
          <p>By continuing to use CookBook, you agree to our privacy practices. Feel free to <Link href="/contact-us" className="text-blue-600 hover:underline dark:text-blue-400">contact us</Link> with any questions.</p>
        </div>
      </div>
    </div>
  </motion.div>
);
export default PrivacyPolicy;
