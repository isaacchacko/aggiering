# aggier.ing

**aggier.ing** is a minimal [webring](https://en.wikipedia.org/wiki/Webring) for Texas A&M students and alumni with personal sites. The hub is a single static page: a short blurb and a list of links (with favicons). Member data lives in `webringData.ts` only. Optional prev/next navigation still works via `location.hash` on the hub (see **Redirect behavior** below).

## Tech

- [Next.js 14](https://nextjs.org/) (App Router) with **`output: 'export'`** for a fully static site
- **`next.config.mjs`** is what Next.js 14 actually loads. **`next.config.ts`** mirrors the same options for TypeScript reference — keep them in sync if you change export settings.
- TypeScript, Tailwind CSS
- Member list: `src/data/webringData.ts`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit `src/data/webringData.ts` or components under `src/` as needed.

## Production build

```bash
npm run build
```

Static files are emitted to the `out/` directory.

## Deploy to Vercel

Connect the repo to [Vercel](https://vercel.com/) and deploy with defaults. The project uses static export; no Node server is required.

Update **`src/lib/site.ts`**: set `SITE_ORIGIN` for your deployed URL, and `GITHUB_REPO` / `GITHUB_PULLS` so the on-page links point at your repository.

## Deploy to GitHub Pages

GitHub Pages serves your site from a branch or from GitHub Actions. With Next static export, you upload the contents of **`out/`**.

1. In `next.config.mjs`, set **`basePath`** to your repository name if the site is not at the root of the domain. Example for `https://username.github.io/aggiering/`:

   ```js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: "export",
     basePath: "/aggiering",
     assetPrefix: "/aggiering/",
     images: { unoptimized: true },
   };
   export default nextConfig;
   ```

2. Build: `npm run build`.

3. Publish the **`out/`** folder (e.g. push to `gh-pages` or use [actions/upload-pages-artifact](https://github.com/actions/upload-pages-artifact)).

4. In **`src/lib/site.ts`**, set `SITE_ORIGIN` to your real public URL (including path if you use `basePath`).

5. Regenerate or hand-edit widget URLs on member sites so `href` values match the deployed base (same origin as the hub).

## How to join

1. **Fork** this repository and add your entry to the **bottom** of `src/data/webringData.ts` (`name`, `website`, `year` for graduation).
2. Open a **pull request** and complete the checklist in `.github/pull_request_template.md`.

More detail: [`public/CONTRIBUTING.md`](./public/CONTRIBUTING.md).

## Optional webring widget

If you want prev/next links on your own site, point them at the hub with your `website` URL in the hash (encode with `encodeURIComponent`). Example hub: `https://aggier.ing`. Icons: `/icon.maroon.svg` on the hub.

## Repository layout

```
aggiering/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── data/
│   │   └── webringData.ts
│   ├── lib/
│   │   ├── site.ts
│   │   ├── webringNavigation.ts
│   │   └── webringRedirectScript.ts
│   └── components/
│       └── RedirectHandler.tsx
├── public/
│   ├── icon.maroon.svg
│   ├── icon.white.svg
│   ├── icon.black.svg
│   ├── og.svg
│   └── CONTRIBUTING.md
├── .github/
│   └── pull_request_template.md
├── next.config.mjs
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## Redirect behavior

On load, the hub reads `window.location.hash`. If it contains a member URL and `?nav=prev` or `?nav=next`, the page **replaces** the location with the previous or next `website` in `webringData` (wrapping at the ends). If there is no navigable hash, the **directory** page is shown. An early **beforeInteractive** script plus a small React helper avoid flashing the directory before a redirect.

## License

Add a license file if you open-source the repo publicly.
