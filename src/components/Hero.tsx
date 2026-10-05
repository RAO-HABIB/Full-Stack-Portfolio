"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/constants/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to make text pop */}
        <div className="absolute inset-0 bg-dark/40"></div>
      </div>


      <div className="relative w-full min-h-screen flex flex-col justify-between z-10 px-4 sm:px-8 lg:px-12 pt-32 pb-12">

        {/* Center Text Row (Stacks on mobile, aligns sides on md+) */}
        <div className="flex flex-col md:flex-row md:absolute md:top-1/2 md:-translate-y-1/2 md:left-0 md:w-full md:px-8 lg:px-12 justify-between items-start md:items-center pointer-events-none gap-8 md:gap-4 mt-8 md:mt-0 z-20">

          {/* Left side: FULL STACK */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col text-left self-start mt-8 md:mt-0"
          >
            <span className="text-[3.5rem] sm:text-[4.5rem] md:text-6xl lg:text-[6.5rem] xl:text-[8rem] 2xl:text-[10rem] font-bold font-antonio uppercase tracking-tighter text-white leading-[0.85] drop-shadow-2xl">
              FULL <span className="text-purple-400">STACK</span>
            </span>
          </motion.div>

          {/* Right side: DEVELOPER */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col text-right self-end md:self-auto items-end mt-4 md:mt-0"
          >
            <span className="text-[3.5rem] sm:text-[4.5rem] md:text-6xl lg:text-[6.5rem] xl:text-[8rem] 2xl:text-[10rem] font-bold font-antonio uppercase tracking-tighter text-white leading-[0.85] drop-shadow-2xl whitespace-nowrap">
              DEVELOPER
            </span>

          </motion.div>
        </div>

        {/* Bottom Area: Buttons only (Absolute positioned to ensure they stay at bottom) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full flex flex-col items-center justify-end pointer-events-auto z-20 px-4">

          <span className="text-4xl sm:text-2xl md:text-5xl lg:text-7xl xl:text-[2.5rem] 2xl:text-[4rem] font-bold font-antonio uppercase tracking-tighter text-purple-400 leading-tight bg-black/40 px-6 py-4 rounded-full drop-shadow-2xl mb-6 lg:mt-4 whitespace-nowrap">
            {portfolioData.personal.name}
          </span>
          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#projects"
              className="group bg-dark text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-primary transition-all duration-300"
            >
              View Projects
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#contact"
              className="bg-white text-dark border border-lightGray px-8 py-4 rounded-full font-medium flex items-center justify-center hover:border-dark hover:bg-light transition-all duration-300"
            >
              Contact Me
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
