# 0001 – Base del proyecto y controles de calidad

| | |
| --- | --- |
| **Estado** | Draft |
| **Rama** | `chore/0001-project-setup` |
| **Depende de** | — |

## Objetivo

El repositorio tiene un proyecto React + TypeScript + Vite + Tailwind que arranca y muestra una página mínima, con lint, formato, comprobación de tipos y pruebas configurados, y una integración continua que los ejecuta en cada *pull request*. Es la base sobre la que se construirán todas las demás tareas.

## Contexto

- Decisión de stack: [0001](../decisions/0001-tech-stack.md), tabla "Decisión".
- Normas: [Estructura de carpetas](../engineering-guidelines.md#estructura-de-carpetas), [TypeScript](../engineering-guidelines.md#typescript), [Estilos con Tailwind](../engineering-guidelines.md#estilos-con-tailwind), [Calidad automática](../engineering-guidelines.md#calidad-automática) y [Dependencias](../engineering-guidelines.md#dependencias).
- `AGENTS.md`: secciones "Tech stack", "Secrets" y "Commands".

Esta tarea no implementa ninguna funcionalidad de la especificación: prepara el terreno.

## Alcance

1. Crear el proyecto con Vite (plantilla React + TypeScript) en la raíz del repositorio, sin borrar ni mover la documentación existente.
2. Configurar TypeScript en modo estricto con `noUncheckedIndexedAccess`, y el alias de importación `@/` apuntando a `src/`.
3. Instalar y configurar Tailwind CSS, con su punto de entrada en `src/styles/index.css`. Sin tokens del brief todavía.
4. Configurar ESLint con:
    - Las reglas recomendadas de TypeScript, con `any` prohibido.
    - Las reglas de los hooks de React.
    - Las reglas de accesibilidad para JSX (`jsx-a11y`).
    - Prohibición de `export default` salvo en archivos de configuración.
    - Las reglas de dependencias entre carpetas de las normas: `shared/` no importa de `features/` ni de `app/`; una funcionalidad no importa el interior de otra; solo `api/` puede importar el cliente de Supabase.
5. Configurar Prettier con su configuración por defecto, compatible con ESLint.
6. Configurar Vitest y Testing Library, con entorno de navegador simulado (jsdom).
7. Crear los scripts de `package.json`: `dev`, `build`, `preview`, `typecheck`, `lint`, `format`, `format:check` y `test` (una ejecución, no en modo vigilancia).
8. Crear `src/shared/lib/cn.ts` (combinación de clases con `clsx` y `tailwind-merge`) con su prueba.
9. Sustituir la página de ejemplo de Vite por un `App` mínimo en `src/app/App.tsx` que muestre el texto "ClassFlow", con una prueba que lo compruebe.
10. Fijar la versión de Node.js en `.nvmrc` (la LTS activa) y en el campo `engines` de `package.json`.
11. Crear el flujo de GitHub Actions `.github/workflows/ci.yml`, que en cada *pull request* y en cada push a `main` instale dependencias con `npm ci` y ejecute `typecheck`, `lint`, `format:check`, `test` y `build`.
12. Actualizar `.gitignore` con lo que genere el proyecto (por ejemplo, `node_modules/` y `dist/` ya están; añadir lo que falte).
13. Completar la sección "Commands" de `AGENTS.md` y añadir un apartado "Getting started" al README con los comandos para instalar, arrancar y comprobar el proyecto.

## Fuera de alcance

- Supabase: ni cliente, ni variables de entorno, ni migraciones.
- Rutas (React Router), TanStack Query, `date-fns` e iconos: se instalan en la tarea que los use.
- Tokens del tema, fuentes y cualquier estilo del brief.
- Componentes de `shared/ui`, barra superior, layout o pantallas.
- Carpetas vacías de `features/`.
- Despliegue en Vercel y Playwright.

## Decisiones y restricciones

- Gestor de paquetes: **npm**, con `package-lock.json` en el repositorio.
- Versiones estables actuales de cada herramienta. Si una herramienta tiene dos formas de configurarse (por ejemplo, la configuración "flat" de ESLint), se usa la actual recomendada.
- Las únicas dependencias de ejecución permitidas en esta tarea son `react`, `react-dom`, `clsx` y `tailwind-merge`. Las herramientas de desarrollo necesarias para el alcance (Vite, TypeScript, Tailwind, ESLint y sus plugins, Prettier, Vitest, Testing Library, jsdom) están permitidas; cualquier otra se pregunta antes.
- Las reglas de dependencias entre carpetas se implementan con la opción más sencilla que funcione; si exige un plugin adicional, se pregunta antes.

## Criterios de aceptación

- [ ] `npm ci` instala sin errores en un clon limpio.
- [ ] `npm run dev` arranca la app y el navegador muestra "ClassFlow".
- [ ] `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run test` y `npm run build` pasan.
- [ ] Un `any` explícito en cualquier archivo hace fallar `lint`.
- [ ] Un `export default` en un componente hace fallar `lint`.
- [ ] Un import desde `src/shared/` a `src/features/` hace fallar `lint`.
- [ ] El flujo de GitHub Actions se ejecuta en un *pull request* y queda en verde.
- [ ] `AGENTS.md` y el README listan los comandos reales.
- [ ] La documentación de `docs/` no se ha modificado, salvo el estado de esta tarea y `docs/plan.md`.
- [ ] Se cumple la [definición de terminado](../engineering-guidelines.md#cuándo-una-tarea-está-terminada).

## Pruebas

- `cn` combina clases y resuelve conflictos de Tailwind (por ejemplo, `cn('p-2', 'p-4')` devuelve `p-4`).
- `App` muestra el texto "ClassFlow".

## Entrega

Al terminar, el agente:

1. Ejecuta los comandos de calidad y confirma que pasan.
2. Cambia el estado de esta tarea a In review.
3. Resume qué archivos ha creado o modificado y por qué.
4. Propone los mensajes de commit, agrupados por tema, con los archivos de cada uno.
5. No hace commit ni push.

## Preguntas abiertas

—
