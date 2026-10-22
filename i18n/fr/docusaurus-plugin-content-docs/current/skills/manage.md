---
title: "Gérer et valider Skills"
last_update:
  date: '2026-10-22'
---

# Gérer et valider Skills {/* #manage-and-validate-skills */}

Importez une méthode testée à partir de fichiers locaux ou GitHub, exportez des copies et maintenez Skills installé. Exportez d'abord une méthode si vous avez besoin de conserver sa version actuelle.

Dans la gestion des lots, examiner le nombre sélectionné dans la zone d'action inférieure avant d'appliquer une opération. Lisez les commentaires d'achèvement ou d'échec là-bas, puis vérifiez les éléments résultants. Sélectionner une entrée seule ne l'active pas, ne l'installe pas ou ne la supprime pas.

## Installer à partir du marché {/* #marketplace */}

Pour la navigation, l'installation et les mises à jour du catalogue, suivez le [Guide du marché Skill](marketplace.md). Ce chapitre couvre les importations locales et GitHub, les exportations et l'entretien du Skills installé.

## Exportation et importation d'un paquet local {/* #export-and-import-a-local-package */}

<p className="example-label"><strong>Exemple</strong> Exporter et réimporter un RNA-seq Skill</p>

1. Trouvez `rnaseq-count-qc` dans **Settings → Skills** et choisissez **Actions → Export**. Sauvez le ZIP.
2. Sélectionnez **Add skill → Upload skills → Upload skill files** et choisissez ce ZIP.
3. Dans **Confirm import**, inspecter le nom du fichier source et les diagnostics. Les candidats ne sont pas vérifiés au départ.
4. Ouvrez **Aperçu rnaseq-count-qc**. Lire SKILL.md et la liste des fichiers. L'exportation réelle a conservé `references/sample-metric-schema.md`.
5. Fermer l'aperçu, sélectionner le candidat et choisir **Importer sélectionné (1)**.
6. Recherchez la ligne importée et inspectez son nom final et sa source.

![Inspection de l'emballage complet avant l'importation](/img/open-science/capabilities-walkthrough/11-skill-package-preview.webp)

Dans cet exemple, le Skill personnel d'origine existait déjà. L'aperçu affiché **Name exists**, et l'importation a créé un **Importé `rnaseq-count-qc-2`** séparé. L'original et sa fixation Specialist sont restés. Ne présumez pas que chaque importation met à jour le paquet existant; inspecter la source du candidat et mettre à jour/remplacer les diagnostics.

![La copie importée et le Skill personnel original](/img/open-science/capabilities-walkthrough/12-skill-imported-copy.webp)

| Contrôle des importations | Objet |
| --- | --- |
| Sélectionner tout / Inverser / case à cocher candidate | Choisit les paquets découverts à importer; une archive peut contenir plusieurs Skills. |
| Aperçu / Fermer l'aperçu | Lire les instructions et les fichiers avant l'installation. |
| Nom existe / diagnostics | Prévient les problèmes d'identité ou de contenu. Vérifiez le nom résultant après l'importation. |
| Choisissez différents fichiers | Remplace la sélection actuelle des candidats. |
| Importer la sélection | Effectue les importations sélectionnées et signale les succès, les paquets inchangés ou les échecs. |

Un téléchargement Markdown nécessite YAML `name` et `description`; Un paquet ZIP/`.skill` nécessite SKILL.md. Le téléchargement local ne récupère pas les fichiers manquants à partir d'URLs intégrées dans les instructions. Les formats non pris en charge, les métadonnées manquantes, les limites de taille des archives et les chemins d'archives dangereux sont des échecs de validation, et non des raisons de désactiver la validation.

## Importer une Skill locale déjà installée {/* #import-an-already-installed-local-skill */}

<p className="example-label"><strong>Exemple</strong> Importer le paquet d'examen par les pairs local</p>

**Add skill → Import installed skills** scanne `~/.agents/skills` et `~/.codex/skills`. Dans cet exemple, l'analyse locale a trouvé des candidats 68, initialement tous sélectionnés. Effacer **Select all installed skills**, puis choisir la méthode spécifique; utiliser **Invert** seulement après avoir vérifié ce qui est actuellement sélectionné.

1. Ouvrez **Aperçu de l'examen par les pairs** et inspectez son dossier source, les instructions et les fichiers référencés.
2. Choisissez **Close preview**, sélectionnez seulement `peer-review`, puis **Importer sélectionné (1)**.
3. Attendez **Compétence 1 importée**. Le candidat est alors étiqueté **Imported** et ne peut être sélectionné pour la même importation à nouveau.
4. Retourner à Skills, rechercher `peer-review` et inspecter la ligne Importée. Le dossier source reste en place; Open-Science utilise une copie importée.
5. Utilisez **Rescan** après avoir modifié les dossiers installés. Revérifier l'origine, la sélection et le statut avant d'importer à nouveau.

![Prévisualiser le paquet d'examen par les pairs installé localement](/img/open-science/local-todo-batch/12-installed-skill-preview.webp)

![Trouver le paquet importé dans la liste Skills](/img/open-science/local-todo-batch/13-installed-skill-imported.webp)

Après l'importation, inspectez le modèle et les fichiers de référence dans le détail Skill. Avant d'utiliser une méthode d'un autre assistant, vérifiez que les outils requis et les fonctionnalités d'exécution sont disponibles dans cette session.

## Importation et mise à jour de GitHub {/* #import-and-update-from-github */}

<p className="example-label"><strong>Exemple</strong> Importer et mettre à jour un ESM-2 Skill</p>

1. Choisissez **Add skill → Import from GitHub**. Entrez un mot clé, `owner/repo`, `owner/repo@ref` ou GitHub URL, puis sélectionnez **Find skills**. Utilisez une réf fixe pour une source de colis reproductible.
2. Lisez le dépôt et le nombre de candidats. Ce scan a initialement sélectionné chaque candidat; effacer **Select all** avant de choisir seulement la méthode requise. Il diffère de l'écran de confirmation ZIP non coché.
3. Ouvrez **Preview** et vérifiez le commit, dossier, instructions et fichiers résolus. Un scan de dépôt peut découvrir des dossiers internes ainsi que des Skills orientés vers l'utilisateur; son nombre n'est pas le nombre de Skill groupé de l'application.
4. Fermer l'aperçu, sélectionner le candidat prévu et choisir **Importer sélectionné (1)**. Attendez le résultat et vérifiez son nom sous **Imported skills**.
5. Retournez à Skills et recherchez ce nom. Inspecter sa source et sa disponibilité avant de l'utiliser.

![Examiner un GitHub Skill et sa source épinglée avant d'importer](/img/open-science/local-todo-batch/15-github-skill-preview.webp)

L'importation de `fair-esm2` à partir du dépôt produit a créé **`fair-esm2-2`** parce que le nom intégré existait déjà. Le paquet intégré est resté. Les instructions d'importation n'installent pas de poids de modèle ou n'établissent pas que l'inférence fonctionne.

### Appliquer une révision en amont {/* #apply-an-upstream-revision */}

Scanner le même dépôt avec le nouveau ref. Le candidat existant peut montrer **Update available**. Sélectionnez seulement ce candidat et importez-le; inspecter la ligne existante importée et prévisualiser après. Dans la vérification ESM-2, la même copie `fair-esm2-2` a été mise à jour, et la numérisation que ref a de nouveau montré **Imported**. L'organisme d'instructions mis à jour correspond à la source du dépôt. L'importateur réécrit la matière première et le nom sans risque de collision, de sorte que les octets du fichier entier n'ont pas besoin de correspondre à l'original SKILL.md.

![Une révision en amont est disponible pour la copie importée](/img/open-science/local-todo-batch/16-github-update-available.webp)

### Récupérer de GitHub le taux limite {/* #recover-from-github-rate-limiting */}

Pour **La demande de GitHub était limitée au taux**, ouvrez **Manage GitHub credential**, saisissez un jeton utilisable et sélectionnez **Verify and save**. Après **Jeton vérifié et enregistré**, réessayez le scan. **Cancel** part sans enregistrer. Gardez les jetons hors des captures d'écran et publiez des rapports.

## Activer, désactiver et supprimer {/* #enable-disable-and-delete */}

Ouvrez **Manage**, filtrez par source/status et recherchez une méthode spécifique. Sélectionnez le résultat avant d'appliquer une action. **Sélectionné (n)** montre la sélection; **Clear selection** le vide. Examinez l'ensemble complet sélectionné lorsque les filtres changent.

![La copie importée désactivée dans la gestion en vrac](/img/open-science/capabilities-walkthrough/13-skill-bulk-disabled.webp)

Après avoir modifié la disponibilité, rouvrez le détail Skill pour confirmer son état. Gardez une exportation d'une méthode dont vous avez besoin avant de la supprimer.

| Décision | Résultat escompté |
| --- | --- |
| Activer la sélection | Rendre disponibles les paquets admissibles sélectionnés. Vérifiez l'état de la ligne. |
| Désactiver sélectionné | Conserve les paquets éligibles contrôlés par l'utilisateur, mais supprime la disponibilité de Main Agent pour les demandes ultérieures; Skills nécessaire à l'application ne peut pas être désactivé. |
| Supprime la sélection | Ouvre une confirmation avec les noms exacts sélectionnés et les résultats de délétabilité. |
| Supprimer n Skills | Supprime les paquets locaux admissibles après confirmation. Il n'y a pas de workflow de déchets/restaurer Skill. |
| Annuler | Quitte les paquets installés. |

Les paquets en vedette et liés à Specialist peuvent être protégés contre la suppression. Supprimez une liaison obsolète ou désactivez un paquet contrôlé par l'utilisateur le cas échéant. le maintien requis par l'application Skills est activé; Voir [règles d'activation](overview.md#why-some-switches-cannot-be-turned-off). Après suppression, confirmez que le paquet sélectionné est absent de la liste filtrée.

## Mise à jour et diagnostic {/* #update-and-diagnose */}

| Symptôme | Contrôle et action suivante |
| --- | --- |
| Importé mais absent de la liste | Effacer les filtres source, agent et étiquette; rechercher le nom résultant, y compris les suffixes. |
| Fichiers manquants après l'importation | Inspecter la liste des fichiers de colis et réexporter; un seul fichier Markdown ne peut pas inclure un fichier de référence distinct automatiquement. |
| Conflit de révision pendant l'édition | Réouvrez la dernière version, comparez les modifications et enregistrez délibérément. |
| Skill charge mais une fonction n'est pas disponible | Vérifiez si le paquet fournit réellement un helper du noyau; Les instructions ordinaires ne sont pas des fonctions Notebook. |
| Paquet manquant / temps d'exécution | Utilisation [Outils scientifiques](../tools/scientific.md) et le gestionnaire de paquets d'exécution sélectionné. |
| Erreur de GitHub/authentification | Conserver l'état réel de HTTP et l'URL de source désinfectée; voir [Dépannage](../guides/troubleshooting.md). |

Référence de mise en œuvre: [SkillUploadView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillUploadView.tsx), [CompétenceBulkManageView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillBulkManageView.tsx), [SkillImportView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillImportView.tsx).

## Importer et éditer des compétences en toute sécurité {/* #import-batches */}

Les grandes sélections de compétences installées sont importées en lots. Attendez le résultat final et inspectez la liste importée avant de répéter l'importation. Une compétence externe avec un préfixe de nom réservé est assigné un nom local sûr; utilisez le nom affiché dans le catalogue local. Lors de l'édition du corps, enregistrez-le et vérifiez que le nom et la description modifiés séparément restent corrects. Les images jointes au message actuel peuvent également éclairer la sélection des compétences; vérifier la portée de la compétence sélectionnée avant de la laisser agir.
