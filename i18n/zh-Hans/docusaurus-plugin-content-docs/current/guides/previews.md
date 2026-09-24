---
title: "打开与预览文件"
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 打开与预览文件

打开保存结果，检查所选版本。本页说明通用查看控件与普通文档格式。数据解释见[表格](../tools/tables.md)，序列与结构专用控件见[科学查看器](../tools/viewers.md)。

## 打开、放大和返回

点击生成文件卡片打开预览。**Open … in split view beside the session** 将文件放在对话旁。切换标签查看其他文件，**Open full screen preview of …** 放大单个文件，**Close preview of …** 关闭相应视图。**Collapse preview panel** 隐藏面板，不删除文件。文件预览全屏与 Files 文件库全屏是不同视图。

| 标题栏控件 | 含义 |
| --- | --- |
| 文件名与版本 | 下载或引用前确认目标 |
| Download | 保存该结果的副本 |
| File actions → Provenance | 查看托管产物版本的证据 |
| View in context | 返回产出会话 |
| Previous / Next file version | 切换已有不可变版本 |
| Edit / Compare | 仅适用于支持的托管内容，见[文件](files.md) |
| Close | 关闭视图，不是删除 |

以上关闭行为适用于文件预览。[Side Chat 标签](delegation.md)会另行要求确认：关闭后停止该旁聊并移除对话。完整重启应用也会清除其余旁聊；已经送达 Main 的消息仍会保留。

想为自己保存阅读位置时，选中文字或 PDF 区域后选择 **For me**，参阅[阅读书签](bookmarks.md)。

## 按格式阅读文件

### 阅读结果表

<p className="example-label"><strong>案例演示</strong> 阅读 RNA-seq 质控表、图表与报告</p>

打开 `rnaseq-sample-qc.csv`，本例显示 **12 rows · 6 columns**，首行作为表头。横向滚动可查看较长的原始列名及右侧指标。行号是显示位置，不是基因或样本编号。

![十二样本质控表](/img/open-science/guides-walkthrough/42-rnaseq-table.webp)

检查列名与完整标识是否可读。字段解释与公共基准核对见[表格与数据集](../tools/tables.md)。

原 `.txt` 是制表符分隔矩阵，可能以文本而非 CSV 网格显示。改扩展名不会自动改变分隔符或数据含义。大文件预览可能受限，应阅读显示的行列限制，不能把可见部分当作全部数据。格式限制见[参考](../reference/formats.md)。

### 检查图表

打开 `rnaseq-library-sizes.png`，使用 **Zoom in / Zoom out / Reset zoom**。标签太小时打开全屏。缩放只改变显示，不重新取样，也不更新统计结果。

![全屏显示实际原始计数总量图](/img/open-science/guides-walkthrough/54-rnaseq-figure.webp)

核对原始计数坐标轴、十二个样本标签以及 CSV/报告中的名称对应。柱高不同不能单独证明差异表达。本例只做分析前的描述性检查，没有归一化或假设检验。

### 结合方法与溯源阅读

Markdown 渲染标题、列表、代码和链接。接受图表前检查校验和及方法。链接通过相应来源预览或外部浏览器打开，先核对完整域名。加载失败不等于已阅读来源。

通过 **Provenance** 检查所选产物的代码、执行日志、消息、环境及审查。出现 **partial / bounded / No review for this version** 时，按 [Notebook 与执行证据](notebook.md)理解其范围。

### 阅读 Office 文件与多页图像

<p className="example-label"><strong>案例演示</strong> 查看质控结果的 Office 与 TIFF 阅读副本</p>

<ExampleDownload path="/examples/gse60450/office/GSE60450-qc-reading.docx">Word 报告</ExampleDownload>、<ExampleDownload path="/examples/gse60450/office/GSE60450-sample-qc.xlsx">Excel 工作簿</ExampleDownload>、<ExampleDownload path="/examples/gse60450/office/GSE60450-qc-overview.pptx">PowerPoint 幻灯片</ExampleDownload>和<ExampleDownload path="/examples/gse60450/office/GSE60450-qc-figures.tiff">双页 TIFF</ExampleDownload>整理了同一份 GSE60450 QC 结果，属于阅读副本，不是新的分析。

| 格式 | 操作与检查重点 |
| --- | --- |
| DOCX | 附加并打开报告，滚动阅读两页，检查首个样本的数值及方法与解释。全屏预览能容纳较长行；这里没有 Word 编辑工具栏 |
| XLSX | 打开工作簿，在底部选择 **Summary** 或 **Samples**。横向滚动查看最后一列。Samples 有 12 行样本，加上表头、间隔和来源说明共 17 个已用行；预览显示 17 行不表示有 17 个生物样本。已保存的单元格数值也不证明重新计算过公式 |
| PPTX | 从 QC 摘要向下滚动到 Methods and interpretation。两页幻灯片均已在本地渲染；此处是阅读视图，不是编辑器或放映控制台 |
| TIFF | 用 **Next page / Previous page** 切换。两页分别显示原始文库大小和有计数基因的中位数。**Zoom in / Zoom out / Reset zoom** 只改变视图；解释图像前确认 **Page 1 of 2** 或 **Page 2 of 2** |
| JSON | 打开<ExampleDownload path="/examples/gse60450/office/GSE60450-qc-summary.json">摘要文件</ExampleDownload>检查源码、标识符和数值。它以代码显示，不是可展开的对象树 |
| HTML | 打开<ExampleDownload path="/examples/gse60450/office/GSE60450-qc-summary.html">阅读表格</ExampleDownload>，**Source** 查看 HTML，**Render** 返回排版视图，两者都不会重跑 QC |

![实际工作簿中选择 Samples](/img/open-science/local-todo-batch/47-workbook-samples.webp)

![实际 TIFF 的第二页](/img/open-science/local-todo-batch/50-tiff-second-page.webp)

出现 **Preview unavailable → Open this Office file in your default app to view it.** 时，本地文件可使用 **Open**，托管上传文件可使用 **Download**，再通过兼容应用打开。内置预览无法显示时，仍可用这条路径查看原文件。

### 其他受支持的预览

下表列出各类文件可用的预览方式与控制入口。

| 类型 | 检查重点 | 控件与边界 |
| --- | --- | --- |
| PDF | 页码、可读文字、源文件 | 缩略图、目录、文档搜索、翻页、缩放、文字/区域选择；扫描页可能没有可搜索文字 |
| 代码/文本 | 所需代码块是否完整、语言 | 行号、语法显示、复制/下载；超大内容可能受限 |
| JSON / HTML | 结构或渲染内容 | 渲染不代表允许以应用权限执行代码 |
| 图像 / TIFF | 分辨率与目标图 | 缩放/平移；TIFF 使用专用渲染流程 |
| Office | 托管渲染是否成功 | DOCX/XLSX/PPTX 不可预览时下载后外部打开；不等于完整 Office 编辑 |
| 生物序列 | 序列身份和范围 | 支持的 FASTA 使用序列视图 |
| 分子结构 | 解析模型和表现方式 | 旋转、缩放、平移及支持的 Cartoon/Stick/Sphere/Surface/Line；缺少结构信息可能禁用某种表现 |
| 未知格式 | 文件名、大小、回退提示 | 下载到合适软件查看；扩展名不证明内容有效 |

PDF 上下文只关联当前任务需要的论文，后续不应使用时取消关联。每会话最多关联三份 PDF。没有附全文的文献条目提供元数据，不代表模型已阅读全文，见[文献库](library.md)。

### 图表源码与不同格式的控件

对话中的 Mermaid 图渲染完成后，可在操作栏点击 **View source** 查看图表原文，**View diagram** 返回图形。渲染前不提供此切换；图表被错误面板替代时，切换不可用。切换仅改变显示，不修改分析或源文件。

<p className="example-label"><strong>示例</strong> 切换 Mermaid 图表与源码</p>

在新会话请求：**显示一个 Mermaid 流程图，包含三个步骤：附加文件 → 检查预览 → 保存报告，不要加入文件链接。** 渲染完成后，将指针移到图上，选择 **View source**，核对三个节点。选择 **View diagram** 返回；标签过小时使用 **View fullscreen**。

流程图展示请求中的步骤。检查已保存文件时，请打开实际文件卡片；流程图节点本身不是产物引用。

| 格式 | 应检查的行为 |
| --- | --- |
| 单页 PDF | 不显示多页 Reading 入口，使用普通 PDF 预览控件 |
| CSV | 检查显示范围，有限预览不能当作完整输入或导出 |
| Office 工作簿 | 检查所选可见工作表及渲染错误，不支持的编辑使用原文件 |
| TIFF | 先检查选中页和渲染结果，再解释像素或样本值 |
| JSON | 格式重要时核对保留的源文本 |
| Markdown 表格 | 聚焦表格操作，使用键盘访问复制、下载和全屏控件 |

## 提取 PDF 图片与表格 {/* #pdf-extraction */}

需要从文献 PDF 取得图片或可复用表格时，使用此功能。先在[文献库](library.md)添加并检查 PDF；只有文献元数据不能作为提取输入。

1. 打开 PDF 预览，选择 **Original PDF** 旁的 **Figures and tables**。
2. 首次使用时选择 **Download and continue**，安装所需模型资源，并等待安装和完整性检查。资源就绪后使用 **Analyze PDF**。
3. 查看逐页进度。完成后选择候选图表，用 **Show in PDF** 对照原文页面、图注及周围文字。
4. 图片可在图像预览中使用 **Copy image** 或 **Download image**。表格选择 **Table**，再选择 **TSV**、**HTML** 或 **Markdown**，使用对应复制/下载操作；需要检查原始裁图时选择 **Image**。
5. 重新打开导出文件，检查行列对应、合并表头、单位、脚注和跨页内容，再用于分析或报告。

模型资源下载后，提取在本地运行。重新打开同一 PDF 可以复用缓存结果；需要重新提取时使用 **Analyze again**。需要停止时使用进度中的取消控件。分析未完成时，先检查失败页提示，不要把当前可见候选项当作整篇文档的全部图表。

**Unplaced table text** 和 **Table notes** 保留需要人工核对的内容。结构化单元格不可用时，对照原始裁图和 PDF，不要推测缺失单元格。此提取流程暂不支持扫描页和旋转页；提取不可用不等于 PDF 本身不能阅读。

### 让 Agent 读取已提取的图表 {/* #pdf-agent-evidence */}

1. 打开目标 PDF，使用 **Read with agent** 将它链接到当前会话，并在 **Figures and tables** 完成相关页面的分析。发送问题前，确认输入框中仍有该 PDF 的阅读上下文。只有文献库记录不等于已链接 PDF，链接本身也不会启动这项分析。
2. 提问时指明具体的图、表或算法，提供编号或页码，以及要回答的问题。
3. 查看工具活动：**list_pdf_elements** 列出可用的提取元素，**read_pdf_element** 读取所选证据。要求回答标明来源页码，以及缺失或不确定的内容。
4. 对照原图或原表，核对表头、单位和注释。若尚未提取或结果不完整，先分析缺失页面再重试；只有图注不能证明趋势或精确表值。

<p className="example-label"><strong>示例</strong> 要求读取已链接论文的表格证据</p>

> 从已链接 PDF 的提取元素中读取 Table 1，报告物理 PDF 页码、列标题和与我的问题有关的数值。保留单位与脚注，明确说明缺失单元格或提取不完整的地方。

这些工具读取已有提取结果，不会自行启动 PDF 分析。表格可能分批返回，图和算法内容可能以图片提供。需要图片证据时，确认所选模型支持相应输入；图片已送达不等于已正确解读。

## 主动加载远程媒体 {/* #remote-media */}

模型回复引用的远程图片、音频和视频，需要你主动加载。操作前阅读控件显示的目标主机。授权只针对当前媒体元素及其地址，不覆盖所有后续回复或整个域名；关闭预览也不能撤回已经发出的请求。

含远程图片的 Mermaid 图可能在加载前被阻止；需要时可要求生成不含嵌入图片的普通图。图片发送给模型时，Open-Science 会移除模型输入副本的附加元数据，原文件保留。这不会移除图片画面中直接可见的敏感内容。

## 下载后核对原文件

打开目标预览，选择 **Download**，在系统保存窗口确认文件名和位置，然后保存。重新打开下载副本，检查内容。下载保存的是原文件；TIFF 翻到第二页或 Excel 切换工作表不会把下载限制为当前页或工作表。

## 预览失败时

先确认保存成功，再核对版本和格式。尝试下载，区分渲染器限制与文件不可用。本地文件在外部修改后，可用 Reload 重新读取。不要为修复显示而覆盖输入。排查时记录文件名、类型、大小、应用版本和报错，不必分享无关私有内容。

实现依据：[Mermaid](https://github.com/aipoch/open-science/commit/5f6e7995)、[PDF 条件](https://github.com/aipoch/open-science/commit/2722da2a)、[CSV](https://github.com/aipoch/open-science/commit/9275c2c0)、[Office](https://github.com/aipoch/open-science/commit/0291871f)、[TIFF](https://github.com/aipoch/open-science/commit/52152ed4)。

专业格式的入口、控件和文件要求见[科学查看器](../tools/viewers.md)。

## 批注 PDF

打开 **Notes & Annotations** 管理高亮、区域标记、页面笔记和文档笔记。**Show notes sidebar** 可以把笔记显示在原文旁。下载菜单区分 **Download original PDF** 与 **Download PDF with annotations**。完整的阅读、搜索与导出步骤见 [PDF 批注与文档笔记](pdf-notes.md)。

首次使用 **Figures & Tables** 安装本地模型时，如果主下载源无法访问，应用可以尝试受认可的备用镜像。等待下载和完整性检查完成后，再选择 **Analyze PDF**。镜像不会省去本地资源安装；已有缓存结果可以直接重新打开。

## 第一条消息就读取 PDF {/* #first-message-pdf */}

1. 在 **Library** 打开一篇已有可读 PDF 的论文，选择 **Read with agent**。
2. 选择目标项目和 **New conversation**。确认输入框的 **Reading** 下出现该 PDF，预览显示 **In session context**。
3. 直接发送问题，不需要先发一条介绍消息再关联论文。

<p className="example-label"><strong>案例演示</strong> 询问 Lang 等人 2019 年论文中的稳定机制</p>

本例使用 [Non defect-stabilized thermally stable single-atom catalyst](https://doi.org/10.1038/s41467-018-08136-3) 这篇 CC BY 4.0 开放获取论文，主模型采用 **Codex subscription**。

![首次发送消息前，PDF 已在新会话的 Reading 中关联](/img/open-science/v0331/pdf-first-message.webp)

```text
Using the linked PDF, explain how Lang et al. distinguish non-defect
stabilization from defect trapping. Give the paper title and DOI,
two specific findings with PDF page or figure locations, and one
limitation. Keep the answer in English and cite only evidence you
can actually read.
```

回复检索关联 PDF 中的段落，给出论文身份、机制和可回查的位置。并排打开原文与回复，逐条核对引用。正文提到某个图号，不代表图像已经提取或被模型识别；需要图像证据时，使用 [Figures & Tables](#pdf-extraction)。

![英文回复与原始 PDF 并排展示，Reading 关联仍然保留](/img/open-science/v0331/pdf-first-response.webp)

高亮和整篇笔记的用法见 [PDF 批注](pdf-notes.md)。
