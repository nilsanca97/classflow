# Historial de la especificación

Cada versión de la especificación se conserva como archivo propio y no se modifica después de publicarse. Aquí se resume qué cambió en cada una y por qué.

## v1.2 – 7 de octubre de 2026

[especificacion-v1.2.md](especificacion-v1.2.md)

Incorpora la [decisión de stack](../decisions/0001-tech-stack.md). El cambio de fondo es que **los datos pasan del navegador a la nube**, con registro e inicio de sesión. Motivos: la profesora querrá usar la app desde más de un dispositivo, el proyecto aspira a servir a más profesoras, y el portátil es del colegio, donde los datos locales y su copia a archivo eran frágiles.

### General

- La app deja de ser una PWA local: es una web que **necesita internet** y no se instala.
- Stack definido: React, TypeScript, Tailwind CSS, Supabase y Vercel.
- Nuevos estados previstos en todas las pantallas: carga, error y falta de conexión.

### Cuenta e inicio de sesión

- Nuevo **registro** con nombre y correo, y nuevo **inicio de sesión por enlace al correo**, sin contraseña.
- En la v1 solo pueden registrarse los **correos autorizados**, porque una cuenta nueva no tendría horario hasta que exista el editor.
- El horario base se carga como datos iniciales de la cuenta, no con la app.

### Copias de seguridad

- **Se eliminan** la copia automática a archivo, el permiso de Chrome, el indicador de copia, el aviso a los 3 días, la importación y la pantalla de bienvenida que pedía elegir el archivo.
- Se añade **"Export my data"**, que descarga todos los datos de la cuenta.

### Alumnos

- La fecha de nacimiento se sustituye por el **cumpleaños (día y mes)**, sin año, para reducir los datos personales en la nube. Desaparece la columna de edad.
- El campo de observaciones avisa de que no se escriban datos sensibles.

### Settings

- Pasa a tener tres secciones: Subjects, Account y Your data. Desaparece Backup.

### Fuera de alcance

- "Varios usuarios" deja de estar descartado: el registro abierto a más profesoras pasa a **futuro**. Queda descartado solo compartir una clase entre varias profesoras.
- Se retiran "copia en la nube", "sincronización completa" y "sincronizar solo el planning", que ya no aplican.
- Nuevas mejoras futuras o posibles: iniciar sesión con Google, diseño adaptado al móvil, uso sin conexión, importar datos y eliminar la cuenta desde la app.

## v1.1 – 6 de octubre de 2026

[especificacion-v1.1.md](especificacion-v1.1.md)

Incorpora las decisiones tomadas al definir el diseño visual (ver el [brief de diseño](../design/brief-v1.md)), para que especificación y brief digan lo mismo.

### General

- La app pasa a llamarse **ClassFlow**.
- Nueva ventana **Settings**, con las secciones Subjects y Backup.
- Nueva pantalla de **bienvenida** en el primer arranque, que pide elegir el archivo de copia.
- Nueva sección "Patrones generales de la interfaz": ventanas centradas, menú "⋯", guardado automático, confirmaciones y recuperación de lo oculto.

### Copias de seguridad

- La copia automática va a un **archivo local** en la carpeta que elija la profesora, **sin Google Drive** (la profesora no quiere instalar Drive en el ordenador).
- Se recomienda el permiso "Allow on every visit" de Chrome para que la copia funcione sola.
- Se concreta el **indicador de copia** en la barra superior y el aviso a los **3 días** sin copia.

### Planning

- **Asignaturas:** el color se elige de una paleta cerrada de 16 pasteles, con colores iniciales ya asignados; se pueden repetir. El nombre no se edita en la v1. Se gestionan desde Settings → Subjects y desde el menú de la sesión.
- **Recursos:** se detalla cómo añadir, editar y quitar; quitar un recurso fijo pide confirmación. Los recursos fijos se pueden precargar con los datos iniciales.
- **Días sin clase:** nombre opcional y confirmación al quitarlos.
- **Cambios puntuales:** una sesión anulada se puede restaurar. Al anular se puede crear una actividad en su lugar, con horario editable; las sesiones que pisa se anulan con confirmación. Los eventos puntuales tienen recursos y notas, se pueden renombrar, cambiar de hora y borrar (restaurando las sesiones que sustituían).
- **Vista mensual:** ya no muestra puntos de colores por asignatura; muestra el número del día, el día actual, los días sin clase y los eventos puntuales.
- **Vista diaria:** muestra todos los recursos y el texto de las notas.
- **Detalle de la sesión:** se decide que es una ventana centrada.

### Listas

- Nuevo concepto de **categoría**: cada lista pertenece a una de 16 categorías fijas, que elige la profesora al crearla. Filtros por categoría y por mes.
- Los estados pasan a llamarse **"Options"**.
- **Se eliminan las plantillas:** toda lista empieza con "Yes" y "No", editables al crearla y después. Mínimo 2 opciones. Paleta cerrada de 8 colores.
- Volver a añadir un alumno quitado recupera su opción y su nota.
- Las listas archivadas son de solo lectura y se pueden desarchivar.

### Alumnos

- **Se eliminan de la v1 los datos sensibles:** alergias y contacto de emergencia (nombre, teléfono y relación), y con ellos el filtro "con alergias".
- Se añaden el buscador por nombre y el selector Current / Left.
- La baja de un alumno se puede deshacer.

### Fuera de alcance

- "Cambiar el horario base a mitad de curso" pasa de **descartado a futuro**, como pantalla para crear, eliminar y modificar asignaturas (nombre, días y horas).
- Nuevas mejoras futuras: copia en la nube con inicio de sesión (Supabase o Firebase, con el cifrado por debatir), sincronización completa (por evaluar), alergias y contacto de emergencia, opciones guardadas para listas, y anular varias sesiones a la vez.
- "Varios usuarios o inicio de sesión" queda como "Varios usuarios": el inicio de sesión se contempla para la copia en la nube.
- Se retira "Varios contactos de emergencia", al no haber contacto de emergencia en la v1.

## v1.0 – 26 de septiembre de 2026

[especificacion-v1.0.md](especificacion-v1.0.md)

Primera versión: alcance, decisiones técnicas, Planning, horario base, Listas y Alumnos.
