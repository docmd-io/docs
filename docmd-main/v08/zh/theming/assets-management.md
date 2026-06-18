---
title: "资源管理"
description: "docmd 在构建过程中如何处理 CSS、JavaScript 和图片资源。"
---

`docmd` 采用"镜像与映射"的方式来处理资源。这确保了您的本地开发路径与生产构建保持一致。

## 目录结构

默认情况下，`docmd` 会在项目根目录查找 `assets/` 文件夹。

```bash
my-docs/
  ├── assets/          # 源资源
  │   ├── css/
  │   ├── js/
  │   └── images/
  ├── docs/            # 内容
  ├── docmd.config.json
  └── site/            # 构建输出（自动镜像）
```

## 自动复制

当您运行 `npx @docmd/core build` 或 `npx @docmd/core dev` 时：
1.  **镜像逻辑**：您的 `assets/` 文件夹的全部内容会递归地复制到 `site/assets/`。
2.  **稳定性**：我们使用强化的复制引擎，并具备自动重试机制，以防止在 macOS 和现代 SSD 上出现"File Busy"或"ENOENT"错误。
3.  **引用**：您应该始终使用**根相对路径**从 Markdown 或配置中引用资源：
    ```markdown
    ![Logo](/assets/images/logo.png)
    ```

## 自定义 CSS 与 JS 集成

要将您的资源链接到每个页面，请将它们添加到主题配置中：

```json
{
  "theme": {
    "customCss": ["/assets/css/branding.css"]
  },
  "customJs": ["/assets/js/utils.js"]
}
```

::: callout info "AI 识别策略 :robot:"

*   **按类型组织**：将 `/css`、`/js` 和 `/images` 分开。这有助于 AI 智能体在您要求它们"编辑页头颜色"时即时定位相关的样式或脚本。
*   **使用描述性文件名**：将图片命名为 `authentication-flow-diagram.png` 比 `img_01.png` 为 `llms.txt` 爬虫提供更多上下文。

:::
