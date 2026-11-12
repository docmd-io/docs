---
title: "MDX 组件"
description: "在 docmd 中使用 MDX、JSX 组件语法、动态表达式与复合组件编写交互式文档。"
---

docmd 原生支持 **MDX**，允许您直接在 Markdown 内容中无缝集成 JSX/React 风格的组件与动态表达式。依托 docmd 零依赖的高性能编译器，MDX 可直接静态编译为轻量、无障碍的原生 HTML，无需沉重的打包器（Webpack/Babel）或客户端运行时开销。

您可以同时混用 `.md` 和 `.mdx` 文件扩展名。

## 为什么在 docmd 中使用 MDX？

* **零依赖静态编译**：快速静态生成，无需 Webpack、Babel 或外部 React 打包链。
* **熟悉的 JSX 语法**：对从 Nextra、Docusaurus、Astro Starlight 或 Mintlify 迁移而来的开发者开箱即用。
* **组件和谐共存**：JSX 标签（`<Callout>`、`<Card>`、`<Tabs>`）与 docmd 原生容器语法（`::: callout`）可并存使用。
* **安全的动态表达式**：在受限沙箱中安全求值 frontmatter 属性、站点配置变量以及 JavaScript 表达式。
* **复合点语法标签**：完全支持 `<Tabs.Tab>` 和 `<Steps.Step>` 等层级化复合组件。

---

## 基础组件语法

### 自闭合标签

自闭合标签非常适合行内指示器、徽标（Badges）与独立小部件：

```jsx
<Badge text="Stable" type="success" />
<Badge text="v0.9.10" type="info" />
<Badge text="已废弃" type="danger" />
```

### 包含 Markdown 子内容的块级组件

块级组件用于包裹 Markdown 内容，内部依然完全支持标准 Markdown 语法、代码块、列表和链接：

```jsx
<Callout type="tip" title="技巧提示">
  您可以在 JSX 标签中自由使用 **加粗文本**、`行内代码` 乃至完整代码块：

  ```bash
  npx @docmd/core build
  ```
</Callout>
```

---

## 内置 MDX 组件

docmd 为常见文档交互组件提供了内置支持：

### 标注框 (`<Callout>`)

```jsx
<Callout type="info" title="说明">
  提供上下文引导或系统说明信息。
</Callout>

<Callout type="warning" title="注意">
  警示关键注意事项与重大变更。
</Callout>
```

| 属性 (Prop) | 类型 | 说明 |
| :--- | :--- | :--- |
| `type` | `String` | 变体样式：`info`、`tip`、`warning`、`danger`（默认：`info`）。 |
| `title` | `String` | 可选标注标题文本。 |
| `icon` | `String` | 自定义 Lucide 图标名称或 Iconify 图标标识。 |

### 卡片与网格布局 (`<Card>`, `<Cards>`)

将链接、功能介绍或导航入口组织成结构化的响应式网格：

```jsx
<Cards cols={2}>
  <Card title="快速入门" href="/getting-started/quick-start" icon="rocket">
    了解如何初始化并配置您的首个 docmd 文档站点。
  </Card>
  <Card title="CLI 参考" href="/reference/cli-commands" icon="terminal">
    详细的命令行标志、运行选项与生产服务器配置。
  </Card>
</Cards>
```

### 选项卡 (`<Tabs>`, `<Tab>`)

展示多语言代码片段或不同平台的配置指南：

```jsx
<Tabs>
  <Tab label="npm">
    ```bash
    npm install @docmd/core
    ```
  </Tab>
  <Tab label="pnpm">
    ```bash
    pnpm add @docmd/core
    ```
  </Tab>
  <Tab label="bun">
    ```bash
    bun add @docmd/core
    ```
  </Tab>
</Tabs>
```

同样支持点式层级写法 `<Tabs.Tab>`：

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

为教程或安装流程创建带序号的连贯向导：

```jsx
<Steps>
  ### 初始化项目
  在终端中执行 `npx @docmd/core init`。

  ### 编写内容
  在 `docs/` 目录下使用 Markdown 或 MDX 撰写文档页面。

  ### 生产部署
  运行 `npx @docmd/core build` 编译生产就绪的静态文件。
</Steps>
```

---

## 动态表达式与插值

MDX 支持在花括号 `{}` 中嵌入动态表达式。表达式在安全沙箱中执行，可访问当前文档的 frontmatter 和全局站点配置：

### 读取 Frontmatter 属性

```mdx
---
title: "认证集成指南"
version: "2.4.0"
author: "docmd 团队"
---

# {frontmatter.title}

文档版本：**{frontmatter.version}**  
维护者：*{frontmatter.author}*
```

### 读取站点全局配置

```jsx
欢迎阅读 {config.title} 官方技术文档。
```

### JavaScript 表达式计算

```jsx
版权所有 © {new Date().getFullYear()} docmd.io。
预估构建预算：{500 * 2}ms。
```

---

## 属性与参数 (Props)

MDX 完整支持标准的 JSX 属性语法：

```jsx
{/* 字符串属性 */}
<Card title="配置概览" href="/configuration/overview" />

{/* 数值与布尔表达式 */}
<Cards cols={3} animated={true} />

{/* 布尔简写（等价于 interactive={true}） */}
<Card interactive title="交互卡片" />

{/* 属性展开 (Spread) */}
<Card {...cardProps} />
```

---

## 容器与 MDX 的选择

docmd 原生容器语法（`::: container`）与 MDX 组件（`<Component>`）均为一等公民：

| 特性 | 原生容器 (`:::`) | MDX 组件 (`<Component>`) |
| :--- | :--- | :--- |
| **语法风格** | 原生 Markdown 风格（`::: callout`） | JSX / React 风格（`<Callout>`） |
| **构建依赖** | 零外部工具链依赖 | 零外部工具链依赖（由 `lite-mdx` 驱动） |
| **组件层级** | 缩进嵌套 | 点语法层级（`<Tabs.Tab>`） |
| **动态表达式** | 变量语法（`$var`） | JavaScript 表达式（`{expr}`） |
| **生态兼容性** | 纯文本易读性最佳 | 开箱兼容 Docusaurus / Nextra |

::: callout tip "和谐共存" icon:sparkles
您可以在同一个文档页面中自由混用原生容器与 MDX 组件，二者完全互通、互不干扰。
:::
