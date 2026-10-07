# ClassFlow

A web app that helps a primary school teacher organise her class: a weekly planner with resources and notes for each lesson, student lists with custom options, and basic student profiles.

> **Status:** specification and design phase. The tech stack is decided, but there is no application code yet.

## Why this project

ClassFlow is being built for a real primary school teacher who wanted something *pretty but simple* to replace her paper timetable and loose checklists. She is not comfortable with technology, so ease of use comes first: few options on screen, obvious actions, clear wording and no unnecessary steps.

It is also a learning project. The repository keeps the full trail, from the first specification to the design decisions and, later, the code.

## What it does

| Section | What it is for |
| --- | --- |
| **Planning** | The class timetable as a calendar, in day, week and month views. Each lesson holds its own links (Google Drive, YouTube or any URL) and notes. Subjects can have fixed links that show in every lesson. Supports days off, cancelled lessons and one-off events. |
| **Lists** | Checklists of students for permissions, payments, homework and similar. Each list has its own options (for example Yes / No / Pending), a category and a live count per option. |
| **Students** | A basic profile for each of the roughly 25 students, with search and a simple filter. |
| **Settings** | Subject colours and fixed links, the account, and data export. |

## Key decisions

- **One teacher per account, one class, one school year** (2026–2027). The data model is ready for more teachers later.
- **Passwordless sign-in** with a link sent by email. In version 1 only invited emails can sign up.
- **Data in the cloud**, so the app works from any device with the same account. It needs an internet connection.
- **Each teacher can only access her own data**, enforced by the database.
- **Minimal student data:** first name, birthday without the year, a bus flag and practical notes. No allergies and no emergency contacts.
- **Interface in English**, designed for a laptop screen.

## Tech stack

| Area | Choice |
| --- | --- |
| Frontend | React, TypeScript (strict), Vite and Tailwind CSS |
| Data and auth | Supabase (Postgres, Row Level Security, email-link sign-in) |
| Data fetching | TanStack Query |
| Testing | Vitest and Testing Library |
| Code quality | ESLint, Prettier and GitHub Actions |
| Hosting | Vercel |

The reasons, the trade-offs and the alternatives that were ruled out are in the [tech stack decision](docs/decisions/0001-tech-stack.md).

## Documentation

The documents are written in Spanish.

| Document | Description |
| --- | --- |
| [Specification v1.2](docs/spec/especificacion-v1.2.md) | Current functional specification |
| [Specification changelog](docs/spec/CHANGELOG.md) | What changed between versions, and why. Earlier versions are kept unchanged in the same folder |
| [Design brief](docs/design/brief-v1.md) | Visual style, colour palettes, navigation and every screen in detail |
| [Tech stack decision](docs/decisions/0001-tech-stack.md) | The chosen stack, with pros, cons and discarded alternatives |
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
    ├── design/            Design brief
    └── decisions/         Technical decisions, one file each
```

## Roadmap

- [x] Functional specification
- [x] Design brief
- [x] Tech stack decision
- [ ] Engineering guidelines
- [ ] Design system and screen designs
- [ ] Implementation
- [ ] Delivery to the teacher

The detailed plan is in [docs/plan.md](docs/plan.md). Ideas left for later versions are listed at the end of the [specification](docs/spec/especificacion-v1.2.md#fuera-de-alcance-y-mejoras-futuras).

## Privacy

This repository contains no real student data. Every name and example in the documents and designs is made up.
