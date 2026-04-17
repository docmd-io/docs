---
title: "docmd - 零配置文档生成器"
description: "一条命令，将 Markdown 转化为生产级文档网站。静态 HTML 助力 SEO，SPA 提升速度，默认支持 AI。"
titleAppend: false
---

::: hero

# docmd

一条命令，将 Markdown 转化为生产级文档网站。静态 HTML 助力 SEO。SPA 提升速度。默认支持 AI。

::: button "快速开始" /getting-started/quick-start icon:rocket
::: button "GitHub" external:https://github.com/docmd-io/docmd color:#333 icon:github
:::

## 开始

几秒钟内即可运行一个生产级文档网站——无需样板代码，无需配置文件。

```bash
npx @docmd/core dev
```

就这么简单。在 `docs/` 文件夹中编写 Markdown，docmd 就会自动构建一个完整的文档网站，包含导航、搜索、SEO、站点地图等——一切开箱即用。

## 核心功能

所有必要功能均内置，无需为基础功能安装插件。

::: grids
::: grid
::: card "即时启动" icon:rocket
一条命令，从 Markdown 文件到生产级文档网站。无需配置文件。
:::
:::
::: grid
::: card "AI 就绪" icon:brain-circuit
自动生成 `llms.txt` 和 `llms-full.txt` 供 LLM 使用。你的文档默认支持 AI。
:::
:::
::: grid
::: card "内置搜索" icon:search
基于 MiniSearch 的客户端全文搜索。零配置，跨版本和语言均可使用。
:::
:::
::: grid
::: card "实时预览" icon:monitor
直接在文档页面中嵌入可实时编辑的代码沙盒。
:::
:::
::: grid
::: card "主题引擎" icon:palette
切换内置主题或创建专属主题。支持浅色、深色及系统偏好模式。
:::
:::
::: grid
::: card "原生国际化" icon:globe
一流的多语言支持，包含语言优先的 URL、每语言独立搜索及翻译 UI 字符串。
:::
:::
:::

## 扩展 Markdown

超越静态文本。docmd 在 Markdown 中直接提供丰富的容器语法——提示框、标签页、卡片、网格、主页横幅、折叠面板等。

::: button "探索容器" /content/containers/ icon:blocks

::: grids
::: grid
::: card "交互式沙盒"
使用 [实时预览](/content/live-preview) API，将可编辑的预览窗口自然地嵌入页面。
:::
:::
::: grid
::: card "内联协作"
在开发模式下选择文本，打开 [讨论区](/plugins/threads)，与文档团队在旁留下评论。
:::
:::
:::