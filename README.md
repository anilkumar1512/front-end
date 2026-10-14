# Eventora — Front-End Development Project

**Event Ticket Booking System** built with HTML, CSS and JavaScript for the
Sysslan IT Solutions Front-End Development Internship.

A responsive, interactive website for browsing movies, concerts and live sports
events and booking tickets through a validated front-end form.

---

## Project Structure

The work is organized into one folder per level, as required by the task list.
Each level is a standalone, runnable snapshot that builds on the previous one.

```
internship/
├── level-1-page-structure/      Level 1 – Page Structure & Layout
│   └── index.html
├── level-2-styling/             Level 2 – Styling & Visual Design
│   ├── index.html
│   └── style.css
├── level-3-event-display/       Level 3 – Event Display & UI Components
│   ├── index.html
│   └── style.css
├── level-4-interaction/         Level 4 – Front-End Interaction
│   ├── index.html
│   ├── style.css
│   └── script.js
└── level-5-responsive-final/    Level 5 – Responsive Design & Final Touches  ← FINAL
    ├── index.html
    ├── style.css
    └── script.js
```

> Open `level-5-responsive-final/index.html` in a browser to view the final website.

---

## Level Breakdown

### Level 1 — Page Structure & Layout
- Semantic HTML5 document with a clear title and main heading.
- Header, Event Listing, Event Details and Footer sections.
- Navigation bar with Home, Events, Booking and Contact links.
- Short introduction explaining the purpose of the website.

### Level 2 — Styling & Visual Design
- Custom font (Poppins), color system and backgrounds via CSS variables.
- Consistent spacing using margin, padding and alignment.
- Event cards showing event name, date and location.
- Styled navigation bar and footer.

### Level 3 — Event Display & UI Components
- Six reusable event cards (movies, concerts, sports, comedy, conference).
- Cover images for each event with category badges.
- Category-themed cards: each category has its own accent colour applied to the top border, badge, price and Book Ticket button.
- A **Book Ticket** button on every card (UI only at this stage).
- Event details sections listing venue, time and ticket price.

### Level 4 — Front-End Interaction
- **Book Ticket** button changes appearance when clicked.
- Show/hide event details toggle button.
- Booking form with name, email, event selection and ticket count.
- Front-end validation for all required fields.

### Level 5 — Responsive Design & Final Touches
- Responsive layout for mobile, tablet and desktop (CSS media queries).
- Collapsible hamburger navigation on small screens.
- Consistent fonts, colors and spacing throughout.
- Footer with contact and support information.
- Live order summary, back-to-top button and smooth navigation.
- Final review for smooth navigation and UI functionality.

---

## Event Data

All six events use demo data created for this project (dates, venues and prices
are illustrative). This is the exact data rendered in the cards and the booking
form at every interactive level.

| # | Event | Category | Date | Venue | Time | Duration / Format | Price |
|---|-------|----------|------|-------|------|-------------------|-------|
| 1 | Interstellar: IMAX Re-Release | Movie | 12 Nov 2026 | PVR Orion Mall, Bengaluru | 7:30 PM | 2h 49m | ₹450 |
| 2 | Arijit Singh Live in Concert | Concert | 18 Nov 2026 | JLN Stadium, Delhi | 6:00 PM | 3h 00m | ₹2,500 |
| 3 | India vs Australia - T20 | Sports | 25 Nov 2026 | Chinnaswamy Stadium, Bengaluru | 7:00 PM | T20 International | ₹1,800 |
| 4 | Stand-Up Night: Open Mic | Comedy | 30 Nov 2026 | The Laugh Club, Mumbai | 8:30 PM | 1h 30m | ₹600 |
| 5 | FutureStack Developer Summit | Conference | 05 Dec 2026 | HICC, Hyderabad | 9:00 AM | 2 days | ₹3,200 |
| 6 | ISL Finals: City Derby | Sports | 09 Dec 2026 | Salt Lake Stadium, Kolkata | 7:30 PM | League Final | ₹990 |

> Each card's **Book Ticket** button carries a `data-event` value that matches the
> booking form `<option value>` exactly (note event 3 uses a hyphen: `India vs Australia - T20`).

---

## Image Sources

Every event's cover image is served from Unsplash (`images.unsplash.com`) and used
under the Unsplash License.

| # | Event | Image URL | Alt text |
|---|-------|-----------|----------|
| 1 | Interstellar: IMAX Re-Release | `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80` | Cinema hall screening a movie |
| 2 | Arijit Singh Live in Concert | `https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80` | Live music concert with stage lights |
| 3 | India vs Australia - T20 | `https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80` | Cricket stadium under floodlights |
| 4 | Stand-Up Night: Open Mic | `https://images.unsplash.com/photo-1585699324551-f6c309eedeca?auto=format&fit=crop&w=800&q=80` | Audience laughing at a stand-up comedy show |
| 5 | FutureStack Developer Summit | `https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80` | Speaker presenting at a tech conference |
| 6 | ISL Finals: City Derby | `https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80` | Football on the pitch during a match |

Other external assets:

| Asset | Source | License / Notes |
|-------|--------|-----------------|
| Poppins typeface | `https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap` | SIL Open Font License |

No other external images, fonts or libraries are used.

---

## Category Colour Palette

Each category drives a theme via CSS custom properties (`--accent`,
`--accent-dark`, `--accent-soft`) applied with `.event-card:has(.badge-*)`.

| Category | Badge class | Accent | Dark | Soft |
|----------|-------------|--------|------|------|
| Movie | `.badge-movie` | `#ff4d5e` | `#d9273b` | `rgba(255, 77, 94, 0.15)` |
| Concert | `.badge-concert` | `#a855f7` | `#7c3aed` | `rgba(168, 85, 247, 0.17)` |
| Sports | `.badge-sports` | `#22c55e` | `#15803d` | `rgba(34, 197, 94, 0.14)` |
| Comedy | `.badge-comedy` | `#f5b301` | `#d99400` | `rgba(245, 179, 1, 0.14)` |
| Conference | `.badge-conference` | `#22d3ee` | `#0891b2` | `rgba(34, 211, 238, 0.14)` |

---

## Contact Details

These appear in the footer of every level:

| Field | Value |
|-------|-------|
| Email | info@sysslan.com |
| Website | https://www.sysslan.com |
| LinkedIn | https://www.linkedin.com/company/sysslan-it-solutions |
| Address | Arni Road, Wadgaon, Yavatmal, India |
| Phone | +91 82175 60439 |

---

## How to Run

1. Download or clone the project.
2. Open any level's `index.html` in a modern web browser.
3. For the complete experience, open:
   `level-5-responsive-final/index.html`

No build tools or installations are required — it is a pure front-end project.

---

## Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties, flexbox, grid, responsiveness, transitions
- **JavaScript (ES5-compatible)** — DOM manipulation, event handling, form validation

---

## Originality & Attribution

- All HTML, CSS and JavaScript in this project was written from scratch for this
  internship task. No third-party templates, UI kits, CSS/JS frameworks or copied
  code snippets were used.
- The base styles repeat across the level folders on purpose: each level is a
  self-contained snapshot that builds on the previous one (as required by the
  "separate files for each level" instruction), so shared rules are re-declared
  rather than imported. This is the author's own code, not duplication of
  external work.
- Third-party assets used:
  - **Poppins** typeface served by Google Fonts, licensed under the
    SIL Open Font License.
  - Photographs served from **Unsplash** (`images.unsplash.com`) and used under
    the Unsplash License (free to use; credited here as good practice).

---

## Author

Developed as part of the Sysslan IT Solutions Front-End Development Internship.

`#SysslanITSolutions #Sysslan #SysslanProjects`
