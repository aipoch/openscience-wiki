---
title: "Hôtes SSH et configuration Slurm"
last_update:
  date: '2026-09-10'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Hôtes SSH et configuration Slurm {/* #ssh-hosts-and-slurm-setup */}

:::info&#91;Avant de soumettre un travail&#93; Configurez un hôte SSH et choisissez Direct SSH ou Slurm avant de soumettre un travail à distance. Un profil d'hôte sauvegardé n'établit pas l'authentification ou l'exécution réussie. :::

Utilisez **Settings → Compute** pour enregistrer un serveur ou un groupe. L'enregistrement de l'hôte, sa mise à la disposition d'une conversation et l'achèvement d'un travail sont des étapes distinctes. Conservez les règles de connexion-noeud du site et les exigences de calendrier avec les notes d'hôte.

## Choisissez où exécuter les tâches {/* #choose-where-jobs-execute */}

| Mode d’exécution | Exécution de l'emploi | Appels de commande | Environnement approprié |
| --- | --- | --- | --- |
| **Direct SSH** | Directement sur l'hôte de connexion SSH | Sur l'hôte de connexion SSH | Une machine où la charge de travail directe est permise |
| **Slurm** | Soumis et géré par Slurm | Toujours sur l'hôte de connexion SSH | Un groupe nécessitant des allocations programmées |

Sélectionner Slurm ne déplace pas chaque commande sur un nœud de calcul. Ne pas interpréter les informations CPU, RAM ou GPU comme les ressources allouées à un futur travail Slurm. Inspecter la répartition réelle du travail avant d'interpréter ses résultats.

## Ajouter la connexion {/* #add-the-connection */}

Sélectionnez **Add SSH host**. Choisissez un alias existant ou tapez l'identificateur de l'hôte. Le formulaire est par défaut pour l'authentification de configuration SSH et l'exécution Direct SSH.

| Champ ou contrôle | Entrée et effet |
| --- | --- |
| **From ~/.ssh/config** | Sélectionner un alias découvert; handicapés quand aucun pseudonyme n'est disponible |
| **Or type a host alias** | les caractères host/alias requis, 1–255 après la taille; Pas de sauts NUL ou de ruptures de ligne |
| Notes d'hôte optionnelles | les règles de calendrier, la partition/compte, les modules, la politique d'installation de paquets et les lieux d'environnement; maximum de caractères 32,768 |
| **Execution mode** | Direct SSH ou Slurm; sauvé par hôte |
| **SSH configuration** | Résoudre les paramètres de connexion avec `ssh -G`; utiliser la configuration SSH existante, les clés ou ssh-agent |
| **Advanced settings → User** | a) Surpassement facultatif; blanc conserve la résolution SSH |
| **Port** | Facultatif pour la configuration SSH; si fourni, entier 1–65535 |
| **Identity file** | Redéfinition optionnelle du fichier de clés; blank utilise le comportement de configuration/agent |
| **Username and password** | Nécessite l'utilisateur, le port et le mot de passe; n'utilise pas de clés ou de ssh-agent |
| **Cancel** | Laisser sans enregistrer le formulaire |
| **Add** | Soumettre une connexion valide; l'authentification par mot de passe doit passer son test de connexion avant l'ajout de l'hôte |

![Franchissements de la configuration SSH en anglais](/img/open-science/walkthrough-2026-09-08/53-ssh-advanced.webp)

![Authentification du mot de passe et Slurm sélectionnés dans le formulaire réel](/img/open-science/walkthrough-2026-09-08/52-ssh-password-slurm.webp)

Le mode mot de passe dépend de la capacité d'authentification par mot de passe et de stockage sécurisé de l'application. S'il n'est pas disponible, vérifier la raison indiquée dans le formulaire. Entrez les identifiants dans ce champ, pas dans les notes d'hôte ou une demande d'agent.

Pour un hôte de configuration SSH, l'application crée l'enregistrement, ouvre la vue de détail et démarre une sonde de fond. Une ligne ajoutée ne prouve donc pas l'authentification ou le calcul de la disponibilité. Lire le résultat de la sonde avant de permettre à une tâche de l'utiliser.

### Connectez un serveur de recherche protégé par mot de passe {/* #connect-a-password-protected-research-server */}

1. Ouvrez **Settings → Compute → Add SSH host**. Saisissez votre adresse ou alias du serveur.
2. Sélectionnez **Username and password**, entrez **User**, **Port** et **Password**, puis sélectionnez **Add**. Utilisez le port fourni par votre administrateur; le serveur exemple utilise le port 22.
3. Si l'application rapporte **The SSH host key is unknown. Verify it in a terminal before connecting.**, établir d'abord la confiance hôte. Connectez-vous au même hôte et port avec votre client SSH système, comparez l'empreinte digitale affichée avec l'empreinte digitale de l'administrateur, et ne l'acceptez que lorsqu'ils correspondent. Retour à l'application et réessayer **Add**. Ne pas désactiver la vérification de la clé hôte pour rejeter le message.
4. Attendez **Last probe succeeded**. Dans **Configuration**, vérifiez **Credential configured**, la méthode d'authentification et la dernière période de vérification. Le mot de passe enregistré est marqué **Configured · cannot be viewed**.
5. Pour vérifier ou modifier une connexion existante, ouvrez **Configuration → Edit** et utilisez **Test and save**. Lisez l'avis avant de modifier l'authentification : les subventions d'activation et d'autorisation de session sont effacées lorsque la nouvelle configuration est engagée. Réactiver l'hôte pour la session prévue par la suite.

L'exemple anglais montre une sonde authentifiée par mot de passe : CPU 256, RAM 504 GB, un PCIe NVIDIA A100 80GB et un programmeur Slurm détecté. Le mode configuré reste **Direct SSH** jusqu'à ce que vous le modifiiez explicitement. Ce sont les ressources de ce serveur login-host, pas les exigences minimales ou une allocation programmée. Les identifiants d'hôte et de compte sont masqués dans la capture d'écran.

![Authentification du mot de passe et sonde de ressources de l'hôte](/img/open-science/remote-compute/03-host-probe.webp)

## Inspecter et tenir à jour les détails de l'hôte {/* #inspect-and-maintain-host-details */}

| Section ou bouton | Quoi vérifier |
| --- | --- |
| **Probe** / **Retry probe** | Rafraîchir la connexion/détection des ressources; distinguer Non sondé, Probing, La dernière sonde a réussi et Probe a échoué |
| **Resources** / **Login host resources** | CPU, mémoire, GPU et informations de programmeurs détectés; les allocations de programme ont une capacité distincte |
| **Configuration → Edit** | Inspecter les paramètres d'authentification et l'état actuel des justificatifs |
| **Test and save** | Tester la configuration d'authentification du candidat avant de sauvegarder; un changement de configuration supprime l'activation de la session et les subventions de permission. Une configuration inchangée indique que les paramètres sont déjà à jour |
| **Execution mode → Edit → Save** | Modifier le mode configuré; comparer avec le programmeur détecté |
| **Details → Edit** | Mettre à jour les instructions spécifiques à l'hôte; Enregistrer les commits, annuler les rejets |
| **Afficher plus / Afficher moins** | Expansion ou effondrement de longues notes |
| **Scratch root → Edit** | Enregistrer le chemin de travail temporaire à distance en tant que valeur épinglée |
| **Restore auto-detection** | Supprimez l'écart de scratch épinglé afin que l'étude future puisse le fournir |
| **Concurrent job limit → Edit** | Définir un entier de 1 à 500; la valeur par défaut affichée est 10 |
| Suppression de l'hôte | Examiner la boîte de dialogue de suppression de la demande et les restrictions d'emploi actif avant de confirmer |

La racine de scratch est un chemin sur l'hôte distant. Ce n'est pas le répertoire des artefacts de votre ordinateur portable. Confirmez que le compte peut y écrire et que la politique de nettoyage du site vous donne suffisamment de temps pour recueillir des résultats. Une limite d'emploi concurrent ne remplace pas les quotas ou les limites de ressources propres de l'échéancier.

<span id="give-verification-jobs-their-own-scratch-directory" />

### Choisir un répertoire d'emploi scratch {/* #choose-a-job-scratch-directory */}

Ouvrez **Scratch root → Edit**, entrez un chemin absolu en écriture approuvé pour votre serveur, puis **Save**. **PINNED** signifie qu'un **Probe** ultérieur préservera votre choix. Confirmez l'accès à l'écriture en inspectant le répertoire de travail et la sortie du premier emploi.

Pour une première exécution, ouvrez **Concurrent job limit → Edit**, entrez **1** et sélectionnez **Save**. Cela limite les emplois gérés par l'application sur cet hôte à un poste à la fois. Il ne réserve pas un CPU, n'impose pas de limite de mémoire ou n'empêche pas les autres utilisateurs de faire fonctionner le travail. L'abaissement de la limite n'empêche pas un emploi existant. Utilisez **Restore auto-detection** seulement lorsque vous voulez que les sondes suivantes fournissent à nouveau le chemin de rayures.

### Gardez les instructions de l'hôte séparées des ressources détectées {/* #keep-host-instructions-separate-from-detected-resources */}

Les instructions d'hôte sauvegardées sont indépendantes de **Resources**. Une sonde réussie ne crée pas d'instructions d'installation, et les instructions vides ne signifient pas que l'examen a échoué. Gardez la politique de programmeur, l'activation de l'environnement et les étapes de configuration reproductibles dans **Details**; lire la détection CPU/RAM/GPU dans Ressources.

Lorsqu'un agent met à jour les instructions, il doit d'abord lire le document sauvegardé et remplacer le contenu actuel exact. Si une autre modification a changé, relisez et comparez avant de réessayer. N'utilisez pas de résumé de la sonde lorsque le document est remplacé. [Contrat d'instruction de l'hôte](https://github.com/aipoch/open-science/commit/04adfd61).

## Mettre un hôte à la disposition d'une tâche {/* #make-a-host-available-to-a-task */}

Dans le **Agent controls** de la conversation, inspectez la disponibilité et la sélection de l'hôte de calcul. Un hôte sélectionné doit également être activé. Nommez l'hôte et le mode d'exécution prévus dans une tâche qui pourrait autrement fonctionner localement. Gardez la première demande à distance assez petite pour inspecter sa réception, les journaux et la sortie avant de soumettre une charge de travail scientifique.

Pour Slurm, obtenir le compte/partition correct, la demande de ressources, le temps mural, la configuration du module/environnement et la politique de grattage du propriétaire du cluster. La disponibilité de `sbatch`, `squeue`, `sacct` et `scancel` supporte les opérations de planificateur; leur présence seule n'établit pas l'autorisation de soumission.

## Vérifier un hôte avant une charge de travail de recherche {/* #check-a-host-before-a-research-workload */}

| Étape | Vérifiez avant de passer à |
| --- | --- |
| Connexion | Une sonde réussie et une connexion authentifiée. |
| Emploi direct | Un petit travail approuvé, son état de sortie, journal lisible et sortie récupérée. |
| Slurm emploi | Un code de réception/d'emploi, l'allocation réelle, l'état final et la sortie récupérée. |
| Récupération après reconnexion | L'application réconcilie le même travail à distance; il n'a pas présenté de duplicata. |
| Annulation | Le programmeur/processus confirme qu'il a cessé; inspecter les sorties conservées avant le nettoyage. |
| Charge de travail de GPU | L'environnement requis, les poids, la mémoire et les contrôles de sortie scientifiques, en plus de l'accès SSH. |

**Examen des sources :** [formulaire add-host](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ComputeAddForm.tsx), [champs d'authentification](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ComputeAuthenticationSection.tsx), [coordonnées de l'hôte](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ComputeHostDetail.tsx), [validation de connexion](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/compute-host-connection-profile.ts) et [sélection de l'hôte de la session](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/session-configuration.ts).

<ToolOperationGroup>
<summary>Exécuter une vérification de qualité RNA-seq à distance</summary>

## Exécuter une vérification de qualité RNA-seq à distance {/* #run-a-remote-rna-seq-quality-check */}

<p className="example-label"><strong>Exemple pratique</strong> Exécuter les contrôles de qualité RNA-seq via Direct SSH</p>

Utilisez le même [Matrice de comptage GSE60450](../workflows/data-quality.md#source-and-input-contract) public lors du déplacement d'une analyse de votre ordinateur portable vers un serveur. La comparaison d'un résultat connu permet de distinguer un problème de configuration de calcul d'un changement de méthode scientifique.

1. Créez une conversation dans le projet de recherche et joignez la matrice de comptage originale.
2. Ouvrez **Agent controls → Compute**. Activer l'hôte, puis l'ajouter à **exécuter des objectifs**. La disponibilité et la sélection sont des contrôles séparés; simplement enregistrer un hôte dans Paramètres ne le sélectionne pas pour cette conversation.
3. Demandez un travail **Direct SSH**, nommez l'entrée et les sorties requises, et spécifiez les limites. Pour cet exemple, utilisez un thread CPU, un plafond mémoire GIB 1 et un exécuteur 120-seconde. Le Python par défaut du serveur est suffisant; aucune installation de paquet n'est nécessaire.
4. Lorsque **Allow remote job submission?** apparaît, inspecter **Host**, **Intent**, **Inputs**, **Execution mode**, **Timeout** et **Remote workdir**. Expand **Show full command** pour inspecter le script entier. **Once** approuve cette soumission; des champs d'application plus larges s'appliquent aux opérations subséquentes. Choisissez une portée délibérément.
5. Gardez le **Job ID** retourné. Ouvrez la puce de travail ou **Background tasks** pour inspecter ce travail. Vous pouvez quitter la conversation pendant qu'elle tourne; éviter de soumettre une autre copie simplement parce que la réponse a pris fin.
6. Après l'achèvement, ouvrez **Remote job details**. Vérifiez **Status**, **Runtime**, **Job ID** et **Remote workdir**. Utilisez **Refresh** pour la vue courante, et **stdout** ou **stderr** pour inspecter chaque journal. Le bouton de travail à distance ouvre le répertoire distant de la tâche.
7. Attendez la collecte des résultats et la réponse de suivi, puis ouvrez le CSV publié et le rapport. Le calcul réussi, la collecte de fichiers et la publication Artifact sont des étapes distinctes. Un travail accompli n'établit pas en soi que les deux dossiers attendus ont été publiés.

Exemple de demande :

> Exécutez le QC descriptif sur la matrice de nombre GSE60450 jointe en utilisant l'hôte Direct SSH sélectionné. Préservez l'entrée. Pour chaque échantillon, calculez le nombre total, le nombre de gènes zéro, les gènes détectés et le nombre médian positif. Enregistrer un rapport CSV et un rapport de méthodes courtes avec des dimensions et avant/après SHA-256. Utilisez un thread CPU, aucune installation de paquet et une limite d'exécution 120-seconde. Retourner l'identifiant d'emploi après la soumission; collecter et publier les sorties lorsqu'elles se terminent. Ne pas normaliser les dénombrements ou tirer des conclusions biologiques.

Après **succès** et le code de sortie **0**, confirmez que l'application recueille les deux sorties et que la table sauvegardée et le rapport rouvrent. Comparer les identifiants et les paramètres complets de l'échantillon avec le [niveau de référence partagé](../reference/example-data.md), et vérifier le hash d'entrée avant et après le calcul à distance. Cet exemple Direct SSH a réussi ces vérifications.

![Fonction Direct SSH terminée avec son ID et son répertoire de travail](/img/open-science/remote-compute/05-direct-job-completed.webp)

![Table à distance RNA-seq QC réouverte avec les douze échantillons](/img/open-science/remote-compute/06-remote-qc-table.webp)

Télécharger les exemples <a href="/docs/examples/gse60450/remote-rnaseq-qc.csv" download>Tableau QC</a> et <a href="/docs/examples/gse60450/remote-rnaseq-qc-report.md" download>rapport sur les méthodes</a>. Ces vérifications du nombre brut ne remplacent pas la normalisation, l'examen de la conception expérimentale ou l'analyse de l'expression différentielle. La médiane du nombre positif exclut les zéros.

### Retour à un emploi après le redémarrage de l'application {/* #return-to-a-job-after-restarting-the-app */}

Ouvrez le même projet et la même conversation, puis utilisez **Compute** ou l'entrée **Background tasks** de l'emploi. Comparez le **Job ID** avec le reçu original avant d'agir. Un emploi restauré est la charge de travail à distance existante; Commencer une nouvelle conversation ou renvoyer l'invite n'est pas une étape de récupération.

Le point de contrôle de préparation séparé ci-dessous était en marche lorsque l'application locale a redémarré. L'application a récupéré le même ID de travail et a ensuite recueilli son journal d'achèvement. L'attente s'est terminée normalement; cette capture d'écran démontre la récupération, pas l'annulation ou un calcul scientifique.

![Même travail de préparation récupéré après un redémarrage de l'application](/img/open-science/remote-compute/07-job-recovered-after-restart.webp)

### Annuler un emploi à distance {/* #cancel-one-remote-job */}

Ouvrez **Background tasks**, sélectionnez la tâche prévue et comparez sa **Job ID** avec le reçu. **Back** retourne à la liste des tâches de la session. Sélectionnez **Cancel** dans la vue de détail de cette tâche, attendez pendant que le bouton affiche **Cancelling**, puis utilisez **Refresh** pour confirmer **Cancelled**. La fermeture de la boîte de dialogue de détails ou la fin d'une réponse de conversation n'annule pas la charge de travail distante.

Le point de contrôle de préparation ci-dessous a été annulé grâce à ce contrôle. Le processus à distance a été confirmé de façon indépendante par la suite. Son journal existant est resté lisible. Cela ne signifie pas qu'une analyse annulée a produit un résultat complet; inspecter les dossiers conservés avant de les utiliser.

![Annulation confirmée pour l'emploi de préparation sélectionné](/img/open-science/remote-compute/09-job-cancelled.webp)


</ToolOperationGroup>

## Soumettre par Slurm et vérifier l'allocation {/* #submit-through-slurm-and-check-the-allocation */}

1. Ouvrez l'hôte dans **Settings → Compute**, choisissez **Execution mode → Edit → Slurm → Save** et rouvrez le réglage pour le confirmer. **Detected scheduler** seul ne sélectionne pas le mode.
2. Activer et sélectionner l'hôte dans la conversation prévue. Confirmez la comptabilité partition/compte et planificateur lisible du site avant d'effectuer une longue analyse.
3. Demander des ressources en utilisant une directive `#SBATCH --option=value` par ligne. Cet exemple a été utilisé:

```bash
#SBATCH --partition=local
#SBATCH --cpus-per-task=1
#SBATCH --mem=1G
#SBATCH --time=00:03:00
```

Utilisez la partition de votre site plutôt que de copier `local` sans condition. Le **Temps d'arrêt de la charge de travail de 120-seconde** de l'emploi est séparé de la limite de trois minutes de l'horaire; ni ne détermine à quel moment un travail en attente commence. L'application gère le nom de travail, le répertoire de travail et les chemins stdout/stderr.

4. Préservez à la fois l'application **Job ID** et **scheduler_job_id**. L'identificateur de calendrier peut arriver après le reçu de la demande initiale; Demandez à l'agent de lire le statut du travail sauvegardé. Ne pas soumettre à nouveau simplement parce que ce premier reçu manque de l'identificateur de calendrier.
5. Comparer les ressources demandées avec l'allocation réelle. L'exemple demandait un CPU par tâche et 1 GiB; Slurm a enregistré une tâche et deux processeurs logiques attribués. Utilisez le dossier d'allocation du planificateur pour expliquer l'utilisation des ressources.
6. Attendez un état terminal confirmé et les fichiers collectés avant de publier le résultat. Un fichier de sortie côté serveur n'établit pas que l'application l'a récolté.

![Slurm sélectionné explicitement en mode exécution de l'hôte](/img/open-science/remote-compute/10-slurm-execution-mode.webp)

### Lorsque le serveur complète mais que l'application continue d'attendre {/* #when-the-server-completes-but-the-app-keeps-waiting */}

Si l'instantané de l'application rapporte `last_poll_error`, conservez l'identifiant de travail existant et demandez l'erreur exacte. La défaillance comptable observée était la suivante :

```text
slurm_poll_failed: Slurm accounting storage is disabled
```

Si le programmeur affiche **COMPLÈTE / Code de sortie 0:0** mais que l'application affiche toujours **présenté**, **result_final faux** ou aucun fichier collecté, conservez les deux ID de travail et inspectez l'erreur de vote. Traiter l'achèvement du calendrier et la collecte des résultats de l'application comme des étapes distinctes.

![L'application attend toujours le statut de terminal pour une charge de travail complète de Slurm](/img/open-science/remote-compute/11-slurm-accounting-unavailable.webp)

Demandez à l'administrateur du cluster de fournir la comptabilité de travail `sacct` pour le compte et l'emploi. Un emploi qui disparaît de `squeue` ne confirme pas son succès. Gardez le répertoire de travail existant et les deux ID de travail, puis rafraîchir le même travail après la comptabilité est rétabli et vérifier son état final et les fichiers collectés.

<ToolOperationGroup>
<summary>Exécuter une petite séquence protéique sur GPU</summary>

## Exécuter une petite séquence protéique sur GPU {/* #run-a-small-protein-sequence-design-on-gpu */}

<p className="example-label"><strong>Exemple pratique</strong> Concevoir une séquence d'ubiquitine avec ProteinMPNN sur GPU</p>

Utilisez le public [Structure de l'ubiquitine du 1UBQ](https://www.rcsb.org/structure/1UBQ) pour générer un candidat à chaîne A avec ProteinMPNN. Ceci vérifie l'exécution à distance de GPU et l'inspection de sortie. Il ne prédit pas une nouvelle structure ni n'établit la fonction de l'ubiquitine.

1. Sélectionnez l'hôte connecté dans **Compute**. Vérifiez la mémoire GPU libre et la charge courante, et confirmez que l'exécution directe d'une petite tâche est autorisée. Dans un cluster géré par un programmeur, utilisez une partition et un compte autorisés.
2. Demandez à l'agent de préparer un environnement isolé et de conserver l'inventaire Python, PyTorch/CUDA et la dépendance. L'exemple a utilisé Python 3.10, PyTorch 2.5.1+cu124 et NumPy 1.26.4. Python original de l'hôte avait CPU-seulement PyTorch; la détection d'un GPU seul était insuffisante.
3. Pinner le [contrôle officiel de ProteinMPNN](https://github.com/dauparas/ProteinMPNN/tree/8907e6671bfbfc92303b5f79c4b5e6ce47cdef57) et ses poids `v_48_020` inclus. Enregistrer SHA-256 pour la structure et les poids 1UBQ téléchargés.
4. Spécifiez la chaîne **A**, le candidat **une**, la taille du lot **1**, la température **0.1**, la semence **42** et une limite d'exécution **180-seconde**. Inspectez la commande distante montrée par l'application avant d'approuver cette opération.
5. Nécessite stdout/stderr, l'état de sortie et le périphérique de paramètre du modèle. `CUDA available=True` seul ne prouve pas l'inférence utilisée GPU. Cette exécution a enregistré `parameter_device=cuda:0` et `parameter_is_cuda=True`.
6. Inspecter le FASTA généré. Vérifier indépendamment la longueur, l'alphabet amino-acide, correspond à la chaîne native et les scores finis, puis vérifier à nouveau le hash d'entrée.

| Vérifier | Résultat dans cet exemple |
| --- | --- |
| Appareil | NVIDIA A100 80GB PCIe; paramètres du modèle en fait sur CUDA |
| Longueur des entrées/sorties | Chaîne autochtone A et candidat à la fois résidus 76 |
| Alphabet et scores | alphabet standard 20-amino-acide; Score fini/score global de 0.8568 |
| Les allumettes autochtones | 42/76; récupération recalculée indépendamment 0.5526316 |
| Exécution | Modèle et validation indépendante 0 sorti; temps de génération rapporté par le modèle 0.1949 secondes exclut la configuration et la tâche complète |
| Intégrité de l'entrée | Structure identique SHA-256 avant et après |

<a href="/docs/examples/ubiquitin/gpu-proteinmpnn-verification.json" download>Télécharger l'enregistrement de vérification GPU</a>. La capacité 80 GB de l'appareil n'est pas une exigence minimale pour cette petite tâche; la mémoire maximale n'a pas été mesurée. Les journaux et fichiers distants ne fournissent pas automatiquement une provenance locale complète de Notebook.

Cet exemple passe par Direct SSH. Pour un travail Slurm GPU, validez d'abord les permissions de partition et de compte. Si la soumission renvoie **Nombre d ' affaires non réglées**, demandez à l'administrateur du cluster de vérifier ces paramètres; utiliser la file d'attente requise pour les travaux gérés par les planificateurs.


</ToolOperationGroup>

## Résoudre les erreurs de SSH et de travail {/* #resolve-ssh-and-job-errors */}

Lisez à la fois le code et son message. Une erreur de connexion, un rejet de programmeur et un programme échoué nécessitent des corrections différentes. Les identificateurs ci-dessous décrivent les états de connexion et de calcul; l'interface peut afficher un message descriptif au lieu du code brut.

### Connexion et fichiers distants {/* #connection-and-remote-files */}

| Message ou identificateur | Signification | Prochaine action et contrôle de succès |
| --- | --- | --- |
| `The SSH host key is unknown. Verify it in a terminal before connecting.` | Le client système SSH n'a aucune clé de confiance pour cet hôte et ce port. | Vérifier l'empreinte digitale avec l'administrateur, établir la confiance de l'hôte dans le client système SSH, puis réessayer **Add** ou **Test and save**. Ne pas désactiver la vérification de la clé hôte. |
| `Permission denied (publickey)` | L'authentification des clés SSH a échoué; le classificateur de fichier distant traite cela comme `connection`. | Vérifiez Utilisateur, fichier d'identité, alias hôte et ssh-agent. Confirmez que l'administrateur autorise cette clé. Utilisation **Test and save**Alors **Retry probe**. |
| `Connection refused` / `No route to host` / connexion `timeout` | Le transport SSH ne peut pas atteindre ou établir la connexion. | Vérifiez la disponibilité de l'hôte, du port, du réseau/VPN et du serveur. Réessayez la connexion après avoir corrigé la cause. |
| `ENOENT` / `not_found` | Le chemin distant demandé n'existe pas. | Vérifiez le chemin sur l'hôte distant, pas votre ordinateur portable; ouvrir le bon répertoire ou fichier. |
| `EACCES` / `EPERM` / `permission` | Le compte connecté ne peut pas effectuer cette opération de système de fichiers. | Demandez à l'administrateur hôte de confirmer l'accès ou de sélectionner un répertoire de scratch autorisé. Réessayez la même opération. |
| `outside_roots` | La validation du chemin de fichier à distance a rejeté un chemin ou un caractère de contrôle non absolu. | Fournissez un chemin distant absolu sans caractères de rupture/de contrôle de ligne. Cochez l'erreur complète si un autre calque a rejeté le chemin. |

### Dossiers d'emploi {/* #job-records */}

| Code d'erreur | Signification | Action suivante |
| --- | --- | --- |
| `approval_denied` | L'opération demandée n'a pas été approuvée. | Revoir le commandement et la portée prévus. Soumettre une nouvelle demande seulement si vous voulez autoriser ce travail. |
| `host_unreachable` | L'application n'a pas pu atteindre ou confirmer l'opération hôte. | Restaurer la connectivité et sonder l'hôte. Si la soumission a pu se produire, vérifiez s'il s'agit d'un emploi à distance existant avant de réessayer. |
| `invalid_resources` | Les arguments de ressources ou les directives Slurm ont échoué à la validation. | Lisez le champ/directive nommé. Suivez le format de ressource accepté, les limites des grappes et toute restriction de directive appliquée. Réessayez après avoir corrigé ce champ. |
| `dispatch_failed` | La soumission de lancement ou de calendrier a échoué. | Lire stderr et n'importe quel `sbatch` Message. Vérifiez la partition/compte, l'environnement et la commande. Vérifiez un reçu d'agenda avant de soumettre à nouveau. |
| `job_failed` | Le travail s'est terminé sans succès. | Lisez son code de sortie et stdout/stderr, corrigez le programme ou l'environnement, puis exécutez un petit test. |
| `timeout` | Une connexion, une commande ou un travail dépasse une limite; ce code peut également accompagner invalide `timeout_seconds`. | Utilisez le message d'accompagnement pour distinguer les entrées non valides du temps écoulé. Vérifiez l'état de l'emploi existant avant de modifier la limite ou de recommencer à courir. |
| `process_vanished` | Le suivi ou le rétablissement n'a plus pu trouver le processus prévu. | Inspectez le répertoire de travail à distance, les journaux et l'historique des planificateurs. Déterminer si le travail a cessé ou terminé avant de créer un emploi de remplacement. |

**`last_poll_error` est une erreur de surveillance**, pas en soi le statut final du poste. De même, `harvest_error` signifie que la collecte des résultats nécessite une attention particulière; Le calcul peut avoir déjà terminé. Préservez l'identifiant d'emploi, rétablissez la connectivité et inspectez l'emploi existant avant de commencer une autre copie.

Une récupération réussie devrait montrer l'état final de l'emploi visé, un état de sortie interprétable et une sortie accessible. Pour Slurm, vérifiez l'ID d'emploi de programmeur ainsi que l'ID d'emploi d'application. Si l'erreur persiste, suivez [Signaler un bug ou demander à la communauté](troubleshooting.md#report-a-bug-or-ask-the-community); inclure le mode d'exécution, les deux ID quand disponibles, l'erreur complète et un extrait de journal désinfecté.

Pour l'authentification des clés/config SSH, fournissez une clé utilisable ou un alias hôte et vérifiez la connexion avant de soumettre. La collecte des résultats Slurm nécessite une comptabilité de travail pour le compte sélectionné; suivre les vérifications ci-dessus si l'application ne peut pas régler le travail.

Sources: [calculer les codes d'emploi et les champs d'enregistrement](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/compute.ts), [Classification des erreurs SSH/fichier](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/remote-fs.ts), [Validation de la soumission Slurm](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/compute/slurm-driver.ts).
