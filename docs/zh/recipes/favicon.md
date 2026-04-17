---
title: "实用技巧：实现自定义网站图标"
description: "通过添加自定义网站图标确立统一品牌形象。"
---

网站图标是浏览器标签页上展示的关键品牌元素。`docmd` 提供集中化配置项，可自动完成该资源的注入和解析。

## 1. 格式准备

虽然 `docmd` 支持 `.png` 和 `.svg` 格式，但为了最广泛的老浏览器兼容性，建议使用 `.ico` 包。确保图片尺寸至少为 32x32 像素。

## 2. 资源存放

将处理好的图片放入项目源目录的 `assets/` 文件夹中。

```bash
# 推荐目录结构
my-project/
  ├── assets/
  │   └── brand-favicon.ico  <-- 源资源
  ├── docs/
  └── docmd.config.js
```

## 3. 配置绑定

在 `docmd.config.js` 中定义 `favicon` 属性。路径应相对于最终 `site/` 输出目录的根目录。

```javascript
export default {
  // ...
  // 映射到 site/assets/brand-favicon.ico
  favicon: '/assets/brand-favicon.ico', 
  // ...
};
```

## 4. 构建与验证

运行 `docmd build`。引擎将自动：
1.  将资源复制到生产构建目录。
2.  将高优先级的 `<link rel="icon">` 标签注入每个生成 HTML 页面的 `<head>` 中。