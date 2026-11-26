---
title: "Générer et modifier des images"
last_update:
  date: '2026-11-25'
---

# Générer et modifier des images {/* #generate-and-edit-images */}

Créez une illustration à partir d'une invite, puis raffinez une image sélectionnée tout en conservant des versions antérieures. Utilisez ceci pour des diagrammes explicatifs ou des illustrations de présentation. Une image générée n'est pas une preuve expérimentale; vérifier les étiquettes scientifiques, les structures et les allégations visuelles avant de la partager.

## Configurer un service d'image {/* #configure */}

1. Ouvrez **Settings → Model** et trouvez **Image generation**. Ouvrez **Image services → Add image service**.
2. Choisissez **Provider type**. Pour **Custom HTTP service**, entrez **Name**, **Base URL** et **API key**, puis ajoutez les **Model ID** et **Préréglage de l'interface** exactement pris en charge par le service. Pour un paramètre personnalisé, correspondre à son **API format** à l'API image du service.
3. Sauvegardez le service, puis choisissez-le sous **Image generation model**. **Not configured** signifie que la génération d'images n'est pas prête.
4. Commencez par une petite demande d'image et inspectez l'image retournée. Les nouveaux paramètres d'image s'appliquent à partir du tour suivant.

![Configuration du service d'image avec les champs de paramètre, de format API, de justificatif et de modèle](/img/open-science/v130/image-service.webp)

Main, Vision et génération d'images ont différents emplois. Principale dirige la conversation ; Vision lit des images ; génération d'images les crée ou les modifie. Un abonnement Codex pour Main ne fournit pas automatiquement une API de génération d'images ni son allocation de facturation. Gardez votre modèle principal de travail sélectionné lors de la configuration du service image séparément.

## Générer la première image {/* #generate */}

Dans une conversation de projet, décrivez le but, le contenu, la mise en page et les étiquettes de l'image. Demandez une image enregistrée. La carte d'outils de génération d'images montre la requête et son état d'avancement; attendez une sortie complète avant de l'ouvrir dans l'aperçu.

<p className="example-label"><strong>Exemple</strong> Demander une illustration conceptuelle du flux de travail</p>

```text
Create an English illustration for a lab meeting slide showing:
research question → literature search → evidence review → reproducible analysis.
Use four clearly separated steps, a light background and readable labels.
This is a conceptual workflow, not a plot of experimental results.
Save the image so I can review it in the project.
```

Inspectez les étiquettes, l'ordre et la direction de la flèche. Si une demande échoue, vérifiez le service image, le modèle et l'erreur plutôt que de changer Main à un fournisseur non lié. Les demandes et les images sources utilisées pour la génération ou l'édition sont envoyées au service d'image sélectionné. Annulation ne peut pas rétracter les données déjà envoyées.

## Modifier, comparer et réutiliser {/* #edit */}

1. Ouvrez l'image prévue dans l'aperçu. Déplacez-le ou déplacez la focalisation du clavier vers ses commandes, puis choisissez **Edit image**. Confirmez l'image source et la version avant de saisir les instructions.
2. Dans le compositeur de conversation, décrivez un changement ciblé. Conserver la requête liée à la source affichée; ne l'envoie pas. Si vous sélectionnez une région, vérifiez la zone surlignée et ses instructions. Les outils et paramètres disponibles dépendent de l'image et du service.
3. Sélectionnez **Send image edit** et attendez la nouvelle sortie. Si le contrôle n'est pas disponible, vérifiez la raison affichée et [configuration du service d'image](#configure). Une demande rejetée n'est pas une nouvelle version complétée.
4. Ouvrir la nouvelle version dans l'aperçu complet et confirmer son identité; v1.3.4 corrige l'ouverture d'une édition pendant que sa version est en cours de publication. Utilisez **Compare with input image** ou **Compare** lorsqu'il est offert, et vérifiez à la fois la zone modifiée et le contenu qui devrait rester inchangé. Utilisez **Image history** pour revoir les versions antérieures, ou **Continue editing** pour une autre révision.
5. Téléchargez la version choisie, rouvrez-la et vérifiez les étiquettes et les revendications scientifiques avant de partager. Les détails de l'image peuvent identifier le noyau Notebook qui a produit une modification; que l'enregistrement n'établit pas l'exactitude scientifique.

La conversation reste en place pendant que les contrôles d'édition utilisent son compositeur. Vous pouvez également ouvrir l'historique de **Provenance** pendant qu'un brouillon d'image est actif; vérifier la version sauvegardée que vous consultez. Conservez une légende précise identifiant le contenu illustratif. Pour les vérifications numériques des placettes, utiliser [Notebook](notebook.md) et [Provenance](reproducibility.md); pour le texte de diapositive, voir [édition de la présentation](presentation-editing.md).

## Tester un service d'image avant d'enregistrer {/* #test-service */}

En v1.3.1, le formulaire de service d'image offre **Test generation** après que les champs requis et un modèle ont été remplis. Revoir la confirmation : elle génère une image et le fournisseur peut facturer la demande. Un essai réussi s'applique à cette configuration exacte; modifier le modèle, le point de terminaison ou les identifiants nécessite un nouveau test. Vous pouvez aussi enregistrer la configuration sans lancer le test.

Après l'enregistrement d'un nouveau service, son premier modèle devient par défaut seulement lorsqu'aucun modèle de génération d'images n'est déjà sélectionné. Inspectez cette sélection avant votre première demande. Main reste configuré séparément.

![Tester un service d'image avant d'enregistrer](/img/open-science/v1.3.1/image-service-test.webp)

## Actualiser un catalogue de modèles d'images {/* #image-model-catalog */}

Dans **Settings → Model → Image services**, ajoutez ou modifiez un service officiel **OpenAI**, **MiniMax**, **Bailian** ou **Volcengine Ark**. Remplissez les champs de connexion, puis choisissez **Refresh model list** avant d'enregistrer. Un rafraîchissement envoie les identifiants configurés à ce fournisseur; il ne génère pas d'image.

La liste mise à jour correspond aux résultats du fournisseur par rapport aux modèles d'image pris en charge par Open-Science, donc ce n'est pas tous les modèles proposés par le fournisseur. La valeur par défaut actuelle est retenue, avec un marqueur lorsqu'il est absent du catalogue retourné. Examiner ce marqueur avant de se fier au modèle. Un rafraîchissement échoué conserve la liste précédente; vérifier la cause affichée et réessayer. **Save** commet le formulaire, tandis que [Tester la génération](#test-service) est une requête d'image séparée, potentiellement facturable.

Pour Bailian, utilisez l'URL de l'espace de travail et la région correspondant au titre. Les références liées à la Chine utilisent le catalogue de la Chine. Modifier une connexion ou un espace de travail nécessite de vérifier à nouveau son catalogue; un modèle visible dans une autre région n'est pas une preuve d'accès ici.

![OpenAI image service: supported models and Refresh model list](/img/open-science/v1.3.3/image-catalog.webp)
