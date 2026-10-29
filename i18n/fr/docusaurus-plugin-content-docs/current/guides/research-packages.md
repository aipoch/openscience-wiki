---
title: "Paquets de recherche .science"
description: "Exporter une séance avec ses dossiers et ses preuves, puis importer et inspecter le dossier de recherche dans un autre projet."
last_update:
  date: '2026-10-29'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Paquets de recherche .science {/* #science-research-packages */}

Un paquet de recherche **.science** rassemble des branches de conversation, des fichiers et des preuves enregistrées pour un transfert. Un collègue peut l'importer dans un projet et inspecter le dossier de recherche. Les sessions importées sont en lecture seule. À partir de v0.31.0, utilisez **Fork** dans l'application de bureau pour créer une copie en écriture et poursuivre la recherche.

## Choisissez ce que vous devez partager {/* #choose-what-to-share */}

| Ce dont le bénéficiaire a besoin | Exportation vers l'utilisation |
| --- | --- |
| Lire ou modifier le texte de la conversation | [Conversation PDF ou Markdown](sessions.md). |
| Utiliser les fichiers d'origine sélectionnés | [Téléchargements de fichiers ou un artefact ZIP](files.md). |
| Inspecter ensemble les branches, les dossiers et les preuves de la conversation | A `.science` le paquet de recherche. |

Un paquet peut contenir du matériel de recherche téléchargé, du texte de conversation et des résultats générés. Examinez son contenu avant de partager. C'est une copie indépendante: supprimer le travail local ne supprime pas les paquets déjà envoyés à d'autres.

Les conversations Side Chat, [lecture de signets](bookmarks.md) privé et leurs notes sont exclues du paquet. Mettre l'information dont le destinataire a besoin dans un rapport enregistré ou la conversation avant d'exporter.

## Vérifier la version du destinataire {/* #package-compatibility */}

Les paquets exportés par **v0.33.0** incluent les métadonnées **RO-Crate 1.1** dans `ro-crate-metadata.json`. Il décrit l'instantané final exporté et les fichiers immuables sélectionnés, y compris les noms de fichiers, les types de médias et leurs relations. Re-exporter reconstitue ces références pour le nouvel instantané.

Utilisez **v0.33.0 ou un lecteur compatible ultérieur** pour ouvrir ces nouvelles exportations : ils déclarent la capacité requise de `ro-crate`. Mettre à jour une ancienne application de réception avant d'importer; le renommage ou la suppression des métadonnées n'est pas une correction de compatibilité. Les anciens paquets existants restent lisibles sans migration.

Ces métadonnées se déplacent à l'intérieur du paquet `.science`. Il ne redirige pas les calculs, n'accorde pas d'accréditation ou ne remplace pas le [contrôle de reproductibilité sur une version d'artefact](reproducibility.md).

## Exportation d'un dossier de recherche {/* #export-the-session */}

1. Terminer ou arrêter le travail pendant la session. Ouvrez son menu et choisissez **Export → Export Session package**.
2. Examiner la portée de l'exportation et les limites de contenu ou de taille omises.
3. Confirmez l'exportation et enregistrez le fichier `.science` dans le dossier prévu.
4. Suivez les progrès jusqu'à ce qu'ils soient terminés, puis utilisez **Show in folder** pour localiser le fichier.

| Option d'exportation | Comment choisir |
| --- | --- |
| Export essentiel | conserver les métadonnées essentielles en matière d'enregistrement et de documentation; omettre la documentation facultative PDF. |
| Export complet | Inclure la documentation disponible PDF et le contenu supplémentaire affiché dans l'aperçu. |
| Personnaliser le contenu | Choisir des documents individuels PDF, des fichiers optionnels et des versions; les éléments de preuve nécessaires demeurent inclus. |

Les métadonnées bibliographiques sont toujours incluses. Si une documentation PDF est nécessaire, **Essential export** n'est pas disponible; utiliser **Full export** ou **Customize contents** et conserver le fichier requis. L'exportateur ne récupère pas les textes complets manquants. Vérifiez les PDF et la taille indiqués avant de confirmer; **Full export** ne supprime pas chaque taille ou limite de contenu.

<p className="example-label"><strong>Exemple pratique</strong> Remise d'un échantillon de session de QC</p>

Cet exemple dans Open-Science v0.31.1 exporte une session qui résume le [Tableau QC de l'échantillon GSE60450](../reference/example-data.md), l'importe dans un autre projet sur le même Mac, et continue à partir d'une Fork utilisant **Codex subscription**. Commencez par la session complète contenant `gse60450-qc-summary.csv`; le tableau d’entrée seul ne constitue pas le paquet de recherche.

Choisissez **Essential export**, vérifiez le contenu et la taille estimée, puis **Export**. L'aperçu de cette session a estimé **805.6 KiB**. Attendez **Package operation completed** avant d'importer le fichier sauvegardé; La taille de votre session sera différente.

![Options d'exportation réelles de la session du CQ et taille estimée](/img/open-science/v0311/package-export.webp)

## Importation dans un projet {/* #import-and-inspect-a-package */}

Sur la page **New conversation** vide d'un projet, choisissez **Importer une recherche précédente** et sélectionnez un fichier `.science` ou faites glisser le fichier sur cette page. L'attachement d'un fichier à une conversation existante n'est pas le flux d'importation de paquets de recherche. Examiner le projet cible et le contenu dans l'aperçu d'importation, confirmer et attendre l'achèvement avant d'ouvrir l'enregistrement en lecture seule.

![Importer des recherches antérieures sur la page de conversation vide](/img/open-science/v0341/package-entry.webp)

1. Ouvrez le menu de destination Projet et choisissez **Import Session package…**, ou déposez un fichier `.science` dans ce projet. Ouverture d'un fichier associé vous demande directement de choisir le projet de destination.
2. Consultez l'aperçu du colis, la destination et le contenu inclus ou omis, puis confirmez l'importation.
3. Attendez l'achèvement et choisissez **Open imported Session**.
4. Inspectez les branches de conversation et ouvrez les fichiers nécessaires au transfert. Vérifiez que vous pouvez trouver les entrées et les résultats pertinents à votre prochaine tâche.

Pour cet exemple, sélectionnez le projet de destination **Public Genomics Examples**. L'aperçu d'importation liste **Branche 1, messages 3 et fichiers 13**. Il indique également que les titres de compte, les autorisations et les identités de continuation des fournisseurs sont exclus. Vérifiez ces détails avant de sélectionner **Import**.

![Aperçu du paquet QC avant importation dans le projet de destination](/img/open-science/v0311/package-import-preview.webp)

Ouvrez la session importée et son résumé CSV. L'avis **Imported research history** confirme que cette copie est en lecture seule et ne peut pas exécuter de code ou poursuivre une conversation directement.

![Importé QC record avec son résumé hérité et Fork pour continuer bouton](/img/open-science/v0311/package-import-readonly.webp)

## Utiliser le dossier de recherche reçu {/* #use-the-received-research-record */}

1. Sélectionnez **Fork to continue** dans la session importée, ou **Fork** dans son menu de session. Attendez **Fork completed** et ouvrez la nouvelle session. Le code ne s'exécute pas automatiquement.
2. Inspectez le résumé hérité, choisissez un modèle disponible et confirmez que l'exécution Python est prête. Cet exemple a utilisé **Codex subscription / gpt-5.6-sol**. Les lettres de créances et les permissions importées ne donnent pas d'autorisation sur l'installation qui les reçoit.
3. Envoyez l'invite suivante. Si une approbation Python apparaît, inspecter le calcul demandé et l'approuver pour continuer.

```text
Use Python in Session Notebook with the standard library only.
Read the inherited gse60450-qc-summary.csv. Do not modify inherited files.
Compute total_raw_counts_sum divided by sample_count using decimal.Decimal
with precision 28. Save research-package-continuation.csv with metric,value
rows in this order: sample_count, total_raw_counts_sum,
mean_raw_counts_per_sample. Save research-package-continuation.md with the
input filename, calculation and result. Do not use the network or delegate.
Keep everything in English and return links to both new files.
```

4. Ouvrez les deux nouveaux fichiers. Cette opération a retourné des échantillons de **12**, un nombre brut total de **269027617** et une moyenne de **22418968.08333333333333333333**. La moyenne récapitule le tableau de Qc fourni; il n'est pas une expression normalisée ou un résultat d'expression différentielle.

![Fork complété et les nouveaux fichiers de calcul créés en utilisant Codex](/img/open-science/v0311/package-continued.webp)

<ExampleDownload path="/examples/v0311/gse60450-qc-summary.csv">Résumé hérité</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.csv">Nouveau calcul</ExampleDownload> · <ExampleDownload path="/examples/v0311/research-package-continuation.md">Notes de calcul</ExampleDownload>

Les deux nouveaux fichiers sont enregistrés dans le Fork ; les fichiers récapitulatifs de la session source et de la session importée restent inchangés. Voir [Créer un Fork d’une session existante](sessions.md#fork-session). L’utilisation importée est exclue des totaux d’activité locaux.

Un dossier de vérification reçu décrit les vérifications fournies par l'expéditeur. Cela ne signifie pas que cet ordinateur a réexécuté les vérifications. Lire la version du fichier, les critères de comparaison et le résultat; voir [Reproductibilité](reproducibility.md) pour savoir comment ces contrôles fonctionnent.

## Régler la vitesse de transfert et suivre les progrès de fond {/* #transfer-settings */}

Avant d'exporter, choisissez **Customize contents → Transfer settings**. Au cours d'une exportation ou d'une importation, étendez **Détails du transfert**. Définissez **Limite d’activité du disque** à **Auto** pour un réglage automatique ou choisissez une limite fixe. Des limites plus basses réduisent l'activité du disque et prennent plus de temps. Lis et écrit partagent cette limite; ce n'est pas une vitesse de téléchargement sur Internet.

Choisissez **Run in background** pour continuer l'opération avec la boîte de dialogue cachée. Rouvrir les détails de l'entrée de l'arrière-plan de progression dans la fenêtre pour inspecter le fichier actuel, l'avancement et l'activité disque. Attendez l'achèvement avant de vérifier le fichier exporté ou d'ouvrir la session importée.

![Limite d'activité des disques dans les paramètres de transfert de paquets de recherche](/img/open-science/v0333/package-transfer.webp)

## Lorsque le contenu sensible des drapeaux d'exportation {/* #sensitive-export */}

Si l'exportation s'arrête à la vérification du contenu sensible, étendez **Preuve de contenu sensible** et inspectez les fichiers marqués. Enlevez les identifiants ou les documents privés de la source, puis commencez une nouvelle exportation quand ils ne devraient pas être partagés.

Si le matériel signalétique fait intentionnellement partie d'un transfert autorisé, l'exportation ratée offre **Je comprends le risque et souhaite exporter quand même**, suivie de **Exporter quand même**. Cela inclut le contenu marqué **sans reformulation**; Ce n'est pas un filtre de confidentialité. La reconnaissance appartient à cette tentative d'exportation et doit être sélectionnée à nouveau après un échec. Examiner le paquet résultant avant de le partager. Pour le dépannage des preuves, utilisez [Exporter les diagnostics](troubleshooting.md#session-diagnostics).

## Annuler ou réessayer un transfert {/* #cancel-or-retry-a-transfer */}

**Run in background** cache la fenêtre de progression pendant que le transfert se poursuit. Utiliser **Cancel** pour arrêter; cacher la fenêtre n'annule pas l'opération.

Si le nettoyage est incomplet, utilisez **Retry cleanup** avant d'essayer à nouveau. Après un échec, **Try again** récupère le même fichier et la même destination. Choisissez un autre paquet séparément si c'est votre intention. Vérifiez l'opération existante avant de commencer une deuxième importation, puis inspectez la session importée et les fichiers quand elle se termine.

## Rejouer un dossier de recherche reçu {/* #replay-import */}

Une fois l'importation terminée, choisissez **View replay** pour inspecter les étapes enregistrées ou **Discuss** pour demander à leur sujet dans une conversation en écriture. La source importée reste en lecture seule. Une référence de discussion ne recrée pas son temps d'exécution original; Utilisez **Fork to continue** pour une copie de travail. Voir [Rejouer la session](session-replay.md).

## Importer dans un nouveau projet {/* #new-project-import-recovery */}

Si une version ancienne échoue en adoptant un paquet dans le catalogue d'un nouveau projet, mettez à jour v0.37.0 ou plus tard, vérifiez si la destination existe déjà, et utilisez l'action de récupération de la boîte de dialogue d'importation avant de commencer une autre importation. Vérifiez la session et les fichiers résultants. La correction ne rend pas les sessions importées enregistrables : utilisez **Fork** pour poursuivre l'analyse.

## Importer un paquet depuis un site Web {/* #browser-import */}

Utilisez une application de bureau installée sur le **même ordinateur** comme le navigateur. Le site Web doit offrir le transfert de paquets Open-Science; un lien de téléchargement ordinaire à lui seul ne le fournit pas.

1. Sur une page de paquet de confiance, sélectionnez son importation/action ouverte Open-Science. Permettre au navigateur d'ouvrir l'application de bureau. Si vous demandez un accès au réseau local, n'accordez-le qu'au site que vous comptez utiliser.
2. Gardez la page ouverte pendant que l'application affiche **Receiving package…** et **Validating package…**. Un message de réception du site Web ne confirme que la livraison à l'application.
3. Dans l'application, examinez le paquet, sélectionnez le projet de destination et confirmez l'importation. Attendez l'achèvement, puis ouvrez la session importée.
4. Inspectez ses dossiers et ses preuves. Le dossier de recherche reste en lecture seule; utilisation **Fork to continue** pour de nouvelles recherches. Modifier son titre ne rend pas la recherche importée inscriptible.

Si le retrait n'est pas disponible ou bloqué, téléchargez le `.science` fichier et utiliser le contrôle d'importation existant. Vous pouvez également la déposer sur la maison du projet. Une goutte de dossier normale dans le Compositeur n'importe pas un paquet. Si une importation signale une défaillance partielle, vérifiez la destination d'une session existante avant de réessayer; ne créez pas un autre projet simplement pour répéter le même transfert.

Pour les auteurs du site, [navigateur-importation SDK guide](https://github.com/aipoch/open-science/blob/v1.0.2/packages/open-science/BROWSER_IMPORT.md) nécessite HTTPS (ou une source de développement loopback), un handoff de bureau de même ordinateur et un paquet non vide pas plus de 2 GiB. Le reçu local ne remplace jamais la confirmation d'importation finale de l'utilisateur.

## Utiliser les paquets de l'application Web CLI ou locale {/* #local-package-transfer */}

De v1.0.5, l'authentifié **local Web** utilise les commandes du navigateur pour envoyer et télécharger les `.science` les colis. Les sessions Web distantes ne gagnent pas cette capacité. Les [mise à disposition du site Web vers le bureau](#browser-import) reste un flux séparé.

### Télécharger ou télécharger sur le Web local {/* #web-package-transfer */}

1. Ouvrez l’espace de travail local prévu et attendez que la session source soit inactive. Dans son menu, choisissez **Export → Export Session package**, sélectionnez le contenu, puis **Choose save location…** pour préparer le paquet.
2. Attendez que le paquet finisse sa préparation. Sélectionner **Download** à côté du nom du paquet rempli, puis enregistrez-le dans le navigateur. Un paquet de backend préparé n'est pas encore un téléchargement de navigateur enregistré; vérifiez le téléchargement `.science` fichier avant de le partager.
3. Pour importer, utilisez le contrôle d'importation du paquet du projet et sélectionnez un `.science` fichier de votre ordinateur. Attendez le téléchargement et la validation, examinez le paquet et le projet de destination, puis confirmez l'importation.
4. Ouvrez la session importée et vérifiez ses fichiers. Le dossier de recherche est en lecture seule. Pour le poursuivre, ouvrez le même espace de travail dans l’application de bureau et choisissez **Fork to continue**. Fork n’est pas disponible dans Web.

![Paquet préparé et bouton Download du navigateur](/img/open-science/v105/package-download.webp)

Si le envoi, le téléchargement ou l'importation échoue, inspecter le résultat affiché et la destination avant de réessayer. Ne traitez pas un fichier reçu ou un téléchargement réussi comme une importation terminée.

### Utiliser le CLI {/* #cli-package-transfer */}

Commencez d'abord le profil local prévu et attendez que la session source soit inactive. Remplacer ces identifiants et chemins par les vôtres :

```bash
open-science session export SESSION_ID --project PROJECT_ID --output ./session.science --json
```

L’exportation exige un chemin de sortie `.science` explicite. Le délai par défaut est d’une heure ; utilisez **--timeout-ms** pour un transfert volumineux et vérifiez le chemin retourné. Dans **v1.0.5**, importez les fichiers locaux par [l’envoi dans Web local](#web-package-transfer) ou dans l’application de bureau. Le chemin fourni à `session import` dans le CLI peut être refusé avant la validation du paquet.

## Commencer par un cas de recherche sur la page d'accueil {/* #use-case-gallery */}

Sur la page d'accueil, choisissez **Details** sur une carte de cas pour lire sa page de cas officielle. Choisir **Import** pour télécharger son dossier de recherche. Suivre les progrès de préparation, de téléchargement et de vérification; **Cancel** arrête un transfert indésirable. Si le colis attend une destination, **Continue** rouvre la boîte de dialogue d'importation.

Examiner le projet de destination et confirmer l'importation. Ouvrir le résultat, inspecter les entrées et les sorties, puis utiliser **Fork to continue** dans l’application de bureau pour votre propre question. Télécharger vérification vérifie le transfert de colis; il ne valide pas les conclusions scientifiques de l'affaire ou fournit ses modèles d'identification.

![Vérifier un paquet de la galerie officielle avant son importation](/img/open-science/v105/package-preview.webp)
