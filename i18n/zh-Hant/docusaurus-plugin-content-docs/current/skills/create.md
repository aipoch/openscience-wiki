---
title: "建立 Skill 與支援檔案"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# 建立 Skill 與支援檔案 {/* #创建-skill-与支持文件 */}

使用[公開示例輸入](../reference/example-data.md)，把重複執行的 RNA-seq 檢查整理為可複用方法。該方法檢查原始計數，不執行差異表達檢驗。

本頁兩條路線使用各自獨立的包名：

| 建立路線 | 儲存的 Skill ID | 新會話複用 |
| --- | --- | --- |
| 已完成對話中的 **Save as skill** | `rnaseq-descriptive-qc` | 選擇釋出後的同名 Personal Skill |
| 下方手動包路線 | `rnaseq-count-qc` | 選擇手動建立、ID 完全一致的 Skill |

任選一條路線完成釋出、搜尋和複用，後續呼叫自己實際儲存的名稱。兩個 ID 不是別名；若修改包名，後續請求也應使用儲存後的新名稱。

## 選擇建立入口 {/* #选择创建入口 */}

| 你現在有什麼 | 使用入口 | 接下來會發生什麼 |
| --- | --- | --- |
| 已完成的對話中有值得複用的操作流程 | 對話 **+ → Save as skill** | 代理提煉當前分支，透過 Customize / Skill Creator 整理為可複用的包 |
| 想透過對話描述一個新方法 | 設定 **Add skill → Chat with agent**，或 **Customize** | 與代理協作起草方法，檢查後再發布 |
| 已有完整說明和支援檔案 | 設定 **Add skill → Write from scratch** | 使用下方編輯器直接填寫 |
| 已有 Skill 包或倉庫 | **Upload skills / Import from GitHub / Import installed skills** | 檢查並匯入已有資源，見[管理 Skills](./manage.md) |

## Save as skill：把已完成的對話整理成方法 {/* #save-as-skill把已完成的对话整理成方法 */}

適合在一套流程已經實際跑通後使用，例如檢查 RNA-seq 原始計數矩陣、保留識別符號、計算樣本指標並重新開啟結果。**Save as skill** 讀取的是**當前對話分支**，包括目標、使用的工具、關鍵步驟和使用者修正，要求代理提煉可複用的方法，而非逐字儲存聊天記錄。如果當前分支沒有已經明確、值得重複執行的流程，代理可以說明原因並停止，不建立 Skill。

1. 開啟相應對話，切換到包含目標流程的分支。
2. 等待當前回覆和子代理任務完成。處理未完成的授權、被中斷的輪次或會話錯誤；分支最後必須是一條已完成的 Agent 回覆。
3. 開啟輸入框旁的 **+ 菜单 → Save as skill**。按鈕不可用時，懸停檢視具體原因。
4. 執行期間選單顯示 **Saving as skill…**。它會在對話中啟動模型輔助整理，不會直接開啟手工 Name/Description 編輯器，也不是點選後立即匯出 ZIP。
5. 檢查代理提出的名稱、觸發描述、步驟、支援檔案和校驗結果。如果出現澄清問題或操作授權，按實際內容處理。**Customize** 始終啟用，當前角色仍需具備相應能力訪問範圍。
6. 審閱草稿，再確認釋出。移除固定研究路徑、臨時 ID、金鑰及沒有證據的結論，保留可複用的輸入要求和檢查規則。替換已有 Personal Skill 必須另行明確決定。
7. 釋出後進入 **Resource center → Skills**，搜尋實際返回的名稱，檢查 **Files**、已儲存的 SKILL.md 及 Main Agent 可用性。需要核對完整包時再匯出。
8. 用新請求測試儲存後的 Skill。儲存成功不等於已驗證第二份資料，也不等於下一次呼叫必然成功。

### 儲存研究方法 {/* #保存研究方法 */}

<p className="example-label"><strong>案例演示</strong> 把 RNA-seq 方法儲存為 Skill</p>

在新會話完成 GSE60450 QC 後，點選 **+ → Save as skill**，要求建立獨立的 **rnaseq-descriptive-qc**，保留已有包。應用原生流程建立了只含一個 **SKILL.md** 的草稿，校驗結果無錯誤、無警告。

![原生 Skill 草稿及校驗結果](/img/open-science/v0.27.0/16-native-skill-draft-validated.webp)

檢查名稱、觸發條件、輸入要求、指標定義與停止條件，再確認釋出到 Personal Skills。釋出後透過 **Resource center → Skills → Search skills** 搜尋名稱，開啟說明，核對 **Availability** 與 **Files**。該示例的檔案可下載為 <ExampleDownload path="/examples/capabilities/rnaseq-descriptive-qc/SKILL.md">SKILL.md</ExampleDownload>。

![原生髮布後在 Personal 中找到 Skill](/img/open-science/v0.27.0/17-native-skill-published.webp)

![開啟已釋出的說明與可用範圍](/img/open-science/v0.27.0/18-native-skill-instructions.webp)

### 按鈕為什麼不可用 {/* #按钮为什么不可用 */}

提示顯示的是當前首先遇到的阻斷條件，處理後可能出現下一個條件。**Wait for the current agent activity to finish.** 不只表示正在執行：會話處於非空閒狀態（包括錯誤狀態）也可能出現它，因此不一定靠等待就能恢復。先檢查對話中的報錯橫幅和待處理互動。若回覆中斷，使用應用提供的恢復操作處理當前輪次，完成後再儲存方法。

| 完整英文提示 | 應檢查或處理的內容 |
| --- | --- |
| Open a conversation before saving it as a Skill. | 先開啟包含目標流程的對話 |
| The Customize Skill is unavailable to the active Specialist. | 檢查當前角色的能力訪問範圍。Customize 保持全域啟用，這條提示針對當前 Specialist |
| Wait for conversation history to finish loading. | 等待當前分支歷史載入完成 |
| Close Side chat before saving this conversation as a Skill. | 先保留有用建議；確認[關閉 Side Chat](../guides/delegation.md) 會停止它並刪除其儲存的對話，再回到 Main |
| Wait for all subagents to finish. | 檢查尚未結束的子任務及其授權請求 |
| Save as skill is running. | 檢視已啟動的建立過程，不重複發起 |
| Resolve the current Session operation first. | 先處理恢復、歷史重放/上下文重置、修正迴圈或上下文壓縮 |
| Wait for the current agent activity to finish. | 檢查執行中任務、待處理互動，以及非空閒或錯誤狀態 |
| Resolve the conversation branch synchronization error first. | 先解決介面顯示的分支同步錯誤 |
| Conversation branch history is unavailable. | 重新開啟實際可用的目標分支；若仍無法載入，保留具體錯誤 |
| Wait for a completed Agent response. | 分支必須以已完成的代理回覆結尾，空分支或最後只有使用者訊息都不滿足 |

恢復與待完成的會話操作仍可能阻止動作，應按當前提示處理，避免反覆發起新的建立請求。可用條件與服務認證是不同層面。如果流程已啟動，但模型請求失敗，應按實際模型/服務錯誤處理，見[故障排除](../guides/troubleshooting.md)。

## Write from scratch：使用編輯器建立 {/* #write-from-scratch使用编辑器创建 */}

已有方法說明和支援檔案時，使用 **Write from scratch** 填寫併發布 Skill。以下步驟以 `rnaseq-count-qc` 為例。

### 準備包檔案 {/* #准备包文件 */}

<p className="example-label"><strong>示例</strong> 建立 rnaseq-count-qc 方法包</p>

下載實際使用的 <ExampleDownload path="/examples/capabilities/rnaseq-count-qc/SKILL.md">SKILL.md</ExampleDownload>、<ExampleDownload path="/examples/capabilities/rnaseq-count-qc/references/sample-metric-schema.md">sample-metric-schema.md</ExampleDownload>，或<ExampleDownload path="/examples/capabilities/rnaseq-count-qc.zip">應用匯出的 ZIP</ExampleDownload>。

```text
rnaseq-count-qc/
  SKILL.md
  references/
    sample-metric-schema.md
```

參考檔案定義樣本指標及解釋範圍。研究資料保留在專案裡；Skill 儲存複用規則，避免把私人資料放進可分享的包。

<span id="创建并保存" />

### 填寫欄位併發布 {/* #填写字段并发布 */}

1. 開啟 **Resource center → Skills → Add skill → Write from scratch**。
2. 將完整 SKILL.md 貼上到 **Skill body**，YAML 後設資料會填入 **Name** 與 **Description**。
3. 確認名稱為 `rnaseq-count-qc`，檢查正文；名稱透過校驗不代表分析方法正確。
4. 展開 **Advanced settings → Add reference files**，選擇 `sample-metric-schema.md`，編輯器會將其放入 `references/`。
5. 檢查參考檔案數量與包大小，點選 **Publish**。
6. 搜尋新的 Personal 條目，重新開啟指令、可用性與檔案，再匯出檢查兩個包條目。

![RNA-seq Skill 指令與參考檔案](/img/open-science/capabilities-walkthrough/01-skill-create.webp)

| 欄位或按鈕 | 填寫和檢查方式 |
| --- | --- |
| Name | 使用可識別的方法 ID；為空時提示 **Name is required.** |
| Description | 說明何時選擇此方法，不能只寫研究領域 |
| Write / Upload | 直接輸入正文，或選擇檔案作為正文來源 |
| Skill body | 寫明輸入、檢查、輸出和停止條件 |
| Advanced settings | 展開支援檔案和容量資訊 |
| Add reference files | 新增結構定義、示例或指令碼；正文引用路徑必須與包一致 |
| 移除參考檔案 | 刪除草稿中的資源後，檢查正文是否仍引用該路徑 |
| Cancel / Back to skills | 離開編輯器；放棄草稿使用 Cancel |
| Publish / Saving… | 建立 Personal 包；等待完成後檢查已儲存條目 |

編輯器在 **128 MB** 包預算內最多允許 **16,383 個參考檔案**。匯入還需透過歸檔校驗，詳見[管理 Skills](./manage.md)。

## 讓指令可以驗收 {/* #让指令可以验收 */}

示例要求保留完整基因和樣本 ID，將 `EntrezGeneID`、`Length` 與計數分開，拒絕畸形行與缺失值，比較前後雜湊，並規定四個樣本指標和獨立輸出檔案。這樣才能發現錯誤或遺漏。

明確停止條件：原始檔不可讀或計數缺失時，應報告問題，而不是修改資料或偷偷更換分析方法。

<span id="验证保存后的-skill" />

## 驗證與複用 Skill {/* #验证与复用-skill */}

手動建立 `rnaseq-count-qc` 後，使用 [Skills](./overview.md) 中的提示詞。開啟報告和 Notebook 記錄，按[示例資料](../reference/example-data.md)核對輸入、維度、指標定義與輸出。

修改時從 Personal 條目的 **Actions → Edit** 進入，儲存後發起新請求，與原結果比較。修改或禁用不會撤回當前執行輪次已經讀取的指令。

也可以使用 **Add skill → Chat with agent** 或 **Customize** 協助起草。仍須檢查擬儲存內容並重新開啟包；對話中描述了一個 Skill，不代表已經儲存。

### 在新會話中複用已釋出 Skill {/* #在新会话中复用已发布-skill */}

1. 新建會話，附加原始公開 GSE60450 計數矩陣。
2. 指定使用 **rnaseq-descriptive-qc**，要求計算四項逐樣本指標、保持輸入不變，並生成 CSV 與簡短報告。
3. 檢查 Notebook 執行，開啟兩個生成檔案，對照原始輸入核驗結果，不只依賴完成訊息。

重新開啟新 CSV 與報告，按完整樣本標識與[公共基準](../reference/example-data.md)比較，並檢查輸入雜湊。用於其他研究時，需要針對該研究的輸入與實驗設計重新核對。

![獨立呼叫與重新開啟的 QC CSV](/img/open-science/v0.27.0/19-native-skill-reuse.webp)

實現依據: [SkillEditor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillEditor.tsx), [host-skills-service.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/skills/host-skills-service.ts)。

Save as skill 實現依據: [availability](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/workspace/save-as-skill-availability.ts), [conversation distillation](https://github.com/aipoch/open-science/blob/v0.27.0/src/main/acp/interrupted-turn-continuation.ts), [Skill Creator](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/skill-creator/SKILL.md).
