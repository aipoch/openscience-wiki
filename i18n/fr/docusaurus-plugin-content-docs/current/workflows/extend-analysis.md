---
title: "Étendre une analyse avec un Specialist installé"
last_update:
  date: '2026-09-17'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Étendre une analyse avec un Specialist installé {/* #extend-an-analysis-with-an-installed-specialist */}

<p className="example-label"><strong>Exemple pratique</strong> Étendre une courbe de concentration de théophylline avec des paramètres d'exposition observés</p>

Utilisez **Pharmacométrie PK/PD Conception Specialist** pour vérifier les données de concentration-temps, dessiner les profils, puis calculer les paramètres d'exposition. Les livrables sont une table de douze sujets, un graphique de concentration, un script R et un rapport de méthodes. Cet exemple décrit les données de recherche publique; il ne recommande ni traitement ni administration.

L'entrée est l'observation publique de R [Ensemble de données Théoph](https://www.stat.ethz.ch/R-manual/R-devel/library/datasets/html/Theoph.html): 132 de douze sujets. Le temps est en heures, la concentration en mg/L, le poids en kg et la dose en mg/kg. Les calculs utilisent la base R, sans paquets supplémentaires ou identifiants de base de données.

## 1. Installer et sélectionner le Specialist {/* #1-install-and-select-the-specialist */}

1. Ouvrez **Settings → Specialists → Browse Marketplace**. Trouvez **Pharmacométrie PK/PD Conception Specialist**, inspectez ses capacités et installez-les. Cet exemple utilise le paquet **1.0.0** dans Open-Science **0.30.1**.
2. Dans **Settings → Runtimes**, confirmez que R est **Ready** et activé. L'exécution enregistrée a utilisé R **4.4.3**.
3. Ouvrez une nouvelle conversation dans votre projet de recherche. Choisissez un modèle disponible, puis **Agent controls → Specialist → pharmacometrics-pkpd-designer**. L'exécution enregistrée a utilisé **Abonnement Codex / gpt-5.6-sol**.
4. Au début de **chaque message d'analyse**, tapez `/pkpd`, puis sélectionnez **Modélisation de pkpd** dans les suggestions. Confirmez qu'il devient une puce Skill avant de coller l'invite.

**Note de version :** Les captures d'écran utilisent v0.30.1, où le Skill est sélectionné explicitement pour chaque message d'analyse. À partir de v0.30.2, Skills lié est préparé pour les tours Specialist et les tâches déléguées. Sélectionnez d'abord le Specialist; si sa Skill n'est pas disponible, sélectionnez explicitement `/pkpd-modeling` avant d'envoyer la demande.

![Pharmacométrie installée Specialist et ses capacités](/img/open-science/theoph-specialist/installed.webp)

![Sélection du vrai modèle pkpd Skill pour le message actuel](/img/open-science/theoph-specialist/skill-selection.webp)

## 2. Vérifiez les données et dessinez les courbes de concentration {/* #2-check-the-data-and-draw-the-concentration-curves */}

Avec le Skill sélectionné, envoyez :

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

Inspectez le code lorsque **Run R code?** apparaît, puis approuvez le calcul. Ouvrez **Notebook** pour voir la sortie d'exécution. L'entrée enregistrée a **Lignes 132, sujets 12 et observations 11 par sujet**, sans valeurs manquantes ni enregistrements de temps-matière en double.

Ouvrez le CSV généré et tracez. Les sujets 1, 7 et 10 ont des concentrations non nulles au moment zéro; Ils sont conservés. Le facteur objet de l'ensemble de données est commandé par concentration maximale, de sorte que son ordre affiché n'a pas besoin d'être numérique.

L’aperçu CSV affiche les 100 premières lignes ; le fichier enregistré contient les 132 observations.

![La table d'entrée enregistrée dans Open-Science](/img/open-science/theoph-specialist/input.webp)

![Les courbes de base exécutées et les douze courbes de concentration-temps](/img/open-science/theoph-specialist/baseline.webp)

Fichiers de référence : <ExampleDownload path="/examples/theoph/theoph-input.csv">entrée CSV</ExampleDownload>, <ExampleDownload path="/examples/theoph/theoph-concentration-time.png">diagramme de concentration</ExampleDownload>, <ExampleDownload path="/examples/theoph/theoph-data-check.md">vérification des données</ExampleDownload>.

## 3. Ajouter les paramètres d'exposition {/* #3-add-the-exposure-metrics */}

Téléchargez le <ExampleDownload path="/examples/theoph/nca-conventions.md">Référence des méthodes NCA</ExampleDownload> et ajoutez-le via **+ → Attach files** pour que Notebook puisse le lire. Utilisez cette référence pour l'exemple : elle spécifie la Cmax/Tmax observée et l'ASC trapézoïdale tout linéaire, sans estimer une pente terminale.

Sélectionnez à nouveau `/pkpd-modeling` dans la même conversation, puis envoyez :

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

Inspecter et approuver le fichier lit et le calcul de R. Si un fichier à l'appui manque, joignez-le avant de continuer. Si Notebook signale une erreur, ouvrez la cellule défaillante et corrigez l'entrée ou la dépendance nommée avant de réessayer.

## 4. Ouvrir et vérifier les résultats {/* #4-open-and-check-the-results */}

Ouvrez **theoph-nca-summary.csv** à partir des fichiers générés. Il devrait y avoir une rangée pour chacun des douze sujets. Vérifiez les unités et le temps de dernière observation ainsi que les valeurs métriques.

![Paramètres d'exposition enregistrés au niveau du sujet](/img/open-science/theoph-specialist/results.webp)

| Sujet | Cmax (mg/L) | Tmax (h) | ASC0–dernier (mg·h/L) | Dernière observation (h) |
| --- | --- | --- | --- | --- |
| 1 | 10.5 | 1.12 | 148.92305 | 24.37 |
| 2 | 8.33 | 1.92 | 91.52680 | 24.30 |

Ouvrez **theoph-nca-report.md** et **theoph-nca.R** ensemble. Le rapport doit correspondre au script exécuté : trier les observations de chaque sujet par le temps, prendre le maximum observé et son plus tôt temps, puis somme `(C1 + C2) × (t2 - t1) / 2` sur les observations adjacentes. Les deux premières lignes ci-dessus offrent une comparaison rapide; vérifier les douze rangées avant d'accepter un rediffusion.

Ce sont des mesures observées. Les derniers temps d'échantillonnage diffèrent d'un sujet à l'autre, et la règle trapézoïdale linéaire est une approximation explicite. Les résultats ne permettent pas d'établir l'exposition à l'infini, un modèle pharmacocinétique adapté ou une incertitude de mesure.

Téléchargez les enregistrements <ExampleDownload path="/examples/theoph/theoph-nca-summary.csv">résumé CSV</ExampleDownload>, <ExampleDownload path="/examples/theoph/theoph-nca.R">Script R</ExampleDownload> et <ExampleDownload path="/examples/theoph/theoph-nca-report.md">rapport sur les méthodes</ExampleDownload>. Conservez l'entrée et le script ensemble lors du redémarrage en dehors de l'application.

<span id="choose-a-finish-you-can-inspect" />
<span id="choose-inputs-for-an-installed-role" />
<span id="turn-an-existing-result-into-a-checked-methods-draft" />
<span id="inspect-qc-variation-with-the-packaged-pca-skill" />
<span id="transform-a-count-matrix-for-exploratory-plots" />
<span id="build-a-bounded-evidence-table-and-reanalysis-plan" />
<span id="handle-a-partially-completed-analysis" />
<span id="metadata-retrieval-blocked-by-the-local-network" />
<span id="keep-metadata-retrieval-separate-from-completed-analysis" />
