---
title: "零配置架构"
description: "探索 docmd 的零配置启发式引擎，无需配置即可自动发现文档文件、路由路径并构建站点结构。"
---

`docmd` 拥有智能启发式引擎，旨在自动解析、发现和构建文档结构。开发者无需编写任何初始配置行，即可编译、服务和翻译技术站点。

## 启发式发现如何工作

在没有 `docmd.config.json` 清单的目录中运行时，引擎将初始化 **零配置模式**。它会扫描工作区中的文档内容并应用自动化启发式规则：

::: steps

1. **源目录发现**: 按优先级顺序扫描候选目录：`docs/`、`src/docs/`、`documentation/`、`content/` 以及 `.`（根目录备用）。
2. **版本与语言提取**: 自动解析匹配 `v[0-9]+` 的版本文件夹（如 `v1.0`、`v09`）和双字母语言代码（如 `en`、`de`、`zh`）。
3. **自动化侧边栏路由**: 通过分析文件层级并将带连字符的基文件名转换为可读文本（`getting-started.md` → `Getting Started`），生成干净的导航树。

:::

如果目标工作区中未找到任何文档内容，`docmd` 会自动初始化全新的入门模板。

## 零配置目录约定

为充分发挥零配置模式的作用，请采用以下目录约定：

- **显式文件命名**: 使用清晰的连字符或 camelCase 文件名。自动加载器会将其转换为人类可读的侧边栏标签。
- **目录分组**: 将相关 Markdown 文档分组在子文件夹中，以自动构建可折叠的侧边栏分类。
- **Index 备用**: 在每个内容文件夹的根目录放置 `index.md` 或 `README.md`，作为其默认落地页。
- **干净的输出路径**: 使用根目录 `.` 作为源文件夹时，构建的静态资源会输出到 `./site/`，版本控制和编译器会自动忽略该目录。

## 内置默认行为

`docmd` 站点开箱即用，带有合理的默认值。仅在需要覆盖默认值时才在 `docmd.config.json` 中配置个别属性。

::: callout info "选择性禁用默认行为" icon:sliders
要禁用某项默认行为，可将其键设置为 `false` 或空值。例如，设置 `pageNavigation: false` 会移除底部的上一页/下一页链接。
:::

### 顶层默认值

| 属性 | 默认值 | 描述 |
| :--- | :--- | :--- |
| `pageNavigation` | `true` | 在页面底部渲染上一篇/下一篇文章链接。 |
| `copyCode` | `true` | 为代码块附加复制按钮。 |
| `autoTitleFromH1` | `true` | 当缺少 frontmatter `title` 时，使用文件中的第一个 `# H1` 标题解析页面标题。 |

### 布局与 UI 默认值

| 属性 | 默认值 | 描述 |
| :--- | :--- | :--- |
| `layout.spa` | `true` | 单页应用客户端路由导航。 |
| `layout.breadcrumbs` | `true` | 页面标头下方的上下文面包屑栏。 |
| `layout.header.enabled` | `true` | 固定的顶部导航标头栏。 |
| `layout.sidebar.collapsible` | `true` | 桌面视口上可折叠的侧边栏分类组。 |
| `layout.sidebar.defaultCollapsed` | `false` | 侧边栏分类默认处于展开状态。 |
| `layout.optionsMenu.position` | `"header"` | 在标头中定位搜索和主题控件。 |
| `layout.optionsMenu.components.search` | `true` | 启用内置全文搜索模态框触发器。 |
| `layout.optionsMenu.components.themeSwitch` | `true` | 启用浅色/深色外观模式切换。 |
| `layout.optionsMenu.components.sponsor` | `null` | 可选的赞助链接 URL。 |

### 页脚默认值

| 属性 | 默认值 | 描述 |
| :--- | :--- | :--- |
| `layout.footer.style` | `"minimal"` | 紧凑的单行页脚栏。 |
| `layout.footer.copyright` | `` `© ${new Date().getFullYear()}` `` | 动态的当前年份版权字符串。 |
| `layout.footer.branding` | `true` | 显示 "Built with docmd" 属性归属链接。 |

### 主题与样式默认值

| 属性 | 默认值 | 描述 |
| :--- | :--- | :--- |
| `theme.name` | `"default"` | 基础主题 (`default`, `sky`, `ruby`, `retro`)。自定义名称会自动升级为 [模板名称](../theming/templates.md)。 |
| `theme.appearance` | `"system"` | 遵循系统偏好的默认颜色模式 (`system`, `light`, `dark`)。 |
| `theme.codeHighlight` | `true` | 在代码块上开启语法高亮。 |

### 可选扩展功能

| 属性 | 默认值 | 描述 |
| :--- | :--- | :--- |
| `cookie` | `null` | 可选的 Cookie 同意对话框。参阅 [Cookie 同意](./cookie-consent.md)。 |
| `layout.banner` | `null` | 可选的站点公告横幅。参阅 [站点横幅](./site-banner.md)。 |
| `theme.template` | `null` | 可选的自定义站点模板选择。参阅 [模板](../theming/templates.md)。 |
