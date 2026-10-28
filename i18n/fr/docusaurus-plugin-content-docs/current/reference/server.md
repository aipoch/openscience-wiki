---
title: "Service sans tête et accès au navigateur"
last_update:
  date: '2026-10-27'
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

| Commande | Résultat | Options et limites |
| --- | --- | --- |
| `open-science start` | Démarrez le moteur et ouvrez le navigateur | Port par défaut 44100 |
| `open-science start --no-open` | Démarrer sans ouvrir un navigateur | Utilisation pour une session de service local intentionnel |
| `open-science status --json` | État de service lisible par machine d'impression | Un service manquant revient `{"running":false}` et du code de sortie 1 |
| `open-science url` | Imprimer l'URL du navigateur authentifié | Contient une autorité locale d'accès; ne pas coller dans des exemples publiés |
| `open-science stop` | Demande authentifiée de fermeture gracieuse | Ne signale pas aveuglément un PID à partir d'un fichier d'état statique |
| `open-science stop --json` | Signaler le résultat de l'arrêt | Voir le tableau des résultats ci-dessous. |

Parmi ces commandes, **statut et arrêt du soutien `--json`; début et url ne**. La vérification locale `start --json` a renvoyé `invalid_cli_usage` avec le code de sortie 2 avant de commencer quoi que ce soit. Pour un lancement scripté, lancez `start --no-open`, puis `status --json`.

### Résultats de l'arrêt {/* #shutdown-outcomes */}

| JSON `result` | Signification |
| --- | --- |
| `already-stopped` | Aucun dossier de service en direct trouvé |
| `daemon-stopped` | Le moteur Node authentifié est sorti; les clients attachés perdent leur connexion de moteur |
| `web-service-stopped` | Legacy Electron web-service résultat, pas le nouveau moteur autonome Node |

Une demande rejetée ou une date limite d'arrêt manquée renvoie un échec. Lisez l'erreur et inspectez l'état réel de la cible. Ne déclarez pas un service comme étant arrêté simplement parce que la commande est retournée.

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
| Fermer un onglet de navigateur | Le moteur continue de fonctionner |
| Arrête le bureau qui a démarré le moteur | Son propre moteur s'arrête avec lui |
| Quitter un bureau attaché à un moteur CLI existant | Seul ce client se détache; le moteur CLI continue à fonctionner |
| `open-science stop` | Arrêter le moteur sélectionné, affectant tous les clients attachés à celui-ci |

Fermer une fenêtre peut différer de quitter l'application, surtout lorsqu'elle reste dans le plateau. Terminer la recherche active avant d'arrêter un moteur partagé, puis inspecter l'état réel avec `status --json`.

Un bureau déconnecté offre **Reconnecter** et **Quitter l’application**. Reconnecter rafraîchit le moteur en direct original et ne soumet pas de nouveau le travail; Si ce moteur est parti, quittez et rouvrez. Un Quit déconnecté peut fermer seulement le client, donc inspecter l'état du profil sélectionné avant de supposer que le service s'est arrêté. Suivez [récupération de connexion](../guides/troubleshooting.md#connection-recovery), y compris les opérations de vérification des réponses perdues.
### Reconnecter après un arrêt de bureau interrompu {/* #desktop-service-recovery */}

Si le bureau sort de façon inattendue pendant que son moteur de travail survit, la réouverture d'un bureau de même version peut adopter ce service de bureau lancé après l'ancien contrôleur et le démontage s'installe. Un service lancé par CLI reste emprunté; PC de bureau ordinaire Quit ne l'arrête pas simplement parce que le bureau reconnecté.

Si la préparation échoue, la fenêtre reste ouverte. Lire l'avis, préserver le travail non sauvé et attendre que la conversation récupère avant de vérifier l'exécution originale et les fichiers. Une fenêtre ouverte ne signifie pas que la tâche a été annulée. Si le démarrage signale un ancien service autonome le bloquant, vérifiez le profil et la version avant de choisir l'action d'arrêt explicite. Annuler laisse ce service fonctionner; un stop échoué peut être réétudié ou revérifié sans supprimer les fichiers de verrouillage.

## Comportement de mise à jour de l'application {/* #application-update-behavior */}

v1.0.0 supprime la mise à jour de l'application CLI; n'utilisez pas `open-science update --json`. Utilisez les commandes de mise à jour du bureau ou le gestionnaire d'installation/paquet d'origine, en observant [disponibilité de la version actuelle](../guides/installation.md#standalone-cli).

- **Application bureautique :** terminer la recherche active avant de vérifier les mises à jour. Si la mise à jour lors d'une connexion à un service CLI demande de l'arrêter et de passer à la gestion de bureau, vérifier le profil et les tâches affectées avant de consentir. Annuler laisse le service d'origine fonctionner. Ce commutateur ne met pas à niveau les fichiers de programme autonomes d'origine CLI.
- **Installation autonome CLI:** arrête chaque profil en l'utilisant, puis installe un paquet réellement publié par son canal d'origine. N'écrasez pas les fichiers en cours d'exécution ou rouvrez un profil avec un vieux moteur après qu'un bureau plus récent lui ait écrit.
- **Avis d'occupation ou de récupération:** suit les vérifications affichées pour les instances actives et l'état d'installation. Ne supprimez pas les verrous, les enregistrements de configuration ou de récupération pour forcer une mise à jour lorsque l'arrêt est incertain.

Après la mise à jour, confirmez la version et les données originales, puis utilisez `status --json` et `doctor --json` pour vérifier l'état de service et l'état de préparation. Préservez le mode de magasin des titres de compétences. [Compatibilité 1.x](../guides/installation.md#version-compatibility) ne promet pas des versions mixtes bureau/backend.

Voir les [guide officiel des temps d'exécution](https://github.com/aipoch/open-science/blob/v1.0.0/docs/standalone-runtime.md), [CLI](cli.md) et [Tâche SDK](api.md).

## Calculer dans l'espace de travail web {/* #web-compute */}

L'espace de travail web autonome expose **Compute** lorsque son moteur fournit le carnet de notes et les API de calcul nécessaires. Ouvrez l'espace de travail connecté, vérifiez que le panneau est disponible, puis utilisez les étapes de configuration SSH/Slurm existantes. Un panneau disponible ne fournit pas d'identifiants à distance ou ne confirme pas qu'un travail peut fonctionner.

## Paquets et clients d'outils externes {/* #local-research-tools */}

Les sessions Web locales authentifiées peuvent [Packages de recherche sur les importations et les exportations](../guides/research-packages.md#local-package-transfer); les sessions web distantes ne peuvent pas effectuer ces transferts arbitraires. Pour exposer des outils de recherche à un client externe sur la même machine, configurez le [adaptateur MCP stdio](cli.md#external-mcp). Il se connecte à un service local déjà en cours d'exécution et utilise les permissions de ce profil ; il ne crée pas une URL MCP distante.
