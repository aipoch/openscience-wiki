---
title: "科學工具目錄"
last_update:
  date: '2026-11-11'
---

# 科學工具目錄 {/* #科学工具目录 */}

本目錄幫助你找到科學方法在 Open-Science 中的入口及執行條件。它是文件索引，不是安裝所有列出程式的應用頁面。

## 軟體類別與執行位置 {/* #软件类别与执行位置 */}

| 軟體類別 | 應用入口 | 準備檢查 | 首次驗證 |
| --- | --- | --- | --- |
| Python 標準庫與繪圖 | Session Notebook | 當前 Python 和繪圖依賴 | 讀取真實 QC CSV 並生成小圖 |
| R / base R | Notebook；Settings → Runtimes → R | 已啟用託管或檢測到的直譯器 | 列印版本並復現樣本彙總 |
| 結構預測框架 | 對應 Skill，通常使用 Compute | GPU、包、權重、輸入與適用的 MSA 服務 | 小範圍真實序列/複合物及置信度 |
| MPNN 序列設計 | ProteinMPNN / LigandMPNN / SolubleMPNN | 倉庫、權重、Python 依賴；支援小型 CPU 任務 | 明確固定/設計位點的單骨架 |
| 單細胞框架 | scGPT / scvi-tools | AnnData、細胞/基因標識、包及計算資源 | 訓練前檢查維度與所需層 |
| 分子結構繪製 | Molecule Connector / 檢視器 | 內建離線 OpenChemLib | 儲存並重開 aspirin.mol |
| 檔案渲染器 | 檔案預覽 | 副檔名與預覽大小限制 | 開啟實際下載的檔案 |
| 遠端批處理軟體 | Compute Host 與遠端 Skill | 主機、排程器、命名環境 | 主機探測後執行小任務 |

完整 24 個 Skill 的方法表見 [Skill 目錄](../skills/directory.md)，此處集中說明軟體就緒條件。

## 核對當前環境 {/* #核对当前环境 */}

在 **Settings → Runtimes** 檢視 Python/R，確認會話實際繫結的環境，並在該環境檢查包。電腦其他位置安裝瞭直譯器，不代表 Notebook 正在使用它。

直譯器準備見[執行環境](../guides/runtimes.md)，計算核對見 [Notebook](../guides/notebook.md)。需要新增軟體包時，在該環境中檢查安裝和匯入。下載失敗則根據受影響域名與報錯，按[網路說明](../guides/network.md)處理。

## 執行安裝指令前 {/* #执行安装指令前 */}

閱讀已安裝 Skill 的具體要求與環境支援的安裝路徑。注意命名衝突：**fair-esm** 與 Biohub **esm** 共享 `esm` 名稱空間，但不是同一個實現。模型程式碼和權重也可能有不同版本與訪問條件。

本地 Notebook 使用[科學工具](./scientific.md)的受支援包管理，遠端主機參見[遠端計算](../guides/remote-compute.md)。能開啟 PDB 只證明結構檢視器可用，不證明 AlphaFold 等預測程式已經安裝。

實現依據: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json), [SKILL.md](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md), [notebook-runtime.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook-runtime.ts)。

透過[後臺任務](../guides/notebook.md)跟蹤適用的長任務並檢查送達結果。所需科學軟體仍須在選定執行時中可用。
