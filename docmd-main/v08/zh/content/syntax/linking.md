---
title: "链接与引用"
description: "掌握内部交叉链接、外部资源、新标签页行为以及静态资源引用。"
---

docmd 提供可靠的、感知文件系统的链接系统。以任何格式自然地编写到源 `.md` 文件的链接 —— 引擎会自动将它们规范化为干净、对 SEO 友好的 URL。

::: callout info "自然编写，完美发布"
您无需使用特殊的链接约定。可以写 `overview.md`、`overview/` 或 `overview` —— 构建引擎在每种情况下都会生成完全相同的、尾部带斜杠的干净 URL。
:::

## URL 规范化

在构建过程中，引擎会自动规范化每个内部链接。这适用于 Markdown 文本、按钮容器、标签以及导航配置。

| 您编写的 | 渲染结果 | 原因 |
| :--- | :--- | :--- |
| `overview.md` | `overview/` | 移除 `.md` 扩展名，添加尾部 `/`。 |
| `overview` | `overview/` | 自动添加尾部 `/`。 |
| `overview/` | `overview/` | 已经正确，无需更改。 |
| `api/commands.md` | `api/commands/` | 子目录链接被规范化。 |
| `localisation/index.md` | `localisation/` | 移除 `index`，该文件夹是规范的 URL。 |
| `../index.md` | `../` | 父目录的 index 被干净地解析。 |
| `overview.md#settings` | `overview/#settings` | 保留哈希片段。 |
| `https://example.com` | `https://example.com` | 外部链接原样通过。 |

## 内部链接

使用相对路径链接到源 `.md` 文件来指向其他页面。无论目录深度如何，引擎都能正确解析它们。

| 目标 | 示例 |
| :--- | :--- |
| 同级页面 | `[系统概览](overview.md)` |
| 子目录页面 | `[API 参考](api/node-api.md)` |
| 子目录索引 | `[国际化](localisation/index.md)` |
| 父目录 | `[返回首页](../index.md)` |

## 章节锚点

使用标准的 URL 哈希片段直接导航到某个标题。

```markdown
<!-- 页面内锚点 -->
[跳转到路线图](#project-roadmap)

<!-- 跨页锚点 -->
[查看 CLI 参数](../api/cli-commands.md#available-flags)
```

哈希片段会在规范化过程中保留。上面的跨页链接在生产环境中渲染为 `../api/cli-commands/#available-flags`。

## 在新标签页中打开

在任何链接 URL 前添加 `external:` 前缀，可强制其在新的浏览器标签页中打开。这在标准 Markdown 链接、按钮和标签中均有效。

```markdown
[在新标签页中打开](external:./configuration/overview.md)
[GitHub](external:https://github.com/docmd-io/docmd)
```

`external:` 前缀会从渲染后的 URL 中移除。默认情况下，所有链接都在同一窗口中打开。

## 链接到原始文件

使用 `raw:` 前缀绕过规范化，直接链接到可下载的文件。扩展名和路径会按原样保留。

```markdown
[查看原始源码](raw:docs/readme.md)
```

## 按钮与标签

`::: button` 和 `::: tag` 容器支持所有标准的链接约定，包括 `external:` 和 `raw:` 前缀。

```markdown
::: button "Get Started" ./getting-started/quick-start.md icon:rocket
::: button "View on GitHub" external:https://github.com/docmd-io/docmd icon:github
::: button "Download Source" raw:docs/readme.md icon:download

::: tag "v0.8.2" link:release-notes/0-8-2.md icon:tag color:#22c55e
::: tag "Open Externally" link:external:./configuration/overview.md icon:external-link
```

## 导航配置

`navigation.json` 和 `docmd.config.json` 中定义的路径会在构建时被规范化。可以使用任何格式 —— 以下三个条目都会生成相同的规范 URL。

```json "navigation.json"
[
  { "title": "Overview", "path": "configuration/overview" },
  { "title": "Overview", "path": "configuration/overview.md" },
  { "title": "Overview", "path": "configuration/overview/" }
]
```

对于应该在新标签页中打开的条目，请设置 `external` 标志。

```json "navigation.json"
[
  {
    "title": "GitHub",
    "path": "https://github.com/docmd-io/docmd",
    "external": true
  }
]
```

::: callout warning "导航中的索引页"
当链接到目录的索引页时，请使用文件夹路径而不是显式引用 `index.md`。两者效果相同，但文件夹路径更简洁。

```markdown
<!-- 推荐 -->
[Localisation](localisation/)

<!-- 也可以 -->
[Localisation](localisation/index.md)
```
:::

## 协议与外部资源

引擎会遵守标准的浏览器协议来处理外部资源，并且永远不会修改这些链接。

*   **HTTPS** - `[docmd 首页](https://docmd.io)` - 在同一标签页中打开。
*   **邮件** - `[支持](mailto:help@docmd.io)` - 打开电子邮件客户端。
*   **资源** - `[下载 CLI 二进制](/assets/bin/docmd-mac.zip)` - 不会被规范化。

## 静态资源

将可下载的文件放在项目的 `assets/` 目录中。构建器会将这些文件移动到生产根目录，且不修改路径。

```markdown
[下载文档 PDF](/assets/pdf/handbook.pdf)
[查看原始全局配置](/assets/config/docmd.config.json)
```

::: callout tip "AI 的语义链接"
优先选择**具有描述性的锚文本**（例如 `[优化 PWA 缓存](../plugins/pwa.md)`）而非通用标签（例如 `[了解更多](../plugins/pwa.md)`）。详细的链接标签为 AI 智能体提供了 `llms.txt` 流中语义关系的高保真映射。
:::
