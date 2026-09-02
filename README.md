# Yash Kant Tiwary — portfolio edit suite

Yash's self-designed editorial portfolio, preserved as a self-contained HTML experience and served at `/` by a small Next.js 15 shell. The interface borrows the visual language of an edit suite: timecode rail, source monitor, marked clips, call sheet, career ruler, contact sheet, playback transport, command palette, and keyboard controls.

## Architecture

- `public/portfolio.html` is the canonical interface and contains the supplied structure, styling, and interactions.
- `next.config.ts` rewrites `/` to that file without changing the public URL.
- Next.js supplies production headers, the custom 404/error states, `robots.txt`, `sitemap.xml`, and Vercel compatibility.
- Archivo and JetBrains Mono are self-hosted in `public/fonts/`; no Google Fonts request is required.
- The experience uses URL hashes—not local or session storage—to preserve marked clips.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Quality gates

```bash
npm run validate       # required content, assets, links, and media budgets
npm run lint           # ESLint and TypeScript
npm run build          # production build
npm run test:functional
npm run test:visual
npm test               # complete gate
```

The browser suite exercises Chromium, Firefox, and WebKit. It covers all 11 concept placements, responsive widths from 320px to 1440px, keyboard navigation, focus restoration, modal inertness, URL-persisted clip marks, media failure states, accessibility, performance, metadata, resume delivery, and the custom 404.

## Concept media

The current images and reel are licensed concept material used to show composition and interaction until approved project footage and personal photographs are supplied. They are not represented as Yash's original work. Sources and licences are documented in [MEDIA-CREDITS.md](./MEDIA-CREDITS.md) and linked from the live contact section.

To replace a concept visual:

1. Add the approved export to `public/media/`.
2. Update the corresponding `data-src`, `data-poster`, accessible description, and CSS `--media` path in `public/portfolio.html`.
3. Update the viewer's concept wording when the media is genuinely Yash's work.
4. Run `npm test` before publishing.

## Vercel deployment

Import the GitHub repository into Vercel and deploy `main` with Node.js 22.x. No application secrets, login system, or two-factor-authentication flow exists in the portfolio. Vercel Web Analytics and Speed Insights are loaded by their documented static-HTML scripts and degrade harmlessly outside Vercel.

Before final public launch, replace concept media, confirm publication rights for every project, and verify final wording and contact details on real mobile devices.
