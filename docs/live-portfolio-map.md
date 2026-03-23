# Live Portfolio Map

This file is the codebase legend for the live portfolio on `main`.

## Naming Standard

- Page-level wrappers use `Shell` or `Header`
- Page sections end in `Section`
- Shared editable data ends in `Content`
- Small nested UI pieces use blueprint-style names like `generalNotes`, `keynote`, and `detail`
- Internal section IDs use the same vocabulary as the visible portfolio:
  - `HEADER`
  - `HERO`
  - `OPERATIONS`
  - `SYSTEMS`
  - `EXPERIMENTS`
  - `CONTACT`

## Live Component Tree

Route: `app/page.tsx`

1. `PortfolioPage`
2. `PortfolioShell`
3. `PortfolioHeader`
4. `HeroSection`
5. `OperationsSection`
6. `SystemsSection`
7. `ExperimentsSection`
8. `ContactSection`

## Component Roles

### `PortfolioShell`

- File: `components/portfolio-shell.tsx`
- Purpose: page chrome, left rail, right rail, scroll tracking, theme toggle, rotation control
- Content source: `portfolioShellContent` in `lib/site-content.ts`

### `PortfolioHeader`

- File: `components/portfolio-header.tsx`
- Purpose: top identity bar and section navigation
- Content source: `portfolioHeaderContent` in `lib/site-content.ts`

### `HeroSection`

- File: `components/hero-section.tsx`
- Purpose: 3D tower hero and hover legend
- Content source: `heroSectionContent` in `lib/site-content.ts`
- Internal helper: `IsoCube`

### `OperationsSection`

- File: `components/operations-section.tsx`
- Purpose: case studies plus operations table
- Content source: `operationsSectionContent` in `lib/site-content.ts`
- Internal rows:
  - `CaseStudyRow`
  - `OperationRow`

### `SystemsSection`

- File: `components/systems-section.tsx`
- Purpose: systems methodology, general notes, key note, and detail
- Content source: `systemsSectionContent` in `lib/site-content.ts`
- Important nested names:
  - `generalNotes` = the always-visible explanatory note block
  - `keynote` = the small note trigger and attached note popup
  - `detail` = the larger expandable detail surface
  - `detailSections` = the top-level groups inside that detail surface

### `ExperimentsSection`

- File: `components/experiments-section.tsx`
- Purpose: experiments tab plus client feedback tab
- Content source: `experimentsSectionContent` in `lib/site-content.ts`

### `ContactSection`

- File: `components/contact-section.tsx`
- Purpose: contact links and footer
- Content source: `contactSectionContent` in `lib/site-content.ts`

## Shared Content Tree

The editable source of truth is `lib/site-content.ts`.

1. `portfolioMetadata`
2. `portfolioShellContent`
3. `portfolioHeaderContent`
4. `heroSectionContent`
5. `operationsSectionContent`
6. `systemsSectionContent`
7. `experimentsSectionContent`
8. `contactSectionContent`

## Blueprint Glossary

This is the part that used to feel the most confusing.

- `generalNotes`
  Developer meaning: the always-visible note block for the section
  Current UI: the explanatory note under the systems header

- `keynote`
  Developer meaning: the small note trigger and attached note popup inside `SystemsSection`
  Current UI: `KEY NOTE`

- `detail`
  Developer meaning: the large expandable detail surface opened from `SystemsSection`
  Current UI: `DETAIL F2.1`, `OPEN DETAIL`

- `detailSections`
  Developer meaning: the top-level tab groups inside the detail surface
  Current groups:
  - `systems`
  - `workflows`
  - `routines`

- `detail tabs`
  Developer meaning: the second-level tabs inside each detail section
  Examples:
  - `digital`, `analog`
  - `project`, `review`
  - `daily`, `weekly`

## Safe Editing Rules

- If you want to change page order, start in `app/page.tsx`
- If you want to change copy, labels, links, or lists, start in `lib/site-content.ts`
- If you want to change layout or interaction behavior, go to the matching `components/*` file
- If a name sounds visual and fuzzy, check this map first before renaming anything else

## What Is Not Live

These files are not part of the live page anymore:

- `components/builds-section.tsx`
- `components/testimonials-section.tsx`

The live page now uses the clearer names above.
