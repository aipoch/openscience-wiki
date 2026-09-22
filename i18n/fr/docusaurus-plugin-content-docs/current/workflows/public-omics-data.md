---
title: "Trouver des données omiques publiques et construire un inventaire de fichiers"
toc_max_heading_level: 2
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Trouver des données omiques publiques et construire un inventaire de fichiers {/* #find-public-omics-data-and-build-a-file-inventory */}

Commencez par une adhésion connue ou un sujet de recherche, inspectez les métadonnées publiques et enregistrez un inventaire de fichiers avec l'emplacement des sources et les comptes de vérification disponibles. Les exemples ci-dessous produisent des inventaires; télécharger et analyser les données sont des tâches distinctes.

Avant de commencer, suivez [Bases de données scientifiques](../tools/databases.md#connect-database) pour activer les connecteurs requis. Utilisez un modèle connecté et un [Environnement d'exécution Notebook](../guides/runtimes.md) disponible.

## 1. Résoudre une course connue et inspecter ses fichiers {/* #ena-runs */}

1. Activez **Omics Archives** sous **Settings → Connectors**. Fournir une adhésion publique ENA/INSDC à `ena_search_runs`, comme une étude PRJ ou une RRS. Un identifiant GEO `GSE` doit d'abord être lié à son étude INSDC; Les mots clés ne sont pas acceptés.
2. Inspecter `run_accession`, organisme, stratégie/mise en page de la bibliothèque et `truncated`. Le maximum est de 1,000. Il n'y a pas de jeton de compensation ou de continuation; limiter l'adhésion si la réponse est tronquée.
3. Pass one renvoyé run à `ena_get_run_files`. Vérifiez `found`, `fastq_available` et chaque entrée dans `fastq_files`. L'inventaire fournit URL, taille de fichier compressé et en amont MD5; il ne télécharge pas les fichiers ou ne vérifie pas leur contenu.
4. Avant un téléchargement séparé, vérifiez le stockage et conservez le manifeste. Vérifier les octets téléchargés par rapport au total de contrôle indiqué. Une bibliothèque jumelée n'a pas besoin d'avoir exactement deux fichiers; ne pas déduire l'identité de son compagnon de lecture à partir de `file_index`.

<p className="example-label"><strong>Exemple pratique</strong> Construire un manifeste de fichiers pour SRR037073</p>

Cet exemple v0.31.1 utilise **Codex subscription** et **Omics Archives** Connector activés. Ouvrez une session avec un exécut temps Notebook disponible, puis envoyez :

```text
Use Omics Archives through Session Notebook. Load its connector instructions.
Call ena_search_runs with accession SRR037073 and limit 10, then
ena_get_run_files with run_accession SRR037073. Do not download FASTQ files.
Save the complete responses as ena-run.json and ena-files.json.
Save every returned file entry as ena-fastq-manifest.csv with columns
file_index,url,size_bytes,md5. Save ena-run-notes.md with the exact inputs,
run identity, completeness flags and download limits. Keep everything in
English. Report actual errors or empty results; do not invent data.
```

Ouvrez les notes générées. La recherche réelle a renvoyé **Exécution de 1**, **Caenorhabditis elegans**, étude **PRJNA123835**, **RNA-Seq**, **SINGLE**, avec `truncated: false`. Confirmez l'organisme et la mise en page avant d'utiliser ses fichiers.

![Entrées de requête ENA, exécutez les drapeaux d'identité et d'exhaustivité dans les notes générées](/img/open-science/v0311/ena-notes.webp)

Ouvrez le CSV et comparez-le avec `ena-files.json`. Cette exécution a `found: true`, `fastq_available: true` et **Fichier 1**, taille **octets 25,154,397**. Le manifeste conserve son URL FTP et en amont MD5. Copier la valeur complète du fichier téléchargeable si une colonne de prévisualisation est coupée.

![Manifeste réel en un seul fichier ENA avec URL, taille et somme de contrôle en amont](/img/open-science/v0311/ena-manifest.webp)

<ExampleDownload path="/examples/v0311/ena-run-notes.md">Demandes de renseignements</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-fastq-manifest.csv">manifeste FASTQ</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-run.json">Exécuter la réponse</ExampleDownload> · <ExampleDownload path="/examples/v0311/ena-files.json">Réponse du fichier</ExampleDownload>

Les deux requêtes et la génération du manifeste ont abouti. **Aucun fichier FASTQ n’a été téléchargé ni vérifié par somme de contrôle** dans cet exemple. Le téléchargement constitue une étape distincte. [Paramètres exacts](../reference/connector-operations.md#ena_search_runs)

## 2. Découvrez les runs par sujet et inspectez les fichiers de projet {/* #omics-discovery */}

Utilisez `ena_query_runs` lorsque vous avez un sujet de recherche mais pas d'adhésion. Il combine organismes, stratégie de bibliothèque et filtres à mots clés avec ET. Au moins un filtre est requis; `tax_id` comprend les taxons descendants. La limite par défaut est 100 et le maximum est 1,000. Une réponse tronquée n'a pas de curseur de suite : rétrécir la requête au lieu de traiter le nombre retourné comme le total de données.

<p className="example-label"><strong>Exemple pratique</strong> Découvrez cinq RNA-Seq humains et inspectez un inventaire de fichiers ENA et PRIDE</p>

1. Activez **Omics Archives** dans **Settings → Connectors**, puis ouvrez une session avec un modèle connecté et un exécuteur Notebook disponible. Cet exemple utilise **Codex subscription**.
2. Utilisez l'invite ci-dessous pour demander des métadonnées seulement. La requête ENA et le projet PRIDE sont des exemples distincts; ils ne sont pas des échantillons appariés d'une étude.
3. Ouvrez `ena-discovery.json` et inspectez la requête, l'organisme, lancez des accessions et `truncated` avant de sélectionner les fichiers.

```text
Use Omics Archives through Session Notebook. Query ena_query_runs with
tax_id 9606, library_strategy "RNA-Seq", keyword "breast" and limit 5.
For the first returned run, call both ena_get_run_files and
ena_get_submitted_files. Separately call pride_get_project_files for
PXD000001, page 0, page_size 5; fetch its next_page once if present.
Save the exact requests and responses as ena-discovery.json,
ena-file-inventory.json and pride-file-pages.json. Save a combined
omics-file-inventory.csv and omics-discovery-notes.md. Keep generated
FASTQ, original submitted files and PRIDE records distinct. Preserve
every supplied location, size and checksum; do not infer missing values
or checksum algorithms. State query limits and pagination. Do not download
data files. Keep everything in English and report actual empty results.
```

![Conditions de demande et résultats des inventaires ENA et PRIDE observés](/img/open-science/v0320/omics-discovery-notes.webp)

4. Comparez les deux inventaires pour l'exécution ENA sélectionnée. Dans cet exemple, la requête renvoie **5 tourne** avec `truncated: true`. La première sortie, **SRR077868**, a **Archives 1 FASTQ**, taille **octets 462,508,712** et un MD5 en amont. Son inventaire de présentation originale a `found: true` mais `submitted_available: false` et **Fichiers 0**. Il n'est donc pas nécessaire de fournir les deux inventaires.
5. Inspectez les pages PRIDE. **PXD000001** retourne **Enregistrements 5 à la page 0** et **4 à la page 1**, avec `api_total: 9` et `next_page: null` final. Le CSV combiné a **Lignes 19** parce que chacun des neuf fichiers PRIDE fournit deux emplacements, à côté de la ligne ENA FASTQ. Compter les adhésions de fichiers séparément des lieux de téléchargement.

![Entrées ENA et PRIDE dans le tableau d'inventaire généré](/img/open-science/v0320/omics-file-inventory.webp)

<ExampleDownload path="/examples/v0320/omics-discovery-notes.md">Demandes de renseignements</ExampleDownload> · <ExampleDownload path="/examples/v0320/omics-file-inventory.csv">Inventaire combiné</ExampleDownload> · <ExampleDownload path="/examples/v0320/ena-discovery.json">Découverte de l'ENA</ExampleDownload> · <ExampleDownload path="/examples/v0320/ena-file-inventory.json">Inventaires des fichiers ENA</ExampleDownload> · <ExampleDownload path="/examples/v0320/pride-file-pages.json">Pages PRIDE</ExampleDownload>

La sortie est un inventaire de fichiers, non téléchargé séquençage ou données protéomiques. Archive FASTQ et les soumissions originales telles que BAM/CRAM sont des produits différents. Gardez le chemin FTP original d'ENA littéralement, y compris tout caractère `#`. Pour PRIDE, utilisez `next_page` et les métadonnées retournées; `api_total` peut être absent pour d'autres projets, et le texte de checksum n'identifie pas toujours son algorithme. Avant un téléchargement séparé, sélectionnez le format requis, vérifiez le stockage et vérifiez les octets lorsqu'un somme de contrôle en amont est disponible. Voir le [Référence de l'opération](../reference/connector-operations.md#ena_query_runs) pour les entrées exactes.
