---
title: "URL Embeds"
description: "Safely embed dynamic video, social media, and interactive content using the embed-lite parser in docmd."
---

`docmd` ships natively with the high-performance **[embed-lite](external:https://github.com/docmd-io/docmd)** parser. It automatically transforms external URLs into secure, zero-latency UI components.

## Supported Media Platforms

The engine includes built-in formatters for popular networks:

* **Video:** YouTube (including Shorts), Vimeo, Dailymotion, TikTok
* **Social:** X (Twitter), Reddit, Instagram, Facebook, LinkedIn
* **Code & Prototyping:** GitHub Gists, CodePen, Figma, Google Maps
* **Audio:** Spotify, SoundCloud

## Syntax Reference

```markdown
::: embed "target_url"
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **URL** | `"String"` | Absolute URL of the external resource to embed (e.g. YouTube video, Figma canvas, or GitHub Gist). |

## Usage Examples

### Video Embed

Paste any YouTube, Vimeo, or TikTok URL to render a responsive media player:

```markdown
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
```

::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"

### Fallback Behaviour

If the parser encounters an unsupported URL, `docmd` gracefully falls back to a formatted hyperlink button rather than throwing a build error:

```markdown
::: embed "https://docs.docmd.io/content/containers/embed/"
```

::: embed "https://docs.docmd.io/content/containers/embed/"