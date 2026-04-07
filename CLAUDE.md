# Shutdown Assistant

## What this is
The most comprehensive US business shutdown directory. All 50 states, every form, every fee, every step.

## Architecture
- **Framework**: Astro 5 + Tailwind CSS 4 + React
- **Data flow**: Research agents → `data/states/*.json` → registry → Astro pages
- **Content model**: Registry-driven (Prentice Content OS pattern). Models write prose, not structure.

## Key directories
- `registry/` — TypeScript source of truth for states, routes, offers
- `data/states/` — JSON data files per state (populated from research)
- `src/pages/states/[slug].astro` — Dynamic state guide pages
- `src/pages/` — Landing, pricing, agent service pages
- `prose/` — Prose workflow files for shutdown processes
- `scripts/` — Generation and validation scripts

## Rules
1. All state data must come from official Secretary of State (or equivalent) websites
2. Never hardcode state data in templates — always read from `data/states/`
3. Fees and forms must be verified against official sources
4. Every state page must have: Quick Answer block, Quick Facts table, LLC section, Corp section, Tax section, Requirements section, Contact section
5. Include JSON-LD structured data on every state page
6. Add disclaimer that this is not legal advice on every page
