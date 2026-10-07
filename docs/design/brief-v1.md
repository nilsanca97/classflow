# Brief de diseño – ClassFlow (v1)

Sep 30, 2026 · @Nil · actualizado el 7 de octubre de 2026 (datos en la nube, registro e inicio de sesión, según la especificación v1.2)

## Cómo usar este brief

Este brief define el diseño visual y de interacción de la v1 y se entrega junto a la **[Especificación v1.2](../spec/especificacion-v1.2.md)** (07/10/2026). Con los dos documentos se debe poder diseñar todas las pantallas sin más preguntas.

- **El brief y la especificación v1.2 deben coincidir.** Si aun así hubiera una discrepancia en algo visual o de interacción, prevalece el brief; en el comportamiento, la especificación.
- **La interfaz está en inglés.** Los textos entre comillas en inglés ("Add event", "Paste a link…") son textos literales de la interfaz.
- **Dispositivo:** portátil con Chrome. Diseñar para 1366 × 768 como mínimo y que escale bien hasta 1920 × 1080. El móvil queda fuera de la v1.
- **Fecha de ejemplo para los diseños:** martes 29 de septiembre de 2026 como "hoy", semana del 28 de septiembre al 2 de octubre.
- Los códigos de color de este documento son la referencia; se pueden ajustar ligeramente si mejora el contraste, manteniendo el carácter.

## Principios de diseño

La usuaria es una profesora de primaria poco hábil con la tecnología. Pidió algo **bonito pero sencillo**; por encima de todo, tiene que ser fácil de usar.

1. **Pocas opciones a la vista.** Solo se muestran las acciones del día a día. Las secundarias van en un menú "⋯" o en Settings.
2. **Acciones evidentes.** Botones con texto que dice exactamente lo que hacen ("Create list", "Yes, cancel 2 sessions"), no solo iconos.
3. **Un patrón para cada cosa.** Todo se abre en una ventana centrada, todo lo editable se guarda solo, y todo lo destructivo pide confirmación.
4. **Sin pasos innecesarios.** Formularios en una sola ventana, valores ya rellenados cuando se pueden deducir y sin botones de guardar para lo que se edita.
5. **Nada se pierde sin querer.** Lo que se oculta (festivos, sesiones anuladas, alumnos quitados de una lista) se puede recuperar.
6. **Textos claros y cortos**, en inglés sencillo, sin jerga técnica.

## Estilo visual

Sensación **cálida y amable**: fondo crema, tonos pastel suaves, esquinas redondeadas y tipografía redondeada. Acogedor para una maestra de primaria, sin parecer un juguete.

### Colores base

| Uso | Color | Notas |
| --- | --- | --- |
| Fondo de la app | #FBF8F2 (crema) | Detrás de todo |
| Superficies (barras, tarjetas, ventanas) | #FFFFFF |  |
| Texto principal | #2C2C2A |  |
| Texto secundario | #5F5E5A |  |
| Texto terciario, horas, ayudas | #888780 |  |
| Bordes de campos | #D3D1C7 | 0,5–1 px |
| Separadores | #E5E3DC / #F1EFE8 |  |
| Apagado (fines de semana, Break, Lunch) | #F1EFE8 / #F4F2EC | Texto #888780 |
| Coral: fondo | #F5C4B3 | Pestaña activa, botón principal, etiqueta "Today" |
| Coral: texto | #712B13 | Sobre coral y en enlaces de acción |
| Coral: borde | #F0997B | Caja del día actual, campo activo |
| Aviso (ámbar) | fondo #FAEEDA, texto #633806, icono #BA7517 |  |
| Correcto (verde) | fondo #EAF3DE, texto #27500A; texto suelto #3B6D11 | Confirmación de guardado ("✓ Saved") |
| Destructivo (rojo) | fondo #F7C1C1, texto #791F1F; enlaces #A32D2D | Botones y opciones de borrar o anular |

**El coral está reservado** para: "hoy", la pestaña activa, el botón principal de cada pantalla y los enlaces de acción. Ninguna asignatura usa coral ni naranja.

### Tipografía

- **Nunito** (Google Fonts) en toda la app, en pesos 400, 500 y 600.
- Tamaños orientativos en pantalla real: texto base 14 px; secundario 12–13 px (mínimo 12 px); títulos de ventana 16–18 px; título de página o fecha del encabezado 18–20 px.
- Las etiquetas de sección dentro de ventanas ("ALWAYS HERE", "NOTES") van en mayúsculas pequeñas, 11 px, peso 600, color #888780.

### Iconos y formas

- **Tabler Icons** (versión de contorno), a 16–18 px. Iconos clave: pin (recurso fijo), brand-google-drive, brand-youtube, link (enlace genérico), notes (tiene notas), star (evento), beach (día sin clase), dots (menú ⋯), pencil, trash, calendar-off (anular), settings, mail (enlace enviado), download (exportar), logout (cerrar sesión), wifi-off (sin conexión), alert-triangle (aviso).
- Radios: 8 px en celdas y campos, 10–12 px en tarjetas y ventanas, 999 px en botones de opción, etiquetas y selectores.
- Sombras muy suaves solo en ventanas y menús desplegables.
- Área mínima pulsable de 32 × 32 px. Estados de hover visibles en todo lo pulsable y foco visible con teclado.

## Paletas

### Asignaturas (16 pasteles, color inicial de cada una)

Cada asignatura usa tres tonos: **cabecera** (franja con el nombre), **cuerpo** (fondo de la celda) y **texto** (nombre sobre la cabecera). Estos 16 tríos forman también la paleta cerrada que la profesora puede elegir en la ventana de la asignatura; los colores se pueden repetir entre asignaturas.

| Asignatura | Cabecera | Cuerpo | Texto |
| --- | --- | --- | --- |
| Registration | #C9D3DE | #EFF3F7 | #2F3E4F |
| English | #B5D4F4 | #E6F1FB | #0C447C |
| PE | #F7C1C1 | #FCEBEB | #791F1F |
| Maths | #C0DD97 | #EAF3DE | #27500A |
| Computing | #CECBF6 | #EEEDFE | #3C3489 |
| Music | #F4C0D1 | #FBEAF0 | #72243E |
| Reading Groups | #9FE1CB | #E1F5EE | #085041 |
| Swimming | #A8DCEB | #E4F4F9 | #0B4A5C |
| Social Skills | #DCC6EE | #F5EEFB | #4E2A6B |
| Phonics | #EDE59A | #FAF7DC | #524506 |
| Oracy | #D4E89A | #F4F9E3 | #3F5210 |
| Fine Motor Skills | #E3D2B8 | #F6F0E6 | #5A4526 |
| PSHE | #E0C3D8 | #F7EEF4 | #5E2D50 |
| Topic | #BFD8C4 | #EEF5EF | #2E4F35 |
| Golden Time | #F0D58A | #FBF3DC | #5E4608 |
| Snack and Storytime | #BCC8F2 | #EDF0FC | #27336B |

Break y Lunch no son asignaturas: franja gris #F1EFE8 con texto #888780.

### Categorías de listas (16)

Las categorías que coinciden con una asignatura usan su color de cabecera (si la profesora cambia el color de la asignatura, cambia también la etiqueta). Las dos que no son asignaturas tienen color propio:

| Categoría | Fondo de la etiqueta | Texto |
| --- | --- | --- |
| Assembly | #E6C3CB | #5E2E3A |
| Others | #E3DED3 | #444441 |

Lista completa, en este orden: English, Maths, Computing, Phonics, PSHE, Music, Topic, Reading Groups, Swimming, Oracy, PE, Fine Motor Skills, Social Skills, Assembly, Golden Time, Others. Registration y Snack and Storytime **no** son categorías.

### Opciones de las listas (8 colores)

Paleta cerrada de colores más intensos, distinta de los pasteles, para que las opciones se lean al instante. Al añadir opciones se asignan en este orden; la profesora puede cambiarlos.

| # | Color | Punto / barra | Botón seleccionado (fondo · borde · texto) |
| --- | --- | --- | --- |
| 1 | Verde | #97C459 | #EAF3DE · #97C459 · #27500A |
| 2 | Rojo | #E24B4A | #FCEBEB · #E24B4A · #791F1F |
| 3 | Ámbar | #EF9F27 | #FAEEDA · #EF9F27 · #633806 |
| 4 | Azul | #378ADD | #E6F1FB · #378ADD · #0C447C |
| 5 | Violeta | #7F77DD | #EEEDFE · #7F77DD · #3C3489 |
| 6 | Rosa | #D4537E | #FBEAF0 · #D4537E · #72243E |
| 7 | Turquesa | #1D9E75 | #E1F5EE · #1D9E75 · #085041 |
| 8 | Gris | #B4B2A9 | #F1EFE8 · #B4B2A9 · #444441 |

## Estructura, navegación y patrones comunes

### Barra superior de la app (fija, en todas las pantallas)

- **Izquierda:** nombre de la app, "ClassFlow", en coral oscuro.
- **Centro-izquierda:** tres pestañas con icono y texto: **Planning**, **Lists** y **Students**. La activa, en coral (#F5C4B3, texto #712B13).
- **Derecha:** el enlace **"Settings"** con icono de engranaje y, a su lado, el **círculo de la cuenta** con la inicial de la profesora (fondo #F1EFE8, texto #444441). Pulsarlo abre Settings → Account.
- **Al abrir la app** con la sesión iniciada se muestra siempre **Planning, vista semanal, semana actual**. Sin sesión, se muestra la pantalla de acceso (ver "Acceso, Settings y estados del sistema").

### Patrones que se repiten en toda la app

- **Ventana centrada (modal)** para todo lo que se abre: sesión, evento, alumno, nueva lista, festivos, asignatura, Settings. Fondo atenuado detrás, X arriba a la derecha y tecla Esc para cerrar. Las ventanas de consulta con guardado automático (sesión, alumno) también se cierran pulsando fuera; los formularios de creación, no.
- **Menú "⋯"** en la cabecera de ventanas y páginas para las acciones secundarias. Las acciones destructivas del menú van en rojo (#A32D2D) y al final.
- **Guardado automático** en todo lo que se edita (notas, campos de la ficha, opciones, colores): sin botón de guardar. Bajo el campo se ve "Saving…" en gris mientras se guarda y "✓ Saved" en verde al terminar; si falla, "Couldn't save · Retry" en rojo (ver "Estados del sistema"). Solo crear algo nuevo lleva botón ("Add student", "Create list", "Add").
- **Confirmaciones:** ventana pequeña centrada con título en forma de pregunta ("Delete Biel permanently?"), una o dos frases que explican qué pasará, un enlace para volver ("Cancel" / "Go back") y un botón que dice exactamente la acción. En rojo suave si es destructiva, con icono de alerta.
- **Botones:** principal en coral relleno; secundario en blanco con borde #D3D1C7; enlaces de acción en coral oscuro. Un botón se muestra apagado (no oculto) mientras falte un dato obligatorio.
- **Selectores de dos o tres valores** (Day · Week · Month, Active / Archived, Current / Left, Yes / No): control segmentado en forma de píldora, con el valor activo en blanco sobre fondo #F1EFE8.
- **Enlaces a recursos:** icono según tipo + título (o la URL si no hay título). Al pasar el ratón se subraya y el cursor es una mano. Al pulsar, se abre en una pestaña nueva.
- **Estados vacíos:** cada página o lista vacía muestra un icono suave, una frase y el botón para crear el primer elemento (por ejemplo, "No lists yet" + "New list").

## Planning

### Encabezado del Planning (igual en las tres vistas)

Tres zonas en una fila, bajo la barra superior de la app:

- **Izquierda, acciones:** "+ Add event" (botón principal coral) y "Days off" (secundario, icono beach).
- **Centro, navegación:** flecha anterior, texto de la fecha y flecha siguiente, **alineadas solo con el texto de la fecha**. El texto tiene ancho fijo para que las flechas no se muevan. Textos: "Tuesday 29 September" (Day), "28 Sep – 2 Oct 2026" (Week), "September 2026" (Month).
- **Debajo de la fecha, centrado:** si se está viendo el periodo actual, una etiqueta coral: "Today", "This week" o "This month". Si no, en su lugar, un enlace coral subrayado: "Back to today", "Back to this week" o "Back to this month".
- **Derecha:** selector segmentado **Day · Week · Month**, en este orden, con la vista activa marcada.

No hay botón "Subjects" en el encabezado: las asignaturas se gestionan desde Settings y desde el menú "⋯" de cada sesión.

### Vista semanal (por defecto)

Tabla como el horario en papel: columna de horas a la izquierda y cinco columnas, de lunes a viernes.

- **Cabeceras de día:** "Mon 28", "Tue 29"… en texto secundario. La de hoy es una píldora coral (#F5C4B3, texto #712B13) con el texto "Tue 29 · Today".
- **Columna de hoy:** justo debajo de su cabecera, un **rectángulo contenedor que agrupa todas las celdas del día**, con **borde coral de 2 px (#F0997B), sin relleno**, radio 12 px y 6 px de margen interior. Las celdas de hoy no llevan borde propio. Las filas siguen alineadas con las demás columnas.
- **Filas:** una por franja horaria común, con la hora de inicio en la columna izquierda. La altura de cada fila se adapta a la celda con más contenido.
- **Celda de asignatura:** radio 8 px, sin borde.
  - **Cabecera:** franja con el nombre de la asignatura en su tono de cabecera, texto en su tono de texto, peso 500–600.
  - Junto al nombre, **icono de nota** si la sesión tiene notas.
  - Si la hora del bloque no coincide con la fila, la hora exacta va a la derecha de la cabecera en pequeño (viernes: Fine Motor Skills "14:00–15:00", Golden Time "15:00–15:40").
  - **Cuerpo:** fondo en el tono claro de la asignatura, con los recursos como **líneas de texto con icono** (pin para los fijos; Drive, YouTube o enlace para los del día), primero los fijos. Máximo 3 líneas y, si hay más, "+N more".
  - Sin recursos, la celda queda compacta: solo la cabecera.
- **Break y Lunch:** franjas grises compactas (#F1EFE8) con el texto centrado. No se pueden pulsar.
- **Interacción:** pulsar un recurso lo abre en una pestaña nueva. Pulsar la celda fuera de un recurso abre la ventana de la sesión.
- **Sesión anulada:** fondo rayado suave (diagonales #F1EFE8 / #FBF8F2), borde discontinuo gris, cabecera en tono muy apagado con el nombre tachado y la línea "Cancelled · \[motivo\]" con icono calendar-off. No muestra recursos. Pulsarla abre su ventana.
- **Evento puntual:** fondo blanco, **borde discontinuo de 1,5 px #888780**, icono de estrella antes del nombre, recursos como en cualquier celda. Ocupa todas las filas que abarca su horario y muestra su hora exacta. Si sustituye sesiones, debajo, en pequeño: "Replaces ~~English~~ · ~~Maths~~ — Cultural week".
- **Hueco libre** (cuando un evento termina antes que la sesión que anuló): franja con borde discontinuo muy suave y el texto "Free time" en gris claro.
- **Día sin clase:** toda la columna se convierte en un único bloque rayado con el icono beach, "No school" y, debajo, el nombre del festivo si lo tiene.

### Vista diaria

- Lista vertical centrada, con ancho máximo de unos 600 px, ordenada por hora. La hora ("9:15–10:00") va a la izquierda de cada bloque.
- Cada sesión es una **tarjeta ancha** con el mismo estilo de celda (cabecera de color + cuerpo claro), pero mostrando **todos los recursos** en dos columnas (sin "+N more") y el **texto completo de las notas** en un recuadro claro dentro de la tarjeta.
- Break y Lunch, sesiones anuladas, eventos, "Free time" y días sin clase se ven con el mismo estilo que en la semana.
- Pulsar un recurso lo abre; pulsar la tarjeta abre la ventana de la sesión.

### Vista mensual

- Cuadrícula de 7 columnas (Mon a Sun), una casilla por día, fondo blanco y radio 8 px.
- Cada casilla muestra **solo el número del día**, y debajo:
  - **Días sin clase:** casilla rayada con icono beach y el nombre ("Diada", "La Mercè").
  - **Eventos puntuales:** su nombre en una línea cada uno (admite emojis, por ejemplo "📸 School photos"), cortado con "…" si no cabe. Máximo 2 y, si hay más, "+N more".
- **Sin puntos de colores por asignatura.**
- **Hoy:** borde coral de 2 px (#F0997B) y número en coral oscuro.
- **Sábados, domingos y días fuera del curso** (antes del 7/9/2026 y después del 25/6/2027): fondo apagado #F4F2EC, sin contenido.
- Al pasar el ratón, la casilla se marca ligeramente. **Pulsar un día abre su vista diaria.** No hay otra acción dentro de la casilla.

### Ventana de la sesión

Ventana centrada, de unos 480–520 px de ancho.

- **Cabecera** en el tono de cabecera de la asignatura: nombre (16–18 px) y, debajo, "Tue 29 Sep · 9:15–10:00". A la derecha, el menú "⋯" y la X.
- **Menú "⋯":** "Copy from another day", "Edit Maths subject" (con el nombre de la asignatura) y "Cancel session" (en rojo).
- **Sección "ALWAYS HERE":** recursos fijos con icono pin. Solo lectura aquí; se editan desde "Edit … subject".
- **Sección "FOR THIS DAY":** recursos del día, cada uno con icono, título (o URL) y, a la derecha, lápiz (editar) y papelera (quitar, sin confirmación).
- **Añadir recurso:** debajo de la lista, un campo siempre visible "Paste a link…" y un botón "Add", apagado hasta que haya un enlace.
  1. Al pegar un enlace, aparece debajo el campo "Title (optional)".
  2. "Add" o Enter añade el recurso. El icono se detecta solo (Drive, YouTube o genérico). Sin título, se muestra la URL.
  3. **Editar:** el lápiz sustituye la línea por un pequeño formulario en el mismo sitio, con "Link" (ya relleno) y "Title (optional)", y los botones "Cancel" y "Save".
- **Sección "NOTES":** área de texto libre con guardado automático y "✓ Saved".
- **Copiar de otra sesión** (se abre dentro de la misma ventana, con flecha atrás y el título "Copy from another day"):
  1. Lista de las sesiones anteriores de la misma asignatura, de la más reciente a la más antigua, con el número de recursos de cada una ("Mon 28 Sep · 2 resources"), y al final "Pick another date…" (abre un calendario).
  2. Al elegir una sesión, aparecen sus recursos del día con casillas, **todos marcados**. Los fijos no aparecen.
  3. El botón "Copy N resources" se actualiza con las casillas marcadas.

### Anular una sesión y añadir una actividad en su lugar

1. "⋯" → "Cancel session" abre la ventana "Cancel English · Tue 29 Sep" con:
   - "Reason" (texto; por ejemplo, "Cultural week").
   - Casilla "Add an activity in its place", desmarcada por defecto. Al marcarla aparecen "Activity name", "From" y "To" (desplegables de hora, **rellenos con la hora de la sesión**) y la ayuda "Starts with the session's times. Change them if needed."
   - Botones "Back" y "Continue".
2. **Confirmación, siempre:**
   - Sin actividad: "Cancel this session?".
   - Si la actividad pisa otras sesiones: título "Cancel 2 sessions?", texto "Dance workshop (9:15–11:00) overlaps with:", la lista de sesiones afectadas (cuadradito de color + nombre + hora) y la frase "Both will be cancelled. Their resources and notes are kept, not deleted." Botones "Go back" y "Yes, cancel 2 sessions" (rojo).
   - Reglas: una sesión pisada parcialmente se anula entera. Break y Lunch cubiertos no se mencionan. Las sesiones anuladas por solape reciben el mismo motivo.
3. Si se añadió actividad, se abre su ventana para añadir recursos y notas.

**Ventana de una sesión anulada:** cabecera apagada con el nombre tachado; en el cuerpo, un aviso gris "This session is cancelled: **School trip**" con el botón "Restore session". Los recursos y notas se conservan y reaparecen al restaurar.

### Eventos puntuales

- **"+ Add event"** abre una ventana con "Name", "Date", "From" y "To", **todos vacíos**. "Add" permanece apagado hasta completar los cuatro.
- Si pisa sesiones, aparece la misma confirmación "Cancel N sessions?"; si no, se añade directamente. Después se abre su ventana.
- **Ventana del evento:** misma estructura que la de sesión, con cabecera blanca, icono de estrella y borde discontinuo. Secciones: recursos ("Paste a link…") y notas; si sustituye sesiones, debajo del título aparece "Replaces English · Maths — Cultural week".
- **Menú "⋯" del evento:** "Edit name and time" (mismo formulario) y "Delete event" (rojo). Al borrar, la confirmación pregunta también si restaurar las sesiones que sustituía, con la casilla "Also restore English and Maths" marcada por defecto.

### Días sin clase ("Days off")

- Ventana con la lista de días marcados: icono beach, nombre, fechas ("Fri 9 Oct" o "21 Dec – 6 Jan") y papelera.
- Debajo, "Add days off": "From", "To" y "Name (optional)", con el botón "Add". Para un solo día, "To" igual a "From".
- Quitar un día pide confirmación: "Remove Christmas holidays? Classes will show again with their resources and notes."

### Ventana de la asignatura

Se abre desde **Settings → Subjects** (con la lista de todas) y desde **"⋯" → "Edit Maths subject"** en una sesión (solo esa asignatura).

- **Desde Settings:** a la izquierda, la lista de las 16 asignaturas con su punto de color; a la derecha, la asignatura seleccionada. Break y Lunch no aparecen.
- **Desde una sesión:** título "Maths · all sessions" y la línea "Changes here apply to every Maths session." Al cerrar, se vuelve a la sesión.
- **Contenido:**
  - Nombre (solo lectura) y cuándo se da ("Mon–Fri · 10:30–11:25", solo informativo).
  - **"COLOUR":** los 16 colores de la paleta en círculos o cuadrados redondeados, con el actual marcado con un anillo oscuro. El cambio se aplica al momento en toda la app. Si el color ya lo usa otra asignatura, debajo aparece "Also used by English" (no se intercambia nada).
  - **"ALWAYS HERE":** recursos fijos con pin, lápiz y papelera, y el mismo flujo "Paste a link…" + "Title (optional)". Ayuda: "These links appear in every Maths session." Quitar uno pide confirmación: "Remove Digital book from all Maths sessions?"
- Sin botón de guardar.

## Listas

En la interfaz, los estados se llaman **"Options"** en todas partes ("Edit options", "Delete option", "Add option").

### Página de listas

- **Barra de herramientas**, en una sola línea:
  - A la izquierda, "+ New list" (principal).
  - A la derecha, el desplegable de categoría ("All categories" + las 16, cada una con su punto de color), el desplegable de mes ("All months", "September 2026", "October 2026"…) y el selector "Active (3) / Archived (2)".
- **Tarjetas** en cuadrícula de 3 columnas, ordenadas de la más reciente a la más antigua. Cada tarjeta muestra:
  - La etiqueta de categoría (píldora con su color).
  - El nombre de la lista (13–15 px, peso 600) y la fecha de creación ("14 Sep 2026").
  - Una barra horizontal redondeada con la proporción de cada opción en su color (el hueco gris son los alumnos sin opción).
  - Los contadores: punto de color + número + nombre ("18 Yes", "2 No", "5 Pending") y, si los hay, "12 not set" en gris.
- Pulsar la tarjeta abre la lista.

### Dentro de una lista

- **Cabecera:** enlace "← Lists"; título de la lista (18–20 px) con su etiqueta de categoría al lado; menú "⋯" a la derecha con "Rename", "Change category" y "Archive list".
- **Franja de contadores** (fondo crema, radio 10 px): una píldora blanca por opción con punto de color y número ("17 Yes"), después "3 not set" en gris y, a la derecha, el enlace **"✎ Edit options"**. No cuenta a los alumnos quitados ni a los dados de baja.
- **Filas de alumnos** en orden alfabético, separadas por líneas finas:
  - Nombre (unos 110 px de ancho).
  - **Botones con todas las opciones** de la lista en forma de píldora. El seleccionado se rellena con su color (fondo · borde · texto de la paleta); los demás, blancos con borde gris. Un clic elige; pulsar el ya elegido lo desmarca. Si hay muchas opciones, pasan a una segunda línea.
  - A la derecha, menú "⋮" con "Add note" y "Remove from list".
  - **Nota:** texto pequeño gris con icono bajo el nombre ("Mum will send it on Friday"). Pulsarla la edita en el sitio, con guardado automático.
- **Alumno dado de baja:** se queda en su sitio, atenuado al 60 %, con la etiqueta gris "Left" junto al nombre, sin menú y sin poder cambiarse.
- **Alumnos quitados:** al final, una sección plegable "Removed from this list (2)" con cada nombre en gris y el botón "↩ Add back". "Add back" lo devuelve con la opción y la nota que tenía. Si no hay quitados, la sección no aparece.
- **Lista archivada:** solo lectura, con un aviso gris arriba ("This list is archived."); el menú "⋯" muestra "Unarchive".

### Modo "Edit options"

1. Al pulsar "Edit options", la franja de contadores se convierte en un recuadro con **borde coral de 1,5 px** que contiene:
   - Título "Options" y ayuda "What can each student have? Changes only affect this list."
   - Una fila por opción: círculo de color (al pulsarlo se despliega la paleta de 8 colores), campo de texto con el nombre, "17 students" en gris y papelera.
   - "+ Add option" (añade una fila con el siguiente color de la paleta) y el botón "Done".
2. Siempre debe haber al menos 2 opciones; con dos, las papeleras se muestran desactivadas.
3. Mientras se edita, las filas de alumnos se ven atenuadas y no se pueden tocar, pero reflejan los cambios en directo (por ejemplo, "Pending" → "Pending reply").
4. Todo se guarda al momento; "Done" solo cierra el modo edición.
5. **Borrar una opción en uso** abre la confirmación "Delete "Pending"?" con el texto "3 students have this option. What should they have instead?", píldoras con las demás opciones + "Leave empty" (marcada por defecto) y los botones "Cancel" / "Delete option" (rojo). Si nadie la usa, se borra sin preguntar.

### Crear una lista ("New list")

Una sola ventana con, de arriba abajo:

1. "Name" (obligatorio).
2. "Category": desplegable con punto de color; por defecto, "Others".
3. "Options", con la ayuda "What can each student have?": dos filas ya rellenas, **"Yes" (verde) y "No" (rojo)**, editables, cada una con círculo de color y papelera (desactivada mientras haya solo 2), y "+ Add option".
4. "Start everyone as (optional)": píldoras con "Empty" (marcada por defecto) y las opciones escritas arriba, que se actualizan en directo.
5. La línea "All 25 active students will be added." con icono de alumnos.
6. Botones "Cancel" y "Create list" (apagado hasta que haya nombre). Al crear, se abre la lista nueva.

No hay plantillas ni atajos de opciones guardadas.

## Alumnos

En la v1, la ficha solo tiene **Name, Birthday, Takes the bus y Observations**. El cumpleaños es solo día y mes: no se guarda el año ni se muestra la edad. Las alergias y el contacto de emergencia no aparecen en ninguna parte de la app.

### Listado

- **Barra de herramientas:**
  - A la izquierda, "+ New student" (principal) y el buscador "Search by name…".
  - A la derecha, el botón-filtro "Takes the bus" (píldora que se activa y desactiva; activa en ámbar suave) y el selector "Current (25) / Left (1)".
- **Tabla** sobre fondo blanco, radio 12 px, con filas separadas por líneas finas, en orden alfabético:

| Columna | Contenido |
| --- | --- |
| Name | Nombre, peso 500 |
| Birthday | Día y mes ("12 Mar") |
| Bus | Icono de bus si va en bus; guion gris si no |
| Observations | Texto recortado a 2 líneas con "…"; guion gris si está vacío. Es la columna más ancha |

- Hover en la fila (fondo crema) y cursor de mano. **Pulsar la fila abre la ficha.**
- En "Left" se ve la misma tabla con los alumnos dados de baja.

### Nuevo alumno

Ventana centrada "New student" con:

- "Name \*" (obligatorio).
- "Birthday": dos desplegables, día y mes ("12" · "March"). Sin año.
- "Takes the bus" (selector Yes / No; por defecto No).
- "Observations" (área de texto; texto de ejemplo "Pick-up, reminders…"). Debajo, una ayuda en gris: "Don't write sensitive information here (health, family details)."
- Botones "Cancel" y "Add student" (apagado hasta que haya nombre).

**Aviso de nombre duplicado:** al escribir un nombre que ya existe, el campo toma borde ámbar y debajo aparece un aviso ámbar: "There is already a student called Marc. Add the first letter of the surname, e.g. "Marc S."". No bloquea el guardado. También aparece al renombrar en la ficha.

### Ficha del alumno

- Ventana centrada. **Cabecera:** círculo con la inicial (fondo neutro #F1EFE8, texto #444441), el nombre (16–18 px) y, debajo, "Birthday: 12 March" (o nada si no tiene). A la derecha, el menú "⋯" y la X.
- **Cuerpo:** los mismos cuatro campos que en "New student", **siempre editables y con guardado automático** ("✓ Saved").
- **Menú "⋯":** "Mark as left" y "Delete student" (rojo).
- **Confirmación de baja:** "Mark Biel as left?" — "He won't appear in the student list or in new lists. He stays in existing lists marked as "Left"." Botones "Cancel" / "Mark as left".
- **Confirmación de eliminar** (icono de alerta rojo): "Delete Biel permanently?" — "He will be removed from everywhere, including all lists. This can't be undone. If he has left the school, use "Mark as left" instead." Botones "Cancel" / "Delete" (rojo).

### Ficha de un alumno dado de baja

- Campos en solo lectura, con un aviso gris arriba: "Left the class" y el botón "Mark as current again".
- Al reincorporarlo, vuelve al listado y a las listas nuevas, y en las listas antiguas deja de estar marcado como "Left".
- El menú "⋯" solo ofrece "Delete student".

## Acceso, Settings y estados del sistema

### Pantallas de acceso

Se muestran cuando no hay sesión iniciada. Página completa con fondo crema y, centrada, una tarjeta blanca de unos 400 px de ancho. Arriba de la tarjeta, el icono redondo coral (school) y el nombre "ClassFlow". No se ve la barra superior de la app.

| Pantalla | Contenido |
| --- | --- |
| **Sign in** | Título "Welcome to ClassFlow". Texto: "Enter your email and we'll send you a link to sign in. No password needed." Campo "Email". Botón principal "Send me a link". Debajo, en pequeño: "New here? Create your account" |
| **Create your account** | Título "Create your account". Campos "Your name" y "Email". Botón principal "Create account". Debajo: "Already have an account? Sign in" |
| **Check your email** | Icono mail. Título "Check your email". Texto: "We sent a link to laura@school.org. Open it on this device to sign in." Debajo: "Didn't get it? Send again" (disponible pasados 60 segundos) y "Use a different email" |

Mensajes dentro de la tarjeta, bajo el campo de correo:

- **Correo no autorizado** (aviso ámbar): "This email doesn't have access to ClassFlow yet."
- **Correo sin cuenta al iniciar sesión** (aviso ámbar): "We couldn't find an account with this email." con el enlace "Create your account".
- **Correo con formato incorrecto** (texto rojo): "Enter a valid email address."
- **Enlace caducado** (aviso ámbar sobre la pantalla Sign in): "This link has expired. Enter your email to get a new one."
- **Sesión caducada:** "Please sign in again."

El botón principal muestra un indicador de carga mientras se envía el enlace. Tras entrar por primera vez, la profesora va directamente al Planning con su horario ya cargado; no hay pasos de bienvenida.

### Settings

Ventana centrada y ancha (unos 680 px), con una navegación lateral de tres secciones:

- **Subjects:** la ventana de la asignatura descrita en el Planning, con la lista de las 16 a la izquierda.
- **Account:**
  - "Your name": campo editable con guardado automático.
  - "Email": solo lectura.
  - Botón secundario "Sign out", con icono logout. Cierra la sesión sin pedir confirmación y vuelve a la pantalla Sign in.
- **Your data:**
  - Texto: "Download a copy of everything in your account: subjects, resources, notes, events, students and lists."
  - Botón secundario "Export my data", con icono download. Descarga un archivo (`classflow-data-2026-10-07.json`).
  - Al terminar, un mensaje breve bajo el botón: "✓ Your data was downloaded".

### Estados del sistema

Los datos están en la nube, así que cada pantalla debe prever estos estados.

| Estado | Cómo se muestra |
| --- | --- |
| **Cargando una pantalla** | Bloques grises (#F1EFE8) con la forma del contenido que va a aparecer (celdas, filas, tarjetas), con un pulso suave. Nunca una pantalla en blanco ni un indicador de carga a pantalla completa. La barra superior y el encabezado se ven desde el primer momento |
| **Botón en curso** | El botón muestra un indicador de carga pequeño junto al texto y no se puede volver a pulsar hasta que termina |
| **Guardando un cambio** | "Saving…" en gris bajo el campo y, al terminar, "✓ Saved" en verde |
| **Fallo al guardar** | "Couldn't save · Retry" en rojo (#A32D2D) bajo el campo, con "Retry" como enlace. El campo conserva lo que la profesora escribió |
| **Fallo al cargar** | En la zona de contenido: icono alert-triangle, "Something went wrong loading this page." y el botón "Try again" |
| **Sin conexión** | Franja ámbar bajo la barra superior, en todas las secciones: icono wifi-off y "You're offline. Changes can't be saved until the connection is back." No se puede cerrar; desaparece sola al volver la conexión. Mientras tanto, los campos y botones de edición se ven atenuados y no responden; se puede seguir consultando lo ya cargado |

## Pantallas y estados a entregar

Usar datos realistas: el horario de la especificación, unos 25 alumnos con nombres catalanes y castellanos, y los festivos de la Diada (11/9) y la Mercè (24/9).

**Planning**

- [ ] Semana actual con la columna de hoy, recursos, "+N more", notas, Break/Lunch y las horas exactas del viernes
- [ ] Semana con un festivo, una sesión anulada, un evento que ocupa varias filas y "Free time"
- [ ] Vista diaria normal y con un evento que sustituye sesiones
- [ ] Vista mensual de septiembre de 2026 con festivos y eventos
- [ ] Ventana de sesión: estado normal, menú "⋯" abierto, añadiendo recurso (con "Title (optional)") y editando un recurso
- [ ] Copiar de otra sesión (lista de sesiones y selección con casillas)
- [ ] Anular con actividad (formulario) y confirmación "Cancel 2 sessions?"
- [ ] Ventana de sesión anulada con "Restore session"
- [ ] "Add event" (vacío) y ventana de evento
- [ ] Ventana "Days off"
- [ ] Ventana de asignatura desde una sesión ("Maths · all sessions")

**Listas**

- [ ] Página de listas con filtros y tarjetas (activas) y vista de archivadas
- [ ] Lista abierta con notas, un alumno "Left" y la sección "Removed from this list"
- [ ] Modo "Edit options" y confirmación de borrar una opción en uso
- [ ] Ventana "New list"

**Alumnos**

- [ ] Listado (Current) con el filtro de bus desactivado y activado, con las columnas Name, Birthday, Bus y Observations
- [ ] "New student" con el aviso de nombre duplicado
- [ ] Ficha con menú "⋯" y las dos confirmaciones
- [ ] Ficha de un alumno dado de baja

**General**

- [ ] Pantallas de acceso: Sign in, Create your account y Check your email, con el aviso de correo no autorizado
- [ ] Settings → Subjects, Account y Your data
- [ ] Barra superior con el círculo de la cuenta
- [ ] Vista semanal en estado de carga
- [ ] Fallo al guardar en un campo, fallo al cargar una pantalla y franja de sin conexión
- [ ] Estados vacíos de listas y alumnos

## Historial y mejoras futuras

Este brief se mantiene alineado con la especificación vigente. Para no duplicar información:

- Los cambios entre versiones, con sus motivos, están en el [historial de la especificación](../spec/CHANGELOG.md).
- Las funciones que quedan fuera de la v1 y las mejoras futuras están al final de la [especificación v1.2](../spec/especificacion-v1.2.md#fuera-de-alcance-y-mejoras-futuras).

**Nota para desarrollo:** los recursos fijos de cada asignatura se pueden precargar con los datos iniciales de la cuenta, igual que el horario y los colores, si la profesora los facilita antes de la entrega.
