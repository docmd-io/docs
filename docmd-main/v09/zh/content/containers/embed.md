---
title: "URL 嵌入"
description: "在文档中安全地嵌入动态视频、社交内容和交互式内容。"
---

docmd 原生集成了经过高度优化的 **[embed-lite](external:https://github.com/mgks/embed-lite)** 解析器。它会自动将外部 URL 转换为安全、零延迟的 UI 组件。

## 容器语法 (Container Syntax)

```markdown
::: embed [url:"https://domain.com/resource"] # URL 嵌入容器开启
```

## 功能特性与支持属性 (Features & Attributes)

| 参数 / 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| **资源 URL** | `"String"` \| `url:"..."` | 要嵌入的媒体/资源的绝对 URL（第 1 位置参数或 `url:"..."`）。 |
| **支持的网络** | 内置集成 | 自动识别 YouTube、Vimeo、TikTok、X、Figma、Gists、CodePen、Spotify 等。 |
| **回退按钮** | 自动触发 | 未识别的 URL 将安全地渲染为格式化的超链接按钮，不会引发错误。 |

::: callout info "v0.9.1+ 容器语法标准化" icon:sparkles
自 **v0.9.1** 起，`docmd` 引入了显式的容器开启与闭合标签（例如 `::: card` ... `::: /card`、`::: tab` ... `::: /tab`）、显式的键值对属性（`title:"..."`、`url:"..."`）以及末尾的 `# 注释`。推荐在编写新文档时采用此现代语法。同时，对传统子块标记（`== tab`、`1.`）和位置参数退避逻辑的向下兼容将被严格保留。
:::


## 示例

### 视频嵌入

粘贴任何 YouTube、Vimeo 或 TikTok URL 即可呈现原生、响应式的播放器。

```markdown
::: embed url:"https://www.youtube.com/watch?v=0CSyIBHQy9g"
```

::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"

### 回退行为

如果解析器遇到不受支持或无效的 URL，docmd 会优雅地回退为超链接按钮，而不会破坏页面。

```markdown
::: embed url:"https://docs.docmd.io/content/containers/embed/"
```

::: embed "https://docs.docmd.io/content/containers/embed/"