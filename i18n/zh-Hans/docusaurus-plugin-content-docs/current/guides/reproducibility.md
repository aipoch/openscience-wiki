---
title: 可复现性
description: 根据捕获的研究步骤重新运行、比较保存结果，并保留验证记录。
last_update:
  date: '2026-10-08'
---

# 可复现性

**Reproducibility** 按保存结果所记录的过程重新运行，并将新输出与选定文件版本比较。它将输入、执行记录、环境信息和输出比较联系起来，帮助你检查结果是如何产生的。

## 什么时候使用

- 分享结果前，检查捕获的过程能否产生一致的输出。
- 复核结果时，查看保存文件与重新运行所得输出之间的差异。
- 向同事交接工作时，将验证记录与相关文件、版本一起保留。

根据要解决的问题选择操作：

| 操作 | 用途 |
| --- | --- |
| Reproducibility | 重新运行捕获的过程，并与保存版本比较输出 |
| [Review](../specialists/reviewer.md) | 审核选定证据并给出审查结果 |
| [Generate script](notebook.md) | 重建可在原 Notebook 之外使用的代码 |

## 开始前检查

打开保存的结果，选择要检查的文件版本。进入 **File actions → Provenance → Reproducibility**，查看捕获的输入文件、Notebook 执行和环境锁文件。

先处理 **Areas needing attention**。检查依赖该版本已经记录的证据。若早期执行失败或必需证据缺失，应成功运行所需代码并生成新的结果版本；旧版本缺少的记录不会被事后自动补齐。

发起检查需要桌面界面，并且要有受支持的执行记录。此功能不会重放整个对话，也不覆盖所有文件类型。

### 准备检查所需的环境 {/* #prepare-environment */}

第一次检查建议使用应用管理的 Python 或 R 环境。Open-Science 会在执行代码时捕获受支持的依赖锁。仅有包清单或 `pip freeze` 输出，还不足以恢复精确的软件包来源。

1. 打开 **Settings → Runtimes**，在所需语言下准备 **App-managed environment**，确认 **Ready** 和 **Enable**。具体操作见[运行环境设置](runtimes.md)。
2. 要求 Agent 为当前会话选择该环境，并检查原代码的依赖。缺包时通过受支持的包管理流程安装，按提示重启内核，再在同一 Notebook 中验证导入。继续前核对[实际使用的解释器](runtimes.md#确认实际使用的解释器)。
3. 使用原输入，重新执行必要的准备步骤和产出代码，保存新的结果版本。保留原结果供比较；只修改设置不会更新旧版本已捕获的证据。
4. 打开新版本的 **Provenance → Environment**，检查环境锁和缺包诊断，再回到 **Reproducibility**。确认 **Check reproducibility** 可用、必需输入和执行记录齐全后，再发起检查。

现有环境仍缺少精确锁时，可开启 **Settings → Runtimes → Let the Agent create environments**，要求 Agent 按原分析依赖新建一个独立的应用管理环境。让 Agent 选择新环境并验证所需包的导入，再重复第 3–4 步。保留原环境，不要为了让检查可用而改变分析方法。

新版本仍显示 **Unavailable** 时，保留 **View details**、包名称/版本和所选运行时。如果提示[包源连接错误](network.md)，先处理连接再重跑；仍无法捕获环境锁时，停止重试，按[故障排查](troubleshooting.md)反馈，并保留未验证状态。

<p className="example-label"><strong>案例演示</strong> 检查样本质控汇总表</p>

下图使用 Notebook 根据 [GSE60450 样本质控表](../reference/example-data.md)生成汇总结果。打开文件的 **Provenance → Reproducibility**，查看捕获的输入和执行记录。图中的 **Not verified yet** 和 **Unavailable** 表示缺少精确环境锁。打开 **View details** 后，按[环境准备步骤](#prepare-environment)生成新版本。该状态不代表复现成功。

![已保存的质控汇总表及 Reproducibility 面板，显示捕获证据和暂不可用的检查](/img/open-science/feature-guides-2026-09/reproducibility-evidence.webp)

## 运行复现检查

1. 在 **Reproducibility** 中核对所选结果版本及其输入。
2. 选择 **Check reproducibility**；再次检查时使用 **Check again**。
3. 如果通过 **Check from here** 选择已保存的起点，先检查 **Files to restore** 和 **Runs to execute**，再选择 **Start check**。步骤依赖之前的 Notebook 状态时，仍可能需要重跑更早的准备过程。
4. 查看进度和日志。检查会在隔离环境中恢复记录的输入和运行环境；需要停止时使用 **Cancel**。
5. 完成后逐个打开输出的比较详情，再判断结果是否一致。

会话菜单还提供 **Check session artifacts**，可以检查多个已捕获的结果版本。应核对可检查的版本及逐项结果；从会话入口发起操作，不代表每个结果都已完成检查。

## 阅读比较结果

| 结果 | 下一步 |
| --- | --- |
| Result reproduced | 查看记录中的比较条件，并将它们与结论一起保留 |
| Result differs | 查看不同的文件和比较详情，再判断差异是否影响本次工作 |
| Not verified yet | 当前版本还没有完成的检查证明输出一致。检查现有证据，准备好后再发起检查 |
| Check stopped / Check cancelled | 查看日志，需要时处理原因，再重试。取消不代表已得出比较结论 |

运行完成本身不能证明输出一致。字节相同、有限范围的图片/表格比较和科学指标比较回答的是不同问题。输出符合记录中的比较条件，也不代表科学方法已获验证。

## 保存与分享验证记录

1. 选择 **Export verification record**，保存记录。
2. 重新打开下载文件，核对它对应的来源文件、版本和比较结果。
3. 将相关来源文件与版本一起保留。清理复现输出前，先检查保留选项并保存需要的文件。

需要一起交接会话分支、文件和证据时，使用 [.science 研究包](research-packages.md)。发送方提供的验证记录，不代表接收电脑已重新运行检查。

## 检查无法完成时

先查看 **Areas needing attention** 和日志中的首条相关错误。输入缺失、证据不完整或操作不受支持都可能阻止验证。大型 RDS/H5AD 文件不会载入进行内容比较；没有比较结果不能认定输出一致。

v0.30.2 修复了同一轮中先前生成输入的重放、受支持的 Python 标准库导入，以及 Windows 验证环境中的 pip 入口。旧版若在这些步骤停止，可更新后对同一份已捕获结果重试，再检查新日志和比较结果。这些修复不会补出缺失的环境锁，也不代表所有历史运行均可重放。

若准备过程依赖之前的 Notebook 状态，查看[执行证据](notebook.md)，重新运行必要准备步骤，再生成新结果。保留已停止或未完成检查的实际状态。

已有受支持的锁文件包、需要在应用外恢复软件包时，按[运行环境恢复条件](runtimes.md#conditional-restore)操作。该流程不会创建缺失的锁文件，也不能替代上面的环境准备。依赖恢复完成本身不代表输出已复现。

## 重新执行前先查看研究过程 {/* #replay-vs-verification */}

用[会话回放](session-replay.md)查看已记录的消息、工具活动和文件版本顺序。回放使用重新组织的播放时间展示保存的证据，不会重新执行代码、再次查询数据库，也不能证明结果可复现。需要新的执行与结果比较时，使用本页的 **Reproducibility**。
