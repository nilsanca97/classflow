# 0002 – Base visual: tema, barra superior y navegación

| | |
| --- | --- |
| **Estado** | Ready |
| **Rama** | `feat/0002-visual-foundation` |
| **Depende de** | [0001](0001-project-setup.md) |

## Objetivo

La app tiene el aspecto aprobado de ClassFlow: fondo crema, Nunito, colores del brief definidos como tokens del tema, favicon y la barra superior fija con las pestañas Planning, Lists y Students. Las pestañas navegan entre tres secciones todavía vacías, cada una con su URL.

## Contexto

- Brief:
  - [Estilo visual](../design/brief-v1.md#estilo-visual): colores base, tipografía, iconos y formas.
  - [Barra superior de la app](../design/brief-v1.md#barra-superior-de-la-app-fija-en-todas-las-pantallas).
  - [Principios de diseño](../design/brief-v1.md#principios-de-diseño).
- Diseño aprobado por la profesora: [`docs/design/tanda-1-week.html`](../design/tanda-1-week.html) (exportación de Claude Design, con el sistema de diseño y la vista semanal) y las capturas de [`docs/design/screens/`](../design/screens/). **De aquí salen las medidas** (alturas, márgenes, tamaños de letra) que el brief no fija.
- Especificación: [Resumen y alcance](../spec/especificacion-v1.4.md#resumen-y-alcance) (pantalla inicial: Planning).
- Decisiones: [0001](../decisions/0001-tech-stack.md) (React Router y `@tabler/icons-react`).
- Normas: [Estructura de carpetas](../engineering-guidelines.md#estructura-de-carpetas), [React](../engineering-guidelines.md#react), [Estilos con Tailwind](../engineering-guidelines.md#estilos-con-tailwind), [Textos de la interfaz](../engineering-guidelines.md#textos-de-la-interfaz), [Accesibilidad](../engineering-guidelines.md#accesibilidad) y [Pruebas](../engineering-guidelines.md#pruebas).

**Por qué importan los tokens:** la profesora todavía no ha probado la app, y es probable que más adelante se ajuste el estilo (colores, radios, sombras, aspecto de botones y ventanas). Ese cambio debe hacerse en **un solo sitio**: los tokens del tema en `src/styles/index.css` y, cuando existan, los componentes de `src/shared/ui`. Nada de valores de color, radio o sombra escritos directamente en los componentes.

## Alcance

1. **Tokens del tema** en `src/styles/index.css`, con `@theme` de Tailwind 4:
    - Todos los colores de la tabla "Colores base" del brief: crema, superficie, los tres textos, bordes, separadores, apagado, coral (fondo, texto y borde), aviso, correcto y destructivo.
    - La familia tipográfica Nunito como fuente por defecto de la app.
    - Los radios (8 px celdas y campos, 12 px tarjetas y ventanas, 999 px píldoras) y la sombra suave de ventanas y menús.
    - Nombres por **uso**, no por valor (por ejemplo, `cream`, `surface`, `text-primary`, `coral-bg`, `coral-text`, `coral-border`). El agente propone la lista completa de nombres en el plan.
2. **Estilos base:** fondo crema en `body`, texto principal en su color, Nunito, tamaño base 14 px y foco visible con teclado en todo lo pulsable.
3. **Nunito** desde Google Fonts, pesos 400, 500 y 600, con `preconnect` y `display=swap`, en `index.html`.
4. **Favicon** `public/favicon.svg`: cuadrado redondeado coral (#F5C4B3) con una "C" en coral oscuro (#712B13), enlazado desde `index.html`.
5. **Rutas** con React Router:
    - `/planning`, `/lists` y `/students`, cada una con su página.
    - `/` y cualquier ruta desconocida redirigen a `/planning`.
6. **Layout de la app** en `src/app/`: la barra superior arriba, fija al hacer scroll, y debajo el contenido de la ruta.
7. **Barra superior** en `src/app/`, según el brief y el HTML aprobado:
    - Izquierda: "ClassFlow" en coral oscuro.
    - Centro: las pestañas **Planning**, **Lists** y **Students** con su icono (Tabler: `calendar`, `list-check` y `users`). La activa, en píldora coral. Son enlaces (`NavLink`) dentro de un `<nav>` con `aria-label`, y la activa lleva `aria-current="page"`.
    - Derecha: **"Settings"** con icono `settings` y el **círculo de la cuenta** con una inicial (fondo #F1EFE8, texto #444441). Ver "Decisiones y restricciones".
8. **Páginas vacías:** `PlanningPage`, `ListsPage` y `StudentsPage`, cada una en su funcionalidad (`src/features/planning`, `lists`, `students`), exportada desde su `index.ts`. Solo muestran un `<h1>` con el nombre de la sección.
9. **Textos** de la barra superior y de las páginas en `copy.ts` (`src/app/copy.ts` y el `copy.ts` de cada funcionalidad).
10. **Pruebas** (ver "Pruebas").
11. **Plan:** al terminar, marcar "Base visual" en `docs/plan.md`.

## Fuera de alcance

- La ventana de Settings y sus secciones. El enlace "Settings" y el círculo de la cuenta se ven, pero todavía no abren nada.
- Inicio de sesión, cuenta real y Supabase: la inicial del círculo es provisional.
- La paleta de las 16 asignaturas y los colores de las categorías: sus nombres de paleta se fijan en la tarea de base de datos.
- El encabezado del Planning (fechas, "Add event", Day · Week · Month) y cualquier vista del Planning.
- Componentes de `shared/ui` que esta tarea no necesite (Button, Modal, Menu…): se crean en la primera tarea que los use, con los tokens de esta.
- Franja de sin conexión, estados de carga y Error Boundary.
- Despliegue en Vercel (y su configuración de rutas) y Playwright.

## Decisiones y restricciones

- **Dependencias de ejecución nuevas permitidas:** `react-router` y `@tabler/icons-react`. Cualquier otra se pregunta antes.
- Nunito se carga desde Google Fonts, sin paquete npm.
- **Sin colores, radios ni sombras escritos a mano** en los componentes (`bg-[#…]`, `rounded-[…]`, `style={{ color: … }}`): solo tokens del tema.
- **Enlace "Settings" y círculo de la cuenta:** son `<button>` con su texto o `aria-label` ("Settings", "Account"), sin acción por ahora. Llevan un `TODO` que remite a la tarea de Settings del plan.
- **Inicial del círculo:** constante provisional "L" en `src/app/copy.ts`, con un `TODO` que remite a la tarea de acceso.
- La barra superior no tiene botón "Subjects" ni ningún otro elemento que no esté en el brief.
- **Si el HTML aprobado y el brief se contradicen** en algo de esta tarea, el agente para y pregunta.
- Diseño para 1366 × 768 como mínimo; la barra no debe partir textos en dos líneas a ese ancho.

## Criterios de aceptación

- [ ] `npm run dev`: la app se ve con fondo crema, Nunito y el favicon coral en la pestaña del navegador.
- [ ] Al abrir `/` se muestra la sección Planning, con la pestaña Planning activa en coral.
- [ ] Pulsar Lists o Students cambia la URL (`/lists`, `/students`), la página y la pestaña activa, sin recargar la página.
- [ ] Una ruta desconocida (`/foo`) redirige a `/planning`.
- [ ] Las pestañas se recorren con Tab y se activan con Enter, con el foco visible.
- [ ] La barra superior se mantiene fija arriba al hacer scroll.
- [ ] A 1366 px y a 1920 px de ancho la barra coincide con el diseño aprobado, sin textos partidos.
- [ ] `grep` no encuentra valores de color hexadecimales en `src/` fuera de `src/styles/index.css`.
- [ ] Se cumple la [definición de terminado](../engineering-guidelines.md#cuándo-una-tarea-está-terminada).

## Pruebas

Con Testing Library, buscando por rol y texto:

- La barra superior muestra "ClassFlow", las tres pestañas, "Settings" y el círculo de la cuenta.
- En `/` se ve la página Planning y su pestaña tiene `aria-current="page"`.
- Pulsar "Lists" muestra la página Lists y mueve `aria-current` a su pestaña. Igual con "Students".
- Una ruta desconocida muestra la página Planning.

La prueba actual de `App` se sustituye o adapta, usando `getByRole` (deuda técnica anotada en el plan).

## Entrega

Al terminar, el agente:

1. Ejecuta los comandos de calidad y confirma que pasan.
2. Cambia el estado de esta tarea a In review.
3. Resume qué archivos ha creado o modificado y por qué, con la lista final de tokens.
4. Propone los mensajes de commit, agrupados por tema, con los archivos de cada uno.
5. No hace commit ni push.

## Preguntas abiertas

—
