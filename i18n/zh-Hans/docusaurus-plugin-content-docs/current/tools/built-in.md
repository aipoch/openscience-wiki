---
title: "内置研究工具"
last_update:
  date: '2026-11-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 内置研究工具

内置操作把对话连接到项目文件、Notebook、文献记录和保存结果。不同 Agent 框架展示方式不同，若干操作可能合并到 **Agent SDK** 或 **Notebook** 活动卡中。

## 按研究任务分类

| 类别 | 提供什么 | 操作和可见结果 | 使用结果前检查 |
| --- | --- | --- | --- |
| 文件发现与读取 | 项目/会话及准确输入 | 列出文件或读取支持内容 | 名称、来源、当前版本；目录条目不等于读取内容 |
| Notebook 执行 | Python/R、环境和有效输入引用 | 代码单元、输出、耗时、状态 | 实际语言与环境、错误、完整数据检查 |
| 结果发布 | 支持的工作路径或内联内容 | 对话/Files 中的版本化结果卡 | 打开文件检查维度/内容并保留版本 |
| 文献检索/导入 | 问题、DOI/PMID、引用文件 | 检索记录、Inbox 候选、文献库条目 | 来源 ID、重复、审核决定、全文访问 |
| 计划操作 | 阶段与完成条件 | Session Plan 步骤状态 | 状态是否有实际输出支撑 |
| Memory | 需要复用的事实或指令 | 对应范围中的记忆 | 内容与范围；区别于项目文件 |
| 加载 Skill | 可用包 ID | 指令和支持资源 | 是否读取准确包；加载不是计算 |
| Specialist 委派 | 角色、任务、输入 | 子任务和 Subagents 对话 | 是否真正开始、执行并报告限制 |
| Review | 可复核回复及设置 | 检查、问题和纠正状态 | 对应回复/版本和可用证据 |

<span id="从请求追踪到结果文件" />

## 从操作追踪到结果

1. 请求中写明输入和目标输出。[首次项目](../guides/first-project.md)提供一个从小表格到报告的任务。
2. 展开活动卡，检查操作、输入和权限范围。
3. 执行后阅读工具结果。若有错误，先处理错误，再使用模型对结果的总结。
4. 打开生成文件卡并核对内容。涉及计算时，打开 Notebook 检查生成结果的代码与运行环境。

完整科研示例见[数据质量工作流](../workflows/data-quality.md)，环境控件见 [Notebook](../guides/notebook.md) 和[运行环境](../guides/runtimes.md)。

## 阅读工具活动

| 元素 | 使用方式 |
| --- | --- |
| 活动分组 | 展开本轮包含的操作 |
| Tool / Agent SDK / Notebook run | 查看可提供的输入、返回和错误，不能只看分组名称 |
| Copy code / 代码展开 | 复制或展示已提交代码，不代表再次运行 |
| Allow / 授权范围 / Deny | 控制当前操作及范围，核对请求 Agent |
| 生成文件卡 | 打开实际保存结果 |
| Open notebook | 查看会话执行记录和变量 |
| 子任务入口 | 打开真实委派对话 |

## 区分输入和输出身份

上传文件、Notebook 工作文件、结果版本不是同一个概念。某个列表里可见的文件不一定已挂载到子任务内核。使用应用提供的当前引用，不能猜路径或把版本 ID 替换为文件名。

Connector 生成的文件可能没有 Python 生产代码。**No producer block**、**No review for this version**、**partial** 环境与 **bounded** 证据均为有效状态，不应使用生成文字补成完整。准确错误和恢复方式参见[故障排除](../guides/troubleshooting.md)。

实现依据: [notebook.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook.ts), [artifacts.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/artifacts.ts), [WorkspaceMessageItem.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/WorkspaceMessageItem.tsx)。

适用的长时间运行操作见[后台任务与结果送达](../guides/notebook.md)。结果送达后检查实际运行和保存输出。Environment & Packages、Compute Environment Setup、Remote Compute (SSH) 保持启用，但运行时、网络和主机要求仍然有效。

查找公开网页时，使用内置 Open-Science Agent 的[网页搜索与来源阅读](web-search.md)。
