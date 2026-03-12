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
  },
  {
    id: "02",
    title: "DECON DIAGRAM",
    subtitle: "Crystalline / 3F",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6e517dd6-1f1f-40fa-9c16-f7fcc965f90d.jpeg",
    palette: ["#4A90A4", "#5BA4B8", "#6DB8CC", "#D4D0C8"],
    bg: "#e8e4df",
  },
  {
    id: "03",
    title: "STRUCTURAL DIAGRAM",
    subtitle: "Quadplex / Chaotic",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8d5afaef-8a62-48db-a75a-c73b7ca0ee2e.jpeg",
    palette: ["#4A90A4", "#45B07C", "#F5C842", "#E85D4C"],
    bg: "#0c1a32",
  },
  {
    id: "04",
    title: "CONSTRUCTIVIST DIAGRAM",
    subtitle: "Monument / Rusakov",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/81506255-d117-49f8-8ed1-bd7dfa6f8c10.jpeg",
    palette: ["#404040", "#505050", "#606060", "#D4D0C8"],
    bg: "#e8e4df",
  },
  {
    id: "05",
    title: "CONSTRUCTIVIST DIAGRAM",
    subtitle: "Monument / Tatlin",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ef8490ab-0a2d-4277-af17-224c34ae8d74.jpeg",
    palette: ["#9B59B6", "#F5C842", "#4A90A4", "#E85D4C"],
    bg: "#0a1628",
  },
  {
    id: "06",
    title: "DECON DIAGRAM",
    subtitle: "Colliding / 3F",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a59ddc49-5e18-40c5-8e39-6bb4e4b7a7e5.jpeg",
    palette: ["#E85D4C", "#4A90A4", "#45B07C", "#F5C842"],
    bg: "#e8e4df",
  },
  {
    id: "07",
    title: "DECON DIAGRAM",
    subtitle: "Colliding / 5F",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2a05e9fb-9389-46f0-b96d-eab8cb2f7874.jpeg",
    palette: ["#4A90A4", "#5BA4B8", "#6DB8CC", "#D4D0C8"],
    bg: "#e8e4df",
  },
  {
    id: "08",
    title: "BRUTALIST DIAGRAM",
    subtitle: "Mosaic / 9F",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/83c3c43c-e345-43f2-9a9b-aa4df39e200f.jpeg",
    palette: ["#E85D4C", "#F5C842", "#606060", "#4A90A4"],
    bg: "#e8e4df",
  },
]

export const ProjectsSection = forwardRef<HTMLElement>(function ProjectsSection(_, ref) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <section ref={ref} className="py-16 md:py-24 border-t border-border px-5 md:px-10" data-section="PROJECTS">
      {/* Section header */}
      <div className="flex items-baseline justify-between mb-8 md:mb-12">
        <h2 className="text-lg md:text-xl font-mono font-bold tracking-tight text-foreground">
          PROJECTS
        </h2>
        <span className="text-[10px] font-mono text-muted-foreground/50">
          {String(projects.length).padStart(2, "0")} WORKS
        </span>
      </div>

      {/* Project list — intentional layout: each project is a row that expands to show the image */}
      <div className="border-t border-border">
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
    <article className="border-b border-border">
      {/* Clickable header row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 md:py-5 gap-4 group text-left min-h-[56px]"
      >
        <div className="flex items-center gap-4 md:gap-6 min-w-0">
          {/* Number */}
          <span className="text-[10px] font-mono text-muted-foreground/40 w-5 shrink-0">
            {project.id}
          </span>

          {/* Title + subtitle */}
          <div className="min-w-0">
            <h3 className="text-xs md:text-sm font-mono font-bold text-foreground group-hover:text-accent transition-colors truncate">
              {project.title}
            </h3>
            <p className="text-[10px] md:text-xs font-mono text-muted-foreground truncate">
              {project.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Palette — shows actual colors used in this piece */}
          <div className="hidden sm:flex gap-0.5">
            {project.palette.map((c, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Expand indicator */}
          <div className={`w-4 h-4 flex items-center justify-center transition-transform duration-300 ${isExpanded ? "rotate-45" : ""}`}>
            <svg width="12" height="12" viewBox="0 0 12 12" className="text-muted-foreground">
              <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1" />
              <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </button>

      {/* Expandable image panel */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          isExpanded ? "max-h-[700px] opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-5 md:ml-11">
          <div
            className="relative aspect-[4/5] max-w-md overflow-hidden"
            style={{ backgroundColor: project.bg }}
          >
            <Image
              src={project.image}
              alt={`${project.title} - ${project.subtitle}`}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </article>
  )
}
