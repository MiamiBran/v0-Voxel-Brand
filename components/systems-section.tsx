"use client"

import { forwardRef, useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { systemsSectionContent, type SystemsDetailSectionKey } from "@/lib/site-content"

const { phases, detailSections } = systemsSectionContent

type DetailTabContent = {
  title: string
  subtitle: string
  thinking: string
  steps: Array<{
    num: string
    name: string
    desc: string
  }>
}

function getCurrentDetailTab(section: SystemsDetailSectionKey, activeTab: string) {
  const sectionData = detailSections[section]
  const tabKeys = Object.keys(sectionData.subtabs) as Array<keyof typeof sectionData.subtabs>
  const resolvedKey = tabKeys.includes(activeTab as keyof typeof sectionData.subtabs)
    ? (activeTab as keyof typeof sectionData.subtabs)
    : tabKeys[0]

  return sectionData.subtabs[resolvedKey] as DetailTabContent
}

export const SystemsSection = forwardRef<HTMLElement>(function SystemsSection(_, ref) {
  const [isKeynoteOpen, setIsKeynoteOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [activeDetailSection, setActiveDetailSection] = useState<SystemsDetailSectionKey>("systems")
  const [activeDetailTab, setActiveDetailTab] = useState<string>("digital")
  const sectionRef = useRef<HTMLElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const currentDetailSectionData = detailSections[activeDetailSection]
  const detailTabKeys = Object.keys(currentDetailSectionData.subtabs)
  const currentDetailTabData = getCurrentDetailTab(activeDetailSection, activeDetailTab)

  useEffect(() => {
    const firstTab = Object.keys(detailSections[activeDetailSection].subtabs)[0]
    setActiveDetailTab(firstTab)
  }, [activeDetailSection])

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === "dark"
  const getColor = (colors: { light: string; dark: string }) => isDark ? colors.dark : colors.light

  return (
    <section
      ref={(node) => {
        sectionRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      }}
      className="py-12 md:py-20 px-5 md:px-10 relative"
      data-section="SYSTEMS"
    >
      <div className="border border-border bg-card/50 backdrop-blur-sm max-w-3xl">
        <div className="flex items-start justify-between gap-6 px-4 md:px-5 py-3 border-b border-border">
          <div className="flex items-baseline gap-3">
            <h2 className="text-xs font-mono font-bold tracking-wide text-foreground">
              {systemsSectionContent.title}
            </h2>
            <span className="text-[9px] font-mono text-foreground/35 tracking-[0.2em]">
              {systemsSectionContent.floorLabel}
            </span>
          </div>

          <div className="relative flex flex-col items-end gap-2">
            <button
              onClick={() => setIsKeynoteOpen((current) => !current)}
              aria-expanded={isKeynoteOpen}
              className="group inline-flex items-center gap-2 border border-border bg-background/65 px-3 py-2 min-h-[40px] text-[9px] font-mono text-foreground/55 tracking-[0.16em] hover:border-foreground/20 hover:bg-secondary/40 hover:text-foreground active:bg-secondary/50 transition-colors touch-manipulation"
            >
              <span
                className="h-1.5 w-1.5 border border-current transition-transform duration-200 group-hover:scale-110"
                style={{ color: getColor(phases[1].color) }}
              />
              <span>{systemsSectionContent.keynote.triggerLabel}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={`text-foreground/35 transition-transform duration-200 ${isKeynoteOpen ? "translate-x-0.5" : ""}`}
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={() => setIsDetailOpen(true)}
              className="group inline-flex items-center gap-2 border border-border bg-background/65 px-3 py-2 min-h-[44px] text-[9px] font-mono text-foreground/55 tracking-[0.16em] hover:border-foreground/20 hover:bg-secondary/40 hover:text-foreground active:bg-secondary/50 transition-colors touch-manipulation"
            >
              <span
                className="h-1.5 w-1.5 border border-current transition-transform duration-200 group-hover:scale-110"
                style={{ color: getColor(phases[1].color) }}
              />
              <span>{systemsSectionContent.detail.buttonLabel}</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-foreground/35 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>

            <div
              className={`absolute right-0 bottom-full mb-2 w-[min(20rem,calc(100vw-3rem))] transition-all duration-300 ${
                isKeynoteOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
              }`}
            >
              <div className="border border-border bg-background/95 backdrop-blur-sm shadow-[8px_8px_0_rgba(0,0,0,0.06)]">
                <div className="flex items-center justify-between gap-3 border-b border-border px-3 py-2">
                  <span className="text-[8px] font-mono text-foreground/45 tracking-[0.2em]">
                    {systemsSectionContent.keynote.noteLabel}
                  </span>
                  <span
                    className="text-[8px] font-mono tracking-[0.2em]"
                    style={{ color: getColor(phases[1].color) }}
                  >
                    {systemsSectionContent.floorLabel}
                  </span>
                </div>

                <div className="space-y-3 px-3 py-3">
                  <h3
                    className="text-[10px] font-mono font-bold tracking-[0.08em]"
                    style={{ color: getColor(phases[1].color) }}
                  >
                    {systemsSectionContent.keynote.title}
                  </h3>
                  <p className="text-[9px] font-mono leading-relaxed text-foreground/55">
                    {systemsSectionContent.keynote.body}
                  </p>
                  <div className="border-t border-border pt-3">
                    <div className="text-[8px] font-mono text-foreground/35 tracking-[0.2em]">
                      {systemsSectionContent.keynote.detailLabel}
                    </div>
                    <p className="mt-1 text-[8px] font-mono leading-relaxed text-foreground/50">
                      {systemsSectionContent.keynote.detailBody}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 md:px-5 py-4 border-b border-border">
          <span className="text-[8px] font-mono text-foreground/35 tracking-[0.18em]">
            {systemsSectionContent.generalNotes.label}
          </span>
          <p className="mt-2 text-[10px] font-mono leading-relaxed text-foreground/60 max-w-xl">
            {systemsSectionContent.generalNotes.body}
          </p>
        </div>

        <div className="hidden sm:flex items-center border-b border-border text-[8px] font-mono text-foreground/35 tracking-[0.15em]">
          <span className="w-10 px-3 py-2 border-r border-border text-center">
            {systemsSectionContent.tableHeaders.phase}
          </span>
          <span className="flex-1 px-4 py-2 border-r border-border">
            {systemsSectionContent.tableHeaders.approach}
          </span>
          <span className="w-40 px-4 py-2">
            {systemsSectionContent.tableHeaders.outputs}
          </span>
        </div>

        {phases.map((phase) => (
          <article key={phase.name} className="border-b border-border last:border-b-0">
            <div className="flex items-stretch">
              <div className="w-10 shrink-0 border-r border-border flex flex-col items-center justify-center py-4 gap-2">
                <div className="w-3 h-3" style={{ backgroundColor: getColor(phase.color) }} />
                <span className="text-[8px] font-mono text-foreground/40">{phase.num}</span>
              </div>

              <div className="flex-1 px-4 py-3 sm:border-r sm:border-border">
                <h3 className="text-[11px] font-mono font-bold text-foreground tracking-wide">
                  {phase.name}
                </h3>
                <p className="text-[10px] font-mono text-foreground/55 leading-relaxed mt-2">
                  {phase.description}
                </p>
              </div>

              <div className="w-40 shrink-0 hidden sm:flex flex-col justify-center px-4 py-3 gap-1.5">
                {phase.outputs.map((output) => (
                  <span key={output} className="text-[9px] font-mono text-foreground/40 tracking-wide">
                    {output}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {isDetailOpen && (
        <div
          className="fixed md:absolute inset-4 md:inset-auto md:top-12 md:right-8 z-50 md:z-20 md:w-80 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 md:slide-in-from-right-4 duration-300 flex flex-col"
          style={{
            boxShadow: "6px 6px 0 rgba(0,0,0,0.1), 12px 12px 20px rgba(0,0,0,0.08)",
          }}
        >
          <div className="bg-card border border-border flex flex-col h-full md:h-auto overflow-hidden">
            <div className="px-3 py-3 border-b border-border flex items-center justify-between shrink-0">
              <span className="text-[9px] font-mono text-foreground/50 tracking-[0.15em]">
                {systemsSectionContent.detail.panelLabel}
              </span>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-secondary/50 active:bg-secondary/60 transition-colors touch-manipulation -mr-1"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-foreground/60">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex border-b border-border bg-secondary/20 shrink-0">
              {(Object.keys(detailSections) as SystemsDetailSectionKey[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveDetailSection(key)}
                  className={`flex-1 px-2 py-3 min-h-[44px] text-[9px] md:text-[8px] font-mono tracking-wider transition-colors touch-manipulation ${
                    activeDetailSection === key
                      ? "text-foreground bg-card border-b-2 border-foreground/40"
                      : "text-foreground/35 hover:text-foreground/55 active:text-foreground/70"
                  }`}
                >
                  {detailSections[key].label}
                </button>
              ))}
            </div>

            <div className="flex border-b border-border shrink-0">
              {detailTabKeys.map((key, i) => (
                <button
                  key={key}
                  onClick={() => setActiveDetailTab(key)}
                  className={`flex-1 px-3 py-3 min-h-[44px] text-[10px] md:text-[9px] font-mono tracking-wide transition-colors touch-manipulation ${
                    activeDetailTab === key
                      ? "text-foreground bg-secondary/30 border-b-2 border-foreground/50"
                      : "text-foreground/40 hover:text-foreground/60 active:text-foreground/80"
                  } ${i > 0 ? "border-l border-border" : ""}`}
                >
                  {key.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="p-4 md:p-3 space-y-3 overflow-y-auto flex-1">
              <div>
                <h4 className="text-[10px] font-mono font-bold text-foreground tracking-wide">
                  {currentDetailTabData.title}
                </h4>
                <p className="text-[8px] font-mono text-foreground/40 mt-0.5">
                  {currentDetailTabData.subtitle}
                </p>
              </div>

              <div className="border-l-2 border-foreground/20 pl-2">
                <p className="text-[8px] font-mono text-foreground/60 leading-relaxed italic">
                  {currentDetailTabData.thinking}
                </p>
              </div>

              <div className="space-y-1.5">
                {currentDetailTabData.steps.map((step, i) => (
                  <div
                    key={step.num}
                    className="flex items-start gap-2 p-1.5 bg-secondary/20 border border-border/50"
                    style={{ transform: `rotate(${i % 2 === 0 ? -0.2 : 0.2}deg)` }}
                  >
                    <div
                      className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: getColor(phases[i].color) }}
                    >
                      <span className="text-[7px] font-mono text-white font-bold">{step.num}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[9px] font-mono font-bold text-foreground">{step.name}</span>
                      <p className="text-[7px] font-mono text-foreground/50 mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-border/50 text-center">
                <span className="text-[7px] font-mono text-foreground/35 tracking-[0.15em]">
                  {currentDetailTabData.title} REV.01
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
})
