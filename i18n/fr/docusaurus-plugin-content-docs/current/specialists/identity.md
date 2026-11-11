---
title: "Créer et instruire un Specialist"
last_update:
  date: '2026-11-11'
---

# Créer et instruire un Specialist {/* #create-and-instruct-a-specialist */}

<p className="example-label"><strong>Exemple</strong> Créer un rôle d'examinateur RNA-seq QC</p>

Créez **RNA-seq QC examinateur** pour vérifier un résultat de compte brut indépendamment. L'exemple se concentre sur les identificateurs, l'exhaustivité numérique et les invariants arithmétiques, en gardant l'interprétation biologique en dehors de cette vérification limitée.

## Rendre la responsabilité testable {/* #make-the-responsibility-testable */}

Indiquez l'entrée et la sortie attendue, non seulement vous êtes un expert. Un examen des métadonnées seulement ne doit pas prétendre avoir recalculé les chiffres originaux. Pour le retrait du fichier, utilisez une version immuable courante retournée par l'application; un nom de fichier n'est pas une identité de version.

Le rôle sauvegardé a été créé, rouvert, exporté, dupliqué et utilisé dans un examen réel délégué en ligne-CSV. Son arithmétique indépendant a réussi les douze invariants de l'échantillon. Voir [Délégué et vérifier](./delegate.md) pour la limite des preuves et la limitation de la mainlevée des fichiers.

## Créer le rôle {/* #create-the-role */}

1. Ouvrez **Resource center → Specialists → Add specialist → Write from scratch**.
2. Entrez **RNA-seq QC examinateur** comme nom et **Vérifier l'intégrité des comptes bruts et les mesures des échantillons à l'aide d'intrants biomédicaux publics traçables.** comme description.
3. Choisissez une icône et une couleur. L'exemple utilise **Cerveau / violet**. L'aperçu en direct montre l'apparence list/picker.
4. Expandez **Advanced settings** et inspectez l'ID `rna-seq-qc-reviewer` généré avant la création.
5. Entrez les instructions ci-dessous.
6. Désactivez **Full access**, assignez les archives RNA-seq Skill et Omics comme indiqué dans [Capacités](./capabilities.md), puis sélectionnez **Create specialist**.
7. Recherchez la ligne enregistrée et rouvrez-la. Confirmez l'identité exacte, les instructions et deux liaisons de capacité.

![Champs d'identité dans l'éditeur français Specialist](/img/open-science/capabilities-walkthrough/04-specialist-identity.webp)

```text
You review bulk RNA-seq raw-count quality. Use the rnaseq-count-qc Skill when validating a count matrix. For a precomputed QC table, inspect the full sample identifiers, numeric completeness, nonnegative values, and whether zero-count plus detected genes equals the stated gene count. Use available Notebook tools for arithmetic; do not install new packages for this bounded review. Cite source filenames and actual outputs. Separate verified findings from unresolved checks. Never infer differential expression, clinical significance, or quality cutoffs from library totals alone. For metadata queries, use only the assigned Omics Archives connector. Return a concise PASS/FAIL table and the limitations of the available input.
```

### Contrôles de l'éditeur {/* #editor-controls */}

| Champ | Signification et limite |
| --- | --- |
| Icône / Couleur | Apparence seulement; modifier ces derniers ne modifie pas le modèle ou l'accès. |
| Nom | Requis; jusqu'à des caractères 80. |
| Descriptif | Facultatif; jusqu'à des caractères 1,000. Décrit quand choisir le rôle. |
| Paramètres avancés → ID Specialist | Généré avant la création; ne peut pas changer après. Utilisez l'ID sauvegardé dans une délégation explicite. |
| Instructions | Jusqu'à 32,768 caractères. Appliquée à l'invite de base; ne remplace pas les outils ou les règles d'accès. |
| Accès complet | Heritages Main Agents Skills/Connecteurs; indépendamment du mode d'homologation. |
| Skills / Connecteurs | Reliures explicites lorsque l'accès complet est désactivé. |
| Annuler | Je refuse le brouillon. |
| Créer un spécialiste | Enregistre un nouveau rôle. |
| Afficher le nom / Version du paquet / Enregistrer les modifications | Apparaît lors de l'édition d'un paquet existant/importé. L'identité stockée reste fixe. |

Référence de mise en œuvre: [SpécialisteEditor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistEditor.tsx).
