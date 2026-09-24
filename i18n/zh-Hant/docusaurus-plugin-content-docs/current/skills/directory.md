---
title: "Skill 目錄"
last_update:
  date: '2026-09-24'
---

# Skill 目錄 {/* #skill-目录 */}

應用提供 **23 個內建 Skill**。本頁按工作型別分類；條目描述隨應用提供的方法，不表示所有外部模型、依賴和服務已經安裝。

安裝應用分發的方法，見[市場安裝說明](marketplace.md)。下方目錄用於選擇科研方法，不是市場版本的實時清單。

## 選擇前檢查可用條件 {/* #选择前检查可用条件 */}

1. 在 Settings 開啟 Skill，閱讀完整要求及第三方服務說明。
2. 對照真實輸入型別。bulk RNA-seq 表不是單細胞 AnnData，分子繪圖也不是對接結果。
3. 檢查所選執行環境和包。遠端任務應先選擇可用 Compute Host，核對環境後提交。
4. 先執行小範圍任務，檢查實際輸出並保留輸入版本，再擴大規模。

manifest 還有 self-awareness、skill-creator 兩個內部資源，不作為使用者目錄條目。Personal 或 Imported 包（包括 rnaseq-count-qc）不計入這 23 個。

實現依據: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json)。

Environment 分組的三個應用 Skills 及 Customize 始終啟用，見[啟用規則](overview.md)。隨應用提供的方法見[內建清單](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/manifest.json)，主機設定和結果送達見[遠端計算](../guides/remote-compute.md)。

## 按研究任務查詢 {/* #按研究任务查找 */}

### 蛋白結構 {/* #蛋白结构 */}

| Skill | 輸入 | 依賴與執行條件 | 應檢查的輸出 |
| --- | --- | --- | --- |
| [AlphaFold2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/alphafold2/SKILL.md) · `alphafold2` | 蛋白 FASTA，單體或複合物 | ColabFold、權重、GPU；可呼叫公共 MSA 服務 | 預測結構與置信度 |
| [Boltz](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/boltz/SKILL.md) · `boltz` | 蛋白、DNA、RNA、配體複合物定義 | Boltz 包、權重、GPU；按任務使用 MSA | 複合物結構、置信度及可選親和力輸出 |
| [Chai-1](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/chai1/SKILL.md) · `chai1` | 多實體 FASTA | chai-lab、權重、GPU | 全原子複合物與置信度 |
| [ESMFold2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/esmfold2/SKILL.md) · `esmfold2` | 序列或複合物輸入 | Biohub esm、權重、CUDA；不同於 fair-esm | 結構預測，或按任務生成 ESMC 表徵 |
| [OpenFold3](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/openfold3/SKILL.md) · `openfold3` | 蛋白、核酸、配體定義 | OpenFold3、權重訪問、CUDA 與相應核心 | 複合物結構與評分 |

### 蛋白設計與對接 {/* #蛋白设计与对接 */}

| Skill | 輸入 | 依賴與執行條件 | 應檢查的輸出 |
| --- | --- | --- | --- |
| [DiffDock](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/diffdock/SKILL.md) · `diffdock` | 靶標 PDB 與配體 SMILES/SDF | DiffDock 倉庫、權重和 GPU | 排序後的配體姿勢；姿勢置信度不等於親和力 |
| [ProteinMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/proteinmpnn/SKILL.md) · `proteinmpnn` | 骨架 PDB、設計或固定的鏈與殘基 | 倉庫、權重、torch/numpy；小任務支援 CPU | 設計序列與評分 |
| [LigandMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/ligandmpnn/SKILL.md) · `ligandmpnn` | 骨架及配體、金屬或核酸上下文 | 倉庫與 Python 依賴；小任務支援 CPU | 序列與回填結構 |
| [SolubleMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/solublempnn/SKILL.md) · `solublempnn` | 蛋白骨架 | ProteinMPNN 與可溶模型權重；可使用 CPU | 可溶模型先驗下的序列 |

### 序列與細胞 {/* #序列与细胞 */}

| Skill | 輸入 | 依賴與執行條件 | 應檢查的輸出 |
| --- | --- | --- | --- |
| [ESM-2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md) · `fair-esm2` | 蛋白序列 | fair-esm 與權重；內建流程使用 GPU | 嵌入、機率輸出或接觸預測 |
| [Borzoi](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/borzoi/SKILL.md) · `borzoi` | 明確基因組與座標的 DNA 視窗 | borzoi-pytorch、權重與 CUDA | 基因組軌道預測或參考/變異差值 |
| [Evo 2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/evo2/SKILL.md) · `evo2` | DNA 序列或字首 | Evo 2 權重、相容 CUDA 和足夠記憶體 | 序列似然、嵌入或生成 DNA |
| [scGPT](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scgpt/SKILL.md) · `scgpt` | 帶基因詞表對映的單細胞 AnnData | scGPT、權重與 GPU | 細胞嵌入或註釋結果 |
| [scvi-tools](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scvi-tools/SKILL.md) · `scvi-tools` | 單細胞計數與批次、標籤後設資料 | scvi-tools/scanpy/anndata；內建訓練流程要求 GPU | 潛在表徵、標籤遷移或模型比較 |

### 證據與寫作 {/* #证据与写作 */}

| Skill | 輸入 | 依賴與執行條件 | 應檢查的輸出 |
| --- | --- | --- | --- |
| [Literature Review](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/literature-review/SKILL.md) · `literature-review` | 問題、文獻 ID 或論文 | 來源檢索；OpenAlex 操作的金鑰可選 | 可追溯的證據綜合與引用 |
| [Indication Dossier](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/indication-dossier/SKILL.md) · `indication-dossier` | 以患者群體定義的適應證 | 研究工具和來源訪問 | 可繼續的階段檔案及研究報告 |

### 環境與計算 {/* #环境与计算 */}

| Skill | 輸入 | 依賴與執行條件 | 應檢查的輸出 |
| --- | --- | --- | --- |
| [Environment & Packages](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/env-management/SKILL.md) · `env-management` | 缺包或版本問題 | 選定 Python/R 及可訪問的包源 | 包檢查、託管安裝和匯入驗證 |
| [Compute Environment Setup](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/compute-env-setup/SKILL.md) · `compute-env-setup` | SSH/Slurm 主機上的命名環境 | 已配置主機，使用者或管理員管理啟用檔案 | 環境準備指引與驗證記錄 |
| [Remote Compute (SSH)](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/remote-compute-ssh/SKILL.md) · `remote-compute-ssh` | 工作負載和可用 Compute Host | SSH 憑據、主機和適用的排程器 | 任務提交、結果收集與釋出 |

### 資源與圖表創作 {/* #资源与图表创作 */}

| Skill | 輸入 | 依賴與執行條件 | 應檢查的輸出 |
| --- | --- | --- | --- |
| [Customize](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/customize/SKILL.md) · `customize` | Skill 或 Specialist 修改需求 | 可用 Agent 及原生資源操作 | 儲存後可重新讀取的包或角色 |
| [Figure Style](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-style/SKILL.md) · `figure-style` | 真實資料及一張最終圖 | Notebook 函式與繪相簿 | 檢查過資料與標籤的圖 |
| [Figure Composer](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-composer/SKILL.md) · `figure-composer` | 一條主張與不可變資料版本引用 | Main Agent、委派、繪圖與複核 | 多面板圖及複核記錄 |
| [Paper Narrative](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/paper-narrative/SKILL.md) · `paper-narrative` | 稿件或摘要、圖注及完整圖組 | 可追溯檔案版本與複核工具 | 論文簡報與圖組論證順序 |

按具體方法準備依賴、權重和計算資源。小型 ProteinMPNN CLI 示例見[科學工具](../tools/scientific.md)，GPU 條件見[遠端計算](../guides/remote-compute.md)；這些示例不覆蓋全部蛋白預測或訓練方法。
