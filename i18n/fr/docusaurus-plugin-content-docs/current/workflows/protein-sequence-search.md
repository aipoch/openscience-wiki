---
title: "Trouvez une séquence protéique et effectuez une recherche BLAST"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Trouvez une séquence protéique et effectuez une recherche BLAST {/* #find-a-protein-sequence-and-complete-a-blast-search */}

<p className="example-label"><strong>Exemple pratique</strong> Trouver l'entrée d'alpha d'hémoglobine humaine examinée et récupérer sa séquence</p>

Commencer par le nom humain du gène HBA1, récupérer une protéine UniProt examinée et son FASTA canonique, puis soumettre une recherche BLAST et inspecter le rapport complété. Cet exemple enseigne la recherche et la comparaison de séquences à l'aide d'une protéine connue.

Avant de commencer, suivez [Bases de données scientifiques](../tools/databases.md#connect-database) pour activer les connecteurs requis. Utilisez un modèle connecté et un [Environnement d'exécution Notebook](../guides/runtimes.md) disponible.

## 1. Trouvez la protéine et récupérez son FASTA {/* #sequence-search */}

**Genes & Ontologies** peut découvrir les entrées UniProt avant de connaître une adhésion. Utilisez `search_uniprot_entries` avec un nom de gène, une phrase de nom de protéine ou un organisme. `organism_id` correspond au taxon spécifié, tandis que `reviewed: true` sélectionne Swiss-Prot et `false` sélectionne les entrées TrEMBL non revues. Omettre `reviewed` pour inclure les deux. Suivez `next_cursor` sans changer la taille des filtres ou des pages lors de la poursuite d'une requête.

Activez **Genes & Ontologies**, ouvrez une session avec un modèle connecté et l'exécution Notebook disponible, puis envoyez :

```text
Use Genes & Ontologies through Session Notebook. Call search_uniprot_entries
with gene HBA1, organism_id 9606, reviewed true and page_size 5.
Save the query and complete response as hba1-uniprot.json. Check the
returned organism and protein identity, then retrieve the canonical FASTA
for the matching accession with get_uniprot_entries. Add that response to
the JSON and save hba1-query.fasta. Keep everything in English. Preserve
missing or empty results; do not invent sequences.
```

Ouvrez le JSON avant d'utiliser le FASTA. Cette requête a retourné **P69905 / HBA_HUMAN**, **Homo sapiens**, **Acides aminés 142**, avec les noms de gènes **HBA1 et HBA2**. La réponse a identifié les versions d'UniProt **2026_03**, `total_results: 1` et `has_more: false`. L'en-tête FASTA préserve l'adhésion et l'organisme; la séquence contient des résidus de 142. Une requête de nom de gène peut renvoyer une entrée de protéine associée à plus d'un gène, donc ne pas déduire une cartographie individuelle.

![Filtres de requête UniProt et l'entrée de protéine humaine retournée revue](/img/open-science/v0320/uniprot-discovery.webp)

<ExampleDownload path="/examples/v0320/hba1-uniprot.json">Demande UniProt et réponse FASTA</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-query.fasta">Canonique FASTA</ExampleDownload>

## 2. Soumettre et suivre l'emploi BLAST {/* #blast-jobs */}

Pour une recherche de similarité, activez **Genomes** et utilisez ses trois opérations BLAST. L'ordre est envoyé au service public de l'INNE; utiliser les commentaires publics ou autorisés d'une autre manière.

1. Appelez `blast_submit` une fois avec la séquence, sa `molecule_type` et une base de données compatible. Gardez le `rid` retourné et les instructions de vote. Pour la protéine ci-dessus, `molecule_type: protein` et `database: swissprot` sélectionnent une recherche de protéines.
2. Appelez `blast_status` pour ce RID. Les demandes pour le même RID doivent être au moins **60 secondes distantes** et toutes les demandes BLAST doivent être au moins **10 secondes distantes**. Suivez tout délai plus long retourné par le service. `WAITING` signifie que le travail est toujours en file d'attente ou en cours d'exécution; conserver son RID au lieu de le soumettre à nouveau.
3. Après `READY`, respectez le même intervalle avant `blast_results`. Les formats disponibles sont `json2`, `xml2`, `text` et `tabular`. Les rapports sont limités à 2 MiB; demander moins de résultats si nécessaire. La sortie tabulaire peut inclure des commentaires et n'est pas automatiquement une table CSV.
4. Vérifiez la longueur de la requête, la base de données efficace, la correspondance des adhésions, la portée de l'alignement, l'identité et la valeur E dans le rapport réel. La similarité des séquences ne permet pas à elles seules d'établir la fonction. Une séquence d'hémoglobine connue est utile pour apprendre les témoins, ne démontrant pas la découverte d'une protéine inconnue.

Si la soumission renvoie `blast_submission_unknown`, son acceptation est incertaine : ne pas soumettre automatiquement à nouveau. Préserver la réponse et tout RID. Ne traitez jamais un reçu de présentation ou un statut `WAITING` comme un alignement terminé. Les entrées exactes et les conditions de retour sont dans le [Référence BLAST](../reference/connector-operations.md#blast_submit).

## 3. Ouvrir et interpréter le rapport terminé {/* #blast-report */}

Continuer le même exemple de protéine dans la séance ci-dessus. Conservez le reçu de la soumission afin qu'une demande ultérieure puisse reprendre le même travail. Envoyer :

```text
Continue with the public P69905 FASTA retrieved above. Use Genomes through
Session Notebook. If this session already has a BLAST RID, resume that RID;
otherwise call blast_submit once with molecule_type protein, database
swissprot and hitlist_size 5, then save the receipt. Space requests for the
same RID by at least 60 seconds and follow any longer server delay. Check
blast_status; if it is still WAITING, keep the RID for a later check rather
than submitting again. After READY, wait the required interval and retrieve
blast_results in json2 format. Save hba1-blast-raw.json, hba1-blast-hits.csv
and hba1-blast-results.md. Include the actual database, query length,
accessions, alignment coordinates, identity counts and E-values. Explain
the coverage and identity calculations. Keep everything in English and
preserve actual errors or empty results. Never invent alignments.
```

![Réception de la soumission BLAST avec le RID et l'intervalle minimal de scrutin](/img/open-science/v0320/blast-submitted.webp)

Une fois le rapport prêt, ouvrez **hba1-blast-results.md** et comparez sa table avec **hba1-blast-raw.json**. Cet exemple a utilisé **BLASTP 2.17.0+**, avec **swissprot** confirmé par le rapport, une requête **142-aminoacide** et **Nombre de visites 5**:

| Adhésion | Résidus identiques/longueur d'alignement | Couverture des demandes de renseignements | Valeur E |
|---|---:|---:|---:|
| P69905 | 142/142 (100%) | 100% | 1.99033e-100 |
| P01923 | 140/141 (99.29%) | 99.30% | 1.06845e-98 |
| T9TS35 | 140/142 (98.59%) | 100% | 2.38346e-98 |
| P06635 | 139/142 (97.89%) | 100% | 3.57742e-98 |
| P01924 | 138/141 (97.87%) | 99.30% | 3.00466e-97 |

![Rapport BLAST complété avec cinq résultats réels, couverture de la requête et calculs d'identité](/img/open-science/v0320/blast-results.webp)

Pour chaque premier PSH, l'identité est le nombre de résidus identiques divisé par la longueur d'alignement. La couverture de requête est la portée de requête-coordonnée inclusive divisée par 142. Pour P01923, la portée de la requête est 2–142 : la couverture est 141/142 = 99.30%, tandis que l'identité est 140/141 = 99.29%. Les deux pourcentages répondent à des questions différentes; ni la probabilité qu'une affectation de fonction soit correcte.

<ExampleDownload path="/examples/v0320/hba1-blast-results.md">Rapport achevé</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-blast-hits.csv">Table à 5 hits</ExampleDownload> · <ExampleDownload path="/examples/v0320/hba1-blast-raw.json">Rapport de la BCNI JSON2</ExampleDownload>

Le P69905 est la séquence d'entrée elle-même, de sorte que son identité et sa couverture 100% fournissent une vérification de séquence connue. Les autres résultats montrent des séquences semblables, et non une nouvelle découverte fonctionnelle. Conserver le rapport brut et la requête avec le tableau de résultats; une version ultérieure de la base de données peut modifier la liste des succès.
