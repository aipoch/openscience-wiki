---
title: "文件格式与限制"
last_update:
  date: '2026-11-19'
---

# 文件格式与限制

本页汇总文件路由与限制。上传、预览、工具解析和模型理解是不同能力。上传成功不代表存在内嵌查看器，也不代表当前模型能理解该文件。

<span id="输入与预览" />

<span id="文件名与版本" />

<span id="大文件与二进制" />

<span id="图片模型限制" />

## 预览格式

| 内容 | 识别扩展名 | 行为与边界 |
| --- | --- | --- |
| 普通图像 | `avif`、`gif`、`jpeg`、`jpg`、`png`、`svg`、`webp` | 图像预览；模型输入另受图像能力限制 |
| TIFF | `tif`、`tiff` | 独立解码器，有文件、像素和内存限制 |
| 分隔表格 | `csv`、`tsv` | 第一行作为表头，显示行列受限 |
| 序列 | `fa`、`faa`、`fasta`、`ffn`、`fna`、`frn` | FASTA 检查，不验证分析方法 |
| 结构 | `pdb` | 结构查看，不评价预测质量 |
| 分子/反应 | `mol`、`sdf`、`smi`、`smiles`、`rxn` | 专用分子预览；不能推断 `mol2` 也有相同路由 |
| PDF | `pdf` | 独立文档阅读器与分页控件 |
| Word | `docx` | Office 渲染器；旧 `doc` 不交给 DOCX 解析 |
| 电子表格 | `xls`、`xlsx` | Office 预览；执行分析是另一动作 |
| 演示文稿 | `pptx` | 演示预览与[幻灯片编辑](../guides/presentation-editing.md)；旧 `ppt` 不交给 PPTX 解析 |
| Markdown | `md`、`markdown` | 渲染文档，并提供适用的文本版本操作 |
| HTML | `htm`、`html` | 隔离预览，不授予应用权限 |
| JSON | `json` | 结构化预览，也识别对应计划格式 |
| 代码 | `bash`、`bib`、`bibtex`、`css`、`js`、`jsx`、`py`、`r`、`sh`、`tex`、`ts`、`tsx` | 高亮源代码，打开不会执行 |
| 纯文本 | `conf`、`config`、`ini`、`iqtree`、`log`、`nwk`、`state`、`toml`、`tree`、`treefile`、`txt`、`xml`、`yaml`、`yml` | 有读取上限的文本预览 |
| 其他文件 | 未识别格式 | 使用适用的回退/下载；可导出 `.ipynb` 不代表有对应文件编辑器 |

无扩展名文件还可能使用有限的 MIME 回退。误导性的 Office MIME 不会让旧格式兼容 OOXML 渲染器。

[精确路由表](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts)、[渲染器注册表](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/preview-registry.tsx)。

## 大小和显示限制

下列使用二进制单位：1 MiB = 1,048,576 字节，1 GiB = 1,073,741,824 字节。界面可能显示为 MB 或 GB。

| 边界 | 源码限制 | 适用范围 |
| --- | ---: | --- |
| 单个项目上传 | 10 GiB | 上传准入，不是预览或模型上下文预算 |
| 单个上传块 | 8 MiB | 传输分块，不是用户每文件上限 |
| Composer 附件 | 10 个 | 每条消息的附件数 |
| Composer 产物引用 | 10 个 | 每条消息的显式产物引用数 |
| 默认文本预览读取 | 1 MiB | 初次有界读取 |
| 通用预览最大请求读取 | 10 MiB | 通用读取器上限；专用读取器另有限制 |
| CSV/TSV 可见数据 | 100 行 × 24 列 | 表头之后的显示范围，不是数据集大小 |
| Office 文件预览 | 40 MiB | Office 预览准入 |
| TIFF 文件预览 | 40 MiB | TIFF 文件大小 |
| TIFF 解码像素 | 25,000,000 | 解码像素预算 |
| TIFF 解码分配 | 256 MiB | 解码器内存预算 |
| TIFF 页数 | 512 | 预检页数上限，另有结构限制 |
| 自动 PDF 提取/获取 | 50 MiB | 自动提取/获取路径，不是通用项目上传上限 |

这些限额分别作用于预览、上传和包导入。文件过大时，使用兼容的外部读取工具打开原文件，或按分析方法要求拆分输入。

**Showing 100 rows** 不代表源文件只有一百行。用 Notebook 实际解析确认总数；GSE60450 源矩阵有 27,179 个基因行，样本质控表有十二行，两者描述不同单位。

[上传限制](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/uploads.ts)、[CSV 范围](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/renderers/CsvPreview.tsx)、[文本读取](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/usePreviewFileContent.ts)、[Office](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/office-preview.ts)、[TIFF](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/tiff-preview-types.ts)、[PDF 提取](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/uploads/attachment-media.ts)。

## 文献导入与引用输出

| 项目 | 约束 | 区分 |
| --- | --- | --- |
| 文献记录导入 | BibTeX、RIS、NBIB | 导入书目，不保证附带全文 |
| 导入内容 | 32 MiB、1,000 条记录范围 | 大文献集应分批导入并检查 |
| 引用样式导入 | CSL，1 MiB | 样式定义，不是文献集合 |
| 书目记录导出 | BibTeX 或 RIS | 支持 NBIB 导入不等于支持 NBIB 导出 |
| 引用格式语言 | `en-US`、`zh-CN` | 与应用 UI 语言不同 |
| 集合名称 | 200 字符 | 文献集合标签 |
| 集合描述 | 1,000 字符 | 不替代 Project Agent Context |

DOI 元数据不是已下载 PDF；附有 PDF 也不证明代理读过全文。要同时检查附件和实际执行/证据记录。

[文献 schema 与限制](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/literature.ts)、[导入导出格式器](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/literature/citation-formatter.ts)。

## 版本与下载身份

| 标识 | 用途 | 不能替代的内容 |
| --- | --- | --- |
| 显示名称 | 在界面定位文件 | 名字本身不能确定不可变内容 |
| 文件/产物 ID | 标识托管对象 | 下载路径不是托管对象身份 |
| 版本 ID / `vN` | 定位精确修订和溯源 | 最新内容可能不是原结果使用的版本 |
| 校验和 | 比较来源与副本字节 | 同名不代表相同字节 |
| 下载目录 | 定位外部副本 | 编辑该副本不会自动更新托管版本 |

操作步骤见 [Notebook 与证据](../guides/notebook.md)和[公开数据工作流](../workflows/data-quality.md)。限制集中在此查询，指南保留任务步骤。

不同格式的操作见[预览控件](../guides/previews.md)：Mermaid 源码/图形切换、单页 PDF 的 Reading 条件、有限表格、工作表选择及 TIFF 页面处理。预览、模型输入和导出需要分别核验。
