# Revision History

## Revision 004
- **Date:** 2026-08-03
- **Version:** 1.1.2
- **Summary:** CI hardening after the first deploy attempt failed. The run
  stopped at the test gate because `src/calculations/__tests__/` never reached
  the repository — GitHub's web uploader drops nested directories silently.

### Files Changed
- Modified: `.github/workflows/deploy.yml`
- Updated: `CHANGELOG.md`, `README.md`, `project-state.json`

### Features Added
- Pre-flight step that counts and lists test files, failing with an actionable
  message instead of vitest's bare "No test files found".
- Node bumped 20 → 22; the runner was force-upgrading deprecated Node 20
  actions anyway.

### Architecture Changes
None. Workflow only. No application code touched.

### Notes
The gate behaved correctly: an unverifiable build was not published. Keeping
`npm test` blocking rather than advisory.

### Rollback ID
`revision-004`

## Revision 003
- **Date:** 2026-08-03
- **Version:** 1.1.1
- **Summary:** Deployment readiness. Switched to HashRouter so deployed URLs
  survive a refresh, and added a GitHub Actions workflow that builds and
  publishes without any local toolchain.

### Files Changed
- Modified: `src/App.tsx`
- Created: `.github/workflows/deploy.yml`
- Updated: `CHANGELOG.md`, `README.md`, `project-state.json`

### Features Added
- Automated build and deploy on push to `main`.
- Tests and type-check gate the deploy; a parity failure blocks publication.
- Base path derived from the repository name rather than hardcoded.

### Architecture Changes
- `BrowserRouter` replaced with `HashRouter`. GitHub Pages is a static host
  with no routing layer, so a hard refresh on a nested path returned 404.
  Hash-based routing never reaches the server. Trade-off accepted: a `#` in
  the address bar in exchange for refreshable, bookmarkable URLs.
- No change to routes, components, state, or calculations.

### Rollback ID
`revision-003`

## Revision 002
- **Date:** 2026-08-03
- **Version:** 1.1.0
- **Summary:** Module 0 — Foundation. Project scaffold, domain types, pure
  calculation library, storage with migrations, state management, UI
  primitives, and the app shell. No feature pages yet by design; every module
  from here adds a page onto a proven base.

### Files Changed
Created (39 source files, 1,838 lines):
- Config: `package.json`, `tsconfig.json`, `tsconfig.node.json`,
  `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`, `index.html`,
  `.gitignore`
- Types: `src/types/{domain,state,io,index}.ts`
- Constants: `src/constants/{assetClasses,defaultLines}.ts`
- Utilities: `src/utils/{currency,id,guards}.ts`
- Calculations: `src/calculations/{cashFlow,netWorth,allocation,index}.ts`
- Tests: `src/calculations/__tests__/{workbookFixture.ts,workbookParity.test.ts,foundation.test.ts}`
- Storage: `src/services/storage/{localStorageAdapter,migrations,index}.ts`
- State: `src/state/{reducer,store,selectors,initialState,index}.ts`
- Components: `src/components/ui/*` (6), `src/components/layout/*` (3)
- Pages: `src/pages/{ModulePending,index}.tsx`
- Entry: `src/App.tsx`, `src/main.tsx`, `src/index.css`

Updated: `EXCEL_ANALYSIS.md`, `PRD.md`, `ARCHITECTURE.md`, `ROADMAP.md`,
`TODO.md`, `CHANGELOG.md`, `project-state.json`

### Features Added
- Reusable calculation services, entirely outside the UI layer.
- Automatic persistence to browser local storage on every state change.
- Responsive shell with sidebar navigation and empty/loading states.
- INR formatting with Indian digit grouping and lakh/crore scale.

### Architecture Changes
- **Approved before implementation:** hybrid domain model — the brief's five
  modules, the workbook's business logic.
- **Discovered during implementation:** the reducer was initially placed in
  `store.tsx` beside the provider. Split into `state/reducer.ts` so the pure
  transition logic carries no React dependency and is directly testable.
  Non-breaking; no public API changed.

### Verification
63 assertions executed against the source workbook's cached values. All pass.
Net worth, both allocation views, and every percentage contribution reproduce
the spreadsheet exactly, including its fractional paise.

### Rollback ID
`revision-002`

## Revision 001
- Initial project template created.
- Rollback ID: revision-001
