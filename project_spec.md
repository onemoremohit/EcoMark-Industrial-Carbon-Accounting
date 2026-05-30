# EcoMark — Project Specification for Antigravity Agent
## Your Role: Build this entire project autonomously from this spec file.

---

## PROJECT OVERVIEW

Build **EcoMark** — a full-stack web platform for industrial carbon transparency.

Companies submit their fuel usage data. EcoMark calculates carbon emissions from
that data using IPCC emission factors. Each product gets a QR code. Consumers scan
the QR code to view the product's carbon footprint. Admins monitor all industry
emissions through a dashboard. Companies earn Eco-Coins for reducing emissions.

---

## TECH STACK (Do not deviate from this)

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JavaScript |
| Backend API | Python + Flask |
| Database | Firebase Firestore |
| Authentication | Firebase Authentication |
| File Storage | Firebase Storage (for QR images) |
| Hosting | Firebase Hosting |
| QR Generation | Python qrcode library |
| Charts | Chart.js |
| Backend Hosting | Railway.app (for Flask API) |

---

## USER ROLES

1. **Company** — registers, submits fuel reports, views own products + eco-coins
2. **Consumer** — no login, scans QR code, views product carbon footprint (public page)
3. **Admin** — views all companies, all reports, full analytics dashboard

---

## PROJECT FOLDER STRUCTURE

```
ecomark/
├── frontend/
│   ├── index.html                  (Landing page — explain EcoMark)
│   ├── login.html                  (Company login)
│   ├── register.html               (Company registration)
│   ├── company/
│   │   ├── dashboard.html          (Company home — emission trend chart)
│   │   ├── submit-report.html      (Fuel data submission form)
│   │   ├── my-products.html        (All products with QR codes)
│   │   └── eco-coins.html          (Eco-coin balance + history)
│   ├── consumer/
│   │   └── product.html            (Public QR scan landing page)
│   ├── admin/
│   │   └── dashboard.html          (Full analytics, rankings, export)
│   ├── css/
│   │   └── style.css               (Global styles — green theme)
│   └── js/
│       ├── firebase-config.js      (Firebase init)
│       ├── auth.js                 (Login, register, logout)
│       ├── report.js               (Submit report + call backend API)
│       ├── products.js             (Load products, show QR codes)
│       ├── eco-coins.js            (Display coin balance + history)
│       ├── consumer.js             (Load product data from URL param)
│       └── admin.js                (Admin dashboard charts + tables)
│
├── backend/
│   ├── app.py                      (Flask entry point — all API routes)
│   ├── carbon_engine.py            (CO2 calculation logic)
│   ├── qr_generator.py             (QR code generation + Firebase upload)
│   ├── eco_coins.py                (Eco-coin calculation)
│   ├── audit_log.py                (Write tamper-evident audit entries)
│   └── requirements.txt
│
├── firebase/
│   ├── firestore.rules             (Security rules)
│   └── firebase.json               (Firebase config)
│
└── PROJECT_SPEC.md                 (This file)
```

---

## FIREBASE FIRESTORE DATABASE SCHEMA

### Collection: `users/{uid}`
```json
{
  "role": "company | admin",
  "companyName": "string",
  "email": "string",
  "industry": "string",
  "location": "string",
  "ecoCoins": 0,
  "createdAt": "timestamp"
}
```

### Collection: `reports/{reportId}`
```json
{
  "companyId": "string (uid)",
  "productId": "string",
  "period": "2024-Q3",
  "fuelEntries": [
    { "fuel_type": "diesel", "quantity": 500, "unit": "liters" }
  ],
  "batchSize": 1000,
  "totalCO2e": 1340.0,
  "co2ePerUnit": 1.34,
  "score": "A",
  "submittedAt": "timestamp",
  "verified": false
}
```

### Collection: `products/{productId}`
```json
{
  "companyId": "string",
  "productName": "string",
  "category": "string",
  "latestScore": "A",
  "latestCO2ePerUnit": 1.34,
  "qrCodeUrl": "firebase-storage-url",
  "reportHistory": ["reportId1", "reportId2"]
}
```

### Collection: `audit_logs/{logId}`
```json
{
  "action": "report_submitted",
  "companyId": "string",
  "reportId": "string",
  "dataHash": "sha256-hash-of-report-data",
  "timestamp": "timestamp",
  "submittedBy": "uid"
}
```

---

## BACKEND API ROUTES (Flask — backend/app.py)

```
POST /api/calculate-carbon
  Body: { fuelEntries: [...], batchSize: number }
  Returns: { totalCO2e, co2ePerUnit, score }

POST /api/generate-qr
  Body: { productId: string, companyId: string }
  Returns: { qrCodeUrl: string }

POST /api/submit-report
  Body: { companyId, productId, period, fuelEntries, batchSize }
  Returns: { reportId, totalCO2e, co2ePerUnit, score, ecoCoinsEarned }

GET /api/product/:productId
  Returns: { productName, companyName, latestScore, co2ePerUnit, trend, equivalencies }

GET /api/admin/companies
  Returns: [ { companyId, name, totalCO2e, score, trend } ]
```

---

## CARBON CALCULATION LOGIC (carbon_engine.py)

```python
EMISSION_FACTORS = {
    "diesel": 2.68,         # kg CO2e per liter
    "petrol": 2.31,
    "lpg": 1.51,
    "natural_gas": 2.04,    # per m3
    "coal": 2.42,           # per kg
    "furnace_oil": 3.15,
    "biomass": 0.41,
    "electricity": 0.82     # India avg, per kWh
}

def calculate_carbon(fuel_entries, batch_size):
    total_co2e = sum(
        entry["quantity"] * EMISSION_FACTORS.get(entry["fuel_type"], 0)
        for entry in fuel_entries
    )
    co2e_per_unit = total_co2e / batch_size
    return {
        "total_co2e_kg": round(total_co2e, 2),
        "co2e_per_unit_kg": round(co2e_per_unit, 4),
        "score": get_score(co2e_per_unit)
    }

def get_score(co2e_per_unit):
    if co2e_per_unit <= 0.5:  return "A+"
    elif co2e_per_unit <= 2.0: return "A"
    elif co2e_per_unit <= 5.0: return "B"
    elif co2e_per_unit <= 10.0: return "C"
    else: return "D"
```

---

## ECO-COIN RULES (eco_coins.py)

| Trigger | Coins |
|---|---|
| Register on platform | +100 |
| Submit first report | +200 |
| Submit report on time | +50 |
| Score A or A+ | +300 |
| 10% emission reduction from last report | +500 |
| 25%+ emission reduction | +1000 |
| Net Zero for a product | +2000 |

---

## CARBON SCORE DISPLAY SYSTEM

| Score | CO2e/unit | Color | Label |
|---|---|---|---|
| A+ | 0 – 0.5 kg | #1B5E20 (dark green) | Ultra Green |
| A | 0.5 – 2 kg | #388E3C (green) | Green |
| B | 2 – 5 kg | #F9A825 (yellow) | Moderate |
| C | 5 – 10 kg | #E65100 (orange) | High |
| D | 10+ kg | #B71C1C (red) | Very High |

---

## CONSUMER PAGE FEATURES (consumer/product.html)

- Product name + company name
- Large score badge (A+ to D) with colour
- CO2e per unit in kg
- Equivalency line: "Equal to driving X km" (1 kg CO2e = 6 km driving)
- Trend indicator: improved / worsened vs previous report
- Plain-language verdict: "This product has a LOW carbon footprint"
- No login required — fully public page
- URL format: ecomark.app/product/{productId}

---

## ADMIN DASHBOARD FEATURES (admin/dashboard.html)

- Total companies registered (number card)
- Total CO2e reported this quarter (number card)
- Companies with improving trend (number card)
- Companies with worsening trend (red number card)
- Sortable industry rankings table (sort by: total CO2e, score, trend)
- Filter by industry type and location
- Per-company detail view with emission history line chart
- CSV export button for all reports
- Charts: line (trends), bar (industry comparison), pie (fuel breakdown)

---

## DESIGN GUIDELINES

- Primary color: #1A7A4A (forest green)
- Accent: #2E7D32
- Background: #F9FBF9
- Font: Inter or system-ui
- Clean, minimal, professional
- Mobile responsive using CSS flexbox/grid
- Score badges must be visually prominent and colour-coded
- QR codes should be downloadable from my-products page

---

## FIRESTORE SECURITY RULES SUMMARY

- Companies: read/write own documents only (auth.uid == companyId)
- Reports: company writes own, admin reads all
- Products: public read (for QR scan), company writes own
- Audit logs: admin read only, nobody writes directly (backend only)
- Users: read own profile only

---

## BUILD ORDER (Follow this sequence)

1. Set up Firebase project + initialize firebase-config.js
2. Build register.html + login.html with Firebase Auth
3. Build submit-report.html form (frontend only first)
4. Build Flask backend: carbon_engine.py + /api/calculate-carbon route
5. Connect frontend form to Flask API — store result in Firestore
6. Build qr_generator.py + /api/generate-qr route
7. Build consumer/product.html — public QR scan page
8. Build company/dashboard.html with Chart.js emission trend
9. Build company/my-products.html with QR download
10. Build eco-coins logic + company/eco-coins.html
11. Build admin/dashboard.html with full analytics
12. Build index.html landing page
13. Add Firestore security rules
14. Test end-to-end with dummy data for 2-3 sample companies
15. Deploy to Firebase Hosting

---

## IMPORTANT CONSTRAINTS

- Do NOT use React, Vue, or any JS framework — Vanilla JS only
- Do NOT use any paid APIs or services
- Do NOT use IoT or hardware — all data is form-submitted by companies
- All carbon math must use the IPCC emission factors listed above
- The consumer product page must work WITHOUT login
- Firebase free tier (Spark plan) must be sufficient — no paid Firebase features
- Python backend must run on Railway.app free tier

---

## DUMMY TEST DATA (Use this to test the full flow)

Company 1: Ravi Steel Industries | Industry: Manufacturing | Location: Pune
  Product: Steel Rod Grade-60 | Batch: 500 units
  Fuel: Diesel 800L + Coal 200kg → Calculate CO2e → Generate QR

Company 2: GreenWave Textiles | Industry: Textile | Location: Surat
  Product: Cotton Fabric Roll | Batch: 1000 units
  Fuel: Natural Gas 300m3 + Electricity 500kWh → Calculate CO2e → Generate QR

Company 3: SunBake Foods | Industry: Food Processing | Location: Nashik
  Product: Packaged Wheat Flour | Batch: 2000 units
  Fuel: LPG 100L + Electricity 200kWh → Calculate CO2e → Generate QR
```

---

*EcoMark Project Spec v2.0 | Solo Developer Build | Firebase + Flask + Vanilla JS*
