---
title: "Annotations et notes de document PDF"
description: "Marquer les passages, recueillir les notes de documents, les retrouver et exporter une copie de lecture."
last_update:
  date: '2026-09-22'
---

import ExampleDownload from '@site/src/components/ExampleDownload';

# Annotations et notes de document PDF {/* #pdf-annotations-and-document-notes */}

Utilisez les notes PDF pour enregistrer les questions à côté d'un passage, marquer un chiffre pour une réunion de groupe, ou recueillir des commentaires sur un document entier. Les annotations appartiennent au **version du fichier** géré, donc la réouverture de cette version ramène ses notes. Ils n'envoient pas de message à l'agent ou ne changent pas les octets PDF originaux.

## Choisissez l'outil de lecture approprié {/* #choose-the-right-reading-tool */}

| Outil | Ce qu'il garde | Où le trouver ? |
| --- | --- | --- |
| PDF **Notes & Annotations** | Faits saillants, marques de zone, notes de page et notes de document pour une version PDF gérée | la vue ou la barre latérale des notes de PDF; les notes et le texte cité sont également consultables sous **Library** |
| **For me** signet | Un lieu de lecture privé et une note facultative appartenant à une session | Cette session est **Bookmarks** liste; voir [Signets de lecture personnels](bookmarks.md) |
| **To Agent** annotation | Matériel préparé pour une question ou une instruction | b) Le projet de message envisagé; examiner avant d'envoyer |

## Marquer un passage et garder une question {/* #annotate-passage */}

<p className="example-label"><strong>Exemple pratique</strong> Préparer des notes de lecture pour une réunion de groupe de catalyse à un atome</p>

Cet exemple utilise Lang et al., [Catalyseur monoatome thermiquement stable non stabilisé par défaut](https://doi.org/10.1038/s41467-018-08136-3), un papier à accès ouvert utilisé dans le [flux de travail des réunions de groupe](../workflows/journal-club.md). Obtenez son PDF de l'éditeur et importez-le dans [Bibliothèque](library.md). Ouvrez la pièce jointe PDF depuis sa ligne de référence. L'exemple demande comment le document soutient son mécanisme de stabilisation; mettre en évidence un abstrait n'est pas une vérification indépendante de ce mécanisme.

1. Dans **Original PDF**, localisez le passage et vérifiez le numéro de page. Utilisez le zoom si le texte est trop petit.
2. Sélectionnez **Annotate selected text**, puis faites glisser le texte. **Mark style** choisit le style de marquage de texte. Dans cet exemple, la première partie de la page-un résumé est mise en évidence.
3. Ouvrez **Annotation note**, écrivez une question ou un rappel de lecture, et choisissez **Save**. La note d'exemple demande au lecteur de comparer la stabilisation des défauts avec l'interaction covalente métal-support proposée et de vérifier les expériences de support.
4. Choisissez **Show notes sidebar** pour conserver la note sauvegardée à côté du PDF. Ajouter une balise existante avec **Add tag**; cet exemple utilise **Favorites**.
5. Retourner à **Select** lorsque le texte de marquage est terminé. Utilisez **Undo annotation change** et **Redo annotation change** pour les éditions d'annotation récentes, plutôt que de modifier la source PDF.

![Un point fort enregistré et une note de lecture à côté de la PDF originale](/img/open-science/v0320/pdf-highlight-sidebar.webp)

Pour une figure ou une page numérisée, utilisez **Select area to annotate** et marquez la région prévue. Une marque régionale identifie une zone; il n'extrait pas son texte ou ne vérifie pas le chiffre. Si le texte ne peut pas être sélectionné, une marque de zone peut encore préserver l'emplacement que vous devez revisiter.

## Recueillir des notes de page et de document {/* #document-notebook */}

1. Ouvrez **Notes & Annotations** ou choisissez **Open full notes view** dans la barre latérale.
2. Utilisez **Add note → Add document note** pour une question sur l'ensemble du papier. Utilisez **Add page note** pour une page spécifique, et vérifiez son champ de page avant d'enregistrer.
3. Entrez la note et choisissez **Save**. Ici, la note de document demande quelle microscopie, spectroscopie et mesures catalytiques distinguent les atomes isolés des nanoparticules après chauffage.
4. Utilisez **Search & filter** pour trouver des notes par texte, type ou tags. Dans la barre latérale, **All notes** et **Current page** changent les annotations qui sont affichées.
5. Sélectionnez **Show annotation source** sur une note de passage ou de région pour revenir à son emplacement enregistré. **Edit annotation note** modifie le commentaire; **Delete annotation** supprime cette annotation, et non la PDF.

![La note du document et le point fort marqué dans la vue Notes et annotations complètes](/img/open-science/v0320/pdf-notebook.webp)

## Trouvez une note dans une autre vue {/* #find-notes */}

Ouvrez une recherche globale avec **Cmd/Ctrl+K**, entrez une phrase de votre note et sélectionnez **Library**. Cet exemple recherche `covalent metal-support`. Sélectionnez le résultat pour lire **Notes** séparément de **Quoted text**, puis choisissez **Show annotation source** pour ouvrir le PDF à son passage marqué.

![La recherche globale sépare la note de lecture enregistrée du texte PDF cité](/img/open-science/v0320/pdf-search-details.webp)

Vérifiez le nom du fichier, la version du fichier et la page lors de la révision d'une note. Une note PDF n'est pas automatiquement un nouveau message ou une nouvelle instruction pour Main. Utilisez **To Agent** et inspectez le brouillon lorsque vous voulez interroger l'agent au sujet du matériel.

## Exporter des billets ou une copie de lecture {/* #export-notes */}

| Sortie | Étapes | Quoi vérifier |
| --- | --- | --- |
| Notes de marquage ou CSV | Dans **Notes & Annotations**, choisissez **Markdown** ou **CSV**, puis **Export notes** | Ouvrez le fichier enregistré et vérifiez le devis, le commentaire, la page et les étiquettes. Avec un filtre sous-ensemble, **Export filtered notes** exporte ce sous-ensemble. Effacer les filtres lorsque vous avez besoin de chaque note. |
| PDF avec annotations | Ouvrez le menu de téléchargement de PDF et choisissez **Download PDF with annotations** | Enregistrer un fichier séparé et le rouvrir dans un lecteur PDF. Vérifiez le contenu du point fort et notez, pas seulement qu'un fichier existe. |
| PDF original | Choisissez **Download original PDF** | Cela permet d'enregistrer les octets sources sans ajouter les marques du carnet de documents. |

![Séparer les actions de téléchargement originales-PDF et annotées-PDF](/img/open-science/v0320/pdf-export-options.webp)

L'exemple enregistre deux notes : une surligne avec un commentaire et une note de document. Les deux apparaissent dans les <ExampleDownload path="/examples/v0320/lang2019-notes.md">Importation d'une marque</ExampleDownload> et <ExampleDownload path="/examples/v0320/lang2019-notes.csv">Exportation de CSV</ExampleDownload>. Le PDF annoté conserve les dix pages du document et ajoute le point fort et la note; le téléchargement original reste séparé. Les extraits de papier sont de Lang et al. sous [CC BY 4.0 licence](https://creativecommons.org/licenses/by/4.0/) du papier; les commentaires lisent des questions pour cet exemple.

## Où les notes sont partagées {/* #where-notes-are-shared */}

Un **Pièce jointe à la bibliothèque** partage son carnet de notes sur des références, des projets et des sessions qui utilisent la même version de fichier gérée. **Transferts de projets et artefacts** partage son carnet de notes entre les sessions du projet propriétaire. Une version de fichier plus récente est une cible d'annotation différente : vérifier la version avant de supposer qu'une marque appartient à un document révisé.

Ces notes sont stockées localement et ne se synchronisent pas entre les machines. Pour un transfert, exportez les billets ou un PDF annoté et vérifiez ce que le destinataire recevra. Cela ne change pas les signets privés de session ou fait chaque note de lecture d'un [Paquet de recherche .science](research-packages.md).
