---
title: "Manage and share Specialists"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Manage and share Specialists

Use a package to move a configured role, and complete its local setup after importing. Skills, Connector references and local permissions have different portability rules.

In batch management, review the selected count in the bottom action area before applying an operation. Read completion or failure feedback there, then check the resulting items. Selecting an entry alone does not enable, install or delete it.

## List controls

| Control | Operation and expected result |
| --- | --- |
| Search specialists / category filter | Narrows installed rows; clear filters if a saved role appears missing. |
| Edit / role name | Opens the existing editor. Save changes and reopen to verify. |
| Change appearance | Changes icon/color without changing instructions. |
| Manage Tags | Assigns organizational labels. |
| Toggle | Enables/disables the role without deleting it. |
| Actions → Duplicate | Opens a new-role draft with copied instructions/bindings and a Copy name. Create specialist is still required. |
| Actions → Export ZIP | Opens export selection and saves a portable package. |
| Actions → Delete | Opens a permanent-deletion confirmation; inspect optional Skill deletion separately. |

Before deleting a role, inspect the option to delete its Skills. Keep shared Skills if other roles still use them. Deleting a duplicate does not require deleting the original role.

![Deleting the disposable role while keeping shared Skills](/img/open-science/capabilities-walkthrough/18-specialist-delete-confirmation.webp)

## Share and import a package

### Export with the required Skill files

<p className="example-label"><strong>Example</strong> Share a reviewer role with its Skill</p>

1. Choose **Actions → Export ZIP** on RNA-seq QC Reviewer.
2. In **Choose Skills to include**, explicitly select `rnaseq-count-qc` if the recipient needs its files. An installed personal/imported Skill is not necessarily included by default.
3. Export and inspect the archive before sharing.

![Selecting a Skill to include in the Specialist package](/img/open-science/capabilities-walkthrough/07-specialist-export.webp)

The actual <ExampleDownload path="/examples/capabilities/rna-seq-qc-reviewer-with-skill.zip">package with Skill</ExampleDownload> contains `manifest.json`, `specialist.json`, `skills/rnaseq-count-qc/SKILL.md` and its reference schema. A minimal export can contain just the two JSON files. Connector IDs are references; credentials, local trust and Full access are not transferred as ready-to-use authorization.

### Import, resolve conflicts, finish setup

1. Select **Add specialist → Import ZIP → Choose ZIP**. One package contains exactly one Specialist. **Download template** provides the application package template.
2. Inspect the name, immutable ID, version, bundled Skills, archive limits and diagnostics.
3. For each Skill conflict, choose **Keep installed Skill** or **Use package Skill**. The second choice replaces files for every current user of that Skill; read **Affected now**.
4. For an existing Specialist ID, choose **Review overwrite**, inspect current/incoming versions and export the current version first if needed. **Overwrite and continue** is a separate confirmation.
5. The imported role is saved **disabled / SETUP INCOMPLETE**. Inspect instructions and capability bindings in the editor, choose the intended access scope, then **Save changes** to complete setup and enable it.
6. Reopen the installed role and run a small, scoped task.

![Resolving the real RNA-seq Skill conflict during import](/img/open-science/capabilities-walkthrough/19-specialist-import-conflict.webp)

**Version unchanged** can still accompany a Skill conflict. Choose the intended Skill source explicitly, then reopen the imported role to confirm its bindings and access scope.

| Preview control | What to inspect |
| --- | --- |
| Bundled Skill expansion | Version, disposition, reason and file list. |
| Archive limits | 50 MB compressed, 200 MB uncompressed, 2,000 files, 25 MB per file in this UI. |
| Diagnostics | Blocking errors, warnings and information; a warning may require an explicit choice. |
| Copy report / Download JSON | Exports diagnostics for troubleshooting. Review the report before sharing it. |
| Cancel | Leaves the preview without installing. |
| Next / Review overwrite | Continues only when required choices and validation permit it. |

**Import from a browser:** select **Import ZIP → Choose ZIP**, then inspect the package, resolve conflicts and complete local setup before enabling the role. Credentials and trust configuration must be set up on the destination device. If upload fails, retain the error and follow [Troubleshooting](../guides/troubleshooting.md).

## Browse the marketplace

Open **Marketplace**, search a role and choose **View details**. Check publisher, source, version, license, download size and included Skills/Connectors. **Refresh Marketplace** updates the catalog; **Manage Marketplace sources** controls the configured sources. All/Official/Community filters concern catalog origin, not runtime readiness.

![The actual Auto Research Specialist package detail](/img/open-science/capabilities-walkthrough/22-marketplace-package-detail.webp)

Select **Install Specialist**, then confirm the role appears in **Marketplace** and inspect its enable state and bindings. Catalog package counts describe that package, not all application capabilities. Installation does not execute a research task or prepare every external dependency; finish any required setup before use.

![Auto Research installed and enabled](/img/open-science/capabilities-walkthrough/23-marketplace-installed.webp)

## Verify before sharing

After importing or changing the role, run a small task using its assigned capabilities and inspect the saved output. Follow [Extend an analysis with an installed Specialist](../workflows/extend-analysis.md) for existing Methods, PCA and matrix examples. Check the required inputs and unresolved limitations for the selected route.

Implementation reference: [SpecialistsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
