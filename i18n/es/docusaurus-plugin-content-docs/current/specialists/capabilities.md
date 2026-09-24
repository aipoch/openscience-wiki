---
title: "Asignar Skills y conectores"
last_update:
  date: '2026-09-24'
---

# Asignar Skills y conectores {/* #assign-skills-and-connectors */}

La lista de capacidades de Specialist determina qué Skills y Connectors puede alcanzar. Un Connector globalmente habilitado no está automáticamente disponible para cada Specialist.

## Configurar el acceso explícito {/* #configure-explicit-access */}

<p className="example-label"><strong>Ejemplo</strong> Asignar capacidades a RNA-seq QC Reviewer</p>

1. Abrir **Settings → Specialists**, luego editar **RNA-seq QC Revisor**.
2. Apaga **Full access**.
3. En **Skills**, seleccione **Añadir una habilidad**, busque `rnaseq-count-qc`, y agregue el paquete personal guardado. Confirme **Skills 1**.
4. En **Connectors**, seleccione **Añadir un conector** y elija **Archivos de Omics**. Confirme **Conectores 1**.
5. Abra el detalle de la capacidad para verificar que haya seleccionado el recurso previsto. Guardar y reabrir el papel para confirmar la persistencia.

![El Specialist con una selección explícita de la capacidad](/img/open-science/capabilities-walkthrough/05-specialist-capabilities.webp)

| Control | Efecto |
| --- | --- |
| Acceso completo en | Utiliza el alcance de la capacidad heredada con cualquier exclusión explícita por fuente. Verifique la lista resuelta después de cambiar **Manage access**. |
| Acceso completo Off | Utiliza las listas explícitas; una unión faltante no se puede suministrar simplemente nombrando una herramienta en el impulso. |
| Añada una habilidad / Agregue un conector | Abre un selector para ese tipo de capacidad. |
| Detalle de responsabilidad | Inspecciona el recurso; no funciona su flujo de trabajo científico. |
| Eliminar | Elimina esta unión sin desinstalar el recurso. |
| Guardar cambios | Persiste el alcance seleccionado. |

Skills requerido por la aplicación se mantiene habilitado a nivel mundial. Esto no sustituye la lista de capacidades Specialist ni activa el acceso completo. Si Customize no está disponible para este papel, inspeccione su recurso vinculante y resuelto. Ver [Activación Skill](../skills/overview.md#why-some-switches-cannot-be-turned-off).

## Ajuste del acceso desde un recurso {/* #resource-access */}

Bajo **Settings → Skills** o **Connectors**, abrir un recurso **Manage access** emergente para inspeccionar las asociaciones Main Agent y Specialist juntos. Actualiza la unión del papel seleccionado, no el estado habilitado del papel. Las funciones de pleno acceso pueden tener exclusiones por fuente; Las funciones restringidas utilizan selecciones explícitas. Las uniones de mercado se pueden leer solo en este popup. Vea el [controles de acceso ilustrados](../guides/connectors.md#resource-access).

Después de cambiar un enlace, confirme el papel que está habilitado, sus credenciales de servicio están listas y su operación prevista está permitida. **Used by** muestra asignaciones en lugar de carreras completas.

## Cuatro comprobaciones de preparación separadas {/* #four-separate-readiness-checks */}

| Layer | Qué verificar | Error de ejemplo |
| --- | --- | --- |
| Función | Instalado, habilitado, configurado completo | Un papel importado sigue desactivado hasta que se salva la configuración. |
| Capacidad | El recurso previsto es asignado y resuelto por el tiempo de ejecución | Un nombre de pantalla/nombre de caballo no se resuelve al recurso de catálogo asignado. |
| Servicio/tiempo de funcionamiento | Servidor conectado, credenciales requeridas, kernel/dependencias disponibles | Desapareciendo el servicio requerido credencial o paquete. |
| Operación | Versión de entrada actual y una acción aprobada | Un desvío de archivos no disponible falla antes de la ejecución de los niños. |

El papel local retuvo sus vinculantes de archivos Skill y Omics después de la creación y la importación de paquetes. El primer niño delegado no resolvió el Skill por el nombre corto que intentó, pero completó los cheques de mesa explícitamente suministrados en Python. Esto verifica la delegación y la aritmética, no una carga Skill infantil exitosa. Cuando esto suceda, pida al agente que inspeccione su catálogo disponible y utilice el ID de recursos asignado exacto; no ampliar Acceso completo sólo para ocultar un problema de nombramiento.

## El acceso a la capacidad no es el modo de permiso {/* #capability-access-is-not-permission-mode */}

El acceso completo no significa “permitir cada acción sin preguntar”. [Modo de aprobación](../guides/approval-modes.md), límites de sistema de archivos/redes y reglas de tiempo de ejecución todavía se aplican. Un niño puede hacer surgir su propia solicitud de permiso en la conversación entre padres; inspeccionar el papel y la operación de solicitud antes de responder.

Al exportar un papel, los IDs Connector son referencias, no conexiones portátiles o secretos. Los archivos Skill seleccionados pueden ser incluidos explícitamente. En otro dispositivo, confirme cada unión, configure las credenciales y ejecute un pequeño cheque antes de confiar en el papel. Ver [Gestionar y compartir](./manage.md).

Referencia de implementación: [SpecialistEditor.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistEditor.tsx), [EspecialistasPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
