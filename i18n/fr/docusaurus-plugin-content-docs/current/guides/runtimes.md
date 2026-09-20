---
title: "Durées d'exécution Python et R"
last_update:
  date: '2026-09-20'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';

# Durées d'exécution Python et R {/* #python-and-r-runtimes */}

Ouvrez **Settings → Runtimes** pour sélectionner les environnements Python et R disponibles pour les ordinateurs portables et l'Agent. Le statut **Ready** d'un environnement indique une détection/mise en place réussie; son commutateur **Enable** contrôle séparément la disponibilité de l'Agent.

Choisissez un environnement géré par l'application ou un interprète existant. Inspectez son chemin, sa version, son état Ready et Activez le commutateur avant utilisation. Le système R et l'application R peuvent coexister.

<span id="verification-still-required" />

<PlatformGuide />

## Choisissez un environnement pour votre projet {/* #before-choosing-an-environment-for-a-project */}

Enregistrez le nom, le chemin et la version de l'interprète. Pour une première analyse Python, préférez l'environnement isolé géré par l'application afin que les changements de paquets ne modifient pas un environnement de recherche non lié. Inspectez **Packages** pour les bibliothèques requises avant de demander l'installation. Une liste de paquets réussie est une vérification en lecture seule; il n'accorde pas à l'agent la permission de modifier un interprète externe.

Après un échec d'exécution, distinguer un interprète non disponible, un paquet manquant, une requête refusée et une erreur de code. La réinstallation est appropriée pour un temps d'exécution géré cassé, pas pour chaque analyse échouée. Si vous avez besoin de reproduire un résultat, conservez la version d'entrée et le code avec les détails d'exécution.

## Comprendre les principaux contrôles {/* #understand-the-main-controls */}

| Contrôle | Objet et limites |
| --- | --- |
| **Recheck** | Rafraîchir les interprètes découverts et leur statut. Le panneau montre la dernière fois. Indisponible pendant les travaux de configuration en conflit. |
| **Network settings** | Ouvrez la configuration pour la protection réseau Notebook. La bannière explique si les sessions et les téléchargements de paquets sont limités aux domaines approuvés. |
| **Let the Agent create environments** | Contrôlez si l'Agent peut créer des environnements et configurer des runtimes manquants. Ce désactivation ne supprime pas les contrôles explicites de configuration ou de réparation de l'utilisateur. |
| **Add interpreter…** | Ouvrez le sélecteur exécutable système pour un interprète existant. Sélectionnez l'exécutable réel, puis confirmez son chemin détecté et son état Ready. |
| **Download and set up** | Préparer un environnement géré par l'application lorsqu'il manque. |
| **Cancel** pendant l'installation | Demander l'annulation de la configuration en cours d'exécution. Attendez que l'opération s'installe avant de commencer une autre. |
| **Retry setup** | Réempter une configuration infructueuse après avoir résolu sa cause. |
| **Activer &#91;l'environnement&#93;** | Rendre l'environnement disponible pour la sélection des agents. La désactivation d'un environnement en service peut nécessiter une confirmation de l'impact. |
| **Allow package install** | Consentement séparé pour un environnement externe Python ou R activé. Le consentement de R est limité à une bibliothèque personnelle sélectionnée. L'inscription des paquets n'exige pas le consentement d'installation. |
| **Paquets &#91;compte&#93;** | Ouvrez l'inventaire du paquet installé pour cet interprète. |
| **Reinstall** | Ouvrir la confirmation avant de reconstruire un environnement géré par l'application. |

## Installer un environnement géré par l'application {/* #install-an-app-managed-environment */}

<PlatformContent platform="windows">

Vérifiez les deux cartes linguistiques en **Settings → Runtimes**. Chacun a sa propre **Ready** état, version, **Enable** commutateur et **Packages** bouton. Les cartes ci-dessous montrent Python et R activés; l'avertissement ci-dessus concerne la protection réseau Notebook, qui est configurée séparément. Les chemins personnels sont cachés dans ces captures d'écran; Inspectez les chemins complets sur votre propre ordinateur.

<Screenshot src="/img/open-science/windows/runtimes-ready.webp" alt="Cartes d&#39;exécution Windows avec Python et R gérés Prêt et activé" width={1919} height={991} windowBounds={[480, 152, 960, 688]} href="/docs/img/open-science/windows/runtimes-ready.webp" linkLabel="Ouvrez la capture d&#39;écran complète de Windows" />

</PlatformContent>

### Installer Python géré par l'application {/* #install-app-managed-python */}

<PlatformContent platform="macos">

![Paramètres d'exécution avant la configuration de Python](/img/open-science/walkthrough-2026-09-08/34-runtimes-before-setup.webp)

</PlatformContent>
1. Trouvez **Python → App-managed environment**.
2. Sélectionnez **Download and set up**.
3. Lisez le message de progression et attendez. **Cancel** devient disponible pendant que la configuration est en cours.
4. En cas de succès, confirmez **conda: par défaut-python**, **App-managed** et **Ready**.
5. Vérifiez le chemin de l'interprète et le commutateur **Activer conda: par défaut-python**.

<PlatformContent platform="macos">

![Création de l'environnement Python géré par l'application](/img/open-science/walkthrough-2026-09-08/36-runtime-setup-progress.webp)

</PlatformContent>
<PlatformContent platform="macos">

![Configuration Python terminée](/img/open-science/walkthrough-2026-09-08/37-python-runtime-ready.webp)

</PlatformContent>
Confirmez **Ready**, le chemin d'interprétation sélectionné et l'état activé. Le nombre de paquets et les versions peuvent varier selon la source d'installation; n'utilisez pas le chemin temporaire screenshots comme emplacement d'environnement permanent.

### Installer R géré par l'application {/* #install-app-managed-r */}

1. Ouvrez **Settings → Runtimes** et faites défiler vers **R**.
2. Sous **App-managed environment**, sélectionnez **Download and set up**. Un système existant R ne vous empêche pas d'installer cet environnement séparé.
3. Attendez le téléchargement et la création d'environnement pour terminer. Gardez l'application ouverte et lisez toute erreur avant de réessayer.
4. Confirmez **conda: par défaut-r**, **App-managed**, **Ready**, et un commutateur activé.
5. Ouvrez **Packages**. Entrez `r-base` dans **Filter packages** pour vérifier la version et le canal R installés; effacer le filtre pour voir tous les paquets.

<PlatformContent platform="linux">

![R géré par l'application est prêt et activé sur Linux](/img/open-science/linux/r-managed-ready.webp)

</PlatformContent>

<PlatformContent platform="macos">

![Téléchargement de l'environnement R géré par l'application](/img/open-science/guides-walkthrough/70-r-managed-download.webp)

</PlatformContent>
<PlatformContent platform="macos">

![App-gestionné R installé et activé](/img/open-science/guides-walkthrough/71-r-managed-ready.webp)

</PlatformContent>
Confirmer que le filtrage `r-base` retourne le paquet R installé, avec sa version et son canal. Les totaux des paquets reflètent votre environnement et peuvent différer de la capture d'écran.

<PlatformContent platform="macos">

![Vérification de la base r dans l'inventaire du paquet R](/img/open-science/guides-walkthrough/72-r-package-filter.webp)

</PlatformContent>
## Connecter un interprète existant {/* #connect-an-existing-interpreter */}

<PlatformContent platform="windows">

Utilisez **Add interpreter…** dans la langue prévue pour ouvrir le sélecteur de fichiers Windows. Sélectionnez `python.exe` ou `R.exe` dans l'environnement installé, puis choisissez **Open**. Pour un chemin contenant des espaces, utilisez le sélecteur de fichiers ou son champ **File name**. Retour dans Runtimes, vérifiez le chemin et la version détectés, sélectionnez **Recheck** et activez cet environnement. Un seul récupérateur ouvert ne signifie pas qu'un interprète a été ajouté.

</PlatformContent>

### Utiliser R déjà installé sur votre ordinateur {/* #use-r-already-installed-on-your-computer */}

Sélectionnez **Recheck** et inspectez le chemin et la version R détectés. Si votre interprète est absent, utilisez **Add interpreter…** pour sélectionner son exécutable. **Ready** et **Enable** ont des significations différentes: la détection confirme que l'interprète est disponible; permet de le sélectionner par l'Agent.

Dans un R Notebook, vérifiez `R.home()` pour confirmer l'environnement utilisé. Pour installer des dépendances, autorisez une bibliothèque personnelle à l'aide du [étapes d'installation externes R](#external-r-packages).

<PlatformContent platform="macos">

Un chemin détecté tel que `/opt/homebrew/bin/R` identifie une installation système.

</PlatformContent>

### Enregistrer et utiliser Python externe {/* #register-and-use-external-python */}

<PlatformContent platform="linux">

Un interpréteur système tel que `/usr/bin/python3` peut déjà apparaître comme **Ready**. Activez l'environnement que vous comptez utiliser avant de demander à l'Agent de le sélectionner. Les interprètes Python détectés ci-dessous sont désactivés, et l'environnement Python géré par l'application n'a pas été configuré. Pour préparer un environnement géré, utilisez **Download and set up**.

![Linux détecte les interprètes Python existants comme prêts, avec leurs interrupteurs Activer désactivés](/img/open-science/linux/python-detected-disabled.webp)

</PlatformContent>

1. Préparez l'environnement Python que vous comptez utiliser.
2. Sélectionnez **Add interpreter…**, choisissez son exécutable Python et vérifiez **Ready**, le chemin et la version.
3. Utilisez **Recheck** pour vérifier la détection, puis activez cet environnement spécifique.
4. Demandez à l'Agent de le sélectionner explicitement pour le Notebook.
5. Imprimer `sys.executable` et la version Python avant de compter sur ses bibliothèques installées.

<PlatformContent platform="macos">

Si un interpréteur symlink ne peut pas être sélectionné dans le sélectionneur de fichiers macOS, sélectionnez l'exécutable réel de l'environnement prévu. Confirmez `sys.executable` après l'avoir lié. Utilisez un chemin d'installation stable plutôt que le chemin d'exemple temporaire screenshot.

</PlatformContent>

#### Autorisation du paquet et résultat de l'installation {/* #package-permission-and-installation-outcome */}

Pour un nouveau paquet dans un environnement externe Python, vérifiez d'abord **Allow package install**. Après avoir accordé la permission, attendez que l'installation termine et vérifie l'importation dans le même environnement avant de continuer.

Si l'installation signale `403 Forbidden` ou `destination resolves to a non-public network address`, inspecter le nom d'hôte touché et suivre [Réseau](network.md) avant de réessayer. Ces erreurs concernent l'accès au réseau et ne prouvent pas que le paquet n'est pas disponible. Gardez la protection du réseau activée.

#### Désactiver un environnement utilisé par un Notebook {/* #disable-an-environment-used-by-a-notebook */}

Sélectionnez son commutateur **Enable** et lisez le compte de noyau actif/durci avant de confirmer. Désactivation peut fermer le noyau; Après avoir réactivé, sélectionnez à nouveau un temps d'exécution disponible pour la session. Ce panneau fournit des commandes activées/désactivables plutôt qu'une action **Supprimer l'interprète** séparée.

## Installer les paquets dans R externe {/* #external-r-packages */}

Utilisez ceci lorsque votre interprète R existant fonctionne mais a besoin d'un paquet supplémentaire. L'application accorde l'accès à une bibliothèque personnelle existante, et non aux bibliothèques de système ou de site.

1. Dans **Settings → Runtimes**, activez l'environnement externe prévu R et confirmez son chemin/version.
2. Sous **Personal R package library**, inspectez l'emplacement détecté ou sélectionnez une bibliothèque admissible. Si aucun n'est détecté, utilisez **Advanced options → Choose library folder…** pour sélectionner une bibliothèque personnelle enregistrable existante visible par cet interprète R. Cette action ne crée pas de dossier.
3. Activez **Allow package install**. Lire le chemin sélectionné avant d'autoriser : d'autres projets utilisant cette bibliothèque peuvent voir les modifications du paquet installé.
4. Demander le paquet requis via l'opération de gestion du paquet apps, nommant cet environnement R. Suivez le résultat d'installation et n'importe quelle instruction de démarrage du noyau.
5. Exécutez `R.home()`, `.libPaths()`, `library(PACKAGE_NAME)` et `packageVersion("PACKAGE_NAME")` dans cet environnement, en remplaçant le porte-place du paquet. Confirmer que la bibliothèque prévue est utilisée avant de poursuivre l'analyse.

Éteignez **Allow package install** pour révoquer le consentement à l'installation future. Il ne désinstalle pas les paquets déjà écrits. Revoquez le consentement avant de choisir une autre bibliothèque. Si aucun dossier admissible n'existe, préparez une bibliothèque personnelle R en dehors de l'application ou utilisez un environnement géré par l'application; ne pas choisir la bibliothèque système pour contourner une vérification échouée.

## Restaurer les paquets des verrous capturés {/* #conditional-restore */}

Pour un résultat enregistré, ouvrez **Provenance → Environment** et inspectez le verrou capturé. Utilisez **Download bundle** lorsque vous l'offrez. Lisez les instructions et les prérequis avant de restaurer quoi que ce soit.

R externe nécessite une installation `renv` disponible et un `renv.lock` pris en charge; Python externe a besoin d'un verrouillage des exigences supportées avec des hachages épinglés. Un chemin d'interprétation et une liste de noms de paquets à eux seuls ne suffisent pas. Les exigences de l'interprète, de la plate-forme, de l'architecture et de la gestion des paquets doivent correspondre à l'environnement de restauration.

Extraire le paquet, choisir une nouvelle destination enregistrable que vous possédez, et exécuter son `restore-packages.py` inclus avec l'interprète et les chemins de destination réels, en suivant les instructions groupées. Le script vérifie les prérequis et les somme de contrôle avant de restaurer les paquets, puis vérifie leurs versions et chemins efficaces. Si une vérification échoue, résolvez cette condition au lieu d'éditer le verrou pour forcer le succès. Open-Science n'adopte pas ou ne supprime pas cette destination externe.

Il s'agit de la restauration conditionnelle d'un paquet, pas d'un clone d'environnement complet. Réouvrir le résultat et utiliser [Reproductibilité](reproducibility.md) quand une recette capturée prise en charge est disponible pour comparer les sorties.

## Inspecter les paquets installés {/* #inspect-installed-packages */}

Sélectionnez **Packages** sur la carte Python prévue. La boîte de dialogue montre que l'environnement représente le chemin, la source du paquet et l'état.

Saisissez un nom de paquet comme `numpy` dans **Filter packages**, inspectez sa version et son canal, puis effacez le filtre pour restaurer la liste. Utilisez **Close** pour retourner.

<PlatformContent platform="macos">

![Filtrage des paquets Python installés](/img/open-science/walkthrough-2026-09-08/38-python-packages-filter.webp)

</PlatformContent>
Les colonnes de tableau sont **Name**, **Version**, **Build** et **Channel**. Un tiret dans Construction signifie qu'aucune valeur de construction n'est affichée. Cette boîte de dialogue est un inventaire : elle n'a pas de boutons d'installation ou de désinstallation. N'essayez pas de trouver un champ paquet "Installer" dans cette boîte de dialogue.

<PlatformContent platform="windows">

Sur la carte Python, sélectionnez **Packages** et filtrez pour `pip`. Sur la carte R, filtrez pour `r-base`. Vérifiez l'environnement nommé dans le titre de la boîte de dialogue avant de comparer les versions. Ces captures d'écran montrent les paquets installés; ils ne montrent pas une nouvelle installation de paquet.

<Screenshot src="/img/open-science/windows/python-packages.webp" alt="Windows Inventaire Python filtré à pip" width={1920} height={1017} windowBounds={[580, 342, 760, 336]} href="/docs/img/open-science/windows/python-packages.webp" linkLabel="Ouvrez la capture d&#39;écran complète de Windows" />

<Screenshot src="/img/open-science/windows/r-packages.webp" alt="Inventaire de colis Windows R filtré à la base r" width={1920} height={1017} windowBounds={[580, 342, 760, 336]} href="/docs/img/open-science/windows/r-packages.webp" linkLabel="Ouvrez la capture d&#39;écran complète de Windows" />

</PlatformContent>

## Vérifier l'environnement avec une analyse réelle {/* #verify-the-environment-with-a-real-analysis */}

Exécutez un petit calcul dans l'environnement choisi, rouvrez sa sortie et comparez-la avec le [niveau de référence partagé](../reference/example-data.md). Suivez [R Notebook](notebook.md#run-the-same-gene-count-check-in-r) pour l'exécution et l'exportation.

Le [flux de travail de qualité des données](../workflows/data-quality.md) fournit une route Python en utilisant les dépendances existantes. Un calcul réussi ne démontre pas que de nouveaux paquets peuvent être installés ou un noyau redémarré.

<PlatformContent platform="macos">

![Réussite du calcul Notebook](/img/open-science/guides-walkthrough/46-notebook-result.webp)

</PlatformContent>
Si une importation échoue, inspectez l'exécution sélectionnée et ses paquets installés. Pour un téléchargement rejeté parce qu'un nom d'hôte se résout à une adresse réservée, suivez [Réseau](network.md). Le code d'exécution avec les paquets existants n'établit pas que des paquets supplémentaires peuvent être installés.

Avant une autre analyse, inspecter les paquets requis dans l'environnement sélectionné. Utilisez l'opération de gestion du paquet prise en charge si nécessaire, lisez le résultat réel, suivez toute exigence de redémarrage, et vérifiez l'importation. Une autorisation, une carte de progression ou un interprète prêt n'est pas un test d'importation.

Pour un résultat enregistré avec un environnement incomplet ou des preuves d'exécution, ouvrez **Provenance** et inspectez les informations manquantes. Pour préparer une nouvelle version pour une vérification de reproductibilité, suivez [Préparation de l'environnement](reproducibility.md#prepare-environment). La correspondance d'un résultat numérique ne remplit pas la provenance manquante.

### Confirmer l'interprète actif {/* #confirm-the-active-interpreter */}

Après avoir préparé Python ou R, exécutez les commandes suivantes dans la langue correspondante Notebook pour vérifier sa version et son chemin réels. Les paramètres peuvent énumérer plusieurs environnements; utiliser la sortie de l'exécution courante pour identifier celle utilisée.

Python:

```python
import sys
print(sys.version)
print(sys.executable)
```

R:

```r
R.version.string
R.home()
```

Ensuite, lisez un petit tableau de projet, vérifiez son nombre de lignes et enregistrez le résultat. Après la réouverture de l'application, effectuez à nouveau la vérification avant de poursuivre une analyse. Un rapport historique lisible ne signifie pas que les variables in-memory précédentes existent encore. Voir [Notebook et preuves d'exécution](notebook.md) pour les commandes Notebook.

<PlatformContent platform="windows">

<p className="example-label"><strong>Exemple pratique</strong> Vérifiez l'interpréteur actif Windows Python</p>

Pour une vérification rapide avant d'utiliser les données de recherche, demandez à l'Agent d'exécuter les commandes Python version/path ci-dessus dans le **Séance Notebook** et d'enregistrer leur sortie réelle dans un rapport Markdown. Pour vérifier également la version `pip` installée, ajoutez `import importlib.metadata` et `print(importlib.metadata.version("pip"))`.

Ouvrez la sortie de Notebook et comparez-la avec le rapport enregistré. Cet exemple Windows 10 dans Open-Science v0.28.0 rapporte Python **3.12.13** et `pip` **26.1.2**. La lecture des métadonnées du paquet n'installe pas ou n'importe pas ce paquet.

<Screenshot src="/img/open-science/windows/python-runtime-output.webp" alt="Windows Python Notebook montrant le code exécuté et sa sortie de version réelle" width={1920} height={1017} windowBounds={[1157, 0, 763, 472]} href="/docs/img/open-science/windows/python-runtime-output.webp" linkLabel="Ouvrez la capture d&#39;écran complète de Windows" />

Pour les pannes de démarrage ou de récupération du noyau de Windows conda R, utilisez v0.30.2 ou plus tard avant de réessayer. La version corrige la recherche exécutable après la préparation de l'environnement et la récupération du noyau R. Après mise à jour, revérifiez l'environnement et exécutez un petit calcul R dans Notebook; **Ready** seul n'est pas un résultat d'exécution. Les captures d'écran ci-dessous conservent les versions et les résultats de leurs sorties originales.

À partir de v0.31.0, Windows R peut fonctionner en mode standard sans mettre en place d'abord un mode protégé. Traitez **Activer le mode protégé avant d'autoriser l'accès à R.** d'une ancienne version comme une ligne directrice spécifique à la version. Les autorisations de protection du réseau et d'installation des paquets restent des contrôles séparés. Dans v0.31.1, une exécution bloquée par la protection réseau Notebook affiche un avertissement en ligne avec un lien vers le réglage pertinent; la cellule n'a pas été exécutée. Examinez l'accès requis, puis recourez et vérifiez la sortie.

<span id="windows-runtime-qc" />

<p className="example-label"><strong>Exemple pratique</strong> Vérifiez les environnements Windows Python et R avec une table échantillon-QC</p>

L'analyse suivante utilise un autre ordinateur Windows 11 et ses environnements Python/R existants. Utilisez les chemins et les sorties de votre propre exécution lors de la vérification de votre installation.

Téléchargez le <a href="/docs/examples/gse60450/rnaseq-sample-qc.csv" download>échantillon-QC CSV</a> et joignez-le à une session de projet. Il s'agit d'un résumé de douze rangées, avec une rangée par échantillon. Les contrôles ci-dessous lisent les paramètres existants; ils ne recalculent pas la matrice originale du nombre de gènes. La description d'entrée et les définitions métriques sont en [Exemple de données](../reference/example-data.md).

**Lire le tableau avec Python.** Demandez à l'Agent d'utiliser l'environnement Python sélectionné dans la session Notebook, avec la bibliothèque standard seulement. Demande `sys.version`, `sys.executable`, les quatre vérifications dans le tableau ci-dessous et un rapport de Markdown sauvegardé. Utilisez le chemin du fichier ci-joint. Pour vérifier que la lecture laisse l'entrée inchangée, calculez son SHA-256 avant de lire et encore après avoir rouvert le fichier.

Ouvrez le rapport sauvegardé et sa vue **Provenance → Code**. Comparer le code capturé avec l'interprète et les résultats déclarés. Dans cet exemple, Python rapporte la version **3.12.13** et un exécutable se terminant dans `runtime\envs\.p\python.exe`; les haches d'entrée avant et après la réouverture du match.

Le détail ci-dessous montre **Inputs** et le code capturé. Cliquez sur l'image pour ouvrir la capture d'écran complète avec le rapport enregistré à côté.

<Screenshot
  src="/img/open-science/windows/runtime-python-producer.webp"
  alt="Détail de la vue de code Provenance du résultat Python, montrant les entrées et le code du producteur capturé"
  width={2302}
  height={1158}
  windowBounds={[1385, 65, 917, 1030]}
  href="/docs/img/open-science/windows/runtime-python-producer.webp"
  linkLabel="Ouvrez la capture d&#39;écran complète Windows Python avec le rapport enregistré et le code capturé"
/>

**Lire la même table avec R.** Demandez à l'Agent d'utiliser l'environnement R sélectionné dans la session Notebook, avec la base R seulement. Demande `R.version.string`, `R.home()`, les mêmes quatre vérifications et un rapport séparé sauvegardé. Expandez la carte **Notebook run** pour inspecter son code, puis ouvrez le rapport et comparez les résultats. Dans cet exemple, R rapporte la version **4.4.3** et un répertoire d'accueil se terminant par `runtime/envs/.r/Lib/R`.

![Windows R Notebook appel et rapport sauvegardé montrant l'installation active de R et les résultats de l'échantillon-QC](/img/open-science/windows/runtime-r-execution.webp)

Les chemins d'installation de ces captures d'écran appartiennent à l'ordinateur exemple. Différentes lettres de lecteur, dossiers et versions d'interprète sur votre propre machine sont normales.

Les deux rapports donnent les résultats suivants pour cet apport :

| Vérifier | Résultat dans cet exemple |
| --- | ---: |
| Lignes de données | 12 |
| Distinct `original_column_name` valeurs | 12 |
| Somme des `total_raw_counts` | 269,027,617 |
| Lignes où `zero_count_genes + detected_genes_count_gt_0` égale 27,179 | 12 |

Correspondez le chemin de l'exécution à l'environnement que vous aviez l'intention d'utiliser, puis comparez les résultats enregistrés avec la table. Ils utilisent la bibliothèque standard et la base R de Python; ils n'ont pas besoin de paquets supplémentaires ou de démontrer que de nouveaux paquets peuvent être installés.

</PlatformContent>

## Entretien et réparation des environnements {/* #maintain-and-repair-environments */}

### Annuler l'installation et réessayer {/* #cancel-setup-and-retry */}

Pendant **Download and set up**, choisissez **Cancel** et attendez **Configuration d'exécution annulée**. Choisissez **Retry setup**, attendez **Ready**, et ouvrez **Packages** pour inspecter l'environnement. Ne démarrez pas une seconde configuration pendant que la première opération est toujours en train de se régler.

<PlatformContent platform="macos">

![Configuration annulée et réessayer disponible](/img/open-science/local-todo-batch/29-setup-cancelled.webp)

</PlatformContent>
<span id="review-a-reinstall-before-committing-it" />

### Réinstaller un environnement géré {/* #reinstall-a-managed-environment */}

1. Enregistrer les rapports nécessaires et enregistrer tous les paquets que vous avez ajoutés.
2. Sélectionnez **Reinstall** sur l'environnement géré prévu.
3. Lisez l'avis d'impact, puis choisissez **Reinstall runtime**.
4. Attendez **Ready** et inspectez **Packages**.
5. Démarrez une nouvelle cellule Notebook et rouvrez vos entrées et sorties sauvegardées.

<PlatformContent platform="macos">

![Réinstaller la confirmation pendant une session Notebook](/img/open-science/local-todo-batch/31-runtime-reinstall.webp)

</PlatformContent>
La réinstallation supprime et recrée l'environnement. Dans la récupération exercée, une cellule active a été annulée avec **Exécuter annulé : l'exécution a été arrêtée pendant l'exécution de cette cellule.** L'ancienne histoire de Notebook est restée visible, mais son espace de noms n'existait plus. Une cellule fraîche a confirmé l'absence d'une variable antérieure; le CSV inchangé renvoyait toujours les lignes 12 et les nombres 269,027,617, et le rapport enregistré a rouvert.

<PlatformContent platform="macos">

![Historique Notebook conservé après l'arrêt de son noyau](/img/open-science/local-todo-batch/33-reinstalled-kernel-history.webp)

</PlatformContent>
Les fichiers conservés et la mémoire du noyau conservée sont différents. Recréer les variables en réinitialisant le code requis. D'autres paquets peuvent nécessiter une réinstallation; La récupération réussie de l'environnement de base n'établit pas la récupération de toute dépendance supplémentaire.

### Construction de développement: micromamba introuvable {/* #development-build-micromamba-not-found */}

La première tentative dans la construction de la source a échoué avant de fournir parce que le processus de développement n'a pas pu localiser micromamba.

<PlatformContent platform="macos">

![Erreur réelle de micromamba manquante dans une construction source](/img/open-science/walkthrough-2026-09-08/35-runtime-micromamba-error.webp)

</PlatformContent>
L'application emballée inclut ce binaire. Pour une compilation source, pointez `OPEN_SCIENCE_MICROMAMBA_BIN` à un exécutable micromamba valide dans l'environnement de lancement de ce processus et redémarrez l'instance de développement. Utilisez le chemin binaire d'une installation compatible et confirmez qu'il est exécutable avant de relancer.

Cette variable d'environnement est un détail de configuration de développement, pas un champ dans la page Runtimes. Ne supprimez pas un répertoire d'environnement pour contourner cette erreur de découverte.

<PlatformContent platform="windows">

## En option WSL2 Aperçu de la balance {/* #wsl2-preview */}

Windows x64 peut utiliser le **Local Shell · WSL2 Bash Preview** optionnel dans **Settings → Runtimes**. Gardez PowerShell à moins que votre tâche n'ait besoin d'un shell Linux; WSL2 n'est pas nécessaire pour utiliser Open-Science sur Windows.

Sélectionnez une distribution WSL2 et sa **Linux user** non-root exacte, puis choisissez **Save and check**. Suivez d'abord les instructions de configuration de la plate-forme/distribution. Vérification de la disponibilité et mise en correspondance des ressources de prévisualisation doivent passer avant que **Use WSL2 Bash** ne devienne disponible; sélectionner une distribution seule ne l'active pas. Exécutez une petite commande shell et inspectez son résultat avant de commencer une tâche plus longue. Utilisez l'option PowerShell pour revenir au shell par défaut.

Si l'état de préparation échoue, conservez la raison signalée et continuez avec PowerShell tout en la résolvant. L'installation de composants WSL peut nécessiter l'approbation de l'administrateur Windows. Cet aperçu est séparé du choix des interprètes Python/R Notebook.

</PlatformContent>
