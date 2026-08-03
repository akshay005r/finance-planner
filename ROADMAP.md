# Roadmap

## Phase 1 — Balance sheet and cash flow *(in progress)*

Establishes the data model, the calculation engine, and the five core sections.

| Module | Scope | Status |
|---|---|---|
| 0 | Foundation: types, calculations, storage, state, shell | ✅ Complete |
| 1 | Income — inflow lines, CRUD | Next |
| 2 | Expenses — outflow lines, PF, emergency fund target | Planned |
| 3 | Assets — class-grouped registry, liquidity, investability | Planned |
| 4 | Liabilities — loan and balance lines | Planned |
| 5 | Dashboard — seven metrics, two charts | Planned |
| 6 | Data portability — JSON export and validated import | Planned |

Delivers: net worth, total assets, total liabilities, monthly income, monthly
expenses, monthly savings, cash flow, and the total and investable allocation
views.

## Phase 2 — Planning

Everything the workbook does that Phase 1 deliberately leaves out.

- **Returns & asset mix assumptions** — editable expected returns and target
  weights per time horizon; effective return per horizon (C-14).
- **Financial goals** — horizon bucketing, inflation-adjusted future need, and
  per-goal SIP split across asset classes (C-15 … C-17).
- **Required allocation view** — the third allocation column, driven by goals
  rather than holdings (C-18).
- **Cross-section validation** — goal funding capped by liquid assets; total
  SIP capped by investing surplus.
- **Instrument-level equity** — direct stocks by cap, and mutual funds
  decomposed by cap weight, with the derived cash sleeve (C-13, C-19).
- **FIRE calculator** — lean, standard, fat, and coast targets (C-20), pending
  decision Q3.

## Phase 3 — Insight

- Timeline and net worth history — requires adding a time dimension the
  workbook does not have, so it needs its own data model work.
- Rebalancing guidance: current versus required allocation, and what to buy
  next to close the gap.
- AI-assisted commentary on the plan.

## Explicitly out of scope

- Transaction-level tracking, expense categorisation, and bank import. The
  source model is point-in-time balances, not a ledger. Adding transactions
  would be a different product, not a later phase of this one.
- Multi-currency. The domain is INR throughout.
