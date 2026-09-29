---
title: "Inspecter une voie et son réseau d'interaction"
last_update:
  date: '2026-09-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Inspecter une voie et son réseau d'interaction {/* #inspect-a-pathway-and-its-interaction-network */}

<p className="example-label"><strong>Exemple pratique</strong> Signalisation humaine p53 en Reactome via Pathway Commons</p>

Utilisez une voie curée pour inspecter comment **TP53**, **MDM2** et **CSKN1A** apparaissent dans un réseau. Le résultat est un enregistrement source enregistré, table d'interaction et note de recherche. Cela permet de récupérer la connectivité curated; il ne teste pas l'enrichissement ou ne mesure pas l'activité de la voie dans un échantillon. Pour une question statistique sur la liste des gènes, utilisez [l'enrichissement de gènes](gene-set-enrichment.md).

## 1. Préparer le projet {/* #prepare */}

1. Créez un projet nommé **Pathway Commons Recherche** et commencez une conversation.
2. Dans **Settings → Connectors**, rendre **Pathway Commons** disponible à l'agent actif. Il fait appel à un service public; cet exemple n'a pas besoin de dossiers de recherche privés.
3. Sélectionnez un modèle Main configuré. Cet exemple a utilisé **Codex subscription**. Si Codex est marqué **Update required**, [mettre à jour son runtime](../guides/frameworks.md#update-codex) avant d'envoyer la tâche.

## 2. Rechercher et conserver l'identité retournée {/* #search */}

Envoyer :

```text
Use the Pathway Commons Connector to find human p53 signaling pathways and
inspect one pathway from Reactome. Keep its exact returned URI and source
attribution, export its interaction network, and explain what the network
can and cannot tell us about TP53, MDM2 and CDKN1A. Save the original
responses, a small readable interaction table and a short English research
note so I can inspect them again.
```

Ouvrez **Notebook** à côté de la conversation et inspectez la requête et retournez les enregistrements. Cette exécution a cherché `p53 signaling`, avec le type `Pathway`, organisme `9606` et datasource `reactome`. Il a également utilisé `top_pathways` avec `p53`. La recherche a rapporté **Nombre total de visites 1,309**; sa première page n'est pas la totalité du jeu de résultats.

![Demande de recherche en anglais et requête réelle Pathway Commons dans le Notebook](/img/open-science/v0340/pathway-query.webp)

L'enregistrement sélectionné était **Règlement Transcription par TP53**, avec exact URI `http://bioregistry.io/reactome:R-HSA-3700989` et source `pc14:reactome`. Gardez l'URI retourné par la requête plutôt que de la reconstruire à partir d'une étiquette. Les résultats de recherche et les dénombrements peuvent changer à mesure que la source est mise à jour.

## 3. Exporter la voie sélectionnée {/* #export */}

Demandez que l'URI sélectionné soit exporté avec **voies secondaires incluses**. Dans cette exécution, l'agent a enregistré les réponses SIF, TXT et JSON-LD. La SIF fournit des dossiers d'interaction aplatis; TXT ajoute des enregistrements de nœuds; JSON-LD conserve une structure de modèle plus riche. Consultez le [Référence de l'opération](../reference/connector-operations.md#pathway_commons_export) lors du choix d'un format ou d'une portée de voie souterraine.

Inspecter la réponse conservée avant de lire le résumé. L'exportation SIF de l'exemple contenait **Enregistrements d'interaction 3,318**, et son exportation TXT contenait **Nœuds 387**. Ces dénombrements décrivent cette voie sélectionnée et la portée de l'exportation, pas toutes les interactions humaines p53.

## 4. Ouvrir et inspecter les résultats {/* #inspect */}

1. Sélectionnez **tp53_mdm2_cdkn1a_readable_interactions.tsv** dans la réponse ou les cartes de fichier générées. Ouvrez son aperçu plein écran si les colonnes sont étroites.
2. Vérifiez `source`, `interaction` et `target` par rapport à la réponse brute. La table de lecture de neuf rangées est une sélection, pas le réseau complet.
3. Ouvrez **tp53_pathway_research_note.md**. Confirmer qu'il conserve la voie URI, la source, la date et les limites.
4. Téléchargez les fichiers dont vous avez besoin. Préserver le réseau complet et les réponses originales en même temps que tout extrait utilisé dans une présentation.

![Neuf enregistrements d'interaction sélectionnés ouverts dans l'application](/img/open-science/v0340/pathway-interactions.webp)

Les enregistrements retournés comprennent `TP53 controls-expression-of MDM2`, `MDM2 controls-state-change-of TP53` et `MDM2 in-complex-with TP53`. CDCN1A apparaît dans six enregistrements, mais cette exportation SIF n'a pas de bord direct TP53-à-CDKN1A. Un bord absent dans une voie sélectionnée et aplatie n'est pas une preuve qu'une relation biologique est absente.

![Note en anglais sauvegardée avec limite d'identité et d'interprétation des voies](/img/open-science/v0340/pathway-research-note.webp)

`controls-state-change-of` ne spécifie pas en soi l'activation par rapport à l'inhibition; `in-complex-with` n'établit pas de liaison binaire directe. Le réseau ne peut à lui seul établir la spécificité tissulaire, les effets de mutation, la force d'interaction, l'activité au niveau de l'échantillon ou la causalité. Utilisez les réactions de la voie originale et les expériences primaires pour étudier ces questions.

## Fichiers d'exemples enregistrés {/* #example-files */}

- <ExampleDownload path="/examples/pathway-commons/pathway-commons-responses.zip">Réponses originales Connector, ZIP compressé</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/reactome_tp53_interaction_network.tsv">Tableau d ' interaction complet des exportations</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_mdm2_cdkn1a_readable_interactions.tsv">Tableau de lecture des neuf rangées</ExampleDownload>
- <ExampleDownload path="/examples/pathway-commons/tp53_pathway_research_note.md">Note de recherche en anglais</ExampleDownload>

Pour explorer un voisinage de gènes ou des chemins entre des ensembles de gènes au lieu d'une voie précisément sélectionnée, utilisez **pathway_commons_graph** et choisissez délibérément sa direction, son mode de chemin et ses limites. C'est une question différente de cette exportation basée sur URI. Les sources et la configuration sont décrites dans [Bases de données scientifiques](../tools/databases.md#pathway-expression-clinical).
