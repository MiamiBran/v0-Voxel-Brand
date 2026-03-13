"use client"

import { forwardRef, useState } from "react"
import Image from "next/image"

const projects = [
  {
    id: "01",
    title: "METABOLISM DIAGRAM",
    subtitle: "Capsule / Cluster",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2c378cf8-3176-4939-88f3-98fe48260e3a.jpeg",
    palette: ["#E85D4C", "#404040", "#606060", "#D4D0C8"],
    bg: "#e8e4df",
    movement: "METAB",
    floors: "3F",
  },
  {
    id: "02",
    title: "DECON DIAGRAM",
    subtitle: "Crystalline / 3F",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6e517dd6-1f1f-40fa-9c16-f7fcc965f90d.jpeg",
    palette: ["#4A90A4", "#5BA4B8", "#6DB8CC", "#D4D0C8"],
    bg: "#e8e4df",
    movement: "DECON",
    floors: "3F",
  },
  {
    id: "03",
    title: "STRUCTURAL DIAGRAM",
    subtitle: "Quadplex / Chaotic",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8d5afaef-8a62-48db-a75a-c73b7ca0ee2e.jpeg",
    palette: ["#4A90A4", "#45B07C", "#F5C842", "#E85D4C"],
    bg: "#0c1a32",
    movement: "DECON",
    floors: "5F",
  },
  {
    id: "04",
    title: "CONSTRUCTIVIST DIAGRAM",
    subtitle: "Monument / Rusakov",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/81506255-d117-49f8-8ed1-bd7dfa6f8c10.jpeg",
    palette: ["#404040", "#505050", "#606060", "#D4D0C8"],
    bg: "#e8e4df",
    movement: "CONST",
    floors: "4F",
  },
  {
    id: "05",
    title: "CONSTRUCTIVIST DIAGRAM",
    subtitle: "Monument / Tatlin",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ef8490ab-0a2d-4277-af17-224c34ae8d74.jpeg",
    palette: ["#9B59B6", "#F5C842", "#4A90A4", "#E85D4C"],
    bg: "#0a1628",
    movement: "CONST",
    floors: "4F",
  },
  {
    id: "06",
    title: "DECON DIAGRAM",
    subtitle: "Colliding / 3F",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a59ddc49-5e18-40c5-8e39-6bb4e4b7a7e5.jpeg",
    palette: ["#E85D4C", "#4A90A4", "#45B07C", "#F5C842"],
    bg: "#e8e4df",
    movement: "DECON",
    floors: "3F",
  },
  {
    id: "07",
    title: "DECON DIAGRAM",
    subtitle: "Colliding / 5F",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2a05e9fb-9389-46f0-b96d-eab8cb2f7874.jpeg",
    palette: ["#4A90A4", "#5BA4B8", "#6DB8CC", "#D4D0C8"],
    bg: "#e8e4df",
    movement: "DECON",
    floors: "5F",
  },
  {
    id: "08",
    title: "BRUTALIST DIAGRAM",
    subtitle: "Mosaic / 9F",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/83c3c43c-e345-43f2-9a9b-aa4df39e200f.jpeg",
    palette: ["#E85D4C", "#F5C842", "#606060", "#4A90A4"],
    bg: "#e8e4df",
    movement: "BRUT",
    floors: "9F",
  },
]

export const ProjectsSection = forwardRef<HTMLElement>(function ProjectsSection(_, ref) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section ref={ref} className="py-12 md:py-20 border-t border-border px-5 md:px-8" data-section="PROJECTS">
      {/* Section header — technical drawing style */}
      <div className="flex items-baseline justify-between mb-6 md:mb-10">
        <div className="flex items-baseline gap-3">
          <h2 className="text-base md:text-lg font-mono font-bold tracking-tight text-foreground">
            PROJECT INDEX
          </h2>
          <span className="text-[8px] font-mono text-muted-foreground/30 tracking-widest">
            SEC. 02
          </span>
        </div>
        <span className="text-[9px] font-mono text-muted-foreground/40 tabular-nums">
          {String(projects.length).padStart(2, "0")} PLATES
        </span>
      </div>

      {/* Project list — technical index table */}
      <div className="border border-border">
        {/* Table header */}
        <div className="hidden sm:flex items-center border-b border-border text-[8px] font-mono text-muted-foreground/30 tracking-widest">
          <span className="w-10 px-3 py-1.5 border-r border-border text-center">NO.</span>
          <span className="flex-1 px-3 py-1.5 border-r border-border">DESIGNATION</span>
          <span className="w-14 px-3 py-1.5 border-r border-border text-center">TYPE</span>
          <span className="w-12 px-3 py-1.5 border-r border-border text-center">HT.</span>
          <span className="w-20 px-3 py-1.5 text-center">PALETTE</span>
        </div>

        {projects.map((project) => (
          <ProjectRow
            key={project.id}
            project={project}
            isExpanded={expandedId === project.id}
            onToggle={() => setExpandedId(expandedId === project.id ? null : project.id)}
          />
        ))}
      </div>
    </section>
  )
})

interface ProjectRowProps {
  project: (typeof projects)[0]
  isExpanded: boolean
  onToggle: () => void
}

function ProjectRow({ project, isExpanded, onToggle }: ProjectRowProps) {
  return (
    <article className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-0 group text-left hover:bg-secondary/30 transition-colors min-h-[48px]"
      >
        {/* Number */}
        <span className="w-10 shrink-0 text-center text-[10px] font-mono text-muted-foreground/30 border-r border-border self-stretch flex items-center justify-center">
          {project.id}
        </span>

        {/* Title + subtitle */}
        <div className="flex-1 px-3 py-3 border-r border-border self-stretch flex flex-col justify-center min-w-0">
          <h3 className="text-[11px] md:text-xs font-mono font-bold text-foreground group-hover:text-accent transition-colors truncate">
            {project.title}
          </h3>
          <p className="text-[9px] font-mono text-muted-foreground/50 truncate">{project.subtitle}</p>
        </div>

        {/* Movement type */}
        <span className="hidden sm:flex w-14 shrink-0 text-center text-[8px] font-mono text-muted-foreground/30 tracking-wider border-r border-border self-stretch items-center justify-center">
          {project.movement}
        </span>

        {/* Floor count */}
        <span className="hidden sm:flex w-12 shrink-0 text-center text-[9px] font-mono text-muted-foreground/40 border-r border-border self-stretch items-center justify-center">
          {project.floors}
        </span>

        {/* Palette swatches — actual colors from this specific piece */}
        <div className="w-20 shrink-0 flex items-center justify-center gap-px self-stretch px-2">
          {project.palette.map((c, i) => (
            <div key={i} className="w-2.5 h-2.5" style={{ backgroundColor: c }} />
          ))}
        </div>
      </button>

      {/* Expandable plate — reveals the full artwork */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-border bg-card/30 p-4 md:p-6">
          <div className="max-w-md mx-auto">
            {/* Protractor angle indicator above the image — shows the isometric projection angle */}
            <div className="flex items-center justify-center mb-3" aria-hidden="true">
              <svg width="60" height="16" viewBox="0 0 60 16" className="text-muted-foreground/15">
                {/* Protractor arc */}
                <path d="M 5 15 A 25 25 0 0 1 55 15" fill="none" stroke="currentColor" strokeWidth="0.5" />
                {/* Angle ticks at 30 degree intervals */}
                <line x1="30" y1="15" x2="30" y2="8" stroke="currentColor" strokeWidth="0.5" />
                <line x1="17" y1="9" x2="19" y2="12" stroke="currentColor" strokeWidth="0.5" />
                <line x1="43" y1="9" x2="41" y2="12" stroke="currentColor" strokeWidth="0.5" />
                <text x="30" y="6" textAnchor="middle" fontSize="4" fill="currentColor" className="font-mono">30{'°'}</text>
              </svg>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: project.bg }}>
              <Image
                src={project.image}
                alt={`${project.title} - ${project.subtitle}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Plate label */}
            <div className="mt-3 flex items-center justify-between text-[8px] font-mono text-muted-foreground/30 tracking-widest">
              <span>PLATE #{project.id}</span>
              <span>ISOMETRIC 30{'°'} PROJECTION</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
