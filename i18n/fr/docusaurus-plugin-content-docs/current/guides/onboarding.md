---
title: "Configuration pour la première fois"
last_update:
  date: '2026-11-11'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# Configuration pour la première fois {/* #first-time-setup */}

L'assistant de premier tirage a cinq pages dans cet ordre : Environnement, Emplacement des données, Agent runtime, Model provider et Notebook runtime. `Back` et l'action primaire au bas se déplacent entre les pages. L'action principale demeure indisponible jusqu'à ce que la page actuelle réponde à ses exigences.

<PlatformGuide />

Vous pouvez gérer et mettre à jour un Agent externe dans les [paramètres Agent](frameworks.md). **Open-Science Agent** est intégré à l’application.

## 1. Environnement {/* #1-environment */}

Commencez par **Prepare environment**. L’application vérifie votre ordinateur avant le choix de l’Agent et la connexion au modèle. Lisez l’état et l’explication de chaque contrôle.

| Contrôle ou contrôle | Ce que ça veut dire | Que faire |
| --- | --- | --- |
| Compatibilité du système | Vérification du système d'exploitation et de l'architecture | Confirmez que la plateforme détectée correspond à votre ordinateur |
| Autorisation de stockage d'application | Vérifie l'accès écrit au dossier de configuration de l'application | Si elle échoue, résolvez l'accès au chemin affiché et vérifiez à nouveau |
| Stockage sécurisé des identifiants | Vérifier si le coffre-fort du système d'exploitation est disponible | Résoudre la question du coffre avant d'entrer les lettres de créances |
Le réseau d'installation vérifie si l'Agent sélectionné a besoin d'un téléchargement et, au besoin, vérifie les sources du paquet.
| `Check again` | Répéte les vérifications environnementales | Utilisation après fixation d'une exigence; l'étiquette devient `Checking…` et le bouton est désactivé lors de la vérification |
| `Continue` | Ouvre l'emplacement des données | Disponible après la vérification de l'hôte requise; il est désactivé pendant que les vérifications sont en cours |

Ouvrez l'étape **Environment**, lisez les quatre lignes, sélectionnez **Check again**, et attendez **All required environment checks passed.** puis sélectionnez **Continue**. Cette vérification d'environnement ne nécessite pas de clé API ni d'appel de modèle payant; l'authentification du modèle est configurée plus tard.

Choisissez un emplacement stable avec suffisamment d'espace libre. Le système d'exploitation peut afficher des dialogues de dossiers natifs dans sa propre langue même lorsque l'application utilise l'anglais.

Lisez chaque explication de contrôle à côté de son statut. Lorsqu'un agent est déjà installé, la vérification de l'installation-réseau peut ne pas nécessiter de téléchargement; il ne confirme pas l'accès à tous les services externes.

<PlatformContent platform="macos">

![Vérifications d'environnement effectuées lors de la première configuration de macOS](/img/open-science/v121/onboarding-environment.webp)

</PlatformContent>

<PlatformContent platform="windows">

![Vérifications d'environnement lors de la première configuration de Windows](/img/open-science/windows/setup-environment.webp)

</PlatformContent>

<PlatformContent platform="linux">

![Les quatre contrôles d'environnement passés lors de la première configuration de Linux](/img/open-science/linux/setup-environment.webp)

</PlatformContent>

## 2. Emplacement des données {/* #2-data-location */}

<PlatformContent platform="macos">

![Emplacement des données avant de choisir un dossier](/img/open-science/walkthrough-2026-09-08/02-data-location.webp)

</PlatformContent>
Choisissez l'emplacement pour les grands fichiers avant d'installer les runtimes. Les artéfacts, les cahiers et les environnements utilisent l'emplacement des données; les paramètres et l'historique restent dans l'emplacement de configuration. Le chemin affiché est un résumé en lecture seule, et non un champ texte.

| Contrôle | Action et résultats |
| --- | --- |
| `Location` / chemin de localisation des données | Affiche la valeur par défaut ou votre dossier de données proposé |
| `Browse…` | Ouvre le sélecteur de répertoire système. Choisir un dossier parent; inspecter le chemin final géré par l'application après le retour |
| sélecteur de système `Cancel` | Ferme le sélecteur sans remplacer le choix actuel |
| `Use default location instead` | Apparaît après un choix personnalisé; clarifie ce choix et ses erreurs connexes |
| `Back` | Retour à Environnement |
| `Continue` avec l'emplacement par défaut | Avances à Agent runtime |
| `Continue` après avoir choisi un emplacement personnalisé | Ouvre `Restart to set up your data?`; n'active pas silencieusement le nouveau dossier |
| `Retry` | Apparaît si les informations de localisation par défaut ne pouvaient pas être chargées; essaie de relire |

<PlatformContent platform="macos">

![Parent personnalisé sélectionné et chemin final géré par l'application affiché](/img/open-science/local-acceptance/data-location-selected.webp)

</PlatformContent>
Sélectionnez **Browse…**, choisissez un dossier parent vide sur un disque avec suffisamment d'espace et inspectez le chemin géré complet montré par l'assistant. Sélectionnez **Continue** et lisez la confirmation de redémarrage. Utilisez un emplacement stable de données de recherche plutôt qu'un dossier temporaire.

<PlatformContent platform="macos">

![Redémarrer la confirmation pour l'emplacement des données sélectionnées](/img/open-science/local-acceptance/data-location-confirm.webp)

</PlatformContent>
| Contrôle de confirmation | Résultat |
| --- | --- |
| Fermer (`×`) | Retourne à l'emplacement des données et conserve le chemin proposé |
| `Keep default` | Efface l'emplacement proposé et les avances en utilisant la valeur par défaut |
| `Restart` | Active l'emplacement des données sélectionnées et relance l'application; l'assistant reprend à Agent runtime |

L'application inspecte le dossier avant de l'accepter. Un dossier de données reconnu existant peut être adopté en place; la page explique que rien n'est déplacé. Une sélection inutilisable affiche une erreur. Si l'activation ou la relance échoue, la page peut afficher une erreur et offrir une réessayer ou l'emplacement par défaut. Ne pas déplacer ou renommer manuellement le dossier géré par l'application.

### Adopter un dossier de données existant {/* #adopt-an-existing-data-folder */}

1. Choisissez **Browse…** et sélectionnez le parent contenant un dossier de données reconnu géré par l'application.
2. Confirmez **This folder already contains Open Science data — it will be used as-is (nothing is moved).** Vérifiez la destination complète, puis choisissez **Continue → Restart**.
3. Après la relance, l'assistant reprend à **Agent runtime**. L'emplacement des données sélectionnées est conservé; poursuivre les étapes de configuration restantes.

Après adoption, rouvrir les fichiers représentatifs pour confirmer la présence des données attendues. L'adoption modifie le stockage de fichiers volumineux; il n'importe pas d'autres paramètres d'installation, de base de données de conversation ou d'identifiants. **Keep default** quitte l'emplacement proposé et continue avec l'emplacement effectif précédent.

### Récupérer lorsque l'emplacement ne peut pas être sauvegardé {/* #recover-when-the-location-cannot-be-saved */}

Si la page rapporte **Impossible de terminer la configuration du stockage : EACCES : permission refusée**, inspectez le chemin dans l'erreur. Le répertoire de configuration doit également être enregistrable; choisir une destination de données en écriture seule peut ne pas la résoudre. Restaurer l'accès à l'emplacement de configuration de l'application touchée, puis réessayer l'opération ou sélectionner **Use default location instead → Continue**.

<PlatformContent platform="macos">

![Commandes réelles d'échec et de récupération de configuration-écriture](/img/open-science/local-todo-batch/56-onboarding-config-write-error.webp)

</PlatformContent>
Si le redémarrage échoue avant que l'emplacement ne change, restaurer l'accès à l'écriture de configuration et rouvrir l'assistant. Vérifiez le chemin actif et les fichiers existants avant de réessayer un mouvement; Voir [Stockage](storage.md).

## 3. Environnement d'exécution de l'agent {/* #3-agent-runtime */}

Une nouvelle configuration utilise par défaut **Open-Science Agent**, intégré à l’application. Il prend en charge les fournisseurs API compatibles et **Codex subscription**. Aucun autre Agent n’est nécessaire pour terminer cette étape.

1. Dans **Installed**, repérez **Open-Science Agent** et vérifiez que sa carte indique **Active**.
2. Attendez **All required environment checks passed.** En cas d’échec, résolvez le problème indiqué sur la page, puis sélectionnez **Re-detect**.
3. Sélectionnez **Continue** pour ouvrir **Model provider**. Connectez et testez le modèle à cette étape avant d’envoyer des requêtes.

<PlatformContent platform="macos">

![Open-Science Agent intégré et actif ; Continue disponible et cinq environnements externes non installés](/img/open-science/v121/onboarding-builtin-agent.webp)

</PlatformContent>

Le numéro de version correspond à l’environnement d’exécution ou à l’adaptateur, pas au modèle. **Active** indique l’environnement sélectionné, sans confirmer la connexion au modèle. Choisir **Codex subscription** à l’étape suivante ne nécessite pas d’installer l’environnement **Codex** séparé.

<details>
<summary>Choisir un Agent externe (facultatif)</summary>

Si vous avez besoin des fournisseurs ou du fonctionnement de **Codex**, **Claude Agent**, **OpenCode**, **CodeBuddy** ou **Pi**, choisissez l’environnement correspondant. Pour une installation existante, sélectionnez **Re-detect**, puis sa carte. Sinon, ouvrez **Install**, choisissez une source prise en charge et attendez la fin de l’installation. Vérifiez l’état **Active** et la réussite des contrôles requis avant de continuer.

Consultez les [frameworks Agent](frameworks.md) pour les sources d’installation, le changement d’environnement et la réparation. Vous pouvez également changer l’environnement après la configuration dans **Settings → Agent**.

</details>

## 4. Fournisseur de modèles {/* #4-model-provider */}

Le formulaire dépend de **Provider type**, de l’Agent choisi et du mode d’authentification. Pour utiliser un abonnement Codex avec l’Agent intégré, choisissez **Codex subscription**. Si cet ordinateur dispose déjà d’une connexion Codex, sélectionnez **Import existing Codex sign-in** dans **Codex authentication**, puis **Test & continue**. Sinon, choisissez un mode de connexion pris en charge et suivez les instructions ; consultez la [configuration des fournisseurs](providers.md#builtin-codex-subscription). Continuez après la réussite du test de connexion.

<PlatformContent platform="macos">

![Formulaire d'abonnement français Codex avant authentification](/img/open-science/v121/onboarding-codex-provider.webp)

</PlatformContent>
Pour un fournisseur de API, sélectionnez son type, entrez les détails du paramètre et du modèle requis par ce fournisseur, et utilisez **Test & continue**. L'assistant valide les champs requis avant d'envoyer un test. Un test réussi avance l'assistant; une erreur de validation ou de connexion reste visible pour correction.

<PlatformContent platform="macos">

![Portail personnalisé montrant les erreurs de champ requis](/img/open-science/walkthrough-2026-09-08/08-model-required-fields.webp)

</PlatformContent>
Voir [Configuration du fournisseur](providers.md) pour les choix d'authentification, les champs avancés et la récupération à partir d'erreurs de connexion.

Gardez les touches API dans le champ d'identification dédié. Ne les incluez pas dans les captures d'écran, les instructions du projet ou les messages de conversation.

## 5. Environnement d'exécution Notebook {/* #5-notebook-runtime */}

Cette page finale optionnelle réutilise l'interface complète de **Settings → Runtimes**. Par défaut, les ordinateurs portables utilisent Python géré par app. Vous pouvez sélectionner un interprète détecté ou préparer un autre environnement plus tard.

| Contrôle ou état de l'assistant | Comportement |
| --- | --- |
| **Back** | Retourner à Modèle fournisseur. Désactivé lors de la mise à disposition de l'exécution ou lors de la mise en place. |
| **Finish** | Enregistrer l'achèvement à bord. La configuration de Notebook est optionnelle, de sorte qu'un interprète personnalisé prêt n'est pas nécessaire. |
| Mise en place en cours | Attendez qu'il finisse ou annule l'installation avant de partir; **Back** et **Finish** sont désactivés pour éviter de quitter un environnement partiel. |
| Erreur d'achèvement | Affiche l'échec et permet une autre tentative. |

Après **Finish**, confirmez Home s'ouvre, puis utilisez [Premier projet](first-project.md) pour enregistrer un petit résultat. Rouvrir l'application et vérifier que le projet reste disponible. Si l'installation réapparaît, inspectez l'emplacement des données et l'erreur de configuration-écriture avant de créer un autre profil.

<PlatformContent platform="windows">

La page Windows **Notebook runtime** peut également afficher **Local Shell · WSL2 Bash Preview**. Lire **Optional — nothing here is required to finish setup.** Vous pouvez choisir **Finish** alors que la configuration de Python/R est différée et que WSL2 n'est pas disponible. Préparer l'exécution requise avant de demander l'exécution du code; compléter l'assistant n'installe pas ces environnements optionnels.

![Paramètres Windows optionnels Notebook et WSL2 avec Finition disponible](/img/open-science/windows/setup-optional-runtimes.webp)

</PlatformContent>

## Liste de contrôle de configuration finale {/* #final-setup-checklist */}

| Vérifier | Preuves attendues | Si elle échoue |
| --- | --- | --- |
| Environnement | Vérifications requises. | Revérifier après avoir résolu l'exigence affichée. |
| Emplacement des données | Le dernier chemin géré est l'emplacement prévu. | Retour à la page de localisation; ne pas déduire le chemin final de la seule personne qui ramasse. |
Agent de sélection est prêt et **Active**; l'Agent intégré n'a pas besoin d'installation séparée. **Re-detect** après l'avoir résolu.
| Agent | L’environnement choisi est prêt et **Active** ; l’Agent intégré ne nécessite pas d’installation séparée. | Résolvez le problème indiqué, puis sélectionnez **Re-detect**. |
| Notebook | Prêt et activé lorsque l'exécution de code est nécessaire. | Configurer **Settings → Runtimes** avant de demander une analyse. |
| Première tâche | Réponse de l'agent et sortie sauvegardée inspectable. | Inspectez les permissions et les erreurs d'outil séparément de la connexion modèle. |





## Changer la configuration plus tard {/* #change-the-setup-later */}

Tu n'as pas besoin de relancer le magicien. Modèle, Agent, Runtimes et Carte de stockage aux mêmes choix. Si la racine de données est endommagée ou si le répertoire de configuration de l'application n'est pas enregistrable, Paramètres → Le stockage affiche les actions de réparation.

## Référence des sources {/* #source-reference */}

[À bordWizard.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/OnboardingWizard.tsx), [EnvironnementStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/EnvironmentStep.tsx), [EmplacementStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/LocationStep.tsx).
