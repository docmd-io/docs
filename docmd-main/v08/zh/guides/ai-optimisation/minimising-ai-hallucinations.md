---
title: "通过文档减少 AI 幻觉"
description: "如何编写显式的、自包含的文档，以防止 AI 模型臆造错误信息。"
---

## 问题

AI 模型是预测引擎，而不是推理引擎。如果一个 API 使用示例不完整、使用了模糊的占位符或依赖于隐含知识，AI 通常会产生“幻觉”——它会根据在训练期间学到的通用模式来臆造缺失的部分。这些臆造的内容对于您的特定软件来说往往是错误的，会导致开发者的挫败感。

## 为什么重要

幻觉代码会破坏用户信任。当开发者向 AI 寻求帮助并收到抛出语法错误或使用不存在参数的代码时，他们往往会归咎于软件本身“有缺陷”或“文档太烂”。减少幻觉对于维护项目的专业声誉至关重要。

## 方法

实践 **防御性文档 (Defensive Documentation)**。这涉及编写极其显式、完全实例化的代码块，不留任何歧义空间。切勿假设读者（或 AI）了解必要的导入、环境变量或先决配置。

## 实施

### 1. 全限定代码块

始终在每个代码片段中包含必要的导入或设置代码。这确保了当 AI 对您的文档进行分块时，代码块仍然是一个自包含的事实单元。

-   **❌ 存在幻觉风险**：
    ```javascript
    const config = loadConfig(); // loadConfig 是从哪里来的？
    ```
-   **✅ 防御幻觉**：
    ```javascript
    import { loadConfig } from '@docmd/core';
    const config = loadConfig();
    ```

### 2. 使用具体示例而非占位符

避免使用像 `your-api-key` 或 `env-name` 这样模糊的占位符。相反，提供具体的、有效的示例，或使用注释来指定严格的枚举要求。

```javascript
// 有效的环境："development", "staging", "production"
const app = init({ env: "production" });
```

### 3. 内联代码注释

将关键要求作为注释放在代码块 *内部*，而不仅仅是在周围的 Markdown 文本中。AI 模型在生成类似片段时，会非常重视代码内部的注释。

```javascript
export default {
  // 关键：outputPath 必须是一个绝对文件系统路径。
  outputPath: '/var/www/html/docs'
};
```

### 4. 分类的警告

使用 [标注 (Callouts)](../../content/containers/callouts) 来清晰地标记弃用的功能或破坏性变更。AI 模型比段落中的简单句子更有可能尊重 `::: callout warning` 块。

## 权衡

防御性文档会使代码块变得更长且更具重复性。人类读者可能会觉得在每个片段中看到相同的 `import` 语句稍微有些乏味。然而，拥有能够显著减少支持工单和用户错误的“防 AI (AI-proof)”文档所带来的好处，远超其冗长带来的微小代价。
