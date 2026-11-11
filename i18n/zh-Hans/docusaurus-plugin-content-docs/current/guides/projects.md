---
title: "项目与源文件夹"
last_update:
  date: '2026-11-11'
---

# 项目与源文件夹

项目用于保存同一个研究问题下的会话、来源文件和生成结果。**Agent Context** 为该项目的各个会话提供长期指令。研究问题或允许使用的材料发生明显变化时，可以建立新项目。

<span id="案例准备系统综述阅读资料包" />

需要把已有研究记录带入项目时，使用[导入研究包](research-packages.md)。导入会话为只读记录，新的研究工作应建立普通会话。

## 创建项目

<p className="example-label"><strong>案例演示</strong> 准备系统综述阅读资料包</p>

本例建立 **PRISMA - Systematic review reading pack**，使用真实发表的报告规范论文，目标是整理可核验的文献记录与阅读顺序。建立资料包本身不等于完成系统综述。

1. 在首页点击 **New project**；已有工作区左上角的项目菜单也提供这个入口。
2. 填写下面的字段。需要约束代理的证据规则应写在 **Agent Context**，不要只写在 Description。
3. 点击 **Create project**。确认左侧显示项目名称，主区域打开 **New conversation**。
4. 打开项目名称菜单 → **Project settings**，检查字段是否保存。项目保存成功与模型连接成功是两件事。

![英文界面中的 PRISMA 项目目标与 Agent Context](/img/open-science/local-acceptance/prisma-project-form.webp)

| 字段或按钮 | 示例或操作 | 行为 |
| --- | --- | --- |
| **Name** | `PRISMA - Systematic review reading pack` | 必填，最多 200 个字符；空白名称不可提交 |
| **Description** | 描述该项目要为系统综述研究者整理来源可核验的阅读资料 | 可选，最多 1,000 个字符；显示在项目列表中，不作为代理指令发送 |
| **Agent Context** | 使用下方证据规则 | 可选，最多 16,000 个字符；包含在新建和恢复的代理会话中，并发送给所选模型提供方 |
| **Create project** | 保存有效表单 | 创建项目并打开工作区；保存失败时错误保留在表单中 |
| **Cancel**、**Close** | 放弃草稿 | 不创建项目；提交过程中不可重复关闭 |
| 项目设置中的 **Save** | 保存修改 | 修改原项目，不复制会话 |

```text
Use public primary sources. Preserve DOI, title, authors and publication year.
Distinguish bibliographic metadata from claims verified in full text.
Never invent references. Report inaccessible sources explicitly.
Write outputs in English.
```

这些指令要求保留 DOI、标题、作者和年份，区分元数据核验与全文核验，不编造文献，并明确报告无法访问的来源。

## 授予来源文件访问权限

创建项目不会自动开放电脑上的文件夹。需要使用已有目录时，打开 **Files** 并选择本地文件夹入口。文件选择器负责选择位置，后续权限提示负责确定访问范围；确认前检查实际路径和访问模式。

仅检查来源材料时可使用只读权限。需要将来源保存在项目内时，保存一份托管副本。本地预览与托管上传的生命周期不同：外部文件移动后原路径可能失效，托管副本则保留在应用存储中。

权限变化可能触发 Notebook 确认，因为运行中的内核可能保留先前的访问状态。接受内核重启前先完成或停止相关工作。选择一个目录也不表示模型已经读取其中所有文件。

## 修改或继续研究

从项目名称菜单切换项目。同一项目中的新研究分支可以用 **New** 创建独立会话，保留项目级上下文。修改 **Agent Context** 后，在后续请求中检查新规则是否生效；已有结果不会自动重新生成。

**Download artifacts…** 用于下载输出。项目还没有生成结果时，它可能不可用；上传来源文件并不等于生成成果。已结束的工作可归档，并从 **Settings → Archived** 恢复。

## 验收与排错

| 现象 | 含义与处理 |
| --- | --- |
| 项目名称已出现，但不能发送请求 | 项目创建成功；分别检查 **Settings → Agent** 和 **Settings → Model** |
| 代理没有遵守 Description 中的要求 | 将要求写入 **Agent Context**，再发送明确的新请求。Description 只是组织信息 |
| 文件夹可打开但不能写入 | 只读权限允许检查，不允许修改；保存派生结果或检查写入请求的范围 |
| 保存按钮不可用 | 检查名称是否只有空白、字段是否超长，以及是否仍有提交在进行 |
| 当前项目与预期不符 | 附加材料或发送消息前先核对左上角项目名称 |

## 设置问题优化模板 {/* #optimization-template */}

打开项目名称菜单 → **Project settings → Advanced agent options → Optimization prompt**，填写这个项目改写问题时应遵循的要求，然后保存。留空则使用内置默认模板。**New project → Advanced agent options** 中也有同一个字段。

此字段只在点击 **Optimize question** 时使用，与提供给项目 Agent 会话的 **Agent Context** 不同，也不同于仅供自己查看的 **Description**。

<p className="example-label"><strong>示例</strong> 保留教学问题的适用范围</p>

```text
Rewrite the question in clear English. Preserve the supplied numbers
and the hypothetical scope. Ask for a concise answer with limitations;
do not invent participants, measurements or citations.
```

![项目高级选项中的自定义 Optimization prompt](/img/open-science/v121/optimization-template.webp)

返回输入框，[优化一段草稿](composer.md#optimize-question)，检查改写结果后再发送。模板提供的是写作要求，不是科学验证规则。
