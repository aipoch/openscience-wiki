---
title: "Formats Skill, Specialist et MCP"
last_update:
  date: '2026-09-08'
---

# Formats Skill, Specialist et MCP {/* #skill-specialist-and-mcp-formats */}

Les modèles Skills, Specialists et Connector ont des limites de paquets différentes. Cette référence énumère leurs champs et leurs budgets d'importation. Inspectez l'aperçu des archives avant d'importer, puis vérifiez le résultat de l'installation.

## Skill document et ressources {/* #skill-document-and-resources */}

Une racine Skill contient `SKILL.md`; les références et les scripts vivent sous la même racine de paquet. Son bloc de métadonnées est YAML suivi des instructions Markdown.

<p className="example-label"><strong>Exemple</strong> Un document SKILL.md minimal</p>

```markdown
---
name: public-data-audit
description: Audit an attached public dataset before descriptive analysis.
---

# Public data audit

Read the supplied input, retain its source and checksum, and report
missingness, units and validation limits before creating derived files.
```

L'analyseur sépare `name` et `description` d'autres métadonnées, normalise les terminaisons de lignes et maintient les valeurs de métadonnées scalaires comme chaînes. Vérifiez le résultat de validation import/editor avant de publier le paquet.

| Élément de paquetage | Utilisation | Limite |
| --- | --- | --- |
| `name` | Identité d'invocation stable | Conservez la cohérence avec les références au colis |
| `description` | Lorsque l'agent doit sélectionner le Skill | N'exécute rien par lui-même |
| Corps de marquage | Instructions chargées sur l'invocation | Une instruction étayée n'est pas une preuve que sa dépendance externe existe |
| Ressources relatives | Scripts, modèles, références et données | Conserver les chemins référencés dans la structure du paquet |
| `.source.json`, `.specialist-package.json` à la racine | Métadonnées détenues par l'application | Exclus du budget global autorisé par l'utilisateur; ne pas inventer ou réutiliser ces fichiers |

### Budgets des importations de Skill {/* #skill-import-budgets */}

| Limite | Valeur |
| --- | ---: |
| Fichiers dans un Skill | 16,384 |
| Fichier décompressé individuel | 50 MiB |
| Total décompressé Skill | 128 MiB |
| Agrégation du contenu brut SKILL.md dans une réponse d'aperçu | 4 MiB |
| Répertoire de nidification | Niveaux 8 |
| GitHub demande par importation | 512 |
| archive compressée de Skill | 64 MiB |
| Paquet externe téléchargé | 256 MiB |
| Skills par paquet | 256 |
| Entrées extérieures de paquets | 32,768 |

Les budgets s'appliquent à différents niveaux. Un faisceau situé en dessous de sa limite extérieure peut encore contenir un Skill qui dépasse une limite intérieure. Examiner les diagnostics de chaque candidat; n'interprètent pas l'importation partielle comme un succès pour chaque candidat. Dossier de référence personnel-éditeur compte réservez une entrée de paquet pour SKILL.md.

[Analyseur Skill](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-frontmatter.ts), [Limites d'importation partagées](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/skill-import-limits.ts).

## Paquet Specialist {/* #specialist-package */}

Un paquet portable Specialist contient `manifest.json` et `specialist.json`. Les ressources groupées Skill utilisent `skills/<skill-name>/<file>`, avec `SKILL.md` dans chaque racine Skill. Son nom de première matière doit correspondre à ce nom de répertoire.

| Fichier / champ | Contrat |
| --- | --- |
| `manifest.json → schema_version` | `1` |
| `id` | l'identité du colis; Les ID de contribution utilisent des lettres, des chiffres et des hyphes minuscules et évitent les réserves `os-` / `mcp-` Préfixes |
| `version` | Version sémantique |
| `exported_with_app_version` | Exporter la version de l'application |
| `specialist.json → name` | Nom du profil stable Specialist |
| `display_name` | Nom de présentation facultatif |
| `description` | Description du rôle |
| `system_prompt` | instructions Specialist; snake_case à la limite du colis |
| `skill_ids` | Tableau des noms Skill non vides sans duplicata |
| `connector_ids` | Tableau des noms Connector non vides sans duplicata |

Les champs inconnus ou interdits sont rejetés. Les charges utiles en mémoire utilisent camelCase (`systemPrompt`, `skillIds`, `connectorIds`), qui ne doit pas être confondu avec l'orthographe portable du champ JSON. Les noms portables Connector peuvent être résolus sur les identifiants locaux de la machine lors de l'importation; les références de paquet ne portent pas d'identificateurs de machine.

| Specialist limite d'archive | Valeur |
| --- | ---: |
| Taille comprimée | 50 MiB |
| Taille non comprimée | 200 MiB |
| Nombre de fichiers | 2,000 |
| Dossier individuel | 25 MiB |
| Taux de compression | 1,000 |
| Profondeur du sentier | 32 |

L'aperçu d'importation indique les diagnostics, qu'il soit installable et chaque disposition Skill : installer, réutiliser, confronter ou remplacer. Une écrasement nécessite une confirmation explicite. Un candidat inexistant ou expiré doit être à nouveau prévu; ne rejouez pas aveuglément son jeton. Les conflits Skill nécessitent un choix explicite installé/incoming.

Exporte utilise une révision attendue et sélectionné Skills inclus. La suppression utilise également un aperçu/révision et protège Skills intégré, compatible avec le secteur principal, partagé ou référencé. La suppression d'un Specialist n'est pas équivalente à la suppression de chaque Skill auquel il peut accéder.

[Types de paquets et budgets d'archives](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/specialist-package.ts), [validation de l'emballage](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/specialist/package/validator.ts).

## Modèle Connector et exportation client MCP {/* #connector-template-and-mcp-client-export */}

Un modèle Open-Science Connector n'est pas le même document JSON que la configuration `mcpServers` d'un client MCP.

| Champ modèle | Contrat |
| --- | --- |
| `schema_version` | `1` |
| `kind` | `open-science.connector` |
| `name` | Nom personnalisé stable, jusqu'à des caractères 64, lettres/chiffres/hyphènes minuscules; unique et non un nom réservé intégré |
| `display_name` | Étiquette lisible par l'homme |
| `description` | Explication facultative |
| `transport` | `stdio`, `streamable_http`ou `sse` |
| `command`, `args` | exécutable local stdio et liste des arguments |
| `url` | Terminal distant HTTP/SSE |
| `required_secrets.environment` | Noms des secrets environnementaux pour stdio; pas leurs valeurs |
| `required_secrets.headers` | Noms des secrets d'en-tête HTTP; pas leurs valeurs |
| `required_secrets.oauth_client_secret` | Indique si un secret client OAuth doit être fourni localement |
| `oauth` | Enregistrement/émetteur/scopes/client/métadonnées indirectes |

La validation spécifique au transport s'applique: les transports à distance n'incluent pas les secrets environnementaux requis; OAuth et les secrets d'en-tête requis ne peuvent pas être combinés. Un client OAuth pré-enregistré a besoin de son serveur d'autorisation; l'enregistrement des métadonnées client et l'identification explicite du client sont des modes distincts. Les métadonnées redirectes/secrètes du client nécessitent l'identifiant du client correspondant.

Les exportations portatives rejettent les identifiants intégrés dans les URL et les arguments de commande. L'exportation client MCP utilise `mcpServers`, `command`/`args`/`env` pour stdio ou `type`/`url`/`headers` pour le transport à distance, avec des supports de place secrets. L'enregistrement et les jetons OAuth sont exclus de ce format client, et l'exportation signale la limitation.

L'importation de configuration n'installe pas le serveur externe, ne se connecte pas à son service ou n'établit pas l'exécution réussie de l'outil. Confirmer l'état de connexion et inspecter les outils annoncés après avoir fourni des identifiants à travers l'application.

[Analyseur de modèles et les deux formats d'exportation](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/settings/connector-template.ts), [identité personnalisée Connector](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/custom-connector.ts).
