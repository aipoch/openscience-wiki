---
title: "Generar y editar imágenes"
last_update:
  date: '2026-11-20'
---

# Generar y editar imágenes {/* #generate-and-edit-images */}

Cree una ilustración de un prompt, luego refina una imagen seleccionada mientras retiene versiones anteriores. Use esto para diagramas explicativos o obras de presentación. Una imagen generada no es evidencia experimental; verificar etiquetas científicas, estructuras y reclamaciones visuales antes de compartirla.

## Configurar un servicio de imagen {/* #configure */}

1. Abre **Settings → Model** y encuentra **Image generation**. Abre **Image services → Add image service**.
2. Elige **Provider type**. Para **Custom HTTP service**, introduzca **Name**, **Base URL** y **API key**, a continuación, agregue el **Model ID** exacto y **Interface preset** apoyado por el servicio. Para un endpoint personalizado, coincida con su **API format** a la API de imagen del servicio.
3. Guardar el servicio, luego elegirlo bajo **Image generation model**. **Not configured** significa que la generación de imagen no está lista.
4. Comience con una pequeña solicitud de imagen e inspeccione la imagen devuelta. Los nuevos ajustes de imagen se aplican desde el siguiente turno.

![Configuración de servicio de imagen con endpoint, formato API, campos de credencial y modelo](/img/open-science/v130/image-service.webp)

La generación principal, Visión e Imagen tiene diferentes empleos. Principal dirige la conversación; Vision lee imágenes; Generación de imágenes crea o edita. Una suscripción a Codex para Main no proporciona automáticamente una API de generación de imágenes o su subsidio de facturación. Mantenga su modelo principal seleccionado mientras configura el servicio de imagen por separado.

## Generar la primera imagen {/* #generate */}

En una conversación de proyecto, describa el propósito, el contenido, el diseño y cualquier etiqueta de la imagen. Pide una imagen guardada. La tarjeta de herramienta de generación de imagen muestra la solicitud y su progreso; esperar una salida completa antes de abrirla en la vista previa.

<p className="example-label"><strong>Ejemplo</strong> Solicitar una ilustración conceptual del flujo de trabajo</p>

```text
Create an English illustration for a lab meeting slide showing:
research question → literature search → evidence review → reproducible analysis.
Use four clearly separated steps, a light background and readable labels.
This is a conceptual workflow, not a plot of experimental results.
Save the image so I can review it in the project.
```

Inspeccione las etiquetas, orden y dirección de flecha. Si una solicitud falla, compruebe el servicio de imagen, modelo y error en lugar de cambiar Principal a un proveedor no relacionado. Prompts e imágenes de origen utilizadas para la generación o edición se envían al servicio de imagen seleccionado. La cancelación no puede retractarse de los datos ya enviados.

## Editar, comparar y reutilizar {/* #edit */}

Abra la acción de edición de la imagen, seleccione la versión fuente y describa un cambio enfocado. Utilice los controles de región y parámetro disponibles sólo cuando el servicio seleccionado los apoye. Presentar la edición y esperar su nueva salida. Editar crea una nueva versión para que las variantes anteriores permanezcan disponibles.

Compare el candidato con la fuente: compruebe la región solicitada y las partes que deben permanecer inalteradas. Utilice la historia de la imagen para revisar una versión o continuar editando de ella. Descargue la versión final prevista y vuelva a abrir el archivo antes de colocarlo en una presentación. Mantenga una capción precisa identificando contenido ilustrativo.

Para las parcelas existentes que necesitan comprobación numérica, use [Notebook](notebook.md) y [Provenencia](reproducibility.md). Para el texto de diapositivas y el formato, vea [edición de presentación](presentation-editing.md).
## Pruebe un servicio de imagen antes de guardar {/* #test-service */}

En v1.3.1, el formulario de servicio de imagen ofrece **Test generation** después de que los campos requeridos y un modelo estén llenos. Revise la confirmación: genera una imagen y el proveedor puede cargar por la solicitud. Una prueba aprobada se aplica a esa configuración exacta; cambiar el modelo, el punto final o la credenciales requiere una nueva prueba. También puede guardar la configuración sin ejecutar la prueba.

Después de guardar un nuevo servicio, su primer modelo se convierte en el predeterminado sólo cuando ningún modelo de generación de imagen ya está seleccionado. Inspeccione esa selección antes de su primera solicitud. Main permanece configurado por separado.

![Pruebe un servicio de imagen antes de guardar](/img/open-science/v1.3.1/image-service-test.webp)
