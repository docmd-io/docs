---
title: "MDX 语法"
description: "docmd 中 JSX 标签、自闭合元素、复合标签、表达式与属性的语法指南。"
---

`docmd` 通过轻量级 `lite-mdx` 编译器原生支持 MDX 与 JSX 语法。你可以在 Markdown 文件中直接编写 JSX 标签、属性以及动态 JavaScript 表达式，并与标准 Markdown 语法无缝共存。

同时支持 `.md` 与 `.mdx` 文件扩展名。

::: callout tip "与容器语法共存" icon:sparkles
你可以在同一篇文档中自由混合使用标准 Markdown、docmd 原生容器（`::: callout`）以及 JSX 标签（`<Callout>`），二者完全兼容。
:::

## 标签与元素

### 自闭合标签

对于独立微件、徽标及内联指示器，推荐使用自闭合标签：

```jsx
<Badge text="v0.9.10" type="info" />
<Badge text="Stable" type="success" />
<Separator />
```

### 块级组件

块级组件用于包裹 Markdown 内容。其内部继续完全支持标准 Markdown 格式化、代码片段、列表以及超链接：

```jsx
<Callout type="tip" title="专业提示">
  块级组件内部支持标准 Markdown 格式化，例如 **粗体文本**、`行内代码` 和列表：

  * 第一项列表内容
  * 第二项列表内容
</Callout>
```

## 复合与点号组件

`docmd` 支持通过点号标记法解析嵌套及复合组件：

```jsx
<Tabs>
  <Tabs.Tab label="pnpm">
    ```bash
    pnpm add docmd
    ```
  </Tabs.Tab>
  <Tabs.Tab label="npm">
    ```bash
    npm install docmd
    ```
  </Tabs.Tab>
</Tabs>
```

你也可以直接使用标准的嵌套标签，例如在 `<Tabs>` 中嵌套 `<Tab>`，或在 `<Steps>` 中嵌套 `<Step>`。

## 属性与参数

MDX 支持标准 JSX 属性语法：

### 字符串属性

```jsx
<Card title="快速上手" href="/getting-started" icon="rocket" />
```

### 数值与布尔属性

使用花括号 `{}` 包裹的值会被解析为数值或布尔值：

```jsx
<Cards cols={3} interactive={true} />
```

### 布尔简写

单独指定属性名称等同于将其设为 `true`：

```jsx
<Card interactive title="可点击卡片" />
```

### 对象与数组

使用双重花括号传递对象或数组：

```jsx
<Chart config={{ responsive: true, theme: "dark" }} data={[12, 19, 3]} />
```

### 展开属性（Spread）

将已有属性对象解构传递到组件中：

```jsx
<Card {...cardOptions} />
```

## 动态表达式

MDX 允许使用花括号 `{}` 在正文中插值计算动态表达式。

### 访问 Frontmatter

插值访问文档顶部声明的 Frontmatter 元数据：

```mdx
---
title: "版本发布说明"
version: "0.9.10"
author: "docmd 团队"
---

# {frontmatter.title}

当前版本：**{frontmatter.version}**  
维护者：*{frontmatter.author}*
```

### 访问站点配置

读取 `docmd.config.json` 配置文件中的配置项：

```jsx
欢迎阅读 {config.title} 文档。
```

### JavaScript 表达式

支持在行内对常见 JavaScript 表达式求值：

```jsx
版权所有 © {new Date().getFullYear()} docmd.io.
计算超时：{1000 * 5}ms。
```

::: callout note "沙箱安全求值" icon:shield
表达式均在安全的隔离沙箱中运行，仅能访问当前文档 Frontmatter 属性、站点全局配置以及基础通用数学工具函数。
:::

## 代码块隔离保护

围栏代码块和行内反引号均受保护，不会触发 JSX 编译。你可以放心地展示 JSX 示例代码：

````markdown
```jsx
<Callout type="warning">此处将直接渲染为原始代码块，不会转为组件。</Callout>
```
````

反引号内的行内代码（如 `<Badge />`）同样会作为纯文本安全保留。

## 注释语法

使用 JSX 注释语法添加内部备注，编译后不会出现在最终页面中：

```jsx
{/* 这是内部注释，不会被渲染到输出中 */}
```
