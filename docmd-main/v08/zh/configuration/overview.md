---
title: "配置概览"
description: "配置 docmd.config.json 以管理品牌、自定义模式、路由、布局行为和构建引擎。"
---

`docmd.config.json` 文件是你工作区的核心配置。它控制网站样式、侧边栏层级、多语言详情和编译器选项。

## 1. 配置架构

JSON 是标准配置格式。这允许引擎工作池之间的高性能序列化。

但是，如果你需要动态 JavaScript 逻辑，`docmd.config.js` 和 `docmd.config.ts` 仍然完全支持。

```json
{
  "title": "My Project",
  "url": "https://docs.myproject.com",
  "src": "docs",
  "out": "site",
  "base": "/"
}
```

## 2. 核心设置

这些顶层参数配置编译器的输入和输出基础。

| 参数 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `title` | `String` | `"Documentation"` | 你的网站的正式名称。显示在导航头部和浏览器标题标签中。 |
| `url` | `String` | `null` | 你的规范生产 URL。对 SEO 验证、站点地图索引和 OpenGraph 元数据至关重要。 |
| `src` | `String` | `"docs"` | 包含源 Markdown (.md) 文件的文件夹的相对路径。 |
| `out` | `String` | `"site"` | 编译器写入优化后的生产静态网站的相对路径。 |
| `base` | `String` | `"/"` | 你网站的根基础路径（例如，如果托管在子文件夹中，设置为 `/docs/`）。 |
| `tmp` | `String` | `null` | 临时编译文件和缓存的自定义目录。默认为隔离的系统临时文件夹。 |
| `i18n` | `Object` | `null` | 多语言参数。请参阅[本地化指南](localisation/translated-content.md)。 |
| `plugins` | `Object` | `{}` | 配置标准和自定义插件的键值映射。请参阅[插件指南](../plugins/usage.md)。 |
| `engine` | `String` | `"js"` | 活动的处理引擎：`"js"` 或 `"rust"`（预览）。 |

## 3. 品牌与标识

管理你的品牌在头部和浏览器标签中的显示方式。

```json
{
  "logo": {
    "light": "assets/images/logo-dark.png",
    "dark": "assets/images/logo-light.png",
    "href": "/",
    "alt": "Company Logo",
    "height": "32px"
  },
  "favicon": "assets/favicon.ico"
}
```

## 4. UI 布局与行为

引擎提供模块化的头部和侧边栏布局。自定义功能区域。更改搜索和深色模式切换等组件的可见性。启用或禁用面包屑。

```json
{
  "layout": {
    "spa": true,
    "header": {
      "enabled": true
    },
    "sidebar": {
      "collapsible": true,
      "defaultCollapsed": false
    },
    "optionsMenu": {
      "position": "header",
      "components": {
        "search": true,
        "themeSwitch": true
      }
    }
  }
}
```

有关完整的视觉自定义选项，请参阅[布局和 UI 区域](layout-ui.md)指南。

## 5. 核心引擎功能

微调解析器处理内容文件的方式。

```json
{
  "minify": true,
  "autoTitleFromH1": true,
  "copyCode": true,
  "pageNavigation": true,
  "markdown": {
    "breaks": true
  }
}
```

| 选项 | 类型 | 默认值 | 描述 |
| :--- | :--- | :--- | :--- |
| `minify` | `Boolean` | `true` | 压缩输出 HTML 和 JS 结构以获得最大速度。 |
| `autoTitleFromH1` | `Boolean` | `true` | 使用文件中第一个 H1 标题解析缺失的页面标题。 |
| `copyCode` | `Boolean` | `true` | 在语法块右上角显示"复制代码"按钮。 |
| `pageNavigation` | `Boolean` | `true` | 自动生成右侧"本页内容"目录。 |
| `markdown.breaks` | `Boolean` | `true` | 标准化换行符。如果你在 80 列处换行 markdown 行，请设置为 `false`。 |

::: callout warning "独立的 editLink 已弃用" icon:alert-triangle
独立的 `editLink` 配置已弃用。请改用核心 [Git 插件](../plugins/git.md)。它提供相同的编辑链接功能以及提交时间戳和元数据日志。
:::