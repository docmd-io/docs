---
title: "站点横幅"
description: "在 docmd 中配置支持多位置（顶部、侧边栏、目录栏）、内联 Markdown、图片、行动号召按钮及会话持久化的公告与推广横幅。"
---

`docmd` 提供了灵活的多位置横幅系统，既支持全宽顶部公告条，也支持紧凑的侧边栏和目录栏（TOC）卡片横幅。您可以使用横幅展示版本发布公告、维护通知、赞助商信息或推广活动。

## 快速启用

您可以在 `docmd.config.json` 中通过 `layout.banner` 配置单个顶部公告横幅，或通过 `layout.banners` 配置多位置横幅：

::: tabs
== tab "单个顶部横幅" icon:bell
```json "docmd.config.json"
{
  "layout": {
    "banner": {
      "content": "**v0.9.6 已发布！** 体验专注模式与全新横幅系统。",
      "type": "info",
      "dismissible": true,
      "link": { "text": "发布说明", "url": "/release-notes/0-9-6" }
    }
  }
}
```
== tab "多位置横幅" icon:layout
```json "docmd.config.json"
{
  "layout": {
    "banners": {
      "top": {
        "content": "**v0.9.6 正式发布！** 探索最新文档改进与功能特性。",
        "type": "announcement",
        "dismissible": true,
        "link": { "text": "查看更新", "url": "/release-notes/0-9-6" }
      },
      "toc-top": {
        "image": "/assets/sponsor-badge.png",
        "alt": "赞助 Docmd",
        "content": "**支持开源文档引擎**",
        "link": { "text": "成为赞助者", "url": "https://github.com/sponsors" }
      },
      "sidebar-bottom": {
        "icon": "book-open",
        "content": "需要企业级支持或定制主题？",
        "link": { "text": "联系我们", "url": "https://docmd.io/contact" }
      }
    }
  }
}
```
:::

---

## 支持的横幅位置

`docmd` 支持 7 个专有横幅渲染位置：

| 位置 | 展示形态 | 默认持久性 | 说明 |
| :--- | :--- | :--- | :--- |
| `top` | 横条 (Bar) | 可关闭 (`dismissible: true`) | 视口最顶部的全宽公告横条。 |
| `header` | 横条 (Bar) | 可关闭 (`dismissible: true`) | 位于顶部标题栏下方或内部的公告条。 |
| `sidebar-top` | 卡片 (Card) | 常驻 (`dismissible: false`) | 固定在左侧导航栏顶部的卡片横幅。 |
| `sidebar-bottom` | 卡片 (Card) | 常驻 (`dismissible: false`) | 固定在左侧导航栏底部的卡片横幅。 |
| `toc-top` | 卡片 (Card) | 常驻 (`dismissible: false`) | 固定在右侧文章目录栏（TOC）顶部的卡片横幅。 |
| `toc-bottom` | 卡片 (Card) | 常驻 (`dismissible: false`) | 固定在右侧文章目录栏（TOC）底部的卡片横幅。 |
| `footer` | 横条 (Bar) | 常驻 (`dismissible: false`) | 位于页面页脚正上方的全宽横幅。 |

---

## 配置参考

每个横幅对象支持以下属性配置：

| 字段 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `content` | `""` | 内联 Markdown 文本（`**加粗**`、`` `代码` ``）。与 `html` 互斥。 |
| `html` | `""` | 原始 HTML 字符串。优先级高于 `content`。 |
| `image` | `null` | 卡片图片或图标路径（支持在 `sidebar-*` 和 `toc-*` 卡片中使用；`top` 顶部横条会自动忽略）。 |
| `alt` | `""` | 图片的无障碍替换文本（Alt text）。 |
| `type` | `"info"` | 视觉色彩风格：`"info"`、`"success"`、`"warning"`、`"danger"` 或 `"announcement"`。 |
| `dismissible` | *依位置而定* | 是否显示关闭 (X) 按钮。在 `top`/`header` 上默认为 `true`，在卡片位置上默认为 `false`（常驻）。别名支持：`dismissable`、`closable`。 |
| `link` | `null` | 行动号召链接。支持 `{ text, url }` 对象或直接填写 URL 字符串。 |
| `icon` | `null` | 显示在内容旁的 [Lucide 图标](external:https://lucide.dev/icons)名称（例如 `sparkles`、`bell`、`heart`）。 |

---

## 卡片横幅（侧边栏与目录栏）

卡片横幅（`sidebar-top`、`sidebar-bottom`、`toc-top`、`toc-bottom`）采用紧凑卡片排版，专为赞助商插图、开发者生态推荐或重要资源导流设计。

### 卡片默认常驻行为

与顶部通知栏不同，**卡片横幅默认常驻**（`dismissible: false`），不会在用户浏览或切换页面时消失。

如果您希望让读者能够手动关闭卡片横幅，请显式声明 `dismissible: true`（或 `dismissable: true`）：

```json "docmd.config.json"
{
  "layout": {
    "banners": {
      "toc-top": {
        "image": "/assets/survey-banner.png",
        "content": "参与 2 分钟开发者问卷调查！",
        "dismissible": true,
        "link": { "text": "开始答卷", "url": "https://example.com/survey" }
      }
    }
  }
}
```

关闭状态将自动保存在浏览器的 `sessionStorage` 中，仅对当前会话有效。

---

## 版本继承与覆盖

在多版本文档（`versions.all`）中，各个版本会自动继承根项目的横幅配置。特定版本可针对性覆盖指定位置，而无需重复配置其他位置：

```json "docmd.config.json"
{
  "layout": {
    "banners": {
      "top": { "content": "欢迎查阅官方文档！" },
      "toc-top": { "image": "/assets/sponsor.png", "link": "https://docmd.io" }
    }
  },
  "versions": {
    "current": "v2",
    "all": [
      {
        "id": "v1",
        "dir": "docs-v1",
        "label": "v1.0",
        "banners": {
          "top": {
            "content": "⚠️ 您正在查看旧版 v1 文档。建议切换至 v2 获取最新功能。",
            "type": "warning",
            "dismissible": false
          }
        }
      },
      {
        "id": "v2",
        "dir": "docs-v2",
        "label": "v2.0"
      }
    ]
  }
}
```

---

## 自定义样式

横幅采用标准 BEM 类名渲染：
- 横幅根元素：`.docmd-banner`（或 Summer 主题下的 `.summer-banner`）
- 位置修饰类：`.docmd-banner--pos-top`、`.docmd-banner--pos-sidebar-top`、`.docmd-banner--pos-toc-top` 等
- 卡片修饰类：`.docmd-banner--card`
- 色彩类型类：`.docmd-banner--info`、`.docmd-banner--warning`、`.docmd-banner--success`、`.docmd-banner--danger`

```css "custom.css"
.docmd-banner--pos-toc-top {
  border-radius: 8px;
  border: 1px solid var(--docmd-color-border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.docmd-banner--announcement {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: #ffffff;
}
```

## 禁用横幅

如需关闭横幅：
- 将 `layout.banner` 设置为 `null` 或直接删除。
- 在 `layout.banners` 中删除对应位置的属性，或将其设为 `null`。
- 在特定页面的 Frontmatter 中设置 `banner: null` 可针对单页隐藏。