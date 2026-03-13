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
    <section 
      ref={ref} 
      className="py-12 md:py-20 px-5 md:px-10" 
      data-section="PROJECTS"
    >
      {/* Floating floor container with depth */}
      <div className="border border-border bg-card/50 backdrop-blur-sm relative">
        {/* Floor color indicator - subtle left edge */}
        <div className="absolute left-0 top-0 w-0.5 h-full" style={{ backgroundColor: "#E85D4C" }} />
        
        {/* Section header inside the card */}
        <div className="flex items-baseline justify-between px-5 md:px-6 py-4 border-b border-border">
          <div className="flex items-baseline gap-3">
            <div className="w-2.5 h-2.5 border border-border/50" style={{ backgroundColor: "#E85D4C" }} />
            <h2 className="text-sm md:text-base font-mono font-bold tracking-tight text-foreground">
              PROJECT INDEX
            </h2>
            <span className="text-[7px] font-mono text-muted-foreground/35 tracking-[0.2em]">SEC. 01</span>
          </div>
          <span className="text-[8px] font-mono text-muted-foreground/40 tabular-nums">
            {String(projects.length).padStart(2, "0")} PLATES
          </span>
        </div>

        {/* Project index table */}
        <div className="border-t-0">
        {/* Table header */}
        <div className="hidden md:flex items-center border-b border-border text-[7px] font-mono text-muted-foreground/25 tracking-[0.15em]">
          <span className="w-10 px-3 py-1.5 border-r border-border text-center">NO.</span>
          <span className="flex-1 px-3 py-1.5 border-r border-border">DESIGNATION</span>
          <span className="w-16 px-3 py-1.5 border-r border-border text-center">TYPE</span>
          <span className="w-12 px-3 py-1.5 border-r border-border text-center">HT.</span>
          <span className="w-24 px-3 py-1.5 text-center">PALETTE</span>
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
      </div>
    </section>
  )
})

function ProjectRow({ project, isExpanded, onToggle }: {
  project: (typeof projects)[0]
  isExpanded: boolean
  onToggle: () => void
}) {
  return (
    <article className="border-b border-border last:border-b-0">
      {/* Row -- clickable to expand the plate */}
      <button
        onClick={onToggle}
        className="w-full flex items-center group text-left hover:bg-secondary/30 transition-colors"
      >
        <span className="w-10 shrink-0 text-center text-[9px] font-mono text-muted-foreground/25 border-r border-border self-stretch flex items-center justify-center py-3">
          {project.id}
        </span>

        <div className="flex-1 px-3 py-3 md:border-r md:border-border self-stretch flex flex-col justify-center min-w-0">
          <h3 className="text-[10px] md:text-xs font-mono font-bold text-foreground group-hover:text-accent transition-colors truncate tracking-wide">
            {project.title}
          </h3>
          <p className="text-[8px] md:text-[9px] font-mono text-muted-foreground/40 truncate tracking-wider">{project.subtitle}</p>
        </div>

        <span className="hidden md:flex w-16 shrink-0 text-center text-[8px] font-mono text-muted-foreground/25 tracking-wider border-r border-border self-stretch items-center justify-center">
          {project.movement}
        </span>

        <span className="hidden md:flex w-12 shrink-0 text-center text-[9px] font-mono text-muted-foreground/30 border-r border-border self-stretch items-center justify-center">
          {project.floors}
        </span>

        {/* Palette swatches -- actual colors extracted from this specific piece */}
        <div className="w-20 md:w-24 shrink-0 flex items-center justify-center gap-px self-stretch px-2">
          {project.palette.map((c, i) => (
            <div key={i} className="w-2.5 h-2.5 md:w-3 md:h-3" style={{ backgroundColor: c }} />
          ))}
        </div>
      </button>

      {/* Expanded plate -- reveals the artwork with technical framing */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          isExpanded ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-border bg-card/20 p-5 md:p-8">
          <div className="max-w-md mx-auto">
            {/* Protractor -- indicates the 30-degree isometric projection angle used in these pieces.
                 This is a functional annotation: all the artwork uses 30-degree axonometric projection. */}
            <div className="flex items-center justify-center mb-3" aria-hidden="true">
              <svg width="80" height="20" viewBox="0 0 80 20" className="text-muted-foreground/12">
                <path d="M 5 18 A 35 35 0 0 1 75 18" fill="none" stroke="currentColor" strokeWidth="0.5" />
                {/* Major ticks at 30-degree intervals */}
                <line x1="40" y1="18" x2="40" y2="10" stroke="currentColor" strokeWidth="0.5" />
                <line x1="22" y1="11" x2="25" y2="15" stroke="currentColor" strokeWidth="0.4" />
                <line x1="58" y1="11" x2="55" y2="15" stroke="currentColor" strokeWidth="0.4" />
                {/* Minor ticks */}
                <line x1="13" y1="15" x2="15" y2="17" stroke="currentColor" strokeWidth="0.3" />
                <line x1="67" y1="15" x2="65" y2="17" stroke="currentColor" strokeWidth="0.3" />
                <text x="40" y="7" textAnchor="middle" fontSize="4" fill="currentColor" className="font-mono">30{'°'}</text>
              </svg>
            </div>

            {/* Artwork */}
            <div className="relative aspect-[4/5] overflow-hidden border border-border/30" style={{ backgroundColor: project.bg }}>
              <Image
                src={project.image}
                alt={`${project.title} -- ${project.subtitle}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Plate annotation */}
            <div className="mt-3 flex items-center justify-between text-[7px] font-mono text-muted-foreground/25 tracking-[0.15em]">
              <span>PLATE #{project.id}</span>
              <span>{project.movement} -- {project.floors}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
