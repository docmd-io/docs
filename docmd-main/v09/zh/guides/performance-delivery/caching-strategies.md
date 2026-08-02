---
title: "缓存策略"
description: "如何借助不可变缓存、Etag 重新校验与生产就绪的服务器配置来优化文档站点的性能。"
---

## 问题

如果文档站点在响应中缺少恰当的 `Cache-Control` 头，浏览器会不必要地重新下载图片、CSS 与 JavaScript 包。这将导致视觉卡顿、带宽占用增加，并让回访用户的体验变差。

## 为什么重要

有效的缓存对"感知性能"影响巨大。把静态资源缓存在用户浏览器本地，可以省去重复网络请求的延迟。这能让导航感觉丝滑而稳定，即便在网络不稳的环境下也是如此。

## 方法

采用两层缓存策略：对静态资源（CSS、JS、图片）使用 **不可变缓存 (Immutable Caching)**；对动态内容（HTML、JSON）使用 **Etag 重新校验 (Etag Revalidation)**。docmd 会生成开箱即用的生产配置，自动处理缓存破坏（cache-busting）。

## 实现

### 1. 生产就绪的服务器配置

实现最优缓存的最简方式是使用 [Deploy 命令](../../deployment/index.md) 生成服务器配置。

```bash
# 生成经过优化的 Nginx 配置
npx @docmd/core deploy --nginx
```

### 2. 不可变资源

对于不常变化的资源（例如主题样式与核心脚本），使用长期缓存。docmd 会向这些资源追加版本哈希，确保只有当您真正更新文档时，用户才会下载新版本。

```nginx
# 不可变资源的 Nginx 示例规则
location ~* \.(?:css|js|webp|png|svg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

### 3. HTML 与导航的重新校验

HTML 文件与 `navigation.json` 应始终检查更新。这样能确保用户立刻看到最新内容。使用 `no-cache` 指令可强制浏览器通过 Etag 与服务器重新校验。

```nginx
# HTML 文件的 Nginx 示例规则
location ~* \.html$ {
    add_header Cache-Control "no-cache, must-revalidate";
}
```

## 取舍

### 内容陈旧 vs. 性能
为资源设置较长的缓存时间性能极佳，但需要可靠的"缓存破坏"策略。docmd 会为核心文件自动处理。如果您手动向 `static/` 目录添加资源，则必须在内容变化时更新其引用（例如修改文件名或追加查询参数）。

### CDN 集成
如果您使用了 CDN（例如 Cloudflare 或 AWS CloudFront），请确保它遵循您服务器发出的 `Cache-Control` 头。大多数现代 CDN 都提供"即时清理"功能。我们建议您在每次部署新版本时，由 CI/CD 流水线触发该清理。