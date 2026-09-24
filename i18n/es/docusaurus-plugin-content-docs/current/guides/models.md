---
title: "Modelos y políticas de tareas"
last_update:
  date: '2026-09-24'
---

# Modelos y políticas de tareas {/* #models-and-task-policies */}

Elija un modelo para el trabajo que debe realizar, a continuación, comprobar qué ajustes son heredados. Un **Provider** proporciona acceso modelo; un **Agent** ejecuta la conversación y las herramientas; a **Specialist** proporciona un papel reutilizable y capacidades seleccionadas. Cambiar uno no instala o configura los otros.

Utilice las siguientes políticas de tareas cuando Main, Subagent, Reviewer, Vision o Session los detalles necesitan diferentes modelos. Revise el proveedor y el modelo en la tarea resultante, especialmente cuando varios proveedores ofrecen el mismo nombre de modelo.

## Seleccione el modelo principal {/* #select-the-main-model */}

1. Abre **Settings → Model**. En un espacio de trabajo, la entrada **Select model** del Compositor también expone las opciones de modelo.
2. Abra **Main model** y seleccione un modelo disponible bajo su proveedor configurado. Una entrada de catálogo no es prueba de que la cuenta puede utilizarla.
3. Seleccione **Reasoning effort**. Utilice las opciones realmente mostradas para ese modelo. Este modelo inspeccionado ofrece Default, Low, Medium, High, XHigh y Ultra; otros modelos tienen diferentes escaleras.
4. Cerrar y reabrir Modelo para comprobar la selección guardada. Comience una pequeña solicitud e inspeccione su resultado antes de un análisis largo.

![Modelo Main y proveedor conectado](/img/open-science/guides-walkthrough/10-model-main.webp)

Los cambios se aplican a las solicitudes posteriores. No cambian retroactivamente el modelo detrás de una respuesta existente. Cuando los modelos cambian, la aplicación intenta preservar la fuerza relativa de razonamiento; un backend puede aproximarse a un esfuerzo sin apoyo. El esfuerzo más alto puede aumentar el tiempo y el uso de token y no es una garantía de corrección.

## Asignar modelos a tareas específicas {/* #assign-models-to-specific-tasks */}

Seleccione una fila de escenario para ampliarla. Abrir otra fila se derrumba el anterior. Lea el resumen colapsado después de hacer un cambio: distingue la herencia, un modelo fijo y una selección indisponible.

| Escenario | Opción modelo | Qué verificar |
| --- | --- | --- |
| **Subagent** | Igual que el modelo principal, o un modelo separado compatible | El control de esfuerzo coincidente está deshabilitado mientras sigue Main. También se debe habilitar a la delegación. |
| **Reviewer** | Siga el modelo principal o un modelo de revisión configurado | Una política modelo por sí sola no permite la revisión automática o crear un registro de revisión. |
| **Vision** | Un modelo configurado de imagen | No está configurado significa que no hay una selección de Visión dedicada. Si se necesita un relé depende del soporte de imagen del backend activo. |
| **Session details** | Siga Main o elija un modelo compatible; inspeccionar su esfuerzo y su capacidad | Esto genera el título de sesión/descripción utilizando una llamada restringida. Está separado de la tarea científica y de sus artefactos. |

![Subagent inheritance and disabled effort control](/img/open-science/guides-walkthrough/11-model-scenarios.webp)

El selector de detalles de sesión filtra los modelos de suscripción Codex. Un modelo visible en Main o Vision puede por lo tanto estar ausente aquí. Con un proveedor local compatible y OpenCode seleccionado, el modelo local se puso a disposición como opción fija. **Not supported** junto a su esfuerzo de razonamiento significa que el control de esfuerzo no está disponible; es diferente de si el modelo puede recibir una solicitud de texto.

Para un escenario marcado, seleccione el proveedor/modelo y luego el esfuerzo soportado. Regrese a la opción de la herencia cuando desea futuros cambios Main para propagarse. Un resumen **Unavailable** puede retener el nombre anterior del modelo incluso después de que su proveedor sea eliminado o ya no elegible; seleccione un reemplazo válido.

### Lea un gráfico con un modelo de Visión separado {/* #read-a-chart-with-a-separate-vision-model */}

Use Vision cuando el modelo Main de la conversación no puede aceptar imágenes. Un modelo Main que ya acepta imágenes puede leerlas directamente.

<p className="example-label"><strong>Ejemplo práctico</strong> Verificar etiquetas en un gráfico de cuenta de muestra</p>

1. Ampliar **Settings → Model → Vision** y elegir un modelo disponible de imagen. Seleccione un esfuerzo de razonamiento compatible si el control está habilitado.
2. Mantenga el modelo de texto indicado seleccionado en la conversación. La visión cambiante no sustituye a Main.
3. Utilice **+ → Attach files** para adjuntar el gráfico. Confirme que su nombre de archivo aparece en el Compositor antes de enviar.
4. Solicitar información visible específica, como el título, etiquetas de eje, unidades y número de muestras trazadas. Solicite una indicación explícita cuando una etiqueta no esté legible.
5. Compare la respuesta con la imagen original. Utilice la tabla fuente para comparaciones numéricas exactas: en este ejemplo, dos etiquetas redondeadas a **24.7M** no prueban que sus conteos subyacentes son iguales.
6. Vuelva Visión a **Not configured** cuando ya no desea un modelo de imagen separado. Esto no elimina al proveedor de modelos.

![Selección de Visión Separada junto con el modelo Main texto](/img/open-science/sept11-completion/vision-configuration.webp)

![Marcas de gráficos y los límites de los valores redondeados](/img/open-science/sept11-completion/vision-result.webp)

El relé de imagen actual excluye a los proveedores de suscripción de Codex aunque puedan aparecer en el selector de Visión. Si un modelo Main solo de texto todavía rechaza una imagen después de esa selección, elija otro proveedor de Visión elegible o un modelo Main de imagen. No trate un valor de selector guardado como una solicitud de imagen exitosa.

### Confirma que se generaron detalles de la sesión {/* #confirm-that-session-details-were-generated */}

Después de elegir **Same as main model** o un modelo fijo compatible bajo **Session details**, crear una conversación. Espera que el primer inconveniente se convierta en un título conciso, y luego inspecciona la descripción guardada. Una copia truncada del impulso no establece una generación exitosa.

Compruebe el título y la descripción guardados después de la solicitud auxiliar termina. Si el título sigue siendo un impulso acortado, inspeccione la compatibilidad del modelo, la carga del servidor local y el estado final de la llamada. Un tiempo auxiliar puede retener ese retroceso. La generación de título de sesión utiliza su propia política modelo y no ejecuta el cálculo científico de la conversación.

## Controles de proveedores y cheques de fallos {/* #provider-controls-and-failure-checks */}

| Control/estado | Siguiente acción |
| --- | --- |
| **Add provider** | Seguir [Configuración del proveedor](./providers.md), incluyendo sus requisitos de autenticación y punta final. |
| **Check Codex login** | Revisar el estado de inicio de suscripción; esto no tiene una tarea de investigación. |
| **Re-import Codex login** | Importar un nuevo login existente a través del flujo de la aplicación. |
| **Edit** | Configuración del proveedor de revisión. Preserve la configuración de trabajo hasta que se verifique un reemplazo. |
| Deshabilitado **Delete** | El proveedor actual no puede ser eliminado en este estado; elegir otra configuración válida primero. |
| Advertencia de compatibilidad | Revise el formato activo de agente y proveedor API antes de reintentar repetidamente. |
| No hay opciones de escenario | Configure un proveedor/modelo elegible primero; un selector en blanco no es una solicitud para escribir un nombre de modelo arbitrario. |

Utilice [Configuración del agente](./frameworks.md) para el backend de ejecución y [Uso](./usage.md) para la actividad reportada. Precedencia de configuración exacta está en [Referencia](../reference/configuration.md).

Fuentes: [selección modelo](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ActiveModelSelect.tsx), [políticas de hipótesis](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ScenarioModelList.tsx).

## Modelos de clasificación {/* #classification-models */}

Abre **Settings → Model → Classification models**. Los servicios de clasificación tienen dos enlaces independientes: **Automatic capability selection** y **Smart collections**. El primero ayuda a seleccionar los Skills y los conectores pertinentes antes de que comience una solicitud. No sustituye a Main ni añade un modelo de chat. Puede dejar **Automatic capability selection** en **Use default method**; Skills y Connectors todavía funcionan sin él.

La selección automática de capacidades mediante este servicio se admite en conversaciones principales con **Codex Chat Completions** o **CodeBuddy**. Las sesiones con suscripción a Codex mantienen su método habitual de carga. Esta función solo envía la solicitud actual y los nombres y descripciones de las capacidades. Si el servicio no está disponible o la clasificación no es clara, se usa el método predeterminado.

![Selección de la capacidad predeterminada y la entrada opcional del servicio de clasificación](/img/open-science/v0311/classification-models.webp)

1. Elija **Add service**, luego **TypeSafe AI**, **OpenRouter** o **Custom HTTP service**.
2. Nombra el servicio y suministra su credencial API cuando sea necesario. OpenRouter puede utilizar una cuenta compatible existente o una nueva clave; guarda las llaves ocultas en las capturas de pantalla.
3. Seleccione **Save** y espere la validación. La validación fallida deja sin cambios la configuración anterior.
4. Bajo **Automatic capability selection**, seleccione el servicio guardado y un modelo ofrecido en su catálogo. Utilice **Check model** para comprobar la conexión.
5. Pruebe una solicitud atada en una conversación principal compatible, luego inspeccione las herramientas seleccionadas. Un cheque de modelo exitoso por sí solo no verifica un resultado de investigación.

La eliminación de un servicio devuelve la selección automática de la capacidad al método predeterminado y deja que cualquier colección Smart se encuadernen a ese servicio no configurado. Una llave de servicio almacenada separadamente se elimina con ella; eliminar un servicio que comparte una cuenta no elimina esa cuenta o su clave.

Vea [Configuración del proveedor](providers.md) para modelos de conversación. Los recursos locales de persing PDF se gestionan bajo **Local parsing models**, una pestaña separada.

![Formulario de servicio de clasificación con la tecla API aún vacía](/img/open-science/v0311/classification-add-service.webp)

Para Jev, seleccione **TypeSafe AI / Jev Latest** en **Automatic capability selection** y pulse **Check model**. **Check passed** confirma que el servicio responde. Vuelva a abrir Settings y compruebe que la selección se conserva.

![TypeSafe AI / Jev Latest seleccionado, con Check passed y la clave API oculta](/img/open-science/v0311/classification-connected.webp)

Por ejemplo, una búsqueda pública de TP53 en una sesión de Codex Chat Completions puede utilizar Jev para seleccionar `mcp-genes`. Inspeccione la capacidad seleccionada en la actividad, luego inspeccione la respuesta de la base de datos para el resultado de la investigación. Las sesiones de suscripción de Codex utilizan su ruta de carga de capacidad existente; a Jev binding salvado no hace que esas sesiones usen Jev.

### Encuad un modelo para colecciones inteligentes {/* #smart-collection-model */}

1. Abra **Settings → Model → Classification models** y guarde un servicio compatible si no se ha añadido uno.
2. Bajo **Smart collections**, seleccione el servicio y uno de sus modelos ofrecidos, luego elija **Check model**. Esta unión es compartida por todas las colecciones inteligentes; es independiente de **Automatic capability selection**.
3. Confirme **Check passed**, luego vuelva a la Biblioteca y cree una colección pequeña y claramente de alcance. Las colecciones inteligentes tienen **no modelo predeterminado**: configurar esta unión antes de evaluar las referencias.

Main puede continuar utilizando **Codex subscription**. Su ruta de carga de capacidad no impide que la Biblioteca utilice su propia clasificación vinculante. El ejemplo a continuación selecciona **TypeSafe AI / Jev Latest** para la detección.

![Las colecciones inteligentes y la selección de capacidades tienen enlaces separados, con la llave de servicio enmascarado](/img/open-science/v0330/classification-smart.webp)

Screening envía las reglas de recogida y evidencia de referencia a este servicio. Con **Use available full text** apagado, utiliza el título y el resumen. Enviando el texto PDF disponible; documentos largos utilizan pasajes relevantes, y un PDF indisponible o no legible cae de nuevo al título y abstracto. Compruebe las pruebas que se muestran para cada decisión. Siga el [flujo de trabajo inteligente de detección](../workflows/screen-literature.md) para evaluar y revisar un conjunto real de documentos.

### Servicios de clasificación personalizada {/* #custom-classification */}

En **Add service → Custom HTTP service**, introduzca un nombre de servicio, URL de punto final y ID de modelo. El punto final debe implementar el **Protocolo de clasificación TipoSafe**; un punto final de las compleciones de chat ordinario no es intercambiable. Suministrar la tecla API del servicio cuando sea necesario: un punto final de la vuelta puede utilizar HTTP sin una llave, mientras que los puntos de extremo remotos requieren HTTPS y credenciales.

Después de guardar, seleccione el servicio bajo **Automatic capability selection** y ejecute **Check model**. Luego inspeccione la selección de la capacidad en una ruta de conversación compatible. Este ajuste no cambia Main ni hace que las sesiones de suscripción Codex usen el clasificador.

El siguiente formulario ilustra los campos. Reemplaza el punto final de la muestra y `your-model-id` con tus datos de servicio reales antes de comprobar la conexión.

![Clasificación personalizada endpoint, modelo y campos clave vacíos](/img/open-science/v0320/classification-custom.webp)
