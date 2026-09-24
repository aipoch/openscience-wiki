---
title: "Répertoire Skill"
last_update:
  date: '2026-09-24'
---

# Répertoire Skill {/* #skill-directory */}

L'application fournit **23 groupé Skills**. Ce répertoire les regroupe par le travail qu'ils supportent. Les entrées décrivent la méthode expédiée; ils ne prétendent pas que chaque modèle, dépendance ou service externe est installé.

Pour les méthodes distribuées via l'application, utilisez le [Guide d'installation du marché](marketplace.md). Le répertoire ci-dessous vous aide à choisir une méthode de recherche; il n'est pas un inventaire en direct des versions du marché.

## Vérifier l'état de préparation avant de sélectionner une méthode {/* #check-readiness-before-selecting-a-method */}

1. Ouvrez le Skill dans Paramètres et lisez ses exigences complètes et les avis de tiers.
2. Comparez le type d'entrée avec vos données réelles. Une table en vrac RNA-seq n'est pas un objet AnnData à cellule unique; un dessin moléculaire n'est pas un résultat d'arrimage.
3. Inspectez le temps d'exécution et les paquets sélectionnés. Pour le travail à distance, sélectionnez un serveur de calcul utilisable et inspectez son environnement avant de soumettre.
4. Demander une exécution limitée, inspecter la sortie réelle et conserver les références d'entrée/version avant d'augmenter l'échelle.

Deux autres entrées manifestes, la conscience de soi et la création de compétences, sont des ressources du cadre interne. Ils ne sont pas des entrées de répertoire orientées vers l'utilisateur. Les Skills personnels ou importés, y compris rnaseq-count-qc, sont séparés du nombre de 23.

L'application Environnement Skills et Personnaliser le séjour activé; Voir [règles d'activation](overview.md#why-some-switches-cannot-be-turned-off). Utilisez le [manifeste groupé](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/manifest.json) pour identifier les méthodes expédiées et [Calcul à distance](../guides/remote-compute.md) pour la configuration de l'hôte et la livraison des résultats.

## L'innovation par tâche de recherche {/* #browse-by-research-task */}

### Structure protéique {/* #protein-structure */}

| Compétence | Entrée | Dépendances et exécution | Produit à inspecter |
| --- | --- | --- | --- |
| [AlphaFold2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/alphafold2/SKILL.md) · `alphafold2` | Protéines FASTA; monomère ou complexe | ColabFold, poids du modèle, GPU; service public optionnel MSA | Structures prévues et scores de confiance |
| [Boltz](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/boltz/SKILL.md) · `boltz` | Caractéristiques du complexe protéique/ADN/ARN/ligand | Boîte à boltz, poids, GPU; Accès MSA sur demande | Structure complexe et confiance; sortie d'affinité optionnelle |
| [Chai-1](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/chai1/SKILL.md) · `chai1` | FASTA à entités multiples | poids, poids, GPU | Complexe tout-atome et confiance |
| [ESMFold2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/esmfold2/SKILL.md) · `esmfold2` | Séquences ou entrées complexes | Paquet Biohub esm, poids, CUDA; distinct du fair-esm | les prévisions de structure; Représentations de l'ESMC sur demande |
| [OuvrirFold3](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/openfold3/SKILL.md) · `openfold3` | Caractéristiques des protéines/acides nucléiques/ligands | OpenFold3, poids/accès, CUDA et noyaux configurés | Structures et scores complexes |

### Conception des protéines {/* #protein-design */}

| Compétence | Entrée | Dépendances et exécution | Produit à inspecter |
| --- | --- | --- | --- |
| [DiffDock](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/diffdock/SKILL.md) · `diffdock` | Cible PDB plus ligand SMILES/SDF | DiffDock dépôt, poids et GPU | poses de ligand classé; poser la confiance n'est pas l'affinité |
| [ProtéinesMPN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/proteinmpnn/SKILL.md) · `proteinmpnn` | PDB à os, chaînes et résidus conçus/fixés | Dépôt, points de contrôle, torche/numpy; petits emplois soutien CPU | Séquences et partitions conçues |
| [LigandMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/ligandmpnn/SKILL.md) · `ligandmpnn` | Contexte de ligand/métal/acide nucléique | Dépendances du dépôt et de la Python; petits emplois soutien CPU | Séquences et structures filetées |
| [SolubleMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/solublempnn/SKILL.md) · `solublempnn` | Obstacles protéiques | dépôt de protéinesMPNN et points de contrôle solubles; CPU possible | Séquences selon le modèle soluble précédent |

### Séquence et cellules {/* #sequence-and-cells */}

| Compétence | Entrée | Dépendances et exécution | Produit à inspecter |
| --- | --- | --- | --- |
| [ESM-2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md) · `fair-esm2` | Séquences protéiques | fair-esm et poids; La procédure groupée utilise GPU | Embeddings, logits ou prévisions de contact |
| [Borzoï](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/borzoi/SKILL.md) · `borzoi` | Fenêtres d'ADN avec génome/coordonnées indiqués | borzoi-pytorch, poids et CUDA | Voies génomiques ou deltas de référence/alternats prévus |
| [Evo 2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/evo2/SKILL.md) · `evo2` | Séquences ou préfixes d'ADN | Poids Evo 2, CUDA compatible et mémoire suffisante | Risques de séquence, d'intégration ou d'ADN généré |
| [SPGPT](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scgpt/SKILL.md) · `scgpt` | AnnData monocellulaire avec cartographie du vocabulaire génétique | paquet scGPT, point de contrôle et GPU | Extrants d'intégration de cellules ou d'annotation |
| [scvi-outils](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scvi-tools/SKILL.md) · `scvi-tools` | Nombre de cellules uniques et métadonnées par lots/étiquettes | scvi-tools/scanpy/anndata; flux de travail de formation groupé attend GPU | Représentation latente, transfert d'étiquettes ou comparaison fondée sur le modèle |

### Preuves et écriture {/* #evidence-and-writing */}

| Compétence | Entrée | Dépendances et exécution | Produit à inspecter |
| --- | --- | --- | --- |
| [Revue de littérature](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/literature-review/SKILL.md) · `literature-review` | Questions, identifiants ou documents de recherche | la récupération des sources; Clé OpenAlex pour OpenAlex | Synthèse des preuves vérifiées et citations |
| [Dossier d'indication](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/indication-dossier/SKILL.md) · `indication-dossier` | Une indication encadrée comme une population de patients | Outils de recherche et accès aux sources | Points de repère et dossier de recherche récupérables |

### Environnement {/* #environment */}

| Compétence | Entrée | Dépendances et exécution | Produit à inspecter |
| --- | --- | --- | --- |
| [Environnement & Packages](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/env-management/SKILL.md) · `env-management` | Question concernant le paquet ou la version manquants | Durée d'exécution de Python/R sélectionnée et source de paquet autorisée | Inspection du colis, installation gérée et contrôle des importations |
| [Configuration de l'environnement de calcul](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/compute-env-setup/SKILL.md) · `compute-env-setup` | Environnement nommé sur un hôte SSH/Slurm | Configuration de l'hôte et activation gérée par l'utilisateur/l'administrateur | Instructions de configuration et enregistrement de validation |
| [Calcul à distance (SSH)](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/remote-compute-ssh/SKILL.md) · `remote-compute-ssh` | Une charge de travail et un hôte de calcul admissible | Identification SSH, hôte, planificateur, le cas échéant | Travail soumis, résultats récoltés et artefacts publiés |

### Auteurs {/* #authoring */}

| Compétence | Entrée | Dépendances et exécution | Produit à inspecter |
| --- | --- | --- | --- |
| [Personnaliser](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/customize/SKILL.md) · `customize` | Un changement demandé Skill ou Specialist | Agent de travail; Opérations de personnalisation native | Paquet ou rôle sauvegardé avec vérification de lecture |
| [Style de la figure](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-style/SKILL.md) · `figure-style` | Données réelles et un chiffre final | Fonction Notebook et dépendances de tracé | Emplacement inspecté avec des étiquettes lisibles et des données fidèles |
| [Figure Compositeur](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-composer/SKILL.md) · `figure-composer` | Une revendication et des références immuables de version de données | Main Agent, délégation, tracé et examen | Chiffres à plusieurs panneaux et itérations d'examen |
| [Exposé des motifs](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/paper-narrative/SKILL.md) · `paper-narrative` | Manuscrit/abstraction, sous-titres et jeu de figures ordonné | Versions d'artefacts au sol et outils d'examen | Un mémoire papier et un argument de figure ordonné |



Référence de mise en œuvre: [manifeste.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json).
