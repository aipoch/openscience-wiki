---
sidebar_position: 5
title: Memory、Tags、Credentials 与 Usage
last_update:
  date: '2026-09-03'
---

# Memory、Tags、Credentials 与 Usage

## Memory

Memory 为 opt-in 且按项目隔离。打开 Settings → Memory 可检查当前项目的分类与条目。只记录跨会话仍有价值的信息，错误或过期条目应修改、删除或清空。系统会在相关 turn 前 recall，但不会混入其他项目内容。

不要保存密码、API key、access token、个人健康信息或机密原文。Memory 只是上下文，不是经过验证的证据；使用前仍应与项目文件和 provenance 核对。

## Tags

Tags 可同时组织 Skills、Connectors 与可运行 Specialists。一个资源可分配多个 tag；Settings → Tags 可创建、重命名、排序或删除自定义 tag。`Favorites` 是受保护的本地化 tag，固定在首位。删除自定义 tag 只移除分配关系，不会删除资源。

## Credentials

Settings → Credentials 统一管理 GitHub token、Connector API key、access token 与 OAuth sign-in；每一行会显示健康状态和使用它的 Connector。

1. 在本机创建或恢复 credential。
2. 在 custom Connector 中，将命名 credential 绑定到环境变量、HTTP header 或 OAuth sign-in。
3. 测试 Connector，并检查 tool-level permission policy。

Credential value 只在应用内解析，portable export 会改为 `${API_KEY}` 一类占位符。不要把凭据写入 description、项目文件、截图或公开 issue。若 secure storage 不可用或解密失败，应视为 unhealthy；先修复操作系统凭据服务，再重新输入。

## Usage

Settings → Usage 可按 Today、This week、Last 30 days 或 All time 汇总 token、session、project、run 与 artifact。Provider 上报足够信息时，heatmap 和 daily chart 会区分 input、cache 与 output。Composer 的 Context 可比较 turn-level 与 call-level 占用，并按 turn、model 或 framework 分组。

切换 provider 或 framework 后覆盖率可能不完整；Open Science 会明确提示缺失，而不是编造数据。若有 telemetry，delegation、side chat、compaction、reviewer 与 session-details 等辅助调用也会单独归因。
