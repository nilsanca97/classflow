# AGENTS.md

Instructions for AI coding agents working in this repository.

## Project

ClassFlow is a web app for a primary school teacher to organise her class: a planner with resources and notes for each lesson, student lists with custom options, and basic student profiles.

The project is in the **specification and design phase**. The tech stack is decided, but **there is no application code yet**. Do not scaffold the project or install dependencies unless a task asks for it.

## Read first

| Document | Use it for |
| --- | --- |
| `docs/project-context.md` | Who the user is, goals, constraints and glossary |
| `docs/spec/especificacion-v1.2.md` | What the app does. This is the source of truth for behaviour. Always use the highest version in `docs/spec/` |
| `docs/design/brief-v1.md` | How it looks and behaves on screen: colours, typography, every screen and the exact UI copy |
| `docs/decisions/` | Technical decisions and their reasons. Start with `0001-tech-stack.md` |
| `docs/plan.md` | Current phase and what comes next |

If the specification and the brief disagree, the brief wins on visual and interaction details and the specification wins on behaviour. If something is not covered by either, ask instead of inventing it.

## Tech stack

Decided in `docs/decisions/0001-tech-stack.md`. Do not add, replace or upgrade a major dependency without asking.

- **Frontend:** React, TypeScript in strict mode, Vite, Tailwind CSS.
- **Data and auth:** Supabase (Postgres, Row Level Security, email-link sign-in).
- **Data fetching:** TanStack Query.
- **Routing:** React Router.
- **Utilities:** `date-fns` for dates, `@tabler/icons-react` for icons.
- **Testing:** Vitest and Testing Library. Playwright will be added later.
- **Quality:** ESLint, Prettier, GitHub Actions.
- **Hosting:** Vercel.
- **Runtime:** Node.js LTS and npm.

Not in version 1: no state management library, no component library, no PWA or offline support.

## Product rules

- **Ease of use comes first.** The teacher is not comfortable with technology: few options on screen, obvious actions, clear wording, no unnecessary steps.
- **Stay within scope.** Do not add features, settings or screens that are not in the specification. Items listed as future or discarded stay out.
- **Follow the shared patterns:** centred modal windows, a "⋯" menu for secondary actions, autosave for edits, and a confirmation for anything destructive.
- **Handle the system states** defined in the brief on every screen: loading, saving, save failed, load failed and offline. Never show something as saved when it is not.
- **Use the exact UI copy** from the brief. Do not reword labels or messages.

## Data rules

- **Components never call Supabase directly.** All data access goes through the data layer.
- **Every table has a `user_id` and Row Level Security.** A user can only read and write her own rows. Never rely on the frontend to filter by user.
- **The schema lives in the repository** as SQL migrations in `supabase/migrations/`. Never change the database by hand from the dashboard.
- **TypeScript types are generated from the schema.** Do not write them by hand.
- **Sessions are computed, not stored.** They are derived from the base timetable and the date; only what the teacher adds to a session is stored.
- **Seed data, not hardcoded data.** The teacher's timetable is loaded as initial data for her account, not written into the code.

## Secrets

- Only the Supabase **public (anon) key** may be used in the frontend.
- The service role key must never appear in the code, the repository, the logs or an example file.
- Configuration goes in environment variables. `.env` files are ignored by git; keep `.env.example` up to date, without real values.

## Languages

- **UI text:** English.
- **Documentation in `docs/`:** Spanish.
- **README, AGENTS.md, code, comments, commit messages and branch names:** English.
- Talk to the author in Spanish.

## Privacy

This repository is public, and the app stores data about children.

- Never commit real data about students, families or the teacher.
- Use made-up names in examples, tests, fixtures, seed files and screenshots.
- Never commit exported ClassFlow data files; they are covered by `.gitignore`.
- Student records hold only a first name, a birthday without the year, a bus flag and practical notes. Do not add fields such as surname, year of birth, allergies or contacts.
- Do not add analytics, tracking or third-party scripts.

## Documentation rules

- **Specification versions are immutable.** Never edit a published `especificacion-vX.Y.md`. To change the specification, create the next version as a new file and add an entry to `docs/spec/CHANGELOG.md` saying what changed and why.
- Keep the specification and the brief consistent with each other. If a change affects both, update both in the same branch.
- File names are lowercase, with hyphens, and without spaces or accents.
- Technical decisions go in `docs/decisions/`, one numbered file per decision.
- Update `docs/plan.md` when a task is finished.

## Git

- `main` is always stable. Do not commit to it directly; work on a branch and merge.
- One branch per code task, with a prefix: `feat/...`, `fix/...`, `refactor/...`, `chore/...`. Documentation can share a single `docs` branch.
- Commit messages are in English and follow `type: short summary`, with these types: `docs`, `design`, `feat`, `fix`, `refactor`, `test`, `chore`. Add a short body when the reason is not obvious.
- One topic per commit.
- **Do not add AI attribution to commits:** no `Co-Authored-By` lines and no session links.
- **The author commits and pushes.** Do not run `git commit` or `git push`. When a change is ready, say which files changed and propose a commit message.
- Do not rewrite history that has already been pushed.

## Commands

None yet: the project has not been scaffolded. Once it is, list here how to install, run, test, lint, type-check and build, and how to run the database migrations.
