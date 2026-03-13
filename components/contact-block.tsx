"use client"

import { forwardRef } from "react"

export const ContactBlock = forwardRef<HTMLElement>(function ContactBlock(_, ref) {
  return (
    <section ref={ref} className="py-12 md:py-20 border-t border-border px-5 md:px-10" data-section="CONTACT">
      <div className="flex items-baseline justify-between mb-8">
        <div className="flex items-baseline gap-3">
          <h2 className="text-sm md:text-base font-mono font-bold tracking-tight text-foreground">CONTACT</h2>
          <span className="text-[7px] font-mono text-muted-foreground/25 tracking-[0.2em]">SEC. 04</span>
        </div>
      </div>

      {/* Contact block -- styled as a revision/approval block on a drawing sheet */}
      <div className="border border-border max-w-lg">
        <div className="border-b border-border px-4 py-1.5 text-[7px] font-mono text-muted-foreground/25 tracking-[0.2em]">
          INQUIRIES
        </div>

        <div className="px-4 py-5">
          <p className="text-[10px] md:text-xs font-mono text-foreground/60 leading-relaxed mb-5">
            For print editions, commissions, licensing, or collaboration.
          </p>

          <a
            href="mailto:studio@isometricstrata.com"
            className="text-xs md:text-sm font-mono text-foreground hover:text-accent transition-colors tracking-wide inline-block border-b border-foreground/15 hover:border-accent pb-px"
          >
            studio@isometricstrata.com
          </a>

          <div className="flex flex-wrap gap-5 mt-6 pt-4 border-t border-border">
            {["INSTAGRAM", "TWITTER/X", "BEHANCE", "ARE.NA"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-[8px] font-mono tracking-[0.15em] text-muted-foreground/35 hover:text-foreground transition-colors py-1"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* End of document */}
      <footer className="mt-20 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[7px] font-mono text-muted-foreground/20 tracking-[0.2em]">
          <span>ISOMETRIC STRATA</span>
          <span>END OF DOCUMENT</span>
          <span>{'© 2026'}</span>
        </div>
      </footer>
    </section>
  )
})
