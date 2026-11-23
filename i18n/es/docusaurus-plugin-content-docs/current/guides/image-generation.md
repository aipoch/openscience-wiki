---
title: "Generar y editar imágenes"
last_update:
  date: '2026-11-23'
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

1. Abra la imagen prevista en la vista previa. Ajustar sobre él o mover el enfoque del teclado a sus controles, a continuación, elegir **Edit image**. Confirme la imagen y la versión de origen antes de introducir instrucciones.
2. En el compositor de conversaciones, describir un cambio enfocado. Mantenga la solicitud atada a la fuente mostrada; entrar en edición no lo envía. Si selecciona una región, compruebe el área resaltada y su instrucción. Las herramientas y parámetros disponibles dependen de la imagen y el servicio.
3. Seleccione **Send image edit** y espere la nueva salida. Si el control no está disponible, compruebe la razón mostrada y [configuración del servicio de imagen](#configure). Una solicitud fallida no es una nueva versión completa.
4. Use **Compare with input image** o **Compare** cuando se ofrezca, e inspeccione tanto el área modificada como el contenido que debe permanecer invariable. Utilice **Image history** para revisitar versiones anteriores, o **Continue editing** para otra revisión.
5. Descargue la versión elegida, vuelva a abrirla, y compruebe etiquetas y reclamaciones científicas antes de compartir. Los detalles de la imagen pueden identificar el kernel Notebook que produjo una edición; ese registro no establece la precisión científica.

La conversación permanece en su lugar mientras los controles de edición utilizan su compositor. Mantenga una capción precisa identificando contenido ilustrativo. Para los cheques numéricos en las parcelas, utilice [Notebook](notebook.md) y [Procedencia](reproducibility.md); para el texto de diapositivas, vea [edición de la presentación](presentation-editing.md).

## Pruebe un servicio de imagen antes de guardar {/* #test-service */}

En v1.3.1, el formulario de servicio de imagen ofrece **Test generation** después de que los campos requeridos y un modelo estén llenos. Revise la confirmación: genera una imagen y el proveedor puede cargar por la solicitud. Una prueba aprobada se aplica a esa configuración exacta; cambiar el modelo, el punto final o la credenciales requiere una nueva prueba. También puede guardar la configuración sin ejecutar la prueba.

Después de guardar un nuevo servicio, su primer modelo se convierte en el predeterminado sólo cuando ningún modelo de generación de imagen ya está seleccionado. Inspeccione esa selección antes de su primera solicitud. Main permanece configurado por separado.

![Pruebe un servicio de imagen antes de guardar](/img/open-science/v1.3.1/image-service-test.webp)

## Refrescar un catálogo de imagen-model {/* #image-model-catalog */}

En **Settings → Model → Image services**, añadir o editar un servicio oficial **OpenAI**, **MiniMax**, **Bailian** o **Volcengine Ark**. Rellene los campos de conexión, luego elija **Refresh model list** antes de guardar. Un refresco envía las credenciales configuradas a ese proveedor; no genera una imagen.

La lista refrescada coincide con los resultados del proveedor en los modelos de imagen soportados por Open-Science, por lo que no es cada modelo que el proveedor ofrece. El defecto actual se mantiene, con un marcador cuando falta del catálogo devuelto. Revise ese marcador antes de confiar en el modelo. Un refresco fallido mantiene la lista anterior; comprobar la causa mostrada y volver a entrar. **Save** compromete el formulario, mientras que [Probar generación](#test-service) es una solicitud de imagen independiente y potencialmente facturable.

Para Bailian, utilice la URL del espacio de trabajo y la región que coincida con la credencial. Las credenciales vinculadas a China utilizan el catálogo de China. Cambiar una conexión o espacio de trabajo requiere revisar su catálogo de nuevo; un modelo visible en otra región no es prueba de acceso aquí.

![OpenAI image service: supported models and Refresh model list](/img/open-science/v1.3.3/image-catalog.webp)
