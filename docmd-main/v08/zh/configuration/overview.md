---
title: "通用配置"
description: "通过 docmd.config.json 管理品牌、自定义 schema、路由、布局行为与构建引擎。"
---

`docmd.config.json` 文件是工作区的核心配置。它控制站点样式、侧边栏层级、本地化细节以及编译器选项。

## 1. 配置 Schema

JSON 是标准的配置格式。这使得跨引擎 Worker 池的高性能序列化成为可能。

不过，如果您需要动态的 JavaScript 逻辑，`docmd.config.js` 与 `docmd.config.ts` 仍然完全受支持。

```json "docmd.config.json"
{
  "title": "My Project",
  "url": "https://docs.myproject.com",
  "src": "docs",
  "out": "site",
  "base": "/"
}
```

## 2. 核心设置

这些顶层参数用于配置编译器的基本输入与输出位置。

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `title` | `String` | `"Documentation"` | 您站点的正式名称。显示在导航头部与浏览器标题标签中。 |
| `url` | `String` | `""` | 您的规范生产 URL。对 SEO 校验、Sitemap 索引与 OpenGraph 元数据至关重要。 |
| `src` | `String` | `"docs"` | 包含源 Markdown (.md) 文件的文件夹的相对路径。 |
| `out` | `String` | `"site"` | 编译器写入优化后的生产静态站点的相对路径。 |
| `base` | `String` | `"/"` | 站点的根基础路径（例如，托管在子目录时设为 `/docs/`）。 |
| `tmp` | `String` | `null` | 临时编译文件与缓存的自定义目录。默认使用隔离的系统临时文件夹。 |
| `i18n` | `Object` | `null` | 多语言参数。请参阅 [本地化指南](localisation/translated-content.md)。 |
| `plugins` | `Object` | `{}` | 用于配置标准与自定义插件的键值映射。请参阅 [插件指南](../plugins/usage.md)。 |
| `engine` | `String` | `"js"` | 激活的处理器：`"js"` 或 `"rust"`（预览）。 |

## 3. 品牌与标识

管理品牌在页头与浏览器标签中的展示方式。

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

## 4. 界面布局与行为

引擎提供模块化的页头与侧边栏布局。可自定义功能区域。切换组件可见性（搜索、暗色模式开关、面包屑）。

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

完整可视化自定义选项请参阅 [布局与界面分区](layout-ui.md) 指南。

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

| 选项 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `minify` | `Boolean` | `true` | 压缩输出 HTML 与 JS 结构以追求最高速度。 |
| `autoTitleFromH1` | `Boolean` | `true` | 当页面标题缺失时，使用文件中首个 H1 标题进行解析。 |
| `copyCode` | `Boolean` | `true` | 在代码块右上角显示"复制代码"按钮。 |
| `pageNavigation` | `Boolean` | `true` | 在每页底部根据导航顺序添加"上一页"和"下一页"链接。 |
| `markdown.breaks` | `Boolean` | `true` | 标准化换行行为。若您按 80 列宽度折行 Markdown，请设为 `false`。 |

::: callout warning "editLink 独立配置已弃用" icon:alert-triangle
独立的 `editLink` 配置已弃用。请改用核心 [Git 插件](../plugins/git.md)。它在提供相同的编辑链接功能之外，还附带提交时间戳与元数据日志。
:::
