"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, AlertCircle, BookOpen } from "lucide-react";

const faqs = [
  { 
    question: "How do I search for a recipe?", 
    answer: "Use the search bar located at the top of the page. You can type in dish names, ingredients, or cuisines, and we will display all matching options instantly!" 
  },
  { 
    question: "Can I save my favorite recipes?", 
    answer: "Yes! Once you are registered and logged in, simply click the bookmark icon on any recipe card to save it directly to your personal collection." 
  },
  { 
    question: "Are the recipes on this website free?", 
    answer: "Absolutely! All recipes, guides, and features on CookBook are 100% free to access, share, and enjoy." 
  },
  { 
    question: "How do I submit my own recipe?", 
    answer: "Click on the 'Add Recipe' button in the navigation bar. You will be guided through a simple step-by-step form to input ingredients, prep times, instructions, and pictures of your dish." 
  },
  { 
    question: "Are recipes suitable for special dietary needs?", 
    answer: "Yes! Every recipe includes details regarding dietary preferences. You can also filter recipes by Category or Occasion (e.g. Vegetarian, Gluten-Free, Desserts) to find exactly what fits your needs." 
  },
  { 
    question: "Can I leave a review or rating?", 
    answer: "Yes, we encourage community reviews! Under every recipe, there is a dedicated rating section where you can select star ratings and write comments explaining your cooking experience." 
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/30 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        className="w-full max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary dark:text-blue-450 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-brand-primary/10"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Support Center
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            Have questions about sharing recipes or managing your account? Explore common answers below.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index} 
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-150/40 dark:border-gray-800/40 rounded-2xl shadow-sm overflow-hidden transition-all duration-350"
                whileHover={{ y: -1, boxShadow: "0 4px 20px -2px rgba(0,0,0,0.02)" }}
              >
                {/* Header/Question Trigger */}
                <button
                  className="w-full flex justify-between items-center p-5 text-left text-gray-700 dark:text-gray-200 font-semibold text-base transition-colors hover:text-brand-primary focus:outline-none cursor-pointer"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="flex items-center gap-3 pr-4">
                    <BookOpen className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? "text-brand-primary" : "text-gray-400"}`} />
                    {item.question}
                  </span>
                  
                  {/* Rotating Chevron */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`p-1 rounded-lg shrink-0 ${isOpen ? "bg-brand-primary/10 text-brand-primary" : "bg-gray-50 dark:bg-gray-800 text-gray-400"}`}
                  >
                    <ChevronDown className="h-4.5 w-4.5" />
                  </motion.div>
                </button>

                {/* Animated Dropdown Expansion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100/50 dark:border-gray-800/50 bg-gray-50/20 dark:bg-gray-950/20 flex gap-2">
                        <div className="w-1.5 h-auto bg-brand-primary rounded-full shrink-0 mt-0.5" />
                        <p className="pl-1.5">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Help Footer */}
        <div className="text-center mt-12 p-6 bg-white/40 dark:bg-gray-900/40 rounded-2xl border border-gray-150/20 dark:border-gray-800/20 max-w-md mx-auto">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center justify-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-brand-primary" /> Still looking for answers?
          </p>
          <motion.button
            onClick={() => window.location.href = "/contact-us"}
            className="text-xs font-bold text-brand-primary dark:text-blue-450 hover:underline cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            Send us a direct message &rarr;
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
