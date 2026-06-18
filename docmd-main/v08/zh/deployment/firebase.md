---
title: "Firebase Hosting"
description: "将 docmd 文档部署到 Firebase Hosting。手动或通过 GitHub Actions 均可。"
---

[Firebase Hosting](https://firebase.google.com/products/hosting) 通过全球 CDN 提供您的 docmd 静态站点，包含 SSL。它可以通过 Firebase CLI 或 GitHub Actions 干净地集成到 CI/CD 流水线中。

## 先决条件

安装 Firebase CLI：

```bash
npm install -g firebase-tools
firebase login
```

## 设置

1.  构建您的站点：

    ```bash
    npx @docmd/core build
    ```

2.  在项目根目录初始化 Firebase Hosting：

    ```bash
    firebase init hosting
    ```

    出现提示时：
    - 选择您的 Firebase 项目（或创建一个新项目）。
    - 将 **public 目录** 设置为 `site`。
    - 配置为单页应用：**否**（docmd 为每个页面生成单独的 `index.html` 文件。无需 catch-all 重写）。
    - 不要覆盖 `site/index.html`。

3.  部署：

    ```bash
    firebase deploy --only hosting
    ```

## 通过 GitHub Actions 实现 CI/CD

要在每次推送时自动部署，请创建 `.github/workflows/firebase.yml`：

```yaml ".github/workflows/firebase.yml"
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm install
      - run: npx @docmd/core build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
```

在您仓库的 **Settings → Secrets** 中使用 Firebase 服务账号 JSON 密钥设置 `FIREBASE_SERVICE_ACCOUNT`。

::: callout info "为什么使用 `npx @docmd/core`？"
在未全局安装 docmd 的 CI/CD 环境中，`npx @docmd/core` 会直接获取并运行该软件包。如果您的项目将 `@docmd/core` 列为 `devDependency`，则在 `npm install` 后运行 `npx @docmd/core build` 即可完美工作。
:::

## 自定义域名

在 Firebase 控制台中的 **Hosting → Add custom domain** 下添加自定义域名。Firebase 自动配置 SSL。

将 `docmd.config.json` 中的 `url` 字段设置为与您的域名匹配。这确保规范标签和 sitemap 生成正确的绝对 URL。
