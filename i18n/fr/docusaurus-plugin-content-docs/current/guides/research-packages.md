---
title: "Paquets de recherche .science"
description: "Exporter une séance avec ses dossiers et ses preuves, puis importer et inspecter le dossier de recherche dans un autre projet."
last_update:
  date: '2026-09-20'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Paquets de recherche .science {/* #science-research-packages */}

Un paquet de recherche **.science** rassemble des branches de conversation, des fichiers et des preuves enregistrées pour un transfert. Un collègue peut l'importer dans un projet et inspecter le dossier de recherche. Les sessions importées sont en lecture seule. À partir de v0.31.0, utilisez **Fork** dans l'application de bureau pour créer une copie en écriture et poursuivre la recherche.

## Choisissez ce que vous devez partager {/* #choose-what-to-share */}

| Ce dont le bénéficiaire a besoin | Exportation vers l'utilisation |
| --- | --- |
| Lire ou modifier le texte de la conversation | [Conversation PDF ou Markdown](sessions.md). |
| Utiliser les fichiers d'origine sélectionnés | [Téléchargements de fichiers ou un artefact ZIP](files.md). |
| Inspecter ensemble les branches, les dossiers et les preuves de la conversation | A `.science` le paquet de recherche. |

Un paquet peut contenir du matériel de recherche téléchargé, du texte de conversation et des résultats générés. Examinez son contenu avant de partager. C'est une copie indépendante: supprimer le travail local ne supprime pas les paquets déjà envoyés à d'autres.

Les conversations Side Chat, [lecture de signets](bookmarks.md) privé et leurs notes sont exclues du paquet. Mettre l'information dont le destinataire a besoin dans un rapport enregistré ou la conversation avant d'exporter.

## Exportation d'un dossier de recherche {/* #export-the-session */}

1. Terminer ou arrêter le travail pendant la session. Ouvrez son menu et choisissez **Export → Export Session package**.
2. Examiner la portée de l'exportation et les limites de contenu ou de taille omises.
3. Confirmez l'exportation et enregistrez le fichier `.science` dans le dossier prévu.
4. Suivez les progrès jusqu'à ce qu'ils soient terminés, puis utilisez **Show in folder** pour localiser le fichier.

| Option d'exportation | Comment choisir |
| --- | --- |
| Export essentiel | conserver les métadonnées essentielles en matière d'enregistrement et de documentation; omettre la documentation facultative PDF. |
| Export complet | Inclure la documentation disponible PDF et le contenu supplémentaire affiché dans l'aperçu. |
| Personnaliser le contenu | Choisir des documents individuels PDF, des fichiers optionnels et des versions; les éléments de preuve nécessaires demeurent inclus. |

Les métadonnées bibliographiques sont toujours incluses. Si une documentation PDF est nécessaire, **Essential export** n'est pas disponible; utiliser **Full export** ou **Customize contents** et conserver le fichier requis. L'exportateur ne récupère pas les textes complets manquants. Vérifiez les PDF et la taille indiqués avant de confirmer; **Full export** ne supprime pas chaque taille ou limite de contenu.

<p className="example-label"><strong>Exemple pratique</strong> Remise d'un échantillon de session de QC</p>

Cet exemple dans Open-Science v0.31.1 exporte une session qui résume le [Tableau QC de l'échantillon GSE60450](../reference/example-data.md), l'importe dans un autre projet sur le même Mac, et continue à partir d'une Fork utilisant **Codex subscription**. Commencez par la session complète contenant `gse60450-qc-summary.csv`; le tableau d’entrée seul ne constitue pas le paquet de recherche.

Choisissez **Essential export**, vérifiez le contenu et la taille estimée, puis **Export**. L'aperçu de cette session a estimé **805.6 KiB**. Attendez **Package operation completed** avant d'importer le fichier sauvegardé; La taille de votre session sera différente.

![Options d'exportation réelles de la session du CQ et taille estimée](/img/open-science/v0311/package-export.webp)

## Importation dans un projet {/* #import-and-inspect-a-package */}

1. Ouvrez le menu de destination Projet et choisissez **Import Session package…**, ou déposez un fichier `.science` dans ce projet. Ouverture d'un fichier associé vous demande directement de choisir le projet de destination.
2. Consultez l'aperçu du colis, la destination et le contenu inclus ou omis, puis confirmez l'importation.
3. Attendez l'achèvement et choisissez **Open imported Session**.
4. Inspectez les branches de conversation et ouvrez les fichiers nécessaires au transfert. Vérifiez que vous pouvez trouver les entrées et les résultats pertinents à votre prochaine tâche.

Pour cet exemple, sélectionnez le projet de destination **Public Genomics Examples**. L'aperçu d'importation liste **Branche 1, messages 3 et fichiers 13**. Il indique également que les titres de compte, les autorisations et les identités de continuation des fournisseurs sont exclus. Vérifiez ces détails avant de sélectionner **Import**.

![Aperçu du paquet QC avant importation dans le projet de destination](/img/open-science/v0311/package-import-preview.webp)

Ouvrez la session importée et son résumé CSV. L'avis **Imported research history** confirme que cette copie est en lecture seule et ne peut pas exécuter de code ou poursuivre une conversation directement.

![Importé QC record avec son résumé hérité et Fork pour continuer bouton](/img/open-science/v0311/package-import-readonly.webp)

## Utiliser le dossier de recherche reçu {/* #use-the-received-research-record */}

1. Sélectionnez **Fork to continue** dans la session importée, ou **Fork** dans son menu de session. Attendez **Fork completed** et ouvrez la nouvelle session. Le code ne s'exécute pas automatiquement.
2. Inspectez le résumé hérité, choisissez un modèle disponible et confirmez que l'exécution Python est prête. Cet exemple a utilisé **Codex subscription / gpt-5.6-sol**. Les lettres de créances et les permissions importées ne donnent pas d'autorisation sur l'installation qui les reçoit.
3. Envoyez l'invite suivante. Si une approbation Python apparaît, inspecter le calcul demandé et l'approuver pour continuer.

```text
Use Python in Session Notebook with the standard library only.
Read the inherited gse60450-qc-summary.csv. Do not modify inherited files.
Compute total_raw_counts_sum divided by sample_count using decimal.Decimal
with precision 28. Save research-package-continuation.csv with metric,value
rows in this order: sample_count, total_raw_counts_sum,
mean_raw_counts_per_sample. Save research-package-continuation.md with the
input filename, calculation and result. Do not use the network or delegate.
Keep everything in English and return links to both new files.
```

4. Ouvrez les deux nouveaux fichiers. Cette opération a retourné des échantillons de **12**, un nombre brut total de **269027617** et une moyenne de **22418968.08333333333333333333**. La moyenne récapitule le tableau de Qc fourni; il n'est pas une expression normalisée ou un résultat d'expression différentielle.

![Fork complété et les nouveaux fichiers de calcul créés en utilisant Codex](/img/open-science/v0311/package-continued.webp)

<ExampleDownload path="/examples/v0311/gse60450-qc-summary.csv">Résumé hérité</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.csv">Nouveau calcul</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.md">Notes de calcul</ExampleDownload>

Les deux nouveaux fichiers sont enregistrés dans le Fork ; les fichiers récapitulatifs de la session source et de la session importée restent inchangés. Voir [Créer un Fork d’une session existante](sessions.md#fork-session). L’utilisation importée est exclue des totaux d’activité locaux.

Un dossier de vérification reçu décrit les vérifications fournies par l'expéditeur. Cela ne signifie pas que cet ordinateur a réexécuté les vérifications. Lire la version du fichier, les critères de comparaison et le résultat; voir [Reproductibilité](reproducibility.md) pour savoir comment ces contrôles fonctionnent.

## Annuler ou réessayer un transfert {/* #cancel-or-retry-a-transfer */}

**Run in background** cache la fenêtre de progression pendant que le transfert se poursuit. Utiliser **Cancel** pour arrêter; cacher la fenêtre n'annule pas l'opération.

Si le nettoyage est incomplet, utilisez **Retry cleanup** avant d'essayer à nouveau. Après un échec, **Try again** récupère le même fichier et la même destination. Choisissez un autre paquet séparément si c'est votre intention. Vérifiez l'opération existante avant de commencer une deuxième importation, puis inspectez la session importée et les fichiers quand elle se termine.
