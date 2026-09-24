---
title: "Raccourcis clavier"
last_update:
  date: '2026-09-24'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

import Screenshot from '@site/src/components/Screenshot';

# Raccourcis clavier {/* #keyboard-shortcuts */}

Les actions de clavier dépendent de la concentration. Une clé qui modifie le texte dans le Compositeur peut naviguer dans une liste de résultats ou fermer un aperçu lorsqu'un contrôle différent est focalisé. Lisez le raccourci visible et la surface sélectionnée avant de l'utiliser lors d'une tâche en cours d'exécution.

<PlatformGuide />

## Rechercher et naviguer {/* #search-and-navigate */}

| Décision | macOS | Windows/Linux | Objectif et résultat |
| --- | --- | --- | --- |
| Ouvrir la recherche de l'application | &#42;K | Ctrl+K | Rechercher des projets, des sessions, des messages, des fichiers et de la littérature; voir [champ de recherche](navigation.md) |
| Recherche dans les paramètres | &#42;K | Ctrl+K | Pendant que les paramètres sont ouverts, concentrez sa recherche d'en-tête; voir [Aperçu des paramètres](../settings/overview.md) |
| Déplacer à travers les résultats de recherche | En haut / en bas | En haut / en bas | Palette de commandes : déplacez le point fort |
| Premier / dernier résultat | Accueil / Fin | Accueil / Fin | Navigation des résultats de la recherche lorsqu'elle est gérée par la palette |
| Ouvrir le résultat sélectionné | Entrez | Entrez | Inspectez les détails du résultat, puis ouvrez le message, le fichier ou l'enregistrement correspondant |
| Fermer la recherche/menu | Essence | Essence | Rompez la superposition active; Les formulaires non conservés peuvent avoir leur propre confirmation |
| Déplacer la focalisation | Tab / Maj + Tab | Tab / Maj + Tab | En avant/en arrière grâce aux commandes activées |

Ouvrez la recherche de l'application avec le raccourci pour votre plateforme et entrez une phrase, un titre ou un nom de fichier. Sélectionnez un résultat, vérifiez son contexte dans le volet de détail, puis ouvrez le contenu correspondant. Utilisez l'entrée source-message pour trouver le contexte d'un fichier. Voir [Navigation](navigation.md) pour les filtres et la portée de recherche; la recherche séparée de Wiki inclut le texte du corps de documentation.

## Entrées de composition et de référence {/* #compose-and-reference-inputs */}

| Entrée | Où l'utiliser | Vérifier avant de poursuivre |
| --- | --- | --- |
| `@` | Compositeur | Choisir un fichier/article/suggestion de référence; le texte simple ne lie pas un fichier |
| `/` | Compositeur | Sélectionnez un Skill disponible; son apparence n'établit pas toutes les conditions préalables au runtime |
| `#` | Compositeur | Sélectionnez la référence de transcription de session prévue |
| En haut / en bas | Compositeur vide au début | Inspecter l'histoire et les attachements rapides restaurés avant de reprendre |
| Ctrl+Z | Éditeur de texte ciblé | Annule le projet d'édition géré par cet éditeur |
| Ctrl+Shift+Z/Ctrl+Shift+Z | Compositeur focalisé | Refaire un avant-projet d'édition où supporté |
| Affichage du raccourci Envoyer | Compositeur | Il soumet la demande; utiliser le bouton Envoyer si incertain au sujet d'un brouillon multiligne |

<PlatformContent platform="windows">

Dans l'application de bureau Windows, cliquez à l'intérieur du brouillon Compositeur avant d'utiliser **Ctrl+Z** pour annuler ou **Ctrl+Shift+Z** pour refaire. Vérifiez le texte résultant avant de poursuivre ou d'envoyer. Lors de l'utilisation de **Tab / Maj + Tab**, recherchez les contours de la commande ciblée, comme le bouton de fixation ci-dessous. Confirmer à nouveau la concentration après ouverture d'un panneau ou changement de l'état d'un contrôle; ne pas compter sur un nombre fixe de keypresses.

<Screenshot
  src="/img/open-science/windows/keyboard-attachment-focus.webp"
  alt="Le bouton de fixation a un contour visible du clavier-focus dans le compositeur Windows"
  width={1916}
  height={1014}
  windowBounds={[215, 850, 920, 150]}
  href="/docs/img/open-science/windows/keyboard-attachment-focus.webp"
  linkLabel="Ouvrir la capture d&#39;écran complète de Windows montrant la mise au point du bouton de fixation"
/>

Le détail montre le contour et l'outil du bouton de fixation. Sélectionnez l'image pour ouvrir la capture d'écran complète.

</PlatformContent>

N'utilisez pas un raccourci générique de déso comme substitut pour restaurer un artefact supprimé ou inverser le code exécuté. Une archive Undo notice, lorsqu'elle est offerte, est une action séparée de text-editor undo. Utilisez [Archivé](storage.md) pour restaurer le travail conservé après que l'avis a disparu.

## Travailler avec les prévisualisations et les files d'attente {/* #work-with-previews-and-queues */}

Concentrez un onglet de prévisualisation avant d'utiliser **Gauche/droite** pour déplacer entre les onglets ou **Page d'accueil/Fin** pour choisir le premier/dernier onglet. **Supprime/Supprimer** sur un onglet d'aperçu focalisé ferme cet onglet; il ne supprime pas le fichier source. À l'intérieur d'un rapport modifiable, ces touches éditent plutôt le texte. Utilisez le contrôle de proximité visible lorsque la mise au point est incertaine.

Un onglet **Side Chat** focalisé a une confirmation destructive-close : confirmer que le chat s'arrête et supprime sa conversation enregistrée. Utilisez **Cancel** ou effondrez la zone de prévisualisation pour la conserver. Voir [Side Chat](delegation.md).

Dans une requête en file d'attente, concentrez sa poignée de récommande, appuyez sur **Espace** pour la récupérer, utilisez **En haut/en bas** pour la déplacer et appuyez à nouveau sur **Espace** pour la déposer. Lire l'ordre résultant avant d'envoyer. Ce n'est pas la même chose que de se déplacer entre les résultats de recherche ou de naviguer dans l'historique Compositeur. L'édition/l'enlèvement des requêtes et la livraison retardée sont décrits dans [Conversations](composer.md).

### Redimensionner sans perdre de fichiers ouverts {/* #resize-without-losing-open-files */}

Faites glisser le diviseur à côté de l'aperçu pour changer sa largeur. **Collapse preview panel** le cache; **Expand preview panel** restaure les onglets ouverts. Les onglets ouverts restent disponibles après l'effondrement/l'expansion. Utiliser un onglet focalisé pour les touches de navigation; dactylographie à l'intérieur d'un éditeur de fichiers a différents effets.

## Si un raccourci ne semble pas répondre {/* #if-a-shortcut-seems-unresponsive */}

Vérifiez quel champ ou boîte de dialogue possède focus, fermez les superpositions non liées et essayez le bouton visible. Sur macOS, certaines touches Home/End nécessitent la combinaison Fn du clavier. Les raccourcis OS/browser peuvent intercepter les clés avant que l'application les voie. La fenêtre de bureau et le point d'entrée du navigateur n'ont donc pas besoin de gérer chaque clé de façon identique.

Sources: [Gestion globale du clavier de recherche](https://github.com/aipoch/open-science/blob/v0.30.0/src/renderer/src/components/global-search/GlobalSearchDialog.tsx), [onglets d'aperçu](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/PreviewPanel.tsx), [file d'attente](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/workspace/ComposerMessageQueue.tsx).

## Recherche dans le panneau des paramètres actuels {/* #local-settings-search */}

Dans les paramètres, **- Oui.** (macOS) ou **Ctrl+K** (Windows/Linux) focalise la recherche d'en-tête sur les paramètres. **K** ou **Ctrl+Alt+K** concentre le champ de recherche admissible dans le panneau ou la boîte de dialogue en cours. Le raccourci local a besoin d'un champ de recherche local disponible; il n'ouvre pas la recherche dans l'ensemble de l'application ou la recherche texte PDF.
