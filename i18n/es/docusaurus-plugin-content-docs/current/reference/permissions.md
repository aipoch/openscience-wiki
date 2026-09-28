---
title: "Permisos y control"
last_update:
  date: '2026-09-28'
---

# Permisos y control {/* #permissions-and-control */}

Utilice esta página para identificar la regla responsable de una decisión de permiso. Para los pasos para revisar una tarjeta o revocar una subvención, consulte [Permisos y aprobaciones](../guides/approval-modes.md).

## Capas de permiso {/* #permission-layers */}

| Layer | Valores o alcance | Lo que gobierna |
| --- | --- | --- |
| Perfil de conversación | `ask`, `auto`, `full` | El comportamiento de aprobación del agente para la conversación actual |
| Perfil seleccionado versus efectivo | Runtime-dependiente | El marco puede exponer menos capacidades que el perfil seleccionado requiere; inspeccionar su explicación |
| Subvención de capacidad recordada | Conversación, proyecto, global | Llamamientos futuros para la capacidad grabada y el calificador |
| Política de herramientas Connector | Siempre permita, pregunte cada vez, Bloque | La herramienta Connector seleccionada; una herramienta bloqueada falla antes de la búsqueda de la subvención |
| Acceso al sistema de archivos | Sendas seleccionadas y modos de acceso | Que ubicaciones externas una operación puede acceder |
| Política de red Notebook | Destinos permitidos y cheques de conexión | Si el tiempo de ejecución puede llegar a un destino solicitado |
| Capacidades Specialist | Assigned Skills and Connectors | Lo que está disponible para ese papel |

Estas capas no son intercambiables. El acceso completo cambia el comportamiento rápido del agente; no instala una herramienta, proporciona una credencial, hace que un servidor sea accesible o prueba que la protección de la red de tiempo de ejecución permite la conexión.

## Perfiles y alcances {/* #profiles-and-scopes */}

| Valor UI | Contrato | Significado |
| --- | --- | --- |
| **Ask for approval** / **Ask** | `ask` | Solicitar operaciones que requieran aprobación, con sujeción a las subvenciones existentes y las excepciones de propiedad de las aplicaciones |
| **Auto-approve edits** / **Auto** | `auto` | Las ediciones del espacio de trabajo y las operaciones reconocidas de la Biblioteca de la aplicación pueden pasar automáticamente; no se admiten generalmente conchas arbitrarias o llamadas MCP. Véase [Reglas de biblioteca](../guides/approval-modes.md#library-auto). |
| **Full access** | `full` | Permitir las solicitudes de permiso de agente sin avisos manuales donde el tiempo de ejecución lo soporta |
| **Once** | `once` | Sólo la llamada actual; no concesión duradera |
| **Esta conversación** | `session` | Llamadas coincidentes en esta conversación, incluso en los reinicios |
| **This project** | `project` | Llamamientos coincidentes en este proyecto; Confirmación de un amplioscopio |
| **Global** | `global` | Coincidiendo con las llamadas a través de los proyectos; Confirmación de un amplioscopio |

La tarjeta sólo ofrece alcances compatibles con esa solicitud. Normalmente escoge el alcance de la conversación cuando está disponible, luego una vez. No inferir “una vez” desde la posición del botón; leer su etiqueta completa. Prefijo de comandos y clasificadores de categoría pueden cubrir más que una repetición idéntica de una llamada.

**Default permission mode** afecta nuevas conversaciones. Las conversaciones existentes mantienen su propio entorno. **Auto-review** es una opción de revisión de resultados separada; no es el perfil de permiso `auto`.

## Orden de decisión Connector {/* #connector-decision-order */}

El bróker Connector evalúa estas condiciones:

1. Si la herramienta coincide con **Block**, retírela.
2. De lo contrario, aplique la configuración de Connector de permiso/recompensa. Una entrada automática de nivel Connector puede permitir la llamada; una herramienta que requiere aprobación continúa hasta el próximo cheque.
3. Resolver una beca recordada aplicable para la capacidad y el proyecto/conversación actual.
4. Si no se aplica ninguno, muestre los alcances de aprobación soportados. Si la aprobación es indisponible o denegada, no se hace la llamada.
5. Persiste una aprobación recordada antes de liberar la operación, a menos que el callador defienda explícitamente la persistencia hasta su propio paso de autorización.

Una beca salvada no puede anular a **Block**. Por el contrario, revocar una beca recordada puede no introducir un impulso si una política de permiso o una subvención más amplia todavía cubre la llamada. Lea las indicaciones de política y cobertura mostradas.

## Subsidios mundiales por defecto {/* #default-global-grants */}

La fuente define los subsidios de referencia 20. Este número describe los defectos incorporados, no el recuento de cada perfil instalado debe mostrar.

| Familia | Capacidades de referencia | Conde |
| --- | --- | ---: |
| Personalización | Crear y actualizar un Specialist; publicar/edit a Skill; adjuntar/desprender Skills y conectores a/desde un Specialist | 8 |
| Skills | Invocar un Skill | 1 |
| Lector de literatura | `read_document` | 1 |
| Inspección Notebook | Lista de plazos, leer estado Notebook, lista de categorías de memoria, memorias de búsqueda, paquetes de inspección | 5 |
| Plan de progreso | `update_step_status` | 1 |
| Biblioteca de referencias | Buscar, leer resumen, leer PDF, referencias de formato | 4 |

Algunos defectos permiten que la personalización escriba. No describa la base de referencia como “permisos sólo para lectura”. **Restore defaults** añade subvenciones globales de referencia faltantes sin aclarar otras subvenciones. No se restablece cada configuración de permiso o deshacer el trabajo completado.

Las excepciones de propiedad de la aplicación también existen fuera de esta lista: guardar un resultado ya existente o en línea a través de la capacidad exacta del artefacto, mostrando una pregunta de interacción y declarando que un grupo de actividad puede pasar sin una tarjeta de permiso adicional. Tales excepciones dependen de la identidad de herramientas verificadas, no del título de pantalla tranquilizador de una herramienta.

## Revocación y estado incompleto {/* #revocation-and-incomplete-state */}

| Observación | Significado |
| --- | --- |
| Una fila sigue cubierta a nivel mundial o por un proyecto | La eliminación de esta subvención más estrecha deja en efecto una autoridad más amplia |
| Aviso de política dice bloqueado | La política evita la llamada incluso si existe una fila recordada |
| Almacenes incompletos de advertencia | El inventario visible puede omitir subvenciones; la revocación de vracs está deshabilitada hasta que se conozca el conjunto completo |
| Revisión por etapas o concesión de faltas | Otro cambio invalidó la fila solicitada; refrescar e inspeccionar el estado actual |
| Undo de aviso | Invierte la revocación de la subvención elegible dentro de su disponibilidad mostrada; no revierte los efectos de una herramienta |

Referencia técnica: [Perfiles](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/permission-profiles.ts) · [Interventor Connector](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/permission-grants/connector-broker.ts) · [Subvenciones de referencia](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/permission-grants/defaults.ts) · [de la política](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/acp/permission-policy.ts).
