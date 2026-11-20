---
title: "搜索网页与阅读来源"
last_update:
  date: '2026-11-20'
---

# 搜索网页与阅读来源

使用内置 **Open-Science Agent**，在会话中查找公开网页并阅读正文，适合寻找报告规范、软件文档和研究动态。需要论文题录或全文时，同时使用[科学数据库](databases.md)和[文献库](../guides/library.md)。

## 从问题开始 {/* #start */}

1. 在 **Settings → Agent** 选择 **Open-Science Agent**，再在 **Settings → Model** 连接支持的 Main 模型；可以使用 Codex 订阅。
2. 打开项目会话，说明要查找什么、优先采用哪些来源，以及是否有时间范围要求。让 Agent 先阅读相关网页，再回答问题。
3. 如果出现授权卡片，检查搜索词、时间范围、结果数量和域名过滤条件，再批准本次请求。网页阅读的授权对应具体目标 URL。
4. 展开工具活动，检查返回来源。使用回答中的结论前，沿引用回到原始证据核对。

可以这样提问：

```text
Find the official PRISMA 2020 checklist page on the public web.
Read the relevant official page and explain what the checklist is for.
Give the source URL and distinguish the webpage text you read from any
linked PDF you did not open. Keep the answer in English.
```

内置搜索将搜索词发送到 **Exa**，无需 Exa 账户；阅读网页会连接该网站。操作仍遵循当前权限模式，取消不能撤回已经发送的请求。不要把保密研究数据放进公开搜索词。

## 阅读证据，不只看搜索摘要 {/* #read-sources */}

搜索结果是摘录。让 Agent 阅读选定网页，并引用支撑回答的内容。网页阅读支持公开 HTML、Markdown 和纯文本，不会登录网站、使用浏览器 Cookie 或执行网页 JavaScript。论文和附件应使用 PDF、文献库流程，不要把 HTML 介绍页当成论文全文。

如果返回文本被截断，让 Agent 继续阅读已保存的网页内容，再作判断。保存的来源反映抓取当时的内容；需要最新表述时，要求重新抓取。保留的来源可以随会话分支和符合导出条件的研究包传递，但这不等于存档整个网站。

## 无法阅读来源时 {/* #recover */}

- 遇到限流，按提示等待后再试，不要反复发送同一个失败请求。
- 必需的过滤条件不受支持时，保留要求并选择其他来源或检索方式，不要默默扩大范围。
- 遇到登录墙、页面拦截或不支持的文件类型，自己打开官方来源，并在适当时提供有权使用、可读取的文件。不要把未读页面写成已核实证据。

需要查找和筛选论文时，继续参阅[围绕问题检索文献](../workflows/focused-literature-search.md)。
