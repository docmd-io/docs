---
title: "资源管理 (Assets Management)"
description: "docmd 如何在构建过程中处理 CSS、JavaScript 和图像资源。"
---

`docmd` 对资源采取“镜像与映射”的方法。这确保了你的本地开发路径与生产构建保持一致。

## 目录结构

默认情况下，`docmd` 会在项目根目录下寻找 `assets/` 文件夹。

```bash
my-docs/
  ├── assets/          # 源码资源
  │   ├── css/
  │   ├── js/
  │   └── images/
  ├── docs/            # 内容
  ├── docmd.config.js
  └── site/            # 构建输出 (自动镜像)
```

## 自动复制

当你运行 `docmd build` 或 `docmd dev` 时：
1.  **镜像逻辑**: `assets/` 文件夹的全部内容会被递归复制到 `site/assets/`。
2.  **稳定性**: 我们使用经过加固的复制引擎，支持自动重试，以防止在 macOS 和现代 SSD 上出现“文件忙”或“ENOENT”错误。
3.  **引用**: 你应该始终使用 **相对于根目录的路径** 在 Markdown 或配置中引用资源：
    ```markdown
    ![Logo](/assets/images/logo.png)
    ```

## 自定义 CSS 与 JS 集成

要将你的资源链接到每个页面，请将它们添加到你的主题配置中：

```javascript
// docmd.config.js
export default {
  theme: {
    customCss: ['/assets/css/branding.css']
  },
  customJs: ['/assets/js/utils.js']
}
```

::: callout info "AI 识别策略 :robot:"

*   **按类型组织**: 保持 `/css`、`/js` 和 `/images` 的分离。当你要求 AI 代理“编辑页眉颜色”时，这有助于它们立即定位相关的样式或脚本。
*   **使用描述性的文件名**: 将图像命名为 `authentication-flow-diagram.png` 比 `img_01.png` 能为 `llms.txt` 爬虫提供更多的上下文。

:::