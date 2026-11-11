---
title: "Especialistas y funciones disponibles"
last_update:
  date: '2026-11-11'
---

# Especialistas y funciones disponibles {/* #specialists-and-available-roles */}

Un Specialist es un papel de investigación guardado: identidad, instrucciones y Skills/Connectors permitidos. Use uno cuando una responsabilidad recurrente necesita un alcance consistente o un subtasco separado. El nombre de un rol por sí solo no establece experiencia ni verificación.

## Comprender los roles disponibles {/* #understand-the-available-roles */}

| Función o fuente | Cómo se usa | Lo que puede configurar |
| --- | --- | --- |
| Agente principal | Maneja la conversación y puede coordinar el trabajo delegado | Modelo de sesión, controles de agentes y capacidades disponibles |
| Custom Specialist | Creado localmente para una tarea de investigación definida | Identidad, instrucciones, Skills/Connectors explícitos o acceso completo |
| Importado / Mercado Specialist | Instalado desde un paquete, luego configurado en este dispositivo | Establecimiento local y capacidades permitidas; inspect editor y versión de paquete |
| Revisor incorporado | Realiza el flujo de trabajo de revisión de la aplicación | Repaso a través de la conversación; no es un Specialist editable/delegable normal |

Abrir **Marketplace** para encontrar roles publicados. El catálogo en línea puede cambiar independientemente de su aplicación instalada. Inspeccione el editor, instrucciones y dependencias de cada rol antes de importar.

## Encontrar un papel {/* #find-a-role */}

Abre **Resource center → Specialists**. **Installed** cuenta los roles registrados localmente, incluyendo el Revisor. Use **Search specialists** y **Filters → Filter specialists by category**, y luego abra una fila para inspeccionarlo. **Marketplace** abre un catálogo diferente; una entrada de mercado lista no se instala hasta que complete su flujo de paquete/ajuste.

![El revisor RNA-seq QC instalado localmente](/img/open-science/capabilities-walkthrough/06-specialist-list.webp)

## Funciones observadas en el mercado {/* #marketplace-roles-observed */}

| Función | Alcance de investigación previsto |
| --- | --- |
| Auto Research Specialist | Pruebas biomédicas, análisis, validación y escritura |
| Validación de la estructura Cryo-EM Specialist | Medio mapa, geometría y planificación de validación de mapas |
| Productos farmacéuticos PK/PD Design Specialist | Controles de diseño e incertidumbre de PK/PD |
| Multimodal Neuroimaging Connectomics Architect | MRI/fMRI/diffusion workflows and network-analysis controls |
| Optimización de la ruta y la reacción sintética Specialist | Reaction-planning and optimization evidence |
| Aerodinámica CFD Verificación y Validación Specialist | Convergencia numérica y planificación experimental-comparación |
| Modelo de transporte de química atmosférica Specialist | Emissions, transport and source-attribution studies |
| Pantalla DFT de alto rendimiento Specialist | Controles de convergencia y termodinámica-consistencia |
| Fotometría astronómica y análisis del tiempo-dominio Specialist | Análisis de calibración, fotometría y variabilidad |
| Precisión Agricultura Fenotipado y Diseño de Prescripción Specialist | Flujos de trabajo de fenotipado y validación espacial de la UAV |

Se observan descripciones de catálogos, no evidencia de diez flujos de trabajo científicos completados. El revisor del producto también es diferente del **RNA-seq QC Revisor** personalizado utilizado en estos capítulos.

## Elija una ruta {/* #choose-a-route */}

- [Crear e instruir](./identity.md): definir un papel de investigación local.
- [Capacidades de asignación](./capabilities.md): determinar qué puede usar.
- [Delegado y verificado](./delegate.md): inspeccionar una carrera real de niños y sus pruebas.
- [Revisor y revisión automática](./reviewer.md): utilice el proceso de revisión integrado de la aplicación.
- [Gestionar y compartir](./manage.md): paquete, importación, resolución de conflictos y finalización de la configuración local.

Referencia de implementación: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/specialists/manifest.json), [EspecialistasPanel.tsx](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/SpecialistsPanel.tsx).
