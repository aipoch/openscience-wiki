---
title: "Connecteurs et identifiants"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Connecteurs et identifiants {/* #connectors-and-credentials */}

Un Connector met les outils d'un service à la disposition d'un agent. Un Crédentiel fournit l'authentification lorsque ce service l'exige. L'installation d'un Skill ou l'attribution d'une balise ne connecte pas le service.

Dans la gestion des lots, examiner le nombre sélectionné dans la zone d'action inférieure avant d'appliquer une opération. Lisez les commentaires d'achèvement ou d'échec là-bas, puis vérifiez les éléments résultants. Sélectionner une entrée seule ne l'active pas, ne l'installe pas ou ne la supprime pas.

## Utiliser un Connector intégré {/* #use-a-built-in-connector */}

### Trouver des outils pour un projet d'expression génétique {/* #find-tools-for-a-gene-expression-project */}

Ouvrez **Settings → Connectors**, recherchez **Archives Omics** et ouvrez ses détails. Cette famille intégrée comprend des outils GEO, ArrayExpress, MetaboLights, MGnify et PRIDE. Élargir une rangée d'outils avant de la choisir.

![Outil de métadonnées GEO et sa limite de téléchargement explicite](/img/open-science/guides-walkthrough/36-omics-tools.webp)

`geo_get_series` retourne les métadonnées de la série GEO, les échantillons, les plates-formes et les URL de fichiers supplémentaires. Téléchargez le tableau de données requis à partir de la source retournée et joignez-le à votre projet avant de demander un calcul.

Assignez une balise telle que **Transcriptomique** à un Connector, puis trouvez-la sous **Settings → Tags**. Les étiquettes organisent les ressources sans modifier l'accès ou l'approbation des outils.

| État | Ce qu'il établit | Prochaine vérification |
| --- | --- | --- |
| Inscrit dans le répertoire | L'application connaît une définition de Connector | Lire ses descriptions d'outils actuelles |
| Used by | Disponibilité des agents | Confirmer l'agent visé et l'obligation de capacité |
| Crédentiel sélectionné | Une liaison nommée existe | Tester l'authentification par rapport au service prévu |
| Politique en matière d'outils | Indique si les appels sont autorisés, demandés ou bloqués | Inspecter la préséance de l'autorisation |
| Résultat de l'outil réussi | Cet appel particulier est terminé | Valider les identifiants/données et la source retournés |

### Commandes Connector intégrées {/* #built-in-connector-controls */}


Utilisez **Search connectors** pour trouver PubMed sous **Directory**; la liste contient également les groupes **Featured** et **Custom**. Filtrage s'applique par groupe, donc un autre groupe peut dire **Aucun connecteur ne correspond à votre recherche** alors qu'un résultat correspondant reste visible ci-dessous.

Utilisez **Filter connectors by group**, **Filter Connectors by agent** et **Filter by Tag** avec recherche. **Manage credentials** ouvre les paramètres de contact-email/crédentiel partagés. **Used by** montre la disponibilité; **Manage Tags** organise un Connector. Utilisez le contrôle **Manage access** de la ressource pour examiner et ajuster l'accès pour Main Agent et Spécialistes en un seul endroit.

#### Gérer l'accès pour chaque agent {/* #resource-access */}

1. Trouvez un Connector sous **Settings → Connectors** et choisissez son contrôle **Manage access**.
2. Examiner **Agent principal** et les spécialistes énumérés. Recherchez la liste des rôles lorsque disponible. Modifier uniquement l'association prévue; l'éditeur de rôle reste un autre moyen de gérer sa liste de capacités.
3. Réouvrir le popup et vérifier **Used by**. Une liaison peut rester assignée à un Specialist désactivé; L'attribuer ne permet pas ce rôle.

![Accès Connector pour Main Agent et spécialistes individuels](/img/open-science/v0330/resource-access.webp)

Pour un rôle avec **Full access**, l'exclusion de ce Connector crée une exception par ressource. Un rôle avec un accès sélectionné utilise sa liste explicite. Les liens de rôle sur le marché peuvent être lus uniquement ici. Les titres de compétence, l'état de préparation du serveur et l'approbation de l'exploitation sont distincts de ces associations; l'attribution d'un Connector ne remplit pas ces étapes.

#### Activer ou désactiver plusieurs connecteurs {/* #enable-or-disable-several-connectors */}

Ouvrez **Settings → Connectors**, filtrez la liste, choisissez **Select multiple** dans le groupe pertinent et sélectionnez les connecteurs prévus. Examinez le nombre sélectionné avant de les activer ou de les désactiver, puis vérifiez chaque état retourné. Ne conservez que les services nécessaires à votre travail. Les changements de disponibilité en vrac ne fournissent pas d'identifications, ne modifient pas les politiques d'approbation par outil ou n'accordent pas d'accès Specialist; Configurez-les séparément.

#### PubMed: disponibilité, outils et politique d'approbation {/* #pubmed-availability-tools-and-approval-policy */}

1. Rechercher **PubMed** et ouvrir ses détails.
2. Expand **search_articles** pour lire sa description. Il retourne un nombre et une page de PMIDs et prend en charge les balises de requête PubMed, les opérateurs booléens, les dates et le tri.
3. Choisissez **Require approval**, **Block** ou **Always allow** pour l'accès que vous comptez autoriser. Exiger des écrans d'approbation **Ask when no Session, Project, or Global permission applies.**
4. Dans **Manage access**, activez **Main Agent** pour PubMed, puis vérifiez **Used by**. Vérifiez séparément chaque Specialist concerné dans la même fenêtre.

![Description de l'outil PubMed et contrôles d'approbation](/img/open-science/walkthrough-2026-09-08/64-pubmed-tool-policy.webp)

Les détails énumèrent `search_articles`, `get_article_metadata`, `find_related_articles`, `lookup_article_by_citation`, `convert_article_ids`, `get_full_text_article` et `get_copyright_status`. Choisissez **Always allow**, **Require approval** ou **Block** par outil. Examinez le commutateur **Skip approvals** séparé pour l'ensemble de Connector avant de l'activer. Ouvrir une description n'affiche que les instructions de l'outil.

Le répertoire place PubMed sous **Directory**, tandis que son détail affiche un badge **Featured**. Le placement dans un répertoire et les badges n'indiquent pas l'état de la connexion au compte.

<ToolOperationGroup>
<summary>Lancer une petite recherche de métadonnées GEO</summary>

### Lancer une petite recherche de métadonnées GEO {/* #run-a-small-geo-metadata-lookup */}

<p className="example-label"><strong>Exemple pratique</strong> Rechercher des exemples de métadonnées GSE60450 dans GEO</p>

1. Revenez à la séance de recherche et confirmez un modèle de travail et la disponibilité des archives Omics.
2. Demandez : `Use Omics Archives geo_get_series to retrieve GSE60450 metadata. Report the title, organism, sample count and source-identified sample characteristics. Do not download count tables or run a new expression analysis.`
3. Inspecter la méthode Connector/Méthode demandée et les arguments avant de l'autoriser. L'outil s'attend à un tableau `accessions`; un champ singulier deviné est incorrect.
4. Examiner le résultat réel. Pour cette adhésion, vérifiez les sous-populations de cellules luminales et basales retournées **GSE60450**, **Musculus**, **Échantillons 12**, et le titre -analyse -transcriptome des sous-populations de cellules luminales et basales dans la glande mammaire gravide par rapport à la glande mammaire gravide.
5. Gardez les identifiants GSM retournés avec leurs caractéristiques. Ne pas déduire un mapping aux noms de colonnes MCL1 de la matrice à partir de la ressemblance seule.

![Caractéristiques réelles de l'échantillon GEO retournées par l'intermédiaire du Connector](/img/open-science/guides-walkthrough/59-geo-sample-metadata.webp)

L'intervalle d'échantillonnage retourné était de **GSM1480291–GSM1480302**, couvrant les populations luminales/basales et vierges, la grossesse de 18.5 jour et les stades de lactation de 2 jour. Ces métadonnées sont retournées, et non les étiquettes déduites des totaux de comptage. La table de réponse complète de douze rangées a été téléchargée sous la forme de <a href="/docs/examples/gse60450/geo-sample-metadata.csv" download>geo-sample-metadata.csv</a>. Il s'agit d'une exportation de table de conversation, séparée des artefacts de QC gérés.

Si le fichier d'instructions Connector ne peut pas être lu, conservez son erreur EPERM et vérifiez la session Connector et la session actuelle activée. Confirmer les champs d'opération dans [Paramètres Connector](../reference/connector-operations.md) avant de réessayer. Une requête de métadonnées valide renvoie des enregistrements structurés; il ne télécharge pas le tableau source sous-jacent ou n'effectue pas d'analyse.


</ToolOperationGroup>

## Ajouter un connecteur : champs d'identité partagés {/* #add-connector-shared-identity-fields */}

**Add connector** offre **Local command**, **Remote server** et **Import configuration**. Les deux premiers ouvrent un éditeur avec un sélecteur de type, et **Advanced settings** expose des champs supplémentaires. Les captures d'écran utilisent un paramètre illustratif; Connectez un serveur que vous avez l'intention d'utiliser.

| Champ | Objet |
| --- | --- |
| Type de connecteur | Commuter entre un processus local et un paramètre distant. |
| Nom d'affichage | Nom indiqué dans l'assurance-chômage. |
| Avancé → Nom Connector | Nom callable utilisé par `host.mcp`, les liaisons Specialist et les MCP Skill générés; généré à partir du nom de l'affichage si possible. |
| ID du connecteur | ID en option stable, généré dans la mesure du possible. Editable avant la création, immuable après. |
| Descriptif | Explication facultative des données/actions fournies. |
| Je fais confiance à ce connecteur | Reconnaissance de confiance requise avant d'ajouter un Connector personnalisé. Il ne valide pas le service ou ne rend pas son code sûr. |
| Annuler / Retourner aux connecteurs | Laissez le formulaire. Il ne sauve pas le projet. |
| Ajouter le connecteur / Ajouter et signer | Enregistrer la configuration valide et, pour OAuth, commencer à vous connecter. Le bouton reste désactivé pendant que les champs, les liens ou la confiance requis sont manquants. |

### Commande locale {/* #local-command */}

**Command** offre `npx — Node package`, `uvx — Python (uv)`, `node — script file`, `python3 — script file`, `docker — container` et **Other…**. D'autres exposent **Custom command** pour un chemin absolu exécutable.

| Entrée avancée | Fonctionnement |
| --- | --- |
| Arguments | Un argument par ligne; les espaces et les lignes blanches sont conservés. Effacer le champ pour supprimer tous les arguments. Ne présumez pas qu'une commande shell séparée de l'espace est analysée en plusieurs arguments. |
| Nom de variable | Nommez une variable d'environnement, puis sélectionnez/créez son Credential. |
| Ajouter une variable / Supprimer une variable | Ajouter ou supprimer une liaison nommée. |
| Champs / Texte | Saisissez les noms comme lignes structurées ou une `KEY=` par ligne; Les valeurs secrètes vivent dans les lettres de créances. |
| Aperçu des commandes | Inspectez le lanceur montré après les fixations. |

![Éditeur de commandes locales et variables d'environnement liées aux justificatifs](/img/open-science/walkthrough-2026-09-08/67-connector-local-command.webp)

Une entrée de lanceur ne prouve pas à elle seule que son exécutable ou son service est opérationnel. Utilisez l'invocation ci-dessous pour vérifier la commande locale importée.

### Serveur distant {/* #remote-server */}

Saisissez le vrai **Server URL** fourni par l'opérateur du serveur. `https://example.org/mcp` dans ces captures d'écran est une adresse de domaine réservée illustrative, pas un paramètre MCP fonctionnant.

**Advanced → Transport** par défaut sur **Streamable HTTP**. **Authentication** offre **None**, **OAuth (browser sign-in)** et **Static headers**.

#### En-têtes statiques {/* #static-headers */}

L'éditeur actuel lie les lettres de créances nommées; Ce n'est pas une zone de texte à valeur secrète.

1. Choisissez **Static headers**.
2. Saisissez un **Header name**, comme `Authorization`.
3. Sélectionnez ou créez le **Credential** correspondant. Le sélecteur est désactivé jusqu'à ce que l'en-tête ait un nom.
4. Utilisez **Add header** pour une autre ligne ou **Remove header** pour jeter une ligne.
5. **Champs / Texte** modifie la façon dont les noms sont entrés. Le mode texte prévoit un nom d'en-tête par ligne sous `Name:`; Les valeurs de qualification sont gérées séparément.

![Nom d'en-tête statique et sélecteur de justificatifs](/img/open-science/walkthrough-2026-09-08/65-connector-static-headers.webp)

#### Reliure OAuth {/* #oauth-binding */}

Choisissez un **OAuth credential** correspondant à l'URL de la ressource, au transport et à l'enregistrement. **New credential** ouvre le [éditeur de justificatifs d'identité](../tools/credentials.md#new-credential). Dans ce profil vide, le formulaire a signalé **No OAuth credential matches this Connector's resource URL, transport, and registration.** L'action finale change à **Add and sign in**.

![Correspondance des titres de créance OAuth](/img/open-science/walkthrough-2026-09-08/66-connector-oauth-binding.webp)

## Essais d'importation, d'exportation et de raccordement {/* #import-export-and-connection-tests */}

Choisissez **Add connector → Import configuration** et sélectionnez un fichier JSON jusqu'à 256 KB. L'importateur accepte une configuration Open-Science Connector ou un fichier client MCP contenant `mcpServers`.

1. Pour un fichier multi-serveurs, choisissez une entrée dans **MCP server**. Vous examinez et ajoutez un serveur à la fois. Vérifiez son nom, son ID, son transport et ses arguments de commande après avoir commuté les entrées.
2. Lisez les diagnostics. Les chemins absolus peuvent nécessiter un changement sur un autre ordinateur; Les valeurs de qualification sont exclues de l'importation.
3. Choisissez **Use configuration** pour ouvrir l'éditeur prérempli. Vérifiez chaque champ, liez les identifiants locaux requis et sélectionnez **I trust this connector**.
4. Choisissez **Add connector**, inspectez l'état de connexion dans la liste, puis invoquez un petit outil en lecture seule.

![Sélection d'un serveur et examen des références requises](/img/open-science/local-todo-batch/23-mcp-multi-server.webp)

Lorsqu'un serveur importé fait référence à une variable d'environnement comme `QC_EXAMPLE_TOKEN`, lier ce nom à un titre de créance stocké sur ce périphérique. **Add** reste indisponible jusqu'à ce que les fixations requises soient terminées. Après l'ajout, vérifiez **Connected** et exécutez l'outil prévu; une seule liaison sauvegardée ne valide pas l'authentification à distance.

Appelez `get_dataset_summary`, puis passez un identifiant complet retourné à `get_sample_qc`. Comparer la réponse avec la [Niveau de référence de QC](../reference/example-data.md). Ce serveur retourne les valeurs de résumé enregistrées; il ne recalcule pas la matrice originale. L'implémentation du serveur est couverte par [Créer un outil personnalisé](../tools/custom.md).

### Exportations et réimportations {/* #export-and-reimport */}

Choisissez **Actions → Export** de la ligne, sélectionnez **Open Science Connector** ou **MCP client config**, inspectez l'aperçu et choisissez **Save configuration**.

![Exportation conservant les noms des titres de compétence et déclarant les voies locales](/img/open-science/local-todo-batch/24-mcp-export-binding.webp)

Le fichier exporté réel a conservé le nom de la variable dans `required_secrets.environment`. Il ne contenait aucune valeur probante, aucune confiance ou permission locale. La réimportation nécessite la sélection des titres de compétence locaux et la confiance à nouveau.

Lorsque le même ID existe déjà, l'aperçu des rapports **Un Connector personnalisé avec ID ... est déjà installé** et **Use configuration** est indisponible. Utilisez **Edit** pour modifier une connexion existante; import n'est pas une opération d'écrasement.

![Une ID existante bloque l'importation dupliquée](/img/open-science/local-todo-batch/26-mcp-reimport-collision.webp)

Lors de la restauration d'une connexion exportée, inspectez les champs préremplis et liez à nouveau les identifiants nommés requis. Compléter la confiance et tester un appel limité avant de l'utiliser dans la recherche. L'importation n'écrase pas un Connector existant avec le même ID.

## Pouvoirs : services et secrets réutilisables {/* #credentials-services-and-reusable-secrets */}

Créez et gérez des secrets dans [Pouvoirs de service](../tools/credentials.md), puis sélectionnez leurs noms dans les liaisons environnement, en-tête ou OAuth. Sur un nouvel appareil, restaure ces fixations et complète l'ouverture du service avant de tester la connexion. Les exportations contiennent des références de configuration, pas des secrets utilisables ou de confiance locale.

## Recherche d'erreur HTTP {/* #http-error-lookup */}

Pour les réponses 400, 401, 403, 404, 429 ou 5xx, utilisez le [Table de dépannage HTTP](troubleshooting.md#http-errors-400-403-429-and-5xx). Conservez le service répondant et son message détaillé avec le code d'état.
