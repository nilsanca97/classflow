# Especificación – App para la gestión de una clase

Sep 26, 2026 · @Nil

## Resumen y alcance

Una aplicación web para que **una sola profesora** organice **su clase** durante el curso 2026–2027. No gestiona el colegio: solo su horario, sus materiales, sus listas y los datos de sus alumnos.

La app tiene tres apartados:

1. **Planning**: calendario con su horario, donde cada sesión tiene sus recursos (enlaces a Drive, YouTube, etc.) y notas.
2. **Listas**: listas de alumnos con estados personalizados (por ejemplo, autorizaciones o pagos).
3. **Alumnos**: ficha básica de cada alumno (unos 25).

| Aspecto | Decisión |
| --- | --- |
| Usuaria | Una sola profesora, sin inicio de sesión |
| Dispositivo | Ordenador (el móvil queda para una fase futura) |
| Curso | Del lunes 7 de septiembre de 2026 al viernes 25 de junio de 2027 |
| Duración | Solo este curso; no se gestionan varios años |
| Idioma de la interfaz | Inglés |

## Decisiones técnicas

La app será una **SPA instalable como PWA**, con todos los datos guardados **en el ordenador de la profesora**. No hay servidor ni nube, así que los datos de los alumnos nunca salen de su equipo.

| Aspecto | Decisión |
| --- | --- |
| Tipo de app | SPA (web de una sola página) con PWA: se instala con icono propio y funciona sin internet |
| Navegador | Chrome (Edge también serviría) |
| Almacenamiento | Local, dentro del navegador (IndexedDB), con almacenamiento persistente solicitado |
| Arquitectura | La capa de datos va separada, para poder pasar a la nube más adelante sin rehacer la app |

### Copias de seguridad

Como los datos solo están en el navegador, las copias son obligatorias:

- **Copia automática a un archivo** del ordenador elegido por la profesora. Puede estar en una carpeta sincronizada con Google Drive para tener también una copia en la nube.
- **Botones de exportar e importar** la copia manualmente.
- **Aviso** si hace tiempo que no se ha hecho copia.

### Uso correcto

Los datos pertenecen a un navegador y perfil concretos. La profesora debe instalar la app desde Chrome y abrirla siempre desde ese icono; en otro navegador o perfil la verá vacía. La copia a archivo permite trasladar los datos si hace falta.

## Planning

El planning parte de un **horario base semanal** fijo, del que se generan automáticamente las **sesiones** de cada día del curso. Los recursos y notas se añaden a cada sesión concreta.

### Conceptos

| Concepto | Qué es | Ejemplo |
| --- | --- | --- |
| Asignatura | Nombre, color elegido por la profesora y si admite recursos | English, azul, admite recursos |
| Bloque del horario base | Asignatura + día de la semana + hora de inicio y fin | Lunes 9:15–10:00, English |
| Sesión | Un bloque en una fecha concreta | English del lunes 28/09/2026 |
| Recurso fijo | Enlace de la asignatura que aparece en todas sus sesiones | Libro digital de Maths |
| Recurso del día | Enlace propio de una sola sesión | Ficha del lunes 28/09 |

### Horario base

- Cada día de lunes a viernes tiene sus propios bloques, con horas variables.
- Los bloques de recreo y comida (BREAK/LUNCH) **no admiten recursos**: se muestran en gris y compactos.
- El horario base **no se puede cambiar a mitad de curso** desde la app. Si hiciera falta, se haría como cambio de desarrollo.

### Contenido de cada sesión

- **Recursos fijos** de la asignatura, marcados con un icono de chincheta.
- **Recursos del día**: cada uno con URL y **título opcional** (si no hay título se muestra la URL).
- **Notas** de texto libre.
- Icono según el tipo de enlace: Google Drive, YouTube o enlace genérico.
- **Copiar recursos de otra sesión**, eligiendo con casillas cuáles se copian.

Los recursos fijos se gestionan desde la asignatura. Si se quita uno, desaparece de todas sus sesiones.

### Festivos y días sin clase

- Se pueden marcar **días sueltos o rangos** de fechas (por ejemplo, vacaciones de Navidad).
- Esos días no muestran clases.
- Si un día marcado tenía recursos o notas, **se ocultan, no se borran**, y reaparecen al desmarcarlo.

### Cambios puntuales

- **Anular una sesión** concreta con una nota (por ejemplo, "Excursión").
- **Añadir una sesión o evento puntual** en un día y hora concretos.
- Mover una sesión queda fuera; se resuelve anulando y añadiendo.

### Vistas

| Vista | Días | Qué muestra |
| --- | --- | --- |
| Semanal (por defecto) | Lunes a viernes | Tabla como el horario en papel, con color y nombre de cada asignatura y sus recursos dentro de cada celda |
| Diaria | Un día | Los bloques del día ordenados por hora |
| Mensual | Los 7 días | Puntos de colores por asignatura y festivos marcados; al pulsar un día se abre su vista diaria |

**Vista semanal en detalle:**

- Filas por franjas horarias comunes. Cuando la hora de un bloque no coincide con la fila (el viernes, Fine Motor Skills termina a las 15:00 en vez de a las 14:40), la celda muestra su hora exacta.
- La altura de cada fila se adapta a su contenido.
- Cada celda muestra hasta 3 recursos y un indicador "+N más" si hay más.
- **Pulsar un recurso** lo abre directamente en otra pestaña.
- **Pulsar la celda** (fuera de un recurso) abre el **detalle de la sesión**, con todos sus recursos y notas, en cualquier vista.

El formato del detalle (panel lateral o ventana) se decidirá en el boceto visual.

## Horario base de la clase

Este es el horario semanal que se cargará en la app, ya con la corrección del viernes por la tarde. Los nombres de asignatura van en inglés, como en la interfaz.

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

Cada lista tiene **sus propios estados**, copiados de una plantilla al crearla, e incluye por defecto a todos los alumnos activos. Sirven para autorizaciones, pagos, deberes entregados, etc.

### Estados y plantillas

- Plantillas incluidas: **Sí / No** y **Sí / No / Pendiente**.
- La profesora puede crear sus propios estados, cada uno con **nombre y color** (por ejemplo, Pagado en verde, Falta en rojo, Exento en gris), y guardarlos como plantilla.
- Al crear una lista, los estados de la plantilla se **copian** a la lista:
  - Editar un estado dentro de una lista solo cambia esa lista.
  - Editar una plantilla solo afecta a las listas que se creen después.
- **Borrar un estado en uso:** la app avisa de cuántos alumnos lo tienen y pregunta a qué estado pasarlos, o si dejarlos vacíos.

### Crear una lista

- Nombre de la lista y plantilla de estados.
- **Estado inicial**: la profesora elige uno; si no elige ninguno, los alumnos empiezan vacíos.
- Se cargan automáticamente **todos los alumnos activos**.

### Dentro de una lista

- Alumnos en **orden alfabético**.
- Cada alumno tiene su estado y una **nota opcional**.
- Botón para **quitar** un alumno de la lista y opción para **volver a añadirlo**.
- **Contador** por estado (por ejemplo, 18 Pagado, 3 Falta).
- Un alumno dado de alta después de crear la lista **no se añade** a ella automáticamente, solo a las listas nuevas.
- Un alumno dado de baja se queda en la lista marcado como **Baja**.

### Gestión de listas

- Las listas terminadas se **archivan** en vez de borrarse, y se pueden consultar después.

## Alumnos

Cada alumno (unos 25) tiene una ficha con sus datos básicos y un único contacto de emergencia.

### Campos de la ficha

| Campo | Tipo | Notas |
| --- | --- | --- |
| Nombre | Texto, obligatorio | Solo el nombre. Si hay dos iguales, nombre + inicial del apellido (por ejemplo, Marc R.) |
| Fecha de nacimiento | Fecha |  |
| Alergias | Texto libre |  |
| Bus | Sí / No |  |
| Contacto de emergencia: nombre | Texto |  |
| Contacto de emergencia: teléfono | Texto |  |
| Contacto de emergencia: relación | Texto | Por ejemplo, madre o abuelo |
| Observaciones | Texto libre | Recogida, medicación u otros datos |

### Funciones

- Listado de alumnos en **orden alfabético**.
- **Filtros**: "con alergias" (campo de alergias con texto) y "va en bus". El filtro de alergias se calcula a partir del texto, sin guardar un campo aparte.
- **Aviso de nombre duplicado** al guardar un nombre que ya existe, para que la profesora añada la inicial del apellido.
- **Dar de baja**: el alumno deja de aparecer en el listado activo y en las listas nuevas, pero se queda en las listas antiguas marcado como Baja.
- **Eliminar**: borra al alumno de todo, incluidas las listas. Pensado para alumnos creados por error; pide confirmación.

## Fuera de alcance y mejoras futuras

Estas funciones quedan fuera de la primera versión. Algunas se pueden añadir más adelante.

| Función | Estado | Comentario |
| --- | --- | --- |
| Uso desde el móvil con datos sincronizados | Futuro | Requiere pasar los datos a la nube; la arquitectura lo permite |
| Sincronizar solo el planning (sin datos de alumnos) | Futuro | Variante más privada de lo anterior |
| Otros idiomas | Futuro | La interfaz se prepara para traducciones |
| Mover una sesión a otra hora o día | Descartado | Se resuelve anulando y añadiendo |
| Cambiar el horario base a mitad de curso | Descartado | Se haría como cambio de desarrollo |
| Varios cursos o archivar el curso | Descartado | Solo curso 2026–2027 |
| Varios usuarios o inicio de sesión | Descartado | Una sola profesora |
| Integración directa con Google Drive | Descartado | Los recursos se añaden pegando el enlace |
| Varios contactos de emergencia | Descartado | Uno por alumno |
| Enlazar listas con días del planning | Futuro | Idea opcional |

**Siguiente paso:** boceto visual de las tres secciones a partir de esta especificación.
