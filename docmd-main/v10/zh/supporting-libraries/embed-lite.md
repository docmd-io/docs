---
title: "embed-lite"
description: "适用于 markdown 与浏览器的零依赖静态 URL 转 HTML 嵌入解析器。"
---

`embed-lite` 是一款零外部依赖的静态嵌入解析工具，可将外部媒体链接（YouTube、Twitter/X、Vimeo、Spotify、GitHub、CodePen 等）快速转换为响应式、无障碍的 HTML iframe 播放组件。

::: callout tip "隐私与性能兼得" icon:shield
`embed-lite` 采用原生懒加载（`loading="lazy"`）与安全沙箱参数，在保障访客隐私的同时确保瞬间渲染。
:::

## 安装

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

## 快速上手

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

## 支持平台

* **视频平台**：YouTube, Vimeo, Loom, TikTok, Twitch
* **社交平台**：Twitter / X, Reddit, LinkedIn, Facebook, Instagram
* **音频平台**：Spotify, SoundCloud, Apple Music
* **代码与设计**：GitHub Gist, CodePen, CodeSandbox, Figma

## 许可证

[MIT](https://github.com/mgks/embed-lite/blob/main/LICENSE) © [docmd.io](https://docmd.io)
