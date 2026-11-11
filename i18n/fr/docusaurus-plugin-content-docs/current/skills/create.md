---
title: "Créer un Skill et ses fichiers support"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Créer un Skill et ses fichiers support {/* #create-a-skill-and-its-supporting-files */}

Tournez une vérification RNA-seq répétée en une méthode réutilisable à l'aide de la [l'exemple public de la contribution](../reference/example-data.md). Cette méthode vérifie les comptes bruts; il n'effectue pas de tests d'expression différentielle.

Les exemples utilisent deux noms de paquets indépendants:

| Voie de création | ID enregistré Skill | Réutiliser avec |
| --- | --- | --- |
| **Save as skill** d'une conversation terminée | `rnaseq-descriptive-qc` | Sélectionnez ce qui a publié Personal Skill dans une nouvelle conversation |
| Paquet manuel ci-dessous | `rnaseq-count-qc` | Sélectionnez le Skill créé manuellement avec cet ID exact |

Suivez l'un ou l'autre itinéraire en publiant, en cherchant et en réutilisant. Utilisez le nom que vous avez réellement enregistré; les deux ID ne sont pas des alias. Si vous renommez un paquet, utilisez sa nouvelle identité sauvegardée dans la prochaine requête.

## Choisissez un itinéraire de création {/* #choose-a-creation-route */}

| Point de départ | Utiliser cette entrée | Que se passe-t-il? |
| --- | --- | --- |
| Une conversation complète contient une procédure à répéter | Conversation **+ → Save as skill** | L'agent distille la branche active et utilise Customize / Skill Creator pour préparer un paquet réutilisable. |
| Vous voulez décrire une nouvelle méthode en conversation | Paramètres **Add skill → Chat with agent**ou **Customize** | Travailler avec l'agent pour rédiger la méthode et l'inspecter avant sa publication. |
| Vous avez déjà des instructions et des fichiers supportant | Paramètres **Add skill → Write from scratch** | Entrez le paquet directement en utilisant l'éditeur ci-dessous. |
| Vous avez déjà un paquet ou un dépôt | **Télécharger des compétences / Importer à partir de GitHub / Importer des compétences installées** | Inspecter et importer les ressources existantes; voir [Gérer Skills](./manage.md). |

## Enregistrer comme compétence : transformer une conversation terminée en méthode {/* #save-as-skill-turn-a-completed-conversation-into-a-method */}

Utilisez ceci après qu'une procédure répétable a effectivement fonctionné – par exemple, vérifier une matrice de nombre RNA-seq brute, préserver ses identifiants, calculer des mesures d'échantillon et rouvrir les sorties. **Save as skill** utilise le **branche conversation active**, y compris son objectif, ses outils, ses étapes et ses corrections utilisateur. Il demande à l'agent d'extraire la procédure réutilisable, et non de copier la transcription. Si la branche n'a pas de procédure réglée qui mérite d'être réutilisée, l'agent peut l'expliquer et s'arrêter sans créer de Skill.

1. Ouvrez la conversation pertinente et sélectionnez la branche contenant la procédure que vous souhaitez conserver.
2. Terminer la réponse actuelle et tout travail sous-agent. Résoudre les approbations en suspens, les virages interrompus ou les erreurs de session. La branche doit terminer par une réponse de l'agent.
3. Ouvrez le **+ menu → Save as skill** du compositeur. Passez sur un élément désactivé pour lire sa raison spécifique.
4. L'élément change en **Saving as skill…** pendant que l'agent fonctionne. Cela commence une opération assistée par modèle dans la conversation; il n'ouvre pas l'éditeur manuel Nom/Description ou sauvegarde instantanément un ZIP.
5. Inspecter le nom de Skill proposé, déclencher la description, les étapes, les fichiers à l'appui et le résultat de validation. Répondre à des éclaircissements ou à des approbations de fonctionnement s'il est indiqué. **Customize** reste activé; le rôle actif doit toujours avoir l'accès approprié aux capacités.
6. Examiner le projet avant d'accepter sa publication. Supprimer les chemins spécifiques à l'étude, les ID temporaires, les références et les conclusions non étayées; conserver les exigences en matière d'entrée réutilisables et les vérifications. Un Skill personnel existant ne doit pas être écrasé sans une décision de remplacement explicite.
7. Après publication, ouvrez **Resource center → Skills**, recherchez le nom signalé et inspectez **Files**, la disponibilité de SKILL.md et Main Agent enregistrée. Exportez-le si vous avez besoin de vérifier le paquet complet.
8. Exécutez une requête séparée limitée avec le Skill enregistré. Un paquet sauvegardé avec succès n'est pas la preuve qu'un deuxième jeu de données ou une invocation ultérieure est passé.

### Sauvegarder la méthode de recherche {/* #save-the-research-method */}

<p className="example-label"><strong>Exemple pratique</strong> Enregistrer une méthode RNA-seq en tant que Skill</p>

Après avoir terminé GSE60450 QC dans une nouvelle session, sélectionnez **+ → Save as skill** et demandez un paquet **naseq-descriptive-qc** séparé, en conservant les paquets existants. Le workflow natif a créé un brouillon contenant un **SKILL.md**. La validation n'a renvoyé aucune erreur ou avertissement.

![Native Skill ébauche et résultat de validation](/img/open-science/v0.27.0/16-native-skill-draft-validated.webp)

Vérifiez le nom, la description de déclenchement, les entrées, les définitions métriques et les conditions d'arrêt avant de confirmer la publication à Personal Skills. Ensuite, utilisez **Resource center → Skills → Search skills**, ouvrez les instructions sauvegardées et inspectez **Availability** et **Files**. Télécharger la version réelle de <ExampleDownload path="/examples/capabilities/rnaseq-descriptive-qc/SKILL.md">COUVERTURE</ExampleDownload>.

![Publication autochtone trouvée dans Personal](/img/open-science/v0.27.0/17-native-skill-published.webp)

![Directives et disponibilités rouvertes](/img/open-science/v0.27.0/18-native-skill-instructions.webp)

### Pourquoi le bouton n'est pas disponible {/* #why-the-button-is-unavailable */}

L'infobulle identifie la première condition de blocage. La fixer peut révéler une seconde condition. **Attendez que l'activité de l'agent actuel soit terminée.** peut apparaître lorsque la session n'est pas inactive, y compris un état d'erreur; Ce n'est pas une promesse fiable que l'attente seule résoudra le problème. Inspecter toute bannière d'erreur et l'interaction en attente dans la conversation. Pour une réponse interrompue, résoudre ou reprendre cette réponse à l'aide de l'action proposée de l'application, puis attendre l'achèvement avant de sauvegarder la méthode.

| Une infobulle exacte | Quoi vérifier |
| --- | --- |
| Ouvrez une conversation avant de l'enregistrer en tant que Skill. | Ouvrez une conversation existante avec la procédure dont vous avez besoin. |
| La Personnaliser Skill n'est pas disponible pour la Specialist active. | Inspecter le rôle actif et l'accès à ses capacités. Personnaliser les séjours dans le monde entier; cette infobulle concerne le Specialist actuel. |
| Attendez que l'historique de la conversation finisse le chargement. | Laissez la branche sélectionnée terminer le chargement. |
| Fermer Clavardage latéral avant d'enregistrer cette conversation en tant que Skill. | Préservez d'abord des conseils utiles. Confirmation [Fermer le chat secondaire](../guides/delegation.md) l'arrête et supprime sa conversation enregistrée; puis retourner à Main. |
| Attendez que tous les sous-agents aient terminé. | Inspecter les tâches d'enfants exceptionnelles et leurs approbations. |
| Sauvez comme l'habileté est en cours d'exécution. | Lire l'exécution de création existante; ne commence pas un autre. |
| Résolvez d’abord l’opération de session en cours. | Terminer la récupération, en attente de rejouage/reset contextuel, boucle de correction ou compactage. |
| Attendez que l'activité de l'agent actuel soit terminée. | Résoudre le travail actif, une interaction en cours ou une séance de non-recours ou d'erreur; Inspecter l'état actuel. |
| Résoudre d'abord l'erreur de synchronisation de la branche conversation. | Résoudre l'erreur de synchronisation affichée avant de réessayer. |
| L'historique des branches de conversation n'est pas disponible. | Rouvrir la succursale disponible prévue; préserver l'erreur si son historique ne peut pas charger. |
| Attendez une réponse de l'agent. | La branche doit se terminer par une réponse complète; une branche vide ou un message utilisateur final est insuffisant. |

La récupération et les opérations de session en attente peuvent encore bloquer l'action; utiliser la raison affichée au lieu de lancer à plusieurs reprises une nouvelle requête de création. Ils sont séparés de l'authentification de service : si la création démarre mais que la requête du modèle échoue, suivez l'erreur de modèle/service retournée dans [Dépannage](../guides/troubleshooting.md).

## Écrire à partir de zéro : créer dans l'éditeur {/* #write-from-scratch-create-in-the-editor */}

Utilisez **Write from scratch** lorsque vous avez déjà des instructions de méthode et des fichiers de support. Les étapes ci-dessous utilisent `rnaseq-count-qc`.

### Préparer le paquet {/* #prepare-the-package */}

<p className="example-label"><strong>Exemple</strong> Créer le paquet rnaseq-count-qc</p>

Télécharger les <ExampleDownload path="/examples/capabilities/rnaseq-count-qc/SKILL.md">COUVERTURE</ExampleDownload> et <ExampleDownload path="/examples/capabilities/rnaseq-count-qc/references/sample-metric-schema.md">échantillon-métrique-schéma.md</ExampleDownload> ou <ExampleDownload path="/examples/capabilities/rnaseq-count-qc.zip">ZIP exporté</ExampleDownload>.

```text
rnaseq-count-qc/
  SKILL.md
  references/
    sample-metric-schema.md
```

La référence définit les mesures de l'échantillon et leur interprétation. Conserver les données d'étude dans le projet; utiliser le Skill pour des règles réutilisables plutôt que d'intégrer un jeu de données privé dans un paquet portable.

<span id="create-and-publish" />

### Compléter les champs et publier {/* #complete-the-fields-and-publish */}

1. Ouvrez **Resource center → Skills → Add skill → Write from scratch**.
2. Coller le fichier complet SKILL.md dans **Skill body**. Sa matière première YAML peuple **Name** et **Description**.
3. Confirmez que le nom est `rnaseq-count-qc`. Lire le contenu rendu/corps avant d'enregistrer; un nom valide à lui seul ne valide pas la méthode scientifique.
4. Ouvrez **Advanced settings → Add reference files** et sélectionnez `sample-metric-schema.md`. L'éditeur place cette ressource sous `references/`.
5. Vérifiez le nombre de références et la taille du paquet, puis sélectionnez **Publish**.
6. Faites une recherche dans la nouvelle ligne personnelle et rouvrez-la. Confirmer les instructions, la disponibilité et les fichiers; exporter le colis pour inspecter les deux entrées.

![Corps RNA-seq Skill et fichier support](/img/open-science/capabilities-walkthrough/01-skill-create.webp)

| Champ ou bouton | Que saisir ou vérifier |
| --- | --- |
| Nom | Un identifiant de méthode reconnaissable. Affichages d'entrées brutes **Name is required.** |
| Descriptif | Dites quand la méthode doit être sélectionnée, pas seulement à quel champ elle appartient. |
| Écrire / Télécharger | Saisissez le texte directement ou sélectionnez un fichier comme source du corps. |
| Corps de compétences | Instructions opérationnelles complètes : entrées, vérifications, sorties et conditions d'arrêt. |
| Paramètres avancés | Ouvre les contrôles du fichier support et l'utilisation du paquet. |
| Ajouter des fichiers de référence | Ajoute des schémas, exemples ou scripts réutilisables; s'assurer que les chemins utilisés dans le corps correspondent au paquet enregistré. |
| Suppression du fichier de référence | Supprime cette ressource provisoire; vérifier les références cassées dans le corps après. |
| Annuler / Revenir aux compétences | Quittant l'éditeur; utiliser Annuler pour jeter un brouillon. |
| Publier / sauver... | Crée le paquet personnel; attendre l'achèvement et vérifier la ligne enregistrée. |

L'éditeur permet jusqu'à **Fichiers de référence 16,383** dans le budget du paquet **128 MB**. Les importations doivent également passer la validation des archives; Voir [Gérer Skills](./manage.md).

## Écrire les instructions qui peuvent être vérifiées {/* #write-instructions-that-can-be-checked */}

L'exemple exige de l'agent qu'il conserve les identifiants complets du gène/échantillon, sépare `EntrezGeneID` et `Length` des nombres, rejette les lignes malformées et les valeurs manquantes, et compare avant/après les hachages. Il spécifie quatre exemples de mesures et des fichiers de sortie séparés. Ces exigences rendent visible un résultat incorrect ou incomplet.

Inclure une condition d'arrêt claire : si la source ne peut pas être lue ou si un nombre est manquant, signaler ce problème d'entrée. Une méthode réutilisable ne devrait pas modifier silencieusement l'ensemble de données ou remplacer l'analyse demandée.

<span id="validate-the-saved-skill" />

## Vérifier et réutiliser le Skill {/* #verify-and-reuse-the-skill */}

Pour la route manuelle `rnaseq-count-qc`, utilisez l'invite dans [Skills](./overview.md). Ouvrez le rapport généré et l'enregistrement Notebook, puis vérifiez l'entrée, les dimensions, les définitions métriques et la sortie par rapport à [Exemple de données](../reference/example-data.md).

Pour une édition ultérieure, ouvrez le **Actions → Edit** du paquet personnel, modifiez la méthode, enregistrez, puis lancez une nouvelle requête. Comparer la sortie révisée avec le résultat précédent. Désactiver ou éditer un paquet ne revient pas les instructions déjà lues dans un tour en cours d'exécution.

Pour un brouillon assisté par un agent, utilisez **Add skill → Chat with agent** ou l'entrée **Customize**. Inspecter les instructions proposées et lire le paquet publié avec les mêmes vérifications; une réponse de chat décrivant un Skill n'est pas le paquet enregistré lui-même.

### Réutiliser le Skill publié dans une nouvelle session {/* #reuse-the-published-skill-in-a-new-session */}

1. Commencez une nouvelle session et joignez la matrice de nombre de GSE60450 publique d'origine.
2. Demander **naseq-descriptive-qc** par nom. Demandez ses quatre paramètres par échantillon, une entrée inchangée, un CSV et un rapport concis.
3. Inspectez l'exécution Notebook et ouvrez les deux fichiers générés. Vérifiez les résultats enregistrés par rapport à l'entrée originale plutôt que de ne compter que sur le message d'achèvement.

Rouvrir le nouveau CSV et le rapporter et les comparer par l'identificateur de l'échantillon complet avec le [niveau de référence partagé](../reference/example-data.md). Vérifiez le hash d'entrée. Lors de l'application du Skill à une autre étude, répétez ces vérifications en fonction de l'entrée et de la conception expérimentale de cette étude.

![Une invocation séparée et la réouverture QC CSV](/img/open-science/v0.27.0/19-native-skill-reuse.webp)

Référence de mise en œuvre: [CompétenceÉditeur.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillEditor.tsx), [host-skills-service.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/skills/host-skills-service.ts).

Enregistrer comme implémentation de compétences: [disponibilité](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/workspace/save-as-skill-availability.ts), [distillation de conversation](https://github.com/aipoch/open-science/blob/v0.27.0/src/main/acp/interrupted-turn-continuation.ts), [Skill Créateur](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/skill-creator/SKILL.md).
