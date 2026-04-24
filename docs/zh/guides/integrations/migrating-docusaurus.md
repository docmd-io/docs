---
title: "从 Docusaurus 迁移"
description: "将您的文档从 Docusaurus 迁移到 docmd 的分步指南，重点关注性能提升和语法映射。"
---

## 问题

Docusaurus 是一个强大的框架，但对于大型站点，它对沉重的 React 运行时、复杂的 MDX 抽象以及缓慢的构建时间的依赖可能会成为负担。团队往往在寻找一种更轻量、零配置的替代方案，在不牺牲丰富 UI 组件和专业开发者体验的前提下，优先考虑速度和简洁性。

## 为什么重要

由于涉及到转换专有语法和重组大量内容的预期工作量，人们往往会避免在文档引擎之间进行迁移。`docmd` 通过保持与标准 Markdown 的高度一致，同时为常见的 Docusaurus 功能提供高质量、零开销的替代方案，最大限度地减少了这种摩擦。

## 方法

`docmd` 为标准 Markdown 内容提供了一个高性能的替代方案。虽然 `docmd` 不支持在 Markdown (MDX) 中执行任意 React 组件，但其原生的 [容器语法](../../content/containers) 为 Docusaurus 的警告框 (admonitions)、选项卡 (tabs) 和布局网格提供了顶级的替代方案，且构建速度显著加快，且没有客户端框架开销。

## 实施

### 1. 警告框 (标注) 映射

Docusaurus 使用 `:::type` 风格的警告框。`docmd` 使用类似但语义更灵活的 [标注 (Callout)](../../content/containers/callouts) 语法。大多数迁移可以通过简单的全局查找和替换来完成：

*   `:::note` → `::: callout info`
*   `:::tip` → `::: callout tip`
*   `:::warning` → `::: callout warning`
*   `:::danger` → `::: callout danger`

### 2. 选项卡与布局

Docusaurus 依赖 React 组件来实现选项卡等交互元素。`docmd` 提供了原生的 [选项卡容器 (Tabs Container)](../../content/containers/tabs)，无需导入，即可立即构建为轻量级、无障碍的 HTML。

```markdown
::: tabs
::: tab "npm"
npm install docmd
:::
::: tab "yarn"
yarn add docmd
:::
:::
```

### 3. 导航转换

将您的 `sidebars.js` 逻辑转换为 `docmd` 的 [导航配置](../../configuration/navigation)。`docmd` 使用简洁的基于 JSON 的结构，可以进行全局定义，也可以使用 `navigation.json` 文件在子目录中进行去中心化管理。

### 4. 从 MDX 转向插件

如果您的文档依赖自定义 React 组件来处理复杂逻辑，我们建议将该逻辑转入 [自定义插件](../../customisation/extending-custom-plugins) 或标准的 HTML/JavaScript。这可确保您的内容保持可读性和可移植性，同时保持渲染引擎的高速运行。

## 权衡

主要的权衡是放弃了 MDX。`docmd` 强制执行清晰的关注点分离：**内容属于 Markdown，逻辑属于插件。** 这一架构决策使得构建时间通常比 Docusaurus 快 10-50 倍，且 JavaScript 有效载荷显著减小，从而为您的用户带来更快的“可交互时间”。
