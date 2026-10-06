# Contexto del proyecto

Resumen de quién, para qué y con qué límites se construye ClassFlow. Es el punto de partida para cualquier persona (o agente) que llegue nueva al proyecto. El detalle está en la [especificación](spec/especificacion-v1.1.md) y en el [brief de diseño](design/brief-v1.md).

## Qué es

ClassFlow es una aplicación web para que **una profesora de primaria** organice **su clase** durante el curso 2026–2027: su horario con los materiales de cada sesión, sus listas de alumnos y una ficha básica de cada alumno.

## Por qué existe

- **Un encargo real.** La profesora trabaja hoy con el horario en papel, enlaces repartidos entre Drive y YouTube, y listas sueltas para autorizaciones y pagos. Quiere tenerlo todo en un solo sitio.
- **Un proyecto de aprendizaje y de portafolio.** El autor lo usa para aprender a programar con un caso real y documentar el proceso completo, de la especificación al código. Por eso el repositorio es público.

## La usuaria

- Una sola persona: la profesora. No hay otros usuarios ni roles.
- **Poco hábil con la tecnología.** Es el dato que más condiciona el diseño.
- Pidió algo **"bonito pero sencillo"**.
- Usa un portátil con Chrome. No quiere instalar Google Drive en el ordenador (lo usa desde el navegador).
- Su clase sigue un modelo británico: asignaturas como Phonics, PSHE o Golden Time, y la interfaz en inglés.

## Objetivos

1. Que la profesora prepare y consulte su semana más rápido que con el papel.
2. Que pueda usar la app sin ayuda desde el primer día.
3. Que sus datos estén seguros: no se pierden y no salen de su ordenador.
4. Que el proyecto sirva como muestra de trabajo: documentación clara, historial ordenado y código legible.

## Principios

- **Facilidad de uso por encima de todo:** pocas opciones a la vista, acciones evidentes, textos claros y sin pasos innecesarios.
- **Un patrón para cada cosa:** ventanas centradas, menú "⋯" para lo secundario, guardado automático y confirmación en lo destructivo.
- **Nada se pierde sin querer:** lo que se oculta se puede recuperar.
- **Alcance pequeño y cerrado:** antes de añadir una función, comprobar que la profesora la necesita.

## Restricciones

| Restricción | Detalle |
| --- | --- |
| Una profesora, una clase, un curso | Curso 2026–2027, del 7/9/2026 al 25/6/2027. Sin cuentas ni inicio de sesión |
| Datos en local | SPA instalable como PWA, datos en IndexedDB. Sin servidor ni nube en la v1 |
| Copias de seguridad | Copia automática a un archivo local, más exportar e importar |
| Sin datos sensibles | La v1 no guarda alergias ni contactos de emergencia. Las observaciones son para datos prácticos |
| Horario fijo | El horario base y los nombres de las asignaturas no se editan desde la app en la v1 |
| Dispositivo | Portátil con Chrome. El móvil queda fuera de la v1 |
| Idiomas | Interfaz en inglés. Documentación en español. Commits y README en inglés |

## Privacidad

- El repositorio es público: **nunca debe contener datos reales** de alumnos, familias o de la profesora.
- Los ejemplos de los documentos, los diseños y las pruebas usan siempre nombres inventados.
- Los archivos de copia de seguridad de la app están excluidos en `.gitignore`.
- Si en el futuro se añade copia en la nube, habrá que revisar antes la protección de datos de menores (RGPD).

## Glosario

| Término | En la interfaz | Significado |
| --- | --- | --- |
| Asignatura | Subject | Materia del horario, con color y recursos fijos. Hay 16, más Break y Lunch |
| Bloque | — | Una asignatura en un día de la semana y una hora del horario base |
| Sesión | Session | Un bloque en una fecha concreta |
| Recurso fijo | Always here | Enlace de la asignatura que aparece en todas sus sesiones |
| Recurso del día | For this day | Enlace de una sola sesión |
| Evento puntual | Event | Actividad con fecha y hora propias, fuera del horario base |
| Día sin clase | Day off | Festivo o vacaciones; oculta las clases de ese día |
| Lista | List | Lista de alumnos con una opción por alumno |
| Opción | Option | Cada valor posible en una lista (Yes, No, Pending…) |
| Categoría | Category | Clasificación de una lista; hay 16 fijas |
| Baja | Left | Alumno que ha dejado la clase; se conserva en las listas antiguas |

## Estado actual

Fase de especificación y diseño. Todavía no hay código. El avance y los siguientes pasos están en el [plan](plan.md).

## Cuestiones abiertas

- **Stack tecnológico:** por decidir.
- **Dónde se publica la app:** una PWA necesita servirse por HTTPS desde algún sitio para poder instalarse; falta elegirlo.
- **Recursos fijos iniciales:** pedir a la profesora los enlaces que usa siempre en cada asignatura, para precargarlos.
- **Licencia del repositorio:** por decidir.
