---
title: "Formats et limites des fichiers"
last_update:
  date: '2026-11-19'
---

# Formats et limites des fichiers {/* #file-formats-and-limits */}

Regardez le routage des fichiers et les limites ici. Télécharger un fichier, le prévisualiser, l'analyser dans un outil et l'envoyer à un modèle sont des capacités distinctes. Un téléchargement accepté n'est pas une promesse d'un visionneur en ligne ou d'une compréhension de modèle.

<span id="input-and-preview" />

<span id="file-names-and-versions" />

<span id="large-and-binary-files" />

## Aperçu du routage {/* #preview-routing */}

| Contenu | Extensions reconnues | Comportement et frontière |
| --- | --- | --- |
| Image rasoir/vecteur | `avif`, `gif`, `jpeg`, `jpg`, `png`, `svg`, `webp` | Aperçu de l'image; l'entrée du modèle dépend toujours du support de l'image |
| TIFF | `tif`, `tiff` | Décodeur dédié avec limites de fichiers, pixel et mémoire |
| Tableau délimité | `csv`, `tsv` | La première ligne est traitée comme des en-têtes; lignes/colonnes délimitées |
| Séquence | `fa`, `faa`, `fasta`, `ffn`, `fna`, `frn` | Inspection FASTA; l'observation ne valide pas une méthode d'analyse |
| Structure | `pdb` | Visionneuse de structure; pas une évaluation de la qualité d'une prédiction |
| Molécule/réaction | `mol`, `sdf`, `smi`, `smiles`, `rxn` | Aperçu moléculaire dédié; ne pas supposer `mol2` a le même routage |
| PDF | `pdf` | Lecteur de document dédié avec contrôle de page |
| Mots | `docx` | Lecteur de bureau; héritage `doc` n'est pas acheminé vers DOCX analyse |
| Feuille de calcul | `xls`, `xlsx` | Aperçu du tableur de bureau; l'exécution du modèle est une opération séparée |
| Présentation | `pptx` | Aperçu et présentation [Édition de diapositives](../guides/presentation-editing.md); héritage `ppt` n'est pas acheminé vers l'analyse PPTX |
| Marquage | `md`, `markdown` | Document rendu, avec des actions de version de texte supportées |
| HTML | `htm`, `html` | Aperçu HTML isolé; ne reçoit pas de privilèges d'application |
| JSON | `json` | Aperçu structuré, y compris le plan reconnu JSON |
| Code | `bash`, `bib`, `bibtex`, `css`, `js`, `jsx`, `py`, `r`, `sh`, `tex`, `ts`, `tsx` | Source mise en évidence; l'ouverture d'un script ne l'exécute pas |
| Texte simple | `conf`, `config`, `ini`, `iqtree`, `log`, `nwk`, `state`, `toml`, `tree`, `treefile`, `txt`, `xml`, `yaml`, `yml` | Aperçu du texte bombé |
| Autres fichiers | Extension/contenu non reconnu | Retour/téléchargement le cas échéant; `.ipynb` export n'implique pas un éditeur dédié de prévisualisation de fichiers |

Le routeur dispose également d'un repli MIME étroit pour les fichiers sans extension appropriés. Les métadonnées Office MIME erronées ne rendent pas un format d'héritage compatible avec un rendu OOXML.

[Tableau de routage exact](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/preview-support.ts), [registre de rendu](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/preview-registry.tsx).

<span id="image-model-limits" />

## Limites de taille et d'affichage {/* #size-and-display-limits */}

Les unités ci-dessous sont des unités binaires: 1 MiB = 1,048,576 octets; 1 GiB = octets 1,073,741,824. L'interface peut marquer ces valeurs MB ou GB.

| Limite | Limite de la source | À quoi s'applique la limite |
| --- | ---: | --- |
| Téléchargement d'un projet | 10 GiB | Télécharger l'admission, pas un budget d'aperçu ou de contexte modèle |
| Un morceau de téléchargement | 8 MiB | Transférer la taille du morceau; pas une limite par fichier orientée vers l'utilisateur |
| Pièces jointes pour compositeurs | 10 | Nombre de pièces jointes par message |
| L'artefact compositeur mentionne | 10 | Références explicites d'artefacts par message |
| Vue par défaut du texte lu | 1 MiB | Contenu initial limité lu |
| Aperçu générique maximum demandé lu | 10 MiB | plafond de lecture générique; les lecteurs spécialisés ont leurs propres limites |
| Données visibles CSV/TSV | Lignes 100 × colonnes 24 | Données affichées après la première ligne/en-tête; pas la taille de l'ensemble de données source |
| Aperçu des fichiers Office | 40 MiB | Accès prévu au bureau |
| Aperçu du fichier TIFF | 40 MiB | Limite de fichier TIFF dédiée |
| pixels décodés TIFF | 25,000,000 | Aperçu du budget de décodage des pixels |
| Attribution décodée TIFF | 256 MiB | Prévisualiser le budget mémoire du décodeur |
| Nombre de pages TIFF | 512 | le capuchon de page avant le vol; d'autres plafonds structuraux s'appliquent également |
| Extraction/acquisition automatique PDF | 50 MiB | Chemin automatique de texte/d'acquisition PDF; ne pas le considérer comme la limite générale de la charge de projet |

Appliquer les limites énumérées à l'opération pertinente : les limites d'aperçu, les limites de téléchargement et les budgets de paquets sont séparés. Pour un fichier surdimensionné, utilisez le fichier original avec un lecteur externe compatible ou divisez l'entrée selon la méthode.

Une table indiquant **Affichage des lignes 100** peut contenir plus de lignes sources. Utilisez l'analyse réelle du fichier dans le Notebook pour établir sa taille. Dans le cas GSE60450, la source a des lignes de gènes 27,179 tandis que l'échantillon QC CSV a douze lignes : les deux fichiers résument différentes unités.

[Limites de chargement](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/uploads.ts), [Limites CSV](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/renderers/CsvPreview.tsx), [limites du lecteur de texte](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/usePreviewFileContent.ts), [Limites des bureaux](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/office-preview.ts), [Limites TIFF](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/previews/tiff-preview-types.ts), [PDF limite d'extraction](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/uploads/attachment-media.ts).

## Importation de littérature et production de citations {/* #literature-import-and-citation-output */}

| Objet | Contrat | Distinction |
| --- | --- | --- |
| Importation de documents de référence | BibTeX, RIS, NBIB | Importations de notices bibliographiques; ne garantit pas le texte intégral joint |
| Importer le contenu | Jusqu'à 32 MiB, avec un enregistrement 1,000 lié | Séparer les plus grandes collections en lots examinés |
| Importation de type citation | CSL, jusqu'à 1 MiB | Une définition de style, pas une collection de littérature |
| Exportation de documents bibliographiques | BibTeX ou RIS | Ne présumez pas que l'importation de NBIB implique l'exportation de NBIB |
| Citation formatage local | `en-US`, `zh-CN` | Citation locale est séparée de la langue de l'interface utilisateur de demande |
| Nom de la collection | Caractères 200 | Une étiquette de collection |
| Désignation de la collecte | Caractères 1,000 | Décrit la collection; ne remplace pas le contexte de l'agent de projet |

Un résultat de métadonnées DOI n'est pas un PDF téléchargé. Un PDF ci-joint n'est pas une preuve que l'agent a lu son texte intégral. Vérifiez à la fois la pièce jointe et l'enregistrement d'exécution/d'évidence réel.

[Schémas et limites de la littérature](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/literature.ts), [Importation/exportation de matière](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/literature/citation-formatter.ts).

## Version et nom de téléchargement {/* #version-and-download-identity */}

| Identificateur | Utilisation | Ne pas remplacer |
| --- | --- | --- |
| Nom d'affichage | Trouver un fichier dans l'interface | Un nom seul n'identifie pas le contenu immuable |
| ID du fichier/de l'artefact | Identifier l'objet géré | Un chemin téléchargé n'est pas l'identité de cet objet |
| Numéro de version / `vN` | Inspectez la révision sauvegardée exacte et sa provenance | Le dernier contenu peut différer de la version utilisée pour un résultat |
| Somme de contrôle | Comparer les octets entre la source et les copies sauvegardées | Les noms correspondants n'établissent pas de somme de contrôle correspondant |
| Télécharger destination | Localiser une copie externe | Modifier cette copie ne met pas automatiquement à jour la version gérée |

Pour les étapes de fonctionnement, utilisez [Notebook et éléments de preuve](../guides/notebook.md) et [flux de travail des données publiques](../workflows/data-quality.md). Cette référence centralise les limites afin que ces guides puissent se concentrer sur la tâche.

Pour les contrôles spécifiques au format, voir [Contrôles d'aperçu](../guides/previews.md#diagram-source-and-format-specific-controls): Sirène source / commutation de rendu, l'état de lecture PDF d'une seule page, les tables délimitées, la sélection des feuilles de travail et le traitement des pages TIFF. Le support de prévisualisation n'établit pas l'entrée ou l'exportation réussie du modèle.
