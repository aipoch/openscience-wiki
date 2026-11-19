---
title: "Planifier une tâche de recherche"
last_update:
  date: '2026-11-19'
---

# Planifier une tâche de recherche {/* #schedule-a-research-task */}

Utilisez un calendrier pour les travaux qui devraient se dérouler à un moment connu : examiner les documents ajoutés récemment, résumer les changements de projet, ou réutiliser un script préparé. Chaque course a un enregistrement que vous pouvez ouvrir et inspecter. Gardez Open-Science en marche sur l'ordinateur qui possède le calendrier.

## Préparer une tâche qui peut fonctionner sans surveillance {/* #prepare */}

Achever d'abord l'action prévue une fois dans le projet. Vérifiez les entrées, la connexion du modèle, l'exécution, l'emplacement de sortie et les autorisations requises. Un calendrier ne répare pas les identifiants manquants ou installe chaque dépendance pour vous. Les courses n'attendent pas une nouvelle confirmation humaine; les interactions non résolues peuvent arrêter le travail. Pour une nouvelle conversation, sélectionnez un modèle **Main** utilisable dans **Settings → Model**, ou définissez les valeurs par défaut de la nouvelle conversation. Importer un abonnement seul ne sélectionne pas un modèle. Les tâches basées sur le modèle consomment le quota du fournisseur sélectionné.

## Créer l'agenda {/* #create */}

1. Ouvrez le projet, allez à **Schedule** et choisissez **New task**. **Start from an example** peut remplir une ébauche pour un résumé d'expérience quotidien ou une revue de littérature hebdomadaire.
2. Entrez un **Name** reconnaissable. Choisissez **Action → Send a message** ou **Run a script**.
3. Pour un message, écrivez la tâche sous **Instructions**. Sous **How to run**, choisissez **Continue an existing conversation** ou **New conversation for each run**. Sélectionnez **Target conversation** lorsque vous continuez.
4. Pour un script, choisissez une conversation existante et son **Language**: Python, R ou Shell. Entrez le **Script** complet. Évitez de vous fier aux variables temporaires d'un noyau antérieur; chargez explicitement les entrées requises.
5. Réglez **Repeat** à **Once**, **Fixed interval**, **Daily** ou **Weekly**. Vérifiez l'heure de début, l'intervalle ou les jours de semaine selon le cas, puis validez **Time zone** et **Next run**.
6. Réviser **Execution permissions**. N'utiliser que l'accès aux besoins de la tâche. Une conversation existante peut suivre ses permissions de conversation ; le réglage de la permission d'un horaire ne fournit pas d'identifiants ou contourne les règles du réseau Strict.
7. Dans le cadre de la **Advanced**, définissez en option un temps de fin ou un nombre maximal d'exécutions. Pour les scripts, revoyez le délai d'exécution. Choisissez **Create** et vérifiez la tâche enregistrée et la prochaine exécution.

<p className="example-label"><strong>Exemple</strong> Préparer une synthèse bibliographique hebdomadaire</p>

Utilisez **Send a message**, choisissez vendredi et votre propre heure locale, et adapter cette instruction à un projet contenant des documents et des notes:

```text
Review papers and reading notes added to this project in the last seven days.
For each paper, summarize its main finding and link to its source or project file.
Distinguish abstract-only records from papers whose full text is available.
If nothing was added, say so. Keep the digest in English.
```

Cette tâche passe en revue le matériel existant du projet. Pour rechercher de nouveaux articles, demandez explicitement une recherche et configurez d'abord le [connecteurs de littérature](../tools/databases.md) requis.

## Exécutez un résumé d'enseignement unique {/* #worked-example */}

<p className="example-label"><strong>Exemple pratique</strong> Programmer le résumé de cinq valeurs</p>

Utilisez **Send a message**, nommez la tâche **Teaching summary — one run**, et entrez :

```text
In English, state the mean and median of the hypothetical observations 2, 4, 6, 8, 10.
Explain in two sentences why these values alone do not support population inference.
Do not use tools or create files.
```

Choisissez **New conversation for each run**, **Repeat → Once**, et une heure future. Utilisez **Existing permissions only** : cette tâche n'a pas besoin d'outils. Sélectionnez **Create** et maintenez l'application en marche.

![Une tâche de message unique avec ses instructions, une nouvelle cible de conversation et la prochaine exécution](/img/open-science/v130/schedule-create.webp)

À l’heure prévue, ouvrez la tâche et consultez **Results**. Dans cet exemple, la moyenne et la médiane valent toutes deux **6**. La réponse explique pourquoi cinq valeurs hypothétiques ne permettent pas de conclure sur une population. **Open session** ouvre la conversation ; la tâche ponctuelle passe à **Completed**. Vérifiez le contenu du résultat avant de le réutiliser.

![Message programmé complété et résultat de l'enseignement](/img/open-science/v130/schedule-result.webp)

## Inspecter une course et modifier le calendrier {/* #run-history */}

Ouvrez l'historique d'exécution de la tâche et sélectionnez une occurrence. Inspectez son statut, la conversation de destination et le résultat. **Run completed** enregistre l'achèvement de cette opération; inspecte la réponse réelle ou la sortie de script avant de l'utiliser comme preuve de recherche. **Failed**, **Interrupted** et **Skipped** ont besoin de lire la raison associée, sans supposer qu'un résultat a été produit.

Utilisez **Pause** pour suspendre les prochaines exécutions, puis **Resume** pour les reprendre. Après toute modification des horaires, vérifiez la prochaine exécution. **Close** met fin à la tâche. Si une tâche terminée ou fermée est en lecture seule, créez-en une nouvelle. Consultez l’historique avant de répéter une opération manuellement, surtout après une reconnexion ou un redémarrage de l’application.

Pour les enregistrements d'exécution et la récupération d'exécution, voir [Notebook](notebook.md). Pour les limites d'accès, voir [modes d ' homologation](approval-modes.md) et [règles de réseau](network.md).
