"use client"

import { forwardRef } from "react"

export const ContactBlock = forwardRef<HTMLElement>(function ContactBlock(_, ref) {
  return (
    <section 
      ref={ref} 
      className="py-12 md:py-20 px-5 md:px-10" 
      data-section="CONTACT"
    >
      {/* Floating floor container with depth */}
      <div className="border border-border bg-card/50 backdrop-blur-sm max-w-lg">
        {/* Section header inside the card */}
        <div className="flex items-baseline justify-between px-5 md:px-6 py-4 border-b border-border">
          <div className="flex items-baseline gap-3">
            <h2 className="text-sm md:text-base font-mono font-bold tracking-tight text-foreground">CONTACT</h2>
            <span className="text-[8px] font-mono text-foreground/35 tracking-[0.2em]">SEC. 03</span>
          </div>
        </div>

        {/* Contact content */}
        <div className="px-5 md:px-6 py-5">
          <p className="text-[10px] md:text-xs font-mono text-foreground/60 leading-relaxed mb-5">
            For print editions, commissions, licensing, or collaboration.
          </p>

          <a
            href="mailto:hello@bartlettbuilds.pro"
            className="text-sm md:text-base font-mono text-foreground hover:text-accent transition-colors tracking-wide inline-block border-b border-foreground/30 hover:border-accent pb-px"
          >
            hello@bartlettbuilds.pro
          </a>

          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-border">
            {[
              { label: "SUBSTACK", href: "https://substack.com/@brandonbartlett" },
              { label: "LINKEDIN", href: "https://linkedin.com/in/brandonbartlett" },
              { label: "X", href: "https://x.com/brandonbartlett" },
              { label: "INSTAGRAM", href: "https://instagram.com/brandonbartlett" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] md:text-xs font-mono tracking-[0.1em] text-foreground/50 hover:text-foreground transition-colors py-2 px-2 -mx-2 hover:bg-secondary/30 rounded"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* End of document */}
      <footer className="mt-20 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[9px] font-mono text-foreground/40 tracking-[0.15em]">
          <span>BRANDON BARTLETT</span>
          <span>END OF DOCUMENT</span>
          <span>{'© 2026'}</span>
        </div>
      </footer>
    </section>
  )
})
