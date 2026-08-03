# Excel Analysis

**Source:** `Finance_Planner_2025-Actual.xlsx`
**Analysed:** 2026-08-03
**Status:** Complete — supersedes the previous "Pending" stub.

---

## 0. Provenance notice (read before publishing)

Every sheet carries this text:

> This workbook along with all its contents are the intellectual property of Finance with Sharan, distribution of which is strictly prohibited.

Implications recorded here so the decision is explicit and traceable:

- The **mathematics** (compounding, 25x rule, SUMPRODUCT weighting, allocation
  glide paths) are standard personal-finance methods and are not themselves
  protectable expression.
- The **expression** — sheet names, the exact label wording, the row ordering,
  the specific default line items, the chosen assumption values — is the part
  the notice is asserting rights over.
- ROADMAP/AI_DEVELOPMENT_GUIDE target **public GitHub Pages hosting**. That is
  redistribution, not private use.

**Recommendation:** implement the calculation model, but author our own labels,
our own default/seed values, and our own IA. Do not ship the workbook file in
the repo. Do not reuse the assumption table verbatim as shipped defaults —
make them user-editable and empty-by-default. See open question Q4.

---

## 1. What this workbook actually is

It is **not** a general-purpose budgeting app. It is an **India-context FIRE
(Financial Independence / Retire Early) and net-worth planner**, denominated in
INR, organised around asset classes rather than transactions.

Twelve sheets, four functional layers:

| Layer | Sheets | Role |
|---|---|---|
| Assumptions | `Returns & Asset Mix assumption` | Global rates + target allocation by horizon |
| Planning | `FIRE number`, `Financial Goals` | Targets and goal funding |
| Ledger (inputs) | `Real estate & REIT`, `Domestic Equity`, `US equity`, `Debt`, `Gold`, `Crypto`, `Miscellaneous` | Per-asset-class holdings |
| Roll-up | `Net worth`, `Cash flows` | Aggregation, allocation, net worth |

Data flows strictly one way: **asset-class sheets → Net worth → allocation
summaries**. `Cash flows` and `Financial Goals` cross-feed validation limits.

There are **no transactions and no dates anywhere in the workbook.** Every
figure is a current point-in-time balance or a monthly rate. There is no
history, no time series, and no expense categorisation.

---

## 2. Sheet-by-sheet specification

### 2.1 `Returns & Asset Mix assumption`

Six asset classes, each with an expected annual return and a target weight for
three time horizons.

| Asset class | Expected return | Short (<3y) | Medium (3–5y) | Long (>6y) |
|---|---|---|---|---|
| Domestic equity | 12% | 0% | 40% | 30% |
| US equity | 12% | 0% | 0% | 20% |
| Debt | 6% | 100% | 50% | 10% |
| Gold (SGB / ETF) | 6% | 0% | 10% | 20% |
| Crypto | 20% | 0% | 0% | 10% |
| Real Estate / REITs | 10% | 0% | 0% | 10% |

Each horizon column sums to 100%.

**Effective return per horizon** (row 16):

```
short  = Σ(weight_short  × return)                      = 6.00%
medium = Σ(weight_medium × return) × 0.4 + short × 0.6   = 6.96%
long   = Σ(weight_long   × return)                       = 10.80%
```

> ⚠️ **Quirk M-1.** Short and long are plain weighted averages. Medium is a
> 40/60 blend of its own weighted average with the *short-term* effective
> return, even though its weights already sum to 100%. This is not a
> normalisation fix. It is either a deliberate conservatism haircut or an
> error. Flagged for decision — see Q5.

### 2.2 `FIRE number`

Inputs: desired monthly expenses today, current age, retirement age,
inflation, desired Coast FIRE age.

```
yearlyExpensesToday      = monthlyExpenses × 12
yearlyExpensesAtRetire   = yearlyExpensesToday × (1 + inflation)^(retireAge − currentAge)
leanFire                 = yearlyExpensesAtRetire × 20
fire                     = yearlyExpensesAtRetire × 25
fatFire                  = yearlyExpensesAtRetire × 50
coastFire                = fire / (1.1)^(retireAge − coastAge)
```

> ⚠️ **Quirk M-2.** Coast FIRE hardcodes a 10% discount rate. It does not
> reference the long-term effective return (10.8%) from the assumptions sheet.
> Recommend wiring it to the assumption and exposing it as an input.

### 2.3 `Cash flows`

Fixed line items, monthly, INR.

- **Inflows:** post-tax salary, business income, rental income, others → `totalInflow = Σ`
- **Outflows:** monthly expenses, compulsory investments, loan EMIs, insurance premiums, others → `totalOutflow = Σ`
- `investingSurplus = totalInflow − totalOutflow`
- `totalInvestible  = investingSurplus + pfContribution`

> Note: "Compulsory investments" has a label but **no value cell** — it is in
> the SUM range and contributes zero. Treat as a real line with default 0.

### 2.4 Asset-class sheets

All follow the same shape: named line items in column B, current INR value in
column C, `Total` at the bottom.

| Sheet | Line items |
|---|---|
| Real estate & REIT | Home, Other real estate, REITs |
| US equity | S&P500 ETF, Other ETFs, US Mutual funds |
| Gold | Jewellery, SGB, Gold ETF / Digital gold |
| Crypto | Crypto |
| Miscellaneous | ULIPs |

`Debt` is wider — four independent unbounded sub-registries, each summing
`row 11 → 1048576` (i.e. arbitrary user rows):

- **Liquid** (cash, liquid funds, savings accounts)
- **Fixed Deposit** (by bank name)
- **Debt funds** (by fund name)
- **Government investments** (EPF, VPF, PPF, Sukanya Samriddhi, SCSS, NPS)

### 2.5 `Domestic Equity` (most complex sheet)

Two input registries, both unbounded:

1. **Stocks** — name, category (`Largecap|Midcap|Smallcap`, dropdown-validated), current value.
2. **Mutual funds / ETFs / Smallcases** — name, four cap-weight fractions
   (largecap/midcap/smallcap/cash), current value.

Derived:

```
stockByCap[c]  = SUMIF(stock.category = c, stock.value)
fundByCap[c]   = SUMPRODUCT(fund.weight[c], fund.value)
combined[c]    = stockByCap[c] + fundByCap[c]        (cash: funds only)
contribution%  = combined[c] / combinedTotal
```

Plus a third registry, the **SIP allocator**: per-instrument cap weights × a
monthly SIP amount, producing a weighted blended allocation:

```
sipAllocation[c] = Σ(instrument.weight[c] × instrument.sip) / Σ(instrument.sip)
```

**Validation rule V-1:** if `Σ sip > Financial Goals!M25` (total domestic-equity
SIP demanded by goals), display *"You don't have enough money"*. Currently
**firing** in the source file (26,120 > 18,460).

Also present: a static **age → recommended cap allocation** reference table
(20–30, 30–45, 45–65, >65). Read-only guidance, not wired into any formula.

### 2.6 `Net worth`

The aggregation hub. Pulls one value per line from each asset-class sheet.

**Illiquid:** Home, Other real estate, Jewellery, SGB, ULIPs, EPF/PPF/VPF
**Liquid:** Fixed deposit, Debt funds, Domestic stocks, Domestic equity MFs,
Cash from equity MFs, US equity, Savings/cash, Gold ETF, Crypto, REITs

```
totalIlliquid   = Σ illiquid
totalLiquid     = Σ liquid
totalAssets     = totalIlliquid + totalLiquid
totalLiabilities= Σ (home, education, car, personal/gold, credit card, other loans)
netWorth        = totalAssets − totalLiabilities
liquidAssets    = totalLiquid
```

**Three parallel allocation views** — this is the subtle part:

| View | Basis | Key difference |
|---|---|---|
| Total Asset Summary | All assets | Includes home + jewellery |
| Current Investable | Investable only | **Excludes** home, jewellery, EPF/PPF, ULIPs |
| Required Investable | Goal-driven target | Σ over horizons of (goal money available × target weight) |

> **Business rule B-1.** Jewellery and primary residence count toward net worth
> but are **excluded from investable allocation**. This is deliberate and must
> be preserved — it is the most important non-obvious rule in the workbook.

**Emergency fund hint:** `monthlyOutflow × 6` displayed next to the
savings/cash line as a recommendation.

### 2.7 `Financial Goals`

Per goal: name, priority, years left, amount required today, amount available
today, goal inflation, step-up %, SIP required.

```
goalType   = years < 3 ? "Short Term" : years <= 6 ? "Medium Term" : "Long Term"
futureNeed = required × (1 + goalInflation)^years
             − available × (1 + effectiveReturn[goalType])^years
sipSplit[c]= targetWeight[goalType][c] × sipRequired
```

**Validation rule V-2:** `Σ available` must not exceed
`liquidAssets + SGB + ULIPs + EPF` → else *"You don't have enough money"*.
**Validation rule V-3:** `Σ sipRequired` must not exceed `investingSurplus`.

> ⚠️ **Quirk M-3.** `SIP required` is a **manual input**, not derived. There is
> no formula solving for the SIP that reaches `futureNeed`. An app should
> almost certainly compute it (standard future-value-of-annuity solve), but
> doing so **will change the user's numbers**. See Q6.
>
> ⚠️ **Quirk M-4.** `Step up %` is captured on every row and referenced by
> **nothing**. Dead input in the source.
>
> ⚠️ **Quirk M-5.** `futureNeed` returns a literal space `" "` when required
> equals available — a text value in a numeric column. Model as `null`.

---

## 3. Consolidated calculation inventory

Everything below belongs in `src/calculations/`, pure and framework-free.

| ID | Function | Inputs | Phase |
|---|---|---|---|
| C-01 | `totalInflows` | inflow lines | 1 |
| C-02 | `totalOutflows` | outflow lines | 1 |
| C-03 | `investingSurplus` | C-01, C-02 | 1 |
| C-04 | `totalInvestible` | C-03, PF | 1 |
| C-05 | `assetClassTotal` | line items | 1 |
| C-06 | `totalIlliquid` / `totalLiquid` | asset registry | 1 |
| C-07 | `totalAssets` | C-06 | 1 |
| C-08 | `totalLiabilities` | liability lines | 1 |
| C-09 | `netWorth` | C-07, C-08 | 1 |
| C-10 | `allocationByClass` (total) | asset registry | 1 |
| C-11 | `allocationByClass` (investable) | asset registry + B-1 | 1 |
| C-12 | `emergencyFundTarget` | C-02 × 6 | 1 |
| C-13 | `equityCapBreakdown` | stocks + funds | 1* |
| C-14 | `effectiveReturns` | assumption matrix | 2 |
| C-15 | `goalType` | years | 2 |
| C-16 | `goalFutureNeed` | goal + C-14 | 2 |
| C-17 | `goalSipSplit` | goal + mix | 2 |
| C-18 | `requiredAllocation` | goals + mix | 2 |
| C-19 | `sipAllocator` | SIP registry | 2 |
| C-20 | `fireNumbers` | FIRE inputs | 2/3 |

\* C-13 is Phase 1 only if the Assets module models domestic equity at
instrument level (see Q2).

---

## 4. Gap analysis vs. the Phase 1 brief

| Phase 1 brief asks for | Workbook provides | Gap |
|---|---|---|
| Net Worth | ✅ exact | none |
| Total Assets / Liabilities | ✅ exact | none |
| Monthly Income | Cash inflows (4 fixed lines) | shape differs |
| Monthly Expenses | Cash outflows (5 fixed lines) | shape differs |
| Monthly Savings / Cash Flow | `investingSurplus` | naming only |
| Income vs Expenses chart | derivable | none |
| **Expense Categories chart** | ❌ **nothing** | **no source data** |
| Assets CRUD | 7 typed class sheets | needs class dimension |
| Liabilities CRUD | 6 fixed lines | needs custom rows |

**The single largest gap:** the brief assumes a flat, category-tagged
transaction model. The workbook is a typed, point-in-time balance-sheet model.
Building the brief literally would discard the workbook's actual value.

---

## 5. Non-negotiable business rules to preserve

- **B-1** The *only* assets excluded from investable allocation are **primary
  residence, other real estate, and jewellery**. Verified numerically: total
  assets 4,345,950.75 − investable 645,950.75 = 3,700,000 = home (1,000,000) +
  jewellery (2,700,000), exactly.
- **B-2** EPF/PPF/VPF and ULIPs are **illiquid but investable** — they appear in
  both the total and investable views. Liquidity and investability are two
  independent flags, not one. (Corrected: an earlier reading of this document
  wrongly excluded them.)
- **B-3** "Cash from equity mutual funds" is a *derived* liquid asset — the cash
  sleeve inside funds, not a user-entered balance.
- **B-4** Emergency fund target = 6 × total monthly outflows.
- **B-5** Allocation percentages always divide by the total of the *same view*.
- **B-6** Currency is INR throughout; formats use Indian digit grouping.
- **B-7** All asset registries are unbounded — never cap the number of rows.

---

## 6. Open questions

- **Q1** Domain model: faithful to workbook, literal to brief, or hybrid?
- **Q2** Does Phase 1 Assets model instruments (stocks/funds with cap weights),
  or only asset-class totals?
- **Q3** Is `FIRE number` in Phase 1, or deferred? It is absent from ROADMAP.
- **Q4** Public GitHub Pages deploy given the IP notice — confirm intent.
- **Q5** Medium-term effective return blend (M-1): preserve or correct?
- **Q6** Compute `SIP required` (M-3), or keep it a manual input?
