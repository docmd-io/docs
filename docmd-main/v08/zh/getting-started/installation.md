---
title: "安装"
description: "全局安装、本地安装或直接集成到 Web 应用中安装 @docmd/core。需要 Node.js 18+。"
---

选择适合你工作流的安装方法。需要 Node.js 18 或更高版本。

## 1. 项目本地安装（推荐）

将 `@docmd/core` 作为开发依赖安装到本地。这样可以在 `package.json` 中锁定版本，确保团队和 CI/CD 构建的一致性。

### 安装包

::: tabs
== tab "npm" icon:box
```bash
npm install -D @docmd/core
```
== tab "pnpm" icon:boxes
```bash
pnpm add -D @docmd/core
```
== tab "yarn" icon:scroll
```bash
yarn add -D @docmd/core
```
== tab "Bun" icon:zap
```bash
bun add -D @docmd/core
```
:::

### 初始化项目

自动创建标准文件夹结构、初始页面和配置文件。

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core init
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core init
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core init
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core init
```
:::

<img width="500" class="with-border" src="/assets/previews/terminal-npx-init.webp">

::: callout tip "快捷脚本"
本地安装后，你可以使用 `npx @docmd/core dev` 或直接将其添加到 `package.json` 脚本中。
:::

## 2. 全局安装

全局安装包，可在系统任何位置创建或预览网站。

::: tabs
== tab "npm" icon:box
```bash
npm install -g @docmd/core
```
== tab "pnpm" icon:boxes
```bash
pnpm add -g @docmd/core
```
== tab "yarn" icon:scroll
```bash
yarn global add @docmd/core
```
== tab "Bun" icon:zap
```bash
bun add -g @docmd/core
```
:::

全局安装后，`docmd` 二进制文件在任何地方都可用。你也可以始终使用 `npx @docmd/core`，无需全局安装。

```bash
docmd dev   # 启动本地开发服务器
docmd build # 构建静态输出
```

## 3. 仅浏览器集成

通过 CDN 直接将引擎嵌入现有 Web 应用中。

::: callout info "专用库集成"
这绕过了 CLI，在读者的浏览器中加载解析引擎。用于动态门户，不是静态 SEO 网站。
:::

将样式表和 JavaScript 引擎添加到你的 HTML 中。

```html
<!-- 核心样式表 -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- 同构渲染引擎 -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

详见 [浏览器 API](../api/browser-api.md)。

## 4. 故障排除

### 权限被拒绝（`EACCES` 错误）
在 macOS 或 Linux 上全局安装时，不要使用 `sudo`。使用 Node.js 版本管理器如 [nvm](https://github.com/nvm-sh/nvm) 或 [fnm](https://github.com/Schniz/fnm) 来解决权限冲突。

### PowerShell 执行策略（Windows）
如果 Windows 阻止执行，请以管理员身份打开 PowerShell 并启用当前用户脚本执行。

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```