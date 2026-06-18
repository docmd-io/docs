---
title: "Site Banner"
description: "Site-wide announcement banner. Sits above the menubar, supports inline markdown, optional icon, CTA link, and per-session dismissal."
---

# Site Banner

> **New in 0.8.7.** A dismissable announcement banner built into the default UI. Sits above the menubar and below the page header. **Opt-in** — nothing is rendered unless you set `config.layout.banner`.

Use it for release announcements, maintenance windows, beta calls-to-action, or any other site-wide message.

## Enable in 30 seconds

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**v0.9 ships Friday** — read the announcement.",
      "type": "info",
      "dismissible": true,
      "link": { "text": "Read more", "url": "/blog/v0-9" }
    }
  }
}
```

The banner appears on every page. Users who close it once won't see it again until the next browser session.

## Configuration reference

| Field | Default | Description |
|---|---|---|
| `content` | `""` | Inline markdown text (`**bold**`, `` `code``). Mutually exclusive with `html`. |
| `html` | `""` | Raw HTML. Takes precedence over `content`. Use for richer layouts. |
| `type` | `"info"` | `"info"` \| `"success"` \| `"warning"` \| `"danger"` — affects background tint. |
| `dismissible` | `true` | Show a close (X) button. When `false`, the banner is permanent. |
| `link` | `null` | `{ text, url }` for an optional CTA link rendered after the content. |
| `icon` | `null` | Lucide icon name shown on the left. Common picks: `megaphone`, `info`, `bell`. |

### Examples

Plain announcement:

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "Site maintenance scheduled for Sunday 02:00–04:00 UTC.",
      "type": "warning"
    }
  }
}
```

Success / release:

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**v1.0 is out!** Read the release notes.",
      "type": "success",
      "icon": "party-popper",
      "link": { "text": "Release notes", "url": "/blog/v1-0" }
    }
  }
}
```

Rich HTML (escape carefully):

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "html": "<strong>New:</strong> AI-powered search is here. <a href=\"/blog/ai-search\">Learn more →</a>",
      "type": "info",
      "dismissible": false
    }
  }
}
```

## Behaviour

- **Position** — Sits at the very top of the page, above the menubar and sidebar logo bar. CSS-only positioning, no layout shift when dismissed.
- **Dismissal persistence** — The "dismissed" state is stored in `sessionStorage`. A fresh browser session re-shows the banner. If you need longer persistence, write to `localStorage` from your own client-side script — the banner's `data-docmd-banner` attribute makes it easy to find.
- **Per-page override** — Not yet supported in 0.8.7. To hide the banner on a single page, set `layout.banner: null` in a `config.templates[page]` entry (planned for a follow-up).

## Re-styling

The banner is built from BEM-style classes on the `.docmd-banner` root. Re-skin it via `customCss`:

```css
.docmd-banner--info {
  background: linear-gradient(90deg, #fef3c7 0%, #fff 100%);
  border-bottom: 2px solid #f59e0b;
}
.docmd-banner__link {
  font-weight: 600;
}
```


## Disabling

To remove the banner globally, set `layout.banner` back to `null` (or remove the key). To hide it on a single page, use the planned per-page override or render `null` in a `frontmatter` (post-0.8.7).

::: callout tip "Combine with a changelog template"
Pair the banner with a `template-changelog` package to give your users a permanent record of every release you announce.
:::