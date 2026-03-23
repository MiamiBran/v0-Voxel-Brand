# Live Portfolio Map

This file is the codebase legend for the live portfolio on `main`.

## Naming Standard

- Page chrome uses `Shell` or `Header`
- Main page blocks end in `Section`
- Shared editable data ends in `Content`
- Repeated blueprint-style content uses the same vocabulary across the site:
  - `drawingNotes`
  - `indexEntries`
  - `drawingLevels`
  - `generalNotes`
  - `keynote`
  - `detail`
  - `schedule`
  - `documentStamp`

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

## Section IDs

The page order and scroll map use these IDs:

- `HEADER`
- `HERO`
- `OPERATIONS`
- `SYSTEMS`
- `EXPERIMENTS`
- `CONTACT`

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

## Component Map

### `PortfolioShell`

- File: `components/portfolio-shell.tsx`
- Purpose: rails, progress markers, theme toggle, rotation state
- Content source: `portfolioShellContent`
- Important content keys:
  - `logo`
  - `sections`

### `PortfolioHeader`

- File: `components/portfolio-header.tsx`
- Purpose: identity block, drawing notes row, index, contact actions
- Content source: `portfolioHeaderContent`
- Important content keys:
  - `drawingNotes`
  - `name`
  - `subtitle`
  - `thesis`
  - `indexEntries`
  - `contactEntry`
  - `contactEntry.actionLinks`

### `HeroSection`

- File: `components/hero-section.tsx`
- Purpose: isometric tower, level markers, active legend, active key note
- Content source: `heroSectionContent`
- Important content keys:
  - `drawingLevels`
  - `drawingLevels[].legend`
  - `drawingLevels[].keynote`

### `OperationsSection`

- File: `components/operations-section.tsx`
- Purpose: operations drawing set with schedules and expandable project rows
- Content source: `operationsSectionContent`
- Important content keys:
  - `generalNotes`
  - `drawingModes`
  - `scheduleHeaders`
  - `caseStudySchedule`
  - `operationSchedule`
  - `typeColors`

### `SystemsSection`

- File: `components/systems-section.tsx`
- Purpose: systems methodology with general notes, key note, and detail
- Content source: `systemsSectionContent`
- Important content keys:
  - `generalNotes`
  - `keynote`
  - `detail`
  - `detailSections`

### `ExperimentsSection`

- File: `components/experiments-section.tsx`
- Purpose: experiments drawing set plus client notes
- Content source: `experimentsSectionContent`
- Important content keys:
  - `drawingModes`
  - `generalNotes`
  - `experimentSchedule`
  - `clientNotes`

### `ContactSection`

- File: `components/contact-section.tsx`
- Purpose: contact note block, direct email, outgoing links, document stamp
- Content source: `contactSectionContent`
- Important content keys:
  - `generalNotes`
  - `email`
  - `contactLinks`
  - `documentStamp`

## Whole-Site Blueprint Glossary

This is the shared vocabulary the site now uses.

- `drawingNotes`
  Developer meaning: the small metadata row at the top of the sheet
  Current UI: projection, substrate, drawing number

- `indexEntries`
  Developer meaning: the main section navigation entries in the header
  Current UI: `OPERATIONS`, `SYSTEMS`, `EXPERIMENTS`

- `contactEntry`
  Developer meaning: the contact item in the header index and its quick actions
  Current UI: `CONTACT` plus dropdown links

- `drawingLevels`
  Developer meaning: the major levels in the hero tower
  Current UI: `F1` through `F4`

- `legend`
  Developer meaning: the short explanatory line tied to an active level
  Current UI: the small top callout in the hero

- `keynote`
  Developer meaning: a highlighted note attached to a section or level
  Current UI:
  - hero right-side `KEY NOTE`
  - systems `KEY NOTE`

- `generalNotes`
  Developer meaning: the always-visible explanatory note block for a section
  Current UI:
  - operations intro block
  - systems intro block
  - experiments intro block
  - contact intro block

- `detail`
  Developer meaning: the larger expandable surface for deeper structured content
  Current UI: `OPEN DETAIL`, `DETAIL F2.1`

- `schedule`
  Developer meaning: a tabular listing of structured entries
  Current UI:
  - operations case study schedule
  - operations service schedule
  - experiments schedule

- `clientNotes`
  Developer meaning: quoted proof, feedback, or endorsements
  Current UI: `CLIENT FEEDBACK`

- `documentStamp`
  Developer meaning: the closing footer mark for the page
  Current UI: name, end-of-document text, year

## Where To Edit

- If you want to change page order: start in `app/page.tsx`
- If you want to change text, labels, links, or rows: start in `lib/site-content.ts`
- If you want to change layout or interactions: go to the matching `components/*` file
- If you are unsure what something is called: check this map before renaming code

## Not Live

These files are not part of the live page anymore:

- `components/builds-section.tsx`
- `components/testimonials-section.tsx`
