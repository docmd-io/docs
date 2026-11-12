---
title: "embed-lite"
description: "Analizador estático de URL a HTML sin dependencias para incrustaciones adaptables."
---

`embed-lite` es un analizador de incrustaciones estáticas que transforma enlaces a contenidos externos (YouTube, Twitter/X, Vimeo, Spotify, GitHub, CodePen y más) en iframes HTML adaptables y accesibles.

::: callout tip "Privacidad y Rendimiento" icon:shield
`embed-lite` utiliza carga diferida (`loading="lazy"`) y parámetros aislados para proteger la privacidad de los visitantes y garantizar tiempos de carga instantáneos.
:::

## Instalación

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

## Uso

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

## Plataformas Compatibles

* **Vídeo**: YouTube, Vimeo, Loom, TikTok, Twitch
* **Redes Sociales**: Twitter / X, Reddit, LinkedIn, Facebook, Instagram
* **Audio**: Spotify, SoundCloud, Apple Music
* **Código y Documentos**: GitHub Gist, CodePen, CodeSandbox, Figma

## Licencia

[MIT](https://github.com/mgks/embed-lite/blob/main/LICENSE) © [docmd.io](https://docmd.io)
