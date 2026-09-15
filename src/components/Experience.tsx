"use client";
import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/constants/data";
import { Briefcase, Calendar, MapPin, Building2, Sparkles, ChevronRight } from "lucide-react";

// Tech stack / domain mapping for each experience
const experienceMeta: Record<number, { role: string; company: string; location: string; tags: string[] }> = {
  0: {
    role: "Full Stack Developer",
    company: "Software Product Strategist (SPS)",
    location: "Islamabad, Pakistan",
    tags: ["Next.js", "React", "TypeScript", "Node.js", "System Architecture", "Product Strategy"]
  },
  1: {
    role: "Front End Developer",
    company: "Beyond Technologies",
    location: "Islamabad, Pakistan",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "Performance Optimization"]
  },
  2: {
    role: "Full Stack ERP Developer",
    company: "Country Club ERP System",
    location: "Islamabad, Pakistan",
    tags: ["ASP.NET Core", "JWT Auth", "REST APIs", "Modular Architecture", "SQL Server"]
  }
};

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="experience" className="py-28 bg-[#FAFAFC] relative overflow-hidden border-t border-neutral-200/60">
      {/* Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-70" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[350px] bg-purple-400/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4 shadow-xs">
              <Sparkles size={13} className="text-primary animate-pulse" />
              <span>Career Journey</span>
            </motion.div>

            <motion.h2 
              variants={itemVariants} 
              className="text-4xl sm:text-5xl md:text-6xl font-bold font-antonio uppercase tracking-tight text-[#16161a] mb-4"
            >
              Work <span className="text-primary">Experience</span>
            </motion.h2>

            <motion.p 
              variants={itemVariants} 
              className="text-neutral-500 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-normal leading-relaxed"
            >
              My professional timeline, engineering impact, and key technical contributions across organizations.
            </motion.p>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Continuous Vertical Timeline Line */}
            <div className="absolute left-4 sm:left-6 md:left-8 top-6 bottom-6 w-[2px] bg-gradient-to-b from-primary via-primary/30 to-neutral-200" />

            <div className="space-y-8 sm:space-y-10">
              {portfolioData.experience.map((exp, index) => {
                const isCurrent = exp.date.toLowerCase().includes("current") || exp.date.toLowerCase().includes("present");
                const meta = experienceMeta[index] || {
                  role: exp.title,
                  company: exp.company,
                  location: "Islamabad, Pakistan",
                  tags: []
                };

                return (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="relative pl-9 sm:pl-14 md:pl-16 group"
                  >
                    {/* Timeline Node Icon - Mathematically centered on the vertical line */}
                    <div className="absolute left-4 sm:left-6 md:left-8 -translate-x-1/2 top-6 z-20 flex items-center justify-center">
                      {isCurrent ? (
                        <div className="relative flex items-center justify-center">
                          {/* Pulsing Radar Ring */}
                          <span className="absolute w-7 h-7 rounded-full bg-primary/25 animate-ping" />
                          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary text-white flex items-center justify-center shadow-[0_0_16px_rgba(106,113,223,0.6)] ring-4 ring-white">
                            <Briefcase size={12} className="text-white" />
                          </div>
                        </div>
                      ) : (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white border-2 border-neutral-300 group-hover:border-primary group-hover:bg-primary/5 text-neutral-400 group-hover:text-primary flex items-center justify-center transition-colors duration-300 shadow-xs ring-4 ring-[#FAFAFC]">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 group-hover:bg-primary transition-colors" />
                        </div>
                      )}
                    </div>

                    {/* Main Experience Card */}
                    <div className="relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_-8px_rgba(106,113,223,0.14)] hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      {/* Subtle hover gradient wash */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Header row: Role, Company, Location & Date */}
                      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-neutral-100">
                        <div>
                          {/* Role Title */}
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1a1a1e] tracking-tight group-hover:text-primary transition-colors">
                            {meta.role}
                          </h3>

                          {/* Company & Location Badges */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2 text-xs sm:text-sm">
                            <span className="inline-flex items-center gap-1.5 font-semibold text-neutral-800">
                              <Building2 size={15} className="text-primary flex-shrink-0" />
                              {meta.company}
                            </span>
                            <span className="text-neutral-300 hidden sm:inline">•</span>
                            <span className="inline-flex items-center gap-1 text-neutral-500 font-medium">
                              <MapPin size={14} className="text-neutral-400 flex-shrink-0" />
                              {meta.location}
                            </span>
                          </div>
                        </div>

                        {/* Date Status Pill */}
                        <div className="self-start sm:self-auto flex-shrink-0">
                          {isCurrent ? (
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 text-xs font-semibold shadow-2xs whitespace-nowrap">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              <span>{exp.date}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200/80 text-neutral-600 text-xs font-medium whitespace-nowrap">
                              <Calendar size={13} className="text-neutral-400 flex-shrink-0" />
                              <span>{exp.date}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Points / Achievements */}
                      <ul className="relative z-10 space-y-3 pt-5 pb-2">
                        {exp.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-neutral-600 text-sm sm:text-[15px] leading-relaxed">
                            <span className="flex-shrink-0 w-5 h-5 rounded-md bg-primary/10 text-primary flex items-center justify-center mt-0.5 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                              <ChevronRight size={13} strokeWidth={2.5} />
                            </span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Tags */}
                      {meta.tags && meta.tags.length > 0 && (
                        <div className="relative z-10 pt-5 mt-4 border-t border-neutral-100/80 flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-neutral-400 mr-1 uppercase tracking-wider">
                            Technologies:
                          </span>
                          {meta.tags.map((tag, tIndex) => (
                            <span 
                              key={tIndex}
                              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-neutral-100/80 hover:bg-primary/10 text-neutral-600 hover:text-primary border border-neutral-200/60 transition-colors duration-150"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
