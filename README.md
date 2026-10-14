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
