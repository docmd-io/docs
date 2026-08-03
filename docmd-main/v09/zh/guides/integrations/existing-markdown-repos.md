---
title: "接入已有 Markdown 仓库"
description: "如何从您既有的 Markdown 文件中，零配置即时生成一个专业的文档站点。"
---

## 问题

您手中有一个包含数百份 Markdown 文件的成熟仓库 —— 也许是历史 wiki、一个 Obsidian 保险库，或一些技术笔记。手工补齐 Frontmatter、修复失效链接、为新引擎重新组织文件，是一项艰巨的任务，往往会阻碍现代化。

## 为什么重要

您的内容应当保持可移植、与工具无关。一个高质量的文档引擎应该适应您既有的文件，而不是反过来强迫文件去适配引擎。规避厂商锁定，能确保您的知识资产以标准、可读且面向未来的形式留存。

## 方法

docmd 严格遵循 CommonMark 规范，默认即为 **零配置**。只需让 docmd CLI 指向任意包含 Markdown 的目录，它就能智能地引导出一套功能完整的文档站点，且无需修改任何源内容。

## 实现

### 1. 即时引导

进入您既有的 Markdown 目录并启动开发服务器。docmd 会扫描目录结构，并在内存中立即构建出可用的站点。

```bash
cd my-existing-docs/
npx @docmd/core dev
```

### 2. 自动导航（Auto-Router）

如果找不到 `navigation.json` 或 `docmd.config.json`，docmd 会触发其 [Auto-Router](../../configuration/navigation.md#automatic-sidebar-generation)：递归映射目录结构、美化目录名（例如把 `getting-started` 变成 `Getting Started`），并自动生成一份逻辑清晰的侧边栏分类。

### 3. 智能标题推断

您无需为每个文件都添加 `title` Frontmatter。docmd 使用逐级回退的解析策略来确定页面标题：
1.  **Frontmatter**：查找 `title` 或 `h1` 键。
2.  **首个标题**：抽取正文里出现的第一个 `# Heading`。
3.  **文件名**：把文件名美化后作为兜底（例如 `install-guide.md` 会变成 `Install Guide`）。

### 4. 宽容的语法处理

docmd 的设计本身就很宽容：若既有文件里包含其他引擎特有的专有语法或遗留 shortcode，它们要么安全地按原文渲染，要么被直接跳过。这就保证您的构建不会因内容尚未迁移而失败。

## 取舍

自动侧边栏默认按文件名字母序排列。使用 `01-intro.md`、`02-setup.md` 这类命名能够取得不错效果，但描述性的文件名有时排序会显得不够直观。对于面向生产的站点，建议改用手动 [导航配置](../../configuration/navigation.md) 以获得对用户旅程的完整掌控。