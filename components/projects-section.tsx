"use client"

import { forwardRef, useState } from "react"
import Image from "next/image"

const projects = [
  {
    id: "01",
    title: "METABOLISM DIAGRAM",
    subtitle: "CAPSULE / CLUSTER",
    projectNumber: "#2707",
    style: "METABOLISM",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2c378cf8-3176-4939-88f3-98fe48260e3a.jpeg",
    palette: ["#E85D4C", "#404040", "#606060", "#E85D4C"],
    floors: 3,
    density: "MODERATE"
  },
  {
    id: "02", 
    title: "DECON DIAGRAM",
    subtitle: "CRYSTALLINE / 3F",
    projectNumber: "#0575",
    style: "DECONSTRUCTIVIST",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6e517dd6-1f1f-40fa-9c16-f7fcc965f90d.jpeg",
    palette: ["#4A90A4", "#5BA4B8", "#6DB8CC", "#7FCCDF"],
    floors: 3,
    density: "MODERATE"
  },
  {
    id: "03",
    title: "STRUCTURAL DIAGRAM",
    subtitle: "QUADPLEX / CHAOTIC",
    projectNumber: "#2102",
    style: "ISOMETRIC STRATA",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8d5afaef-8a62-48db-a75a-c73b7ca0ee2e.jpeg",
    palette: ["#4A90A4", "#45B07C", "#F5C842", "#E85D4C"],
    floors: 4,
    density: "HIGH"
  },
  {
    id: "04",
    title: "CONSTRUCTIVIST DIAGRAM",
    subtitle: "MONUMENT / RUSAKOV",
    projectNumber: "#3519",
    style: "ISOMETRIC STRATA",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/81506255-d117-49f8-8ed1-bd7dfa6f8c10.jpeg",
    palette: ["#404040", "#505050", "#606060", "#707070"],
    floors: 4,
    density: "MODERATE"
  },
  {
    id: "05",
    title: "DECON DIAGRAM",
    subtitle: "COLLIDING / 3F",
    projectNumber: "#7751",
    style: "DECONSTRUCTIVIST",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/a59ddc49-5e18-40c5-8e39-6bb4e4b7a7e5.jpeg",
    palette: ["#E85D4C", "#4A90A4", "#45B07C", "#F5C842"],
    floors: 3,
    density: "MODERATE"
  },
  {
    id: "06",
    title: "DECON DIAGRAM",
    subtitle: "COLLIDING / 5F",
    projectNumber: "#1961",
    style: "DECONSTRUCTIVIST",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2a05e9fb-9389-46f0-b96d-eab8cb2f7874.jpeg",
    palette: ["#4A90A4", "#5BA4B8", "#6DB8CC", "#7FCCDF"],
    floors: 5,
    density: "HIGH"
  },
  {
    id: "07",
    title: "BRUTALIST DIAGRAM",
    subtitle: "MOSAIC / 9F",
    projectNumber: "#7443",
    style: "BRUTALIST",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/83c3c43c-e345-43f2-9a9b-aa4df39e200f.jpeg",
    palette: ["#E85D4C", "#F5C842", "#606060", "#4A90A4"],
    floors: 9,
    density: "HIGH"
  },
  {
    id: "08",
    title: "CONSTRUCTIVIST DIAGRAM",
    subtitle: "MONUMENT / TATLIN",
    projectNumber: "#2125",
    style: "ISOMETRIC STRATA",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ef8490ab-0a2d-4277-af17-224c34ae8d74.jpeg",
    palette: ["#4A90A4", "#9B59B6", "#F5C842", "#45B07C", "#E85D4C"],
    floors: 4,
    density: "HIGH"
  },
]

export const ProjectsSection = forwardRef<HTMLElement>(function ProjectsSection(_, ref) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section ref={ref} className="py-16 md:py-24 border-t border-border" data-section="S2">
      {/* Section header */}
      <div className="flex items-start justify-between mb-8 md:mb-12">
        <div>
          <div className="annotation mb-2">SECTION 02</div>
          <h2 className="text-lg md:text-xl font-mono font-bold tracking-tight">PROJECT INDEX</h2>
        </div>
        <div className="annotation text-right">
          <div>TOTAL: {projects.length}</div>
          <div>VIEW: GRID</div>
        </div>
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project}
            isHovered={hoveredId === project.id}
            onHover={() => setHoveredId(project.id)}
            onLeave={() => setHoveredId(null)}
          />
        ))}
      </div>
    </section>
  )
})

interface ProjectCardProps {
  project: typeof projects[0]
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

function ProjectCard({ project, isHovered, onHover, onLeave }: ProjectCardProps) {
  return (
    <article 
      className="bg-card group cursor-pointer relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} - ${project.subtitle}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-background/90 transition-opacity duration-300 flex flex-col justify-between p-4 md:p-6 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex justify-between">
            <span className="annotation">{project.projectNumber}</span>
            <div className="flex gap-1">
              {project.palette.map((color, i) => (
                <div 
                  key={i}
                  className="w-3 h-3 border border-foreground/20"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-muted-foreground block">STYLE:</span>
                <span>{project.style}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">FLOORS:</span>
                <span>{project.floors}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">DENSITY:</span>
                <span>{project.density}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">VIEW:</span>
                <span>AXONOMETRIC</span>
              </div>
            </div>
            
            <button className="w-full py-3 border border-foreground text-sm font-mono hover:bg-foreground hover:text-background transition-colors">
              VIEW PROJECT
            </button>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="p-4 border-t border-border flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="annotation mb-1">{project.id}/{String(projects.length).padStart(2, '0')}</div>
          <h3 className="text-sm font-mono font-bold truncate">{project.title}</h3>
          <p className="text-xs font-mono text-muted-foreground truncate">{project.subtitle}</p>
        </div>
        <div className="flex gap-1 shrink-0">
          {project.palette.slice(0, 4).map((color, i) => (
            <div 
              key={i}
              className="w-2.5 h-2.5 border border-foreground/10"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </article>
  )
}
