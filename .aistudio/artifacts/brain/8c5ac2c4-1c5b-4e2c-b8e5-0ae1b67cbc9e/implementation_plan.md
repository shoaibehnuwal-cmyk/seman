# Vogue Talent & Casting — Fashion Model Portfolio & Booking PWA

A high-fashion model agency portfolio and casting appointment booking Progressive Web App (PWA). It enables creative directors, fashion brands, and production studios to discover professional models, inspect comp cards and zed card industry measurements, browse high-resolution editorial shoot galleries, filter by location and category, and book photoshoot/runway casting appointments with direct WhatsApp dispatch and offline PWA support.

## User Review & Critical Decisions

> [!IMPORTANT]
> The application is architected strictly for professional fashion, commercial runway, catalog, and creative editorial model casting and campaign appointments. Please review the high-level design and feature specifications below.

- **Confirmed Decision 1**: Built as a mobile-first, installable Progressive Web App (PWA) with service worker caching, home screen install prompt, and offline roster browsing.
- **Confirmed Decision 2**: Interactive booking appointment system with calendar date-picker, time slots, project type selection (Runway, Commercial Campaign, Editorial, Lookbook), and WhatsApp casting brief dispatch.
- **Confirmed Decision 3**: Comprehensive talent gallery with interactive filtering (by City/Market, Category, Height/Specs, and Immediate Availability) and a high-resolution lightbox portfolio viewer.

---

## 1. Overview & Core Concept

- **What It Does**: A curated digital talent agency showroom where fashion brands, agencies, photographers, and casting directors can search top models, review verified editorial portfolios, inspect comp card measurements, and submit structured appointment booking inquiries with immediate WhatsApp confirmation.
- **Target Audience / Persona**: Creative directors, casting coordinators, fashion stylists, and agency bookers seeking professional talent for runway shows, commercial campaigns, and editorial shoots.
- **Key Value**: Replaces cumbersome PDF comp cards and fragmented email chains with an instant, interactive PWA that operates seamlessly on mobile and desktop, even with intermittent connectivity on set.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Discover & Filter**: The user arrives at an editorial split hero with featured runway spotlights. A sleek segmented control bar allows filtering talent by city (Paris, Milan, New York, London), discipline (Runway, Editorial, Commercial), or immediate availability.
2. **Inspect Comp Cards & Portfolio**: Clicking a model opens their comp card profile featuring high-definition lookbook images, verified agency statistics (height, bust/waist/hips, shoe size, eye/hair color), and previous brand campaigns (e.g., Balmain, Prada, Vogue).
3. **High-Resolution Lightbox**: Clicking any portfolio photo opens an unobstructed modal viewer with client credits, photography details, and keyboard navigation.
4. **Schedule Casting / Photoshoot**: The booker clicks "Book Appointment", selects the date, preferred call time, shoot location/studio, and campaign type, and reviews estimated day rates.
5. **WhatsApp & In-App Confirmation**: Submitting dispatches a formatted booking inquiry to WhatsApp API with model ID, date, call time, and project notes, while saving the confirmed request to local appointments.
6. **PWA Install Experience**: An unobtrusive top bar install button enables one-tap installation on Android/Chromium and provides an iOS Safari "Add to Home Screen" visual guide.

### Visual Identity & Theme
- **Aesthetic Direction**: High-fashion editorial minimalism inspired by vintage Vogue and contemporary European fashion houses. Jet black (`#050505`) and warm off-white (`#F8F8F6`) canvas with subtle hairline dividers.
- **Color Palette & Mood**:
  - Canvas: 60% stark editorial deep charcoal and pristine off-white surfaces (`#09090B` and `#F8F8F6`).
  - Structural Surfaces: 30% crisp media framing, muted typography (`#71717A`), and hairline borders (`border-zinc-200 dark:border-zinc-800`).
  - High-Intent Accent: 10% bold warm gold / champagne accent (`#C5A880` / `#D4AF37`) for active dates, booking CTAs, and selected filters.
- **Typography & Hierarchy**:
  - Display Font: Expressive serif (`Cormorant Garamond` / `Playfair Display`) for hero headlines, model names, and agency titling.
  - Body & Specs: Refined geometric sans (`Plus Jakarta Sans` / `Satoshi`) for clean readability.
  - Comp Card Numerals: Tabular monospace numerals (`tabular-nums`) for exact measurement specs and time slots.
- **Component Styling & Layout**:
  - Strict Top Bar Contract: 3-zone layout (Brand wordmark, curated navigation, and "Casting Inquiry" + PWA install action).
  - Anti-Slop Discipline: No arbitrary badge sandwiches or pill capsules; measurements and dates render as quiet inline metadata with `·` separators.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Direct WhatsApp API Formatting vs. Email Dispatch**
  - *Chosen Approach*: Generate pre-formatted, URL-encoded WhatsApp messages containing structured appointment briefs (Date, Call Time, Model Name, Campaign Scope, Rate, Location) opening directly in WhatsApp Web or the WhatsApp mobile app.
  - *Why*: In the fashion and talent industry, agency bookers and models coordinate logistics in real time on mobile messaging platforms; WhatsApp provides zero-latency confirmation.
  - *Alternatives Considered*: Traditional email mailto links (frequently ignored or delayed on shoot days).

- **Decision 2: Comprehensive Comp Card Specs in Roster**
  - *Chosen Approach*: Standardize every model profile with official agency comp card metrics (Height in cm/ft, Bust-Waist-Hips, Shoe Size, Eye Color, Hair Color) accessible via quick-flip card or modal.
  - *Why*: Casting directors require immediate verification of sample-size fit before booking casting calls.
  - *Alternatives Considered*: Photo-only cards without metrics (causes booking friction and subsequent cancellations).

- **Decision 3: Service Worker & Offline-First Strategy**
  - *Chosen Approach*: Configure `vite-plugin-pwa` with Workbox runtime caching for app assets, model profiles, and comp card images.
  - *Why*: Fashion shows and photo studios in warehouses, basements, or remote locations often suffer from spotty mobile reception. Offline caching ensures bookers can review portfolios and drafted call sheets anywhere.

---

## 4. Technical Architecture & Data Strategy

### System & Component Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Navigation Bar                              │
│  [VOGUE CASTING] · [Roster] · [Comp Cards] · [Scheduler] · [Install]   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
       ┌───────────────────────────┴────────────────────────────┐
       ▼                                                        ▼
┌───────────────────────────────┐        ┌───────────────────────────────┐
│     Split Hero Showcase       │        │  Interactive Filter Controls  │
│  Editorial Featured Talents   │        │ Market · Category · Available │
└──────────────┬────────────────┘        └──────────────┬────────────────┘
               │                                        │
               └───────────────────┬────────────────────┘
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Talent Gallery Grid                             │
│   ┌─────────────────────┐ ┌─────────────────────┐ ┌──────────────────┐ │
│   │ Model Card (Photos) │ │ Comp Card Specs Flip│ │ Quick Book CTA   │ │
│   └──────────┬──────────┘ └──────────┬──────────┘ └─────────┬────────┘ │
└──────────────┼───────────────────────┼──────────────────────┼──────────┘
               │                       │                      │
               ▼                       ▼                      ▼
┌─────────────────────────────┐ ┌─────────────────┐ ┌───────────────────┐
│ High-Resolution Lightbox    │ │ Measurement Doc │ │ Appointment Modal │
│ Zoom, Credits, Fullscreen   │ │ Official Agency │ │ Date-Picker &     │
│                             │ │ Comp Card View  │ │ Time Slot Matrix  │
└─────────────────────────────┘ └─────────────────┘ └─────────┬─────────┘
                                                              │
                                                              ▼
                                               ┌─────────────────────────┐
                                               │   WhatsApp API Engine   │
                                               │ Structured Call-Sheet   │
                                               │  Booking Message Link   │
                                               └─────────────────────────┘
```

### Data Model & State
- **`ModelProfile`**:
  - `id`: Unique identifier
  - `name`: Full name
  - `market`: Primary market (`Paris`, `Milan`, `New York`, `London`)
  - `category`: `Runway`, `Editorial`, `Commercial`, `High Fashion`
  - `height`: e.g. `179 cm / 5'10.5"`
  - `measurements`: `{ bust: "82cm / 32\"", waist: "60cm / 23.5\"", hips: "89cm / 35\"", shoe: "39 EU / 8.5 US" }`
  - `hair`: `Dark Brown`, `eyes`: `Hazel`
  - `dayRate`: e.g. `$2,200 / day` or `€1,800 / day`
  - `available`: Boolean status
  - `coverImage`: High-resolution editorial portrait
  - `gallery`: Array of lookbook images with client credits (e.g. Chanel, YSL, Elle)
  - `bio`: Curated agency representation summary
- **`AppointmentBooking`**:
  - `modelId`, `modelName`, `date`, `timeSlot`, `campaignType`, `clientName`, `clientContact`, `locationNotes`, `status`
- **`PWA State`**:
  - Install prompt deferred event, online/offline connectivity status, standalone mode detection.

### PWA & Offline Specification
- Manifest with `id: '/'`, `display: 'standalone'`, theme colors, and icons.
- `vite-plugin-pwa` configuration with auto-update service worker and asset precaching.
- `usePWAInstall` hook and accessible `PWAInstallButton` in the header with iOS Safari fallback modal.
- `useOnlineStatus` hook with a non-intrusive offline pill indicator when disconnected.
