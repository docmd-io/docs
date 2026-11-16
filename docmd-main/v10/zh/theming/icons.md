---
title: "图标"
description: "在 docmd 中将内置 Lucide 图标和超过 200,000+ Iconify 矢量图标集成到导航、按钮、标签和容器中。"
---

`docmd` 提供了灵活且零运行时开销的图标系统。内置原生支持 [Lucide](external:https://lucide.dev/) 图标库，开箱即用，无需额外配置。对于更丰富的设计需求，官方推出的 [`@docmd/plugin-iconify`](../plugins/iconify.md) 插件使您能够按需访问来自 100+ 流行开源图标集（Material Design、Carbon、Tabler、FontAwesome、Solar、Simple Icons 等）的 200,000+ 矢量图标。

所有图标均在编译时直接作为干净的 SVG 内联嵌入，不会引入任何客户端 JavaScript 运行时体积或网络字体加载延迟。

## 在 `docmd.config.json` 中配置

### 侧边栏导航图标

在 `docmd.config.json` 中为导航节点指定内置 Lucide 图标。使用 Lucide 集合中任何图标的 kebab-case 标识符：

```json "docmd.config.json"
{
  "navigation": [
    { "title": "Home", "path": "/", "icon": "home" },
    { "title": "Setup", "path": "/setup", "icon": "settings" },
    { "title": "Deploy", "path": "/deployment", "icon": "rocket" }
  ]
}
```

### 启用 Iconify（100+ 图标集）

如需解锁来自 Material Design、Carbon、Tabler、Solar 等的 200,000+ 图标，请在 `docmd.config.json` 中启用 `@docmd/plugin-iconify` 插件：

```json "docmd.config.json"
{
  "plugins": {
    "iconify": {
      "enabled": true
    }
  }
}
```

通过 CLI 安装该插件包：

```bash
npx @docmd/core add iconify
```

::: callout tip title:"自动安装" icon:sparkles
当在 `docmd.config.json` 中声明了 `"iconify": {}` 且本地尚未安装时，`docmd` 会在下次执行构建时自动下载并安装 `@docmd/plugin-iconify`。
:::

## 容器中的图标

在按钮、提示框、卡片、标签页或标签等容器中使用 `icon:` 属性。

### 内置 Lucide 语法

直接传递任何 kebab-case 格式的 Lucide 图标名称：

```markdown
::: button "下载发布版本" /download icon:download
::: tag "已验证" icon:check-circle color:green
::: callout info title:"提示" icon:lightbulb
Lucide 图标开箱即用，无需配置任何额外插件。
:::
```

### 扩展 Iconify 语法

启用 `@docmd/plugin-iconify` 后，可以通过 `iconify:<集合>:<名称>` 或 `iconify-<集合>-<名称>` 引用任何集合中的图标：

```markdown
::: button "GitHub 仓库" external:https://github.com/docmd-io/docmd icon:iconify:carbon:logo-github
::: callout icon:iconify:mdi:home title:"文档门户"
欢迎访问我们统一的开发者文档门户。
:::
::: card title:"云架构部署" icon:iconify:simple-icons:googlecloud
在 Google Cloud Run 和 Cloud Storage 上运行容器化文档。
:::
::: tag "安全已验证" icon:iconify-solar:shield-check-bold color:green
```

如需查看完整的语法格式、支持的集合与容器示例，请参阅 **[Iconify 插件参考文档](../plugins/iconify.md)**。

## 自定义 CSS 样式

* 内置 Lucide 图标渲染时带有 `.lucide-icon` 和 `.icon-<名称>` 类名。
* Iconify 图标渲染时带有 `.iconify-icon` 和 `.icon-<集合>-<名称>` 类名。

您可以在 `customCss` 中调整图标的尺寸、对齐方式或描边粗细：

```css
/* 自定义内置 Lucide 图标 */
.lucide-icon {
  stroke-width: 1.5px;
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
}

/* 自定义 Iconify 图标 */
.iconify-icon {
  width: 1.2rem;
  height: 1.2rem;
  vertical-align: middle;
  transition: transform 0.15s ease;
}

/* 针对特定图标设置样式 */
.icon-rocket {
  color: #ff5733;
}

.icon-carbon-logo-github {
  color: var(--text-color, #24292f);
}

.icon-simple-icons-googlecloud {
  color: #4285f4;
}
```

## 图标参考与导航目录

* **[Lucide 图标目录](external:https://lucide.dev/icons)**：浏览数千个内置矢量图标。
* **[Iconify 图标集检索](external:https://icon-sets.iconify.design/)**: 检索来自 100+ 开源集合的 200,000+ 矢量图标。
* **[Iconify 插件文档](../plugins/iconify.md)**：查看 `@docmd/plugin-iconify` 的完整配置、缓存与容器语法参考。

::: button "浏览内置 Lucide 图标" external:https://lucide.dev/icons icon:globe
::: button "检索 200,000+ Iconify 图标库" external:https://icon-sets.iconify.design/ icon:external-link
