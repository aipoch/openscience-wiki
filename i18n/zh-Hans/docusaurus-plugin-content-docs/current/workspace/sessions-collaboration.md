---
sidebar_position: 7
title: 会话分支、Side chat 与 Subagents
---

# 会话分支、Side chat 与 Subagents

## 消息修订与分支

编辑历史消息会创建 revision。使用 `Previous/Next message revision` 回看；从旧节点继续时，Branch 产生独立后续路径，原分支仍可访问。分支适合对比方法或模型，不应用来掩盖失败运行。

## Side chat

`More send options` → `Side chat` 打开旁路讨论。它用于澄清概念、撰写辅助文本或讨论下一步，避免立即改变主 session 的执行序列。面板可关闭；需要把结论带回主线时，明确复制或引用，不要假设上下文自动合并。

## Specialists

Agent controls 可选择 Specialist。Specialist 是带身份、说明、基础提示词和能力边界的可复用 agent 配置。切换时界面会处理当前运行屏障；涉及删除或切换 active specialist 的敏感请求会显示专门确认详情。

## Delegation 与 Subagents

启用 Delegation 后，主 agent 可以派生 subagent。每个 subagent 有自己的状态、消息行和 notebook runs，但仍归属当前项目/session。委派卡显示问题、目标和生命周期；返回结果会进入主时间线。

- `Subagent model` 与其 Reasoning effort 在 Settings → Model 设置。
- Settings → Agent 控制当前 framework 是否支持 delegation。
- subagent 的权限请求仍必须可见；面板显示等待数量。
- `Release` 结束/释放子任务资源，不应被理解为删除主会话证据。
- Session Notebook 的 Agent 下拉可以只看某个 subagent 的执行。

## Context window

Composer `+` → `Context` 显示模型上限、当前使用和趋势。达到阈值时 agent 可触发 compaction，时间线出现明确活动记录。更换更大上下文模型不会自动恢复已压缩内容；重要输入应保存为项目文件并用 `@` 引用。

## 归档与删除

`Archive` 是可恢复的整理操作，Settings → Archived 可 Restore；`Delete` 是永久操作并要求确认。删除前应下载所需 artifact/Notebook，并确认没有以该项目文件为唯一来源的外部结论。
