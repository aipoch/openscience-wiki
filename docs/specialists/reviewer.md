---
title: "Reviewer and Auto-review"
last_update:
  date: '2026-09-17'
---

# Reviewer and Auto-review

The built-in Reviewer checks a completed response against the request and the evidence available to it. It is separate from a custom Specialist whose name contains “Reviewer,” and separate from permission approval.

For execution-based output comparison, use [Reproducibility](../guides/reproducibility.md). A Reviewer assessment and a reproduced output are separate records.

## Session review versus artifact review

A conversation review and the **Review** tab of an artifact's provenance panel are different records. Inspect the exact artifact version you intend to share. If it says **No review for this version**, preserve that label even if another response was reviewed. Likewise, **partial** environment capture and **bounded** evidence remain partial and bounded after a model expresses confidence.

For input errors, attach an accessible current input or resolve its actual version through the application. A local file's existence does not guarantee that every child/reviewer kernel can read it. See [Notebook](../guides/notebook.md), [Delegation](./delegate.md) and [Troubleshooting](../guides/troubleshooting.md).

Inspect the selected artifact version when reopening a historical review. After cancelling a review or correction, read the final state and retained findings before deciding whether to rerun. Cancellation does not create a successful review.

## Choose a result you can check

For a first review, complete the [inline table check](delegate.md#verified-example-twelve-sample-invariants): provide the complete sample-QC table and ask for one arithmetic result per sample. This supplies a precise criterion: twelve unique sample identifiers, twelve rows, and zero-count plus detected genes equal to the gene total for every row.

Before review, open the child result and its Notebook output yourself. Then request review of that response. Compare the review's checks with those criteria; if a row or executed result is missing, resolve that finding before using the result. Review outcomes depend on the response and available evidence; this exercise does not promise a zero-finding badge.

## Request a review

1. Complete a conversation turn with a working model.
2. Open the composer **+ menu → Request review**. The menu changes to **Reviewing…** while review runs.
3. Open the resulting **Reviewer** card. Read the number of findings and checks, then expand each check's explanation.
4. Select **Go to transcript** to open **Session Reviewer**. Check the model, timestamp, PASS/FAIL statements, evidence references and **Reviewer log**.
5. If corrections are requested, inspect Main Agent's follow-up and any child permission requests. Review does not grant those operations automatically.
6. Use **Re-run review** after addressing the identified issue. Preserve unresolved findings if a required input or operation is still unavailable.

<p className="example-label"><strong>Worked example</strong> Read a review with unresolved findings</p>

<details>
<summary>View the checks and unresolved findings</summary>

Using Codex subscription authentication with gpt-5.6-sol, manual review returned **four checks and one finding**:

| Check | Actual result |
| --- | --- |
| The Specialist executed the inline CSV review | PASS; the review cited the child handoff and arithmetic results. |
| Custom MCP results and failures were reported accurately | PASS; valid metrics and the connector error matched execution output. |
| The molecule call produced the stated artifact/descriptors | PASS; the returned artifact version and values were identified. |
| The model inspected the saved molecule preview as requested | FAIL; its catalog lookup did not read the structure content. |

The example ends with **fix limit reached / Issues found** because the model could not access the managed input needed for the structure check. Open the finding to identify the missing input and provide it before requesting another review. Manually opening the structure in the viewer does not update the model’s inspection record.

</details>

## Auto-review controls

Open **Agent controls → Auto-review** to configure review after future responses. This is a conversation preference; it is distinct from **Ask for approval** and **Delegation**. The built-in Reviewer row in Settings has no ordinary edit/delete/enable controls and is excluded from the normal Specialist picker.

| UI state or control | Meaning |
| --- | --- |
| Request review unavailable | Check for an active response/review, a missing eligible completed response, or unavailable model setup. |
| Reviewing… | Review is still running; do not treat it as complete. |
| Reviewer · n findings · n checks | Opens the checks and their evidence. A zero-finding result is still bounded by what was checked. |
| Corrections requested | Main Agent may run a follow-up correction cycle. Inspect new operations and their results. |
| Issues found / fix limit reached | The review did not resolve every finding. Read the latest explanation before starting a new attempt. |
| Go to transcript | Opens the dedicated Session Reviewer page. |
| Expand / Collapse Reviewer log | Reveals or hides its operation log; a truncated log is not complete evidence. |
| Re-run review | Requests another review; it is not an “accept all findings” button. |

<span id="what-the-local-review-checked" />

### Run Auto-review with a separate model

1. Under **Settings → Model → Reviewer**, choose an available fixed model. The exercised setup used `gpt-5.6-sol` for Main and `gpt-5.6-luna` for Reviewer.
2. Open **Agent controls → Auto-review** in the target conversation, confirm **On**, then send the next request.
3. After the response, expand the automatically created **Reviewer** card. Check its model, criterion, evidence and result.
4. When **Corrections requested** appears, inspect Main's correction and the subsequent review before deciding whether the finding is resolved.

From v0.30.2, Auto-review preserves its setting when a conversation starts, and linked correction turns retain the review feedback needed for the correction cycle. Turn it on before sending, then check the actual Reviewer card and Main's revised output. Context preservation does not mean a finding has been corrected; read the subsequent review and remaining findings.

### What “resolved” establishes

A check can be resolved because a requested attempt was made and its permission failure was accurately reported. That does not establish that the file was readable or its calculations passed. Read the criterion, tool result and remaining findings together. If access remains blocked, follow the [file-handoff known issue](delegate.md) before starting another review.


Implementation reference: [SessionReviewerPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/SessionReviewerPanel.tsx), [ComposerAgentControlsMenu.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerAgentControlsMenu.tsx).
