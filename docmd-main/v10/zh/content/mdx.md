---
title: "MDX 组件"
description: "通过官方 mdx 插件与 lite-mdx，使用 MDX 和 JSX 组件编写 docmd 文档。"
---

`docmd` 通过 `@docmd/plugin-mdx` 插件提供对 MDX 及 JSX 组件的内置支持。在 `lite-mdx` 的驱动下，JSX 标签在构建期被直接编译为无障碍 HTML 及原生 `docmd` 容器，客户端完全零 JavaScript 运行时开销。

`.md` 与 `.mdx` 文件扩展名均可自由使用。

::: callout tip "为什么在 docmd 中使用 MDX？" icon:sparkles
MDX 为从 Nextra、Docusaurus 或 Mintlify 等框架迁移而来的团队提供了熟悉的编写体验，无需重写现有 Markdown 内容即可平滑渲染组件。
:::

## 安装与配置

安装官方 MDX 插件：

```bash
docmd add mdx
```

或者在你的 `docmd.config.json` 中声明该插件：

```json
{
  "plugins": {
    "mdx": {}
  }
}
```

## 内置组件映射

该插件将常见文档组件直接映射为原生 `docmd` 容器：

### 提示框 (`<Callout>`)

```jsx
<Callout type="tip" title="专业提示">
  在同一篇文档中可自由使用标准 JSX 标签或 docmd 原生容器。
</Callout>

<Callout type="warning" title="注意事项">
  请在构建前确保依赖包已完成更新。
</Callout>
```

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `type` | `String` | `info` | 提示框样式类型（`info`、`tip`、`warning`、`danger`）。 |
| `title` | `String` | `undefined` | 顶部展示的标题文本。 |
| `icon` | `String` | `undefined` | 可选的 Lucide 图标名称或 Iconify 标识。 |

### 卡片与网格布局 (`<Card>`, `<Cards>`)

将链接与导览项组合为响应式网格布局：

```jsx
<Cards cols={2}>
  <Card title="快速上手" href="/getting-started/quick-start" icon="rocket">
    了解如何初始化并配置你的第一个 docmd 文档站点。
  </Card>
  <Card title="CLI 参考" href="/reference/cli-commands" icon="terminal">
    完整的命令行接口命令、参数选项与诊断工具。
  </Card>
</Cards>
```

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `cols` | `Number` | `2` | 网格列数（`1`、`2`、`3` 或 `4`）。 |
| `title` | `String` | `undefined` | 卡片标题。 |
| `href` | `String` | `undefined` | 链接目标地址。 |
| `icon` | `String` | `undefined` | 卡片图标标识。 |

### 选项卡 (`<Tabs>`, `<Tab>`)

呈现跨平台代码片段或多语言指南：

```jsx
<Tabs>
  <Tab label="pnpm">
    ```bash
    pnpm add docmd
    ```
  </Tab>
  <Tab label="npm">
    ```bash
    npm install docmd
    ```
  </Tab>
  <Tab label="bun">
    ```bash
    bun add docmd
    ```
  </Tab>
</Tabs>
```

同样支持复合点号标签写法：

```jsx
<Tabs>
  <Tabs.Tab label="macOS">
    `brew install docmd`
  </Tabs.Tab>
  <Tabs.Tab label="Linux">
    `curl -fsSL https://docmd.io/install.sh | sh`
  </Tabs.Tab>
</Tabs>
```

### 步骤条 (`<Steps>`)

创建带序号的分步安装向导与实战教程：

```jsx
<Steps>
  ### 初始化项目
  在项目根目录下执行 `docmd init`。

  ### 添加文档
  使用 Markdown 或 MDX 在 `docs/` 目录下编写文档页面。

  ### 构建站点
  执行 `docmd build` 生成可用于生产发布的静态网页。
</Steps>
```

## 语法对比

你可以根据个人习惯或现有项目规范自由选择原生容器语法或 JSX 标签：

| 特性 | 原生容器 (`:::`) | MDX 组件 (`<Component>`) |
| :--- | :--- | :--- |
| **语法风格** | Markdown 原生风格 (`::: callout`) | JSX/React 风格 (`<Callout>`) |
| **依赖环境** | 完全零外部依赖 | 通过 `@docmd/plugin-mdx` 内置集成 |
| **复合层级** | 嵌套容器结构 | 点号标记法 (`<Tabs.Tab>`) |
| **表达式** | 模板变量 (`$var`) | 动态计算表达式 (`{expr}`) |
| **迁移通用性** | 最清爽的纯文本 Markdown | 直接兼容 Docusaurus / Nextra |

::: callout tip "完整语法参考" icon:book-open
有关表达式、属性类型及注释语法的完整规范，请参阅 [MDX 语法指南](syntax/mdx.md)。
:::
