"use client"

import { useRef } from "react"
import { PortfolioShell } from "@/components/portfolio-shell"
import { PortfolioHeader } from "@/components/portfolio-header"
import { HeroSection } from "@/components/hero-section"
import { OperationsSection } from "@/components/operations-section"
import { SystemsSection } from "@/components/systems-section"
import { ExperimentsSection } from "@/components/experiments-section"
import { ContactSection } from "@/components/contact-section"

export default function PortfolioPage() {
  const operationsRef = useRef<HTMLElement>(null)
  const systemsRef = useRef<HTMLElement>(null)
  const experimentsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <PortfolioShell>
      <PortfolioHeader
        onOperationsClick={() => scrollTo(operationsRef)}
        onSystemsClick={() => scrollTo(systemsRef)}
        onExperimentsClick={() => scrollTo(experimentsRef)}
        onContactClick={() => scrollTo(contactRef)}
      />
      <HeroSection
        onNavigate={(section) => {
          if (section === "operations") scrollTo(operationsRef)
          else if (section === "systems") scrollTo(systemsRef)
          else if (section === "experiments") scrollTo(experimentsRef)
          else if (section === "contact") scrollTo(contactRef)
        }}
      />
      <OperationsSection ref={operationsRef} />
      <SystemsSection ref={systemsRef} />
      <ExperimentsSection ref={experimentsRef} />
      <ContactSection ref={contactRef} />
    </PortfolioShell>
  )
}
