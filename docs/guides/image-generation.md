---
title: "Generate and edit images"
last_update:
  date: '2026-11-25'
---

# Generate and edit images

Create an illustration from a prompt, then refine a selected image while retaining earlier versions. Use this for explanatory diagrams or presentation artwork. A generated image is not experimental evidence; verify scientific labels, structures and visual claims before sharing it.

## Configure an image service {/* #configure */}

1. Open **Settings → Model** and find **Image generation**. Open **Image services → Add image service**.
2. Choose **Provider type**. For **Custom HTTP service**, enter **Name**, **Base URL** and **API key**, then add the exact **Model ID** and **Interface preset** supported by the service. For a custom endpoint, match its **API format** to the service's image API.
3. Save the service, then choose it under **Image generation model**. **Not configured** means image generation is not ready.
4. Start with one small image request and inspect the returned image. New image settings apply from the next turn.

![Image service setup with endpoint, API format, credential and model fields](/img/open-science/v130/image-service.webp)

Main, Vision and Image generation have different jobs. Main directs the conversation; Vision reads images; Image generation creates or edits them. A Codex subscription for Main does not automatically provide an image-generation API or its billing allowance. Keep your working Main model selected while configuring the image service separately.

## Generate the first image {/* #generate */}

In a project conversation, describe the image's purpose, content, layout and any labels. Ask for a saved image. The image-generation tool card shows the request and its progress; wait for a completed output before opening it in the preview.

<p className="example-label"><strong>Example</strong> Request a conceptual workflow illustration</p>

```text
Create an English illustration for a lab meeting slide showing:
research question → literature search → evidence review → reproducible analysis.
Use four clearly separated steps, a light background and readable labels.
This is a conceptual workflow, not a plot of experimental results.
Save the image so I can review it in the project.
```

Inspect the actual labels, order and arrow direction. If a request fails, check the image service, model and error rather than changing Main to an unrelated provider. Prompts and source images used for generation or editing are sent to the selected image service. Cancelling cannot retract data already sent.

## Edit, compare and reuse {/* #edit */}

1. Open the intended image in the preview. Hover over it or move keyboard focus to its controls, then choose **Edit image**. Confirm the source image and version before entering instructions.
2. In the conversation composer, describe a focused change. Keep the request tied to the displayed source; entering editing does not send it. If you select a region, check the highlighted area and its instruction. Available tools and parameters depend on the image and service.
3. Select **Send image edit** and wait for the new output. If the control is unavailable, check the displayed reason and [image-service configuration](#configure). A failed request is not a new completed version.
4. Open the new version in the full preview and confirm its identity; v1.3.4 fixes opening an edit while its version is being published. Use **Compare with input image** or **Compare** when offered, and inspect both the changed area and content that should remain unchanged. Use **Image history** to revisit earlier versions, or **Continue editing** for another revision.
5. Download the chosen version, reopen it, and check labels and scientific claims before sharing. Image details can identify the Notebook kernel that produced an edit; that record does not establish scientific accuracy.

The conversation remains in place while the editing controls use its composer. You can also open **Provenance** history while an image draft is active; check which saved version you are viewing. Keep an accurate caption identifying illustrative content. For numerical checks on plots, use [Notebook](notebook.md) and [Provenance](reproducibility.md); for slide text, see [presentation editing](presentation-editing.md).

## Test an image service before saving {/* #test-service */}

In v1.3.1, the image-service form offers **Test generation** after the required fields and a model are filled. Review the confirmation: it generates one image and the provider may charge for the request. A passed test applies to that exact configuration; changing the model, endpoint or credential requires a new test. You can also save without running it.

After saving a new service, its first model becomes the default only when no Image generation model is already selected. Inspect that selection before your first request. Main remains separately configured.

![Test an image service before saving](/img/open-science/v1.3.1/image-service-test.webp)

## Refresh an image-model catalog {/* #image-model-catalog */}

In **Settings → Model → Image services**, add or edit an official **OpenAI**, **MiniMax**, **Bailian** or **Volcengine Ark** service. Fill the connection fields, then choose **Refresh model list** before saving. A refresh sends the configured credentials to that provider; it does not generate an image.

The refreshed list matches provider results against the image models supported by Open-Science, so it is not every model the provider offers. The current default is retained, with a marker when it is missing from the returned catalog. Review that marker before relying on the model. A failed refresh keeps the previous list; check the displayed cause and retry. **Save** commits the form, while [Test generation](#test-service) is a separate, potentially billable image request.

For Bailian, use the workspace URL and region matching the credential. China-linked credentials use the China catalog. Changing a connection or workspace requires checking its catalog again; a model visible in another region is not proof of access here.

![OpenAI image service: supported models and Refresh model list](/img/open-science/v1.3.3/image-catalog.webp)
