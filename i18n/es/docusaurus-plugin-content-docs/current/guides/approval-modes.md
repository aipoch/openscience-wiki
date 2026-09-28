---
title: "Permisos y aprobaciones"
last_update:
  date: '2026-09-28'
---

# Permisos y aprobaciones {/* #permissions-and-approvals */}

Utilice **Agent controls** para elegir cómo la conversación actual solicita aprobación. Utilice **Settings → Permissions** para establecer el predeterminado para nuevas conversaciones e inspeccionar el acceso recordado. Estas son operaciones separadas: cambiar un predeterminado no reinicia las conversaciones existentes o revocar sus donaciones.

<span id="permission-requests" />

<span id="plan-first" />

<span id="activity-rows" />

## Elija un modo de conversación {/* #choose-a-conversation-mode */}

| Modo | Utilízalo cuando | Qué esperar |
| --- | --- | --- |
| **Ask for approval** | Usted quiere inspeccionar las operaciones solicitadas | Tarjetas de aprobación para acciones que carecen de una subvención o excepción aplicable |
| **Auto-approve edits** | Permite cambios de rutina dentro del espacio de trabajo | Las ediciones soportadas pasan automáticamente; comandos, operaciones de red y MCP todavía pueden necesitar aprobación |
| **Full access** | Usted ha elegido permitir operaciones de agente sin avisos | Comandos, cambios de archivos y solicitudes de red pueden proceder sin tarjetas de permiso manual; otros requisitos de acceso y servicios siguen siendo |

Abra **Agent controls** junto al compositor y lea el modo seleccionado. Revise cualquier mensaje de compatibilidad que muestre cómo el marco lo implementa. El control de acceso completo tiene su propia confirmación. **Auto-review** es un control diferente para revisar los resultados y no significa ediciones de auto-aprobación.

![El selector de permisos en inglés real](/img/open-science/walkthrough-2026-09-08/57-permission-modes.webp)

Revise el modo efectivo mostrado para su agente; El comportamiento de aprobación soportado puede diferir por marco. No todos los modos se han ejercido en los cuatro marcos.

<span id="a-safe-approval-order" />

## Lea una tarjeta de aprobación {/* #read-an-approval-card */}

Lea la operación, el entorno seleccionado y el código propuesto antes de aprobar. Para una comprobación de datos, confirme que lee la entrada prevista y escribe sólo los productos solicitados. La instalación de una dependencia desaparecida es una operación separada con un propósito y efecto diferentes.

![Python aprobación de la ejecución del caso GSE60450 público](/img/open-science/guides-walkthrough/25-python-permission.webp)

| Control o información | Qué inspeccionar o hacer |
| --- | --- |
| Título de la herramienta y resumen | Identificar el funcionamiento, el objetivo y la fuente reales |
| Código o argumentos expandibles | Compruebe los caminos, tiempo de ejecución, nombres de paquetes o entradas de servicio |
| **Authorization scope** flecha | Elija entre los alcances que esta solicitud admite |
| **Allow once** | Libera sólo esta llamada |
| **Allow for this conversation** | Recuerde que las llamadas coincidentes para esta conversación, incluso en los reinicios |
| **Allow for this project** | Aplicar el acceso a juego en todo el proyecto y confirmar el alcance más amplio |
| **Allow globally** | Aplicar el acceso a través de proyectos y confirmar el alcance más amplio |
| **Deny** | - Deducir la operación presentada; inspeccionar la respuesta resultante antes de elegir una alternativa |
| Opciones adicionales de proveedores, si están presentes | Lea su etiqueta y efecto real; las opciones disponibles varían según solicitud |

El botón principal Permitir normalmente utiliza el alcance de la conversación cuando la solicitud lo soporta. Lea su etiqueta antes de hacer clic. Para una concesión de prefijo de comandos, inspeccione el prefijo mostrado: comandos posteriores que comienzan con ese prefijo puede coincidir. Un permiso para una sola vez no es permiso para un servicio externo no relacionado.

### Recuerde la aprobación de la lectura web {/* #remember-web-reading-approval */}

Para una solicitud de **Leer páginas web** compatible, elija **Allow for this conversation** para recordar que la capacidad para más tarde lee la web en la misma conversación. Puede cubrir otros sitios web, no sólo la primera URL. **Allow once** sólo se aplica a esa llamada. Revisar o revocar la subvención en virtud de **Permisos recordados**; no añade hosts a la red Notebook permitlist o autoriza cargas.

### Recuerde la aprobación de la búsqueda web {/* #remember-web-search */}

Desde v0.30.2, las solicitudes nativas **Search the web** compatibles de Claude Agent también ofrecen **Allow for this conversation**. Las búsquedas posteriores que correspondan dentro de esa conversación pueden reutilizar el permiso. **Allow once** solo autoriza la solicitud actual. Consulta o revoca **Search the web** en **Remembered permissions**. La búsqueda y **Read web pages** son permisos distintos. No todos los frameworks ni Connectors admiten esta opción; comprueba el alcance indicado.

## Administrar acceso recordado {/* #manage-remembered-access */}

Abre **Settings → Permissions → Remembered permissions**. Filtro por **All**, **Global**, **Project** o **Session**. Las filas muestran una capacidad, alcance y cualquier tipo de clasificación o cobertura más amplia. Un enlace de sesión abre su conversación con el propietario; una pista de política Connector conduce a la configuración relacionada.

| Medida | Resultado |
| --- | --- |
| **Revocación** en una fila | Retire la beca recordada inmediatamente; inspeccionar la notificación de Undo |
| Grupo **Revoke all** | Pide la eliminación de las subvenciones de ese grupo; comprobar que el alcance mostrado está completo antes de utilizarlo |
| **Restore defaults** | Agrega subsidios globales de base desaparecidos y deja otro acceso recordado intacto |
| **Defaults restored** | No faltan subvenciones de referencia; el botón de restauración está deshabilitado |
| Filtro de cultivo | Cambia las filas mostradas; no otorga ni revoca el acceso |

Seleccione **Revocación** para eliminar la subvención prevista. Use **Undo** mientras se ofrece si esto fue un error. **Restore defaults** añade las subvenciones de referencia que faltan; no restablece cada permiso que se le quitó previamente.

### Lea el alcance efectivo de una subvención ahorrada {/* #read-a-saved-grants-effective-scope */}

Inspeccione el Connector/tool, **Global / Project / Session** y el calificador **Cualquier llamada / Entrada específica / Grupo de comando** antes de revocar una subvención. Las entradas del grupo de comandos pueden incluir su resumen de aprobación y fecha.

**Blocked in Connectors; this permission is currently inactive** significa que el subsidio ahorrado no anula la política Connector. **Allowed by Connector policy even without this permission** significa que revocar esta subvención por sí sola no eliminará esa asignación de políticas. Abra el llamado Connector para inspeccionar su regla. Utilice **Undo** mientras se ofrece si la revocación no fue intencionada, a continuación, verifique el estado restaurado.

### Revoque a un grupo en el ámbito actual {/* #revoke-a-group-in-the-current-scope */}

1. Filtro por el alcance previsto, como **Session**.
2. Seleccione la acción **Revoke all** de ese grupo.
3. Comprueba que el grupo fue despejado y que otros alcances conservan sus subvenciones.
4. En la próxima operación de emparejamiento, lea cualquier nueva solicitud de aprobación antes de proceder.

La revocación afecta a la futura autorización. No revierte las ediciones completadas ni las solicitudes de red, y una subvención más amplia todavía puede autorizar la operación.

![Una nueva solicitud de ejecución después de la revocación del grupo de sesión](/img/open-science/local-todo-batch/40-permission-request-renewed.webp)

Si el inventario es incompleto, espere a que cargue o vuelva a enviar la solicitud fallida antes de utilizar la revocación del grupo. Revise el alcance seleccionado después de revocar.

## Diagnosticar comportamiento inesperado {/* #diagnose-unexpected-behavior */}

| Problema | Comprobaciones y soluciones |
| --- | --- |
| No aparece una tarjeta en el modo Ask | Compruebe los permisos guardados, la política de la herramienta y las excepciones propias de la aplicación. Ask no exige confirmación para cada lectura, guardado de resultados o pregunta al usuario. La [referencia de permisos](../reference/permissions.md) enumera los permisos básicos, incluida la escritura de personalizaciones. |
| La misma operación sigue ejecutándose tras revocar el permiso | Busque un permiso más amplio de proyecto o global, o una política que permita la operación. Eliminar un permiso de sesión no elimina un permiso global. |
| Una operación autorizada falla | La aprobación permite intentar la operación. Resuelva la causa indicada —paquete ausente, archivo inaccesible, credenciales no válidas o destino de red rechazado— antes de reintentarlo. Consulte [Red](network.md) para los errores de DNS y de descarga de paquetes. |
| Faltan algunos ámbitos | La tarjeta solo muestra los ámbitos compatibles con la solicitud y el contexto del proyecto o la sesión. No elija un ámbito más amplio solo porque no esté disponible una opción más restringida. |

Fuente: [Subvenciones y deshacer](https://github.com/aipoch/open-science/commit/469b593b).

## Trabajos de biblioteca en modo automático {/* #library-auto */}

Con **Auto-approve edits**, un conjunto definido de operaciones de la Biblioteca incorporada puede pasar la aprobación del agente por llamada automáticamente. Estos incluyen referencias de búsqueda y lectura, ahorro a Inbox, adquisición de PDFs, formateo de referencias y preparación de documentos de citación. Esto reduce los impulsos repetidos durante el trabajo rutinario de la Biblioteca.

La regla se aplica a las herramientas reconocidas de literatura propiedad de la aplicación, no todas las llamadas MCP, comando o operación de red. Las propias reglas de archivo, red y recursos de las herramientas siguen vigentes, y esta decisión no crea una subvención permanente. Elija **Ask for approval** cuando desee inspeccionar las solicitudes de agente individualmente. Revisar los candidatos de la bandeja de entrada antes de aceptarlos.
