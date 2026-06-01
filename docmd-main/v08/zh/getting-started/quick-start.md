---
title: "快速开始"
description: "从空文件夹到运行中的文档网站，不到一分钟。"
---

在任何包含 Markdown 文件的文件夹中运行 docmd。无需配置文件、无需安装框架、无需配置知识。

## 1. 启动开发服务器

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

访问 `http://localhost:3000`。你的文档已上线。

<img width="500" class="with-border" src="/assets/previews/terminal-npx-dev.webp">

::: callout tip "自动端口故障转移"
如果端口 `3000` 已被占用，docmd 会自动寻找下一个可用端口（例如 `3001`）。
:::

## 2. 自动完成的事项

引擎自动设置一切：

1. **目录检测** - 扫描 `docs/`、`src/docs/`、`documentation/` 或 `.md` 文件。
2. **导航生成** - 根据文件夹树自动构建嵌套侧边栏。
3. **标题提取** - 自动从第一个 `H1` 标题提取页面标题。
4. **搜索索引** - 立即启用内置全文搜索。
5. **智能缓存** - 文件保存时触发亚 200ms 的重建。

无需 `docmd.config.json`。稍后可添加来自定义布局、插件或版本。

## 3. 构建生产版本

将 Markdown 文件编译为静态的、生产就绪的网站。

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core build
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core build
```
:::

编译器将静态网站输出到 `./site/`。

可以将此静态输出托管在任何地方。部署到 GitHub Pages、Vercel、Netlify 或任何静态主机。