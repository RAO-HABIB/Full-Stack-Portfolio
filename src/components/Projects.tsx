"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, type PanInfo } from "framer-motion";
import Image from "next/image";
import { portfolioData } from "@/constants/data";
import { ArrowUpRight, ExternalLink, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Projects() {
  const projects = portfolioData.projects;
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigateTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const navigateNext = useCallback(() => {
    if (projects.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const navigatePrev = useCallback(() => {
    if (projects.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 40;
      if (info.offset.x > threshold) {
        navigatePrev();
      } else if (info.offset.x < -threshold) {
        navigateNext();
      }
      setTimeout(() => {
        isDraggingRef.current = false;
      }, 100);
    },
    [navigateNext, navigatePrev]
  );

  // Calculate wrapped relative position (-projects.length / 2 to +projects.length / 2)
  const getCardPosition = (index: number) => {
    const diff = index - activeIndex;
    const half = projects.length / 2;
    if (diff > half) return diff - projects.length;
    if (diff < -half) return diff + projects.length;
    return diff;
  };

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const baseWidth = isMobile ? Math.min(windowWidth - 32, 320) : isTablet ? 450 : 550;
  const baseHeight = isMobile ? 440 : isTablet ? 580 : 680;
  const gap = isMobile ? 12 : isTablet ? 30 : 40;

  const getCardStyle = (position: number) => {
    if (position === 0) {
      return {
        x: 0,
        scale: 1,
        zIndex: 20,
        opacity: 1,
        filter: "blur(0px)",
      };
    }

    const absPosition = Math.abs(position);
    const cardDirection = position > 0 ? 1 : -1;

    // Smooth flanking geometry
    const translateX = cardDirection * (baseWidth * 0.75 + gap * (1 - (absPosition - 1) * 0.15));
    const scale = 0.85 * (1 - (absPosition - 1) * 0.1);
    const blur = absPosition > 1 ? 4 : 0;
    const opacity = absPosition > 1 ? 0.3 : 0.6;

    return {
      x: translateX,
      scale,
      zIndex: 20 - absPosition * 2,
      opacity,
      filter: blur > 0 ? `blur(${blur}px)` : "blur(0px)",
    };
  };

  return (
    <section id="projects" className="py-24 bg-[#050505] relative overflow-hidden select-none border-t border-white/5">
      {/* Background ambient light for separation from skills section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-50"></div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start"
          >
            <div className="inline-flex items-center gap-2 text-primary font-medium text-xs tracking-[0.2em] uppercase mb-4 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
              <Sparkles size={14} />
              <span>Interactive Showcase</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-antonio uppercase text-white drop-shadow-lg">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-xl mt-4">
              A curated selection of production-grade web applications. Swipe or click to explore the tech stack and details.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:flex"
          >
            <Link
              href={portfolioData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 font-medium hover:text-primary transition-colors border-b border-white/20 hover:border-primary pb-1 text-sm tracking-wide uppercase"
            >
              View Full GitHub <ExternalLink size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative w-full flex items-center justify-center py-10"
          style={{ height: baseHeight + 60 }}
        >
          {/* Draggable Motion Container */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => {
              isDraggingRef.current = true;
            }}
            onDragEnd={handleDragEnd}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") navigatePrev();
              if (event.key === "ArrowRight") navigateNext();
            }}
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured projects"
          >
            {projects.map((project, index) => {
              const position = getCardPosition(index);
              const isVisible = Math.abs(position) <= 2;
              if (!isVisible) return null;

              const style = getCardStyle(position);
              const isActive = position === 0;

              return (
                <motion.div
                  key={project.title}
                  style={{
                    position: "absolute",
                    width: baseWidth,
                    height: baseHeight,
                    zIndex: style.zIndex,
                  }}
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    opacity: style.opacity,
                    filter: style.filter,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  onClick={() => {
                    if (isDraggingRef.current) return;
                    if (!isActive) navigateTo(index);
                  }}
                  onKeyDown={(event) => {
                    if (!isActive && (event.key === "Enter" || event.key === " ")) {
                      event.preventDefault();
                      navigateTo(index);
                    }
                  }}
                  role={isActive ? undefined : "button"}
                  tabIndex={isActive ? -1 : 0}
                  aria-label={isActive ? undefined : `Show ${project.title}`}
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${isActive
                      ? "shadow-[0_0_80px_rgba(106,113,223,0.15)] ring-1 ring-white/20 cursor-default"
                      : "shadow-2xl cursor-pointer"
                    }`}
                >
                  {/* The Card */}
                  <div className="flex flex-col h-full bg-[#111113] text-white rounded-2xl overflow-hidden">

                    {/* Browser Mockup Top Half */}
                    <div className="flex flex-col h-[55%] sm:h-[60%] border-b border-white/10 bg-[#0a0a0a]">
                      {/* Browser Header Bar */}
                      <div className="bg-[#18181b] px-4 py-3 flex items-center gap-3 border-b border-white/5">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                        </div>
                        <div className="flex-1 mx-4 bg-[#09090b] rounded-md px-3 py-1 text-[11px] text-white/40 font-mono text-center border border-white/5 truncate">
                          {project.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </div>
                      </div>

                      {/* Image Viewport */}
                      <div className="relative flex-1 overflow-hidden group bg-black">
                        <Image
                          src={project.image}
                          alt={`Screenshot of ${project.title}`}
                          fill
                          sizes="(max-width: 639px) 320px, (max-width: 1023px) 450px, 550px"
                          className="w-full h-full object-cover object-top select-none pointer-events-none transition-transform duration-1000 group-hover:scale-105 opacity-90"
                        />
                        {/* Inner shadow for depth */}
                        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]" />
                      </div>
                    </div>

                    {/* Content Bottom Half */}
                    <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between flex-1 bg-[#111113]">
                      <div>
                        {/* Tech Stack Tags */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                          {project.tags.slice(0, isActive ? 4 : 3).map((tag, i) => (
                            <span
                              key={i}
                              className="text-[9px] sm:text-[10px] md:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/5 text-white/80 border border-white/10 tracking-wide uppercase"
                            >
                              {tag}
                            </span>
                          ))}
                          {isActive && project.tags.length > 4 && (
                            <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold px-2 py-0.5 sm:py-1 rounded-full bg-white/5 text-white/50 border border-white/5">
                              +{project.tags.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-lg sm:text-2xl md:text-4xl font-bold font-antonio uppercase text-white tracking-wide leading-tight mb-2 sm:mb-3 drop-shadow-sm">
                          {project.title}
                        </h3>
                        <p className="text-white/60 text-[11px] sm:text-xs md:text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Action Area */}
                      <div className="pt-3 sm:pt-4 flex items-center justify-between mt-auto">
                        {isActive ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 sm:gap-3 bg-white text-dark hover:bg-primary hover:text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] group/btn"
                          >
                            <span>Live Preview</span>
                            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-dark text-white group-hover/btn:bg-white group-hover/btn:text-primary flex items-center justify-center transition-colors">
                              <ArrowUpRight size={12} className="sm:w-3.5 sm:h-3.5" />
                            </div>
                          </a>
                        ) : (
                          <span className="text-[10px] sm:text-xs text-white/30 font-medium uppercase tracking-widest">
                            Click to expand
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col items-center justify-center mt-4 space-y-6">
          {/* Arrows & Dots */}
          <div className="flex items-center gap-8">
            <button
              onClick={navigatePrev}
              type="button"
              aria-label="Show previous project"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => navigateTo(i)}
                  type="button"
                  aria-label={`Show project ${i + 1}: ${projects[i].title}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                  className={`transition-all duration-300 rounded-full ${i === activeIndex
                      ? "w-8 h-2 bg-primary"
                      : "w-2 h-2 bg-white/20 hover:bg-white/50"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={navigateNext}
              type="button"
              aria-label="Show next project"
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-dark transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
