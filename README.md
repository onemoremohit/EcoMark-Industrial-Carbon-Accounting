# EcoMark — Industrial Carbon Transparency Platform

Welcome to **EcoMark**, an investor-ready, compliance-grade carbon transparency platform engineered for India's industrial sector. It implements verifiable carbon accounting aligned with **IPCC AR5**, **ISO 14064-1**, **SEBI BRSR**, **BEE PAT**, and **EU CBAM** — running entirely in the browser with full `localStorage` persistence and zero server setup.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
|---|---|
| **Markup** | HTML5 Semantic |
| **Styling** | Tailwind CSS (CDN) + custom CSS variables |
| **Charts** | Chart.js (CDN) |
| **QR Codes** | qrcode.js (CDN, label generator) |
| **Icons** | Google Material Symbols |
| **Fonts** | Inter (Google Fonts) |
| **Database** | `js/db.js` — client-side localStorage engine simulating Firestore |
| **Auth** | `js/auth.js` — sessionStorage-based role routing |

---

## 📦 Full Directory Structure

```
stitch_project_idea_design_blueprint/
├── css/
│   └── style.css                  ← Global styles, transitions, scrollbars
├── js/
│   ├── db.js                      ← Simulated DB engine: seeding, IPCC factors, Eco-Coin logic
│   └── auth.js                    ← Client-side credentials & page-level route guards
│
├── company/                       ← Authenticated company (enterprise) portal
│   ├── dashboard.html             ← KPI metrics, YTD chart, Policy Compliance Panel (BEE PAT + SEBI BRSR live status)
│   ├── submit-report.html         ← Fuel report form + Green Energy Recommendation engine in success modal
│   ├── my-products.html           ← Product registry with live QR scan-redirect & blob downloads
│   ├── eco-coins.html             ← ECT rewards wallet & benefits redemption matrix
│   ├── compliance.html            ← Per-regulation compliance tracker (EPA, SEBI BRSR, BEE PAT, EU CBAM + SBTi trajectory)
│   └── policy-guide.html          ← Green Action Plan: fuel-switch recommendations + 3-step score roadmap
│
├── consumer/                      ← Public unauthenticated pages (no login)
│   ├── search.html                ← Carbon registry search: filter by score/industry, sort, animated cards
│   ├── product.html               ← Product detail: score badge, lifecycle chart, sustainability tip, better alternatives
│   └── label-generator.html       ← Printable 90×50mm carbon label with live QR code (window.print())
│
├── admin/
│   └── dashboard.html             ← Regulator enforcement portal: compliance alerts, Issue Notice/Send Reminder, audit log, CSV export
│
├── index.html                     ← Investor-ready landing page: Why Register, Policy Framework, Obstacle Solutions, Architecture
├── compliance.html                ← Public Compliance & Policy Portal: ISO 14064, GHG Protocol, SEBI BRSR, EU CBAM, BEE PAT (no login)
├── login.html                     ← Unified login (routes company → /company/dashboard, admin → /admin/dashboard)
├── register.html                  ← Corporate registration (+100 ECT on signup)
├── project_spec.md                ← Platform specification document
└── README.md                      ← This file
```

---

## 🚀 Getting Started

Open **`index.html`** in any modern browser. The entire platform runs client-side — no installs, no server.

### 👥 Seeded Demo Accounts

| Type | Email | Password | Company | Pre-seeded |
|---|---|---|---|---|
| **Company** | `company1@ecomark.com` | `company123` | Ravi Steel Industries (Pune) | 2 reports · Grade C · 850 ECT |
| **Company** | `company2@ecomark.com` | `company123` | GreenWave Textiles (Surat) | 2 reports · Grade A · 1,450 ECT |
| **Company** | `company3@ecomark.com` | `company123` | SunBake Foods (Nashik) | 2 reports · Grade A+ · 1,950 ECT |
| **Admin** | `admin@ecomark.com` | `admin` | EcoMark Regulator Bureau | All aggregate views + enforcement tools |

---

## 🧪 End-to-End Test Scenarios

### 1. Enterprise Flow — Report Submission + Green Recommendations

1. Go to `index.html` → **Login** → sign in as `company1@ecomark.com / company123`
2. Note starting metrics: **Grade C**, **2,628 kg YTD**, **850 ECT**
3. Navigate to **Submit Report** (sidebar)
4. Fill the form:
   - Quarter: `2024-Q4`
   - Product Name: `Steel Rod Grade-60`
   - Batch Size: `1000` units
   - Fuel Row 1: `Diesel Fuel` → `400` litres
   - Fuel Row 2: Add row → `Electricity` → `150` kWh
5. Click **Calculate & Submit**
6. **Expected maths:**
   - Diesel: 400 × 2.68 = 1,072.0 kg CO₂e
   - Electricity: 150 × 0.82 = 123.0 kg CO₂e
   - Total: **1,195.0 kg** → CO₂e/unit: **1.1950 kg** → **Grade A**
7. ✅ Success modal shows: Grade A badge, +coins credited
8. 🟢 **Green Energy Recommendation card** appears in the modal because diesel was used: `"If you replace Diesel with CNG, your score could improve from A → A"`
9. Click **View Action Plan** → lands on `policy-guide.html` showing the 3-step Grade A roadmap

---

### 2. Policy Compliance Panel (Dashboard)

1. After submitting, go to **Dashboard**
2. ✅ **Regulatory Compliance Status card** appears:
   - **BEE PAT**: Green ✓ Compliant (report filed in last 90 days)
   - **SEBI BRSR**: Green ✓ Compliant (Scope 1 & 2 logged this year)
   - **Deadline countdown**: Days remaining to 30 September (EPA Form V deadline)
3. Click **View Action Plan** to open the personalised policy guide

---

### 3. Score Improvement Roadmap (Policy Guide)

1. Navigate to **Policy Guide** (sidebar) → `company/policy-guide.html`
2. See your animated score progress ring, fuel-switching recommendations with projected grade improvements
3. 3-step action plan is auto-generated for your grade:
   - **Grade D**: Reduce highest fuel 30% → diversify → add renewables
   - **Grade C**: Shift 20% diesel to CNG → quarterly filings → 10% reduction target
   - **Grade B**: Switch one fuel to renewable → hit Grade A → file SBTi commitment
   - **Grade A**: Maintain 4 quarters → ESG report → target A+
   - **Grade A+**: Full Scope 3 → GRI/CDP disclosure → India CCTS carbon credits

---

### 4. Eco-Coins Redemption

1. Navigate to **Eco-Coins** tab
2. See the new transaction log (On-Time: +50 ECT, Grade A bonus: +300 ECT, 10%+ reduction bonus: +500 ECT)
3. Click **Redeem** on any perk (e.g. ESG Audit Waiver, 800 ECT)
4. ✅ Balance decrements, transaction logged, success toast shown

---

### 5. My Compliance Tracker

1. Navigate to **My Compliance** → `company/compliance.html`
2. Overall compliance score badge (A / At Risk / Non-Compliant) derived from report history
3. Per-regulation cards: EPA 1986, SEBI BRSR, BEE PAT, EU CBAM
4. **SBTi trajectory calculator** auto-runs across all filed reports: shows 1.5°C / 2°C / below-pace alignment

---

### 6. Consumer — Public Product Search

1. Open `consumer/search.html` (no login)
2. Search `"steel"`, `"Ravi"`, or `"textile"`
3. Filter by Grade **A** pill → only green-rated products shown
4. Filter by Industry → narrows by sector
5. Click any card → lands on the product detail page

---

### 7. Consumer — Product Detail (New Sections)

1. Open `consumer/product.html?productId=prod_ravi_steel`
2. ✅ **Sustainability Tip** block renders below lifecycle chart — Grade C shows: _"This product's footprint is above sector average. Equivalent to driving X km per unit."_
3. ✅ **Better Alternatives** section shows up to 3 products in the same category with equal or better score
4. Click **Download Print Label** → redirects to `label-generator.html?productId=prod_ravi_steel`

---

### 8. Printable Carbon Label

1. Open `consumer/label-generator.html?productId=prod_ravi_steel`
2. Label renders at 340×189px (90×50mm at 96dpi):
   - EcoMark logo, Product name, Company, Score badge (colour-coded), CO₂e/unit, live QR code, "Scan to verify at ecomark.app"
3. Click **Print Label** → `window.print()` fires; `@media print` hides everything except the label; `@page` sets size to 90×50mm
4. Use the 3 size buttons to preview at 75% / 100% / 130%

---

### 9. Regulator / Admin Portal

1. Log out → login as `admin@ecomark.com / admin`
2. **Analytics tab**: KPI cards, emissions chart, Eco-Coin leaderboard
3. **Compliance Enforcement tab**: per-company status cards with **Issue Notice** and **Send Reminder** buttons — all actions are logged to the tamper-evident audit trail
4. **Facility Registry tab**: sortable, filterable table of all registered companies
5. **Audit Log tab**: WORM-style log with lock icons for every action
6. Click **Export Ledger (CSV)** — downloads all company audit data as a spreadsheet

---

## 📋 Public Policy & Compliance Portal

Open `compliance.html` from the landing page (no login) to access:

- **Full regulatory framework** coverage: EPA 1986, BEE PAT Cycle 7, SEBI BRSR Principle 6, India NDC, ISO 14064-1, GHG Protocol, EU CSRD, EU CBAM, SBTi, TCFD
- **Real penalty tables**: ₹1L/day EPA fines, ₹25Cr SEBI penalties, €50/tonne CBAM charges
- **Compliance checklist** for SMEs vs large/listed enterprises
- **EcoMark ↔ Framework mapping** table
- **Interactive FAQ** (8 questions, expand/collapse)

---

## 🧮 IPCC Emission Coefficients (AR5)

All calculations use these verified IPCC factors:

| Fuel / Utility | Factor | Unit |
|---|---|---|
| **Diesel Fuel** | 2.68 | kg CO₂e / Litre |
| **Petrol / Gasoline** | 2.31 | kg CO₂e / Litre |
| **LPG** | 1.51 | kg CO₂e / Litre |
| **Natural Gas** | 2.04 | kg CO₂e / m³ |
| **Coal (Bituminous)** | 2.42 | kg CO₂e / kg |
| **Furnace Oil** | 3.15 | kg CO₂e / Litre |
| **Biomass (Wood chips)** | 0.41 | kg CO₂e / kg |
| **Electricity (Grid Avg.)** | 0.82 | kg CO₂e / kWh |

## 🟢 Carbon Score Grading Thresholds

| Grade | CO₂e / unit | Meaning |
|---|---|---|
| **A+** | ≤ 0.5 kg | Ultra-Green — Top 5% |
| **A** | ≤ 2.0 kg | Green — Below average |
| **B** | ≤ 5.0 kg | Moderate — Near average |
| **C** | ≤ 10.0 kg | High Carbon |
| **D** | > 10.0 kg | Very High Carbon |

---

## 🌱 Green Energy Switching Reference

| From Fuel | Recommended Switch | CO₂e Reduction |
|---|---|---|
| Diesel | CNG (Compressed Natural Gas) | **−24%** |
| Coal | Grid Electricity (Renewable Mix) | **−83%** |
| Furnace Oil | Natural Gas | **−35%** |
| Petrol | CNG or Electric Fleet | **−28%** |
| LPG | Solar Thermal / Biomass | **−15%** |

---

## 📐 Regulatory Compliance Reference

| Regulation | Scope | Applies To | EcoMark Coverage |
|---|---|---|---|
| **EPA 1986** | Annual Form V emission statement | All industries | ✅ Quarterly Scope 1 reports |
| **BEE PAT Scheme** | Energy consumption targets | Designated Consumers (≥30,000 MTOE/yr for steel) | ✅ Quarterly energy data + DC filing |
| **SEBI BRSR** | Scope 1 & 2 disclosure, GHG intensity | Top-1000 listed companies (FY23+ mandatory) | ✅ BRSR P6 Essential Indicators 1–7 |
| **EU CBAM** | Embedded carbon in exported goods | Steel, aluminium, cement, fertilisers, hydrogen | ✅ CO₂e/unit = CBAM "actual emissions" |
| **ISO 14064-1** | GHG inventory methodology | All organisations seeking third-party verification | ✅ IPCC AR5 factors, Scope 1 & 2 |
| **SBTi** | 1.5°C-aligned reduction targets | Voluntary — all sectors | ✅ Auto-trajectory calculator in policy-guide |

---

*© 2024 EcoMark Industrial Carbon Accounting — Built for India's net-zero industrial transition.*
