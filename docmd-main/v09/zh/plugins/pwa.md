---
title: "PWA 与离线支持"
description: "通过离线缓存与移动优先特性，将您的文档转变为渐进式 Web 应用。"
---

`@docmd/plugin-pwa` 插件将您的文档网站转变为可安装的渐进式 Web 应用 (PWA)。它生成 W3C Web 应用清单 (`manifest.webmanifest`) 并注册 Service Worker 用于离线缓存和移动平台安装。

## 配置选项

在 `docmd.config.json` 中配置 PWA 属性：

| 选项 | 类型 | 默认值 | 技术描述 |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | 启用或禁用 PWA 清单与 Service Worker 编译。 |
| `themeColor` | `string` | `'#1e293b'` | 浏览器 UI Header 的主题颜色。 |
| `bgColor` | `string` | `'#ffffff'` | 安装启动页面的背景颜色。 |
| `logo` | `string` | `null` | 应用图标路径（相对于文档源码根目录）。 |

### 全局配置示例

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

## 核心能力

* **离线 Service Worker**: 实现 stale-while-revalidate 缓存策略。页面从本地缓存即时加载，同时在后台检查网络更新。
* **主屏幕安装**: 输出有效的清单元数据，允许用户在 iOS、Android、macOS 和 Windows 上将文档站点固定安装至桌面或主屏幕。
* **资源尺寸调整**: 自动从主站点 Brand Logo 派生并生成所需的 PWA 图标尺寸（192x192、512x512）。

## 图标解析优先级

PWA 插件按自顶向下的顺序评估图标路径：

1. `plugins.pwa.icons` — 在配置中定义的显式图标数组。
2. `plugins.pwa.logo` — 插件专用的图标路径。
3. `config.logo` — 全局站点 Logo 路径。
4. `config.favicon` — 全局站点 Favicon 路径。

::: callout tip "测试离线功能" icon:smartphone
在本地开发期间（`npx @docmd/core dev`），Service Worker 注册会被绕过，以防止缓存资源干扰实时编辑。若要测试 PWA 特性，请构建站点（`npx @docmd/core build`）并通过 HTTPS 或 localhost 托管输出目录（`site/`）。
:::