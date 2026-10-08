---
title: "Reproductibilité"
description: "Relancer les étapes de recherche capturées, comparer un résultat enregistré et conserver le dossier de vérification."
last_update:
  date: '2026-10-08'
---

# Reproductibilité {/* #reproducibility */}

Utilisez **Reproducibility** pour réexécuter la procédure enregistrée pour un résultat enregistré et comparez la nouvelle sortie avec cette version de fichier. La vérification relie les entrées, les enregistrements d'exécution, les informations d'environnement et les comparaisons de sortie afin que vous puissiez inspecter comment un résultat a été produit.

## Quand l’utiliser {/* #when-to-use-it */}

- Avant de partager un résultat, vérifiez si sa procédure saisie produit une sortie correspondante.
- Lors de l'examen d'un résultat, vérifier les différences entre le fichier sauvegardé et une nouvelle exécution.
- Lorsque vous remettez le travail à un collègue, conservez un dossier de vérification en même temps que les fichiers et les versions pertinents.

Choisissez l'action qui répond à votre question:

| Décision | Objet |
| --- | --- |
| Reproductibilité | Réinitialisez une procédure capturée et comparez ses sorties avec les versions sauvegardées. |
| [Article de synthèse](../specialists/reviewer.md) | Évaluer les éléments de preuve sélectionnés et rendre compte des constatations de l'examen. |
| [Générer un script](notebook.md) | Reconstruire le code à utiliser en dehors du Notebook d'origine. |

## Avant le début {/* #before-starting */}

Ouvrez le résultat enregistré et sélectionnez la version que vous voulez vérifier. Allez sur **File actions → Provenance → Reproducibility** et inspectez les fichiers d'entrée capturés, les exécutions de Notebook et les verrous d'environnement.

Résoudre d'abord tout **Areas needing attention**. Une vérification dépend des preuves enregistrées pour cette version. Si une exécution antérieure a échoué ou que les preuves requises sont manquantes, exécutez avec succès le code requis et produisez une nouvelle version de résultat; une ancienne version manquante n'est pas remplie rétroactivement.

Le démarrage d'une vérification nécessite l'interface du bureau. Les enregistrements d'exécution pris en charge sont requis : cette fonctionnalité ne rejoue pas une conversation entière ou ne vérifie pas tous les types de fichiers.

### Préparer l'environnement {/* #prepare-environment */}

Pour une première vérification, utilisez un environnement Python ou R géré par l'application. Open-Science capture les verrous de dépendance supportés lorsque le code tourne. Une liste de paquets ou une sortie `pip freeze` seule n'est pas suffisante pour restaurer des sources exactes de paquets.

1. Ouvrez **Settings → Runtimes**. Dans la langue requise, préparez le **App-managed environment** et validez **Ready** et **Enable**. Voir [configuration de l'exécution](runtimes.md).
2. Demandez à l'Agent de sélectionner cet environnement pour la session et d'inspecter les dépendances du code original. Installez les paquets manquants via le flux de gestion des paquets pris en charge, redémarrez le noyau si demandé, puis vérifiez leurs importations dans le même Notebook. Vérifiez le [interprète actif](runtimes.md#confirm-the-active-interpreter) avant de continuer.
3. Réinitialisez la préparation nécessaire et le code producteur en utilisant les entrées originales, puis enregistrez une nouvelle version de résultat. Conserver le résultat original pour comparaison; Le fait de modifier les paramètres ne met pas à jour les données recueillies.
4. Ouvrez le **Provenance → Environment** de la nouvelle version, vérifiez son verrouillage et tout diagnostic de paquet manquant, puis retournez à **Reproducibility**. Continuer lorsque **Check reproducibility** est disponible et que les entrées et les sorties nécessaires sont présentes.

Si l'environnement existant manque encore de verrouillages exacts, activez **Settings → Runtimes → Let the Agent create environments** et demandez un environnement séparé géré par l'application avec les dépendances d'analyse d'origine. Demandez à l'Agent de le sélectionner et de vérifier les importations requises, puis répétez les étapes 3–4. Préserver l'environnement existant; ne modifiez pas la méthode d'analyse pour rendre la vérification disponible.

Si la nouvelle version affiche toujours **Unavailable**, conservez **View details**, les noms/versions du paquet et l'exécution sélectionnée. Résoudre toute déclaration de [erreur de connexion paquet-source](network.md) avant de recommencer. Si le verrou ne peut toujours pas être capturé, arrêter et utiliser [Dépannage](troubleshooting.md); laisser le résultat non vérifié.

<p className="example-label"><strong>Exemple pratique</strong> Inspecter un échantillon de CQ résumé</p>

La capture d'écran affiche un résumé généré dans Notebook à partir de [Tableau QC de l'échantillon GSE60450](../reference/example-data.md). Ouvrez l'onglet fichier , **Provenance → Reproducibility** pour inspecter ses entrées capturées et exécuter. Ici, **Not verified yet** et **Unavailable** indiquent qu'il manque un verrouillage d'environnement exact. Utilisez **View details**, puis suivez le [étapes de préparation à l'environnement](#prepare-environment) pour créer une nouvelle version. Cet écran ne montre pas une reproduction réussie des résultats.

![Le résumé de QC sauvegardé et son panneau de reproductibilité, montrant des preuves capturées et une vérification non disponible](/img/open-science/feature-guides-2026-09/reproducibility-evidence.webp)

## Effectuer un contrôle {/* #run-a-check */}

1. Dans **Reproducibility**, confirmez la version de résultat sélectionnée et ses entrées.
2. Choisissez **Check reproducibility**, ou **Check again** pour une autre tentative.
3. Si vous choisissez un point de départ enregistré avec **Check from here**, inspectez **Files to restore** et **Runs to execute**, puis choisissez **Start check**. Une préparation antérieure peut encore être nécessaire lorsqu'une étape dépend de l'état précédent de Notebook.
4. Suivez les progrès et le journal. La vérification restaure les entrées enregistrées et l'environnement isolément. Utilisez **Cancel** si vous devez arrêter.
5. Lorsque la vérification se termine, ouvrez chaque sortie des détails de comparaison avant de décider si le résultat correspond.

Le menu session offre également **Check session artifacts** pour la vérification de plusieurs versions de résultats capturés. Examiner les versions admissibles et leurs résultats individuels; une action au niveau de la session n'établit pas que chaque résultat a été vérifié.

## Lire le résultat de la comparaison {/* #read-the-comparison-result */}

| Résultat | Que faire ensuite |
| --- | --- |
| Résultat reproduit | Inspecter les critères de comparaison enregistrés et les conserver avec la conclusion. |
| Le résultat diffère | Inspectez les différents fichiers et les détails de comparaison avant de décider si la différence affecte votre travail. |
| Pas encore vérifié | Aucune vérification effectuée n'établit de correspondance pour cette version. Examiner les éléments de preuve disponibles et commencer une vérification lorsque vous êtes prêt. |
| Vérification arrêtée / Vérification annulée | Lire le journal, résoudre la cause signalée si nécessaire, puis réessayer. L'annulation n'est pas un résultat comparatif. |

La fin d’une exécution ne suffit pas à établir que les résultats correspondent. L'égalité des octets, les comparaisons d'images/tables limitées et les critères scientifiques répondent à différentes questions. Des résultats identiques selon les critères enregistrés ne valident pas la méthode scientifique.

## Enregistrer et partager l'enregistrement de vérification {/* #save-and-share-the-verification-record */}

1. Choisissez **Export verification record** et enregistrez l'enregistrement.
2. Réouvrir le fichier téléchargé et vérifier quel fichier source, la version et le résultat de comparaison il décrit.
3. Conserver les fichiers sources et les versions pertinents avec cet enregistrement. Avant d'effacer les sorties reproduites, inspecter les contrôles de conservation et enregistrer les fichiers dont vous avez besoin.

Pour transmettre ensemble les branches, les fichiers et les preuves de conversation, utilisez un [Paquet de recherche .science](research-packages.md). Un enregistrement fourni par l'expéditeur ne signifie pas que l'ordinateur récepteur a réorganisé le contrôle.

## Lorsqu'un chèque ne peut pas être terminé {/* #when-a-check-cannot-finish */}

Inspectez **Areas needing attention** et le premier message de journal pertinent. Des données manquantes, des preuves incomplètes ou des opérations non étayées peuvent empêcher la vérification. Les grands fichiers RDS/H5AD ne sont pas chargés pour la comparaison du contenu; l'absence de comparaison n'établit pas de correspondance.

v0.30.2 corrige le replay des entrées créées plus tôt dans le même tour et supporte les importations standard-bibliothèque Python, plus les points d'entrée de pip de vérification-environnement Windows. Si une ancienne version s'est arrêtée à l'une de ces étapes, mettre à jour et réessayer le même résultat capturé, puis inspecter le nouveau journal et la comparaison. Ces corrections ne fournissent pas de verrouillage d'environnement manquant ou rendent chaque parcours historique rejouable.

Si la préparation dépend d'un état Notebook antérieur, inspecter le [preuve de l'exécution](notebook.md) et réexécuter la préparation nécessaire avant de générer un nouveau résultat. Garder les contrôles arrêtés ou incomplets distincts des comparaisons terminées.

Si vous avez déjà un paquet de verrouillage supporté et avez besoin de restaurer les paquets en dehors de l'application, suivez le [conditions de restauration de l'exécution](runtimes.md#conditional-restore). Cette procédure ne crée pas de verrouillage manquant ou remplace la préparation ci-dessus. Restaurer les dépendances à elles seules n'établit pas que les sorties se reproduisent.

## Inspectez l'histoire avant de reprendre {/* #replay-vs-verification */}

Utilisez [Rejouer la session](session-replay.md) pour inspecter l'ordre enregistré des messages, l'activité de l'outil et les versions de fichiers. Rejouer les affichages des preuves enregistrées avec le calendrier de présentation reconstruit; il ne réexécute pas le code, ne redemande pas les bases de données ou n'établit pas qu'un résultat se reproduit. Utilisez **Reproducibility** ci-dessus lorsque vous avez besoin d'une nouvelle comparaison d'exécution et de sortie.
