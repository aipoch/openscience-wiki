---
title: "Specialists and available roles"
last_update:
  date: '2026-11-11'
---

# Specialists and available roles

A Specialist is a saved research role: identity, instructions and permitted Skills/Connectors. Use one when a recurring responsibility needs a consistent scope or a separate subtask. A role's name alone does not establish expertise or verification.

## Understand the available roles

| Role or source | How it is used | What you can configure |
| --- | --- | --- |
| Main Agent | Handles the conversation and can coordinate delegated work | Session model, agent controls and available capabilities |
| Custom Specialist | Created locally for a defined research task | Identity, instructions, explicit Skills/Connectors or Full access |
| Imported / Marketplace Specialist | Installed from a package, then configured on this device | Local setup and allowed capabilities; inspect publisher and package version |
| Built-in Reviewer | Performs the app's review workflow | Trigger review through the conversation; it is not a normal editable/delegatable Specialist |

Open **Marketplace** to find published roles. The online catalog can change independently of your installed app. Inspect each role's publisher, instructions and dependencies before importing.

## Find a role

Open **Resource center → Specialists**. **Installed** counts the locally registered roles, including Reviewer. Use **Search specialists** and **Filters → Filter specialists by category**, then open a row to inspect it. **Marketplace** opens a different catalog; a listed market entry is not installed until you complete its package/setup flow.

![The RNA-seq QC Reviewer installed locally](/img/open-science/capabilities-walkthrough/06-specialist-list.webp)

## Marketplace roles observed

| Role | Intended research scope |
| --- | --- |
| Auto Research Specialist | Biomedical evidence, analysis, validation and writing |
| Cryo-EM Structure Validation Specialist | Half-map, geometry and map-model validation planning |
| Pharmacometrics PK/PD Design Specialist | PK/PD research-design and uncertainty checks |
| Multimodal Neuroimaging Connectomics Architect | MRI/fMRI/diffusion workflows and network-analysis controls |
| Synthetic Route and Reaction Optimization Specialist | Reaction-planning and optimization evidence |
| Aerodynamics CFD Verification and Validation Specialist | Numerical convergence and experimental-comparison planning |
| Atmospheric Chemistry Transport Modeling Specialist | Emissions, transport and source-attribution studies |
| High-throughput DFT Screening Specialist | Convergence and thermodynamic-consistency checks |
| Astronomical Photometry and Time-domain Analysis Specialist | Calibration, photometry and variability analyses |
| Precision Agriculture Phenotyping and Prescription Design Specialist | UAV phenotyping and spatial-validation workflows |

These are observed catalog descriptions, not evidence of ten completed scientific workflows. The product's Reviewer is also different from the custom **RNA-seq QC Reviewer** used in these chapters.

## Choose a route

- [Create and instruct](./identity.md): define a local research role.
- [Assign capabilities](./capabilities.md): determine what it can use.
- [Delegate and verify](./delegate.md): inspect an actual child run and its evidence.
- [Reviewer and Auto-review](./reviewer.md): use the app's built-in review process.
- [Manage and share](./manage.md): package, import, resolve conflicts and finish local setup.

Implementation reference: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/specialists/manifest.json), [SpecialistsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
