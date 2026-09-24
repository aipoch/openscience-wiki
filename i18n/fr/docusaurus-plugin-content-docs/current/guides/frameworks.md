---
title: "Installation et commutation d'agents"
last_update:
  date: '2026-09-24'
---

# Installation et commutation d'agents {/* #installing-and-switching-agents */}

Choisissez un framework Agent pour exécuter les conversations et les outils. Après l’installation, configurez un [fournisseur de modèles](providers.md) compatible. Plusieurs frameworks peuvent rester installés. Le framework actif dans **Settings → Agent** est un réglage global de l’application, commun à tous les projets ; il s’applique aux prochains tours de conversation et workflows.

## Lire la page Agent {/* #read-the-agent-page */}

Ouvrez **Settings → Agent**. La page sépare **Installed** de **Available**. Lisez la version, le chemin et le marqueur **Active** sur la carte installée avant de changer quoi que ce soit.

![Détecté Codex géré par une application](/img/open-science/local-acceptance/agent-codex-active.webp)

| Contrôle/statut | Signification et action |
| --- | --- |
| Carte installée | Sélectionnez une carte inactive admissible pour demander un commutateur. Une installation répertoriée a encore besoin d'un accès au modèle compatible. |
| Actif | Le moteur sélectionné pour l'application. Son action Désinstaller est désactivée. |
| Re-détecter | Rafraîchir la découverte après une installation ou un changement de chemin. Il affiche temporairement la détection; il n'installe pas le logiciel manquant. |
| Non installé | Aucun délai d'exécution utilisable n'a été détecté pour ce cadre. |
| Installer le menu | Choisissez une source proposée pour ce cadre, puis vérifiez l'avancement de l'installation. |
| Installer le journal / réessayer | Lisez l'étape ratée et réessayez après avoir résolu cette cause. |
| Réparation | Apparaît lorsque l'installation gérée doit être réparée; Inspecter l'exécution concernée avant de confirmer. |

La page inspectée offrait Codex, Claude Agent, OpenCode et CodeBuddy. Les sources disponibles et les exigences en matière d'authentification diffèrent; ne supposez pas que chaque cadre offre la même méthode d'installation ou de connexion.

## Installer et vérifier {/* #install-and-verify */}

1. Sélectionnez **Installer &#91;cadre&#93;** et examinez la source offerte. Une installation gérée reste sous stockage contrôlé par l'application; une installation manuelle doit être décelable par l'application.
2. Suivez les progrès et lisez le journal d'installation si une étape échoue. Résoudre les conditions préalables d'environnement/réseau avant de réessayer.
3. Utilisez **Re-detect** après une installation manuelle. Confirmez la version et le chemin attendus plutôt que de compter sur la présence d'une commande dans un autre terminal.
4. Sélectionnez la carte prête. Passez en revue la boîte de dialogue de commutation, puis validez le moteur de recherche prévu.
5. Vérifiez **Settings → Model**, lancez une petite requête et inspectez un résultat réel de réponse/outil.

Pour OpenCode, **Install → App-managed download (recommended)** télécharge un temps d'exécution autonome. La page montrait la résolution, la progression de téléchargement, puis une carte Installée avec sa version et son chemin. Sélectionnez cette carte, validez **Passer à OpenCode ?** et choisissez un modèle compatible. L'exemple de connexion locale a retourné une réponse complète; voir [configuration du fournisseur local](./providers.md#connect-a-local-model-endpoint) pour ses limites API et jetons.

Pour Codex, l'adaptateur natif d'exécution et ACP doit passer la détection comme une paire compatible. L'installation d'un seul composant n'est pas l'équivalent d'un moteur prêt. L'accès à l'abonnement du fournisseur est couvert par [Configuration du fournisseur](./providers.md).

Dans v0.33.0, **Claude Agent** nécessite Claude CLI **2.1.118 ou supérieur**. Si la détection signale une version non prise en charge, mettez à jour l'installation détectée par sa méthode d'installation, puis utilisez **Re-detect** et vérifiez l'état de préparation avant de commencer une session. Mettre à jour un autre CLI sur votre chemin ne répare pas l'installation affichée sur la carte.

## Mettre à jour un programme d'exécution Codex géré par app {/* #update-codex */}

Ouvrez **Settings → Agent** et lisez séparément les versions Codex **Codex CLI** et **ACP**. Si une mise à jour de la paire testée est offerte, terminer ou fermer les sessions en utilisant ce runtime, choisissez l'action de mise à jour et attendez que la détection soit terminée. Confirmez les nouvelles versions et l'état de préparation, puis envoyez une petite demande dans une session.

Une mise à jour gérée par l'application remplace l'exécution de l'application; un CLI externe doit être mis à jour par sa méthode d'installation originale, suivie de **Re-detect**. L'application refuse le remplacement alors qu'un processus Codex lancé par l'application utilise la cible. Cette opération ne met pas à jour Open-Science elle-même ou migre une tâche en vol.

## Commuter sans confondre l'histoire conservée avec l'état en direct {/* #switch-without-confusing-retained-history-with-live-state */}

Terminez ou arrêtez l’opération en cours avant de changer de framework. La modification concerne les prochains tours et workflows de tous les projets. Les tâches déjà lancées conservent leur runtime jusqu’à leur fin ; les conversations inactives se reconnectent lors de leur prochaine utilisation. La conservation de l’historique ne transfère pas un processus en cours et ne garantit pas la conservation des variables de l’interpréteur. Vérifiez les fichiers, Notebook et les autorisations avant de poursuivre les calculs.

Après avoir commuté, vérifiez le modèle sélectionné pour la conversation. Les abonnements Codex supportent [Side Chat](./delegation.md); en attente d'opérations de session ou de récupération peut temporairement empêcher l'ouverture. Suivez le message affiché par l'entrée.

## Réparation et enlèvement {/* #repair-and-removal */}

Utiliser le flux de réparation de l'application pour un temps d'exécution géré cassé; ne supprimez pas ses répertoires lors d'un installateur en cours d'exécution. Si une installation externe est affichée, réparer cette installation et la détecter à nouveau. Pour supprimer un moteur géré, activez d'abord un autre moteur prêt, ouvrez **Uninstall** et lisez la liste des composants de la confirmation. L'enlèvement n'est pas une étape de nettoyage nécessaire simplement pour changer de modèle.


### Désinstaller et réinstaller un runtime géré par l'application {/* #uninstall-and-reinstall-an-app-managed-runtime */}

1. Gardez un autre moteur **Active**. Dans cet exemple, Codex est resté actif alors que OpenCode a été enlevé.
2. Sur la carte OpenCode inactive, choisissez **Uninstall**. La confirmation s'applique à la copie téléchargée et gérée par cette application; une copie installée séparément n'est pas affectée.
3. Confirmez **Uninstall**, puis choisissez **Re-detect**. OpenCode devrait passer à **Available** avec **Not installed**.
4. Choisissez **Install OpenCode → App-managed download (recommended)**. Attendez la carte **Installed**, puis sélectionnez-la et validez **Switch**.
5. Vérifiez **Active**, le chemin d'exécution et la sélection du modèle compatible. Réinstaller le moteur ne configure pas un fournisseur de modèle pour lui.

![Portée de l'application gérée OpenCode désinstaller](/img/open-science/priority-completion/01-opencode-uninstall.webp)

Avant d'enlever un moteur, passer à un autre moteur disponible; le moteur actif ne peut pas être retiré par ce contrôle. Après avoir réinstallé, redétecté et activé, ouvrez ensuite un projet existant et lancez une petite demande pour vérifier la connexion.

![OpenCode installé à nouveau et sélectionné](/img/open-science/priority-completion/03-opencode-reinstalled.webp)

Si les actions d'installation sont désactivées, vérifiez une autre installation/switch en cours et l'erreur préalable indiquée. Si la détection réussit mais que les requêtes échouent, inspectez séparément l'authentification du modèle et la compatibilité framework/API.

Sources: [Panneau d'agent](https://github.com/aipoch/open-science/blob/v0.30.1/src/renderer/src/pages/settings/AgentPanel.tsx), [carte cadre](https://github.com/aipoch/open-science/blob/v0.30.1/src/renderer/src/pages/settings/AgentFrameworkCard.tsx).

Portée et comportement de commutation : [stockage des paramètres](https://github.com/aipoch/open-science/blob/v0.30.1/src/main/settings/repository.ts), [commutation de l'exécution](https://github.com/aipoch/open-science/blob/v0.30.1/src/main/acp/runtime-coordinator.ts).
