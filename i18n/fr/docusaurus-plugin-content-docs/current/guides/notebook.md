---
title: "Notebook et preuves d'exécution"
last_update:
  date: '2026-10-09'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';


# Notebook et preuves d'exécution {/* #notebook-and-execution-evidence */}

Utilisez Notebook pour inspecter le code exécuté, exécuter une commande dans le noyau courant et suivre le travail de fond. Pour un fichier sauvegardé, ouvrez **Provenance** pour inspecter l'exécution et les preuves associées à cette version de fichier.

Avant d'exécuter Python ou R, [activer un temps d'exécution compatible](runtimes.md). Pour un exemple complet d'analyse de données, utilisez le [flux de travail des données publiques](../workflows/data-quality.md).

<span id="open-the-session-notebook" />
<span id="open-the-producing-sessions-notebook" />
<span id="produce-an-artifact" />

<PlatformGuide />

## Ouvrir une session Notebook {/* #open-a-session-notebook */}

1. Ouvrez le projet et la conversation contenant le calcul que vous voulez inspecter. Si vous démarrez à nouveau, demandez à l'agent d'exécuter un petit calcul dans le **Séance Notebook** d'abord.
2. Sélectionnez **Open notebook** ou utilisez le menu conversation **View notebook**.
3. Sélectionnez l'onglet **Notebook** lorsqu'un prévisualisation de fichier est actif.
4. Utilisez **Agent** pour choisir le propriétaire de l'exécution, puis **Python / R / Bash** pour choisir la langue.
5. Ouvrez une exécution numérotée et lisez son état de sortie et d'achèvement. Une activité copiée portant l'étiquette **code shown** contient un code affiché; inspecter la séance de production originale pour son dossier d'exécution.

<PlatformContent platform="macos">

![Exécution et sortie de Python dans Notebook](/img/open-science/guides-walkthrough/46-notebook-result.webp)

</PlatformContent>

| Contrôle | Décision | Résultat |
| --- | --- | --- |
| Agent | Sélectionner Main ou un agent pour enfants | Affiche les dossiers de ce propriétaire; agents peuvent avoir des noyaux séparés |
| Langue | Sélectionnez une langue disponible | change les enregistrements et la console; installer les langues manquantes dans Runtimes |
| Exécution numérotée | Sélectionner une exécution enregistrée | Ouvre son code, sa sortie et son statut |
| Copier dans le presse-papier | Copier le code sélectionné | Conserve les chemins et les dépendances externes comme écrit |
| Masquer la sortie / Afficher la sortie | Réduire ou étendre la sortie | Modifie la vue sans rediffusion du code |
| exécutez le code dans ce noyau... | Entrez et soumettez le code | Exécute dans le noyau live sélectionné |
| Fermer / effondrement de l'aperçu | Retour à la conversation | Conserve l'historique des exécutions enregistrées |

Vérifiez **Données/Inputs** quand vous êtes présent. Correspondez au fichier et à la version affichés à votre demande. Si une référence n'est pas disponible, rouvrez ou joignez l'entrée prévue à travers l'application avant de réessayer.

## Consulter le code avant qu'il ne soit lancé {/* #execution-review */}

À partir de v0.36.0, le code Notebook soumis par l'agent est vérifié avant l'expédition. Les lectures et l'analyse ordinaires sont appuyées sans qu'il y ait un risque supplémentaire. Les opérations susceptibles d'apporter des changements irréversibles ou qui ne peuvent pas être entièrement analysées nécessitent une décision ponctuelle. Le code tapé directement dans la console manuelle n'est pas couvert par cette étape d'approbation de l'agent; Inspectez-le vous-même avant de vous soumettre.

1. Lorsque **Review risky code** apparaît, vérifiez l'environnement et l'opération demandée. Le calcul attend votre décision.
2. Sélectionnez **Line** à côté d'une découverte pour inspecter son emplacement dans le code complet. Vérifiez les chemins, les fichiers et les commandes affectés, y compris toute opération que l'analyse ne pouvait pas résoudre.
3. Si l'action n'est pas nécessaire ou si sa cible est erronée, déclinez-la et demandez à l'agent une révision plus sûre. Approuver une seule fois lorsque vous comptez utiliser l'opération affichée; la demande n'accorde pas l'autorisation permanente pour un futur code risqué.
4. Après avoir décidé, inspecter la décision enregistrée et l'état d'exécution de Notebook. L'approbation à elle seule n'est pas une preuve d'achèvement. Une requête refusée n'exécute pas ce code.

<p className="example-label"><strong>Exemple pratique</strong> Inspecter une requête de processus externe Python</p>

Le calcul illustré ajoute seulement des nombres, mais il démarre un autre interprète par `subprocess.run`. Cette exécution imbriquée ne peut pas être entièrement vérifiée, donc la demande s'arrête pour examen. L'avis ne signifie pas que le code est malveillant. Cet exemple choisit **Deny**; l'exécution est alors enregistrée comme interrompue sans exécuter le processus enfant.

![Carte de révision Notebook avec l'environnement, ligne source, Autoriser une fois et Deny](/img/open-science/v0360/notebook-risk-review.webp)

Cet écran vérifie le risque d'exécution; il ne valide pas la méthode ou le résultat statistique. **Auto-review** et [Réviseur](../specialists/reviewer.md) évaluent les travaux terminés séparément. v0.36.0 améliore également la capture de la dépendance Python/R ; Utilisez [Provenance et la vérification de rediffusion](reproducibility.md) pour vérifier les entrées et sorties réelles d'un résultat.

## Travailler dans le noyau en direct {/* #work-in-the-live-kernel */}

### Exécutez une vérification dans le noyau en direct {/* #run-a-check-yourself-in-the-live-kernel */}

Sélectionnez **Python**, cliquez sur **exécutez le code dans ce noyau...**, puis entrez la commande autonome suivante. Il ne nécessite aucun ensemble de données, paquet tiers ou variables d'une conversation antérieure:

```python
import sys
print("Python:", sys.version.split()[0])
print("Executable:", sys.executable)
```

Appuyez sur **Entrez** pour exécuter; Utilisez **Maj + Entrée** pour une nouvelle ligne. Rejeter un menu ouvert avec **Échappement** avant de soumettre. Confirmez une entrée **python · vous** numérotée et l'information de l'interprète dans sa sortie. L'exécutable doit appartenir à l'exécution que vous avez sélectionnée.

Pour R, sélectionnez **R** et soumettez :

```r
cat(R.version.string, "\n")
cat("R home:", R.home(), "\n")
```

Inspectez l'entrée R enregistrée et sa sortie. Python et R ont des variables séparées. Un `NameError` ou `object not found` signifie généralement que l'objet nommé n'a pas été créé dans ce noyau; Inspectez votre code avant de réutiliser une commande d'une autre session.

Pour une vérification de l'interpréteur et des résultats enregistrés, ouvrez [Durées d'exécution Python et R](runtimes.md) et choisissez **Windows** en haut de la page.

<span id="variables-dependency-state-and-network-boundaries" />

### Inspecter les variables en direct {/* #inspect-live-variables */}

1. Sélectionnez **Inspect variables** après un essai qui crée des variables.
2. Lire **Name**, **Type**, **Size / Shape** et **Preview**.
3. Saisissez un nom de votre propre code dans **Filter variables**. Pour l'exemple de capture d'écran, `sha` filtre les variables de hachage listées; choisissez un nom qui existe dans votre propre noyau.
4. Utilisez **Refresh variables** pour lire l'espace de noms actuel, et **Show private variables** si le nom dont vous avez besoin est caché.
5. Sélectionnez **Close** pour revenir à la Notebook.

<PlatformContent platform="macos">

![Filtrage de la liste des variables par nom](/img/open-science/guides-walkthrough/47-notebook-variable-filter.webp)

</PlatformContent>

Un aperçu peut abréger une valeur; imprimer le champ nécessaire dans la console pour l'inspecter complètement. **Variable tracking is limited** signifie que le graphique de dépendance est incomplet. Pour un résultat suivi, **Stalle** indique une dépendance changée; **unknown** signifie que la relation n'a pas pu être établie. Relancer le code affecté avant d'utiliser un résultat obsolète.

### Continuer après un changement de noyau {/* #continue-after-a-kernel-change */}

Changer ou reconstruire un runtime peut arrêter son noyau. Les fichiers sauvegardés et les enregistrements d'exécution restent séparés des variables in-memory. Après le changement, exécutez la vérification de l'interpréteur ci-dessus, recréez les variables requises en réexécutant leur code de production et réouvrez les fichiers sauvegardés dont vous avez besoin.

Utilisez [Environnements d'exécution](runtimes.md#maintain-and-repair-environments) pour l'annulation et la réinstallation de configuration. Une reconstruction de l'exécution, un redémarrage normal du noyau et la récupération d'un travail de fond sont des opérations différentes; vérifier l'état de l'opération concernée plutôt que de supposer qu'elle rétablit l'état identique.

## Exécuter la même vérification du nombre de gènes dans R {/* #run-the-same-gene-count-check-in-r */}

<p className="example-label"><strong>Exemple pratique</strong> Vérifiez le nombre de gènes GSE60450 dans R</p>

1. [Installer et activer R](runtimes.md#install-app-managed-r).
2. Joindre le [matrice originale](../reference/example-data.md). Si vous comparez un résultat Python, joignez ce CSV à la même conversation.
3. Demandez l'exécution de **Session Notebook → R** et les exigences d'entrée/sortie dans le [flux de travail de qualité des données](../workflows/data-quality.md). Spécifiez la conservation d'identificateurs complets et d'un fichier de sortie séparé.
4. Si **Change notebook runtime?** apparaît, confirmez **Langue: R** et l'interprète prévu. Vérifiez l'environnement sur la requête **Run R code?** suivante.
5. Ouvrez **Notebook → R**, lisez l'enregistrement d'exécution, puis ouvrez la figure et le rapport CSV enregistrés.

<PlatformContent platform="macos">

![Sortie R sample-QC ouverte dans l'application](/img/open-science/guides-walkthrough/76-r-qc-table.webp)

</PlatformContent>

Comparer les mesures par l'identificateur de l'échantillon complet à l'aide du [niveau de référence partagé](../reference/example-data.md#sample-qc-baseline). Conservez la source d'origine et enregistrez les mesures qui incluent ou excluent les nombres nuls. Le CQ du compte brut prépare les données pour une analyse statistique conçue séparément.

### Conservez le résultat R et ses preuves ensemble {/* #keep-the-r-result-and-its-evidence-together */}

Ouvrez le **Provenance → Execution Log → Download notebook** enregistré de CSV. Conservez l'exportation à côté de ses intrants et de ses résultats. Une exportation pour une version de fichier peut omettre des commandes de console manuelles ultérieures.

<PlatformContent platform="macos">

![Environnement capté pour un résultat R](/img/open-science/guides-walkthrough/77-r-environment-evidence.webp)

</PlatformContent>

L'inventaire des paquets Runtimes décrit l'environnement installé; Provenance décrit les preuves environnementales saisies pour un fichier particulier. Lisez les avis d'inventaire **partial** ou cached-inventory plutôt que de comparer le nombre de paquets comme s'ils étaient la même liste.

## Tâches de base et réalisation des résultats {/* #background-tasks-and-result-delivery */}

Demandez l'exécution de l'arrière-plan lorsqu'une tâche Python, R, REPL persistante ou shell prise en charge doit continuer pendant que vous travaillez ailleurs. Inclure l'entrée, les sorties et l'état d'arrêt dans la demande.

1. Après l'admission, ouvrez l'entrée **Background tasks** de la conversation. Il regroupe les emplois de gestion locale et de calcul à distance; une conversation sans tâches peut ne pas la montrer.
2. Lisez l'identité de la tâche, l'environnement, le statut et le temps écoulé.
3. Sélectionnez **Open** pour inspecter la tâche Notebook correspondante.
4. Pour arrêter une tâche, sélectionnez son contrôle **Cancel** et attendez que le statut soit réglé. Vérifiez les fichiers déjà enregistrés avant de les utiliser ou de les jeter.
5. Après l'achèvement, inspecter le message de résultat livré et ouvrir les sorties sauvegardées.
6. Après interruption ou redémarrage d'une application, inspecter la tâche existante et tout message de récupération avant de soumettre une autre copie.

<PlatformContent platform="macos">

![État de la tâche d'arrière-plan et son contrôle ouvert](/img/open-science/v0.27.0/13-background-task-completed.webp)

</PlatformContent>

| État | Quoi vérifier |
| --- | --- |
| En attente / Courir | Environnement et progrès choisis; shell jobs peut attendre une fente d'exécution |
| Annulation / Annulé | Que l'annulation soit toujours en cours de traitement ou qu'elle soit réglée |
| Terminé | Résultat de sortie et fichiers de sortie enregistrés |
| Échec / Arrêt dans les délais / Interruption | Première erreur, sortie conservée et action de récupération offerte |
| Résultat indisponible | Dossier d'emploi existant et détails de récupération |

La fermeture de la liste des tâches laisse la tâche en cours. L'achèvement d'un calcul et la livraison de son message de résultat sont des étapes distinctes. Les emplois distants ont également besoin des conditions d'hôte et de programmeur en [Calcul à distance](remote-compute.md).

<span id="open-provenance" />
<span id="execution-log" />
<span id="messages" />
<span id="environment" />
<span id="review" />

## Inspecter les preuves d'une version sauvegardée {/* #inspect-one-saved-versions-evidence */}

Ouvrez un fichier enregistré et sélectionnez **File actions → Provenance** ou **Ouvrir Provenance** dans son aperçu élargi. Confirmez d'abord la version de fichier sélectionnée.

<PlatformContent platform="macos">

![Code producteur capturé pour un résultat enregistré](/img/open-science/provenance-code.webp)

</PlatformContent>

| Tab ou contrôle | Utilisez-le pour inspecter |
| --- | --- |
| Coder | Code du producteur capturé, références d'entrée, copie/téléchargement et générer le script |
| Journal d'exécution | Enregistrements d'exécution gelés pour la version sélectionnée |
| Messages | Demandes et décisions saisies associées au résultat |
| Environnement | Interprète, information sur les paquets et état de capture; voir [Conditions de restauration](runtimes.md#conditional-restore). |
| Reproductibilité | Entrées captées, vérifications de rediffusion, comparaisons de sortie et enregistrements de vérification. |
| Article de synthèse | Revue associée à cette version de fichier exacte |
| Précédent / Suivant Version Artifact | Preuve d'une autre version sauvegardée; non disponible quand il n'y en a pas |
| Fermer le panneau de provenance | Retour à l'aperçu |

| Étiquette | Signification et action suivante |
| --- | --- |
| limité | Les éléments de preuve conservés couvrent une portée limitée. Gardez cette portée avec le code et les résultats exportés. |
| partiel | Certaines informations sur l'environnement sont manquantes ou non confirmées. Consigner les dépendances requises avant réutilisation externe. |
| Aucun avis pour cette version | Cette version de fichier n'a pas d'examen associé. Utilisation [Réviseur](../specialists/reviewer.md) comprendre la conversation et l'examen des artefacts. |
| Environnement de calage | L'inventaire a été réutilisé. Vérifiez l'interprète/paquet réel lorsque l'environnement change de matière. |

Modifier un rapport crée une autre version de fichier; il ne réexécute pas le calcul qui a produit un CSV séparé. Voir [Fichiers et versions](files.md).

Pour inspecter un examen, sélectionnez **Review** pour la version requise, élargissez ses vérifications et utilisez **Go to transcript** pour inspecter l'activité citée. **No issues found** s'applique à ces vérifications et à cette version; il ne remplit pas les preuves manquantes d'exécution ou d'environnement. Si un avis a été interrompu, ouvrez son entrée **Review error** et choisissez **Re-run review**. Après avoir terminé, retournez à l'onglet **Review** du fichier et confirmez le nouveau résultat. L'échec précédent peut rester visible dans la conversation.

## Reproductibilité {/* #reproducibility */}

Pour réexécuter un résultat capturé, comparez les sorties et enregistrez l'enregistrement de vérification, suivez le [Guide de reproductibilité](reproducibility.md). Ce chapitre couvre l'exécution de Notebook, l'inspection de provenance et l'exportation de code.

## Code d'exportation et de réutilisation {/* #export-and-reuse-code */}

Choisissez l'exportation qui correspond à votre objectif :

| Objectif | Entrée | Table des matières |
| --- | --- | --- |
| Lire le code du producteur enregistré | **Code → Captured producer block → Download** | Source captée avec ses chemins et dépendances d'origine |
| Conserver les cellules Notebook enregistrées | **Execution Log → Download notebook** | Une exportation de Notebook pour le résultat/version sélectionné |
| Préparer un script portable | **Code → Generate script** | Une reconstruction générée par le modèle pour inspecter et tester |

<PlatformContent platform="windows">

### Télécharger le code Python capturé sur Windows {/* #download-captured-python-code-on-windows */}

1. Ouvrez la version prévue du rapport sauvegardé, puis **Provenance → Code**.
2. Sous **Captured producer block**, choisissez **Download**. Vérifiez le nom de fichier et la destination `.py` dans la boîte de dialogue de sauvegarde, puis choisissez **Save**.
3. Ouvrez le fichier enregistré et comparez-le avec le code affiché. Dans PowerShell, exécutez-le avec le même interpréteur Python; utilisez l'opérateur d'appel `&` avant un chemin exécutable cité.
4. Comparer la sortie avec le rapport Notebook et enregistré. Conservez tous les fichiers d'entrée requis à côté du code.

<Screenshot src="/img/open-science/windows/captured-code-download.webp" alt="Windows capturé code producteur et son contrôle de téléchargement" width={1920} height={1017} windowBounds={[1157, 0, 763, 416]} href="/docs/img/open-science/windows/captured-code-download.webp" linkLabel="Ouvrez la capture d&#39;écran complète de Windows" />

Ceci télécharge le code enregistré. **Generate script** est une opération de reconstruction séparée. Si la génération échoue, gardez sa pleine erreur; télécharger le code capturé ne signifie pas que la reconstruction a réussi.

</PlatformContent>

### Générer un script autonome {/* #generate-a-standalone-script */}

1. Ouvrez le **Provenance → Code** de la version prévue. Vérifiez **Inputs** et **Execution Log**.
2. Sélectionnez un modèle par défaut compatible dans **Settings → Model → Main model**. Cette fonction auxiliaire utilise cette politique, qui peut différer de la sélection du modèle de la conversation.
3. Sélectionnez **Generate script** et attendez que **Generating…** finisse.
4. Lire l'étiquette **Reconstruction générée par la LLM**. Vérifiez les chemins, les dépendances et les emplacements de sortie avant de sélectionner **Download script**.
5. Dans la boîte de dialogue de sauvegarde du système, choisissez un répertoire séparé, vérifiez le nom de fichier `.py` et validez **Save**. Ouvrez le fichier enregistré pour confirmer qu'il contient le code affiché.
6. Fournissez les entrées en utilisant les noms exacts de fichiers attendus par le script, préparez ses dépendances, puis exécutez-le en dehors de l'application. Comparer les champs de sortie et le total de vérifications d'entrée avec le résultat enregistré. Un téléchargement terminé à lui seul ne vérifie pas le calcul.

<PlatformContent platform="macos">

![Prévisualisation du script généré et contrôle du téléchargement](/img/open-science/priority-completion/19-generated-script.webp)

</PlatformContent>

<p className="example-label"><strong>Exemple pratique</strong> Relancez la vérification RNA-seq exportée en dehors de l'application</p>

Pour un exemple téléchargé, enregistrez les fichiers <a href="/docs/examples/gse60450/portable-script/GSE60450-portable-check.py" download>script</a>, <a href="/docs/examples/gse60450/portable-script/remote-rnaseq-qc-f1e10edbdf01-f1e10edbdf01.csv" download>entrée CSV</a> et <a href="/docs/examples/gse60450/portable-script/GSE60450-portable-check.json" download>JSON attendu</a> dans un seul dossier. Dans ce dossier, exécutez `python3 GSE60450-portable-check.py`. Le script utilise la bibliothèque standard de Python. Renommer le JSON attendu téléchargé en `expected.json` avant d'exécuter : le script écrit `GSE60450-portable-check.json`. Comparez ce fichier généré avec `expected.json` avant d'adapter le script aux nouvelles données.

### Télécharger le code lorsque la génération de script n'est pas disponible {/* #download-code-when-script-generation-is-unavailable */}

Si l'application retourne **La reconstruction du code Artifact n'est pas disponible avec l'authentification par abonnement Codex.**, utilisez un fournisseur compatible pour cette opération auxiliaire ou téléchargez le code de producteur capturé. Cette erreur concerne la reconstruction de script, pas l'exécution ordinaire Codex Notebook.

Pour **RECONSTRUCTION_INDISPONIBLE**, inspecter les entrées manquantes ou les preuves d'exécution. Un téléchargement de code capturé conserve le code disponible; il ne peut pas récupérer des étapes qui n'ont jamais été capturées.

### Exportation et réutilisation du Notebook enregistré {/* #export-and-reuse-the-recorded-notebook */}

Sélectionnez **Provenance → Execution Log → Download notebook**, choisissez un emplacement et enregistrez. Ouvrez l'export et vérifiez sa langue, ses cellules et ses sorties.

Avant un rediffusion externe, préparez les fichiers d'entrée, les dépendances enregistrées et un répertoire de sortie en écriture. Remplacer les chemins gérés par l'application seulement dans une copie de travail, en maintenant l'exportation originale intacte. L'exportation ne regroupe pas les références ni l'environnement d'application complet. Des exemples d'exportations sont disponibles depuis [Exemple de données](../reference/example-data.md).

<PlatformContent platform="windows">

Si une exportation Windows Notebook n'a pas d'extension, ouvrez d'abord une copie en texte et confirmez qu'elle contient Notebook JSON avec `nbformat`, `cells` et le code/sortie attendu. Préservez l'original, puis donnez à la copie de travail une extension `.ipynb`. Le renaming modifie la façon dont d'autres programmes ouvrent le fichier; il ne convertit pas son contenu et ne réexécute pas ses cellules.

</PlatformContent>

## Interpréter les erreurs et les avertissements {/* #interpret-errors-and-warnings */}

| Symptôme | Action suivante |
| --- | --- |
| Variable manquante | Relancer le code qui le définit dans la langue/le noyau sélectionné |
| colis manquant | Inspectez les paquets d'exécution et suivez [Environnements d'exécution](runtimes.md) |
| Version indisponible | Ouvrir ou fixer l'entrée actuelle prévue; résoudre son identité par la demande |
| PermissionErreur / accès refusé | Examiner le dossier demandé et la portée de l'autorisation; signaler les défaillances persistantes d'accès en utilisant [Dépannage](troubleshooting.md) |
| Erreur réseau/installateur | Suivre [Réseau](network.md) en utilisant le nom d'hôte affecté et l'erreur complète |
| Avertissement avec une exécution terminée | Lisez ce que l'avertissement affecte, puis inspectez la sortie sauvegardée avant de décider s'il faut réexécuter |

Lorsque vous signalez un problème, gardez la première ligne défaillante, l'exécution sélectionnée, l'identité du fichier et l'état des tâches. Lien de sortie sauvegardée à son exécution réelle de production.
