---
title: "Installation et mises à jour"
last_update:
  date: '2026-09-20'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# Installation et mises à jour {/* #installation-and-updates */}

La plupart des utilisateurs doivent installer le paquet de bureau à partir de GitHub Releases. Les contributeurs, ou n'importe qui testant le nouveau code, peuvent exécuter l'application à partir de source. Open-Science est une application Electron; son rendeur prend également en charge l'accès local au navigateur protégé par jeton.

<PlatformGuide />

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

</PlatformContent>

Le dossier d’installation contient l’application ; **Data location**, dans l’assistant de configuration, contient les fichiers de recherche et les environnements d’exécution. Ces emplacements se règlent séparément. Après l’installation, passez à la [configuration initiale](onboarding.md).

### Exécuter à partir de la source {/* #run-from-source */}

Vous avez besoin de Git, Node.js 22, npm, et la plate-forme construit les conditions préalables pour Electron. Installer ou sélectionner un cadre d'agent dans l'application. Pendant l'installation, le dépôt génère le client Prisma, applique les correctifs app et prépare les dépendances natives d'Electron.

Pour une installation source reproductible, choisissez la balise de libération prévue à partir de [Changer de journal](../changelog/v0.31.1.md) avant d'installer les dépendances. Un clone par défaut suit la branche plutôt qu'une libération fixe. Enregistrez la balise sélectionnée, le commit source et les versions d'exécution afin qu'une autre personne puisse reproduire l'environnement.

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

`npm run build` vérifie TypeScript, puis construit le rendu Electron, le préchargement et les cibles principales. Si vous n'avez qu'à tester le point d'entrée web ou sans tête, utilisez les arguments sans tête existants du dépôt avec un répertoire de données séparé. Cela permet de garder les données de test hors du magasin par défaut.

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
