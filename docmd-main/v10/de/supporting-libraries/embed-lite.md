---
title: "embed-lite"
description: "Statischer URL-zu-HTML-Parser für responsive Einbettungen in Markdown und Browsern."
---

`embed-lite` ist ein abhängigkeitsfreier statischer Embed-Parser, der externe Medien-URLs (YouTube, Twitter/X, Vimeo, Spotify, GitHub, CodePen und mehr) in responsive, barrierefreie HTML-Iframes transformiert.

::: callout tip "Datenschutz & Performance" icon:shield
`embed-lite` nutzt Lazy-Loading (`loading="lazy"`) und isolierte Iframe-Parameter, um die Privatsphäre der Besucher zu schützen und schnelle Ladezeiten zu garantieren.
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

## Verwendung

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

## Unterstützte Anbieter

* **Video**: YouTube, Vimeo, Loom, TikTok, Twitch
* **Social**: Twitter / X, Reddit, LinkedIn, Facebook, Instagram
* **Audio**: Spotify, SoundCloud, Apple Music
* **Code & Docs**: GitHub Gist, CodePen, CodeSandbox, Figma

## Lizenz

[MIT](https://github.com/mgks/embed-lite/blob/main/LICENSE) © [docmd.io](https://docmd.io)
