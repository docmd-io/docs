---
title: "Vercel"
description: "通过生成的 vercel.json 将您的 docmd 文档部署到 Vercel。"
---

`npx @docmd/core deploy --vercel` 会在项目根目录生成一份 `vercel.json` 文件。它会根据您站点的输出目录和 SPA 路由设置自动配置。

```bash
npx @docmd/core deploy --vercel
```

## 生成内容

`vercel.json` 配置以下内容：

- **构建命令 (Build command)** — 运行 `npx @docmd/core build`。
- **输出目录 (Output directory)** — 设置为您配置中的 `out` 属性。
- **安装命令 (Install command)** — 安装所使用的确切 `@docmd/core` 版本。
- **缓存头 (Cache headers)** — 资源使用 immutable 缓存，HTML 使用 no-cache。
- **SPA 路由 (SPA routing)** — 当 `layout.spa` 启用时，将所有路由兜底到 `index.html`。

## 部署

生成该文件后，可使用 [Vercel CLI](external:https://vercel.com/docs/cli) 进行部署：

```bash
npm install -g vercel
vercel
```

或者从 Vercel 控制台连接您的仓库，它会自动识别 `vercel.json`。

## 重新生成

如果您修改了 `docmd.config.json` 中的 `out` 目录或 `url`，请重新运行该命令以重新生成文件，使配置始终保持同步。
