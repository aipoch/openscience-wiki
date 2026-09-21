---
title: "Connectez un outil personnalisé MCP"
last_update:
  date: '2026-09-14'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';


import ExampleDownload from '@site/src/components/ExampleDownload';

# Connectez un outil personnalisé MCP {/* #connect-a-custom-mcp-tool */}

<p className="example-label"><strong>Exemple pratique</strong> Interroger une table de QC publique par l'intermédiaire d'un serveur local MCP</p>

Cet exemple expose une table publique RNA-seq QC existante à travers un petit serveur local MCP. Il lit un CSV fixe et offre deux opérations; il ne interroge pas le réseau, n'installe pas de paquets ou ne modifie pas l'ensemble de données.

<PlatformGuide />

## Télécharger l'exemple réel {/* #download-the-actual-example */}

- <ExampleDownload path="/examples/capabilities/qc-mcp-server.py">qc-mcp-serveur.py</ExampleDownload>
- <ExampleDownload path="/examples/gse60450/rnaseq-sample-qc.csv">Les résultats de l'analyse de l'impact sur l'environnement sont présentés ci-après.</ExampleDownload>

Enregistrez les deux fichiers localement et notez leurs chemins complets. Le serveur utilise la bibliothèque standard de Python. Il lit le CSV sélectionné au démarrage, donc redémarrez/reconnectez-le délibérément si vous remplacez cette entrée.

## Ajoutez-le dans Open-Science {/* #add-it-in-open-science */}

1. Ouvrez **Settings → Connectors → Add connector → Local command**.
2. Définit **Display name** à `GSE60450 QC`.
3. Choisissez **python3 — script file** comme **Command**, ou **Other…** avec le chemin exécutable réel Python sur Windows.
4. Ouvrez **Advanced settings**. Définissez le nom/ID du connecteur à `gse60450-qc` et décrivez-le comme un accès en lecture seule à la table QC sauvegardée.
5. Dans **Arguments**, placez le chemin absolu du script sur la première ligne et le chemin absolu du CSV sur la seconde. Chaque ligne est un seul argument. N'ajoutez pas de guillemets shell autour d'un chemin simplement parce qu'il contient des espaces.
6. Laisser l'environnement vide pour cet exemple. Vérifiez le script du serveur, vérifiez **I trust this connector**, puis **Add**.
7. Rechercher `GSE60450` et confirmer **Connected** et la disponibilité pour Main Agent.

<PlatformContent platform="macos">

![Configuration locale réelle MCP](/img/open-science/capabilities-walkthrough/08-mcp-local-config.webp)

</PlatformContent>

<PlatformContent platform="macos">

```text
/absolute/path/qc-mcp-server.py
/absolute/path/rnaseq-sample-qc.csv
```

</PlatformContent>

<PlatformContent platform="linux">

```text
/absolute/path/qc-mcp-server.py
/absolute/path/rnaseq-sample-qc.csv
```

</PlatformContent>

<PlatformContent platform="windows">

```text
C:\Research data\mcp test\qc-mcp-server.py
C:\Research data\mcp test\rnaseq-sample-qc.csv
```

</PlatformContent>

Ces deux lignes sont un modèle de chemin, pas des chemins littéraux à coller inchangé. Si `python3` n'est pas disponible dans l'application, choisissez Autre et le chemin exécutable réel. Le lanceur sélectionné doit exister sur cet ordinateur.

<PlatformContent platform="windows">

Sur Windows, utilisez **Other…** pour entrer le chemin complet vers un `python.exe` installé; le préréglage `python3` n'établit pas que la commande existe. Confirmez le chemin de l'interprète dans [Environnements d'exécution](../guides/runtimes.md). Gardez le script et les chemins CSV sur deux lignes distinctes de **Arguments**, même lorsque leurs noms de dossiers contiennent des espaces. Ne combinez pas l'exécutable et les arguments en une seule commande shell.

</PlatformContent>

## Entrées d ' outils et produits vérifiés {/* #tool-inputs-and-verified-outputs */}

| Outil | Entrée | Contenu escompté effectif |
| --- | --- | --- |
| get_dataset_summary | Objet vide | GSE60450, URL source, nom de fichier d'entrée, lignes 12 et identifiants d'échantillon complets |
| get_sample_qc | `sample_id` chaîne de caractères | Les quatre mesures numériques de QC de l'échantillon sélectionné |

Demandez à l'agent :

> Utilisez le gse60450-qc Connector connecté. Appelez get_dataset_summary, puis get_sample_qc pour MCL1-DG_BC2CTUACXX_ACTTGA_L002_R1. Ne rapportez que les réponses réelles et conservez le CSV.

Dans cet exemple, l'application native a renvoyé **Nombres totaux de 23,227,641, gènes de nombre zéro 8,664, gènes détectés de 18,515 et 237 médian** pour cet échantillon. L'appel résumé des données a renvoyé les lignes 12. Celles-ci correspondent à la table originale de QC enregistrée.

<PlatformContent platform="macos">

![Le Connector personnalisé connecté avec succès](/img/open-science/capabilities-walkthrough/09-mcp-connected.webp)

</PlatformContent>

<PlatformContent platform="windows">

Ouvrez l'activité Notebook pour les deux appels d'outils, puis rouvrez le JSON enregistré et comparez ses exemples d'ID et de métriques avec le CSV. Le Windows exécuté ci-dessous utilise le connecteur ID `gse60450-qc-win`; utilisez votre propre ID configuré dans la requête.

![Windows appels locaux MCP avec sortie JSON et Notebook sauvegardés](/img/open-science/windows/mcp-tool-results.webp)

</PlatformContent>

## Inspecter le comportement du serveur et des erreurs {/* #inspect-the-server-and-error-behavior */}

Le serveur implémente MCP initialiser, ping, découverte d'outils et appels sur stdio. Ses deux schémas d'outils sont définis dans le script téléchargeable. La sortie standard est le canal de protocole; l'ajout d'imprimés de débogage ordinaires peut briser la connexion. Les diagnostics locaux appartiennent à l'erreur standard.

**Cartographie des erreurs connues :** un nom d'échantillon invalide peut faire surface comme **connector_unavailable** dans l'application même lorsque le serveur personnalisé retourne une erreur spécifique au domaine. Vérifiez le journal du serveur et validez l'identificateur de l'échantillon avant de vous reconnecter. Signaler des erreurs persistantes avec [Dépannage](../guides/troubleshooting.md).

L'application découvre les outils du serveur lors de la connexion. Utilisez les noms d'opération découverts lors de l'appel via `host.mcp`; protocole `tools/list` n'est pas un outil d'affaires. Inspectez le script téléchargeable pour le schéma d'entrée.

## Exporter et déplacer vers un autre ordinateur {/* #export-and-move-to-another-computer */}

Choisissez **Actions → Export** de la ligne, sélectionnez le format désiré et vérifiez l'aperçu de configuration. L'exportation réelle a mis en garde contre le fait que les deux chemins d'argument étaient locaux. **Save configuration** exporte les paramètres, pas les Python interprète, script ou CSV- Oui. Copiez ces fichiers séparément, mettez à jour les chemins, confirmez la confiance locale et répétez les deux appels réussis.

<PlatformContent platform="windows">

Pour **MCP client config**, inspectez `mcpServers` : cet exemple exporte un serveur avec un `command` et deux `args`. JSON affiche les contre-slashs échappés dans les chemins Windows. Sur un autre ordinateur, mettez à jour les trois chemins vers des fichiers réels et réessayez les deux appels. Une configuration exportée n'établit pas que l'ordinateur de destination est connecté.

</PlatformContent>

| Défaut | Vérifier |
| --- | --- |
| La commande ne peut pas démarrer | Chemin exécutable, chemin de script et permissions de fichiers |
| CSV ne peut pas être lu | Deuxième argument et emplacement réel du fichier |
| Connecté mais outil indisponible | Affectation d'agent, catalogue actuel et nom exact de l'outil |
| Mauvaise entrée | Obligatoire `sample_id` et l'identificateur complet original, et non l'étiquette de la parcelle compacte |
| Erreur Connector après un appel échoué | Inspecter les détails d'erreur serveur/application et se reconnecter le cas échéant |
| Fonctionne dans un terminal mais pas dans l'application | App-visible exécutable/environnement et protocole seulement stdout |

Pour étendre l'exemple, définissez un petit schéma d'entrée, retournez les identifiants de source et testez les entrées normales, vides et non valides avant d'exposer l'outil. Gardez ces opérations assez étroites pour qu'un utilisateur puisse inspecter ce que l'appel va lire ou changer.

Référence de mise en œuvre: [ConnecteurAddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx), [service.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/connectors/service.ts).

Pour gérer la même configuration personnalisée de MCP à partir de scripts, utilisez [Commandes Connector CLI](../reference/cli.md#manage-connectors-and-credentials) ou [Méthodes SDK](../reference/api.md#connector-management-methods). Un test de connexion réussi découvre des outils; vérifier un appel d'affaires limité séparé avant d'appeler l'intégration opérationnelle.
