---
title: "Netlify"
description: "使用生成的 netlify.toml 将 docmd 文档部署到 Netlify。"
---

`npx @docmd/core deploy --netlify` 在项目根目录生成一个 `netlify.toml` 文件。它预先配置了正确的构建命令、发布目录、缓存头和 SPA 重定向。

```bash
npx @docmd/core deploy --netlify
```

## 生成的内容

`netlify.toml` 配置了：

- **构建命令** - 安装 `@docmd/core` 并运行 `npx @docmd/core build`。
- **发布目录** - 设置为您配置的 `out` 目录。
- **Node 版本** - 固定为 Node 20。
- **缓存头** - 资源使用不可变缓存，HTML 页面不使用缓存。
- **SPA 重定向** - 当启用 `layout.spa` 时，进行 `/*` → `/index.html` 的重写。

## 部署

从 [Netlify 控制台](external:https://app.netlify.com) 将您的仓库连接到 Netlify。它会自动检测 `netlify.toml` 并在每次推送时部署。

或者，使用 [Netlify CLI](external:https://docs.netlify.com/cli/get-started/)：

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 重新生成

每当您更改 `out` 或其他配置字段时，重新运行 `npx @docmd/core deploy --netlify`。这将使 `netlify.toml` 保持同步。