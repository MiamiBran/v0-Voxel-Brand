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
        <div className="flex items-baseline justify-between px-6 md:px-8 py-5 border-b border-border">
          <div className="flex items-baseline gap-4">
            <h2 className="text-lg md:text-xl font-mono font-bold tracking-tight text-foreground">CONTACT</h2>
            <span className="text-[10px] font-mono text-foreground/30 tracking-[0.3em]">F4</span>
          </div>
        </div>

        {/* Contact content */}
        <div className="px-6 md:px-8 py-8">
          <p className="text-sm md:text-base text-foreground/55 leading-[1.7] mb-8 max-w-sm">
            Writing, creative signal, and direct contact. Let's build something.
          </p>

          <a
            href="mailto:hello@bartlettbuilds.pro"
            className="text-lg md:text-xl font-mono text-foreground hover:text-accent transition-colors tracking-tight inline-block border-b-2 border-foreground/20 hover:border-accent pb-1"
          >
            hello@bartlettbuilds.pro
          </a>

          <div className="flex flex-wrap gap-6 mt-10 pt-6 border-t border-border">
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
                className="text-[11px] font-mono tracking-widest text-foreground/40 hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* End of document */}
      <footer className="mt-24 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs font-mono text-foreground/30 tracking-widest">
          <span>BRANDON BARTLETT</span>
          <span className="text-foreground/20">END OF DOCUMENT</span>
          <span>{'© 2026'}</span>
        </div>
      </footer>
    </section>
  )
})
