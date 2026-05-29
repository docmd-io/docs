---
title: "Vercel"
description: "使用生成的 vercel.json 将 docmd 文档部署到 Vercel。"
---

`npx @docmd/core deploy --vercel` 在项目根目录生成一个 `vercel.json` 文件。它会自动配置为你站点的输出目录和 SPA 路由设置。

```bash
npx @docmd/core deploy --vercel
```

## 生成的内容

`vercel.json` 配置：

- **构建命令** - 运行 `npx @docmd/core build`。
- **输出目录** - 设置为配置中的 `out` 属性。
- **安装命令** - 安装使用的确切 `@docmd/core` 版本。
- **缓存头** - 资源不可变缓存，HTML 无缓存。
- **SPA 路由** - 当启用 `layout.spa` 时，将所有路由重定向到 `index.html`。

## 部署

生成文件后，使用 [Vercel CLI](external:https://vercel.com/docs/cli) 部署：

```bash
npm install -g vercel
vercel
```

或者，从控制台将仓库连接到 Vercel。它会自动检测 `vercel.json`。

## 重新生成

如果在 `docmd.config.json` 中更改了 `out` 目录或 `url`，重新运行命令以重新生成文件。这可使配置保持同步。