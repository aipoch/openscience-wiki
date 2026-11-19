---
title: "Générer et modifier des images"
last_update:
  date: '2026-11-19'
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

Ouvrez l'action d'édition de l'image, sélectionnez la version source et décrivez un changement ciblé. Utilisez les commandes de la région et des paramètres disponibles uniquement lorsque le service sélectionné les supporte. Soumettre l'édition et attendre sa nouvelle sortie. L'édition crée une nouvelle version de sorte que les versions antérieures restent disponibles.

Comparez le candidat avec la source : vérifiez la région demandée et les parties qui devraient rester inchangées. Utilisez l'historique de l'image pour revisiter une version ou continuer à l'éditer. Téléchargez la version finale prévue et rouvrez le fichier avant de le placer dans une présentation. Conserver une légende précise identifiant le contenu illustratif.

Pour les placettes existantes qui nécessitent une vérification numérique, utilisez [Notebook](notebook.md) et [Provenance](reproducibility.md). Pour le texte de diapositives et le formatage, voir [édition de la présentation](presentation-editing.md).
