---
title: "Pouvoirs de service"
last_update:
  date: '2026-09-20'
---

# Pouvoirs de service {/* #service-credentials */}

Configurez les identifiants dans **Settings → Credentials** pour le service qui fait réellement la demande. Un abonnement Codex opérationnel fournit un accès modèle; il ne fournit pas OpenAlex, GitHub ou un compte personnalisé MCP.

## Entrées de service intégrées {/* #built-in-service-entries */}

| Services | Domaines et objectifs | Comment vérifier |
| --- | --- | --- |
| GitHub | Jeton d'accès personnel pour la découverte/importation Skill | Utiliser Connect/Manage et les commandes de jeton; puis tester l'opération de dépôt prévue. |
| Accès bibliographique | Courriel de contact et clé optionnelle BCNI API | Enregistrer les coordonnées; La clé de l'ICNE est facultative pour les demandes appuyées. |
| OpenAlex | Clé API pour les opérations OpenAlex dans la littérature | Valider la clé saisie, la sauvegarder et faire une requête limitée. |
| Unpaywall | Contacter l'email pour les recherches de localisation en texte intégral | Utilise l'email de contact de littérature configuré; pas d'adresse inventée. |

**Connect** ouvre un service non configuré; **Manage** ouvre une version existante. **Desktop only** signifie que l'opération d'identification a besoin du contexte de bureau. Un indicateur clé stocké n'est pas la valeur secrète elle-même.

## Ajouter une clé OpenAlex manquante {/* #openalexs-actual-missing-key-flow */}

1. Demander une recherche OpenAlex alors qu'aucune clé n'est configurée.
2. La conversation affiche **Add your OpenAlex API key** avec un champ **API key**.
3. **Save key** stocke la clé entrée et reprend l'appel d'attente lorsqu'il réussit. **Not now** laisse le titre de compétence non configuré.
4. Lisez l'état final de l'outil. Choisir **Not now** peut renvoyer **credential_required**; configurer la clé avant de réessayer.

![Demande de titre OpenAlex dans l'application anglaise](/img/open-science/capabilities-walkthrough/25-openalex-credential-request.webp)

L'invite indique que la clé est chiffrée sur cet ordinateur et envoyée uniquement à `api.openalex.org`. Dans les paramètres, le formulaire OpenAlex offre également **Validate**, **Save**, **Remove key** lorsqu'il en existe, et **Cancel**. Un champ de remplacement ne révèle pas la clé stockée. Les erreurs de stockage sécurisé nécessitent de résoudre l'état du porte-clés système avant de sauvegarder des secrets.

## Pouvoirs pour les connecteurs personnalisés {/* #credentials-for-custom-connectors */}

Créez le titre ici, puis sélectionnez son nom dans le [Configuration du connecteur](../guides/connectors.md). Inspecter les consommateurs avant de modifier ou de supprimer un titre de compétence partagé.

### Nouvelles informations d’identification {/* #new-credential */}

| Champ ou bouton | Fonctionnement |
| --- | --- |
| Nom | Donnez au titre une étiquette locale reconnaissable. |
| Type | Choisir **API key**, **Access token**ou **OAuth**. |
| Valeur | Entrez un secret dans le champ masqué pour une clé / jeton. Vider les champs requis garder Enregistrer désactivé. |
| OAuth → URL des ressources | Fournissez le point final exact de la ressource. La correspondance Connector dépend de l'URL de la ressource, du transport et de l'enregistrement. |
| Avancé → Transport | Choisir le transport requis par le service OAuth; La valeur par défaut de HTTP a été vérifiée. |
| Étendues | Entrez les champs séparés par des espaces ou des virgules. |
| Utiliser un client pré-enregistré | Révéler **Authorization server URL**, **Client ID**, **URL de rappel**et **Client secret**. |
| URL de rappel / Copier | Le défaut inspecté a été `http://127.0.0.1/oauth/callback`; copiez-le pour l'enregistrement de service ou élargissez l'option de rappel personnalisé. |
| Découverte | Le cas échéant, découvrez les métadonnées du serveur; Ce n'est pas un succès en soi. |
| Annuler / Enregistrer | Jeter le brouillon ou stocker une configuration valide des justificatifs. |

![Champs d'inscription avancés OAuth](/img/open-science/walkthrough-2026-09-08/33-credential-oauth-advanced.webp)

Dans un Connector personnalisé, lier le justificatif à un en-tête, une variable d'environnement ou un sélecteur OAuth. Le nom est la référence; ne placent pas les valeurs secrètes dans les descriptions ou les instructions de projet. Les configurations portatives exportées remplacent les secrets par des détenteurs de place. Un titre de compétence sauvegardé a encore besoin d'un test de service réel/Connector pour établir qu'il fonctionne.

## Vérification et dépannage {/* #verify-and-troubleshoot */}

Après avoir économisé, répéter une petite opération et inspecter sa réponse. Utiliser `credential_required` pour un secret configuré manquant, 401 pour un défaut d'authentification à enquêter, et 403 pour un refus d'accès/politique à enquêter; un 403 n'est pas fixé universellement en remplaçant la clé. 429 concerne les limites de taux/d'utilisation. Lisez le corps réel du service et voyez [Dépannage](../guides/troubleshooting.md).

L'enlèvement d'un titre de créance peut affecter chaque Connector lié à celui-ci. Les exportations de Connector et de Specialist excluent délibérément les secrets/trusts prêts à l'emploi; les configurer à nouveau sur le récepteur. Ne collez jamais un secret dans un rapport Skill, une capture d'écran ou un rapport de problème.

Les requêtes OpenAlex nécessitent une clé OpenAlex valide. Les connecteurs OAuth doivent remplir la connexion du service nommé. Résoudre l'erreur d'authentification affichée avant de réessayer la même petite requête.

Référence de mise en œuvre: [PouvoirsPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/CredentialsPanel.tsx), [ConnecteurAddForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ConnectorAddForm.tsx).

[Gestion des titres de compétence CLI/SDK](../reference/cli.md#manage-connectors-and-credentials) peut créer/mise à jour des identifiants partagés via un accès local authentifié. Les installations sans tête Linux peuvent choisir explicitement [stockage de fichiers non chiffré](../reference/server.md#credential-storage-on-headless-linux); les identifiants de bureau conservent leur comportement normal de stockage de l'OS. Cette option ne résout pas le stockage de mot de passe de Calculer ou d'initier la première connexion OAuth.

## Ouvrir la page clé officielle API {/* #official-api-key-page */}

À partir de v0.31.0, OpenAlex et les invitations de reconnaissance NCBI incluent un lien vers la page clé officielle de API. L'ouvrir garde le formulaire brouillon et attend l'appel Connector. Compléter les étapes du compte avec le service, retourner au formulaire d'attestation, puis valider et enregistrer la clé prévue avant de réessayer la requête. Ouvrir la page clé seule ne permet ni d'enregistrer une clé, ni de compléter la requête d'attente.
