---
title: "资源管理"
description: "docmd 在构建过程中如何处理 CSS、JavaScript 和图片资源。"
---

`docmd` 采用「镜像映射」方式处理资源，确保本地开发路径与生产构建保持一致。

## 目录结构

默认情况下，`docmd` 会在项目根目录中查找 `assets/` 文件夹。

```bash
my-docs/
  ├── assets/          # Source Assets
  │   ├── css/
  │   ├── js/
  │   └── images/
  ├── docs/            # Content
  ├── docmd.config.js
  └── site/            # Build Output (Automatically mirrored)
```

## 自动复制（v0.5.1+）

运行 `docmd build` 或 `docmd dev` 时：
1. **镜像逻辑**：`assets/` 文件夹的全部内容将递归复制到 `site/assets/`。
2. **稳定性**：采用经过加固的复制引擎，自动重试，防止在 macOS 和现代 SSD 上出现「文件忙碌」或 `ENOENT` 错误。
3. **引用方式**：在 Markdown 或配置文件中引用资源时，请始终使用**根相对路径**：
   ```markdown
   ![Logo](/assets/images/logo.png)
   ```

## 自定义 CSS 与 JS 集成

如需在每个页面加载你的资源，请将其添加到主题配置中：

```javascript
// docmd.config.js
export default {
  theme: {
    customCss: ['/assets/css/branding.css']
  },
  customJs: ['/assets/js/utils.js']
}
```

## AI 可读性策略

添加资源时请注意：
*   **按类型分类存放**：将 `/css`、`/js` 和 `/images` 分开管理。这样当你要求 AI「修改头部颜色」时，它能快速定位相关样式或脚本。
*   **使用描述性文件名**：将图片命名为 `authentication-flow-diagram.png` 比 `img_01.png` 为 `llms.txt` 爬虫提供了更丰富的上下文信息。