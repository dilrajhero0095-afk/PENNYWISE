# Pennywise — Personal Money Tracker

## Product direction
A polished, mobile-friendly personal money tracker built as a single-page React/Vite/Tailwind prototype. It helps users understand their balance, manage transactions, set budgets and savings goals, review analytics, and back up local data without feeling like a spreadsheet.

## Design direction
Pennywise uses a calm product dashboard language: rounded surfaces, clear hierarchy, an ink-and-cobalt palette, and warm accent cards that make money feel approachable rather than clinical. The layout pairs a persistent desktop navigation rail with a mobile bottom bar, fast-glance stat cards, compact charts, and high-signal empty states. Interaction stays subtle and useful: quick add via modal, hover actions on rows, descriptive insight strips, and theme persistence.

## Architecture
- `src/finance/types.ts`: typed domain model and seed data for transactions, accounts, budgets, goals, and bills.
- `src/finance/storage.ts`: browser-local persistence and JSON backup export.
- `src/components/finance/MotionTemplate.tsx`: shared page template that receives page copy as data and wraps every view in the same animated composition.
- `src/components/finance/`: modular navigation, dashboard, transaction modal, tables, charts, budgets, goals, analytics and settings views.
- `src/App.tsx`: view routing, state transitions, persistence, import/export and destructive-action confirmations.
- `src/index.css`: responsive dashboard design system and mobile adaptation.
- `public/manus-routes.json`: static route declaration for the single-page app.

## Motion system
The full site follows the supplied Diet Soda reference direction: oversized display type, atmospheric gradient stages, floating data chips, bubbles, orbital lines, staggered reveals, hover drift, progress-bar growth, transaction row entrances, and responsive mobile choreography. The dashboard and every secondary view share the `MotionTemplate`; only the injected copy, accent, and finance data change.

## Prototype constraints
The current version intentionally uses localStorage so it is directly usable in Preview and structured for a future authenticated backend/database. Financial insights are descriptive only and do not provide investment advice.
