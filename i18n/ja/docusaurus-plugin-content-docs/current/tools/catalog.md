---
title: "科学ツールカタログ"
last_update:
  date: '2026-11-11'
---

# 科学ツールカタログ {/* #scientific-tool-catalog */}

このカタログを使用して、Open-Scienceエントリーポイントと科学的方法のランタイム要件を検索します。 すべてのリストされたプログラムをインストールしたアプリケーションページではなく、ドキュメントインデックスです。

## ソフトウェアファミリーとその実行場所 {/* #software-families-and-where-they-run */}

| ソフトウェアファミリー | Open-Scienceエントリー | 確認するセットアップ | はじめてのチェック |
| --- | --- | --- | --- |
| Python標準ライブラリとプロット | セッションNotebook | Python通訳者を選択します。 依存関係をプロットする | 実質QC CSVを読んで、小さいプロットを作り出して下さい |
| R/ベースR | セッションNotebook; 設定 → 実行時間 → R | アプリ管理または検出された通訳者を有効にする | R版を印刷し、サンプルの要約を再現 |
| 構造予測フレームワーク | 関連するバンドル Skill, 通常 計算 | 互換性のあるGPU、パッケージ、重量、入力形式、外部MSAアクセス | 1つの小さな有効なシーケンス/コンプレックスおよびその出力の自信 |
| MPNNシーケンスデザインプログラム | ProteinMPNN/LigandMPNN/SolubleMPNN Skills | リポジトリ/チェックポイントとPythonの依存関係; これらの指示により、小さなCPUジョブがサポートされています。 | 明示的な固定/設計位置が付いている1つのバックボーン |
| 単一セルフレームワーク | scGPT/scvi-tools Skills | AnnData、セル/遺伝子ラベル、パッケージおよび適切な計算 | トレーニング前に入力寸法と必要な層を検証 |
| 分子構造のレンダリング | Molecule Connector/分子ビューア | 作り付けのオフラインOpenChemLibのルート | 保存してaspirin.molを再オープン |
| ファイルレンダラー | ファイルのプレビュー | 拡張機能とプレビューサイズの制限 | 実際のダウンロードしたファイルを開きます |
| リモートバッチソフトウェア | コンピュートホストとリモートコンピュートSkills | ホストアクセス、スケジューラ、名前付き環境 | ホストプローブは、境界ジョブが続く |

24-Skill メソッドテーブルの完成度は [Skillディレクトリ](../skills/directory.md) を参照してください。 このページでは、ソフトウェアの信頼性について説明しています。 Skill の全ての手順を複製しません。

## 選択した環境を調べる {/* #inspect-the-selected-environment */}

**Settings → Runtimes** を使用して、利用可能な Python/R 通訳者を検査します。 実際にセッションにバインドしたランタイムを選択し、そこにパッケージを調べます。 コンピュータの他の場所で実行可能は、自動的にアクティブNotebookインタープリタではありません。

[ランタイム](../guides/runtimes.md) を使用して、通訳者と [Notebook](../guides/notebook.md) を準備して、計算を検証します。 追加のパッケージが必要な場合は、インストールを確認して、その環境にインポートします。 ダウンロード障害については、影響を受けるホスト名とエラーを使用して[ネットワーク](../guides/network.md)に従ってください。

## モデルのインストールコマンドに従う前に {/* #before-following-a-models-install-command */}

インストールされたSkillの正確な要件と選択した環境のサポートされているセットアップルートをお読みください。 パッケージ名衝突をチェック: **フェア・エスム** と Biohub **エスエム** の実装は、`esm` の名前空間を共有しているにもかかわらず異なる。 ダウンロードしたモデルのコードと重量も異なるバージョンとアクセス条件を持つことができます。

Notebook は、[科学ツール](./scientific.md) でサポートされているパッケージ管理フローを使用します。 リモートホストでは、[遠隔計算](../guides/remote-compute.md) を使用します。 PDB を表示しているレンダラーは、構造を表示できることを証明します。 AlphaFold または別の予測プログラムがインストールされていない。

実装参照: [マニフェスト.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json)、[SKILL.mdの特長](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md)、[ノートブックランタイム.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook-runtime.ts)。

[バックグラウンドタスク](../guides/notebook.md#background-tasks-and-result-delivery)を使用して、サポートされた長時間の作業を追跡し、成果を検査します。 科学的パッケージは、選択したランタイムで利用できる必要があります。
