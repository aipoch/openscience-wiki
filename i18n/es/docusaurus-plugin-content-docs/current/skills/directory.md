---
title: "directorio Skill"
last_update:
  date: '2026-09-24'
---

# directorio Skill {/* #skill-directory */}

La aplicación proporciona **23 incluido Skills**. Este directorio los agrupa por el trabajo que apoyan. Las entradas describen el método enviado; no reclaman que se instale todo modelo externo, dependencia o servicio.

Para los métodos distribuidos a través de la aplicación, utilice el [guía de instalación de marketplace](marketplace.md). El directorio de abajo le ayuda a elegir un método de investigación; no es un inventario en vivo de versiones de mercado.

## Comprueba la preparación antes de seleccionar un método {/* #check-readiness-before-selecting-a-method */}

1. Abra el Skill en Ajustes y lea sus requisitos completos y avisos de terceros.
2. Compare el tipo de entrada con sus datos reales. Una tabla RNA-seq de granel no es un objeto AnnData de una sola célula; un dibujo molecular no es un resultado de atraque.
3. Inspeccione el tiempo de ejecución seleccionado y los paquetes. Para el trabajo a distancia, seleccione un anfitrión de computación utilizable e inspeccione su entorno antes de enviar.
4. Solicite una carrera atada, inspeccione la salida real, y retenga las referencias de entrada/versión antes de escalar.

Dos entradas de manifiesto adicionales, conciencia de sí mismo y creación de aptitudes, son recursos del marco interno. No son entradas de directorios de cara al usuario. Skills personal o importado, incluyendo rnaseq-count-qc, están separados del conteo de 23.

Las tres aplicaciones para el medio ambiente Skills y personaliza la estancia habilitada; ver [reglas de activación](overview.md#why-some-switches-cannot-be-turned-off). Utilice el [paquete de manifiesto](https://github.com/aipoch/open-science/blob/v0.27.0/resources/skills/manifest.json) para identificar los métodos enviados y [Computación remota](../guides/remote-compute.md) para la configuración de host y la entrega de resultados.

## Buscar por tarea de investigación {/* #browse-by-research-task */}

### Estructura de proteínas {/* #protein-structure */}

| Habilidad | Entrada | Dependencias y ejecución | Producto para inspeccionar |
| --- | --- | --- | --- |
| [AlphaFold2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/alphafold2/SKILL.md) · `alphafold2` | Protein FASTA; monómero o complejo | ColabFold, pesos modelo, GPU; servicio público opcional MSA | Estructuras predecidas y puntajes de confianza |
| [Boltz](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/boltz/SKILL.md) · `boltz` | Proteína/DNA/RNA/ligand complex specification | Boltz paquete, pesos, GPU; Acceso a los servicios de asistencia judicial recíproca cuando se solicite | Estructura compleja y confianza; salida opcional de afinidad |
| [Chai-1](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/chai1/SKILL.md) · `chai1` | FASTA multi-entidad | chai-lab, pesos, GPU | Complejo de todos los atomos y confianza |
| [ESMFold2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/esmfold2/SKILL.md) · `esmfold2` | Secuencias o insumos complejos | Paquete de biohub esm, pesos, CUDA; diferenciado de la feria | b) Predicciones de la estructura; Representaciones de la CESMC cuando se solicita |
| [OpenFold3](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/openfold3/SKILL.md) · `openfold3` | Proteína/ácido-ácido-ligand especificación | OpenFold3, pesos/access, CUDA y núcleos configurados | Estructuras y puntajes complejos |

### Diseño de proteínas {/* #protein-design */}

| Habilidad | Entrada | Dependencias y ejecución | Producto para inspeccionar |
| --- | --- | --- | --- |
| [DiffDock](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/diffdock/SKILL.md) · `diffdock` | Objetivo PDB más ligand SMILES/SDF | Repositorio DiffDock, pesos y GPU | Posiciones de ligando en posición; la confianza pose no es afinidad |
| [ProteinMP](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/proteinmpnn/SKILL.md) · `proteinmpnn` | PDB, cadenas y residuos diseñados/fijados | Repositorio, puestos de control, antorcha/numpy; pequeños trabajos de apoyo CPU | Secuencias y partituras diseñadas |
| [LigandMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/ligandmpnn/SKILL.md) · `ligandmpnn` | Espina dorsal más ligand/metal/nucleic-acid context | f) Las dependencias de repositorio y Python; pequeños trabajos de apoyo CPU | Secuencias y estructuras roscadas |
| [SolubleMPNN](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/solublempnn/SKILL.md) · `solublempnn` | Espina dorsal de proteínas | Repositorio ProteinMPNN y puestos de control solubles; CPU posible | Secuencias bajo el modelo soluble anterior |

### Secuencia y células {/* #sequence-and-cells */}

| Habilidad | Entrada | Dependencias y ejecución | Producto para inspeccionar |
| --- | --- | --- | --- |
| [ESM-2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/fair-esm2/SKILL.md) · `fair-esm2` | Secuencias de proteínas | de la equidad y de los pesos; procedimiento enganado utiliza GPU | Embeddings, logits o predicciones de contacto |
| [Borzoi](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/borzoi/SKILL.md) · `borzoi` | Ventanas de ADN con genoma declarado/coordinados | borzoi-pytorch, pesos y CUDA | Temas genómicos predecidos o referencia/alternate deltas |
| [Evo 2](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/evo2/SKILL.md) · `evo2` | secuencias de ADN o prefijos | Pesos Evo 2, CUDA compatible y suficiente memoria | Prefieres de secuencia, incrustaciones o ADN generado |
| [scGPT](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scgpt/SKILL.md) · `scgpt` | AnnData de una célula con mapeo de vocabulario gen | scGPT package, checkpoint and GPU | Incrustaciones de células o salidas de anotación |
| [Scvi-tools](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/scvi-tools/SKILL.md) · `scvi-tools` | Conteos de células individuales y metadatos de lotes y etiqueta | scvi-tools/scanpy/anndata; flujo de trabajo de entrenamiento combinado espera GPU | Representación latente, transferencia de etiquetas o comparaciones basadas en modelos |

### Evidencia y escritura {/* #evidence-and-writing */}

| Habilidad | Entrada | Dependencias y ejecución | Producto para inspeccionar |
| --- | --- | --- | --- |
| [Revisión de la literatura](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/literature-review/SKILL.md) · `literature-review` | Pregunta de investigación, identificadores o papeles | Retrieval de la fuente; llave OpenAlex para operaciones OpenAlex | Síntesis y citas de pruebas verificadas |
| [Indicación Dossier](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/indication-dossier/SKILL.md) · `indication-dossier` | Una indicación enmarcada como una población paciente | Herramientas de investigación y acceso a fuentes | Puntos de investigación resumibles y un dossier |

### Entorno {/* #environment */}

| Habilidad | Entrada | Dependencias y ejecución | Producto para inspeccionar |
| --- | --- | --- | --- |
| [Medio ambiente & Paquetes](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/env-management/SKILL.md) · `env-management` | Falta de paquete o pregunta de versión | Tiempo de ejecución seleccionado Python/R y fuente de paquete permitido | Inspección de paquetes, instalación gestionada y control de importación |
| [Compute Environment Setup](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/compute-env-setup/SKILL.md) · `compute-env-setup` | Ambiente en un host SSH/Slurm | Activación configurada del host y gestionado por el usuario/admin | Instrucciones de configuración y registro de validación |
| [Computación remota (SSH)](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/remote-compute-ssh/SKILL.md) · `remote-compute-ssh` | Un volumen de trabajo y un anfitrión de comisión elegible | SSH credenciales, host, agendador cuando sea aplicable | Trabajo presentado, resultados cosechados y artefactos publicados |

### Autorización {/* #authoring */}

| Habilidad | Entrada | Dependencias y ejecución | Producto para inspeccionar |
| --- | --- | --- | --- |
| [Personalizar](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/customize/SKILL.md) · `customize` | Un cambio solicitado Skill o Specialist | Funcionario de trabajo; operaciones de personalización nativa | Paquete o papel guardados con verificación de retorno |
| [Estilo de la figura](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-style/SKILL.md) · `figure-style` | Datos reales y una cifra final | Función Notebook y dependencias de trama | Parcela inspeccionada con etiquetas legibles y datos fieles |
| [Gráfico Compositor](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/figure-composer/SKILL.md) · `figure-composer` | Una reclamación y referencias de la conversión de datos inmutables | Main Agente, delegación, trama y revisión | Figura multipanel y iteraciones de revisión |
| [Paper Narrative](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/paper-narrative/SKILL.md) · `paper-narrative` | Manuscrito/abstract, capciones y cubierta de figuras ordenadas | Versiones de artefactos terrestres y herramientas de revisión | Paper brief and an ordered figure argument |



Referencia de implementación: [manifest.json](https://github.com/aipoch/open-science/blob/v0.26.0/resources/skills/manifest.json).
