---
title: "Firebase Hosting"
description: "将 docmd 文档部署到 Firebase Hosting。支持手动部署或通过 GitHub Actions 部署。"
---

[Firebase Hosting](https://firebase.google.com/products/hosting) 通过全球 CDN 提供你的 docmd 静态站点，并包含 SSL。它可通过 Firebase CLI 或 GitHub Actions 完美集成到 CI/CD 流水线中。

## 前提条件

安装 Firebase CLI：

```bash
npm install -g firebase-tools
firebase login
```

## 设置

1.  构建你的站点：

    ```bash
    npx @docmd/core build
    ```

2.  在项目根目录中初始化 Firebase Hosting：

    ```bash
    firebase init hosting
    ```

    当提示时：
    - 选择你的 Firebase 项目（或创建一个新项目）。
    - 将 **public directory** 设置为 `site`。
    - 配置为单页应用：**No**（docmd 为每个页面生成独立的 `index.html` 文件。不需要全局重写）。
    - 不要覆盖 `site/index.html`。

3.  部署：

    ```bash
    firebase deploy --only hosting
    ```

## 使用 GitHub Actions 进行 CI/CD

要在每次推送时自动部署，创建 `.github/workflows/firebase.yml`：

```yaml
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

在仓库的 **Settings → Secrets** 中使用 Firebase 服务账户 JSON 密钥设置 `FIREBASE_SERVICE_ACCOUNT`。

::: callout info "为什么使用 `npx @docmd/core`？"
在未全局安装 docmd 的 CI/CD 环境中，`npx @docmd/core` 会直接获取并运行该包。如果你的项目将 `@docmd/core` 列为 `devDependency`，在 `npm install` 后运行 `npx @docmd/core build` 可以完美工作。
:::

## 自定义域名

在 Firebase 控制台的 **Hosting → Add custom domain** 下添加自定义域名。Firebase 会自动配置 SSL。

在 `docmd.config.json` 中设置 `url` 字段以匹配你的域名。这可确保规范标签和站点地图生成正确的绝对 URL。