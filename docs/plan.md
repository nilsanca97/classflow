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
- [ ] Fusionar `docs` en `main`

## Fase 1 – Diseño

A partir de la especificación v1.1 y del brief. Cada tanda se revisa antes de empezar la siguiente; las pantallas se guardan en `docs/design/screens/`.

- [ ] **Sistema de diseño:** colores, tipografía, botones, campos, celdas, ventanas, menús y confirmaciones
- [ ] **Tanda 1:** barra superior y vista semanal del Planning
- [ ] Enseñar la tanda 1 a la profesora y recoger su opinión
- [ ] **Tanda 2:** resto del Planning (vistas diaria y mensual, ventana de sesión, copiar recursos, anular, eventos, días sin clase, asignatura)
- [ ] **Tanda 3:** Listas (página, lista abierta, edición de opciones, nueva lista)
- [ ] **Tanda 4:** Alumnos, Settings, bienvenida, indicador de copia y estados vacíos
- [ ] Revisar que están todas las pantallas de la lista del brief

## Fase 2 – Decisiones técnicas

Cada decisión se documenta en `docs/decisions/`, con las opciones valoradas y el motivo.

- [ ] Elegir el stack (framework, lenguaje, estilos, pruebas)
- [ ] Elegir cómo se accede a IndexedDB y definir el modelo de datos
- [ ] Elegir dónde se publica la app (necesita HTTPS para instalarse como PWA)
- [ ] Decidir la licencia del repositorio
- [ ] Actualizar `AGENTS.md`, el README y `.gitignore` con el stack elegido

## Fase 3 – Implementación

Una rama por tarea (`feat/...`), fusionada en `main` cuando funciona. El orden busca tener cuanto antes algo que la profesora pueda probar.

- [ ] **Base:** proyecto, estilos del sistema de diseño, barra superior y navegación
- [ ] **Datos:** capa de datos separada, horario base y asignaturas cargados
- [ ] **Planning – vista semanal:** celdas, día actual, navegación entre semanas
- [ ] **Planning – sesión:** ventana de sesión, recursos del día, notas, recursos fijos
- [ ] **Planning – vistas diaria y mensual**
- [ ] **Planning – cambios:** días sin clase, anular y restaurar sesiones, eventos puntuales, copiar recursos
- [ ] **Students:** listado, ficha, alta, baja y eliminación
- [ ] **Lists:** página de listas, lista abierta, opciones, categorías, archivo
- [ ] **Settings:** asignaturas (color y recursos fijos)
- [ ] **Copias de seguridad:** copia automática a archivo, indicador, aviso, exportar e importar
- [ ] **Bienvenida** del primer arranque
- [ ] **PWA:** instalable y funcionando sin internet
- [ ] Estados vacíos, accesibilidad con teclado y repaso general

## Fase 4 – Entrega

- [ ] Pedir a la profesora los recursos fijos de cada asignatura y precargarlos
- [ ] Publicar la app
- [ ] Instalarla en su portátil desde Chrome y configurar el archivo de copia
- [ ] Sesión de prueba con la profesora y lista de ajustes
- [ ] Corregir lo que salga de la prueba
- [ ] Añadir capturas al README

## Más adelante

Ideas ya anotadas para versiones futuras; el detalle está al final de la [especificación](spec/especificacion-v1.1.md#fuera-de-alcance-y-mejoras-futuras).

- Personalizar el horario: crear, eliminar y modificar asignaturas
- Copia en la nube con inicio de sesión (Supabase o Firebase)
- Alergias y contacto de emergencia en la ficha
- Guardar combinaciones de opciones para las listas
- Anular o sustituir varias sesiones a la vez
- Sincronización completa y uso desde el móvil (por evaluar)
