---
title: "安全与 HTML 策略"
description: "配置 HTML 安全策略、过滤原生 HTML、管理 iframe 嵌入组件并实施 docmd 的安全最佳实践。"
---

`docmd` 提供了稳健的多层安全模型，防止静态站点遭受跨站脚本攻击（XSS）、恶意第三方嵌入以及意外的原生 HTML 注入。

## 安全配置架构

安全规则可以在 `docmd.config.json` 清单文件中进行配置：

```json "docmd.config.json"
{
  "security": {
    "htmlPolicy": "escape",
    "strictLinkSanitizing": true,
    "allowedIframeHosts": [
      "youtube.com",
      "vimeo.com",
      "codesandbox.io",
      "stackblitz.com"
    ]
  }
}
```

## HTML 处理策略 (`htmlPolicy`)

`htmlPolicy` 设置控制 `docmd` 如何处理 Markdown 文件中声明的原生 HTML 元素：

| 模式 | 行为 | 最佳应用场景 |
| :--- | :--- | :--- |
| `"escape"` *(默认)* | 将所有原生 HTML 标签转换为安全的 HTML 实体（如 `&lt;div&gt;`）。防止意外的脚本注入。 | 公开文档站点以及接受不受信任贡献者 Pull Request 的开源仓库。 |
| `"strip"` | 从编译输出中完全剥离原生 HTML 标签。 | 要求的严格企业站点，保持纯粹的 Markdown 内容，不允许任何原生标签。 |
| `"allow"` | 将原生 HTML 元素渲染为可执行的 DOM 节点。 | 包含自定义 Web Component 组件或未设样式的原生 HTML (`noStyle: true`) 的权威技术文档。 |

::: callout warning title:"htmlPolicy: 'allow' 时的 XSS 风险警告" icon:alert-triangle
如果 Markdown 文件包含 `<script>` 标签，将 `htmlPolicy` 设置为 `"allow"` 将会允许任意脚本执行。请仅在 Markdown 内容来源于可信代码仓库时使用 `"allow"`。
::: /callout

## 多行 HTML 块处理

在 `docmd` 中，原生 HTML 块即使包含空行也不会中断解析：

```html
<div class="custom-widget">
    <h3>小部件标题</h3>

    <p>上下带有空行的段落文本。</p>
</div>
```

当 `htmlPolicy` 设置为 `"allow"` 时，`docmd` 会保持外层块级结构，防止 `markdown-it` 误将内层标签解析为缩进代码块或普通文本段落。

## 外部链接隔离

所有由 `docmd` 容器（`::: tag`、`::: button`、`::: card`）和 Markdown 链接（`[文本](https://...)`）生成的外部超链接都会自动进行安全过滤：

```html
<a href="https://external-site.com" target="_blank" rel="noopener noreferrer">外部链接</a>
```

- `target="_blank"` 确保外部链接在独立的浏览器标签页中打开。
- `rel="noopener noreferrer"` 防止目标页面取得 `window.opener` 的控制权或访问当前会话存储。

## 嵌入组件与 Iframe 沙盒隔离

`::: embed` 容器依赖 `embed-lite` 将视频和小工具 URL 转换为带有沙盒隔离的 `<iframe>` 包装器：

```markdown
::: embed https://www.youtube.com/watch?v=dQw4w9WgXcQ # 可信视频嵌入
```

沙盒化的 iframe 默认限制顶级导航、表单提交和直接父级 DOM 操作，同时保留媒体播放能力。