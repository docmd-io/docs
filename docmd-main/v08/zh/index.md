---
title: "docmd 文档：一键将 Markdown 部署为生产文档"
description: "几秒钟内从 Markdown 构建生产就绪的文档站点。零配置，默认高速，SEO 友好，天然支持 AI。"
titleAppend: false
---

::: hero

# docmd

一条命令，将 Markdown 变成生产文档。静态 HTML 保障 SEO，SPA 提升速度，天然支持 AI。

::: button "快速开始" ./getting-started/quick-start.md icon:rocket
::: button "GitHub" external:https://github.com/docmd-io/docmd color:#24292e icon:github
:::

## 概览

docmd 是一个零配置的文档生成器，可直接从 Markdown 文件生成高性能静态网站。

```bash
npx @docmd/core dev
```

运行这一条命令，引擎会自动构建网站、生成导航并启用即时搜索。

## 核心功能

所有必要功能均已内置，无需安装复杂插件。

::: grids
    ::: grid
        ::: card "即时启动" icon:rocket
        无需任何配置，立即开始。引擎自动检测文件，几秒内完成导航结构搭建。
        :::
    :::
    ::: grid
        ::: card "AI 就绪" icon:brain-circuit
        自动生成 `llms.txt` 和 `llms-full.txt`，让 AI 模型轻松理解你的文档。
        :::
    :::
    ::: grid
        ::: card "本地优先搜索" icon:search
        基于 MiniSearch 的客户端全文搜索，开箱即用，支持多版本和多语言。
        :::
    :::
    ::: grid
        ::: card "实时预览" icon:monitor
        在页面中直接嵌入可交互、可编辑的代码沙盒，支持实时演示。
        :::
    :::
    ::: grid
        ::: card "灵活主题" icon:palette
        内置多套主题，支持自定义样式，完全兼容深色模式和系统主题偏好。
        :::
    :::
    ::: grid
        ::: card "原生多语言" icon:globe
        一流的国际化支持，包含按语言路由、独立搜索索引和翻译 UI 字符串。
        :::
    :::
:::

::: callout info "丰富的内容容器" icon:info
    超越标准 Markdown。在文本中直接使用步骤、标签页、卡片、网格、提示框等结构化视觉组件。
    ::: button "探索容器" ./content/containers/index.md icon:blocks
:::