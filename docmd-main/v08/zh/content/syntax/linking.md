---
title: "链接与引用 (Linking & Referencing)"
description: "通过 docmd 的自动 URL 规范化功能，掌握内部交叉链接、外部资源和可靠的资源引用。"
---

`docmd` 提供了一个强大的、具有文件系统感知能力的链接系统。你可以自然地编写指向源 `.md` 文件的链接 —— 使用你喜欢的任何格式 —— 引擎会自动将它们规范化为干净、经过 SEO 优化的生产环境 URL。

::: callout info "自然编写，完美交付"
你不需要遵循任何特殊的链接约定。无论你写的是 `overview.md`、`overview/` 还是仅仅是 `overview`，构建引擎都会生成相同的干净、带有尾随斜杠的 URL。每个内部链接在构建时都会自动规范化，因此你可以专注于内容，而不是 URL 格式。
:::

## URL 规范化是如何工作的

在构建过程中，引擎会对每一个内部链接（包括 Markdown 文本、按钮容器、标签和导航配置中的链接）应用一套一致的规则：

| 你编写的内容 | 渲染后的内容 | 原因 |
| :--- | :--- | :--- |
| `overview.md` | `overview/` | 剥离 `.md` 扩展名，添加尾随 `/` |
| `overview` | `overview/` | 自动添加尾随 `/` |
| `overview/` | `overview/` | 已经正确 —— 无需更改 |
| `api/commands.md` | `api/commands/` | 规范化子目录链接 |
| `localisation/index.md` | `localisation/` | 剥离 `index` —— 文件夹是规范 URL |
| `../index.md` | `../` | 清洁地解析父目录索引 |
| `overview.md#settings` | `overview/#settings` | 在规范化过程中保留哈希片段 |
| `./guide.md` | `./guide/` | 保留相对前缀 |
| `https://example.com` | `https://example.com` | 外部链接保持不变 |

::: callout tip "SEO 最佳实践"
所有内部页面都作为以尾随斜杠结尾的目录样式 URL 提供（例如，`/configuration/overview/`）。这是静态网站的行业标准，可以防止 301 重定向链，并确保搜索引擎索引的一致规范 URL。
:::

## 内部链接解析

使用指向源 `.md` 文件的相对路径来链接到文档中的其他页面。无论目录深度如何，引擎都能正确解析它们。

| 目标策略 | Markdown 语法 |
| :--- | :--- |
| **同级页面** | `[系统概览](overview.md)` |
| **子目录** | `[API 参考](api/node-api.md)` |
| **子目录索引** | `[本地化](localisation/index.md)` |
| **父目录** | `[回到首页](../index.md)` |

## 章节锚点 (深层链接)

使用标准的 URL 哈希片段直接导航到特定标题。

*   **页内锚点**: `[跳转到路线图](#project-roadmap)`
*   **跨页锚点**: `[查看 CLI 标志](../cli-commands.md#available-flags)`

哈希片段在规范化过程中会被保留。上面的链接在生产环境中渲染为 `../cli-commands/#available-flags`。

## 在新标签页中打开链接

在任何链接上使用 `external:` 前缀强制其在新标签页中打开。这在标准 Markdown 链接、按钮容器、标签以及任何可以编写 URL 的地方都是通用的。

```markdown
<!-- 强制任何链接在新标签页中打开 -->
[在新标签页中打开](external:./configuration/overview.md)

<!-- 指向 GitHub 的外部链接 -->
[GitHub](external:https://github.com/docmd-io/docmd)
```

默认情况下，所有链接（包括 HTTP/HTTPS）都在同一个窗口中打开。仅当你想要一个新标签页时才使用 `external:` 前缀。

`external:` 前缀会从渲染后的 URL 中 **剥离** —— 它纯粹是一个构建时信号。

## 链接到原始文件

默认情况下，引擎会剥离 `.md` 扩展名并规范化路径。如果你确实需要链接到原始 `.md` 文件（例如，可下载的源文件），请使用 `raw:` 前缀：

```markdown
[查看原始源码](raw:docs/readme.md)
```

`raw:` 前缀会绕过所有规范化 —— 扩展名和路径将完全按照编写的方式保留。与 `external:` 一样，前缀本身会从渲染后的 URL 中剥离。

## 按钮容器 (Button Containers)

`::: button` 容器支持与标准 Markdown 链接相同的链接约定 —— 包括 `external:` 和 `raw:` 前缀：

```markdown
::: button "开始使用" ./getting-started/quick-start.md icon:rocket

::: button "在 GitHub 上查看" https://github.com/docmd-io/docmd icon:github

::: button "下载源码" raw:docs/readme.md icon:download
```

## 标签链接 (Tag Links)

带有 `link:` 值的标签也受益于统一规范化器：

```markdown
::: tag "v0.7.6" link:release-notes/0-7-6.md icon:tag color:#22c55e

::: tag "GitHub" link:https://github.com/docmd-io/docmd icon:github

::: tag "从外部打开" link:external:./configuration/overview.md icon:external-link
```

## 导航配置

在 `navigation.json` 和 `docmd.config.js` 中定义的路径也会在构建时进行规范化。你可以使用任何格式编写它们：

```json "navigation.json"
[
  { "title": "Overview", "path": "configuration/overview" },
  { "title": "Overview", "path": "configuration/overview.md" },
  { "title": "Overview", "path": "configuration/overview/" }
]
```

上面的三个条目都会生成相同的规范 URL：`/configuration/overview/`。

对于应该在新标签页中打开的导航项目，请使用 `external` 标志：

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
在链接到目录的索引页时，请使用文件夹路径，而不是显式引用 `index.md`。两者工作方式相同，但文件夹路径更整洁：

```markdown
<!-- 推荐 -->
[本地化](localisation/)

<!-- 同样有效（自动规范化） -->
[本地化](localisation/index.md)
```
:::

## 协议与外部资源

引擎尊重标准浏览器的外部资源协议。这些链接永远不会被修改。

*   **全局 HTTPS**: `[docmd 主页](https://docmd.io)` —— 在同一个标签页中打开（使用 `external:` 前缀以在新标签页中打开）
*   **邮件协议**: `[支持渠道](mailto:help@docmd.io)` —— 不在新标签页中打开
*   **资源协议**: `[下载 CLI 二进制文件](/assets/bin/docmd-mac.zip)` —— 不进行规范化

## 静态资源引用

要提供下载或引用原始源文件，请将它们放在项目的 `assets/` 目录中。`docmd` 构建器确保这些文件被移动到生产根目录，且不修改路径。

```markdown
[下载文档 PDF](/assets/pdf/handbook.pdf)
[查看原始全局配置](/assets/config/docmd.config.js)
```

::: callout tip "针对 AI 的语义链接"
在交叉链接技术模块时，优先使用 **描述性锚点**（例如，`[优化 PWA 缓存](../plugins/pwa.md)`）而不是通用文本（例如，`[阅读更多](../plugins/pwa.md)`）。详细的链接标签为 AI 代理提供了 `llms-full.txt` 上下文中不同文档节点之间语义关系的高保真地图。
:::