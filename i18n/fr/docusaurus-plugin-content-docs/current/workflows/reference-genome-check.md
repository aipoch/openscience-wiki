---
title: "Vérifier les espèces, le génome de référence et les identifiants chromosomiques"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Vérifier les espèces, le génome de référence et les identifiants chromosomiques {/* #check-species-reference-genome-and-chromosome-identifiers */}

<p className="example-label"><strong>Exemple pratique</strong> Identifier le chromosome humain GRCh38.p14 1</p>

Confirmer l'organisme, l'assemblage en version et les alias chromosomiques avant de combiner les enregistrements provenant de différentes bases de données. La sortie est une table d'identité pour un chromosome, avec les réponses originales de la source.

Avant de commencer, suivez [Bases de données scientifiques](../tools/databases.md#connect-database) pour activer les connecteurs requis. Utilisez un modèle connecté et un [Environnement d'exécution Notebook](../guides/runtimes.md) disponible.

## 1. Interroger l'organisme, l'assemblage et le chromosome {/* #reference-genome */}

1. Activer **Genomes** dans **Settings → Connectors**. Ouvrez une session avec un modèle connecté et l'exécution Notebook disponible. Cet exemple v0.31.1 a utilisé **Codex subscription**.
2. Interroger l'organisme, l'assemblage **version anglaise** et la séquence dans cet ordre. Envoyer :

```text
Use Genomes through Session Notebook. Load its connector instructions.
Call ncbi_resolve_taxon with query human and max_matches 10.
Call ncbi_get_assembly_info with assembly_accession GCF_000001405.40.
Call ncbi_get_sequence_aliases with assembly_accession GCF_000001405.40,
sequence chr1 and max_sequences 200. Save the complete responses as
ncbi-human-taxon.json, ncbi-grch38-assembly.json and ncbi-chr1-aliases.json.
Save ncbi-reference-identity.csv and ncbi-reference-notes.md with the
query, identity, ambiguity and truncation flags, and source URLs.
Preserve accession versions and RefSeq/GenBank differences. Do not perform
coordinate liftover or invent results. Keep everything in English.
```

## 2. Comparer les identifiants retournés {/* #compare-identifiers */}

Ouvrez les notes et comparez les identifiants retournés dans les trois fichiers JSON. Les trois appels ont réussi dans cet exemple.

![Trois appels NCBI réels et l'identité du taxon et de l'assemblage retournés](/img/open-science/v0311/ncbi-notes.webp)

| Vérifier | Résultat de cet exemple |
| --- | --- |
| Organisme | Homo sapiens, TaxID **9606**; une allumette, `ambiguous: false` |
| Montage demandé/en cours | **GCF_000001405.40**, **GRCh38.p14**, nom de l'UCSC **hg38** |
| Groupe GenBank couplé | **GCA_000001405.29**; le dossier retourné signale des différences avec RefSeq |
| Alias de chromosome 1 | **1**, **chr1**, RéfSeq **NC_000001.11**, Banque Générale **CM000663.2** |
| Séquence sélectionnée | **248956422 bp**, Assemblée primaire; une allumette, `matches_truncated: false` |

![Réponse originale du chromosome-1 avec alias en version et nombre de correspondances](/img/open-science/v0311/ncbi-aliases.webp)

## 3. Conserver la table d'identité et les dossiers sources {/* #save-reference-records */}

<ExampleDownload path="/examples/v0311/ncbi-reference-notes.md">Demandes de renseignements</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-reference-identity.csv">Tableau d'identité</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-human-taxon.json">Réponses fiscales</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-grch38-assembly.json">Réponse de l'Assemblée</ExampleDownload> · <ExampleDownload path="/examples/v0311/ncbi-chr1-aliases.json">Réponse en séquence</ExampleDownload>

Cette recherche a abouti pour **un seul chromosome sélectionné** ; elle n’exporte pas toutes les séquences de l’assemblage. Lors d’une nouvelle requête, conservez les correspondances ambiguës et les indicateurs de troncature. Le nom d’un assemblage ne remplace pas son numéro d’accès versionné. Le numéro actuel renvoyé ne justifie pas le remplacement silencieux d’une version historique. Les alias décrivent des noms au sein d’un assemblage ; ils ne convertissent pas les coordonnées entre assemblages. [Paramètres exacts](../reference/connector-operations.md#ncbi_get_assembly_info)
