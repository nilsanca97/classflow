# Plan del proyecto

Fases y tareas de ClassFlow, de la documentación a la entrega. Se actualiza a medida que se avanza: una tarea se marca cuando está hecha y fusionada en `main`.

**Fase actual:** 0 – Documentación inicial.

## Fase 0 – Documentación inicial

Rama `docs`.

- [x] Especificación v1.0
- [x] Brief de diseño
- [x] Especificación v1.1 y su historial de cambios
- [x] README y `.gitignore`
- [x] Contexto del proyecto, plan y `AGENTS.md`
- [x] Decisión de stack
- [x] Especificación v1.2 y brief actualizados (datos en la nube e inicio de sesión)
- [x] Especificación v1.3 y brief actualizados (listas de comprobación)
- [x] [Normas de código y de arquitectura](engineering-guidelines.md)
- [x] [Plantilla de tareas para agentes](tasks/README.md)
- [x] Especificación v1.4 y brief actualizados (revisión de la tanda 1)
- [ ] Fusionar `docs` en `main`

## Fase 1 – Diseño

A partir de la especificación v1.4 y del brief. Cada tanda se revisa antes de empezar la siguiente; las pantallas se guardan en `docs/design/screens/`.

- [x] **Sistema de diseño:** colores, tipografía, botones, campos, celdas, ventanas, menús y confirmaciones ([exportación HTML](design/tanda-1-week.html)). Se da por válido; se ajustará si hace falta tras la prueba con la profesora
- [x] **Tanda 1:** barra superior y vista semanal del Planning
- [x] Enseñar la tanda 1 a la profesora y recoger su opinión
- [ ] **Tanda 2:** resto del Planning (vistas diaria y mensual, ventana de sesión, copiar recursos, anular, eventos, días sin clase, asignatura)
- [ ] **Tanda 3:** Listas (página, lista abierta, nueva lista)
- [ ] **Tanda 4:** Alumnos, Settings, pantallas de acceso, estados de carga, error y sin conexión, y estados vacíos
- [ ] Revisar que están todas las pantallas de la lista del brief
- [ ] **Prototipo clicable** de los flujos principales (ventana de sesión, anular y eventos, listas, Settings) con datos de ejemplo
- [ ] Probar el prototipo con la profesora y ajustar el diseño antes de programar esas pantallas

## Fase 2 – Decisiones técnicas

Cada decisión se documenta en `docs/decisions/`, con las opciones valoradas y el motivo.

- [x] Elegir el stack: React, TypeScript, Tailwind, Supabase y Vercel ([decisión 0001](decisions/0001-tech-stack.md))
- [x] Definir el modelo de datos: tablas, relaciones y reglas de acceso ([decisión 0002](decisions/0002-data-model.md))
- [ ] Confirmar con el colegio que se pueden guardar en la nube los datos mínimos de los alumnos
- [ ] Comprobar los límites del plan gratuito de Supabase
- [ ] Decidir la licencia del repositorio

## Fase 3 – Implementación

Una rama por tarea (`feat/...`), fusionada en `main` cuando funciona. El orden busca tener cuanto antes algo que la profesora pueda probar.

- [x] **Base técnica** ([tarea 0001](tasks/0001-project-setup.md)): proyecto, lint, formato, pruebas e integración continua
- [ ] **Base visual** ([tarea 0002](tasks/0002-visual-foundation.md)): tokens del sistema de diseño, fuentes, favicon, barra superior y navegación
- [ ] **Base de datos:** proyecto de Supabase, esquema como migraciones, reglas de acceso por usuaria y tipos generados
- [ ] **Acceso:** registro con correos autorizados, inicio de sesión por enlace y cierre de sesión
- [ ] **Datos iniciales:** carga del horario base y las asignaturas en la cuenta
- [ ] **Capa de datos** separada, con los estados de carga, guardado y error
- [ ] **Planning – vista semanal:** celdas, día actual, navegación entre semanas
- [ ] **Planning – sesión:** ventana de sesión, recursos del día, notas, recursos fijos
- [ ] **Planning – vistas diaria y mensual**
- [ ] **Planning – cambios:** días sin clase, anular y restaurar sesiones, eventos puntuales, copiar recursos
- [ ] **Students:** listado, ficha, alta, baja y eliminación
- [ ] **Lists:** página de listas, lista abierta con casillas, categorías, archivo
- [ ] **Settings:** asignaturas (color y recursos fijos), cuenta y "Export my data"
- [ ] **Sin conexión:** aviso y bloqueo de la edición
- [ ] Estados vacíos, accesibilidad con teclado y repaso general
- [ ] Pruebas de extremo a extremo con Playwright de los flujos principales

## Fase 4 – Entrega

- [ ] Pedir a la profesora los recursos fijos de cada asignatura y precargarlos
- [ ] Publicar la app en Vercel con su dirección definitiva
- [ ] Añadir el correo de la profesora a la lista de autorizados
- [ ] Acompañarla en su registro y primer acceso, y dejar la app en sus marcadores
- [ ] Sesión de prueba con la profesora y lista de ajustes
- [ ] Corregir lo que salga de la prueba
- [ ] Añadir capturas al README

## Deuda técnica

Decisiones provisionales o mejoras pendientes que no bloquean el trabajo, pero que hay que revisar.

- [ ] **ESLint 10:** el proyecto usa ESLint 9 porque `eslint-plugin-jsx-a11y` todavía no admite la 10. Subir cuando lo admita.
- [ ] **TypeScript 7:** el proyecto usa TypeScript 6.0 porque `typescript-eslint` todavía no admite la 7. Subir cuando lo admita.
- [ ] **`npm audit`:** 5 vulnerabilidades en dependencias internas de `eslint-plugin-boundaries`, solo de desarrollo (no llegan a la app). Revisar cuando salga una versión nueva del plugin.
- [ ] **Prueba de `App`:** busca por texto (`getByText`); las normas piden buscar por rol (`getByRole`). Corregir en la próxima tarea que toque `App`.

## Más adelante

Ideas ya anotadas para versiones futuras; el detalle está al final de la [especificación](spec/especificacion-v1.4.md#fuera-de-alcance-y-mejoras-futuras).

- Personalizar el horario: crear, eliminar y modificar asignaturas
- Registro abierto a cualquier profesora (depende del editor de horario)
- Iniciar sesión con Google
- Diseño adaptado al móvil
- Anular o sustituir varias sesiones a la vez
- Uso sin conexión (por evaluar)
