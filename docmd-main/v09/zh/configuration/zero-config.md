---
title: "零配置"
description: "了解 docmd 的启发式引擎 —— 它无需配置文件即可自动构建您的站点结构。"
---

`docmd` 具备一套智能启发式引擎，可在无需编写任何配置的情况下自动解析并构建文档结构。您无需编写一行配置即可开始构建、预览和翻译文档。

## 工作原理

在没有 `docmd.config.json` 文件的情况下运行时，引擎会自动进入 **零配置模式**。它扫描工作区目录中的内容并应用以下启发式规则：

### 1. 源目录检测

引擎按顺序在这些候选目录中查找文档文件：
1.  `docs/`
2.  `src/docs/`
3.  `documentation/`
4.  `content/`
5.  `.`（根目录回退）

如果找到某个候选目录且其中包含 Markdown 文件，则将其选为源目录。若未找到任何目录，但项目根目录中存在 Markdown 文件，则使用根目录（自动忽略 `node_modules`、`.git`，以及 `site/`、`dist/`、`out/` 等输出文件夹）。

若完全没有找到文档内容，`docmd` 会自动初始化一份全新的入门结构。

### 2. 版本与语言的启发式规则

引擎扫描目录结构以动态提取版本与本地化元数据：
-   **版本**：匹配 `v[0-9]+` 的子目录（例如 `v1.0`、`v08`）会被解析为文档版本。
-   **语言**：使用两个字母语言代码的子目录（例如 `en`、`de`、`zh`）会被视为本地化变体。
-   **结构提取**：最高版本被指定为当前发布版本，找到的第一种语言（优先 `en`）被设为默认语言。

### 3. 自动导航路由

如果不存在顶层版本或语言目录，引擎会通过分析文件结构动态构建导航树：
- 子目录映射为导航分组。
- 标题由文件基本名称动态生成。例如 `getting-started.md` 会被格式化为 `Getting Started`。
- 索引文件（`index.md`、`README.md`）被路由为当前目录的落地页。

## 零配置最佳实践

要充分发挥零配置模式的优势，请遵循以下结构建议：

-   **显式命名文件**：使用清晰、连字符或驼峰式命名的文件。自动加载器会将它们转换为可读的标题。
-   **基于文件夹的分区**：将相关文档放在子文件夹中，以便在侧边栏中自动归类。
-   **索引回退**：始终在源文件夹的根目录放置一份 `index.md` 或 `README.md`，作为落地页。
-   **清晰的输出路径**：若使用根目录 `.` 作为源，请将构建产物放在默认的 `site/` 文件夹中（会被自动忽略）。

## 内置默认值（0.8.7 新增）

一份 `docmd.config.json`（或不提供任何配置）即可开箱即用地获得一个可用的站点。以下键附带合理的默认值，只有在您希望使用不同值时才需要显式设置。

::: callout info "如何退出默认值"
将键设为 `false`（或相应的空值）即可关闭某个默认值。例如 `pageNavigation: false` 会移除上/下页链接；`theme.appearance: "dark"` 会覆盖色彩模式。
:::

### 顶层体验默认值

| 键 | 默认值 | 说明 |
|---|---|---|
| `pageNavigation` | `true` | 每篇文章底部的上/下页链接 |
| `copyCode` | `true` | `<pre>` 代码块上的复制按钮 |
| `autoTitleFromH1` | `true` | 当 frontmatter 缺失时，使用首个 `# H1` 作为页面标题 |

### 布局与侧边栏默认值

| 键 | 默认值 | 说明 |
|---|---|---|
| `layout.spa` | `true` | 页面间启用 SPA 导航 |
| `layout.breadcrumbs` | `true` | 页头上方显示面包屑行 |
| `layout.header.enabled` | `true` | 顶部页头 |
| `layout.sidebar.collapsible` | `true` | 桌面端侧边栏可折叠 |
| `layout.sidebar.defaultCollapsed` | `false` | 侧边栏默认展开 |
| `layout.optionsMenu.position` | `"header"` | 选项菜单（搜索 / 主题切换 / 赞助）位于页头 |
| `layout.optionsMenu.components.search` | `true` | 菜单中显示搜索触发器 |
| `layout.optionsMenu.components.themeSwitch` | `true` | 菜单中显示亮/暗模式切换 |
| `layout.optionsMenu.components.sponsor` | `null` | 按需启用 —— 设置为 URL 即可开启 |

### 页脚默认值

| 键 | 默认值 | 说明 |
|---|---|---|
| `layout.footer.style` | `"minimal"` | 单行页脚栏 |
| `layout.footer.copyright` | `` `© ${new Date().getFullYear()}` `` | 自动生成当前年份的版权 |
| `layout.footer.branding` | `true` | 默认显示 "Built with docmd" |

### 主题默认值

| 键 | 默认值 | 说明 |
|---|---|---|
| `theme.name` | `"default"` | 基础 CSS 主题；预留值：`default`、`sky`、`ruby`、`retro`。任何其他值会被自动提升为 [模板名](../theming/templates.md)。 |
| `theme.appearance` | `"system"` | 默认色彩模式（跟随 `prefers-color-scheme`）。若需强制，请设为 `"light"` 或 `"dark"`。 |
| `theme.codeHighlight` | `true` | `<pre>` 块启用语法高亮 |

### 新增的可选功能（默认关闭）

| 键 | 默认值 | 说明 |
|---|---|---|
| `cookie` | `null` | 可选的 Cookie 同意对话框 —— 请参阅 [Cookie 同意](cookie-consent.md) |
| `layout.banner` | `null` | 可选的全站公告横幅 —— 请参阅 [站点横幅](site-banner.md) |
| `theme.template` | `null` | 可选的模板选择 —— 请参阅 [模板](../theming/templates.md) |

这些默认值的设定目标是让全新站点在没有任何配置的情况下也能立即可用。较旧的配置文件会保留其显式值 —— 只有未定义的键才会被填充。