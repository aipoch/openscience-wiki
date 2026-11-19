---
sidebar_position: 1
title: "Sinopsis de la configuración"
last_update:
  date: '2026-11-19'
---

# Sinopsis de la configuración {/* #settings-overview */}

Abierto **Settings** desde la esquina inferior izquierda del espacio de trabajo. Es... **16 paneles** se organizan **System**, **Intelligence**, **Connections** y **Workspace**. Habilidades, Conectores y Especialistas se gestionan en el separado [Centro de recursos](../guides/navigation.md#resource-center). Elija un panel de configuración por propósito o utilice la búsqueda del encabezado.

| Fiscalización mundial | Comportamiento |
| --- | --- |
| `Back` / `Forward` | Mover entre un panel de configuración principal y sus subviews de Detail, Add, o Importar |
| Breadcrumb botón trasero | Regreso de una subvisión a su panel principal |
| `Maximize` / `Restore` | Interruptor entre un diálogo grande y Ajustes de pantalla completa |
| `Close settings` | Volver al proyecto original y sesión sin perder los ajustes que se guardaron con éxito |
| `Dismiss settings error` | Cierre el banner de error; la operación fallida no se retrata automáticamente |
| Botón de navegación móvil | Abra o cierre el cajón de navegación Ajustes |

## Encontrar un ajuste {/* #find-a-setting */}

1. Abrir configuración y enfocar **Search settings** en el encabezado. **∙K** en macOS o **Ctrl+K** en Windows/Linux centra esta búsqueda mientras que Configuración está activa.
2. Ingrese un nombre o una tarea de panel, como `Package mirror`, `Main model` o `Diagnostics`.
3. Utilice **Up/Down** para elegir un resultado y **Entra** para abrir su panel, o haga clic en el resultado. El panel de destino se destaca brevemente; localiza el lugar que se llama allí.
4. Usa **Back** para regresar. Despejar la consulta para buscar otro escenario. La propia búsqueda de un panel filtra su lista en lugar de buscar todos los ajustes.

Esta búsqueda cubre los ajustes representativos en cada panel, no en cada campo o documento de investigación. Si un término no coincide, utilice el nombre del panel o los grupos de navegación a continuación. Para buscar conversaciones o archivos, cerrar Ajustes y utilizar [búsqueda mundial](../guides/navigation.md).

## Los paneles principales 16 {/* #the-17-main-panels */}

| Grupo | Panel | Lo que maneja |
| --- | --- | --- |
| Sistema | [General](../guides/appearance.md#help-center) | App versión, actualizaciones, diagnóstico, instalación CLI, comportamiento de ventana y ayuda |
|  | [Apariencia](../guides/appearance.md) | Tema, idioma, escala de interfaz de escritorio y opciones de uso compatible |
|  | [Notificaciones](../guides/appearance.md) | Alertas de tareas, contenido de notificación, estado del sistema y notificación de pruebas |
| Inteligencia | [Modelo](../guides/models.md) | Proveedor y modelos de escenario, incluyendo [servicios de imagen](../guides/image-generation.md) |
|  | [Agente](../guides/frameworks.md) | Instalación de marco de agente, conmutación y reparación |
|  | [Memoria](../guides/memory.md) | Notas globales y de proyectos |
| Conexiones | [Red](../guides/network.md) | Proxy, espejos de paquete y reglas de acceso Relajado/Stricto |
|  | [Remoto](../guides/remote-access.md) | Acceso del navegador, emparejamiento y dispositivos de confianza |
|  | [Credenciales](../tools/credentials.md) | Keys, tokens, OAuth y recuperación credencial |
|  | [Computación](../guides/remote-compute.md) | SSH · Slurm · Kubernetes · Hugging Face Jobs · Modal · Ray |
| Espacio de trabajo | [Etiquetas](../guides/tags.md) | Etiquetas y Favoritos Ordenación |
|  | [Permisos](../guides/approval-modes.md) | Modo predeterminado y subvenciones guardadas |
|  | [Horas de ejecución](../guides/runtimes.md) | Medio ambientes y paquetes Python/R |
|  | [Almacenamiento](../guides/storage.md) | Localización de datos, acceso de escritura y uso de disco |
|  | [Usage](../guides/usage.md) | Estadísticas de las actividades de investigación y seguimiento |
|  | [Archivado](../guides/storage.md) | Restaurar o eliminar permanentemente el trabajo archivado |

**Feedback** sigue siendo una entrada separada en la parte inferior de Ajustes.

:::info&#91;Cómo se guardan los ajustes&#93; Algunos interruptores se guardan inmediatamente. Las formas más largas usan `Save`, `Add`, o `Import`. No cierre la aplicación mientras se muestra `Saving…`, `Testing…`, o `Installing…`. Las medidas de migración, desinstalación, eliminación y de amplias misiones requieren confirmación. :::

## Fichas de configuración modelo {/* #model-tabs */}

Dentro **Model**, uso **Conversation models** para proveedores y modelos de tareas, **Classification models** para la selección de capacidades opcionales y colecciones inteligentes, y **Local capabilities** para extracción de PDF, OCR y narración de investigación. Estas son pestañas dentro de los paneles Modelo, no de Ajustes adicionales. Véase [recursos locales](../guides/models.md#local-capabilities).

La búsqueda del encabezado utiliza **XXXK / Ctrl+K**. Para enfocar el panel actual o la propia búsqueda del diálogo, utilice **XXXK / Ctrl+Alt+K** cuando ese campo esté disponible. Ver [búsqueda atajos](../guides/shortcuts.md#local-settings-search).
