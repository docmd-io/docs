---
title: "安装指南"
description: "全局或在项目内本地安装 @docmd/core，也可通过官方 Docker 镜像运行容器化构建。需要 Node.js 20+。"
---

选择适合你工作流的安装方式。本地构建需要 Node.js 20 或更高版本。

## 1. 本地安装（推荐）

在本地运行 `docmd` 可以让你的文档配置与源代码一同进行版本控制。

::: tabs
== tab "npm" icon:box
```bash
# 安装为开发依赖
npm install -D @docmd/core

# 初始化新项目
npx docmd init
```
== tab "pnpm" icon:boxes
```bash
# 安装为开发依赖
pnpm add -D @docmd/core

# 初始化新项目
pnpm dlx docmd init
```
== tab "yarn" icon:scroll
```bash
# 安装为开发依赖
yarn add -D @docmd/core

# 初始化新项目
yarn dlx docmd init
```
== tab "Bun" icon:zap
```bash
# 安装为开发依赖
bun add -D @docmd/core

# 初始化新项目
bunx docmd init
```
== tab "Docker" icon:container
```bash
# 拉取官方多架构镜像
docker pull ghcr.io/docmd-io/docmd:latest

# 将本地 docs/ 目录下的文档构建输出至 site/
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:latest build
```

查阅 [Docker 部署指南](../deployment/docker.md) 获取 Docker Compose 与 Kubernetes 配置说明。
:::

<img width="500" class="with-border" src="/assets/previews/terminal-npx-init.webp">

::: callout tip "快捷脚本" icon:sparkles
本地安装完成后，你可以使用 `npx docmd dev` 启动实时预览服务器，或将构建脚本直接添加到 `package.json` 中。
:::

## 2. 全局安装

全局安装该包，可在系统任何位置创建或预览站点，无需创建本地项目。

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

安装完成后，`docmd` 命令即可在全局使用：

```bash
docmd dev   # 启动本地开发服务器
docmd build # 构建静态站点输出
```

## 3. 纯浏览器集成

通过 CDN 直接在现有 Web 应用中嵌入渲染引擎。

::: callout info "专有库集成" icon:help-circle
这会绕过 CLI 并在浏览器中直接加载解析引擎。适用于动态门户和交互式客户端渲染，而非静态 SEO 网站。
:::

将样式表和 JavaScript 引擎添加到 HTML 标头中。

```html
<!-- 核心样式表 -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- 同构渲染引擎 -->
<script src="https://unpkg.com/@docmd/live/public/docmd-live.js"></script>
```

查阅 [浏览器 API 指南](../reference/browser-api.md) 获取完整集成细节。

## 4. 故障排除

### 权限被拒绝 (`EACCES` 错误)
在 macOS 或 Linux 上进行全局安装时不要使用 `sudo`。使用 Node.js 版本管理器如 [nvm](external:https://github.com/nvm-sh/nvm) 或 [fnm](external:https://github.com/Schniz/fnm) 来解决权限冲突。

### PowerShell 执行策略（Windows）
如果 Windows 阻止了命令执行，请以管理员身份打开 PowerShell 并为当前用户启用脚本执行。

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
