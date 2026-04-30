---
title: URL 嵌入 (Embeds)
description: 如何安全地将动态组件、视频和社交媒体直接嵌入到你的文档中。
---

`docmd` 原生搭载了高度优化的 **[embed-lite](external:https://github.com/mgks/embed-lite)** 解析器生态系统。这允许你将原始外部 URL 严格映射到页面上，并瞬间将它们精美地转换为完全安全、零延迟的 UI 组件！

## 支持的平台
集成引擎原生公开了针对以下网络的结构化格式化程序：
*   **视频生态系统：** YouTube (包括原生 9:16 Shorts 支持), Vimeo, Dailymotion, TikTok
*   **社交连接：** X (Twitter), Reddit, Instagram, Facebook, LinkedIn
*   **代码与原型：** GitHub Gists, CodePen, Figma, Google Maps
*   **音乐服务：** Spotify, SoundCloud

## 使用语法
你只需使用 `::: embed` 容器，后跟任何目标 URL。以下三种封闭格式是等效的：

```md
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
```

### 标准结果示例
渲染引擎会在后台严格解析该 URL，检查验证矩阵，并将原生 HTML 节点直接结构化地注入到你的页面输出中：

::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"

## 降级安全
不用担心生成损坏的屏幕。如果内部解析器扫描到未经验证或严格不可用的域名配置映射，`docmd` 会优雅地降级为生成一个简单的、实心的 `<a>` 超链接按钮，明确指向目标：

```md
::: embed "https://docs.docmd.io/zh/content/containers/embed/"
```
*(接下来会生成你下面看到的内容)*

::: embed "https://docs.docmd.io/zh/content/containers/embed/"
