---
title: "PWA 与离线支持"
description: "将文档转化为渐进式 Web 应用，支持离线缓存和移动端特性。"
---

`@docmd/plugin-pwa` 插件为你的文档网站开启渐进式 Web 应用（PWA）功能。它添加 Web Manifest 以支持移动端安装，并注册 Service Worker 处理智能离线缓存，确保技术文档即使在网络不稳定的环境下仍可访问。

## 配置

可在 `docmd.config.js` 的 `plugins` 部分自定义 PWA 插件的品牌配置。

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    pwa: {
      enabled: true,           // Enabled by default if the plugin is loaded
      themeColor: '#1e293b',   // The primary color of the mobile UI
      bgColor: '#ffffff',      // Background color for the splash screen
      logo: '/assets/logo.png' // Fallback for app icons if not explicitly defined
    }
  }
});
```

## 核心功能

### 1. 离线缓存
插件会自动生成实现“旧数据优先更新”（Stale-While-Revalidate）缓存策略的 `service-worker.js` 文件。用户访问页面时，Service Worker 将：
*   立即返回缓存版本以实现最大速度。
*   在后台从网络获取最新版本。
*   为下次访问更新缓存。

### 2. 移动端安装

通过生成 `manifest.webmanifest` 并注入所需的 `<meta>` 标签，插件允许用户在 iOS 和 Android 上“添加到主屏幕”。你的文档将表现得像一个独立应用，拥有自己的启动画面和窗口框架。

### 3. 智能资源解析
插件会通过查找项目的 `logo` 或 `favicon` 自动生成应用图标。如需更多控制，可提供明确的 `icons` 数组：

```javascript
pwa: {
  icons: [
    { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
  ]
}
```

## 技术实现

Service Worker 将与单页应用（SPA）路由兼容地设计。它包含针对 Safari 严格安全策略（涉及重定向流）的安全防护逻辑，确保在所有现代浏览器上的稳定性。

::: callout tip "开发模式"
在本地开发（`docmd dev`）中，Service Worker 通常会被禁用或绕过，以防止积极缓存干扰你的编辑。如需测试 PWA 功能，请使用 `docmd build` 执行生产构建，并使用静态托管服务输出目录。
:::

### 完全移除

只需删除 `plugins` 中的 `pwa` 块即可。下次运行 `docmd build` 时不会生成新的 manifest。当用户访问站点时，docmd 的客户端引导程序（`docmd-main.js`）会检查 `<link rel="manifest">` 的存在。如果它不存在但 Service Worker 已注册，将自动**注销所有现存考古 Worker** 并清除缓存外壳——无需用户操作。

::: callout warning
上次构建产生的 `manifest.webmanifest` 和 `service-worker.js` 文件会在磁盘上持久存在，直到你使用 `docmd build` 或 `rm -rf site` 清除输出目录（默认为 `site/`）为止。这是文件系统残留物，不是活跃的 PWA。
:::

## 配置参考

所有字段均为可选。默认值设计为零配置即用。

```javascript
export default {
  plugins: {
    pwa: {
      // --- 图标配置 ---
      // 优先级：pwa.logo > config.logo > config.favicon > （无图标）
      logo: 'assets/images/app-icon.png', // 相对于源文件夹的路径

      // 或者完全手动控制：
      icons: [
        { src: '/assets/images/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/images/icon-512.png', sizes: '512x512', type: 'image/png' }
      ],

      // --- Manifest 颜色 ---
      themeColor: '#1e293b',  // 浏览器外框 / 顶栏高亮色
      bgColor: '#ffffff',     // 安装时启动画面背景色

      // --- 完全禁用插件 ---
      enabled: false
    }
  }
}
```

### 图标解析优先级

docmd 按以下层级解析 PWA 图标：

1. `pwa.icons` — 手动数组，直接使用
2. `pwa.logo` — 单一图片路径，用于 192x192 和 512x512 条目
3. `config.logo` — 全局站点 logo
4. `config.favicon` — 全局 favicon
5. *（manifest 中未声明图标）* — 以上均未设置时

## 本地测试

浏览器将 Service Worker 限制在 `https://` 或 `localhost`。使用：

```bash
docmd dev
```

打开 Chrome DevTools → **Application** → **Manifest** 和 **Service Workers**，即可实时查看已激活的注册信息。

Safari → **Develop** → **Service Workers** 面板同样适用。