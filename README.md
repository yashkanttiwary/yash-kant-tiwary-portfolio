# Yash Kant Tiwary portfolio

A mobile-first, single-page portfolio built with Next.js 15, React 19, TypeScript, and Tailwind CSS 4. It is structured for GitHub source control and Vercel deployment. Bricolage Grotesque and Newsreader are bundled locally from OFL-1.1 Fontsource packages, so builds do not depend on Google Fonts being reachable.

## Run locally

```bash
npm ci
npm run dev
```

## Quality gates

```bash
npm run validate       # content, required files, and media budgets
npm run lint           # ESLint and TypeScript
npm run build          # production build
npm run test:functional
npm run test:visual
npm test               # complete gate
```

The browser suite covers Chromium, Firefox, and WebKit. CI installs all three engines, runs the production build, checks interactions and accessibility, and compares responsive visual baselines at 320, 360, 768, 884, and 1440 pixels.

## Concept visuals

The repository currently includes one licensed Mixkit video, ten licensed Pexels photographs, and an original generated social card. Every borrowed asset is visibly marked as a **Concept visual** and must not be represented as Yash's original campaign or personal photography.

Sources and licenses are recorded in [MEDIA-CREDITS.md](./MEDIA-CREDITS.md) and repeated in the site's expandable footer disclosure.

To replace a concept asset:

1. Export the approved original into `public/media/`.
2. Update the matching media record in `content/site.ts`.
3. Set `demo: false` and remove its stock `credit`.
4. Run `npm test` before publishing.

Keep the hero loop under 6 MB, each project loop under 4 MB, the social card under 300 KB, and all of `public/` under 50 MB. The content validator enforces these limits.

## Content model

All public copy, verified metrics, links, media paths, formats, captions, and credits live in `content/site.ts`. The `Media` contract supports images and videos, posters, captions, failure fallbacks, accessible descriptions, and full-piece previews.

The currently configured profile is [LinkedIn](https://in.linkedin.com/in/yashkanttiwary). Add Behance only after its exact public URL is verified.

## Metadata and monitoring

The app includes canonical metadata, Open Graph and X previews, a favicon, sitemap, robots policy, security headers, Vercel Web Analytics, and Vercel Speed Insights. Analytics only mounts on Vercel deployments and the application does not use localStorage or sessionStorage.

`metadataBase` uses this priority:

1. `NEXT_PUBLIC_SITE_URL`, when explicitly set.
2. Vercel's `VERCEL_PROJECT_PRODUCTION_URL` system variable.
3. `http://localhost:3000` during local development.

## Deploy to Vercel

Push this standalone repository to GitHub, import it into Vercel, use Node.js 22.x, and deploy from `main`. No application secrets are required. You may set `NEXT_PUBLIC_SITE_URL` to the final custom domain; otherwise Vercel's production URL is used automatically.

Before a public launch, replace all concept media with approved originals, confirm publication rights, verify final statistics with Yash, and test contact/download behavior on a real iPhone and Android device.
