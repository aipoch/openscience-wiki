---
title: "Rechercher sur le Web et lire les sources"
last_update:
  date: '2026-11-20'
---

# Rechercher sur le Web et lire les sources {/* #search-the-web-and-read-sources */}

Utilisez le **Open-Science Agent** intégré pour trouver des pages Web publiques et lire leur texte dans une conversation. Ceci est utile pour localiser les lignes directrices de rapport, la documentation logicielle et les annonces de recherche. Pour les notices bibliographiques et les documents en texte intégral, utilisez également [bases de données scientifiques](databases.md) et [Bibliothèque](../guides/library.md).

## Commencez par une question {/* #start */}

1. Dans **Settings → Agent**, sélectionnez **Open-Science Agent**. Connectez un modèle Main pris en charge dans **Settings → Model**; un abonnement Codex peut fournir le modèle.
2. Ouvrez une conversation de projet. Indiquez ce que vous voulez trouver, quelles sources prioriser et quelle limite de date. Demandez à l'agent de lire la page pertinente avant de répondre.
3. Si une approbation apparaît, inspecter la requête de recherche, la plage de temps, la limite de résultat et les filtres de domaine. Approuver seulement la demande prévue. Une approbation de lecture de page concerne l'URL de destination.
4. Élargir l'activité de l'outil et inspecter les sources retournées. Suivez les citations de la réponse à la preuve avant d'utiliser ses allégations.

Exemple de demande :

```text
Find the official PRISMA 2020 checklist page on the public web.
Read the relevant official page and explain what the checklist is for.
Give the source URL and distinguish the webpage text you read from any
linked PDF you did not open. Keep the answer in English.
```

La recherche intégrée envoie des requêtes à **Exa** sans nécessiter un compte Exa. La lecture d'une page contacte son site web. Votre mode de permission s'applique toujours, et l'annulation ne peut pas rétracter une demande déjà envoyée. Ne pas inclure de données de recherche confidentielles dans une recherche publique.

## Lisez les preuves, pas seulement l'extrait de code {/* #read-sources */}

Un résultat de recherche est un extrait. Demandez à l’Agent de lire la page choisie et de citer les passages qui étayent sa réponse. La lecture accepte le HTML public, le Markdown et le texte brut. Elle ne se connecte à aucun compte, n’utilise pas les cookies de votre navigateur et n’exécute pas le JavaScript du site. Pour les articles et les pièces jointes, utilisez les procédures PDF et Library : une page de présentation HTML ne constitue pas le texte intégral de l’article.

Lorsque le texte retourné est tronqué, demandez à l'Agent de continuer à lire l'extrait de page sauvegardé avant de tirer des conclusions. Une source enregistrée reflète ce qui a été récupéré à ce moment-là. Demandez un nouveau prix quand la formulation actuelle compte. Les sources conservées peuvent suivre les directions générales des séances et les exportations admissibles de produits de recherche; cela n'archive pas le site web entier.

## Si une source ne peut pas être lue {/* #recover */}

- Pour une limite de taux, attendez l'intervalle indiqué avant de réessayer. N'envoyez pas à plusieurs reprises la même requête échouée.
- Si un filtre requis n'est pas pris en charge, conservez cette exigence et choisissez une autre source ou un autre itinéraire de recherche; n'élargissez pas silencieusement la recherche.
- Pour un mur de connexion, une page bloquée ou un type de fichier non pris en charge, ouvrez la source officielle vous-même et fournissez un fichier accessible autorisé, le cas échéant. Ne pas décrire une page non lue comme une preuve vérifiée.

Pour la recherche et le dépistage des documents de recherche, continuer avec [recherche documentaire ciblée](../workflows/focused-literature-search.md).
