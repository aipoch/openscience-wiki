---
title: "Crear y compartir una película de investigación"
last_update:
  date: '2026-11-25'
---

# Crear y compartir una película de investigación

Convierta una conversación completa en una presentación narrada breve para una reunión de grupo o un pase de proyecto. Open-Science construye la película desde un registro congelado de la sesión y genera narración inglesa localmente. El autor de películas todavía utiliza su modelo configurado. El resultado explica el trabajo existente; no vuelve a ejecutar el análisis ni certifica sus conclusiones.

## Preparar la sesión y narración {/* #prepare-film */}

1. Usar el **Aplicación de escritorio** y abrir la sesión y rama que desea presentar. Termina la respuesta actual primero. Una sesión en blanco o una que aún espera una respuesta no puede generar una película.
2. Compruebe los insumos, resultados y limitaciones registrados. Eliminar material sensible de la fuente que pretende compartir antes de comenzar; revisar la película generada por separado antes de distribuirla.
3. In **Settings → Model**, confirme un modelo principal compatible y credenciales de trabajo. Una suscripción Codex existente puede permanecer seleccionada con el tiempo de ejecución Codex.
4. Abierto **Local capabilities → Research narration → Install**. Espera. **Installed**. Estos recursos proporcionan discurso en inglés y se reutilizan para películas posteriores. Alternativamente, el diálogo de película ofrece **Install and generate** cuando falta la narración.

El motor del habla funciona localmente después de la instalación, pero el autor de la película basado en modelos utiliza el proveedor seleccionado. Mantenga el ordenador funcionando y suficiente almacenamiento gratuito disponible para los medios generados.

## Generar y ver {/* #generate-film */}

1. Abre **Session actions → Generate research film**. En la repetición, la misma acción está disponible bajo **Más acciones**.
2. Elija **Film mode → Research explanation** para explicar la pregunta, métodos y hallazgos, o **Operation replay** para mostrar acciones y resultados de conversación en orden. Lea la explicación de uso modelo, resuelva cualquier modelo perdido, recurso de credenciales o narración, y luego seleccione **Start generation**.
3. Siga las etapas de escritura y generación de medios. Puede cerrar el diálogo mientras la generación continúa, luego reabrir **View generation progress**. **Cancel** detiene el trabajo cinematográfico, no la conversación fuente.
4. Cuando aparezca **Research film ready**, inspeccione el título y la duración, luego elija **Play research film**.
5. Mira toda la película. Compruebe los números, unidades, explicaciones, imágenes, narración y los límites declarados contra la sesión de origen. Preste especial atención a si los ejemplos hipotéticos o los resultados preliminares todavía se describen como tales.

![Elija la explicación de investigación o la repetición de Operación antes de la generación inicial](/img/open-science/v130/film-mode.webp)

Cada rama de conversación mantiene su propia salida de película. Abra la rama prevista antes de generar o ver una película; una película en una rama no es automáticamente la película para otra. El autor de la película consume tokens modelo aunque la narración funciona localmente.

<p className="example-label"><strong>Ejemplo trabajado</strong> Explicar un ejemplo de enseñanza de cinco números</p>

Iniciar una conversación con Codex y enviar:

```text
In English, explain a small hypothetical teaching example: observations
are 2, 4, 6, 8, 10. Compute their mean and median, then explain in no more
than 200 words why this five-number example does not support a claim
about a real population. Do not use tools or create files.
Keep the numerical result explicit.
```

La respuesta completa da una mediana y mediana de **6** y explica la ausencia de una población definida o diseño de muestreo. Compruebe esos puntos antes de seleccionar **Generate research film**. Este es un ejemplo de enseñanza, no un estudio empírico.

![Generación de investigación de una conversación docente completa](/img/open-science/v120/film-progress.webp)

![Película de investigación lista con narración en inglés y acción de reproducción](/img/open-science/v120/film-ready.webp)

En v1.2.1, cambiar a otra sesión no detiene la generación de cine. Mantenga la aplicación funcionando y regresa a la sesión de origen **View generation progress** o **View research film** para inspeccionar el resultado. Cancelación explícita del trabajo de la película todavía detiene la generación.

## Exportar una película revisada {/* #export-film */}

Abra el reproductor generado en la vista previa. Seleccione **More actions → Download** para guardar el reproductor HTML portátil y reproducirlo en un navegador. Para crear un archivo de vídeo, seleccione **Export MP4** en la vista previa. Si se solicita, elija **Install and export** y después una ubicación en el diálogo de guardado de la aplicación de escritorio. Los recursos de narración y el componente de exportación MP4 se descargan por separado.

Espera a que la exportación termine, y luego vuelve a abrir el archivo guardado fuera de Open-Science. Compruebe la reproducción, el sonido, las leyendas y el final. Cancelar un diálogo de ahorro no produce un archivo exportado. Mantener la sesión original o [`.science` paquete de investigación](research-packages.md) cuando los receptores necesitan inspeccionar las pruebas subyacentes; solo un MP4 es una presentación.

![Reproductor de perfiles de investigación y control de exportación MP4](/img/open-science/v120/film-player.webp)

## Regenerar o recuperarse {/* #film-recovery */}

Mientras una película de investigación está generando, su conversación permanece en **Active** con el estado de la película visible. Si un diálogo de película está bloqueado por la generación de otra conversación, seleccione **Go to conversation** para abrir ese propietario e inspeccionar el progreso antes de comenzar otro trabajo.

Cuando se interrumpe una película y el diálogo ofrece **Retry**, vuelva a usar escenas validadas, narración y fechas. Los puntos de control sobreviven a un reinicio de proceso. **Generate again** comienza un nuevo intento en su lugar; utilizarlo al cambiar el contenido previsto o descartar deliberadamente el intento anterior. Inspeccione el progreso y la película completa después de cualquier acción.

- Si la generación le pide que seleccione un modelo o verifique las credenciales, corrija ese requisito en **Settings → Model**, luego vuelva a la sesión.
- Si la descarga de la narración falla, use **Retry** y espere a **Installed** antes de generar de nuevo.
- Use **View research film → Generate again** después de cambiar la sesión o cuando el resultado necesite otro intento. Confirma la nueva generación; puede tardar varios minutos y utilizar la capacidad del modelo de nuevo.
- Utilice el cuadro de diálogo de la película **More actions → Delete research film** sólo cuando desea eliminar los archivos de la película local de esta rama. La confirmación explica que el contenido de la conversación y copias guardadas por separado se guardan.

Véase [sesión de reproducción](session-replay.md) para inspeccionar los pasos retenidos y [reproducibilidad](reproducibility.md) para ejecutar una verificación separada.
