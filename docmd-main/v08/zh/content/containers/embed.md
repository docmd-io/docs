---
title: "URL 嵌入"
description: "在文档中安全地嵌入动态视频、社交内容和交互式内容。"
---

docmd 原生集成了经过高度优化的 **[embed-lite](external:https://github.com/mgks/embed-lite)** 解析器。它会自动将外部 URL 转换为安全、零延迟的 UI 组件。

## 支持的平台

引擎原生支持以下网络平台的结构化格式化器：

*   **视频：** YouTube（包括 Shorts）、Vimeo、Dailymotion、TikTok
*   **社交：** X (Twitter)、Reddit、Instagram、Facebook、LinkedIn
*   **代码与原型设计：** GitHub Gists、CodePen、Figma、Google Maps
*   **音乐：** Spotify、SoundCloud

## 语法参考

```markdown
::: embed "target_url"
```

| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| **URL** | `"String"` | 要嵌入的外部资源的绝对 URL（例如 YouTube 视频、Figma 文件或 GitHub Gist）。 |

## 示例

### 视频嵌入

粘贴任何 YouTube、Vimeo 或 TikTok URL 即可呈现原生、响应式的播放器。

```markdown
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
```

::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"

### 回退行为

如果解析器遇到不受支持或无效的 URL，docmd 会优雅地回退为超链接按钮，而不会破坏页面。

```markdown
::: embed "https://docs.docmd.io/content/containers/embed/"
```

::: embed "https://docs.docmd.io/content/containers/embed/"