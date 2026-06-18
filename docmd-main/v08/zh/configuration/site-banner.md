---
title: "站点横幅"
description: "全站公告横幅。位于 menubar 之上，支持内联 Markdown、可选图标、CTA 链接、按会话记忆的关闭状态。"
---

# 站点横幅

> **0.8.7 新增。** 默认 UI 内置的可关闭公告横幅。位于 menubar 之上、页头之下。**Opt-in（按需启用）** —— 只有设置了 `config.layout.banner` 才会渲染。

可用于发布公告、维护窗口、Beta 召唤行动（calls-to-action）或任何其他全站消息。

## 30 秒启用

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**v0.9 周五发布** —— 阅读公告。",
      "type": "info",
      "dismissible": true,
      "link": { "text": "了解更多", "url": "/blog/v0-9" }
    }
  }
}
```

横幅会出现在每一页。用户关闭一次后，下一个浏览器会话之前不会再显示。

## 配置参考

| 字段 | 默认值 | 说明 |
|---|---|---|
| `content` | `""` | 内联 Markdown 文本（`**加粗**`、`` `代码` ``）。与 `html` 互斥。 |
| `html` | `""` | 原始 HTML。优先级高于 `content`。用于更复杂的布局。 |
| `type` | `"info"` | `"info"` \| `"success"` \| `"warning"` \| `"danger"` —— 影响背景色。 |
| `dismissible` | `true` | 显示关闭 (X) 按钮。为 `false` 时横幅常驻。 |
| `link` | `null` | `{ text, url }`，可选 CTA 链接，渲染在内容之后。 |
| `icon` | `null` | 左侧显示的 Lucide 图标名。常用：`megaphone`、`info`、`bell`。 |

### 示例

普通公告：

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "站点维护定于 UTC 时间 周日 02:00–04:00 进行。",
      "type": "warning"
    }
  }
}
```

发布成功：

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**v1.0 正式发布！** 阅读发布说明。",
      "type": "success",
      "icon": "party-popper",
      "link": { "text": "发布说明", "url": "/blog/v1-0" }
    }
  }
}
```

富 HTML（请谨慎转义）：

```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "html": "<strong>新功能：</strong> AI 搜索已上线。<a href=\"/blog/ai-search\">了解更多 →</a>",
      "type": "info",
      "dismissible": false
    }
  }
}
```

## 行为

- **位置** —— 位于页面最顶部，menubar 与侧栏 logo bar 之上。纯 CSS 定位，关闭时不会引起布局抖动。
- **关闭状态持久化** —— "已关闭" 状态保存在 `sessionStorage`。新的浏览器会话会重新显示。如需更长期记忆，可由一个小型插件写入 `localStorage`（横幅的 `data-docmd-banner` 属性便于定位）。
- **按页覆盖** —— 0.8.7 暂不支持。如需在单个页面隐藏横幅，可在 `config.templates[page]` 条目中设置 `layout.banner: null`（计划在下个版本提供）。

## 重新定义样式

横幅以 BEM 风格的类构建在 `.docmd-banner` 根节点上。可通过 `customCss` 重新设置皮肤：

```css
.docmd-banner--info {
  background: linear-gradient(90deg, #fef3c7 0%, #fff 100%);
  border-bottom: 2px solid #f59e0b;
}
.docmd-banner__link {
  font-weight: 600;
}
```

模板可通过自带 `templates/partials/banner.ejs` 整体替换横幅。默认版本随 `@docmd/ui` 一起发布。

## 禁用

如需全站移除横幅，将 `layout.banner` 设为 `null`（或删除该字段）。如需在单个页面隐藏，可使用计划中的按页覆盖功能，或在前置元数据（post-0.8.7）中渲染为 `null`。

::: callout tip "与 changelog 模板配合"
将横幅与 `template-changelog` 包搭配使用，为您的用户提供您发布的每个版本的永久记录。
:::