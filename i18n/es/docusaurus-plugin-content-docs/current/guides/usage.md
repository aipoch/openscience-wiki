---
title: "Uso y actividad de fichas"
last_update:
  date: '2026-10-08'
---

# Uso y actividad de fichas {/* #token-usage-and-activity */}

Utilice **Settings → Usage** para inspeccionar el volumen de token notificado y la actividad local. Utilice el menú **Token usage** de respuesta o la sesión **Context window** para una vista más estrecha. Estas respuestas responden a diferentes preguntas: las llamadas totales pueden consumir muchas fichas mientras que el contexto actual ocupa una ventana mucho más pequeña.

Utilice el período mostrado y métrica para interpretar cada gráfico. Los números de fichas notificadas describen la actividad; Compruebe los límites de suscripción o facturación con el proveedor.

## Filtrar el resumen {/* #filter-the-summary */}

1. Abrir uso y elegir **Today**, **This week**, **Last 30 days** o **All time**.
2. Lea la etiqueta de frescura. Utilice **Refresh** después de una ejecución completa si la página está estancada.
3. Compare los cuatro campos de token y los contadores de actividad New/Total.
4. Verifique la etiqueta de su propio período antes de compararla con el sumario.

![Resumen de hoy con las cartas diarias separadas](/img/open-science/guides-walkthrough/13-usage-today.webp)

| Campo | Interpretación |
| --- | --- |
| Total de tokens | Agregado notificado para el período seleccionado. |
| Tokens de entrada | Componente de insumos notificados; no sustituya una estimación local de longitud de texto. |
| Tokens de caché | Usage attributed to cache by the reporting backend. |
| Proporción de caché | - Una proporción del volumen de insumos/caché pertinente; a dash significa indisponible, no una carrera de precio cero. |
| Tokens de salida | Componente de salida generado notificado. |
| Nuevos períodos de sesiones/proyectos/runs/artifacts | Artículos creados en el período seleccionado. |
| Total de períodos de sesiones/proyectos/runs/artifacts | Conteos generales; no necesitan igual los recuentos nuevos del período. |

En la vista operada de hoy, los totales de token eran cero antes de que la carrera actual hubiera registrado su uso, mientras que la gráfica fija 30-día todavía contenía la actividad de ayer. Eso es comportamiento de período esperado, no contando inconsistente. Las descargas y los artefactos generados son recursos diferentes; subir un archivo fuente no crea por sí mismo un artefacto generado.

## Leer actividad diaria y composición {/* #read-daily-activity-and-composition */}

**Daily activity metric** ofrece Tokens Totales, Tokens de Entrada, Tokens de Salida, Tokens de Cache, Nuevas sesiones, Nuevos proyectos, Nuevos artefactos y Corrientes. Seleccione una métrica, luego inspeccione una celda de citas. Las células más oscuras representan valores más grandes dentro de la escala mostrada.

**Daily token usage** muestra componentes de entrada apilada, caché y salida. Ambos gráficos se etiquetan **últimos días 30**; cambiar el período de resumen superior no cambia ese rango fijo. Compare como períodos antes de sacar conclusiones sobre los aumentos.

## Explicar valores perdidos o inesperados {/* #explain-missing-or-unexpected-values */}

| Síntoma | Check |
| --- | --- |
| Una conversación completa no tiene uso | Algunos proveedores y registros antiguos omiten la telemetría. Refresca una vez, luego inspecciona el propio uso de la respuesta. |
| Alto total pero pequeño porcentaje usado | El uso total acumula las llamadas; context measures occupancy at a point in time. |
| Nuevos contadores cambian sin uso de token | La creación de proyectos y la gestión de sesiones pueden ocurrir sin una solicitud modelo. |
| Los totales no se asemejan a una factura | Esta página no es el libro de facturación del proveedor o el panel de límites de suscripción. |
| Un componente de caché grande | Lea el desglose reportado; no infiere ahorros en efectivo sin las reglas de facturación reales del proveedor. |

La página incluye sólo el uso reportado. No reconstruye la historia perdida. Para la composición del contexto y la compactación, véase [Contexto de memoria y conversación](./memory.md).

Fuente: [Controles de panel de uso y gráficos](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/TokenUsagePanel.tsx).

## Inspección de días adyacentes {/* #inspect-daily-usage */}

Muévete a través de la gráfica **Daily token usage** para inspeccionar fechas sucesivas y su desglose de entrada, caché y salida. Para el acceso al teclado, utilice **Tab / Shift+Tab** para enfocar un día, y **Escape** para cerrar el detalle. Compare la fecha y los componentes mostrados; este gráfico todavía cubre los últimos días 30 y no reconstruye la telemetría del proveedor desaparecido.
