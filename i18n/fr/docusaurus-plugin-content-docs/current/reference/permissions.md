---
title: "Autorisations et contrôle"
last_update:
  date: '2026-09-28'
---

# Autorisations et contrôle {/* #permissions-and-control */}

Utilisez cette page pour identifier la règle responsable d'une décision d'autorisation. Pour les étapes de révision d'une carte ou de révocation d'une subvention, voir [Autorisations et agréments](../guides/approval-modes.md).

## Couches de permission {/* #permission-layers */}

| Calque | Valeurs ou champ d'application | Ce qu'il gouverne |
| --- | --- | --- |
| Profil de conversation | `ask`, `auto`, `full` | Le comportement d'approbation de l'agent pour la conversation actuelle |
| Profil choisi par rapport au profil effectif | Dépendant du temps de course | Le cadre peut exposer moins de capacités que le profil choisi n'exige; inspecter son explication |
| Bourse de capacité oubliée | Conversation, projet, mondial | Correspondance des appels futurs pour la capacité enregistrée et la qualification |
| Politique de l'outil Connector | Toujours permettre, Demandez à chaque fois, Bloc | l'outil Connector sélectionné; un outil bloqué échoue avant la recherche de subvention |
| Accès au système de fichiers | Chemins et modes d'accès sélectionnés | Quels emplacements externes une opération peut accéder |
| Politique du réseau Notebook | Destinations autorisées et contrôles de connexion | Indique si l'exécution peut atteindre une destination demandée |
| Capacités Specialist | Attribué Skills et connecteurs | Ce qui est disponible pour ce rôle |

Ces couches ne sont pas interchangeables. Un accès complet modifie le comportement rapide de l'agent; il n'installe pas d'outil, ne fournit pas de justificatif, rend un serveur accessible ou prouve que la protection réseau d'un runtime permet la connexion.

## Profils et champs d'application {/* #profiles-and-scopes */}

| Valeur de l'assurance-chômage | Contrat | Signification |
| --- | --- | --- |
| **Ask for approval** / **Ask** | `ask` | Demander des opérations qui nécessitent une approbation, sous réserve des subventions existantes et des exceptions détenues par la demande |
| **Auto-approve edits** / **Auto** | `auto` | Les modifications de l'espace de travail pris en charge et les opérations de bibliothèque reconnues peuvent passer automatiquement; les appels shell ou MCP arbitraires ne sont généralement pas autorisés. Voir [Règles de la bibliothèque](../guides/approval-modes.md#library-auto). |
| **Full access** | `full` | Autoriser les requêtes d'autorisation d'agent sans invites manuelles où l'exécution le supporte |
| **Once** | `once` | Seul l'appel courant; pas de subvention durable |
| **Cette conversation** | `session` | Correspondance des appels dans cette conversation, y compris sur les redémarrages |
| **This project** | `project` | Les appels correspondants dans ce projet; confirmation de large portée |
| **Global** | `global` | Correspondance des appels entre les projets; confirmation de large portée |

La carte n'offre que des champs d'application pris en charge par cette demande. Il choisit normalement la portée de la conversation lorsque disponible, puis une fois. Ne pas déduire une fois à partir de la position du bouton; lire son étiquette complète. Les préfixes de commande et les qualificatifs de catégorie peuvent couvrir plus d'une répétition identique d'un appel.

**Default permission mode** affecte les nouvelles conversations. Les conversations existantes conservent leur propre cadre. **Auto-review** est une option de révision des résultats séparée; ce n'est pas le profil d'autorisation `auto`.

## Ordonnance de décision Connector {/* #connector-decision-order */}

Le courtier Connector évalue ces conditions :

1. Si l'outil correspond à **Block**, rejetez-le.
2. Sinon, appliquez la configuration d'autorisation/d'essai de Connector. Une entrée automatique de niveau Connector peut permettre l'appel; un outil nécessitant une approbation continue jusqu'à la prochaine vérification.
3. Résoudre une subvention mémorisée applicable pour la capacité et le projet/conversation en cours.
4. S'il n'y en a pas, indiquer les champs d'approbation pris en charge. Si l'approbation n'est pas disponible ou refusée, échouez l'appel.
5. Résistez à une approbation mémorisée avant de libérer l'opération, à moins que l'appelant ne reporte explicitement la persistance jusqu'à ce que sa propre étape d'autorisation.

Une subvention sauvegardée ne peut pas remplacer **Block**. Inversement, la révocation d'une subvention mémorisée ne peut pas introduire de délai si une politique d'autorisation ou une subvention plus large couvre encore l'appel. Lisez la police affichée et les conseils de couverture.

## Subventions globales par défaut {/* #default-global-grants */}

La source définit les subventions de base 20. Ce numéro décrit les valeurs par défaut intégrées, et non le nombre que chaque profil installé doit afficher.

| Famille | Capacités de référence | Nombre |
| --- | --- | ---: |
| Personnalisation | Créer/mettre à jour un Specialist; publier/éditer un Skill; attache/détache Skills et connecteurs vers/depuis un Specialist | 8 |
| Skills | Invoquer un Skill | 1 |
| Lecteur de littérature | `read_document` | 1 |
| Contrôle Notebook | Lister les runtimes, lire l'état Notebook, liste Catégories de mémoire, mémoires de recherche, inspecter les paquets | 5 |
| État d ' avancement du plan | `update_step_status` | 1 |
| Bibliothèque de références | Rechercher, lire l'abstrait, lire PDF, références de format | 4 |

Certains par défaut permettent la personnalisation écrit. Ne pas décrire le niveau de référence comme des permissions de lecture seule. - **Restore defaults** ajoute des subventions mondiales de base manquantes sans compensation d'autres subventions. Il ne réinitialise pas tous les paramètres d'autorisation ou défaire le travail terminé.

Il existe également des exceptions en dehors de cette liste : enregistrer un résultat déjà existant ou en ligne grâce à la capacité exacte d'un artefact, afficher une question d'interaction et déclarer un groupe d'activité peut passer sans carte d'autorisation supplémentaire. De telles exceptions dépendent de l'identité de l'outil vérifiée, et non du titre d'affichage rassurant d'un outil.

## Révocation et état incomplet {/* #revocation-and-incomplete-state */}

| Observation | Signification |
| --- | --- |
| Une rangée reste couverte globalement ou par un projet | L'élimination de cette subvention plus étroite laisse un pouvoir plus large en vigueur |
| Un indice politique dit bloqué | La politique empêche l'appel même s'il existe une ligne mémorisée |
| Mise en garde incomplète des magasins | L'inventaire visible peut omettre les subventions; la révocation en vrac est désactivée jusqu'à ce que l'ensemble complet soit connu |
| Révision ou subvention manquante | Un autre changement a invalidé la ligne demandée; rafraîchir et inspecter l'état actuel |
| Annuler l'avis | Inverse la révocation de subvention admissible dans le cadre de sa disponibilité affichée; il n'inverse pas les effets d'un outil |

Référence technique: [profils](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/permission-profiles.ts) · [Courtier Connector](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/permission-grants/connector-broker.ts) · [Subventions de base](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/permission-grants/defaults.ts) · [politique de l'agent](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/acp/permission-policy.ts).
