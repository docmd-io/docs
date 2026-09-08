---
title: "docmd 文档：为人类和机器构建的文档"
description: "开源文档编译器。一份 Markdown 源文件，一条命令 — 同时生成网站、搜索、AI 上下文、Agent 协议和知识格式。"
titleAppend: false
---

::: hero

# docmd

为人类和机器构建的文档。一条命令将 Markdown 编译为网站、搜索索引、AI 上下文和知识格式 — 零配置。

::: button "快速开始" ./getting-started/quick-start.md icon:rocket ::: /button ::: button "GitHub" external:https://github.com/docmd-io/docmd color:#24292e icon:github ::: /button

:::

## 概览

docmd 是一个开源文档编译器。它将你的 Markdown 文件编译为完整的文档体系 — 网站、搜索、AI 上下文等 — 一次构建，全部生成。

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core dev
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

运行这一条命令。引擎会自动构建网站、生成导航并启用即时搜索。

## 核心功能

所有必要功能均已内置，无需安装额外插件。

::: grids
    ::: grid
        ::: card "即时启动" icon:rocket
        无需任何模板代码，立即开始。引擎自动检测文件，几秒内完成导航结构搭建。
        :::
    :::
    ::: grid
        ::: card "AI 助手" icon:sparkles
        内置 RAG 驱动的 AI 对话助手，直接在文档站点提供即时、感知上下文的智能问答。
        :::
    :::
    ::: grid
        ::: card "AI 上下文" icon:brain-circuit
        自动生成 `llms.txt` 和 `llms-full.txt`，让 AI 助手轻松阅读你的文档。
        :::
    :::
    ::: grid
        ::: card "原生 MCP 服务" icon:terminal
        内置 Model Context Protocol 服务及原生工具。AI 智能体可通过本地 stdio 连接查询与校验文档 —— 无需联网，无需远程服务。
        :::
    :::
    ::: grid
        ::: card "OKF 知识包" icon:database
        自动生成 Open Knowledge Format bundle —— 面向 AI 智能体的类型化概念图谱。阅读[更多](external:https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing)。
        :::
    :::
    ::: grid
        ::: card "本地优先搜索" icon:search
        基于 MiniSearch 的客户端全文搜索，开箱即用，支持多版本和多语言。
        :::
    :::
    ::: grid
        ::: card "实时预览" icon:monitor
        使用 `docmd.compile` API 在浏览器中即时渲染 Markdown。支持实时编辑器、CMS 预览和应用内文档。
        :::
    :::
    ::: grid
        ::: card "原生多语言" icon:globe
        一流的国际化支持，包含按语言路由、独立搜索索引和翻译后的 UI 字符串。
        :::
    :::
:::

::: callout info "丰富的内容容器" icon:info
超越标准 Markdown。在文本中直接使用步骤、标签页、卡片、网格、提示框等结构化视觉组件。
::: button "探索容器" ./content/containers/index.md icon:blocks
:::
