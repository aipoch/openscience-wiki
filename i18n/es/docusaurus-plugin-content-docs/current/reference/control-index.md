---
sidebar_position: 1
title: "Índice de página y control"
description: "Encontrar cada botón Open-Science documentado, entrada, cambio y resultado por página."
last_update:
  date: '2026-09-24'
---

# Índice de página y control {/* #page-and-control-index */}

Esta página condensa los puntos de entrada de la aplicación en una lista de página por página. Los controles dependientes del Estado sólo aparecen cuando se cumplen sus condiciones. Si un control es deshabilitado, lea su punta de herramientas y las cuestiones conocidas pertinentes; las posibles causas incluyen el estado de sesión, los prerrequisitos faltantes y un defecto de producto.


<span id="current-verification-coverage" />

## Encontrar las instrucciones detalladas {/* #find-the-detailed-instructions */}

Use este índice para localizar un control. Siga el tutorial relacionado para requisitos, pasos, resultados esperados y temas conocidos. Vea [Sinopsis de la configuración](../settings/overview.md) para los paneles de configuración, [atajos de tareas](controls.md) para acciones comunes, y [Solución de problemas](../guides/troubleshooting.md) para errores.

## A bordo {/* #onboarding */}

| Página, en orden mago | Controles | Resultado o requisito previo |
| --- | --- | --- |
| Entorno | Revise de nuevo, Continúe, ver filas | Revisar los requisitos de los anfitriones; continuar después de pasar |
| Ubicación de datos | Examine..., Usar ubicación predeterminada en su lugar, Volver, Continuar | Elija la ubicación de los datos; una opción personalizada requiere Mantener la confirmación predeterminada o reiniciar |
| Entorno de ejecución del agente | Tarjeta marco, Instalar, Re-detect, Retroceder, Continuar | Instalar o seleccionar un tiempo de funcionamiento activo listo |
| Proveedor de modelo | Tipo de proveedor, opción de autenticación, campos condicionales, Test & continue | Validar los insumos requeridos y probar el proveedor antes de avanzar |
| Entorno de ejecución de Notebook | Controles de intérpretes, configuración del entorno, Paquetes, Volver, Terminar | b) La configuración opcional; terminar o cancelar una operación de medio ambiente ya en marcha antes de salir |

Vea [Configuración de primera vez](../guides/onboarding.md) y [Configuración del proveedor](../guides/providers.md) para los pasos detallados.

## Inicio y proyectos {/* #home-and-projects */}

| Página | Controles | Resultado |
| --- | --- | --- |
| Home header | GitHub, Búsqueda, Biblioteca, Tema, Mensajes, Ajustes del modelo | Abra el repositorio, búsqueda global, biblioteca de literatura, menú de apariencia, notificaciones o configuración de modelo |
| Home body | Nuevo proyecto, tarjeta de proyecto, Sesión reciente | Crear o abrir un proyecto o sesión |
| Menú temático | Sistema, Luz, Oscuro | Establecer apariencia y mantenerlo en sincronía con General |
| Buscar | Entrada de búsqueda, categoría, Filtros avanzados, detalle de resultados, Esc | [Encontrar mensajes, archivos y referencias](../guides/navigation.md) con el alcance previsto |
| Mensajes | Tema de notificación, acción de lectura, Cerrar | Abrir la fuente y gestionar elementos sin leer |
| Crear proyecto | Nombre, Descripción, Agente Context, Cancelar, Crear proyecto | Crear un proyecto; El nombre es necesario |
| Acciones del proyecto | Estado dependiente Editar, Archivo, Eliminar y acciones conexas | Cambiar los metadatos del proyecto, archivar el proyecto o confirmar la eliminación |

## Barra lateral y diseño del espacio de trabajo {/* #workspace-sidebar-and-layout */}

| Control | Resultado |
| --- | --- |
| Todos los proyectos | Regresa a casa |
| Nombre del proyecto | Abrir el punto de entrada o menú del proyecto |
| Barra lateral de colapso | Colapso o ampliación de la barra lateral izquierda |
| Nuevo | Crear una sesión |
| Personalizar | Iniciar una conversación de personalización Skill/Specialist |
| Archivos | Mostrar el panel de archivos del proyecto a la derecha |
| Biblioteca | Referencias abiertas relacionadas con proyectos en la biblioteca de literatura |
| Período de sesiones | Interruptores de sesiones; informes de estado Idle, Running, Permission, u otro estado |
| Acciones de sesión | Pin/Unpin, Editar..., Descargar todos los artefactos, Ver libreta, Exportar conversación..., Archivo, Eliminar |
| Mensajes, Ajustes, GitHub | Notificaciones abiertas, ajustes o el repositorio oficial |
| Redimensionar izquierda/derecha, Collapse vista previa | Redimensionar un panel o colapsar Vista previa |

## Conversación y Compositor {/* #conversation-and-composer */}

| Área | Control o entrada | Resultado |
| --- | --- | --- |
| Mensaje | Copiar, Editar | Copiar el mensaje o crear una revisión editándolo |
| Revisión | Anterior, `n/N`, Siguiente | Examine revisiones de mensajes |
| Resultado auxiliar | Usage, Elapsed, generado archivo | Inspeccione el uso y el tiempo, o abra una salida |
| Actividad | Colapsible título, Detalles, Copia, Informar error | Abrir herramienta, código, difusa, búsqueda o detalles de error |
| Entrada | Pregunte a cualquier cosa, `↑↓`, `/`, `@`, `#`, `⌘K/Ctrl+K` | Introduzca el texto, busque la historia, seleccione un Skill, consulte un archivo/sesión o busque |
| `+` | Adjuntar archivos, Sus archivos, Revisión, Context | Establezca un archivo nuevo o existente, solicite revisión, o inspeccione contexto |
| Acoplamiento | Vista previa, Retirar | Inspeccionar o eliminar una referencia antes de enviar |
| Controles de agentes | Specialist, Delegación, Revisión automática, Modo de permiso | Modificar la política de solicitudes posteriores |
| Modelo | Modelo activo, esfuerzo de racionalización | Cambiar el modelo o el esfuerzo para las solicitudes posteriores |
| Queue/Send | Queue edit/delete/reorder, Enviar ahora, Enviar, Plan primero, chat lateral, Branch, Stop | Etapa o envíe seguimientos, elija un modo o detenga el funcionamiento actual |
| Desplazarse hasta el final | Saltar al último mensaje |

## Permiso, plan y cuestiones estructuradas {/* #permission-plan-and-structured-questions */}

| Superficie | Controles | Resultado |
| --- | --- | --- |
| Permiso | Información de impacto, Información de permisos, documento Skill expandible, Permitir una vez, Deny | Inspeccionar y aprobar o rechazar una sola solicitud |
| Confirmación del alcance | Cancelar, Confirmar proyecto/global | - Salvar una subvención más amplia; amplios alcances requieren una segunda confirmación |
| Plan | Aprobar/Run, Entrada de comentarios, Cancelar | Aceptar un plan, pedir cambios, o cancelar |
| Elicitación | Entradas o opciones estructuradas, Enviar, Cancelar | Responde a una pregunta de agente |
| Subagent permission | Identidad/cuento pendiente, Permiso/Denegar | Decidir una solicitud de subagent por separado |

## Archivos y vista previa {/* #files-and-preview */}

| Control | Resultado |
| --- | --- |
| Filtro, Búsqueda | Filtro por todos o artefactos y por nombre de archivo |
| Grid/List | Cambiar el diseño del archivo |
| Ampliar/Exit pantalla completa | Abra la biblioteca de archivos de pantalla completa o vuelva a la vista dividida |
| Concesionario de categoría | Ampliar cargas o archivos generados desde una sesión |
| Tarjeta de archivo / cuerpo | Abrir una vista previa modal |
| Descargar | Guardar el archivo original o la versión seleccionada |
| Abierto en la vista dividida | Añadir una pestaña Vista previa a la derecha |
| Vista previa pestaña, Cerrar ficha | Interruptor o cierre pestañas Vista previa |
| Avance de pantalla completa | Agrandar el archivo actual |
| Acciones de archivos → Provenance | Pruebas de artefacto abierto; cargas ordinarias no tienen esta acción |
| Acciones de archivos → Editar/Compare | Publicar una nueva versión de texto o compararla con su predecesor |
| Anterior/vN/Siguiente | Cambiar la versión del artefacto |
| PDB Cartoon/Stick/Sphere/Surface/Line | Cambiar la representación tridimensional |
| Controles PDF/Office/Image | Páginas de navegación/búsqueda, zoom, seleccione evidencia PDF, muestre las miniaturas o descarga como compatible |
| Menú de contexto de contenido de vista previa | Copiar ruta, Descargar, Guardar como artefacto, Provenance, o volver al contexto cuando sea aplicable |

## Biblioteca de Literatura {/* #literature-library */}

| Área | Controles | Resultado |
| --- | --- | --- |
| Sidebar | Caja, Todas las referencias, Duplicates, Papelera, Proyectos, Colecciones, Ajustes de certificación | Elija el alcance del catálogo o el gestor de estilo de citación |
| Agregar | Añada referencia, Importe PDF, Referencias de importación | Crear metadatos o previsualizar importación PDF/BibTeX/RIS/NBIB |
| Catálogo | Buscar, Ordenar, Filtros, Personalizar columnas, tamaño de página | Reducir y organizar referencias |
| Carril de selección | destino de la colección/proyecto, búsqueda de texto completo, pasar a la basura, exportación | Aplicar una acción a granel limitada a referencias seleccionadas |
| Detalles de referencia | Metadatos edit/completo, identificadores, colecciones, proyectos, adjuntos, citación, texto completo | Inspeccionar o actualizar una referencia |
| Bandeja de entrada | Aceptar, Desestimar, selección de lotes, Deshacer | Los candidatos descubiertos por el agente de revisión antes de la admisión de la biblioteca |
| Duplicados | Seleccionar grupos, Comparar, opciones de campo, Combinar | Revisar y fusionar los registros mientras preserva las asociaciones |
| Tareas en segundo plano | Pausa, Resumen, Comentario, Cancelar | Control de metadatos a granel/operaciones de texto completo |

## Notebook y Provenance {/* #notebook-and-provenance */}

| Página | Controles | Resultado |
| --- | --- | --- |
| Notebook | Filtro de agente, pestañas Python/R/Bash, Variables | Filtros de funcionamiento o inspeccionar el espacio de nombre del kernel en vivo |
| Celda Notebook | Copiado, Mostrar / Hide salida | Copiar entrada o ampliar la salida |
| Zapatilla Notebook | Descargar `.ipynb`, Cerca | Descarga cuando las celdas se pueden convertir, o cierra el diálogo |
| Procedencia | Flechas de la versión, Cerrar Provenance | Cambiar la versión o volver a Preview |
| pestañas Provenance | Código, Registro de Ejecución, Mensajes, Medio Ambiente, Revisión | Cambiar el tipo de evidencia |
| Código | Generar script, Descargar, Copiar | Crear un script derivado o guardar el bloque productor |

## Marcas y debates paralelos {/* #bookmarks-and-side-discussions */}

| Entrada | Controles y comportamiento |
| --- | --- |
| Marcador de lectura privada | Selección → Para mí → Marcador; Compositor Marcas abre la lista. Editar notas, volver a la fuente o eliminar el marcador. [Detalles](../guides/bookmarks.md) |
| Side Chat pestaña | Proyecto independiente de pestañas y seguimiento; transferencia de anotaciones; anulación y confirmación de destructiva-cerca. [Detalles](../guides/delegation.md) |

## Controles de configuración global {/* #global-settings-controls */}

**Search settings** navega a través de los cuatro grupos de panel. `Back`, `Forward`, cubos de pan, `Maximize/Restore`, `Close settings`, navegación móvil y error `Dismiss` se aplican a través de Ajustes. Ver [Sinopsis de la configuración](../settings/overview.md) para grupos y atajos de búsqueda.

### Skills {/* #skills */}

Conversation Skill imports, filtro fuente, Search, Add skill, category collapse, Skill detail, enable switch, Create/Upload/Import, Preview, Editar, Exportar, Eliminar, Cancelar y Guardar.

### Memoria, Etiquetas, Credenciales y Uso {/* #memory-tags-credentials-and-usage */}

Categoría/entrada de memoria Crear, Editar, Eliminar y Limpiar; Etiquetas crear/edit/delete, asignación, Favoritos, filtros, y reorden; Credenciales crean/recuperan/remove, salud, uso y unión Connector; Periodo de uso, métrica, mapa de calor, gráfico diario, Turns/Calls y controles de agrupación.

### Conectores {/* #connectors */}

Filtro/búsqueda, Agregar/importar, Permitir, Detalle, Prueba/Reconectar, Editar, Exportar y Eliminar. El formulario Add contiene Tipo, Nombre de visualización, ID, Descripción, Comando, Argumentos, variables ambientales, URL, Transporte, Autenticación, OAuth scopes, URL del servidor de Autorización, URL del cliente de metadatos, Headers, Trust, Cancel y Add/Save.

### Especialistas {/* #specialists */}

Filtro de categoría, Buscar, Permitir, Detalle, Acciones, Crear e Importar. El Editor contiene Icon, Color, Nombre, Descripción, Instrucciones, Acceso completo, Tipo de Capacidad, Búsquedas Skill/Connector, capacidades seleccionadas, Cancelar y Guardar. Importación contiene Select ZIP, Vista previa, Diagnóstico, Cancelación e Importación.

### Cálculo {/* #compute */}

Añadir host, tarjeta host/enable, Probe/Retry, Detalle/Edit/Remove, Recursos, modo de ejecución Direct SSH/Slurm, Documento detallado, raíz Scratch Edit/Input/Save/Cancel, y límite de trabajo concurrente Editar/Input/Save/Cancel. Las aprobaciones de ejecución ofrecen Negación, una vez, sesión, proyecto y global.

### Red {/* #network */}

Revise de nuevo; Proxy System/Manual/Direct; Notebook dominio allowlist; Espejo del paquete Configurar/Editar; Canal de Conda, índice de pip, y paquete CA; Ver espejos, Cancelar y Guardar.

### Modelo {/* #model */}

Modelo activo, radios de resonancia y políticas modelo Subagent/Revisor/Vision/Session-details; Proveedor Test/Edit/Delete/Add. El formulario de Proveedor contiene todos los campos de la página de Modelo de A bordo más Cancelar y Guardar.

### Agente {/* #agent */}

OpenCode/Claude/Codex/CodeBuddy framework card, Switch, Install source, Install/Cancel/Retry, Install log, Repair, Sign in/auth, Import config/home, and Uninstall confirmation.

### Permisos {/* #permissions */}

Perfil predeterminado, filtro de alcance, enlace de alcance de subvención, insinuación de conectores, revocación y confirmación, y advertencia o refresco incompleto de tienda.

### Entornos de ejecución {/* #runtimes */}

Python/R; entorno Permitir, Agregar intérprete, Descargar/configurar, Reparar, Permitir la instalación de paquetes, Paquetes, Filtro, Añadir/Install/Remove paquete, Desactivar/Desinstalar y confirmación.

### Almacenamiento {/* #storage */}

Almacenamiento de aplicaciones Reveal/Repair; Localización de datos Cambiar, Sendero, Explorar, comprobar, Migrar/Adopt/Cancel; de migración Cancelar/Retry/Restart/Discard; categorías de uso de discos expandibles.

### General {/* #general */}

Notificaciones de tareas, radios de Theme, radios de icono de App, comportamiento cercano, GitHub token Open/Input/Save/Clear, y About/Check updates/install update.

### Control remoto {/* #remote-control */}

Inicio/Parar/Refresh, Copiar/Abrir URL, y QR; Remote.It setup/retry/disconnect; Revoque del navegador con confianza; solicitud de emparejamiento Rechazar / Aceptar una vez / Siempre confiar.

### Archivado {/* #archived */}

Proyecto de gestión, restauración, borrador del proyecto; Restore/Delete de sesión; Confirmación de eliminación Cancelar/Confirm.


## Examen de la literatura y acceso a los recursos {/* #screening-and-access */}

| Área | Controles | Guía |
| --- | --- | --- |
| Biblioteca | Colección inteligente, Alcance, Criterios de inclusión, Criterios de exclusión, Uso de texto completo disponible, Actualización automática | [Colecciones inteligentes](../guides/library.md#smart-collections) |
| Colección inteligente | Ejecución de juicios, opiniones de decisión, detalles de evaluación, Incluir, Excluir, Utilizar la decisión modelo, exportación incluye referencias | [Documentos de examen y examen](../workflows/screen-literature.md) |
| Modelos de clasificación | Colecciones inteligentes independientes y vinculantes de selección de capacidades automáticas; Probar modelo | [Modelo de fijación](../guides/models.md#smart-collection-model) |
| Skills / Connectors | Gestionar el acceso, agente Main, asociaciones Specialist, enlaces de papel sólo lectura | [Acceso a los recursos](../guides/connectors.md#resource-access) |
| Sesión | Diagnóstico de exportación, fuentes seleccionadas, Exportar, Mostrar en carpeta | [Exportación local de diagnóstico](../guides/troubleshooting.md#session-diagnostics) |
