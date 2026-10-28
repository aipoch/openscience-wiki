---
title: "Installation et mises à jour"
last_update:
  date: '2026-10-27'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# Installation et mises à jour {/* #installation-and-updates */}

La plupart des utilisateurs doivent installer le paquet de bureau à partir de GitHub Releases. Les contributeurs, ou toute personne testant le nouveau code, peuvent exécuter l'application à partir de source. Le client de bureau Electron se connecte à un moteur Node partagé, qui sert également l'interface du navigateur local authentifié.

<PlatformGuide />

**Les paquets actuels &amp; #160;:** [v1.0.4 Assets](https://github.com/aipoch/open-science/releases/tag/v1.0.4) inclure les installateurs de bureau, les archives CLI autonomes et CLI Linux `.deb`/`.rpm` les colis. Choisissez le type d'installation et l'architecture prévus, puis vérifiez le somme de contrôle de la même version. Le lanceur de bureau reste disponible via **Settings → General → Command line tool → Install command**.

## Choisir une méthode d'installation {/* #choose-an-installation-method */}

### Télécharger un installateur de bureau {/* #install-the-desktop-app */}

1. Ouvrez [Sorties de Open-Science](https://github.com/aipoch/open-science/releases).
2. Téléchargez le paquet qui correspond à votre système d'exploitation et à votre architecture CPU.
3. Lire la licence affichée par l'installateur et terminer l'installation, puis démarrer l'application. Un assistant de configuration en cinq étapes s'ouvre sur la première manche.
4. Si le système d'exploitation bloque une application non signée, téléchargez-la à nouveau depuis le dépôt officiel AIPOCH GitHub et suivez l'invite de sécurité de la plate-forme seulement après avoir vérifié la source.

Choisissez parmi le **Actifs** attaché à la version, et non le code source ZIP généré automatiquement. La disponibilité dépend des actifs publiés de cette publication.

<PlatformContent platform="macos">

| Ordinateur | Identifier l'architecture | Paquet et installation |
| --- | --- | --- |
| macOS, silicone Apple | A propos de ce Mac montre une puce Apple M-series | Choisir `mac-arm64.dmg`; Ouvrez-le, faites glisser l'application vers Applications, puis lancez-le là |
| macOS, Intel | A propos de ce Mac montre un processeur Intel | Choisir `mac-x64.dmg`; installer dans Applications. L'application nécessite macOS 12 ou une version ultérieure |

**Installer avec Homebrew**

Vous pouvez également installer avec Homebrew:

~~~bash
brew install --cask open-science
~~~

Homebrew sélectionne automatiquement Apple Silicon ou Intel. Après l'installation, ouvrir **Settings → General → About** et confirmer la version installée; un gestionnaire de paquets peut résoudre une nouvelle version que la documentation de base. [Tagged instructions d'installation](https://github.com/aipoch/open-science/blob/v0.27.0/README.md).

</PlatformContent>

<PlatformContent platform="windows">

Les installateurs officiels Windows sont signés par code depuis v0.33.2; v0.33.3 étend la signature aux exécutables groupés. Téléchargez à partir de [page de téléchargement officielle](https://aipoch.com/open-science/download) ou [GitHub libère](https://github.com/aipoch/open-science/releases), et suivez les notes de vérification officielles pour vérifier la source du paquet.


| Ordinateur | Identifier l'architecture | Paquet et installation |
| --- | --- | --- |
| Windows | Paramètres → Système → A propos → Type de système | Choisissez la correspondance `win-…-setup.exe`; exécutez l'installateur de l'utilisateur actuel et suivez ses instructions d'emplacement |

1. Ouvrez l'installateur Windows téléchargé et passez à la page installation-implantation.
2. Gardez l'emplacement par défaut ou sélectionnez **Browse…** pour choisir un dossier pour l'application, puis sélectionnez **Install**.
3. Attendez la page d'achèvement. Laissez l'option de lancement sélectionnée et choisissez **Finish** pour ouvrir Open-Science.
4. Suivez [Configuration pour la première fois](onboarding.md) pour vérifier l'environnement et configurer l'emplacement, l'agent et le modèle des données.

</PlatformContent>

<PlatformContent platform="linux">

| Ordinateur | Identifier l'architecture | Paquet et installation |
| --- | --- | --- |
| Ubuntu / Debian | `uname -m`: `x86_64` signifie x64, `aarch64` signifie ARM64 | Choisissez la correspondance `.deb`, l'ouvrir avec l'installateur du paquet système, puis lancer à partir du menu d'application |
| Autres distributions prises en charge par Linux | Vérifier `uname -m` | Choisissez la correspondance `.AppImage`, permettre l'exécution dans les permissions du fichier, puis l'ouvrir; résoudre toute erreur de dépendance signalée par la distribution |

v1.0.4 fournit Linux **x64 et ARM64** les colis. Pour ARM64, sélectionnez `aipoch-open-science-1.0.4-linux-arm64.AppImage` ou `aipoch-open-science_1.0.4_arm64.deb`. Les homologues x64 sont `aipoch-open-science-1.0.4-linux-x86_64.AppImage` et `aipoch-open-science_1.0.4_amd64.deb`. Télécharger à partir des actifs officiels de la publication sélectionnée et correspondre au résultat de `uname -m`.

</PlatformContent>

Le dossier d’installation contient l’application ; **Data location**, dans l’assistant de configuration, contient les fichiers de recherche et les environnements d’exécution. Ces emplacements se règlent séparément. Après l’installation, passez à la [configuration initiale](onboarding.md).

### Utiliser le standalone CLI {/* #standalone-cli */}

Pour une installation terminal/browser, téléchargez une archive CLI autonome correspondante depuis [v1.0.4](https://github.com/aipoch/open-science/releases/tag/v1.0.4). Il regroupe Node, le moteur et l'interface utilisateur Web. Extraire le répertoire complet, puis suivre [Configuration CLI](../reference/cli.md#terminal-setup). Gardez le CLI et le moteur de la même installation ensemble.

#### Accueilrew CLI {/* #homebrew-cli */}

Installer ou gérer le Homebrew CLI avec `brew install aipoch/tap/open-science`, séparément du fût de bureau. Vérifiez la version réellement offerte par Homebrew; la formule peut être en retard sur une version GitHub. L'installation ne démarre pas un service système. Si les lanceurs sont en conflit, inspecter `type -a open-science` et utilisation `"$(brew --prefix aipoch/tap/open-science)/bin/open-science"` pour cette installation.

#### Paquets Linux CLI {/* #linux-cli-packages */}

Pour utiliser le terminal/navigateur Linux, choisissez **open-science-cli**, séparément des **aipoch-open-science** paquet de bureau. Télécharger le paquet correspondant et `CLI-PACKAGE-SHA256SUMS.txt` de [v1.0.4 Assets](https://github.com/aipoch/open-science/releases/tag/v1.0.4), puis vérifier avant l'installation.

| Distribution / architecture | v1.0.4 Actifs CLI |
| --- | --- |
| Debian / Ubuntu, x64 | `open-science-cli_1.0.4_amd64.deb` |
| Debian / Ubuntu, ARM64 | `open-science-cli_1.0.4_arm64.deb` |
| Fedora, x64 | `open-science-cli-1.0.4-1.x86_64.rpm` |
| Fedora, ARM64 | `open-science-cli-1.0.4-1.aarch64.rpm` |

Installez le fichier téléchargé avec le gestionnaire de paquets approprié. Ces exemples utilisent x64; utiliser le nom de fichier ARM64 le cas échéant.

```bash
# Debian / Ubuntu
sudo apt install ./open-science-cli_1.0.4_amd64.deb
# Fedora: use this instead of the apt command
sudo dnf install ./open-science-cli-1.0.4-1.x86_64.rpm
```

Exécutez `open-science-cli start --no-open`, puis `open-science-cli status --json`. Une fois exécuté, utilisez `open-science-cli url` pour ouvrir l'interface Web locale authentifiée; Gardez cette URL privée. Continuer avec [Configuration de CLI](../reference/cli.md#terminal-setup) pour la configuration du modèle et les vérifications `doctor`, en remplaçant `open-science` par `open-science-cli` dans ces commandes.

Le paquet regroupe Node, le moteur et l'interface utilisateur Web. Il n'installe pas Python/R ou crée un service système démarré automatiquement. Les conditions préalables de stockage et de bac à sable de l'OS s'appliquent toujours; Voir [identifiants Linux sans tête](../reference/server.md). Utilisez `open-science-cli` explicitement lorsqu'un lanceur de bureau est également installé.

Avant de mettre à niveau ou de retirer le paquet, terminer le travail et arrêter **chaque profil commencé par ce paquet**. Installez le prochain paquet téléchargé via apt/dnf; il n'y a pas de dépôt AIPOCH apt/dnf configuré par cette installation. La suppression des paquets préserve les données de recherche et les références. Les [guide officiel de l'emballage](https://github.com/aipoch/open-science/blob/v1.0.4/docs/standalone-runtime.md#linux-cli-distribution-packages) décrit les conflits de commande et les exigences de la plate-forme.

### Exécuter à partir de la source {/* #run-from-source */}

Vous avez besoin de Git, Node.js 24, npm, et la plate-forme construit les conditions préalables pour Electron. Installer ou sélectionner un cadre d'agent dans l'application. Pendant l'installation, le dépôt génère le client Prisma, applique les correctifs app et prépare les dépendances natives d'Electron.

Pour une installation source reproductible, choisissez la balise de sortie prévue parmi [Changer de journal](../changelog/v1.0.4.md) avant d'installer des dépendances. Un clone par défaut suit la branche plutôt qu'une libération fixe. Enregistrez la balise sélectionnée, le commit source et les versions d'exécution afin qu'une autre personne puisse reproduire l'environnement.

Remplacer `RELEASE_TAG` ci-dessous par la balise exacte affichée sur la version sélectionnée (y compris sa `v` de tête). Pour suivre le développement en cours, omettre `--branch RELEASE_TAG --depth 1`; que la commande suivra la branche par défaut.

```bash
git clone --branch RELEASE_TAG --depth 1 https://github.com/aipoch/open-science.git
cd open-science
npm install
npm run dev
```

Avant d'emballer une construction de production, lancez :

```bash
npm run build
```

Utilisez le paquet.json de la balise sélectionnée et [guide d'exécution autonome](https://github.com/aipoch/open-science/blob/v1.0.4/docs/standalone-runtime.md) pour ses objectifs de construction et ses dépendances. `npm run dev:web` développe le point d'entrée Node/Web; `npm run dev` prépare également le client de bureau. Utilisez un répertoire de configuration isolé pour séparer les données de test.

## Configuration complète pour la première fois {/* #complete-first-time-setup */}

### Services externes et temps d'exécution {/* #external-services-and-runtimes */}

| Capacité | Requis ? | Objet |
| --- | --- | --- |
| OpenCode, Claude Agent, Codex ou CodeBuddy | Au moins une | Exécute des sessions d'agent conversationnel |
| Modèle d'accès | Requis pour les demandes d'agent | Un abonnement pris en charge ou un fournisseur API; L'accès à l'abonnement ne nécessite pas de clé séparée API |
| Python ou R | Facultatif | Exécute le code de portable; utiliser un environnement système détecté ou un environnement géré par l'application; |
| Accès au réseau | Recommandation | Installe des fournisseurs d'exécution et de connexion, GitHub, des services à distance et des connecteurs MCP |
| Hôte SSH | Facultatif | Exécute les tâches à distance et récupère les résultats à travers le panneau de calcul |

### Données locales {/* #local-data */}

L'assistant de configuration montre l'emplacement des données gérées pour les grands fichiers de recherche tels que les artefacts, les fichiers Notebook et les environnements. Les paramètres de l'application et l'historique des conversations restent dans l'emplacement de configuration. Déplacement de l'emplacement des données de recherche n'est pas une sauvegarde complète de l'application. Gardez-le séparé du dépôt source; Utilisez [Stockage](storage.md) pour le déplacer au lieu de déplacer manuellement les fichiers internes pendant que l'application est en cours d'exécution.

## Confirmer que l'application est prête {/* #installation-is-complete-when */}

L'application s'ouvre, la passe de vérification d'environnement requise, un agent est installé et l'accès au modèle est vérifié. La configuration de Python/R n'est en outre requise que pour le travail qui exécute ces langues. L'ouverture d'un aperçu CSV ou PDF ne valide pas l'exécution Notebook. Suivez [Configuration pour la première fois](./onboarding.md), puis [Configuration du fournisseur et du modèle local](./providers.md).

## Vérifier les mises à jour de l'application {/* #choose-a-reproducible-version-and-update-deliberately */}

Dans **Settings → General → About**, lisez la version installée et utilisez **Check now** pour vérifier la disponibilité des mises à jour. Inspectez la version listée avant de l'installer, et terminez le travail actif d'abord. Une compilation de sources de développement peut rapporter des mises à jour différemment d'une installation emballée. conserver une copie des résultats importants exportés avant une mise à jour; ne pas renommer les répertoires internes de l'application.

À partir de 1.0, `open-science update` est supprimé. Mettre à jour l'application par ses commandes de bureau ou son installation officielle, et mettre à jour une installation CLI par l'intermédiaire du gestionnaire d'installation/paquet qui la possède. Si **Check now** n'offre pas encore de publication, consultez la page de publication officielle; supprimer la configuration ou réinitialiser l'application ne favorisera pas un canal de mise à jour.

<PlatformContent platform="macos">

Si **Installez Open-Science avant la mise à jour** apparaît, l'application est en cours d'exécution à partir d'un emplacement en lecture seule. Choisissez **Installer dans Applications** ou déplacez l'application dans Finder. Après l'installation, utilisez **Redémarrer** ou quittez cette copie et rouvrez celle dans Applications, puis vérifiez à nouveau les mises à jour. **Continuer à utiliser** maintient la copie actuelle ouverte; il ne rend pas cet emplacement à jour. Si l'installation échoue, suivez l'erreur affichée avant de réessayer.

</PlatformContent>

<PlatformContent platform="windows">

La réinstallation conserve les données existantes. Si vous avez délibérément besoin d'un nouveau départ après un problème de données, consultez [Réinitialiser les données locales Windows](troubleshooting.md#windows-data-reset). Cet outil séparé supprime les données; il ne fait pas partie d'une mise à jour ordinaire.

</PlatformContent>

## Dépannage de l'installation et démarrage {/* #first-checks-when-startup-fails */}

| Là où elle échoue | Premiers contrôles |
| --- | --- |
| Installation de bureau ou lancement de l'application | Vérifiez la source du paquet, l'architecture OS et CPU, puis lisez l'invite du système d'exploitation. |
| Installation de la source | Confirmer `node --version` et `npm --version`, et ça `npm install` terminée. Réessayer une installation de dépendance interrompue. |
| configuration initiale | Lisez la vérification de l'environnement échouée et résolvez l'exigence énoncée avant de poursuivre. |
| Première demande d'agent | Confirmer un agent actif/de préparation et exécuter **Test connection** sur la page Modèle. |
| Connexion du fournisseur ou du navigateur local | Inspecter l'erreur de port, de proxy ou de certificat; voir [Dépannage](troubleshooting.md). |

## Nom du produit après v0.31.0 {/* #product-name */}

L'interface actuelle et les nouveaux paquets utilisent toujours **Open-Science**. La mise à niveau préserve les noms et les emplacements d'installation existants, les données de recherche, les références et les paramètres. Un chemin d'installation plus ancien contenant `Open Science` n'est pas en soi une défaillance de mise à niveau; ne pas renommer ou déplacer ses dossiers de données pour correspondre au nouveau nom d'affichage.

## Mettre à niveau vers 1.0 et comprendre la compatibilité {/* #version-compatibility */}

1. Terminer la recherche active et sauvegarder le répertoire de configuration plus tout emplacement de données configuré séparément. Une exportation de `.science` n'est pas une sauvegarde de l'ensemble du profil.
2. Fermez les instances de bureau / backend en utilisant l'installation, puis mettez à niveau via l'installateur officiel. Préservez le profil original, les données et le magasin de titres de compétence OS.
3. Réouvrir et vérifier la version, les projets, les sessions, les fichiers, les modèles et les temps d'exécution avant de continuer. Une rétrograde binaire ne retourne pas les données; les binaires plus anciens ne peuvent pas lire les données enregistrées plus récentes.

1.0 conserve les chemins de mise à jour et d'importation existants; le numéro de version ne nécessite pas de réinitialisation du profil. Les [1.x politique de compatibilité](https://github.com/aipoch/open-science/blob/v1.0.4/docs/compatibility.md) couvre les interfaces documentées CLI/SDK et l'automatisation des tâches, les importations à terme de valide `.science` les paquets et les mises à niveau de profil supportées. Il ne garantit pas des réponses de modèle identiques, la disponibilité de tiers ou la reproduction déterministe de toute une session de recherche, ni le transfert de lettres d'identité protégées par OS. Les corrections de sécurité ciblent la dernière version stable.

## Installez le CLI avec npm {/* #npm-cli */}

Utiliser Node.js **22.13 ou plus tard** pour le paquet CLI/backend publié. Dans un terminal, installer et inspecter la version invoquée :

```bash
npm install --global @aipoch/open-science@1.0.4
open-science version --json
open-science help
```

Ensuite, suivez [configuration du terminal](../reference/cli.md#terminal-setup) pour initialiser un profil, démarrer son moteur et configurer un modèle. L'installation seule ne vous connecte pas ou n'installe pas Python/R. Si un lanceur de bureau ou Homebrew utilise déjà le même nom de commande, inspectez quel exécutable votre shell sélectionne avant de continuer. Arrêtez chaque moteur appartenant à une installation avant de mettre à niveau cette installation; conservez son profil et mettez à jour via son gestionnaire de paquets d'origine.

## Suivre une mise à jour jusqu'à l'installation {/* #update-progress */}

Dans **Settings → General → About**, choisissez **Check now** et examiner la mise en liberté offerte. La boîte de dialogue de mise à jour maintient les progrès de téléchargement, les notes de publication et la préparation de l'installation ensemble. Le téléchargement n'est pas terminé : vérifiez la version installée après la relance.

Si l'application indique que l'installation automatique n'est pas disponible pour ce canal, conservez le paquet téléchargé et utilisez l'installateur officiel après avoir terminé le travail actif. Les canaux d'installation v1.0.4 restreignent toujours le remplacement automatique; une boîte de dialogue de progression Windows améliorée ne supprime pas cette restriction. Ne forcez pas l'application fermée alors que le nettoyage du carnet est en cours.
