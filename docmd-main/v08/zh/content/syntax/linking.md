---
title: "链接与引用"
description: "掌握内部交叉链接、外部资源、新标签页行为和静态资源引用。"
---

docmd 提供了一套可靠的、具有文件系统感知能力的链接系统。你可以用任何格式自然地编写指向源 `.md` 文件的链接——引擎会自动将它们规范化为干净、经过 SEO 优化的 URL。

::: callout info "自然编写，完美交付"
你不需要任何特殊的链接约定。无论写的是 `overview.md`、`overview/` 还是 `overview`，构建引擎都会生成相同的干净带尾斜杠 URL。
:::

## URL 规范化

在构建过程中，引擎会对每一个内部链接自动应用规范化。这适用于 Markdown 文本、按钮容器、标签和导航配置中的链接。

| 你编写的内容 | 渲染后的内容 | 原因 |
| :--- | :--- | :--- |
| `overview.md` | `overview/` | 剥离 `.md` 扩展名，添加尾斜杠 |
| `overview` | `overview/` | 自动添加尾斜杠 |
| `overview/` | `overview/` | 已正确，无需更改 |
| `api/commands.md` | `api/commands/` | 规范化子目录链接 |
| `localisation/index.md` | `localisation/` | 剥离 `index`，文件夹为规范 URL |
| `../index.md` | `../` | 清晰解析父目录索引 |
| `overview.md#settings` | `overview/#settings` | 保留哈希片段 |
| `https://example.com` | `https://example.com` | 外部链接不做修改 |

## 内部链接

使用指向源 `.md` 文件的相对路径链接到其他页面。无论目录深度如何，引擎都能正确解析。

| 目标 | 示例 |
| :--- | :--- |
| 同级页面 | `[系统概览](overview.md)` |
| 子目录页面 | `[API 参考](api/node-api.md)` |
| 子目录索引 | `[本地化](localisation/index.md)` |
| 父目录 | `[回到首页](../index.md)` |

## 章节锚点

使用标准 URL 哈希片段直接跳转到指定标题。

```markdown
<!-- 页内锚点 -->
[跳转到路线图](#project-roadmap)

<!-- 跨页锚点 -->
[查看 CLI 标志](../api/cli-commands.md#available-flags)
```

哈希片段在规范化过程中会被保留。上面的跨页链接在生产环境中渲染为 `../api/cli-commands/#available-flags`。

## 在新标签页中打开

在任何链接 URL 前加上 `external:` 前缀，即可强制其在新标签页中打开。适用于标准 Markdown 链接、按钮和标签容器。

```markdown
[在新标签页中打开](external:./configuration/overview.md)
[GitHub](external:https://github.com/docmd-io/docmd)
```

`external:` 前缀会从渲染后的 URL 中剥离。默认情况下，所有链接都在同一个窗口中打开。

## 链接到原始文件

使用 `raw:` 前缀可绕过规范化，直接链接到可下载的原始文件。扩展名和路径将完全按照编写的方式保留。

```markdown
[查看原始源码](raw:docs/readme.md)
```

## 按钮与标签

`::: button` 和 `::: tag` 容器支持所有标准链接约定，包括 `external:` 和 `raw:` 前缀。

```markdown
::: button "开始使用" ./getting-started/quick-start.md icon:rocket
::: button "在 GitHub 上查看" external:https://github.com/docmd-io/docmd icon:github
::: button "下载源码" raw:docs/readme.md icon:download

::: tag "v0.8.2" link:release-notes/0-8-2.md icon:tag color:#22c55e
::: tag "从外部打开" link:external:./configuration/overview.md icon:external-link
```

## 导航配置

在 `navigation.json` 和 `docmd.config.json` 中定义的路径会在构建时规范化。三种写法均生成相同的规范 URL。

```json "navigation.json"
[
  { "title": "概览", "path": "configuration/overview" },
  { "title": "概览", "path": "configuration/overview.md" },
  { "title": "概览", "path": "configuration/overview/" }
]
```

对于需要在新标签页中打开的导航项，设置 `external` 标志。

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
链接到目录的索引页时，使用文件夹路径比显式引用 `index.md` 更整洁。两者效果相同。

```markdown
<!-- 推荐 -->
[本地化](localisation/)

<!-- 同样有效 -->
[本地化](localisation/index.md)
```
:::

## 协议与外部资源

引擎遵循标准浏览器协议，不修改这些链接。

*   **HTTPS** — `[docmd 主页](https://docmd.io)` — 在同一标签页中打开。
*   **邮件** — `[支持](mailto:help@docmd.io)` — 打开邮件客户端。
*   **资源** — `[下载 CLI 二进制](/assets/bin/docmd-mac.zip)` — 不做规范化。

## 静态资源

将可下载文件放在项目的 `assets/` 目录中。构建器会将这些文件移动到生产根目录，不修改路径。

```markdown
[下载文档 PDF](/assets/pdf/handbook.pdf)
[查看原始全局配置](/assets/config/docmd.config.json)
```

::: callout tip "针对 AI 的语义链接"
优先使用**描述性锚点文本**（例如 `[优化 PWA 缓存](../plugins/pwa.md)`），而非通用标签（例如 `[阅读更多](../plugins/pwa.md)`）。详细的链接标签能让 AI 代理在 `llms.txt` 流中精准解析文档节点之间的语义关系。
:::
