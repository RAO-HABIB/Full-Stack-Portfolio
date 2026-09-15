"use client";
import React from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/constants/data";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="bg-white rounded-3xl shadow-sm border border-lightGray overflow-hidden flex flex-col lg:flex-row"
        >
          {/* Contact Info */}
          <div className="bg-dark p-12 lg:w-2/5 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            
            <div>
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold font-antonio uppercase mb-4">
                Let's <span className="text-primary">Connect</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-gray mb-12">
                Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
              </motion.p>
              
              <div className="space-y-8">
                <motion.div variants={itemVariants} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-gray text-sm mb-1">Email</p>
                    <a href={`mailto:${portfolioData.personal.email}`} className="text-white hover:text-primary transition-colors font-medium">
                      {portfolioData.personal.email}
                    </a>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-gray text-sm mb-1">Phone</p>
                    <a href={`tel:${portfolioData.personal.phone}`} className="text-white hover:text-primary transition-colors font-medium">
                      {portfolioData.personal.phone}
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-gray text-sm mb-1">Location</p>
                    <p className="text-white font-medium">
                      {portfolioData.personal.address.split(",")[1].trim() + ", " + portfolioData.personal.address.split(",")[2].trim()}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-12 lg:w-3/5">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-lg bg-light border border-lightGray focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-dark mb-2">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-lg bg-light border border-lightGray focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </motion.div>
              </div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block text-sm font-medium text-dark mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-3 rounded-lg bg-light border border-lightGray focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  placeholder="How can I help you?"
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-light border border-lightGray focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </motion.div>
              
              <motion.button 
                variants={itemVariants}
                type="submit"
                className="w-full bg-dark text-white px-8 py-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary transition-colors"
              >
                Send Message
                <Send size={18} />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
