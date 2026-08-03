# Product Requirements Document

**Status:** Phase 1 in development
**Version:** 1.1.0

## Problem

The source workbook is a capable India-context FIRE and net-worth planner, but
it is a spreadsheet: fragile formulas, no validation, hostile on a phone, and
one mistyped cell away from silently wrong numbers. The goal is to keep its
financial model exactly and replace the interface.

## What this is

A personal balance-sheet and cash-flow tool, denominated in INR, organised
around asset classes rather than transactions. It answers three questions:

1. What am I worth?
2. Where is my money actually allocated?
3. How much am I able to invest each month?

## What this is not

Not a budgeting app. There is no transaction log, no expense categorisation,
no bank sync, and no spending history — the underlying model is point-in-time
balances and monthly rates. Adding transactions would be a different product.

Not a spreadsheet. No grid, no formula bar, no cell references.

## Users

One person managing their own finances, who already thinks in terms of asset
allocation and monthly surplus. Comfortable with the vocabulary of SIPs, EPF,
and cap-weighted equity. Wants speed and correctness, not hand-holding.

## Phase 1 scope

| Section | Capability |
|---|---|
| Dashboard | Net worth, monthly income, monthly expenses, monthly savings, cash flow, total assets, total liabilities. Income-vs-expenses and allocation charts. |
| Income | Add, edit, delete monthly inflow lines. |
| Expenses | Add, edit, delete monthly outflow lines. PF contribution. |
| Assets | Add, edit, delete holdings grouped by asset class, with liquidity and investability. |
| Liabilities | Add, edit, delete outstanding balances. |
| Storage | Automatic save on every change. JSON export and validated import. |

### Design decisions

- **Hybrid domain model.** The brief's five sections, the workbook's business
  logic underneath.
- **Seeded lines, user-extensible.** Ships with common line items at zero
  value; every one can be renamed, deleted, or added to.
- **Asset-class totals in Phase 1.** Instrument-level modelling, with mutual
  fund cap-weight look-through, arrives in Phase 2.

## Non-negotiable business rules

Traceable to `EXCEL_ANALYSIS.md`, verified by the parity test suite.

- **B-1** Primary residence, other property, and jewellery count toward net
  worth but are excluded from the investable allocation view. They hold value
  but cannot be rebalanced.
- **B-2** Liquidity and investability are independent. EPF and ULIPs are
  illiquid yet investable.
- **B-4** The emergency fund target is six months of total outflows.
- **B-5** Allocation percentages always divide by the total of the same view.
- **B-6** INR throughout, with Indian digit grouping.
- **B-7** Every registry is unbounded. Never cap the number of lines.

## Success criteria

- Every Phase 1 figure matches the source workbook to the paise.
- No calculation lives inside a component.
- A full month of data can be entered on a phone without zooming.
- Export, clear the browser, import, and arrive at identical numbers.

## Provenance

The source workbook carries a third-party IP notice. The financial methods it
uses are standard and not protectable, but its specific labels, layout, and
assumption values are. This project implements the methods with original
labels, ships all defaults at zero, and excludes the workbook from the
repository. Public deployment remains an open confirmation — see TODO Q4.
