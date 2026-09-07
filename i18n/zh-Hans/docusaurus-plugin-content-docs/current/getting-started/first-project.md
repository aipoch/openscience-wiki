---
sidebar_position: 3
title: 第一个项目
last_update:
  date: '2026-08-13'
---

# 创建第一个项目

## 认识主页

![尚无项目的主页](/img/open-science/home-empty.png)

顶部工具包括 GitHub、全局 Search、Theme、Messages 和 Model settings。主体的 `New project` 创建项目；已有项目与最近会话会作为可点击卡片出现。

- `Search`：跨项目、会话和文件搜索；也可以在工作区使用 `⌘K`/`Ctrl+K`。
- `Theme`：在 System、Light、Dark 间切换。
- `Messages`：查看任务完成、权限等待、错误等通知并标记已读。
- `Model settings`：直接进入 Settings → Model。
- GitHub：打开 `aipoch/open-science`。

![主题菜单](/img/open-science/home-theme-menu.png)
![消息中心](/img/open-science/home-message-center.png)
![全局搜索](/img/open-science/global-search.png)

## 新建项目

点击 `New project` 打开表单。

![项目创建对话框](/img/open-science/project-create-dialog.png)

| 字段 | 是否必填 | 建议 |
| --- | --- | --- |
| `Name` | 是 | 使用可辨识的研究问题或实验名；它会出现在侧边栏和搜索中 |
| `Description` | 否 | 描述目标、样本或交付物，不要塞入完整提示词 |
| `Agent Context` | 否 | 写长期约束，例如统计规范、引用规则、输出结构和不可触碰的目录 |

![填写完成的项目表单](/img/open-science/project-create-form.png)

`Cancel` 放弃创建，`Create project` 创建并进入空工作区。创建后可以从项目菜单编辑同类信息；删除项目会连同受管理的项目记录进入确认流程，应先下载重要 artifact。

## 发送第一条请求

1. 在 `Ask anything` 输入具体目标。
2. 点击模型按钮确认 Active model 与 Reasoning effort。
3. 点击 Agent controls 选择 Ask、Auto-approve edits 或 Full access。
4. 如需资料，点击 `+` 选择 Attach files 或 Your files。
5. 点击发送箭头；右侧下拉可选择 `Plan first` 等发送方式。

第一条消息成功后会自动创建 session 并用消息首句命名。详见 [对话与输入区](../workspace/conversation.md)。
