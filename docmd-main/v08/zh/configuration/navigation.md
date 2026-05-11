---
title: "导航设置 (Navigation)"
description: "通过全局配置、目录级 navigation.json 或自动文件扫描来定义网站的侧边栏结构。"
---

`docmd` 提供了一个极其灵活的导航系统，可以从简单的单文件夹项目扩展到复杂的多版本、多语言文档中心。

## 导航定义方式

你可以通过三种方式定义导航。如果同时使用多种方式，`docmd` 会按照以下优先级进行解析：

### 1. 全局配置 (`docmd.config.js`)
适用于小型项目。所有导航逻辑都保存在主配置文件中。

```javascript
export default {
  navigation: [
    { title: '开始使用', path: '/intro' },
    { title: 'API 参考', path: '/api', children: [...] }
  ]
}
```

### 2. 目录级配置 (`navigation.json`)
这是处理大规模文档的 **推荐方式**。在你的 `docs/` 目录（或任何子目录）中放置一个 `navigation.json` 文件。

```json
[
  { "title": "概览", "path": "overview.md" },
  { "title": "高级话题", "children": [...] }
]
```

### 3. 自动文件扫描 (降级方案)
如果既没有定义全局配置也没有 `navigation.json`，`docmd` 会自动扫描你的文件系统并按照字母顺序构建侧边栏。

## 侧边栏对象属性

每个导航项都支持以下属性：

| 属性 | 类型 | 描述 |
| :--- | :--- | :--- |
| `title` | `string` | 侧边栏中显示的标签文本。 |
| `path` | `string` | 相对于当前目录的源文件路径（如 `intro.md`）。 |
| `icon` | `string` | 来自 Lucide 库的图标名称（如 `home`）。 |
| `collapsible` | `boolean` | 是否允许该分组在侧边栏中折叠（默认为 `true`）。 |
| `collapsed` | `boolean` | 初始加载时该分组是否处于折叠状态。 |
| `external` | `boolean` | 是否在新标签页中打开链接。 |
| `children` | `array` | 子导航项的嵌套列表。 |

## 导航解析优先级

当用户访问一个页面时，侧边栏是根据该页面所在的目录深度动态计算的：

1.  **最近邻匹配**: 引擎首先在当前页面所在的文件夹中查找 `navigation.json`。
2.  **向上递归**: 如果未找到，它会向父目录查找，直到到达根目录。
3.  **全局降级**: 如果整个文件系统中都没有 `navigation.json`，则使用 `docmd.config.js` 中的定义。

::: callout tip "基于上下文的导航"
这种解析逻辑允许你为网站的不同部分定义 **完全不同** 的侧边栏。例如，你的 `/api/` 目录可以有一套专注于技术定义的侧边栏，而你的 `/guides/` 目录则可以显示一套专注于教程的侧边栏。
:::

## 自动排序与隐藏

*   **排除文件**: 如果你不想让某个文件出现在自动生成的侧边栏中，但仍希望它能被访问，请在 Frontmatter 中设置 `unlisted: true`。
*   **排序**: `navigation.json` 中的顺序即为最终渲染的顺序。

::: callout warning "路径规范化"
在 `navigation.json` 中，你可以编写 `overview.md`、`overview` 或 `./overview`。构建引擎会自动将这些格式规范化为干净的生产环境 URL。详见 [链接与引用](../content/syntax/linking.md)。
:::