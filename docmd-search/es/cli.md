---
title: "Referencia CLI"
description: "docmd-search 的完整命令行参考。包含所有命令、Flag 和使用示例。"
---

`docmd-search` 提供了命令行界面，用于对文档进行索引并直接搜索你的文件。

## 使用语法

```bash
docmd-search [directory] [options]
```

如果未指定目标目录，`docmd-search` 将对当前目录 (`.`) 进行索引。

## 主要命令与模式

### 索引与终端搜索

```bash
docmd-search ./docs
```

对指定文件夹进行索引，并启动交互式终端搜索界面。增量索引会自动跳过未修改的文件。

### 索引与 Web 界面服务器

```bash
docmd-search ./docs --ui
```

对文件夹进行索引，并启动本地 Web 服务器以预览 Web 搜索界面。

### 交互式设置菜单

```bash
docmd-search --settings
```

打开终端配置菜单，以选择嵌入模型或更新全局偏好设置。

### 帮助

```bash
docmd-search --help
```

### 版本

```bash
docmd-search --version
```

## 命令行 Flag

| Flag | 缩写 | 说明 |
| :--- | :----------- | :---------- |
| `--ui` | | 索引完成后启动本地浏览器预览服务器 |
| `--dev` | | 启用详细的日志输出（文件路径、模型设置、调试耗时） |
| `--model <id>` | | 覆盖当前运行的嵌入模型 |
| `--settings` | | 打开交互式终端设置菜单 |
| `--version` | `-v` | 显示已安装的软件包版本号 |
| `--help` | `-h` | 显示使用语法和可用 Flag |

## 使用示例

::: tabs
== tab "目录索引" icon:folder
```bash
# 索引工作区中的 docs/ 子文件夹
docmd-search ./docs

# 索引当前目录
docmd-search .

# 不带参数运行（索引当前目录）
docmd-search
```
== tab "Web 界面服务器" icon:globe
```bash
# 索引并启动浏览器预览 UI
docmd-search ./docs --ui

# 在启用详细日志记录的情况下启动
docmd-search ./docs --ui --dev
```
== tab "模型覆盖" icon:cpu
```bash
# 为国际化 i18n 站点构建强制使用多语言模型
docmd-search ./docs --model Xenova/paraphrase-multilingual-MiniLM-L12-v2

# 强制使用高维多语言模型
docmd-search ./docs --model Xenova/paraphrase-multilingual-mpnet-base-v2

# 在不修改全局 config.json 的情况下覆盖模型
docmd-search ./docs --model Xenova/all-MiniLM-L6-v2
```
== tab "CI/CD 构建流水线" icon:git-branch
```bash
# 将索引文档作为构建脚本的一部分
docmd-search ./docs
# _docmd-search/ 文件夹被生成为静态输出资源
```
:::

## 退出代码 Exit Codes

| 退出代码 | 含义 |
| :-------- | :------ |
| `0` | 成功（索引完成、终端搜索正常退出或打印了帮助/版本） |
| `1` | 失败（缺少必要的 Peer 依赖项、路径无效或发生意外错误） |

## 文件与配置路径

- **全局配置文件**: `~/.docmd-search/config.json` (存储全局模型选择与设置)
- **项目配置文件**: `_docmd-search/config.json` (存储项目级覆盖设置)
- **模型权重缓存**: `~/.docmd-search/models/` (存储已缓存的 ONNX 模型文件)

::: callout info "Peer 依赖项"
生成向量嵌入需要 `@huggingface/transformers` 和 `onnxruntime-node`。如果未安装它们，CLI 将显示安装说明并以代码 `1` 退出。
:::
