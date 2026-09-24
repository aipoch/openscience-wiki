---
title: "Aligner plusieurs séquences et inspecter les positions conservées"
last_update:
  date: '2026-09-24'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Aligner plusieurs séquences et inspecter les positions conservées {/* #align-multiple-sequences-and-inspect-conserved-positions */}

<p className="example-label"><strong>Exemple pratique</strong> Comparer les chaînes alpha d'hémoglobine humaine, souris et bovine</p>

Récupérer trois séquences UniProt examinées, les aligner avec le service Omega Clustal à distance et vérifier quelles colonnes contiennent le même acide aminé dans les trois. L'exemple a produit un alignement de colonne 142 avec des colonnes entièrement conservées 116. Ce sont des résultats pour ce petit ensemble de trois espèces, pas une annotation fonctionnelle ou un arbre phylogénétique.

## 1. Préparer la session et les sources {/* #alignment-inputs */}

La configuration de la connexion est décrite dans [Bases de données scientifiques](../tools/databases.md#connect-database).

1. Créez **Alignement de la séquence de l'hémoglobine** et ouvrez une nouvelle conversation avec un modèle connecté. Cet exemple a utilisé **Codex subscription**.
2. Dans **Settings → Connectors**, rendre **Genes & Ontologies** et **Genomes** disponibles sur Main. Oméga clustal appartient à Génomes; ce n'est pas un Connector séparé.
3. Configurez le courriel de contact valide de recherche-service demandé par Clustal Omega dans **Settings → Privacy → Share contact email with research data services**. Utilisez votre contact réel, pas une adresse inventée. Les entrées de séquence sont envoyées à EMBL-EBI.
4. Envoyez l'invite ci-dessous. Utiliser des séquences publiques ou autorisées d'une autre manière.

```text
Which positions are conserved among human, mouse and bovine hemoglobin
alpha chains? Retrieve the reviewed canonical sequences from UniProt,
record their accessions and organisms, and align the three FASTA records
with Clustal Omega through the Genomes Connector in Session Notebook.
Follow the submitted job through completion, then save the input FASTA,
raw alignment, submission receipt and a short English report with
conserved-column counts and a few clearly mapped examples. Explain why
sequence conservation alone does not prove function.
```

Vérifiez les enregistrements retournés avant l'alignement :

| Organisme | Adhésion examinée | Impôts | Longueur canonique |
| --- | --- | --- | --- |
| Humain · Homo sapiens | P69905 | 9606 | 142 aa |
| Souris · Mus musculus | P01942 | 10090 | 142 aa |
| Bovine · Bos taurus | P01966 | 9913 | 142 aa |

Les noms FASTA sont `human_P69905`, `mouse_P01942` et `bovine_P01966`. Tous les noms doivent être uniques. Le P69905 humain est associé à l'HBA1 et à l'HBA2; une entrée de protéines n'est pas nécessairement un gène unique. Gardez l'adhésion et l'organisme avec chaque séquence.

<ExampleDownload path="/examples/v0331/hemoglobin_alpha_human_mouse_bovine.fasta">Les trois séquences d'entrée</ExampleDownload>

## 2. Soumettre une fois et suivre l'emploi {/* #alignment-job */}

L'agent appelle **Genomes → clustalo_submit** avec les combinés FASTA, `stype: protein` et `outfmt: clustal_num`. Le service nécessite au moins trois enregistrements et accepte au plus des enregistrements 4,000 ou 4 MiB. Conservez le `job_id` retourné, le format demandé et le reçu de la soumission.

1. Inspecter la réponse à la demande Notebook. Un ID d'emploi et **QUÉBEC** signifient accepté, non complété.
2. Interrogez `clustalo_status` pour ce même ID, en attendant au moins dix secondes entre les vérifications et en suivant les directives de service plus longues. Ne soumettez pas une autre copie parce que la file d'attente est lente.
3. Après **FINIS**, appelez `clustalo_results` avec le même ID et le même format. Enregistrer le contenu retourné en tant que fichier `.aln`; recevoir un nom de fichier suggéré ne sauvegarde pas lui-même un fichier.
4. Si la session s'arrête, conservez l'ID de travail et continuez le même travail plus tard. Une réponse incertaine peut encore correspondre à un emploi accepté; éviter de soumettre une nouvelle fois automatiquement. **ERREUR**, **FOI** et **_NE FONDE** nécessitent une enquête, et non une interprétation vide de l'alignement.

![L'ID de travail réel, les vérifications en file d'attente et l'état complété dans Session Notebook](/img/open-science/v0331/clustal-submission.webp)

Le reçu de cet exemple enregistre initialement **QUÉBEC**. Le résultat Notebook ultérieur a rapporté **FINIS** et a retourné un alignement Clustal O(1.2.4). Les résultats ont une période de rétention contrôlée par le fournisseur, documentée jusqu'à une semaine; enregistrer le rapport rapidement. La taille limite du résultat est 8 MiB. Voir le [champs d'opérations](../reference/connector-operations.md#clustalo_submit).

<ExampleDownload path="/examples/v0331/clustalo_submission_receipt.json">Réception originale</ExampleDownload> · <ExampleDownload path="/examples/v0331/hemoglobin_alpha_clustalo.aln">Alignement brut</ExampleDownload>

## 3. Vérifier l'alignement et le nombre des colonnes conservées {/* #alignment-results */}

Ouvrez le **hemoglobin_alpha_conservation_report.md** généré. Comparez ses adhésions et la longueur de la séquence avec l'entrée FASTA et l'alignement brut. Supprimer les lacunes de chaque séquence alignée et confirmer que les résidus restants correspondent exactement à son entrée; Cette méthode permet d'attraper la substitution ou la troncation accidentelle de séquences.

![Le rapport anglais avec identités sources, nombres d'alignements et limitations](/img/open-science/v0331/clustal-report.webp)

Pour cette course :

| Vérifier | Résultat |
| --- | --- |
| Entrée et séquences alignées | Trois, chacun des résidus de 142 |
| Colonnes d'alignement | 142 |
| Colonnes contenant des lacunes | 0 |
| Résidus identiques dans les trois séquences | Colonnes 116 |
| Colonnes variables | 26 |
| Fraction entièrement conservée | 116 / 142 = 81.7% |

Dans la sortie Clustal, `*` marque une colonne entièrement conservée; `:` et `.` décrivent des groupes ayant des propriétés similaires, et non des résidus identiques. Ne compter que des colonnes identiques non-gap pour la fraction ci-dessus. Les exemples sont les suivants : D7, G16, H59, H88 et R142. Ici, l'alignement est libre d'espace, de sorte que les colonnes égalent les numéros de résidus de la séquence canonique. Avec les lacunes, cartographiez chaque séquence séparément et ne confondez pas les colonnes d'alignement avec le nombre de résidus ou la numérotation des protéines matures.

<ExampleDownload path="/examples/v0331/hemoglobin_alpha_conservation_report.md">Rapport de résultat</ExampleDownload>

## 4. Conserver l'interprétation dans la preuve {/* #alignment-interpretation */}

La conservation de ces trois mammifères apparentés appuie une hypothèse sur la contrainte, mais ne prouve pas la fonction d'un résidu. Le pliage, la stabilité, l'ascendance partagée et l'échantillon choisi peuvent tous avoir de la matière. L'échantillonnage plus large des taxons, le contexte structurel et les données expérimentales sont des étapes distinctes. Un alignement de plusieurs séquences n'est pas une recherche BLAST ou un arbre phylogénétique.

Conservez l'entrée FASTA, l'alignement brut, la réception et le rapport ensemble. Pour commencer par une séquence inconnue, utilisez [découverte de protéines et BLAST](protein-sequence-search.md). Pour les recherches de profil spécifiques au programme, voir [HMMER et InterProScan](../tools/databases.md#sequence-tools).

[Clustal Omega · EMBL-EBI FAQ](https://www.ebi.ac.uk/jdispatcher/docs/faqs/clustal/).
