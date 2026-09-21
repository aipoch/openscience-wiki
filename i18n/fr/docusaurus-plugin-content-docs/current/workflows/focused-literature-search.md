---
title: "Recherche dans des revues et des dates spécifiées"
last_update:
  date: '2026-09-16'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Recherche dans des revues et des dates spécifiées {/* #search-within-specified-journals-and-dates */}

<p className="example-label"><strong>Exemple pratique</strong> Essais d'intervention sur la conscience dans deux revues, 2019–2025</p>

Une recherche ciblée nécessite des limites explicites et un relevé de ce qui a été examiné. Cet exemple utilise PubMed pour récupérer les publications relatives à la pleine conscience dans **JAMA Psychiatrie** et **Recherche et thérapie comportementales**, puis sépare les rapports d'essais randomisés des rapports d'autres publications. Il produit un tableau complet de dépistage et une note de recherche, et non des recommandations de traitement ou un examen systématique.

## 1. Définir la question et la règle d'éligibilité {/* #1-set-the-question-and-eligibility-rule */}

Ouvrez un projet et sélectionnez un modèle connecté. Confirmer que **PubMed** Connector est disponible dans **Settings → Connectors**; configurer les informations de contact là-bas si demandé. Aucun document téléchargé n'est nécessaire pour démarrer cet exemple.

Utilisez les dates de publication **2019-01-01 par 2025-12-31**, et non la date à laquelle un enregistrement de base de données a été ajouté. Inclure les rapports randomisés primaires avec un bras d'intervention de pleine conscience défini et les résultats déclarés des participants. Conserver une catégorie **incertain** distincte pour les interventions mixtes, l'état de publication imprécis ou les dates contradictoires. Les résultats mécanistes à eux seuls ne font pas d'un rapport une analyse secondaire.

```text
Search PubMed for mindfulness intervention randomized trial reports
published in JAMA Psychiatry or Behaviour Research and Therapy from
2019-01-01 through 2025-12-31. Preserve the exact query, date field,
search date, total count, retrieved count and truncation status.
Inspect complete returned abstracts and metadata, not titles alone.
Keep every candidate in mindfulness-search-audit.csv with title,
journal, date, PMID, DOI, source links, included/excluded/uncertain
and a study-specific reason. Include primary randomized reports with
a defined mindfulness arm and participant outcomes. Flag mixed
interventions and unclear primary/secondary status as uncertain.
Save mindfulness-search-notes.md and the raw returned records.
Do not retrieve full text or infer clinical recommendations.
Write in English, do not delegate, and reopen the saved files.
```

![La demande de recherche ciblée réelle dans Open-Science](/img/open-science/workflow-extensions/focused-search-input.webp)

## 2. Vérifiez la requête et la couverture {/* #2-check-the-query-and-coverage */}

La course a soumis cette question concept-and-journal, avec le filtre de date de publication fourni séparément:

```text
("mindfulness"[Title/Abstract] OR "mindfulness-based"[Title/Abstract])
AND ("JAMA Psychiatry"[Journal] OR "Behaviour Research and Therapy"[Journal])
```

Ouvrez **Notebook** ou élargissez l'activité PubMed. Confirmez le champ journal, les dates et le nombre retourné. Le septembre, 16, 2026, la recherche a retourné **Enregistrements 62**; Tous les 62 ont été récupérés, avec `has_more = false`. Les chiffres peuvent changer à mesure que PubMed met à jour son index. Si votre résultat est tronqué, récupérer les pages restantes avant de prétendre que tous les résultats de recherche ont été vérifiés.

La question de concept large conserve délibérément les non-procès. L'admissibilité à l'essai est une décision de présélection distincte. L'indexation du type de publication seule peut être incomplète, et un article mentionnant un essai randomisé précédent n'en rapporte pas nécessairement un nouveau.

## 3. Examiner et corriger le tableau de présélection {/* #3-review-and-correct-the-screening-table */}

Une fois la réponse terminée, ouvrez **mindfulness-search-audit.csv** sous **Generated**. Il devrait conserver chaque PMID récupéré, y compris les enregistrements exclus et incertains. Vérifiez le titre, la revue, DOI et la date par rapport à l'enregistrement PubMed lié, puis comparez la décision avec l'abrégé.

![Le tableau des candidats sauvegardés, y compris les dossiers incertains et exclus](/img/open-science/workflow-extensions/focused-search-table.webp)

Vérifiez chaque raison d'exclusion par rapport à l'abstrait. PMID **38837133** est un essai primaire randomisé d'une psychothérapie plus large; l'exemple marque son admissibilité à la pleine conscience **incertain**. PMID **34009273** est une méta-analyse et est exclue. Lorsqu'une décision doit être corrigée, nommez l'enregistrement et la question spécifique, demandez à l'Agent de mettre à jour le CSV, puis rouvrez le fichier sauvegardé.

![La révision de la sélection et les vérifications de fichier sauvegardées dans Notebook](/img/open-science/workflow-extensions/focused-search-notebook.webp)

Le tableau d'exemples examiné contient **20 inclus, 37 exclu et 5 enregistrements incertains**, qui comptabilise tous les résultats **62**. Il s'agit de décisions de présélection au niveau abstrait, et non d'une déclaration selon laquelle les essais distincts de 20 ont été pleinement évalués. Plusieurs publications peuvent concerner le même essai sous-jacent.

## 4. Garder l'incertitude visible {/* #4-keep-uncertainty-visible */}

PMID **41418645** a été retourné par le filtre de publication 2019–2025 PubMed, tandis que ses métadonnées indiquent une date d'impression **2026-01**. Conservez l'écart et vérifiez l'historique de la publication avant de prendre une décision définitive sur la date. Ne remplacez pas silencieusement l'année pour s'adapter à la fenêtre de recherche.

Ouvrez **mindfulness-search-notes.md** et vérifiez que ses nombres, ses règles d'admissibilité et ses limites correspondent à la CSV. Conservez l'instantané original des métadonnées à côté de ces fichiers afin que chaque décision puisse être retracée à sa source.

![La note de recherche révisée avec les nombres de dépistage 20/37/5](/img/open-science/workflow-extensions/focused-search-notes.webp)

Téléchargez les <ExampleDownload path="/examples/workflow-extensions/mindfulness-search-audit.csv">Tableau des candidats examinés</ExampleDownload> et <ExampleDownload path="/examples/workflow-extensions/mindfulness-search-notes.md">Note de recherche</ExampleDownload>. Les résumés complets ne sont pas redistribués ici; suivre les liens sources pour les inspecter.

Pour un examen officiel de la preuve, régler les dossiers incertains, obtenir des textes complets, lier les rapports d'accompagnement à leurs essais et organiser un examen indépendant approprié. Utilisez [le flux de travail de la liste de lecture](core-reading-list.md) pour construire une collection, ou [extraction de preuves](literature-review.md) après l'installation de la source et l'accès.
