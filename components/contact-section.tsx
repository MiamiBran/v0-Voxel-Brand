"use client"

import { forwardRef } from "react"
import { contactSectionContent } from "@/lib/site-content"

export const ContactSection = forwardRef<HTMLElement>(function ContactSection(_, ref) {
  return (
    <section 
      ref={ref} 
      className="py-12 md:py-20 px-5 md:px-10" 
      data-section="CONTACT"
    >
      {/* Floating floor container with depth */}
      <div className="border border-border bg-card/50 backdrop-blur-sm max-w-lg">
        {/* Section header inside the card */}
        <div className="flex items-baseline justify-between px-4 md:px-5 py-3 border-b border-border">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xs font-mono font-bold tracking-wide text-foreground">{contactSectionContent.title}</h2>
            <span className="text-[9px] font-mono text-foreground/35 tracking-[0.2em]">{contactSectionContent.floorLabel}</span>
          </div>
        </div>

        {/* Contact content */}
        <div className="px-4 md:px-5 py-5">
          <p className="text-[10px] font-mono text-foreground/64 leading-relaxed mb-5 max-w-sm">
            {contactSectionContent.intro}
          </p>

          <a
            href={`mailto:${contactSectionContent.email}`}
            className="text-[12px] md:text-[11px] font-mono text-foreground hover:text-accent active:text-accent transition-colors tracking-wide inline-block border-b border-foreground/30 hover:border-accent pb-px touch-manipulation"
          >
            {contactSectionContent.email}
          </a>

          <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border">
            {contactSectionContent.socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] md:text-[9px] font-mono tracking-wider text-foreground/40 hover:text-foreground active:text-foreground transition-colors px-2 py-2 min-h-[44px] flex items-center touch-manipulation"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* End of document */}
      <footer className="mt-16 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[9px] font-mono text-foreground/30 tracking-wider">
          <span>{contactSectionContent.footer.name}</span>
          <span className="text-foreground/20">{contactSectionContent.footer.ending}</span>
          <span>{contactSectionContent.footer.year}</span>
        </div>
      </footer>
    </section>
  )
})
