---
title: "Cloudflare Pages"
description: "使用 Cloudflare 的全球边缘网络部署您的 docmd 文档。CI/CD 就绪，自动构建。"
---

[Cloudflare Pages](https://pages.cloudflare.com/) 在 Cloudflare 的全球边缘网络上托管您的 docmd 站点，具有零配置 CI/CD。连接您的仓库，每次推送都会自动触发构建和部署。

## 控制台设置

1.  转到 [Cloudflare 控制台](https://dash.cloudflare.com/) 并导航至 **Workers & Pages → Create → Pages**。
2.  连接您的 git 提供商（GitHub 或 GitLab）并选择您的仓库。
3.  配置构建设置：

    | 设置 | 值 |
    |---------|-------|
    | Framework preset | `None` |
    | Build command | `npx @docmd/core build` |
    | Build output directory | `site` |

4.  点击 **Save and Deploy**。

Cloudflare Pages 检测静态输出并自动将其分发到其边缘网络。

## 自定义域名

在 **Pages → your project → Custom domains** 下添加自定义域名。Cloudflare 自动配置 SSL 证书。

将 `docmd.config.json` 中的 `url` 字段设置为与您的域名匹配。这确保规范标签、sitemap 和 LLMs 插件生成正确的绝对 URL。

## CI/CD 注意事项

Cloudflare Pages 在每次推送到连接分支时运行全新的 CI/CD 构建。您不需要单独的 GitHub Actions 工作流。Cloudflare 管理构建流水线。

::: callout info "为什么使用 `npx @docmd/core`？"
在未全局安装 docmd 的 CI/CD 环境中，`npx @docmd/core` 会直接获取并运行该软件包。如果您的项目将 `@docmd/core` 列为 `devDependency`，则在 `npm install` 后运行 `npx @docmd/core build` 即可完美工作。
:::

## SPA 路由

docmd 将每个页面生成为其自己的 `index.html`。直接 URL 访问无需任何重写规则。无需额外的 Cloudflare 配置。