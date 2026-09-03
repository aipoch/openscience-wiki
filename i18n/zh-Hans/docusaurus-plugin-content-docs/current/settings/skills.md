---
sidebar_position: 2
title: Skills
---

# Skills

![Skills 面板](/img/open-science/settings-skills.png)

Skill 是按需加载的工作流程说明与资源包。列表分为 Featured（随应用提供）、Imported（从 GitHub/包导入）和 Personal（本地创建）。每行显示名称、说明与启用开关。

## 列表控件

| 控件 | 操作 |
| --- | --- |
| `Conversation imports` → `Skill packages` | 允许 agent 识别对话中附加的 `.zip`/`.skill` 并在导入前询问 |
| `Filter skills by source` | All、Featured、Imported、Personal 等来源筛选 |
| `Search skills` | 按名称/说明过滤；输入聚焦时支持键盘搜索 |
| `Add skill` | 进入创建、上传或导入入口 |
| 分类标题 | 展开/折叠分类 |
| Skill 名称/说明 | 打开 Detail 查看元数据、SKILL.md 与文件 |
| `Toggle <Skill>` | 决定 agent 是否可自动选择/显式调用该 Skill |

关闭 Skill 不会删除包。Agent 在当前 turn 已加载的说明不会被瞬间撤回；改变用于后续请求。

## 添加与编辑

- 创建 Personal Skill：填写名称、描述和完整 `SKILL.md`，按编辑器校验保存。
- 上传包：选择 ZIP/skill 包，预览 Metadata、SKILL.md 和 Files 后确认。
- 从 GitHub 导入：输入受支持的仓库/路径信息，读取候选清单；导入前显示来源与诊断。
- Detail 中可 Edit、Export、Delete；Featured 通常只能查看/开关。
- 发现 revision conflict 时先刷新或比较，避免覆盖另一处修改。

导入候选的 `Preview`、`Close preview`、文件列表与 diagnostics 用于审查包内容。来自对话的导入还会经过 `Allow/Deny` 权限流程。

## 科研实践

只启用当前研究需要的技能，减少无关选择。引用外部模型或服务的 Skill 仍可能需要网络、Connector、运行时或许可证；“Skill 已启用”不代表依赖已安装。
