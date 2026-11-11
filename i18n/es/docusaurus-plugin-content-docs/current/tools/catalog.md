---
title: "Catálogo de herramientas científicas"
last_update:
  date: '2026-11-11'
---

# Catálogo de herramientas científicas {/* #scientific-tool-catalog */}

Utilice este catálogo para encontrar el punto de entrada Open-Science y requisitos de tiempo de ejecución para un método científico. Es un índice de documentación, no una página de aplicación que instala cada programa listado.

## Familias de software y dónde corren {/* #software-families-and-where-they-run */}

| Familia de software | Entrada Open-Science | Configuración para verificar | Comprobación inicial útil |
| --- | --- | --- | --- |
| Python biblioteca estándar y trama | Sesión Notebook | Interpretación Python seleccionada; conspiración de dependencias | Lea el QC real CSV y produzca una parcela pequeña |
| R / base R | Sesión Notebook; Ajustes → Tiempos de ejecución → R | Interpretado gestionado o detectado por aplicaciones | Imprimir versión R y reproducir resúmenes de muestra |
| Marcos de predicción estructural | Relevant packd Skill, usualmente Compute | Compatible GPU, paquetes, pesos, formato de entrada y acceso externo MSA si se utiliza | Una pequeña secuencia/complejo válida y su confianza de salida |
| Programas de diseño de secuencias MPNN | ProteinNNMP / LigandMPNN / SolubleMPNN Skills | Repository/checkpoints and Python dependentncies; pequeños trabajos de la CPU son apoyados por estas instrucciones | Una columna vertebral con posiciones explícitas fijas/diseñadas |
| Marcos de celdas únicas | scGPT / scvi-tools Skills | AnnData, etiquetas de celular/gene, paquetes y computación adecuada | Validar las dimensiones de entrada y las capas requeridas antes del entrenamiento |
| Diseño de estructura molecular | Molecule Connector / visor de moléculas | Ruta OpenChemLib sin conexión | Guardar y reabrir aspirin.mol |
| Reproductores de archivos | Vista previa del archivo | Límites de extensión y tamaño de vista previa | Abra el archivo descargado real |
| Software de lote remoto | Compute Host and remote-compute Skills | Acceso de host, agendador y ambiente nombrado | Sonda de acogida seguida de un trabajo atado |

Vea [directorio Skill](../skills/directory.md) para la tabla completa del método 24-Skill. Esta página explica la preparación del software; no duplica cada procedimiento de Skill.

## Inspeccione el entorno seleccionado {/* #inspect-the-selected-environment */}

Utilice **Settings → Runtimes** para inspeccionar los intérpretes Python/R disponibles. Seleccione el tiempo de ejecución realmente ligado a la sesión, y luego inspeccione paquetes allí. Un ejecutable instalado en otro lugar del ordenador no es automáticamente el intérprete activo de Notebook.

Utilice [Entornos de ejecución](../guides/runtimes.md) para preparar un intérprete y [Notebook](../guides/notebook.md) para verificar un cálculo. Si se necesitan paquetes adicionales, compruebe la instalación e importación en ese entorno. Para un fallo de descarga, siga [Red](../guides/network.md) utilizando el nombre de host afectado y el error.

## Antes de seguir el comando de instalación de un modelo {/* #before-following-a-models-install-command */}

Lea los requisitos exactos de Skill instalados y la ruta de configuración compatible con el entorno seleccionado. Verificar las colisiones del nombre del paquete: **Fair-esm** y la implementación de Biohub **esm** son distintos aunque comparten el espacio de nombres `esm`. El código y pesos de un modelo descargado también pueden tener diferentes versiones y condiciones de acceso.

Para un Notebook local utiliza el flujo de gestión de paquetes soportado en [Instrumentos científicos](./scientific.md). Para un host remoto use [Computación remota](../guides/remote-compute.md). Un renderizador que muestra un PDB prueba que puede ver una estructura; no prueba que AlphaFold u otro programa de predicción está instalado.

Referencia de implementación: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json), [SKILL.md](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md), [notebook-runtime.ts](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/notebook-runtime.ts).

Utilice [Tareas en segundo plano](../guides/notebook.md#background-tasks-and-result-delivery) para rastrear el trabajo de larga duración soportado e inspeccionar los resultados obtenidos. Los paquetes científicos todavía necesitan estar disponibles en el tiempo de ejecución seleccionado.
