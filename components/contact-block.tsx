"use client"

import { forwardRef } from "react"

export const ContactBlock = forwardRef<HTMLElement>(function ContactBlock(_, ref) {
  return (
    <section ref={ref} className="py-16 md:py-24 border-t border-border px-5 md:px-10" data-section="CONTACT">
      {/* Section header */}
      <div className="flex items-baseline justify-between mb-8 md:mb-12">
        <h2 className="text-lg md:text-xl font-mono font-bold tracking-tight text-foreground">
          CONTACT
        </h2>
      </div>

      <div className="max-w-2xl">
        <p className="text-sm font-mono text-foreground/85 leading-relaxed mb-6">
          For print editions, commissions, licensing, or collaboration inquiries.
        </p>

        <a
          href="mailto:studio@isometricstrata.com"
          className="text-sm md:text-base font-mono text-foreground hover:text-accent transition-colors tracking-wide border-b border-foreground/20 hover:border-accent pb-0.5"
        >
          studio@isometricstrata.com
        </a>

        {/* Social links */}
        <div className="flex flex-wrap gap-4 mt-8">
          <SocialLink label="INSTAGRAM" href="#" />
          <SocialLink label="TWITTER/X" href="#" />
          <SocialLink label="BEHANCE" href="#" />
          <SocialLink label="ARE.NA" href="#" />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 md:mt-24 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[10px] font-mono text-muted-foreground/40 tracking-widest">
          <span>ISOMETRIC STRATA</span>
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
      className="text-[10px] font-mono tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2 min-h-[44px] flex items-center"
    >
      {label}
    </a>
  )
}
