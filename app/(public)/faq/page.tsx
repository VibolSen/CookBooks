"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { question: "How do I search for a recipe?", answer: "Use the search bar at the top. Type in a keyword and explore the results!" },
  { question: "Can I save my favorite recipes?", answer: "Yes! Create an account and save recipes by clicking the save button on each recipe page." },
  { question: "Are the recipes on this website free?", answer: "Yes, all recipes are completely free to use." },
  { question: "How do I submit my own recipe?", answer: 'Visit the "Add Recipe" page and fill in the form. We\'ll review it before publishing.' },
  { question: "Are recipes suitable for special dietary needs?", answer: "Many recipes cater to dietary needs. Each recipe includes dietary information." },
  { question: "Can I leave a review?", answer: "Yes! After trying a recipe, scroll to the bottom of the recipe page to leave a review." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <motion.div className="container mx-auto p-6 md:p-8 lg:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.7 } }}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8 bg-blue-50 dark:bg-blue-900 text-center">
          <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300">Frequently Asked Questions</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400">Find answers to common questions about our website.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
          {faqs.map((item, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                <span className="text-gray-700 dark:text-gray-300">{item.question}</span>
                {openIndex === index ? <ChevronUp className="h-6 w-6 text-gray-500" /> : <ChevronDown className="h-6 w-6 text-gray-500" />}
              </div>
              {openIndex === index && <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400">{item.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
export default FAQ;
