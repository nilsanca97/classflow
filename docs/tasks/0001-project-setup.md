# 0001 – Base del proyecto y controles de calidad

| | |
| --- | --- |
| **Estado** | In review |
| **Rama** | `chore/0001-project-setup` |
| **Depende de** | — |

## Objetivo

El repositorio tiene un proyecto React + TypeScript + Vite + Tailwind que arranca y muestra una página mínima, con lint, formato, comprobación de tipos y pruebas configurados, y una integración continua que los ejecuta en cada *pull request*. Es la base técnica sobre la que se construirán todas las demás tareas.

## Contexto

- Decisión de stack: [0001](../decisions/0001-tech-stack.md), tabla "Decisión".
- Normas: [Estructura de carpetas](../engineering-guidelines.md#estructura-de-carpetas), [TypeScript](../engineering-guidelines.md#typescript), [Estilos con Tailwind](../engineering-guidelines.md#estilos-con-tailwind), [Calidad automática](../engineering-guidelines.md#calidad-automática) y [Dependencias](../engineering-guidelines.md#dependencias).
- `AGENTS.md`: secciones "Tech stack", "Secrets" y "Commands".

Esta tarea no implementa ninguna funcionalidad de la especificación: prepara el terreno. El autor trabaja en Windows; el proyecto debe funcionar igual en Windows y en la integración continua (Linux).

## Alcance

1. **Crear el proyecto** con Vite (plantilla React + TypeScript) en la raíz del repositorio, sin borrar, mover ni sobrescribir la documentación existente (`README.md`, `AGENTS.md`, `CLAUDE.md`, `docs/`).
2. **Limpiar la plantilla:** `src/main.tsx` se queda como punto de entrada; se borran los logos, `App.css`, la carpeta de recursos de ejemplo y `public/vite.svg`. En `index.html`, título "ClassFlow" y `lang="en"`.
3. **TypeScript** en modo estricto, con `noUncheckedIndexedAccess`, y el alias de importación `@/` apuntando a `src/`, configurado tanto en TypeScript como en Vite y Vitest.
4. **Tailwind CSS**, con su punto de entrada en `src/styles/index.css`. Sin tokens del brief todavía.
5. **ESLint**, con:
    - Las reglas recomendadas de TypeScript, con `any` prohibido.
    - Las reglas de los hooks de React.
    - Las reglas de accesibilidad para JSX (`eslint-plugin-jsx-a11y`).
    - Prohibición de `export default`, salvo en archivos de configuración.
    - Las reglas de dependencias entre carpetas de las normas, con `eslint-plugin-boundaries`: `shared/` no importa de `features/` ni de `app/`; una funcionalidad solo importa de otra a través de su `index.ts`.
    - Solo los archivos de una carpeta `api/` pueden importar `@supabase/supabase-js` (con `no-restricted-imports`; el paquete no se instala en esta tarea).
6. **Prettier** con su configuración por defecto, compatible con ESLint y con `prettier-plugin-tailwindcss` para ordenar las clases. Un `.prettierignore` excluye `docs/`, los archivos Markdown de la raíz, `dist/` y `package-lock.json`: **Prettier solo se aplica al código y a la configuración**.
7. **Saltos de línea:** un `.gitattributes` con `* text=auto eol=lf`, y Prettier configurado con fin de línea LF, para que `format:check` dé el mismo resultado en Windows y en la integración continua.
8. **Vitest y Testing Library**, con entorno jsdom y los comprobadores de `@testing-library/jest-dom` disponibles en todas las pruebas.
9. **Scripts** de `package.json`: `dev`, `build`, `preview`, `typecheck`, `lint`, `format`, `format:check` y `test` (una sola ejecución, no en modo vigilancia).
10. **`src/shared/lib/cn.ts`**: combina clases con `clsx` y `tailwind-merge`. Con su prueba.
11. **`App` mínimo** en `src/app/App.tsx` que muestre el texto "ClassFlow", con una prueba que lo compruebe.
12. **Node.js 24:** `.nvmrc` con `24` y, en `package.json`, `"engines": { "node": ">=24 <25" }`.
13. **Integración continua:** `.github/workflows/ci.yml`, que en cada *pull request* y en cada push a `main` use la versión de `.nvmrc`, instale con `npm ci` y ejecute `typecheck`, `lint`, `format:check`, `test` y `build`.
14. **`.gitignore`:** añadir lo que genere el proyecto y falte (por ejemplo, `*.tsbuildinfo` o `coverage/`).
15. **Documentar los comandos:** completar la sección "Commands" de `AGENTS.md` y añadir al README un apartado "Getting started" con los pasos para instalar, arrancar y comprobar el proyecto.
16. **Plan:** al terminar, marcar en `docs/plan.md` la tarea "Base técnica".

## Fuera de alcance

- Supabase: ni el paquete, ni el cliente, ni variables de entorno, ni migraciones.
- Rutas (React Router), TanStack Query, `date-fns` e iconos: se instalan en la tarea que los use.
- Tokens del tema, fuentes y cualquier estilo del brief.
- Componentes de `shared/ui`, barra superior, layout o pantallas.
- Carpetas vacías de `features/`.
- Despliegue en Vercel y Playwright.
- Formatear o modificar los documentos de `docs/`, salvo lo indicado en el alcance.

## Decisiones y restricciones

- Gestor de paquetes: **npm**, con `package-lock.json` en el repositorio.
- Node.js **24**.
- Versiones estables actuales de cada herramienta. Si una herramienta tiene dos formas de configurarse (por ejemplo, la configuración "flat" de ESLint), se usa la recomendada actualmente.
- **Dependencias de ejecución permitidas:** `react`, `react-dom`, `clsx` y `tailwind-merge`.
- **Dependencias de desarrollo permitidas:** Vite y su plugin de React, TypeScript, Tailwind CSS y su integración con Vite, ESLint con sus plugins de TypeScript, React Hooks, React Refresh, `jsx-a11y` y `boundaries`, la integración de ESLint con Prettier, Prettier, `prettier-plugin-tailwindcss`, Vitest, jsdom, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event` y los tipos necesarios (`@types/...`).
- Cualquier otra dependencia se pregunta antes de instalarla.

## Criterios de aceptación

- [ ] `npm ci` instala sin errores en un clon limpio.
- [ ] `npm run dev` arranca la app y el navegador muestra "ClassFlow", con el título de pestaña "ClassFlow".
- [ ] `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run test` y `npm run build` pasan.
- [ ] `npm run format:check` no revisa ni modifica nada dentro de `docs/`.
- [ ] El agente ha comprobado, con cambios temporales que después ha deshecho, que `lint` falla con:
    - un `any` explícito;
    - un `export default` en un componente;
    - un import desde `src/shared/` a `src/features/`;
    - un import de `@supabase/supabase-js` fuera de una carpeta `api/`.
- [ ] No queda ningún resto de la plantilla de Vite.
- [ ] El flujo de GitHub Actions se ejecuta en un *pull request* y queda en verde.
- [ ] `AGENTS.md` y el README listan los comandos reales.
- [ ] Se cumple la [definición de terminado](../engineering-guidelines.md#cuándo-una-tarea-está-terminada).

## Pruebas

- `cn` combina clases y resuelve conflictos de Tailwind (por ejemplo, `cn('p-2', 'p-4')` devuelve `p-4`).
- `App` muestra el texto "ClassFlow".

## Entrega

Al terminar, el agente:

1. Ejecuta los comandos de calidad y confirma que pasan.
2. Explica cómo comprobó cada uno de los cuatro casos en que `lint` debe fallar.
3. Cambia el estado de esta tarea a In review.
4. Resume qué archivos ha creado o modificado y por qué.
5. Propone los mensajes de commit, agrupados por tema, con los archivos de cada uno.
6. No hace commit ni push.

## Preguntas abiertas

—
