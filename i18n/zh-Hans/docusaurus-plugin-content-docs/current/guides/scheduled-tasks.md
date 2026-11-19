---
title: "安排定时研究任务"
last_update:
  date: '2026-11-19'
---

# 安排定时研究任务

把需要在指定时间执行的工作交给定时任务，例如整理新加入的论文、汇总项目变化，或重新运行准备好的脚本。每次运行都有可以打开检查的记录。创建任务的电脑需要保持 Open-Science 运行。

## 准备一个能独立完成的任务 {/* #prepare */}

先在项目中手动完成一次目标操作，确认输入、模型连接、运行环境、结果保存位置和所需权限。定时任务不会自动修复缺失的凭据，也不会替你补齐所有依赖。运行时不会等待新的人工确认，尚需交互的操作可能使任务停止。为每次运行创建新会话时，在 **Settings → Model** 中选好可用的 **Main** 模型，或设置项目的新会话默认配置。仅导入订阅并不等于已经选好模型。使用模型的任务会消耗所选提供商的额度。

## 创建定时任务 {/* #create */}

1. 打开项目，进入 **Schedule**，选择 **New task**。也可以通过 **Start from an example** 填入每日实验总结或每周文献回顾草稿。
2. 填写容易识别的 **Name**，在 **Action** 中选择 **Send a message** 或 **Run a script**。
3. 消息任务在 **Instructions** 中填写要求。通过 **How to run** 选择 **Continue an existing conversation** 或 **New conversation for each run**；继续已有会话时，再选择 **Target conversation**。
4. 脚本任务选择已有会话，并在 **Language** 中选择 Python、R 或 Shell，填写完整的 **Script**。显式读取所需输入，不要依赖旧内核中的临时变量。
5. **Repeat** 可选 **Once**、**Fixed interval**、**Daily** 或 **Weekly**。按需设置开始时间、间隔或星期，再核对 **Time zone** 和 **Next run**。
6. 检查 **Execution permissions**，只授予任务所需权限。已有会话可沿用会话权限；定时任务的权限选择不会提供账户凭据，也不会绕过 Strict 网络规则。
7. 在 **Advanced** 中按需设置结束时间或最大运行次数；脚本还可检查执行超时。选择 **Create**，确认已保存的任务及下一次运行时间。

<p className="example-label"><strong>示例</strong> 准备每周文献摘要</p>

选择 **Send a message**，设置星期五和你所在时区的时间。在已经包含论文与笔记的项目中，按需调整以下要求：

```text
Review papers and reading notes added to this project in the last seven days.
For each paper, summarize its main finding and link to its source or project file.
Distinguish abstract-only records from papers whose full text is available.
If nothing was added, say so. Keep the digest in English.
```

这个任务回顾项目中已有的材料。如果要查找新发表的论文，应明确提出检索要求，并先配置所需的[文献 Connector](../tools/databases.md)。

## 运行一次教学总结 {/* #worked-example */}

<p className="example-label"><strong>案例演示</strong> 定时总结五个数值</p>

选择 **Send a message**，将任务命名为 **Teaching summary — one run**，输入：

```text
In English, state the mean and median of the hypothetical observations 2, 4, 6, 8, 10.
Explain in two sentences why these values alone do not support population inference.
Do not use tools or create files.
```

选择 **New conversation for each run**、**Repeat → Once**，设置一个未来时间。权限选 **Existing permissions only**：这个任务不需要使用工具。点击 **Create** 后保持应用运行。

![一次性消息任务：要求、新会话目标和下次运行时间](/img/open-science/v130/schedule-create.webp)

到时打开任务并检查 **Results**。本例返回的均值和中位数均为 **6**，并说明五个假设数值不能支持总体推断。点击 **Open session** 可打开对应会话，一次性任务转为 **Completed**。复用前应核对结果本身。

![定时消息运行完成，显示教学示例结果](/img/open-science/v130/schedule-result.webp)

## 检查运行记录与调整任务 {/* #run-history */}

打开任务的运行历史，选择一次运行，检查状态、目标会话和结果。**Run completed** 表示这次运行完成；把结果用于研究前，仍需检查实际回答或脚本输出。看到 **Failed**、**Interrupted** 或 **Skipped** 时，阅读对应原因，不要假定已经产生结果。

通过 **Pause** 暂停后续运行，准备好后使用 **Resume** 恢复；调整时间后重新检查下一次运行。**Close** 结束任务。已完成或关闭的任务可能为只读，此时需要另建任务。尤其在重新连接或重启应用后，先检查运行历史，再决定是否手动重复执行。

执行记录与环境恢复见 [Notebook](notebook.md)；访问边界见[审批模式](approval-modes.md)与[网络规则](network.md)。
