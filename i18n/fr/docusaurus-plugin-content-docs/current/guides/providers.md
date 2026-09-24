---
title: "Configuration du fournisseur et du modèle local"
last_update:
  date: '2026-09-24'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Configuration du fournisseur et du modèle local {/* #provider-and-local-model-setup */}

## Choisissez une méthode d'accès {/* #choose-an-access-method */}

![Connexion d'abonnement Codex dans la configuration pour la première fois en anglais](/img/open-science/walkthrough-2026-09-08/07-model-codex-subscription.webp)

`Provider type` sélectionne l'accès à l'abonnement, un API officiel ou `Custom Gateway`. Les choix d'abonnement disponibles dépendent du cadre de l'agent actif. La configuration de Codex capturée affiche `Codex subscription`, xAI OAuth, API officielles et passerelle personnalisée; ne pas supposer qu'un autre cadre présente les mêmes choix.

| Choix | Ce dont vous avez besoin | Vérifier avant de poursuivre |
| --- | --- | --- |
| Abonnement Codex | Une connexion compatible Codex | Inspecter la `Codex authentication` le choix; importer l'authentification des copies d'accès existantes dans Open-Science |
| Officiel API | Accès à ce fournisseur et au modèle demandé | Confirmer le fournisseur, la région, le cas échéant, et le certificat API |
| Passerelle personnalisée | Un paramètre compatible, un modèle d'ID exact et une clé API au besoin | Confirmez le format API et les fonctionnalités du modèle supporté avec l'opérateur de passerelle |

Choisissez **Import existing Codex sign-in** pour copier une connexion locale de travail dans Open-Science. L'importation peut inclure une route de retour en boucle non-secret compatible; d'autres configurations globales, Skills et sessions restent séparées. Sous **Advanced settings → Transport**, gardez **Auto (recommended)** à moins que votre connexion ne nécessite un transport différent.

## Choisissez une région fournisseur ou un modèle de catalogue gratuit {/* #provider-regions */}

Pour **SenseNova**, sélectionnez **Chine** ou **Global** dans le formulaire fournisseur avant de choisir un modèle. Utilisez la touche API pour cette région, examinez la liste de modèles qui en résulte, sélectionnez **Save** et attendez la validation de la connexion avant que la modification ne soit engagée. Les régions de commutation peuvent modifier les modèles de point de départ et les modèles disponibles; un nom de clé ou de modèle de l'autre région peut ne pas fonctionner.

Pour les passerelles telles que **OpenRouter** ou **OpenCode Zen**, sélectionnez un modèle libre uniquement lorsque cette entrée exacte est offerte pour le cadre actif. Utilisez le compte et les justificatifs requis par le service. Une entrée de catalogue gratuite ne supprime pas les limites d'utilisation ou n'établit pas de support pour chaque entrée d'outil ou d'image. Ne pas ajouter `:free` à un modèle d'ID arbitraire. Envoyer une petite demande et vérifier le modèle retourné et le résultat avant d'utiliser la connexion pour la recherche.

## Connectez un abonnement Codex existant {/* #connect-an-existing-codex-subscription-verified-procedure */}

1. Ouvrez **Settings → Model → Add provider**.
2. Définit **Provider type** à **Codex subscription**.
3. Dans **Codex authentication**, choisissez **Import existing Codex sign-in**. Cela nécessite une connexion utilisable sur cet ordinateur. Il copie l'authentification dans le profil de l'application; il n'importe pas vos autres sessions Codex ou Skills.
4. Sélectionnez **Save**. Attendez pendant que la ligne du fournisseur affiche **Testing…**; une ligne sauvée seule n'est pas la vérification de succès.
5. Confirmez **Connection verified** et **Authentification importée dans Open-Science** dans la ligne fournisseur. L'interface libérée peut afficher le nom du produit sans un trait d'union.
6. Dans **Main model**, sélectionnez un modèle d'abonnement disponible. Par exemple, sélectionnez une entrée **gpt-5.6-sol** disponible si votre compte l'offre. Vérifiez le nom du modèle et le fournisseur ensemble, surtout lorsque plusieurs fournisseurs offrent des modèles nommés de la même façon.
7. Ouvrez un projet et envoyez une requête limitée. Un test de connexion vérifie l'authentification, tandis qu'une réponse réelle vérifie le chemin de requête. Confirmer la réponse et toute demande de permis d'utilisation d'outils apparaît dans cette session.

![Abonnement Codex vérifié et modèle principal sélectionné](/img/open-science/walkthrough-2026-09-08/70-codex-subscription-connected.webp)

| Contrôle de l'offre | Utilisez-le quand | Vérification de la réussite |
| --- | --- | --- |
| **Check Codex login** | La connexion sauvegardée peut avoir expiré. | La vérification en attente s'installe dans l'état affiché vérifié ou défaillant. |
| **Re-import Codex login** | Vous avez rafraîchi la connexion externe et souhaitez mettre à jour la copie de l'application. | L'authentification est importée et vérifiée à nouveau. |
| **Edit** | Vous devez revoir les paramètres d'authentification ou de transport. | Sélectionnez Enregistrer et attendre la validation réussie avant que l'édition ne soit engagée. |
| **Delete** | Un fournisseur non utilisé doit être retiré. | La disponibilité dépend de l'exigence du fournisseur; une dépendance active peut empêcher la suppression. |

Si l'importation signale qu'une connexion Codex soutenue par un fichier est manquante, connectez-vous à travers le flux Codex supporté et réessayez **Re-import Codex login**. Une connexion détenue uniquement dans un magasin de titres de compétence externe n'est pas nécessairement un fichier importable.

Ne pas interpréter **Testing…** comme une défaillance, ou **Connection verified** comme une preuve que chaque modèle et outil listé peut fonctionner. Si l'importation échoue, remplissez le flux d'entrée et de réessayer Codex pris en charge; ne collez pas l'authentification JSON dans une prompte ou une documentation.


L'agent exécute le travail; le fournisseur de modèle fournit le modèle. L'installation de Codex ne permet pas de connecter automatiquement un fournisseur. Dans la configuration de la première fois, cette page suit Agent runtime. Après la configuration, ouvrez **Settings → Model** pour gérer l'accès du fournisseur.

## Mettre à jour ou supprimer un justificatif API {/* #update-or-remove-an-api-credential */}

Après avoir modifié une clé au service, trouvez son fournisseur dans **Settings → Model**, sélectionnez **Edit**, entrez le remplacement dans **API key**, et sélectionnez **Save**. Le fait de laisser ce champ vide maintient la clé existante; ça ne l'éclaircit pas. La connexion est testée avant que l'édition ne soit engagée. Si l'authentification échoue, vérifiez le paramètre, le compte auquel appartient la clé et sa validité avant de réessayer.

Après **Connection verified**, remplissez une petite demande avec ce fournisseur. Supprimez un fournisseur non utilisé avec **Delete**, en vérifiant son nom dans la confirmation. La suppression de la configuration de l'application ne révoque pas la clé au service.

## Portail personnalisé : chaque champ visible {/* #custom-gateway-every-visible-field */}

![Erreurs de champ requis dans le formulaire de passerelle personnalisé](/img/open-science/walkthrough-2026-09-08/08-model-required-fields.webp)

Commencez par sélectionner `Custom Gateway`. Changer le type de fournisseur peut préserver le nom de l'affichage de la sélection précédente, alors examinez le nom au lieu de supposer qu'il a été réinitialisé.

| Champ ou contrôle | Entrée et comportement |
| --- | --- |
| `Provider type` | Sélectionne la famille de fournisseurs et change la forme visible |
| `Name` / `Provider name` | Nom d'affichage optionnel, tel que `Lab gateway`; pas d'identificateur de modèle |
| `Base URL` | Adresse de base de passerelle requise. Les paramètres du modèle à distance nécessitent HTTPS; HTTP est autorisé pour les adresses localhost et loopback. Utilisez l'adresse réelle de votre opérateur, pas le non-travailleur `https://gateway.example` titulaire de place. |
| `API format` | Sélectionnez la fin de la discussion, les messages ou les réponses; la route affichée aide à identifier le protocole correspondant |
| `API key` | Requis pour les passerelles distantes; optionnel pour une passerelle loopback locale qui n'a pas besoin d'authentification. Saisissez un vrai titre de compétence si votre serveur local en a besoin |
| Oeil / `Show API key` | b) Élimine la visibilité de l ' entrée principale actuelle; garder caché avant de capturer ou de partager l'écran |
| `Model` | l'identificateur de modèle exact requis accepté par le paramètre; la capture d'écran `demo-model` n'est qu'un détenteur de place |
| `Context window` | Limite de contexte du modèle facultatif; blanc demande le fournisseur par défaut |
| Préréglages de contexte | `32K`, `64K`, `128K`, `200K`, `256K`, `1M`; sélection `128K` remplissages `128000` |
| `Advanced settings` | Élargit ou effondre la capacité et les champs de limites de jetons |
| `More information` (`i`) | Ouvre l'aide contextuelle à côté de l'étiquette associée |
| `Back` | Retourne à Agent runtime; l'assistant possède le brouillon de forme afin qu'il puisse survivre à la navigation arrière |
| `Test & continue` | Valide les champs requis, puis teste le fournisseur avant de lancer des paramètres valides; avances après une validation applicable réussie |

Les trois formats API affichés dans le menu sont :

- **Clavardage** — `/v1/chat/completions`.
- **Messages** — `/v1/messages`.
- **Réponses** — `/v1/responses`.

Ce sont des choix de protocole, pas des instructions pour ajouter chaque route listée à l'URL de base. Une passerelle peut prendre en charge un format sans prendre en charge les autres.

<ToolOperationGroup>
<summary>Champs avancés et contrôles conditionnels</summary>

Une ancienne configuration HTTP distante reste modifiable mais ne peut pas envoyer de requêtes. Obtenez un paramètre HTTPS de l'opérateur de service, enregistrez-le et testez à nouveau. Un serveur de modèle loopback local peut conserver son adresse HTTP; un serveur LAN distant a encore besoin de HTTPS.

### Champs avancés et contrôles conditionnels {/* #advanced-fields-and-conditional-controls */}

| Champ ou contrôle | Comment le régler |
| --- | --- |
| `Image input` | Activer seulement si la passerelle et le modèle sélectionné acceptent le contenu de l'image |
| `Thinking mode` | Activer seulement si la passerelle/modèle accepte les contrôles de pensée ou d'effort |
| `Supported effort levels` | Apparaît avec une pensée activée; sélectionner les niveaux réellement supportés, plutôt que de les déduire d'un nom de modèle |
| `Reasoning request format` | Apparaît pour la fin de la conversation avec la pensée activée; sélectionnez comment la passerelle attend les paramètres d'effort |
| `Maximum input tokens` | Limite d'entrée séparée facultative; blank utilise la valeur par défaut du fournisseur. Préréglages: 32K, 64K, 128K, 200K, 256K, 1M |
| `Maximum output tokens` | Limite de sortie séparée en option. Préréglages: 4K, 8K, 16K, 32K, 64K, 128K |

Activez **Thinking mode** pour configurer les niveaux d'effort pris en charge. Pour **Clavardage**, sélectionnez également le format de requête de raisonnement pris en charge par votre paramètre. Ces déclarations doivent correspondre aux capacités API du fournisseur.


</ToolOperationGroup>

### Tester la configuration de la passerelle {/* #reproduce-the-form-walkthrough */}

1. Sélectionnez la passerelle personnalisée et élargissez les paramètres avancés.
2. Saisissez l'URL de base et l'ID exact du modèle fourni par l'opérateur de passerelle, ainsi qu'une clé API au besoin. Les champs obligatoires manquants produisent des erreurs en ligne et vous gardent sur cette page.
3. Saisissez un nom d'affichage reconnaissable. Pour une connexion réelle, saisissez le paramètre et le modèle réels fournis par votre fournisseur; les porteurs de place de démonstration ne peuvent pas passer un test de connexion.
4. Choisissez un contexte prédéfini et validez la valeur numérique.
5. Activer le mode Thinking uniquement lorsqu'il est pris en charge, puis inspecter les champs d'effort nouvellement visibles. Changer le format API peut changer les champs disponibles.
6. Si une clé est nécessaire, entrez-la en privé et gardez-la cachée. Sélectionnez `Test & continue` lorsque vous êtes prêt pour une demande de fournisseur.
7. Attendez le résultat. `Testing connection…` indique la validation en attente; Les clics répétés sont désactivés. Les flux d'abonnement utilisent plutôt `Sign in & continue`, `Waiting for sign-in…` et `Cancel sign-in` le cas échéant.

## Connectez un paramètre de modèle local {/* #connect-a-local-model-endpoint */}

<p className="example-label"><strong>Exemple</strong> Connectez un modèle local Qwen à Ollama</p>

Un serveur modèle local fonctionne séparément de Open-Science. Choisissez **Custom Gateway** pour un paramètre compatible, et utilisez un Agent qui prend en charge son format API. L'exemple ci-dessous utilise Ollama avec OpenCode. L'installation d'un interprète Python Notebook n'installe pas de serveur modèle.

### Démarrez le serveur et téléchargez le modèle {/* #start-the-server-and-download-the-model */}

Installez [Ollama](https://ollama.com/download), puis lancez un serveur de test local uniquement dans un terminal :

```sh
OLLAMA_HOST=127.0.0.1:11435 OLLAMA_CONTEXT_LENGTH=32768 ollama serve
```

Gardez ce terminal ouvert. Dans un autre terminal, téléchargez le modèle sur ce serveur :

```sh
OLLAMA_HOST=127.0.0.1:11435 ollama pull qwen3:0.6b
```

Attendez que le téléchargement soit terminé. Si le serveur fonctionne mais que le modèle demandé est absent, Open-Science peut rapporter **Test failed: the configured model was not found.** Terminer le téléchargement, confirmer l'ID du modèle exact et sélectionner **Test connection** à nouveau.

### Saisissez les paramètres du fournisseur {/* #enter-the-provider-settings */}

Ouvrez **Settings → Model → Add provider** et entrez  :

| Champ | Cet exemple de connexion locale |
| --- | --- |
| Type de fournisseur | Passerelle personnalisée |
| Nom | Démo locale Qwen |
| URL de base | `http://127.0.0.1:11435` |
| Format API | Achèvement de la discussion (`/v1/chat/completions`) |
| Clé API | Laisser en blanc pour ce paramètre de retour en boucle non authentifié; utiliser le titre de compétence réel pour une passerelle authentifiée |
| Modèle | `qwen3:0.6b` |
| Fenêtre contextuelle | `32768`, correspondant au serveur en cours d'exécution |
| Paramètres avancés → Jetons de sortie maximum | `4096` |
| Entrée de l'image / Mode de réflexion | Arrêt pour cette vérification de connexion |

![Adresse du modèle local, format API et identifiant du modèle exact](/img/open-science/non-workflow-completion/08-local-provider-form.webp)

Le formulaire ajoute `/v1` à la racine de la passerelle. Open-Science accepte une clé API vide pour les adresses loopback telles que `localhost`, `127.0.0.1` et `[::1]`; l'ancienne capture d'écran peut afficher un détenteur de place. Une passerelle distante ou LAN nécessite toujours HTTPS et une clé API. Utilisez le format API de votre serveur local.

Établir un budget de sortie qui laisse la place à l'historique des entrées et des conversations. OpenCode réserve un budget de sortie lorsque ce champ est vide; une grande réserve peut provoquer un compactage répété dans une petite fenêtre contextuelle. La fenêtre contextuelle déclarée doit également correspondre à l'allocation du serveur modèle. Modifier le formulaire seul ne change pas la configuration d'exécution d'Ollama.

### Sélectionnez un Agent compatible et vérifiez une réponse {/* #select-a-compatible-agent-and-check-a-reply */}

Dans **Settings → Agent**, installez **OpenCode → App-managed download** s'il manque, puis sélectionnez sa carte et validez **Switch**. Retourner à **Model** et sélectionner le modèle local. Commencez une nouvelle conversation avec une courte demande de connexion seulement avant de l'utiliser pour la recherche. Vérifiez que la demande se termine effectivement; un fournisseur enregistré ou un test de connexion réussi ne permet pas à lui seul d'établir un raisonnement scientifique fiable, une utilisation d'outils ou un support d'image.

La vérification de connexion effectuée avec **Modèle local connecté.** en utilisant le paramètre local configuré et OpenCode. Il vérifie une demande de texte, pas une analyse biomédicale.

![Vérification de la connexion du modèle local terminée](/img/open-science/non-workflow-completion/09-local-model-reply.webp)

Gardez le serveur en marche en utilisant le modèle. Pour un Agent sur un autre hôte, `localhost` se réfère à cet hôte. Un navigateur atteignant un point final ne prouve pas que l'Agent peut l'atteindre.

### Vérifiez un appel d'outil réel {/* #check-an-actual-tool-call */}

<p className="example-label"><strong>Exemple</strong> Vérifie l'appel d'outil Notebook d'un modèle local</p>

Après confirmation d'une connexion, utilisez une petite tâche avec un résultat connu pour tester le chemin de l'outil. Demandez à l'agent d'exécuter cela via le Python Notebook au lieu de retourner l'arithmétique mentale:

```python
print(8664 + 18515)
print((8664 + 18515) == 27179)
```

Ce sont les premiers nombres zéro et les nombres de gènes détectés de GSE60450. Inspecter le code proposé dans le panneau d'autorisation, l'approuver, puis ouvrir **Notebook** et vérifier **27179 / Vrai**.

![Code Notebook et sortie réelle à partir d'un appel d'outil modèle local](/img/open-science/priority-completion/21-local-model-python-result.webp)

`qwen2.5:7b` local a complété cet appel à travers le cadre Codex et un point d'arrêt local de Finalisation de Chat. Sa proposition initiale faisait référence à un module d ' aide non disponible; le contrôle a réussi après avoir décliné cette proposition et précisé le code sans dépendance ci-dessus. Ceci vérifie une opération d'outil limitée, pas une planification fiable d'une analyse complète RNA-seq ou un comportement équivalent sous un autre cadre Agent.

## Si l'installation n'avance pas {/* #if-setup-does-not-advance */}

| Symptôme | Prochaine vérification |
| --- | --- |
| Messages de champ requis | Complétez les champs nommés; un seul nom d'affichage est insuffisant |
| Stockage sécurisé des clés non disponible | Déverrouiller ou autoriser le coffre-fort des certificats de système d'exploitation; les clés ne peuvent pas être sauvegardées tant qu'elles ne sont pas disponibles |
| Défaut de connexion/authentification | Vérifiez le titre de compétence, le paramètre, le format et l'accès au modèle spécifique |
| Le fournisseur a changé pendant l'essai | Revoir le fournisseur actuel et tester à nouveau; un résultat remplacé ne doit pas être complètement configuré |
| Signature annulée | Recommencer quand vous êtes prêt; l'annulation n'est pas une connexion réussie |
| Installé le temps d'exécution mais aucun fournisseur utilisable | Raccordement du modèle de finition; l'installation et l'autorisation du fournisseur sont séparées |

### Recherche d'erreur HTTP {/* #http-error-lookup */}

Pour les réponses 400, 401, 403, 404, 429 ou 5xx, utilisez le [Table de dépannage HTTP](troubleshooting.md#http-errors-400-403-429-and-5xx). Conservez le service répondant et son message détaillé avec le code d'état.

Source: [PrestataireForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ProviderForm.tsx), [PrestataireStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/ProviderStep.tsx).

## Enregistrer un changement de fournisseur dans v0.31.0 et plus tard {/* #validated-provider-save */}

Les modifications des fournisseurs sont testées avant qu'ils ne soient engagés. Sélectionnez **Save**, attendez le résultat de la connexion et confirmez le succès avant de fermer le formulaire. Un test échoué ne remplace pas une configuration sauvegardée de travail. Si une connexion précédemment enregistrée est rejetée lors d'une demande, sa disponibilité est mise à jour; vérifier le titre de compétence et le point final, puis tester à nouveau. **Conversation models**, **Classification models** et **Local parsing models** ont des objectifs différents; Voir [paramètres du modèle](models.md#classification-models).

## Sélection StepFun et région {/* #stepfun-regions */}

Choisissez **StepFun** dans le catalogue des fournisseurs, validez **Chine** ou **Global**, puis sélectionnez un modèle et fournissez des identifiants pour cette région. v0.32.0 ajoute **Step-5 Preview**, avec des métadonnées de catalogue multimodaux et 1M-context. L'accès réel au modèle, le quota et le support d'entrée dépendent toujours du compte du fournisseur et de la compatibilité de l'Agent sélectionné.

Enregistrer et vérifier la connexion avant de la choisir dans une conversation. Les configurations de fournisseurs existantes conservent leur paramètre précédent; mettre à jour l'application ne change pas leur région ou modèle Main.

## Catalogues des fournisseurs mis à jour {/* #provider-catalog-updates */}

Le catalogue v0.33.0 ajoute des modèles **Xiaomi MiMo v2.6** et **xAI Grok 4.7**, et rafraîchit **OpenCode Zen** et **Allez.**. Nouvelles configurations MiMo par défaut vers `mimo-v2.6-pro`; les choix existants de v2.5 restent disponibles. Grok 4.7 devient xAI=s nouveau par défaut alors que les ID précédents du modèle restent listés.

Sélectionnez le modèle exact proposé pour votre Agent actif, vérifiez ses options d'entrée et de raisonnement et lancez une petite requête. Un catalogue par défaut ne modifie pas le modèle dans chaque session existante ou garantit l'accès à votre compte. Codex peut rester Main pendant que vous configurez un [service de classement](models.md#classification-models) séparément.

## Nouveaux choix de catalogue {/* #catalog-models */}

Les catalogues des fournisseurs v0.33.1 ajoutent **GPT-6** et **Claude Opus 5.5**. Ouvrez la liste de modèles du fournisseur et choisissez une entrée prise en charge par le cadre actif et votre compte. La présence du catalogue ne permet pas d'accéder au modèle Main enregistré ou de le changer. Valider le fournisseur et envoyer une petite demande avant d'utiliser un modèle modifié pour la recherche.
