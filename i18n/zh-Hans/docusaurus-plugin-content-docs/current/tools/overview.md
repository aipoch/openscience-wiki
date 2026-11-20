---
title: "探索工具"
last_update:
  date: '2026-11-20'
---

# 探索工具

按需要的结果选择工具：获取记录、查看文件、执行计算或连接外部服务。这些能力集成在应用里，但准备条件和验证方式不同。

## 选择工具大类

| 需要 | 入口 | 准备条件 | 完成后检查 |
| --- | --- | --- | --- |
| 读取文件、规划、计算、保存结果 | [内置研究工具](./built-in.md) | 可访问项目输入与操作授权 | 工具返回、文件和执行记录 |
| 查找公开网页并阅读来源正文 | [网页搜索](./web-search.md) | 内置 Open-Science Agent、Main 模型和网络 | 来源 URL、返回正文及截断提示 |
| 查询方法依赖的科学软件 | [科学工具目录](./catalog.md) | 软件、权重与 Skill 安装分开检查 | 实际可执行程序或导入及版本 |
| 运行 Python、R 或科学任务 | [科学工具](./scientific.md) | 所选环境、包或 Compute Host | 代码、错误、结果检查与溯源 |
| 查询生物医学和科学记录 | [科学数据库](./databases.md) | Connector、网络与必要凭据 | 来源 ID、返回字段和截断信息 |
| 查看 CSV、TSV 或表格文件 | [表格与数据集](./tables.md) | 支持的文件和当前输入 | 可见范围、分隔符和完整维度 |
| 查看论文、序列、结构等结果 | [科学查看器](./viewers.md) | 支持的格式 | 内容及预览限制 |
| 接入 MCP 服务 | [Connectors 与 MCP](./mcp.md) | 服务器配置和信任 | 连接状态与真实调用 |
| 设置服务身份或密钥 | [服务凭据](./credentials.md) | 对应服务的可用账号 | 校验结果或小范围查询 |
| 为本地数据提供自定义工具 | [自定义 MCP](./custom.md) | 可运行服务及输入结构 | 发现、成功调用与真实错误行为 |

## 区分不同可用状态

**Listed** 表示应用知道该资源，**Enabled** 表示所选 Agent 可以使用。**Connected** 证明建立了连接，不保证某个查询参数正确。**Executed** 表示真实调用返回了结果或错误。**Verified** 表示对照任务检查了结果。

本地示例采用真实 GSE60450 RNA-seq 计数、只读 QC 服务、阿司匹林结构及公开序列/结构文件，中英文均使用英文应用截图。没有在本机完成的远程 GPU/SSH 和凭据相关操作会明确标出。

![应用中已连接的 QC Connector](/img/open-science/capabilities-walkthrough/09-mcp-connected.webp)

## 提出范围明确的请求

说明来源、操作和预期输出。数据库查询应包括编号类型和小范围条数限制；计算应说明输入、语言和检查要求。工具不可用时要求真实错误，模型凭记忆回答不等于调用成功。

[Skill](../skills/overview.md) 提供方法，[Specialist](../specialists/overview.md) 提供角色；两者都不会自动安装软件、提供凭据或使不可访问文件变得可读。

实现依据: [ConnectorsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorsPanel.tsx), [preview-support.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts)。
