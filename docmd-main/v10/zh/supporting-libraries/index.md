---
title: "支撑底层库"
description: "由 docmd.io 打造的零依赖独立微型库，涵盖 Markdown 解析、模板渲染与代码高亮。"
---

`docmd` 构建在一套模块化、零外部依赖的独立底层微型库之上。每个库均坚持严苛的轻量化哲学：极致性能、零外部依赖、完备的 TypeScript 类型定义，且同构运行于 Node.js、浏览器以及 Edge 运行时。

尽管这些底层库为 `docmd` 核心编译引擎提供支撑，但它们完全独立，可自由应用于任何 JavaScript 或 TypeScript 项目。

::: callout tip "独立开源生态" icon:sparkles
每个支撑底层库均在 npm 上独立发布，并在 GitHub 的 `docmd-io` 组织下拥有独立的开源仓库。
:::

## 核心库概览

::: cards cols:2
::: card title:"lite-matter" icon:file-text href:"/supporting-libraries/lite-matter"
适用于 Markdown 及文本引擎的超轻量 Frontmatter 提取器与 YAML 解析工具。
:::
::: card title:"lite-mdx" icon:code href:"/supporting-libraries/lite-mdx"
零依赖 MDX 与 JSX 编译器，支持组件映射、属性透传及沙箱表达式计算。
:::
::: card title:"lite-template" icon:layout href:"/supporting-libraries/lite-template"
亚毫秒级异步模板引擎，原生兼容基础 EJS 标签语法。
:::
::: card title:"lite-hl" icon:highlighter href:"/supporting-libraries/lite-hl"
基于启发式规则的代码分词与语法高亮器，完全零配置。
:::
::: card title:"embed-lite" icon:video href:"/supporting-libraries/embed-lite"
静态 URL 转 HTML 嵌入解析器，一键生成响应式 YouTube、Twitter/X 与 Spotify 播放器。
:::
:::

## 设计准则

所有底层支持库均恪守以下设计原则：

* **零外部依赖**：纯净 TypeScript 实现与标准 Web API，告别臃肿的依赖树。
* **同构执行**：在 Node.js、现代浏览器、Cloudflare Workers 及 Deno 中行为严格一致。
* **确定性输出**：极速解析，结构可预测，具备严格的安全隔离边界。
* **类型安全**：开箱即提供完备严谨的 TypeScript 类型定义。
