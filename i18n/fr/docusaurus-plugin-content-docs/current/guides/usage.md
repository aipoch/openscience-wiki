---
title: "Utilisation et activité des jetons"
last_update:
  date: '2026-10-08'
---

# Utilisation et activité des jetons {/* #token-usage-and-activity */}

Utilisez **Settings → Usage** pour inspecter le volume de jeton et l'activité locale déclarés. Utilisez le menu **Token usage** d'une réponse ou la session **Context window** pour une vue plus étroite. Ceux-ci répondent à différentes questions : les appels totaux peuvent consommer de nombreux jetons tandis que le contexte actuel occupe une fenêtre beaucoup plus petite.

Utilisez la période affichée et la métrique pour interpréter chaque graphique. les comptages de jetons signalés décrivent l'activité; vérifier les limites d'abonnement ou la facturation avec le fournisseur.

## Filtrer le résumé {/* #filter-the-summary */}

1. Ouvrez l'utilisation et choisissez **Today**, **This week**, **Last 30 days** ou **All time**.
2. Lisez l'étiquette de fraîcheur. Utilisez **Refresh** après une exécution terminée si la page est bloquée.
3. Comparez les quatre champs de jeton et les compteurs d'activité New/Total.
4. Vérifiez l'étiquette de la période du graphique avant de le comparer avec le résumé.

![Résumé aujourd'hui avec les graphiques quotidiens séparés](/img/open-science/guides-walkthrough/13-usage-today.webp)

| Champ | Interprétation |
| --- | --- |
| Total des jetons | Agrégat déclaré pour la période sélectionnée. |
| Jetons d'entrée | la composante d'entrée déclarée; ne remplace pas une estimation de la longueur du texte local. |
| Jetons de cache | Utilisation attribuée au cache par le moteur de rapport. |
| Partage de cache | une proportion du volume d'entrée/cache pertinent; un tiret signifie qu'il n'est pas disponible, et non pas une course à prix zéro. |
| Jetons de sortie | Composant produit déclaré. |
| Nouvelles sessions/projets/cours/articles | Éléments créés dans la période sélectionnée. |
| Total des sessions/projets/exécutions/articles | Nombres globaux; ils n'ont pas besoin d'égaler les nouveaux comptes de la période. |

Dans la vue d'aujourd'hui exploitée, les totaux de jetons étaient nuls avant que la course en cours n'ait enregistré son utilisation, tandis que le graphique fixe 30-jour contenait encore l'activité d'hier. C'est le comportement de la période prévue, pas le comptage incohérent. Les chargements et les artefacts générés sont des ressources différentes; Le téléchargement d'un fichier source ne crée pas en soi un artefact généré.

## Lire l'activité quotidienne et la composition {/* #read-daily-activity-and-composition */}

**Daily activity metric** offre Total jetons, Input jetons, Output jetons, Cache jetons, Nouvelles sessions, Nouveaux projets, Nouveaux artefacts et Runs. Sélectionnez une métrique, puis inspectez une cellule de date. Les cellules plus foncées représentent des valeurs plus grandes à l'intérieur de l'échelle affichée.

**Daily token usage** montre les composants empilés d'entrée, de cache et de sortie. Les deux graphiques sont marqués **derniers 30 jours**; changer la période de résumé supérieure ne change pas cette plage fixe. Comparez comme des périodes avant de tirer des conclusions sur les augmentations.

## Expliquer les valeurs manquantes ou inattendues {/* #explain-missing-or-unexpected-values */}

| Symptôme | Vérifier |
| --- | --- |
| Une conversation terminée n'a pas d'usage | Certains fournisseurs et les anciens dossiers omettent la télémétrie. Rafraîchir une fois, puis inspecter la propre utilisation de la réponse. |
| Haut total, mais un petit contexte utilisé pourcentage | L'utilisation totale accumule les appels; contexte mesure l'occupation à un moment donné. |
| Les nouveaux compteurs changent sans usage de jeton | La création de projet et la gestion de session peuvent se produire sans demande modèle. |
| Les totaux ne ressemblent pas à une facture | Cette page n'est pas le registre de facturation du fournisseur ni le tableau de bord des limites d'abonnement. |
| Un gros composant cache | Lire la ventilation déclarée; ne pas déduire les économies de trésorerie sans les règles de facturation réelles du fournisseur. |

La page ne comprend que l'utilisation signalée. Il ne reconstruit pas l'histoire manquante. Pour la composition du contexte et le compactage, voir [Contexte de mémoire et de conversation](./memory.md).

Source: [Contrôles des panneaux d'utilisation et des cartes](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/TokenUsagePanel.tsx).

## Inspecter les jours adjacents {/* #inspect-daily-usage */}

Passez à travers le graphique **Daily token usage** pour inspecter les dates successives et la ventilation de leur entrée, cache et sortie. Pour l'accès au clavier, utilisez **Tab / Maj + Tab** pour vous concentrer une journée, et **Échappement** pour fermer le détail. Comparer la date et les composants affichés; Ce graphique couvre toujours les derniers jours de 30 et ne reconstitue pas la télémétrie manquante du fournisseur.
