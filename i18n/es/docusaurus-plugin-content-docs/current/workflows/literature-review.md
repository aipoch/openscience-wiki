---
title: "Extraer una tabla de evidencia de literatura"
last_update:
  date: '2026-09-17'
---

# Extraer una tabla de evidencia de literatura {/* #extract-a-literature-evidence-table */}

<p className="example-label"><strong>Ejemplo práctico</strong> Diez ensayos en máscaras e infecciones respiratorias</p>

Este flujo de trabajo comienza con un conjunto definido de diez documentos y termina con una tabla de evidencia conectada con fuente y una nota de incertidumbre. Muestra la extracción para una revisión de la literatura de salud pública. El conjunto suministrado es una selección de enseñanza, no una búsqueda completa o una revisión sistemática completa.

## Preparar un conjunto de fuentes encuadernadas {/* #prepare-a-bounded-source-set */}

Descargar el <a href="/docs/examples/research-workflows/mask-trials-sources.csv" download>lista de fuentes de diez documentos</a>. Incluye DOI, PMCID y enlaces originales de texto completo para ensayos comunitarios, domésticos y sanitarios. Obtenga y lea las fuentes bajo sus términos de acceso declarados.

Para la misma entrada de texto utilizada en este ejemplo, descargar el <a href="/docs/examples/research-workflows/prepare-mask-sources.py" download>script de preparación de la fuente</a> y ejecutarlo con Python 3 en una carpeta de trabajo local:

```bash
python3 prepare-mask-sources.py
```

El script descarga los diez registros XML de PMC de Europa, conserva la identidad fuente, los encabezados y tablas de sección, y crea **mask-trials-fulltext.md**. Reporta un fracaso en lugar de omitir silenciosamente un estudio. Los textos completos originales no se redistribuyen con el Wiki. Si una descarga falla, obtener ese papel a través de su enlace fuente antes de tratar el conjunto como completo.

En un proyecto Open-Science, seleccione un modelo de trabajo y adjunte el archivo Markdown resultante con **+ → Attach files**. Compruebe que la lista de fuentes contiene diez estudios distintos. La versión de texto ayuda a la extracción; volver al artículo original para el diseño, figuras o estructura de mesa ambigua.

Haga clic en el accesorio para abrir su vista previa. Cada estudio comienza con un título, DOI y un enlace original de origen, seguido de texto de sección y tablas. Coincide con esas diez identidades con la lista de fuentes; no cuentan los títulos repetidos de sección como estudios adicionales.

![El paquete de texto completo adjunto real conserva la identidad de origen y las secciones del artículo](/img/open-science/research-workflows/mask-trials-input.webp)

Antes de usar un documento como evidencia, compruebe las correcciones o retractaciones en su fuente. Desde v0.30.2, el `literature-review` Skill's `verify_dois` helper comprueba las relaciones de actualización Crossref en ambas direcciones. `retracted: true` puede identificar un papel retraído o un aviso de retracción; inspeccionar la relación vinculada. `false` significa que no se encontró ningún marcador comprobado, no prueba de que el papel nunca ha sido retractado.

## Solicitar una fila por juicio {/* #ask-for-one-row-per-trial */}

```text
Build an English evidence-extraction table for the ten randomized
trials on masks and respiratory infections in the attached source pack.
Read each study's methods, results and relevant tables.
Save mask-trials-evidence.csv with one row per trial: DOI, year,
setting, randomization unit, sample size, intervention, comparator,
primary outcome, reported main estimate with uncertainty, analysis
population, important limitation, and source section/table locator.
Preserve cluster design, adherence and intention-to-treat distinctions.
Do not substitute a subgroup or per-protocol result for the main result.
Save mask-trials-reading-notes.md explaining differences and missing evidence.
Do not pool these heterogeneous trials or give clinical recommendations.
Use only the supplied sources, write in English and do not delegate.
```

Permitir las solicitudes de lectura de fuentes previstas. Comprueba que el agente llega a las diez secciones de estudio, en lugar de utilizar sólo el primer resumen o asumiendo documentos similares título son duplicados.

## Revisar la evidencia extraída {/* #review-the-extracted-evidence */}

Abra el CSV después de que la respuesta termine. Compare sus diez valores de DOI con la lista de fuentes, y luego compruebe la población de estimación y análisis reportados en la sección de resultados de cada papel o tabla.

![La tabla de pruebas de diez juicios en Open-Science](/img/open-science/research-workflows/mask-trials-evidence.webp)

Preste especial atención a estas distinciones:

- **Unidad de aleatorización:** una aldea, hogar, tienda de campaña o sala hospitalaria no es un participante aleatorizado individualmente.
- La seroprevalencia sintomática **Resultado:**, infección confirmada por laboratorio y enfermedad similar a la gripe son puntos finales diferentes.
- **Análisis:** un resultado subgrupo de intervención temprana o basado en la adhesión debe permanecer separado de la comparación aleatorizada principal.
- **Incertidumbre:** conserve los intervalos de confianza y los resultados no concluyentes. Una estimación estadísticamente no significativa no demuestra la ausencia de efecto.

Utilice el <a href="/docs/examples/research-workflows/mask-trials-evidence.csv" download>ejemplo de la tabla de pruebas</a> y <a href="/docs/examples/research-workflows/mask-trials-reading-notes.md" download>Nota de síntesis</a> para inspeccionar el formato. Estos son materiales de inicio para su revisión; la interpretación científica todavía depende de las fuentes originales, la calidad del estudio y la pregunta que pretende responder.

Open **mask-trials-reading-notes.md**, así como el CSV. La mesa final de esta carrera tiene **filas 10 · columnas 12**. Ampliar una vista previa o descargar el archivo para leer células largas; Las células truncadas no faltan texto fuente. Las notas conservan las diez identidades de estudio y explican por qué sus resultados y poblaciones no deben ser agrupadas automáticamente.

![Las notas de lectura guardadas y la salida completa de diez puntos](/img/open-science/research-workflows/mask-trials-notes.webp)

Cuando una fila es incorrecta o incompleta, nombre el estudio y la sección/tabla exacta de la fuente, solicite una revisión a los archivos **ambos**, y luego vuelva a abrirlos. Por ejemplo, mantenga el flujo de hogar aleatorizado de Cowling 2008 separado de su subconjunto analizado. Actualizar una respuesta de prosa no actualiza por sí misma la tabla salvada.

## Continúe hacia una revisión {/* #continue-toward-a-review */}

Guardar el cuadro examinado con sus fuentes y decisiones de extracción. Un examen oficial también necesita una búsqueda documentada, criterios de elegibilidad, selección, extracción duplicada y una evaluación adecuada del sesgo. Véase [el flujo de trabajo de la lista de lectura](core-reading-list.md) para la verificación de fuentes y [comprobación de reclamaciones](pdf-evidence.md) cuando una conclusión necesita una inspección más cercana.
