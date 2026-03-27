<!--
  GitHub shows this when someone opens a new PR. Contributors can delete sections they don’t need.
  Full guide: public/CONTRIBUTING.md
-->

## Add site to webring

**Site URL:** <!-- e.g. https://example.com -->

**Graduation year:** <!-- e.g. 2028 -->

### Checklist

- [ ] I am a Texas A&M student or alumnus with a personal site I control.
- [ ] The URL above is publicly reachable (reviewers can open it without logging in).
- [ ] I appended **one** object to the **bottom** of the `webringData` array in `src/data/webringData.ts`.
- [ ] My entry follows the type: `name`, `website` (with `https://`), and `year` only.

### Example entry (for reference—your PR should include the real edit in `webringData.ts`)

```ts
{
  name: "Your Name",
  website: "https://yoursite.com",
  year: "2028",
},
```

### Notes (optional)

<!-- redirects, www vs apex, anything else maintainers should know -->
