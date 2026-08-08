---
title: "Analytics 插件"
description: "集成 Google Analytics 4 或旧版 Universal Analytics，并自动跟踪用户交互。"
---

`@docmd/plugin-analytics` 插件将 Google Analytics 跟踪脚本集成到您的文档页面中。它支持 Google Analytics 4 (GA4) 和旧版 Universal Analytics (UA)，针对技术文档门户提供自动化的交互跟踪。

## 配置选项

在 `docmd.config.json` 中配置分析跟踪 ID：

| 选项 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `googleV4` | `object` | `null` | Google Analytics 4 配置对象（需要 `measurementId`）。 |
| `googleUA` | `object` | `null` | Universal Analytics 配置对象（需要 `trackingId`）。 |
| `autoEvents` | `boolean` | `true` | 自动跟踪出站链接、文件下载、锚点点击和右侧 TOC 目录导航。 |
| `trackSearch` | `boolean` | `true` | 自动捕获在搜索模态框中输入的搜索关键词。 |

### 全局分析配置示例

```json "docmd.config.json"
{
  "plugins": {
    "analytics": {
      "googleV4": {
        "measurementId": "G-XXXXXXX"
      },
      "autoEvents": true,
      "trackSearch": true
    }
  }
}
```

## 自动跟踪的事件

当 `autoEvents` 设置为 `true` 时，分析插件无需额外自定义脚本即可捕获以下用户交互：

* **外部出站链接**: 点击导航至外部域名目标的链接。
* **文件下载**: 点击包含 `download` 属性或常见二进制扩展名（`.zip`、`.pdf`、`.gz`）的资源。
* **目录 (TOC) 互动**: 使用右侧 TOC 面板进行的导航跳转。
* **章节标题锚点**: 点击标题永久链接锚点。
* **搜索关键词**: 在搜索模态框中输入的搜索关键词（防抖 1 秒）。

::: callout info "隐私与数据保护" icon:shield-check
Google Analytics 4 原生处理 IP 匿名化。如果您的组织需要显式的 Cookie 同意横幅或 GDPR opt-in 控制，可通过自定义插件钩子注入自定义脚本。
:::