---
title: "Spécialistes et rôles disponibles"
last_update:
  date: '2026-11-11'
---

# Spécialistes et rôles disponibles {/* #specialists-and-available-roles */}

Un Specialist est un rôle de recherche sauvegardé : identité, instructions et Skills/Connectors autorisés. Utilisez-en un lorsqu'une responsabilité récurrente nécessite une portée cohérente ou une sous-tâche distincte. Le nom d'un rôle à lui seul n'établit ni expertise ni vérification.

## Comprendre les rôles disponibles {/* #understand-the-available-roles */}

| Rôle ou source | Comment il est utilisé | Ce que vous pouvez configurer |
| --- | --- | --- |
| Agent principal | Gère la conversation et peut coordonner le travail délégué | Modèle de séance, contrôles des agents et capacités disponibles |
| Personnalisé Specialist | Créée localement pour une tâche de recherche définie | Identité, instructions, Skills/Connecteurs explicites ou accès complet |
| Importé / Marché Specialist | Installé à partir d'un paquet, puis configuré sur ce périphérique | Configuration locale et capacités autorisées; Inspecter l'éditeur et la version du paquet |
| Évaluateur intégré | Effectue le flux de travail d'examen de l'application | Réexamen déclencheur au cours de la conversation; ce n'est pas un Specialist normal modifiable/délégable |

Ouvrez **Marketplace** pour trouver les rôles publiés. Le catalogue en ligne peut changer indépendamment de votre application installée. Inspecter l'éditeur, les instructions et les dépendances de chaque rôle avant d'importer.

## Trouver un rôle {/* #find-a-role */}

Ouvrez **Resource center → Specialists**. **Installed** compte les rôles enregistrés localement, y compris l'examinateur. Utilisez **Search specialists** et **Filters → Filter specialists by category**, puis ouvrez une ligne pour l'inspecter. **Marketplace** ouvre un catalogue différent; une entrée de marché cotée n'est pas installée tant que vous n'avez pas terminé son flux de paquetage/configuration.

![Le RNA-seq QC Reviewer installé localement](/img/open-science/capabilities-walkthrough/06-specialist-list.webp)

## Rôles sur le marché observés {/* #marketplace-roles-observed */}

| Rôle | Portée de la recherche envisagée |
| --- | --- |
| Recherche automatique Specialist | Preuves biomédicales, analyse, validation et rédaction |
| Validation de la structure Cryo-EM Specialist | Planification de la validation de la demi-carte, de la géométrie et du modèle de carte |
| Pharmacométrie PK/PD Conception Specialist | Conception de la recherche PK/PD et contrôles de l'incertitude |
| Multimodal Neuroimaging Connectomics Architecte | Flux de travail IRM/IRMf/diffusion et contrôles d'analyse de réseau |
| Route synthétique et optimisation des réactions Specialist | Preuves de planification des réactions et d'optimisation |
| Aérodynamique CFD Vérification et validation Specialist | Convergence numérique et planification de comparaisons expérimentales |
| Modélisation du transport par chimie atmosphérique Specialist | Études sur les émissions, les transports et l ' attribution des sources |
| Contrôle DFT à haut débit Specialist | Contrôles de convergence et de cohérence thermodynamique |
| Photométrie astronomique et analyse temporelle Specialist | Étalonnage, photométrie et analyses de variabilité |
| Conception de phénotypage et de prescription pour l'agriculture de précision Specialist | Phénotypage de l'UAV et processus de validation spatiale |

Ce sont des descriptions de catalogues observées, et non des preuves de dix workflows scientifiques achevés. L'examinateur du produit est également différent de la **RNA-seq QC examinateur** personnalisée utilisée dans ces chapitres.

## Choisir un itinéraire {/* #choose-a-route */}

- [Créer et instruire](./identity.md): définir un rôle de recherche local.
- [Attribuer des capacités](./capabilities.md): déterminer ce qu'il peut utiliser.
- [Délégué et vérifier](./delegate.md): Inspecter un essai d'enfant réel et ses preuves.
- [examinateur et auto-examen](./reviewer.md) : utilisez le processus d'examen intégré de l'application.
- [Gérer et partager](./manage.md): paquet, importer, résoudre les conflits et terminer la configuration locale.

Référence de mise en œuvre: [manifeste.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/specialists/manifest.json), [SpécialistesPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
