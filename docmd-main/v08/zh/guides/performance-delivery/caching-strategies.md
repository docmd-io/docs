---
title: "缓存策略"
description: "如何使用不可变缓存、Etag 重新验证和生产级服务器配置来优化您的文档网站性能。"
---

## 问题

如果文档网站在提供服务时没有适当的缓存控制 (cache-control) 响应头，浏览器将在每次访问时非必要地重新下载图像、CSS 和 JavaScript 包。这会导致视觉卡顿、带宽消耗增加，并给期望文档能瞬间加载的重复访问用户带来糟糕的体验。

## 为什么重要

有效的缓存是提高网站“感知性能”最有效的方法之一。通过确保静态资产存储在用户的浏览器本地，您可以消除重复网络请求带来的延迟。这使您的文档导航感觉更加流畅和可靠，即使在不稳定的网络连接下也是如此。

## 方法

实施两级缓存策略：针对静态资产（CSS、JS、图像）的 **不可变缓存 (Immutable Caching)**，以及针对动态内容（HTML、JSON）的 **Etag 重新验证**。`docmd` 通过生成生产级配置来简化此过程，这些配置通过版本哈希自动处理缓存失效。

## 实施

### 1. 生产级服务器配置

实施最佳缓存的最简单方法是使用 [部署命令](../../deployment) 生成您的服务器配置。

```bash
# 生成经过优化的 Nginx 配置
npx @docmd/core deploy --nginx
```

### 2. 不可变资产

对于不经常更改的资产（如主题样式和核心脚本），请使用长期缓存。`docmd` 会为这些资产附加版本哈希，以确保用户仅在您更新文档时才下载新版本。

```nginx
# 不可变资产的 Nginx 规则示例
location ~* \.(?:css|js|webp|png|svg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

### 3. HTML 与导航重新验证

您的 HTML 文件和 `navigation.json` 应始终检查更新，以确保用户能立即看到最新的内容和结构。使用 `no-cache` 指令强制浏览器使用 Etag 与服务器进行重新验证。

```nginx
# HTML 文件的 Nginx 规则示例
location ~* \.html$ {
    add_header Cache-Control "no-cache, must-revalidate";
}
```

## 权衡

### 过时内容 vs 性能
为资产设置较长的缓存时间可以获得极高的性能，但需要稳健的“缓存失效”策略。`docmd` 会为其核心文件自动处理此问题，但如果您手动向 `static/` 目录添加资产，则必须确保在内容更改时更新其引用（例如通过更改文件名或添加查询参数）。

### CDN 集成
如果您正在使用 CDN（如 Cloudflare 或 AWS CloudFront），请确保其配置为遵循服务器的 `Cache-Control` 响应头。大多数现代 CDN 提供“即时刷新”功能，我们建议将其作为 CI/CD 流水线的一部分，在每次部署新版本文档时触发。
