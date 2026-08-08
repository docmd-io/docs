---
title: "Site Banner"
description: "Configure dismissible site-wide announcement banners with inline Markdown, call-to-action buttons, and session persistence in docmd."
---

`docmd` provides a built-in, dismissible site banner positioned at the top of the layout. Use it to display release announcements, maintenance windows, or promotional calls-to-action across all documentation pages.

## Quick Setup

Enable the announcement banner in your `docmd.config.json` manifest:

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**v0.9.0 is out!** — read the full release announcement.",
      "type": "info",
      "dismissible": true,
      "link": { "text": "Read announcement", "url": "/blog/v0-9" }
    }
  }
}
```

The banner renders at the top of every page. When dismissed by a reader, the closed state is stored in `sessionStorage` for the duration of their browser session.

## Configuration Reference

| Field | Default | Description |
| :--- | :--- | :--- |
| `content` | `""` | Inline Markdown string (`**bold**`, `` `code` ``). Mutually exclusive with `html`. |
| `html` | `""` | Raw HTML string. Takes precedence over `content` for custom rich layouts. |
| `type` | `"info"` | Visual background tint (`"info"`, `"success"`, `"warning"`, `"danger"`). |
| `dismissible` | `true` | When `true`, renders a close (X) button. When `false`, the banner remains persistent. |
| `link` | `null` | Optional `{ text, url }` object rendering a Call-To-Action (CTA) link. |
| `icon` | `null` | Name of any [Lucide Icon](external:https://lucide.dev/icons) rendered on the left (e.g. `megaphone`, `bell`). |

### Configuration Examples

::: tabs
== tab "Standard Announcement" icon:bell
```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "Scheduled system maintenance on Sunday 02:00–04:00 UTC.",
      "type": "warning",
      "icon": "alert-triangle"
    }
  }
}
```
== tab "Release Release CTA" icon:sparkles
```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**v0.9.0 is live!** Explore new search features and UI components.",
      "type": "success",
      "icon": "party-popper",
      "link": { "text": "Release notes", "url": "/blog/v0-9-0" }
    }
  }
}
```
== tab "Custom HTML" icon:code
```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "html": "<strong>New:</strong> Rust compiler engine is now available in preview. <a href=\"/blog/rust-engine\">Learn more →</a>",
      "type": "info",
      "dismissible": false
    }
  }
}
```
:::

## Layout Behaviour

- **Positioning**: Sits at the top of the viewport above the menubar and sidebar header. Built with zero-layout-shift CSS rules so dismissing the banner does not shift page content jarringly.
- **Session Persistence**: Dismissal state is saved in `sessionStorage`. Opening a new browser session restores the banner.
- **Per-Page Customisation**: To hide the banner on specific landing pages, set `layout.banner` to `null` in page frontmatter.

## Custom Banner Styling

The banner uses BEM class naming prefixed with `.docmd-banner`. Customise colors and typography via custom CSS rules:

```css
.docmd-banner--info {
  background: linear-gradient(90deg, #fef3c7 0%, #ffffff 100%);
  border-bottom: 2px solid #f59e0b;
}
.docmd-banner__link {
  font-weight: 600;
}
```

## Disabling the Site Banner

To disable the site banner globally, set `layout.banner` to `null` or remove the `banner` key from `docmd.config.json`.

::: callout tip "Changelog Integration" icon:history
Pair site banners with changelog pages or template packages to maintain a permanent record of all announced product updates.
:::