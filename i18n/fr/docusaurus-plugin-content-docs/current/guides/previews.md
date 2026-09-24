---
title: "Ouverture et prévisualisation des fichiers"
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Ouverture et prévisualisation des fichiers {/* #opening-and-previewing-files */}

Ouvrez un résultat enregistré pour inspecter la version sélectionnée. Cette page couvre les contrôles de visionnage partagés et les formats de documents ordinaires. Utilisez [Tableaux](../tools/tables.md) pour l'interprétation des données et [Vérificateurs scientifiques](../tools/viewers.md) pour les commandes de séquence et de structure.

## Ouvrir, agrandir et retourner {/* #open-enlarge-and-return */}

Une carte de fichier généré ouvre son aperçu. **Ouvrir ... en vue scindée à côté de la session** garde la conversation visible. Sélectionnez un autre onglet pour changer les fichiers, **Ouvrir l'aperçu plein écran de ...** pour en agrandir un, et **Fermer l'aperçu de ...** pour fermer cette surface. **Collapse preview panel** cache le panneau sans supprimer ses fichiers ouverts. Un aperçu plein écran et une bibliothèque de fichiers plein écran sont des vues différentes.

| Commande en-tête | Signification |
| --- | --- |
| Nom et version du fichier | Confirmer le résultat sélectionné avant de le télécharger ou de le citer |
| Télécharger | Enregistrez une copie de ce résultat |
| Actions de fichiers → Provenance | Inspecter les preuves jointes à une version d'artefact gérée |
| Voir en contexte | Retour à la session qui a produit l'artefact |
| Précédent / Prochaine version de fichier | Naviguez les révisions immuables sauvegardées lorsque disponibles |
| Modifier / Comparer | Disponible uniquement pour les contenus gérés pris en charge; voir [Fichiers](files.md) |
| Fermer | Rompez la vue; ce n'est pas Supprimer |

Le comportement de fermeture ci-dessus s'applique aux prévisualisations de fichiers. Un [onglet Side Chat](delegation.md) a une confirmation séparée: la fermeture arrête cette discussion latérale et supprime sa conversation. Un redémarrage complet de l'application efface également les discussions latérales restantes. Les messages déjà livrés à Main restent enregistrés.

Pour enregistrer un emplacement de lecture par vous-même, sélectionnez texte ou région PDF et choisissez **For me**; Voir [Lecture des signets](bookmarks.md).

## Lire les fichiers par format {/* #read-files-by-format */}

### Lire un tableau de résultats {/* #read-a-result-table */}

<p className="example-label"><strong>Exemple pratique</strong> Lire le tableau, la figure et le rapport de la RNA-seq QC</p>

Ouvrez `rnaseq-sample-qc.csv`. Dans cet exemple, il affiche **Lignes 12 · Colonnes 6** et utilise la première ligne comme en-têtes. Le défilement horizontal expose les noms de longues colonnes source et les mesures à leur droite. Les numéros de ligne de la table sont des positions d'affichage, pas des identifiants de gènes ou d'échantillons.

![Le tableau des douze échantillons du QC](/img/open-science/guides-walkthrough/42-rnaseq-table.webp)

Vérifiez que les étiquettes des colonnes et les identifiants complets sont lisibles. Les définitions de champ et les vérifications par rapport au niveau de référence partagé sont en [Tableaux et ensembles de données](../tools/tables.md).

La source `.txt` est une matrice séparée par un onglet; un visionneur de texte peut l'afficher sous forme de texte plutôt que de la grille CSV. Ne pas renommer l'extension d'un fichier et assumer son délimiteur ou son sens scientifique changé. De très grands aperçus peuvent être limités; lire n'importe quelle limite de ligne/colonne affichée avant de traiter le sous-ensemble visible comme l'ensemble de données complet. Les limites de format sont en [Référence](../reference/formats.md).

### Inspecter le chiffre {/* #inspect-the-figure */}

Ouvrez `rnaseq-library-sizes.png`. Utiliser **Zoom in**, **Zoom out** et **Reset zoom**; ouvrir le plein écran lorsque les étiquettes d'axe sont trop petites. Zoom ne change que la vue. Il ne rééchantillonne pas la matrice source ni ne met à jour un résultat statistique.

![Le chiffre réel du nombre brut total dans l'aperçu plein écran](/img/open-science/guides-walkthrough/54-rnaseq-figure.webp)

Lisez l'axe du nombre brut, les douze étiquettes de l'échantillon et leur cartographie dans le rapport CSV/. Les différentes hauteurs de barre ne permettent pas à elles seules d'établir l'expression différentielle. L'exemple est une vérification descriptive préalable à l'analyse, sans normalisation ni test d'hypothèse.

### Lire les méthodes et la provenance ensemble {/* #read-methods-and-provenance-together */}

Markdown rend les en-têtes, les listes, le code et les liens. Lisez le bilan et la méthode du rapport avant d'accepter le résultat tracé. Un lien d'auteur ouvre sa destination par l'intermédiaire de l'action source-preview ou de l'action de navigation externe; Inspecter le nom d'hôte complet avant de le traiter comme une preuve. Un aperçu source raté ou bloqué n'est pas une confirmation que son contenu a été lu.

Utilisez **Provenance** pour inspecter le code de l'artefact sélectionné, le journal d'exécution, les messages, l'environnement et l'examen. Lire n'importe quelle étiquette **partial**, **limité** ou **No review for this version** en utilisant [Notebook et preuves d'exécution](notebook.md).

### Lire les fichiers Office et les chiffres de plusieurs pages {/* #read-office-files-and-multi-page-figures */}

<p className="example-label"><strong>Exemple pratique</strong> Inspecter le Bureau et le TIFF en lecture des résultats du CQ</p>

Les <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-reading.docx">Rapport sur les mots</ExampleDownload>, <ExampleDownload path="/examples/gse60450/office/GSE60450-sample-qc.xlsx">Carnet de travail Excel</ExampleDownload>, <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-overview.pptx">Diapositives PowerPoint</ExampleDownload> et <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-figures.tiff">TIFF de deux pages</ExampleDownload> présentent les mêmes résultats de QC GSE60450 enregistrés. Ce sont des copies de lecture, pas de nouvelles analyses.

| Format | Étapes et que vérifier |
| --- | --- |
| DOCX | Joindre et ouvrir le rapport. Faire défiler les deux pages; vérifier la première ligne de l'échantillon et le texte des méthodes/interprétation. Un aperçu plein écran donne plus d'espace aux longues lignes. Il n'y a pas de ruban d'édition Word. |
| XLSX | Ouvrir le cahier, puis choisir **Résumé** ou **Échantillons** en bas. Faites défiler horizontalement pour la dernière colonne. Les échantillons contiennent des lignes de données 12 plus ses notes d'en-tête, d'espacement et de source; le spectateur rapporte les lignes utilisées de 17, et non les échantillons biologiques de 17. Les valeurs sont un aperçu du cahier de travail enregistré, pas la preuve d'un nouveau calcul. |
| PPTX | Ouvrir les diapositives et faire défiler verticalement du résumé du QC vers Méthodes et interprétation. Les deux diapositives ont été rendues dans l'exemple local. Cette surface de lecture n'est pas un éditeur de présentation ou un contrôleur de diaporama. |
| TIFF | Ouvrir la figure et utiliser **Page suivante / Page précédente**. Les deux pages montrent les tailles brutes de la bibliothèque et les médianes des gènes détectés. **Zoom vers / Zoom vers / Réinitialiser le zoom** modifie la vue; contrôle **Page 1 de 2** ou **Page 2 de 2** avant d'interpréter le chiffre. |
| JSON | Ouvert <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-summary.json">Résumé</ExampleDownload> pour inspecter le texte source, les identifiants et les valeurs. Il s'affiche comme un code plutôt qu'un arbre d'objets extensible. |
| HTML | Ouvert <ExampleDownload path="/examples/gse60450/office/GSE60450-qc-summary.html">le tableau de lecture</ExampleDownload>. **Source** indique le HTML; **Render** restaure le document formaté. Aucun des deux modes ne réexécute le QC. |

![Sélection d'échantillons dans l'aperçu réel du cahier de travail](/img/open-science/local-todo-batch/47-workbook-samples.webp)

![La deuxième page du TIFF actuel](/img/open-science/local-todo-batch/50-tiff-second-page.webp)

Si **Preview unavailable → Open this Office file in your default app to view it.** apparaît, utilisez **Open** pour un fichier local, ou **Download** pour un téléchargement géré, puis ouvrez-le dans une application compatible. Ce repli maintient le fichier original disponible lorsque l'aperçu intégré ne peut pas l'afficher.

### Autres téléspectateurs soutenus {/* #other-supported-viewers */}

Le tableau suivant énumère les modes d'aperçu et les contrôles pour les types de fichiers pris en charge.

| Famille | Quoi inspecter? | Contrôles et limites |
| --- | --- | --- |
| PDF | Numéro de page, texte lisible, source PDF | Les vignettes, les contours, la recherche de documents, la navigation sur les pages, le zoom et les régions sélectionnables; les pages numérisées peuvent manquer de texte consultable |
| Code / texte clair | Compléter le bloc et la langue pertinents | Numéros de ligne, affichage syntaxique, copie/téléchargement; un contenu surdimensionné peut être limité |
| JSON / HTML | Structure ou document rendu | Rendu n'est pas la permission d'exécuter du code avec des privilèges d'application |
| Images / TIFF | Résolution et image sélectionnée | zoom/pannage de l'image; TIFF a un chemin de rendu dédié |
| Dossiers bureautiques | Indique si le rendu géré réussit | Télécharger/ouvrir de l'extérieur si DOCX/XLSX/PPTX prévisualiser n'est pas disponible; prévisualiser n'est pas complet |
| Séquences biologiques | Identité et étendue des séquences | Vue séquentielle pour les intrants FASTA pris en charge |
| Structures moléculaires | Modèle parsé et représentation choisie | Rotation, zoom, panoramique et prises en charge Représentations Cartoon/Stick/Sphere/Surface/Line; les données structurelles manquantes peuvent désactiver une représentation |
| Fichier inconnu ou non pris en charge | Nom, taille et message de repli | Télécharger pour un visionneur externe approprié; ne pas déduire le contenu valide de l'extension |

Pour le contexte PDF, liez uniquement les documents pertinents à la tâche actuelle et déconnectez-les lorsque la tâche suivante ne devrait pas les utiliser. L'application prend en charge jusqu'à trois PDF liés par session. Un enregistrement documentaire sans PDF joint fournit des métadonnées, et non une preuve que le texte complet a été lu; Voir [Bibliothèque](library.md).

### Contrôles des sources de diagramme et des formats spécifiques {/* #diagram-source-and-format-specific-controls */}

Pour un diagramme de Sirène rendu dans une conversation, sélectionnez **View source** dans sa barre d'action pour lire le texte du diagramme sous-jacent; **View diagram** retourne au rendu. Le toggle devient disponible après le rendu et est désactivé alors qu'une erreur remplace le diagramme. Il modifie la vue, pas l'analyse ou le fichier source.

<p className="example-label"><strong>Exemple</strong> Interrupteur entre un diagramme de Sirène et sa source</p>

Dans une nouvelle conversation, demandez : **Show a Mermaid flowchart with three steps: Attach a file → Inspect the preview → Save a report. Do not include file links.** Une fois rendu, survolez le diagramme, sélectionnez **View source** et validez les trois nœuds. Sélectionnez **View diagram** pour retourner; utiliser **Affichage en plein écran** si les étiquettes sont trop petites.

Le diagramme affiche les étapes demandées. Pour inspecter un fichier enregistré, ouvrez sa carte de fichier; un noeud de diagramme seul n'est pas une référence d'artefact.

| Format | Quoi vérifier |
| --- | --- |
| Page unique PDF | Pas d'entrée de lecture de plusieurs pages; utiliser les commandes d'aperçu ordinaires de PDF |
| CSV | Inspecter la plage affichée; un aperçu limité ne doit pas être traité comme l'entrée/exportation complète |
| Cahier de travail du Bureau | Vérifiez la feuille de travail visible sélectionnée et l'erreur de rendu; utiliser le fichier original pour l'édition non prise en charge |
| TIFF | Vérifiez la page sélectionnée et le résultat de rendu avant d'interpréter les valeurs pixel/échantillon |
| JSON | Consulter le texte source conservé lors du formatage |
| Tableaux de marquage | Concentrez les actions de la table pour utiliser les commandes copie/télécharge/plein écran avec le clavier |

Références de mise en œuvre: [Contrôles de sirène](https://github.com/aipoch/open-science/commit/5f6e7995), [État PDF](https://github.com/aipoch/open-science/commit/2722da2a), [CSV](https://github.com/aipoch/open-science/commit/9275c2c0), [Bureau](https://github.com/aipoch/open-science/commit/0291871f), [TIFF](https://github.com/aipoch/open-science/commit/52152ed4).

## Extraire les chiffres et les tableaux PDF {/* #pdf-extraction */}

Utilisez ceci lorsque vous avez besoin d'une figure ou d'une table réutilisable d'une littérature PDF. Ajouter et inspecter d'abord le PDF dans [Bibliothèque](library.md); Les métadonnées bibliographiques ne constituent pas à elles seules une entrée d'extraction.

1. Ouvrez l'aperçu PDF et sélectionnez **Figures and tables** à côté de **Original PDF**.
2. Lors de la première utilisation, choisissez **Download and continue** pour installer les ressources de modèle requises. Attendez l'installation et les contrôles d'intégrité. Lorsque les ressources sont prêtes, utilisez **Analyze PDF**.
3. Suivez l'évolution de la page. Une fois terminé, sélectionnez un candidat et utilisez **Show in PDF** pour le comparer avec la page source, la légende et le texte environnant.
4. Pour une figure, ouvrez l'aperçu de l'image et utilisez **Copy image** ou **Download image**. Pour une table, sélectionnez **Table**, choisissez **TSV**, **HTML** ou **Markdown**, puis utilisez l'action copier/télécharger. Choisissez **Image** lorsque vous avez besoin d'inspecter la culture source.
5. Réouvrir le fichier exporté. Vérifiez l'alignement ligne/colonne, les en-têtes fusionnés, les unités, les notes de bas de page et le contenu de la page transversale avant de l'utiliser dans une analyse ou un rapport.

L'extraction se déroule localement après le téléchargement des ressources du modèle. Réouvrir le même PDF peut réutiliser les résultats mis en cache; **Analyze again** réexécute l'extraction au besoin. Annuler par le contrôle de progression si vous devez arrêter. Si l'analyse est incomplète, consultez l'avis d'échec de la page plutôt que de traiter les candidats visibles comme le document complet.

**Unplaced table text** et **Table notes** conservent le contenu qui doit être revu. Si les cellules structurées ne sont pas disponibles, utiliser la culture source et PDF originale; ne pas déduire les cellules manquantes. Les pages numérisées et tournées ne sont pas prises en charge par ce workflow d'extraction. Un PDF peut rester lisible même lorsque l'extraction n'est pas disponible.

### Demandez à l'agent au sujet d'une figure ou d'une table extraite {/* #pdf-agent-evidence */}

1. Ouvrez le PDF prévu, utilisez le **Read with agent** pour le lier à la session en cours et remplissez l'analyse **Figures and tables** pour les pages pertinentes. Avant d'envoyer votre question, confirmez que le PDF reste dans le contexte de lecture Compositeur. Un enregistrement de bibliothèque en soi n'est pas un PDF lié, et le lien seul n'exécute pas cette analyse.
2. Demandez un chiffre, une table ou un algorithme précis. Inclure son étiquette ou sa page et la question que vous devez répondre.
3. Inspectez l'activité de l'outil : **list_pdf_elements** trouve les éléments extraits disponibles; **read_pdf_element** lit la preuve sélectionnée. Demandez la page source et tout contenu manquant ou incertain dans la réponse.
4. Comparez la réponse avec la figure ou la table d'origine, y compris les en-têtes, les unités et les notes. Si l'extraction est absente ou incomplète, analyser les pages manquantes et réessayer; une légende ne peut à elle seule établir une tendance ou une valeur de tableau exacte.

<p className="example-label"><strong>Exemple</strong> Demander des éléments de preuve dans un document relié</p>

> Lire le tableau 1 à partir des éléments extraits de PDF liés. Signalez la page physique PDF, les en-têtes des colonnes et les valeurs pertinentes à ma question. Préserver les unités et les notes de bas de page et identifier les cellules manquantes ou l'extraction incomplète.

Ces outils lisent les résultats d'extraction existants; ils ne démarrent pas l'analyse PDF. La sortie de la table peut arriver en plusieurs lots, et les données chiffrées/algorithmiques peuvent être fournies sous forme d'image. Vérifiez que le modèle sélectionné supporte l'entrée d'image requise; une image livrée seule ne prouve pas qu'elle a été interprétée correctement.

## Charger délibérément les supports distants {/* #remote-media */}

Images, audio et vidéo reliés à partir d'une réponse de modèle attendent que vous activez le chargement. Lisez les noms d'hôte de destination indiqués par le contrôle avant de procéder. L'approbation s'applique à cet élément affiché et à ses URLs, pas à toutes les réponses futures ou à l'ensemble du domaine. La fermeture de l'aperçu n'annule pas une requête déjà envoyée.

Les diagrammes de sirène contenant des images distantes peuvent être bloqués avant le chargement; demander un diagramme ordinaire sans images intégrées au besoin. Pour les images envoyées à un modèle, Open-Science supprime les métadonnées auxiliaires de la copie d'entrée du modèle tout en préservant le fichier original. Ceci ne supprime pas le contenu sensible visiblement présent dans l'image.

## Vérifier le fichier téléchargé {/* #verify-the-downloaded-file */}

Ouvrez l'aperçu prévu, choisissez **Download**, validez le nom du fichier et l'emplacement dans la boîte de dialogue de sauvegarde du système, puis enregistrez. Ouvrez la copie téléchargée et vérifiez son contenu. Télécharger enregistre le fichier original; Changer de page TIFF ou de feuille Excel ne limite pas le téléchargement à cette page ou feuille.

## Quand un aperçu échoue {/* #when-a-preview-fails */}

Confirmez le fichier enregistré avec succès, puis vérifiez la version et le format exacts. Essayez de télécharger pour distinguer une limitation de visionneuse d'un fichier non disponible. Pour un fichier local modifié à l'extérieur de l'application, utilisez Reload là où vous l'offrez. Ne pas écraser l'entrée pour réparer un problème de rendu. Signaler le nom, le type, la taille, la version de l'application et l'erreur affichée; exclure le contenu de fichiers privés à moins qu'ils ne soient nécessaires pour le diagnostic.

## Annoter un PDF {/* #annotate-a-pdf */}

Ouvrez **Notes & Annotations** pour gérer les points saillants, les marques de zone, les notes de page et les notes de document. **Show notes sidebar** garde des notes à côté de la page d'origine. Le menu de téléchargement sépare **Download original PDF** de **Download PDF with annotations**. Suivez [Annotations et notes de document PDF](pdf-notes.md) pour une lecture complète, une recherche et une exportation.

Pour **Figures et tableaux**, la première installation de modèle local peut essayer des miroirs de téléchargement approuvés lorsque la source primaire n'est pas accessible. Attendez le téléchargement et les vérifications d'intégrité avant de choisir **Analyze PDF**. Les miroirs ne suppriment pas le besoin d'installer ces ressources; un résultat mis en cache peut rouvrir sans une nouvelle analyse.

## Lire un PDF dans le premier message {/* #first-message-pdf */}

1. Ouvrez un papier avec un PDF lisible dans **Library** et choisissez **Read with agent**.
2. Sélectionnez le projet cible et **New conversation**. Vérifiez que le compositeur affiche le PDF sous **Lecture** et que l'aperçu affiche **In session context**.
3. Posez une question immédiatement. Vous n'avez pas besoin d'envoyer un message d'introduction séparé avant de relier le document.

<p className="example-label"><strong>Exemple pratique</strong> Interrogez-vous sur le mécanisme dans Lang et al., 2019</p>

L'exemple utilise [Catalyseur monoatome thermiquement stable non stabilisé par défaut](https://doi.org/10.1038/s41467-018-08136-3), un papier ouvert sous CC BY 4.0, avec **Codex subscription**.

![Une nouvelle conversation avec le PDF liée sous Lecture avant son premier message](/img/open-science/v0331/pdf-first-message.webp)

```text
Using the linked PDF, explain how Lang et al. distinguish non-defect
stabilization from defect trapping. Give the paper title and DOI,
two specific findings with PDF page or figure locations, and one
limitation. Keep the answer in English and cite only evidence you
can actually read.
```

La réponse récupère les passages du PDF lié et identifie le papier, le mécanisme et les emplacements à vérifier. Ouvrez les pages citées à côté de la réponse et vérifiez chaque revendication par rapport à l'original. Une référence à une figure dans le texte ne signifie pas que l'image de la figure a été extraite ou interprétée visuellement; utiliser [Figures et tableaux](#pdf-extraction) lorsque l'image est nécessaire.

![Une réponse anglaise à côté du PDF original, avec le contexte de lecture retenu](/img/open-science/v0331/pdf-first-response.webp)

Pour les faits saillants et les notes de niveau document, continuez avec [Annotations PDF](pdf-notes.md).
