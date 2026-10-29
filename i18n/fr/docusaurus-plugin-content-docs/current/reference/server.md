---
title: "Service sans tête et accès au navigateur"
last_update:
  date: '2026-10-29'
---

# Service sans tête et accès au navigateur {/* #headless-service-and-browser-access */}

Le service local fournit un moteur sans tête et une interface de navigateur local hôte. Il est distinct d'un hôte SSH Compute et de l'appariement du navigateur Remote.It. Choisissez les paramètres d'authentification et de stockage des justificatifs pour l'hôte avant de connecter un client.

## Sélection des cibles et découverte {/* #target-selection-and-discovery */}

Depuis v0.37.0, les services partagés fonctionnent dans un processus ordinaire Node et le bureau se connecte en tant que client natif. Le démarrage de CLI n'a plus besoin d'un hôte Electron caché.

| Sélecteur | Périmètre |
| --- | --- |
| `--port PORT` | port local hôte, entier 1–65535; un port explicite occupé provoque une erreur |
| `--config-root PATH` / `--profile PATH` | répertoire de configuration portable CLI; garder le même chemin absolu tout au long |
| `OPEN_SCIENCE_CONFIG_ROOT` | le répertoire de configuration explicite à travers l'environnement; les options de commande ont priorité |
| Découverte automatique | Trouvez l'état de service local et confirmez son profil, son port et sa version |

Les moteurs de bureau sélectionnent un port libre lorsqu'aucun n'est spécifié; Le démarrage de CLI se fait par défaut sur 44100. Utilisez `status --json` plutôt que d'inférer le port depuis une fenêtre ouverte. Un service existant compatible pour la même configuration peut être réutilisé; terminer le travail actif et suivre les instructions de mise à jour lorsque les versions ne correspondent pas. L'ancienne option `--app-path` ne transforme pas un exécutable Electron en un nouveau moteur Node.

Le fichier État est `web-service.json`. L'échec d'authentification n'est pas la permission de supprimer cet enregistrement ou de tuer son PID. Inspectez d'abord le service réel et les diagnostics pour éviter d'affecter un autre processus.

## Initialiser et vérifier la préparation {/* #readiness */}

Utilisez `open-science init` pour préparer le répertoire de configuration par défaut sans démarrer l'application. Pour une configuration isolée, passez le même chemin absolu `--profile` à init, start et commandes suivantes. Les paquets Debian installent le CLI à côté de l'application. Voir [configuration du terminal](cli.md#terminal-setup) pour la préparation et la connexion Codex.

Après un `start --no-open` intentionnel, lancez `open-science doctor --json`. Inspecter globalement `ready`, vérifier les données individuelles et proposer des mesures à prendre; le code de sortie du processus à lui seul n'est pas un verdict de préparation. Gardez le service sur son interface locale existante authentifiée. Démarrer ce service sans tête ne configure pas Remote.It ou ne publie pas un paramètre public.

## Commandes du cycle de vie {/* #lifecycle-commands */}

Depuis v1.0.5, une connexion App ou un démarrage explicite CLI maintient le service en vie. Utilisez le même chemin de profil absolu pour toutes les commandes.

| Commande | Résultat |
| --- | --- |
| `open-science start` | Démarrer ou réutiliser le service, le faire fonctionner explicitement et ouvrir le navigateur |
| `open-science start --no-open --json` | Activer la même exécution persistante sans ouvrir le navigateur ; renvoyer `started` ou `already-running`, informations sur les services et `lifetime` |
| `open-science status --json` | Inspecter le service sélectionné; un service manquant retourne `{"running":false}` et code de sortie 1 |
| `open-science url` | Imprimez son URL du navigateur authentifié; gardez ce secret |
| `open-science stop --json` | Désactiver l’exécution persistante ; arrêter seulement si aucune App n’est connectée |
| `open-science stop --force --json` | Demander un arrêt de service complet, y compris les applications connectées; peut interrompre les tâches actives |

Répété `start` répétés ne cumulent pas les demandes de maintien. **start**, **status** et **stop** appui `--json`; **url** Pas du tout. La sortie de lancement JSON n'expose pas l'URL du navigateur authentifié. Les services plus anciens peuvent signaler une durée de vie inconnue; utiliser des versions correspondantes avant de se fier au nouveau contrat.

### Résultats de l'arrêt

| JSON `result` | Signification |
| --- | --- |
| `already-stopped` | Aucun dossier de service en direct trouvé |
| `keep-alive-revoked` | Exécution persistante désactivée, mais les Apps connectées maintiennent le service |
| `stopped` | La génération de services demandée est sortie et a été libérée |
| `shutdown-requested` | Un service historique a accepté la requête mais la sortie n'est pas confirmée; la commande retourne un code de sortie non nul |

Lire `result` et `lifetime`; un code de sortie réussi ne signifie pas que le service a été arrêté. Plus vieux `daemon-stopped` et `web-service-stopped` les noms de résultats ne sont plus émis. `--force` exige le protocole à vie moderne et échoue explicitement contre un service plus ancien. Inspectez les erreurs et l'état actuel au lieu de supprimer les fichiers d'état ou de tuer un PID enregistré.

## Authentification et accès au navigateur {/* #authentication-and-browser-access */}

Le SDK découvre le service local et lit son jeton d'authentification locale, l'envoyant dans les en-têtes de requête. La sortie de tâche ordinaire human/JSON/JSONL n'affiche pas ce jeton. `url` est l'exception intentionnelle qui produit une entrée de navigateur authentifiée.

Un service local hôte n'est pas automatiquement accessible à partir d'un autre ordinateur. L'accès au navigateur à distance utilise son propre mode d'accès configuré, l'appariement et le cycle de vie du navigateur fiable. SSH Compute envoie plutôt des tâches aux hôtes d'exécution distants configurés.

Utilisez [Accès au navigateur à distance](../guides/remote-access.md) pour l'appariement Remote.It et [Calcul à distance](../guides/remote-compute.md) pour les emplois SSH. Aucun des flux n'est configuré en modifiant l'URL de documentation du service local.

### Stockage des titres de créance sur Linux sans tête {/* #credential-storage-on-headless-linux */}

La valeur par défaut est le stockage protégé par OS. Sur un moteur sans tête Linux sans clé utilisable, choisissez une alternative explicite :

<p className="example-label"><strong>Exemple</strong> Démarrer un service sans tête Linux avec stockage des justificatifs de fichiers</p>

~~~bash
open-science start --credential-store=file --no-open
~~~

| Choix | Comportement |
| --- | --- |
| Option oubliée / --credential-store=os | Nécessite le magasin protégé par OS |
| --credential-store=fichier | Autoriser les secrets de configuration non chiffrés sur Linux headless seulement |
| Lancement de bureau, macOS ou Windows | Le mode fichier n'est pas pris en charge |
| Déjà lancé le moteur | La sélection du mode explicite est rejetée; il ne change pas le mode de ce processus |
| Prochain démarrage | Précisez à nouveau le mode; ce n'est pas une préférence sauvée |

Le mode fichier utilise settings.json et identity.json sous la racine de configuration, avec des écritures atomiques et le mode POSIX 0600. La valeur du fichier:v1: est encodée en base64, **non chiffrés**. Quiconque peut le lire peut récupérer le secret; exclure ces fichiers des dépôts, des images et des rapports de support.

Le choix s'applique aux nouvelles clés de fournisseur gérées par les paramètres, aux jetons d'abonnement gérés par l'application, aux clés GitHub/litérature et aux secrets partagés MCP/OAuth. Calculer les mots de passe/protégées Les données de calcul conservent leur exigence de stockage OS séparé; les magasins de connexion à cadre d'agent externe suivent leurs propres règles. Aucun bac à sable n'est désactivé par cette option.

Les valeurs cryptées existantes ne sont pas automatiquement migrées et nécessitent toujours leur voûte OS d'origine. S'il n'est pas disponible, entrer de nouveau le titre de compétence par le biais de la forme supportée normale. Les références de fichiers nécessitent un mode de fichier explicite à lire et sont incompatibles avec les anciennes versions. Pour retourner un titre de compétence au stockage OS, redémarrez en mode OS et remplacez-le explicitement pendant que le coffre est disponible.

Utiliser un stockage persistant lorsque la configuration doit survivre au remplacement du contenant. L'arrêt conserve la configuration; Le remplacement d'un système de fichiers conteneur jetable peut l'enlever. Voir le [contrat d'entreposage des titres de créance](https://github.com/aipoch/open-science/blob/v0.27.0/packages/open-science/CLI.md).

## Propriété du moteur et fermeture {/* #backend-ownership */}

| Décision | Effet sur le moteur |
| --- | --- |
| Quitter la dernière application connectée sans démarrage explicite CLI | Arrêts de service |
| Lancer CLI `start`, puis quitter toutes les Apps | Le service continue grâce à l’exécution persistante explicite |
| Fermer un onglet de navigateur ou un client SDK | Ne désactive pas l’exécution persistante |
| Exécuter une tâche ordinaire CLI, Web ou SDK | Ne garde pas le service en vie indépendamment après que toutes les Apps ont arrêté |
| Cours `open-science stop` avec une application connectée | Désactiver l’exécution persistante ; continuer pour l’App connectée |
| Cours `open-science stop --force` | Demander l'arrêt du service à l'échelle, ce qui pourrait interrompre le travail |

Si le navigateur ou le travail automatisé doit continuer après avoir quitté le bureau, démarrez explicitement le même profil d'abord. Fermer une fenêtre sur le plateau n'est pas quitter. Terminer la recherche active avant un arrêt complet, puis vérifier `status --json`.

Un bureau déconnecté offre **Reconnect** et **Quit app**. Reconnect ne soumet pas de nouveau le travail. Suivre [récupération de connexion](../guides/troubleshooting.md#connection-recovery), et d'inspecter les opérations dont les réponses ont été perdues avant de réessayer.

### Reconnecter après un arrêt de bureau interrompu {/* #desktop-service-recovery */}

Réouvrir le bureau de la même version et se reconnecter au profil original. Les connexions de l'application et toute prise explicite CLI déterminent si ce service reste en vie; un onglet de navigateur seul ne remplace pas non plus.

Si la préparation échoue, la fenêtre reste ouverte. Préserver le travail non sauvé et inspecter la tâche originale après la récupération. Si le démarrage signale un ancien service de blocage, vérifiez le profil, la version et les clients actifs avant de choisir son action d'arrêt explicite. Annuler laisse le service en marche. Un arrêt échoué peut être revérifié ou revérifié sans supprimer les fichiers de verrouillage.

## Comportement de mise à jour de l'application {/* #application-update-behavior */}

La mise à jour de l'application CLI reste supprimée; ne pas utiliser `open-science update --json`. Utilisation [contrôles de mise à jour de bureau ou le canal d'installation original](../guides/installation.md#manual-update).

Avant de remplacer les fichiers CLI, terminez le travail de tous les profils concernés. Quittez leurs Apps connectées et désactivez l’exécution persistante de chaque profil avec `stop --json`. Confirmer `stopped` ou `already-stopped`; `keep-alive-revoked` signifie qu'une application maintient toujours le service en marche. Utilisation `stop --force` seulement quand vous avez l'intention d'arrêter le travail de tous les clients. N'écrasez pas les fichiers de programme en cours d'exécution.

Une mise à jour de bureau peut demander d'arrêter un service CLI attaché et de passer à la gestion de bureau. Vérifiez le profil et les tâches affectées avant de consentir; l'annulation laisse tourner. Ceci ne met pas à jour les fichiers du programme CLI autonome d'origine. Suivez les avis d'occupation et de récupération sans supprimer les verrous ou la configuration.

Après mise à jour, confirmer la version et les données originales, puis inspecter `status --json` et `doctor --json`. Préservez le mode de magasin des titres. [1.x compatibilité](../guides/installation.md#version-compatibility) ne promet pas des versions mixtes bureau / backend. Voir [guide officiel d'exécution](https://github.com/aipoch/open-science/blob/v1.0.5/docs/standalone-runtime.md), [CLI](cli.md) et [Tâche SDK](api.md).

## Calculer dans l'espace de travail web {/* #web-compute */}

L'espace de travail web autonome expose **Compute** lorsque son moteur fournit le carnet de notes et les API de calcul nécessaires. Ouvrez l'espace de travail connecté, vérifiez que le panneau est disponible, puis utilisez les étapes de configuration SSH/Slurm existantes. Un panneau disponible ne fournit pas d'identifiants à distance ou ne confirme pas qu'un travail peut fonctionner.

## Paquets et clients d'outils externes {/* #local-research-tools */}

Les sessions Web locales authentifiées peuvent [envoyer et télécharger des paquets de recherche](../guides/research-packages.md#local-package-transfer); les sessions Web distantes ne gagnent pas cette capacité de transfert. Pour connecter un client d'outil externe sur la même machine, configurez [adaptateur MCP stdio](cli.md#external-mcp). Il utilise un service local déjà lancé et les permissions de ce profil; il ne crée pas une URL MCP distante.
