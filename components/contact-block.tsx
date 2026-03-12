"use client"

import { forwardRef } from "react"

export const ContactBlock = forwardRef<HTMLElement>(function ContactBlock(_, ref) {
  return (
    <section ref={ref} className="py-16 md:py-24 border-t border-border" data-section="S4">
      {/* Section header */}
      <div className="flex items-start justify-between mb-8 md:mb-12">
        <div>
          <div className="annotation mb-2">SECTION 04</div>
          <h2 className="text-lg md:text-xl font-mono font-bold tracking-tight">CONTACT</h2>
        </div>
        <div className="annotation text-right hidden sm:block">
          <div>STATUS: AVAILABLE</div>
          <div>RESPONSE: 24-48H</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border">
        {/* Main contact */}
        <div className="bg-card p-6 md:p-8 lg:col-span-2">
          <span className="annotation block mb-4 pb-3 border-b border-border">INQUIRIES</span>
          <div className="space-y-6">
            <p className="text-sm md:text-base font-mono text-foreground/90 leading-relaxed">
              For print editions, commissions, licensing, or collaboration inquiries.
            </p>
            
            <a 
              href="mailto:studio@isometricstrata.com"
              className="inline-flex items-center gap-3 group"
            >
              <span className="w-3 h-3 border border-foreground group-hover:bg-accent group-hover:border-accent transition-colors" />
              <span className="text-base md:text-lg font-mono hover:text-accent transition-colors">
                studio@isometricstrata.com
              </span>
            </a>

            <div className="pt-6 border-t border-border">
              <span className="annotation block mb-4">FOLLOW</span>
              <div className="flex flex-wrap gap-4">
                <SocialLink label="INSTAGRAM" href="#" />
                <SocialLink label="TWITTER" href="#" />
                <SocialLink label="BEHANCE" href="#" />
                <SocialLink label="ARENA" href="#" />
              </div>
            </div>
          </div>
        </div>

        {/* Location info */}
        <div className="bg-card p-6 md:p-8">
          <span className="annotation block mb-4 pb-3 border-b border-border">COORDINATES</span>
          <div className="space-y-4 text-sm font-mono">
            <div>
              <span className="text-muted-foreground block mb-1">LATITUDE:</span>
              <span>47.3769° N</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">LONGITUDE:</span>
              <span>8.5417° E</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">CITY:</span>
              <span>ZÜRICH, CH</span>
            </div>
            <div>
              <span className="text-muted-foreground block mb-1">TIMEZONE:</span>
              <span>CET (UTC+1)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-2">
            <div className="text-lg md:text-xl font-mono font-bold">ISOMETRIC STRATA</div>
            <div className="annotation">ARCHITECTURAL DIAGRAM STUDIES</div>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-xs font-mono text-muted-foreground">
            <span>© 2026</span>
            <span>ALL RIGHTS RESERVED</span>
            <span>DWG: IS-2026 REV.01</span>
          </div>
        </div>
      </footer>
    </section>
  )
})

function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <a 
      href={href}
      className="text-sm font-mono px-3 py-2 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-colors min-h-[44px] flex items-center"
    >
      {label}
    </a>
  )
}
