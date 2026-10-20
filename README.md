# DuctLine: HVAC landing page

A single-page landing page built with plain HTML, CSS, and JavaScript. No build step, no packages.

## Files

- `index.html`: the full sales page
- `assets/`: logo (dark and light versions) and favicon
- `styles.css`: palette, typography, layout, responsive rules, reduced-motion support
- `script.js`: scroll reveal, before/after slider, demo forms, footer year

## Run it locally

Option A: Python (already installed on most computers)

```bash
cd ductline-landing
python3 -m http.server 5500
```

Then open http://localhost:5500

Option B: VS Code "Live Server" extension. Right-click `index.html` and choose "Open with Live Server".

## Before going live

- Replace the placeholder phone `+1 555 014 2290` in every `tel:` link and the comparison mockup
- Replace `[Insert verified flat-rate price]` and `[Insert verified monthly price]` in the pricing section
- Confirm the "Not included" list and the post-launch support period with your actual scope
- Forms are demos. Connect them to your CRM or a form service before launch (the `submit` handlers in `script.js`)
- The phone and comparison mockups are labelled illustrative. Add only verified reviews, licences, and metrics
