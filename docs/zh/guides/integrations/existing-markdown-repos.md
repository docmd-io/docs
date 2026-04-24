---
title: "现有的 Markdown 存储库"
description: "如何从现有的 Markdown 文件中即时生成专业的文档网站，且无需任何配置。"
---

## 问题

您可能有一个已经建立的存储库，其中包含数百或数千个原始 Markdown 文件——例如旧的 Wiki、Obsidian 库或技术笔记集。手动转换 Frontmatter、修复失效链接以及重组文件以适应新引擎是一项艰巨的任务，这往往阻碍了团队对文档进行现代化改造。

## 为什么重要

您的内容应该保持可移植性且与工具无关。高质量的文档引擎应该适应您现有的文件，而不是强迫您的文件适应引擎。避免厂商锁定可确保您的知识资产保持标准、可读且面向未来。

## 方法

`docmd` 遵循严格的 CommonMark 规范，并且默认设计为 **零配置 (zero-config)**。您可以将 `docmd` CLI 指向任何包含 Markdown 文件的目录，它将智能地引导生成一个功能齐全的文档网站，而无需修改源内容的任何一行。

## 实施

### 1. 即时引导

导航到您现有的 Markdown 文件夹并运行开发服务器。`docmd` 将扫描您的目录结构并立即在内存中构建一个功能完善的站点。

```bash
cd my-existing-docs/
npx docmd dev
```

### 2. 自动导航 (Auto-Router)

如果没有找到 `navigation.json` 或 `docmd.config.js`，`docmd` 将触发其 [自动路由 (Auto-Router)](../../configuration/navigation#automatic-sidebar-generation)。它会递归映射您的文件夹结构，美化目录名称（例如，`getting-started` 变为 `Getting Started`），并自动生成逻辑侧边栏分类。

### 3. 智能标题推断

您不需要为每个文件都添加 `title` Frontmatter。`docmd` 采用级联解析策略来确定页面标题：
1.  **Frontmatter**：检查 `title` 或 `h1` 键。
2.  **第一个标题**：提取文件内容中发现的第一个 `# 标题`。
3.  **文件名**：作为备选方案，美化文件名（例如，`install-guide.md` 变为 `Install Guide`）。

### 4. 弹性的语法处理

`docmd` 的设计具有很强的弹性。如果您现有的文件中包含来自其他引擎的专有语法或旧的短代码，它们将被安全地渲染为原始文本或被跳过，从而确保您的构建永远不会因为尚未迁移的内容而失败。

## 权衡

自动生成的侧边栏通常按文件名的字母顺序排序。虽然像 `01-intro.md` 和 `02-setup.md` 这样的命名方式效果很好，但更具描述性的文件名可能会以不直观的顺序出现。对于生产级站点，我们建议过渡到手动 [导航配置](../../configuration/navigation)，以获得对用户旅程的完全控制。
