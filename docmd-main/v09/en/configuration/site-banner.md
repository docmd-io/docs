---
title: "Site Banners"
description: "Configure multi-position announcement and promotional banners with Markdown, images, call-to-action buttons, and session persistence in docmd."
---

`docmd` provides a flexible, multi-position banner system supporting both full-width announcement bars and dedicated sidebar/TOC cards. Use banners to display release announcements, maintenance alerts, sponsor callouts, or promotional campaigns across your documentation.

## Quick Setup

You can configure a single top announcement banner using `layout.banner`, or configure multi-position banners using `layout.banners` in your `docmd.config.json`:

::: tabs
== tab "Single Top Banner" icon:bell
```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**v0.9.6 is live!** Explore new Focus Mode and banner features.",
      "type": "info",
      "dismissible": true,
      "link": { "text": "Release notes", "url": "/release-notes/0-9-6" }
    }
  }
}
```
== tab "Multi-Position Banners" icon:layout
```json "docmd.config.json"
{
  "layout": {
    "banners": {
      "top": {
        "content": "**v0.9.6 is live!** Check out the latest documentation improvements.",
        "type": "announcement",
        "dismissible": true,
        "link": { "text": "What's new", "url": "/release-notes/0-9-6" }
      },
      "toc-top": {
        "image": "/assets/sponsor-badge.png",
        "alt": "Sponsor Docmd",
        "content": "**Support open source docs**",
        "link": { "text": "Become a Sponsor", "url": "https://github.com/sponsors" }
      },
      "sidebar-bottom": {
        "icon": "book-open",
        "content": "Need enterprise support or custom themes?",
        "link": { "text": "Contact Us", "url": "https://docmd.io/contact" }
      }
    }
  }
}
```
:::

## Supported Banner Positions

`docmd` supports 7 distinct banner positions:

| Position | Display Type | Default Persistence | Description |
| :--- | :--- | :--- | :--- |
| `top` | Bar | Dismissible (`dismissible: true`) | Full-width announcement bar rendered at the very top of the viewport. |
| `header` | Bar | Dismissible (`dismissible: true`) | Announcement banner rendered directly under or inside the header bar. |
| `sidebar-top` | Card | Persistent (`dismissible: false`) | Card banner pinned to the top of the left navigation sidebar. |
| `sidebar-bottom` | Card | Persistent (`dismissible: false`) | Card banner pinned to the bottom of the left navigation sidebar. |
| `toc-top` | Card | Persistent (`dismissible: false`) | Card banner pinned to the top of the right-hand Table of Contents rail. |
| `toc-bottom` | Card | Persistent (`dismissible: false`) | Card banner pinned to the bottom of the right-hand Table of Contents rail. |
| `footer` | Bar | Persistent (`dismissible: false`) | Wide banner rendered directly above the page footer. |

## Configuration Reference

Each banner object inside `layout.banners[position]` (or `layout.banner` for the top bar) accepts the following options:

| Field | Default | Description |
| :--- | :--- | :--- |
| `content` | `""` | Inline Markdown string (`**bold**`, `` `code` ``). Mutually exclusive with `html`. |
| `html` | `""` | Raw HTML string. Takes precedence over `content` for custom rich layouts. |
| `image` | `null` | URL or relative path to a card graphic/logo (allowed on card positions like `sidebar-*` and `toc-*`; ignored on `top`). |
| `alt` | `""` | Accessible alternative text for the `image`. |
| `type` | `"info"` | Visual style variant: `"info"`, `"success"`, `"warning"`, `"danger"`, or `"announcement"`. |
| `dismissible` | *Varies by position* | Whether the banner renders a close (X) button. Defaults to `true` on `top`/`header`, and `false` (persistent) on card positions. Aliases: `dismissable`, `closable`. |
| `link` | `null` | Call-To-Action link. Accepts `{ text, url }` or a direct URL string. |
| `icon` | `null` | Name of any [Lucide Icon](external:https://lucide.dev/icons) rendered alongside the banner content (e.g. `sparkles`, `bell`, `heart`). |

## Card Banners (Sidebar & Table of Contents)

Card banners (`sidebar-top`, `sidebar-bottom`, `toc-top`, `toc-bottom`) are specifically styled as compact, non-intrusive widgets tailored for complementary content, sponsorship notices, or developer resources.

### Card Defaults & Persistence

Unlike the top announcement bar, **card banners default to persistent** (`dismissible: false`). They stay visible across pages and will not disappear when navigating.

If you want a card banner to be dismissible by the user, explicitly set `dismissible: true` (or `dismissable: true`):

```json "docmd.config.json"
{
  "layout": {
    "banners": {
      "toc-top": {
        "image": "/assets/survey-banner.png",
        "content": "Take our 2-minute developer survey!",
        "dismissible": true,
        "link": { "text": "Start Survey", "url": "https://example.com/survey" }
      }
    }
  }
}
```

When dismissed, the dismissed state is stored in `sessionStorage` for the duration of the reader's browser session.

## Version Inheritance & Overrides

When using multi-version documentation (`versions.all`), version configurations automatically inherit project-level banners. A version can override a specific position without losing banners configured at the project root:

```json "docmd.config.json"
{
  "layout": {
    "banners": {
      "top": { "content": "Welcome to our documentation!" },
      "toc-top": { "image": "/assets/sponsor.png", "link": "https://docmd.io" }
    }
  },
  "versions": {
    "current": "v2",
    "all": [
      {
        "id": "v1",
        "dir": "docs-v1",
        "label": "v1.0",
        "banners": {
          "top": {
            "content": "⚠️ You are viewing legacy v1 documentation. Switch to v2 for latest features.",
            "type": "warning",
            "dismissible": false
          }
        }
      },
      {
        "id": "v2",
        "dir": "docs-v2",
        "label": "v2.0"
      }
    ]
  }
}
```

In this example:
- `v1` overrides `top` with a legacy warning banner, but still inherits the `toc-top` sponsor card.
- `v2` uses the default `top` announcement and the `toc-top` sponsor card.

## Custom Styling

Banners are rendered with standard BEM classes:
- Banners: `.docmd-banner` (or `.summer-banner` in the Summer template)
- Position variants: `.docmd-banner--pos-top`, `.docmd-banner--pos-sidebar-top`, `.docmd-banner--pos-toc-top`, etc.
- Card styling: `.docmd-banner--card`
- Type variants: `.docmd-banner--info`, `.docmd-banner--warning`, `.docmd-banner--success`, `.docmd-banner--danger`

You can customize their appearance in your custom CSS:

```css "custom.css"
/* Subtle elevation and custom border for TOC card banner */
.docmd-banner--pos-toc-top {
  border-radius: 8px;
  border: 1px solid var(--docmd-color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

/* Custom banner accent */
.docmd-banner--announcement {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: #ffffff;
}
```

## Disabling Banners

To disable banners:
- Set `layout.banner` to `null` or omit it.
- In `layout.banners`, remove the specific position key, or set that position to `null`.
- On a specific page, set `banner: null` in page frontmatter to suppress banners on that page.