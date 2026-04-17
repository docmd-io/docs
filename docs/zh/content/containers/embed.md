---
title: URL Embeds
description: How to safely embed dynamic components, videos, and social media directly into your documents.
---

`docmd` 原生集成了高度优化的 `embed-lite` 解析器生态系统。它能将原始外部 URL 直接映射到页面上，即刻将其转化为完全安全的零延迟 UI 组件！

## 支持的平台
集成引擎原生支持以下平台：
*   **视频生态**：YouTube（包括原生 9:16 短视频支持）、Vimeo、Dailymotion、TikTok
*   **社交平台**：X（Twitter）、Reddit、Instagram、Facebook、LinkedIn
*   **代码与原型**：GitHub Gists、CodePen、Figma、Google Maps
*   **音乐服务**：Spotify、SoundCloud

## 使用语法
只需使用 `::: embed` 容器后跟目标 URL 即可：

```md
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
```

### 标准效果示例
渲染引擎在后台解析 URL，并将原生 HTML 节点直接注入到页面输出中：

::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"

## 回退安全
无需担心出现损坏的显示。如果内部解析器遇到不受支持的域，`docmd` 会优雅地回退为生成一个简单的 `<a>` 超链接按钮：

```md
::: embed "https://unsupported-example.com/status/123"
```
*（将生成如下所示的效果）*

::: embed "https://unsupported-example.com/status/123"
