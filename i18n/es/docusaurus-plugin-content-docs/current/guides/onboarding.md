---
title: "Configuración de primera vez"
last_update:
  date: '2026-11-11'
---

import PlatformGuide, {PlatformContent} from '@site/src/components/PlatformGuide';

# Configuración de primera vez {/* #first-time-setup */}

El mago de primera ejecución tiene cinco páginas en este orden: Medio ambiente, localización de datos, tiempo de ejecución del agente, proveedor de modelos y tiempo de ejecución Notebook. `Back` y la acción primaria en la parte inferior se mueven entre las páginas. La acción primaria sigue sin estar disponible hasta que la página actual cumpla con sus requisitos.

<PlatformGuide />

Puede gestionar y actualizar un Agent externo en los [ajustes de Agent](frameworks.md). **Open-Science Agent** está integrado en la aplicación.

## 1. Entorno {/* #1-environment */}

Empiece en **Prepare environment**. La aplicación comprueba el equipo antes de elegir un Agent y conectar un modelo. Lea el estado y la explicación de cada comprobación.

| Control o control | Lo que significa | Qué hacer |
| --- | --- | --- |
| Compatibilidad del sistema | Revisa el sistema operativo y la arquitectura | Confirme que la plataforma detectada coincide con su ordenador |
| Permiso de almacenamiento de la aplicación | Comprueba el acceso a la carpeta de configuración de la aplicación | Si falla, resuelva el acceso a la ruta mostrada y vuelva a comprobar |
| Almacenamiento seguro de credenciales | Comprueba si la bóveda credencial del sistema operativo está disponible | Resolver el problema de la bóveda antes de entrar en credenciales |
Silencio Red de instalación Silencio Comprueba si el agente seleccionado necesita una descarga y, cuando sea necesario, comprueba fuentes de paquetes Silencio Con el agente incorporado, esto puede informar que no se necesita ninguna descarga; no prueba su conexión modelo TEN
| `Check again` | Repita los controles ambientales | Uso después de fijar un requisito; la etiqueta se convierte en `Checking…` y el botón está desactivado durante el cheque |
| `Continue` | Abre la ubicación de datos | Disponible después de que pasen los cheques de host requeridos; está deshabilitado mientras los cheques se ejecutan |

Abra el paso **Environment**, lea las cuatro filas, seleccione **Check again**, y espere a **All required environment checks passed.** A continuación, seleccione **Continue**. Este control de entorno no requiere una llave API o una llamada de modelo pagada; autenticación modelo se configura más adelante.

Elija una ubicación de datos estable con suficiente espacio libre. El sistema operativo puede mostrar diálogos de carpetas nativas en su propio idioma incluso cuando la aplicación utiliza el inglés.

Lea la explicación de cada cheque junto con su estado. Cuando un agente ya está instalado, el cheque de instalación-redes puede requerir ninguna descarga; no confirma el acceso a todos los servicios externos.

<PlatformContent platform="macos">

![Comprobaciones de medio ambiente completadas durante la configuración de macOS por primera vez](/img/open-science/v121/onboarding-environment.webp)

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

Las nuevas configuraciones utilizan **Open-Science Agent** de forma predeterminada. Está integrado en la aplicación y admite proveedores API compatibles y **Codex subscription**. No necesita instalar otro Agent para completar este paso.

1. Busque **Open-Science Agent** en **Installed** y compruebe que su tarjeta indique **Active**.
2. Espere a que aparezca **All required environment checks passed.** Si falla una comprobación, resuelva el problema indicado y seleccione **Re-detect**.
3. Seleccione **Continue** para abrir **Model provider**. Conecte y pruebe el modelo allí antes de enviar solicitudes.

<PlatformContent platform="macos">

![Open-Science Agent integrado y activo, con Continue disponible y los cinco entornos externos sin instalar](/img/open-science/v121/onboarding-builtin-agent.webp)

</PlatformContent>

La versión de la tarjeta corresponde al entorno de ejecución o al adaptador, no al modelo. **Active** identifica el entorno seleccionado; no confirma la conexión al modelo. Elegir **Codex subscription** en la siguiente página no requiere instalar el entorno **Codex** por separado.

<details>
<summary>Elegir un Agent externo (opcional)</summary>

Si necesita los proveedores o el funcionamiento de **Codex**, **Claude Agent**, **OpenCode**, **CodeBuddy** o **Pi**, seleccione el entorno correspondiente. Si ya está instalado, seleccione **Re-detect** y después su tarjeta. De lo contrario, abra **Install**, elija una fuente compatible y espere a que termine la instalación. Compruebe el estado **Active** y que se hayan superado las comprobaciones requeridas antes de continuar.

Consulte [Frameworks Agent](frameworks.md) para conocer las fuentes de instalación, el cambio de entorno y la reparación. También puede cambiar el entorno después de la configuración en **Settings → Agent**.

</details>

## 4. Proveedor de modelo {/* #4-model-provider */}

El formulario depende de **Provider type**, del Agent seleccionado y del método de autenticación. Para usar una suscripción Codex con el Agent integrado, elija **Codex subscription**. Si el equipo ya tiene una sesión de Codex, seleccione **Import existing Codex sign-in** en **Codex authentication** y después **Test & continue**. Si no hay una sesión válida, elija un método de inicio de sesión compatible y siga las indicaciones; consulte la [configuración de proveedores](providers.md#builtin-codex-subscription). Continúe cuando la comprobación de conexión sea correcta.

<PlatformContent platform="macos">

![Formulario de suscripción de Codex en inglés antes de la autenticación](/img/open-science/v121/onboarding-codex-provider.webp)

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
Silencio Agente Silencio Tiempo de ejecución seleccionado está listo **Active**; el agente incorporado no necesita ninguna instalación separada. **Re-detect** después de resolverlo.
| Agent | El entorno seleccionado está listo y **Active**; el Agent integrado no requiere instalación adicional. | Resuelva el problema indicado y seleccione **Re-detect**. |
| Notebook | Listo y habilitado cuando se necesita la ejecución de código. | Configurar **Settings → Runtimes** antes de solicitar análisis. |
| Primera tarea | Respuesta del agente y salida ahorrada inspectible. | Inspeccione los permisos y errores de herramientas separadamente de la conexión modelo. |





## Cambiar la configuración más tarde {/* #change-the-setup-later */}

No necesitas rehacer el mago. Modelo, agente, tiempos de ejecución y mapa de almacenamiento a las mismas opciones. Si la raíz de los datos está dañada o el directorio de configuración de la aplicación no es obligatorio, Ajustes → El almacenamiento muestra acciones de reparación.

## Referencia de origen {/* #source-reference */}

[A bordoWizard.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/OnboardingWizard.tsx), [EnvironmentStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/EnvironmentStep.tsx), [LocationStep.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/onboarding/LocationStep.tsx).
