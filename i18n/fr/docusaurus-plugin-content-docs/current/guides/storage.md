---
title: "Stockage et travaux archivés"
last_update:
  date: '2026-09-24'
---

# Stockage et travaux archivés {/* #storage-and-archived-work */}

Utilisez **Settings → Storage** pour inspecter l'emplacement des données gérées et l'utilisation du disque. Utilisez **Settings → Archived** pour organiser des projets et des sessions inactifs. L'archivage ne déplace pas la racine de données ni ne promet la récupération de l'espace disque.

## Lire et rafraîchir l'utilisation du disque {/* #read-and-refresh-disk-usage */}

![Stockage géré réel après les exemples de recherche](/img/open-science/local-acceptance/storage-installed-location.webp)

Lire **Data location** avant de sauvegarder ou de diagnostiquer un fichier manquant. Ceci est la racine gérée de l'application, séparée d'un dossier source externe accordé à un projet. L'utilisation de rescans **Refresh**; vérifier le temps de la dernière analyse avant de comparer les mesures.

| Catégorie | Ce qu'il explique | Interprétation |
| --- | --- | --- |
| Artefacts | Résultats de recherche gérés et données conservées | Un petit dernier rapport peut encore avoir des versions antérieures |
| Téléversements | Copies d'entrée gérées | La suppression d'un fichier source externe ne supprime pas cette copie |
| Environnement d'exécution | Interprètes et dépendances gérés; élargir pour plus de détails | Habituellement plus grande qu'un petit exemple de données |
| Notebooks | Stockage de l'exécution des sessions | Exporter un Notebook nécessaire avant de supprimer son travail de propriétaire |
| Preuves d’exécution | Preuves de la version capturée | Différent du noyau actuel en direct |
| Espaces de travail de session | Fichiers de travail pour les conversations | Chaque fichier de travail n'est pas devenu un artefact publié |
| Calculer le cache / Subagent espaces de travail | Données de travail classées ou déléguées | Lire la catégorie réelle avant de supposer qu'elle est jetable |
| Total / Espace disponible | Total géré actuel et espace libre de l'appareil | Mesures, non prescriptions d'installation |

L'utilisation du disque change avec vos fichiers et runtimes. Inspecter chaque catégorie avant d'utiliser ses contrôles de gestion; une catégorie d'utilisation ne signifie pas que son contenu peut être supprimé en toute sécurité dans une seule action.

<span id="review-relocation-before-submitting" />

## Déplacer l'emplacement des données {/* #move-the-data-location */}

### Avant de bouger {/* #before-moving */}

Terminer les tâches actives et conserver les exportations d'intrants, de produits et de dossiers d'exécution importants. Enregistrez l'emplacement actuel et les paquets requis. Déplacement des données de recherche ne déplace pas tous les paramètres d'application ou l'historique de conversation, qui restent dans l'emplacement de configuration.

### Choisissez et soumettez la destination {/* #choose-and-submit-the-destination */}

1. Sélectionnez **Change location** et lisez l'avis de migration.
2. Sélectionnez **Continue** pour ouvrir le formulaire de destination.
3. Entrez **New location**, utilisez **Browse…**, ou choisissez **Retourner à l'emplacement par défaut**.
4. Vérifiez la source, la destination, l'espace disponible et l'avis de reconstruction.
5. **Change location** soumet un déménagement valide; **Cancel** laisse l'emplacement actuel inchangé.

![Formulaire de réinstallation avec les exigences de reconstruction de l'exécution](/img/open-science/local-acceptance/storage-destination-form.webp)

L'application déplace les données de recherche existantes. Les environnements Python/R sont **reconstruit après redémarrage, non copié**. Le cache de paquets partagé d'exécution est copié pour prendre en charge les reconstructions hors ligne, mais les paquets pip- ou CRAN-seulement ne sont pas garantis pour être restaurés. Un espace supplémentaire de reconstruction ne peut pas être prédit de façon fiable. Consigner les exigences en matière d'environnement/de conditionnement avant un déplacement réel et tester le temps d'exécution nécessaire après.

### Vérifiez la destination après le redémarrage {/* #check-the-destination-after-restart */}

1. Ouvrez **Settings → Storage** et confirmez que **Location** est la destination choisie.
2. Réouvrir un projet existant, son rapport sauvegardé et les révisions du rapport précédent. Vérifiez également la bibliothèque, les collections, les liens de projet et les pièces jointes PDF.
3. Ouvrez Notebook, inspectez le temps d'exécution disponible et réexécutez un petit calcul en lecture seule avec une entrée existante. Une copie réussie ne permet pas à elle seule de vérifier l'exécution reconstruite.
4. Conservez les données originales et les exportations jusqu'à ce que ces contrôles soient effectués. Comparer le contenu du fichier conservé ou les comptes de vérification, et confirmer les références de la bibliothèque, les collections, les liens de projet, les pièces jointes et les paramètres de citation. Enregistrer et rouvrir un nouveau résultat pour vérifier que le nouvel emplacement est enregistrable.

Pour un interpréteur externe R, confirmez que l'exécutable sélectionné existe toujours et que le Notebook reste lié à celui-ci. Chargez les paquets dont vous avez besoin pour l'analyse, recourez à un petit calcul et rouvrez le résultat enregistré. Un interprète externe et ses paquets existants sont séparés de l'environnement géré par l'application qui peut avoir besoin d'être reconstruit.

### Retour à l'emplacement par défaut {/* #return-to-the-default-location */}

1. Terminer les tâches actives, puis sélectionner **Change location → Continue → Or move it back to the default location**.
2. Vérifiez la source, la destination par défaut, l'espace libre et l'avis d'exécution-reconstruction. Soumettre et attendre **Data copied**.
3. Sélectionnez **Restart now**. Après le redémarrage, vérifiez **Settings → Storage → Location**. Si la copie a réussi mais que la commutation n'a pas été effectuée, utilisez [Relèvement des migrations](#the-data-copied-but-switching-failed).
4. Réouvrir le projet original et enregistrer les fichiers. Vérifiez la gestion de Python/R dans **Runtimes**, utilisez **Téléchargement et configuration** au besoin, et exécutez un petit calcul en lecture seule sur une entrée existante.

Après le retour, rouvrez un projet existant, entrez et enregistrez le rapport. Confirmez que l'exécution gérée est prête, puis lancez un petit calcul et enregistrez un nouveau résultat. Réouvrez-le pour vérifier que l'emplacement des données par défaut est utilisé.

![Enregistrer le résultat R rouvert après le retour à l'emplacement par défaut](/img/open-science/local-acceptance/r-default-chart.webp)

Si **Un autre dossier nommé OpenScience existe déjà ici. Choisissez un autre endroit.** apparaît, l'application bloque l'écraser. Annuler et conserver ce répertoire. Établir sa propriété, son contenu et sa sauvegarde avant de résoudre le conflit; ne supprimez pas simplement un dossier du même nom. Réessayer la migration seulement après la validation de destination passe.

### Les données copiées, mais la commutation a échoué {/* #the-data-copied-but-switching-failed */}

**Data copied** confirme la copie et vérifie; **Restart now** doit toujours changer l'emplacement des données actives. Si elle signale **Impossible de préparer l'application pour changer les emplacements de données en toute sécurité. Veuillez réessayer.**, le déménagement n'est pas terminé. Ne redirigez pas manuellement les chemins internes.

1. Conserver l'erreur et les deux emplacements. Vérifiez que le projet original et les fichiers s'ouvrent toujours.
2. Rouvrir **Change location**. Lorsqu'une copie inachevée est détectée, choisissez **Resolve unfinished move**.
3. **Finish move** tente de compléter la copie existante. **Discard copy** abandonne cette copie inachevée tout en conservant l'emplacement original. Lisez d'abord le champ de confirmation.
4. Si **Conversation storage needs attention** apparaît, résolvez le mouvement inachevé, choisissez **Retry** et rouvrez le projet et le rapport original.

![Choix de récupération pour le déménagement de stockage inachevé](/img/open-science/local-todo-batch/46-storage-recovery-choice.webp)

Si réessayer le commutateur final échoue à plusieurs reprises, terminer le travail actif, quitter et rouvrir l'application, puis réessayer le mouvement. Si l'erreur persiste, conservez l'emplacement original et recueillez les détails de la défaillance avant de procéder à un autre changement.


## Archiver une session et la rapporter {/* #archive-a-session-and-bring-it-back */}

Choisissez la session que vous avez l'intention d'archiver et de terminer ou d'arrêter d'abord son travail actif. Conservez une session séparée terminée si vous devez comparer l'état restauré.

1. Ouvrez le menu de la ligne de session et choisissez **Archive**.
2. Confirmez qu'il quitte la liste des sessions actives.
3. Ouvrez **Settings → Archived**.
4. Sous **Sessions**, identifiez son titre, son projet et son temps d'archive.
5. Sélectionnez cette ligne **Restore**.
6. Revenez au projet et confirmez que la session est à nouveau disponible.

Choisissez le **Restaurer la rangée** pour restaurer une session archivée. Le niveau de la fenêtre Restaurer ne modifie que la disposition des paramètres. Pour un projet archivé, ouvrez **Projects → Manage** pour inspecter ses sessions avant de le restaurer ou de le supprimer.

## Archiver et restaurer un projet {/* #archive-and-restore-a-project */}

1. Sur Home, ouvrez les actions de la carte de projet et choisissez **Archive**.
2. Ouvrez **Settings → Archived → Projects**, puis la ligne projet=**Manage**.
3. Lisez la liste des projets et des sessions. Les sessions peuvent afficher **Caché parce que son projet est archivé** sans être archivées individuellement.
4. Choisissez **Restore project**.
5. Réouvrir le projet, sa conversation et un rapport sauvegardé.

![Gestion du projet GSE60450 archivé](/img/open-science/local-todo-batch/34-archived-project-manage.webp)

Réouvrir un rapport sauvegardé et ses révisions après restauration. L'archivage organise le projet; il ne réexécute pas l'analyse ou ne supprime pas l'historique de la version du rapport.

<span id="delete-a-disposable-project" />

## Supprimer définitivement un projet {/* #permanently-delete-a-project */}

**Delete project** ouvre une confirmation de suppression permanente. Lisez sa portée avant de confirmer : les artefacts gérés et les téléchargements sont séparés des fichiers externes de work-folder, qui ne sont pas supprimés. Vérifiez quelles tâches et quels noyaux s'arrêteront et quels espaces de travail Session gérés restent dans Stockage. L'archivage et la suppression ont des résultats différents.

![Suppression de la portée d'un projet vide créé séparément](/img/open-science/local-todo-batch/35-disposable-project-delete.webp)

Utilisez un projet jetable vide si vous apprenez le flux de suppression. Inspectez les dossiers de confirmation avant de supprimer un projet contenant de la recherche.

## Opérations d'enlèvement distinctives {/* #distinguish-removal-operations */}

| Fonctionnement | Rétablissement et effet |
| --- | --- |
| Désépingler | Modification du placement de la session seulement |
| Archiver | Organisation réversible; travail conservé apparaît dans archivé |
| Restaurer | Retourne l'élément archivé à utiliser; il ne recourt pas à la recherche |
| Supprime une subvention pour le dossier source | Modification de l'accès à un dossier externe; pas de suppression de ce dossier |
| Supprimer le projet/session | suppression permanente après confirmation de la demande; lire les dossiers/dossiers concernés avant de procéder |
| Littérature → Passer à la corbeille | Un cycle de vie distinct de la bibliothèque de référence; restaurer là, pas dans archivé |

Avant de supprimer définitivement, exportez les entrées, les sorties et les enregistrements d'exécution que vous devez conserver. Vérifiez si d'autres travaux les référent encore, et annulez si la confirmation inclut le contenu que vous avez l'intention de conserver.

## Si le stockage ou la récupération échoue {/* #if-storage-or-recovery-fails */}

Pour un téléchargement raté, vérifiez la destination choisie et l'espace libre. Pour un fichier géré non disponible, confirmez l'emplacement et le profil des données sélectionnées avant de créer un projet de remplacement. Pour les paquets manquants après la réinstallation, vérifiez le temps d'exécution reconstruit plutôt que de supposer que les données de recherche ont été perdues. Utilisez [Dépannage](troubleshooting.md) pour recueillir les premières informations utiles sur les erreurs et les versions.

Sources: [Panneau de stockage](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/StoragePanel.tsx), [formulaire de migration](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/StorageMigrationModal.tsx). [Vérifications de la réinstallation des bibliothèques](https://github.com/aipoch/open-science/commit/d00c722d).

## Réouvrir les données après une mise à jour {/* #historical-data-location */}

Un emplacement de données sauvegardées existant a priorité. Pour une installation ancienne terminée sans emplacement explicitement enregistré, Open-Science conserve l'emplacement historique et enregistre ce choix. Si ce dossier sauvegardé n'est pas disponible, reconnectez-le avant de redémarrer. Si plusieurs emplacements historiques contiennent des données de recherche, l'application vous demande de sélectionner ou de récupérer le dossier original au lieu de choisir silencieusement un. Conservez les deux copies jusqu'à ce que vous ayez vérifié leurs projets et fichiers; ne pas créer un nouvel emplacement vide pour résoudre une perte apparente de données.
