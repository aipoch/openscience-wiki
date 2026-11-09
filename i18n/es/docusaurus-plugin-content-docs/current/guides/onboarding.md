---
title: "Configuración de primera vez"
last_update:
  date: '2026-11-09'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# Configuración de primera vez {/* #first-time-setup */}

El mago de primera ejecución tiene cinco páginas en este orden: Medio ambiente, localización de datos, tiempo de ejecución del agente, proveedor de modelos y tiempo de ejecución Notebook. `Back` y la acción primaria en la parte inferior se mueven entre las páginas. La acción primaria sigue sin estar disponible hasta que la página actual cumpla con sus requisitos.

<PlatformGuide />

Después de la configuración inicial, un tiempo de ejecución Codex gestionado por aplicaciones más antiguo puede ser actualizado en [Configuración del agente](frameworks.md#update-codex). Esto es separado de elegir un proveedor de modelos.

## 1. Entorno {/* #1-environment */}

Empieza en **Prepare environment**. La aplicación comprueba el host antes de pedirle que instale un agente o conecte un modelo. Cada fila contiene un estado y una explicación; utilizar la explicación para identificar el requisito que necesita atención.

| Control o control | Lo que significa | Qué hacer |
| --- | --- | --- |
| Compatibilidad del sistema | Revisa el sistema operativo y la arquitectura | Confirme que la plataforma detectada coincide con su ordenador |
| Permiso de almacenamiento de la aplicación | Comprueba el acceso a la carpeta de configuración de la aplicación | Si falla, resuelva el acceso a la ruta mostrada y vuelva a comprobar |
| Almacenamiento seguro de credenciales | Comprueba si la bóveda credencial del sistema operativo está disponible | Resolver el problema de la bóveda antes de entrar en credenciales |
| Red de instalación | Chequea fuentes de paquetes soportadas e informa una fuente accesible | Lea la fuente y latencia seleccionadas; los resultados dependen de su red |
| `Check again` | Repita los controles ambientales | Uso después de fijar un requisito; la etiqueta se convierte en `Checking…` y el botón está desactivado durante el cheque |
| `Continue` | Abre la ubicación de datos | Disponible después de que pasen los cheques de host requeridos; está deshabilitado mientras los cheques se ejecutan |

Abra el paso **Environment**, lea las cuatro filas, seleccione **Check again**, y espere a **All required environment checks passed.** A continuación, seleccione **Continue**. Este control de entorno no requiere una llave API o una llamada de modelo pagada; autenticación modelo se configura más adelante.

Elija una ubicación de datos estable con suficiente espacio libre. El sistema operativo puede mostrar diálogos de carpetas nativas en su propio idioma incluso cuando la aplicación utiliza el inglés.

Lea la explicación de cada cheque junto con su estado. Cuando un agente ya está instalado, el cheque de instalación-redes puede requerir ninguna descarga; no confirma el acceso a todos los servicios externos.

<PlatformContent platform="macos">

![Comprobaciones de medio ambiente completadas durante la configuración de macOS por primera vez](/img/open-science/macos/setup-environment.webp)

</PlatformContent>

<PlatformContent platform="windows">

![Comprobaciones ambientales durante la configuración de Windows por primera vez](/img/open-science/windows/setup-environment.webp)

</PlatformContent>

<PlatformContent platform="linux">

![Los cuatro cheques de entorno pasaron durante la configuración de Linux por primera vez](/img/open-science/linux/setup-environment.webp)

</PlatformContent>

## 2. Ubicación de datos {/* #2-data-location */}

<PlatformContent platform="macos">

![Ubicación de los datos antes de elegir una carpeta](/img/open-science/walkthrough-2026-09-08/02-data-location.webp)

</PlatformContent>
Elija la ubicación para archivos grandes antes de instalar tiempos de ejecución. Los artefactos, los cuadernos y los entornos utilizan la ubicación de los datos; Los ajustes y la historia permanecen en la ubicación de configuración. El camino mostrado es un resumen sólo lectura, no un campo de texto.

| Control | Medidas y resultados |
| --- | --- |
| `Location` / ruta de ubicación de datos | Muestra el defecto efectivo o la carpeta de datos propuesta |
| `Browse…` | Abre el selector del directorio del sistema. Elija una carpeta padre; inspeccionar el camino final gestionado por la aplicación después de regresar |
| Picker de sistema `Cancel` | Cierra el picker sin reemplazar la opción actual |
| `Use default location instead` | Aparece después de una elección personalizada; aclara que la elección y sus errores relacionados |
| `Back` | Returns to Environment |
| `Continue` con la ubicación predeterminada | Avances a tiempo de ejecución del agente |
| `Continue` después de elegir un lugar personalizado | Abre. `Restart to set up your data?`; no activa silenciosamente la nueva carpeta |
| `Retry` | Aparece si la información de ubicación predeterminada no podía cargar; intenta volver a leer. |

<PlatformContent platform="macos">

![Pareja personalizada seleccionada y la ruta final administrada por la aplicación](/img/open-science/local-acceptance/data-location-selected.webp)

</PlatformContent>
Seleccione **Browse…**, elija una carpeta padre vacía en un disco con suficiente espacio e inspeccione el camino completo manejado mostrado por el mago. Seleccione **Continue** y lea la confirmación del reinicio. Utilice una ubicación estable de datos de investigación en lugar de una carpeta temporal.

<PlatformContent platform="macos">

![Confirmación de reinicio para la ubicación de datos seleccionada](/img/open-science/local-acceptance/data-location-confirm.webp)

</PlatformContent>
| Control de confirmación | Resultado |
| --- | --- |
| Cerca (cerrado)`×`) | Regresa a la ubicación de datos y conserva la ruta propuesta |
| `Keep default` | Limpia la ubicación propuesta y los avances utilizando el defecto |
| `Restart` | Activa la ubicación de datos seleccionada y relanza la aplicación; el mago se reanudará en el tiempo de ejecución del agente |

La aplicación inspecciona la carpeta antes de aceptarla. Se puede adoptar una carpeta de datos reconocida existente; la página explica que nada se mueve. Una selección inutilizable muestra un error. Si la activación o el relanzamiento falla, la página puede mostrar un error y ofrecer reingreso o la ubicación predeterminada. No mueva manualmente ni renombre la carpeta gestionada por la aplicación.

### Adoptar una carpeta de datos existente {/* #adopt-an-existing-data-folder */}

1. Elija **Browse…** y seleccione el padre que contiene una carpeta de datos administrada por aplicaciones reconocida.
2. Confirme **This folder already contains Open Science data — it will be used as-is (nothing is moved).** Compruebe el destino completo, a continuación, seleccione **Continue → Restart**.
3. Después del relanzamiento, el mago vuelve a **Agent runtime**. Se mantiene la ubicación de los datos seleccionados; continuar con las medidas de configuración restantes.

Después de la adopción, vuelva a abrir archivos representativos para confirmar los datos esperados está presente. La adopción cambia el almacenamiento de gran alcance; no importa la configuración de otra instalación, la base de datos de conversaciones o las credenciales. **Keep default** aclara la ubicación propuesta y continúa con la ubicación efectiva anterior.

### Recuperar cuando la ubicación no puede ser salvada {/* #recover-when-the-location-cannot-be-saved */}

Si la página informa **No podía terminar de configurar el almacenamiento: EACCES: permiso negado**, inspeccione el camino en el error. El directorio de configuración también necesita ser de carácter obligatorio; La elección de un destino de datos por sí solo puede no resolverlo. Restaurar el acceso a la ubicación de configuración de propiedad de la aplicación afectada, luego reingrese la operación o seleccione **Use default location instead → Continue**.

<PlatformContent platform="macos">

![Controles de falla y recuperación de la configuración real](/img/open-science/local-todo-batch/56-onboarding-config-write-error.webp)

</PlatformContent>
Si reiniciar falla antes de que cambie la ubicación, restaurar la configuración escribir acceso y reabrir el asistente. Revise el camino activo y los archivos existentes antes de volver a iniciar un movimiento; ver [Almacenamiento](storage.md).

## 3. Entorno de ejecución del agente {/* #3-agent-runtime */}

Elija el tiempo de ejecución del Agente que llevará a cabo sesiones. Un nuevo v1.2.0 predeterminado de configuración para el incorporado **Open-Science Agent**, por lo que no se necesita instalación independiente del Agente para esa elección. Requiere un proveedor de API compatible. Si usas **Codex subscription**, seleccionar y preparar **Codex** en su lugar; los pasos del Codex abajo muestran esa opción. Continúe una vez que el tiempo de ejecución previsto esté listo.

<PlatformContent platform="macos">

![Menú fuente de instalación Codex](/img/open-science/walkthrough-2026-09-08/05-agent-install-menu.webp)

</PlatformContent>
1. Abre **Instalar Codex**.
2. Elija la fuente de instalación gestionada por la aplicación recomendada por el menú. La alternativa utiliza una instalación global npm.
3. Espera a que termine la instalación. Evite iniciar otra instalación mientras el instalador está funcionando.
4. Confirme que Codex ahora muestra su versión y **Active**.
5. Seleccione **Continue** para abrir el proveedor de Modelo.

<PlatformContent platform="macos">

![Codex instalado y seleccionado como el tiempo de ejecución activo](/img/open-science/walkthrough-2026-09-08/06-agent-codex-ready.webp)

</PlatformContent>
Las etiquetas de la versión identifican al agente o adaptador instalado, no al modelo seleccionado. Inspeccione los valores instalados en lugar de esperar las versiones exactas de la captura de pantalla.

<PlatformContent platform="windows">

Si un agente compatible ya está instalado, seleccione su tarjeta y confirme **Active** antes de continuar. La pantalla Windows a continuación utiliza una instalación Codex existente; reinstalar es innecesario sólo para proceder a través del mago.

![Un agente Codex existente seleccionado como activo en el asistente de configuración Windows](/img/open-science/windows/setup-agent-active.webp)

</PlatformContent>

| Control o estado | Comportamiento |
| --- | --- |
| Tarjeta marco | Muestra estado de instalación, versión, ruta de tiempo de ejecución, y si el marco está activo. |
| **Install…** | Abre las fuentes de instalación apoyadas por ese marco. |
| Progresos en la instalación | b) La actividad de preparación de informes; Los controles de instalación en conflicto y la re-detección no están disponibles mientras se ejecuta. |
| **Re-detect** | Refresca la información de tiempo de ejecución instalada. La etiqueta se convierte en **Detecting…** hasta que terminen los cheques. También puede volver a detectar desde Ajustes → Agente. |
| **Uninstall** | No disponible para el tiempo de funcionamiento activo. Cambiar a otro marco instalado antes de eliminarlo. |
| **Back** | Volver a la ubicación de datos cuando no se está ejecutando ninguna operación de configuración de bloqueo. |
| **Continue** | Procede una vez que un tiempo de funcionamiento activo está listo. |

Ver [Marcos de agentes](frameworks.md) para instalación, conmutación, reparación y eliminación específica del marco.

## 4. Proveedor de modelo {/* #4-model-provider */}

El formulario cambia según **Provider type**, el agente seleccionado, y el método de autenticación. Para una suscripción a Codex, **Import existing Codex sign-in** copia un registro local existente a Open-Science. Úsalo cuando quieras conectar esa cuenta, y luego espera el cheque de conexión.

<PlatformContent platform="macos">

![Formulario de suscripción de Codex en inglés antes de la autenticación](/img/open-science/walkthrough-2026-09-08/07-model-codex-subscription.webp)

</PlatformContent>
Para un proveedor de API, seleccione su tipo, introduzca el punto final y los detalles del modelo requeridos por ese proveedor, y use **Test & continue**. El mago valida los campos requeridos antes de enviar una prueba. Una prueba exitosa adelanta al mago; un error de validación o conexión sigue siendo visible para la corrección.

<PlatformContent platform="macos">

![Puerta de entrada personalizada mostrando errores de campo requerido](/img/open-science/walkthrough-2026-09-08/08-model-required-fields.webp)

</PlatformContent>
Vea [Configuración del proveedor](providers.md) para opciones de autenticación, campos avanzados y recuperación de errores de conexión.

Mantenga las teclas API en el campo de credencial dedicado. No los incluya en capturas de pantalla, instrucciones de proyecto o mensajes de conversación.

## 5. Entorno de ejecución de Notebook {/* #5-notebook-runtime */}

Esta página final opcional reutiliza la interfaz **Settings → Runtimes** completa. Por defecto, los cuadernos utilizan Python gestionado por aplicaciones. Puede seleccionar un intérprete detectado o preparar otro entorno más tarde.

| Control de mago o estado | Comportamiento |
| --- | --- |
| **Back** | Regrese al proveedor de modelos. Discapacitados durante el suministro de tiempo de ejecución o mientras termina la configuración. |
| **Finish** | Ahorre la finalización a bordo. La configuración Notebook es opcional, por lo que no es necesario un intérprete personalizado listo. |
| Configuración ya en curso | Espere a que termine o cancele la configuración antes de salir; **Back** y **Finish** son discapacitados para evitar dejar un ambiente parcial. |
| Error de terminación | Muestra el fallo y permite otro intento. |

Después de **Finish**, confirme Inicio se abre, luego utilice [Primer proyecto](first-project.md) para guardar un pequeño resultado. Repita la aplicación y compruebe que el proyecto sigue disponible. Si la configuración vuelve a aparecer, inspeccione la ubicación de datos y el error de configuración antes de crear otro perfil.

<PlatformContent platform="windows">

La página Windows **Notebook runtime** también puede mostrar **Local Shell · WSL2 Bash Preview**. Lea **Optional — nothing here is required to finish setup.** Usted puede elegir **Finish** mientras que Python/R se defere y WSL2 no está disponible. Prepare el plazo de ejecución requerido antes de solicitar la ejecución del código; completar el mago no instala esos entornos opcionales.

![Ajustes Windows opcionales Notebook y WSL2 con acabado disponible](/img/open-science/windows/setup-optional-runtimes.webp)

</PlatformContent>

## Lista final de verificación de configuración {/* #final-setup-checklist */}

| Check | Pruebas esperadas | Si falla |
| --- | --- | --- |
| Entorno | Los cheques obligatorios pasan. | Revise después de resolver el requisito mostrado. |
| Ubicación de datos | La ruta final gestionada es la ubicación prevista. | Regresar a la página de ubicación; no inferir el camino final sólo del recolector. |
| Agente | Versión instalada y estado activo. | Inspeccione los registros de instalación y redetect. |
| Proveedor | Conexión verificada y un modelo principal seleccionado. | Revise el registro o campos específicos para proveedores. |
| Notebook | Listo y habilitado cuando se necesita la ejecución de código. | Configurar **Settings → Runtimes** antes de solicitar análisis. |
| Primera tarea | Respuesta del agente y salida ahorrada inspectible. | Inspeccione los permisos y errores de herramientas separadamente de la conexión modelo. |





## Cambiar la configuración más tarde {/* #change-the-setup-later */}

No necesitas rehacer el mago. Modelo, agente, tiempos de ejecución y mapa de almacenamiento a las mismas opciones. Si la raíz de los datos está dañada o el directorio de configuración de la aplicación no es obligatorio, Ajustes → El almacenamiento muestra acciones de reparación.

## Referencia de origen {/* #source-reference */}

[A bordoWizard.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/OnboardingWizard.tsx), [EnvironmentStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/EnvironmentStep.tsx), [LocationStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/LocationStep.tsx).
