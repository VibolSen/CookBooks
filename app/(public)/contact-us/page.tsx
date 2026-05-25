"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail as Envelope, PhoneCall as Phone, MapPin } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { firstName: "", lastName: "", email: "", phone: "", message: "" };
    if (!formData.firstName) { newErrors.firstName = "First name is required"; isValid = false; }
    if (!formData.lastName) { newErrors.lastName = "Last name is required"; isValid = false; }
    if (!formData.email) { newErrors.email = "Email is required"; isValid = false; }
    if (!formData.phone) { newErrors.phone = "Phone number is required"; isValid = false; }
    if (!formData.message) { newErrors.message = "Message is required"; isValid = false; }
    setErrors(newErrors);
    if (isValid) {
      alert("Form submitted successfully!");
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <motion.div className="container mx-auto p-6 md:p-8 xl:p-10" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.7 } }}>
      <motion.div className="bg-gray-50 dark:bg-gray-900 py-12 px-6 rounded-lg shadow-xl max-w-5xl mx-auto" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Contact Us</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Any questions or feedback? Just write us a message!</p>
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact Information</h2>
              <div className="text-gray-600 dark:text-gray-300 mb-4 flex items-center"><Phone className="mr-2 h-5 w-5 text-blue-500" />+1012 3456 789</div>
              <div className="text-gray-600 dark:text-gray-300 mb-4 flex items-center"><Envelope className="mr-2 h-5 w-5 text-blue-500" />demo@gmail.com</div>
              <div className="text-gray-600 dark:text-gray-300 flex items-start"><MapPin className="mr-2 h-5 w-5 text-blue-500" /><div>Royal University of Phnom Penh<br />(110) - 023 883 640</div></div>
            </div>
          </div>
          <div className="md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="md:flex md:space-x-4">
                <div>
                  <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required className={`w-full border ${errors.firstName ? "border-red-500" : "border-gray-300"} dark:bg-gray-800 dark:text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                  {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                </div>
                <div>
                  <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required className={`w-full border ${errors.lastName ? "border-red-500" : "border-gray-300"} dark:bg-gray-800 dark:text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500`} />
                  {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                </div>
              </div>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full border border-gray-300 dark:bg-gray-800 dark:text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full border border-gray-300 dark:bg-gray-800 dark:text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <textarea name="message" placeholder="Write your message..." value={formData.message} onChange={handleChange} required className="w-full border border-gray-300 dark:bg-gray-800 dark:text-white p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" rows={4} />
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-3 rounded text-white w-full transition-colors duration-300">Send Message</button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactUs;
