---
title: "Autorisations et agréments"
last_update:
  date: '2026-09-28'
---

# Autorisations et agréments {/* #permissions-and-approvals */}

Utilisez **Agent controls** pour choisir comment la conversation actuelle demande l'approbation. Utilisez **Settings → Permissions** pour définir la valeur par défaut pour les nouvelles conversations et inspecter l'accès mémorisé. Il s'agit d'opérations distinctes : modifier un défaut ne réinitialise pas les conversations existantes ou ne révoque pas leurs subventions.

<span id="permission-requests" />

<span id="plan-first" />

<span id="activity-rows" />

## Choisir un mode conversation {/* #choose-a-conversation-mode */}

| Mode | Utilisez-le quand | À quoi s'attendre |
| --- | --- | --- |
| **Ask for approval** | Vous voulez inspecter les opérations demandées | Cartes d'approbation pour les actions qui n'ont pas de subvention ou d'exception applicable |
| **Auto-approve edits** | Vous autorisez les changements de routine dans l'espace de travail | Les modifications prises en charge passent automatiquement; commandes, le réseau et les opérations MCP peuvent encore avoir besoin d'approbation |
| **Full access** | Vous avez choisi d'autoriser les opérations de l'agent sans instructions | Les commandes, les modifications de fichiers et les requêtes réseau peuvent se dérouler sans cartes de permission manuelles; d'autres besoins en matière d'accès et de service demeurent |

Ouvrez **Agent controls** à côté du compositeur et lisez le mode sélectionné. Vérifiez tout message de compatibilité montrant comment le cadre l'implémente. Le contrôle d'accès complet a sa propre confirmation. **Auto-review** est un contrôle différent pour l'examen des résultats et ne signifie pas l'approbation automatique des modifications.

![Le sélecteur de mode d'autorisation en anglais](/img/open-science/walkthrough-2026-09-08/57-permission-modes.webp)

Vérifiez le mode effectif affiché pour votre Agent; Le comportement d'approbation soutenu peut différer par cadre. Tous les modes n'ont pas été appliqués dans les quatre cadres.

<span id="a-safe-approval-order" />

## Lire une carte d'approbation {/* #read-an-approval-card */}

Lisez l'opération, l'environnement sélectionné et le code proposé avant d'approuver. Pour une vérification des données, confirmez qu'il lit l'entrée prévue et n'écrit que les sorties demandées. Installer une dépendance manquante est une opération séparée avec un but et un effet différents.

![Approbation d'exécution Python du dossier public GSE60450](/img/open-science/guides-walkthrough/25-python-permission.webp)

| Contrôle ou information | Que faire ou que inspecter |
| --- | --- |
| Titre de l'outil et résumé | Identifier l'opération réelle, la cible et la source |
| Code ou arguments extensibles | Vérifier les chemins, l'exécution, les noms de paquets ou les entrées de service |
| **Authorization scope** flèche | Choisissez parmi les champs de cette requête prend en charge |
| **Allow once** | Relâchez seulement cet appel |
| **Allow for this conversation** | Rappelez-vous les appels correspondants pour cette conversation, y compris sur les redémarrages |
| **Allow for this project** | Appliquer l'accès correspondant à l'ensemble du projet et confirmer la portée plus large |
| **Allow globally** | Appliquer l'accès à la correspondance entre les projets et confirmer le champ d'application élargi |
| **Deny** | Réduire l'opération présentée; Inspecter la réponse obtenue avant de choisir une alternative |
| Options supplémentaires pour les fournisseurs, s'ils sont présents | Lire l'étiquette et l'effet; Les options disponibles varient selon la demande |

Le bouton principal Autoriser utilise normalement la portée de la conversation lorsque la requête la supporte. Lire son étiquette avant de cliquer. Pour une subvention de préfixe de commande, inspectez le préfixe affiché : les commandes ultérieures commençant par ce préfixe peuvent correspondre. Une autorisation pour un runtime n'est pas une autorisation pour un service externe non lié.

### Souvenez-vous de l'approbation de la lecture sur le Web {/* #remember-web-reading-approval */}

Pour une requête **Lire des pages web** prise en charge, choisissez **Allow for this conversation** pour vous souvenir de cette capacité pour les lectures web ultérieures dans la même conversation. Il peut couvrir d'autres sites Web, pas seulement la première URL. **Allow once** s'applique uniquement à cet appel. Examiner ou révoquer la subvention en vertu de **Autorisations mémorisées**; il n'ajoute pas d'hôtes à la liste d'autorisation du réseau Notebook ni n'autorise les téléchargements.

### Souvenez-vous de l'approbation de la recherche en ligne {/* #remember-web-search */}

Depuis v0.30.2, les requêtes natives **Search the web** prises en charge par Claude Agent proposent aussi **Allow for this conversation**. Les recherches suivantes admissibles dans cette conversation peuvent réutiliser cette autorisation. **Allow once** ne couvre que la requête actuelle. Consultez ou révoquez **Search the web** dans **Remembered permissions**. La recherche et **Read web pages** sont deux permissions distinctes. Cette option ne s’applique pas à tous les frameworks ou Connectors : vérifiez la portée affichée.

## Gérer l'accès mémorisé {/* #manage-remembered-access */}

Ouvrez **Settings → Permissions → Remembered permissions**. Filtrer par **All**, **Global**, **Project** ou **Session**. Les lignes affichent une capacité, une portée et tout qualificatif ou une couverture plus large. Un lien de session ouvre sa conversation avec le propriétaire; Un indice de politique Connector conduit à la configuration correspondante.

| Décision | Résultat |
| --- | --- |
| **Révocation** sur une ligne | Supprime immédiatement la subvention mémorisée; Inspecter l'avis d'annulation |
| Groupe **Revoke all** | Demande la suppression des subventions de ce groupe; vérifier que la portée affichée est complète avant de l'utiliser |
| **Restore defaults** | Ajoute des subventions mondiales de base manquantes et laisse intacts d'autres accès mémorisés |
| **Defaults restored** | Aucune subvention de base n'est manquante; le bouton de restauration est désactivé |
| Filtre de portée | Modifier les lignes affichées; il n'accorde ni ne révoque l'accès |

Sélectionnez **Révocation** pour supprimer la subvention prévue. Utilisez **Undo** pendant que vous l'offrez si c'était une erreur. **Restore defaults** ajoute des subventions de base manquantes; il ne restaure pas toutes les permissions que vous avez précédemment retirées.

### Lire la portée efficace d'une subvention sauvegardée {/* #read-a-saved-grants-effective-scope */}

Inspecter le qualificatif Connector/tool, **Global / Projet / Session** et **Tout appel / Input spécifique / Groupe de commande** avant de révoquer une subvention. Les entrées de groupe de commandement peuvent inclure leur résumé d'approbation et leur date.

**Blocked in Connectors; this permission is currently inactive** signifie que la subvention sauvegardée ne remplace pas la politique Connector. **Allowed by Connector policy even without this permission** signifie que le retrait de cette subvention à lui seul ne supprimera pas cette allocation de police. Ouvrez le nom de Connector pour inspecter sa règle. Utilisez **Undo** pendant que vous l'offrez si la révocation n'était pas intentionnelle, puis vérifiez l'état restauré.

### Révoquer un groupe dans la portée actuelle {/* #revoke-a-group-in-the-current-scope */}

1. Filtrer par la portée prévue, comme **Session**.
2. Sélectionnez l'action du groupe **Revoke all**.
3. Vérifiez que le groupe a été autorisé et que d'autres champs d'application conservent leurs subventions.
4. Lors de la prochaine opération d'appariement, lisez toute nouvelle demande d'approbation avant de procéder.

La révocation a une incidence sur l'autorisation future. Il n'inverse pas les modifications complétées ou les demandes de réseau, et une subvention plus large peut encore autoriser l'exploitation.

![Une nouvelle demande d'exécution après la révocation du groupe Session](/img/open-science/local-todo-batch/40-permission-request-renewed.webp)

Si l'inventaire est incomplet, attendez qu'il charge ou réessaye la demande échouée avant d'utiliser la révocation du groupe. Revérifier le champ sélectionné après la révocation.

## Diagnostiquer un comportement inattendu {/* #diagnose-unexpected-behavior */}

| Problème | Vérifications et solutions |
| --- | --- |
| Aucune carte en mode Ask | Vérifiez les autorisations mémorisées, la politique de l’outil et les exceptions propres à l’application. Le mode Ask n’impose pas une demande pour chaque lecture, enregistrement de résultat ou question à l’utilisateur. La [référence des autorisations](../reference/permissions.md) décrit les autorisations de base, notamment l’écriture des personnalisations. |
| La même opération reste possible après révocation | Recherchez une autorisation plus large au niveau du projet ou global, ou une politique qui autorise l’opération. Supprimer une autorisation de session ne supprime pas l’autorisation globale. |
| Une opération autorisée échoue | L’approbation autorise une tentative. Résolvez la cause signalée — paquet manquant, fichier inaccessible, identifiants invalides ou destination réseau refusée — avant de réessayer. Consultez [Réseau](network.md) pour les erreurs DNS et de téléchargement de paquets. |
| Certaines portées sont absentes | La carte affiche uniquement les portées prises en charge par la demande et le contexte du projet ou de la session. Ne choisissez pas une portée plus large uniquement pour compenser l’absence d’une option plus restreinte. |

Source: [Subventions sauvegardées et annulation](https://github.com/aipoch/open-science/commit/469b593b).

## Travaux de bibliothèque en mode Auto {/* #library-auto */}

Avec **Auto-approve edits**, un ensemble défini d'opérations de bibliothèque intégrées peut passer automatiquement l'approbation de l'agent par appel. Il s'agit notamment de la recherche et de la lecture de références, de l'enregistrement dans la boîte de réception, de l'acquisition de PDF, de la mise en forme de références et de la préparation de documents de citation. Cela réduit les appels répétés pendant les travaux de routine de la Bibliothèque.

La règle s'applique aux outils de littérature reconnus, et non à tous les appels, commandes ou opérations réseau MCP. Les propres règles relatives aux fichiers, aux réseaux et aux ressources des outils s'appliquent toujours, et cette décision ne crée aucune subvention permanente. Choisissez **Ask for approval** lorsque vous voulez inspecter les demandes d'agents individuellement. Passez en revue les candidats et candidates avant de les accepter.
