---
sidebar_position: 7
title: 权限、计划与活动
---

# 权限、计划与活动

Open Science 把 agent 请求转为可见事件：权限请求必须由当前用户决定，计划可以批准/反馈，工具活动可以展开检查。界面不会把“正在等待”误显示为普通完成。

## 权限请求

![等待权限](/img/open-science/permission-request.png)

请求面板显示标题、Tool access/影响类型、具体动作和来源。侧边栏 session 状态同步变为 `Waiting for permission`。

| 控件 | 结果 |
| --- | --- |
| `Permission impact information` | 查看影响等级的解释 |
| `Permission information` | 查看工具/作用域说明 |
| `Allow once` | 只允许当前这一次请求；相同工具下次仍询问 |
| `Deny` | 拒绝当前请求；agent 收到拒绝并可提出替代方案 |
| `Resize permission panel` | 调整底部审批区高度 |

![权限影响说明入口](/img/open-science/permission-impact-info.png)

当请求来自 subagent，面板显示 pending subagent permission 数量和身份。Project/Global 级的宽授权会再弹出 scope confirmation；阅读目标路径、主机和命令后再确认。

## Plan first

在发送菜单选择 `Plan first` 后，agent 先生成结构化计划。计划面板显示步骤和进度；你可以批准执行、提交修改意见或取消。运行中计划会随工具完成更新；切换分支时只展示 active branch 的计划。

## 活动行

- Tool activity：工具名、状态、参数摘要；点击查看完整参数/输出。
- Code/shell：带行号代码、复制按钮、stdout/stderr 与退出状态。
- Diff：按新增/删除显示文件更改，确认路径和范围。
- Web search：查询词、结果与访问状态。
- Context compaction：记录何时压缩对话上下文，而非静默丢弃。
- Handoff/Subagent：展示委派、进度、返回或释放状态。
- Elicitation：agent 的结构化追问，可提交答案或取消。

## 安全判断顺序

1. 确认请求来自主 agent 还是某个 Specialist/subagent。
2. 核对工具、目标文件/目录、远程主机和命令参数。
3. 判断操作能否恢复；删除、迁移、覆盖和外部写入风险更高。
4. 优先 `Allow once`；只有重复且边界稳定时才扩大作用域。
5. 如果描述与参数不一致，`Deny` 并在消息中要求重新解释。
