---
sidebar_position: 1
title: 完整页面与控件索引
description: 按页面查找 Open-Science 的按钮、输入、开关和结果。
last_update:
  date: '2026-09-24'
---

# 完整页面与控件索引

本页把实际界面入口按页面压缩成可检索清单。状态相关控件只在条件满足时出现；Disabled 表示缺少前置条件，不是实现缺失。


<span id="当前验证覆盖" />

## 查找详细操作

本页用于定位控件。前置条件、操作步骤、预期结果和已知问题以对应教程为准。设置面板见[设置总览](../settings/overview.md)，常用任务见[控件与快捷键](controls.md)，报错处理见[故障排查](../guides/troubleshooting.md)。

## Onboarding

| 页面（按向导顺序） | 控件 | 结果或前置条件 |
| --- | --- | --- |
| Environment | Check again、Continue、检查状态行 | 重新检查主机条件，通过后继续 |
| Data location | Browse…、Use default location instead、Back、Continue | 选择位置；自定义位置需确认 Keep default 或 Restart |
| Agent runtime | 框架卡片、Install、Re-detect、Back、Continue | 安装或选择就绪的活动运行时 |
| Model provider | Provider type、认证方式、条件字段、Test & continue | 必填校验与连接测试；成功后进入下一步 |
| Notebook runtime | 解释器、环境设置、Packages、Back、Finish | 可选设置；已启动的环境准备必须完成或取消后才能结束 |

完整实操见[首次设置](../guides/onboarding.md)和[提供商配置](../guides/providers.md)。

## Home 与项目

| 页面 | 控件 | 结果 |
| --- | --- | --- |
| Home header | GitHub、Search、Library、Theme、Messages、Model settings | 外链、全局搜索、文献资料库、主题、通知、打开 Model |
| Home body | New project、项目卡、Recent session | 新建或打开项目/session |
| Theme menu | System、Light、Dark | 设置外观并同步 General |
| Search | Search input、类别、Advanced filters、结果详情、Esc | 按所需范围[查找消息、文件与文献](../guides/navigation.md) |
| Messages | 通知项、已读操作、Close | 跳转来源和管理未读 |
| Create project | Name、Description、Agent Context、Cancel、Create project | 创建项目；Name 必填 |
| Project actions | Edit/Archive/Delete 等状态相关项 | 修改项目元数据、归档或确认删除 |

## Workspace 左栏与布局

| 控件 | 结果 |
| --- | --- |
| All projects | 返回 Home |
| Project name | 项目入口/菜单 |
| Collapse sidebar | 收起/展开左栏 |
| New | 新 session |
| Customize | 启动 Skill/Specialist 定制对话 |
| Files | 切换右侧项目文件面板 |
| Library | 打开与项目关联的资料库文献 |
| Session row | 切换 session；状态显示 Idle/Running/Permission 等 |
| Session actions | Pin/Unpin、Rename、View notebook、Archive、Delete |
| Messages、Settings、GitHub | 通知、设置、官方仓库 |
| Resize left/right、Collapse preview | 拖动面板或收起预览 |

## Conversation 与 Composer

| 区域 | 控件/输入 | 结果 |
| --- | --- | --- |
| Message | Copy、Edit | 复制；编辑创建 revision |
| Revision | Previous、`n/N`、Next | 浏览消息修订 |
| Assistant result | Usage、Elapsed、generated file | 检查用量/耗时，打开输出 |
| Activity | 折叠标题、Details、Copy、Report error | 展开工具/代码/diff/search/错误 |
| Input | Ask anything、`↑↓`、`/`、`@`、`#`、`⌘K/Ctrl+K` | 输入、历史、Skill、文件/session 引用、搜索 |
| `+` | Attach files、Your files、Review、Context | 暂存新/已有文件、复核、上下文详情 |
| Attachment chip | Preview、Remove | 发送前检查或取消引用 |
| Agent controls | Specialist、Delegation、Auto-review、Permission mode | 改变后续 request 策略 |
| Model | Active model、Reasoning effort | 改变后续 request 的模型/强度 |
| Queue/Send | Queue edit/delete/reorder、Send now、Send、Plan first、Side chat、Branch、Stop | 暂存或发送 follow-up、选择模式、停止运行 |
| Scroll to end | 回到最新消息 |

## 权限、计划与结构化追问

| 表面 | 控件 | 结果 |
| --- | --- | --- |
| Permission | Impact info、Permission info、可展开 Skill 文档、Allow once、Deny | 检查并批准/拒绝一次 |
| Scope confirmation | Cancel、Confirm project/global | 保存更宽 grant；宽 scope 需二次确认 |
| Plan | Approve/Run、Feedback 输入、Cancel | 接受计划、要求修改或取消 |
| Elicitation | 结构化输入/选项、Submit、Cancel | 回答 agent 追问 |
| Subagent permission | 身份/待处理计数、Allow/Deny | 单独审批 subagent 请求 |

## Files 与 Preview

| 控件 | 结果 |
| --- | --- |
| Filter、Search | 过滤 All/Artifacts 和文件名 |
| Grid/List | 改变文件布局 |
| Expand/Exit full screen | 文件库全屏/返回分栏 |
| Category accordion | 展开 uploads 或某 session 的 generated files |
| File card/body | 模态 preview |
| Download | 保存原文件/版本 |
| Open in split view | 添加右侧 preview tab |
| Preview tab、Close tab | 切换/关闭预览 |
| Full screen preview | 放大当前文件 |
| File actions → Provenance | 打开 artifact 证据；普通 upload 无此项 |
| File actions → Edit/Compare | 发布新文本版本或与前一版本比较 |
| Previous/vN/Next | 切 artifact version |
| PDB Cartoon/Stick/Sphere/Surface/Line | 改变三维表示方式 |
| PDF/Office/Image controls | 翻页/搜索、缩放、选择 PDF evidence、缩略图或下载 |
| Preview content context menu | 按来源提供 Copy path、Download、Save as artifact、Provenance 或返回上下文 |

## 文献资料库

| 区域 | 控件 | 结果 |
| --- | --- | --- |
| 侧栏 | Inbox、All references、Duplicates、Trash、Projects、Collections、Citation settings | 选择 catalog scope 或管理引用样式 |
| Add | Add reference、Import PDF、Import references | 创建元数据或预览 PDF/BibTeX/RIS/NBIB 导入 |
| Catalog | Search、Sort、Filters、Customize columns、page size | 筛选并排列文献 |
| Selection rail | 集合/项目目标、全文查找、Trash、export | 对已选文献执行有边界的批量操作 |
| 文献详情 | 元数据 edit/complete、标识符、集合、项目、附件、citation、full text | 检查或更新单条文献 |
| Inbox | Accept、Dismiss、batch selection、Undo | 文献正式入库前复核智能体候选项 |
| Duplicates | Select groups、Compare、字段选择、Merge | 复核并合并记录，同时保留关联 |
| Background tasks | Pause、Resume、Review、Cancel | 控制批量元数据/全文任务 |

## Notebook 与 Provenance

| 页面 | 控件 | 结果 |
| --- | --- | --- |
| Notebook | Agent filter、Python/R/Bash tabs、Variables | 按 agent/语言查看 run，或检查 live kernel namespace |
| Notebook cell | Copy、Show/Hide output | 复制输入、展开输出 |
| Notebook footer | Download `.ipynb`、Close | 可转换时下载；关闭对话框 |
| Provenance | version arrows、Close Provenance | 版本导航/返回 preview |
| Provenance tabs | Code、Execution Log、Messages、Environment、Review | 切换证据类型 |
| Code | Generate script、Download、Copy | 生成派生脚本或保存 producer block |

## 书签与旁聊

| 入口 | 控件与行为 |
| --- | --- |
| 私人阅读书签 | 选区 → For me → Bookmark；输入框 Bookmarks 打开列表，可编辑备注、返回来源或删除书签。[详细说明](../guides/bookmarks.md) |
| Side Chat 标签 | 独立标签与追问草稿、批注转移、取消生成，以及删除旁聊的关闭确认。[详细说明](../guides/delegation.md) |

## Settings 全局

**Search settings** 可以跨四组面板查找设置。`Back`、`Forward`、面包屑、`Maximize/Restore`、`Close settings`、移动端导航及错误 `Dismiss` 适用于设置框架。分组与搜索快捷键见[设置中心总览](../settings/overview.md)。

### Skills

Conversation Skill imports、source filter、Search、Add skill、分类折叠、Skill detail、Enable toggle、Create/Upload/Import、Preview、Edit、Export、Delete、Cancel/Save。

### Memory、Tags、Credentials 与 Usage

Memory category/entry 的 Create、Edit、Delete、Clear；Tags 的 create/edit/delete、assignment、Favorites、filter 与 reorder；Credentials 的 create/recover/remove、health、usage 与 Connector binding；Usage 的 period、metric、heatmap、daily chart、Turns/Calls 与 grouping。

### Connectors

Filter/Search、Add/Import、Enable、Detail、Test/Reconnect、Edit、Export、Remove；Add form 包含 Type、Display name、ID、Description、Command、Arguments、Environment variables、URL、Transport、Authentication、OAuth scopes、Authorization server URL、Client metadata URL、Headers、Trust、Cancel、Add/Save。

### Specialists

Category filter、Search、Enable、Detail、Actions、Create/Import；Editor 包含 Icon、Color、Name、Description、Instructions、Full access、Capability type、Skill/Connector searches、selected capabilities、Cancel、Save。Import 包含 Select ZIP、Preview、Diagnostics、Cancel、Import。

### Compute

Add host、Host card/enable、Probe/Retry、Detail/Edit/Remove、Resources、Direct SSH/Slurm execution mode、Details document、Scratch root Edit/Input/Save/Cancel、Concurrent job limit Edit/Input/Save/Cancel；执行审批含 Deny、once、session、project、global。

### Network

Check again；Proxy System/Manual/Direct；Notebook domain allowlist；Package mirror Configure/Edit；Conda channel、pip index、CA bundle；View mirrors、Cancel、Save。

### Model

Active model、Reasoning radios、Subagent/Reviewer/Vision/Session-details model policy；Provider Test/Edit/Delete/Add；Provider 表单所有 Onboarding Model 字段以及 Cancel/Save。

### Agent

OpenCode/Claude/Codex/CodeBuddy framework card、Switch、Install source、Install/Cancel/Retry、Install log、Repair、Sign in/auth、Import config/home、Uninstall confirmation。

### Permissions

Default profile；scope filter；grant scope link、connector hint、Revoke 与确认；不完整 store 警告/刷新。

### Runtimes

Python/R；环境 Enable、Add interpreter、Download/setup、Repair、Allow package install、Packages、Filter、Add/Install/Remove package、Disable/Uninstall 与确认。

### Storage

Application storage Reveal/Repair；Data location Change、Path、Browse、检查、Migrate/Adopt/Cancel；迁移进度 Cancel/Retry/Restart/Discard；Disk usage 分类展开。

### General

Task notifications、Theme radios、App icon radios、close behavior、GitHub token Open/Input/Save/Clear、About/Check updates/安装更新。

### Remote control

Start/Stop/Refresh、Copy/Open URL、QR；Remote.It setup/retry/disconnect；Trusted browser Revoke；Pair request Reject/Allow once/Always trust。

### Archived

Project Manage、Restore project、Delete project；Session Restore/Delete；删除确认 Cancel/Confirm。


## 文献筛选与资源访问 {/* #screening-and-access */}

| 区域 | 控件 | 指南 |
| --- | --- | --- |
| 文献库 | Smart collection、Scope、Inclusion criteria、Exclusion criteria、Use available full text、Live rule preview、Update automatically | [智能集合](../guides/library.md#smart-collections) |
| 智能集合 | Trial run、判断视图、Evaluation details、Include、Exclude、Use model decision、导出纳入文献 | [筛选与复核文献](../workflows/screen-literature.md) |
| 分类模型 | 独立的 Smart collections 与 Automatic capability selection 绑定；Check model | [模型绑定](../guides/models.md#smart-collection-model) |
| Skills / Connectors | Manage access、Main Agent、Specialist associations、只读角色绑定 | [资源访问](../guides/connectors.md#resource-access) |
| 会话 | Export diagnostics、所选来源、Export、Show in folder | [本地诊断导出](../guides/troubleshooting.md#session-diagnostics) |
