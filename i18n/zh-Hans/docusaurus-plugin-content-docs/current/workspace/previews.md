---
sidebar_position: 4
title: 文件预览
---

# 文件预览

Open Science 根据扩展名、MIME 和可用渲染器选择预览。预览失败不会改变原文件，仍可 `Download` 后使用外部工具打开。

## 表格与源码

![CSV 表格预览](/img/open-science/preview-csv.png)

CSV 以行列网格显示；大文件会限制即时渲染规模。代码/纯文本预览显示行号和语法高亮，顶部提供 `Download` 与 `Close`。

![Python 代码预览](/img/open-science/preview-code.png)

JSON 以结构化/源码方式读取，Markdown 渲染标题、列表、链接和代码。HTML 使用受控预览策略，不应把不可信脚本当成应用权限代码。

## 分子与结构

![PDB 三维结构预览](/img/open-science/preview-pdb.png)

PDB 使用 3Dmol 视图。鼠标拖动旋转、滚轮缩放、Shift+拖动平移；`Cartoon`、`Stick`、`Sphere`、`Surface`、`Line` 切换表示方式。没有可用二级结构时 Cartoon 可能禁用。分子预览还支持仓库定义的其他分子格式；解析失败时回退到下载/文本提示。

## 支持的预览族

| 预览族 | 常见格式 | 主要操作 |
| --- | --- | --- |
| Code/Text | `.py`、`.r`、`.js`、`.ts`、`.txt` 等 | 行号、语法高亮、复制/下载 |
| CSV | `.csv` | 行列查看、滚动、下载 |
| Markdown/JSON/HTML | `.md`、`.json`、`.html` | 渲染或结构化查看 |
| Image/TIFF | PNG、JPEG、GIF、WebP、TIFF | 缩放、平移；TIFF 使用专用 worker/thumbnail |
| PDF | `.pdf` | 页缩略图、翻页、缩放、下载 |
| Office | DOCX、XLSX、PPTX 等 | 受管理的 Office 渲染器；失败时给出替代操作 |
| Bio sequence | FASTA 等 | 序列友好视图 |
| Molecule/structure | PDB 与受支持分子格式 | 三维旋转、缩放和表现形式 |
| Unknown | 其他二进制/过大文件 | Fallback 信息与下载 |

## 模态与分栏控制

模态顶部依次可有 Download、状态、File actions、Full screen、Close。分栏标签还显示 artifact `v1/v2…`，`Previous/Next Artifact version` 在版本间切换；Full screen 只改变布局，不创建新版本。

:::tip
引用研究结果时记录文件名和 artifact 版本。文件名相同不代表内容相同，Provenance 的不可变 version ID 才是复现锚点。
:::
