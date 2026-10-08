# Tareas

Cada pieza de trabajo que se encarga a un agente (Claude Code u otro) se describe en un archivo de esta carpeta. La tarea es el prompt: el agente la lee y la ejecuta siguiendo `AGENTS.md` y las [normas de código](../engineering-guidelines.md).

## Archivos

- `TEMPLATE.md`: la plantilla. Se copia para cada tarea nueva.
- `NNNN-nombre-corto.md`: una tarea, numerada en orden de creación (`0001-project-setup.md`).

## Estados

| Estado | Significado |
| --- | --- |
| Draft | Se está escribiendo; todavía no se puede ejecutar |
| Ready | Completa y revisada; se puede encargar |
| In progress | Un agente está trabajando en ella |
| In review | El agente ha terminado; el autor revisa el resultado |
| Done | Fusionada en `main` |

Solo hay **una tarea en curso a la vez**.

## Cómo se escribe una buena tarea

- **Pequeña:** cabe en un solo *pull request* que se pueda revisar con calma. Como referencia, unas pocas horas de trabajo y unos cientos de líneas cambiadas. Si es más grande, se divide.
- **Un único objetivo**, que se pueda explicar en una o dos frases.
- **Remite, no copia:** enlaza las secciones de la especificación y del brief en lugar de repetirlas. Así no se desincronizan.
- **Dice qué queda fuera.** Es lo que más evita que el agente haga de más.
- **Criterios de aceptación comprobables:** "al pulsar X ocurre Y", "el comando Z pasa". Nada de "que quede bien".
- **Cierra las decisiones antes:** si una tarea obliga a decidir algo que no está en la documentación, se decide y se documenta antes de marcarla como Ready.

## Flujo de trabajo

1. **Escribir la tarea** a partir de la plantilla y marcarla como Ready.
2. **Crear la rama** que indica la tarea, desde `main` actualizado.
3. **Pedir un plan primero.** En Claude Code, en modo plan: *"Lee `docs/tasks/NNNN-….md` y propón un plan. No escribas código todavía."* Se revisa el plan y se corrige antes de ejecutar. Es el punto de control más barato.
4. **Ejecutar:** *"Ejecuta la tarea según el plan aprobado."* El agente marca la tarea como In progress.
5. **Revisar:** el agente pasa los comandos de calidad, marca la tarea como In review, resume qué archivos cambió y propone los mensajes de commit. El autor lee el diff completo; si no sabe explicar un cambio, pregunta antes de seguir.
6. **Commits y push** los hace el autor, un tema por commit.
7. **Pull request** a `main`. Se fusiona solo con la integración continua en verde.
8. **Cerrar:** la tarea pasa a Done y se marca en `docs/plan.md`.

Si el agente se encuentra con algo que la tarea no resuelve, **para y pregunta**; no decide por su cuenta.
