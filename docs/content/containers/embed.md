---
title: URL Embeds
description: How to safely embed dynamic components, videos, and social media directly into your documents.
---

`docmd` ships natively with the highly-optimized `embed-lite` parser ecosystem. This allows you to aggressively map raw external URLs strictly onto the page, transforming them beautifully into completely secure, zero-latency UI components instantly!

## Supported Platforms
The integrated engine natively exposes structured formatters targeting the following networks identically:
*   **Video Ecosystem:** YouTube (including native 9:16 Shorts support), Vimeo, Dailymotion, TikTok
*   **Social Connections:** X (Twitter), Reddit, Instagram, Facebook, LinkedIn
*   **Code & Prototyping:** GitHub Gists, CodePen, Figma, Google Maps
*   **Music Services:** Spotify, SoundCloud

## Usage Syntax
You simply establish the standard `::: embed` container syntax aggressively appending *any* destination URL immediately after it dynamically:

```md
::: embed https://www.youtube.com/watch?v=0CSyIBHQy9g
```

### Standard Result Example
The rendering engine strictly parses that URL in the background, checking the validation matrix, and structurally injects native HTML nodes directly onto your page output gracefully:

::: embed https://www.youtube.com/watch?v=0CSyIBHQy9g

## Fallback Safety
Don't worry about generating broken screens. If the internal parser scans an unverified or strictly unavailable domain configuration mapping, `docmd` gracefully falls back to generating a simple, solid `<a>` hyperlink button mapping explicitly out to the target:

```md
::: embed https://unsupported-example.com/status/123
```
*(Proceeds to generate exactly what you would see below)*

::: embed https://unsupported-example.com/status/123