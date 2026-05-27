"use client";

import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      icon: faFacebook,
      href: "#",
      label: "Facebook",
      color: "hover:bg-[#1877F2] hover:text-white",
    },
    {
      icon: faTwitter,
      href: "#",
      label: "Twitter",
      color: "hover:bg-[#1DA1F2] hover:text-white",
    },
    {
      icon: faInstagram,
      href: "#",
      label: "Instagram",
      color: "hover:bg-[#E4405F] hover:text-white",
    },
    {
      icon: faLinkedin,
      href: "#",
      label: "LinkedIn",
      color: "hover:bg-[#0077B5] hover:text-white",
    },
    {
      icon: faYoutube,
      href: "#",
      label: "YouTube",
      color: "hover:bg-[#FF0000] hover:text-white",
    },
  ];

  const footerLinks = [
    {
      title: "Company",
      links: [
        { href: "/about-us", label: "About Us" },
        { href: "/contact-us", label: "Contact Us" },
        { href: "/faq", label: "FAQ" },
      ],
    },
    {
      title: "Legal",
      links: [
        { href: "/privacy", label: "Privacy Policy" },
        { href: "/disclaimer", label: "Disclaimer" },
        { href: "/terms", label: "Terms of Service" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <motion.div
        className="container mx-auto px-6 py-8 lg:py-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description Section */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <Link href="/" className="inline-block group">
              <div className="relative">
                <Image
                  src="/cook-book.png"
                  alt="Logo"
                  width={120}
                  height={120}
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Discover, create, and share amazing recipes with our vibrant
              cooking community. Your culinary journey starts here!
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className={`flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 transition-all duration-300 ${social.color} hover:border-transparent hover:shadow-lg`}
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} className="text-base" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Section */}
          {footerLinks.map((section) => (
            <motion.div key={section.title} className="space-y-4" variants={itemVariants}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info Section */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Get In Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="mt-1 text-brand-primary"
                />
                <span>
                  Royal University Of Phnom Penh
                  <br />
                  Faculty Engineering, Dept. ITE
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <FontAwesomeIcon icon={faPhone} className="text-brand-primary" />
                <span>(855) 456-7890</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-brand-primary"
                />
                <span>hello@cookbook.com</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          variants={itemVariants}
        >
          <p className="text-gray-500 dark:text-gray-500 text-xs text-center md:text-left">
            © {new Date().getFullYear()} All rights reserved. Made with{" "}
            <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1" /> for
            food lovers everywhere.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/cookies"
              className="text-xs text-gray-500 hover:text-brand-primary transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/sitemap"
              className="text-xs text-gray-500 hover:text-brand-primary transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );

};

export default Footer;
