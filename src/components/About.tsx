import React from "react";
import { portfolioData } from "@/constants/data";
import { GraduationCap, Code2, Database, Layout } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Text Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold font-antonio uppercase text-dark mb-6">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-lg text-gray mb-8 leading-relaxed">
              {portfolioData.personal.about}
            </p>

            {/* Education Info */}
            <div className="bg-light p-6 rounded-2xl border border-lightGray flex items-start gap-4">
              <div className="bg-white p-3 rounded-full shadow-sm text-primary">
                <GraduationCap size={24} />
              </div>
              <div>
                <h4 className="font-bold text-dark text-lg">{portfolioData.education.degree}</h4>
                <p className="text-gray font-medium">{portfolioData.education.institution}</p>
                <p className="text-sm text-gray mt-1">{portfolioData.education.date}</p>
              </div>
            </div>
          </div>

          {/* Core Areas */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <div className="bg-light p-8 rounded-2xl border border-lightGray hover:border-primary/50 transition-colors group">
              <Layout size={32} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-dark mb-2">Frontend</h3>
              <p className="text-gray text-sm">React, Next.js, Tailwind CSS, TypeScript, building responsive and accessible UIs.</p>
            </div>
            
            <div className="bg-light p-8 rounded-2xl border border-lightGray hover:border-primary/50 transition-colors group">
              <Database size={32} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-dark mb-2">Backend</h3>
              <p className="text-gray text-sm">Node.js, Express, Golang, ASP.NET Core, designing robust REST APIs.</p>
            </div>

            <div className="bg-light p-8 rounded-2xl border border-lightGray hover:border-primary/50 transition-colors group">
              <Code2 size={32} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-dark mb-2">Databases</h3>
              <p className="text-gray text-sm">MongoDB, MySQL, PostgreSQL, SQL Server, optimizing data flow.</p>
            </div>

            <div className="bg-dark p-8 rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-4xl font-bold font-antonio text-white mb-2">{portfolioData.projects.length}+</h3>
              <p className="text-lightGray text-sm uppercase tracking-wider">Projects Completed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
