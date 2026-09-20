---
title: "Python 与 R 运行环境"
last_update:
  date: '2026-09-20'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';

# Python 与 R 运行环境

在 **Settings → Runtimes** 选择 Notebook 和代理可使用的 Python、R 环境。**Ready** 表示解释器已检测或准备就绪，**Enable** 开关单独决定代理能否选择该环境。

可以选择应用管理的环境或已有解释器。使用前核对路径、版本、Ready 状态和 Enable 开关。系统 R 与应用管理的 R 可以并存。

<span id="在重新安装前检查影响" />

<span id="尚需分别验证的操作" />

<PlatformGuide />

## 为项目选择运行环境 {/* #为项目选择运行环境前 */}

记录解释器名称、路径和版本。首次 Python 分析可优先使用应用托管环境，避免修改其他研究依赖的环境。请求安装软件包前先在 **Packages** 中确认依赖是否已存在。查看软件包列表是只读操作，不会自动授予代理修改外部解释器的权限。

执行失败时，分别判断解释器不可用、缺少依赖、请求被拒绝或代码本身出错。只有托管运行环境确实损坏时才考虑重装，不能把所有分析错误都归因于环境。复现结果时同时保留输入版本、代码和运行环境信息。

## 主页面控件

| 控件 | 用途与边界 |
| --- | --- |
| **Recheck** | 重新发现解释器并检测状态，更新最后检查时间；冲突的安装任务进行时不可用 |
| **Network settings** | 打开 Notebook 网络保护配置。提示条说明会话和包下载是否仅能访问批准的域名 |
| **Let the Agent create environments** | 控制代理是否可创建环境及准备缺失运行时；关闭后仍可由用户主动安装或修复 |
| **Add interpreter…** | 打开系统可执行文件选择器。选择实际可执行文件后，确认检测到的路径与 Ready 状态 |
| **Download and set up** | 环境缺失时，准备应用管理的环境 |
| 安装期间的 **Cancel** | 请求取消安装，等待状态结束后再启动其他操作 |
| **Retry setup** | 解决错误原因后重试 |
| **Enable [environment]** | 允许代理选择该环境。禁用正在使用的环境时可能需要确认影响 |
| **Allow package install** | 已启用的外部 Python 或 R 环境提供的单独安装授权；R 授权限定在选定的个人库。查看包列表不需要安装授权 |
| **Packages [count]** | 打开该解释器的已安装包清单 |
| **Reinstall** | 在重建应用管理环境前打开确认 |

## 安装应用管理的环境

<PlatformContent platform="windows">

在 **Settings → Runtimes** 分别检查两种语言的卡片。每张卡片都有独立的 **Ready** 状态、版本、**Enable** 开关和 **Packages** 按钮。下图中的 Python 与 R 均已启用；上方警告针对单独配置的 Notebook 网络保护。截图中的个人路径已隐藏，请在自己的电脑上核对完整路径。

<Screenshot src="/img/open-science/windows/runtimes-ready.webp" alt="Windows 托管 Python 与 R 卡片，均显示 Ready 且已启用" width={1919} height={991} windowBounds={[480, 152, 960, 688]} href="/docs/img/open-science/windows/runtimes-ready.webp" linkLabel="打开完整 Windows 截图" />

</PlatformContent>

### 安装应用管理的 Python

<PlatformContent platform="macos">

![安装 Python 前的运行时设置](/img/open-science/walkthrough-2026-09-08/34-runtimes-before-setup.webp)

</PlatformContent>
1. 找到 **Python → App-managed environment**。
2. 选择 **Download and set up**。
3. 查看进度并等待，安装期间出现 **Cancel**。
4. 成功后确认出现 **conda: default-python**、**App-managed** 与 **Ready**。
5. 检查解释器路径及 **Enable conda: default-python** 开关。

<PlatformContent platform="macos">

![正在创建应用管理的 Python 环境](/img/open-science/walkthrough-2026-09-08/36-runtime-setup-progress.webp)

</PlatformContent>
<PlatformContent platform="macos">

![Python 安装完成](/img/open-science/walkthrough-2026-09-08/37-python-runtime-ready.webp)

</PlatformContent>
确认 **Ready**、解释器路径和启用状态。包数量与版本随安装来源变化，不要把截图中的临时路径用作长期环境位置。

### 安装应用管理的 R

1. 打开 **Settings → Runtimes**，滚动至 **R**。
2. 在 **App-managed environment** 下选择 **Download and set up**。本机已有系统 R 时，仍可安装这个独立环境。
3. 等待下载和环境创建完成，期间保持应用打开。如出现错误，先阅读错误信息再重试。
4. 确认显示 **conda: default-r**、**App-managed**、**Ready**，并已启用。
5. 打开 **Packages**，在 **Filter packages** 输入 `r-base`，核对 R 版本与渠道；清空筛选可查看全部安装包。

<PlatformContent platform="linux">

![Linux 中应用管理的 R 已 Ready 并启用](/img/open-science/linux/r-managed-ready.webp)

</PlatformContent>

<PlatformContent platform="macos">

![下载应用管理的 R 环境](/img/open-science/guides-walkthrough/70-r-managed-download.webp)

</PlatformContent>
<PlatformContent platform="macos">

![应用管理的 R 已安装并启用](/img/open-science/guides-walkthrough/71-r-managed-ready.webp)

</PlatformContent>
筛选 `r-base` 后，确认显示已安装 R 包及其版本、渠道。包总数取决于你的环境，可以与截图不同。

<PlatformContent platform="macos">

![检查 R 包清单中的 r-base](/img/open-science/guides-walkthrough/72-r-package-filter.webp)

</PlatformContent>
## 接入已有解释器

<PlatformContent platform="windows">

在对应语言下点击 **Add interpreter…**，打开 Windows 文件选择窗口。选择目标环境实际安装的 `python.exe` 或 `R.exe`，再点击 **Open**。路径包含空格时，可在窗口中选择文件，或在 **File name** 输入完整路径。返回 Runtimes 后核对检测到的路径与版本，点击 **Recheck**，再启用该环境。只打开选择窗口不代表已添加解释器。

</PlatformContent>

### 使用本机已经安装的 R

选择 **Recheck**，检查发现的 R 路径和版本。如果没有出现目标解释器，使用 **Add interpreter…** 选择其可执行文件。**Ready** 表示已检测就绪，**Enable** 决定代理能否选择该环境。

在 R Notebook 中检查 `R.home()`，确认实际环境。需要安装依赖时，按[外部 R 包安装步骤](#external-r-packages)授权个人库。

<PlatformContent platform="macos">

`/opt/homebrew/bin/R` 这类路径表示系统安装。

</PlatformContent>

### 注册并使用外部 Python

<PlatformContent platform="linux">

`/usr/bin/python3` 等系统解释器可能已经显示为 **Ready**。先开启目标环境的 **Enable** 开关，再要求代理选择它。下图中已检测到的 Python 解释器尚未启用，应用管理的 Python 也尚未准备；需要托管环境时，选择 **Download and set up**。

![Linux 已检测到现有 Python 解释器并显示 Ready，Enable 开关尚未开启](/img/open-science/linux/python-detected-disabled.webp)

</PlatformContent>

1. 准备需要使用的 Python 环境。
2. 选择 **Add interpreter…**，选中 Python 可执行文件，检查 **Ready**、路径和版本。
3. 使用 **Recheck** 复查，再启用该环境。
4. 要求代理为 Notebook 明确选择这个解释器。
5. 先输出 `sys.executable` 和 Python 版本，确认实际环境后再使用依赖。

<PlatformContent platform="macos">

若 macOS 文件选择器无法选中符号链接解释器，选择目标环境的实际可执行文件。绑定后检查 `sys.executable`。使用稳定安装路径，不要沿用截图中的临时示例路径。

</PlatformContent>

#### 包安装授权与实际结果

外部 Python 环境需要安装新包时，先检查 **Allow package install** 授权。允许安装后，等待操作结束，并在同一环境中验证导入，再继续分析。

安装报告 `403 Forbidden` 或 `destination resolves to a non-public network address` 时，检查受影响域名，按[网络说明](network.md)处理后再重试。这些错误属于网络访问问题，不能据此认定软件包不存在。保持网络防护开启。

#### 禁用 Notebook 正在使用的环境

切换 **Enable** 后，先阅读活动与空闲内核数量再确认。禁用可能关闭内核；重新启用后，仍需为会话选择可用运行时。该配置提供启用、禁用控件，没有单独的 **Remove interpreter** 操作。

## 在外部 R 环境安装包 {/* #external-r-packages */}

已有 R 解释器可以运行、但缺少依赖包时，使用这项功能。应用只授予一个已有个人库的安装权限，不授权系统库或站点库。

1. 在 **Settings → Runtimes** 启用目标外部 R 环境，确认路径和版本。
2. 在 **Personal R package library** 检查检测到的位置，或选择合适的库。没有检测结果时，使用 **Advanced options → Choose library folder…**，选择该 R 解释器可见且可写的已有个人库。此操作不会创建文件夹。
3. 启用 **Allow package install**。授权前核对路径：其他项目如果也使用这个库，会受到包安装变化的影响。
4. 通过应用的包管理操作请求安装所需包，并明确指定该 R 环境。查看安装结果，按提示处理内核重启。
5. 在该环境运行 `R.home()`、`.libPaths()`、`library(PACKAGE_NAME)` 和 `packageVersion("PACKAGE_NAME")`，将包名占位符替换为实际包名。确认使用预期的库后，再继续分析。

关闭 **Allow package install** 可撤销后续安装授权，但不会卸载已经写入的包。需要更换库时先撤销授权。没有符合条件的文件夹时，在应用外准备个人 R 库，或使用应用管理的环境；不要选择系统库来绕过检查。

## 根据捕获的锁文件恢复依赖 {/* #conditional-restore */}

打开已保存结果的 **Provenance → Environment**，查看捕获的锁文件。有 **Download bundle** 时可下载恢复包，先阅读包内说明和前置条件。

外部 R 需要可用的 `renv` 和受支持的 `renv.lock`；外部 Python 需要已有、受支持且固定哈希的 requirements 锁文件。只有解释器路径或包名列表并不足够。恢复环境必须满足记录的解释器、平台、架构和包管理器要求。

解压恢复包，选择自己拥有且可写的新目标位置，按包内说明运行 `restore-packages.py`，传入真实的解释器与目标路径。脚本先核对前置条件和校验值，再恢复包并检查生效的版本与路径。检查失败时应处理对应条件，不要修改锁文件来强行通过。Open-Science 不会接管或删除这个外部目标位置。

这属于有条件的依赖恢复，不是完整环境克隆。需要比较输出时，重新打开结果，在有受支持的捕获执行过程时使用[复现检查](reproducibility.md)。

## 检查安装包

选择目标 Python 卡片的 **Packages**。对话框显示该环境的路径、包来源与状态。

在 **Filter packages** 输入 `numpy` 等包名，检查版本与渠道，清空筛选可恢复列表，点击 **Close** 返回。

<PlatformContent platform="macos">

![筛选 Python 安装包](/img/open-science/walkthrough-2026-09-08/38-python-packages-filter.webp)

</PlatformContent>
列名为 **Name**、**Version**、**Build**、**Channel**。Build 中的横线表示未显示构建值。这个对话框用于查看清单；没有安装或卸载包的按钮，不应在这里寻找 “Install package” 输入框。

<PlatformContent platform="windows">

点击 Python 卡片的 **Packages**，筛选 `pip`；点击 R 卡片的 **Packages**，筛选 `r-base`。比较版本前，先核对对话框标题中的环境名称。下图展示已有安装包，不表示正在安装新包。

<Screenshot src="/img/open-science/windows/python-packages.webp" alt="Windows Python 包清单，按 pip 筛选" width={1920} height={1017} windowBounds={[580, 342, 760, 336]} href="/docs/img/open-science/windows/python-packages.webp" linkLabel="打开完整 Windows 截图" />

<Screenshot src="/img/open-science/windows/r-packages.webp" alt="Windows R 包清单，按 r-base 筛选" width={1920} height={1017} windowBounds={[580, 342, 760, 336]} href="/docs/img/open-science/windows/r-packages.webp" linkLabel="打开完整 Windows 截图" />

</PlatformContent>

## 用真实分析验证环境

在所选环境执行小型计算，重新打开输出，与[公共基准](../reference/example-data.md)比较。执行与导出步骤见 [R Notebook](notebook.md#用-r-检查同一份基因计数数据)。

[数据质量工作流](../workflows/data-quality.md)提供使用已有依赖的 Python 路线。计算成功不代表新增包安装或内核重启已经验证。

<PlatformContent platform="macos">

![成功的真实 Notebook 计算](/img/open-science/guides-walkthrough/46-notebook-result.webp)

</PlatformContent>
导入包失败时，先检查选中的运行环境及包清单。若下载因域名解析为保留地址而被拒绝，按[网络](network.md)处理。已有包能运行，不代表额外软件包已经可以安装。

其他分析前检查所选环境是否包含所需包，必要时使用支持的包管理操作，阅读真实结果，按要求重启并验证导入。授权、进度卡片或 Ready 解释器都不能代替导入测试。

保存结果的环境或执行证据不完整时，打开 **Provenance** 查看缺少的信息。需要生成可用于复现检查的新版本时，按[环境准备步骤](reproducibility.md#prepare-environment)处理。数值匹配不会补齐缺失的来源证据。

### 确认实际使用的解释器

准备好 Python 或 R 后，在对应语言的 Notebook 中运行下面的命令，检查实际版本与路径。设置页列出的环境可能不止一个，以本次运行的输出为准。

Python：

```python
import sys
print(sys.version)
print(sys.executable)
```

R：

```r
R.version.string
R.home()
```

然后读取一份项目中的小表格，检查行数并保存结果。重新打开应用后如需继续分析，再运行一次检查；历史报告可读取，不代表上次的内存变量仍在。Notebook 操作见[Notebook 与执行证据](notebook.md)。

<PlatformContent platform="windows">

<p className="example-label"><strong>案例演示</strong> 检查 Windows 实际使用的 Python 解释器</p>

使用研究数据前，可先要求代理在 **Session Notebook** 执行上方 Python 版本和路径命令，并将实际输出保存为 Markdown 报告。若还要检查已安装的 `pip` 版本，加入 `import importlib.metadata` 和 `print(importlib.metadata.version("pip"))`。

打开 Notebook 输出，与保存报告核对。本例使用 Windows 10、Open-Science v0.28.0，实际输出 Python **3.12.13**、`pip` **26.1.2**。读取包元数据不会安装或导入该包。

<Screenshot src="/img/open-science/windows/python-runtime-output.webp" alt="Windows Python Notebook 中的实际执行代码与版本输出" width={1920} height={1017} windowBounds={[1157, 0, 763, 472]} href="/docs/img/open-science/windows/python-runtime-output.webp" linkLabel="打开完整 Windows 截图" />

遇到 Windows conda R 启动或内核恢复失败时，可先更新至 v0.30.2 或后续版本再重试。该版本修复环境准备后的可执行文件查找及 R 内核恢复。更新后重新检查环境，并在 Notebook 中执行一段简单的 R 计算；**Ready** 本身不是执行结果。下方截图仍保留原实操的版本与结果。

从 v0.31.0 起，Windows R 可以在标准模式下运行，无需先配置保护模式。旧版本中的 **Enable protected mode before authorizing R access.** 提示属于当时的版本行为。网络保护和安装软件包的权限仍是独立控制。v0.31.1 中，被 Notebook 网络保护阻止的运行会显示带设置入口的行内提示；此时单元格并未执行。检查所需访问范围后再重跑，并核对输出。

<span id="windows-runtime-qc" />

<p className="example-label"><strong>案例演示</strong> 用样本 QC 表检查 Windows Python 与 R 环境</p>

下面的分析来自另一台 Windows 11 电脑，使用其已有的 Python/R 环境。检查自己的安装时，应以本次运行的路径与输出为准。

下载<a href="/docs/examples/gse60450/rnaseq-sample-qc.csv" download>样本 QC CSV</a>，附加到项目会话。这是一份 12 行汇总表，每行对应一个样本。下面读取并核对表中已有的指标，不重新计算原始基因计数矩阵。输入说明和指标定义见[示例数据](../reference/example-data.md)。

**用 Python 读取表格。** 要求代理在 Session Notebook 中使用选定的 Python 环境，仅使用标准库，输出 `sys.version`、`sys.executable` 和下表中的四项检查结果，并保存 Markdown 报告。使用附件的实际路径。若需确认读取没有改变输入，要求在读取前计算 SHA-256，并在重新打开同一文件后再计算一次。

打开保存的报告及其 **Provenance → Code** 视图，核对捕获的代码与报告中的解释器和结果。本例中 Python 为 **3.12.13**，可执行文件路径以 `runtime\envs\.p\python.exe` 结尾；重新打开输入前后的哈希一致。

下面展示 **Inputs** 与捕获的代码。点击图片可查看包含保存报告的完整截图。

<Screenshot
  src="/img/open-science/windows/runtime-python-producer.webp"
  alt="Python 结果的 Provenance Code 局部视图，显示 Inputs 与捕获的产出代码"
  width={2302}
  height={1158}
  windowBounds={[1385, 65, 917, 1030]}
  href="/docs/img/open-science/windows/runtime-python-producer.webp"
  linkLabel="打开包含保存报告与捕获代码的完整 Windows Python 截图"
/>

**用 R 读取同一张表。** 要求代理在 Session Notebook 中使用选定的 R 环境，仅使用 base R，输出 `R.version.string`、`R.home()` 和相同的四项检查结果，另存一份报告。展开 **Notebook run** 卡片查看代码，再打开报告核对结果。本例中 R 为 **4.4.3**，安装目录以 `runtime/envs/.r/Lib/R` 结尾。

![Windows R Notebook 调用与保存的报告，显示实际 R 安装位置及样本 QC 结果](/img/open-science/windows/runtime-r-execution.webp)

截图中的安装路径属于示例电脑；你的本机盘符、目录和解释器版本不同，属于正常情况。

两份报告对这份输入得到相同结果：

| 检查项 | 本例结果 |
| --- | ---: |
| 数据行数 | 12 |
| 不重复的 `original_column_name` 数量 | 12 |
| `total_raw_counts` 总和 | 269,027,617 |
| `zero_count_genes + detected_genes_count_gt_0` 等于 27,179 的行数 | 12 |

先确认本次运行的路径对应预期环境，再将保存的结果与上表比较。这里使用 Python 标准库和 base R，不需要额外软件包，也不能据此判断新包是否能安装。

</PlatformContent>

## 维护和修复环境

### 取消安装后重试

在 **Download and set up** 期间选择 **Cancel**，等待出现 **Runtime setup cancelled**。选择 **Retry setup**，等到 **Ready** 后打开 **Packages** 检查环境。前一个操作尚未结束时不要重复发起安装。

<PlatformContent platform="macos">

![取消安装与重试入口](/img/open-science/local-todo-batch/29-setup-cancelled.webp)

</PlatformContent>
### 重装托管环境

1. 保存需要保留的报告，记录自行增加的依赖。
2. 在目标托管环境选择 **Reinstall**。
3. 阅读影响说明，再选择 **Reinstall runtime**。
4. 等待 **Ready**，检查 **Packages**。
5. 启动新的 Notebook 单元，并重新打开已有输入和产出。

<PlatformContent platform="macos">

![Notebook 会话中的重装确认](/img/open-science/local-todo-batch/31-runtime-reinstall.webp)

</PlatformContent>
重装会删除并重建环境，正在执行的单元可能被取消并显示 **Run cancelled: the runtime was stopped while this cell was executing.** Notebook 历史可保留，但旧命名空间不会恢复。重装后先运行解释器检查，再重新执行产生所需变量的代码，并打开已保存文件确认可用。

<PlatformContent platform="macos">

![内核停止后保留的 Notebook 历史](/img/open-science/local-todo-batch/33-reinstalled-kernel-history.webp)

</PlatformContent>
文件保留不等于内存变量保留。继续分析前重新执行必要代码。后来添加的软件包可能需要重装，基础环境恢复不能证明每个额外依赖也已恢复。

### 开发构建提示 micromamba not found

源码开发版第一次安装时，由于进程没有找到 micromamba，在准备环境前失败。

<PlatformContent platform="macos">

![源码构建缺少 micromamba 的真实错误](/img/open-science/walkthrough-2026-09-08/35-runtime-micromamba-error.webp)

</PlatformContent>
正式安装包包含该程序。开发构建可在启动进程环境中，将 `OPEN_SCIENCE_MICROMAMBA_BIN` 指向有效的 micromamba 可执行文件，然后重启开发实例。确认程序可执行后再重试；不要修改已安装应用的内部文件。

这个环境变量属于开发启动配置，不是 Runtimes 页面的输入字段。不要通过删除环境目录处理此发现错误。

<PlatformContent platform="windows">

## 可选的 WSL2 Bash Preview {/* #wsl2-preview */}

Windows x64 可在 **Settings → Runtimes** 使用可选的 **Local Shell · WSL2 Bash Preview**。任务不需要 Linux Shell 时，继续使用 PowerShell 即可；Windows 版 Open-Science 不要求先配置 WSL2。

选择 WSL2 发行版及其准确的非 root **Linux user**，再选择 **Save and check**。如需设置平台或发行版，先按提示完成。就绪检查和匹配的预览资源都通过后，才能使用 **Use WSL2 Bash**；只选择发行版不会启用。先执行一个简单 Shell 命令并检查结果，再开始长任务。需要恢复默认 Shell 时，选择 PowerShell。

检查失败时保留原因，在处理期间继续使用 PowerShell。安装 WSL 组件可能需要 Windows 管理员批准。这项预览与选择 Python/R Notebook 解释器是不同设置。

</PlatformContent>
