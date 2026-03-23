export const portfolioMetadata = {
  title: "Isometric Strata \u2014 Architectural Diagrams",
  description:
    "Exploring architectural form through isometric visualization. Constructivist, Deconstructivist, Brutalist, and Metabolist studies.",
  generator: "v0.app",
  viewportThemeColor: "#ebe8e3",
}

export const portfolioShellContent = {
  logo: "BB",
  sections: [
    { id: "HEADER", label: "F0", percent: 12 },
    { id: "HERO", label: "\u2014", percent: 22 },
    { id: "OPERATIONS", label: "F1", percent: 40 },
    { id: "SYSTEMS", label: "F2", percent: 55 },
    { id: "EXPERIMENTS", label: "F3", percent: 72 },
    { id: "CONTACT", label: "F4", percent: 97 },
  ],
}

export const portfolioHeaderContent = {
  drawingNotes: {
    projection: "PROJECTION: ISOMETRIC 30\u00B0",
    substrate: "SUBSTRATE: 5mm GRID",
    drawingNumber: "DWG NO. IS-2026-001",
  },
  name: "BRANDON BARTLETT",
  subtitle: "Execution Architect \u2022 Field Operations \u2022 Systems Builder",
  thesis: "Field systems, project structure, and technical workflows for real-world execution.",
  indexEntries: [
    {
      num: "F1",
      label: "OPERATIONS",
      target: "operations",
      color: { light: "#C24B75", dark: "#FF4D8D" },
    },
    {
      num: "F2",
      label: "SYSTEMS",
      target: "systems",
      color: { light: "#0099B3", dark: "#00D9FF" },
    },
    {
      num: "F3",
      label: "EXPERIMENTS",
      target: "experiments",
      color: { light: "#2D9B6E", dark: "#A855F7" },
    },
  ],
  contactEntry: {
    num: "F4",
    label: "CONTACT",
    target: "contact",
    color: { light: "#C9A227", dark: "#FFD93D" },
    indexLabel: "INDEX",
    actionLinks: [
      {
        label: "BOOK A CALL",
        href: "https://cal.com/brandonbartlett",
        kind: "calendar",
        external: true,
      },
      {
        label: "EMAIL",
        href: "mailto:hello@bartlettbuilds.pro",
        kind: "email",
      },
      {
        label: "RESUME",
        href: "/Brandon-Bartlett-CV.pdf",
        kind: "download",
        download: true,
      },
    ],
  },
}

export const heroSectionContent = {
  drawingLevels: [
    {
      id: "F1",
      label: "OPERATIONS",
      color: "#C24B75",
      darkColor: "#FF4D8D",
      section: "operations",
      legend: "Project index and case studies",
      keynote: {
        title: "OPERATIONS",
        body: "Field execution, coordination, handoffs, and delivery under pressure.",
      },
    },
    {
      id: "F2",
      label: "SYSTEMS",
      color: "#0099B3",
      darkColor: "#00D9FF",
      section: "systems",
      legend: "Process and systems design",
      keynote: {
        title: "SYSTEMS",
        body: "Execution structure for messy work, built around ownership, sequence, and follow-through.",
      },
    },
    {
      id: "F3",
      label: "EXPERIMENTS",
      color: "#2D9B6E",
      darkColor: "#A855F7",
      section: "experiments",
      legend: "Experiments, test builds, and systems in motion",
      keynote: {
        title: "EXPERIMENTS",
        body: "Working prototypes, internal tools, and live systems still taking shape.",
      },
    },
    {
      id: "F4",
      label: "CONTACT",
      color: "#C9A227",
      darkColor: "#FFD93D",
      section: "contact",
      legend: "Get in touch",
      keynote: {
        title: "BEST FIT",
        body: "Superintendent, assistant PM, PM-track, project coordination, and systems-minded delivery roles.",
      },
    },
  ],
}

export const operationsSectionContent = {
  title: "OPERATIONS",
  floorLabel: "F1",
  generalNotes: {
    label: "GENERAL NOTES",
    body: "Real work across field execution, coordination, handoffs, and delivery under pressure.",
  },
  drawingModes: {
    caseStudies: "CASE STUDIES",
    operations: "OPERATIONS",
  },
  scheduleHeaders: {
    caseStudies: {
      project: "PROJECT",
      domain: "DOMAIN",
      type: "TYPE",
      palette: "PALETTE",
    },
    operations: {
      operation: "OPERATION",
      scope: "SCOPE",
      output: "OUTPUT",
    },
  },
  typeColors: {
    FIELD: "#E85D4C",
    SYSTEM: "#4A90A4",
    BUILD: "#F5C842",
    SIGNAL: "#9B6BC3",
    INFRA: "#45B07C",
  },
  caseStudySchedule: [
    {
      id: "01",
      project: "SSIG",
      domain: "Construction / Infrastructure",
      role: "Founder / Operator",
      signal: "Commercial remodel systems and structural execution thinking",
      type: "FIELD",
      palette: ["#505558", "#8C9196", "#4A6FA5", "#7B68EE"],
      keywords: ["durability", "execution", "systems", "field intelligence"],
    },
    {
      id: "02",
      project: "Bartlett Builds",
      domain: "Personal Brand / Portfolio",
      role: "Creative Director / Systems Builder",
      signal: "Public-facing identity layer for work, writing, and capability",
      type: "SIGNAL",
      palette: ["#FAF9F6", "#6B6B6B", "#1A1A1A", "#7000FF"],
      keywords: ["operator", "architectural", "restrained", "precise"],
    },
    {
      id: "03",
      project: "RunFrame",
      domain: "Execution Software / Personal OS",
      role: "Product Architect",
      signal: "Daily execution surface for routines, tasks, and module-based workflows",
      type: "SYSTEM",
      palette: ["#0A0A0A", "#7000FF", "#4ECDC4", "#6B7280"],
      keywords: ["execution", "modular", "alive", "kinetic"],
    },
    {
      id: "04",
      project: "RootFrame",
      domain: "Memory Engine / Knowledge Infrastructure",
      role: "Systems Architect",
      signal: "Structured memory base for AI, documents, and reusable context",
      type: "INFRA",
      palette: ["#1C1C1C", "#8B5CF6", "#D4D0C8", "#14B8A6"],
      keywords: ["depth", "cognition", "framework", "continuity"],
    },
    {
      id: "05",
      project: "The Art of Progress",
      domain: "Media / Writing / Analysis",
      role: "Strategist / Writer / Host",
      signal: "Narrative engine for worldview, systems thinking, and public intellectual output",
      type: "SIGNAL",
      palette: ["#1A1A1A", "#FFFFF0", "#7B68EE", "#B8860B"],
      keywords: ["analysis", "persuasion", "worldview", "signal"],
    },
    {
      id: "06",
      project: "OpenCLAW Ops Engine",
      domain: "Agent Systems / Automation",
      role: "Agent Designer / Workflow Architect",
      signal: "Autonomous operational support for planning, capture, scheduling, and execution",
      type: "BUILD",
      palette: ["#0A0A0A", "#4B5563", "#22C55E", "#7000FF"],
      keywords: ["autonomous", "operational", "capture", "orchestration"],
    },
    {
      id: "07",
      project: "Publix Remodel Execution",
      domain: "Field Operations / Construction",
      role: "Superintendent / Execution Lead",
      signal: "Real-world proof of logistics, coordination, sequencing, and chaos containment",
      type: "FIELD",
      palette: ["#FFFFFF", "#4B5563", "#4ADE80", "#F59E0B"],
      keywords: ["logistics", "coordination", "sequencing", "delivery"],
    },
    {
      id: "08",
      project: "Comet Construction",
      domain: "Operations / Remodel Delivery",
      role: "Day Superintendent",
      signal: "Live execution under real constraints, teams, timelines, and turnover pressure",
      type: "FIELD",
      palette: ["#6B7280", "#1A1A1A", "#3B82F6", "#F97316"],
      keywords: ["execution", "constraints", "teams", "pressure"],
    },
  ],
  operationSchedule: [
    {
      id: "01",
      operation: "Field Execution",
      scope: "Active construction sites",
      output: "Coordinated delivery across trades, schedule, access, constraints",
      tools: "Field coordination, daily planning, trade sequencing",
    },
    {
      id: "02",
      operation: "Systems Design",
      scope: "Workflows, planning, team structure",
      output: "Repeatable execution frameworks that survive turnover",
      tools: "Process architecture, documentation, training systems",
    },
    {
      id: "03",
      operation: "Documentation",
      scope: "Reports, tracking, punch logic, communication",
      output: "Cleaner visibility, fewer dropped details, faster recovery",
      tools: "Reporting cadence, issue tracking, status systems",
    },
    {
      id: "04",
      operation: "Operational Architecture",
      scope: "Projects, products, internal systems",
      output: "Structures that convert ambiguity into action",
      tools: "Workflow design, role mapping, decision frameworks",
    },
    {
      id: "05",
      operation: "Automation Thinking",
      scope: "AI workflows, capture systems, scheduling tools",
      output: "Less manual friction, tighter follow-through",
      tools: "Agent systems, automation logic, integration design",
    },
    {
      id: "06",
      operation: "Creative Strategy",
      scope: "Portfolio, writing, public-facing work",
      output: "Clearer identity, stronger signal, coherent narrative",
      tools: "Brand systems, content architecture, editorial direction",
    },
  ],
}

export type CaseStudyScheduleItem = (typeof operationsSectionContent.caseStudySchedule)[number]
export type OperationScheduleItem = (typeof operationsSectionContent.operationSchedule)[number]

export const systemsSectionContent = {
  title: "SYSTEMS DESIGN",
  floorLabel: "F2",
  generalNotes: {
    label: "GENERAL NOTES",
    body:
      "Operational environments fail when information, sequencing, and responsibility drift apart. I approach complex challenges like an architect approaches a building: understanding the load-bearing requirements before designing the structure.",
  },
  keynote: {
    triggerLabel: "KEY NOTE",
    noteLabel: "KEY NOTE",
    title: "SYSTEMS",
    body: "Ownership, sequence, communication, and follow-through. The goal is not just progress. It is cleaner execution.",
    detailLabel: "DETAIL",
    detailBody: "Opens the full systems, workflows, and routines detail.",
  },
  tableHeaders: {
    phase: "PHASE",
    approach: "APPROACH",
    outputs: "OUTPUTS",
  },
  detail: {
    buttonLabel: "OPEN DETAIL",
    panelLabel: "DETAIL F2.1",
  },
  phases: [
    {
      name: "DISCOVERY",
      num: "01",
      description:
        "Audit constraints, stakeholders, timing pressure, dependencies. Map the landscape before drawing the first line.",
      outputs: ["Stakeholder Interviews", "System Audits", "Constraint Mapping"],
      color: { light: "#C24B75", dark: "#FF4D8D" },
    },
    {
      name: "ARCHITECTURE",
      num: "02",
      description:
        "Design the workflow, ownership structure, reporting rhythm, and execution map. Create the blueprint teams can build against.",
      outputs: ["Process Design", "Resource Planning", "Risk Mitigation"],
      color: { light: "#0099B3", dark: "#00D9FF" },
    },
    {
      name: "EXECUTION",
      num: "03",
      description:
        "Deploy in the field, coordinate moving parts, remove blockers, preserve momentum. Lead from the front.",
      outputs: ["Field Operations", "Team Coordination", "Progress Tracking"],
      color: { light: "#2D9B6E", dark: "#A855F7" },
    },
    {
      name: "ITERATION",
      num: "04",
      description:
        "Refine from live feedback and convert lessons into repeatable structure. Build sustainable processes, not one-time fixes.",
      outputs: ["Performance Analysis", "Process Optimization", "Knowledge Transfer"],
      color: { light: "#C9A227", dark: "#FFD93D" },
    },
  ],
  detailSections: {
    systems: {
      label: "SYSTEMS",
      subtabs: {
        digital: {
          title: "DIGITAL SYSTEMS",
          subtitle: "Software & data infrastructure",
          thinking:
            "Digital systems require clear data flow, version control, and automated feedback loops. The goal is reducing manual intervention while maintaining visibility.",
          steps: [
            { num: "01", name: "MAP", desc: "Data sources, dependencies, user flows" },
            { num: "02", name: "ARCHITECT", desc: "System design, API contracts, state management" },
            { num: "03", name: "BUILD", desc: "Iterative development, testing, deployment" },
            { num: "04", name: "MONITOR", desc: "Analytics, error tracking, optimization" },
          ],
        },
        analog: {
          title: "ANALOG OPERATIONS",
          subtitle: "Field work & physical coordination",
          thinking:
            "Physical operations demand clear handoffs, visual progress tracking, and contingency planning. People and materials don't have undo buttons.",
          steps: [
            { num: "01", name: "SCOUT", desc: "Site conditions, constraints, stakeholders" },
            { num: "02", name: "SEQUENCE", desc: "Trade flow, material staging, milestones" },
            { num: "03", name: "EXECUTE", desc: "Daily coordination, issue resolution, QC" },
            { num: "04", name: "CLOSE", desc: "Punchlist, documentation, lessons learned" },
          ],
        },
      },
    },
    workflows: {
      label: "WORKFLOWS",
      subtabs: {
        project: {
          title: "PROJECT WORKFLOW",
          subtitle: "End-to-end project delivery",
          thinking:
            "Projects need clear phases with defined handoffs. Each gate ensures quality before moving forward, preventing costly rework downstream.",
          steps: [
            { num: "01", name: "SCOPE", desc: "Define deliverables, timeline, budget" },
            { num: "02", name: "PLAN", desc: "Resource allocation, dependencies, milestones" },
            { num: "03", name: "DELIVER", desc: "Execute phases, track progress, manage changes" },
            { num: "04", name: "TRANSFER", desc: "Handoff, documentation, support transition" },
          ],
        },
        review: {
          title: "REVIEW CYCLE",
          subtitle: "Feedback and iteration loops",
          thinking:
            "Good feedback is specific, timely, and actionable. Structure the review process to maximize signal while minimizing churn.",
          steps: [
            { num: "01", name: "PRESENT", desc: "Share work in appropriate context" },
            { num: "02", name: "COLLECT", desc: "Gather structured feedback from stakeholders" },
            { num: "03", name: "SYNTHESIZE", desc: "Identify patterns, prioritize changes" },
            { num: "04", name: "ITERATE", desc: "Implement revisions, document decisions" },
          ],
        },
      },
    },
    routines: {
      label: "ROUTINES",
      subtabs: {
        daily: {
          title: "DAILY RHYTHM",
          subtitle: "Day-to-day operational cadence",
          thinking:
            "Consistency compounds. Small daily habits create the foundation for larger achievements. Design the day to protect deep work.",
          steps: [
            { num: "01", name: "PLAN", desc: "Review priorities, block time, set intentions" },
            { num: "02", name: "FOCUS", desc: "Deep work sessions, minimize interruptions" },
            { num: "03", name: "SYNC", desc: "Check-ins, updates, unblock others" },
            { num: "04", name: "REFLECT", desc: "Review progress, prepare tomorrow" },
          ],
        },
        weekly: {
          title: "WEEKLY REVIEW",
          subtitle: "Recurring strategic checkpoints",
          thinking:
            "Weekly reviews zoom out from daily tasks to ensure alignment with bigger goals. Course-correct before small drifts become large detours.",
          steps: [
            { num: "01", name: "ASSESS", desc: "Review completed work against goals" },
            { num: "02", name: "CLEAR", desc: "Process inbox, update task lists" },
            { num: "03", name: "PLAN", desc: "Set priorities for upcoming week" },
            { num: "04", name: "PREPARE", desc: "Prep materials, schedule key meetings" },
          ],
        },
      },
    },
  },
}

export type SystemsDetailSectionKey = keyof typeof systemsSectionContent.detailSections

export const experimentsSectionContent = {
  drawingModes: {
    experiments: { title: "EXPERIMENTS", floorLabel: "F3" },
    feedback: { title: "CLIENT FEEDBACK", floorLabel: "F3.5" },
  },
  generalNotes: {
    label: "GENERAL NOTES",
    body: "Experiments, test builds, and systems in motion.",
  },
  experimentSchedule: [
    {
      id: "EXP-01",
      title: "Autonomous Drone Mapping",
      status: "ACTIVE",
      desc: "Real-time terrain analysis using custom flight patterns and ML-based anomaly detection.",
      tags: ["ROBOTICS", "ML", "GIS"],
    },
    {
      id: "EXP-02",
      title: "Modular Site Logistics",
      status: "TESTING",
      desc: "Containerized workflow system for rapid deployment across distributed job sites.",
      tags: ["SYSTEMS", "LOGISTICS"],
    },
    {
      id: "EXP-03",
      title: "Voice-to-Documentation",
      status: "PROTOTYPE",
      desc: "Field recording to structured reports using speech recognition and templating.",
      tags: ["AI", "DOCS"],
    },
    {
      id: "EXP-04",
      title: "Predictive Maintenance Dashboard",
      status: "CONCEPT",
      desc: "Equipment health monitoring with failure prediction based on usage patterns.",
      tags: ["DATA", "IOT"],
    },
  ],
  clientNotes: [
    {
      id: "01",
      quote:
        "Brandon doesn't just execute\u2014he architects solutions that scale. Brought order to chaos on a project everyone else had given up on.",
      name: "Sarah Chen",
      role: "Operations Director",
      company: "Infrastructure Corp",
      initials: "SC",
    },
    {
      id: "02",
      quote: "The systems he built are still running three years later with zero maintenance. That's rare.",
      name: "Marcus Williams",
      role: "VP of Field Operations",
      company: "Energy Services Co",
      initials: "MW",
    },
    {
      id: "03",
      quote:
        "He sees the whole picture\u2014logistics, people, tech, timeline\u2014and figures out how to make it all work together.",
      name: "James Rodriguez",
      role: "Project Manager",
      company: "Construction LLC",
      initials: "JR",
    },
  ],
}

export type ExperimentScheduleItem = (typeof experimentsSectionContent.experimentSchedule)[number]
export type ClientNote = (typeof experimentsSectionContent.clientNotes)[number]

export const contactSectionContent = {
  title: "CONTACT",
  floorLabel: "F4",
  generalNotes: {
    label: "GENERAL NOTES",
    body: "For roles, projects, or collaborations, reach out directly. Fastest path is email.",
  },
  email: "hello@bartlettbuilds.pro",
  contactLinks: [
    { label: "SUBSTACK", href: "https://substack.com/@brandonbartlett" },
    { label: "LINKEDIN", href: "https://linkedin.com/in/brandonbartlett" },
    { label: "X", href: "https://x.com/brandonbartlett" },
    { label: "INSTAGRAM", href: "https://instagram.com/brandonbartlett" },
  ],
  documentStamp: {
    name: "BRANDON BARTLETT",
    ending: "END OF DOCUMENT",
    year: "\u00A9 2026",
  },
}
