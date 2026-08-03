# TODO

## Done
- [x] Analyse Excel workbook — full spec in `EXCEL_ANALYSIS.md`
- [x] Create PRD
- [x] Design architecture
- [x] Resolve scope mismatch between the brief and the workbook
- [x] **Module 0 — Foundation**
  - [x] Vite + React + TypeScript scaffold
  - [x] Design tokens and global styles
  - [x] Domain type layer
  - [x] Pure calculation library (C-01 … C-12)
  - [x] Workbook parity test suite
  - [x] Local storage with migration chain
  - [x] Reducer, store provider, auto-save
  - [x] UI primitives and responsive app shell

## Next
- [ ] **Module 1 — Income**
  - [ ] Inflow table with inline editing
  - [ ] Add, edit, delete custom inflow lines
  - [ ] Live surplus feedback
- [ ] **Module 2 — Expenses**
  - [ ] Outflow table, PF contribution field
  - [ ] Emergency fund target against current cash
- [ ] **Module 3 — Assets**
  - [ ] Class-grouped registry
  - [ ] Liquidity and investable toggles with explanatory copy
- [ ] **Module 4 — Liabilities**
- [ ] **Module 5 — Dashboard**
  - [ ] Seven metric cards
  - [ ] Income vs expenses chart
  - [ ] Allocation donut with total/investable toggle
- [ ] **Module 6 — Data portability**
  - [ ] JSON export
  - [ ] Validated import that replaces state and recalculates
  - [ ] Full responsive and keyboard pass

## Open decisions (not blocking Phase 1)
- [ ] **Q3** Does the FIRE calculator belong in Phase 2 or Phase 3?
- [ ] **Q4** Confirm public GitHub Pages deployment given the workbook's
      IP notice. Current approach: original labels, zero-valued defaults,
      workbook excluded from the repository.
- [ ] **Q5** Medium-term effective return blend (M-1) — preserve the
      workbook's 40/60 blend, or correct it to a plain weighted average?
- [ ] **Q6** Compute `SIP required` from the goal, or keep it a manual input
      as the workbook does? Computing it will change existing numbers.

## Deferred to Phase 2 (documented, not built)
- Returns and asset mix assumptions
- Financial goals with horizon bucketing
- Required allocation view
- SIP allocator and its validation rules
- Instrument-level equity modelling with cap-weight look-through
- Derived "cash held in mutual funds"
