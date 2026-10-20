# DuctLine: landing page for HVAC companies

A single-page site built with plain HTML, CSS and JavaScript. No build step, no packages.

## Files

- `index.html`: the full page
- `thanks.html`: thank-you page shown if a form is sent without JavaScript
- `styles.css`: design, layout, responsive rules
- `script.js`: tabs, season preview, scroll effects, form sending
- `assets/`: logo (dark and light versions) and favicon
- `netlify.toml`: Netlify settings (publish folder and headers)

## Run it locally

```bash
python3 -m http.server 5500
```

Then open http://localhost:5500. Forms only send once the site is on Netlify.

## Hosting

The site is hosted on Netlify and deploys automatically on every push to `main`.

## Forms

Both forms (`website-check` and `audit-request`) are collected by Netlify Forms.
Read them in Netlify under the project's **Forms** page, and add your email under
Forms, then Settings & usage, then Form notifications to get an alert for each one.
