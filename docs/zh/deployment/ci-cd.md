---
title: "CI/CD 流水线"
description: "使用 CI/CD 流水线自动化文档构建与部署，适用于 GitHub Pages、Vercel、Netlify 等。"
---

使用 CI/CD 工作流，每次推送更改时自动构建和部署你的 `docmd` 站点。以下是主流云平台的即用型配置。

## 云平台

::: tabs

== tab "GitHub Pages"

推荐使用 **GitHub Actions** 在每次推送时自动部署。

**创建 `.github/workflows/deploy.yml`：**

```yaml
name: Deploy docmd
on:
  push:
    branches: ["main"]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npx @docmd/core build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./site }
      - uses: actions/deploy-pages@v4
```

== tab "Vercel"

1. 将你的仓库连接到 Vercel。
2. 在项目 **构建设置** 中：
   - **框架预设**：`Other`
   - **构建命令**：`npx @docmd/core build`
   - **输出目录**：`site`
3. 部署。Vercel 会自动检测静态输出并全球分发。

== tab "Netlify"

1. 从 GitHub/GitLab/Bitbucket 导入你的项目。
2. 配置构建设置：
   - **构建命令**：`npx @docmd/core build`
   - **发布目录**：`site`
3. 点击 **部署站点**。Netlify CDN 将自动处理路由和资源分发。

== tab "Cloudflare Pages"

1. 在 Cloudflare 控制台的 **Pages** 下创建新项目。
2. 连接 Git 提供商并选择你的仓库。
3. 配置构建设置：
   - **框架预设**：`None`
   - **构建命令**：`npx @docmd/core build`
   - **构建输出目录**：`site`
4. 保存并部署。

== tab "Firebase"

1. 安装 Firebase CLI：`npm install -g firebase-tools`。
2. 构建站点：`npx @docmd/core build`。
3. 运行 `firebase init hosting` 并选择你的项目。
4. 将公共目录设置为 `site`。
5. 配置为单页应用：`Yes`（处理 404 行为）。
6. 使用 `firebase deploy` 部署。

:::

::: callout info "为什么使用 npx @docmd/core？"
在未全局安装 `docmd` 的 CI/CD 环境中，使用 `npx @docmd/core` 直接运行作用域包。如果你的项目已将 `@docmd/core` 列为 `devDependency`，则在 `npm install` 后直接使用 `docmd build` 也可以。
:::

## 手动 / 静态服务器

适用于传统 Web 服务器（NGINX、Apache、IIS）：

1. 生成站点：`npx @docmd/core build`。
2. 通过 SFTP、SCP 或你偏好的部署工具将 `site/` 文件夹内容上传到服务器。
3. 确保服务器配置为对目录返回 `index.html`（大多数服务器的默认行为）。

对于 Docker、NGINX 或 Caddy 等自托管环境，请参阅专用的[部署指南](./docker)。
