"use client";
import React from "react";
import { motion } from "framer-motion";
const Disclaimer = () => (
  <motion.div className="mx-auto p-6 md:p-8 xl:p-12" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.7 } }}>
    <motion.div className="bg-white dark:bg-gray-800 m-auto rounded-xl shadow-2xl overflow-hidden xl:max-w-4xl" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12 px-6 rounded-t-xl flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center">Important Notice</h2>
        <p className="text-blue-100 text-lg mt-2 opacity-90">Please read carefully</p>
      </div>
      <div className="max-w-3xl mx-auto p-6 md:p-8 lg:p-10 text-justify">
        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-4">The recipes, ingredients, and cooking tips provided on this website are intended for informational and educational purposes only.</p>
        <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">Please be aware of any food allergies or dietary restrictions before preparing any dishes.</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 italic">Your use of this website constitutes your agreement to this disclaimer.</p>
      </div>
    </motion.div>
  </motion.div>
);
export default Disclaimer;
