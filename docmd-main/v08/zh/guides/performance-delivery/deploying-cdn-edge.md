---
title: "CDN 与边缘部署"
description: "如何将静态文档部署到 CDN 或边缘网络，从而最小化全球访问延迟。"
---

## 问题

把文档托管在单一地理位置（例如美东）的单台服务器上，会给身处其他地区的用户带来明显的网络延迟。每一次页面加载、图片或脚本，都要跨越数千公里。对于全球受众，这会让您的文档站点感觉迟缓。

## 为什么重要

高延迟会直接损害开发者体验。即便您的文档写得很好、体积很轻，"首字节时间 (TTFB)" 仍受物理限制。若站点感觉慢，开发者的注意力就会涣散，或干脆转向更快的替代品。

## 方法

最优解是把站点部署到边缘 CDN。docmd 生成的是纯静态资源（HTML、CSS、JS），因此天然契合边缘分发。CDN 会把文件复制到全球分布的"边缘节点"，让用户从最近的数据中心加载内容。

## 实现

### 1. 选择平台

docmd 原生支持所有主流的静态托管与边缘平台。综合全球性能与易用性，我们推荐：
*   **Cloudflare Pages**：极快的全球边缘网络，内置 DDoS 防护。
*   **Vercel**：为性能优化，与开发工作流无缝衔接。
*   **Netlify**：强大的自动化能力与可靠的全球 CDN。

### 2. 自动化构建

使用 CI/CD 流水线，在每次推送时自动构建并部署站点。详细示例请参阅 [GitHub Actions 指南](../../guides/integrations/github-actions-cicd.md)。

```yaml ".github/workflows/deploy.yml"
# .github/workflows/deploy.yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      
      # 将站点构建到默认的 'site/' 目录
      - run: npm install && npx @docmd/core build
      
      # 示例：部署到 Cloudflare Pages
      - name: Deploy
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: my-docs
          directory: site
```

### 3. 验证

部署完成后，使用 PageSpeed Insights 或全球 ping 测试等工具验证全球性能。从全球几乎任何地点，您都应看到 100 ms 以内的响应时间。

## 取舍

全球边缘网络抽象了服务器管理，对文档团队非常友好。但调试区域性的缓存问题偶尔会比查看单一服务器日志更复杂。选择具备可靠"即时缓存失效"能力的平台，可确保用户在每次部署后立刻看到最新版本。