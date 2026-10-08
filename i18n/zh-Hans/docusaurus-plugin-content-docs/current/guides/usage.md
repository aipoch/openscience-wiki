---
title: "Token 用量与活动"
last_update:
  date: '2026-10-08'
---

# Token 用量与活动

在 **Settings → Usage** 查看已报告的 Token 和本地活动。单次回答的 **Token usage** 与会话 **Context window** 提供更小范围的视角。累计调用用量与当前上下文占用不是同一个指标。

按显示的时间范围和指标解读图表。Token 数量描述调用活动，订阅额度或账单应到提供方查询。

## 筛选顶部汇总

1. 打开 Usage，选择 Today、This week、Last 30 days 或 All time。
2. 检查更新时间；任务完成后页面过期可用 Refresh。
3. 对照四类 Token 和 New/Total 活动计数。
4. 比较图表前先看图表自身的时间范围。

![Today 汇总与独立的每日图表](/img/open-science/guides-walkthrough/13-usage-today.webp)

| 字段 | 解释 |
| --- | --- |
| Total tokens | 所选时期报告的累计用量 |
| Input tokens | 后端报告的输入部分，不是按本地文本长度推算 |
| Cache tokens | 后端归入缓存的用量 |
| Cache share | 相关输入/缓存量的比例；横线表示不可用，不表示免费 |
| Output tokens | 报告的输出部分 |
| New sessions/projects/runs/artifacts | 所选期间新增的对象 |
| Total sessions/projects/runs/artifacts | 总体计数，不必等于所选期间新增数 |

当前运行尚未记录用量时，Today 的 Token 为零，但固定 30 天图仍有昨天的活动，这是周期不同。上传输入与生成产物也不同，上传源文件不会自动增加生成产物数。

## 每日活动和组成

**Daily activity metric** 可选 Total tokens、Input tokens、Output tokens、Cache tokens、New sessions、New projects、New artifacts 和 Runs。选择指标后查看日期单元；颜色越深表示在当前刻度内数值越大。

**Daily token usage** 按输入、缓存、输出堆叠。两个图都固定标注 **last 30 days**，顶部汇总的 Today 不会把图表缩成一天。比较趋势前需对齐周期。

## 缺失和异常数值

| 现象 | 检查方向 |
| --- | --- |
| 完成的会话没有用量 | 部分 Provider 和旧记录不报告。刷新后检查回答自身用量 |
| 累计很高但上下文百分比低 | 累计用量跨多次调用，上下文是某个时点的占用 |
| 新增计数变化但 Token 不变 | 创建项目或管理会话可以不调用模型 |
| 数值与账单不同 | 此页不是 Provider 账单或订阅限额面板 |
| 缓存比例高 | 只能说明报告的组成，不能据此直接推算节省金额 |

缺失用量不会被自动补算。上下文组成和压缩见[记忆与上下文](./memory.md)。

源码：[Usage 页面](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/TokenUsagePanel.tsx)。

## 连续查看相邻日期 {/* #inspect-daily-usage */}

在 **Daily token usage** 图表上移动指针，连续查看不同日期的输入、缓存和输出用量。键盘操作时，用 **Tab / Shift+Tab** 聚焦不同日期，用 **Escape** 关闭详情。核对显示的日期和分项；此图仍覆盖最近 30 天，不会补出提供商未报告的用量。
