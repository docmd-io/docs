---
title: "Vercel"
description: "使用生成的 vercel.json 将 docmd 文档部署到 Vercel。"
---

`npx @docmd/core deploy --vercel` 在项目根目录生成一个 `vercel.json` 文件。它会根据您的站点输出目录和 SPA 路由设置自动配置。

```bash
npx @docmd/core deploy --vercel
```

## 生成的内容

`vercel.json` 配置了：

- **构建命令** - 运行 `npx @docmd/core build`。
- **输出目录** - 设置为配置中的 `out` 属性。
- **安装命令** - 安装所用 `@docmd/core` 的确切版本。
- **缓存头** - 资源的不可变缓存，HTML 不缓存。
- **SPA 路由** - 当启用 `layout.spa` 时，所有路由都指向 `index.html`。

## 部署

生成文件后，使用 [Vercel CLI](external:https://vercel.com/docs/cli) 进行部署：

```bash
npm install -g vercel
vercel
```

或者，从控制台将您的仓库连接到 Vercel。它会自动检测 `vercel.json`。

## 重新生成

如果您更改了 `docmd.config.json` 中的 `out` 目录或 `url`，请重新运行该命令以重新生成文件。这将使配置保持同步。
