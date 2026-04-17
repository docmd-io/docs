---
title: "部署"
description: "将 docmd 文档托管到 GitHub Pages、Vercel、Netlify 和 Cloudflare Pages 等平台。"
---

`docmd` 生成高性能静态网站，可托管在任何能提供 HTML 服务的环境中。只需运行构建命令，然后部署输出目录（默认为 `site/`）。

```bash
docmd build
```

## 托管平台

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

== tab "静态服务器"

适用于传统 Web 服务器（NGINX、Apache、IIS）：

1. 生成站点：`npx @docmd/core build`。
2. 通过 SFTP、SCP 或 CI/CD 工具将 `site/` 文件夹内容上传到服务器。
3. 确保服务器配置为对目录返回 `index.html`（大多数服务器的默认行为）。

== tab "Docker"

适用于容器化自托管环境的 Nginx Dockerfile：

```dockerfile
# 构建阶段
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npx @docmd/core build

# 服务阶段
FROM nginx:alpine
COPY --from=builder /app/site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

:::

## SPA 路由注意事项

`docmd` 实现了微型 SPA 路由器，可平滑处理内部导航。与基于 React 的 SPA 不同，`docmd` 中的每个页面都作为独立的 `index.html` 文件生成在文件系统上，因此：

- **无需重写规则**：大多数平台上无需为服务器配置 `index.html` 重写规则。
- **深层链接**：直接访问 `/guide/setup` 等 URL 开箱即用，因为服务器能找到 `/guide/setup/index.html`。

## 生产部署检查清单

1. **站点 URL**：确保在 `docmd.config.js` 中设置了 `url` 属性。这对生成正确的规范标签、站点地图和社交预览图至关重要。
2. **重定向**：如果从其他工具迁移，使用 `redirects` 配置维护 SEO 排名。
3. **统计分析**：启用 `analytics` 插件追踪用户行为和搜索查询。
4. **AI 接入**：启用 `llms` 插件生成 `llms.txt`，让 AI Agent 更高效地摄取你的文档内容。

::: callout tip "自定义 404 页面"
`docmd` 会在输出目录中自动生成 `404.html`。大多数托管服务（GitHub Pages、Netlify、Vercel）会在用户访问到缺失路由时自动使用该文件。
:::