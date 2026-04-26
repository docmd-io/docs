---
title: "链接与引用"
description: "掌握 docmd 的自动 URL 规范化功能，实现内部交叉链接、外部资源引用和可靠的资源路径引用。"
---

`docmd` 提供了一套强大的、感知文件系统的链接系统。您可以自然地编写指向源 `.md` 文件的链接——使用任何您喜欢的格式——引擎会在构建时自动将它们规范化为干净的、SEO 友好的 URL。

::: callout info "自然编写，完美输出"
您不需要遵循任何特殊的链接约定。无论您写的是 `overview.md`、`overview/` 还是仅仅 `overview`，构建引擎都会生成相同的、带尾部斜杠的干净 URL。每个内部链接都会在构建时自动规范化，因此您可以专注于内容创作，而无需担心 URL 格式。
:::

## URL 规范化原理

在构建过程中，引擎对每个内部链接应用一套一致的规则——无论是在 Markdown 文本、按钮容器、标签还是导航配置中：

| 您编写的内容 | 渲染结果 | 原因 |
| :--- | :--- | :--- |
| `overview.md` | `overview/` | 去除 `.md` 扩展名，添加尾部 `/` |
| `overview` | `overview/` | 自动添加尾部 `/` |
| `overview/` | `overview/` | 已经正确——无需更改 |
| `api/commands.md` | `api/commands/` | 子目录链接已规范化 |
| `localisation/index.md` | `localisation/` | 去除 `index`——文件夹即为规范 URL |
| `../index.md` | `../` | 父目录索引已正确解析 |
| `overview.md#settings` | `overview/#settings` | 哈希片段在规范化过程中保留 |
| `./guide.md` | `./guide/` | 相对前缀保留 |
| `https://example.com` | `https://example.com` | 外部链接直接传递 |

::: callout tip "SEO 最佳实践"
所有内部页面都以尾部斜杠结尾的目录式 URL 提供服务（例如 `/configuration/overview/`）。这是静态站点的行业标准，可以防止 301 重定向链，并确保搜索引擎索引时使用一致的规范 URL。
:::

## 内部链接解析

使用相对路径链接到文档中的其他页面。引擎会根据目录深度正确解析它们。

| 定位策略 | Markdown 语法 |
| :--- | :--- |
| **同级页面** | `[系统概述](overview.md)` |
| **子目录** | `[API 参考](api/node-api.md)` |
| **子目录索引** | `[本地化](localisation/index.md)` |
| **父级目录** | `[返回首页](../index.md)` |

## 章节锚点（深度链接）

使用标准 URL 哈希片段直接导航到特定标题。

*   **页内锚点**：`[跳转到路线图](#project-roadmap)`
*   **跨页锚点**：`[查看 CLI 标志](../cli-commands.md#available-flags)`

哈希片段在规范化过程中会被保留。上面的链接在生产环境中渲染为 `../cli-commands/#available-flags`。

## 在新标签页中打开链接

在任何链接上使用 `external:` 前缀可强制其在新标签页中打开。这在所有场景中通用——标准 Markdown 链接、按钮容器、标签以及任何可以编写 URL 的地方。

```markdown
<!-- 标准 Markdown -->
[外部打开](external:https://github.com/docmd-io/docmd)

<!-- 也适用于希望在新标签页打开的内部链接 -->
[在新标签页打开](external:./configuration/overview.md)
```

以 `https://` 或 `http://` 开头的链接会被自动检测为外部链接并在新标签页中打开，无需 `external:` 前缀。

`external:` 前缀会从渲染的 URL 中**剥除**——它纯粹是一个构建时信号。

## 链接到原始文件

默认情况下，引擎会去除 `.md` 扩展名并规范化路径。如果您确实需要链接到原始 `.md` 文件（例如可下载的源文件），请使用 `raw:` 前缀：

```markdown
[查看原始源码](raw:docs/readme.md)
```

`raw:` 前缀会绕过所有规范化——扩展名和路径完全按原样保留。与 `external:` 一样，前缀本身会从渲染的 URL 中剥除。

## 按钮容器

`::: button` 容器支持与标准 Markdown 链接相同的链接约定——包括 `external:` 和 `raw:` 前缀：

```markdown
::: button "开始使用" ./getting-started/quick-start.md icon:rocket

::: button "在 GitHub 上查看" https://github.com/docmd-io/docmd icon:github

::: button "下载源码" raw:docs/readme.md icon:download
```

## 标签链接

带有 `link:` 值的标签也受益于统一的规范化器：

```markdown
::: tag "v0.7.6" link:release-notes/0-7-6.md icon:tag color:#22c55e

::: tag "GitHub" link:https://github.com/docmd-io/docmd icon:github

::: tag "外部打开" link:external:./configuration/overview.md icon:external-link
```

## 导航配置

在 `navigation.json` 和 `docmd.config.js` 中定义的路径也会在构建时进行规范化。您可以使用任何格式编写：

```json "navigation.json"
[
  { "title": "概述", "path": "configuration/overview" },
  { "title": "概述", "path": "configuration/overview.md" },
  { "title": "概述", "path": "configuration/overview/" }
]
```

以上三个条目都会生成相同的规范 URL：`/configuration/overview/`。

对于需要在新标签页中打开的导航项，请使用 `external` 标志：

```json "navigation.json"
[
  {
    "title": "GitHub",
    "path": "https://github.com/docmd-io/docmd",
    "external": true
  }
]
```

::: callout warning "导航中的索引页面"
链接到目录的索引页面时，请使用文件夹路径而不是显式引用 `index.md`。两者效果完全相同，但文件夹路径更简洁：

```markdown
<!-- 推荐 -->
[本地化](localisation/)

<!-- 也可以（自动规范化） -->
[本地化](localisation/index.md)
```
:::

## 协议与外部资源

引擎支持标准浏览器协议以访问外部资源。这些链接不会被修改，但会被自动检测为外部链接（在新标签页中打开）。

*   **全局 HTTPS**：`[docmd 主页](https://docmd.io)`
*   **邮件协议**：`[技术支持](mailto:help@docmd.io)` — 不会在新标签页中打开
*   **资源协议**：`[下载 CLI 二进制文件](/assets/bin/docmd-mac.zip)` — 不会被规范化

## 静态资源引用

要提供下载或引用原始源文件，请将它们放置在项目的 `assets/` 目录中。`docmd` 构建器确保这些文件被移动到生产根目录时不修改路径。

```markdown
[下载文档 PDF](/assets/pdf/handbook.pdf)
[查看全局配置](/assets/config/docmd.config.js)
```

::: callout tip "面向 AI 的语义链接"
在交叉链接技术模块时，优先使用**描述性锚点**（例如 `[优化 PWA 缓存](../plugins/pwa.md)`）而不是通用文本（例如 `[了解更多](../plugins/pwa.md)`）。详细的链接标签为 AI 代理提供了 `llms-full.txt` 上下文中不同文档节点之间语义关系的高保真映射。
:::