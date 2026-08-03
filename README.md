# Personal Finance Planner

Net worth, cash flow, and asset allocation. INR. Runs entirely in your browser.

## Status

Phase 1, Module 0 complete — foundation, calculation engine, and app shell.
Feature pages arrive in Modules 1–6. See `ROADMAP.md`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm test` | Run the test suite, including workbook parity |
| `npm run typecheck` | Type-check without emitting |
| `npm run build` | Production build |
| `npm run deploy` | Build and publish to GitHub Pages |

Deploying to a project page? Set the base path to your repository name:

```bash
VITE_BASE=/your-repo-name/ npm run build
```

## Your data

Everything is stored in this browser's local storage and never leaves your
device. There is no account and no server. Clearing site data erases it, so
export a JSON backup regularly once Module 6 lands.

## Documentation

| File | Contents |
|---|---|
| `PRD.md` | What this is and what it is not |
| `ARCHITECTURE.md` | Stack, principles, data flow, structure |
| `EXCEL_ANALYSIS.md` | The source workbook, reverse-engineered |
| `ROADMAP.md` | Phase and module plan |
| `TODO.md` | Current tasks and open decisions |
| `CHANGELOG.md` | Release notes |
| `REVISION.md` | Full revision history with rollback IDs |
