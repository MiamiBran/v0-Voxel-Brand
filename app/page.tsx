"use client"

import { useRef } from "react"
import { DocumentFrame } from "@/components/document-frame"
import { TitleBlock } from "@/components/title-block"
import { HeroCanvas } from "@/components/hero-canvas"
import { ProjectsSection } from "@/components/projects-section"
import { ExperimentsSection } from "@/components/experiments-section"
import { InfoBlock } from "@/components/info-block"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactBlock } from "@/components/contact-block"

export default function Portfolio() {
  const projectsRef = useRef<HTMLElement>(null)
  const experimentsRef = useRef<HTMLElement>(null)
  const processRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <DocumentFrame>
      <TitleBlock
        onProjectsClick={() => scrollTo(projectsRef)}
        onExperimentsClick={() => scrollTo(experimentsRef)}
        onProcessClick={() => scrollTo(processRef)}
        onTestimonialsClick={() => scrollTo(testimonialsRef)}
        onContactClick={() => scrollTo(contactRef)}
      />
      <HeroCanvas 
        onNavigate={(section) => {
          if (section === "projects") scrollTo(projectsRef)
          else if (section === "experiments") scrollTo(experimentsRef)
          else if (section === "process") scrollTo(processRef)
          else if (section === "testimonials") scrollTo(testimonialsRef)
          else if (section === "contact") scrollTo(contactRef)
        }}
      />
      <ProjectsSection ref={projectsRef} />
      <ExperimentsSection ref={experimentsRef} />
      <InfoBlock ref={processRef} />
      <TestimonialsSection ref={testimonialsRef} />
      <ContactBlock ref={contactRef} />
    </DocumentFrame>
  )
}
