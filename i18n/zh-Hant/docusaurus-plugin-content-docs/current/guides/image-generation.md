---
title: "生成與編輯圖片"
last_update:
  date: '2026-11-23'
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

1. 在預覽中開啟目標圖片。懸停或用鍵盤聚焦其控制元件，再選擇 **Edit image**。輸入要求前先核對源圖片與版本。
2. 在會話輸入框中寫清本次修改。讓要求對應當前顯示的源圖；進入編輯並不會傳送請求。選擇區域性區域後，檢查高亮範圍和該區域的要求。可用工具與引數取決於圖片及服務。
3. 點 **Send image edit**，等待新結果。如果按鈕不可用，檢視顯示的原因並檢查[影象服務配置](#configure)。請求失敗不代表產生了一個已完成的新版本。
4. 使用提供的 **Compare with input image** 或 **Compare**，同時檢查修改區域和應保持不變的內容。透過 **Image history** 回看歷史版本，或點 **Continue editing** 繼續修改。
5. 下載選定版本，重新開啟，核對標籤和科學表述後再分享。圖片詳情可標識產生該次編輯的 Notebook 核心，但這條記錄不等於科學準確性驗證。

編輯控制元件使用會話輸入框，會話訊息仍留在原位置。圖注應準確說明示意內容。需要核對圖表數值時，使用 [Notebook](notebook.md) 和[來源與復現](reproducibility.md)；幻燈片文字見[簡報編輯](presentation-editing.md)。

## 儲存前測試影象服務 {/* #test-service */}

v1.3.1 的影象服務表單在必填欄位和模型填寫完成後，提供 **Test generation**。先閱讀確認提示：測試會生成一張圖片，提供商可能收取費用。測試透過只對應當前這組配置；修改模型、端點或憑據後，需要重新測試。也可以直接儲存，不執行測試。

儲存新服務後，只有尚未選定 Image generation 模型時，才會自動把首個模型設為預設。第一次請求前檢查當前選擇；Main 模型仍單獨配置。

![儲存前測試影象服務](/img/open-science/v1.3.1/image-service-test.webp)

## 重新整理影象模型目錄 {/* #image-model-catalog */}

在 **Settings → Model → Image services** 中新增或編輯官方 **OpenAI**、**MiniMax**、**Bailian** 或 **Volcengine Ark** 服務。填寫連線欄位後，儲存前點 **Refresh model list**。重新整理會攜帶配置的憑據訪問對應提供商，不會生成圖片。

重新整理結果按 Open-Science 支援的影象模型篩選，並不是提供商的全部模型。當前預設模型會保留；如果返回目錄中沒有它，會顯示相應標記，使用前應先檢查。重新整理失敗保留原列表，按顯示的原因修正後重試。**Save** 儲存表單；[Test generation](#test-service) 則是另一項可能計費的影象請求。

百鍊應使用與憑據對應的工作空間 URL 和區域；中國區憑據使用中國區目錄。改變連線或工作空間後，應重新檢查目錄；其他區域能看到某個模型，不代表這裡也有權限。

![OpenAI image service: supported models and Refresh model list](/img/open-science/v1.3.3/image-catalog.webp)
