---
title: "Paquets de recherche .science"
description: "Exporter une séance avec ses dossiers et ses preuves, puis importer et inspecter le dossier de recherche dans un autre projet."
last_update:
  date: '2026-09-20'
---

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

Les écrans suivants utilisent une session qui résume le [Tableau QC de l'échantillon GSE60450](../reference/example-data.md). Dans l'aperçu d'exportation, comparez **Essential export** et **Full export**, inspectez la taille estimée, puis choisissez **Export**. Le contenu et la taille dépendent de votre session.

![Aperçu de l'exportation des paquets de recherche avec l'exportation essentielle, l'exportation complète et personnaliser le contenu](/img/open-science/feature-guides-2026-09/research-package-export.webp)

## Importation dans un projet {/* #import-and-inspect-a-package */}

1. Ouvrez le menu de destination Projet et choisissez **Import Session package…**, ou déposez un fichier `.science` dans ce projet. Ouverture d'un fichier associé vous demande directement de choisir le projet de destination.
2. Consultez l'aperçu du colis, la destination et le contenu inclus ou omis, puis confirmez l'importation.
3. Attendez l'achèvement et choisissez **Open imported Session**.
4. Inspectez les branches de conversation et ouvrez les fichiers nécessaires au transfert. Vérifiez que vous pouvez trouver les entrées et les résultats pertinents à votre prochaine tâche.

## Utiliser le dossier de recherche reçu {/* #use-the-received-research-record */}

La session importée reste en lecture seule. Sur le bureau, ouvrez son menu de session et choisissez **Fork**. Attendez **Fork completed**, ouvrez la nouvelle session et inspectez ses fichiers hérités avant d'envoyer un suivi. La source reste inchangée; code ne fonctionne pas automatiquement. Voir [Fourche une session existante](sessions.md#fork-session) pour les étapes et les vérifications. L'utilisation importée est exclue des totaux des activités locales.

Un dossier de vérification reçu décrit les vérifications fournies par l'expéditeur. Cela ne signifie pas que cet ordinateur a réexécuté les vérifications. Lire la version du fichier, les critères de comparaison et le résultat; voir [Reproductibilité](reproducibility.md) pour savoir comment ces contrôles fonctionnent.

## Annuler ou réessayer un transfert {/* #cancel-or-retry-a-transfer */}

**Run in background** cache la fenêtre de progression pendant que le transfert se poursuit. Utiliser **Cancel** pour arrêter; cacher la fenêtre n'annule pas l'opération.

Si le nettoyage est incomplet, utilisez **Retry cleanup** avant d'essayer à nouveau. Après un échec, **Try again** récupère le même fichier et la même destination. Choisissez un autre paquet séparément si c'est votre intention. Vérifiez l'opération existante avant de commencer une deuxième importation, puis inspectez la session importée et les fichiers quand elle se termine.
