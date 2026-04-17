---
title: "Analytics 插件"
description: "集成 Google Analytics 4 或旧版 Universal Analytics，自动追踪用户交互行为。"
---

`@docmd/plugin-analytics` 插件可将 Google Analytics 无缝集成到你的文档中。它支持现代 Google Analytics 4 (GA4)、旧版 Universal Analytics (UA)，并内置针对交互弹性文档展示的原生事件追踪功能。

## 配置

将下方的跟踪凭据添加到 `docmd.config.js` 的 `plugins` 部分即可启用分析功能。

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    analytics: {
      // 1. Google Analytics 4 (Recommended)
      googleV4: { 
        measurementId: 'G-XXXXXXX' 
      },

      // 2. Legacy Universal Analytics
      googleUA: { 
        trackingId: 'UA-XXXXXXX-X' 
      },

      // 3. Behavioural Tracking Settings
      autoEvents: true,  // Track clicks, downloads, and TOC interactions
      trackSearch: true  // Track search keywords used by readers
    }
  }
});
```

## 已追踪事件

当 `autoEvents` 启用时，插件会自动捕获以下用户交互并发送给你的分析提供商：

*   **外部链接**：追踪用户离开至外部资源。
*   **文件下载**：自动记录带 `download` 属性或常见文件扩展名（`.pdf`、`.zip`、`.tar` 等）的链接点击。
*   **目录（TOC）**：通过追踪右侧导航栏中的点击，监控哪些章节最受关注。
*   **标题锚点**：记录用户点击"固定链接"（标题锚点）以分享特定章节。
*   **搜索查询**：当 `trackSearch` 启用时，关键词会被捕获（带 1 秒防抖），帮助你了解用户正在寻找什么。

## 技术细节

插件将必要的追踪脚本注入每个页面的 `<head>` 中。事件监听器通过高效的事件委托绑定到 `<body>`，确保对页面加载性能和 SPA 切换的零影响。

::: callout info "隐私与 GDPR"
默认情况下，此插件不匿名处理 IP 地址，因为这现在由 GA4 原生处理。如果需要高级 Cookie 同意管理，可以使用 `customCss` 或自定义插件钩子手动注入你的同意管理脚本。
:::
