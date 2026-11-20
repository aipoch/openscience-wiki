---
title: "Explorer les outils"
last_update:
  date: '2026-11-20'
---

# Explorer les outils {/* #explore-tools */}

Choisissez un outil par le résultat dont vous avez besoin : récupérer un enregistrement, inspecter un fichier, exécuter un calcul ou connecter un service externe. L'application combine ces capacités, mais elles ont des exigences différentes en matière de configuration et de preuves.

## Choisissez une famille d'outils {/* #choose-a-tool-family */}

| Besoin | Commencez ici. | Ce qui doit être prêt | Que faire après inspection |
| --- | --- | --- | --- |
| Lire les fichiers, planifier le travail, calculer ou publier les résultats | [Outils de recherche intégrés](./built-in.md) | Entrées de projet et autorisations d'exploitation accessibles | Réponse de l'outil, fichier de sortie et enregistrement d'exécution |
| Trouvez les pages Web publiques et lisez le texte source | [Recherche sur le Web](./web-search.md) | Open-Science Agent intégré, modèle et réseau Main | URL source, texte récupéré et toute troncation |
| Trouver quel logiciel scientifique une méthode utilise | [Catalogue des outils scientifiques](./catalog.md) | Vérifiez les paquets/poids séparément de l'installation Skill | exécutable/import et version |
| Exécuter Python, R ou une charge de travail scientifique | [Outils scientifiques](./scientific.md) | Durée d'exécution, paquets ou ordinateur d'hôte sélectionné | Code, erreurs, contrôles de sortie et provenance |
| Enquête sur les dossiers biomédicaux/scientifiques | [Bases de données scientifiques](./databases.md) | Activé Connector, réseau et toutes les identifiants requis | ID source, champs retournés et troncation |
| Inspecter les données CSV, TSV ou tableur | [Tableaux et ensembles de données](./tables.md) | Fichier pris en charge et entrée courante | Lignes/colonnes visibles, dimensions délimiteurs et données complètes |
| Lire des articles, séquences, structures et autres sorties | [Vérificateurs scientifiques](./viewers.md) | Format pris en charge | Contenu rendu et toute limitation d'aperçu |
| Connectez un serveur MCP | [Connecteurs et MCP](./mcp.md) | Configuration du serveur et confiance | État connecté et véritable réponse à l'outil |
| Configurer une identité/clé de service | [Pouvoirs de service](./credentials.md) | Service correct et compte utilisable | Résultat de validation ou requête live limitée |
| Exposez vos propres données locales à travers un outil | [Outil personnalisé MCP](./custom.md) | Un serveur de travail avec un schéma d'entrée | Découverte, appel réussi et comportement d'échec réel |

## La disponibilité a plusieurs significations {/* #availability-has-several-meanings */}

**Inscrit** signifie que l'application connaît une ressource. **Enabled** signifie que l'agent sélectionné peut l'utiliser. **Connected** confirme une session Connector, mais ne prouve pas qu'une requête particulière est valide. **Exécuté** signifie qu'un outil a effectivement retourné un résultat ou une erreur. **Vérifié** signifie que le résultat a été inspecté par rapport à la tâche.

Les exemples locaux comprennent le nombre réel de GSE60450 RNA-seq, un serveur QC en lecture seule personnalisé, un artefact de molécule d'aspirine et des entrées publiques de séquence/structure. Ils utilisent des captures d'écran en anglais dans les deux langues. L'exécution à distance de GPU/SSH et les identifiants non disponibles sur ce périphérique restent explicitement distingués des opérations locales terminées.

![QC personnalisé Connector connecté dans l'application](/img/open-science/capabilities-walkthrough/09-mcp-connected.webp)

## Donnez à l'agent une demande limitée {/* #give-the-agent-a-bounded-request */}

Spécifiez la source, l'opération et la sortie attendue. Pour une requête de base de données, inclure l'espace de noms d'identificateurs et une petite limite de résultats. Pour un calcul, nommez l'entrée, la langue sélectionnée et vérifiez. Demander l'erreur réelle si l'outil ne peut pas fonctionner; une réponse reconstruite à partir de la mémoire modèle n'est pas un appel d'outils réussi.

Un [Compétence](../skills/overview.md) fournit la méthode; a [Spécialiste](../specialists/overview.md) fournit un rôle réutilisable. Ni automatiquement installer un logiciel, fournir des identifiants ou rendre un fichier inaccessible disponible.

Référence de mise en œuvre: [ConnecteursPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorsPanel.tsx), [preview-support.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts).
