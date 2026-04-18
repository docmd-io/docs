---
title: "安装"
description: "全局安装、本地安装或直接用 npx 运行 docmd。需要 Node.js 18+。"
---

根据你的工作流选择合适的安装方式。

## 通过 npx 即时运行

```bash
npx @docmd/core dev
```

无需安装。可在任意包含 Markdown 文件的目录中直接运行 docmd。

```bash
# 构建生产版本静态网站
npx @docmd/core build
```

## 安装为项目依赖（推荐）

::: tabs
== tab "npm"
```bash
npm install -D @docmd/core
npx docmd init
npx docmd dev
```
== tab "pnpm"
```bash
pnpm add -D @docmd/core
pnpm dlx docmd init
pnpm dlx docmd dev
```
== tab "yarn"
```bash
yarn add -D @docmd/core
yarn docmd init
yarn docmd dev
```
== tab "bun"
```bash
bun add -D @docmd/core
bunx docmd init
bunx docmd dev
```
:::

这种方式可以锁定版本，方便团队和 CI/CD 流水线保持一致。

::: callout tip "本地安装后"
将 `@docmd/core` 安装为项目依赖后，所有命令改用 `npx docmd` 替代 `npx @docmd/core`。
:::

## 全局安装

::: tabs
== tab "npm"
```bash
npm install -g @docmd/core
```
== tab "pnpm"
```bash
pnpm add -g @docmd/core
```
== tab "yarn"
```bash
yarn global add @docmd/core
```
== tab "bun"
```bash
bun add -g @docmd/core
```
:::

```bash
# 在任意目录使用 docmd 命令
docmd dev
docmd build
```

## 仅浏览器集成

::: callout info "仅限库集成模式"
此方式将 docmd 渲染引擎嵌入到其他 Web 应用中，不适用于标准文档网站的构建方式。
:::

```html
<!-- 核心样式 -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- 处理引擎 -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

具体采用方式请参阅 [浏览器 API](../api/browser-api.md) 指南。

## 常见问题

::: callout warning "权限拒绝（EACCES）"
如果在 macOS 或 Linux 上全局安装时遇到 `EACCES` 错误，请改用 [nvm](https://github.com/nvm-sh/nvm) 或 [fnm](https://github.com/Schniz/fnm) 等 Node 版本管理器，而不要使用 `sudo`。
:::

::: callout info "PowerShell 脚本执行策略（Windows）"
如果 PowerShell 阻止脚本执行，请以管理员身份运行：
`Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
:::