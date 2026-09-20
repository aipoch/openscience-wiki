---
title: "Rétroviseurs de réseau, de proxies et de paquets"
last_update:
  date: '2026-09-20'
---

# Rétroviseurs de réseau, de proxies et de paquets {/* #network-proxies-and-package-mirrors */}

Ouvrir **Settings → Network** lorsqu'un modèle, une demande Notebook ou un téléchargement de paquet ne peut pas atteindre sa destination. Cette page sépare l'état de connexion, les domaines autorisés Notebook, un proxy de processus et des miroirs de paquet. Une vérification de connexion verte ne prouve pas que chaque requête Notebook protégée réussira.

Commencez par l'opération défaillante : une demande de fournisseur, un accès réseau Notebook et un installateur de paquets peuvent utiliser différentes routes. Gardez son nom d'hôte et l'erreur exacte disponible tout en modifiant ces paramètres.

## Lire l'état du réseau d'abord {/* #read-network-status-first */}

L'état combine l'information liée au réseau et une sonde d'enregistrement de paquets. **PRÊT · Les registres d'emballage sont accessibles** indique que la sonde a réussi. **Vérification**, états inaccessibles ou hors ligne indiquent qu'une autre vérification ou réparation de connexion est nécessaire. Utilisez **Check again** lorsque disponible après avoir changé la connexion.

Si Network signale **Ready** mais qu'un outil échoue, élargissez l'erreur de cet outil. La sonde d'état vérifie sa propre destination; utiliser le nom d'hôte et le message de la requête échouée pour diagnostiquer la route affectée.

| Défaut | Inspecter suivant | Éviter cette conclusion erronée |
| --- | --- | --- |
| La connexion du fournisseur échoue | Authentification du fournisseur et vérification de la connexion du modèle | Les paramètres de domaine Notebook fourniront des identifiants de modèle |
| Un nom d'hôte de recherche est refusé | **Configure domains** et le nom exact de l'hôte dans la requête | L'ajout d'un large domaine non lié le corrigera |
| Un hôte de paquet est déjà autorisé mais CONNECT échoue | Résolution du journal d'installation, du proxy et du DNS | Un autre clic Autoriser identique résoudra toutes les défaillances du réseau |
| Défaut de vérification du certificat | Le groupe CA configuré et les exigences de confiance de l'organisation | La désactivation de la vérification du certificat est nécessaire |
| Index de paquets ne retourne aucune distribution correspondante après des erreurs de connexion | Messages réseau antérieurs et Python/platform sélectionnés | Le paquet ne doit pas exister |

## Configurer les domaines Notebook {/* #configure-notebook-domains */}

1. Sélectionnez **Configure domains**.
2. Lisez si la protection réseau Notebook est active sur ce périphérique.
3. Élargir les groupes de services scientifiques pour inspecter leurs noms d'hôtes. Le contrôle des commutateurs de groupe inclut les destinations. Le groupe package-registry/source-code est activé et verrouillé dans cette compilation.
4. Pour une source supplémentaire, saisissez son nom d'hôte exact dans **Domain hostname**, puis sélectionnez **Add**.
5. Revoir la nouvelle ligne d'ébauche. Utilisez **Supprimer &#91;nom d'hôte&#93;** pour le défaire.
6. Sélectionnez **Save changes** pour maintenir la liste prévue.

![La validation du nom d'hôte exact rejette une carte joker](/img/open-science/walkthrough-2026-09-08/54-network-domain-validation.webp)

Saisissez un nom d'hôte tel que `data.example.org`, sans schéma, chemin, port, wildcard ou adresse IP. Pour **Enter a hostname only, without a scheme, path, port, or wildcard.**, supprimez ces pièces et enregistrez le nom d'hôte.

Un domaine autorisé par nom peut encore échouer une autre vérification de connexion. Par exemple, `pypi.org` peut être autorisé mais rejeté comme destination non publique s'il résout à `198.18.*`. Ceci est distinct d'un domaine non approuvé.

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

### Lorsqu'un domaine se résout à une adresse non publique {/* #observed-fake-ip-failure */}

Si l'installation signale `destination resolves to a non-public network address`, inspecter le journal d'installation détaillé même lorsque l'erreur courte indique seulement `conda install failed` ou `pip install failed`.

```text
deny network-outbound pypi.org:443
(destination resolves to a non-public network address)
```

1. Vérifiez le nom d'hôte touché et son adresse résolue. Les adresses telles que `198.18.*` ne sont pas des destinations publiques.
2. Distinguer une décision de liste de domaines à partir de la vérification de destination. `alreadyAllowed` n'établit pas que l'adresse résolue est acceptable.
3. Vérifiez la résolution DNS publique et la route proxy prévue avec le propriétaire du réseau, puis réessayez la petite requête originale. Gardez la protection du domaine activée.
4. Vérifier l'installation et l'importation séparément. Un proxy sauvegardé, un interprète prêt ou une utilisation réussie des paquets existants est insuffisant.

Si la même erreur persiste, conservez le nom d'hôte, l'adresse résolue et le mode proxy avec le journal d'installation et suivez [Dépannage](troubleshooting.md). Une sauvegarde réussie des paramètres n'est pas un téléchargement réussi.


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

Les noms d'hôte miroir Conda, PyPI et CRAN configurés reçoivent un accès temporaire pour l'opération de gestion de paquets. Cela ne les ajoute pas à la liste de domaines Notebook permanente ni ne donne le même accès au code Notebook ordinaire. Les redirections vers d'autres hôtes suivent toujours le flux d'approbation du réseau.

Utilisez une URL miroir HTTP(S) prise en charge sans identifiants intégrés, espace blanc, hôte local ou une adresse IP brute. Un réglage de miroir accepté ne corrige pas un serveur non disponible ou un nom d'hôte résolvant à une adresse réservée. Si l'installation échoue, inspecter cette opération est la destination réelle et l'erreur avant de réessayer. Les paramètres **model** distants ont un [Exigences de HTTPS](providers.md#custom-gateway-every-visible-field) séparé.

## Informations à conserver lorsqu'une demande échoue {/* #information-to-keep-when-a-request-fails */}

Enregistrez la version de l'application, l'opération, l'exécution/environnement, le paquet ou le nom d'hôte, le mode proxy et la première erreur utile. Préservez la sortie de l'installateur d'origine : la dernière ligne de distribution de correspondance de la ligne .. Exclure les jetons et les identifiants de procuration provenant de diagnostics partagés.

Pour un module Python manquant après une connexion réussie, continuer avec [contrôle du temps d'exécution et du paquetage](./runtimes.md). La configuration de l'hôte distant est couverte séparément dans [Calculer](remote-compute.md).

[Source des paramètres du réseau](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/NetworkPanel.tsx), [Limite du réseau Notebook](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/notebook/network-sandbox-owner.ts).

## Recherche d'erreur HTTP {/* #http-error-lookup */}

Pour les réponses 400, 401, 403, 404, 429 ou 5xx, utilisez le [Table de dépannage HTTP](troubleshooting.md#http-errors-400-403-429-and-5xx). Conservez le service répondant et son message détaillé avec le code d'état.

Après avoir modifié les paramètres de domaine proxy, miroir ou Notebook, confirmez que les valeurs ont persisté, puis réessayez l'opération originale dans le même temps d'exécution. Vérifiez à la fois le téléchargement et l'importation du paquet; une sauvegarde réussie des paramètres ne résout pas une erreur d'installation.

## Une cellule R a été bloquée avant exécution {/* #r-network-warning */}

Dans v0.31.1, Notebook affiche un avertissement en ligne lorsque la protection réseau bloque une exécution R. Suivez son lien de réglage et inspectez l'accès demandé. L'avertissement signifie que la cellule n'a pas exécuté; il n'est pas un résultat scientifique ou une course terminée. Après avoir résolu l'exigence spécifique, exécutez à nouveau la cellule et inspectez sa sortie. La prise en charge standard R en mode Windows n'autorise pas elle-même la protection réseau.
