---
title: "Analytics 插件"
description: "集成 Google Analytics 4 或旧版 Universal Analytics，并自动跟踪用户交互。"
---

`@docmd/plugin-analytics` 插件让您可以轻松地将 Google Analytics 集成到您的文档中。它支持现代的 Google Analytics 4 (GA4) 标准、旧版的 Universal Analytics (UA)，并针对交互密集型文档站点提供原生事件跟踪。

## 配置

通过将您的跟踪凭证添加到 `docmd.config.json` 的 `plugins` 部分来启用 analytics。

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `googleV4` | `object` | `null` | Google Analytics 4 配置（需要 `measurementId`）。 |
| `googleUA` | `object` | `null` | Universal Analytics 配置（需要 `trackingId`）。 |
| `autoEvents` | `boolean` | `true` | 自动跟踪点击、下载和目录交互。 |
| `trackSearch` | `boolean` | `true` | 跟踪读者使用的搜索关键词。 |

### 示例

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

## 跟踪的事件

启用 `autoEvents` 后，插件会自动捕获以下交互：

- **外部链接**：对其他域的出站点击。
- **下载**：对带有 `download` 属性或常见文件扩展名的链接的点击。
- **目录点击**：通过右侧导航进行的章节互动。
- **标题锚点**：对各小节永久链接的点击。
- **搜索查询**：在搜索栏中输入的关键词（防抖 1 秒）。

::: callout info "隐私与 GDPR"
默认情况下，此插件不会对 IP 地址进行匿名化处理，因为 GA4 现在已原生处理该问题。如果您需要高级 Cookie 同意管理，可以通过自定义插件 hook 手动注入脚本。
:::
