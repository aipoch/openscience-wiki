---
title: "Skills"
last_update:
  date: '2026-09-24'
---

# Skills {/* #skills */}

Un Skill donne à l'agent une méthode répétable : quand l'utiliser, quelles entrées il faut, ce qu'il faut faire et comment vérifier ses sorties. Open-Science charge ses instructions au besoin. L'installation d'un Skill n'installe pas le logiciel scientifique décrit à l'intérieur.

Trouvez des méthodes supplémentaires via le [Catalogue de Skills](marketplace.md), puis examinez leurs entrées et dépendances avant d'utiliser.

## Choisir le bon type de capacité {/* #choose-the-right-kind-of-capability */}

| Vous avez besoin | Utilisation | Exemple |
| --- | --- | --- |
| Une opération qui retourne des données ou exécute du code | A [outil](../tools/overview.md) | Lire les métadonnées GEO; exécuter Python |
| Une méthode qui coordonne ces opérations | A Skill | Valider une matrice de nombre de gènes bruts |
| Un rôle réutilisable avec ses propres instructions et capacités | A [Spécialiste](../specialists/overview.md) | Vérifier indépendamment un exemple de tableau CQ |

Commencez par [Répertoire Skill](./directory.md) pour trouver une méthode, ou [recettes](./recipes.md) pour choisir parmi une situation de recherche.

## Trouver et inspecter un Skill {/* #find-and-inspect-a-skill */}

1. Ouvrez **Settings → Skills**.
2. Utilisez **Search skills** pour rechercher son nom ou sa description. Saisissez `rnaseq-count-qc` après [créer l'exemple](./create.md).
3. Narrow **Filter skills by source**, **Filter Skills by agent** ou **Filter by Tag** si la liste reste longue.
4. Ouvrez le résultat. Lire la description, les instructions, **Files**, licence et **Availability**. Un nom d'affichage peut différer de l'ID du paquet.
5. Retour à la liste et inspecter **Used by**. Il identifie les agents qui peuvent utiliser le paquet; il ne liste pas les tirages effectués.

![Recherche dans le RNA-seq Skill enregistré](/img/open-science/capabilities-walkthrough/02-skill-search.webp)

| Contrôle | Ce qui change |
| --- | --- |
| En vedette / Importé / Titre personnel | Élargit le groupe source. Les bateaux en vedette avec l'application; Importé provient d'un paquet ou d'un dépôt; Le personnel est créé localement. |
| Interrupteur d'agent Main / basculement de ligne | Modification de la disponibilité pour Skills contrôlé par l'utilisateur; application requise Skills rester activé. Les fichiers restent installés. |
| Utilisé par | Affiche les disponibilités dans l'ensemble de Main Agent et Spécialistes. Utilisation **Manage access** sur la ressource pour ajuster les associations Main Agent et Specialist. |
| Gérer les étiquettes / supprimer une puce d'étiquette | Ajouter ou supprimer une étiquette organisationnelle; il ne change pas la permission d'exécution. |
| Ajouter une compétence | Offre la création assistée par l'agent, la création directe, le téléchargement local, l'importation GitHub, ou la découverte de dossiers installés. |
| Conversation **+ → Save as skill** | Extrait une méthode réutilisable d'une branche active complétée; voir [les étapes de la création et les raisons de l'état des personnes handicapées](./create.md). |
| Gérer | Ouvre la gestion en vrac pour les paquets personnels et importés. |
| Importations de conversations → Paquets Skill | Permet à l'agent de reconnaître ZIP/`.skill` les colis et demander l'autorisation d'importation. La fixation d'un paquet seul ne l'installe pas. |

### Pourquoi certains interrupteurs ne peuvent pas être éteints {/* #why-some-switches-cannot-be-turned-off */}

Les fonctions d'application de base de support **Environnement & Packages**, **Configuration de l'environnement de calcul**, **Calcul à distance (SSH)** et **Customize** restent activées. Leurs commutateurs sont vérifiés et désactivés. Concentrez l'explication pour lire **This built-in Skill supports core application features and is always enabled.**

Cette règle d'activation n'installe pas les dépendances, ne fournit pas d'identifiants ou de permissions d'exploitation de subvention. L'affectation Specialist est un champ d'application distinct : inspectez **Used by** et la liste des capacités du rôle.

Le répertoire contient toujours 23 public groupé Skills. La prise en charge interne Skills ne sont pas des méthodes supplémentaires à sélectionner. [Mise en œuvre du commutateur nécessaire](https://github.com/aipoch/open-science/blob/v0.27.0/src/renderer/src/pages/settings/RequiredSkillToggle.tsx).

La capture d'écran affiche l'explication de **Customize**. Ces Skills requis restent activés même lorsque vous désactivez d'autres méthodes optionnelles.

![Personnaliser les séjours activés et explique pourquoi](/img/open-science/v0.27.0/08-always-enabled-skill.webp)

Pour le popup par agent et ses liaisons en lecture seule, voir [accès aux ressources](../guides/connectors.md#resource-access).

## Utilisez-le dans une conversation {/* #use-it-in-a-conversation */}

<p className="example-label"><strong>Exemple</strong> Demander une vérification avec rnaseq-count-qc</p>

Donnez à l'agent l'entrée, le Skill requis, livrable et les contraintes. Par exemple:

> Utilisez le rnaseq-count-qc Skill sur la matrice de nombre brut GSE60450 jointe. Gardez EntrezGeneID et Longueur comme métadonnées. Valider les dimensions et les nombres entiers non négatifs, conserver les ID d'échantillon d'origine, et enregistrer un rapport de méthodes séparées avec avant/après entrée SHA-256. Utilisez le Python Notebook existant.

Lorsque l'approbation est demandée, inspecter les instructions complètes et le fonctionnement. Après exécution, rouvrir le rapport et l'enregistrement Notebook et comparer avec [Exemple de données](../reference/example-data.md). Une vérification Specialist ultérieure est une opération séparée; le fait de nommer un Specialist n'établit pas que la délégation s'est produite.

### Instructions par rapport aux fonctions Notebook {/* #instructions-versus-notebook-functions */}

Notre paquet `rnaseq-count-qc` contient des instructions et un fichier de référence. Il effectue les fonctions Notebook callables d'enregistrement **pas**. L'agent lit les instructions, puis écrit Python ou R.

Certains groupes Skills fournissent également des fonctions du noyau. Leurs propres instructions nomment les fonctions et le `kernelSkillIds` requis. N'ajoutez pas tous les identifiants Skill installés dans ce champ : un paquet instruction seulement n'est pas un helper du noyau. Un Skill chargé ne peut pas non plus accorder les permissions de système de fichiers, de réseau ou d'outil.

Si un Skill est absent d'un récupérateur, vérifiez son filtre source, activé l'état et l'affectation de l'agent. Si ses instructions se chargent mais que le calcul échoue, continuer avec [Outils scientifiques](../tools/scientific.md); c'est un problème d'exécution ou d'entrée, pas de preuve que le paquet n'a pas réussi à installer.

Référence de mise en œuvre: [CompétencesPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillsPanel.tsx), [SkillDetailView.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SkillDetailView.tsx).
