---
title: "PDF 全文翻译"
last_update:
  date: '2026-10-09'
---

# PDF 全文翻译

在保留原文的同时，用另一种语言阅读论文。**Full-text translation** 会准备全文、逐段保存翻译进度，并将已保存的译本关联到受管理的 PDF。它不会覆盖原始 PDF，也不负责验证论文结论。

## 准备论文与模型 {/* #prepare-translation */}

1. 取得完整 PDF，从[文献库](library.md)、Reading、Inbox、上传附件或已保存文件中打开。只有元数据或摘要的文献记录不能代替全文 PDF。
2. 按需放大预览，在 PDF 工具栏选择 **Full-text translation**。
3. 点击 **Prepare full text**，等到 **Full text prepared** 再开始翻译。若文本缺失或 PDF 是扫描件，应先查看原始页面；准备完成不代表所有图中文字和表格均已提取。
4. 选择 **Target language**，再选择 **Translation method** 和 **Model**。以选择器中可用的模型为准。

| 方式 | 需要的配置 |
| --- | --- |
| **Agent** | 使用可用的 Agent 模型，或受支持的 **Main model**。v0.36.0 中 Codex 订阅模型不能执行此 PDF 翻译操作；可单独选择兼容的翻译模型，无需替换会话主模型 |
| **Direct API** | 配置可用的 API 模型。订阅登录不能作为 Direct API 凭据，见[提供商设置](providers.md) |
| **Local model**（提供此选项时） | 按界面控件安装模型，等待就绪。本地翻译一次处理一个段落 |

Agent 和 Direct API 会把文档文本与术语表发送给选定模型。翻译受限材料前，应确认使用的服务。截图展示全文准备和模型控件；其中选择的 Codex 订阅使 **Translate document** 按钮不可用。

![全文准备完成后的目标语言、翻译方式与模型设置](/img/open-science/v0360/translation-settings.webp)

图中论文为 Lang 等的 [Non defect-stabilized thermally stable single-atom catalyst](https://doi.org/10.1038/s41467-018-08136-3)，采用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 许可。

## 翻译与继续 {/* #translate-resume */}

1. 需要统一专业术语时，打开 **Translation glossary**，用 **Add term** 添加 **Source term** 和 **Preferred translation**，开始前核对词条。
2. 首次使用可保留 **Advanced → Concurrent translations** 的默认值。提高并发可能触发提供商限流。
3. 点击 **Translate document**，观察已翻译段落数；部分完成不能视为整篇完成。
4. 要中断时，点击 **Cancel**，已完成段落会保留。用 **Continue translation** 继续已保存的工作；发生错误且界面提供 **Retry** 时可重试。使用 **Skip and continue** 前先看段落错误，它会留下需要检查的空缺。
5. 重新打开同一受管理 PDF，在 **Saved translations** 中选取译本，用 **Saved translation parameters** 核对语言与模型。修改这些设置应选择 **New translation**，不要在一次重试中混用设置。

应用核验为相同 PDF 内容的副本，可在 Literature、Reading、Inbox 和 Workspace 之间共享已保存的译本。仅文件名或 DOI 相同不足以证明内容一致。这种本地共享不会把译文同步到另一台电脑。

## 对照与导出 {/* #compare-export */}

当相关视图可用时，用 **Original**、**Translation** 和 **Compare** 检查原文与译文。逐项核对术语、否定词、数值、单位和图表引用。查看 **Translation issues** 以及保留原文的段落；段落翻译完成不等于每段都完整排入了页面。

选择 **Export translated PDF**，另存一份文件，再用 PDF 阅读器打开。检查页数，并抽查文字较多和图表较多的页面。未翻译的内容保留原语言；某些段落会在 PDF 中保留原文，其译文仍可在侧栏阅读。引用与解释研究结果时应保留原文供核对。

| 界面提示 | 下一步 |
| --- | --- |
| **Prepare full text before translating.** | 完成全文准备，检查是否找到了可翻译段落 |
| **This subscription model cannot run PDF translation. Select another model.** | 选择受支持的翻译模型；改变目标语言不能解决模型兼容性 |
| 提供商限流或暂时不可用 | 等待后使用同一份保存设置重试，避免为同一次中断重复创建译本 |
| 无法保存进度 | 重新打开 PDF，加载最新保存结果后再继续 |

需要记录阅读问题时，使用 [PDF 批注与文档笔记](pdf-notes.md)。翻译与批注是两个独立工具。
