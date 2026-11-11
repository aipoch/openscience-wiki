---
title: "Récupérer des dossiers structurés à partir d'une base de données scientifique"
last_update:
  date: '2026-11-11'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Récupérer des dossiers structurés à partir d'une base de données scientifique {/* #retrieve-structured-records-from-a-scientific-database */}

<p className="example-label"><strong>Exemple pratique</strong> Sept acides carboxyliques à chaîne droite dans PubChem</p>

Commencez par les noms des composés et terminez par une table d'identificateurs et de propriétés vérifiés. Cet exemple récupère l'acide acétique par l'acide octanoïque, une série homologue de sept membres avec deux à huit atomes de carbone. Les enregistrements sources restent disponibles à côté du tableau afin que vous puissiez vérifier comment chaque valeur a été obtenue.

## 1. Définir les composés et les propriétés {/* #1-define-the-compounds-and-properties */}

Dans **Resource center → Connectors**, assurez-vous que **Chimie** est disponible. Ouvrez un projet, commencez une conversation et sélectionnez un modèle connecté. Cette exécution a utilisé Open-Science 0.30.1 et la Chimie/PubChem Connector; il n'a pas besoin d'un tableur d'entrée.

Spécifiez **acides monocarboxyliques saturés neutres, à chaîne droite**. Un nom similaire peut désigner un isomère ramifié, un sel ou une base conjuguée. Une formule à elle seule ne peut pas distinguer toutes ces structures.

```text
Use the Chemistry/PubChem Connector to retrieve acetic acid,
propanoic acid, butanoic acid, pentanoic acid, hexanoic acid,
heptanoic acid and octanoic acid. Resolve each name to a PubChem CID.
Retrieve molecular formula, molecular weight, the returned SMILES
and ConnectivitySMILES fields, InChIKey and the PubChem source URL.
Use neutral straight-chain acids, not branched isomers or salts.
Save pubchem-homologs.csv, pubchem-homologs-source.json and
pubchem-homologs-notes.md. Preserve exact lookup inputs and raw
responses. Check seven distinct CIDs, carbon counts 2–8, formulas
CnH2nO2, neutral charge and linear structures. Reopen the files.
Keep all outputs in English and do not delegate.
```

![La portée complexe et les fichiers demandés dans la conversation réelle](/img/open-science/workflow-extensions/pubchem-input.webp)

## 2. Vérifiez les appels de base de données réels {/* #2-check-the-actual-database-calls */}

Après l'envoi, étendez l'activité de l'outil ou ouvrez **Notebook**. L'exécution a résolu sept noms avec `pubchem_search_compounds`, puis a récupéré leurs enregistrements avec `pubchem_get_compounds`. Inspectez le CID et la structure retournés pour chaque nom avant d'accepter la ligne. Si un nom renvoie plusieurs identités plausibles, résolvez d'abord cette ambiguïté.

L'exemple a utilisé des noms exacts d'acide et le premier CID retourné, puis a vérifié les propriétés du lot. Ceci convient à ces noms sans ambiguïté; prendre le premier coup n'est pas une règle d'identification générale.

![L'activité de requête réelle et la lecture de fichier sauvegardé dans Notebook](/img/open-science/workflow-extensions/pubchem-lookup.webp)

## 3. Ouvrir la table enregistrée {/* #3-open-the-saved-table */}

Attendez que la réponse soit terminée et que les fichiers apparaissent sous **Generated**. Ouvrez **pubchem-homologs.csv** et agrandissez son aperçu. Cette exécution a produit **Lignes 7 · Colonnes 8**.

| Composé | CID de PubChem | Formule | Poids moléculaire, g/mol |
|---|---:|---|---:|
| Acide acétique | 176 | Autres produits | 60.05 |
| Acide propanoïque | 1032 | C3H6O2 | 74.08 |
| Acide butanoïque | 264 | Autres produits | 88.11 |
| Acide pentanoïque | 7991 | C5H10O2 | 102.13 |
| Acide hexanoïque | 8892 | Autres produits | 116.16 |
| Acide heptanoïque | 8094 | C7H14O2 | 130.18 |
| Acide octanoïque | 379 | Autres produits | 144.21 |

![La réouverture de sept composés CSV](/img/open-science/workflow-extensions/pubchem-table.webp)

Corriger les lignes par **CID**, pas leur ordre d'affichage. Vérifiez la formule et les SMILES linéaires ensemble. L'exemple conserve les noms de champs retournés, `SMILES` et `ConnectivitySMILES`; Leurs cordes correspondent à ces composés. Ne pas renommer l'un comme un autre identifiant ou en déduire la stéréochimie expérimentale.

## 4. Conservez les enregistrements sources avec l'exportation {/* #4-keep-the-source-records-with-the-export */}

Ouvrez **pubchem-homologs-source.json** pour inspecter les huit opérations, les entrées de recherche exactes et les réponses brutes. Ouvrez **pubchem-homologs-notes.md** pour la procédure et les contrôles. Le CSV enregistré a été comparé aux enregistrements bruts; les sept identités, formules et structures linéaires ont convenu.

![La procédure sauvegardée, les résultats de validation et les limites d'interprétation](/img/open-science/workflow-extensions/pubchem-notes.webp)

Utilisez le bouton **Download** de l'aperçu pour conserver une copie locale. Pour cette exécution terminée, téléchargez les <ExampleDownload path="/examples/workflow-extensions/pubchem-homologs.csv">CSV</ExampleDownload>, <ExampleDownload path="/examples/workflow-extensions/pubchem-homologs-source.json">les enregistrements sources</ExampleDownload> et <ExampleDownload path="/examples/workflow-extensions/pubchem-homologs-notes.md">Remarques</ExampleDownload>. Les enregistrements PubChem peuvent changer; conserver l'instantané source avec votre analyse.

Il s'agit de propriétés calculées par base de données ou normalisées, et non de nouvelles mesures expérimentales. Le poids moléculaire n'est pas la masse monoisotopique exacte, et ce tableau n'établit pas la pureté, la toxicité ou l'activité biologique. Pour comparer les enregistrements de sources contradictoires, continuer avec [recoupement des données scientifiques](cross-check-records.md).
