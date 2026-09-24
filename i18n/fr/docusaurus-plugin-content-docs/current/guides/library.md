---
title: "Bibliothèque de littérature et citations"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Bibliothèque de littérature et citations {/* #literature-library-and-citations */}

Pour trouver de nouveaux articles en ligne, indiquez dans une conversation le sujet, la période et les critères de sélection, puis examinez les propositions dans **Library → Inbox**. Consultez le [parcours de recherche thématique du club de lecture](../workflows/journal-club.md). **Search references** filtre les références déjà présentes dans Library ; cette commande ne lance pas de recherche bibliographique en ligne.

La Bibliothèque est une bibliographie locale commune. Les projets et les collections sont reliés à ses documents; l'ajout du même papier à une autre collection ne nécessite pas d'autre copie. Ce guide utilise les trois vrais papiers PRISMA du [flux de travail de lecture de base](../workflows/core-reading-list.md). Ce flux de travail possède l'objectif de recherche et la liste de contrôle d'acceptation; cette page explique les contrôles et le cycle de vie des archives de la Bibliothèque.

Pour réutiliser une figure ou une table à partir d'un PDF joint, suivez [Extraction de PDF](previews.md#pdf-extraction). L'importation de métadonnées et l'extraction automatique de texte intégral n'extraient pas eux-mêmes des figures ou des tableaux.

## Choisissez la vue correcte {/* #choose-the-correct-view */}

Ouvrez **Library** depuis la maison ou l'espace de travail. **Back to Home** retourne à la navigation du projet. Le **Settings** de la bibliothèque ouvre les styles de citation, et non les paramètres de modèle global.

| Voir | Contenu | Utilisez-le pour |
| --- | --- | --- |
| Boîte de réception | Candidats découverts par l'agent en attente de votre examen | Vérifier l'identité et les sources avant l'acceptation |
| Toutes les références | Enregistrements actifs acceptés | Rechercher, modifier et organiser votre bibliographie |
| Doublons | Groupes suspects d'identificateur/de métadonnées | Comparer avant fusion |
| Corbeille | Supprimé les enregistrements de référence | Restaurer ou supprimer délibérément définitivement |
| Projet | Références liées à ce projet | Garder la bibliographie pertinente à une question de recherche |
| Collection | Un groupe thématique, comprenant des collections imbriquées | Réutiliser un ensemble de lectures à travers les projets |

![Trois papiers acceptés dans la vraie collection PRISMA](/img/open-science/guides-walkthrough/51-library-collection.webp)

## Ajouter ou importer un enregistrement {/* #add-or-import-a-record */}

Sélectionnez **Add** et choisissez la source. Sélection d'un PDF ouvre son éditeur de métadonnées; sélection de plusieurs ouvre **Import PDFs**.

| Entrée | Entrée | Vérifier avant d'enregistrer |
| --- | --- | --- |
| Ajouter une référence | Bibliographie saisie manuellement | Titre, type de référence et identifiants requis |
| Importer un PDF | Un ou plusieurs PDF locaux | les métadonnées extraites sur chaque papier; sélection multi-fichier utilise le flux de lot ci-dessous |
| Importer les références | BibTeX, RIS ou NBIB | Entrées valides/invalides, correspondances de destination et d'identificateur |

<ToolOperationGroup>
<summary>Importer les PDF sélectionnés d'un dossier</summary>

### Importer les PDF sélectionnés d'un dossier {/* #import-a-folders-selected-pdfs */}

1. Sélectionnez les PDF pour l'ensemble de lecture. Attendre l'extraction des métadonnées; un DOI détecté peut être utilisé pour compléter les champs bibliographiques. Vérifiez le résultat par rapport au papier.
2. Vérifiez la destination affichée à côté de **Import to**; il vient de la vue Bibliothèque où vous avez commencé l'importation. Sous **When identifiers match**, choisissez une politique dans le tableau ci-dessous.
3. Utilisez chaque case à cocher ou **Select all** pour choisir ce lot. **Show more** révèle d'autres fichiers listés.
4. Sélectionnez **Import selected**. Lisez l'état d'avancement global et l'état de chaque dossier; un fichier échoué n'est pas une importation complète.
5. Pour s'arrêter, sélectionnez **Stop** et attendez que **Stopping…** se règle. Il reste des références déjà engagées; une opération en vol peut se terminer.
6. Après l'arrêt, sélectionnez les fichiers restants Ready et utilisez **Import selected**. Si la boîte de dialogue offre **Retry unfinished** après un échec, utilisez-la pour la sélection inachevée. Inspecter toute référence conservée avant de commencer une nouvelle importation, en particulier si son téléchargement PDF a été interrompu.
7. Utilisez **Done** ou **Close** lorsque la boîte de dialogue l'offre, puis ouvrez la destination et vérifiez ses enregistrements et PDF. **Cancel** abandonne la préparation avant importation.

| Politique d'identification-match | Résultat |
| --- | --- |
| Réutiliser la référence existante | Réutiliser l'enregistrement correspondant au lieu de créer une autre entrée de bibliographie |
| Conserver comme référence distincte | Tenir un dossier distinct pour une comparaison ultérieure et un double examen |
| Compléter les champs vides | Remplir les champs manquants tout en conservant les valeurs existantes ou conflictuelles |

Le lot peut afficher **Pending**, **Reading…**, **Ready**, **Importing…**, **Completed**, **Failed** ou **Skipped**. La sélection, l'état de préparation des métadonnées et l'achèvement des importations sont des états distincts. Si l'application signale **PDF upload cancelled. The reference was kept.**, vérifiez que les pièces jointes de l'enregistrement ont été conservées; annuler le téléchargement n'a pas supprimé l'entrée de bibliographie.

![Deux vrais PDF PRISMA prêts à l'importation](/img/open-science/v0.27.0/02-pdf-batch-ready.webp)

Avec **Reuse existing reference**, un PDF dont le titre extrait ou DOI ne correspond pas peut encore créer un enregistrement séparé. Après l'importation, ouvrez chaque papier et confirmez son titre et DOI. Corriger les erreurs avant [fusion des duplicata](#resolve-duplicates-and-recover-references). **Completed** confirme l'importation, pas l'identification précise.

![Résultats par lot et par dossier](/img/open-science/v0.27.0/03-pdf-batch-completed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Arrêter un lot sans perdre le travail terminé</summary>

### Arrêter un lot sans perdre le travail terminé {/* #stop-a-batch-without-losing-completed-work */}

Une requête **Stop** permet à l'élément actuel de terminer. Inspecter chaque ligne : les éléments **Completed** sont conservés et ne peuvent pas être sélectionnés à nouveau ; sélectionner les lignes restantes de **Ready** et utiliser **Import selected** pour continuer. Si les défaillances exposent **Retry unfinished**, corrigez la cause signalée avant de réessayer et vérifiez que les enregistrements complétés n'ont pas été dupliqués.

![L'importation de PDF stoppé conserve sa ligne terminée](/img/open-science/local-todo-batch/09-pdf-import-stopped.webp)

**The reference was kept. Retry to finish adding its PDF.** signifie que l'entrée de la bibliographie a été sauvegardée mais que sa pièce jointe n'est pas terminée. Vérifiez que le PDF d'origine est toujours disponible à l'emplacement sélectionné et s'ouvre normalement, puis sélectionnez **Retry unfinished**. Après réessayer, retourner à la collection de destination et ouvrir le PDF pour vérifier son contenu. Si le résultat n'a pas pu être confirmé, consultez votre bibliothèque avant de commencer une autre importation.


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Apportez une bibliographie d'un autre gestionnaire de référence</summary>

### Apportez une bibliographie d'un autre gestionnaire de référence {/* #bring-a-bibliography-from-another-reference-manager */}

<p className="example-label"><strong>Exemple pratique</strong> Importer des enregistrements PRISMA avec trois politiques de correspondance</p>

Ouvrez la collection de destination d'abord, puis choisissez **Import references** et un fichier `.bib`, `.ris` ou `.nbib`. L'aperçu indique le format détecté, la destination, les nouveaux comptages/existants/décrochés et les enregistrements correspondants. Expand **View details** pour inspecter les titres et les auteurs avant d'importer. Les importations bibliographiques ne sont pas téléchargées en PDF.

| Choix | Résultat vérifié avec l'instruction PRISMA |
| --- | --- |
| Conserver comme référence distincte | BibTeX a créé un seul enregistrement; Les duplicata contenaient alors un groupe correspondant-DOI |
| Réutiliser la référence existante | RIS réutilisé un enregistrement, avec zéro créé, sauté ou échoué |
| Compléter les champs vides | Les [Dossier PubMed NBIB](https://pubmed.ncbi.nlm.nih.gov/19621072/) PMID ajouté `19621072` et PMCID `PMC2707599`; le titre existant et cinq créateurs sont restés |

Cliquez sur **Import references**, attendez **Import complete**, inspectez Created/Reused/Skipped/Failed, puis sélectionnez **Done**. Réouvrir l'enregistrement : un compte d'importation seul n'établit pas les métadonnées correctes. Remplir des champs vides peut ajouter des identifiants et un nom abrégé de journal sans remplacer le titre complet de la revue.

![Importation de BibTeX avec une politique explicite de duplication](/img/open-science/local-todo-batch/02-bibtex-import.webp)

![L'importation NBIB remplit les champs bibliographiques manquants](/img/open-science/local-todo-batch/05-nbib-fill-fields.webp)


</ToolOperationGroup>

## Examen des éléments de preuve de la boîte de réception {/* #review-inbox-evidence */}

<p className="example-label"><strong>Exemple pratique</strong> Examiner trois candidats PRISMA</p>

Ouvrez le titre du candidat ou **View details**. Inspecter son fournisseur, son lien source et DOI/autres identifiants, puis comparer l'année, l'ordre des auteurs et la publication avec l'éditeur. **Accept** la fait entrer dans la bibliothèque; **Dismiss** le supprime de la file d'attente d'examen. Vérifiez la sélection de la ligne avant les actions de lot.

![Trois vrais candidats PRISMA en attente d'examen](/img/open-science/prisma-walkthrough/04-inbox-three-papers.webp)

Dans cet exemple, les trois candidats ont été acceptés individuellement, et la boîte de réception est devenue claire. Une correspondance de fournisseur est un enregistrement de départ, pas une validation bibliographique complète. L'année de publication de l'état 2020 est **2021**. Les deux documents 2009 ont des DOI et des listes d'auteurs distinctes.

## Vérifier et corriger les métadonnées {/* #inspect-and-correct-metadata */}

Ouvrez une référence, puis **More actions → Edit metadata**. Passez en revue les valeurs actuelles avant d'utiliser **Complete metadata**, qui effectue une recherche plutôt qu'une modification purement locale.

![Réouverture du champ organisme-auteur sauvegardé](/img/open-science/v0.27.0/04-organization-author.webp)

| Champ/contrôle | Entrée et effet |
| --- | --- |
| Type de référence | Sélectionnez le type bibliographique: article, revue, préimpression, livre, jeu de données et autres types pris en charge |
| Titre | Requis; conserver le titre publié |
| Année / Publication | Année de publication et journal/conteneur; une année inscrite au titre peut différer |
| Paramètres avancés | Volume, numéro, pages, éditeur, lieu et édition |
| Ajouter créateur / supprimer créateur | Ajouter ou supprimer une ligne de créateur dans le brouillon |
| Rôle du contributeur | Choisissez Auteur, éditeur ou traducteur pour correspondre à la source |
| Type de nom → Personne | Entrez le prénom et le nom de famille |
| Type de nom → Organisation | Entrez le nom complet de l'organisation; ne le divisez pas en noms de personnes inventés |
| Ajouter un identifiant | Type et valeur: DOI, PMID, PMCID, ARXIV, ISBN, ISSN ou autre |
| Préféré pour DOI / ISSN, etc. | Choisir l'identificateur préféré dans ce type; le choix n'est pas un seul drapeau mondial pour tous les types |
| Supprimer l’identifiant | Supprimer la ligne d'identificateur du projet |
| URL / Résumé | Adresse source et résumé bibliographique |
| Enregistrer | Persiste les modifications valides |
| Annuler / Fermer | Éliminer le projet |

<p className="example-label"><strong>Exemple pratique</strong> Préserver le groupe PRISMA en tant qu'auteur de l'organisation</p>

Pour ajouter **Le groupe PRISMA**, sélectionnez **Add creator → Creator role: Author → Name type: Organization**, entrez le nom complet et **Save**. Rouvrir le dossier et vérifier que l'organisation suit ses quatre auteurs personnels. Comparer la citation générée avec la [Liste des auteurs de l'éditeur](https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1000097).

![La référence APA préserve l'auteur de l'organisation](/img/open-science/v0.27.0/05-organization-citation.webp)

v0.30.2 corrige l'analyse du nom d'auteur PubMed, y compris les noms de famille, les initiales et les suffixes. Lorsque vous importez ou remplissez des métadonnées, inspectez les champs du créateur et produisez des citations en fonction de la source liée. Ne présumez pas que l'installation de la mise à jour réécrit les métadonnées déjà stockées dans votre bibliothèque.

## Collections intelligentes {/* #smart-collections */}

Activer **Smart collection** dans **New collection** pour filtrer les enregistrements de la bibliothèque contre des règles explicites. Sélectionnez **Scope** (toutes les références, un projet ou une collection), ajoutez le **Inclusion criteria** requis et le **Exclusion criteria** optionnel, puis choisissez les options de preuve et de mise à jour. Contrairement à une description de collection ordinaire, les descriptions de collection intelligente fournissent un contexte pour l'évaluation des modèles.

Configurez d'abord **Settings → Model → Classification models → Smart collections**; Cette fonctionnalité n'a pas de modèle par défaut. **Included**, **Needs review**, **Excluded** et **Not evaluated** distinguent les enregistrements appariés, incertains, rejetés et non évalués. Ouvrez **Evaluation details** et examinez la source réelle avant de choisir **Include** ou **Exclude**. Les décisions manuelles survivent aux mises à jour jusqu'à ce que vous rétablissiez la décision modèle.

**Trial run (up to 20 references)** enregistre les résultats. **Live rule preview** évalue un brouillon sans les sauvegarder. **Update automatically** s'applique aux enregistrements nouveaux ou modifiés dans la portée sélectionnée; il est opt-in et peut engager des coûts de classification. Il ne découvre pas de nouveaux documents en dehors de la Bibliothèque. Suivez [le flux de travail illustré de la sélection](../workflows/screen-literature.md) de la recherche à l'exportation examinée.

Au cours d'une course, ouvrez **Screening process** pour inspecter la progression et utilisez **Pause / Analyse des résidus** pour faire une pause ou continuer. Les modifications apportées aux règles, aux documents ou aux progrès enregistrés peuvent rendre une opération antérieure non récupérable. **Retour aux résultats** retourne à la liste des décisions. Les marqueurs de champ **Project** et **Collection** distinguent les types de sources et les liens vers la source; ils ne sont pas des permissions de partage multi-utilisateurs.

## Organiser les dossiers acceptés {/* #organize-the-accepted-records */}

Créez une collection ordinaire avec **New collection** et **Smart collection**, remplissez **Name** et **Description** en option, puis **Create collection**. La description est le texte organisationnel, et non le contexte de l'agent. Annuler/Fermer rejette l'ébauche. Sélectionnez les enregistrements dans toutes les références et utilisez **Add to collection** ou **Add to project**. La sélection s'efface après l'opération; sélectionner si vous ajoutez une autre destination.

Dans une vue détaillée, les cases à cocher projet et collection montrent les liens. **Manage Tags** ajoute des balises organisationnelles. La note d'un à cinq étoiles de la table est votre annotation, pas un score de qualité de preuve automatique. **Clear selection** laisse les enregistrements inchangés.

| Contrôle de table | Portée |
| --- | --- |
| Rechercher des références | Champs bibliographiques incluant le titre, les créateurs, la publication, les identifiants, les résumés et les notes |
| Trier les références | Choisissez l'ordre affiché |
| Filtres | Affiner par type, année, étiquette et conditions de texte intégral disponibles |
| Personnaliser | Choisir/commander les colonnes affichées |
| Références par page | Lignes 25, 50 ou 100 |
| Cochez la case de la ligne / Tout sélectionner | Définir les objectifs pour les actions globales disponibles |
| Exporter | Exporter certains documents bibliographiques; il ne paquete pas automatiquement tous les PDF |

Le nombre total de bibliothèques est indépendant du résultat actuel de recherche/filtre. Lire la vue affichée et la sélection compte avant une action par lots; un résultat filtré plus petit ne signifie pas que les enregistrements ont été supprimés.

Effacer la recherche et les filtres avant de conclure un enregistrement a disparu. Les liens de projet/collecte ne créent pas de versions de métadonnées indépendantes pour chaque destination.

## Ajouter et lire le texte intégral {/* #add-and-read-full-text */}

**Find full-text PDF** vérifie les fournisseurs publics applicables: Europe PMC/PMC, OpenAlex, Unpaywall et arXiv. Les identifiants disponibles et les contacts/crédences configurés déterminent l'applicabilité. Inspectez la source, l'étiquette de la version et l'URL avant **Add attachment**.

<p className="example-label"><strong>Exemple pratique</strong> Joindre l'éditeur PDF à l'enregistrement PRISMA 2020</p>

Si **Add attachment** échoue après qu'une source ait été trouvée, téléchargez le PDF accessible au public de l'éditeur et utilisez **Add PDF** sur le même enregistrement. Ouvrez le PDF joint et comparez son titre et le DOI avec l'enregistrement de l'éditeur. Dans cet exemple, **Aperçu prisma-2020-statement.pdf** montre le papier correspondant PRISMA 2020 : **Pages 806.1 KB et 15**.

![Succès de l'éditeur PDF](/img/open-science/prisma-walkthrough/10-publisher-pdf-preview.webp)

Un résultat source n'est pas une pièce jointe enregistrée. Un PDF ci-joint n'est pas une preuve de lecture de l'agent. **Read with agent** fournit le contexte pour une demande ultérieure. Une référence Compositeur `@` peut sélectionner un enregistrement exact, une bibliothèque de projet ou une collection : une collection accorde une portée de récupération, pas l'inclusion automatique du texte complet de chaque papier. Les commandes de lecture PDF sont en [Aperçus](previews.md).

Si aucune copie publique n'est trouvée, conservez les métadonnées vérifiées et utilisez un PDF local légitimement disponible, le cas échéant. Les tâches de recherche/téléchargement de l'arrière-plan peuvent exposer les contrôles de pause-après-courant, de reprise, de révision et d'annulation; l'annulation ne signifie pas que les éléments antérieurs complétés sont annulés.

<ToolOperationGroup>
<summary>Récupérer le texte complet en lots et le reprendre plus tard</summary>

### Récupérer le texte complet en lots et le reprendre plus tard {/* #retrieve-full-text-in-batches-and-resume-later */}

1. Sélectionnez les enregistrements prévus dans la bibliothèque et ouvrez la sélection **More actions → Find full-text PDF**.
2. Après le début de la recherche, choisissez **Pause** au besoin. L'élément actuel se termine avant que la tâche ne s'arrête.
3. Vérifiez **Vérification** et **Pending**, puis sélectionnez **Continue search**. Après avoir fermé le panneau, retourner à la même tâche par **Background tasks → Open**.
4. Examinez chaque source et avertissement du candidat avant de sélectionner les éléments et cliquez sur **Add selected**.
5. Le téléchargement prend également en charge la pause et **Continue download**. Inspectez le **Ajouté / échoué / sauté** final et rouvrez toute pièce jointe ajoutée avec succès.
6. Pour rejeter une tâche non désirée, utilisez **Remove task** dans **Background tasks**. Après la suppression, confirmez que la tâche a disparu et que ses références et pièces jointes sont toujours ouvertes. La suppression de la tâche ne les supprime pas.

![Recherche interrompue après l'élément actuel, en conservant les dossiers en attente](/img/open-science/priority-completion/14-literature-batch-paused.webp)

Une recherche en pause conserve ses dossiers vérifiés et en attente. Après avoir poursuivi ou rouvert la tâche, inspecter les comptes finals et chaque résultat de chaque article. La découverte du candidat et la pièce jointe PDF réussie sont des résultats distincts.

![Réouverture de la recherche en cinq dossiers effectuée à partir des tâches de fond](/img/open-science/priority-completion/15-literature-batch-resumed.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Une source existe mais la PDF ne peut pas être ajoutée</summary>

### Une source existe mais la PDF ne peut pas être ajoutée {/* #a-source-exists-but-the-pdf-cannot-be-added */}

Pour **PDF could not be added**, vérifiez les exigences de connexion source, la validité du lien, la limite de taille affichée et la configuration actuelle proxy/DNS. Évitez de créer des références en double comme mécanisme de réessayer.

Si une source PDF se résout à une adresse réservée telle que `198.18.x.x`, le téléchargeur la rejette. Suivez [Réseau](network.md) pour restaurer la résolution publique vérifiable, puis reessayez; ne pas désactiver la vérification de l'adresse. Si vous avez déjà un PDF téléchargé légitimement, utilisez **Add PDF** et vérifiez son titre, DOI et le nombre de pages.


</ToolOperationGroup>

## Format et copie des citations {/* #format-and-copy-citations */}

Ouvrez **More actions → Citation**. Sélectionnez **Citation style**, inspectez la référence et le formulaire dans le texte, puis choisissez **Copy reference**, **Copy in-text citation**, **Copy BibTeX** ou **Copy RIS** au besoin. Vérifiez les noms, l'année, la ponctuation et DOI par rapport à la source avant de les réutiliser. La représentation correspondante ne répare pas un dossier incomplet.

**Manage citation styles…** ouvre la gestion de style. L'ensemble comprend APA, MLA, Chicago auteur-date, Vancouver, IEEE, Nature, AMA et Harvard. **Preview** montre un échantillon de style, **Browse styles** ouvre le catalogue de style externe, et **Import CSL** importe un fichier de style local. L'importation de PLOS CSL et son application sont vérifiées ci-dessous. Copier et exporter sont des opérations distinctes; Vérifiez les deux en déplaçant une bibliographie.

<ToolOperationGroup>
<summary>Vérifiez une vraie citation après avoir importé un style journal</summary>

### Vérifiez une vraie citation après avoir importé un style journal {/* #check-a-real-citation-after-importing-a-journal-style */}

<p className="example-label"><strong>Exemple pratique</strong> Appliquer le style de citation PLOS à un enregistrement PRISMA</p>

Dans **Library → Settings → Import CSL**, choisissez le fichier `plos.csl` indépendant dans le [CSL styles dépôt](https://github.com/citation-style-language/styles/blob/master/plos.csl). Dans cet exemple, **Imported styles** a augmenté de zéro à un et a montré **Bibliothèque publique des sciences**. Retourner au panneau **Citation** de l'enregistrement PRISMA réel et sélectionner ce style sous **Citation style**. Vérifiez la référence numérotée et la citation en texte de `[1]`. L'aperçu de la gestion de style utilise un exemple d'article; Inspectez votre dossier avant de copier une citation.

![Style PLOS importé appliqué à l'enregistrement réel PRISMA](/img/open-science/v0.27.0/06-imported-csl-citation.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Copier un document de citation ou d'exportation réutilisable</summary>

### Copier un document de citation ou d'exportation réutilisable {/* #copy-a-citation-or-export-reusable-records */}

<p className="example-label"><strong>Exemple pratique</strong> Copier et retourner les notices de citation PRISMA</p>

Les quatre boutons Citation copie écrivent des représentations différentes au presse-papiers. Coller dans l'éditeur prévu et inspecter le résultat avant de quitter le panneau.

| Bouton | Résultat vérifié pour PRISMA 2009 |
| --- | --- |
| Copier la référence | La référence APA a retenu les quatre auteurs personnels, le groupe PRISMA, l'année et le DOI |
| Copier la citation dans le texte | `(Moher et al., 2009)` |
| Copier le BibTeX | Une `@article` entrée avec l'auteur de l'organisation enfermé dans des accessoires |
| Copier le RIS | A `TY  - JOUR` enregistrement avec les champs auteur, titre, année et DOI |

![Contrôles de copie de citation pour l'enregistrement réel PRISMA](/img/open-science/local-todo-batch/01-citation-copy.webp)

Pour un fichier, fermez Citation, sélectionnez les lignes de table requises et choisissez **Export → BibTeX** ou **RIS**. Choisissez l'emplacement dans la boîte de dialogue de sauvegarde du système et attendez **Saved**. Ces fichiers contiennent des notices bibliographiques, et non un ensemble de pièces jointes PDF. Réimportez le fichier enregistré dans une collection de test avec **Reuse existing reference** et vérifiez son nombre de correspondances. Les deux fichiers PRISMA exportés ont été réimportés et réutilisés le DOI existant sans créer un autre enregistrement.

BibTeX magasins année et mois ici, donc son voyage aller-retour retourné `2009-7`; RIS conservé `2009-07-21`. Vérifiez la précision de la date lors de la fusion. Les champs d'auteurs SIF ordinaires ne peuvent pas conserver un type d'organisation distinct dans un autre gestionnaire; Inspecter l'éditeur de création importé quand cette distinction est importante.


</ToolOperationGroup>

## Résoudre les doublons et récupérer les références {/* #resolve-duplicates-and-recover-references */}

<p className="example-label"><strong>Exemple pratique</strong> Fusionner et restaurer un enregistrement PRISMA avec ses pièces jointes</p>

<ToolOperationGroup>
<summary>Conservez un enregistrement et ses pièces jointes</summary>

### Conservez un enregistrement et ses pièces jointes {/* #keep-one-record-and-its-attachments */}

1. Ouvrez **Duplicates → Review duplicates**. La vue scanne les enregistrements actifs de la Bibliothèque, pas seulement la collection actuelle.
2. Sous **Keep reference**, choisissez l'enregistrement avec l'identité vérifiée. Comparer DOI, créateurs, nombres de pièces jointes et date ajoutée. **Show all fields** révèle des champs cachés par la vue axée sur les conflits.
3. Pour chaque champ en conflit, sélectionnez sa source. Dans la comparaison PRISMA BibTeX, choisissez la date de publication complète de `2009-07-21` sur `2009-7`. Les champs vides peuvent être remplis à partir de l'autre enregistrement.
4. Lire **After merging** et son annexe, collection et projet compte. C'est seulement alors que sélectionner **Merge references**; **Cancel** laisse les enregistrements séparés.
5. Réouvrir le survivant et vérifier les métadonnées, les liens et le contenu de PDF. L'enregistrement fusionné apparaît dans la corbeille sous le nom de **Merged duplicate**.

![Comparer les dates de publication du survivant et du conflit](/img/open-science/local-todo-batch/03-merge-bibtex.webp)

Un PDF avec un nom de fichier extrait à la place de son titre ne peut pas entrer dans un groupe de duplicata. Corriger son titre et DOI en utilisant l'enregistrement de l'éditeur, puis passer en revue le groupe correspondant. Après fusion, confirmez les ouvertures de PDF conservées et les associations de collecte/projet sont toujours présentes.

![L'enregistrement fusionné conserve ses liens PDF et organisationnels](/img/open-science/local-todo-batch/06-merged-attachment-links.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Restaurer une référence accidentellement retirée</summary>

### Restaurer une référence accidentellement retirée {/* #restore-an-accidentally-removed-reference */}

Utilisez la ligne **More actions → Move to Trash**. Il disparaît des vues actives de la Bibliothèque, du projet et de la collection. Dans **Trash**, recherchez par titre ou identifiant, ouvrez son menu ligne et choisissez **Restore**. Restaurer avant d'éditer, de prévisualiser ou d'exporter : ces contrôles sont désactivés dans la corbeille. Rouvrir le projet original et les collections pour vérifier les liens restaurés. Dans cet exemple, la restauration de l'enregistrement PRISMA a conservé son PDF et les trois liens.

![Restaurer une référence à partir de son menu ligne Corbeille](/img/open-science/local-todo-batch/07-trash-restore.webp)


</ToolOperationGroup>

<ToolOperationGroup>
<summary>Supprimer définitivement un duplicata non désiré</summary>

### Supprimer définitivement un duplicata non désiré {/* #permanently-remove-an-unwanted-duplicate */}

Dans la corbeille, choisissez **More actions → Delete permanently** et lisez la confirmation. **Cancel** conserve la ligne. La confirmation supprime les références et métadonnées sélectionnées; Les fichiers joints non partagés sont nettoyés après. Les sorties historiques sont conservées et les index de recherche expirent séparément, donc ce n'est pas une effacement sécurisé. Exporter tout ce qui est nécessaire avant de supprimer.

Après la suppression, vérifiez que l'enregistrement sélectionné a laissé la corbeille et que la référence conservée s'ouvre toujours avec ses pièces jointes. La suppression d'un lien de collection, le déplacement d'un enregistrement vers la corbeille et la suppression permanente de celui-ci ont des champs d'application différents.

![Lire la portée précise de la suppression permanente](/img/open-science/local-todo-batch/08-reference-delete-scope.webp)


</ToolOperationGroup>

## Modifications apportées aux pièces jointes et modifications simultanées {/* #attachment-changes-and-concurrent-edits */}

Avant de supprimer une pièce jointe, lisez sa confirmation de suppression et vérifiez que le fichier/version est ciblé. Utilisez l'historique des versions disponibles pour inspecter les versions de pièces jointes antérieures. La suppression d'un PDF, le déplacement de sa référence à la corbeille et la suppression permanente d'une référence ont des champs d'application différents; Les preuves de conversation conservées peuvent restreindre le nettoyage.

Si un autre client modifie une collection pendant que votre éditeur est ouvert, une sauvegarde statique peut être rejetée. Réouvrez la dernière collection, comparez ses valeurs sauvegardées avec votre changement prévu et réessayez contre cet état. Une erreur de rafraîchissement ou de nettoyage après l'enregistrement ne signifie pas automatiquement que l'enregistrement a échoué : inspectez l'enregistrement courant avant de répéter l'action.


Sources: [importation par lots](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx), [Éditeur de métadonnées](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteratureMetadataEditor.tsx), [historique/suppression de l'attachement](https://github.com/aipoch/open-science/commit/f4a82d4a), [éditions simultanées](https://github.com/aipoch/open-science/commit/dbb9560a).

## Gardez les notes de lecture PDF {/* #keep-pdf-reading-notes */}

Ouvrez la pièce jointe PDF d'une référence et utilisez **Notes & Annotations** pour les annotations, les questions de page et les notes de document. La même version de fichier de bibliothèque partage ces notes entre les projets et les sessions. Trouvez une note sous **Library** dans la recherche globale, puis choisissez **Show annotation source** pour revenir à PDF. Voir [Annotations et notes de document PDF](pdf-notes.md) pour les étapes et les exportations.
