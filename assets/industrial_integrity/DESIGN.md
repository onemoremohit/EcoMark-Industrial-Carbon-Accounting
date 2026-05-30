---
name: Industrial Integrity
colors:
  surface: '#f8faf8'
  surface-dim: '#d8dad9'
  surface-bright: '#f8faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f2'
  surface-container: '#eceeec'
  surface-container-high: '#e6e9e7'
  surface-container-highest: '#e1e3e1'
  on-surface: '#191c1b'
  on-surface-variant: '#3f4941'
  inverse-surface: '#2e3130'
  inverse-on-surface: '#eff1ef'
  outline: '#6f7a70'
  outline-variant: '#bec9be'
  surface-tint: '#006d3f'
  primary: '#006036'
  on-primary: '#ffffff'
  primary-container: '#1a7a4a'
  on-primary-container: '#abffc6'
  inverse-primary: '#80d9a0'
  secondary: '#1b6d24'
  on-secondary: '#ffffff'
  secondary-container: '#a0f399'
  on-secondary-container: '#217128'
  tertiary: '#1c5f21'
  on-tertiary: '#ffffff'
  tertiary-container: '#377837'
  on-tertiary-container: '#b6fead'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9bf6ba'
  primary-fixed-dim: '#80d9a0'
  on-primary-fixed: '#00210f'
  on-primary-fixed-variant: '#00522e'
  secondary-fixed: '#a3f69c'
  secondary-fixed-dim: '#88d982'
  on-secondary-fixed: '#002204'
  on-secondary-fixed-variant: '#005312'
  tertiary-fixed: '#acf4a4'
  tertiary-fixed-dim: '#91d78a'
  on-tertiary-fixed: '#002203'
  on-tertiary-fixed-variant: '#0c5216'
  background: '#f8faf8'
  on-background: '#191c1b'
  surface-variant: '#e1e3e1'
  score-a-plus: '#1B5E20'
  score-a: '#388E3C'
  score-b: '#F9A825'
  score-c: '#E65100'
  score-d: '#B71C1C'
  surface-border: '#E1E8E1'
  text-main: '#1A1C1A'
  text-muted: '#5C635C'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  data-tabular:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system for this product is rooted in the "Industrial Modern" aesthetic—a blend of **Corporate/Modern** reliability and **Minimalist** precision. It is designed to evoke a sense of transparency, institutional trust, and data-driven authority. 

The target audience includes both industrial compliance officers and environmentally conscious consumers. Consequently, the UI balances technical density for professional users with high-legibility clarity for the public. The aesthetic relies on structured grids, generous whitespace to reduce cognitive load during data entry, and high-contrast signaling for environmental scores. It feels "engineered" rather than "decorated," reflecting the accuracy required in carbon accounting.

## Colors

The palette is anchored in a spectrum of forest and industrial greens to reinforce the ecological mission. 

- **Primary & Secondary:** These are used for branding, primary actions, and navigational emphasis.
- **Background & Neutral:** A very light, cool-toned green-tinted white (`#F9FBF9`) is used for the canvas to differentiate it from standard white-label SaaS products.
- **Functional Palette:** This design system utilizes a strict semantic mapping for carbon scores. These colors are reserved exclusively for score badges and data visualizations to ensure their meaning is never diluted.
- **Contrast:** High-contrast text (`#1A1C1A`) ensures WCAG accessibility across all data tables and reports.

## Typography

The typography uses **Inter**, a typeface designed for highly functional interfaces. It provides the clarity needed for complex data tables and numerical density.

- **Headlines:** Use tighter letter spacing and semi-bold weights to command attention in dashboards.
- **Labels:** Small labels use uppercase tracking to differentiate them from body text in form fields.
- **Numerical Data:** For all emissions values and "Eco-Coin" balances, use the `data-tabular` style which enables tabular figures to ensure numbers align perfectly in lists and tables.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. Dashboards utilize a 12-column fluid grid with a maximum container width of 1200px to prevent excessive line lengths on ultra-wide monitors.

- **Grid:** On desktop, use a 24px gutter. On mobile, the grid collapses to a single column with 16px side margins.
- **Rhythm:** A 4px baseline grid ensures vertical rhythm. Elements are spaced in increments of 4 (8, 16, 24, 32, 48).
- **Data Density:** Use "Compact" vertical spacing for tables (`stack-sm`) and "Roomy" spacing for consumer-facing landing pages (`stack-lg`) to create an inviting, breathable experience for the public.

## Elevation & Depth

This design system uses **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows to maintain a clean, "flat" industrial feel.

- **Surface Levels:** The primary background is `#F9FBF9`. Cards and containers use a pure white (`#FFFFFF`) surface to lift them visually.
- **Outlines:** Instead of shadows, use 1px solid borders in `#E1E8E1` for containers. This creates a blueprint-like precision.
- **Interactive Depth:** Only use a subtle, 4px blur, 10% opacity black shadow on "hover" states for primary buttons and QR code cards to indicate interactivity.

## Shapes

The shape language is **Soft (0.25rem)**. This slight rounding takes the "edge" off the industrial data without appearing too playful or consumer-oriented.

- **Standard Elements:** Buttons, input fields, and cards use the base 4px (0.25rem) radius.
- **Score Badges:** These are the exception; they may use `rounded-xl` (0.75rem) to create a distinct, pill-like shape that stands out from the rectangular data grid.
- **QR Codes:** Must remain sharp (0px) or use the minimum possible radius to ensure scannability.

## Components

- **Buttons:** Primary buttons use the forest green background with white text. Secondary buttons use a ghost style (border only).
- **Score Badges:** These are the visual heroes. Use a heavy weight font (Semi-bold) and the specific score colors. For the public page, these should be large (at least 80px x 80px).
- **Input Fields:** Use a subtle border and the `label-sm` style for field titles. Focus states must use the secondary color (`#2E7D32`) for the border.
- **Cards:** White background, 1px `#E1E8E1` border, 4px corner radius. Group related data points (e.g., "Fuel Usage") within internal cards.
- **Data Visualizations:** Chart.js colors should match the primary green for trends, but use the semantic score colors when displaying categorical comparisons.
- **Equivalency Line:** Use an icon-lead callout box with a light green tint to highlight the "Equal to driving X km" statistic for consumers.