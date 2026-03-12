"use client"

import { forwardRef } from "react"

export const ContactBlock = forwardRef<HTMLElement>(function ContactBlock(_, ref) {
  return (
    <section ref={ref} className="py-16 md:py-24 border-t border-border" data-section="S4">
      {/* ── SECTION HEADER ── */}
      <div className="flex items-start justify-between mb-8 md:mb-12">
        <div>
          <div className="annotation text-muted-foreground/50 mb-2">SECTION 04</div>
          <h2 className="text-lg md:text-xl font-mono font-bold tracking-tight text-foreground">
            CONTACT
          </h2>
        </div>
        <div className="annotation text-right text-muted-foreground/50 hidden sm:block">
          <div>STATUS: AVAILABLE</div>
          <div>RESPONSE: 24-48H</div>
        </div>
      </div>

      {/* ── CONTACT GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-border border border-border">
        {/* Main contact */}
        <div className="bg-card p-6 md:p-8 lg:col-span-2">
          <span className="annotation text-muted-foreground/50 block mb-4 pb-3 border-b border-border">
            INQUIRIES
          </span>
          <p className="text-sm font-mono text-foreground/85 leading-relaxed mb-6">
            For print editions, commissions, licensing, or collaboration inquiries.
            Original works available as archival prints on heavyweight stock.
          </p>

          <a
            href="mailto:studio@isometricstrata.com"
            className="inline-flex items-center gap-3 group mb-8"
          >
            <span className="w-2.5 h-2.5 border border-foreground group-hover:bg-accent group-hover:border-accent transition-colors" />
            <span className="text-sm md:text-base font-mono text-foreground hover:text-accent transition-colors tracking-wide">
              studio@isometricstrata.com
            </span>
          </a>

          <div className="border-t border-border pt-5">
            <span className="annotation text-muted-foreground/50 block mb-3">FOLLOW</span>
            <div className="flex flex-wrap gap-3">
              <SocialLink label="INSTAGRAM" href="#" />
              <SocialLink label="TWITTER/X" href="#" />
              <SocialLink label="BEHANCE" href="#" />
              <SocialLink label="ARE.NA" href="#" />
            </div>
          </div>
        </div>

        {/* Coordinates */}
        <div className="bg-card p-6 md:p-8">
          <span className="annotation text-muted-foreground/50 block mb-4 pb-3 border-b border-border">
            COORDINATES
          </span>
          <div className="flex flex-col gap-4 text-xs font-mono">
            <CoordField label="LAT" value={'47.3769\u00B0 N'} />
            <CoordField label="LON" value={'8.5417\u00B0 E'} />
            <CoordField label="CITY" value="ZURICH, CH" />
            <CoordField label="TZ" value="CET (UTC+1)" />
          </div>

          {/* Mini compass drawing */}
          <div className="mt-8 flex justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" className="text-muted-foreground/30">
              <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <line x1="24" y1="2" x2="24" y2="10" stroke="currentColor" strokeWidth="1" />
              <line x1="24" y1="38" x2="24" y2="46" stroke="currentColor" strokeWidth="0.5" />
              <line x1="2" y1="24" x2="10" y2="24" stroke="currentColor" strokeWidth="0.5" />
              <line x1="38" y1="24" x2="46" y2="24" stroke="currentColor" strokeWidth="0.5" />
              <text x="24" y="17" textAnchor="middle" className="fill-muted-foreground text-[6px] font-mono">N</text>
              <circle cx="24" cy="24" r="1.5" className="fill-muted-foreground/40" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── FOOTER / TITLE BLOCK REPRISE ── */}
      <footer className="mt-12 pt-6 border-t border-border">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Left: Logo reprise */}
          <div>
            <div className="text-base md:text-lg font-mono font-bold text-foreground tracking-tight">
              ISOMETRIC STRATA
            </div>
            <div className="annotation text-muted-foreground/40 mt-1">
              ARCHITECTURAL DIAGRAM STUDIES
            </div>
          </div>

          {/* Right: Meta */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 annotation text-muted-foreground/40">
            <span>{'© 2026'}</span>
            <span>ALL RIGHTS RESERVED</span>
            <span>DWG: IS-2026 REV.01</span>
          </div>
        </div>

        {/* Bottom dimension line — decorative closing mark */}
        <div className="mt-8 flex items-center gap-2">
          <div className="flex-1 h-px bg-border" />
          <span className="annotation text-muted-foreground/30">END OF DOCUMENT</span>
          <div className="flex-1 h-px bg-border" />
        </div>
      </footer>
    </section>
  )
})

function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="text-[10px] font-mono tracking-widest px-3 py-2 border border-border text-muted-foreground hover:border-foreground hover:bg-foreground hover:text-background transition-colors min-h-[44px] flex items-center"
    >
      {label}
    </a>
  )
}

function CoordField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-muted-foreground/50 block text-[10px] tracking-widest mb-0.5">
        {label}
      </span>
      <span className="text-foreground">{value}</span>
    </div>
  )
}
