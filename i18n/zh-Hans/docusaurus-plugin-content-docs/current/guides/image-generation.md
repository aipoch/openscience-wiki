---
title: "生成与编辑图片"
last_update:
  date: '2026-11-23'
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

1. 在预览中打开目标图片。悬停或用键盘聚焦其控件，再选择 **Edit image**。输入要求前先核对源图片与版本。
2. 在会话输入框中写清本次修改。让要求对应当前显示的源图；进入编辑并不会发送请求。选择局部区域后，检查高亮范围和该区域的要求。可用工具与参数取决于图片及服务。
3. 点 **Send image edit**，等待新结果。如果按钮不可用，查看显示的原因并检查[图像服务配置](#configure)。请求失败不代表产生了一个已完成的新版本。
4. 使用提供的 **Compare with input image** 或 **Compare**，同时检查修改区域和应保持不变的内容。通过 **Image history** 回看历史版本，或点 **Continue editing** 继续修改。
5. 下载选定版本，重新打开，核对标签和科学表述后再分享。图片详情可标识产生该次编辑的 Notebook 内核，但这条记录不等于科学准确性验证。

编辑控件使用会话输入框，会话消息仍留在原位置。图注应准确说明示意内容。需要核对图表数值时，使用 [Notebook](notebook.md) 和[来源与复现](reproducibility.md)；幻灯片文字见[演示文稿编辑](presentation-editing.md)。

## 保存前测试图像服务 {/* #test-service */}

v1.3.1 的图像服务表单在必填字段和模型填写完成后，提供 **Test generation**。先阅读确认提示：测试会生成一张图片，提供商可能收取费用。测试通过只对应当前这组配置；修改模型、端点或凭据后，需要重新测试。也可以直接保存，不执行测试。

保存新服务后，只有尚未选定 Image generation 模型时，才会自动把首个模型设为默认。第一次请求前检查当前选择；Main 模型仍单独配置。

![保存前测试图像服务](/img/open-science/v1.3.1/image-service-test.webp)

## 刷新图像模型目录 {/* #image-model-catalog */}

在 **Settings → Model → Image services** 中添加或编辑官方 **OpenAI**、**MiniMax**、**Bailian** 或 **Volcengine Ark** 服务。填写连接字段后，保存前点 **Refresh model list**。刷新会携带配置的凭据访问对应提供商，不会生成图片。

刷新结果按 Open-Science 支持的图像模型筛选，并不是提供商的全部模型。当前默认模型会保留；如果返回目录中没有它，会显示相应标记，使用前应先检查。刷新失败保留原列表，按显示的原因修正后重试。**Save** 保存表单；[Test generation](#test-service) 则是另一项可能计费的图像请求。

百炼应使用与凭据对应的工作空间 URL 和区域；中国区凭据使用中国区目录。改变连接或工作空间后，应重新检查目录；其他区域能看到某个模型，不代表这里也有权限。

![OpenAI image service: supported models and Refresh model list](/img/open-science/v1.3.3/image-catalog.webp)
