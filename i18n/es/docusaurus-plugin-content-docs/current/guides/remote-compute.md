---
title: "SSH hosts y Slurm setup"
last_update:
  date: '2026-09-10'
---

import ToolOperationGroup from '@site/src/components/ToolOperationGroup';

# SSH hosts y Slurm setup {/* #ssh-hosts-and-slurm-setup */}

:::info&#91;Antes de presentar un trabajo&#93; Configurar un host SSH y elegir Direct SSH o Slurm antes de enviar un trabajo remoto. Un perfil de host guardado no establece la autenticación o ejecución exitosa. :::

Utilice **Settings → Compute** para registrar un servidor o un clúster. Registrar el host, ponerlo a disposición de una conversación y completar un trabajo son hitos separados. Mantenga las reglas de inicio de sesión y los requisitos de agenda del sitio con las notas de host.

## Elija dónde se ejecutan los trabajos {/* #choose-where-jobs-execute */}

| Modo de ejecución | Ejecución de empleo | El comando llama | Medio ambiente apropiado |
| --- | --- | --- | --- |
| **Direct SSH** | Directamente en el host SSH login | En el host SSH login | Una máquina donde se permite la carga de trabajo directa |
| **Slurm** | Presentado y gestionado a través de Slurm | Aún en el host SSH login | Un grupo que requiere asignaciones programadas |

Seleccionar Slurm no mueve cada comando en un nodo de computación. No interprete la información CPU, RAM o GPU como los recursos asignados a un futuro trabajo Slurm. Inspeccione la asignación real del trabajo antes de interpretar sus resultados.

## Añada la conexión {/* #add-the-connection */}

Seleccione **Add SSH host**. Escoja un alias existente o escriba el identificador de host. El formulario predetermina la autenticación de configuración SSH y la ejecución Direct SSH.

| Campo o control | Entrada y efecto |
| --- | --- |
| **From ~/.ssh/config** | Seleccione un alias descubierto; discapacitados cuando no hay alias disponibles |
| **Or type a host alias** | host/alias requeridas, caracteres 1-255 después de recortar; no NUL o rupturas de la línea |
| Notas de acogida opcionales | Reglas del programador, partición/cuenta, módulos, emplazamientos de políticas y entornos de instalación de paquetes; máximo caracteres 32,768 |
| **Execution mode** | Direct SSH o Slurm; salvado por huésped |
| **SSH configuration** | Ajustes de conexión de resolver con `ssh -G`; utilizar la configuración SSH existente, las teclas o Ssh-agent |
| **Advanced settings → User** | Anulación opcional; en blanco SSH resolución |
| **Port** | Opcional para la configuración SSH; si se suministra, entero 1-65535 |
| **Identity file** | Anulación del archivo clave opcional; en blanco utiliza configuración/comportamiento urgente |
| **Username and password** | Requiere Usuario, Puerto y Contraseña; no utiliza llaves o ssh-agent |
| **Cancel** | Dejar sin registrar el formulario |
| **Add** | Presentar una conexión válida; la autenticación de contraseña debe pasar su prueba de conexión antes de que se agregue el host |

![Configuración SSH en inglés anula](/img/open-science/walkthrough-2026-09-08/53-ssh-advanced.webp)

![autenticación de contraseñas y Slurm seleccionados en forma real](/img/open-science/walkthrough-2026-09-08/52-ssh-password-slurm.webp)

El modo Contraseña depende de la capacidad de almacenamiento de contraseñas y almacenamiento seguro de la aplicación. Si no está disponible, inspeccione la razón mostrada en el formulario. Introduzca las credenciales en ese campo, no en notas de host o una solicitud de agente.

Para un host SSH-configuration, la aplicación crea el registro, abre la vista detallada y comienza una sonda de fondo. Por lo tanto, una fila agregada no prueba autenticación ni preparación de cálculo. Lea el resultado de la sonda antes de permitir que una tarea lo use.

### Conectar un servidor de investigación protegido por contraseña {/* #connect-a-password-protected-research-server */}

1. Abre **Settings → Compute → Add SSH host**. Introduzca su dirección de servidor o alias.
2. Seleccione **Username and password**, introduzca **User**, **Port** y **Password**, luego seleccione **Add**. Utilice el puerto suministrado por su administrador; el servidor de ejemplo utiliza el puerto 22.
3. Si la aplicación reporta **The SSH host key is unknown. Verify it in a terminal before connecting.**, establezca la confianza del anfitrión primero. Conéctese con el mismo host y puerto con su cliente SSH del sistema, compare la huella mostrada con la huella del administrador, y acéptala sólo cuando coincidan. Volver a la aplicación y reingresar **Add**. No deshabilitar la comprobación de host-key para desestimar el mensaje.
4. Espera a **Last probe succeeded**. En **Configuration**, compruebe **Credential configured**, el método de autenticación y la última vez de verificación. La contraseña guardada está marcada **Configured · cannot be viewed**.
5. Para comprobar o cambiar una conexión existente, abra **Configuration → Edit** y utilice **Test and save**. Lea el aviso antes de cambiar la autenticación: las becas de habilitación y permiso de sesión se limpian cuando se comete la nueva configuración. Re-enable the host for the intended session afterward.

El ejemplo en inglés muestra una sonda con contraseña de éxito: 256 CPUs, 504 GB RAM, un PCIe NVIDIA A100 80GB y un programador Slurm detectado. El modo configurado sigue siendo **Direct SSH** hasta que lo cambie explícitamente. Estos son los recursos de inicio de sesión de este servidor, no los requisitos mínimos o una asignación programada. Los identificadores de host y cuenta están oscurecidos en la captura de pantalla.

![autenticación de contraseñas exitosas y sonda de recursos anfitrionas](/img/open-science/remote-compute/03-host-probe.webp)

## Inspeccione y mantenga los detalles del host {/* #inspect-and-maintain-host-details */}

| Sección o botón | Qué hacer para comprobar |
| --- | --- |
| **Probe** / **Retry probe** | Reducir la detección de la conexión/recursos; No distinguir Probe, Probing, Última sonda sucedió y Probe falló |
| **Resources** / **Login host resources** | CPU detectada, memoria, GPU e información de agenda; las asignaciones de los cronogramas tienen capacidad separada |
| **Configuration → Edit** | Ajustes de autenticación de inspeccionar y estado credencial actual |
| **Test and save** | Pruebe la configuración de autenticación candidata antes de guardar; a una configuración modificada aclara la sesión de habilitación y las subvenciones de permisos. Una configuración sin cambios informa que los ajustes ya están actualizados |
| **Execution mode → Edit → Save** | Cambiar el modo configurado; compararlo con el programador Detectado |
| **Details → Edit** | Actualizar las instrucciones específicas del host; Guardar los commits, Cancelar los descartes |
| **Mostrar más / Mostrar menos** | Ampliar o colapsar notas largas |
| **Scratch root → Edit** | Guardar el camino de trabajo temporal remoto como un valor enganchado |
| **Restore auto-detection** | Retire la anulación de los arañazos pintados para que el futuro probing pueda suministrarlo |
| **Concurrent job limit → Edit** | Establecer un entero de 1 a 500; el default mostrado es 10 |
| Remoción de rehenes | Revisar el diálogo de eliminación de la aplicación y las restricciones de trabajo activo antes de confirmar |

La raíz del rasguño es un camino en el host remoto. No es el directorio de artefactos de tu portátil. Confirme que la cuenta puede escribir allí y que la política de limpieza del sitio le da tiempo suficiente para recoger los resultados. Un límite de trabajo concurrente no sustituye las propias cuotas o límites de recursos del programador.

<span id="give-verification-jobs-their-own-scratch-directory" />

### Elija un directorio de rascacielos de trabajo {/* #choose-a-job-scratch-directory */}

Abra **Scratch root → Edit**, introduzca una ruta absoluta de escritura aprobada para su servidor, luego **Save**. **PINNED** significa que un **Probe** posterior preservará su elección. Confirme el acceso a la escritura inspeccionando el directorio de trabajo y la salida del primer trabajo.

Para una primera ejecución, abra **Concurrent job limit → Edit**, introduzca **1**, y seleccione **Save**. Esto limita los trabajos gestionados por la aplicación en este host a uno a la vez. No se reserva una CPU, impone un límite de memoria, o impide que otros usuarios ejecuten el trabajo. Bajar el límite no detiene un trabajo existente. Utilice **Restore auto-detection** sólo cuando desea sondas posteriores para proporcionar el camino de rasguño de nuevo.

### Mantenga las instrucciones de host separadas de los recursos detectados {/* #keep-host-instructions-separate-from-detected-resources */}

Las instrucciones de host guardado son independientes de **Resources**. Una sonda exitosa no crea instrucciones de configuración, y las instrucciones vacías no significa que la probing falló. Mantener la política de programación, activación del medio ambiente y pasos de configuración reproducibles en **Details**; read CPU/RAM/GPU detection in Resources.

Cuando un agente actualiza las instrucciones, debe leer primero el documento guardado y sustituir ese contenido actual exacto. Si otra edición la ha cambiado, releer y comparar antes de volver a intentarlo. No utilice un resumen de sonda como el documento que se reemplaza. [Contrato de instrucción de acogida](https://github.com/aipoch/open-science/commit/04adfd61).

## Hacer un anfitrión disponible para una tarea {/* #make-a-host-available-to-a-task */}

En el **Agent controls** de la conversación, inspeccione la disponibilidad y selección de Compute Host. También se debe habilitar un host seleccionado. Nombrar el modo de host y ejecución previsto en una tarea que podría funcionar localmente de otro modo. Mantenga la primera solicitud remota lo suficientemente pequeña como para inspeccionar su recepción, registros y salida antes de presentar una carga de trabajo científica.

Para Slurm, obtener la cuenta/partición correcta, solicitud de recursos, tiempo de pared, configuración de módulo/ambiente y política de rasguños del propietario del grupo. La disponibilidad de `sbatch`, `squeue`, `sacct` y `scancel` admite operaciones programadoras; su presencia por sí sola no establece el permiso de presentación.

## Revise un host antes de una carga de trabajo de investigación {/* #check-a-host-before-a-research-workload */}

| Etapa | Check before moving on |
| --- | --- |
| Conexión | Una sonda exitosa y una conexión autenticada. |
| Trabajo directo | Un pequeño trabajo aprobado, su estado de salida, registro legible y salida recuperada. |
| Trabajo Slurm | Un cronograma de recepción / identificación de trabajo, la asignación real, estado final y salida recuperada. |
| Recuperación después de reconectarse | La aplicación concilia el mismo trabajo a distancia; no ha presentado un duplicado. |
| Cancelación | El programador/proceso confirma que ha detenido; inspeccionar las salidas retenidas antes de la limpieza. |
| Volumen de GPU | El entorno, pesos, memoria y salida científica necesarios, además de acceso SSH. |

**Revisión de la fuente:** [add-host form](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ComputeAddForm.tsx), [campos de autenticación](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ComputeAuthenticationSection.tsx), [detalles del anfitrión](https://github.com/aipoch/open-science/blob/v0.26.0/src/renderer/src/pages/settings/ComputeHostDetail.tsx), [validación de la conexión](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/compute-host-connection-profile.ts) y [Reunión de selección de los anfitriones](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/session-configuration.ts).

<ToolOperationGroup>
<summary>Ejecute un control remoto de calidad RNA-seq</summary>

## Ejecute un control remoto de calidad RNA-seq {/* #run-a-remote-rna-seq-quality-check */}

<p className="example-label"><strong>Ejemplo práctico</strong> Ejecute cheques de calidad RNA-seq a través de Direct SSH</p>

Utilice el mismo [Matriz de cuenta GSE60450](../workflows/data-quality.md#source-and-input-contract) público al mover un análisis desde su computadora portátil a un servidor. La comparación de un resultado conocido ayuda a distinguir un problema de configuración de computación de un cambio en el método científico.

1. Crear una conversación en el proyecto de investigación y adjuntar la matriz de cuenta original.
2. Abre **Agent controls → Compute**. Habilitar el anfitrión, luego añadirlo a **objetivos**. La disponibilidad y la selección son controles separados; simplemente registrar un host en Ajustes no lo selecciona para esta conversación.
3. Pida un trabajo **Direct SSH**, nombre la entrada y salidas requeridas, y especifique límites. Por este ejemplo, utilice un hilo CPU, un techo de memoria 1 GiB y un tiempo de ejecución 120. El Python predeterminado del servidor es suficiente; no se necesita instalación de paquetes.
4. Cuando aparezca **Allow remote job submission?**, inspeccione **Host**, **Intent**, **Inputs**, **Execution mode**, **Timeout** y **Remote workdir**. Ampliar **Show full command** para inspeccionar todo el script. **Once** aprueba esta comunicación; Los alcances más amplios se aplican a operaciones posteriores. Elige un alcance deliberadamente.
5. Mantenga el **Job ID** devuelto. Abra el chip de trabajo o **Background tasks** para inspeccionar ese trabajo. Puede dejar la conversación mientras se ejecuta; evite enviar otra copia sólo porque la respuesta ha terminado.
6. Después de terminar, abra **Remote job details**. Compruebe **Status**, **Runtime**, **Job ID** y **Remote workdir**. Utilice **Refresh** para la vista actual, y **stdout** o **stderr** para inspeccionar cada registro. El botón remoto-workdir abre el directorio remoto del trabajo.
7. Esperar la colección de resultados y la respuesta de seguimiento, luego abrir el CSV publicado e informar. Computación exitosa, colección de archivos y publicación Artifact son etapas separadas. Un trabajo completado no establece por sí mismo que ambos archivos esperados fueron publicados.

Solicitud de ejemplo:

> Ejecute QC descriptivo en la matriz de cuenta GSE60450 adjunta usando el host Direct SSH seleccionado. Preserve la entrada. Para cada muestra, calcula los recuentos totales, genes de cuenta cero, genes detectados y el recuento positivo mediana. Guardar un CSV y un informe de métodos cortos con dimensiones y antes/después de SHA-256. Utilice un hilo CPU, sin instalación de paquetes y un límite de tiempo de ejecución 120 segundos. Regresar el ID de trabajo después de la presentación; Recopilar y publicar las salidas cuando termine. No normalice los conteos o haga conclusiones biológicas.

Después de **éxito** y código de salida **0**, confirma que la aplicación recoge ambas salidas y que la tabla guardada y el informe reabrir. Compare los identificadores de muestras completas y las métricas con el [Base de referencia compartida](../reference/example-data.md), y compruebe el hash de entrada antes y después de la computación remota. Este ejemplo de Direct SSH pasó esos cheques.

![Trabajo Direct SSH completado con su directorio de ID y trabajo](/img/open-science/remote-compute/05-direct-job-completed.webp)

![Mesa RNA-seq remota reabierta con las doce muestras](/img/open-science/remote-compute/06-remote-qc-table.webp)

Descargar el ejemplo <a href="/docs/examples/gse60450/remote-rnaseq-qc.csv" download>Cuadro QC</a> y <a href="/docs/examples/gse60450/remote-rnaseq-qc-report.md" download>Informe sobre los métodos</a>. Estas comprobaciones de cuenta cruda no sustituyen la normalización, la revisión de diseño experimental o el análisis de la expresión diferencial. La mediana positiva excluye ceros.

### Volver a un trabajo después de reiniciar la aplicación {/* #return-to-a-job-after-restarting-the-app */}

Abra el mismo proyecto y conversación, luego utilice **Compute** o la entrada **Background tasks** del trabajo. Compare el **Job ID** con el recibo original antes de tomar acción. Un trabajo restaurado es la carga de trabajo remota existente; iniciar una nueva conversación o reenviar el impulso no es un paso de recuperación.

El puesto de control de preparación separado que se muestra a continuación se ejecutó cuando la aplicación local reanudó. La aplicación recuperó el mismo ID de trabajo y más tarde recogió su registro de terminación. La espera terminó normalmente; esta captura de pantalla muestra recuperación, no cancelación o una computación científica.

![El mismo trabajo de preparación se recuperó después de un reinicio de aplicación](/img/open-science/remote-compute/07-job-recovered-after-restart.webp)

### Cancelar un trabajo remoto {/* #cancel-one-remote-job */}

Abrir **Background tasks**, seleccione el trabajo deseado y compare su **Job ID** con el recibo. **Back** vuelve a la lista de trabajo de la sesión. Seleccione **Cancel** en la vista de detalles de ese trabajo, espere mientras que el botón muestra **Cancelling**, luego utilice **Refresh** para confirmar **Cancelled**. Cerrar el diálogo de detalle o terminar una respuesta de conversación no cancela la carga de trabajo remota.

El puesto de control de preparación de abajo fue cancelado a través de este control. El proceso remoto fue confirmado independientemente ausente después. Su tronco existente seguía siendo legible. Esto no implica que un análisis cancelado haya producido un resultado completo; inspeccionar los archivos retenidos antes de utilizarlos.

![Cancelación confirmada para el trabajo de preparación seleccionado](/img/open-science/remote-compute/09-job-cancelled.webp)


</ToolOperationGroup>

## Presentar a través de Slurm y comprobar la asignación {/* #submit-through-slurm-and-check-the-allocation */}

1. Abra el host en **Settings → Compute**, elija **Execution mode → Edit → Slurm → Save**, y vuelva a abrir el ajuste para confirmarlo. **Detected scheduler** solo no selecciona el modo.
2. Habilitar y seleccionar el host en la conversación prevista. Confirme la partición/cuenta del sitio y la contabilidad de cronogramas legibles antes de realizar un análisis largo.
3. Solicitar recursos utilizando una directiva `#SBATCH --option=value` por línea. Este ejemplo se utiliza:

```bash
#SBATCH --partition=local
#SBATCH --cpus-per-task=1
#SBATCH --mem=1G
#SBATCH --time=00:03:00
```

Utilice la partición de su sitio en lugar de copiar `local` incondicionalmente. El **Plazo de trabajo 120-segundo** del trabajo está separado del límite de asignación de tres minutos del programador; Tampoco determina lo pronto que comienza un trabajo frustrado. La aplicación gestiona el nombre de trabajo, el directorio de trabajo y las rutas stdout/stderr.

4. Preserve tanto la aplicación **Job ID** como **scheduler_job_id**. El ID del programador puede llegar después del recibo de la presentación inicial; pídele al agente que lea el estado del trabajo ahorrado. No vuelvas a enviar simplemente porque ese primer recibo carece de la identificación del programador.
5. Compare los recursos solicitados con la asignación real. El ejemplo solicitó una CPU por tarea y 1 GiB; Slurm grabó una tarea y dos CPU lógicas asignadas. Utilice el registro de asignación del programador al explicar el uso de recursos.
6. Espera un estado terminal confirmado y los archivos recogidos antes de publicar el resultado. Un archivo de salida lado del servidor no establece que la aplicación la ha cosechado.

![Slurm seleccionó explícitamente en el modo de ejecución del host](/img/open-science/remote-compute/10-slurm-execution-mode.webp)

### Cuando el servidor se completa, pero la aplicación sigue esperando {/* #when-the-server-completes-but-the-app-keeps-waiting */}

Si la aplicación instantánea informa `last_poll_error`, mantenga el ID de trabajo existente y pida el error exacto. El fracaso contable observado fue:

```text
slurm_poll_failed: Slurm accounting storage is disabled
```

Si el programador muestra **COMPLETED / ExitCode 0:0** pero la aplicación todavía muestra **presentado**, **result_final falso** o no archivos recopilados, mantenga ambos ID de trabajo e inspeccione el error de votación. Treat cronograma finalización y recogida de resultados de aplicación como etapas separadas.

![La solicitud aún pendiente de estado terminal para un volumen de trabajo Slurm completado](/img/open-science/remote-compute/11-slurm-accounting-unavailable.webp)

Pídale al administrador del grupo que proporcione la contabilidad `sacct` de trabajo para la cuenta y el trabajo. Un trabajo que desaparece de `squeue` no confirma el éxito. Mantenga el directorio de trabajo existente y ambos IDs de trabajo, luego refresque el mismo trabajo después de que se restablezca la contabilidad y compruebe su estado final y los archivos recogidos.

<ToolOperationGroup>
<summary>Ejecutar un pequeño diseño de secuencia de proteínas en GPU</summary>

## Ejecutar un pequeño diseño de secuencia de proteínas en GPU {/* #run-a-small-protein-sequence-design-on-gpu */}

<p className="example-label"><strong>Ejemplo práctico</strong> Diseño de una secuencia de ubiquitina con ProteinMPNN en GPU</p>

Utilice el [1UBQ ubiquitin structure](https://www.rcsb.org/structure/1UBQ) público para generar un candidato de cadena-A con ProteinMPNN. Esto comprueba la ejecución remota GPU e inspección de salida. No predice una nueva estructura ni establece la función de ubiquitina.

1. Seleccione el host conectado en **Compute**. Compruebe la memoria GPU libre y la carga actual, y confirme que la ejecución directa de una pequeña tarea está permitida. En un clúster gestionado por programador, utilice una partición y una cuenta autorizadas.
2. Pida al agente que prepare un ambiente aislado y retenga el Python, PyTorch/CUDA y el inventario de dependencia. El ejemplo utiliza Python 3.10, PyTorch 2.5.1+cu124 y NumPy 1.26.4. El Python original del anfitrión tenía sólo CPU PyTorch; Detectar un GPU solo era insuficiente.
3. Pin el [checkout oficial ProteinMPNN](https://github.com/dauparas/ProteinMPNN/tree/8907e6671bfbfc92303b5f79c4b5e6ce47cdef57) y sus pesos `v_48_020` incluidos. Grabar SHA-256 para la estructura y pesos 1UBQ descargados.
4. Especifique la cadena **A**, candidato **uno**, tamaño de lote **1**, temperatura **0.1**, semilla **42** y un límite de ejecución **180-second**. Inspeccione el mando a distancia mostrado por la aplicación antes de aprobar esa operación.
5. Requiere stdout/stderr, estado de salida y el parámetro del modelo. `CUDA available=True` solo no prueba la inferencia usada GPU. Esta carrera grabó `parameter_device=cuda:0` y `parameter_is_cuda=True`.
6. Inspeccione el FASTA generado. Verificación independiente de longitud, alfabeto aminoácidos, coincide con la cadena nativa y puntuaciones finitas, luego verificar el hash de entrada de nuevo.

| Check | Resultado en este ejemplo |
| --- | --- |
| Dispositivo | NVIDIA A100 80GB PCIe; parámetros de modelo en realidad en CUDA |
| Longitud de entrada/salida | Cadena nativa A y candidato ambos residuos 76 |
| Alfabeto y puntuaciones | Standard 20-amino-acid alphabet; puntuación finita / puntuación global de 0.8568 |
| Cerillas nativas | 42/76; recuperación recomputada independiente 0.5526316 |
| Ejecución | Modelo y validación independiente salió de 0; tiempo de generación reportada modelo 0.1949 segundos excluye la configuración y la tarea completa |
| Independencia | Estructura idéntica SHA-256 antes y después |

<a href="/docs/examples/ubiquitin/gpu-proteinmpnn-verification.json" download>Descargar el registro de verificación GPU</a>. La capacidad 80 GB del dispositivo no es un requisito mínimo para esta pequeña tarea; La memoria máxima no se midió. Los registros remotos y los archivos no proporcionan automáticamente la procedencia Notebook local completa.

Este ejemplo pasa por Direct SSH. Para un trabajo Slurm GPU, confirma primero los permisos de partición y cuenta. Si la presentación devuelve **InvalidAccount**, pídale al administrador del grupo que revise esas configuraciones; utilizar la cola necesaria para el trabajo gestionado por el programador.


</ToolOperationGroup>

## Resuelva SSH y errores de trabajo {/* #resolve-ssh-and-job-errors */}

Lea tanto el código como su mensaje. Un error de conexión, un rechazo de programador y un programa fallido necesitan diferentes correcciones. Los identificadores que aparecen a continuación describen los estados de conexión y de trabajo de cómputo; la interfaz puede mostrar un mensaje descriptivo en lugar del código bruto.

### Conexión y archivos remotos {/* #connection-and-remote-files */}

| Mensaje o identificador | Significado | Siguiente acción y verificación de éxito |
| --- | --- | --- |
| `The SSH host key is unknown. Verify it in a terminal before connecting.` | El cliente SSH del sistema no tiene clave de confianza para este host y puerto. | Verifique la huella con el administrador, establezca la confianza del anfitrión en el sistema cliente SSH, luego vuelva a entrar **Add** o **Test and save**. No deshabilitar la comprobación de host-key. |
| `Permission denied (publickey)` | La autenticación clave SSH falló; el clasificador de archivos remotos trata esto como `connection`. | Check User, Identidad archivo, host alias y ssh-agent. Confirme que el administrador autoriza esa llave. Uso **Test and save**Entonces... **Retry probe**. |
| `Connection refused` / `No route to host` / conexión `timeout` | El transporte SSH no puede llegar ni establecer la conexión. | Compruebe host, puerto, red/VPN y disponibilidad del servidor. Retira la conexión después de corregir la causa. |
| `ENOENT` / `not_found` | La ruta remota solicitada no existe. | Revise el camino en el host remoto, no su portátil; abrir el directorio o archivo correctos. |
| `EACCES` / `EPERM` / `permission` | La cuenta conectada no puede realizar esa operación del sistema de archivos. | Pídale al administrador del host que confirme el acceso o seleccione un directorio de rasguños autorizado. Retrocede la misma operación. |
| `outside_roots` | La validación de la ruta remota rechazó un camino no absoluto o caracteres de control. | Proveer un camino remoto absoluto sin romper líneas / caracteres de control. Revise el error completo si otra capa rechazó el camino. |

### Registros de empleo {/* #job-records */}

| Código de error | Significado | Siguiente acción |
| --- | --- | --- |
| `approval_denied` | La operación solicitada no recibió aprobación. | Revise el comando y alcance previstos. Presentar una nueva solicitud sólo si desea autorizar ese trabajo. |
| `host_unreachable` | La aplicación no pudo alcanzar ni confirmar la operación host. | Restaurar conectividad y sonda el anfitrión. Si la presentación puede haber ocurrido, compruebe un trabajo remoto existente antes de reintentar. |
| `invalid_resources` | Los argumentos de recursos o las directivas Slurm fallaron la validación. | Lea el nombre de campo/directivo. Siga el formato de recurso aceptado, los límites de los grupos y cualquier restricción de directiva administrada por las aplicaciones. Retroceder después de corregir ese campo. |
| `dispatch_failed` | Lanzamiento o la presentación del programador fracasaron. | Read stderr and any `sbatch` Mensaje. Compruebe la partición/cuenta, el medio ambiente y el comando. Comprueba un recibo del programador antes de enviar de nuevo. |
| `job_failed` | El trabajo terminó sin éxito. | Lea su código de salida y stdout/stderr, corrija el programa o el entorno, y luego haga una pequeña prueba. |
| `timeout` | Una conexión, comando o trabajo superó un límite; este código también puede acompañar inválido `timeout_seconds`. | Utilice el mensaje acompañante para distinguir la entrada inválida del tiempo transcurrido. Compruebe el estado de trabajo existente antes de cambiar el límite o repetir. |
| `process_vanished` | El seguimiento o la recuperación ya no podría encontrar el proceso esperado. | Inspeccione el directorio de trabajo remoto, registros e historial de agendas. Establezca si el trabajo se detuvo o terminó antes de crear un trabajo de reemplazo. |

**`last_poll_error` es un error de monitoreo**, no por sí mismo el estado final del trabajo. Asimismo, `harvest_error` significa que la colección de resultados necesita atención; La computación puede haber terminado. Preserve el ID de trabajo, restablezca la conectividad e inspeccione el trabajo existente antes de comenzar otra copia.

Una recuperación exitosa debe mostrar el estado final del trabajo previsto, un estado de salida interpretable y salida accesible. Para Slurm, compruebe el ID de trabajo de programador, así como el ID de empleo de la aplicación. Si el error persiste, siga [Informar un error o preguntar a la comunidad](troubleshooting.md#report-a-bug-or-ask-the-community); incluir el modo de ejecución, ambos IDs cuando esté disponible, el error completo y un extracto de registro sanitario.

Para la autenticación de teclas/config SSH, provea una clave usable o alias host y verifica la conexión antes de enviar. La colección de resultados Slurm requiere contabilidad de trabajo para la cuenta seleccionada; seguir los cheques arriba si la aplicación no puede resolver el trabajo.

Fuentes: [computar códigos de trabajo y campos de registro](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/compute.ts), [Clasificación de errores SSH/file](https://github.com/aipoch/open-science/blob/v0.26.0/src/shared/remote-fs.ts), [validación de la presentación de Slurm](https://github.com/aipoch/open-science/blob/v0.26.0/src/main/compute/slurm-driver.ts).
