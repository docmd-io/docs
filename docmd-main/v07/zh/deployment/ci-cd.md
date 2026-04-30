---
title: "CI/CD 流水线"
description: "通过 GitHub Pages、Vercel、Netlify 等 CI/CD 流水线自动化文档的构建与部署。"
---

使用 CI/CD 工作流，在每次推送更改时自动构建并部署你的 `docmd` 站点。以下是常用云平台的即插即用配置。

## 云平台

::: tabs

== tab "GitHub Pages"

推荐的方法是使用 **GitHub Actions** 在每次推送时自动化部署。

**创建 `.github/workflows/deploy.yml`:**

```yaml
name: 部署 docmd
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

1. 将你的存储库连接到 Vercel。
2. 在项目 **Build Settings** 中：
    - **Framework Preset**: `Other`
    - **Build Command**: `npx @docmd/core build`
    - **Output Directory**: `site`
3. 部署。Vercel 会自动检测静态输出并进行全球分发。

== tab "Netlify"

1. 从 GitHub/GitLab/Bitbucket 导入你的项目。
2. 配置构建设置：
    - **Build command**: `npx @docmd/core build`
    - **Publish directory**: `site`
3. 点击 **Deploy site**。Netlify 的 CDN 将处理路由和资源分发。

== tab "Cloudflare Pages"

1. 在 Cloudflare 控制面板的 **Pages** 下创建一个新项目。
2. 连接你的 git 提供商并选择你的存储库。
3. 配置构建设置：
    - **Framework preset**: `None`
    - **Build command**: `npx @docmd/core build`
    - **Build output directory**: `site`
4. 保存并部署。

== tab "Firebase"

1. 安装 Firebase CLI: `npm install -g firebase-tools`。
2. 构建你的站点: `npx @docmd/core build`。
3. 运行 `firebase init hosting` 并选择你的项目。
4. 将公共目录设置为 `site`。
5. 配置为单页面应用: `Yes`（这会处理 404 行为）。
6. 使用 `firebase deploy` 进行部署。

:::

::: callout info "为什么使用 npx @docmd/core?"
在未全局安装 `docmd` 的 CI/CD 环境中，使用 `npx @docmd/core` 直接运行作用域包。如果你的项目已将 `@docmd/core` 列为 `devDependency`，那么在 `npm install` 之后直接使用 `docmd build` 同样有效。
:::

## 手动 / 静态服务器

对于传统的 Web 服务器（Apache、IIS 等）：

1. 生成站点: `npx @docmd/core build`。
2. 通过 SFTP、SCP 或你喜欢的部署工具将 `site/` 文件夹的内容上传到你的服务器。
3. 确保你的服务器配置为对目录提供 `index.html`（大多数服务器的默认设置）。
