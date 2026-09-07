---
sidebar_position: 2
title: 文件、格式与命名
last_update:
  date: '2026-08-13'
---

# 文件、格式与命名

## 输入与预览

Open Science 可把任意允许大小的文件作为项目资源管理，但“可上传”不等于“可内嵌预览”或“模型可理解”。已实现的专用 renderer 包括 Code、Text、CSV、JSON、Markdown、HTML、Image、TIFF、PDF、Office、FASTA、Molecule 与 PDB；其余进入 fallback 并提供下载。

| 类型 | 推荐扩展名 | 注意 |
| --- | --- | --- |
| Python/R/脚本 | `.py`、`.r`、`.sh`、`.js`、`.ts` | 预览不会自动执行 |
| 表格 | `.csv`、Office spreadsheet | CSV 最便于文本追踪；大型表格预览会限量 |
| 文档 | `.md`、`.txt`、`.pdf`、DOCX | PDF/Office 使用专用资源生命周期 |
| 图片 | `.png`、`.jpg`、`.webp`、`.gif`、`.tif/.tiff` | Composer 需模型声明 Images；TIFF 有独立 worker |
| 结构 | `.pdb` 与受支持分子格式 | 三维视图只用于检查，不替代验证软件 |
| 序列 | FASTA 常用扩展名 | 保持标准 header/sequence 格式 |
| 数据/元数据 | `.json`、`.html` | 不可信 HTML 不应获得应用权限 |
| Notebook | `.ipynb` | Session Notebook 在有可转换 cells 时导出 |

## 文件名与版本

- 使用稳定、描述性的 ASCII/Unicode 文件名并保留扩展名。
- 在文件名中加入样本/阶段，而不是把全部版本历史编码进名称。
- Generated artifact 的 `vN` 和 immutable ID 才是 provenance 版本；同名 upload 没有自动等价关系。
- 下载时如果操作系统处理重名，核对实际保存名与 hash/内容。

## 大文件与二进制

超出即时预览能力时应下载或使用外部工具；不要把预览缩略图当作完整数据。远程计算生成的大结果应通过受管理 harvest 导入项目，保留关联的 execution log。

## 图片模型限制

Provider 的 `Supports images` 声明必须与真实 API 一致。若当前模型不支持图片，Composer 会阻止图片 attachment；换模型后重新附加。文件已经在 Project Files 时，能否由模型读取仍由请求准备与模型能力决定。
