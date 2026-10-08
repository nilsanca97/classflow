# Normas de código y de arquitectura

Cómo se escribe y se organiza el código de ClassFlow. Son las normas que deben seguir los agentes (y cualquier persona) al implementar una tarea. El stack y sus motivos están en la [decisión 0001](decisions/0001-tech-stack.md).

Siempre que se pueda, una norma se hace cumplir con una herramienta (TypeScript, ESLint, pruebas o la integración continua) en lugar de confiar en que se recuerde. Las normas marcadas con **[auto]** las comprueba una herramienta.

## Principios

1. **Lo simple primero.** La solución más sencilla que cumple la especificación. Nada de abstracciones "por si acaso".
2. **Explícito antes que ingenioso.** Código que se entiende al leerlo una vez.
3. **Coherencia.** Si ya existe un patrón para algo, se reutiliza; no se inventa otro.
4. **La lógica, fuera de la interfaz.** Las reglas del negocio se escriben como funciones puras, sin React ni Supabase, para poder probarlas.
5. **Solo lo que pide la tarea.** No se tocan archivos ni se "mejora" código que la tarea no menciona.

## Estructura de carpetas

El código se organiza **por funcionalidad**, no por tipo de archivo.

```
src/
├── app/                  Arranque: App, rutas, proveedores, layout y barra superior
├── features/
│   ├── auth/             Registro, inicio de sesión y sesión
│   ├── planning/
│   │   ├── components/   Componentes de esta funcionalidad
│   │   ├── hooks/        Hooks de datos (TanStack Query) y de interfaz
│   │   ├── api/          Llamadas a Supabase y conversión de filas a tipos
│   │   ├── lib/          Lógica pura: cálculos y reglas, sin React ni Supabase
│   │   ├── copy.ts       Textos de la interfaz de esta funcionalidad
│   │   ├── types.ts      Tipos del dominio
│   │   └── index.ts      Lo único que se puede importar desde fuera
│   ├── lists/
│   ├── students/
│   └── settings/
├── shared/
│   ├── ui/               Componentes genéricos: Button, Modal, Menu, ConfirmDialog, SaveStatus, Skeleton…
│   ├── lib/              Utilidades: cliente de Supabase, fechas, cn
│   └── hooks/            Hooks genéricos (por ejemplo, estado de conexión)
├── types/
│   └── database.ts       Tipos generados a partir del esquema. No se editan a mano
└── styles/
    └── index.css         Tailwind y tokens del tema

supabase/
├── migrations/           Esquema, reglas de acceso y funciones, en SQL versionado
└── seed.sql              Datos de prueba, siempre inventados
```

Reglas de dependencia **[auto]**:

- Una funcionalidad **no importa el interior de otra**. Si necesita algo, lo importa desde su `index.ts`.
- `shared/` **no importa nunca** de `features/` ni de `app/`.
- Solo los archivos de `api/` importan el cliente de Supabase.

Una carpeta vacía no se crea: `hooks/` o `lib/` aparecen cuando hacen falta.

## Capas

Cada dato recorre el mismo camino:

| Capa | Dónde | Responsabilidad | No puede |
| --- | --- | --- | --- |
| Componente | `components/` | Mostrar datos y recoger acciones | Llamar a Supabase ni contener reglas del negocio |
| Hook | `hooks/` | Conectar el componente con los datos mediante TanStack Query | Contener SQL ni lógica de presentación |
| API | `api/` | Llamar a Supabase y convertir filas en tipos del dominio | Importar React |
| Lógica | `lib/` | Reglas puras: generar sesiones, detectar solapes, contar opciones… | Importar React ni Supabase |

- **Conversión de nombres en la capa API:** la base de datos usa `snake_case` y el código `camelCase`. Las filas se convierten a tipos del dominio en `api/`; un componente nunca ve una fila de la base de datos.
- **Errores en la capa API:** si Supabase devuelve un error, la función lo lanza. No se devuelve `null` para ocultarlo.

## TypeScript

- Modo estricto, con `noUncheckedIndexedAccess` activado. **[auto]**
- **Prohibido `any`.** Si un tipo es desconocido, se usa `unknown` y se comprueba. **[auto]**
- Sin aserciones `!` (non-null) ni `as` para callar errores, salvo con un comentario que explique por qué es seguro. **[auto]**
- **`type` en lugar de `interface`**, por coherencia.
- **Uniones de literales en lugar de `enum`**: `type View = 'day' | 'week' | 'month'`.
- **Fechas del calendario como texto `YYYY-MM-DD`**, no como `Date`. Una fecha sin hora guardada como `Date` cambia de día según la zona horaria, y el Planning trabaja con días. Las horas, como `HH:mm`.
- Los cálculos de fechas se hacen con `date-fns`, nunca a mano.
- Los tipos de la base de datos se generan; no se duplican a mano.

## React

- Solo **componentes de función**, uno por archivo, con sus props tipadas.
- **Exportaciones con nombre** (`export function WeekView`). Sin `export default`, salvo donde una herramienta lo exija. **[auto]**
- **Sin `useEffect` para cargar datos**: los datos se cargan con TanStack Query. `useEffect` se reserva para sincronizar con algo externo al componente.
- **El estado derivado se calcula**, no se guarda: si algo se puede calcular a partir de otros datos, no va en `useState`.
- El estado se mantiene lo más cerca posible de donde se usa. Sin librería de estado global.
- Un componente que pasa de unas 150 líneas o mezcla varias responsabilidades se divide.
- Las reglas de los hooks se cumplen. **[auto]**

## Datos y Supabase

- **Claves de consulta** con un formato fijo por funcionalidad, definidas en un único sitio de cada `api/`: por ejemplo `['planning', 'week', '2026-09-28']`.
- Después de una modificación, se **invalidan** las consultas afectadas para que la pantalla se actualice.
- **Guardado automático:** se agrupan los cambios de un campo de texto mientras se escribe (unos 800 ms) antes de guardar, y se muestran los estados "Saving…", "✓ Saved" y "Couldn't save · Retry" con el componente compartido `SaveStatus`.
- **Actualizaciones optimistas** solo donde la espera se notaría (por ejemplo, marcar una opción en una lista), y siempre deshaciendo el cambio si falla.
- **Esquema y reglas de acceso solo mediante migraciones** en `supabase/migrations/`. Cada tabla nueva lleva `user_id` y Row Level Security en la misma migración.
- Después de cambiar el esquema, se **regeneran los tipos** en `src/types/database.ts`.
- Solo la **clave pública** de Supabase en el frontend, leída de variables de entorno.

## Estados de la interfaz

Toda pantalla o bloque que carga datos contempla **cuatro casos**: cargando, error, vacío y con datos. El aspecto de cada uno está en el brief ("Estados del sistema").

- Cargando: componente compartido `Skeleton` con la forma del contenido.
- Error al cargar: mensaje y botón "Try again", que reintenta la consulta.
- Vacío: el estado vacío definido en el brief.
- Hay un **límite de errores** (Error Boundary) en el nivel de la app, para que un fallo inesperado no deje la pantalla en blanco.
- Sin conexión: los controles de edición se desactivan mediante un hook compartido de estado de conexión.

## Estilos con Tailwind

- **Los colores, tipografía, radios y sombras del brief se definen una vez como tokens del tema.** En el código se usan los tokens (`bg-cream`, `text-coral-700`), nunca valores sueltos como `bg-[#FBF8F2]`.
- **Los colores de las asignaturas y de las opciones no son clases de Tailwind:** se guardan como datos (el color elegido) y se aplican mediante variables CSS en el atributo `style`. Tailwind no detecta clases construidas en tiempo de ejecución (`bg-${color}`), así que nunca se construyen nombres de clase dinámicamente.
- Para combinar clases según condiciones se usa la utilidad `cn` (basada en `clsx` y `tailwind-merge`).
- Los patrones repetidos se convierten en **componentes de `shared/ui`**, no en clases personalizadas con `@apply`.
- Diseño para portátil: mínimo 1366 × 768, y que escale bien hasta 1920 × 1080.

## Textos de la interfaz

- Los textos se copian **exactamente** del brief.
- Viven en el `copy.ts` de cada funcionalidad (y en `shared/` los comunes), no repartidos por los componentes. Así se revisan en un solo sitio y la app queda preparada para traducirse en el futuro.
- Sin librería de traducciones en la v1.

## Accesibilidad

- Elementos semánticos: un botón es un `<button>`, un enlace es un `<a>`, y cada campo tiene su `<label>`.
- Todo se puede usar con teclado, con el foco visible.
- Las ventanas modales atrapan el foco, se cierran con Esc y devuelven el foco al elemento que las abrió.
- Los botones que solo tienen icono llevan `aria-label`.
- El color nunca es la única forma de transmitir información: las opciones de las listas llevan siempre su texto.
- Se activan las reglas de accesibilidad de ESLint para JSX. **[auto]**

## Nombres

| Elemento | Formato | Ejemplo |
| --- | --- | --- |
| Componentes y sus archivos | PascalCase | `WeekView.tsx`, `SessionModal.tsx` |
| Otros archivos | camelCase | `generateSessions.ts`, `copy.ts` |
| Hooks | `use` + nombre | `useWeekSessions` |
| Funciones | verbo + objeto | `getSessionData`, `cancelSession` |
| Booleanos | `is`, `has`, `can` | `isCancelled`, `hasNotes` |
| Props de evento / manejadores | `onX` / `handleX` | `onClose` / `handleClose` |
| Tipos | PascalCase, sin prefijos | `Session`, `ListOption` |
| Constantes globales | UPPER_SNAKE_CASE | `SCHOOL_YEAR_START` |
| Tablas y columnas | snake_case, tablas en plural | `students`, `list_entries`, `user_id` |
| Pruebas | junto al archivo, `.test.ts(x)` | `generateSessions.test.ts` |

Los nombres van en inglés y describen el dominio con las mismas palabras que la interfaz: `subject`, `session`, `resource`, `dayOff`, `option`, `student`.

## Pruebas

- **Toda la lógica de `lib/` tiene pruebas**, incluidos los casos límite de la especificación: generar las sesiones de una semana, la hora exacta del viernes, solapes al anular, días sin clase, conteo de opciones, alumnos dados de baja.
- **Los componentes con interacción importante** se prueban con Testing Library, desde el punto de vista de la usuaria: se buscan elementos por su rol y su texto, no por clases ni identificadores internos.
- Se prueba el **comportamiento**, no la implementación.
- **Sin pruebas de instantánea** (snapshots).
- En las pruebas de componentes, Supabase se simula en el límite de la capa `api/`; no se llama a la base de datos real.
- No se persigue un porcentaje de cobertura.
- Un error corregido lleva una prueba que lo habría detectado.

## Calidad automática

El proyecto tendrá estos comandos (los nombres exactos se fijarán al crearlo y se listarán en `AGENTS.md`):

| Comando | Comprueba |
| --- | --- |
| `typecheck` | Tipos de TypeScript |
| `lint` | Reglas de ESLint, incluidas las de dependencias entre carpetas y accesibilidad |
| `format:check` | Formato de Prettier (configuración por defecto) |
| `test` | Pruebas de Vitest |
| `build` | Que la app compila |

- La **integración continua** (GitHub Actions) ejecuta todos en cada *pull request*. No se fusiona nada con alguno en rojo.
- No se desactiva una regla de lint sin un comentario que explique el motivo.

## Dependencias

- Solo se usan las dependencias de la decisión de stack, más estas utilidades pequeñas: `clsx` y `tailwind-merge`.
- **Añadir, sustituir o actualizar a una versión mayor** cualquier dependencia requiere preguntar antes.
- Antes de añadir una librería, se comprueba si el problema se resuelve con lo que ya hay.

## Comentarios

- El código se explica con buenos nombres; un comentario explica **por qué**, no qué.
- Sin código comentado: si sobra, se borra (está en el historial de git).
- Los `TODO` llevan una referencia a la tarea o a la sección de la especificación.

## Cuándo una tarea está terminada

- [ ] Cumple todos los criterios de aceptación de la tarea.
- [ ] Sigue la especificación y el brief, con los textos exactos.
- [ ] Contempla los estados de carga, error, vacío y sin conexión que le correspondan.
- [ ] Tiene pruebas de la lógica nueva.
- [ ] `typecheck`, `lint`, `format:check`, `test` y `build` pasan.
- [ ] Si cambió el esquema: migración, Row Level Security y tipos regenerados.
- [ ] No hay datos reales, claves ni archivos exportados en el cambio.
- [ ] Se ha actualizado la documentación afectada (por ejemplo, `docs/plan.md`).
- [ ] El agente ha resumido qué archivos cambió y ha propuesto el mensaje de commit.
