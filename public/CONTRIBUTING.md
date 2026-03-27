# Contributing to aggier.ing

Add your personal site by sending a pull request that appends one object to `src/data/webringData.ts`.

## Entry format

Add to the **bottom** of the array:

```ts
{
  name: "Your Name",
  website: "https://yoursite.com",
  year: "2028",
},
```

`year` is your **graduation year**. `website` must be a stable public URL (prefer `https://`).

## Before you open a PR

Confirm your site loads for reviewers. (Maintainers: set **`GITHUB_REPO`** in `src/lib/site.ts` so the homepage GitHub links are correct.)

See `.github/pull_request_template.md` for the checklist.
