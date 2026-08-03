---
title: "Hero 区块"
description: "纯粹使用 Markdown 构建高影响力的落地页页头与营销亮点。"
---

`hero` 容器创建视觉冲击力强的落地页页头。它处理包括分栏、光晕效果和滑块在内的复杂布局，无需自定义 HTML。

## 语法参考

```markdown
::: hero [property:value...]
    # Page Title
    A short supporting tagline.

    ::: button "Call to Action" /target-url
:::
```

| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| **布局** | `layout:split` \| `layout:slider` | `split` 将 hero 分为主文本区域和侧边媒体区域。`slider` 创建水平滚动对齐的轮播。 |
| **光晕** | `glow:true` | 在背景中注入微妙的径向渐变光晕。 |
| **侧边分隔符** | `== side` | 与 `layout:split` 配合使用。该分隔符之后的所有内容渲染在次要（右侧）区域。 |
| **幻灯片分隔符** | `== slide` | 与 `layout:slider` 配合使用。每个 `== slide` 定义一个新的轮播面板。 |

## 示例

### 分栏布局

使用 `== side` 分隔符将内容分为主文本区域和次要媒体区域。

```markdown
::: hero layout:split glow:true
    # docmd
    Isomorphic execution. AI-optimised.

    ::: button "Quickstart" ../../getting-started/quick-start.md color:blue

    == side
        ::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::
```

::: hero layout:split glow:true
# docmd
Isomorphic execution. AI-optimised.

::: button "Quickstart" ../../getting-started/quick-start.md color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::

### 滑块布局

使用 `== slide` 分隔符构建内容面板的自动推进轮播。

```markdown
::: hero layout:slider
    == slide
        # Isomorphic Core
        The engine renders everywhere.
    == slide
        # AI Optimisation
        Built for the LLM era.
:::
```

::: hero layout:slider
    == slide
        # Isomorphic Core
        The engine renders everywhere.
    == slide
        # AI Optimisation
        Built for the LLM era.
:::

::: callout tip "最佳实践"
在暗色模式站点上谨慎使用 `glow:true`，以获得高级感。将 `::: button` 元素放置在主文本部分、`== side` 之前，以确保它们在移动设备上仍然可见。
:::