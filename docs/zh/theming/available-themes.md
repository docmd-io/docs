---
title: "可用主题"
description: "探索 docmd 内置主题，包括 Sky、Ruby 和 Retro。只需一行配置即可切换主题。"
---

`docmd` 提供了一套专业设计、支持明暗模式的响应式主题。只需修改 `docmd.config.js` 中的一个配置项，即可切换整个网站的视觉风格。


## 如何切换主题

```javascript
// docmd.config.js
export default {
  theme: {
    name: 'sky',
    appearance: 'system', // 可选值：'light'、'dark'、'system'
  }
}
```

## 内置主题库

| 主题 | 适用场景 | 风格 |
| :--- | :--- | :--- |
| `default` | 简洁文档 | 干净、轻量、中性 |
| `sky` | 产品文档 | 现代、高端、标准范式 |
| `ruby` | 品牌形象 | 优雅、衢线标题、鲜明配色 |
| `retro` | 开发工具 | 80 年代终端风格、等宽字体、霸光色点缀 |

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

### 1. `sky`（默认）
现代文档的黄金标准。具有清晰的排版、微妙的过渡动画，以及反映现代 SaaS 平台的高对比明暗模式。

### 2. `ruby`
高雅展示主题，标题采用衢线字体、羞石色调色板。适合需要展现权威感和高端感的文档。

### 3. `retro`
致敬复古计算的活力主题。暗色模式下采用黑底绿色荧光文字、扫描线效果，默认使用 Fira Code 等宽字体。

### 4. `default`
完全的“空白画布”主题。如果你计划添加大量自定义 CSS，不希望内置设计层干扰品牌形象时，选择此项。

## 主题架构

1. **CSS 叠加机制**：主题采用叠加模式。选择 `sky` 实际上是在加载基础 `default` 样式后再叠加 `sky` 视觉。
2. **原生暗色模式**：每个主题都内置一流的暗色模式实现。
3. **无刷新切换**：用户通过界面切换主题时，SPA 引擎将即刻更新 `--docmd-primary` 变量，无需刷新页面。

::: callout tip
向 AI 开发工具描述文档布局时，语言品主题名称（如「我在使用 `retro` 主题」）有助于模型提出与该主题 CSS 变量模式相匹配的自定义样式建议。
:::