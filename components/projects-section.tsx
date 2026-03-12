"use client"

import { forwardRef, useState } from "react"
import Image from "next/image"

const projects = [
  {
    id: "01",
    title: "METABOLISM DIAGRAM",
    subtitle: "CAPSULE / CLUSTER",
    dwg: "#2707",
    style: "METABOLISM",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2c378cf8-3176-4939-88f3-98fe48260e3a.jpeg",
    palette: ["#E85D4C", "#404040", "#606060", "#D4D0C8"],
    floors: 3,
    density: "MODERATE",
    bg: "bg-card",
  },
  {
    id: "02",
    title: "DECON DIAGRAM",
    subtitle: "CRYSTALLINE / 3F",
    dwg: "#0575",
    style: "DECONSTRUCTIVIST",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6e517dd6-1f1f-40fa-9c16-f7fcc965f90d.jpeg",
    palette: ["#4A90A4", "#5BA4B8", "#6DB8CC", "#D4D0C8"],
    floors: 3,
    density: "MODERATE",
    bg: "bg-card",
  },
  {
    id: "03",
    title: "STRUCTURAL DIAGRAM",
    subtitle: "QUADPLEX / CHAOTIC",
    dwg: "#2102",
    style: "ISOMETRIC STRATA",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8d5afaef-8a62-48db-a75a-c73b7ca0ee2e.jpeg",
    palette: ["#4A90A4", "#45B07C", "#F5C842", "#E85D4C"],
    floors: 4,
    density: "HIGH",
    bg: "bg-[#0c1a32]",
  },
  {
    id: "04",
    title: "CONSTRUCTIVIST DIAGRAM",
    subtitle: "MONUMENT / RUSAKOV",
    dwg: "#3519",
    style: "CONSTRUCTIVIST",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/81506255-d117-49f8-8ed1-bd7dfa6f8c10.jpeg",
    palette: ["#404040", "#505050", "#606060", "#D4D0C8"],
    floors: 4,
    density: "MODERATE",
    bg: "bg-card",
  },
  {
    id: "05",
    title: "CONSTRUCTIVIST DIAGRAM",
    subtitle: "MONUMENT / TATLIN",
    dwg: "#2125",
    style: "CONSTRUCTIVIST",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ef8490ab-0a2d-4277-af17-224c34ae8d74.jpeg",
    palette: ["#9B59B6", "#F5C842", "#4A90A4", "#E85D4C"],
    floors: 4,
    density: "HIGH",
    bg: "bg-[#0a1628]",
  },
  {
    id: "06",
    title: "DECON DIAGRAM",
    subtitle: "COLLIDING / 3F",
    dwg: "#7751",
    style: "DECONSTRUCTIVIST",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a59ddc49-5e18-40c5-8e39-6bb4e4b7a7e5.jpeg",
    palette: ["#E85D4C", "#4A90A4", "#45B07C", "#F5C842"],
    floors: 3,
    density: "MODERATE",
    bg: "bg-card",
  },
  {
    id: "07",
    title: "DECON DIAGRAM",
    subtitle: "COLLIDING / 5F",
    dwg: "#1961",
    style: "DECONSTRUCTIVIST",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2a05e9fb-9389-46f0-b96d-eab8cb2f7874.jpeg",
    palette: ["#4A90A4", "#5BA4B8", "#6DB8CC", "#D4D0C8"],
    floors: 5,
    density: "HIGH",
    bg: "bg-card",
  },
  {
    id: "08",
    title: "BRUTALIST DIAGRAM",
    subtitle: "MOSAIC / 9F",
    dwg: "#7443",
    style: "BRUTALIST",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/83c3c43c-e345-43f2-9a9b-aa4df39e200f.jpeg",
    palette: ["#E85D4C", "#F5C842", "#606060", "#4A90A4"],
    floors: 9,
    density: "HIGH",
    bg: "bg-card",
  },
]

export const ProjectsSection = forwardRef<HTMLElement>(function ProjectsSection(_, ref) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section ref={ref} className="py-16 md:py-24 border-t border-border" data-section="S2">
      {/* ── SECTION HEADER ── */}
      <div className="flex items-start justify-between mb-8 md:mb-12">
        <div>
          <div className="annotation text-muted-foreground/50 mb-2">SECTION 02</div>
          <h2 className="text-lg md:text-xl font-mono font-bold tracking-tight text-foreground">
            PROJECT INDEX
          </h2>
        </div>
        <div className="annotation text-right text-muted-foreground/50 hidden sm:block">
          <div>TOTAL: {String(projects.length).padStart(2, "0")}</div>
          <div>LAYOUT: GRID 2-COL</div>
          <div>VIEW: AXONOMETRIC</div>
        </div>
      </div>

      {/* ── PROJECTS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            total={projects.length}
            isHovered={hoveredId === project.id}
            onHover={() => setHoveredId(project.id)}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </div>

      {/* ── SECTION FOOTER NOTE ── */}
      <div className="mt-6 flex items-center justify-between">
        <span className="annotation text-muted-foreground/40">
          END OF PROJECT INDEX
        </span>
        <span className="annotation text-muted-foreground/40">
          {projects.length} ITEMS INDEXED
        </span>
      </div>
    </section>
  )
})

interface ProjectCardProps {
  project: (typeof projects)[0]
  total: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

function ProjectCard({ project, total, isHovered, onHover, onLeave }: ProjectCardProps) {
  return (
    <article
      className="bg-card group cursor-pointer relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* ── IMAGE ── */}
      <div className={`relative aspect-[4/5] overflow-hidden ${project.bg}`}>
        <Image
          src={project.image}
          alt={`${project.title} - ${project.subtitle}`}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
        />

        {/* ── HOVER OVERLAY ── */}
        <div
          className={`absolute inset-0 bg-background/92 backdrop-blur-sm transition-opacity duration-300 flex flex-col justify-between p-5 md:p-6 ${
            isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Overlay top */}
          <div className="flex justify-between items-start">
            <span className="annotation text-muted-foreground/50">{project.dwg}</span>
            <div className="flex gap-1">
              {project.palette.map((c, i) => (
                <div
                  key={i}
                  className="w-3 h-3 border border-foreground/10"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Overlay bottom — metadata */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs font-mono">
              <OverlayField label="STYLE" value={project.style} />
              <OverlayField label="FLOORS" value={String(project.floors)} />
              <OverlayField label="DENSITY" value={project.density} />
              <OverlayField label="VIEW" value="AXONOMETRIC" />
            </div>
            <button className="w-full py-3 border border-foreground text-xs font-mono tracking-widest hover:bg-foreground hover:text-background transition-colors">
              VIEW DRAWING
            </button>
          </div>
        </div>
      </div>

      {/* ── INFO BAR ── */}
      <div className="p-4 border-t border-border flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="annotation text-muted-foreground/40 mb-0.5">
            {project.id}/{String(total).padStart(2, "0")}
          </div>
          <h3 className="text-xs md:text-sm font-mono font-bold truncate text-foreground">
            {project.title}
          </h3>
          <p className="text-[10px] md:text-xs font-mono text-muted-foreground truncate">
            {project.subtitle}
          </p>
        </div>
        <div className="flex gap-0.5 shrink-0 mt-1">
          {project.palette.slice(0, 4).map((c, i) => (
            <div
              key={i}
              className="w-2 h-2 border border-foreground/5"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </article>
  )
}

function OverlayField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-muted-foreground/50 block text-[10px] tracking-widest">{label}</span>
      <span className="text-foreground text-xs">{value}</span>
    </div>
  )
}
