---
title: "链接与引用"
description: "掌握内部交叉链接、外部资源引用和可靠的资源路径引用。"
---

`docmd` 提供了健壮的文件系统感知链接系统。通过使用相对路径引用源 `.md` 文件，可确保链接在 IDE（如 VS Code）中正常工作，并在生产构建时自动重写为正确路径。

::: callout info "扩展名中立性"
在构建过程中，引擎会自动将 `.md` 扩展名解析为对应的相对 HTML 路径。无论是在本地浏览源文件还是编译后的生产网站，内部文档链接都不会失效。
:::

## 内部链接解析

| 定向策略 | Markdown 语法 |
| :--- | :--- |
| **同级页面** | `[系统概览](overview.md)` |
| **子目录** | `[API 参考](api/node-api.md)` |
| **上级目录** | `[返回首页](../index.md)` |

## 节点锚点（深层链接）

使用标准 URL slug 直接定位特定标题。

*   **页内锚点**：`[跳转到路线图](#project-roadmap)`
*   **跨页锚点**：`[查看 CLI 参数](../cli-commands.md#available-flags)`

## 协议与外部资源

引擎支持各类标准浏览器协议。

*   **HTTPS**：`[docmd 首页](https://docmd.io)`
*   **邮件协议**：`[支持渠道](mailto:help@docmd.io)`
*   **资源下载**：`[下载 CLI 二进制](/assets/bin/docmd-mac.zip)`

## 静态资源引用

如需提供下载或引用原始源文件，将其放入项目的 `assets/` 目录。`docmd` 构建器会确保这些文件在没有路径修改的情况下迁移到生产根目录。

```markdown
[下载文档 PDF](/assets/pdf/handbook.pdf)
[查看原始全局配置](/assets/config/docmd.config.js)
```

::: callout tip "AI 语义链接"
跨模块链接时，优先使用**描述性锚点文本**（如 `[优化 PWA 缓存](../plugins/pwa.md)`）而非泛泵文本（如 `[阅读更多](../plugins/pwa.md)`）。详细的链接标签为 AI Agent 提供了 `llms-full.txt` 上下文中不同文档节点间语义关系的高保真地图。
:::