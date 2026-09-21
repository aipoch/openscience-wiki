---
title: "Skill、Specialist、MCPフォーマット"
last_update:
  date: '2026-09-08'
---

# Skill、Specialist、MCPフォーマット {/* #skill-specialist-and-mcp-formats */}

Skills、スペシャリスト、Connectorテンプレートは異なるパッケージ境界を持っています。 この参照は、フィールドとインポート予算をリストします。 インポートする前にアーカイブプレビューを調べて、インストール結果を確認してください。

## Skillドキュメントとリソース {/* #skill-document-and-resources */}

Skillの根は`SKILL.md`を含んでいます; 参照とスクリプトは同じパッケージルートの下に住んでいます。 そのメタデータブロックは、Markdownの指示に従ってYAMLです。

<p className="example-label"><strong>例</strong> 最小限のSKILL.md文書</p>

```markdown
---
name: public-data-audit
description: Audit an attached public dataset before descriptive analysis.
---

# Public data audit

Read the supplied input, retain its source and checksum, and report
missingness, units and validation limits before creating derived files.
```

パーサは、`name` と `description` を他のメタデータから分離し、ラインエンディングを正規化し、スカラーメタデータを文字列として保持します。 パッケージを公開する前に、インポート/編集検証結果を確認してください。

| パッケージ要素 | 利用条件 | バウンダリー |
| --- | --- | --- |
| `name` | 安定した呼び出しアイデンティティ | パッケージへの参照と一貫して保つ |
| `description` | エージェントが Skill を選択する必要がある場合 | 自分で何も実行しない |
| マークダウンボディ | 呼び出し時に読み込まれる指示 | サポートされている指示は、外部の依存性が存在するという証拠ではありません。 |
| 相対リソース | スクリプト、テンプレート、リファレンス、データ | パッケージ構造の中の参照されたパスを保って下さい |
| `.source.json`, `.specialist-package.json` ルートで | アプリ所有のメタデータ | ユーザ権限のパッケージの予算から除外されます。 これらのファイルを発明したり、再利用したりしないでください。 |

### Skill インポート予算 {/* #skill-import-budgets */}

| 上限 | 値 |
| --- | ---: |
| 1つのSkillのファイル | 16,384 |
| 個々の非圧縮ファイル | 50のMiB |
| 総分解能 Skill | 128のMiB |
| 1つのプレビュー応答で生SKILL.mdコンテンツを集計 | 4のMiB |
| ディレクトリ ネスティング | 8 レベル |
| インポートごとのGitHubリクエスト | 512 |
| ネスト圧縮Skillアーカイブ | 64のMiB |
| アップロードされていないバンドル | 256のMiB |
| バンドルごとのSkills | 256 |
| 外側のバンドルエントリ | 32,768 |

予算は異なるレベルで適用されます。 外側の限界の下の束は内部限界を越えるSkillをまだ含んでいます。 各候補者の診断を見直して下さい; すべての候補者が成功する部分的な輸入を解釈しません。 個人的な編集者参照ファイルでは、SKILL.md の1つのパッケージエントリが保存されます。

[Skillパーサ](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-frontmatter.ts), [共有インポートの制限](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-import-limits.ts).

## Specialistパッケージ {/* #specialist-package */}

Specialistパッケージには`manifest.json`と`specialist.json`が含まれています。 Skill リソースは `skills/<skill-name>/<file>` をバンドルし、Skill ルートごとに `SKILL.md` を使用します。 フロントマッター名はディレクトリ名と一致しなければなりません。

| ファイル/フィールド | 契約条件 |
| --- | --- |
| `manifest.json → schema_version` | `1` |
| `id` | パッケージのアイデンティティ; 貢献IDは、小文字/数字/ハイフンを使用して、予約を拒否します `os-` / `mcp-` プレフィックス |
| `version` | Semanticバージョン |
| `exported_with_app_version` | アプリケーションバージョンのエクスポート |
| `specialist.json → name` | 安定した Specialist プロファイル名 |
| `display_name` | オプションのプレゼンテーション名 |
| `description` | 役割記述 |
| `system_prompt` | Specialistの指示; パッケージ境界でsnake_case |
| `skill_ids` | 重複せずに非空のSkillの名前の配列 |
| `connector_ids` | 重複せずに非空のConnectorの名前の配列 |

未知、または禁止されたフィールドは拒否されます。 メモリーペイロードは、ポータブルJSONフィールドのスペルと混同してはならない、キャメルケースゼ(`systemPrompt`、`skillIds`、`connectorIds`)を使用します。 ポータブルConnectorの名前は、インポートのマシンローカルIDに解決できます。 パッケージの参照は機械資格情報を運びません。

| Specialist アーカイブの制限 | 値 |
| --- | ---: |
| 圧縮サイズ | 50のMiB |
| 圧縮されていないサイズ | 200のMiB |
| ファイル数 | 2,000 |
| 個々のファイル | 25のMiB |
| 圧縮比 | 1,000 |
| パスの深さ | 32 |

インポートプレビューは、インストール可能であり、各Skillの異議であっても、診断を報告します。インストール、再利用、競合または交換します。 オーバーライトは明示的な確認が必要です。 失効または失効した候補者は、再びプレビューする必要があります。 トークンをブラインドリプレイしないでください。 Skillの競合は、明示的なインストール/着信選択を必要とします。

エクスポートは、予想されるリビジョンを使用しており、Skillsが含まれています。 また、プレビュー/リビジョンを使用して、ビルトイン、メイン有効、共有または参照されたSkillsを保護します。 1つのSpecialistを取除くことはアクセスできるすべてのSkillの削除と等しいではないです。

[パッケージの種類とアーカイブ予算](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/specialist-package.ts), [パッケージの検証](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/specialist/package/validator.ts).

## ConnectorテンプレートとMCPクライアントエクスポート {/* #connector-template-and-mcp-client-export */}

Open-Science ConnectorテンプレートはMCPクライアントの`mcpServers`設定と同じJSONドキュメントではありません。

| テンプレートフィールド | 契約条件 |
| --- | --- |
| `schema_version` | `1` |
| `kind` | `open-science.connector` |
| `name` | 64文字までの安定したカスタム名、小文字/数字/ハイフン; ユニークで、組み込みの予約名ではありません |
| `display_name` | ヒューマン対応ラベル |
| `description` | オプションの説明 |
| `transport` | `stdio`, `streamable_http`, または `sse` |
| `command`, `args` | ローカルstdio実行可能と引数リスト |
| `url` | リモート HTTP/SSE エンドポイント |
| `required_secrets.environment` | stdioの環境の秘密の名前; 値ではなく |
| `required_secrets.headers` | HTTPヘッダーの秘密の名前。 値ではなく |
| `required_secrets.oauth_client_secret` | OAuth クライアントの秘密がローカルに供給されるかどうか |
| `oauth` | 登録/発行/スコープ/クライアント/リダイレクトメタデータ |

輸送固有の検証が適用されます:リモートトランスポートには、必要な環境の秘密が含まれていません。 OAuth と必須ヘッダーの秘密を組み合わせることはできません。 OAuth クライアントの事前登録には、認証サーバーが必要です。 クライアントのメタデータ登録と明示的なクライアントIDは別のモードです。 Redirect/client-secret メタデータは、対応するクライアント ID が必要です。

ポータブルエクスポートは、埋め込まれた認証情報をURLとコマンド引数で拒否します。 MCP クライアントエクスポートは、`mcpServers`、`command`/`args`/`env` を stdio または `type`/`url`/`headers` をリモートトランスポート用に使用し、秘密のプレースホルダ付き。 OAuth の登録とトークンはクライアントの形式から除外され、エクスポートは制限を報告します。

インポート構成は、外部サーバーをインストールせず、そのサービスにサインインしたり、成功したツールの実行を確立したりしません。 接続状態を確認し、アプリケーションを通じて認証情報を供給した後に広告されたツールを検査します。

[テンプレートパーサとエクスポートフォーマットの両方](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/settings/connector-template.ts), [カスタム Connector アイデンティティ](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/custom-connector.ts).
