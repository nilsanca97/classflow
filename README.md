# ClassFlow

A web app that helps a primary school teacher organise her class: a weekly planner with resources and notes for each lesson, student lists with custom options, and basic student profiles.

> **Status:** specification and design phase. There is no application code yet; the tech stack is still to be decided.

## Why this project

ClassFlow is being built for a real primary school teacher who wanted something *pretty but simple* to replace her paper timetable and loose checklists. She is not comfortable with technology, so ease of use comes first: few options on screen, obvious actions, clear wording and no unnecessary steps.

It is also a learning project. The repository keeps the full trail, from the first specification to the design decisions and, later, the code.

## What it does

| Section | What it is for |
| --- | --- |
| **Planning** | The class timetable as a calendar, in day, week and month views. Each lesson holds its own links (Google Drive, YouTube or any URL) and notes. Subjects can have fixed links that show in every lesson. Supports days off, cancelled lessons and one-off events. |
| **Lists** | Checklists of students for permissions, payments, homework and similar. Each list has its own options (for example Yes / No / Pending), a category and a live count per option. |
| **Students** | A basic profile for each of the roughly 25 students, with search and a simple filter. |
| **Settings** | Subject colours, fixed links and backups. |

## Key decisions

- **One teacher, one class, one school year** (2026–2027). No accounts and no login.
- **Local-first.** A single-page app installable as a PWA. Data is stored in the browser (IndexedDB) and never leaves the teacher's computer.
- **Automatic backups to a local file**, plus manual export and import.
- **No sensitive student data** in version 1: no allergies and no emergency contacts.
- **Interface in English**, designed for a laptop screen.

## Documentation

The documents are written in Spanish.

| Document | Description |
| --- | --- |
| [Specification v1.1](docs/spec/especificacion-v1.1.md) | Current functional specification |
| [Specification changelog](docs/spec/CHANGELOG.md) | What changed between versions, and why |
| [Specification v1.0](docs/spec/especificacion-v1.0.md) | Original specification, kept unchanged as a record |
| [Design brief](docs/design/brief-v1.md) | Visual style, colour palettes, navigation and every screen in detail |
| [Project context](docs/project-context.md) | Who the app is for, goals, constraints and glossary |
| [Plan](docs/plan.md) | Phases and tasks, from documentation to delivery |

## Repository structure

```
classflow/
├── README.md
├── AGENTS.md              Instructions for AI coding agents
├── CLAUDE.md              Points Claude Code to AGENTS.md
└── docs/
    ├── project-context.md
    ├── plan.md
    ├── spec/              Functional specification, one file per version, and its changelog
    └── design/            Design brief
```

## Roadmap

- [x] Functional specification
- [x] Design brief
- [ ] Design system and screen designs
- [ ] Tech stack decision
- [ ] Implementation

The detailed plan is in [docs/plan.md](docs/plan.md). Ideas left for later versions are listed at the end of the [specification](docs/spec/especificacion-v1.1.md#fuera-de-alcance-y-mejoras-futuras).

## Privacy

This repository contains no real student data. Every name and example in the documents and designs is made up.
