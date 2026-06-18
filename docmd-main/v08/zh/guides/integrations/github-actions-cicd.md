---
title: "GitHub Actions CI/CD"
description: "如何借助 GitHub Actions 与 docmd，自动化文档的构建与部署，实现高速工作流。"
---

## 问题

从本地机器手工构建与部署文档容易出错，且会引入环境不一致与安全风险。每次部署都依赖某个人的可用性，很快就会形成瓶颈。

## 为什么重要

持续部署 (CD) 能保证文档始终与软件保持同步：技术更新一旦合并，分钟之内就能触达用户。自动化让每一次构建都发生在干净、可复现的环境里，从而保障质量与稳定性。

## 方法

使用 GitHub Actions 在每次推送或 Pull Request 时运行 docmd 构建流水线。生成的静态资源随后可自动部署到 GitHub Pages、Cloudflare Pages 这类托管服务，或借助 Docker 部署到容器化环境中。

## 实现

### 1. 标准的 GitHub Pages 工作流

创建 `.github/workflows/docs.yml` 以自动化构建与部署流程。

```yaml ".github/workflows/docs.yml"
name: Deploy Docs
on:
  push:
    branches: [main]

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
        with:
          node-version: 22
          cache: 'npm'

      - run: npm install
      
      # 将站点构建到 'site/' 目录
      - run: npx @docmd/core build

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: site/

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### 2. 容器化部署 (Docker)

如果您自行托管文档，可使用 [Deploy 命令](../../deployment/index.md) 生成一份生产就绪的 `Dockerfile` 与服务器配置。

```bash
# 在本地生成 Docker 与 Nginx 配置
npx @docmd/core deploy --docker --nginx
```

您可以在 GitHub Action 中扩展：每当发布新版本时，把这个 Docker 镜像构建并推送到 Docker Hub 或 GitHub Container Registry 这类镜像仓库。

### 3. Pull Request 预览

进一步丰富您的工作流：为每个 Pull Request 生成临时预览环境，使评审者能在合并到 main 之前看到文档的渲染效果。详情可参阅 [预览变更指南](../workflows-teams/previewing-changes.md)。

## 取舍

自动化的 CI/CD 需要前期搭建，并妥善保管密钥（例如 API Token）。但"零接触"的部署流程带来的长期收益 —— 更少的人为错误、更短的更新周期 —— 远远超过初始投入。对于大型站点，请让工作流仅在文档目录里的文件发生变更时才触发，以节省 CI 分钟数。