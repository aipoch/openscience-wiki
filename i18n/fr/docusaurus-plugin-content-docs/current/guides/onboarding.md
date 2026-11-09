---
title: "Configuration pour la première fois"
last_update:
  date: '2026-11-09'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# Configuration pour la première fois {/* #first-time-setup */}

L'assistant de premier tirage a cinq pages dans cet ordre : Environnement, Emplacement des données, Agent runtime, Model provider et Notebook runtime. `Back` et l'action primaire au bas se déplacent entre les pages. L'action principale demeure indisponible jusqu'à ce que la page actuelle réponde à ses exigences.

<PlatformGuide />

Après la configuration initiale, une ancienne application gérée par Codex peut être mise à jour dans [Paramètres de l’agent](frameworks.md#update-codex). Ceci est séparé du choix d'un fournisseur modèle.

## 1. Environnement {/* #1-environment */}

Démarrez sur **Prepare environment**. L'application vérifie l'hôte avant de vous demander d'installer un agent ou de connecter un modèle. Chaque ligne contient un état et une explication; utiliser l'explication pour déterminer l'exigence qui nécessite une attention particulière.

| Contrôle ou contrôle | Ce que ça veut dire | Que faire |
| --- | --- | --- |
| Compatibilité du système | Vérification du système d'exploitation et de l'architecture | Confirmez que la plateforme détectée correspond à votre ordinateur |
| Autorisation de stockage d'application | Vérifie l'accès écrit au dossier de configuration de l'application | Si elle échoue, résolvez l'accès au chemin affiché et vérifiez à nouveau |
| Stockage sécurisé des identifiants | Vérifier si le coffre-fort du système d'exploitation est disponible | Résoudre la question du coffre avant d'entrer les lettres de créances |
| Réseau d'installation | Vérification des sources de paquets supportées et des rapports d'une source accessible | Lire la source et la latence sélectionnées; les résultats dépendent de votre réseau |
| `Check again` | Répéte les vérifications environnementales | Utilisation après fixation d'une exigence; l'étiquette devient `Checking…` et le bouton est désactivé lors de la vérification |
| `Continue` | Ouvre l'emplacement des données | Disponible après la vérification de l'hôte requise; il est désactivé pendant que les vérifications sont en cours |

Ouvrez l'étape **Environment**, lisez les quatre lignes, sélectionnez **Check again**, et attendez **All required environment checks passed.** puis sélectionnez **Continue**. Cette vérification d'environnement ne nécessite pas de clé API ni d'appel de modèle payant; l'authentification du modèle est configurée plus tard.

Choisissez un emplacement stable avec suffisamment d'espace libre. Le système d'exploitation peut afficher des dialogues de dossiers natifs dans sa propre langue même lorsque l'application utilise l'anglais.

Lisez chaque explication de contrôle à côté de son statut. Lorsqu'un agent est déjà installé, la vérification de l'installation-réseau peut ne pas nécessiter de téléchargement; il ne confirme pas l'accès à tous les services externes.

<PlatformContent platform="macos">

![Vérifications d'environnement effectuées lors de la première configuration de macOS](/img/open-science/macos/setup-environment.webp)

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

Choisissez l'exécution Agent qui exécutera les sessions. Une nouvelle configuration v1.2.0 par défaut pour l'intégration **Open-Science Agent**, donc aucune installation séparée Agent est nécessaire pour ce choix. Il nécessite un fournisseur d'API compatible. Si vous utilisez **Codex subscription**, sélectionner et préparer **Codex** Au lieu de cela, les étapes Codex ci-dessous montrent cette option. Continuez une fois l'exécution prévue prête.

<PlatformContent platform="macos">

![Menu source d'installation Codex](/img/open-science/walkthrough-2026-09-08/05-agent-install-menu.webp)

</PlatformContent>
1. Ouvrez **Installer Codex**.
2. Choisissez la source d'installation gérée par l'application recommandée par le menu. L'alternative utilise une installation npm globale.
3. Attendez que l'installation soit terminée. Évitez de démarrer une autre installation pendant que l'installateur est en cours d'exécution.
4. Confirmez que Codex affiche maintenant sa version et **Active**.
5. Sélectionnez **Continue** pour ouvrir le fournisseur Model.

<PlatformContent platform="macos">

![Codex installé et sélectionné comme l'exécution active](/img/open-science/walkthrough-2026-09-08/06-agent-codex-ready.webp)

</PlatformContent>
Les étiquettes de version identifient l'agent ou l'adaptateur installé, et non le modèle sélectionné. Inspectez les valeurs installées au lieu d'attendre les versions exactes de la capture d'écran.

<PlatformContent platform="windows">

Si un agent compatible est déjà installé, sélectionnez sa carte et validez **Active** avant de continuer. L'écran Windows ci-dessous utilise une installation Codex existante; réinstaller il est inutile juste de passer par l'assistant.

![Un agent Codex existant sélectionné comme Active dans l'assistant de configuration Windows](/img/open-science/windows/setup-agent-active.webp)

</PlatformContent>

| Contrôle ou état | Comportement |
| --- | --- |
| Carte-cadre | Affiche l'état d'installation, la version, le chemin d'exécution et si le framework est actif. |
| **Install…** | Ouvre les sources d'installation supportées par ce framework. |
| État d'avancement de l'installation | l'activité de configuration des rapports; Les commandes d'installation et la détection de nouveau sont indisponibles pendant son fonctionnement. |
| **Re-detect** | Rafraîchit les informations d'exécution installées. L'étiquette devient **Detecting…** jusqu'à la fin des contrôles. Vous pouvez également re-détecter à partir de Paramètres → Agent. |
| **Uninstall** | Indisponible pour l'exécution active. Passez à un autre cadre installé avant de le supprimer. |
| **Back** | Revenir à l'emplacement des données lorsqu'aucune opération de configuration de blocage n'est en cours. |
| **Continue** | Procéder une fois qu'un fonctionnement actif est prêt. |

Voir [Cadres d ' agents](frameworks.md) pour l'installation, la commutation, la réparation et l'enlèvement spécifiques au cadre.

## 4. Fournisseur de modèles {/* #4-model-provider */}

Le formulaire change en fonction de **Provider type**, de l'agent sélectionné et de la méthode d'authentification. Pour un abonnement Codex, **Import existing Codex sign-in** copie une connexion locale existante à Open-Science. Utilisez-le lorsque vous voulez connecter ce compte, puis attendez la vérification de la connexion.

<PlatformContent platform="macos">

![Formulaire d'abonnement français Codex avant authentification](/img/open-science/walkthrough-2026-09-08/07-model-codex-subscription.webp)

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
| Agent | Version installée et état actif. | Inspecter les journaux d'installation et détecter à nouveau. |
| Fournisseur | Connexion vérifiée et modèle principal sélectionné. | Revérifier les champs d'inscription ou les champs spécifiques au fournisseur. |
| Notebook | Prêt et activé lorsque l'exécution de code est nécessaire. | Configurer **Settings → Runtimes** avant de demander une analyse. |
| Première tâche | Réponse de l'agent et sortie sauvegardée inspectable. | Inspectez les permissions et les erreurs d'outil séparément de la connexion modèle. |





## Changer la configuration plus tard {/* #change-the-setup-later */}

Tu n'as pas besoin de relancer le magicien. Modèle, Agent, Runtimes et Carte de stockage aux mêmes choix. Si la racine de données est endommagée ou si le répertoire de configuration de l'application n'est pas enregistrable, Paramètres → Le stockage affiche les actions de réparation.

## Référence des sources {/* #source-reference */}

[À bordWizard.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/OnboardingWizard.tsx), [EnvironnementStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/EnvironmentStep.tsx), [EmplacementStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/LocationStep.tsx).
