---
title: "CDN 与边缘网络部署"
description: "如何通过将您的静态文档部署到内容分发网络 (CDN) 或边缘网络来最小化全球延迟。"
---

## 问题

将您的文档托管在一个地理区域（例如美国东部）的单一服务器上，意味着世界其他地区（例如欧洲或亚洲）的用户将体验到显著的网络延迟。每次页面加载、图像和脚本都必须跨越数千英里，这使您的文档在全球观众看来显得迟钝且无响应。

## 为什么重要

高延迟直接损害开发者体验。即使您的文档写得很好且很轻量，“首字节时间 (TTFB)”也会受到物理定律的限制。如果您的网站感觉很慢，开发者更有可能失去焦点，或者完全放弃您的工具，转而使用文档更快速、更易于访问的工具。

## 方法

最佳解决方案是将您的网站部署到边缘 CDN。由于 `docmd` 生成的是纯静态资产（HTML、CSS、JS），它非常适合边缘分发。CDN 会将您的文件复制到数百个全球分布的“边缘节点”，从距离用户最近的数据中心为他们提供服务。

## 实施

### 1. 选择平台

`docmd` 原生兼容所有现代静态托管和边缘平台。我们推荐以下平台，因为它们具有出色的全球性能和易用性：
*   **Cloudflare Pages**：极速的全球边缘网络，内置 DDoS 防护。
*   **Vercel**：针对性能进行了优化，具有出色的开发工作流集成。
*   **Netlify**：强大的自动化功能和稳健的全球 CDN。

### 2. 自动化构建

使用 CI/CD 流水线，在您推送更改时自动构建并部署您的网站。有关详细示例，请参阅 [GitHub Actions 指南](../../guides/integrations/github-actions-cicd)。

```yaml
# .github/workflows/deploy.yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      
      # 将站点构建到默认的 'site/' 目录中
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

部署完成后，您可以使用 PageSpeed Insights 或全球 Ping 测试等工具验证您的全球性能。您应该会看到来自世界各地几乎任何位置的亚秒级响应时间。

## 权衡

全球边缘网络抽象了服务器管理，这对于文档团队来说是一个主要优势。然而，调试区域性缓存问题偶尔会比查看单一服务器日志更复杂。使用具有强大“即时缓存失效”功能的平台，可确保您的用户在部署后立即看到文档的最新版本。
