![aggier.ing splash graphic](./public/splash.svg)

# [aggier.ing](https://aggier.ing)

[What’s a webring?](https://en.wikipedia.org/wiki/Webring)

Howdy! Welcome to an unofficial webring for students and alumni from [Texas A&M University](https://www.tamu.edu/) with personal sites/portfolios.

Want to add your site to the list? Edit [`src/data/webringData.ts`](https://github.com/isaacchacko/aggiering/blob/main/src/data/webringData.ts) (pencil icon on GitHub) and add your information at the **bottom** of the list. You can also add a link to [aggier.ing](https://aggier.ing) on your site so others can find the webring—see **Adding a link to your website** below.

Hope you like it! If you have any questions or feedback, feel free to reach out.

## Adding your website / opening a PR

If this is your first time making a PR, no worries—follow these steps.

1. Open [`src/data/webringData.ts`](https://github.com/isaacchacko/aggiering/blob/main/src/data/webringData.ts) in the repository.
2. Press the pencil icon to edit. Without write access, GitHub will fork the repo so you can open a pull request.
3. Add **one** object at the **bottom** of the `webringData` array (keep the trailing comma style consistent with the file).
4. Submit the PR.

Example entry:

```ts
{
  name: "Your Name",
  website: "https://yoursite.com",
  year: "2028",
},
```

| Field | Notes |
|--------|--------|
| `name` | How you want to appear on the hub. |
| `website` | Full `https://` URL to your personal site; it should load for reviewers without a login. |
| `year` | Graduation year as a string (e.g. `"2026"`). |

## Adding a link to your website

Use a normal link to `https://aggier.ing`. To show the webring badge, point an `<img>` at one of the SVGs we host (or copy the file from [`public/`](./public/) in this repo and serve it yourself).

**Hosted badge URLs**

| Variant | URL |
|--------|-----|
| Maroon (default) | `https://aggier.ing/aggiering-maroon.svg` |
| Black | `https://aggier.ing/aggiering-black.svg` |
| White (for dark backgrounds) | `https://aggier.ing/aggiering-white.svg` |

Replace `VARIANT.svg` below with the file you want (`aggiering-maroon.svg`, `aggiering-black.svg`, or `aggiering-white.svg`).

The badge files are square (24×24 viewBox); use equal `width` and `height` so the ring stays round.

### HTML

Use this in static pages, Eleventy/Hugo layouts, or inside Vue/Svelte/Astro/Nuxt templates (swap in your router’s link component if you use one).

```html
<a href="https://aggier.ing" rel="noopener noreferrer">
  <img
    src="https://aggier.ing/VARIANT.svg"
    alt="aggier.ing — Texas A&M personal site webring"
    width="32"
    height="32"
  />
</a>
```

### Markdown

```markdown
[![aggier.ing webring](https://aggier.ing/VARIANT.svg)](https://aggier.ing)
```

### Typescript (.tsx)

Works for React, Next.js, Remix, etc. On Next.js you can use `Link` from `next/link` instead of `<a>`; with `next/image`, allow `aggier.ing` in `images.remotePatterns` or stick to `<img>` (simplest for static export / external badges).

```tsx
export function AggieringBadge() {
  return (
    <a href="https://aggier.ing" target="_blank" rel="noopener noreferrer">
      <img
        src="https://aggier.ing/VARIANT.svg"
        alt="aggier.ing — Texas A&M personal site webring"
        width={32}
        height={32}
      />
    </a>
  );
}
```

### Self-hosting the SVG

Download [`aggiering-maroon.svg`](./public/aggiering-maroon.svg) (or black/white) from this repo, place it in your site’s static assets, and set `src` to your own path instead of `https://aggier.ing/...`.
