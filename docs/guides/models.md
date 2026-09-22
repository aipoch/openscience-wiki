---
title: "Models and task policies"
last_update:
  date: '2026-09-22'
---

# Models and task policies

Choose a model for the work it must perform, then check which settings are inherited. A **Provider** supplies model access; an **Agent** runs the conversation and tools; a **Specialist** supplies a reusable role and selected capabilities. Changing one does not install or configure the others.

Use the task policies below when Main, Subagent, Reviewer, Vision or Session details need different models. Check the provider and model in the resulting task, especially when several providers offer the same model name.

## Select the main model

1. Open **Settings → Model**. In a workspace, the Composer's **Select model** entry also exposes model choices.
2. Open **Main model** and choose an available model under its configured provider. A catalog entry is not proof that the account can use it.
3. Select **Reasoning effort**. Use the choices actually displayed for that model. This inspected model offered Default, Low, Medium, High, XHigh and Ultra; other models have different ladders.
4. Close and reopen Model to check the saved selection. Start a small request and inspect its result before a long analysis.

![Main model and connected provider](/img/open-science/guides-walkthrough/10-model-main.webp)

Changes apply to subsequent requests. They do not retroactively change the model behind an existing answer. When models change, the app attempts to preserve relative reasoning strength; a backend may approximate an unsupported effort. Higher effort can increase time and token use and is not a correctness guarantee.

## Assign models to specific tasks

Select a scenario row to expand it. Opening another row collapses the previous one. Read the collapsed summary after making a change: it distinguishes inheritance, a fixed model and an unavailable selection.

| Scenario | Model choice | What to verify |
| --- | --- | --- |
| **Subagent** | Same as main model, or a compatible separate model | The matching effort control is disabled while it follows Main. Delegation must also be enabled. |
| **Reviewer** | Follow main model, or a configured reviewer model | A model policy alone does not enable Auto-review or create a review record. |
| **Vision** | A configured image-capable model | Not configured means there is no dedicated Vision selection. Whether a relay is needed depends on the active backend's image support. |
| **Session details** | Follow Main or choose a compatible model; inspect its effort and enablement | This generates session title/description using a restricted call. It is separate from the scientific task and its artifacts. |

![Subagent inheritance and disabled effort control](/img/open-science/guides-walkthrough/11-model-scenarios.webp)

The Session details selector filters out Codex subscription models. A model visible in Main or Vision may therefore be absent here. With a compatible local provider and OpenCode selected, the local model became available as a fixed choice. **Not supported** beside its reasoning effort means that effort control is unavailable; it is separate from whether the model can receive a text request.

For a pinned scenario, select the provider/model and then the supported effort. Return to the inheritance option when you want future Main changes to propagate. An **Unavailable** summary can retain the previous model name even after its provider is removed or no longer eligible; select a valid replacement.

### Read a chart with a separate Vision model

Use Vision when the conversation's Main model cannot accept images. A Main model that already accepts images can read them directly.

<p className="example-label"><strong>Worked example</strong> Check labels in a sample-count chart</p>

1. Expand **Settings → Model → Vision** and choose an available image-capable model. Select a supported reasoning effort if the control is enabled.
2. Keep the intended text model selected in the conversation. Changing Vision does not replace Main.
3. Use **+ → Attach files** to attach the chart. Confirm that its filename appears in the Composer before sending.
4. Ask for specific visible information, such as the title, axis labels, units and number of plotted samples. Request an explicit indication when a label is unreadable.
5. Compare the answer with the original image. Use the source table for exact numerical comparisons: in this example, two labels rounded to **24.7M** do not prove that their underlying counts are equal.
6. Return Vision to **Not configured** when you no longer want a separate image model. This does not remove the model provider.

![Separate Vision selection alongside the text Main model](/img/open-science/sept11-completion/vision-configuration.webp)

![Checking chart labels and the limits of rounded values](/img/open-science/sept11-completion/vision-result.webp)

The current image relay excludes Codex subscription providers even though they can appear in the Vision selector. If a text-only Main model still rejects an image after that selection, choose another eligible Vision provider or an image-capable Main model. Do not treat a saved selector value as a successful image request.

### Confirm that session details were generated

After choosing **Same as main model** or a compatible fixed model under **Session details**, create a conversation. Wait for the first-prompt fallback to become a concise title, then inspect the saved description. A truncated copy of the prompt does not establish successful generation.

Check the saved title and description after the auxiliary request finishes. If the title remains a shortened prompt, inspect model compatibility, local server load and the call’s final status. An auxiliary timeout can retain that fallback. Session-title generation uses its own model policy and does not run the conversation’s scientific calculation.

## Provider controls and failure checks

| Control/state | Next action |
| --- | --- |
| **Add provider** | Follow [provider setup](./providers.md), including its authentication and endpoint requirements. |
| **Check Codex login** | Recheck the subscription login state; this does not run a research task. |
| **Re-import Codex login** | Import a refreshed existing login through the app's flow. |
| **Edit** | Review provider configuration. Preserve the working configuration until a replacement is verified. |
| Disabled **Delete** | The current provider cannot be removed in this state; choose another valid setup first. |
| Compatibility warning | Check the active Agent and provider API format before repeatedly retrying. |
| No scenario choices | Configure an eligible provider/model first; a blank selector is not a request to type an arbitrary model name. |

Use [Agent setup](./frameworks.md) for the execution backend and [Usage](./usage.md) for reported activity. Exact configuration precedence is in [Reference](../reference/configuration.md).

Sources: [model selection](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ActiveModelSelect.tsx), [scenario policies](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ScenarioModelList.tsx).

## Optional classification models {/* #classification-models */}

Open **Settings → Model → Classification models**. A classification service helps select relevant Skills and Connectors before a request starts. It does not replace Main or add a chat model. You can leave **Automatic capability selection** at **Use default method**; Skills and Connectors still work without it.

In v0.31.1 this route is available for main conversations using **Codex Chat Completions** or **CodeBuddy**. Do not assume Codex subscription sessions or every framework use the service. Only the current request and capability names/descriptions are sent to the classification service. If it is unavailable or its result is unclear, the default method continues.

![Default capability selection and the optional classification service entry](/img/open-science/v0311/classification-models.webp)

1. Choose **Add service**, then **TypeSafe AI**, **OpenRouter** or **Custom HTTP service**.
2. Name the service and supply its API credential when required. OpenRouter can use an existing compatible account or a new key; keep keys hidden in screenshots.
3. Select **Save** and wait for validation. Failed validation leaves the previous settings unchanged.
4. Under **Automatic capability selection**, select the saved service and a model offered in its catalog. Use **Check model** to check the connection.
5. Try a bounded request in a supported main conversation, then inspect the actual tools selected. A successful model check alone does not verify a research result.

Removing a service returns its binding to the default method. A separately stored service key is removed with it; removing a service that shares an account does not delete that account or its key.

See [provider setup](providers.md) for conversation models. Local PDF parsing resources are managed under **Local parsing models**, a separate tab.

![Classification service form with the API key still empty](/img/open-science/v0311/classification-add-service.webp)

For Jev, select **TypeSafe AI / Jev Latest** under **Automatic capability selection**, then choose **Check model**. **Check passed** confirms that the service responds. Reopen Settings to confirm the binding is retained.

![TypeSafe AI / Jev Latest selected with Check passed and the API key masked](/img/open-science/v0311/classification-connected.webp)

For example, a public TP53 lookup in a Codex Chat Completions session can use Jev to select `mcp-genes`. Inspect the selected capability in the activity, then inspect the database response for the research result. Codex subscription sessions use their existing capability-loading path; a saved Jev binding does not make those sessions use Jev.

### Custom classification services {/* #custom-classification */}

In **Add service → Custom HTTP service**, enter a service name, endpoint URL and model ID. The endpoint must implement the **TypeSafe classification protocol**; an ordinary Chat Completions endpoint is not interchangeable. Supply the service's API key when required: a loopback endpoint may use HTTP without a key, while remote endpoints require HTTPS and credentials.

After saving, select the service under **Automatic capability selection** and run **Check model**. Then inspect capability selection in a supported conversation route. This setting does not switch Main or make Codex subscription sessions use the classifier.

The form below illustrates the fields. Replace the sample endpoint and `your-model-id` with your actual service details before checking the connection.

![Custom classification endpoint, model and empty key fields](/img/open-science/v0320/classification-custom.webp)
