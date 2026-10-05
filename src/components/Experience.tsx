"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, MapPin } from "lucide-react";

const experiences = [
  {
    period: "2026—NOW",
    label: "Product Engineering",
    role: "Full Stack Developer",
    company: "Software Product Strategist (SPS)",
    location: "Islamabad, Pakistan",
    current: true,
    summary: "Building full-stack web products with dependable architecture, responsive experiences, and practical AI capabilities.",
    highlights: [
      "Delivering end-to-end features across modern frontend and backend systems.",
      "Turning product requirements into clear, maintainable technical solutions.",
    ],
    tags: ["Next.js", "TypeScript", "Node.js", "AI Integration"],
  },
  {
    period: "2025",
    label: "Frontend Systems",
    role: "Front End Developer",
    company: "Beyond Technologies",
    location: "Islamabad, Pakistan",
    current: false,
    summary: "Built responsive dashboards and customer-facing websites in close collaboration with design and backend teams.",
    highlights: [
      "Integrated REST APIs for real-time dashboard data.",
      "Built Sykee.ai and Armada admin dashboards plus the Evice website.",
      "Contributed to debugging, optimization, testing, and code reviews.",
      "Delivered responsive interfaces with React, Next.js, and Tailwind CSS.",
    ],
    tags: ["React", "Next.js", "REST APIs", "Tailwind CSS"],
  },
  {
    period: "2024—25",
    label: "Enterprise Platform",
    role: "Full Stack ERP Developer",
    company: "Country Club ERP System",
    location: "Islamabad, Pakistan",
    current: false,
    summary: "Developed a centralized ERP platform that unified country club administration in a secure, modular system.",
    highlights: [
      "Designed membership, restaurant, sports, rooms, HR, finance, and inventory modules.",
      "Implemented role-based access with ASP.NET Identity and JWT authentication.",
      "Used SQL Server and Entity Framework Core for data handling and migrations.",
      "Created real-time operational reports and analytics dashboards.",
    ],
    tags: ["ASP.NET Core", "SQL Server", "EF Core", "JWT"],
  },
] as const;

const nodePositions = [15, 50, 85];
const nodeY = [30, 90, 30];
const trackPath = "M 70 72 C 100 56 120 30 150 30 S 325 90 500 90 S 675 30 850 30 C 885 30 915 54 930 72";

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const select = useCallback((index: number) => setActiveIndex(Math.max(0, Math.min(experiences.length - 1, index))), []);
  const previous = useCallback(() => select(activeIndex - 1), [activeIndex, select]);
  const next = useCallback(() => select(activeIndex + 1), [activeIndex, select]);
  const active = experiences[activeIndex];
  const progress = (activeIndex / (experiences.length - 1)) * 100;

  const onDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -50) next();
    if (info.offset.x > 50) previous();
  };

  return (
    <section id="experience" className="relative overflow-hidden border-t border-black/5 bg-[#f6f4ef] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(#6A71DF_0.7px,transparent_0.7px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-14 flex flex-col gap-6 sm:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">Career timeline</p>
            <h2 className="font-antonio text-5xl font-bold uppercase leading-[0.92] tracking-tight text-[#16161a] sm:text-6xl lg:text-7xl">
              Work <span className="text-primary">Experience</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-neutral-600 sm:text-base">
            Two years of building responsive products, operational platforms, and reliable full-stack systems.
          </p>
        </header>

        <div
          className="relative hidden min-h-[520px] sm:block"
          role="region"
          aria-roledescription="timeline carousel"
          aria-label="Work experience timeline"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") previous();
            if (event.key === "ArrowRight") next();
          }}
        >
          <div className="flex items-center justify-between gap-6 px-2">
            <div className="flex items-center gap-4 text-xs font-semibold tracking-[0.12em] text-neutral-800">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <div className="h-px w-28 overflow-hidden bg-black/10 sm:w-40">
                <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} />
              </div>
              <span className="text-neutral-400">{String(experiences.length).padStart(2, "0")}</span>
            </div>
            <div className="flex gap-2">
              <NavButton label="Previous experience" disabled={activeIndex === 0} onClick={previous}><ArrowLeft size={18} /></NavButton>
              <NavButton label="Next experience" disabled={activeIndex === experiences.length - 1} onClick={next}><ArrowRight size={18} /></NavButton>
            </div>
          </div>

          <motion.div className="relative mt-5 h-44 cursor-grab active:cursor-grabbing" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.12} onDragEnd={onDragEnd}>
            <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 1000 180" preserveAspectRatio="none" aria-hidden="true">
              <path d={trackPath} fill="none" stroke="rgba(22,22,26,0.12)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <motion.path d={trackPath} fill="none" stroke="#6A71DF" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength={1} animate={{ pathLength: activeIndex / (experiences.length - 1) }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }} />
            </svg>
            {experiences.map((experience, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={experience.company}
                  type="button"
                  onClick={() => select(index)}
                  aria-label={`Show ${experience.role} at ${experience.company}`}
                  aria-current={selected ? "step" : undefined}
                  className="group absolute -translate-x-1/2 text-center"
                  style={{ left: `${nodePositions[index]}%`, top: `${(nodeY[index] / 180) * 100}%` }}
                >
                  <span className={`relative mx-auto flex -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-500 ${selected ? "h-7 w-7 border-primary bg-primary shadow-[0_0_0_8px_rgba(106,113,223,0.13)]" : "h-4 w-4 border-black/30 bg-white group-hover:scale-125 group-hover:border-primary group-hover:bg-primary"}`}>
                    {selected && <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />}
                  </span>
                  <span className={`mt-1 block whitespace-nowrap text-xs font-bold tracking-[0.1em] ${selected ? "text-[#16161a]" : "text-neutral-400 group-hover:text-primary"}`}>{experience.period}</span>
                  <span className={`mt-1 block whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] ${selected ? "text-primary" : "text-neutral-400"}`}>{experience.label}</span>
                </button>
              );
            })}
          </motion.div>

          <motion.span
            aria-hidden="true"
            className="absolute border-l border-dashed border-primary/45"
            animate={{
              left: `${nodePositions[activeIndex]}%`,
              top: 78 + (nodeY[activeIndex] / 180) * 176,
              height: 244 - (78 + (nodeY[activeIndex] / 180) * 176),
            }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            className="absolute top-[244px] w-[360px] max-w-[calc(100%_-_1rem)]"
            animate={{
              left: `clamp(0px, calc(${nodePositions[activeIndex]}% - 180px), calc(100% - 360px))`,
            }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <ExperienceCard key={active.company} experience={active} index={activeIndex} desktop />
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="space-y-4 sm:hidden">
          {experiences.map((experience, index) => {
            const selected = index === activeIndex;
            return (
              <div key={experience.company} className="relative pl-8">
                {index < experiences.length - 1 && <span className="absolute bottom-[-1rem] left-[7px] top-7 w-px bg-black/15" />}
                <span className={`absolute left-0 top-6 h-4 w-4 rounded-full border ${selected ? "border-primary bg-primary shadow-[0_0_0_6px_rgba(106,113,223,0.12)]" : "border-black/25 bg-[#f6f4ef]"}`} />
                <button type="button" onClick={() => select(index)} aria-expanded={selected} className={`w-full rounded-2xl border p-5 text-left ${selected ? "border-primary/30 bg-white" : "border-black/8 bg-white/45"}`}>
                  <span className="flex items-center justify-between gap-4">
                    <span><span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-primary">{experience.period}</span><span className="mt-1 block font-antonio text-xl font-bold uppercase text-[#16161a]">{experience.role}</span></span>
                    <span className="text-xs font-semibold text-neutral-400">{String(index + 1).padStart(2, "0")}</span>
                  </span>
                </button>
                <AnimatePresence initial={false}>{selected && <div className="mt-3"><ExperienceCard experience={experience} index={index} compact /></div>}</AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type ExperienceItem = (typeof experiences)[number];

function ExperienceCard({ experience, index, compact = false, desktop = false }: { experience: ExperienceItem; index: number; compact?: boolean; desktop?: boolean }) {
  return (
    <motion.article initial={{ opacity: 0, y: compact ? 8 : 24, scale: compact ? 1 : 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className={`overflow-hidden border border-black/8 bg-white shadow-[0_28px_70px_-42px_rgba(22,22,26,0.42)] ${compact ? "rounded-2xl" : "rounded-[1.5rem]"}`}>
      <div className="h-1 bg-primary" />
      <div className={compact ? "p-5" : desktop ? "p-5" : "p-7 lg:p-8"}>
        <div className={`flex flex-col gap-4 border-b border-black/8 ${desktop ? "pb-4" : "pb-5"} sm:flex-row sm:items-start sm:justify-between`}>
          <div>
            <div className="mb-3 flex flex-wrap gap-2"><span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">{experience.label}</span>{experience.current && <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">Current</span>}</div>
            <h3 className={`font-antonio font-bold uppercase leading-tight text-[#16161a] ${desktop ? "text-xl" : "text-2xl sm:text-3xl"}`}>{experience.role}</h3>
          </div>
          <span className={`font-antonio font-bold text-primary ${desktop ? "text-2xl" : "text-3xl sm:text-4xl"}`}>{experience.period}</span>
        </div>
        <div className={`${desktop ? "mt-4" : "mt-5"} flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-neutral-600 sm:text-sm`}>
          <span className="inline-flex items-center gap-2"><Building2 size={15} className="text-primary" />{experience.company}</span>
          <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-primary" />{experience.location}</span>
        </div>
        <p className={`${desktop ? "mt-4 line-clamp-3 text-xs leading-6" : "mt-5 text-sm leading-7 sm:text-[15px]"} text-neutral-600`}>{experience.summary}</p>
        {!desktop && <ul className="mt-5 grid gap-3 sm:grid-cols-2">{experience.highlights.map((item) => <li key={item} className="flex items-start gap-3 text-xs leading-6 text-neutral-600 sm:text-sm"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{item}</li>)}</ul>}
        <div className={`${desktop ? "mt-4 pt-4" : "mt-6 pt-5"} flex items-end justify-between gap-4 border-t border-black/8`}>
          <div className="flex flex-wrap gap-2">{experience.tags.slice(0, desktop ? 2 : undefined).map((tag) => <span key={tag} className="rounded-full border border-black/8 bg-[#f6f4ef] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-600">{tag}</span>)}</div>
          <span className="shrink-0 text-xs font-semibold text-neutral-400">{String(index + 1).padStart(2, "0")} / 03</span>
        </div>
      </div>
    </motion.article>
  );
}

function NavButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-label={label} disabled={disabled} onClick={onClick} className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-[#16161a] transition-colors hover:border-primary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-black/10 disabled:hover:bg-white disabled:hover:text-[#16161a]">{children}</button>;
}
