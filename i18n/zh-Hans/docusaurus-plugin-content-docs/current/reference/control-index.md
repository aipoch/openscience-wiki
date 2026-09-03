---
sidebar_position: 1
title: 完整页面与控件索引
description: 按页面查找 Open Science 的按钮、输入、开关和结果。
---

# 完整页面与控件索引

本页把实际界面入口按页面压缩成可检索清单。状态相关控件只在条件满足时出现；Disabled 表示缺少前置条件，不是实现缺失。

## Onboarding

| 页面 | 控件 | 结果/前置条件 |
| --- | --- | --- |
| Environment | 检查行、Retry/Continue | 展示 System/Storage/Secure vault/Install network；关键失败时不能继续 |
| Agent | Framework card、Install、Active、Back/Continue | 安装或选中 agent runtime |
| Model | Provider type/name、Endpoint/Base URL、API format、key、model、context、Images、Reasoning、Test、Add | Test 成功且有可用模型后继续 |
| Notebook | Python/R switch、Add interpreter、Download and set up、Packages | 选择 agent 可用执行环境；可稍后设置 |
| Location | Location、Browse、Back、Finish | 写入数据 root 并完成引导 |

## Home 与项目

| 页面 | 控件 | 结果 |
| --- | --- | --- |
| Home header | GitHub、Search、Theme、Messages、Model settings | 外链、全局搜索、主题、通知、打开 Model |
| Home body | New project、项目卡、Recent session | 新建或打开项目/session |
| Theme menu | System、Light、Dark | 设置外观并同步 General |
| Search | Search input、结果项、Esc | 查找并跳转项目/session/file |
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
| Input | Ask anything、`↑↓`、`/`、`@`、`⌘K/Ctrl+K` | 输入、历史、Skill、文件引用、搜索 |
| `+` | Attach files、Your files、Review、Context | 暂存新/已有文件、复核、上下文详情 |
| Attachment chip | Preview、Remove | 发送前检查或取消引用 |
| Agent controls | Specialist、Delegation、Auto-review、Permission mode | 改变后续 request 策略 |
| Model | Active model、Reasoning effort | 改变后续 request 的模型/强度 |
| Send | Send、Plan first、Side chat、Branch、Stop | 发送不同模式或停止运行 |
| Scroll to end | 回到最新消息 |

## 权限、计划与结构化追问

| 表面 | 控件 | 结果 |
| --- | --- | --- |
| Permission | Impact info、Permission info、Allow once、Deny | 检查并批准/拒绝一次 |
| Scope confirmation | Cancel、Confirm session/project/global | 保存更宽 grant；宽 scope 需二次确认 |
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
| Previous/vN/Next | 切 artifact version |
| PDB Cartoon/Stick/Sphere/Surface/Line | 改变三维表示方式 |
| PDF/Office/Image controls | 翻页、缩放、缩略图/下载；按 renderer 显示 |

## Notebook 与 Provenance

| 页面 | 控件 | 结果 |
| --- | --- | --- |
| Notebook | Agent filter、Python/R/Bash tabs | 按 agent/语言查看 runs |
| Notebook cell | Copy、Show/Hide output | 复制输入、展开输出 |
| Notebook footer | Download `.ipynb`、Close | 可转换时下载；关闭对话框 |
| Provenance | version arrows、Close Provenance | 版本导航/返回 preview |
| Provenance tabs | Code、Execution Log、Messages、Environment、Review | 切换证据类型 |
| Code | Generate script、Download、Copy | 生成派生脚本或保存 producer block |

## Settings 全局

`Back`、`Forward`、面包屑、`Maximize/Restore`、`Close settings`、移动端导航以及错误 `Dismiss` 适用于设置框架。

### Skills

Conversation Skill imports、source filter、Search、Add skill、分类折叠、Skill detail、Enable toggle、Create/Upload/Import、Preview、Edit、Export、Delete、Cancel/Save。

### Connectors

Filter/Search、Add/Import、Enable、Detail、Test/Reconnect、Edit、Export、Remove；Add form 包含 Type、Display name、ID、Description、Command、Arguments、Environment variables、URL、Transport、Authentication、OAuth scopes、Authorization server URL、Client metadata URL、Headers、Trust、Cancel、Add/Save。

### Specialists

Category filter、Search、Enable、Detail、Actions、Create/Import；Editor 包含 Icon、Color、Name、Description、Instructions、Full access、Capability type、Skill/Connector searches、selected capabilities、Cancel、Save。Import 包含 Select ZIP、Preview、Diagnostics、Cancel、Import。

### Compute

Add host、Host card/enable、Probe/Retry、Detail/Edit/Remove、Resources、Details document、Scratch root Edit/Input/Save/Cancel、Concurrent job limit Edit/Input/Save/Cancel；执行审批含 Deny、once、session、project、global。

### Network

Check again；Package mirror Configure/Edit；Conda channel、pip index、CA bundle；View mirrors、Cancel、Save。

### Model

Active model、Reasoning radios、Subagent model/effort；Provider Test/Edit/Delete/Add；Provider 表单所有 Onboarding Model 字段以及 Cancel/Save。

### Agent

Framework card、Switch、Install source、Install/Cancel/Retry、Install log、Repair、Sign in/auth、Import config/home、Uninstall confirmation。

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
