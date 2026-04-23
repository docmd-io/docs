---
title: "处理文档中的破坏性更改与废弃 API"
description: "有关废弃 API 的处理综合指南。"
---

## 问题
删除过期的命令若不在当前文档警告，迁移的开发者会困惑不解。

## 为什么重要
缺乏废弃声明浪费用户的调试时间并且破坏迁移平滑度。

## 方法
利用 `::: callout` 断开读者的注意力，指向替代方法。

## 实施
在新文件开头显式警告老语法的失效，并且嵌入超链接 `[Read the Configuration documentation here](../../configuration/general.md)`。

## 权衡
它增加了跨版本清理“废弃声明”的后期工作负荷。
