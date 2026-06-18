---
title: "安装"
description: "全局安装 @docmd/core，或在项目内本地安装，亦可通过官方 Docker 镜像容器化运行。需要 Node.js 18 及以上。"
---

选择适合您工作流的安装方式。本地构建需要 Node.js 18 或更高版本。

## 1. 本地安装（推荐）

在本地运行 `docmd` 可让文档配置与源代码一同纳入版本管理。

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
docker pull ghcr.io/docmd-io/docmd:0.8.6

# 从本地 docs/ 构建文档到 site/
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:0.8.6 build
```

Docker Compose 与 Kubernetes 配置请参阅 [Docker 部署指南](../deployment/docker.md)。
:::

<img width="500" class="with-border" src="/assets/previews/terminal-npx-init.webp">

::: callout tip "脚本简写" icon:sparkles
本地安装完成后，可使用 `npx docmd dev` 启动实时预览服务器，或直接将脚本添加到 `package.json`。
:::

## 2. 全局安装

将软件包全局安装，以便在系统任意位置创建或预览站点，无需创建本地项目。

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

安装后，`docmd` 命令在任意位置可用：

```bash
docmd dev   # 在本地启动开发服务器
docmd build # 构建静态输出
```

## 3. 仅浏览器集成

通过 CDN 直接将引擎嵌入现有的 Web 应用。

::: callout info "专用库集成" icon:help-circle
这种方式绕过 CLI，并在访客的浏览器中加载解析引擎。适用于动态门户，而非静态 SEO 网站。
:::

在您的 HTML 中添加样式表与 JavaScript 引擎。

```html
<!-- 核心样式表 -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- 同构渲染引擎 -->
<script src="https://unpkg.com/@docmd/live/public/docmd-live.js"></script>
```

完整集成细节请参阅 [浏览器 API 指南](../api/browser-api.md)。

## 4. 故障排查

### 权限被拒（`EACCES` 错误）
在 macOS 或 Linux 上进行全局安装时，请勿使用 `sudo`。可通过 [nvm](external:https://github.com/nvm-sh/nvm) 或 [fnm](external:https://github.com/Schniz/fnm) 等 Node.js 版本管理器解决权限冲突。

### PowerShell 执行策略（Windows）
如果 Windows 阻止执行脚本，请以管理员身份打开 PowerShell 并启用当前用户的脚本执行权限。

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
