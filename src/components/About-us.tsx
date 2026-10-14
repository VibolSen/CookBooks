"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Facebook,
  Send,
  Github,
  Youtube,
  Heart,
  Star,
  ChefHat,
  Users,
  Target,
  Sparkles,
  Coffee,
  Utensils,
  Award,
  ShieldCheck,
} from "lucide-react";

export default function AboutUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.7, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-12, 12, -12],
      rotate: [0, 4, -4, 0],
      transition: {
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  const teamMembers = [
    {
      name: "Mr. Sen Vibol",
      image: "/vibol.jpg",
      role: "Lead Developer & Recipe Curator",
      description:
        "Passionate about creating seamless user experiences and discovering authentic recipes.",
      social: {
        facebook: "https://www.facebook.com/vibolsen02",
        telegram: "https://t.me/vibolsen",
        github: "https://github.com/VibolSen",
      },
    },
    {
      name: "Mr. Khorn Soukhouch",
      image: "/khouch.png",
      role: "Full-Stack Developer & Food Photographer",
      description:
        "Combines technical expertise with artistic vision to bring recipes to life.",
      social: {
        facebook: "https://www.facebook.com/khorn.saokhouch.2025",
        telegram: "https://t.me/khouch04",
        github: "https://github.com/khornSaokhouch",
      },
    },
    {
      name: "Ms. Sam Nisa",
      image: "/nisa.jpg",
      role: "UI/UX Designer & Culinary Writer",
      description:
        "Creates beautiful interfaces and crafts compelling stories behind every dish.",
      social: {
        facebook: "https://www.facebook.com/sam.nisa.35/",
        telegram: "https://t.me/Samnisa21",
        github: "https://github.com/Sam-Nisa",
      },
    },
  ];

  return (
    <div className="min-h-screen w-full relative bg-gray-50/50 dark:bg-gray-950/30">
      {/* Floating Background Accent Lights */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-brand-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-[#FF6B00]/5 blur-3xl pointer-events-none" />

      {/* Floating Kitchen Icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-24 left-12 text-brand-primary/10 dark:text-brand-primary/20"
        >
          <ChefHat size={45} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-48 right-24 text-orange-500/10 dark:text-orange-500/20"
          style={{ animationDelay: "1.5s" }}
        >
          <Utensils size={38} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-48 left-16 text-indigo-500/10 dark:text-indigo-500/20"
          style={{ animationDelay: "3s" }}
        >
          <Coffee size={32} />
        </motion.div>
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute bottom-24 right-16 text-red-500/10 dark:text-red-500/20"
          style={{ animationDelay: "4.5s" }}
        >
          <Heart size={28} />
        </motion.div>
      </div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.section
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white/80 via-white/50 to-gray-50/50 dark:from-gray-900/80 dark:via-gray-900/50 dark:to-gray-950/50 border border-gray-150/40 dark:border-gray-800/50 shadow-xl p-8 md:p-16 lg:p-20 text-center mb-16"
          variants={itemVariants}
        >
          {/* Top Decorative Sparkles */}
          <div className="absolute top-8 left-8 text-brand-primary/20 animate-pulse">
            <Sparkles size={48} />
          </div>
          <div className="absolute bottom-8 right-8 text-[#FF6B00]/20 animate-pulse">
            <Star size={36} />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary/10 to-indigo-500/10 text-brand-primary dark:text-blue-400 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-sm border border-brand-primary/10"
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              Our Culinary Journey
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white"
              variants={itemVariants}
            >
              Welcome to{" "}
              <span className="bg-gradient-to-r from-brand-primary via-[#7B2CBF] to-[#FF6B00] bg-clip-text text-transparent">
                CookBook
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-normal"
              variants={itemVariants}
            >
              Where the joy of cooking meets the art of community! Our mission is simple: 
              we love food, and we believe that every meal is an opportunity to create 
              and share stories that connect us all.
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mt-10"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2.5 bg-white dark:bg-gray-800 border border-gray-150/50 dark:border-gray-700/50 px-5 py-2.5 rounded-full shadow-sm">
                <Users className="w-5 h-5 text-brand-primary" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">3 Visionary Founders</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white dark:bg-gray-800 border border-gray-150/50 dark:border-gray-700/50 px-5 py-2.5 rounded-full shadow-sm">
                <ChefHat className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">100+ Chef Recipes</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section className="py-8" variants={itemVariants}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 text-[#FF6B00] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-[#FF6B00]/10">
              <Users className="w-3.5 h-3.5" />
              Meet Our Team
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              The Culinary Creators
            </h2>
            <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Our diverse skills blend together to build a cooking platform that is accessible, 
              beautiful, and packed with kitchen wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                className="group relative"
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-150/40 dark:border-gray-800/40 relative overflow-hidden flex flex-col justify-between h-full">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand-primary/5 to-transparent rounded-bl-[4rem] group-hover:scale-110 transition-transform duration-300" />
                  
                  <div>
                    <div className="relative mb-6 text-center">
                      <div className="w-28 h-28 mx-auto relative rounded-full p-1 border-2 border-brand-primary/20 dark:border-gray-700">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          width={112}
                          height={112}
                          className="rounded-full w-full h-full object-cover relative z-10"
                        />
                        <div className="absolute bottom-0 right-1.5 bg-brand-primary text-white p-2 rounded-full shadow-md z-25">
                          <ChefHat className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-1">
                      {member.name}
                    </h3>
                    <p className="text-brand-primary dark:text-blue-450 text-xs font-bold text-center mb-4 uppercase tracking-wider">
                      {member.role}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm text-center leading-relaxed mb-6">
                      {member.description}
                    </p>
                  </div>

                  <div className="flex justify-center gap-3.5 border-t border-gray-100 dark:border-gray-800 pt-4">
                    <motion.a
                      href={member.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-450 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary rounded-xl transition-all duration-300 shadow-sm border border-gray-100 dark:border-gray-700"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={member.social.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-450 hover:bg-[#0088cc] hover:text-white dark:hover:bg-[#0088cc] rounded-xl transition-all duration-300 shadow-sm border border-gray-100 dark:border-gray-700"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Telegram"
                    >
                      <Send className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-450 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black rounded-xl transition-all duration-300 shadow-sm border border-gray-100 dark:border-gray-700"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Vision & Values Section */}
        <motion.section
          className="py-16"
          variants={itemVariants}
        >
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-[2.5rem] border border-gray-150/40 dark:border-gray-800/40 p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
              <div className="absolute top-10 left-10">
                <Utensils size={120} className="text-gray-400" />
              </div>
              <div className="absolute bottom-10 right-10">
                <ChefHat size={140} className="text-gray-400" />
              </div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-500/10">
                <Target className="w-3.5 h-3.5" />
                Our Core Values
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
                Guiding Every Plate we Create
              </h2>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
                We believe that recipes aren&apos;t just instructions—they are dynamic acts of design, 
                testing, and sharing. Here are the core pillars that guide our curation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
                <div className="bg-gray-50/80 dark:bg-gray-800/40 border border-gray-150/30 dark:border-gray-800/30 rounded-2xl p-6 shadow-sm">
                  <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-4 border border-brand-primary/10">
                    <Heart className="w-5 h-5 text-brand-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">
                    Genuine Passion
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Every dish listed is verified, cooked, and evaluated to guarantee outstanding culinary results.
                  </p>
                </div>

                <div className="bg-gray-50/80 dark:bg-gray-800/40 border border-gray-150/30 dark:border-gray-800/30 rounded-2xl p-6 shadow-sm">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-4 border border-indigo-500/10">
                    <Award className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">
                    Quality First
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    From measurements to step-by-step photography, we prioritize accuracy for chef and home cook alike.
                  </p>
                </div>

                <div className="bg-gray-50/80 dark:bg-gray-800/40 border border-gray-150/30 dark:border-gray-800/30 rounded-2xl p-6 shadow-sm">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/10">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">
                    Inclusive Craft
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                    Catering to all skill levels with clear labels, dietary categories, and detailed annotations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="text-center py-8"
          variants={itemVariants}
        >
          <div className="bg-gradient-to-br from-brand-primary via-brand-secondary to-indigo-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden shadow-lg shadow-blue-500/10">
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
                Ready to Spark Your Inner Chef?
              </h2>
              <p className="text-base md:text-lg mb-8 text-blue-100 font-light max-w-lg mx-auto">
                Explore hundreds of user-submitted and expert-curated recipes, and join the conversation today!
              </p>
              <motion.button
                onClick={() => window.location.href = "/recipe"}
                className="bg-white text-brand-primary hover:text-brand-secondary px-8 py-4 rounded-xl font-bold text-sm inline-flex items-center gap-2.5 transition-all duration-300 shadow-lg shadow-black/10 cursor-pointer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ChefHat className="w-4 h-4" />
                Explore Our Recipes
              </motion.button>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
