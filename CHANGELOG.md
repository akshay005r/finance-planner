# Changelog

## v1.1.2 — CI hardening (2026-08-03)

### Changed
- Workflow Node version 20 → 22.

### Added
- Pre-flight check that reports which test files CI can see, so a partial
  upload is diagnosed in one line rather than through vitest's exit code.

## v1.1.1 — Deployment readiness (2026-08-03)

### Changed
- `BrowserRouter` → `HashRouter`, so refreshing or bookmarking a nested page
  no longer 404s on GitHub Pages.

### Added
- `.github/workflows/deploy.yml` — builds and deploys on push to `main`, with
  tests and type-checking gating publication. No local Node required.

## v1.1.0 — Module 0: Foundation (2026-08-03)

### Added
- Vite + React 18 + TypeScript project scaffold with strict compiler settings.
- Tailwind design tokens: ink navigation rail, single brass accent, gain/loss
  semantics reserved for financial meaning.
- Domain type layer (`src/types`) encoding the workbook's rules, including the
  independent `liquidity` and `investable` flags.
- Pure calculation library (`src/calculations`) covering C-01 to C-12:
  cash flow, net worth, and both allocation views.
- `recalculate()` — the single entry point for all derived data.
- Local storage adapter with guarded access and a forward-only migration chain.
- Reducer and store provider with auto-save on every change.
- UI primitives: Card, Button, Badge, Table, EmptyState, Skeleton.
- App shell with responsive sidebar navigation and live net worth.
- 37 test cases across two suites, including parity against the source
  workbook's own cached figures.

### Notes
- Asset classes, seed line labels, and defaults are original to this project.
  All seeded values start at zero; no third-party assumption data is shipped.

## v1.0.0
- Initial project structure.
