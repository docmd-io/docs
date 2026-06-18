---
title: "PWA 与离线支持"
description: "通过离线缓存与移动优先特性，将您的文档转变为渐进式 Web 应用。"
---

`@docmd/plugin-pwa` 插件将您的文档转变为渐进式 Web 应用。它会写入一个用于移动安装的 web manifest，并注册一个用于离线阅读缓存页面的 service worker。

## 配置

在 `docmd.config.json` 的 `plugins` 部分自定义您的应用品牌。

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | 启用或禁用 PWA manifest 与 service worker 生成。 |
| `themeColor` | `string` | `'#1e293b'` | 移动 UI 浏览器 chrome 的主色。 |
| `bgColor` | `string` | `'#ffffff'` | 安装过程中启动画面的背景色。 |
| `logo` | `string` | `null` | 应用图标的路径（相对于项目源）。 |

### 示例

```json "docmd.config.json"
{
  "plugins": {
    "pwa": {
      "themeColor": "#1e293b",
      "bgColor": "#ffffff",
      "logo": "assets/app-icon.png"
    }
  }
}
```

## 功能

- **离线缓存**：stale-while-revalidate 策略。页面从缓存加载，然后在后台刷新。
- **可安装**：发出 `manifest.webmanifest`，以便用户可以将其安装到 iOS 和 Android 主屏幕。
- **自动图标**：如果没有提供显式图标，则从您的项目 logo 或 favicon 派生 PWA 图标。
- **对 SPA 友好**：与 SPA 路由器和标准目录路由配合使用。

## 图标解析优先级

插件根据以下优先级解析您的 PWA 图标：

1. `pwa.icons` - 配置中的显式数组。
2. `pwa.logo` - 相对于源的路径。
3. `config.logo` - 全局站点 logo。
4. `config.favicon` - 全局 favicon。

::: callout tip "测试 PWA 功能"
Service worker 在 `npx @docmd/core dev` 中会被绕过，以防止编辑期间出现缓存问题。要测试 PWA 功能，请运行 `npx @docmd/core build` 并使用静态主机为 `site/` 目录提供服务。
:::
