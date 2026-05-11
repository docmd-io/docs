---
title: "配置概览"
description: "配置 docmd.config.js 的架构、品牌、布局与引擎功能。"
---

`docmd.config.js` 文件是你文档项目的核心配置中心，控制网站结构、品牌呈现、界面行为以及引擎级蓉处理规则。

## 配置文件

推荐使用 `@docmd/core` 提供的 `defineConfig` 辅助函数，它将提供完整的 IDE 自动补全和类型检查功能，让你轻松了解所有可用配置项。

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  title: 'My Project',
  url: 'https://docs.myproject.com',
  // ... 配置项
});
```

## 核心配置项

`docmd` 采用简洁的配置架构。下表列出了主要顶层配置项：

| 键名 | 说明 | 默认值 |
| :--- | :--- | :--- |
| `title` | 文档网站名称，显示在头部和浏览器标题中 | `Documentation` |
| `url` | 生产环境基础 URL，对 SEO、站点地图和 OpenGraph 至关重要 | `null` |
| `src` | Markdown 文件目录的相对路径 | `docs` |
| `out` | 静态网站输出目录的相对路径 | `site` |
| `base` | 如果托管在子目录下的基础路径（如 `/docs/`） | `/` |
| `i18n` | [多语言支持](./localisation.md)配置 | `null` |
| `plugins` | 标准或自定义[插件](../plugins/usage.md)配置 | `{}` |

## 品牌与身份

配置导航头部和浏览器标签页的品牌展示方式。

```javascript
logo: {
  light: 'assets/images/logo-dark.png',  // 浅色模式下显示的 Logo
  dark: 'assets/images/logo-light.png',  // 深色模式下显示的 Logo
  href: '/',                             // 点击 Logo 时跳转的链接
  alt: 'Company Logo',                   // 无障碍文字
  height: '32px'                         // 可选：Logo 高度
},
favicon: 'assets/favicon.ico',           // 网站图标路径
```

## 布局架构

`docmd` 拥有模块化布局系统。你可以通过 `layout` 对象切换 UI 组件并配置导航行为。

| 分区 | 键名 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| **全局** | `spa` | `true` | 启用 SPA 无刷新跟踪导航 |
| **头部** | `header` | `{ enabled: true }` | 切换顶部导航栏的显示 |
| **侧边栏** | `sidebar` | `{ enabled: true, collapsible: true }` | 控制侧边栏导航树及其行为 |
| **页脚** | `footer` | `{ style: 'minimal' }` | 支持 `'minimal'` 或 `'complete'` 页脚样式 |

### 工具菜单（选项菜单）

选项菜单将全局搜索、主题切换、赞助链接等实用功能整合在一起。

```javascript
layout: {
  optionsMenu: {
    position: 'header', // 可选值：'header'、'sidebar-top'、'sidebar-bottom'、'menubar'
    components: {
      search: true,      // 启用内置全文搜索
      themeSwitch: true, // 启用明暗模式切换
      sponsor: 'https://github.com/sponsors/your-profile' // 可选的赞助链接
    }
  }
}
```

::: callout info
如果 `optionsMenu.position` 设置为 `header` 或 `menubar`，但对应容器已禁用，菜单将自动回退到 `sidebar-top`。
:::

## 核心引擎功能

细化调整 `docmd` 处理和渲染文档内容的方式。

```javascript
minify: true,           // 压缩生产资源（CSS/JS）
autoTitleFromH1: true,  // 如果 frontmatter 未设置 title，自动提取第一个 H1 作为页面标题
copyCode: true,         // 自动为所有代码块添加“复制”按鈕
pageNavigation: true,   // 在页面底部添加上一页/下一页导航链接
```

## 兖容旧版本

如果你将旧版 `docmd` 升级，以下键名会自动映射到新架构，保证向后兼容：

*   `siteTitle` → `title`
*   `siteUrl` / `baseUrl` → `url`
*   `srcDir` / `source` → `src`
*   `outDir` / `outputDir` → `out`

::: callout tip
运行 `docmd migrate` 可自动将配置文件升级到最新架构，同时自动备份原始配置。
:::