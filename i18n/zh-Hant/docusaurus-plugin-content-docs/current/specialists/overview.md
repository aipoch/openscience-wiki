---
title: "Specialists 與可用角色"
last_update:
  date: '2026-11-11'
---

# Specialists 與可用角色 {/* #specialists-与可用角色 */}

Specialist 是儲存下來的研究角色，包含身份、指令和可用 Skills/Connectors。適合需要固定職責或單獨執行的子任務。角色名稱本身不代表專業能力已經得到驗證。

## 理解角色來源 {/* #理解角色来源 */}

| 角色或來源 | 用途 | 可配置內容 |
| --- | --- | --- |
| Main Agent | 負責當前對話，可組織委派任務 | 會話模型、Agent 控制與能力 |
| Custom Specialist | 本地建立的明確研究角色 | 身份、指令、選定能力或 Full access |
| Imported / Marketplace Specialist | 從包安裝，再完成本機設定 | 本地能力範圍；檢查釋出者與版本 |
| 內建 Reviewer | 執行應用複核流程 | 從對話觸發複核；不是普通可編輯、可委派的角色 |

開啟 **Marketplace** 查詢已釋出角色。線上目錄可獨立於已安裝應用變化。匯入前檢查釋出者、指令與依賴。

## 查詢角色 {/* #查找角色 */}

開啟 **Resource center → Specialists**。**Installed** 表示本地註冊數量，包含 Reviewer。使用 **Search specialists**、**Filters → Filter specialists by category**，再開啟條目檢查。**Marketplace** 是另一份目錄；市場列出角色不代表已安裝，必須完成包和本地設定流程。

![本地已安裝的 RNA-seq QC Reviewer](/img/open-science/capabilities-walkthrough/06-specialist-list.webp)

<span id="本次市场实际展示的角色" />

## 按職責選擇角色 {/* #按职责选择角色 */}

| 角色 | 研究範圍 |
| --- | --- |
| Auto Research Specialist | 生物醫學證據、分析、驗證與寫作 |
| Cryo-EM Structure Validation Specialist | 半圖、幾何與圖模驗證規劃 |
| Pharmacometrics PK/PD Design Specialist | PK/PD 研究設計與不確定性 |
| Multimodal Neuroimaging Connectomics Architect | MRI/fMRI/彌散成像和網路分析 |
| Synthetic Route and Reaction Optimization Specialist | 反應路線與最佳化證據 |
| Aerodynamics CFD Verification and Validation Specialist | 數值收斂與實驗對照 |
| Atmospheric Chemistry Transport Modeling Specialist | 排放、傳輸與來源歸因 |
| High-throughput DFT Screening Specialist | 收斂與熱力學一致性 |
| Astronomical Photometry and Time-domain Analysis Specialist | 定標、測光與時變分析 |
| Precision Agriculture Phenotyping and Prescription Design Specialist | 無人機表型與空間驗證 |

這些是實際目錄描述，不表示已完成十類科學流程。應用內建 Reviewer 也不同於本教程自建的 **RNA-seq QC Reviewer**。

## 按需要繼續 {/* #按需要继续 */}

- [建立與編寫指令](./identity.md)：定義本地研究角色。
- [分配能力](./capabilities.md)：規定可以使用的資源。
- [委派與驗證](./delegate.md)：檢查真實子任務與證據。
- [Reviewer 與自動複核](./reviewer.md)：使用內建複核流程。
- [管理與分享](./manage.md)：打包、匯入、處理衝突並完成本地設定。

實現依據: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/specialists/manifest.json), [SpecialistsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx)。
