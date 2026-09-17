---
title: "URL Embeds"
description: "Safely embed dynamic video, social media, and interactive content using the embed-lite parser in docmd."
---

`docmd` ships natively with the high-performance **[embed-lite](external:https://github.com/mgks/embed-lite)** parser. It automatically transforms external URLs into secure, zero-latency UI components.

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