---
title: "Extend an analysis with an installed Specialist"
last_update:
  date: '2026-09-17'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Extend an analysis with an installed Specialist

<p className="example-label"><strong>Worked example</strong> Extend a theophylline concentration plot with observed exposure metrics</p>

Use **Pharmacometrics PK/PD Design Specialist** to check concentration-time data, draw the profiles, then calculate exposure metrics. The deliverables are a twelve-subject table, a concentration plot, a runnable R script and a methods report. This example describes public research data; it does not recommend treatment or dosing.

The input is R's public [Theoph dataset](https://www.stat.ethz.ch/R-manual/R-devel/library/datasets/html/Theoph.html): 132 observations from twelve subjects. Time is in hours, concentration in mg/L, weight in kg and dose in mg/kg. The calculations use base R, without additional packages or database credentials.

## 1. Install and select the Specialist

1. Open **Settings → Specialists → Browse Marketplace**. Find **Pharmacometrics PK/PD Design Specialist**, inspect its capabilities, and install it. This example uses package **1.0.0** in Open-Science **0.30.1**.
2. In **Settings → Runtimes**, confirm that R is **Ready** and enabled. The recorded run used R **4.4.3**.
3. Open a new conversation in your research project. Choose an available model, then **Agent controls → Specialist → pharmacometrics-pkpd-designer**. The recorded run used **Codex subscription / gpt-5.6-sol**.
4. At the start of **each analysis message**, type `/pkpd`, then select **pkpd-modeling** from the suggestions. Confirm that it becomes a Skill chip before pasting the prompt.

**Version note:** The screenshots use v0.30.1, where the Skill is selected explicitly for each analysis message. From v0.30.2, bound Skills are prepared for Specialist turns and delegated tasks. Select the Specialist first; if its Skill is unavailable, select `/pkpd-modeling` explicitly before sending the request.

![Installed Pharmacometrics Specialist and package version](/img/open-science/theoph-specialist/installed.webp)

![Selecting the genuine pkpd-modeling Skill for the current message](/img/open-science/theoph-specialist/skill-selection.webp)

## 2. Check the data and draw the concentration curves

With the Skill selected, send:

```text
Use the public R dataset datasets::Theoph in the enabled R Notebook.
Use base R only. Check rows, subjects, observations per subject,
missing values, duplicate subject-time records and the documented units.
Keep all observed time-zero concentrations unchanged.
Save theoph-input.csv, theoph-concentration-time.png and theoph-data-check.md.
Plot all 12 subjects with labelled axes and a legend.
Execute the code, reopen the saved files and report the actual checks.
Stop after this descriptive baseline. Do not calculate NCA metrics yet.
Do not install packages or delegate. Keep everything in English.
```

Inspect the code when **Run R code?** appears, then approve the calculation. Open **Notebook** to see the execution output. The recorded input has **132 rows, 12 subjects and 11 observations per subject**, with no missing values or duplicate subject-time records.

Open the generated CSV and plot. Subjects 1, 7 and 10 have nonzero concentrations at time zero; these are retained. The dataset's subject factor is ordered by maximum concentration, so its displayed order need not be numeric.

The CSV preview shows the first 100 rows; the saved input file contains all 132 observations.

![The saved input table in Open-Science](/img/open-science/theoph-specialist/input.webp)

![The executed baseline and twelve concentration-time curves](/img/open-science/theoph-specialist/baseline.webp)

Reference files: <ExampleDownload path="/examples/theoph/theoph-input.csv">input CSV</ExampleDownload>, <ExampleDownload path="/examples/theoph/theoph-concentration-time.png">concentration plot</ExampleDownload>, <ExampleDownload path="/examples/theoph/theoph-data-check.md">data check</ExampleDownload>.

## 3. Add the exposure metrics

Download the <ExampleDownload path="/examples/theoph/nca-conventions.md">NCA methods reference</ExampleDownload> and add it through **+ → Attach files** so Notebook can read it. Use this reference for the example: it specifies observed Cmax/Tmax and all-linear trapezoidal AUC, without estimating a terminal slope.

Select `/pkpd-modeling` again in the same conversation, then send:

```text
Read the attached reviewed nca-conventions.md methods reference.
Extend the baseline using the same theoph-input.csv and base R Notebook.
For each subject calculate observed Cmax (mg/L), earliest observed Tmax (h),
linear-trapezoidal AUC from time zero to the last observation (mg*h/L),
and the actual last-observation time (h).
Retain all observed time-zero values. Preserve the input hash.
Save theoph-nca-summary.csv, theoph-nca.R and theoph-nca-report.md.
The standalone script must read the CSV. Execute it, reread all 12 rows,
and compare its results with a separate Notebook calculation.
Explain the method, units, differing observation windows and limitations.
Register the three saved outputs as project files.
Do not estimate AUC to infinity, half-life, clearance or dosing advice.
Do not install packages, change permissions or delegate. Use English.
```

Inspect and approve the file reads and R calculation. If a supporting file is missing, attach it before continuing. If Notebook reports an error, open the failed cell and correct the named input or dependency before retrying.

## 4. Open and check the results

Open **theoph-nca-summary.csv** from the generated files. There should be one row for each of the twelve subjects. Check the units and the last-observation time as well as the metric values.

![Saved subject-level exposure metrics](/img/open-science/theoph-specialist/results.webp)

| Subject | Cmax (mg/L) | Tmax (h) | AUC₀–last (mg·h/L) | Last observation (h) |
| --- | --- | --- | --- | --- |
| 1 | 10.5 | 1.12 | 148.92305 | 24.37 |
| 2 | 8.33 | 1.92 | 91.52680 | 24.30 |

Open **theoph-nca-report.md** and **theoph-nca.R** together. The report should match the executed script: sort each subject's observations by time, take the observed maximum and its earliest time, then sum `(C1 + C2) × (t2 - t1) / 2` over adjacent observations. The first two rows above provide a quick comparison; check all twelve rows before accepting a rerun.

These are observed metrics. Last sampling times differ between subjects, and the linear trapezoidal rule is an explicit approximation. The results do not establish exposure to infinity, a fitted pharmacokinetic model or measurement uncertainty.

Download the recorded <ExampleDownload path="/examples/theoph/theoph-nca-summary.csv">summary CSV</ExampleDownload>, <ExampleDownload path="/examples/theoph/theoph-nca.R">R script</ExampleDownload> and <ExampleDownload path="/examples/theoph/theoph-nca-report.md">methods report</ExampleDownload>. Keep the input and script together when rerunning outside the app.

<span id="choose-a-finish-you-can-inspect" />
<span id="choose-inputs-for-an-installed-role" />
<span id="turn-an-existing-result-into-a-checked-methods-draft" />
<span id="inspect-qc-variation-with-the-packaged-pca-skill" />
<span id="transform-a-count-matrix-for-exploratory-plots" />
<span id="build-a-bounded-evidence-table-and-reanalysis-plan" />
<span id="handle-a-partially-completed-analysis" />
<span id="metadata-retrieval-blocked-by-the-local-network" />
<span id="keep-metadata-retrieval-separate-from-completed-analysis" />
