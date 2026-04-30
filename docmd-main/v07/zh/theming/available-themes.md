---
title: "可用主题 (Available Themes)"
description: "探索 docmd 内置的主题，包括 Sky、Ruby 和 Retro。了解如何通过单行配置切换主题。"
---

`docmd` 提供了一套专业设计的、支持浅色/深色响应的主题。你可以通过更改 `docmd.config.js` 中的一个键值来切换整个网站的美学风格。

## 如何切换主题

```javascript
// docmd.config.js
export default {
  theme: {
    name: 'sky',
    appearance: 'system', // 选项: 'light', 'dark', 'system'
  }
}
```

## 内置主题展示

| 主题 | 最适合 | 氛围 |
| :--- | :--- | :--- |
| `default` | 简约文档 | 干净、轻量、中性 |
| `sky` | 产品文档 | 现代、高级、标准 |
| `ruby` | 品牌标识 | 精致、衬线页眉、充满活力 |
| `retro` | 开发工具 | 80 年代终端、等宽字体、霓虹点缀 |

::: grids
::: grid
::: button "Default" javascript:switchDocTheme('default')
:::
::: grid
::: button "Sky" javascript:switchDocTheme('sky')
:::
::: grid
::: button "Ruby" javascript:switchDocTheme('ruby')
:::
::: grid
::: button "Retro" javascript:switchDocTheme('retro')
:::
:::

### 1. `default`
正是此文档网站所使用的主题。如果你打算添加大量的自定义 CSS 并且不希望任何内置的设计层产生干扰，请使用此主题。

### 2. `sky`
现代文档的金标准。它具有清晰的排版、微妙的过渡以及与现代 SaaS 平台匹配的高对比度浅色/深色模式。

### 3. `ruby`
一个高雅的主题，页眉使用衬线体排版，并配以深沉、如宝石般色调的调色板。非常适合需要权威感和高级感的文档。

### 4. `retro`
一个受复古计算启发、充满怀旧感的主题。特性包括黑色背景上的磷光绿文本（在深色模式下）、扫描线效果，以及默认使用的 Fira Code 等等宽字体。

## 主题架构

1.  **CSS 分层**: 主题是累加的。选择 `sky` 实际上会加载基础的 `default` 样式，然后在此基础上覆盖 `sky` 的美学样式。
2.  **原生深色模式**: 每个主题都包含一流的深色模式实现。
3.  **无需刷新**: 当用户通过 UI 切换主题时，SPA 引擎会立即更新 `--docmd-primary` 变量，而无需重新加载页面。

::: callout tip
当向 AI 开发工具描述你的文档布局时，提到你的主题（例如，“我正在使用 `retro` 主题”）有助于模型建议符合该特定主题变量架构的自定义 CSS 覆盖方案。
:::