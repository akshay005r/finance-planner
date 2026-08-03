# Architecture

## Stack

| Concern | Choice |
|---|---|
| Framework | React 18 + Vite 5 |
| Language | TypeScript 5, strict, `noUncheckedIndexedAccess` on |
| Styling | Tailwind CSS 3 with a custom token theme |
| Routing | react-router-dom 6 |
| Charts | recharts 2 (from Module 5) |
| Testing | vitest 2 |
| Persistence | Browser local storage |
| Portability | JSON export / import |
| Hosting | GitHub Pages |

## Principles

**Calculations are a library, not app code.** `src/calculations` is pure
TypeScript with no React import anywhere. Every function takes plain data and
returns plain data, which is what makes parity testing against the source
workbook possible.

**One recalculation pipeline.** State changes flow through the reducer, then
`recalculate(state)` produces a complete derived snapshot, then the UI reads
it. Components never compute a total. This reproduces the spreadsheet's
behaviour — change one input and everything dependent updates together —
without rebuilding a dependency graph.

**Two independent flags, not one.** `liquidity` and `investable` are separate
because the workbook treats them separately. EPF is illiquid but investable;
jewellery is illiquid and not investable. Collapsing them into one field would
silently break the allocation views.

**Versioned state from the first release.** Phase 2 adds goals and assumptions
to the persisted shape. The migration chain exists now so that upgrade does
not discard anyone's saved data.

## Data flow

```
  user input
      │
      ▼
  dispatch(action) ──► reducer ──► AppState ──► save() ──► local storage
                                      │
                                      ▼
                              recalculate(state)
                                      │
                                      ▼
                              DerivedSnapshot ──► components (read-only)
```

`AppState` is persisted. `DerivedSnapshot` never is — it is recomputed on every
change, so stored data cannot drift out of step with displayed totals.

## Structure

```
src/
├─ components/
│  ├─ ui/          Presentational primitives. No domain knowledge.
│  └─ layout/      Shell, sidebar, page header.
├─ pages/          One per route. Composition only.
├─ calculations/   Pure. No React. Parity-tested against the workbook.
├─ services/
│  ├─ storage/     Local storage adapter and migrations.
│  └─ io/          JSON export and import (Module 6).
├─ state/          reducer.ts (pure) · store.tsx (provider) · selectors.ts
├─ types/          Domain, state, and IO contracts.
├─ constants/      Asset classes and seed lines.
└─ utils/          INR formatting, ids, guards.
```

The reducer sits in its own module rather than beside the provider so the
transition logic carries no React dependency and can be tested directly.

## Design tokens

Ink navy for the navigation rail, a single brass accent, and gain/loss colours
reserved strictly for financial meaning — never for generic UI state. Money
renders with tabular figures so digits align down a column, and INR uses
Indian 2-2-3 grouping with a lakh/crore reading beneath large figures.

## Testing

`src/calculations/__tests__/workbookParity.test.ts` reproduces the source
spreadsheet's inputs and asserts against its own cached results, including
percentage contributions to ten decimal places. If the app and the workbook
ever disagree, that suite fails and the app is wrong until proven otherwise.
