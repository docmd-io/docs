---
title: "embed-lite"
description: "Zero-dependency static URL-to-HTML embed parser for markdown and browsers."
---

`embed-lite` is a zero-dependency static embed parser that transforms external media URLs (YouTube, Twitter/X, Vimeo, Spotify, GitHub, CodePen, and more) into responsive, accessible HTML iframe embeds.

::: callout tip "Privacy & Performance" icon:shield
`embed-lite` uses lazy loading (`loading="lazy"`) and sandboxed iframe parameters to safeguard visitor privacy and maintain sub-second page performance.
:::

## Installation

::: tabs
::: tab label:pnpm
```bash
pnpm add embed-lite
```
:::
::: tab label:npm
```bash
npm install embed-lite
```
:::
::: tab label:bun
```bash
bun add embed-lite
```
:::
:::

## Usage

```typescript
import { parseEmbed, isEmbeddable } from 'embed-lite';

const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

if (isEmbeddable(url)) {
  const html = parseEmbed(url, {
    responsive: true,
    aspectRatio: '16:9'
  });
  console.log(html);
}
```

## Supported Providers

`embed-lite` natively detects and parses links from:

* **Video**: YouTube, Vimeo, Loom, TikTok, Twitch
* **Social**: Twitter / X, Reddit, LinkedIn, Facebook, Instagram
* **Audio**: Spotify, SoundCloud, Apple Music
* **Code & Docs**: GitHub Gist, CodePen, CodeSandbox, Figma

## API Reference

### `parseEmbed(url, options?)`

Converts a supported URL into responsive iframe markup.

### `isEmbeddable(url)`

Returns `true` if the URL matches a supported provider pattern.

## License

[MIT](https://github.com/mgks/embed-lite/blob/main/LICENSE) © [docmd.io](https://docmd.io)
