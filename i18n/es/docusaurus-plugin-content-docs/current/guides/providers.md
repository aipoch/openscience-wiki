---
title: "Proveedor y configuración del modelo local"
last_update:
  date: '2026-09-22'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# Proveedor y configuración del modelo local {/* #provider-and-local-model-setup */}

## Elija un método de acceso {/* #choose-an-access-method */}

![Conexión de suscripción Codex en la configuración de primera vez en inglés](/img/open-science/walkthrough-2026-09-08/07-model-codex-subscription.webp)

`Provider type` selecciona el acceso a la suscripción, un API, o `Custom Gateway`. Las opciones de suscripción disponibles dependen del marco de agente activo. La configuración de Codex capturada muestra `Codex subscription`, xAI OAuth, API oficiales y Gateway personalizado; no asuma otro marco presenta las mismas opciones.

| Elección | Lo que necesitas | Verificación antes de continuar |
| --- | --- | --- |
| Suscripción de Codex | Un registro Codex compatible | Inspección de la `Codex authentication` elección; importando la autenticación de copias de acceso existentes en Open-Science |
| API oficial | Acceso a ese proveedor y al modelo solicitado | Confirme el proveedor, región cuando sea aplicable, y API credencial |
| Puerta de enlace personalizada | Un punto final compatible, un ID de modelo exacto y una tecla API cuando sea necesario | Confirme el formato API y las características de modelo compatibles con el operador de la puerta de entrada |

Elija **Import existing Codex sign-in** para copiar un registro local de trabajo en Open-Science. La importación puede incluir una ruta de retroceso no secreta compatible; otra configuración global, Skills y sesiones permanecen separadas. Bajo **Advanced settings → Transport**, mantenga **Auto (recommended)** a menos que su conexión requiera un transporte diferente.

## Elija una región proveedor o un modelo de catálogo gratuito {/* #provider-regions */}

Para **SenseNova**, seleccione **China** o **Global** en el formulario del proveedor antes de elegir un modelo. Utilice la tecla API para esa región, revise la lista de modelos resultante, seleccione **Save**, y espere la validación de la conexión antes de que el cambio se cometa. Las regiones de conmutación pueden cambiar tanto el punto final como los modelos disponibles; un nombre clave o modelo de la otra región puede no funcionar.

Para pasarelas como **OpenRouter** o **OpenCode Zen**, seleccione un modelo gratuito sólo cuando se ofrece la entrada exacta para el marco activo. Utilice la cuenta y la credenciales requeridas por el servicio. Una entrada de catálogo libre no elimina los límites de uso o establece soporte para cada herramienta o entrada de imagen. No anexione `:free` a un ID de modelo arbitrario. Enviar una pequeña solicitud y comprobar el modelo devuelto y el resultado antes de usar la conexión para la investigación.

## Conectar una suscripción Codex existente {/* #connect-an-existing-codex-subscription-verified-procedure */}

1. Abre **Settings → Model → Add provider**.
2. Establecer **Provider type** a **Codex subscription**.
3. En **Codex authentication**, elija **Import existing Codex sign-in**. Esto requiere un registro usable en este ordenador. Copia la autenticación en el perfil de la aplicación; no importa sus otras sesiones Codex o Skills.
4. Seleccione **Save**. Espere mientras que la fila del proveedor muestra **Testing…**; una fila guardada sola no es el cheque de éxito.
5. Confirme **Connection verified** y **Autenticación importada en Open-Science** en la fila del proveedor. La interfaz liberada puede mostrar el nombre del producto sin un himno.
6. En **Main model**, seleccione un modelo de suscripción disponible. Por ejemplo, seleccione una entrada **gpt-5.6-sol** disponible si su cuenta lo ofrece. Compruebe el nombre del modelo y el proveedor juntos, especialmente cuando múltiples proveedores ofrecen modelos similares.
7. Abra un proyecto y envíe una solicitud encuadernada. Una prueba de conexión verifica la autenticación, mientras que una respuesta real verifica el camino de solicitud. Confirme la respuesta y cualquier solicitud de permiso de herramientas aparece en ese período de sesiones.

![Suscripción Codex verificada y modelo principal seleccionado](/img/open-science/walkthrough-2026-09-08/70-codex-subscription-connected.webp)

| Control de la capacidad de los proveedores | Utilízalo cuando | Verificación de éxito |
| --- | --- | --- |
| **Check Codex login** | La conexión guardada puede haber expirado. | El cheque pendiente se asienta en el estado verificado o fallido mostrado. |
| **Re-import Codex login** | Usted ha refrescado el registro externo y desea actualizar la copia de la aplicación. | La autenticación es importada y verificada de nuevo. |
| **Edit** | Necesita revisar la configuración de autenticación o transporte. | Seleccione Guardar y esperar a una validación exitosa antes de que se cometa la edición. |
| **Delete** | Un proveedor no utilizado debe ser eliminado. | La disponibilidad depende de si el proveedor sigue siendo necesario; una dependencia activa puede prevenir la eliminación. |

Si la importación reporta que falta un inicio de sesión Codex respaldado por archivos, regístrese a través del flujo Codex compatible y vuelva a iniciar **Re-import Codex login**. Un login celebrado sólo en una tienda credencial externa no es necesariamente un archivo importable.

No interprete **Testing…** como fallo, o **Connection verified** como prueba de que cada modelo y herramienta lista puede funcionar. Si la importación falla, complete el flujo de señalización Codex compatible y reingrese; no pega la autenticación JSON en un aviso o documentación.


El agente de tiempo de ejecución maneja el trabajo; el proveedor del modelo suministra el modelo. Instalar Codex no conecta automáticamente a un proveedor. En la configuración de primera vez, esta página sigue el tiempo de ejecución del agente. Después de la configuración, abra **Settings → Model** para administrar el acceso de los proveedores.

## Actualizar o eliminar una credencial API {/* #update-or-remove-an-api-credential */}

Después de cambiar una clave en el servicio, encuentre su proveedor en **Settings → Model**, seleccione **Edit**, introduzca el reemplazo en **API key**, y seleccione **Save**. Dejar este campo en blanco mantiene la clave existente; no lo aclara. La conexión se prueba antes de que se cometa la edición. Si la autenticación falla, compruebe el punto final, la cuenta que la clave pertenece, y su validez antes de volver a iniciar.

Después de **Connection verified**, complete una pequeña solicitud con ese proveedor. Retire un proveedor no utilizado con **Delete**, comprueba su nombre en la confirmación. La eliminación de la configuración de la aplicación no revoca la clave en el servicio.

## Puerta de entrada personalizada: cada campo visible {/* #custom-gateway-every-visible-field */}

![Errores de campo obligatorio en el formulario de entrada personalizado](/img/open-science/walkthrough-2026-09-08/08-model-required-fields.webp)

Empieza seleccionando `Custom Gateway`. Cambiar el tipo de proveedor puede preservar el nombre de la pantalla de la selección anterior, así que revise el nombre en lugar de asumir que fue reajustado.

| Campo o control | Entrada y comportamiento |
| --- | --- |
| `Provider type` | Selecciona la familia proveedora y cambia la forma visible |
| `Name` / `Provider name` | Nombre de la pantalla opcional, como `Lab gateway`; no un identificador modelo |
| `Base URL` | Dirección de base de gateway requerida. Los puntos finales remotos del modelo requieren HTTPS; HTTP está permitido para direcciones localeshost y loopback. Utilice la dirección real de su operador, no el no trabajo `https://gateway.example` Titular de posición. |
| `API format` | Seleccione Compleciones de Chat, Mensajes o Respuestas; la ruta mostrada ayuda a identificar el protocolo correspondiente |
| `API key` | Requerido para pasarelas remotas; opcional para una puerta de vuelta local que no necesita autenticación. Ingrese una verdadera credencial si su servidor local requiere uno |
| Ojo `Show API key` | Toggles visibilidad of the current key input; mantenerlo escondido antes de capturar o compartir la pantalla |
| `Model` | Identificador de modelo exacto requerido aceptado por el punto final; la captura de pantalla `demo-model` es sólo un marcador de posición |
| `Context window` | - Limitación del contexto del modelo facultativo; solicitudes en blanco del proveedor por defecto |
| Context presets | `32K`, `64K`, `128K`, `200K`, `256K`, `1M`; seleccionando `128K` rellenos `128000` |
| `Advanced settings` | Expande o desploma la capacidad y los campos de límite de token |
| `More information` (`i`) | Abre ayuda contextual junto a la etiqueta asociada |
| `Back` | Regresa al agente a tiempo de ejecución; el mago posee el borrador de forma para sobrevivir navegando de nuevo |
| `Test & continue` | Valida los campos requeridos, luego prueba al proveedor antes de comprometer la configuración válida; anticipos después de una validación aplicable exitosa |

Los tres formatos API mostrados en el menú son:

- **Compleciones de chat** — `/v1/chat/completions`.
- **Messages** — `/v1/messages`.
- **Respuestas** — `/v1/responses`.

Estas son opciones de protocolo, no instrucciones para anexar cada ruta lista a la URL Base. Una puerta de entrada puede soportar un formato sin apoyar a los demás.

<ToolOperationGroup>
<summary>Campos avanzados y controles condicionales</summary>

Una configuración remota HTTP más antigua sigue siendo editable pero no puede enviar solicitudes. Obtenga un punto final HTTPS del operador de servicio, guardarlo y probar de nuevo. Un servidor de modelo local puede mantener su dirección HTTP; un servidor LAN remoto todavía necesita HTTPS.

### Campos avanzados y controles condicionales {/* #advanced-fields-and-conditional-controls */}

| Campo o control | Cómo configurarlo |
| --- | --- |
| `Image input` | Permite sólo si tanto la puerta de entrada como el modelo seleccionado aceptan contenido de imagen |
| `Thinking mode` | Permitir sólo si la puerta de entrada/modelo acepta los controles de pensamiento o esfuerzo |
| `Supported effort levels` | Aparece con el pensamiento habilitado; seleccionar los niveles realmente soportados, en lugar de inferirlos de un nombre modelo |
| `Reasoning request format` | Aparece para las compleciones de chat con el pensamiento habilitado; seleccionar cómo la puerta de entrada espera parámetros de esfuerzo |
| `Maximum input tokens` | - El límite de entrada independiente; en blanco utiliza el proveedor predeterminado. Presets: 32K, 64K, 128K, 200K, 256K, 1M |
| `Maximum output tokens` | Límite de salida independiente opcional. Presets: 4K, 8K, 16K, 32K, 64K, 128K |

Permitir **Thinking mode** para configurar los niveles de esfuerzo soportados. Para **Compleciones de chat**, también seleccione el formato de solicitud de razonamiento soportado por su punto final. Estas declaraciones deben coincidir con las capacidades API del proveedor.


</ToolOperationGroup>

### Prueba la configuración de la puerta de entrada {/* #reproduce-the-form-walkthrough */}

1. Seleccione la puerta de entrada personalizada y amplíe los ajustes avanzados.
2. Introduzca la URL de la base y el ID de modelo exacto suministrado por el operador de la puerta de entrada, más una tecla API cuando sea necesario. Faltando campos requeridos producen errores en línea y lo mantienen en esta página.
3. Introduzca un nombre de pantalla reconocible. Para una conexión real, introduzca el punto final real y el modelo suministrado por su proveedor; Los propietarios de lugares de demostración no pueden pasar una prueba de conexión.
4. Elija un preset contextual y confirme el valor numérico.
5. Permitir el modo de pensamiento sólo cuando se admite, luego inspeccionar los campos de esfuerzo recientemente visibles. Cambiar el formato API puede cambiar los campos disponibles.
6. Si se requiere una llave, ingrese en privado y manténgalo oculto. Seleccione `Test & continue` cuando esté listo para una solicitud de proveedor.
7. Espera el resultado. `Testing connection…` indica la validación pendiente; los clics repetidos están deshabilitados. Los flujos de suscripción usan `Sign in & continue`, `Waiting for sign-in…`, y `Cancel sign-in` cuando corresponda.

## Conectar un modelo local {/* #connect-a-local-model-endpoint */}

<p className="example-label"><strong>Ejemplo</strong> Conectar un modelo Qwen local a través de Ollama</p>

Un servidor de modelo local se ejecuta por separado de Open-Science. Elija **Custom Gateway** para un endpoint compatible, y use un Agente que apoye su formato API. El ejemplo a continuación utiliza Ollama con OpenCode. Instalar un intérprete Python Notebook no instala un servidor modelo.

### Iniciar el servidor y descargar el modelo {/* #start-the-server-and-download-the-model */}

Instala [Ollama](https://ollama.com/download), y luego inicia un servidor de pruebas solo local en un terminal:

```sh
OLLAMA_HOST=127.0.0.1:11435 OLLAMA_CONTEXT_LENGTH=32768 ollama serve
```

Mantén la terminal abierta. En otro terminal, descargar el modelo a ese servidor:

```sh
OLLAMA_HOST=127.0.0.1:11435 ollama pull qwen3:0.6b
```

Espera a que la descarga termine. Si el servidor está funcionando pero el modelo solicitado está ausente, Open-Science puede informar **Test failed: the configured model was not found.** Terminar la descarga, confirmar el ID del modelo exacto, y seleccionar **Test connection** de nuevo.

### Introduzca la configuración del proveedor {/* #enter-the-provider-settings */}

Abrir **Settings → Model → Add provider** y entrar:

| Campo | Este ejemplo de conexión local |
| --- | --- |
| Tipo de proveedor | Puerta de enlace personalizada |
| Nombre | Local Qwen demo |
| URL base | `http://127.0.0.1:11435` |
| Formato API | Compleciones de chat (en inglés)`/v1/chat/completions`) |
| Clave API | Deja en blanco para este punto final de retroceso no autenticado; utilizar la credencial real para una puerta de entrada autenticada |
| Modelo | `qwen3:0.6b` |
| Ventana de contexto | `32768`, coincidiendo con el servidor en ejecución |
| Ajustes avanzados → Tokens de salida máximo | `4096` |
| Introducciones de imagen / Modo de pensamiento | Apagado para este cheque de conexión |

![Dirección de modelo local, formato API e ID de modelo exacto](/img/open-science/non-workflow-completion/08-local-provider-form.webp)

El formulario anexa `/v1` a la raíz de la puerta de entrada. Open-Science acepta una clave API en blanco para direcciones de retroceso como `localhost`, `127.0.0.1` y `[::1]`; la captura de pantalla anterior puede mostrar un marcador de lugar. Una puerta de entrada remota o LAN todavía requiere HTTPS y una tecla API. Utilice el formato API que soporta su servidor local.

Establece un presupuesto de salida que deja espacio para la historia de entrada y conversación. OpenCode se reserva un presupuesto de salida cuando este campo está en blanco; una gran reserva puede causar compactación repetida en una pequeña ventana de contexto. La ventana de contexto declarada también necesita coincidir con la asignación del servidor modelo. Cambiar el formulario por sí solo no cambia la configuración de tiempo de ejecución de Ollama.

### Seleccione un agente compatible y compruebe una respuesta {/* #select-a-compatible-agent-and-check-a-reply */}

En **Settings → Agent**, instale **OpenCode → App-managed download** si falta, seleccione su tarjeta y confirme **Switch**. Volver a **Model** y seleccionar el modelo local. Comience una nueva conversación con una breve solicitud de conexión solo antes de utilizarla para la investigación. Revise que la solicitud termina en realidad; un proveedor ahorrado o una prueba de conexión exitosa por sí solo no establece un razonamiento científico confiable, uso de herramientas o soporte de imagen.

El cheque de conexión completado con **Modelo local conectado.** utilizando el endpoint local configurado y OpenCode. Verifica una solicitud de texto, no un análisis biomédico.

![Completo de conexión modelo local](/img/open-science/non-workflow-completion/09-local-model-reply.webp)

Mantenga el servidor funcionando mientras utiliza el modelo. Para un agente en otro host, `localhost` se refiere a ese host. Un navegador que llega a un punto final no prueba que el Agente puede alcanzarlo.

### Compruebe una llamada de herramienta real {/* #check-an-actual-tool-call */}

<p className="example-label"><strong>Ejemplo</strong> Verifique la llamada de la herramienta Notebook de un modelo local</p>

Después de confirmar una conexión, utilice una pequeña tarea con un resultado conocido para probar el camino de la herramienta. Pida al agente que ejecute esto a través del Python Notebook en lugar de regresar a la aritmética mental:

```python
print(8664 + 18515)
print((8664 + 18515) == 27179)
```

Estos son los números de cuenta cero de la primera muestra GSE60450 y detectados. Inspeccione el código propuesto en el panel de permisos, apréguelo, luego abra **Notebook** y verifique **27179 / Verdadero**.

![Código Notebook y salida real de una llamada de herramienta local](/img/open-science/priority-completion/21-local-model-python-result.webp)

`qwen2.5:7b` local completó esta llamada a través del marco Codex y un punto final local de Compleciones de Chat. En su propuesta inicial se hacía referencia a un módulo de ayuda no disponible; el cheque tuvo éxito después de disminuir esa propuesta y especificar el código libre de dependencia arriba. Esto verifica una operación de herramientas atada, no una planificación confiable de un análisis RNA-seq completo o comportamiento equivalente bajo otro marco de Agente.

## Si la configuración no avanza {/* #if-setup-does-not-advance */}

| Síntoma | Siguiente verificación |
| --- | --- |
| Mensajes de campo obligatorio | Completar los campos mencionados; un solo nombre de la pantalla es insuficiente |
| Almacenamiento de clave seguro no disponible | Desbloquear o autorizar la bóveda credencial del sistema operativo; las teclas no se pueden guardar hasta que esté disponible |
| Fallo de conexión/authenticación | Verifique la credencial, el endpoint, el formato y el acceso al modelo específico |
| Proveedor cambiado durante las pruebas | Revisar el proveedor actual y probar de nuevo; un resultado superseded no debe completar la configuración |
| Inscripción cancelada | Comience de nuevo cuando esté listo; cancelación no es una conexión exitosa |
| Tiempo de ejecución instalado pero sin proveedor utilizable | Finalización de la conexión modelo; instalación de tiempo de ejecución y autorización del proveedor son separados |

### Búsqueda de error HTTP {/* #http-error-lookup */}

Para 400, 401, 403, 404, 429 o 5xx, use el [Mesa de solución de problemas HTTP](troubleshooting.md#http-errors-400-403-429-and-5xx). Mantenga el servicio de respuesta y su mensaje detallado con el código de estado.

Fuente: [ProveedorForm.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ProviderForm.tsx), [ProveedorStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/ProviderStep.tsx).

## Guardar un cambio de proveedor en v0.31.0 y más tarde {/* #validated-provider-save */}

Las ediciones del proveedor se prueban antes de que se cometan. Seleccione **Save**, espere el resultado de la conexión y confirme el éxito antes de cerrar el formulario. Una prueba fallida no reemplaza una configuración ahorrada de trabajo. Si se rechaza una conexión previamente guardada durante una solicitud, se actualiza su disponibilidad; verifique el punto final y credencial, y luego vuelva a probar. **Conversation models**, **Classification models** y **Local parsing models** tienen diferentes propósitos; ver [configuración del modelo](models.md#classification-models).

## StepFun y selección de la región {/* #stepfun-regions */}

Elija **StepFun** en el catálogo de proveedores, confirme **China** o **Global**, a continuación, seleccione un modelo y credenciales de suministro para esa región. v0.32.0 añade **Step-5 Preview**, con metadatos de catálogo multimodal y 1M-contexto. El acceso real del modelo, el soporte de cuota y de entrada todavía dependen de la cuenta del proveedor y de la compatibilidad del agente seleccionado.

Guardar y comprobar la conexión antes de elegirla en una conversación. Las configuraciones existentes de los proveedores conservan su punto final anterior; actualizar la aplicación no cambia su región o modelo Main.
