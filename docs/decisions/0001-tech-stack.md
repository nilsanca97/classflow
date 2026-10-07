# 0001 – Stack tecnológico

| | |
| --- | --- |
| **Estado** | Aceptada |
| **Fecha** | 7 de octubre de 2026 |
| **Afecta a** | Especificación (requiere una v1.2), brief de diseño, `AGENTS.md`, README, contexto y plan |

## Contexto

La especificación v1.1 planteaba una app **solo local**: datos en el navegador (IndexedDB), sin servidor ni inicio de sesión, y copias de seguridad a un archivo del ordenador.

Al decidir el stack se revisó ese planteamiento, por tres motivos:

- **La visión del proyecto ha cambiado.** La profesora querrá usar la app también desde el móvil y desde su ordenador personal, y el objetivo a medio plazo es que sirva a más profesoras, cada una con su horario y sus datos. Eso exige inicio de sesión y datos en la nube.
- **El portátil es del colegio.** En un equipo gestionado por el centro, los datos del navegador se pueden perder si lo reinstalan, y la copia a archivo estaría en ese mismo portátil.
- **Se evita construir dos veces.** La copia automática a archivo y sus permisos eran la parte más delicada de la v1 y habría que descartarla al pasar a la nube.

En el aula hay buena conexión a internet, así que depender de ella es aceptable.

## Decisión

Los datos pasan a guardarse **en la nube desde la v1, con inicio de sesión**. La app deja de funcionar sin conexión.

| Pieza | Elección | Ventajas | Inconvenientes |
| --- | --- | --- | --- |
| Framework | React + Vite | Conocido por el autor, muy demandado, genera archivos estáticos | No impone estructura: hay que fijarla en las normas de código |
| Lenguaje | TypeScript en modo estricto | Detecta errores antes de ejecutar; verificación automática para los agentes | Algo más de código y errores de tipos a veces difíciles de leer |
| Estilos | Tailwind CSS | Rápido, muy demandado; los colores del brief se definen una vez como tema | Marcado cargado de clases; se aprende menos CSS |
| Datos | Supabase (Postgres) | Modelo relacional, que es el de la app; SQL; copias y acceso desde varios dispositivos resueltos | Necesita internet; dependencia de un servicio externo |
| Autenticación | Supabase Auth | Integrada con la base de datos y con las reglas de acceso por usuaria | Añade un paso de entrada para una usuaria poco tecnológica |
| Acceso a datos | TanStack Query sobre el cliente de Supabase | Caché, estados de carga y error, y refresco de datos sin escribirlo a mano | Una librería más que aprender |
| Estado de la interfaz | Estado de React, sin librería | Menos piezas; los datos del servidor los gestiona TanStack Query | Si la app creciera mucho, habría que añadir una |
| Rutas | React Router | Estándar; cada apartado y vista tiene su URL | Una dependencia más para pocos apartados |
| Iconos | `@tabler/icons-react` | El brief ya especifica Tabler Icons | — |
| Fechas | `date-fns` | El Planning hace muchos cálculos de semanas y fechas | — |
| Pruebas | Vitest + Testing Library | Estándar con Vite; cubre la lógica y los componentes | No prueba flujos completos en un navegador real |
| Calidad | ESLint + Prettier, y GitHub Actions | Hacen cumplir las normas sin vigilancia manual | Configuración inicial |
| Publicación | Vercel | Gratis, con HTTPS, sin subruta y con vista previa por rama; conocido por el autor | Otro servicio externo |
| Entorno | Node.js LTS y npm | Opción por defecto, sin herramientas extra | — |

**Pruebas de extremo a extremo:** se añadirá Playwright cuando haya dos o tres flujos completos funcionando. No se incluye desde el principio por su coste de mantenimiento.

**PWA:** no se incluye en la v1. Al depender de la nube, el uso sin conexión deja de ser un objetivo. La app se usa como una web normal en el navegador.

## Datos en detalle

### Modelo

- El modelo es **relacional**: asignaturas, bloques del horario, recursos, datos de sesiones, eventos, días sin clase, alumnos, listas, opciones y respuestas, conectados por claves ajenas.
- **Las sesiones no se guardan: se calculan** a partir del horario base y la fecha. Solo se almacena lo que la profesora añade a una sesión concreta (recursos del día, notas, anulación).
- **Cada tabla lleva el identificador de su usuaria** (`user_id`). En la v1 hay una sola profesora, pero el esquema queda preparado para más.
- El horario de la profesora se carga como **datos iniciales de su cuenta**, no dentro del código. La pantalla para editarlo sigue siendo una mejora futura.
- De cada alumno se guarda el **cumpleaños (día y mes), sin el año**, para reducir los datos personales en la nube.
- **Exportar los datos:** la v1 incluye un "Export my data" que descarga todos los datos de la cuenta en un archivo, como salvaguarda.

### Seguridad

- **Row Level Security** activada en todas las tablas: cada usuaria solo puede leer y escribir sus propias filas. Es la base de datos quien lo garantiza, no el frontend.
- **Registro con lista de correos autorizados en la v1:** la profesora se registra ella misma con su nombre y su correo, pero solo pueden hacerlo los correos de la lista. El autor no crea cuentas a mano. La lista se retirará cuando exista el editor de horario, porque hasta entonces una cuenta nueva no tendría horario.
- **Inicio de sesión por enlace enviado al correo**, sin contraseña y con sesión de larga duración, para que la profesora solo lo haga una vez por dispositivo. Entrar con Google queda como mejora futura.
- En el frontend solo se usa la **clave pública** de Supabase. La clave de servicio nunca va en el código ni en el repositorio.
- Las claves y direcciones van en variables de entorno (`.env`, excluido en `.gitignore`), con un `.env.example` sin valores reales.
- El proyecto de Supabase se crea en una **región de la Unión Europea**.

### Organización del código

- **Capa de datos separada:** los componentes no llaman a Supabase directamente; lo hacen a través de funciones de la capa de datos.
- **El esquema vive en el repositorio**, como migraciones SQL versionadas en `supabase/migrations/`. No se cambia la base de datos a mano desde el panel.
- **Tipos de TypeScript generados** a partir del esquema, para que el código y la base de datos no se desincronicen.

## Alternativas descartadas

| Pieza | Alternativa | Por qué se descarta |
| --- | --- | --- |
| Framework | Angular | Conocido y con estructura hecha, pero pesado para esta app y menos demandado en puestos junior |
| Framework | Next.js | Su valor está en el renderizado en servidor, que esta app no necesita |
| Framework | Svelte o Vue | Buenas opciones, pero nuevas para el autor y con menos visibilidad en el portafolio |
| Lenguaje | JavaScript | Se pierde la comprobación de tipos, principal red de seguridad con agentes |
| Estilos | CSS Modules | El CSS no lo escribirá el autor a mano, y Tailwind es más demandado |
| Estilos | Librería de componentes (MUI, Chakra) | Imponen su aspecto; el brief define un estilo propio |
| Datos | Solo local: Dexie sobre IndexedDB | Era la opción de la especificación v1.1. No cubre varios dispositivos ni varias usuarias, es frágil en un portátil del colegio y obligaría a rehacer la capa de datos |
| Datos | Un único documento JSON en el navegador | Lo más simple, pero con los mismos límites que la opción anterior y sin consultas |
| Datos | SQLite en el navegador | SQL real, pero sigue siendo local y es complejo de configurar |
| Datos | Firebase (Firestore) | Es documental; el modelo de la app es relacional y obligaría a duplicar datos |
| Datos | Backend propio (FastAPI o Spring Boot) | Conocidos por el autor, pero añaden un servidor que mantener y alejan el foco del frontend |
| Estado | Redux o Zustand | Los datos viven en el servidor; TanStack Query cubre esa necesidad |
| Pruebas | Jest | Necesita configuración extra con Vite; Vitest es su equivalente nativo |
| Pruebas | Cypress | Comparable a Playwright, que es más rápido y se añadirá más adelante |
| Publicación | GitHub Pages | Sirve desde una subruta, fuente habitual de problemas con las rutas |

## Consecuencias

**Lo que se gana**

- Uso desde varios dispositivos y base preparada para varias profesoras.
- Los datos no dependen de un navegador ni de un portátil concretos.
- Desaparece la parte más compleja de la v1: la copia automática a archivo, sus permisos y sus avisos.

**Lo que se pierde o cuesta**

- La app necesita internet.
- Aparece el inicio de sesión.
- Los datos de los alumnos salen del ordenador de la profesora.

**Documentos que hay que actualizar**

- **Especificación v1.2:** registro e inicio de sesión, datos en la nube, exportación de datos, sin copias a archivo ni PWA, cumpleaños sin año, y "varios usuarios" pasa de descartado a futuro.
- **Brief de diseño:** la bienvenida pasa a ser el inicio de sesión; desaparecen el indicador de copia, el aviso de copia pendiente y Settings → Backup; hacen falta estados de carga, de error y de falta de conexión.
- **`AGENTS.md`, README, contexto y plan:** stack, comandos y fases.

## Cuestiones abiertas

- **Datos de los alumnos en la nube.** La ficha guarda el nombre, el cumpleaños (día y mes), si va en bus y observaciones, con un aviso para que no se escriban datos sensibles. Aunque no hay apellidos ni año de nacimiento, los datos siguen asociados a la cuenta de una profesora de un colegio concreto. Conviene confirmar con el colegio que está permitido.
- **Plan gratuito de Supabase.** Comprobar sus límites antes de la entrega; en particular, si los proyectos sin actividad se pausan, lo que afectaría a las vacaciones escolares.
- **Licencia del repositorio.**
