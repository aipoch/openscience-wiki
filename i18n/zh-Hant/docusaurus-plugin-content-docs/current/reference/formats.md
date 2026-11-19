---
title: "檔案格式與限制"
last_update:
  date: '2026-11-19'
---

# 檔案格式與限制 {/* #文件格式与限制 */}

本頁彙總檔案路由與限制。上傳、預覽、工具解析和模型理解是不同能力。上傳成功不代表存在內嵌檢視器，也不代表當前模型能理解該檔案。

<span id="输入与预览" />

<span id="文件名与版本" />

<span id="大文件与二进制" />

<span id="图片模型限制" />

## 預覽格式 {/* #预览格式 */}

| 內容 | 識別擴展名 | 行爲與邊界 |
| --- | --- | --- |
| 普通圖像 | `avif`、`gif`、`jpeg`、`jpg`、`png`、`svg`、`webp` | 圖像預覽；模型輸入另受圖像能力限制 |
| TIFF | `tif`、`tiff` | 獨立解碼器，有文件、像素和內存限制 |
| 分隔表格 | `csv`、`tsv` | 第一行作爲表頭，顯示行列受限 |
| 序列 | `fa`、`faa`、`fasta`、`ffn`、`fna`、`frn` | FASTA 檢查，不驗證分析方法 |
| 結構 | `pdb` | 結構查看，不評價預測質量 |
| 分子/反應 | `mol`、`sdf`、`smi`、`smiles`、`rxn` | 專用分子預覽；不能推斷 `mol2` 也有相同路由 |
| PDF | `pdf` | 獨立文檔閱讀器與分頁控件 |
| Word | `docx` | Office 渲染器；舊 `doc` 不交給 DOCX 解析 |
| 電子表格 | `xls`、`xlsx` | Office 預覽；執行分析是另一動作 |
| 演示文稿 | `pptx` | 演示預覽與[幻燈片編輯](../guides/presentation-editing.md)；舊 `ppt` 不交給 PPTX 解析 |
| Markdown | `md`、`markdown` | 渲染文檔，並提供適用的文本版本操作 |
| HTML | `htm`、`html` | 隔離預覽，不授予應用權限 |
| JSON | `json` | 結構化預覽，也識別對應計劃格式 |
| 代碼 | `bash`、`bib`、`bibtex`、`css`、`js`、`jsx`、`py`、`r`、`sh`、`tex`、`ts`、`tsx` | 高亮源代碼，打開不會執行 |
| 純文本 | `conf`、`config`、`ini`、`iqtree`、`log`、`nwk`、`state`、`toml`、`tree`、`treefile`、`txt`、`xml`、`yaml`、`yml` | 有讀取上限的文本預覽 |
| 其他文件 | 未識別格式 | 使用適用的回退/下載；可導出 `.ipynb` 不代表有對應文件編輯器 |

無副檔名檔案還可能使用有限的 MIME 回退。誤導性的 Office MIME 不會讓舊格式相容 OOXML 渲染器。

[精確路由表](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts)、[渲染器登錄檔](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/preview-registry.tsx)。

## 大小和顯示限制 {/* #大小和显示限制 */}

下列使用二進位制單位：1 MiB = 1,048,576 位元組，1 GiB = 1,073,741,824 位元組。介面可能顯示為 MB 或 GB。

| 邊界 | 原始碼限制 | 適用範圍 |
| --- | ---: | --- |
| 單個專案上傳 | 10 GiB | 上傳准入，不是預覽或模型上下文預算 |
| 單個上傳塊 | 8 MiB | 傳輸分塊，不是使用者每檔案上限 |
| Composer 附件 | 10 個 | 每條訊息的附件數 |
| Composer 產物引用 | 10 個 | 每條訊息的顯式產物引用數 |
| 預設文字預覽讀取 | 1 MiB | 初次有界讀取 |
| 通用預覽最大請求讀取 | 10 MiB | 通用讀取器上限；專用讀取器另有限制 |
| CSV/TSV 可見資料 | 100 行 × 24 列 | 表頭之後的顯示範圍，不是資料集大小 |
| Office 檔案預覽 | 40 MiB | Office 預覽准入 |
| TIFF 檔案預覽 | 40 MiB | TIFF 檔案大小 |
| TIFF 解碼畫素 | 25,000,000 | 解碼畫素預算 |
| TIFF 解碼分配 | 256 MiB | 解碼器記憶體預算 |
| TIFF 頁數 | 512 | 預檢頁數上限，另有結構限制 |
| 自動 PDF 提取/獲取 | 50 MiB | 自動提取/獲取路徑，不是通用專案上傳上限 |

這些限額分別作用於預覽、上傳和包匯入。檔案過大時，使用相容的外部讀取工具開啟原檔案，或按分析方法要求拆分輸入。

**Showing 100 rows** 不代表原始檔只有一百行。用 Notebook 實際解析確認總數；GSE60450 源矩陣有 27,179 個基因行，樣本質控表有十二行，兩者描述不同單位。

[上傳限制](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/uploads.ts)、[CSV 範圍](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/renderers/CsvPreview.tsx)、[文字讀取](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/usePreviewFileContent.ts)、[Office](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/office-preview.ts)、[TIFF](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/tiff-preview-types.ts)、[PDF 提取](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/uploads/attachment-media.ts)。

## 文獻匯入與引用輸出 {/* #文献导入与引用输出 */}

| 專案 | 約束 | 區分 |
| --- | --- | --- |
| 文獻記錄匯入 | BibTeX、RIS、NBIB | 匯入書目，不保證附帶全文 |
| 匯入內容 | 32 MiB、1,000 條記錄範圍 | 大文獻集應分批匯入並檢查 |
| 引用樣式匯入 | CSL，1 MiB | 樣式定義，不是文獻集合 |
| 書目記錄匯出 | BibTeX 或 RIS | 支援 NBIB 匯入不等於支援 NBIB 匯出 |
| 引用格式語言 | `en-US`、`zh-CN` | 與應用 UI 語言不同 |
| 集合名稱 | 200 字元 | 文獻集合標籤 |
| 集合描述 | 1,000 字元 | 不替代 Project Agent Context |

DOI 後設資料不是已下載 PDF；附有 PDF 也不證明代理讀過全文。要同時檢查附件和實際執行/證據記錄。

[文獻 schema 與限制](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/literature.ts)、[匯入匯出格式器](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/literature/citation-formatter.ts)。

## 版本與下載身份 {/* #版本与下载身份 */}

| 標識 | 用途 | 不能替代的內容 |
| --- | --- | --- |
| 顯示名稱 | 在介面定位檔案 | 名字本身不能確定不可變內容 |
| 檔案/產物 ID | 標識託管物件 | 下載路徑不是託管物件身份 |
| 版本 ID / `vN` | 定位精確修訂和溯源 | 最新內容可能不是原結果使用的版本 |
| 校驗和 | 比較來源與副本位元組 | 同名不代表相同位元組 |
| 下載目錄 | 定位外部副本 | 編輯該副本不會自動更新託管版本 |

操作步驟見 [Notebook 與證據](../guides/notebook.md)和[公開資料工作流](../workflows/data-quality.md)。限制集中在此查詢，指南保留任務步驟。

不同格式的操作見[預覽控制元件](../guides/previews.md)：Mermaid 原始碼/圖形切換、單頁 PDF 的 Reading 條件、有限表格、工作表選擇及 TIFF 頁面處理。預覽、模型輸入和匯出需要分別核驗。
