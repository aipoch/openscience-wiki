---
title: "Notebook 与执行证据"
last_update:
  date: '2026-10-09'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';


# Notebook 与执行证据

通过 Notebook 查看已执行代码、在当前内核运行命令，并跟踪后台工作。检查保存文件时，打开 **Provenance**，查看对应文件版本的执行与证据。

运行 Python 或 R 前，先[启用兼容环境](runtimes.md)。完整数据分析示例见[公开数据工作流](../workflows/data-quality.md)。

<span id="打开原产出会话的-notebook" />

<PlatformGuide />

## 打开会话 Notebook

1. 打开包含目标计算的项目和会话。新会话可先要求代理在 **Session Notebook** 执行一次小计算。
2. 点击 **Open notebook**，或使用会话菜单 **View notebook**。
3. 文件预览处于活动状态时，切换到 **Notebook** 标签。
4. 用 **Agent** 选择执行者，再用 **Python / R / Bash** 选择语言。
5. 打开带编号的运行，阅读输出与完成状态。复制活动中的 **code shown** 表示展示的代码；执行记录应到原产出会话查看。

<PlatformContent platform="macos">

![Notebook 中的 Python 执行与输出](/img/open-science/guides-walkthrough/46-notebook-result.webp)

</PlatformContent>

| 控件 | 操作 | 结果 |
| --- | --- | --- |
| Agent | 选择 Main 或子代理 | 显示对应执行者记录；不同代理可有独立内核 |
| 语言选择 | 选择可用语言 | 切换记录和控制台；缺少语言时到 Runtimes 安装 |
| 带编号的运行 | 选择执行记录 | 打开代码、输出与状态 |
| Copy to clipboard | 复制代码 | 保留原代码中的外部路径与依赖 |
| Hide output / Show output | 收起或展开输出 | 调整视图，不重新运行 |
| run code in this kernel… | 输入并提交代码 | 在所选实时内核执行 |
| 关闭/收起预览 | 返回对话 | 保留执行历史 |

有 **Input data / Inputs** 时，核对文件及版本是否与请求一致。引用不可用时，通过应用重新打开或附加目标输入，再重试。

## 运行前检查代码 {/* #execution-review */}

从 v0.36.0 起，Agent 提交的 Notebook 代码会在执行前检查。受支持的普通读取与分析无需额外风险提示；可能造成不可逆变化，或无法充分分析的操作，需要一次性决定。直接在手动控制台输入的代码不经过这项 Agent 批准步骤，提交前应自行检查。

1. 出现 **Review risky code** 时，核对运行环境和请求的操作；计算正在等待决定。
2. 点击风险项旁的 **Line**，在完整代码中定位相关行。检查路径、受影响文件和命令，也要检查分析无法判断的操作。
3. 若操作没有必要或目标不对，拒绝并要求 Agent 修改为更安全的方案。只有确实需要显示的操作时才批准一次；这不会为以后的风险代码授予永久权限。
4. 决定后，查看保留的决策记录与 Notebook 运行状态。批准不代表完成；被拒绝的请求不会执行该代码。

<p className="example-label"><strong>案例演示</strong> 检查外部 Python 子进程请求</p>

下图的计算只是求和，但它通过 `subprocess.run` 启动另一个解释器，因嵌套执行无法被充分检查而停在审查卡片。提示不等于认定代码有恶意。本例选择 **Deny**，运行记录随后显示中断，没有执行该子进程。

![Notebook 审查卡片中的运行环境、代码行、Allow once 和 Deny](/img/open-science/v0360/notebook-risk-review.webp)

这项检查针对执行风险，不验证统计方法或结果。**Auto-review** 和 [Reviewer](../specialists/reviewer.md) 分别检查已完成工作。v0.36.0 还改进了 Python／R 依赖记录；核对结果的实际输入输出应使用[来源记录与重新运行验证](reproducibility.md)。

## 使用当前内核

### 在当前内核中手动检查

选择 **Python**，点击 **run code in this kernel…**，输入下面这段独立命令。它不需要数据集、第三方包或其他会话的变量：

```python
import sys
print("Python:", sys.version.split()[0])
print("Executable:", sys.executable)
```

按 **Enter** 执行，**Shift+Enter** 换行。自动补全菜单展开时，先按 **Escape** 关闭。确认出现带编号的 **python · you** 记录及解释器输出；可执行文件应属于所选环境。

检查 R 时，选择 **R** 并提交：

```r
cat(R.version.string, "\n")
cat("R home:", R.home(), "\n")
```

检查 R 执行记录及输出。Python 和 R 使用独立变量。出现 `NameError` 或 `object not found`，通常说明对应对象尚未在该内核创建；从其他会话复制命令前先检查自己的代码。

核对解释器与保存结果的操作案例，见[Python 与 R 运行环境](runtimes.md)，在页顶选择 **Windows** 即可查看。

### 检查实时变量

1. 执行会创建变量的代码后，点击 **Inspect variables**。
2. 查看 **Name / Type / Size / Shape / Preview**。
3. 在 **Filter variables** 输入自己代码中的名称。截图以 `sha` 为筛选词；操作时请使用自己内核中实际存在的变量名。
4. 点击 **Refresh variables** 读取当前命名空间；需要查看隐藏名称时使用 **Show private variables**。
5. 点击 **Close** 返回 Notebook。

<PlatformContent platform="macos">

![按名称筛选实时变量](/img/open-science/guides-walkthrough/47-notebook-variable-filter.webp)

</PlatformContent>

预览可能缩略数值，需要完整内容时在控制台打印对应字段。**Variable tracking is limited** 表示依赖图不完整。**stale** 表示依赖发生变化，**unknown** 表示无法确定关系；使用过期结果前重新运行受影响代码。

### 内核变化后继续工作

切换或重建环境可能停止当前内核。保存文件、执行记录和内存变量有不同生命周期。变化后先运行上方解释器检查，再重跑创建所需变量的代码，并打开需要继续使用的保存文件。

安装取消与重装见 [Runtimes](runtimes.md#维护和修复环境)。环境重建、常规内核重启和后台任务恢复是不同操作，应检查相应状态，不能假定它们恢复相同内容。

## 用 R 检查同一份基因计数数据

<p className="example-label"><strong>案例演示</strong> 用 R 检查 GSE60450 基因计数</p>

1. [安装并启用 R](runtimes.md#安装应用管理的-r)。
2. 附加[原始计数矩阵](../reference/example-data.md)。需要比较 Python 结果时，把该 CSV 也附加到同一会话。
3. 要求通过 **Session Notebook → R** 执行，采用[数据质量工作流](../workflows/data-quality.md)的输入/输出要求，保留完整标识符并另存结果。
4. 出现 **Change notebook runtime?** 时，检查 **Language: R** 和目标解释器，再核对后续 **Run R code?** 的环境。
5. 打开 **Notebook → R** 阅读运行记录，然后打开保存的 CSV、图表和报告。

<PlatformContent platform="macos">

![应用内打开的 R 样本质控结果](/img/open-science/guides-walkthrough/76-r-qc-table.webp)

</PlatformContent>

按完整样本标识与[公共基准](../reference/example-data.md#样本-qc-基准)比较。保留原始来源，说明各指标是否包含零计数。原始计数质控用于准备数据，后续统计分析仍需独立设计。

### 一起保留 R 结果与执行证据

在保存 CSV 中打开 **Provenance → Execution Log → Download notebook**，将导出与输入、结果保存在一起。某个文件版本的导出可能不含后续手动控制台命令。

<PlatformContent platform="macos">

![R 结果捕获的运行环境](/img/open-science/guides-walkthrough/77-r-environment-evidence.webp)

</PlatformContent>

Runtimes 的包清单描述已安装环境，Provenance 描述某个文件所捕获的环境证据。出现 **partial** 或缓存清单提示时，应阅读其含义，不要把两份包数量当作同一清单比较。

## 后台任务与结果送达

适用的 Python、R、持久 REPL 或 Shell 工作需要在你处理其他事务时继续，可在请求中明确后台执行，并写出输入、输出和停止条件。

1. 任务被接受后，打开会话 **Background tasks**，其中汇总本地运行和远程 Compute 作业；没有任务的会话可能不显示入口。
2. 查看任务身份、环境、状态和耗时。
3. 点击 **Open** 查看对应 Notebook 运行或 Compute 作业。
4. 停止任务时，点击该任务的 **Cancel**，等待状态确定，再检查已保存文件是否需要保留。
5. 完成后检查送达的结果消息，并打开保存的输出。
6. 中断或重启后先检查已有任务和恢复提示，再决定是否重新提交。

<PlatformContent platform="macos">

![后台任务状态与 Open 入口](/img/open-science/v0.27.0/13-background-task-completed.webp)

</PlatformContent>

| 状态 | 检查内容 |
| --- | --- |
| Queued / Running | 所选环境与进度；Shell 作业可能等待执行槽位 |
| Cancelling / Cancelled | 取消仍在处理中，还是已经结束 |
| Completed | 退出结果与保存文件 |
| Failed / Timed out / Interrupted | 首条错误、保留输出及可用恢复操作 |
| Result unavailable | 已有作业记录和恢复详情 |

关闭任务列表不会停止任务。计算完成和结果消息送达是两个阶段。远程作业还需满足[远程计算](remote-compute.md)中的主机与调度条件。

## 检查单个保存版本的证据

打开保存文件，选择 **File actions → Provenance**，或在放大预览中点击 **Open Provenance**。先确认所选文件版本。

<PlatformContent platform="macos">

![保存结果捕获的产出代码](/img/open-science/provenance-code.webp)

</PlatformContent>

| 标签或控件 | 检查内容 |
| --- | --- |
| Code | 捕获的产出代码、输入引用、复制/下载及 Generate script |
| Execution Log | 所选版本冻结的执行记录 |
| Messages | 与结果关联的请求和决定 |
| Environment | 解释器、包信息和捕获状态；参见[恢复条件](runtimes.md#conditional-restore) |
| Reproducibility | 捕获的输入、重新运行检查、输出比较和验证记录 |
| Review | 与这个文件版本关联的审查 |
| Previous / Next Artifact version | 其他保存版本的证据；没有其他版本时不可用 |
| Close Provenance | 返回文件预览 |

| 标签 | 含义与下一步 |
| --- | --- |
| bounded | 保留证据的范围有限；导出代码和结果时保留该范围说明 |
| partial | 部分环境信息缺失或未确认；在应用外复用前补齐依赖要求 |
| No review for this version | 当前文件版本没有关联审查；会话与产物审查的区别见 [Reviewer](../specialists/reviewer.md) |
| 缓存环境 | 清单来自复用缓存；环境变化会影响结果时检查实际解释器和包 |

编辑报告会创建另一个文件版本，不会重跑生成其他 CSV 的计算，详见[文件与版本](files.md)。

查看审查时，为所需版本选择 **Review**，展开检查项，使用 **Go to transcript** 查看引用的执行活动。**No issues found** 只适用于这些检查项和这个版本，不会补齐缺失的执行或环境证据。如果审查中断，打开对应的 **Review error** 条目，选择 **Re-run review**；完成后回到文件的 **Review** 标签核对新结果。此前失败的记录仍可能保留在对话中。

## 可复现性 {/* #reproducibility */}

需要重新运行捕获的结果、比较输出并保存验证记录时，按[可复现性](reproducibility.md)操作。本页介绍 Notebook 执行、来源证据查看和代码导出。

## 导出和复用代码

按需要选择导出方式：

| 目的 | 入口 | 内容 |
| --- | --- | --- |
| 阅读已记录的产出代码 | **Code → Captured producer block → Download** | 捕获的源代码、原路径与依赖 |
| 保留已记录的 Notebook 单元 | **Execution Log → Download notebook** | 所选结果/版本对应的 Notebook |
| 准备可独立运行的脚本 | **Code → Generate script** | 需要检查和试跑的模型重建脚本 |

<PlatformContent platform="windows">

### 在 Windows 下载捕获的 Python 代码

1. 打开保存报告的目标版本，再打开 **Provenance → Code**。
2. 在 **Captured producer block** 下点击 **Download**，在保存窗口核对 `.py` 文件名与目录，再点击 **Save**。
3. 打开落盘文件，与显示的代码核对。在 PowerShell 中使用同一 Python 解释器运行；带引号的程序路径前使用 `&` 调用运算符。
4. 将输出与 Notebook、保存报告比较，并随代码保留需要的输入文件。

<Screenshot src="/img/open-science/windows/captured-code-download.webp" alt="Windows 捕获产出代码及其 Download 控件" width={1920} height={1017} windowBounds={[1157, 0, 763, 416]} href="/docs/img/open-science/windows/captured-code-download.webp" linkLabel="打开完整 Windows 截图" />

此操作下载已经记录的代码。**Generate script** 是另一项代码重建操作；生成失败时保留完整错误，不能将捕获代码下载成功视为重建成功。

</PlatformContent>

### 生成可独立使用的脚本

1. 打开目标版本 **Provenance → Code**，检查 **Inputs** 与 **Execution Log**。
2. 在 **Settings → Model → Main model** 选择兼容的默认模型。这个辅助功能使用该策略，可能与会话输入框中的模型不同。
3. 点击 **Generate script**，等待 **Generating…** 完成。
4. 阅读 **LLM-generated reconstruction** 标签，检查输入路径、依赖与输出位置，再点击 **Download script**。
5. 在系统保存窗口选择独立目录，确认 `.py` 文件名，再点击保存。打开落盘文件，确认其内容与显示的代码一致。
6. 按脚本要求的准确文件名准备输入和依赖，在应用外运行。对照保存结果检查输出字段与输入校验和；下载完成本身不能证明计算正确。

<PlatformContent platform="macos">

![生成脚本预览与下载控件](/img/open-science/priority-completion/19-generated-script.webp)

</PlatformContent>

<p className="example-label"><strong>案例演示</strong> 在应用外重跑导出的 RNA-seq 检查脚本</p>

可下载<a href="/docs/examples/gse60450/portable-script/GSE60450-portable-check.py" download>脚本</a>、<a href="/docs/examples/gse60450/portable-script/remote-rnaseq-qc-f1e10edbdf01-f1e10edbdf01.csv" download>输入 CSV</a> 和<a href="/docs/examples/gse60450/portable-script/GSE60450-portable-check.json" download>预期 JSON</a>，放在同一文件夹。在该文件夹运行 `python3 GSE60450-portable-check.py`，只需 Python 标准库。运行前将下载的预期 JSON 重命名为 `expected.json`，避免被脚本生成的同名文件覆盖。将运行生成的 `GSE60450-portable-check.json` 与 `expected.json` 比较后，再适配其他数据。

### 无法生成脚本时下载已有代码

显示 **Artifact code reconstruction is unavailable with Codex subscription authentication.** 时，可为该辅助操作选择兼容提供方，或下载已捕获产出代码。此错误针对脚本重建，不表示 Codex 的普通 Notebook 执行不可用。

出现 **RECONSTRUCTION_UNAVAILABLE** 时，检查缺少的输入或执行证据。下载捕获代码会保留已有内容，但无法恢复从未捕获的步骤。

### 导出和复用

选择 **Provenance → Execution Log → Download notebook**，选择位置并保存，再打开导出检查语言、代码单元和输出。

在应用外重跑前，准备输入文件、记录的依赖及可写输出目录。仅在工作副本中替换应用托管路径，保留原始导出。导出不会打包凭据或完整应用环境。示例导出见[示例数据](../reference/example-data.md)。

<PlatformContent platform="windows">

如果 Windows 导出的 Notebook 没有扩展名，先将副本作为文本打开，确认它是包含 `nbformat`、`cells` 及预期代码/输出的 Notebook JSON。保留原件，再给工作副本加上 `.ipynb` 扩展名。改名只影响其他程序如何打开文件，不会转换内容或重新执行单元。

</PlatformContent>

## 理解错误与警告

| 现象 | 下一步 |
| --- | --- |
| 缺少变量 | 在所选语言/内核重跑定义该变量的代码 |
| 缺少软件包 | 检查该环境包清单，按 [Runtimes](runtimes.md)处理 |
| 输入版本不可用 | 打开或附加目标当前输入，通过应用确定其身份 |
| PermissionError / access denied | 检查目标文件及权限范围；持续失败时按[故障排查](troubleshooting.md)反馈 |
| 网络/安装错误 | 用受影响主机名和完整错误到[网络](network.md)排查 |
| 运行完成但有警告 | 阅读警告影响范围，检查保存输出后决定是否重跑 |

反馈时保留首条失败行、所选环境、文件身份和任务状态。保存输出应关联到实际产出运行。
