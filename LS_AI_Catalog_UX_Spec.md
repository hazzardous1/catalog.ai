# LS.AI.Catalog — UX Design Specification
**Accenture Life Sciences AI & Data Practice**
Version 1.0 | For Claude Code Build

---

## 1. Project Context

### Purpose
A knowledge repository enabling the Life Sciences AI & Data practice to find, retrieve, and apply its best prior work. The primary user emotion on first visit should be: *"This is what I've been hoping existed."* The design must feel effortless — not a filing system, not a dense marketplace, but a curated intelligence layer.

### Scope
- React single-page application
- Single role rendered (Practice Member / all users — no role-based UI switching in v1)
- All data mocked — no live backend required
- Three screens: Homepage, Results Page, Asset Preview (slide-over panel)
- One workflow: Contribution (upload → metadata confirm → publish)

### Out of Scope for v1
- Authentication / role enforcement
- Live API calls (Claude API, Azure AI Search, SharePoint)
- Usage analytics dashboard
- Taxonomy management UI
- Teams integration

---

## 2. Design System

### 2.1 Color Tokens

```css
:root {
  /* Brand */
  --color-accent:        #A100FF;  /* Accenture purple — used sparingly */
  --color-accent-dim:    #7B00C4;  /* Hover states on accent elements */
  --color-accent-glow:   rgba(161, 0, 255, 0.15); /* Flagship glow, subtle backgrounds */

  /* Backgrounds */
  --color-bg-base:       #0A0A0F;  /* Page background — near-black, slightly blue-tinted */
  --color-bg-surface:    #13131A;  /* Cards, panels */
  --color-bg-elevated:   #1C1C26;  /* Hover states on cards, filter panel */
  --color-bg-overlay:    rgba(10, 10, 15, 0.85); /* Slide-over backdrop */

  /* Borders */
  --color-border-subtle: rgba(255, 255, 255, 0.06);
  --color-border-default: rgba(255, 255, 255, 0.12);
  --color-border-accent: rgba(161, 0, 255, 0.4);

  /* Text */
  --color-text-primary:  #F0F0F5;
  --color-text-secondary: #9999AA;
  --color-text-muted:    #5A5A6E;
  --color-text-inverse:  #0A0A0F;

  /* Semantic */
  --color-flagship:      #A100FF;
  --color-flagship-glow: rgba(161, 0, 255, 0.2);
  --color-restricted:    rgba(255, 180, 0, 0.15);
  --color-restricted-text: #FFB400;
  --color-success:       #00C896;
  --color-success-dim:   rgba(0, 200, 150, 0.12);
}
```

### 2.2 Typography

```css
/* Font imports — add to index.html or CSS */
/* Display: DM Serif Display — authoritative, distinctive, not corporate-cold */
/* Body: DM Sans — clean, modern, pairs naturally with DM Serif */

@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

:root {
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;

  /* Scale */
  --text-xs:   0.75rem;   /* 12px — labels, badges */
  --text-sm:   0.875rem;  /* 14px — metadata, secondary text */
  --text-base: 1rem;      /* 16px — body copy */
  --text-lg:   1.125rem;  /* 18px — card titles */
  --text-xl:   1.375rem;  /* 22px — section headings */
  --text-2xl:  1.75rem;   /* 28px — page headings */
  --text-3xl:  2.5rem;    /* 40px — homepage hero */
  --text-4xl:  3.5rem;    /* 56px — homepage tagline */

  /* Weight */
  --weight-light:   300;
  --weight-regular: 400;
  --weight-medium:  500;
  --weight-semibold: 600;

  /* Leading */
  --leading-tight:  1.2;
  --leading-normal: 1.5;
  --leading-loose:  1.7;

  /* Tracking */
  --tracking-wide:  0.08em;  /* Uppercase labels */
  --tracking-tight: -0.02em; /* Large display text */
}
```

### 2.3 Spacing

```css
:root {
  --space-1:  0.25rem;   /* 4px */
  --space-2:  0.5rem;    /* 8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-5:  1.25rem;   /* 20px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
}
```

### 2.4 Elevation & Motion

```css
:root {
  /* Shadows */
  --shadow-card:     0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3);
  --shadow-elevated: 0 8px 32px rgba(0,0,0,0.5);
  --shadow-flagship: 0 0 0 1px var(--color-border-accent),
                     0 0 24px var(--color-flagship-glow);
  --shadow-panel:    -8px 0 40px rgba(0,0,0,0.6);

  /* Radius */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-pill: 9999px;

  /* Transitions */
  --transition-fast:   150ms ease;
  --transition-base:   250ms ease;
  --transition-slow:   400ms ease;
  --transition-panel:  350ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 2.5 Layout

```css
:root {
  --layout-max-width:    1280px;
  --layout-padding-x:    var(--space-8);   /* 32px side padding */
  --layout-nav-height:   64px;
  --layout-panel-width:  560px;            /* Slide-over preview panel */
}

/* Responsive breakpoints */
/* sm:  640px  */
/* md:  768px  */
/* lg:  1024px */
/* xl:  1280px */
```

---

## 3. Component Library

### 3.1 Navigation Bar

**Layout:** Fixed top, full width, height `--layout-nav-height`. Background `--color-bg-surface` with `border-bottom: 1px solid var(--color-border-subtle)`. Slight backdrop blur: `backdrop-filter: blur(12px)`.

**Left:** Wordmark — "LS.AI" in `--font-display` at `--text-xl`, color `--color-text-primary`. Dot separator. "Catalog" in `--font-body --weight-light` at `--text-xl`, color `--color-text-secondary`.

**Center:** Intent bar (see 3.2) — takes 40% of nav width on results and inner pages. Hidden on homepage (intent bar is full-width hero on homepage).

**Right:**
- "Contribute an asset" button — ghost style, `--color-accent` border and text, `--radius-pill`, `--text-sm --weight-medium`. On hover: background `--color-accent-glow`.
- Notification bell icon (placeholder, no functionality in v1).

**Active state:** Current page link underlined with 2px `--color-accent` bottom border.

---

### 3.2 Intent Bar

The primary interaction element. Used in two contexts: full-width hero on homepage, compact in nav on inner pages.

**Structure:**
```
[ 🔍 icon ]  [ input field — "What are you working on?" ]  [ → submit button ]
```

**Styling:**
- Background: `--color-bg-elevated`
- Border: `1px solid var(--color-border-default)`
- Border-radius: `--radius-pill` (homepage), `--radius-lg` (nav compact)
- On focus: border changes to `--color-border-accent`, subtle `--color-flagship-glow` box-shadow
- Placeholder text: `--color-text-muted`, italic, `--font-body`
- Input text: `--color-text-primary`, `--font-body --weight-regular`
- Submit button: filled `--color-accent`, white arrow icon, `--radius-pill`
- On submit hover: `--color-accent-dim`

**Homepage sizing:** Max-width 640px, centered, height 56px, `--text-base`
**Nav compact sizing:** Height 40px, `--text-sm`

**Behavior:**
- On submit → navigate to Results page, query passed as URL param `?q=`
- On empty submit → no action
- Supports Enter key submission
- No autocomplete in v1

---

### 3.3 Asset Card

Used in: domain tile drill-down, results page, related documents list.

**Dimensions:** Full width within its grid column. Min-height 160px.

**Structure (top to bottom):**
```
[ Asset Type badge ]  [ Quality Tier badge ]           ← row, space-between
[ Title ]                                               ← 2 lines max, truncate
[ Capability Domain tag ]  [ Year ]                    ← row
[ 2-line summary excerpt ]                             ← --color-text-secondary
[ Contributing team ]  [ Download count icon + n ]    ← row, --text-xs --color-text-muted
```

**Styling:**
- Background: `--color-bg-surface`
- Border: `1px solid var(--color-border-subtle)`
- Border-radius: `--radius-lg`
- Padding: `--space-5`
- On hover: background transitions to `--color-bg-elevated`, border to `--color-border-default`, cursor pointer, `--transition-base`

**Flagship variant (additional styles):**
- Border: `1px solid var(--color-border-accent)`
- Box-shadow: `--shadow-flagship`
- Subtle top-edge glow: `background: linear-gradient(180deg, var(--color-accent-glow) 0%, transparent 60%)` as a pseudo-element overlay

**Restricted variant (additional styles):**
- No special border
- Below the title, a restricted flag row:
  `⚠ Account team review required` — `--color-restricted-text`, `--text-xs`, background `--color-restricted`, `--radius-sm`, padding `2px 8px`, inline block

**Badge — Asset Type:**
- Background: `--color-bg-elevated`
- Border: `1px solid var(--color-border-default)`
- Text: `--text-xs --weight-medium --color-text-secondary`
- `--radius-pill`, padding `2px 10px`
- Letter-spacing: `--tracking-wide`, uppercase

**Badge — Quality Tier:**
- Flagship: background `--color-accent`, text white, `--radius-pill`
- Standard: background transparent, border `--color-border-default`, text `--color-text-muted`
- Reference: background transparent, text `--color-text-muted`, no border

---

### 3.4 Domain Tile

Used on homepage in the capability domain grid.

**Dimensions:** Fixed height 140px, full column width.

**Structure:**
```
[ Domain icon (24px) ]
[ Domain name — --text-lg --font-display ]
[ Asset count — --text-sm --color-text-secondary ]
[ 2 Flagship asset titles — --text-xs --color-text-muted, truncated ]
```

**Styling:**
- Background: `--color-bg-surface`
- Border: `1px solid var(--color-border-subtle)`
- Border-radius: `--radius-xl`
- Padding: `--space-5`
- On hover: border `--color-border-accent`, background shifts subtly, `--transition-base`
- Active/selected: border `--color-border-accent`, background `--color-accent-glow`

**Domain icons:** Use simple SVG line icons, `--color-accent`, 24px. One per domain:
- AI/ML → circuit node icon
- Clinical → cross/flask icon
- Commercial → chart icon
- R&D → atom icon
- Supply Chain → flow icon
- Regulatory → shield icon
- Operating Model → org chart icon
- Data & Analytics → database icon

---

### 3.5 Slide-Over Preview Panel

Appears when a user clicks any asset card. Overlays from the right edge.

**Dimensions:** Width `--layout-panel-width` (560px). Full viewport height. Fixed position.

**Animation:** Slides in from right, `transform: translateX(100%)` → `translateX(0)`, `--transition-panel`. Backdrop: semi-transparent overlay on left of panel, `--color-bg-overlay`, `backdrop-filter: blur(4px)`.

**Structure (top to bottom):**

```
[ Close button (×) — top right ]

[ Asset Type badge ]  [ Quality Tier badge ]  ← same as card badges

[ Title — --text-2xl --font-display ]

[ Restricted flag (if applicable) ]

[ Metadata grid — 2 columns ]
  Life Sciences Segment | Capability Domain
  Therapeutic Area      | Engagement Year
  Geography             | Contributing Team
  Confidentiality Level | Keywords/Tags

[ Divider ]

[ AI Summary heading — "Summary" ]
[ Summary text — 3–5 sentences, --color-text-secondary ]

[ Divider ]

[ Document Preview ]
  Rendered inline — PDF/PPTX placeholder in v1
  Aspect ratio 4:3, --color-bg-elevated background with centered
  document icon and filename if preview not available

[ Divider ]

[ Related Documents ]
  Heading: "Related Assets"
  List of 1–3 related asset titles, clickable → panel updates

[ Download button — full width, filled --color-accent ]
[ "Nominate for Flagship" text link — --text-sm --color-accent ]
  (shown for all users in v1 single-role render)
```

**Metadata grid styling:**
- Label: `--text-xs --weight-medium --color-text-muted`, uppercase, `--tracking-wide`
- Value: `--text-sm --color-text-primary`
- Tags (keywords): pill badges, `--color-bg-elevated`, `--color-border-default`, `--text-xs`

**Panel scroll:** Panel body scrolls independently. Close button and Download button fixed within panel (not scrolling away).

---

### 3.6 Agent Response Block

Appears at the top of the Results page, above asset cards. Only rendered when query came from the intent bar (not domain tile browse).

**Structure:**
```
[ Sparkle/AI icon — --color-accent, 16px ]  [ "Practice Intelligence" label — --text-xs uppercase ]
[ Response text — 2–4 sentences ]
[ Source citations — inline chips ]
[ Extrapolation warning (if triggered) ]
```

**Styling:**
- Background: `--color-bg-surface`
- Left border: `3px solid var(--color-accent)`
- Border-radius: `--radius-lg` (right corners only, left square due to border)
- Padding: `--space-5 --space-6`
- Response text: `--text-base --color-text-primary --leading-loose`

**Source citation chips:**
- Format: `[Document Title — Flagship — 2023]`
- Style: `--color-bg-elevated`, border `--color-border-default`, `--radius-pill`, `--text-xs`
- Clickable — opens that asset's slide-over panel
- Flagship citations get `--color-border-accent` border

**Extrapolation warning:**
- Triggered when: no relevant assets found, or agent confidence low
- Text: *"No direct prior work found for this query — showing closest matches below."*
- Style: `--color-restricted-text`, `--text-sm`, italic, displayed below response text

---

### 3.7 Filter Panel

Persistent left rail on Results page. Width 220px. Not shown on homepage.

**Sections (collapsible):**
- Asset Type (checkboxes)
- Capability Domain (checkboxes)
- Life Sciences Segment (checkboxes)
- Quality Tier (checkboxes — Flagship / Standard / Reference)
- Engagement Year (range or multi-select)

**Styling:**
- No panel background — floats on page background
- Section heading: `--text-xs --weight-semibold --color-text-muted`, uppercase, `--tracking-wide`
- Checkbox label: `--text-sm --color-text-secondary`
- Checked state: `--color-accent` checkbox fill
- Active filter count badge per section: `--color-accent` filled circle, white number, `--text-xs`
- "Clear all filters" link at top: `--text-sm --color-accent`

---

### 3.8 Contribution Flow — Upload Screen

Accessed via "Contribute an asset" nav button.

**Layout:** Centered, max-width 680px, full page.

**Step 1 — Upload:**
```
[ Page title: "Contribute an Asset" — --text-2xl --font-display ]
[ Subtitle: "Share work that the practice can learn from." — --color-text-secondary ]

[ Drop zone ]
  Dashed border --color-border-default, --radius-xl
  Height 200px
  Centered: upload icon + "Drop files here, or browse"
  Accepted formats label: "PDF, PPTX, DOCX, XLSX · Max 100MB"
  On drag-over: border --color-border-accent, background --color-accent-glow

[ OR divider ]

[ SharePoint link input ]
  Label: "Or paste a SharePoint link"
  Input: standard text field styling

[ Duplicate detection alert — conditionally shown ]
  Yellow warning banner: "A similar document already exists: [title]"
  Three actions: "Proceed as new" / "Link as version" / "Cancel"
```

**Step 2 — Metadata Confirmation (shown after processing):**

```
[ Processing state ]
  Animated pulse on drop zone while AI analyzes
  Text: "Analyzing document..." — --color-text-muted

[ Metadata form — single screen, no wizard ]
  Each field shows:
    Label (left) + Confidence badge (right): High / Medium / Low
    Confidence badge colors:
      High:   --color-success background
      Medium: --color-restricted-text background  
      Low:    --color-text-muted background

  Fields rendered in this order:
    Document Title         (text input, editable)
    Asset Type             (single-select dropdown)
    Sub-Type               (single-select, conditional)
    Life Sciences Segment  (multi-select chips)
    Therapeutic Area       (multi-select chips)
    Capability Domain      (multi-select chips)
    Client (Anonymized)    (text input)
    Engagement Year        (year picker)
    Geography              (multi-select chips)
    Quality Tier           (single-select — Standard default, Flagship requires nomination)
    Confidentiality Level  (single-select — with inline note below)
    Keywords / Tags        (free text multi-tag input)
    Contributing Team      (text input)
    Summary                (textarea, AI-generated, editable, 3–5 sentences)

  Confidentiality inline note (below Confidentiality Level field):
    "You are responsible for ensuring this document is appropriately 
     classified before publishing."
    Style: --text-xs --color-text-muted, italic

[ Publish button ]
  Full width, filled --color-accent
  Disabled state (greyed) until all required fields populated
  Label: "Publish to Catalog"
  On click → success state, redirect to asset's preview page

[ Cancel link — --text-sm --color-text-muted ]
```

---

## 4. Screen Specifications

### 4.1 Homepage

**URL:** `/`

**Layout:** Full viewport, vertically centered content block, `--color-bg-base` background.

**Background treatment:** Subtle radial gradient centered behind the hero — `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(161,0,255,0.07) 0%, transparent 70%)`. Creates a faint atmospheric glow without being garish.

**Content block (centered, max-width 800px):**

```
[ Eyebrow label ]
  "Life Sciences AI & Data Practice"
  --text-xs --weight-semibold --color-text-muted, uppercase, --tracking-wide

[ Hero heading — two lines ]
  Line 1: "Find the work" — --font-display --text-4xl --color-text-primary
  Line 2: "that moves things forward." — --font-display --text-4xl --color-accent
  Line spacing tight. Total block ~110px tall.

[ Sub-heading ]
  "The practice's best thinking on AI and data in Life Sciences — 
   searchable, retrievable, ready to apply."
  --font-body --text-lg --color-text-secondary --leading-loose
  Max-width 560px, centered

[ Intent bar ]
  Max-width 640px, centered (see component 3.2)
  Margin-top: --space-8

[ Quick-start label ]
  "Or explore by domain →"
  --text-sm --color-text-muted, centered
  Margin-top: --space-6
```

**Domain tile grid:**
- 8 tiles in a 4-column grid (2 rows of 4)
- Gap: `--space-4`
- Max-width: 1100px, centered
- Margin-top: `--space-10` from quick-start label
- Each tile: see component 3.4

**Flagship showcase:**
- Section label: "Flagship Assets" — `--text-xs --weight-semibold --color-text-muted`, uppercase
- Subtitle: "Leadership-reviewed. Best-in-class." — `--text-sm --color-text-secondary`
- Layout: Horizontal scroll row, 3 cards visible at once, each ~360px wide
- Cards: use Asset Card component (3.3) in Flagship variant
- Show: 6–10 Flagship assets maximum
- Margin-top: `--space-16` from domain grid

**Page bottom padding:** `--space-24`

---

### 4.2 Results Page

**URL:** `/search?q={query}` or `/browse/{domain}`

**Layout:** Fixed nav + left filter panel (220px) + main content area (flex-grow).

**Top of main content:**

```
[ Query echo ]
  "Results for: {query}" or "Browsing: {domain name}"
  --text-xl --font-display --color-text-primary
  Margin-bottom: --space-6

[ Result count ]
  "{n} assets found" — --text-sm --color-text-secondary
```

**Agent response block (intent bar queries only):**
- See component 3.6
- Rendered between query echo and asset card grid
- Margin-bottom: `--space-6`

**Asset card grid:**
- 3-column grid on `xl`, 2-column on `md`, 1-column on `sm`
- Gap: `--space-4`
- Sort controls: right-aligned above grid — "Sort by: Relevance · Recency · Quality Tier" — `--text-sm`, active sort underlined with `--color-accent`

**Empty state:**
```
[ Centered block ]
  Icon: magnifying glass, --color-text-muted, 48px
  Heading: "Nothing found yet"
  Body: "This area of the catalog is still being built. 
         Try a different query or browse another domain."
  --color-text-secondary, --text-base
```

**Filter panel (left rail):**
- See component 3.7
- Sticky within scroll, aligned to top of content area

---

### 4.3 Asset Preview (Slide-Over Panel)

**Trigger:** Clicking any asset card on any page.

**Behavior:**
- Panel slides in from right (see component 3.5)
- Page behind remains visible and scrollable
- Clicking outside panel (on backdrop) closes it
- Close button (×) in panel top-right closes it
- URL updates to `/asset/{id}` for shareability (v1: mock this with hash routing)
- Clicking a related document updates panel content in place (no slide animation on update — cross-fade content)

**Flagship nomination flow (from panel):**
- "Nominate for Flagship" text link at bottom of panel
- On click: confirmation prompt inline — "Nominate this asset for Flagship status? Another LT Member will be asked to confirm." — two buttons: "Yes, nominate" / "Cancel"
- On confirm: success toast notification — "Nomination submitted. An LT Member will review." — `--color-success` left border, 4 second auto-dismiss, bottom-right corner

---

### 4.4 Contribution Screen

**URL:** `/contribute`

**Layout:** Full page, centered content, max-width 680px, `--layout-padding-x` sides.

**Nav:** Standard nav bar present. No back button — use browser back or nav logo.

**Flow:** Upload (Step 1) → Processing state → Metadata confirmation (Step 2) → Publish → Redirect to asset preview.

**Success state after publish:**
```
[ Toast notification — bottom right ]
  "Asset published successfully" — --color-success, auto-dismiss 5s

[ Redirect ]
  After 1.5s, navigate to the newly published asset's preview page
  (Results page with slide-over open for that asset)
```

---

## 5. Mock Data Specification

### 5.1 Capability Domains (8 tiles)

```javascript
const domains = [
  { id: 'ai-ml',           label: 'AI / ML',           count: 14, icon: 'circuit' },
  { id: 'clinical',        label: 'Clinical',           count: 11, icon: 'flask' },
  { id: 'commercial',      label: 'Commercial',         count: 9,  icon: 'chart' },
  { id: 'rd',              label: 'R&D',                count: 7,  icon: 'atom' },
  { id: 'supply-chain',    label: 'Supply Chain',       count: 6,  icon: 'flow' },
  { id: 'regulatory',      label: 'Regulatory',         count: 5,  icon: 'shield' },
  { id: 'operating-model', label: 'Operating Model',   count: 4,  icon: 'org' },
  { id: 'data-analytics',  label: 'Data & Analytics',  count: 12, icon: 'database' },
];
```

### 5.2 Sample Assets (12 assets — varied tiers, types, domains)

Each asset object shape:
```javascript
{
  id: string,
  title: string,
  assetType: string,         // from taxonomy
  subType: string,
  segment: string[],         // Pharma | Biotech | MedTech | Payer | CRO
  therapeuticArea: string[], // Oncology | Rare Disease | etc.
  capabilityDomain: string[],
  clientAnonymized: string,
  engagementYear: number,
  geography: string[],
  qualityTier: 'Flagship' | 'Standard' | 'Reference',
  confidentialityLevel: 'Internal Only' | 'Sanitized for Reuse' | 'Restricted',
  keywords: string[],
  contributingTeam: string,
  summary: string,           // 3–5 sentences
  relatedDocuments: string[], // array of asset ids
  downloadCount: number,
  isRestricted: boolean,     // true if confidentialityLevel === 'Restricted'
}
```

Sample assets to include (mix intentionally):

```javascript
const assets = [
  {
    id: 'asset-001',
    title: 'AI-Enabled Clinical Trial Optimization: A Framework for Mid-Size Biotechs',
    assetType: 'Framework / Methodology',
    subType: null,
    segment: ['Biotech'],
    therapeuticArea: ['Oncology', 'Rare Disease'],
    capabilityDomain: ['AI/ML', 'Clinical'],
    clientAnonymized: 'Mid-size oncology biotech, US',
    engagementYear: 2024,
    geography: ['North America'],
    qualityTier: 'Flagship',
    confidentialityLevel: 'Sanitized for Reuse',
    keywords: ['clinical trials', 'AI', 'optimization', 'patient recruitment'],
    contributingTeam: 'LS AI & Data, Clinical Practice',
    summary: 'This framework outlines a structured approach to applying AI across four phases of clinical trial design and execution for mid-size biotechs. It addresses patient recruitment optimization, protocol deviation prediction, real-time safety signal detection, and site performance benchmarking. Developed through two client engagements in 2023–2024, the methodology has been validated across oncology and rare disease contexts. Key tools include predictive recruitment models and an AI-assisted protocol review layer.',
    relatedDocuments: ['asset-003', 'asset-007'],
    downloadCount: 84,
    isRestricted: false,
  },
  // ... (11 more assets — see full data in src/data/assets.js)
];
```

### 5.3 Mock Agent Responses

Map sample queries to pre-written agent responses for v1. Each response should:
- Be 2–4 sentences
- Reference 1–3 source assets by id
- Occasionally include the extrapolation flag

```javascript
const agentResponses = [
  {
    queryMatch: ['clinical trial', 'clinical AI', 'trial optimization'],
    response: "The practice has done substantive work on AI in clinical operations, particularly around trial optimization for oncology and rare disease biotechs. Our strongest prior work covers patient recruitment modeling, real-time safety signal detection, and AI-assisted protocol review. There is also a related framework on clinical data quality monitoring developed with a global CRO.",
    citations: ['asset-001', 'asset-012'],
    extrapolation: false,
  },
  // ... (4 more responses — see full data in src/data/agentResponses.js)
];
```

---

## 6. Application Structure

### 6.1 Routing

```
/                    → Homepage
/search?q={query}    → Results page (intent bar query)
/browse/{domainId}   → Results page (domain tile browse)
/contribute          → Contribution flow
/asset/{id}          → Direct asset link (opens homepage or results with panel)
```

### 6.2 Component File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── NavBar.jsx
│   │   └── PageLayout.jsx
│   ├── intent/
│   │   └── IntentBar.jsx
│   ├── catalog/
│   │   ├── DomainTile.jsx
│   │   ├── DomainGrid.jsx
│   │   ├── AssetCard.jsx
│   │   ├── AssetGrid.jsx
│   │   ├── FlagshipShowcase.jsx
│   │   └── FilterPanel.jsx
│   ├── preview/
│   │   ├── PreviewPanel.jsx
│   │   ├── MetadataGrid.jsx
│   │   └── RelatedDocuments.jsx
│   ├── agent/
│   │   └── AgentResponseBlock.jsx
│   ├── contribute/
│   │   ├── UploadZone.jsx
│   │   ├── MetadataForm.jsx
│   │   └── Confidencebadge.jsx
│   └── ui/
│       ├── Badge.jsx
│       ├── Button.jsx
│       ├── Toast.jsx
│       └── Divider.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── ResultsPage.jsx
│   └── ContributePage.jsx
├── data/
│   ├── assets.js        ← mock asset data
│   ├── domains.js       ← domain tiles data
│   └── agentResponses.js ← mock agent responses
├── hooks/
│   ├── useSearch.js     ← query matching logic against mock data
│   └── usePreviewPanel.js
├── styles/
│   └── tokens.css       ← all CSS custom properties from Section 2
└── App.jsx              ← routing setup
```

### 6.3 Key Behavioral Logic

**Search / query matching (mock):**
- `useSearch` hook accepts a query string
- Matches against asset titles, summaries, keywords, and capability domains (case-insensitive substring match)
- Also matches against `agentResponses` query patterns to return the appropriate mock response
- Returns: `{ assets: Asset[], agentResponse: AgentResponse | null }`

**Domain tile browse:**
- Filters assets where `capabilityDomain` includes the selected domain id
- No agent response block rendered for browse results

**Filter panel:**
- Client-side filtering applied on top of search/browse results
- Multiple filters are AND logic within a category, OR logic across checkboxes in same category

**Preview panel state:**
- Managed by `usePreviewPanel` hook
- Stores `selectedAssetId` — null when panel closed
- URL hash updated to `#asset-{id}` when panel opens (allows sharing)
- Panel close: set `selectedAssetId` to null, remove hash

**Flagship nomination (mock):**
- On confirm: update asset's `nominatedForFlagship: true` in local state
- Toast shown
- No persistence in v1 (state resets on refresh)

---

## 7. Accessibility & Performance Notes

- All interactive elements keyboard navigable
- Focus trap inside slide-over panel when open
- Sufficient color contrast: all text meets WCAG AA against background colors
- `prefers-reduced-motion`: disable slide and fade animations, use instant transitions
- Images (document previews): `alt` text required
- Font loading: `font-display: swap` to prevent FOIT
- Mock data loads synchronously — no loading states required except contribution upload processing animation

---

## 8. What Is Explicitly Not in This Spec

The following are not to be built in v1:

- Real API calls of any kind (Claude, Azure AI Search, SharePoint)
- Authentication or session management
- Role-based permission enforcement
- Usage analytics dashboard
- Taxonomy management UI (add/edit/deprecate controlled vocabulary)
- Microsoft Teams integration
- Multi-language support
- Email notifications (Flagship nomination emails referenced in Flow C are out of scope)
- Document version linking (UI for linking as version on duplicate detection)
- Export / DOCX output from agent
- Batch upload progress tracking beyond basic processing state
