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
- [ ] Normas de código y de arquitectura
- [ ] Plantilla de tareas para agentes
- [ ] Fusionar `docs` en `main`

## Fase 1 – Diseño

A partir de la especificación v1.2 y del brief. Cada tanda se revisa antes de empezar la siguiente; las pantallas se guardan en `docs/design/screens/`.

- [ ] **Sistema de diseño:** colores, tipografía, botones, campos, celdas, ventanas, menús y confirmaciones
- [ ] **Tanda 1:** barra superior y vista semanal del Planning
- [ ] Enseñar la tanda 1 a la profesora y recoger su opinión
- [ ] **Tanda 2:** resto del Planning (vistas diaria y mensual, ventana de sesión, copiar recursos, anular, eventos, días sin clase, asignatura)
- [ ] **Tanda 3:** Listas (página, lista abierta, edición de opciones, nueva lista)
- [ ] **Tanda 4:** Alumnos, Settings, pantallas de acceso, estados de carga, error y sin conexión, y estados vacíos
- [ ] Revisar que están todas las pantallas de la lista del brief

## Fase 2 – Decisiones técnicas

Cada decisión se documenta en `docs/decisions/`, con las opciones valoradas y el motivo.

- [x] Elegir el stack: React, TypeScript, Tailwind, Supabase y Vercel ([decisión 0001](decisions/0001-tech-stack.md))
- [ ] Definir el modelo de datos: tablas, relaciones y reglas de acceso
- [ ] Confirmar con el colegio que se pueden guardar en la nube los datos mínimos de los alumnos
- [ ] Comprobar los límites del plan gratuito de Supabase
- [ ] Decidir la licencia del repositorio

## Fase 3 – Implementación

Una rama por tarea (`feat/...`), fusionada en `main` cuando funciona. El orden busca tener cuanto antes algo que la profesora pueda probar.

- [ ] **Base:** proyecto, lint, pruebas e integración continua; estilos del sistema de diseño, barra superior y navegación
- [ ] **Base de datos:** proyecto de Supabase, esquema como migraciones, reglas de acceso por usuaria y tipos generados
- [ ] **Acceso:** registro con correos autorizados, inicio de sesión por enlace y cierre de sesión
- [ ] **Datos iniciales:** carga del horario base y las asignaturas en la cuenta
- [ ] **Capa de datos** separada, con los estados de carga, guardado y error
- [ ] **Planning – vista semanal:** celdas, día actual, navegación entre semanas
- [ ] **Planning – sesión:** ventana de sesión, recursos del día, notas, recursos fijos
- [ ] **Planning – vistas diaria y mensual**
- [ ] **Planning – cambios:** días sin clase, anular y restaurar sesiones, eventos puntuales, copiar recursos
- [ ] **Students:** listado, ficha, alta, baja y eliminación
- [ ] **Lists:** página de listas, lista abierta, opciones, categorías, archivo
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

## Más adelante

Ideas ya anotadas para versiones futuras; el detalle está al final de la [especificación](spec/especificacion-v1.2.md#fuera-de-alcance-y-mejoras-futuras).

- Personalizar el horario: crear, eliminar y modificar asignaturas
- Registro abierto a cualquier profesora (depende del editor de horario)
- Iniciar sesión con Google
- Diseño adaptado al móvil
- Guardar combinaciones de opciones para las listas
- Anular o sustituir varias sesiones a la vez
- Uso sin conexión (por evaluar)
