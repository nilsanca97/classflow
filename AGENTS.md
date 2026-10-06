# AGENTS.md

Instructions for AI coding agents working in this repository.

## Project

ClassFlow is a web app for one primary school teacher to organise her class: a planner with resources and notes for each lesson, student lists with custom options, and basic student profiles.

The project is in the **specification and design phase**. There is no application code yet and **the tech stack has not been chosen**. Do not assume a framework, a language or a package manager, and do not scaffold a project unless asked to.

## Read first

| Document | Use it for |
| --- | --- |
| `docs/project-context.md` | Who the user is, goals, constraints and glossary |
| `docs/spec/especificacion-v1.1.md` | What the app does. This is the source of truth for behaviour |
| `docs/design/brief-v1.md` | How it looks and behaves on screen: colours, typography, every screen and the exact UI copy |
| `docs/plan.md` | Current phase and what comes next |

If the specification and the brief disagree on something visual or about interaction, the brief wins. If something is not covered by either, ask instead of inventing it.

## Product rules

- **Ease of use comes first.** The teacher is not comfortable with technology: few options on screen, obvious actions, clear wording, no unnecessary steps.
- **Stay within scope.** Do not add features, settings or screens that are not in the specification. Items listed as future or discarded stay out.
- **Local-first.** Data lives in the browser (IndexedDB). No server, no cloud, no login and no analytics in version 1. Keep the data layer separate from the UI so it can move to the cloud later.
- **Follow the shared patterns:** centred modal windows, a "⋯" menu for secondary actions, autosave for edits, and a confirmation for anything destructive.
- **Use the exact UI copy** from the brief. Do not reword labels or messages.

## Languages

- **UI text:** English.
- **Documentation in `docs/`:** Spanish.
- **README, AGENTS.md, code, comments, commit messages and branch names:** English.
- Talk to the author in Spanish.

## Privacy

This repository is public.

- Never commit real data about students, families or the teacher.
- Use made-up names in examples, tests, fixtures and screenshots.
- Never commit ClassFlow backup files; they are covered by `.gitignore`.
- Version 1 stores no sensitive student data (no allergies, no emergency contacts). Do not add such fields.

## Documentation rules

- **Specification versions are immutable.** Never edit a published `especificacion-vX.Y.md`. To change the specification, create the next version as a new file and add an entry to `docs/spec/CHANGELOG.md` saying what changed and why.
- Keep the specification and the brief consistent with each other. If a change affects both, update both in the same branch.
- File names are lowercase, with hyphens, and without spaces or accents.
- Technical decisions go in `docs/decisions/`, one file per decision.
- Update `docs/plan.md` when a task is finished.

## Git

- `main` is always stable. Do not commit to it directly; work on a branch and merge.
- One branch per task, with a prefix: `docs/...`, `design/...`, `feat/...`, `fix/...`.
- Commit messages are in English and follow `type: short summary`, with these types: `docs`, `design`, `feat`, `fix`, `refactor`, `test`, `chore`. Add a short body when the reason is not obvious.
- **Do not add AI attribution to commits:** no `Co-Authored-By` lines and no session links.
- Do not rewrite history that has already been pushed.
- Do not push unless asked to.

## Commands

None yet. Once the stack is chosen, list here how to install, run, test, lint and build the project.
