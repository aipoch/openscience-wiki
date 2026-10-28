---
title: "Fichiers, artefacts et versions"
last_update:
  date: '2026-10-27'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';
import Screenshot from '@site/src/components/Screenshot';

# Fichiers, artefacts et versions {/* #files-artifacts-and-versions */}

Conserver le fichier original, la copie téléchargée et l'artefact généré distinctement. Cette page couvre la propriété, la recherche de fichiers et les révisions sauvegardées. Voir [Aperçus](previews.md) pour les commandes de visualisation et [Sessions](sessions.md) pour les paquets d'exportation.

<PlatformGuide />

## Joindre une entrée ou une référence un dossier {/* #attach-an-input-or-reference-a-folder */}

Utilisez **Composer → + → Attach files**, sélectionnez `GSE60450_Lactation-GenewiseCounts.txt`, attendez la puce de fixation et prévisualisez-la avant d'envoyer. Le nom de l'affichage reste reconnaissable; le chemin d'entrée géré peut inclure un suffixe de somme de contrôle. L'élimination d'une puce annule son inclusion dans l'ébauche, et non le fichier original sur le disque. **Your files** sélectionne un fichier de projet existant au lieu de le télécharger à nouveau.

Une référence de dossier est utile lorsque plusieurs entrées doivent rester sur le disque. Dans **Files → Filter project files → This computer → Add folder…**, accédez à un sous-dossier spécifique et choisissez **Read-only** ou **Read & write**. Passez en revue la confirmation de l'arrêt du noyau avant **Grant this folder**. Changer l'accès au fichier Notebook arrête les noyaux actifs afin que leurs permissions puissent être recréées. Annuler laisse la subvention proposée inappliquée. La sélection des dossiers et les permissions sont détaillées dans [Projets](projects.md).

| Contrôle des fichiers locaux | Action et état résultant |
| --- | --- |
| Chemin du répertoire | Entrez un répertoire autorisé, puis accédez à celui-ci |
| Aller au répertoire parent | Déplacer un répertoire dans les règles d'accès du navigateur |
| Aller à | Choisissez un emplacement enregistré |
| Actualiser le répertoire | Recharger la liste des répertoires |
| Épingler ce dossier | Ajouter/supprimer un raccourci d'emplacement; supprimer ne supprime pas le dossier |
| Ligne de fichier | Ouvrir le fichier dans un aperçu |
| Recharger le fichier | Relisez le fichier externe après qu'il ait changé |
| Plus d'actions → Copier le chemin | Copier le chemin du fichier externe |
| Plus d'actions → Enregistrer comme artefact | Enregistrer une copie de projet gérée; attendre d'être sauvé |
| Télécharger | Enregistrer une copie externe via le flux de sauvegarde de la plate-forme |

Une subvention en lecture seule protège le répertoire externe tout en permettant des sorties dans l'espace de travail du projet. Utilisez les contrôles de fichiers locaux ci-dessus pour rafraîchir les sources et enregistrer les copies gérées.

<PlatformContent platform="windows">

Pour un dossier existant, ouvrez **Files**, sélectionnez le menu déroulant **Artifacts**, puis **This computer → Add folder…**. Dans la boîte de dialogue de l'application **Grant folder access**, choisissez un sous-dossier spécifique et **Read-only**, puis **Grant this folder**. La racine du profil utilisateur peut ne pas être disponible; sélectionner le sous-dossier de recherche à la place. Lire n'importe quelle confirmation d'impact Notebook-kernel. En retournant aux fichiers, vérifiez le dossier sélectionné et ses fichiers.

<Screenshot src="/img/open-science/windows/granted-folder-files.webp" alt="Un dossier Windows accordé montrant le script public et CSV" width={1920} height={1017} windowBounds={[1157, 0, 763, 237]} href="/docs/img/open-science/windows/granted-folder-files.webp" linkLabel="Ouvrez la capture d&#39;écran complète de Windows" />

Dans la boîte de dialogue Windows **Attach files**, sélectionnez un fichier à partir d'un chemin contenant des caractères ou des espaces chinois, ou entrez son chemin complet dans le champ **File name** et ouvrez-le. Retournez dans l'application, vérifiez le nom de la pièce jointe et prévisualisez les dimensions et le contenu de la table. Pour abandonner une sélection, choisissez **Cancel** et vérifiez qu'aucune nouvelle pièce jointe n'a été ajoutée à l'ébauche.

</PlatformContent>

## Rechercher les intrants et les résultats générés {/* #find-inputs-and-generated-results */}

1. Ouvrez **Files** et sélectionnez **Filter project files → All artifacts**.
2. Lire **Your uploads** séparément de **Generated files** regroupés par session.
3. Sélectionnez **List view** pour les noms et les tailles, ou **Grid view** pour les cartes visuelles.
4. Saisissez un fragment de nom de fichier dans **Search project files**, comme `rnaseq`. Vérifiez les noms correspondants et les sessions de propriétaire.
5. Effacer la recherche pour afficher les fichiers exclus par ce filtre.
6. **Expand files** ouvre la plus grande bibliothèque; **Exit full screen files** retourne dans l'espace de travail.

<PlatformContent platform="macos">

![Résultats réels filtrés de RNA-seq dans la bibliothèque de fichiers](/img/open-science/guides-walkthrough/56-files-search.webp)

</PlatformContent>
Le nombre décrit le filtre actuel. Une recherche sans correspondances ne supprime pas les fichiers. **No more** signifie que le groupe a terminé le chargement. Effacer un groupe par son cap. Utilisez l'action de prévisualisation d'un corps de fichier pour un modal, ou **Ouvrir ... en vue scindée à côté de la session** pour conserver la conversation à côté. Télécharger agit sur le fichier/version sélectionné par cette surface.

### Retournez dans un dossier local et enregistrez une copie de lecture {/* #return-to-a-local-folder-and-save-a-reading-copy */}

1. Ouvrez **Files → Filter project files → This computer** et entrez le répertoire source autorisé dans **Directory path**.
2. Sélectionnez **Pin this folder**. Naviguez ailleurs, puis **Go to → Pinned** pour revenir. **Remove bookmark**, ou la ligne épinglée **Unpin**, supprime le raccourci seulement.
3. Choisissez **Refresh directory** pour voir les nouveaux noms de fichiers ajoutés. Pour un fichier déjà ouvert modifié en dehors de l'application, utilisez **Reload file** pour relire son contenu.
4. Dans l'aperçu local, choisissez **More actions → Save as artifact** et attendez **Saved**.
5. Revenez à **All artifacts → Your uploads** et rouvrez la copie sauvegardée. Il a géré les commandes de version et aucun chemin source locale dans l'en-tête.

Réouvrir la copie gérée et comparer son contenu avec la source locale. Les modifications ultérieures de source ne mettent pas à jour la copie enregistrée automatiquement. Utilisez les étapes de conflit de versions ci-dessous lors de l'édition de contenu géré.

## Modifier un rapport et comparer les versions {/* #edit-a-report-and-compare-versions */}

<p className="example-label"><strong>Exemple pratique</strong> Ajouter une note de lecture et comparer les révisions des rapports</p>

Ouvrez un fichier de texte géré ou Markdown. L'exemple ci-dessous ajoute une note de lecture à un rapport existant; Enregistrer crée une nouvelle révision sans changer l'entrée originale ou rediffusion de son analyse.

1. Ouvrez le fichier Markdown géré et sélectionnez **Modifier rnaseq-qc-report.md**.
2. Modifier le champ source. Conserver la méthode existante et le texte de provenance.
3. Sélectionnez **Save changes**. L'en-tête passe de **v1** à **v2**.
4. Sélectionnez **Comparer ... avec sa version source**. Le texte ajouté apparaît dans la vue de la différence.
5. Utilisez **Arrête de comparer** pour retourner à la déclaration rendue.
6. Sélectionnez **Previous file version** pour inspecter v1, puis **Next file version** pour revenir à v2.

<PlatformContent platform="macos">

![Rapport v2 par rapport à sa version originale](/img/open-science/guides-walkthrough/55-report-version-diff.webp)

</PlatformContent>
| Contrôle/état d'édition | Que faire |
| --- | --- |
| Enregistrer les modifications désactivées | Faire un changement valide; texte inchangé n'a rien à enregistrer |
| Annuler | Jeter l'ébauche d'édition actuelle |
| Flèches de version désactivées | Aucune version plus ancienne ou plus récente n'existe dans ce sens. |
| Comparer les désactivés | Aucune comparaison source-version prise en charge n'est disponible |
| Enregistrer le conflit | Rechargez la version actuelle et réconciliez votre changement; ne supposez pas que votre projet a renversé un autre écrivain |
| Modifier en l'absence | Ce type de fichier ou source n'est pas modifiable dans ce visionneur; ne s'attendent pas à ce que les fichiers binaires ou la table CSV deviennent des éditeurs de tableurs |

Les fichiers gérés texte/code et Markdown peuvent exposer l'édition. Le CSV démontré est resté un tableau en lecture seule; les images et autres formats binaires n'obtiennent pas d'édition de texte via cette fonctionnalité. Une modification manuelle crée une révision de fichier; il ne réexécute pas le Notebook ni ne crée un examen de modèle. Se référer à [Preuves de Notebook](notebook.md) avant de citer l'historique de production d'une version.

### Résoudre un conflit de sauvegarde sans perdre l'une ou l'autre édition {/* #resolve-a-save-conflict-without-losing-either-edit */}

Si un autre auteur enregistre le rapport pendant que votre éditeur reste ouvert, **Save changes** peut retourner **Une version plus récente de ce fichier est disponible. Afficher la dernière version**. Votre ébauche n'a pas remplacé cette version plus récente.

1. Préservez votre texte non enregistré avant de modifier les vues.
2. Sélectionnez **View latest version**. Si **Discard unsaved changes?** apparaît, annulez jusqu'à ce que vous ayez conservé les modifications dont vous avez besoin.
3. Ouvrez le dernier rapport enregistré et inspectez les autres ajouts de l'auteur.
4. Sélectionnez **Edit**, réappliquez vos modifications à ce dernier texte et enregistrez.
5. Réouvrir le résultat et utiliser les flèches de version pour inspecter les révisions antérieures.

<PlatformContent platform="macos">

![Enregistrer bloqué parce qu'une autre version existe](/img/open-science/local-todo-batch/37-file-save-conflict.webp)

</PlatformContent>
Après l'enregistrement, confirmez que la dernière révision contient à la fois le changement de l'autre auteur et votre brouillon conservé. Les révisions antérieures des fichiers demeurent disponibles grâce aux contrôles de versions; Ces révisions sont séparées des révisions de conversation-message.

Pour réexécuter un résultat capturé et comparer sa sortie, utilisez [Reproductibilité](reproducibility.md). Pour une copie portable des branches de conversation, des fichiers et des preuves, utilisez un [Paquet de recherche .science](research-packages.md).

## Exporter sans perdre le dossier de recherche {/* #export-without-losing-the-research-record */}

Utilisez le fichier **Download** pour enregistrer un résultat. La session **Download all artifacts** enregistre les fichiers choisis dans un dossier; Le projet **Download artifacts…** crée un ZIP avec des chemins `generated` et `uploads` séparés. Les deux exposent les contrôles de sélection. Lire sa portée, ses noms de fichiers et sa destination avant de confirmer. Conversation **Export** est une opération de transcription, distincte du téléchargement des fichiers de recherche. Voir [Sessions](sessions.md) pour les sélections et téléchargements réouverts. Une copie téléchargée ne contient pas l'état complet de l'application en direct, les identifiants ou les entrées externes.

Conservez la matrice de comptage originale, la CSV, la figure et les méthodes de rapport ensemble pour réutilisation. Le [flux de données](../workflows/data-quality.md) fournit les fichiers testés et les valeurs d'acceptation exactes. Si un téléchargement échoue, vérifiez l'autorisation de destination et l'espace disque libre, puis réessayez; un fichier externe partiel ne modifie pas la version gérée sauvegardée.

### Ouvrir un rapport téléchargé {/* #open-a-downloaded-report */}

Sélectionnez la version du rapport et choisissez **Download**. Ouvrez le fichier enregistré `.md` dans un éditeur de texte et vérifiez ses en-têtes, paragraphes et données. Retour à l'aperçu de l'application pour le rapport formaté.

<PlatformContent platform="windows">

Ouvrez le fichier `.md` téléchargé dans Notepad. Notepad affiche Markdown source: les marqueurs de cap tels que `##` et backticks formatent des caractères. Vérifiez les titres, les paragraphes et le contenu de la table. Retournez à l'aperçu de l'application pour lire le rapport formaté.

</PlatformContent>

### Préserver le fichier sélectionné au moyen de copies et d'exportations {/* #preserve-the-selected-file-through-copies-and-exports */}

Lorsque vous copiez un message avec des références gérées, collez-le dans la conversation prévue et inspectez chaque pièce jointe/référence résultante avant d'envoyer. Un nom de fichier lisible n'est pas suffisant : ouvrez la référence et validez son propriétaire et sa version actuelles.

Avant d'exporter des artefacts sélectionnés ou un paquet, confirmez la sélection complète, attendez le résultat et rouvrez les fichiers téléchargés. Si une édition, un rafraîchissement ou une exportation échoue, conservez le projet et la version source tout en vérifiant le résultat réel enregistré. Un rafraîchissement échoué n'établit pas qu'une sauvegarde précédente a échoué.

Références de mise en œuvre: [références copiées](https://github.com/aipoch/open-science/commit/f0c0e081), [sélection complète des exportations](https://github.com/aipoch/open-science/commit/f0468f35) et [prévisualiser les modifications](https://github.com/aipoch/open-science/commit/8763f9aa). Si une pièce jointe signale **Le fichier géré ou sa session est supprimé**, rebranchez l'entrée actuelle prévue dans l'application et inspectez sa propriété; Voir [Dépannage](troubleshooting.md).

Sources: [bibliothèque de fichiers de projets](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ProjectFilesView.tsx), [actions de fichiers locaux](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/LocalFileHeaderActions.tsx).

## Conserver un fichier local autorisé comme artefact {/* #import-local-artifact */}

Ouvrir un fichier depuis un dossier autorisé sous **This computer**. Dans son aperçu, utiliser **… → Save as artifact** et attendre l'achèvement. Ouvrez l'artefact de conversation résultant et vérifiez son contenu. Open-Science conserve une copie de gestion immuable; les modifications ultérieures au fichier local original ne mettent pas à jour cette copie. La simple prévisualisation d'un fichier de dossier ne l'importe pas.
