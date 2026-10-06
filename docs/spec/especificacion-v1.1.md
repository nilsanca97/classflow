# Especificación – ClassFlow (v1.1)

Oct 6, 2026 · @Nil

> Versión 1.1. Sustituye a la [v1.0](especificacion-v1.0.md) (26/09/2026), que se conserva sin cambios como registro. Incorpora las decisiones tomadas durante la definición del diseño; el resumen de cambios está en el [CHANGELOG](CHANGELOG.md). Los detalles visuales (colores, tipografía, composición de cada pantalla y textos de la interfaz) están en el [brief de diseño](../design/brief-v1.md).

## Resumen y alcance

**ClassFlow** es una aplicación web para que **una sola profesora** organice **su clase** durante el curso 2026–2027. No gestiona el colegio: solo su horario, sus materiales, sus listas y los datos básicos de sus alumnos.

La app tiene tres apartados y una ventana de ajustes:

1. **Planning**: calendario con su horario, donde cada sesión tiene sus recursos (enlaces a Drive, YouTube, etc.) y notas.
2. **Lists**: listas de alumnos con opciones personalizadas (por ejemplo, autorizaciones o pagos).
3. **Students**: ficha básica de cada alumno (unos 25).
4. **Settings**: asignaturas (color y recursos fijos) y copias de seguridad.

| Aspecto | Decisión |
| --- | --- |
| Usuaria | Una sola profesora, sin inicio de sesión |
| Dispositivo | Ordenador portátil (el móvil queda para una fase futura) |
| Curso | Del lunes 7 de septiembre de 2026 al viernes 25 de junio de 2027 |
| Duración | Solo este curso; no se gestionan varios años |
| Idioma de la interfaz | Inglés |
| Pantalla inicial | Planning, vista semanal, semana actual |

## Decisiones técnicas

La app será una **SPA instalable como PWA**, con todos los datos guardados **en el ordenador de la profesora**. No hay servidor ni nube, así que los datos de los alumnos nunca salen de su equipo.

| Aspecto | Decisión |
| --- | --- |
| Tipo de app | SPA (web de una sola página) con PWA: se instala con icono propio y funciona sin internet |
| Navegador | Chrome (Edge también serviría) |
| Almacenamiento | Local, dentro del navegador (IndexedDB), con almacenamiento persistente solicitado |
| Arquitectura | La capa de datos va separada, para poder pasar a la nube más adelante sin rehacer la app |
| Stack tecnológico | Por decidir |

### Copias de seguridad

Como los datos solo están en el navegador, las copias son obligatorias:

- **Copia automática a un archivo local**, en la carpeta del ordenador que elija la profesora. Se hace sola tras los cambios. No se usa Google Drive ni ninguna carpeta sincronizada.
- **Permiso de Chrome:** al elegir el archivo, la app indica a la profesora que escoja "Allow on every visit", para que la copia siga funcionando sola cada vez que abra la app. Si el permiso se pierde, la app lo vuelve a pedir con un clic ("Resume backups").
- **Indicador de copia** siempre visible en la barra superior, con tres estados: copia al día, permiso pendiente de reanudar y sin copia.
- **Aviso** si pasan **3 días sin copia**; se puede cerrar, pero vuelve al día siguiente mientras siga sin haber copia.
- **Botones de exportar e importar** una copia manualmente, en Settings → Backup. Importar sustituye todos los datos y pide confirmación.

### Primer arranque

La primera vez que se abre la app, una pantalla de bienvenida pide **elegir el archivo de copia** (o importar una copia existente) antes de entrar al Planning.

### Uso correcto

Los datos pertenecen a un navegador y perfil concretos. La profesora debe instalar la app desde Chrome y abrirla siempre desde ese icono; en otro navegador o perfil la verá vacía. La copia a archivo permite trasladar los datos si hace falta.

### Datos iniciales

El horario base, las asignaturas y sus colores se cargan con la app. Los **recursos fijos** de cada asignatura también se pueden precargar si la profesora los facilita antes de la entrega.

## Patrones generales de la interfaz

- Todo lo que se abre (sesión, evento, alumno, nueva lista, días sin clase, asignatura, Settings) lo hace en una **ventana centrada**.
- Las acciones secundarias van en un **menú "⋯"**.
- Lo que se edita **se guarda automáticamente**, sin botón de guardar. Solo crear algo nuevo lleva botón.
- Las acciones destructivas o de gran alcance **piden confirmación**, explicando qué va a pasar.
- Lo que se oculta (días sin clase, sesiones anuladas, alumnos quitados de una lista, alumnos dados de baja) **se puede recuperar**.

## Planning

El planning parte de un **horario base semanal** fijo, del que se generan automáticamente las **sesiones** de cada día del curso. Los recursos y notas se añaden a cada sesión concreta.

### Conceptos

| Concepto | Qué es | Ejemplo |
| --- | --- | --- |
| Asignatura | Nombre fijo, color (de una paleta cerrada) y si admite recursos | English, azul, admite recursos |
| Bloque del horario base | Asignatura + día de la semana + hora de inicio y fin | Lunes 9:15–10:00, English |
| Sesión | Un bloque en una fecha concreta | English del lunes 28/09/2026 |
| Recurso fijo | Enlace de la asignatura que aparece en todas sus sesiones | Libro digital de Maths |
| Recurso del día | Enlace propio de una sola sesión | Ficha del lunes 28/09 |
| Evento puntual | Actividad con nombre, fecha y hora propias, fuera del horario base | Dance workshop, martes 29/09, 9:15–11:00 |

### Horario base

- Cada día de lunes a viernes tiene sus propios bloques, con horas variables.
- Los bloques de recreo y comida (Break / Lunch) **no admiten recursos**: se muestran en gris y compactos, y no se pueden pulsar.
- En la v1, el horario base **no se puede cambiar desde la app**: ni las asignaturas, ni sus nombres, ni sus días y horas. Queda como mejora futura.

### Asignaturas

- Cada asignatura tiene un **color**, elegido entre una **paleta cerrada de 16 tonos pastel**. La app arranca con un color asignado a cada una (ver el brief) y la profesora puede cambiarlo.
- El color es de la asignatura: al cambiarlo, cambia en **todas sus sesiones** y en todas las vistas, al momento.
- Dos asignaturas **pueden compartir color**; la app solo lo indica ("Also used by English").
- El **nombre no se puede editar** en la v1.
- Las asignaturas se gestionan desde dos sitios, que abren la misma ventana:
  - **Settings → Subjects**, con la lista de las 16.
  - El menú "⋯" de una sesión → **"Edit [asignatura] subject"**, solo para esa asignatura.

### Contenido de cada sesión

- **Recursos fijos** de la asignatura, marcados con un icono de chincheta. En la sesión son de solo lectura.
- **Recursos del día**: cada uno con URL y **título opcional** (si no hay título se muestra la URL).
  - Se añaden pegando el enlace en un campo siempre visible; al pegarlo aparece el campo de título opcional.
  - Cada recurso se puede **editar** (enlace y título) y **quitar**.
- **Notas** de texto libre, con guardado automático.
- Icono según el tipo de enlace: Google Drive, YouTube o enlace genérico (se detecta solo).
- **Copiar recursos de otra sesión**: se ofrecen primero las sesiones anteriores de la misma asignatura (de la más reciente a la más antigua) y la opción de elegir otra fecha. Los recursos del día de la sesión elegida aparecen con casillas, todos marcados. Los fijos no se copian.

Los recursos fijos se gestionan desde la asignatura, con el mismo flujo de añadir, editar y quitar. Si se quita uno, desaparece de todas sus sesiones; por eso pide confirmación.

### Días sin clase

- Se pueden marcar **días sueltos o rangos** de fechas (por ejemplo, vacaciones de Navidad), con un **nombre opcional** ("Christmas holidays").
- Esos días no muestran clases: se ven como un bloque con el nombre o, si no lo tiene, "No school".
- Si un día marcado tenía recursos o notas, **se ocultan, no se borran**, y reaparecen al desmarcarlo.
- Quitar un día sin clase **pide confirmación**.

### Cambios puntuales

**Anular una sesión**

- Se anula una sesión concreta indicando un **motivo** (por ejemplo, "School trip"). Siempre pide confirmación.
- La sesión anulada se sigue viendo, apagada y tachada, con su motivo. Sus recursos y notas **se conservan**.
- Una sesión anulada se puede **restaurar**.

**Añadir una actividad en lugar de la sesión anulada**

- Al anular, opcionalmente se crea una **actividad** (un evento puntual) en su lugar, con nombre y horario. El horario viene relleno con el de la sesión y se puede cambiar.
- Si la actividad **pisa otras sesiones**, la app las lista y pide confirmación para anularlas también, con el mismo motivo. Reglas:
  - Una sesión pisada parcialmente se anula **entera**.
  - Break y Lunch cubiertos por la actividad simplemente quedan tapados.
  - Si la actividad termina antes que la sesión anulada, el hueco se muestra como tiempo libre ("Free time").

**Eventos puntuales**

- Se puede añadir un evento en cualquier día y hora, sin anular nada antes: nombre, fecha, hora de inicio y hora de fin, todos vacíos al empezar.
- Si el evento pisa sesiones, se aplica la misma confirmación y las mismas reglas.
- Un evento tiene **recursos y notas**, igual que una sesión, y un estilo propio que lo distingue de las asignaturas.
- Un evento se puede **renombrar y cambiar de hora**, y **borrar**. Al borrarlo, la app ofrece restaurar las sesiones que sustituía (opción marcada por defecto).

**Fuera de alcance en la v1**

- Mover una sesión; se resuelve anulando y añadiendo.
- Anular o sustituir varias sesiones a la vez; se hace sesión a sesión.

### Vistas

Las tres vistas comparten un encabezado con las acciones ("Add event", "Days off"), la navegación por fechas con vuelta rápida al periodo actual y el selector **Day · Week · Month**.

| Vista | Días | Qué muestra |
| --- | --- | --- |
| Semanal (por defecto) | Lunes a viernes | Tabla como el horario en papel, con color y nombre de cada asignatura y sus recursos dentro de cada celda |
| Diaria | Un día | Los bloques del día ordenados por hora, con todos sus recursos y el texto de las notas |
| Mensual | Los 7 días | El número de cada día, el día actual marcado, los días sin clase con su nombre y los eventos puntuales; al pulsar un día se abre su vista diaria |

**Vista semanal en detalle:**

- Filas por franjas horarias comunes. Cuando la hora de un bloque no coincide con la fila (el viernes, Fine Motor Skills termina a las 15:00 en vez de a las 14:40), la celda muestra su hora exacta.
- La altura de cada fila se adapta a su contenido.
- Cada celda muestra hasta 3 recursos y un indicador "+N more" si hay más. Un icono junto al nombre indica que la sesión tiene notas.
- El **día actual** se marca en la cabecera y con un contorno que agrupa todas sus celdas.
- **Pulsar un recurso** lo abre directamente en otra pestaña.
- **Pulsar la celda** (fuera de un recurso) abre el **detalle de la sesión**, con todos sus recursos y notas, en cualquier vista.

**Vista mensual en detalle:**

- No muestra puntos de colores por asignatura.
- Los eventos se muestran por su nombre (hasta 2 por día y "+N more").
- Sábados, domingos y días fuera del curso aparecen apagados.

El detalle de la sesión se abre en una **ventana centrada**.

## Horario base de la clase

Este es el horario semanal que se cargará en la app. Los nombres de asignatura van en inglés, como en la interfaz.

| Franja | Monday | Tuesday | Wednesday | Thursday | Friday |
| --- | --- | --- | --- | --- | --- |
| 9:00–9:15 | Registration | Registration | Registration | Registration | Registration |
| 9:15–10:00 | English | English | English | English | PE |
| 10:00–10:30 | Break | Break | Break | Break | Break |
| 10:30–11:25 | Maths | Maths | Maths | Maths | Maths |
| 11:25–12:20 | Computing | Music | Reading Groups | Swimming | Social Skills |
| 12:20–13:00 | Lunch | Lunch | Lunch | Lunch | Lunch |
| 13:00–14:00 | Break | Break | Break | Break | Break |
| 14:00–14:40 | Phonics | Phonics | Phonics | Oracy | Fine Motor Skills (14:00–15:00) |
| 14:40–15:40 | PSHE | Topic | Topic | Topic | Golden Time (15:00–15:40) |
| 15:40–16:00 | Break | Break | Break | Break | Break |
| 16:00–16:30 | Snack and Storytime | Snack and Storytime | Snack and Storytime | Snack and Storytime | Snack and Storytime |

- **Sin recursos:** Break y Lunch.
- **Con recursos (16 asignaturas):** Registration, English, PE, Maths, Computing, Music, Reading Groups, Swimming, Social Skills, Phonics, Oracy, Fine Motor Skills, PSHE, Topic, Golden Time y Snack and Storytime.

En el horario en papel, el hueco de 12:20 a 14:00 aparece partido en LUNCH (12:20–13:00) y BREAK (13:00–14:00); se mantienen como dos bloques.

## Listas

Cada lista tiene **sus propias opciones** (en la interfaz, "Options"), una **categoría**, e incluye por defecto a todos los alumnos activos. Sirven para autorizaciones, pagos, deberes entregados, etc.

### Categorías

- Al crear una lista, la profesora elige a qué **categoría** pertenece entre 16 opciones fijas. Si no elige ninguna, queda como "Others".
- Las 16 categorías: English, Maths, Computing, Phonics, PSHE, Music, Topic, Reading Groups, Swimming, Oracy, PE, Fine Motor Skills, Social Skills, Assembly, Golden Time y Others.
- Las que coinciden con una asignatura usan su color. Assembly y Others tienen color propio. Registration y Snack and Storytime no son categorías.
- La categoría de una lista se puede cambiar después. La lista de categorías no se puede editar en la v1.

### Opciones

- Cada opción tiene **nombre y color**. El color se elige de una **paleta cerrada de 8 colores**, distinta de la de las asignaturas.
- Toda lista nueva empieza con dos opciones, **"Yes" y "No"**, que se pueden renombrar, borrar o ampliar con más opciones al crearla.
- Una lista tiene siempre **al menos 2 opciones**.
- Las opciones se pueden **editar después**, dentro de la propia lista. Los cambios solo afectan a esa lista.
- **Borrar una opción en uso:** la app avisa de cuántos alumnos la tienen y pregunta a qué opción pasarlos, o si dejarlos vacíos.
- **No hay plantillas** ni combinaciones de opciones guardadas en la v1.

### Crear una lista

Todo en una sola ventana:

- **Nombre** de la lista (obligatorio).
- **Categoría** (por defecto, "Others").
- **Opciones** (por defecto, "Yes" y "No").
- **Opción inicial**: la profesora elige una; si no elige ninguna, los alumnos empiezan vacíos.
- Se cargan automáticamente **todos los alumnos activos**.

### Página de listas

- Las listas se muestran como **tarjetas**, de la más reciente a la más antigua, cada una con su categoría, nombre, fecha de creación y el **recuento por opción**.
- **Filtros:** por categoría, por mes de creación, y activas o archivadas.

### Dentro de una lista

- Alumnos en **orden alfabético**.
- Cada alumno muestra **todas las opciones como botones**; un clic elige una, y pulsar la ya elegida la desmarca (el alumno queda vacío).
- Cada alumno puede tener una **nota opcional**.
- **Contador** por opción (por ejemplo, 18 Yes, 3 No) y de alumnos sin opción. No cuenta a los alumnos quitados ni a los dados de baja.
- **Quitar** un alumno de la lista: pasa a una sección "Removed from this list", desde donde se puede **volver a añadir** recuperando la opción y la nota que tenía.
- Un alumno dado de alta después de crear la lista **no se añade** a ella automáticamente, solo a las listas nuevas.
- Un alumno dado de baja se queda en la lista, en su sitio, marcado como **"Left"** y sin poder editarse.
- La lista se puede **renombrar** y **cambiar de categoría**.

### Gestión de listas

- Las listas terminadas se **archivan** en vez de borrarse.
- Una lista archivada se consulta en **solo lectura** y se puede **desarchivar**.

## Alumnos

Cada alumno (unos 25) tiene una ficha con datos básicos. En la v1 **no se guardan datos sensibles**: ni alergias ni contacto de emergencia.

### Campos de la ficha

| Campo | Tipo | Notas |
| --- | --- | --- |
| Name | Texto, obligatorio | Solo el nombre. Si hay dos iguales, nombre + inicial del apellido (por ejemplo, Marc R.) |
| Date of birth | Fecha | En el listado se muestran la edad y el cumpleaños (día y mes) |
| Takes the bus | Sí / No | Por defecto, No |
| Observations | Texto libre | Datos prácticos (recogida, recordatorios). No deben incluirse datos sensibles |

### Funciones

- **Listado** en tabla, en orden alfabético, con las columnas Name, Age, Birthday, Bus y Observations (recortadas a dos líneas).
- **Buscador** por nombre.
- **Filtro** "Takes the bus".
- Selector **Current / Left** para consultar los alumnos dados de baja.
- **Ficha** en una ventana centrada, con los campos siempre editables y guardado automático.
- **Aviso de nombre duplicado** al escribir un nombre que ya existe (al crear o al renombrar), para que la profesora añada la inicial del apellido. No bloquea el guardado.
- **Dar de baja** ("Mark as left"): el alumno deja de aparecer en el listado activo y en las listas nuevas, pero se queda en las listas antiguas marcado como "Left". Pide confirmación.
- **Deshacer la baja** ("Mark as current again"): vuelve al listado y a las listas nuevas, y deja de estar marcado como "Left" en las antiguas.
- **Eliminar**: borra al alumno de todo, incluidas las listas. Pensado para alumnos creados por error; pide confirmación y sugiere la baja como alternativa.

## Settings

Ventana con dos secciones:

- **Subjects**: las 16 asignaturas, con su color y sus recursos fijos (ver "Asignaturas").
- **Backup**: fecha de la última copia, ubicación del archivo (con opción de cambiarla) y los botones de exportar e importar (ver "Copias de seguridad").

## Fuera de alcance y mejoras futuras

Estas funciones quedan fuera de la primera versión. Algunas se pueden añadir más adelante.

| Función | Estado | Comentario |
| --- | --- | --- |
| Personalizar el horario: crear, eliminar y modificar asignaturas (nombre, días y horas) | Futuro | En la v1 el horario base es fijo. Cuando llegue, Subjects podría pasar a ser un apartado propio |
| Copia en la nube con inicio de sesión (Supabase o Firebase) | Futuro | Copia automática asociada a una cuenta. Debatir entonces si cifrar la copia con una contraseña. Revisar la privacidad (RGPD, datos de menores) y usar una región europea |
| Sincronización completa en la nube y uso desde el móvil | Por evaluar | Datos principales en la nube; mucha más complejidad. Quizá en una tercera versión |
| Sincronizar solo el planning (sin datos de alumnos) | Futuro | Variante más privada de lo anterior |
| Alergias y contacto de emergencia en la ficha, y filtro "con alergias" | Futuro | Datos sensibles excluidos de la v1 |
| Guardar combinaciones de opciones para reutilizarlas en listas nuevas | Futuro | La profesora no lo ha pedido; la mayoría de sus listas son de sí o no |
| Anular o sustituir varias sesiones a la vez (por ejemplo, una semana cultural) | Posible | En la v1 se hace sesión a sesión |
| Editar la lista de categorías de las listas | Posible | A revisar cuando se puedan editar las asignaturas |
| Otros idiomas | Futuro | La interfaz se prepara para traducciones |
| Enlazar listas con días del planning | Futuro | Idea opcional |
| Mover una sesión a otra hora o día | Descartado | Se resuelve anulando y añadiendo |
| Varios cursos o archivar el curso | Descartado | Solo curso 2026–2027 |
| Varios usuarios | Descartado | Una sola profesora |
| Integración directa con Google Drive | Descartado | Los recursos se añaden pegando el enlace |

**Siguiente paso:** crear el sistema de diseño y las pantallas a partir de esta especificación y del brief de diseño, y decidir el stack tecnológico.
