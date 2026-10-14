"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail as Envelope, PhoneCall as Phone, MapPin, Send, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { firstName: "", lastName: "", email: "", phone: "", message: "" };
    
    if (!formData.firstName.trim()) { newErrors.firstName = "First name is required"; isValid = false; }
    if (!formData.lastName.trim()) { newErrors.lastName = "Last name is required"; isValid = false; }
    if (!formData.email.trim()) { newErrors.email = "Email is required"; isValid = false; }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = "Please enter a valid email"; isValid = false; }
    if (!formData.phone.trim()) { newErrors.phone = "Phone number is required"; isValid = false; }
    if (!formData.message.trim()) { newErrors.message = "Message is required"; isValid = false; }
    
    setErrors(newErrors);
    
    if (isValid) {
      setSubmitted(true);
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950/30 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <motion.div 
        className="w-full max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary dark:text-blue-450 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-brand-primary/10"
          >
            <Envelope className="w-3.5 h-3.5" />
            Get in touch
          </motion.div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
            Contact Us
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-lg mx-auto">
            Have questions about recipes, feedback on features, or business inquiries? Drop us a message!
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-[2rem] border border-gray-150/40 dark:border-gray-800/40 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Info Grid (with brand gradient) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-primary via-brand-secondary to-indigo-900 text-white p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-2xl" />
            
            <div className="relative z-10 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-3">Contact Information</h2>
                <p className="text-blue-100 text-sm font-light">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                    <Phone className="w-4 h-4 text-blue-200" />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Call Us</p>
                    <p className="text-sm font-semibold text-white">+1012 3456 789</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                    <Envelope className="w-4 h-4 text-blue-200" />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Email Us</p>
                    <p className="text-sm font-semibold text-white">hello@cookbook.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10 mt-1">
                    <MapPin className="w-4 h-4 text-blue-200" />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-200 font-bold uppercase tracking-wider">Visit Us</p>
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      Royal University of Phnom Penh<br />
                      Russian Federation Blvd (110)<br />
                      Phnom Penh, Cambodia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-6 border-t border-white/10 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-ping" />
              <span className="text-xs text-blue-100 font-medium">Active Support & Inquiries Open</span>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 bg-white/50 dark:bg-transparent">
            {submitted ? (
              <motion.div 
                className="h-full flex flex-col items-center justify-center text-center py-12"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent Successfully!</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                  Thank you for reaching out. We have received your message and will contact you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">First Name *</label>
                    <input 
                      type="text" 
                      name="firstName" 
                      placeholder="John" 
                      value={formData.firstName} 
                      onChange={handleChange} 
                      className={`w-full border ${errors.firstName ? "border-red-400 focus:ring-red-100" : "border-gray-200 dark:border-gray-800"} dark:bg-gray-950 dark:text-white p-3.5 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all duration-300`} 
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Last Name *</label>
                    <input 
                      type="text" 
                      name="lastName" 
                      placeholder="Doe" 
                      value={formData.lastName} 
                      onChange={handleChange} 
                      className={`w-full border ${errors.lastName ? "border-red-400 focus:ring-red-100" : "border-gray-200 dark:border-gray-800"} dark:bg-gray-950 dark:text-white p-3.5 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all duration-300`} 
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Email Address *</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="john.doe@example.com" 
                      value={formData.email} 
                      onChange={handleChange} 
                      className={`w-full border ${errors.email ? "border-red-400 focus:ring-red-100" : "border-gray-200 dark:border-gray-800"} dark:bg-gray-950 dark:text-white p-3.5 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all duration-300`} 
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="+855 12 345 678" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      className={`w-full border ${errors.phone ? "border-red-400 focus:ring-red-100" : "border-gray-200 dark:border-gray-800"} dark:bg-gray-950 dark:text-white p-3.5 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all duration-300`} 
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Your Message *</label>
                  <textarea 
                    name="message" 
                    placeholder="Write details of what you need help with or want to request..." 
                    value={formData.message} 
                    onChange={handleChange} 
                    rows={4} 
                    className={`w-full border ${errors.message ? "border-red-400 focus:ring-red-100" : "border-gray-200 dark:border-gray-800"} dark:bg-gray-950 dark:text-white p-3.5 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary transition-all duration-300`} 
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                    </p>
                  )}
                </div>

                <motion.button 
                  type="submit" 
                  className="bg-gradient-to-r from-brand-primary via-brand-secondary to-indigo-900 text-white font-bold p-3.5 rounded-xl w-full transition-all duration-300 shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-4 h-4" /> Send Message
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
