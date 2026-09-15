"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { portfolioData } from "@/constants/data";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className={`text-3xl font-bold font-antonio tracking-tighter uppercase transition-colors ${scrolled ? "text-black" : "text-white"}`}>
          HABIB<span className="text-primary">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className={`hidden md:flex items-center gap-8 backdrop-blur-sm border px-6 py-3 rounded-full transition-colors ${scrolled ? "border-black/10 bg-black/5" : "border-white/20 bg-white/5"}`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${scrolled ? "text-black/80 hover:text-primary" : "text-white/90 hover:text-primary"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="#contact"
            className={`flex items-center gap-2 border px-4 py-2 rounded-full transition-all group ${scrolled ? "bg-white border-neutral-200 hover:border-primary" : "bg-white/10 border-white/20 hover:bg-white/20"}`}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${scrolled ? "bg-emerald-500" : "bg-emerald-400"}`}></span>
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${scrolled ? "bg-emerald-500" : "bg-emerald-400"}`}></span>
            </span>
            <span className={`text-sm font-medium transition-colors group-hover:text-primary ${scrolled ? "text-black" : "text-white"}`}>
              Available for work
            </span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 rounded-full transition-colors ${scrolled ? "text-black bg-neutral-100" : "text-white bg-white/20"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-lightGray overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-dark hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                className="mt-4 flex items-center justify-center gap-2 bg-dark text-white px-6 py-3 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                Let's Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
