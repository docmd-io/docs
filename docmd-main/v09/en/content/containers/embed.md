---
title: "URL Embeds"
description: "Safely embed dynamic video, social media, and interactive content using the embed-lite parser in docmd."
---

`docmd` ships natively with the high-performance **[embed-lite](external:https://github.com/docmd-io/docmd)** parser. It automatically transforms external URLs into secure, zero-latency UI components.

## Container Syntax

```markdown
::: embed [url:"https://domain.com/resource"] # URL embed container opener
```

## Features & Supported Attributes

| Parameter / Property | Type | Description |
| :--- | :--- | :--- |
| **Resource URL** | `"String"` \| `url:"..."` | Absolute URL of the media/resource to embed (1st positional arg or `url:"..."`). |
| **Supported Networks** | Built-in | Auto-detects YouTube, Vimeo, TikTok, X, Figma, Gists, CodePen, Spotify, etc. |
| **Fallback Button** | Automatic | Unrecognised URLs render safely as formatted hyperlink buttons without throwing errors. |

::: callout info "v0.9.1+ Container Syntax Standardisation" icon:sparkles
Starting in **v0.9.1**, `docmd` introduces explicit opening and closing container tags (e.g., `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explicit key-value properties (`title:"..."`, `url:"..."`), and trailing `# comments`. This modernised syntax is recommended for all new documentation. Full backward compatibility for legacy sub-block markers (`== tab`, `1.`) and positional argument fallbacks is strictly preserved.
:::


## Usage Examples

### Video Embed

Paste any YouTube, Vimeo, or TikTok URL to render a responsive media player:

```markdown
::: embed url:"https://www.youtube.com/watch?v=0CSyIBHQy9g"
```

::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"

### Fallback Behaviour

If the parser encounters an unsupported URL, `docmd` gracefully falls back to a formatted hyperlink button rather than throwing a build error:

```markdown
::: embed url:"https://docs.docmd.io/content/containers/embed/"
```

::: embed "https://docs.docmd.io/content/containers/embed/"