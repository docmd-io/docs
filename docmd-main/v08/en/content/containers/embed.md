---
title: URL Embeds
description: Safely embed dynamic video, social, and interactive content directly into your documents.
---

docmd ships natively with the highly-optimised **[embed-lite](external:https://github.com/mgks/embed-lite)** parser. It transforms external URLs into secure, zero-latency UI components automatically.

## Supported Platforms

The engine natively supports structured formatters for the following networks:

*   **Video:** YouTube (including Shorts), Vimeo, Dailymotion, TikTok
*   **Social:** X (Twitter), Reddit, Instagram, Facebook, LinkedIn
*   **Code & Prototyping:** GitHub Gists, CodePen, Figma, Google Maps
*   **Music:** Spotify, SoundCloud

## Syntax Reference

```markdown
::: embed "target_url"
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **URL** | `"String"` | The absolute URL of the external resource to embed (e.g., a YouTube video, Figma file, or GitHub Gist). |

## Examples

### Video Embed

Paste any YouTube, Vimeo, or TikTok URL to render a native, responsive player.

```markdown
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
```

::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"

### Fallback Behaviour

If the parser encounters an unsupported or invalid URL, docmd gracefully falls back to a hyperlink button rather than breaking the page.

```markdown
::: embed "https://docs.docmd.io/content/containers/embed/"
```

::: embed "https://docs.docmd.io/content/containers/embed/"