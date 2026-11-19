---
title: "生成与编辑图片"
last_update:
  date: '2026-11-19'
---

# 生成与编辑图片

根据提示词生成插图，再从选定图片继续调整，同时保留旧版本。适合制作流程示意图或演示配图。生成图片不属于实验数据；分享前应核对科学标签、结构和图中表达的结论。

## 配置图像服务 {/* #configure */}

1. 打开 **Settings → Model**，找到 **Image generation**，打开 **Image services → Add image service**。
2. 选择 **Provider type**。使用 **Custom HTTP service** 时，填写 **Name**、**Base URL** 和 **API key**，再添加服务实际支持的 **Model ID** 与 **Interface preset**。使用自定义地址时，**API format** 必须与图像接口匹配。
3. 保存服务，在 **Image generation model** 中选中它。显示 **Not configured** 表示图像生成尚未配置好。
4. 先发出一个简单的图片请求，检查返回图片。新的图像设置从下一轮对话开始生效。

![图像服务配置：地址、API 格式、凭据和模型字段](/img/open-science/v130/image-service.webp)

Main、Vision 和 Image generation 的职责不同：Main 驱动会话，Vision 读取图片，Image generation 生成或编辑图片。Main 使用 Codex 订阅，不代表已经拥有图像生成 API 或对应额度。配置图像服务时，可以保留当前可用的主模型。

## 生成第一张图片 {/* #generate */}

在项目会话中说明图片用途、内容、布局和文字要求，并要求保存图片。图像生成工具卡片会展示请求与进度；等到产生完整输出后，再打开预览。

<p className="example-label"><strong>示例</strong> 请求一张研究流程示意图</p>

```text
Create an English illustration for a lab meeting slide showing:
research question → literature search → evidence review → reproducible analysis.
Use four clearly separated steps, a light background and readable labels.
This is a conceptual workflow, not a plot of experimental results.
Save the image so I can review it in the project.
```

检查实际标签、顺序和箭头方向。请求失败时，核对图像服务、模型与错误信息，不必把 Main 换成无关提供商。生成或编辑使用的提示词与源图片会发送给所选图像服务；取消任务不能撤回已经发送的内容。

## 编辑、比较与复用 {/* #edit */}

打开图片的编辑入口，选择源版本，描述一次明确的修改。仅在所选服务支持时使用相应区域和参数控制。提交后等待新结果；编辑会创建新版本，旧变体仍可访问。

将候选图片与源图对比，既检查要求修改的区域，也检查应该保持不变的部分。通过图片历史返回旧版本，或从旧版本继续编辑。下载最终选定的版本，在放入演示文稿前重新打开检查；图注应准确说明它属于示意内容。

核对已有图表中的数值，使用 [Notebook](notebook.md) 和 [Provenance](reproducibility.md)；修改幻灯片文字与格式，参见[演示文稿编辑](presentation-editing.md)。
