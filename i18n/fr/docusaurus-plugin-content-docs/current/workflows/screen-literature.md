---
title: "Sélectionner des articles avec une collection intelligente"
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Sélectionner des articles avec une collection intelligente {/* #screen-papers-with-a-smart-collection */}

<p className="example-label"><strong>Exemple pratique</strong> Sélection d'études primaires sur les catalyseurs monoatomes pour l'électroréduction du CO2</p>

Transformer une liste de candidats en un ensemble de lectures révisé à l'aide de critères d'inclusion et d'exclusion. Cet exemple récupère huit documents, gère une collection intelligente sur leurs titres et résumés, vérifie les décisions et exporte cinq études primaires. Il s'agit d'une sélection ciblée de réunions de groupe, et non d'un examen systématique exhaustif ou d'une évaluation de la qualité en texte intégral.

## 1. Trouver et accepter les candidats {/* #screening-inputs */}

Créez le projet **Dépistage de la catalyse mono-atome** et ouvrez une conversation avec un modèle de travail. Cette exécution a utilisé **Codex subscription**. Activer les connecteurs de littérature pertinents et configurer leur [informations d’identification](../guides/connectors.md) si nécessaire. Envoyer :

```text
I am preparing a group meeting on single-atom catalysts for
electrochemical CO2 reduction. Find eight relevant papers published
from 2017 through 2022, including both primary studies and review
articles so I can screen them. Propose the references to the Library
Inbox, with verified titles, DOIs, abstracts and source links. Save a
short candidate list identifying each paper's study type.
Keep the output in English.
```

Ouvrez **Library → Inbox**, vérifiez chaque titre, DOI et source, sélectionnez ces huit enregistrements et choisissez **Accept**. Confirmer qu'ils sont liés à ce projet. Les autres dossiers de la boîte de réception en attente doivent être examinés par eux-mêmes; ne pas les accepter simplement pour effacer la boîte de réception.

Le <ExampleDownload path="/examples/v0330/co2_single_atom_candidate_list.md">Liste des candidats</ExampleDownload> enregistré enregistre cinq études primaires et trois revues/comptes, y compris les différences entre les années de première et de publication en ligne. Pour une répétition exacte, ajouter les huit DOI de cette liste au projet. Une nouvelle recherche thématique peut renvoyer différents candidats.

## 2. Reliure le modèle de sélection {/* #screening-model */}

Ouvrez **Settings → Model → Classification models**. Sous **Smart collections**, sélectionnez un service de classification configuré et son modèle. Utilisez **Check model** sur la carte de service et validez **Check passed**. Cet exemple utilise **TypeSafe AI / Jev Latest**; Main continue avec Codex.

![Une reliure de modèle séparée pour les collections Smart](/img/open-science/v0330/classification-smart.webp)

Les collections intelligentes n'ont pas de modèle par défaut. La liaison **Automatic capability selection** est une fonctionnalité différente et ne peut se substituer à celle-ci. Toutes les collections intelligentes partagent la liaison de sélection. Voir [la configuration du classement](../guides/models.md#smart-collection-model).

## 3. Définir la portée et les règles {/* #screening-rules */}

Dans la bibliothèque, choisissez **New collection**, entrez **Réduction du CO2 - Études primaires** et activez **Smart collection**. Définissez **Scope** sur le **Project** nommé **Dépistage de la catalyse mono-atome**, donc seules les huit références de projet sont évaluées.

| Champ | Texte utilisé dans cet exemple |
| --- | --- |
| Description | Select primary experimental papers for a group meeting on single-atom catalysts for electrochemical CO2 reduction. |
| Inclusion criteria | Published from 2017 through 2022 inclusive. Reports original experimental research on atomically dispersed metal catalysts used for electrochemical CO2 reduction. |
| Exclusion criteria | Exclude reviews, Accounts, perspectives and purely computational studies. Exclude studies limited to thermal CO2 conversion or reactions other than CO2 electroreduction. |

Tous les critères d'inclusion doivent être respectés et aucun critère d'exclusion ne peut s'appliquer. Garder **Use available full text** et **Update automatically** hors tension pour ce titre-et-abstraction, puis choisir **Create collection**. La capture d'écran affiche les règles sauvegardées réouvertes via **Collection rule → Edit rule**.

![Critères sauvegardés, portée limitée du projet et options en matière de preuves](/img/open-science/v0330/smart-collection-rules.webp)

**Live rule preview** peut aider à ajuster un brouillon, mais ses résultats ne sont pas enregistrés. **Use available full text** envoie le texte disponible de PDF au service de classification; Les PDF longs utilisent des passages pertinents et les PDF indisponibles reviennent au titre et au résumé. Vérifiez les preuves réelles présentées pour une décision avant de les considérer comme une évaluation en texte intégral.

## 4. Lancer un petit passe de dépistage {/* #screening-trial */}

Ouvrez **Collection actions → Trial run (up to 20 references)**, examinez la portée et choisissez **Start trial run**. L'essai enregistre les décisions et ouvre **Screening process**. Suivez le décompte traité, les candidats en attente et les résultats reçus. **Correspondances IA** décrit les décisions de modèle de cette course; les décisions manuelles déterminent toujours l'adhésion à la collection.

Pour interrompre un passage en cours d'exécution, choisissez **Pause** (étiquette **Pause analysis**), attendez **En pause**, puis utilisez **Resume analysis**. Une course ne peut plus être recommençable après ses règles, ses candidats ou son changement de progression enregistré; Vérifiez la règle actuelle avant de commencer un nouveau passage. **Retour aux résultats** retourne à Inclus, Examen des besoins, Exclus et non évalué. **Run details** affiche les informations sur le passage.

![Le processus de présélection terminé pour les mêmes huit candidats](/img/open-science/v0331/smart-completed.webp)

| Voir | Mode d’emploi |
| --- | --- |
| Inclus | Lisez les documents correspondants et confirmez l'admissibilité. |
| À examiner | Résoudre l'incertitude ou une évaluation désuète par rapport à la source réelle. |
| Exclus | Vérifiez que la raison d'exclusion est conforme à vos critères. |
| Non évalué | Vérifier les preuves manquantes ou une erreur d'évaluation signalée avant de réessayer. Ce n'est pas une décision d'exclusion. |

Cliquez sur **Evaluation details** d'une ligne pour inspecter sa décision, les scores correspondants, les preuves et l'historique du modèle. Les scores décrivent l'appariement des règles; ils ne sont pas des mesures de la qualité de l'étude ou de la taille des effets.

![Une véritable décision incertaine avec des preuves titre-abstract et des scores de modèle](/img/open-science/v0330/screening-review.webp)

## 5. Examiner et confirmer l'ensemble de lecture {/* #screening-review */}

Ouvrez le titre papier, lisez son résumé et suivez son lien DOI/source au besoin. Comparer la date de publication, le type d'étude, le catalyseur et la réaction avec les règles. Choisir **Include** ou **Exclude** seulement après cette vérification.

Dans l'exemple, le premier laissez-passer excluait deux examens, laissait cinq études primaires en **Needs review** et ne pouvait pas évaluer un seul dossier avec des preuves suffisamment lisibles. Les cinq études primaires ont ensuite été incluses manuellement; le reste de l'examen a été exclu manuellement après vérification de son type d'étude. Il s'agit de l'étape de l'examen, et non de cinq décisions d'inclusion automatique.

![Une étude primaire marquée manuellement après avoir examiné son résumé et ses critères](/img/open-science/v0330/screening-manual-decision.webp)

| Compte rendu révisé | Décision finale | Base |
| --- | --- | --- |
| Ju, 2017 · [10.1038(S41467-)017- Oui.01035-z](https://doi.org/10.1038/s41467-017-01035-z) | Inclure | Comparaison expérimentale des électrocatalyseurs métal-azote-carbone. |
| Zhang, 2019 · [10.1002/anie.201906079](https://doi.org/10.1002/anie.201906079) | Inclure | Préparation et essais électrochimiques des sites FeN5. |
| Cai, 2021 · [10.1038/s41467-020-20769-x](https://doi.org/10.1038/s41467-020-20769-x) | Inclure | Étude expérimentale du catalyseur Cu-site pour la conversion du CO2 en méthane. |
| Li, 2022 · [10.1021/acs.nanolett.1c04382](https://doi.org/10.1021/acs.nanolett.1c04382) | Inclure | Tuyautage expérimental du phosphore des catalyseurs à un atome Fe. |
| Zhang, 2021 · [10.1002/anie.202014718](https://doi.org/10.1002/anie.202014718) | Inclure | Préparation expérimentale et essais de CO2 de sites Ag soutenus. |
| Su, 2019 · [Comptes 10.1021/acs.8b00478](https://doi.org/10.1021/acs.accounts.8b00478) | Exclure | Compte; En dehors de la règle de l'étude primaire. |
| Li, 2020 · [10.1002/adma.202001848](https://doi.org/10.1002/adma.202001848) | Exclure | Examen; conserver séparément en tant que lecture de fond. |
| Wang, 2022 · [10.1002/smm2.1101](https://doi.org/10.1002/smm2.1101) | Exclure | Revue, classifiée manuellement après vérification de la source. |

Les décisions manuelles demeurent lorsque les mises à jour de la collecte. **Use model decision** supprime une surcharge manuelle individuelle; **Reset manual decisions** dans le menu de la collection a une portée plus large. Examiner cette portée avant de l'utiliser.

## 6. Exporter et utiliser les papiers sélectionnés {/* #screening-export */}

Confirmer les entrées **Y compris 5**, **3 non compris** et zéro restantes **Needs review** ou **Not evaluated**. Les lignes d'inclusion doivent indiquer **Manually included** pour cet exemple. Les scores du premier passage de votre modèle peuvent différer.

![Cinq papiers inclus manuellement et la division finale 5/3](/img/open-science/v0330/screening-included.webp)

Choisissez **Collection actions → Export included references → BibTeX** ou **RIS**, enregistrez le fichier et vérifiez qu'il contient cinq enregistrements DOI. Le <ExampleDownload path="/examples/v0330/screened-primary-studies.bib">exemple BibTeX</ExampleDownload> conserve les citations exportées avec des résumés supprimés pour redistribution. Il s'agit d'une bibliographie, et non d'un journal de décision de sélection ou d'un paquet PDF. Gardez le <ExampleDownload path="/examples/v0330/screening-decisions.csv">du tableau des décisions révisé</ExampleDownload> à côté lors de la remise de la sélection.

Utilisez le jeu sélectionné pour un [groupe-réunion lue pack](journal-club.md). Obtenir et inspecter les textes complets avant d'extraire des résultats détaillés ou de comparer les performances du catalyseur. **Update automatically** peut évaluer des enregistrements nouveaux ou modifiés dans la portée choisie et peut encourir des coûts de service; il ne recherche pas de nouvelles bases de données externes.
