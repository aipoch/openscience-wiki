---
title: "Rétroviseurs de réseau, de proxies et de paquets"
last_update:
  date: '2026-11-19'
---

# Rétroviseurs de réseau, de proxies et de paquets {/* #network-proxies-and-package-mirrors */}

Ouvrir **Settings → Network** lorsqu'un modèle, une demande Notebook ou un téléchargement de paquet ne peut pas atteindre sa destination. Cette page sépare l'état de connexion, les domaines autorisés Notebook, un proxy de processus et des miroirs de paquet. Une vérification de connexion verte ne prouve pas que chaque requête Notebook protégée réussira.

Commencez par l'opération défaillante : une demande de fournisseur, un accès réseau Notebook et un installateur de paquets peuvent utiliser différentes routes. Gardez son nom d'hôte et l'erreur exacte disponible tout en modifiant ces paramètres.

## Lire l'état du réseau d'abord {/* #read-network-status-first */}

L'état combine l'information liée au réseau et une sonde d'enregistrement de paquets. **PRÊT · Les registres d'emballage sont accessibles** indique que la sonde a réussi. **Vérification**, états inaccessibles ou hors ligne indiquent qu'une autre vérification ou réparation de connexion est nécessaire. Utilisez **Check again** lorsque disponible après avoir changé la connexion.

Si Network signale **Ready** mais qu'un outil échoue, élargissez l'erreur de cet outil. La sonde d'état vérifie sa propre destination; utiliser le nom d'hôte et le message de la requête échouée pour diagnostiquer la route affectée.

| Défaut | Inspecter suivant | Évitez cette conclusion erronée |
| --- | --- | --- |
| La connexion du fournisseur échoue | Authentification du fournisseur et vérification de la connexion du modèle | Les paramètres de domaine Notebook fourniront des identifiants de modèle |
| Un nom d'hôte de recherche est refusé | **Manage access** et le nom exact de l'hôte dans la requête | L'ajout d'un large domaine non lié le corrigera |
| Un hôte de paquet est déjà autorisé mais CONNECT échoue | Résolution du journal d'installation, du proxy et du DNS | Un autre clic Autoriser identique résoudra toutes les défaillances du réseau |
| La vérification du certificat échoue | Le groupe CA configuré et les exigences de confiance de l'organisation | La désactivation de la vérification du certificat est nécessaire |
| Index du paquet ne retourne aucune distribution correspondante après les erreurs de connexion | Messages réseau antérieurs et Python/platform sélectionnés | Le paquet ne doit pas exister |

<span id="configure-notebook-domains" />

## Choisissez Réseau Relaxé ou strict {/* #public-network-rules */}

Ouvrez **Settings → Network → Manage access**. Le mode s'applique aux connexions de carnet de notes protégées à travers les projets. Lire **Current: Relaxed** ou **Current: Strict** avant d'éditer les règles.

| Mode | Connexions autorisées | Lorsqu'une destination n'est pas autorisée |
| --- | --- | --- |
| **Relaxed** (par défaut) | Noms d'hôte HTTPS, y compris les noms d'hôte pour les services privés ou loopback; exceptions enregistrées correspondent à leur protocole, hôte/IP et port | Les connexions HTTP et IP directe nécessitent une autorisation |
| **Strict** | Seules les destinations correspondant à la liste blanche manuelle par protocole, nom d'hôte ou IP, et port | Bloqué sans demande d'autorisation; ajouter une règle nécessaire manuellement |

Pour changer de mode, sélectionnez **Strict** ou **Relaxed**, lisez l'explication, puis utilisez **Switch to Strict mode** ou **Switch to Relaxed mode**. Sélectionner une option marquée **Not yet applied** ne change pas le mode actif.

![Explication du mode strict et groupes de listes blanches](/img/open-science/v130/network-strict.webp)

### Ajouter une règle de liste blanche stricte {/* #strict-whitelist */}

1. Dans **Strict whitelist**, sélectionnez **Add rule**.
2. Réglez **Network protocol**, **Hostname, IP or pattern** et **Port** pour le service réel. Utilisez un nom d'hôte ou une IP, pas un chemin d'URL.
3. Choisissez un **Group**, ou **New group…** et un **Group name**, puis choisissez **Confirm**.
4. Inspectez la règle sauvegardée et le mode actif. Réessayer la petite demande prévue et inspecter la réponse.

![Exemple des champs protocole, hôte et port pour une règle Strict](/img/open-science/v130/network-rule.webp)

Un nom d'hôte exact n'inclut pas les sous-domaines. `*.example.org` correspond aux sous-domaines mais pas à `example.org`. Protocole et port font partie de la règle : une règle HTTPS pour le port 443 ne permet pas HTTP ou un autre port. Strict correspond au nom d'hôte demandé; il ne vérifie pas si son résultat DNS est public, privé ou loopback. Ajouter une règle uniquement pour une destination que vous souhaitez contacter.

**Built-in** et **Manual** identifient la provenance des règles. Les groupes intégrés sont ensemencés une fois, de sorte que les modifications ultérieures sont conservées. Ni les approbations mémorisées ni le mode de contournement complet. Enregistrer les règles réseau réinitialise les connexions protégées et peut interrompre les transferts; appliquer des changements après la fin des transferts actifs.

## Enregistrer une exception en mode Relaxé {/* #trusted-private-services */}

Dans le cadre de **Trusted unsafe networks**, choisissez **Add address**, puis spécifiez **Network protocol**, **Hostname** ou IP, **Port** et le groupe approprié. Confirmez et vérifiez la portée enregistrée avant de réessayer. Ces exceptions évitent les autorisations répétées pour la destination correspondante en mode Relaxed; elles n'accordent pas d'accès en mode Strict. La liste blanche Strict est inactive alors que Relaxed est sélectionnée.

La règle permet une connexion, pas une connexion réussie ou une réponse valide. Vérifiez les références de service et le résultat réel séparément. Ces paramètres remplacent les anciens formulaires du domaine public/du service privé; utilisez le mode actuel et les champs de règles lorsque vous suivez une capture d'écran plus ancienne.

## Choisir un mode proxy {/* #choose-a-proxy-mode */}

Sélectionnez **Configure proxy**. Utilisez une adresse proxy fournie par votre propre configuration réseau; le port dans une capture d'écran est spécifique à cet ordinateur.

| Mode | Comportement | Entrée requise |
| --- | --- | --- |
| **System** | Les demandes d'applications suivent le proxy de l'appareil; les processus d'agent héritent de l'environnement mandataire depuis le démarrage de l'application | Pas de champ de serveur explicite |
| **Manual** | Donner de nouvelles requêtes d'applications et traiter un proxy fixe | **Proxy server** URL |
| **Direct** | Connectez-vous sans le proxy configuré/hérité pour les nouveaux processus | Pas de champ serveur |

Le mode manuel accepte les URLs HTTP, HTTPS, SOCKS, SOCKS4 et SOCKS5. Les identifiants intégrés dans l'URL ne sont pas pris en charge. **Bypass rules** est une liste optionnelle d'hôtes séparés par des virgules qui devraient se connecter directement; localhost est toujours contourné.

1. Choisissez **Manual**.
2. Remplissez **Proxy server** avec l'adresse proxy utilisée par votre réseau.
3. Ajouter des règles de contournement uniquement si les destinations concernées doivent se connecter directement.
4. Sélectionnez **Save** et attendez **Proxy settings saved.**
5. Lancez une nouvelle requête/processus et testez l'opération initiale défaillante. Les sessions d'agents existantes, les noyaux et les installateurs peuvent conserver leurs connexions existantes.

Si le mode manuel indique **Saisissez une URL de serveur proxy**, entrez une adresse proxy de travail ou jetez le brouillon avec **Done**. L'enregistrement d'une adresse valide ne confirme pas en soi que le mandataire peut porter la requête défaillante.

### Vérifier un défaut de DNS ou de proxy {/* #observed-fake-ip-failure */}

Gardez l'erreur exacte de la requête défaillante. Un délai d'attente, une erreur de certificat ou un refus de procuration peut encore se produire après qu'une règle autorise la destination. Vérifiez le nom d'hôte, le protocole, le port et la route proxy par rapport au service que vous comptez utiliser. Ne traitez pas l'erreur d'adresse non publique d'une ancienne version comme la règle actuelle d'appariement en mode Strict : Strict vérifie le nom/IP et le port demandés, et non sa classe d'adresse DNS.

Réessayez une petite requête après avoir corrigé la cause. Pour le travail de paquetage, confirmez à la fois l'installation et l'importation; un réglage sauvegardé ou un interprète Ready seul ne prouve pas un téléchargement réussi. Tenir les références hors des journaux partagés et utiliser [Dépannage](troubleshooting.md) pour les échecs persistants.


## Configurer les miroirs de colis et la fiducie de certificat {/* #configure-package-mirrors-and-certificate-trust */}

Sélectionnez **Configure** ou **Edit** sous Rétroviseur du paquet.

| Champ | Entrée et effet |
| --- | --- |
| **Conda channel mirror** | Mirror root utilisé pour les téléchargements de canaux Coda |
| **Python package index (pip)** | Une URL d'index de paquets Python, se terminant généralement dans `/simple` |
| **CA bundle path** | la voie menant à un ensemble complet de fiducies de FEP, y compris les racines publiques et corporatives requises; blanc utilise les autorités de certification publiques |
| **View available mirrors** | Ouvrir la documentation externe du miroir |
| **Save** | Conservez la configuration pour les opérations de paquets suivantes |
| **Cancel** | Éliminer le projet |

![Entrées miroir et groupe CA](/img/open-science/walkthrough-2026-09-08/56-package-mirror.webp)

Un miroir de paquet change la source du paquet. Confirmez le format root/index requis du miroir, enregistrez et réessayez une opération de petit paquet dans l'exécution sélectionnée. Les paramètres proxy de Model-Provider sont séparés.

Les noms d'hôte miroir Conda, PyPI et CRAN configurés reçoivent un accès temporaire pour l'opération de gestion de paquets. Cela ne les ajoute pas à la liste permanente des domaines Notebook ou n'accorde pas le même accès au code ordinaire Notebook. Les réorientations ont besoin d'un accès à leurs destinations réelles. En mode Strict, ajoutez chaque protocole/hôte/port requis à la liste blanche; une subvention temporaire pour l'opération de paquet ne la contourne pas.

Utilisez une URL miroir HTTP(S) prise en charge sans identifiants intégrés, espace blanc, hôte local ou une adresse IP brute. Un réglage de miroir accepté ne corrige pas un serveur non disponible ou un nom d'hôte résolvant à une adresse réservée. Si l'installation échoue, inspecter cette opération est la destination réelle et l'erreur avant de réessayer. Les paramètres **model** distants ont un [Exigences de HTTPS](providers.md#custom-gateway-every-visible-field) séparé.

## Informations à conserver lorsqu'une demande échoue {/* #information-to-keep-when-a-request-fails */}

Enregistrez la version de l'application, l'opération, l'exécution/environnement, le paquet ou le nom d'hôte, le mode proxy et la première erreur utile. Préservez la sortie de l'installateur d'origine : la dernière ligne de distribution de correspondance de la ligne .. Exclure les jetons et les identifiants de procuration provenant de diagnostics partagés.

Pour un module Python manquant après une connexion réussie, continuer avec [contrôle du temps d'exécution et du paquetage](./runtimes.md). La configuration de l'hôte distant est couverte séparément dans [Calculer](remote-compute.md).

[Source des paramètres du réseau](https://github.com/aipoch/open-science/blob/v1.3.0/src/renderer/src/pages/settings/NetworkPanel.tsx), [Limite du réseau de carnets](https://github.com/aipoch/open-science/blob/v1.3.0/src/main/notebook/network-sandbox-owner.ts).

## Recherche d'erreur HTTP {/* #http-error-lookup */}

Pour les réponses 400, 401, 403, 404, 429 ou 5xx, utilisez le [Table de dépannage HTTP](troubleshooting.md#http-errors-400-403-429-and-5xx). Conservez le service répondant et son message détaillé avec le code d'état.

Après avoir modifié les paramètres de domaine proxy, miroir ou Notebook, confirmez que les valeurs ont persisté, puis réessayez l'opération originale dans le même temps d'exécution. Vérifiez à la fois le téléchargement et l'importation du paquet; une sauvegarde réussie des paramètres ne résout pas une erreur d'installation.

## Une cellule R a été bloquée avant exécution {/* #r-network-warning */}

Dans v0.31.1, Notebook affiche un avertissement en ligne lorsque la protection réseau bloque une exécution R. Suivez son lien de réglage et inspectez l'accès demandé. L'avertissement signifie que la cellule n'a pas exécuté; il n'est pas un résultat scientifique ou une course terminée. Après avoir résolu l'exigence spécifique, exécutez à nouveau la cellule et inspectez sa sortie. La prise en charge standard R en mode Windows n'autorise pas elle-même la protection réseau.

## Accès au réseau lorsque le mode d'approbation change {/* #network-mode-changes */}

**Full access** supprime les cartes d'autorisation d'agent manuelles applicables, mais ne contourne pas la liste blanche des carnets Strict. Vérifiez **Settings → Network → Manage access** lorsqu'une demande est refusée. En mode Relax, le protocole et la destination déterminent si une autorisation ou une exception sauvegardée est nécessaire. Les qualifications des fournisseurs et les restrictions de service s'appliquent toujours.

Changer les règles du réseau peut fermer les connexions protégées existantes. Réessayer sous le mode résultant, puis inspecter la réponse réelle. Voir [modes d ' homologation](approval-modes.md) pour les permissions de conversation.
