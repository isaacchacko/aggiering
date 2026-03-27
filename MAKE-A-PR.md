# Contributing to aggier.ing

Add your personal site by opening a **pull request** that appends one entry to [`src/data/webringData.ts`](../src/data/webringData.ts) in this repository.

## Who can join

This webring is for **Texas A&M students and alumni** with a **personal site or portfolio** you control (not only social profiles). Maintainers may decline PRs that don’t fit that intent.

## What to change

Edit **`src/data/webringData.ts`** only for a membership PR (unless you’re fixing a typo or bug elsewhere).

Add **one object** at the **bottom** of the `webringData` array, before the closing `];`:

```ts
{
  name: "Your Name",
  website: "https://yoursite.com",
  year: "2028",
},
```

| Field | Rules |
|--------|--------|
| `name` | How you want to appear on the hub (real name or the name you use on your site). |
| `website` | Full URL to your **personal** site, including `https://`. Must load for reviewers without a login. |
| `year` | Your **graduation year** as a string (e.g. `"2026"`). |

**Trailing comma** after your object is correct TypeScript style; keep it.

The hub **groups members by `year`** (newest years first). Within a year, order follows the **array order** in the file, so new entries go at the **end** of the list.

## Before you open a PR

1. Open your site in a browser and confirm it loads.
2. Run the app locally if you can (`npm install` → `npm run dev`) and check that your link and favicon look right on the homepage.
3. Use a **clear PR title**, e.g. `Add [yoursite.com] to webring` or `Add Jane Doe (2028)`.

## PR description template (copy into GitHub)

Paste this into your pull request description and fill it in:

```markdown
## Site

- **URL:** https://…
- **Graduation year:** 20__

## Checklist

- [ ] I am a Texas A&M student or alumnus with a personal site I control.
- [ ] My site is publicly reachable at the URL above (no paywall / login required to see the main page).
- [ ] I added **one** entry at the **bottom** of `webringData` in `src/data/webringData.ts`.
- [ ] My entry uses only `name`, `website`, and `year` as in the contributing guide.

## Notes (optional)

Anything maintainers should know (e.g. redirect from www to apex, site is new, etc.).
```

If this repository has [`.github/pull_request_template.md`](../.github/pull_request_template.md), GitHub may **pre-fill** a similar checklist for you—edit that instead of pasting from here.

## About the `.github` folder

The repo may include **`.github/pull_request_template.md`**. That file is only for GitHub: it **suggests text when someone opens a PR**. It is **not** required for the site to build.

- **Keep `.github`** if you want the checklist to appear automatically on new PRs.
- **Delete `.github`** if you prefer a minimal repo; contributors can still follow this document and paste the template above.

## Maintainer note

Set **`GITHUB_REPO`** (and related URLs) in `src/lib/site.ts` so the homepage “Open a PR” link points at the correct repository.
