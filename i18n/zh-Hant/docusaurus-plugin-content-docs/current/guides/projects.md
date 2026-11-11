---
title: "專案與原始檔夾"
last_update:
  date: '2026-11-11'
---

# 專案與原始檔夾 {/* #项目与源文件夹 */}

專案用於儲存同一個研究問題下的會話、來原始檔和生成結果。**Agent Context** 為該專案的各個會話提供長期指令。研究問題或允許使用的材料發生明顯變化時，可以建立新專案。

<span id="案例准备系统综述阅读资料包" />

需要把已有研究記錄帶入專案時，使用[匯入研究包](research-packages.md)。匯入會話為只讀記錄，新的研究工作應建立普通會話。

## 建立專案 {/* #创建项目 */}

<p className="example-label"><strong>案例演示</strong> 準備系統綜述閱讀資料包</p>

本例建立 **PRISMA - Systematic review reading pack**，使用真實發表的報告規範論文，目標是整理可核驗的文獻記錄與閱讀順序。建立資料包本身不等於完成系統綜述。

1. 在首頁點選 **New project**；已有工作區左上角的專案選單也提供這個入口。
2. 填寫下面的欄位。需要約束代理的證據規則應寫在 **Agent Context**，不要只寫在 Description。
3. 點選 **Create project**。確認左側顯示專案名稱，主區域開啟 **New conversation**。
4. 開啟專案名稱選單 → **Project settings**，檢查欄位是否儲存。專案儲存成功與模型連線成功是兩件事。

![英文介面中的 PRISMA 專案目標與 Agent Context](/img/open-science/local-acceptance/prisma-project-form.webp)

| 欄位或按鈕 | 示例或操作 | 行為 |
| --- | --- | --- |
| **Name** | `PRISMA - Systematic review reading pack` | 必填，最多 200 個字元；空白名稱不可提交 |
| **Description** | 描述該專案要為系統綜述研究者整理來源可核驗的閱讀資料 | 可選，最多 1,000 個字元；顯示在專案列表中，不作為代理指令傳送 |
| **Agent Context** | 使用下方證據規則 | 可選，最多 16,000 個字元；包含在新建和恢復的代理會話中，併傳送給所選模型提供方 |
| **Create project** | 儲存有效表單 | 建立專案並開啟工作區；儲存失敗時錯誤保留在表單中 |
| **Cancel**、**Close** | 放棄草稿 | 不建立專案；提交過程中不可重複關閉 |
| 專案設定中的 **Save** | 儲存修改 | 修改原專案，不復制會話 |

```text
Use public primary sources. Preserve DOI, title, authors and publication year.
Distinguish bibliographic metadata from claims verified in full text.
Never invent references. Report inaccessible sources explicitly.
Write outputs in English.
```

這些指令要求保留 DOI、標題、作者和年份，區分後設資料核驗與全文核驗，不編造文獻，並明確報告無法訪問的來源。

## 授予來原始檔訪問權限 {/* #授予来源文件访问权限 */}

建立專案不會自動開放電腦上的資料夾。需要使用已有目錄時，開啟 **Files** 並選擇本地資料夾入口。檔案選擇器負責選擇位置，後續權限提示負責確定訪問範圍；確認前檢查實際路徑和訪問模式。

僅檢查來源材料時可使用只讀權限。需要將來源儲存在專案內時，儲存一份託管副本。本地預覽與託管上傳的生命週期不同：外部檔案移動後原路徑可能失效，託管副本則保留在應用儲存中。

權限變化可能觸發 Notebook 確認，因為執行中的核心可能保留先前的訪問狀態。接受核心重啟前先完成或停止相關工作。選擇一個目錄也不表示模型已經讀取其中所有檔案。

## 修改或繼續研究 {/* #修改或继续研究 */}

從專案名稱選單切換專案。同一專案中的新研究分支可以用 **New** 建立獨立會話，保留專案級上下文。修改 **Agent Context** 後，在後續請求中檢查新規則是否生效；已有結果不會自動重新生成。

**Download artifacts…** 用於下載輸出。專案還沒有生成結果時，它可能不可用；上傳來原始檔並不等於生成成果。已結束的工作可歸檔，並從 **Settings → Archived** 恢復。

## 驗收與排錯 {/* #验收与排错 */}

| 現象 | 含義與處理 |
| --- | --- |
| 專案名稱已出現，但不能傳送請求 | 專案建立成功；分別檢查 **Settings → Agent** 和 **Settings → Model** |
| 代理沒有遵守 Description 中的要求 | 將要求寫入 **Agent Context**，再傳送明確的新請求。Description 只是組織資訊 |
| 資料夾可開啟但不能寫入 | 只讀權限允許檢查，不允許修改；儲存派生結果或檢查寫入請求的範圍 |
| 儲存按鈕不可用 | 檢查名稱是否只有空白、欄位是否超長，以及是否仍有提交在進行 |
| 當前專案與預期不符 | 附加材料或傳送訊息前先核對左上角專案名稱 |

## 設置問題優化模板 {/* #optimization-template */}

打開項目名稱菜單 → **Project settings → Advanced agent options → Optimization prompt**，填寫這個項目改寫問題時應遵循的要求，然後保存。留空則使用內置默認模板。**New project → Advanced agent options** 中也有同一個字段。

此字段只在點擊 **Optimize question** 時使用，與提供給項目 Agent 會話的 **Agent Context** 不同，也不同於僅供自己查看的 **Description**。

<p className="example-label"><strong>示例</strong> 保留教學問題的適用範圍</p>

```text
Rewrite the question in clear English. Preserve the supplied numbers
and the hypothetical scope. Ask for a concise answer with limitations;
do not invent participants, measurements or citations.
```

![項目高級選項中的自定義 Optimization prompt](/img/open-science/v121/optimization-template.webp)

返回輸入框，[優化一段草稿](composer.md#optimize-question)，檢查改寫結果後再發送。模板提供的是寫作要求，不是科學驗證規則。
