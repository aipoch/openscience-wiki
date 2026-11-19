---
title: "Generate and edit images"
last_update:
  date: '2026-11-19'
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

Open the image's editing action, select the source version and describe a focused change. Use the available region and parameter controls only when the selected service supports them. Submit the edit and wait for its new output. Editing creates a new version so earlier variants remain available.

Compare the candidate with the source: check the requested region and the parts that should stay unchanged. Use the image history to revisit a version or continue editing from it. Download the intended final version and reopen the file before placing it in a presentation. Keep an accurate caption identifying illustrative content.

For existing plots that need numerical checking, use [Notebook](notebook.md) and [Provenance](reproducibility.md). For slide text and formatting, see [presentation editing](presentation-editing.md).
