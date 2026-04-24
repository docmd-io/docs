---
title: "GitHub Actions CI/CD"
description: "如何使用 GitHub Actions 和 docmd 自动化您的文档构建和部署，以实现高效的文档工作流。"
---

## 问题

从本地机器手动构建和部署文档容易出错，且存在环境不一致（例如 Node.js 版本不同）和安全风险。此外，这还会造成瓶颈，因为部署取决于单个人员的可用性和本地设置。

## 为什么重要

持续部署 (CD) 可确保您的文档始终与软件同步。当技术更新被合并时，它应该在几分钟内（而不是几天）到达用户手中。自动化保证了每次构建都在干净、可重复的环境中进行，从而保持了高质量和高可靠性的标准。

## 方法

利用 GitHub Actions 在每次推送或拉取请求 (Pull Request) 时运行 `docmd` 构建流水线。生成的静态资产随后可以自动部署到 GitHub Pages、Cloudflare Pages 等托管提供商，或使用 Docker 部署到容器化环境中。

## 实施

### 1. 标准 GitHub Pages 工作流

创建 `.github/workflows/docs.yml` 以自动化构建和部署过程。

```yaml
name: 部署文档
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
      
      # 将站点构建到 'site/' 目录中
      - run: npx docmd build

      - name: 上传产物
        uses: actions/upload-pages-artifact@v3
        with:
          path: site/

      - name: 部署到 GitHub Pages
        uses: actions/deploy-pages@v4
```

### 2. 容器化部署 (Docker)

如果您自行托管文档，请使用 [部署命令](../../deployment) 生成生产级 `Dockerfile` 和服务器配置。

```bash
# 在本地生成 Docker 和 Nginx 配置
npx docmd deploy --docker --nginx
```

随后，您可以更新 GitHub Action，以便在发布新版本时构建此 Docker 镜像并将其推送到注册表（如 Docker Hub 或 GitHub Container Registry）。

### 3. 拉取请求预览

通过为每个拉取请求生成临时的预览环境来增强您的工作流。这允许审查人员在更改合并到主分支之前查看渲染后的文档。有关更多详细信息，请参阅 [预览更改指南](../workflows-teams/previewing-changes)。

## 权衡

自动化的 CI/CD 需要初始设置时间并需要管理机密（如 API 令牌）。然而，从长远来看，“无需干预”的部署过程带来的好处——包括减少人为错误和缩短更新周期——远超初始投入。对于大型站点，请确保您的工作流仅在文档目录中的文件发生更改时才触发，以节省 CI 额度。
