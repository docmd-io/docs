---
title: "导航配置"
description: "构建侧边栏结构、对链接分类，并为人类读者和 AI 旁系统指定图标。"
---

`docmd` 提供对网站结构的精确控制。在 `docmd.config.js` 中定义 `navigation` ，可以建立合理的层级结构，同时为 AI 模型和搜索引擎提供清晰的上下文地图。

## 导航数组

数组中的每个对象定义一个**链接**或一个**分类组**。

```javascript
export default defineConfig({
  navigation: [
    { title: '首页', path: '/', icon: 'home' },
    { title: '安装', path: '/getting-started/installation', icon: 'download' }
  ]
});
```

## 可用属性

| 属性 | 类型 | 是否必填 | 说明 |
| :--- | :--- | :--- | :--- |
| **`title`** | `String` | 是 | 链接或分类的显示文字 |
| **`path`** | `String` | 否 | 目标 URL，本地路径必须以 `/` 开头 |
| **`icon`** | `String` | 否 | [Lucide 图标](https://lucide.dev/icons)名称（如 `rocket`） |
| **`children`** | `Array` | 否 | 嵌套子项，用于创建子菜单或分组 |
| **`collapsible`** | `Boolean` | 否 | 为 `true` 时，用户可展开/折叠该分组 |
| **`external`** | `Boolean` | 否 | 为 `true` 时，链接在新标签页打开 |

## 分组组织

可以将导航项嵌套以创建深层级结构。主要有两种组织方式：

### 1. 可点击分组（带索引页的目录）
如果父项有 `path`，点击标签就会跳转到该页面，并自动展开侧边栏子项。

```javascript
{
  title: '云配置',
  path: '/cloud/overview', 
  children: [
    { title: 'AWS', path: '/cloud/aws' },
    { title: 'GCP', path: '/cloud/gcp' }
  ]
}
```

### 2. 静态标签（分类标题）

如果**省略 `path`**，该项就变成一个静态分类标题。这是对没有公共落地页的相关技术章节进行分组的推荐方式。

```javascript
{
  title: '内容与格式',
  icon: 'layout',
  children: [
    { title: '语法指南', path: '/content/syntax' },
    { title: '容器', path: '/content/containers' }
  ]
}
```

## 自动面包屑

`docmd` 根据导航层级结构自动生成每个页面的面包屑，显示在页面标题上方，方便用户快速定位。

### 耘饭尚番
*   **自动解析**：引擎追踪 `navigation` 树中站点
m的祖先路径。
*   **当前状态**：当前页面为面包屑最末一项（无链接）。
*   **移动端适配**：小屏上面包屑会吺能调整或隐藏，以保留头部空间。

### 禁用面包屑

面包屑默认开启。如需全局关闭，输入下方配置：

```javascript
layout: {
  breadcrumbs: false
}
```

## 导航解析优先级

`docmd` 提供灵活的级联解析系统。这允许你在保持中央导航配置的同时，为不同的语言或版本覆盖特定部分。

解析遵循基于文件夹嵌套的“最近文件优先”逻辑。层级结构如下（按优先级从高到低排列）：

```text
my-project/
├── docmd.config.js           [第 3 级：全局配置导航] - 最低优先级
├── docs-v1/ 
│   ├── navigation.json       [第 2 级：版本级导航] - 中等优先级
│   └── zh/
│       └── navigation.json   [第 1 级：语言级导航] - 最高优先级
```

1. **第 1 级：语言特定** (`docs-v1/zh/navigation.json`)：覆盖特定语言环境和版本的所有设置。
2. **第 2 级：版本特定** (`docs-v1/navigation.json`)：为此版本中的所有语言覆盖全局配置。
3. **第 3 级：全局配置** (`config.navigation`)：根配置文件中定义的最终回退配置。

### 智能死链接过滤
即使回退到父级配置（第 2 级或第 3 级），`docmd` 也会自动过滤掉那些指向当前版本源文件夹中不存在的文件的侧边栏条目。这确保了当用户选择旧版本时不会出现死链接。

### JSON 结构
每个 `navigation.json` 都必须遵循标准数组结构：

```json
[
  { "title": "首页", "path": "/" },
  { "title": "发布说明", "path": "/release-notes" }
]
```

## 图标集成

`docmd` 內置了完整的 **Lucide** 图标库。使用时只需将图标名称写为短横线格式（如 `brain-circuit`、`terminal`、`settings`）即可。

::: callout tip
即使页面内容以标题开头，也建议为 `title` 键使用描述性文字。清晰一致的导航标题将帮助 AI 模型通过 `llms-full.txt` 建立对项目结构的准确理解。
:::