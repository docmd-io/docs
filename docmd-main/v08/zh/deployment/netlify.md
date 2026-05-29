---
title: "Netlify"
description: "使用生成的 netlify.toml 将 docmd 文档部署到 Netlify。"
---

`npx @docmd/core deploy --netlify` 在项目根目录生成一个 `netlify.toml` 文件。它预先配置了正确的构建命令、发布目录、缓存头和 SPA 重定向。

```bash
npx @docmd/core deploy --netlify
```

## 生成的内容

`netlify.toml` 配置：

- **构建命令** - 安装 `@docmd/core` 并运行 `npx @docmd/core build`。
- **发布目录** - 设置为你配置的 `out` 目录。
- **Node 版本** - 固定为 Node 20。
- **缓存头** - 资源不可变，HTML 页面无缓存。
- **SPA 重定向** - 当启用 `layout.spa` 时，将 `/*` 重写到 `/index.html`。

## 部署

从 [Netlify 控制台](external:https://app.netlify.com)将仓库连接到 Netlify。它会自动检测 `netlify.toml` 并在每次推送时部署。

或者，使用 [Netlify CLI](external:https://docs.netlify.com/cli/get-started/)：

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 重新生成

每当更改 `out` 或其他配置字段时，重新运行 `npx @docmd/core deploy --netlify`。这可使 `netlify.toml` 保持同步。