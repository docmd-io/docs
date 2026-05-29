---
title: "Cloudflare Pages"
description: "使用全球边缘网络将 docmd 文档部署到 Cloudflare Pages。支持 CI/CD 自动构建。"
---

[Cloudflare Pages](https://pages.cloudflare.com/) 在 Cloudflare 的全球边缘网络上托管你的 docmd 站点，提供零配置 CI/CD。连接你的仓库，每次推送都会触发自动构建和部署。

## 控制台设置

1.  前往 [Cloudflare 控制台](https://dash.cloudflare.com/)，导航到 **Workers & Pages → Create → Pages**。
2.  连接你的 git 提供商（GitHub 或 GitLab）并选择你的仓库。
3.  配置构建设置：

    | 设置 | 值 |
    |---------|-------|
    | 框架预设 | `None` |
    | 构建命令 | `npx @docmd/core build` |
    | 构建输出目录 | `site` |

4.  点击 **Save and Deploy**。

Cloudflare Pages 会自动检测静态输出并将其分发到边缘网络。

## 自定义域名

在 **Pages → 你的项目 → Custom domains** 下添加自定义域名。Cloudflare 会自动配置 SSL 证书。

在 `docmd.config.json` 中设置 `url` 字段以匹配你的域名。这可确保规范标签、站点地图和 LLMs 插件生成正确的绝对 URL。

## CI/CD 注意事项

Cloudflare Pages 在每次推送到已连接分支时都会运行全新的 CI/CD 构建。你不需要单独的 GitHub Actions 工作流。Cloudflare 管理构建流水线。

::: callout info "为什么使用 `npx @docmd/core`？"
在未全局安装 docmd 的 CI/CD 环境中，`npx @docmd/core` 会直接获取并运行该包。如果你的项目将 `@docmd/core` 列为 `devDependency`，在 `npm install` 后运行 `npx @docmd/core build` 可以完美工作。
:::

## SPA 路由

docmd 将每个页面生成为独立的 `index.html`。直接访问 URL 无需任何重写规则即可工作。不需要额外的 Cloudflare 配置。