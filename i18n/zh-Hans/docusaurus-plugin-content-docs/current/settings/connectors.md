---
sidebar_position: 3
title: Connectors
---

# Connectors

![Connectors 面板](/img/open-science/settings-connectors.png)

Connector 将 MCP server 暴露给 agent。内置项可启用；自定义项可新增、编辑、导入、导出和移除。运行 Connector tool 仍受 Permissions 与 connector policy 控制。

## 列表

列表提供分类/状态筛选、Search、`Add connector` 与 `Import`。点击卡片或名称进入详情；开关启用/禁用；自定义项的 actions 包含 Edit、Export、Remove。OAuth 项会显示未连接、等待授权、已连接或过期，按提示重新连接。

## Add connector 表单

| 输入 | 说明 |
| --- | --- |
| `Connector type` | 本地 stdio 或远程 HTTP/SSE 类连接 |
| `Display name` | 用户可见名称 |
| `Connector ID` | 稳定标识；保存后用于 policy 与工具命名 |
| `Description` | 说明提供哪些数据/动作 |
| `Command` | stdio 启动程序（如 npx）；Custom 可填绝对 executable |
| `Arguments` | 传给 command 的参数；按界面格式输入 |
| `Environment variables` | 每行 `KEY=value`；秘密值不要出现在描述中 |
| `Server URL` | 远程 MCP endpoint |
| `Transport` | 选择远程传输协议 |
| `Authentication` | None、OAuth 或 headers 等受支持方式 |
| `OAuth scopes` | 空格分隔 scope |
| `Authorization server URL` | 可留空自动发现，或显式指定 |
| `Client metadata URL` | 动态客户端注册相关信息 |
| `Headers` | 每行 header；API key/token 在此属于敏感信息 |
| `I trust this connector` | 明确确认你信任其代码、服务和数据处理 |

`Cancel` 返回列表，`Add/Save` 在校验通过后写入。没有勾选 Trust 时高风险自定义 Connector 不可提交。

## 详情、模板与导入导出

Detail 展示 transport、命令/URL、auth、状态、capabilities 与 policy，提供 Test/Reconnect/Edit/Export/Remove。Import 先选择包/配置，`Configuration preview` 与 `Configuration diagnostics` 展示将写入的字段；错误必须修复后才能 `Import`。Export 生成可共享模板时不会把本机秘密当作普通文本外泄；导入者仍需补充凭据。

Connector 第一次执行可能弹出 Deny、Allow once、Allow for session、project 或 global。宽 scope 会增加后续自动调用范围，应优先 once/session。
