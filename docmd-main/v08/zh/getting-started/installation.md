---
title: "安装"
description: "全局安装、本地安装 @docmd/core，或使用官方 Docker 镜像运行。需要 Node.js 18+。"
---

选择适合你工作流的安装方法。本地构建需要 Node.js 18 或更高版本。

## 1. 本地安装（推荐）

在本地运行 `docmd` 可以将文档配置与你的源代码一起进行版本控制。

::: tabs
== tab "npm" icon:box
```bash
# 作为开发依赖安装
npm install -D @docmd/core

# 初始化新项目
npx docmd init
```
== tab "pnpm" icon:boxes
```bash
# 作为开发依赖安装
pnpm add -D @docmd/core

# 初始化新项目
pnpm dlx docmd init
```
== tab "yarn" icon:scroll
```bash
# 作为开发依赖安装
yarn add -D @docmd/core

# 初始化新项目
yarn dlx docmd init
```
== tab "Bun" icon:zap
```bash
# 作为开发依赖安装
bun add -D @docmd/core

# 初始化新项目
bunx docmd init
```
== tab "Docker" icon:container
```bash
# 拉取官方多架构镜像
docker pull ghcr.io/docmd-io/docmd:latest

# 构建文档（从本地 docs/ 编译到 site/）
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:latest build
```

详情见 [Docker 部署指南](../deployment/docker.md)，了解 Docker Compose 和 Kubernetes 配置。
:::

<img width="500" class="with-border" src="/assets/previews/terminal-npx-init.webp">

::: callout tip "快捷脚本" icon:sparkles
本地安装后，你可以使用 `npx docmd dev` 启动实时预览服务器，或直接将其添加到 `package.json` 脚本中。
:::

## 2. 全局安装

全局安装包，可在系统任何位置创建或预览网站，无需创建本地项目。

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

全局安装后，`docmd` 二进制文件在任何地方都可用：

```bash
docmd dev   # 启动本地开发服务器
docmd build # 构建静态输出
```

## 3. 仅浏览器集成

通过 CDN 直接将引擎嵌入现有 Web 应用中。

::: callout info "专用库集成" icon:help-circle
这绕过了 CLI，在读者的浏览器中加载解析引擎。用于动态门户，不是静态 SEO 网站。
:::

将样式表和 JavaScript 引擎添加到你的 HTML 中。

```html
<!-- 核心样式表 -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- 同构渲染引擎 -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

详情见 [浏览器 API 指南](../api/browser-api.md)。

## 4. 故障排除

### 权限被拒绝（`EACCES` 错误）
在 macOS 或 Linux 上全局安装时，不要使用 `sudo`。使用 Node.js 版本管理器如 [nvm](https://github.com/nvm-sh/nvm) 或 [fnm](https://github.com/Schniz/fnm) 来解决权限冲突。

### PowerShell 执行策略（Windows）
如果 Windows 阻止执行，请以管理员身份打开 PowerShell 并启用当前用户脚本执行。

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```