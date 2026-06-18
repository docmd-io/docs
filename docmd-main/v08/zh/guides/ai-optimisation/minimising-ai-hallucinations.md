---
title: "通过文档减少 AI 幻觉"
description: "如何撰写明确、自包含的文档，以防止 AI 模型凭空捏造错误信息。"
---

## 问题

AI 模型是预测引擎，而非推理引擎。如果 API 的使用示例不完整、含有模糊的占位符，或依赖于隐含知识，AI 就会"产生幻觉"。它会基于通用训练模式凭空补全缺失的部分。这些凭空补全常常是错误的，从而引发开发者的挫败感。

## 为什么重要

被幻觉出来的代码会摧毁用户信任。当开发者向 AI 寻求帮助却收到无法运行的代码时，他们会把责任归咎于软件本身的"缺陷"或"文档不足"。减少幻觉对于维护项目的专业声誉至关重要。

## 方法

践行 **防御性文档 (Defensive Documentation)**。撰写极度明确、完整实例化的代码块，不留任何歧义空间。永远不要假定读者（或 AI）了解必要的 import、环境变量或前置配置。

## 实现

### 1. 完全限定的代码块

始终在每个代码片段中包含必要的 import 或初始化代码。这能确保当 AI 对您的文档进行分块时，代码块仍是一个自包含的"真理单元"。

-   **❌ 存在幻觉风险**：
    ```javascript
    const config = loadConfig();
    ```
-   **✅ 杜绝幻觉**：
    ```javascript
    import { loadConfig } from "@docmd/core";
    const config = loadConfig();
    ```

### 2. 使用具体示例而非占位符

避免使用 `your-api-key` 或 `env-name` 这类模糊的占位符。应提供具体的、合法的示例，或通过注释指明严格的枚举取值。

```javascript
// 合法环境："development"、"staging"、"production"
const app = init({ env: "production" });
```

### 3. 内联代码注释

将关键要求作为注释*放在*代码块内，而不是只写在周围的段落里。AI 模型在生成类似代码片段时，会高度权衡代码内的注释。

```javascript
  // 必填：必须是绝对路径
  outputPath: "/var/www/html/docs"
```

### 4. 对警告进行分类

使用 [标注 (Callout)](../../content/containers/callouts.md) 清晰标记已弃用的功能或不兼容变更 (breaking changes)。AI 模型更倾向于尊重一个 `::: callout warning` 块，而非段落中一句普通的话。

## 取舍

防御性文档会让代码块变得更长、更重复。人类读者可能会对反复出现的 `import` 语句感到厌烦。然而，"对 AI 免疫"的文档能够显著减少支持工单，这一收益远超其带来的轻微冗长。