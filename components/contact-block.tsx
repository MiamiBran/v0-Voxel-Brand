"use client"

import { forwardRef } from "react"

export const ContactBlock = forwardRef<HTMLElement>(function ContactBlock(_, ref) {
  return (
    <section ref={ref} className="py-12 md:py-20 border-t border-border px-5 md:px-8" data-section="CONTACT">
      {/* Section header */}
      <div className="flex items-baseline justify-between mb-6 md:mb-10">
        <div className="flex items-baseline gap-3">
          <h2 className="text-base md:text-lg font-mono font-bold tracking-tight text-foreground">
            CONTACT
          </h2>
          <span className="text-[8px] font-mono text-muted-foreground/30 tracking-widest">
            SEC. 04
          </span>
        </div>
      </div>

      {/* Contact info in a bordered container — like a revision/approval block on a drawing sheet */}
      <div className="border border-border max-w-lg">
        <div className="border-b border-border px-4 py-1.5 text-[8px] font-mono text-muted-foreground/30 tracking-widest">
          INQUIRIES
        </div>

        <div className="px-4 py-4">
          <p className="text-xs font-mono text-foreground/70 leading-relaxed mb-4">
            For print editions, commissions, licensing, or collaboration.
          </p>

          <a
            href="mailto:studio@isometricstrata.com"
            className="text-xs md:text-sm font-mono text-foreground hover:text-accent transition-colors tracking-wide inline-flex items-center gap-2 group"
          >
            <span className="border-b border-foreground/20 group-hover:border-accent pb-px transition-colors">
              studio@isometricstrata.com
            </span>
          </a>

          {/* Social links */}
          <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-border">
            <SocialLink label="INSTAGRAM" href="#" />
            <SocialLink label="TWITTER/X" href="#" />
            <SocialLink label="BEHANCE" href="#" />
            <SocialLink label="ARE.NA" href="#" />
          </div>
        </div>
      </div>

      {/* Footer — end of document marker */}
      <footer className="mt-16 md:mt-20 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[8px] font-mono text-muted-foreground/25 tracking-widest">
          <span>ISOMETRIC STRATA</span>
          <span>END OF DOCUMENT</span>
          <span>{'© 2026'}</span>
        </div>
      </footer>
    </section>
  )
})

function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="text-[9px] font-mono tracking-widest text-muted-foreground/40 hover:text-foreground transition-colors py-1.5 min-h-[44px] flex items-center"
    >
      {label}
    </a>
  )
}
