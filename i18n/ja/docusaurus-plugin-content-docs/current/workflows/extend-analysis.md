---
title: "インストールしたSpecialistで解析を拡張する"
last_update:
  date: '2026-09-17'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# インストールしたSpecialistで解析を拡張する {/* #extend-an-analysis-with-an-installed-specialist */}

<p className="example-label"><strong>実践例</strong> 観察された露出のメートルが付いているtheophyllineの集中のプロットを拡張して下さい</p>

**Pharmacometrics PK/PDの設計Specialist** を使用して、集中時間データをチェックし、プロファイルを描画し、暴露メトリックを計算します。 成果物は12個のサブジェクトテーブル、集中プロット、実行可能なRスクリプト、メソッドレポートです。 この例では、パブリックリサーチデータについて説明しています。 治療や投与をお勧めしません。

入力はRの公開[Theoph データセット](https://www.stat.ethz.ch/R-manual/R-devel/library/datasets/html/Theoph.html):132の12の被写体からの観察です。 時間は、mg / Lの濃度、mg / kgの体重およびmg / kgの用量で時間内にあります。 計算は、追加のパッケージやデータベースの資格情報なしで、ベースRを使用します。

## 1. Specialistのインストールと選択 {/* #1-install-and-select-the-specialist */}

1. **Settings → Specialists → Browse Marketplace** を開きます。 **Pharmacometrics PK/PDの設計Specialist**を見つけ、その機能をチェックし、インストールします。 この例では、Open-Science **0.30.1** でパッケージ **1.0.0** を使用します。
2. **Settings → Runtimes**では、Rが**Ready**で有効になっていることを確認します。 記録された実行はR **4.4.3**を使用しました。
3. 研究プロジェクトで新しい会話を開く。 利用可能なモデルを選択し、**Agent controls → Specialist → pharmacometrics-pkpd-designer** を選択します。 記録された実行は**Codexサブスクリプション/gpt-5.6-sol**を使用しました。
4. **各解析メッセージ** の開始時、`/pkpd` をタイプして下さい、そして提案から **pkpd モデリング** を選んで下さい。 プロンプトを貼り付ける前に Skill チップになることを確認してください。

**バージョンノート:** スクリーンショットは、v0.30.1 を使用しており、Skill は各解析メッセージに対して明示的に選択されます。 から から v0.30.2, 境界 Skills 準備完了です Specialist ターンと委任されたタスク. Specialist を最初に選択します。 Skillが利用できない場合は、リクエストを送信する前に`/pkpd-modeling`を明示的に選択してください。

![ファーマコメトリクスSpecialistおよびその機能をインストール](/img/open-science/theoph-specialist/installed.webp)

![現在のメッセージの本物pkpd-modeling Skillの選択](/img/open-science/theoph-specialist/skill-selection.webp)

## 2. データをチェックし、集中曲線を描画 {/* #2-check-the-data-and-draw-the-concentration-curves */}

選択したSkillで、送信:

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

**Run R code?** が現れたときにコードを調べて、計算を承認します。 **Notebook** を開き、実行出力を確認します。 記録された入力には、欠落した値や重複した記録がない **132行、12件、11件ごとの観測** があります。

生成されたCSVとプロットを開きます。 1、7および10の主題はゼロで非ゼロの集中を持っています; これらは保持されます。 データセットの対象因子は、最大濃度で注文されるため、表示された注文は数値ではありません。

CSV プレビューには最初の 100 行が表示されます。保存された入力ファイルには、132 件の観測値がすべて含まれています。

![Open-Scienceの保存された入力テーブル](/img/open-science/theoph-specialist/input.webp)

![実行されたベースラインと12の集中タイムカーブ](/img/open-science/theoph-specialist/baseline.webp)

参照ファイル: <ExampleDownload path="/examples/theoph/theoph-input.csv">入力 CSV</ExampleDownload>、<ExampleDownload path="/examples/theoph/theoph-concentration-time.png">集中のプロット</ExampleDownload>、<ExampleDownload path="/examples/theoph/theoph-data-check.md">データチェック</ExampleDownload>。

## 3. 露出メトリックの追加 {/* #3-add-the-exposure-metrics */}

<ExampleDownload path="/examples/theoph/nca-conventions.md">NCAメソッド参照</ExampleDownload>をダウンロードし、**+ → Attach files**を介して追加して、Notebookはそれを読み込むことができます。 この参考例:ターミナルスロープを推定することなく、観察されたCmax/TmaxとオールリニアトペジドAL AUCを指定します。

同じ会話で再び`/pkpd-modeling`を選択し、次のメッセージを送る:

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

ファイルの読み込みとRの計算を調べて承認します。 ファイルが不足している場合は、続行する前に添付してください。 Notebook がエラーを報告したら、失敗したセルを開き、再試行する前に名前付き入力または依存関係を修正します。

## 4. 結果のオープンとチェック {/* #4-open-and-check-the-results */}

生成されたファイルから **theoph-nca-summary.csv** を開きます。 12件ごとに1行ずつあるはずです。 単位および最後の観察時間およびメトリック値を確認してください。

![被写体レベルの暴露メトリックの保存](/img/open-science/theoph-specialist/results.webp)

| 演題名: | Cmax (mg/L) | Tmax (h) | AUC0-last(mg・h/L) | 最後の観察(h) |
| --- | --- | --- | --- | --- |
| 1 | 10.5 | 1.12 | 148.92305 | 24.37 |
| 2 | 8.33 | 1.92 | 91.52680 | 24.30 |

**theoph-nca-report.md**と**theoph-nca.R**を一緒に開く。 レポートは、各被験者の観察を時間ごとにソートし、観察された最大値と初期値の時刻を合わせ、その後、隣接する観察値で`(C1 + C2) × (t2 - t1) / 2`を合計する必要があります。 上記の最初の2列は、迅速な比較を提供します。 再実行を受け入れる前に、すべての12行をチェックしてください。

これらは、測定値が観察される。 最後のサンプリング時間は被写体と異なるため、線形台形ルールは明示的な近似です。 結果は無限、適当な薬剤のモデルまたは測定のuncertaintyへの露出を確立しません。

録画した<ExampleDownload path="/examples/theoph/theoph-nca-summary.csv">概要 CSV</ExampleDownload>、<ExampleDownload path="/examples/theoph/theoph-nca.R">Rスクリプト</ExampleDownload>、<ExampleDownload path="/examples/theoph/theoph-nca-report.md">方法報告</ExampleDownload>をダウンロードしてください。 アプリの外部から再実行する際に、入力とスクリプトを一緒に保持します。

<span id="choose-a-finish-you-can-inspect" />
<span id="choose-inputs-for-an-installed-role" />
<span id="turn-an-existing-result-into-a-checked-methods-draft" />
<span id="inspect-qc-variation-with-the-packaged-pca-skill" />
<span id="transform-a-count-matrix-for-exploratory-plots" />
<span id="build-a-bounded-evidence-table-and-reanalysis-plan" />
<span id="handle-a-partially-completed-analysis" />
<span id="metadata-retrieval-blocked-by-the-local-network" />
<span id="keep-metadata-retrieval-separate-from-completed-analysis" />
