---
title: "文献库与引用"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# 文献库与引用

在线找文献时，在会话中说明主题、年份范围和筛选条件，再到 **Library → Inbox** 审阅候选记录。实操见[组会主题检索工作流](../workflows/journal-club.md)。**Search references** 用于筛选 Library 中已有的记录，不会执行在线文献检索。

文献库是共享的本地书目。项目和集合引用其中的条目，把同一论文加入另一个集合无需复制。本章使用[核心阅读清单](../workflows/core-reading-list.md)中的三篇真实 PRISMA 论文；工作流负责研究目标和验收，本页说明页面控件及条目生命周期。

需要复用附件 PDF 中的图片或表格时，按 [PDF 图表提取](previews.md#pdf-extraction)操作。导入元数据或自动获取全文本身不会完成图表提取。

## 选择正确视图

从 Home 或工作区进入 **Library**，**Back to Home** 返回项目。文献库内 **Settings** 打开引文样式，不是全局模型设置。

| 视图 | 内容 | 用途 |
| --- | --- | --- |
| Inbox | Agent 发现、等待审核的候选 | 接受前核对身份和来源 |
| All references | 已接受的活跃条目 | 搜索、编辑、整理 |
| Duplicates | 标识符/元数据疑似重复组 | 比较后再决定合并 |
| Trash | 已移除条目 | 恢复或明确永久删除 |
| Project | 与项目关联的文献 | 保持研究问题相关范围 |
| Collection | 主题分组，可嵌套 | 跨项目复用阅读集合 |

![真实 PRISMA 集合中的三篇论文](/img/open-science/guides-walkthrough/51-library-collection.webp)

## 添加或导入条目

点击 **Add** 选择来源。选择一份 PDF 进入元数据编辑器，选择多份则打开 **Import PDFs**。

| 入口 | 输入 | 保存前检查 |
| --- | --- | --- |
| Add reference | 手填书目 | 必填标题、文献类型和标识符 |
| Import PDF | 一份或多份本地 PDF | 对照每篇论文检查提取的元数据；多文件走下面的批量流程 |
| Import references | BibTeX、RIS、NBIB | 有效/无效记录、目标和标识符匹配 |

<ToolOperationGroup>
<summary>导入一批选定的 PDF</summary>

### 导入一批选定的 PDF

1. 选择本次阅读集合需要的 PDF，等待元数据提取。应用可通过识别出的 DOI 补全书目字段，仍需与论文核对。
2. 确认 **Import to** 显示的是预期目标；目标来自启动导入时所在的文献库视图，在 **When identifiers match** 选择下表中的处理方式。
3. 使用单项复选框或 **Select all** 选择本批文件；**Show more** 显示更多已列出的文件。
4. 点击 **Import selected**，检查总进度与每个文件的状态；失败文件不算导入完成。
5. 需要停止时点击 **Stop**，等待 **Stopping…** 结束。已经提交的条目保留，正在提交的操作可能先完成。
6. 停止后，选择仍为 Ready 的文件，点击 **Import selected** 继续。如果失败后显示 **Retry unfinished**，用它重试未完成项。尤其在 PDF 上传中断后，先检查保留下来的条目，再决定是否重新发起导入。
7. 对话框提供 **Done / Close** 后退出，打开目标位置核对条目和 PDF。导入前的 **Cancel** 放弃准备。

| 标识符匹配策略 | 结果 |
| --- | --- |
| Reuse existing reference | 复用匹配记录，不重复创建书目 |
| Keep as separate reference | 保留独立记录，之后再比较和去重 |
| Fill empty fields | 补空字段，保留已有及冲突值 |

批量状态包括 **Pending、Reading…、Ready、Importing…、Completed、Failed、Skipped**。选中文件、元数据准备就绪和导入完成是不同阶段。若显示 **PDF upload cancelled. The reference was kept.**，检查保留条目的附件；取消上传没有删除书目条目。

![选择两份真实 PRISMA PDF 并核对匹配策略](/img/open-science/v0.27.0/02-pdf-batch-ready.webp)

选择 **Reuse existing reference** 时，如果 PDF 提取的标题或 DOI 未匹配，仍可能创建独立条目。导入后逐篇打开，核对标题和 DOI；修正身份后再[合并重复条目](#去重与恢复条目)。**Completed** 表示导入完成，不代表识别准确。

![两份 PDF 的实际导入结果](/img/open-science/v0.27.0/03-pdf-batch-completed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>停止批量导入并保留已完成项</summary>

### 停止批量导入并保留已完成项

**Stop** 允许当前条目先完成。逐行检查状态：**Completed** 条目保留且不能再次勾选；选择剩余 **Ready** 行，再用 **Import selected** 继续。失败后若出现 **Retry unfinished**，先处理所报原因，再重试并检查已完成记录没有重复导入。

![停止 PDF 导入后保留已完成行](/img/open-science/local-todo-batch/09-pdf-import-stopped.webp)

出现 **The reference was kept. Retry to finish adding its PDF.** 时，文献条目已保存，附件尚未完成。确认原 PDF 仍在选取的位置、可以打开，再点击 **Retry unfinished**。重试会继续处理未完成行；完成后回到原集合，打开 PDF 检查内容。若提示结果无法确认，先检查文献库，再决定是否重新导入。


</ToolOperationGroup>

<ToolOperationGroup>
<summary>从其他文献管理器迁入书目</summary>

### 从其他文献管理器迁入书目

<p className="example-label"><strong>案例演示</strong> 用三种匹配策略导入 PRISMA 书目</p>

先打开目标集合，再选择 **Import references** 和 `.bib`、`.ris` 或 `.nbib` 文件。预览显示识别格式、目标位置、新增／已有／跳过数量和匹配条目。展开 **View details**，核对题名与作者后再导入。书目导入不会下载 PDF。

| 策略 | PRISMA 声明的实测结果 |
| --- | --- |
| Keep as separate reference | BibTeX 新建一条记录，Duplicates 随后出现一个 DOI 匹配组 |
| Reuse existing reference | RIS 复用一条记录，新增、跳过、失败均为零 |
| Fill empty fields | [PubMed NBIB 记录](https://pubmed.ncbi.nlm.nih.gov/19621072/)补入 PMID `19621072` 和 PMCID `PMC2707599`，原题名与五个作者条目保留 |

点击 **Import references**，等待 **Import complete**，核对 Created／Reused／Skipped／Failed 后选择 **Done**。重新打开条目检查字段，导入数量不能证明元数据准确。补空字段可以增加标识符和期刊缩写，同时保留完整期刊名。

![明确选择重复策略的 BibTeX 导入](/img/open-science/local-todo-batch/02-bibtex-import.webp)

![通过 NBIB 补充缺少的书目字段](/img/open-science/local-todo-batch/05-nbib-fill-fields.webp)


</ToolOperationGroup>

## 审核 Inbox 来源

<p className="example-label"><strong>案例演示</strong> 审核三篇 PRISMA 候选</p>

打开候选标题或 **View details**，检查 Provider、源链接、DOI 等标识符，与出版社核对年份、作者顺序、期刊。**Accept** 加入文献库，**Dismiss** 移出待审队列。批量操作前确认勾选范围。

![等待审核的三篇真实 PRISMA 候选](/img/open-science/prisma-walkthrough/04-inbox-three-papers.webp)

本例的三篇候选已逐条接受，Inbox 清空。Provider 匹配只是初始记录，不代表书目完整无误。标题中的 2020 对应声明论文的发表年份是 **2021**；两篇 2009 论文的 DOI 和作者列表不同。

## 检查和修正元数据

条目 **More actions → Edit metadata** 打开当前字段。**Complete metadata** 会查询来源，与纯本地编辑不同。

![已保存并重新打开的机构作者字段](/img/open-science/v0.27.0/04-organization-author.webp)

| 字段/控件 | 输入与作用 |
| --- | --- |
| Reference type | 论文、综述、预印本、书籍、数据集等支持的类型 |
| Title | 必填，保留发表标题 |
| Year / Publication | 发表年份与期刊/载体，不一定等于标题中的年份 |
| Advanced settings | Volume、Issue、Pages、Publisher、Place、Edition |
| Add creator / Remove creator | 新增或移除草稿中的作者行 |
| Creator role | 按来源选择 Author、Editor 或 Translator |
| Name type → Person | 填写 Given name 和 Family name |
| Name type → Organization | 填写机构完整名称，不拆成虚构人名 |
| Add identifier | DOI、PMID、PMCID、ARXIV、ISBN、ISSN、OTHER 类型和值 |
| Preferred for DOI / ISSN 等 | 选择该类型的首选标识符；不是所有类型共用一个单选项 |
| Remove identifier | 移除草稿标识符行 |
| URL / Abstract | 来源地址与摘要 |
| Save | 保存有效更改 |
| Cancel / Close | 放弃草稿 |

<p className="example-label"><strong>案例演示</strong> 将 The PRISMA Group 保留为机构作者</p>

补充 **The PRISMA Group** 时，选择 **Add creator → Creator role: Author → Name type: Organization**，填写完整名称并 **Save**。重新打开条目，确认机构位于四位个人作者之后，再将生成引用与[出版方作者列表](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000097)比较。

![APA 引文保留机构作者](/img/open-science/v0.27.0/05-organization-citation.webp)

v0.30.2 更正了 PubMed 作者姓名的解析，包括姓氏、名字缩写和后缀。导入或补全文献元数据后，对照来源检查作者字段及生成的引用。不要假定安装更新会自动重写文献库中已有的元数据。

## 智能集合 {/* #smart-collections */}

在 **New collection** 开启 **Smart collection**，即可按明确规则筛选文献库记录。选择 **Scope**（全部记录、某项目或某集合），填写必需的 **Inclusion criteria** 和可选的 **Exclusion criteria**，再选择证据与更新选项。与普通集合的说明不同，智能集合的说明会为模型评估提供上下文。

先配置 **Settings → Model → Classification models → Smart collections**，此功能没有默认模型。**Included**、**Needs review**、**Excluded**、**Not evaluated** 分别表示匹配、不确定、排除和未评估。打开 **Evaluation details** 并核对真实来源后，再选 **Include** 或 **Exclude**。更新会保留人工决定，直到恢复模型判断。

**Trial run (up to 20 references)** 保存结果，**Live rule preview** 只评估草稿而不保存。**Update automatically** 适用于所选范围内新增或变化的记录，默认需主动开启，并可能产生分类费用；它不会去文献库之外发现新论文。完整操作见[从检索到复核导出的筛选工作流](../workflows/screen-literature.md)。

运行时打开 **Screening process** 查看进度，使用 **Pause / Resume analysis** 暂停或继续；规则、文献或进度变化可能使原运行无法继续。**Back to results** 返回结果列表。范围中的 **Project** 和 **Collection** 标记区分来源类型，点击范围可跳转到来源；它们不表示多人共享权限。

## 整理已接受记录

创建普通集合时，使用 **New collection** 并保持 **Smart collection** 关闭，填写必填 **Name** 与可选 **Description**，点击 **Create collection**。说明用于整理，不是 Agent Context；Cancel/Close 放弃草稿。在 All references 勾选条目，使用 **Add to collection / Add to project**。完成后勾选清空，增加另一个目标时重新选择。

详情中的项目/集合复选框显示关联。**Manage Tags** 分配标签，表格一至五星是人工标记，不是自动证据质量评估。**Clear selection** 清除选择而不改变条目。

| 表格控件 | 范围 |
| --- | --- |
| Search references | 标题、作者、期刊、标识符、摘要、笔记等书目字段 |
| Sort references | 更改显示顺序 |
| Filters | 按类型、年份、标签、全文状态等筛选 |
| Customize | 选择/重排显示列 |
| References per page | 25、50、100 行 |
| 行复选框 / Select all | 设置批量操作目标 |
| Export | 导出所选书目，不自动打包全部 PDF |

文献库总数与当前搜索、筛选结果数分别统计。批量操作前核对当前视图和选择数量，筛选结果变少不代表条目被删除。

判断条目丢失前清除搜索和筛选。关联项目/集合不会为各目标建立独立元数据副本。

## 添加并阅读全文

**Find full-text PDF** 检查适用的 Europe PMC/PMC、OpenAlex、Unpaywall、arXiv；标识符和联系方式/凭据决定适用来源。点击 **Add attachment** 前核对来源、版本标记和 URL。

<p className="example-label"><strong>案例演示</strong> 为 PRISMA 2020 条目补充出版社 PDF</p>

找到来源后，如果 **Add attachment** 失败，从出版社下载公开 PDF，再通过同一条目的 **Add PDF** 上传。打开附件，对照出版记录检查标题及 DOI。本例的 **Preview prisma-2020-statement.pdf** 显示了对应的 PRISMA 2020 论文：**806.1 KB、15 页**。

![成功关联的出版社 PDF](/img/open-science/prisma-walkthrough/10-publisher-pdf-preview.webp)

找到来源不等于附件已保存，附件存在不等于 Agent 已阅读全文。**Read with agent** 为后续请求提供上下文。Composer 的 `@` 可选精确条目、项目 Library 或 Collection；集合提供检索范围，不会自动装入全部全文。PDF 控件见[预览](previews.md)。

找不到公开副本时保留已核对元数据，适当使用合法获取的本地 PDF。后台查询/下载任务可提供当前条目后暂停、恢复、审核、取消；取消不撤销已完成的前面条目。

<ToolOperationGroup>
<summary>分批补全文，暂停后继续</summary>

### 分批补全文，暂停后继续

1. 在文献列表选择目标条目，打开所选项的 **More actions → Find full-text PDF**。
2. 等待检索开始。需要暂停时点击 **Pause**；当前条目处理完后才进入暂停状态。
3. 核对 **Checked** 和 **Pending** 数量，再选择 **Continue search**。关闭面板后，可从 **Background tasks → Open** 返回同一任务。
4. 检索结束后检查每条候选来源与警告，选择需要的项目，再点击 **Add selected**。
5. 下载阶段也可暂停，之后用 **Continue download** 继续。检查最终 **Added / Failed / Skipped** 状态，并重新打开成功附件。
6. 不再需要待审核任务时，在 **Background tasks** 使用 **Remove task**。移除后检查该任务已消失，并确认文献与附件仍可打开；移除任务不等于删除文献或附件。

![检索在当前条目完成后暂停，保留剩余项目](/img/open-science/priority-completion/14-literature-batch-paused.webp)

暂停的检索会保留已检查与待处理条目。继续或重新打开任务后，检查最终数量和每条结果。找到候选来源与成功附加 PDF 是两个不同结果。

![从后台任务重新打开已完成的五条检索](/img/open-science/priority-completion/15-literature-batch-resumed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>有来源但无法添加 PDF</summary>

### 有来源但无法添加 PDF

若出现 **PDF could not be added**，检查来源是否要求登录、链接是否有效、文件是否超过提示的大小限制，以及当前代理/DNS。不要反复创建同一文献。

如果 PDF 来源被解析为 `198.18.x.x` 等保留地址，下载模块会拒绝它。按[网络](network.md)恢复可验证的公网解析后重试，不要关闭地址检查。若已有合法下载的 PDF，可用 **Add PDF**，然后核对标题、DOI 和页数。


</ToolOperationGroup>

## 格式化与复制引文

进入 **More actions → Citation**，选择 **Citation style**，检查完整条目及文内形式，再用 **Copy reference / Copy in-text citation / Copy BibTeX / Copy RIS**。使用前对照原来源核对作者、年份、标点和 DOI，格式转换不会修复缺失字段。

**Manage citation styles…** 打开样式管理，内置 APA、MLA、Chicago author-date、Vancouver、IEEE、Nature、AMA、Harvard。**Preview** 显示格式样例，**Browse styles** 打开外部目录，**Import CSL** 导入本地样式。下文已验证 PLOS CSL 的导入和使用。复制与文件导出是不同操作，迁移书目时应分别检查。

<ToolOperationGroup>
<summary>导入期刊样式后核对真实引文</summary>

### 导入期刊样式后核对真实引文

<p className="example-label"><strong>案例演示</strong> 为 PRISMA 条目应用 PLOS 引文样式</p>

在 **Library → Settings → Import CSL** 选择从 [CSL 样式仓库](https://github.com/citation-style-language/styles/blob/master/plos.csl)下载的独立 `plos.csl`。本例中，**Imported styles** 由 0 变为 1，并显示 **Public Library of Science**。返回真实 PRISMA 条目的 **Citation**，在 **Citation style** 中选择该样式，核对生成的编号引文与 `[1]` 文内引用。样式预览中的示例文章不属于你的文献库，正式引用应以实际条目为准。

![导入的 PLOS 样式用于真实 PRISMA 条目](/img/open-science/v0.27.0/06-imported-csl-citation.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>复制引文或导出可复用记录</summary>

### 复制引文或导出可复用记录

<p className="example-label"><strong>案例演示</strong> 复制并往返导出 PRISMA 引文记录</p>

Citation 的四个复制按钮写入不同格式。粘贴到目标编辑器，检查结果后再离开面板。

| 按钮 | PRISMA 2009 的核对结果 |
| --- | --- |
| Copy reference | APA 引文保留四位个人作者、The PRISMA Group、年份和 DOI |
| Copy in-text citation | `(Moher et al., 2009)` |
| Copy BibTeX | `@article` 记录，机构作者使用额外花括号包围 |
| Copy RIS | `TY  - JOUR` 记录，含作者、题名、年份和 DOI 字段 |

![真实 PRISMA 条目的引文复制控件](/img/open-science/local-todo-batch/01-citation-copy.webp)

需要文件时，关闭 Citation，勾选表格行，选择 **Export → BibTeX** 或 **RIS**。在系统保存窗口选择位置，等待 **Saved**。导出的是书目记录，不包含 PDF 附件包。将保存的文件重新导入测试集合，选择 **Reuse existing reference** 并核对匹配数量。两份 PRISMA 导出文件均复用了已有 DOI，没有新增记录。

这里的 BibTeX 保存年份和月份，往返后为 `2009-7`；RIS 保留 `2009-07-21`，合并时应核对日期精度。普通 RIS 作者字段在其他管理器中不一定保留独立的机构类型；如需保持该区别，应检查导入后的作者编辑器。


</ToolOperationGroup>

## 去重与恢复条目

<p className="example-label"><strong>案例演示</strong> 合并并恢复 PRISMA 条目及其附件</p>

<ToolOperationGroup>
<summary>保留一条记录及其附件</summary>

### 保留一条记录及其附件

1. 打开 **Duplicates → Review duplicates**。检查范围是整个文献库的活跃记录，不限当前集合。
2. 在 **Keep reference** 选择身份已核对的记录，比较 DOI、作者、附件数量和添加时间。**Show all fields** 展示冲突视图中隐藏的其他字段。
3. 逐项选择冲突字段来源。例如 PRISMA 的 BibTeX 往返中，保留完整日期 `2009-07-21`，而不是 `2009-7`。空字段可从另一条记录补入。
4. 核对 **After merging** 的附件、集合和项目数量，再点击 **Merge references**；**Cancel** 保持记录分开。
5. 重新打开保留条目，检查元数据、关联和 PDF 正文。被合并的条目在 Trash 中标为 **Merged duplicate**。

![比较保留条目和冲突日期](/img/open-science/local-todo-batch/03-merge-bibtex.webp)

标题被提取为 `pmed.1000097 1..6` 的 PDF 最初没有进入重复组。核对论文后，修正标题并补入 DOI `10.1371/journal.pmed.1000097`，才出现匹配组。本例合并到已核对的书目条目后，保留了 **1 份 PDF、2 个集合关联和 1 个项目关联**；六页 PDF 可重新打开。先确认论文身份，不能只凭文件名相似就合并。

![合并后保留 PDF 和组织关联](/img/open-science/local-todo-batch/06-merged-attachment-links.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>恢复误移入回收站的文献</summary>

### 恢复误移入回收站的文献

行菜单 **More actions → Move to Trash** 会从活跃文献、项目和集合视图移除该条目。在 **Trash** 搜索标题或标识符，打开行菜单并选择 **Restore**。应先恢复再编辑、预览或导出：这些控件在 Trash 中被禁用。返回原项目与集合检查关联。本例的 PRISMA 条目恢复后，PDF 和三个关联均保留。

![通过回收站行菜单恢复文献](/img/open-science/local-todo-batch/07-trash-restore.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>永久删除不需要的重复条目</summary>

### 永久删除不需要的重复条目

在 Trash 选择 **More actions → Delete permanently**，阅读确认范围；**Cancel** 保留条目。确认后删除选中文献及元数据，不再共享的附件文件随后清理。历史输出保留，搜索索引另行过期，因此它不是安全擦除。删除前导出仍需保留的内容。

删除后检查所选记录已从 Trash 消失，保留的文献及附件仍可打开。解除集合关联、移入回收站和永久删除分别作用于不同范围。

![核对永久删除的具体范围](/img/open-science/local-todo-batch/08-reference-delete-scope.webp)


</ToolOperationGroup>

## 附件更改与并发编辑

移除附件前，阅读删除确认并核对目标文件和版本；通过可用的版本历史查看旧附件版本。删除 PDF、把文献移入 Trash、永久删除文献的范围不同，历史对话中保留的证据还可能限制文件清理。

另一客户端在编辑期间修改了集合时，过期保存可能被拒绝。重新打开最新集合，比较已保存值与本次修改，再重试。保存后的刷新或清理报错不一定表示保存失败，应先检查实际条目再重复操作。


源码：[批量导入](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx)、[元数据编辑器](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteratureMetadataEditor.tsx)、[附件历史与删除](https://github.com/aipoch/open-science/commit/f4a82d4a)、[并发编辑](https://github.com/aipoch/open-science/commit/dbb9560a)。

## 保存 PDF 阅读笔记

在文献附件中打开 PDF，使用 **Notes & Annotations** 保存批注、页级问题和整篇笔记。同一文献库文件版本在不同项目和会话中共享这些笔记。通过全局搜索的 **Library** 结果找到笔记，再选择 **Show annotation source** 返回原文。步骤和导出方法见 [PDF 批注与文档笔记](pdf-notes.md)。
