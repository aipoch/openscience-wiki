---
title: "生成與編輯圖片"
last_update:
  date: '2026-11-19'
---

# 生成與編輯圖片 {/* #生成与编辑图片 */}

根據提示詞生成插圖，再從選定圖片繼續調整，同時保留舊版本。適合製作流程示意圖或演示配圖。生成圖片不屬於實驗數據；分享前應覈對科學標籤、結構和圖中表達的結論。

## 配置圖像服務 {/* #configure */}

1. 打開 **Settings → Model**，找到 **Image generation**，打開 **Image services → Add image service**。
2. 選擇 **Provider type**。使用 **Custom HTTP service** 時，填寫 **Name**、**Base URL** 和 **API key**，再添加服務實際支持的 **Model ID** 與 **Interface preset**。使用自定義地址時，**API format** 必須與圖像接口匹配。
3. 保存服務，在 **Image generation model** 中選中它。顯示 **Not configured** 表示圖像生成尚未配置好。
4. 先發出一個簡單的圖片請求，檢查返回圖片。新的圖像設置從下一輪對話開始生效。

![圖像服務配置：地址、API 格式、憑據和模型字段](/img/open-science/v130/image-service.webp)

Main、Vision 和 Image generation 的職責不同：Main 驅動會話，Vision 讀取圖片，Image generation 生成或編輯圖片。Main 使用 Codex 訂閱，不代表已經擁有圖像生成 API 或對應額度。配置圖像服務時，可以保留當前可用的主模型。

## 生成第一張圖片 {/* #generate */}

在項目會話中說明圖片用途、內容、佈局和文字要求，並要求保存圖片。圖像生成工具卡片會展示請求與進度；等到產生完整輸出後，再打開預覽。

<p className="example-label"><strong>示例</strong> 請求一張研究流程示意圖</p>

```text
Create an English illustration for a lab meeting slide showing:
research question → literature search → evidence review → reproducible analysis.
Use four clearly separated steps, a light background and readable labels.
This is a conceptual workflow, not a plot of experimental results.
Save the image so I can review it in the project.
```

檢查實際標籤、順序和箭頭方向。請求失敗時，覈對圖像服務、模型與錯誤信息，不必把 Main 換成無關提供商。生成或編輯使用的提示詞與源圖片會發送給所選圖像服務；取消任務不能撤回已經發送的內容。

## 編輯、比較與複用 {/* #edit */}

打開圖片的編輯入口，選擇源版本，描述一次明確的修改。僅在所選服務支持時使用相應區域和參數控制。提交後等待新結果；編輯會創建新版本，舊變體仍可訪問。

將候選圖片與源圖對比，既檢查要求修改的區域，也檢查應該保持不變的部分。通過圖片歷史返回舊版本，或從舊版本繼續編輯。下載最終選定的版本，在放入演示文稿前重新打開檢查；圖注應準確說明它屬於示意內容。

覈對已有圖表中的數值，使用 [Notebook](notebook.md) 和 [Provenance](reproducibility.md)；修改幻燈片文字與格式，參見[演示文稿編輯](presentation-editing.md)。
