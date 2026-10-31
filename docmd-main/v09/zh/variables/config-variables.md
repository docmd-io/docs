---
title: 配置与自定义变量
description: 如何在 docmd.config.json 中定义自定义变量、加载外部变量文件并在配置字符串与正文中引用变量。
---

# 配置与自定义变量

您可以直接在 `docmd.config.json` 中定义自定义变量，或从外部 JSON 文件及 JavaScript 模块中导入，并在整套文档中随处使用。

## 在 `docmd.config.json` 中声明变量

在 `docmd.config.json` 中添加 `variables` 字段：

```json
{
  "title": "Acme 云平台文档",
  "variables": {
    "companyName": "Acme Technologies",
    "supportEmail": "support@acme.com",
    "cloud": {
      "apiEndpoint": "https://api.acme.cloud/v2",
      "region": "cn-north-1",
      "maxInstances": 50
    }
  }
}
```

### 在 Markdown 中引用

嵌套对象可以通过标准点号语法访问：

```markdown
如需联系技术支持团队，请发送邮件至 [{{ supportEmail }}](mailto:{{ supportEmail }})。

所有生产接口请求均应路由至我们的接入端点：
```bash
curl -X GET {{ cloud.apiEndpoint }}/status \
  -H "X-Region: {{ cloud.region }}"
```
```

在构建完成后，上述内容将直接编译输出为：

```bash
curl -X GET https://api.acme.cloud/v2/status \
  -H "X-Region: cn-north-1"
```

## 在配置字段中直接引用变量

docmd 会在渲染站点布局、页脚及横幅**之前**执行变量注册流程。

这意味着您可以在配置选项本身中直接引用内置变量（如 `{{ docmd.buildYear }}`）及自定义变量：

```json
{
  "title": "Acme Docs",
  "variables": {
    "companyName": "Acme Cloud Systems"
  },
  "footer": {
    "copyright": "版权所有 © {{ docmd.buildYear }} {{ companyName }}。保留所有权利。"
  },
  "layout": {
    "banners": {
      "top": {
        "content": "正在运行 {{ title }} v{{ docmd.version }}，部署区域：{{ env.DEPLOY_REGION || 'global' }}。"
      }
    }
  }
}
```

### 解析周期运作原理

1. **注册阶段**：`docmd build` 启动时，`VariableRegistry` 会预先登记所有内置变量（`docmd.buildYear`、`docmd.version` 等）、环境变量以及在配置中声明的 `variables`。
2. **配置插值**：docmd 递归遍历 `docmd.config.json`（如 `footer.copyright`、`layout.banners`、`title`）并解析所有的 `{{ variable }}` 占位符。
3. **正文渲染**：Markdown 渲染器使用相同的变量注册表来替换页面文档中的占位符。
4. **最终效果**：无论是全局页脚还是具体的正文段落，都将呈现完全一致的解析结果，无需人工重复维护。

## 外部变量文件

针对大型项目或团队共享的数据集，您可以将 `"variables"` 指向外部 JSON 或 JavaScript 文件：

### 外部 JSON 文件

```json
{
  "variables": "./data/variables.json"
}
```

其中 `./data/variables.json` 内容为：

```json
{
  "auth": {
    "oauthUrl": "https://auth.acme.com/oauth2/token"
  }
}
```

### 动态 JavaScript 模块

您也可以使用 JavaScript 模块来动态计算变量（例如读取版本号或调用系统计算）：

```json
{
  "variables": "./data/variables.js"
}
```

其中 `./data/variables.js` 导出一个对象或函数：

```javascript
module.exports = {
  dynamicTimestamp: new Date().toLocaleDateString(),
  sdkVersion: require('./package.json').version
};
```
