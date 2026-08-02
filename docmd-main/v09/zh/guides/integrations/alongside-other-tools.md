---
title: "与其他工具并存"
description: "把 docmd 融入多工具文档生态，从而打造无缝用户体验的策略。"
---

## 问题

大型组织很少只使用单一工具来承载文档：内部规范可能用 Confluence，API 用 Stoplight，代码用 GitHub。把这些分散的来源整合成统一的用户体验是一项难题 —— 用户常常要在风格各异、导航不同的门户之间来回切换。

## 为什么重要

碎片化的文档体验会破坏开发者的信任，并增加认知负担。如果用户为了跟随一篇教程不得不在风格迥异的界面间来回切换，他们很容易丢失上下文，甚至干脆放弃您的产品。统一您的工具，才能形成专业、一致、鼓励探索的体验。

## 方法

将 docmd 作为您的主文档中心。通过 [菜单栏](../../configuration/menubar.md) 实现统一的导航，再借助 [嵌入容器](../../content/containers/embed.md) 承载第三方内容，便能打造出一套隐藏多工具复杂度的无缝界面。

## 实现

### 1. 统一的全局导航

使用 `menubar` 配置把不同的文档门户相互串联起来。这样，无论用户身处哪个子域名，都能随时回到主指南。

```json
  "layout": {
    "menubar": {
      "left": [
        { "text": "指南", "url": "/" },
        { "text": "API 参考", "url": "https://api.example.com" },
        { "text": "社区", "url": "https://forum.example.com" }
      ]
    }
  }
```

### 2. 无缝嵌入

对于提供 Web 界面的工具（例如交互式 API Explorer 或 Dashboard 预览），可使用 `::: embed` 容器。它们会直接呈现在您的 docmd 页面之中，让用户始终留在您品牌的体验之内。

```markdown
# 交互式 API Explorer

::: embed "https://api.example.com/v1/explorer"
:::
```
更多信息请参阅 [嵌入参考](../../content/containers/embed.md)。

### 3. 内容聚合

对于必须与核心文档一同可被搜索到的外部内容，可考虑在构建步骤中抓取其他来源的数据，并转换为 Markdown。这样 docmd 就能将所有信息索引到一个统一的 [搜索索引](../../plugins/search.md) 中。

## 取舍

嵌入虽能带来视觉上的统一，却可能在移动设备上引入性能开销或"滚动嵌套"问题。iframe 中的内容无法被 docmd 的搜索引擎原生索引。若搜索对等性至关重要，建议优先采用 [OpenAPI 生成](openapi-generation.md) 或其他基于 Markdown 的摄取方式。