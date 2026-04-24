---
title: "与其他工具并存"
description: "如何将 docmd 集成到多工具文档生态系统中，以创建无缝的用户体验。"
---

## 问题

大型组织很少仅使用单一工具来满足其所有文档需求。您的公司可能使用 Confluence 编写内部规范，使用 Stoplight 进行 API 设计，使用 GitHub 存放代码示例。将这些分散的来源整合到一个统一的用户旅程中是一项重大挑战，因为用户经常发现自己在风格和导航完全不同的断开门户之间跳转。

## 为什么重要

碎片化的文档体验会破坏开发者的信任并增加认知负荷。如果用户为了完成一个教程而被迫在完全不同的界面之间切换，他们更有可能丢失上下文或放弃您的产品。统一您的工具可确保专业、连贯的体验，鼓励用户进行探索和学习。

## 方法

将 `docmd` 用作您的主要文档中心或“单一窗口 (Single Pane of Glass)”。通过利用 [菜单栏 (Menubar)](../../configuration/menubar) 实现统一导航，并利用 [嵌入容器 (Embed Containers)](../../content/containers/embed) 引入第三方内容，您可以创建一个无缝的界面，隐藏多工具基础设施的复杂性。

## 实施

### 1. 统一的全局导航

使用 `menubar` 配置将您的各个文档门户链接在一起。这可确保用户始终能找到返回主指南的路径，无论他们当前处于哪个子域名。

```javascript
// docmd.config.js
export default {
  layout: {
    menubar: {
      left: [
        { text: '指南', url: '/' }, // docmd 站点
        { text: 'API 参考', url: 'https://api.example.com' }, // 外部工具
        { text: '社区', url: 'https://forum.example.com', external: true }
      ]
    }
  }
};
```

### 2. 无缝嵌入

对于提供 Web 界面（如交互式 API 资源管理器或仪表板预览）的工具，使用 `::: embed` 容器直接在您的 `docmd` 页面中显示它们。这可以将用户留在您的品牌环境中。

```markdown
# 交互式 API 资源管理器

::: embed "https://api.example.com/v1/explorer"
:::
```
有关更多信息，请参阅 [嵌入参考](../../content/containers/embed)。

### 3. 内容聚合

对于必须与您的核心文档一起被搜索的外部内容，考虑建立一个构建步骤，从其他来源获取数据并将其转换为 Markdown。这允许 `docmd` 在单一、统一的 [搜索索引](../../plugins/search) 中索引您的所有信息。

## 权衡

虽然嵌入提供了统一的外观，但它偶尔会引入性能开销或在移动设备上出现“滚动嵌套”问题。此外，iframe 内的内容不会原生被 `docmd` 的搜索引擎索引。如果搜索一致性至关重要，建议优先考虑 [OpenAPI 生成](./openapi-generation) 或其他基于 Markdown 的摄取方法。
