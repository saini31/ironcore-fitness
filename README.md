# IronCore Fitness — Website Files

## Folder structure
```
ironcore-fitness/
├── index.html        Page markup (all sections)
├── css/
│   └── style.css     All custom styles (design tokens, animations, components)
└── js/
    ├── config.js     Central config — WhatsApp number, contact info, all image URLs
    └── main.js       All interactivity (nav, reveal animations, counters, testimonials,
                       gallery + lightbox, FAQ accordion, WhatsApp link wiring, form)
```

Tailwind CSS and Google Fonts are loaded from CDN links inside `index.html` — no build
step, no npm install. Just open `index.html` in a browser, or upload the whole folder
to any static host (Netlify, Vercel, GitHub Pages, cPanel, etc).

## Quick customization

**WhatsApp number** — open `js/config.js`, change:
```js
whatsappNumber: "919876543210",
```

**Phone / email / address** — same file, `phone`, `email`, `address` fields.
(Note: the visible contact block in `index.html`'s Contact section is written directly
in the markup too — update both places to keep them in sync.)

**Images** — every photo on the site is pulled from `js/config.js` → `images: {...}`.
Replace any URL with the gym's real photo (a hosted image link, or swap in your own
`images/` folder and point to local paths like `images/hero.jpg`).

**Colors / fonts** — open `css/style.css`, edit the `:root` CSS variables at the top
(`--bg`, `--accent`, `--lime`, etc.) and the Google Fonts `<link>` in `index.html`'s
`<head>` if you want different typefaces.

**Copy / text** — all headings, section text, trainer names, pricing, FAQ, etc. are
written directly in `index.html` — search for the section by its `id` (e.g.
`id="pricing"`) and edit in place.

## Notes
- The enquiry form is front-end only (demo) — it shows a success message but does not
  send data anywhere yet. Wire it to an email service, Google Sheet, or backend when
  going live.
- Images are hotlinked from Unsplash for this demo. Swap them for the client's real
  gym/trainer photos before final delivery — each `<img>` has a fallback icon if a
  link ever breaks, so nothing shows a broken-image icon.
