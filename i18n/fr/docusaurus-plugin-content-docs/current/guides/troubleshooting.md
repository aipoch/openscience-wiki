---
title: "Dépannage et questions communes"
last_update:
  date: '2026-09-24'
---

# Dépannage et questions communes {/* #troubleshooting-and-common-questions */}

Trouvez le texte d'erreur ci-dessous, suivez les vérifications pour l'opération touchée, puis réessayez cette opération. Si le problème persiste, [signaler un bug ou demander à la communauté](#report-a-bug-or-ask-the-community) avec l'erreur et les étapes qui l'ont déclenchée.

<span id="provider-test-fails" />

<span id="pythonr-or-package-installation-fails" />

<span id="file-does-not-open-in-preview" />

<span id="remote-control-is-unreachable" />

## Diagnostic par le point d'échec {/* #diagnose-by-the-point-of-failure */}

| Symptôme | Vérifiez d'abord | Action et condition de succès |
| --- | --- | --- |
| L'application ouvre un espace de travail vide | Emplacement des données, profil et archivé | Retour à la racine ou au projet prévu; ne pas créer immédiatement un remplacement |
| Aucun modèle utilisable | Connexion du fournisseur, agent actif, compatibilité du modèle | [Configuration du fournisseur](providers.md): une petite réponse réelle réussit |
| Connexion apparaît connectée mais la tâche échoue | Erreur élargie du fournisseur et modèle sélectionné | Revérifier l'authentification/le droit et l'identificateur du modèle; La présence de l'assurance-chômage n'est pas une preuve d'accès |
| La tâche apparaît arrêtée | En attente de plan, d'approbation ou de carte d'interaction | Répondre à la demande visible; lire son champ d'application avant de permettre |
| Correction en attente ne s'exécute pas | Non enregistré / Envoi / État de livraison différé | [Compositeur](composer.md): vérifier qu'il est devenu un message utilisateur |
| Module non trouvé | Interprétation exacte et inventaire des colis | [Environnements d'exécution](runtimes.md): valider l'importation dans l'environnement sélectionné |
| L'installation du paquet approuvé échoue toujours | Première erreur réseau/proxy/certificat | [Réseau](network.md): réessayer l'opération réelle après avoir fixé sa cause |
| Notebook ne peut pas lire un fichier | Traitement du chemin, de la pièce jointe, de la subvention de dossier et de la référence de version | utiliser l'entrée autorisée prévue; ne pas élargir l'accès au système de fichiers non liés |
| Le service de fichier sauvegardé rejette un chemin de travail | Indique s'il est enregistré pour une publication gérée | Enregistrer par l'opération d'artefact supportée; rouvrir le fichier résultant |
| Tableau différent d'un nombre prévu | Source hash, délimiteur, colonnes de métadonnées et dénominateur de calcul | Recalculer à partir de la même entrée avant de modifier la valeur attendue |
| Fichier visible mais l'aperçu échoue | Erreur de format/dimension de fichier, de version et de rendu | [Aperçus](previews.md): téléchargement pour distinguer le rendu de l'absence de fichier |
| La référence semble manquante | Vue de bibliothèque, filtres, boîte de réception ou corbeille | Effacer les filtres, inspecter l'état et restaurer dans le cycle de vie correct |
| Source en texte intégral trouvée mais la pièce jointe échoue | Résultat de téléchargement réel et validation PDF | Utilisez une autre source légitime/locale PDF, puis ouvrez la pièce jointe |
| Side Chat désactivé | Message de compatibilité agent/fournisseur | [Délégation](delegation.md): vérifier la restriction de compatibilité indiquée par votre cadre sélectionné |
| Le travail à distance ne peut pas fonctionner | Préalables réels d'hôte, d'authentification, de calendrier et d'exécution | [Calcul à distance](remote-compute.md) |

<span id="storage-migration-reports-an-error" />

## Erreurs HTTP: 400, 403, 429 et 5xx {/* #http-errors-400-403-429-and-5xx */}

Un état HTTP décrit une réponse d'un fournisseur modèle, service Connector, service de navigateur local ou proxy. **Identifier le service répondant avant de modifier les paramètres.** Copier le statut avec son corps d'erreur : `403` seul ne vous indique pas si une autorisation API, une politique de proxy ou une restriction de ressources ont causé le rejet.

<span id="permission-request-keeps-waiting" />

### Demande, authentification et accès {/* #request-authentication-and-access */}

| Statut | Signification | Que vérifier dans Open-Science |
| --- | --- | --- |
| **Demande incorrecte de 400** | Le service rejette la demande. | Lisez le champ ou le paramètre nommé. Vérifiez le paramètre du fournisseur, l'identificateur du modèle et les fonctions de demande prises en charge. Pour un appel d'outil, vérifiez son schéma d'entrée. Essayez une petite requête de texte seulement si des pièces jointes ou une fonctionnalité optionnelle ont déclenché l'erreur. |
| **401 Non autorisé** | Il manque une authentification valide. | Vérifiez quel compte ou quel titre le service défaillant utilise. Reconnecter le compte d'abonnement/OAuth pertinent, ou corriger la clé API dans [Paramètres du fournisseur](providers.md) ou [Informations d’identification des Connecteurs](connectors.md). |
| **403 Interdit** | Le service refuse l'accès. | Vérifier les droits de modèle/ressources, les autorisations d'organisation/projet et les restrictions d'accès énoncées par le service. Si l'erreur dit **HTTP CONNECT 403**, inspecter les [politique de mandataire ou de réseau](network.md), plutôt que de supposer que la clé du modèle est fausse. |
| **404 Non trouvé** | Le paramètre ou la ressource n'est pas disponible à cette adresse. | Vérifiez l'URL de base, le chemin API et l'ID de modèle/ressources. Une URL du site Web du navigateur n'est pas nécessairement un paramètre API. Un service peut également utiliser 404 pour cacher une ressource inaccessible. |
| **Méthode 405 non autorisée** | Le paramètre ne supporte pas cette méthode de demande. | Vérifiez le protocole API sélectionné et le transport Connector par rapport à la documentation de service. Signaler une inadéquation d'intégration reproductible plutôt que de deviner une méthode différente. |
| **407 Authentification par procuration requise** | Le proxy nécessite une authentification. | Vérifiez la configuration proxy avec votre administrateur réseau. Les références du modèle API n'authentifient pas le proxy. |
| **413 Contenu trop grand** | L'organisme de demande dépasse une limite. | Réduire la taille de la pièce jointe ou du lot ou utiliser une entrée plus petite prise en charge. Confirmez quel service impose la limite. |
| **422 Contenu intransformable** | Le contenu de la demande ne peut pas être traité comme fourni. | Lisez le message de validation au niveau du champ. Corriger les types, les champs requis ou les valeurs non prises en charge dans la demande d'outil/fournisseur. |

**400 et 403 ont besoin de vérifications différentes :** pour un 400 qui nomme un paramètre non pris en charge, corrigez cette fonction de requête. Pour un 403 qui nomme un modèle restreint, vérifiez l'accès à ce modèle. Si aucune cause précise n'apparaît, conservez la réponse et demandez l'identification de soutien; ne pas déduire la cause du seul nombre.

### Contingents et pannes de service temporaire {/* #quotas-and-temporary-service-failures */}

| Statut | Signification | Action suivante |
| --- | --- | --- |
| **402 Paiement requis** | le paiement/traitement d'accès spécifique au fournisseur; HTTP réserve ce statut sans signification universelle de facturation. | Lisez le corps d'erreur et la page de compte de ce fournisseur. Ne présumez pas qu'un supplément est nécessaire à partir du seul numéro. |
| **429 Trop de demandes** | Limite des taux; certains modèles API l'utilisent également pour les quotas épuisés. | Pour une limite tarifaire, réduire les demandes simultanées et attendre **Réessayer-après** ou la réinitialisation documentée. Pour une erreur de quota, vérifiez l'allocation/facturation de ce service. Une limite d'abonnement et un solde créditeur API sont séparés. |
| **Erreur de serveur interne 500** | Le serveur répondant a échoué. | Vérifiez son état de service. Réessayer une petite demande après une pause si sûr; signaler des échecs répétés avec l'ID de la requête. |
| **502 Mauvaise passerelle** | Une passerelle a reçu une réponse en amont non valide. | Identifier la passerelle/fournisseur et vérifier son état et configuré en amont. Une défaillance de porte personnalisée persistante peut nécessiter son administrateur. |
| **Service 503 non disponible** | Le service est temporairement indisponible. | Suivez Retry-Après si fourni et attendez la récupération. Pour un paramètre local, vérifiez que le serveur de modèle prévu est en cours d'exécution et prêt. |
| **Heure d'arrêt de la passerelle 504** | Une porte d'entrée a attendu en amont. | Vérifiez si l'opération a déjà commencé ou terminée avant de réessayer. Pour une analyse, une soumission d'emploi ou une écriture d'artefact, inspectez d'abord le résultat existant afin d'éviter la duplication. |

Certaines requêtes Connector intégrées ont limité les requêtes automatiques pour 429, 500, 502, 503 et 504. Cela ne s'applique pas à tous les modèles/cadres ni à la sécurité des présentations manuelles répétées. Suivez la réponse du service en question.

### Pas de réponse HTTP, ou toujours en panne {/* #no-http-response-or-still-failing */}

Les erreurs de `ECONNREFUSED`, `ENOTFOUND`, `ETIMEDOUT` et de certificat sont des pannes de connexion/TLS, et non des codes de statut HTTP. Un délai de requête n'est pas automatiquement HTTP 408 ou 504. Commencez par [Réseau](network.md).

Après avoir modifié un réglage, tester le même fournisseur/Connector avec une petite demande, puis réessayer l'opération touchée. Si elle échoue toujours, utilisez le [instructions de retour d'information](#report-a-bug-or-ask-the-community). Inclure le nom du service, l'hôte ou le chemin du point d'arrivée sans secrets, l'état, le corps d'erreur, l'identifiant de demande s'il est présent et le fuseau horaire. Ne collez jamais un en-tête d'autorisation ou une URL portant un jeton dans un rapport public.

## Correspond au message d'erreur {/* #match-the-error-message */}

Copier le code exact et le message d'accompagnement à partir de l'outil, de la boîte de dialogue ou du journal échoué. Les noms d'exception et les messages OS **Codes**, Python sont différents types d'identificateurs; Open-Science n'attribue pas un code numérique universel à chaque échec. Un message peut avoir plusieurs causes. Pour les emplois à distance, utilisez le [SSH et table d'erreur de calcul](remote-compute.md#resolve-ssh-and-job-errors).

| Code ou message | Signification et action suivante | Confirmer la récupération |
| --- | --- | --- |
| `ModuleNotFoundError: No module named '…'` | L'interpréteur Python sélectionné ne peut pas importer ce module. Inspecter [Environnements d'exécution](runtimes.md), installer le paquet requis dans cet environnement par le biais de son itinéraire de gestion du paquet pris en charge, et suivre toute instruction de redémarrage. | Importer le module dans le même environnement Notebook, puis réexécuter la cellule défaillante. |
| `ENOENT` / `No such file or directory` | Le chemin demandé ne peut pas être trouvé. Vérifiez le nom du fichier et l'emplacement de la source; annexez à nouveau le fichier existant si sa référence est statique. | Prévisualiser ou lire l'entrée prévue de la même tâche. |
| `EACCES` / `EPERM` / `Permission denied` | L'opération manque d'accès au système de fichiers. Inspecter à la fois l'autorisation du système d'exploitation et la subvention du dossier du projet; Utilisation [Projets](projects.md) pour n'accorder que le répertoire dont la tâche a besoin. Pour SSH `Permission denied (publickey)`, vérifiez plutôt l'authentification. | Répétez la lecture/écriture originale dans le champ d'autorisation prévu. |
| `ENOTDIR` / `Not a directory` | Une opération de répertoire a reçu un fichier ou un chemin parent invalide. Sélectionnez le dossier contenant réellement. | La liste des répertoires s'ouvre. |
| `EISDIR` / `Is a directory` | Une opération de fichier a reçu un répertoire. Sélectionnez le fichier prévu. | Le fichier s'ouvre ou est téléchargé. |
| Demande d'emballage rejetée pour une destination non publique | Inspecter l'hôte rejeté et résoudre l'IP. Une configuration proxy ou DNS peut fournir une adresse des blocs de politique du réseau. Voir [Réseau](network.md); fixer la résolution d'adresse au lieu d'élargir l'accès aveuglément. | La demande d'emballage originale et l'importation subséquente réussissent. |

<span id="agent-does-not-start-or-the-session-stops-progressing" />

### Erreurs de démarrage de la base de données {/* #database-startup-errors */}

Ces codes apparaissent lorsque l'application ne peut pas terminer en toute sécurité l'ouverture de ses données. Conservez le dossier de données existant. Lire le détail de l'erreur avant de réessayer; supprimer la base de données n'est pas une étape de réparation.

| Code d'erreur | Signification | Action suivante |
| --- | --- | --- |
| `database_runtime_unavailable` | Le moteur de base de données groupé n'a pas été chargé. | Réinstaller le paquet d'applications officiel approprié, en conservant le dossier de données séparé. |
| `database_open_failed` | La base de données n'a pas pu être ouverte. Une autre instance de l'application, un espace disque insuffisant ou un emplacement en lecture seule peut en être la cause. | Quitter d'autres instances, vérifier l'espace libre et les permissions de dossier, puis réessayer. |
| `database_newer_than_app` | Une version plus récente de l'application a écrit ce format de données. | Installez une nouvelle version compatible et rouvrez le même dossier de données. N'essayez pas de dévaloriser son schéma. |
| `database_history_invalid` | L'historique de migration ne correspond pas à l'historique attendu de l'application. | Préservez le dossier et rapportez le code. Si vous avez une sauvegarde connue, demandez une procédure de récupération avant de remplacer les données. |
| `database_migration_failed` | Une mise à jour de base de données ne s'est pas terminée. | Vérifier l'espace libre, les autres instances et les autorisations; utiliser Reessayer quand disponible. Inclure l'ID de migration s'il échoue à nouveau. |
| `database_validation_failed` | Les données stockées ne répondent pas à la structure requise. | Mettre à jour l'application et relancer. S'il persiste, indiquez le code plutôt que d'éditer les lignes de base de données. |
| `database_startup_unavailable` | Le service de démarrage de la base de données n'a pas répondu ni terminé la vérification. | Réessayer; s'il persiste, quitte complètement et rouvre l'application, puis le signaler. |

La récupération signifie que l'écran de démarrage s'ouvre et que les projets attendus s'ouvrent. Si une action **Still stuck? Create an issue for help** est disponible, utilisez le flux d'examen décrit [ci-dessous](#report-a-bug-or-ask-the-community). Ces significations suivent le [Guide de démarrage](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/components/database-startup-gate.tsx).

Si l'écran de démarrage offre uniquement **Quit**, quittez l'application, résolvez la cause signalée et lancez-la à nouveau. Utilisez **Retry** seulement lorsque la page le fournit. Après la récupération, rouvrez vos projets et fichiers attendus.

![Guide de démarrage lorsque la base de données ne peut pas s'ouvrir](/img/open-science/local-acceptance/startup-database-error.webp)

### Messages de récupération {/* #recovery-messages */}

| Symptôme | Action suivante |
| --- | --- |
| Les tâches de calcul restent en attente après la récupération du stockage | Lire l'avis de conversation touché, préserver les fichiers identifiés, récupérer une copie valide et sélectionner **Recheck saved conversations**. Inspectez le même travail avant de soumettre un autre. |
| Téléchargement de PDF annulé mais la référence reste | Ouvrez la référence sauvegardée et vérifiez son statut de pièce jointe; utiliser le lot **Retry unfinished** chemin où offert. |
| Collection sauvegarde rejetée après qu'un autre client l'a édité | Rouvrir la dernière collection et réconcilier les changements avant d'enregistrer à nouveau. |
| Rapports de mise à jour Windows refusés d'accès | Lisez le chemin exact du fichier et l'erreur Windows. Suivez l'instruction de l'avis d'utiliser l'installateur officiel comme administrateur. |
| La mise à jour Windows rapporte un fichier en cours d'utilisation | Fermez le processus identifié comme utilisant ce fichier d'installation, puis choisissez **Retry**ou **Cancel** pour arrêter la mise à jour. |

Les erreurs Windows sont des codes de système d'exploitation, distincts des codes de statut HTTP. Si la récupération échoue, incluez la version installée, le message exact et l'identité du fichier/de l'emploi désinfecté lorsque vous [signaler le problème](#report-a-bug-or-ask-the-community).

## Réinitialiser les données locales Windows {/* #windows-data-reset */}

Utilisez l'utilitaire de réinitialisation autonome seulement lorsque vous avez l'intention de jeter les données de l'installation locale et de recommencer. **Il supprime définitivement les données énumérées et les identifiants enregistrés; il ne les répare ni ne les soutient.** Copiez d'abord les fichiers de recherche et les sauvegardes nécessaires en dehors de tous les répertoires énumérés. Réinstaller l'application seule conserve ces données.

1. Depuis le [guide officiel de réinitialisation](https://github.com/aipoch/open-science/blob/v0.33.0/scripts/windows-reset/README.md), téléchargez `reset-open-science.cmd` et `reset-open-science.ps1` en utilisant **Télécharger le fichier brut**. Conservez-les ensemble en dehors des répertoires de données de l'application.
2. Quitter Open-Science, y compris son processus de plateau, et terminer et fermer son agent, Notebook, sans tête et les processus WSL. Utilisez votre compte Windows normal; le mode administrateur n'est pas requis.
3. Dans Command Prompt ouvert dans le dossier de téléchargement, exécutez `reset-open-science.cmd -Preview`. Examiner chaque donnée, configuration, profil et chemin d'exécution-cache proposés. Preview ne supprime pas les données.
4. Seulement après avoir examiné et sauvegardé ces emplacements, double-cliquez sur `reset-open-science.cmd`. Il vous demande de taper `RESET OPEN SCIENCE` exactement avant la suppression; toute autre réponse annule.
5. Lire le résultat final avant de rouvrir l'application. Après une réinitialisation terminée, choisissez l'emplacement des données et configurez les fournisseurs et gérez à nouveau les runtimes.

Si un processus est en cours ou ne peut pas être inspecté, ou si un chemin est dangereux, résoudre d'abord l'état signalé. Ne pas contourner un refus. Si les paramètres sont corrompus ou qu'un emplacement de données personnalisé est impliqué, utilisez la procédure `-DataRoot` explicite du guide officiel. Une erreur de suppression peut laisser une réinitialisation partielle, alors lisez l'erreur plutôt que de supposer que rien n'a changé. L'utilitaire ne révoque pas les comptes fournisseurs externes ou supprime les environnements Python/R installés séparément.

<span id="collect-evidence-for-a-report" />

## Recueillir des diagnostics utiles {/* #collect-useful-diagnostics */}

1. Enregistrez la version de l'application, le système d'exploitation, l'agent/modèle actif, le projet/session et le moment de l'échec.
2. Copiez la première erreur d'outil pertinente et l'opération qui l'a causée. Inclure le comportement attendu par rapport au comportement observé.
3. Pour les problèmes d'entrée, inclure un lien de source publique, le nom du fichier, la taille et le somme de contrôle; une entrée reproductible minimale est plus utile qu'une capture d'écran non liée.
4. Ouvrez **Settings → General → Diagnostics** et utilisez **Ouvrir / révéler** pour le journal d'exécution lorsque nécessaire.
5. Inspecter les journaux avant de les partager; omettre des jetons de compte, du contenu de source privée et des chemins non reliés. Ouvrir un journal ne l'envoie pas automatiquement.
6. Indiquer si la même opération réussit après le changement. Un bouton activé n'est pas la condition de succès.

Les significations des messages techniques sont collectées dans [Référence des diagnostics](../reference/diagnostics.md).

### Diagnostics d'exportation pour une session {/* #session-diagnostics */}

1. Ouvrez la session touchée et choisissez **Export diagnostics…** dans son en-tête, ou **Export → Export diagnostics…** dans le menu de session.
2. Examiner les sources disponibles. **session.json** et **Session database records** concernent la session sélectionnée. **main.log** et les journaux d'applications historiques peuvent également contenir des métadonnées d'autres sessions; ne les sélectionner que lorsqu'il y a lieu.
3. Choisissez **Export**, sélectionnez une destination locale et attendez **Diagnostics exported.** Utilisez **Show in folder** pour localiser l'archive.
4. Inspectez son registre de manifeste et d'exportation avant de partager. Une source manquante ou endommagée peut être résumée ou omise; l'existence de l'archive ne prouve pas que toutes les sources ont été capturées.

![Sélection de sources de diagnostic spécifiques à une session avant une exportation locale](/img/open-science/v0330/session-diagnostics.webp)

L'exportation de métadonnées ordinaires exclut les champs de contenu privé. Si une exportation de .science déclenche la vérification du contenu sensible, la liste des sources peut également contenir des preuves du scanner expurgé et les fichiers marqués d'origine. **Les fichiers sensibles originaux sont décochés par défaut; sélection d'un octets dans l'archive.** Sélectionnez uniquement les sources nécessaires et inspectez l'archive et les captures d'écran avant de partager. Exporter reste local et ne fait aucune demande de téléchargement ou de modèle. Il s'agit de données diagnostiques, et non d'un soutien de recherche; utiliser un [Paquet .science](research-packages.md) pour un transfert de recherche.

## Signaler un bug ou demander à la communauté {/* #report-a-bug-or-ask-the-community */}

| Vous avez besoin | Chaîne |
| --- | --- |
| Aide à choisir les paramètres ou à comprendre une erreur | [Rejoignez AIPOCH Official sur Discord](https://discord.gg/zxQAYjReRv). Décrivez l'opération, la version et l'erreur afin que les autres puissent vous aider. |
| Une défaillance de l'application reproductible suivi à la résolution | Rechercher [problèmes existants](https://github.com/aipoch/open-science/issues), puis ouvrir un [Rapport de bogue](https://github.com/aipoch/open-science/issues/new?template=bug_report.yml). |
| Une nouvelle capacité ou une amélioration | Ouvrir un [demande de caractéristiques](https://github.com/aipoch/open-science/issues/new?template=feature_request.yml) et expliquer la tâche de recherche qu'elle soutiendra. |

### Soumettre un numéro GitHub utile {/* #submit-a-useful-github-issue */}

1. Recherchez les problèmes existants en utilisant le code d'erreur ou une phrase distinctive. Si le même problème existe, ajoutez les détails de reproduction pertinents.
2. Connectez-vous à GitHub et ouvrez **Rapport de bogue**. Utilisez un titre tel que `[Bug]: database_open_failed when reopening a project` avec votre erreur réelle.
3. Remplissez **Que s'est-il passé ?**, **Étapes de reproduction**, **Système d'exploitation** et **App version**. Ajouter **Provider / model** le cas échéant, en plus du cadre Agent actif.
4. Sous **Registres ou captures d'écran pertinents**, inclure la première erreur et une petite quantité de contexte environnant. Ajouter un échantillon public ou minimal lorsque le problème dépend des données d'entrée.
5. Revoir le rapport, puis le soumettre. Gardez l'URL du problème et affichez le résultat de toute vérification suggérée dans le même problème. Si GitHub n'offre pas de création d'émission pour votre compte, utilisez Discord pour trouver l'itinéraire de déclaration approprié.

Utilisez cette liste de contrôle lors de la préparation d'un problème ou d'une question de désaccord :

```text
Open-Science version and installation method:
Operating system and architecture:
Agent framework / provider / model (if relevant):
Page and action:
Steps to reproduce:
Expected result:
Actual result:
Exact error code and full message:
Time of failure and time zone:
Public/minimal input (if needed):
Checks already tried and their results:
Relevant log excerpt or screenshot:
```

Pour une défaillance distante, inclure également le mode d'exécution, l'ID de travail de l'application, l'ID de travail planificateur quand présent, le code de sortie et le stdout/stderr pertinent. Utilisez un pseudonyme neutre pour un hôte privé. Ne joignez pas les mots de passe, les jetons, les clés privées SSH, les données sur le patient ou tout un dossier de recherche privé; remplacer les détails sensibles dans un exemple minimal.

<span id="report-directly-from-a-startup-error" />

### Préparer un rapport à partir d'une erreur {/* #prepare-a-report-from-an-error */}

Sélectionnez **Report this error** à côté d'une erreur de conversation. Un écran de démarrage peut également offrir **Still stuck? Create an issue for help**.

1. Lire **Error details** et supprimer les chemins privés, les identifiants ou les entrées sensibles avant le partage.
2. Vérifiez **Also included** pour la version de l'application, le système d'exploitation, le cadre Agent, le fournisseur/modèle et les versions d'exécution.
3. Utilisez **Copy details** pour copier les informations de texte et d'environnement éditées. **Reveal log file** localise le journal d'exécution local; il n'est pas automatiquement joint et doit faire l'objet d'un examen séparé avant le partage.
4. Vérifiez la reconnaissance de partage public pour activer **Open GitHub issue**. Modifier le texte d'erreur nécessite de revoir et de reconnaitre à nouveau le contenu révisé.
5. Ouvrez le formulaire GitHub, inspectez les champs préremplis, ajoutez des étapes utiles de reproduction, puis soumettez-le quand vous êtes prêt. L'ouverture de l'aperçu du rapport à elle seule ne présente pas de problème.

![Détails d'erreur modifiables et confirmation du partage public](/img/open-science/sept11-completion/report-preview.webp)

## Questions communes {/* #common-questions */}

**Ai-je besoin d'un compte modèle pour chaque opération?** No. La navigation locale, l'organisation et de nombreux paramètres peuvent fonctionner sans modèle. Les réponses des agents, la planification de l'analyse et les examens générés par les modèles nécessitent un accès compatible aux modèles.

**Le stockage local signifie-t-il que tous les traitements restent sur l'appareil?** No. Les instructions, fichiers ou contenus récupérés sélectionnés peuvent être envoyés au modèle/service configuré lorsqu'ils sont utilisés. Les fichiers locaux et l'emplacement de l'exécution du modèle sont des questions distinctes.

**Je peux travailler hors ligne ?** Les fichiers locaux existants et les vues locales disponibles peuvent rester utilisables. Les modèles hébergés, les bases de données en ligne et les téléchargements de paquets manquants nécessitent leurs connexions respectives. Un paramètre distant/local a également besoin de son propre service de fonctionnement.

**L'utilisation est-elle une facture ou un solde d'abonnement?** No. Il rapporte la télémétrie disponible. L'utilisation manquante n'est pas zéro; la facturation/les limites du service restent séparées.

**Est-ce que la restauration d'une archive réexécute le travail ?** No. Il restaure la navigation pour conserver le travail. Un noyau en direct ou une opération échouée peut encore nécessiter un redémarrage/relance explicite.

**Est-ce qu'un test SSH réussi signifie que mon analyse peut fonctionner ?** No. Vérifiez le mode d'exécution sélectionné, les autorisations de programmeur, l'exécution et la demande de ressources, puis exécutez un petit travail et vérifiez sa sortie. Voir [Calcul à distance](remote-compute.md).

Sources: [Sémantique de HTTP](https://www.rfc-editor.org/rfc/rfc9110.html#section-15), [429 et réessayer-après](https://www.rfc-editor.org/rfc/rfc6585.html#section-4), [OpenAI limite de taux par rapport aux erreurs de quota](https://developers.openai.com/api/docs/guides/error-codes), [Politique de ré-essai Connector](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/connectors/request-policy.ts).

Sources: [avis de récupération de la file d'attente](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/components/SessionCatalogRecoveryAlert.tsx), [Traitement par lots PDF](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/literature/LiteraturePdfBatchImportDialog.tsx), [conflit de recouvrement](https://github.com/aipoch/open-science/commit/dbb9560a), [installateur Windows](https://github.com/aipoch/open-science/blob/v0.27.0/build/installer.nsh).

Source: [champs de rapport de bogue](https://github.com/aipoch/open-science/blob/v0.26.0/.github/ISSUE_TEMPLATE/bug_report.yml), [Boîte de dialogue du rapport de démarrage](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/components/startup-issue-dialog.tsx).
