"use client"

import { useRef } from "react"
import { DocumentFrame } from "@/components/document-frame"
import { TitleBlock } from "@/components/title-block"
import { HeroCanvas } from "@/components/hero-canvas"
import { ProjectsSection } from "@/components/projects-section"
import { InfoBlock } from "@/components/info-block"
import { ContactBlock } from "@/components/contact-block"

export default function Portfolio() {
  const projectsRef = useRef<HTMLElement>(null)
  const infoRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <DocumentFrame>
      <TitleBlock
        onProjectsClick={() => scrollTo(projectsRef)}
        onInfoClick={() => scrollTo(infoRef)}
        onContactClick={() => scrollTo(contactRef)}
      />
      <HeroCanvas 
        onNavigate={(section) => {
          if (section === "projects") scrollTo(projectsRef)
          else if (section === "info") scrollTo(infoRef)
          else if (section === "contact") scrollTo(contactRef)
        }}
      />
      <ProjectsSection ref={projectsRef} />
      <InfoBlock ref={infoRef} />
      <ContactBlock ref={contactRef} />
    </DocumentFrame>
  )
}
