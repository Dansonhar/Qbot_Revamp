# QPOS — dark editorial motion site

A near-monochrome, dark editorial single-page-app for QPOS (qbot.now), built to the
Dark Editorial Motion Site guideline. Content is drawn from the existing QPOS product
set: the Q1 hardware range, the module list, QSentry, and the trades it is sold into.

## Stack

React 18 · Vite 6 · Tailwind CSS v4 (`@tailwindcss/vite`, tokens in `@theme`, no
`tailwind.config.js`) · Framer Motion 11 · lucide-react. No UI library.

```
npm install
npm run dev        # http://localhost:5173
npm run build
npm run preview    # http://localhost:4173
```

Deploying to a subpath (e.g. GitHub Pages project site):

```
BASE_PATH=/Qbot_Revamp/ npm run build
```

`vite.config.js` reads `BASE_PATH`; the router and every `public/` asset URL go through
it, so nothing else needs touching.

## Layout

```
src/
  index.css                @theme tokens + the handful of global classes
  App.jsx                  shell: nav, <main>, footer, MotionConfig, per-page <title>
  motion/env.js            reduced-motion + mobile flags, EASE
  components/Primitives    Eyebrow / Display / Lede / Reveal / SectionShell / Button
  components/Media.jsx     Film / Still / Frame, RATIOS, placeholder
  components/home/         one file per section, in narrative order
  sites/                   one file per route, all lazy()
public/
  video/                   .mp4 — faststart, silent, cropped to their final ratio
  images/poster/           one poster per clip, cut from the encoded output at t=0.3
  images/hardware/         product cutouts on transparency
  images/cover/            stills
scripts/
  encode.sh                regenerates every clip + poster from source footage
  cutouts.mjs              regenerates the hardware cutouts
```

Every route and the footer are `lazy()` + `<Suspense>`. The nav is not — it is on screen
before any route resolves.

## Theming

`accent-*` is white by default — a monochrome brand. A whole repaint is four CSS lines
on a scoped class (see `.theme-signal` in `index.css`), applied on the **app shell** in
`App.jsx`, not on a page: nav and footer are siblings of `<main>`, so a page-scoped theme
leaves a white button in the bar above a coloured page.

This is only safe because `accent-*` never wears running text. Audit that before
repainting — a saturated accent on a paragraph reads as a highlighter pen.

## Media

Source footage lives in `/Users/crave/Downloads` and is **not** in this repo.
`scripts/encode.sh` is the record of what was cut from what, and why each non-obvious
number is that number. Re-run it to regenerate `public/video` and `public/images/poster`.

Rules the media layer holds to, and the reasons:

- `preload="none"` and **no `autoplay` attribute** — `autoplay` overrides `preload` and
  pulls every clip on the page at once. Playback starts and stops from an
  IntersectionObserver with `rootMargin: '100% 0px'`.
- No `v.load()` after raising `preload` — it resets the element and aborts the request
  that raising preload just started.
- One `<video>` src in the DOM at a time. The industry selector uses
  `AnimatePresence mode="wait"` for exactly this reason.
- Clips are cropped to their final ratio at encode time, not with `object-cover`. The
  contact page has its own 4:5 cuts (`ct-*.mp4`) because that slot is portrait.
- A poster on every clip, cut from the encoded output so still and film are identical.
- No `<link rel=preload as=video>` in `index.html` — it fires on every route.

Measured first load (cold cache, 1440×900): home 2.4MB with 2 of 22 clips fetched;
hardware 0.6MB; modules 0.5MB; contact 0.6MB. JS is ~100KB per route.

## Verified

Checked in real Chrome at 360/414/768/1024/1440/1920, and on touch:

- selector: hover previews and click navigates on mouse; **first tap previews, second tap
  navigates** on touch; focus previews and Enter navigates immediately on keyboard
- reduced motion: static branch, smooth scrolling off
- no `overflow-*` on any scroll ancestor (it computes `overflow-y: auto` and would kill
  `position: sticky` in anything nested there later)
- no horizontal page scroll at any width

Note that headless Chrome decodes video but never composites it into a screenshot — a
black media box in a headless capture is not a bug. Assert on `readyState` /
`transferSize` instead, or paint the posters in.
