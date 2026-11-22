# Stage + OpenSpec Skills

Three repo-local skills that help coding agents use a **two-level delivery model**:

- a **Stage** owns the program: scope, authorization, acceptance criteria, evidence, and exit;
- an **OpenSpec change** owns one behavior delta: proposal, delta specs, design/tasks, and archive.

The skills are instructions, not a framework. They do not add a runtime dependency, a server, or a second source of truth. The generated repository files are the rules; the skills only help an agent follow them.

## Why this exists

A single "write a spec" workflow usually breaks in one of two ways:

1. every feature becomes a tiny isolated change, so nobody owns the larger delivery or its evidence;
2. every delivery becomes one giant change, so the main specs stay stale until the very end.

This project separates the two concerns:

| Layer | Question it answers | Artifact |
|---|---|---|
| Stage | What are we delivering, for whom, with what evidence, and who approves exit? | `docs/stages/stage-N-*-brief.md` + report |
| OpenSpec change | What behavior changes, and how do we verify it? | `openspec/changes/<change>/` |
| Capability spec | What is true now? | `openspec/specs/<capability>/spec.md` |

A Stage can contain several changes. A change can stand alone when it does not need a new program. **Change archive is not Stage exit.**

A Stage with two or more changes also keeps a change map: dependency edges, wave batches with their rationale, directory and capability owners, and one recorded gate per wave. OpenSpec has no cross-change dependency model, so the map stays a repository planning document — it is not an OpenSpec artifact and does not restate behavior.

## Included skills

| Skill | Use it for | It will not |
|---|---|---|
| [`stage-openspec-init`](skills/stage-openspec-init/SKILL.md) | Create a Stage + OpenSpec governance skeleton in a new or ungoverned repository; detect and guide OpenSpec installation | Write product code, approve a Stage, archive a change, or commit automatically |
| [`stage-project-bootstrap`](skills/stage-project-bootstrap/SKILL.md) | Audit and minimally repair an existing governance layer whose docs, commands, or status have drifted | Create a new governance layer, bulk-create Stages, or implement features |
| [`stage-change-workflow`](skills/stage-change-workflow/SKILL.md) | Classify work as Stage/change/Fast Track; create artifacts; admit changes into waves; run review, implementation, and archive gates | Auto-approve, auto-archive, auto-exit a Stage, or fake evidence |

`stage-openspec-init` is the entry point. The other two are the daily operators and the repair path.

## Requirements

- **Node.js >= 22.20.0** (the OpenSpec CLI engine requirement).
- **OpenSpec 2.1.0**. The skills call `openspec new change`, `openspec instructions`, `openspec validate --all --strict`, and `openspec archive`; other versions may behave differently.
- **git**. The skills read `git status`, require a clean-enough tree, and never commit without approval.
- An agent that can read files and run shell commands (Claude Code, Codex, or another coding agent).

The init skill detects the toolchain first. If OpenSpec is missing, it gives an exact install command and waits for approval; it does not silently install, upgrade, or use `sudo`/`latest`.

## Language

The skills are written in English. That is the canonical instruction language; there is no separate full translation that could drift.

- **Replies follow the user.** A Chinese request gets a Chinese reply.
- **Generated documents follow the project.** `stage-openspec-init` writes `AGENTS.md`, `RUNBOOK.md`, Stage briefs, and change prose in the project's primary language (set in `openspec/config.yaml`). Chinese projects normally use Chinese for these files.
- **OpenSpec structure stays English.** Headings such as `## ADDED Requirements`, `SHALL`/`MUST`, CLI commands, file paths, and identifiers are not translated.
- **Chinese triggers are included.** Each skill's `description` ends with Chinese trigger phrases such as `建立 Stage/OpenSpec 治理` or `准备归档`, so Chinese requests route correctly without a full translated copy.

See the [Chinese glossary](docs/GLOSSARY.zh-CN.md) for the terminology used in this repository.

## Install

The skills are **repo-local**. There is no global package to install.

### Claude Code

```bash
git clone https://github.com/klb3713/stage-openspec-skills.git
cd /path/to/your-project
mkdir -p .claude/skills
cp -R /path/to/stage-openspec-skills/skills/* .claude/skills/
```

Claude Code auto-discovers `.claude/skills/<name>/SKILL.md`. If you prefer a live checkout, symlink each skill instead of copying.

### Codex and other agents

There is no universal skill installer. Clone this repository and either:

- point the agent at `skills/<name>/SKILL.md` and the files it references; or
- copy the skill directory into the agent's project-local skills directory; or
- add a short line to the project's `AGENTS.md`:

```text
For Stage/OpenSpec work, read skills/stage-openspec-init/SKILL.md (and its references/assets) before acting.
```

Do not copy only `SKILL.md`: `stage-openspec-init` also needs `assets/` and `references/`.

### Verify

From this repository:

```bash
node scripts/check-skills.mjs
```

In a target project, after the toolchain is available:

```bash
openspec --version   # must be 2.1.0
openspec doctor
```

## Quick start

### New repository

```text
Use stage-openspec-init for this repository.
Mode: new. Profile: standard.
First do a read-only audit, then show me:
- the files you will create,
- placeholders and open decisions,
- the toolchain plan,
- validation commands.
Do not write files until I confirm.
```

Review the dry-run. After confirmation, the skill creates a minimal governance skeleton and one OpenSpec change. It stops before implementation.

Then implement the first change through the workflow:

```text
Use stage-change-workflow to classify and plan the next slice.
Read the current Stage brief and OpenSpec specs first.
Do not write code until I approve the plan.
```

### Existing repository

```text
Use stage-project-bootstrap to audit this repository's Stage/OpenSpec governance.
Report drift as a table: area | finding | severity | proposed action.
Do not create missing governance files; hand off to stage-openspec-init if the layer is absent.
Do not rewrite history or bulk-create Stages.
```

## What `stage-openspec-init` generates

For the `standard` profile:

```text
AGENTS.md
CLAUDE.md
README.md                 # only a short workflow section
docs/architecture.md       # draft, explicitly unapproved
docs/workflow/RUNBOOK.md
docs/workflow/templates/stage-brief.md
docs/workflow/templates/traceability.md
docs/workflow/templates/change-map.md
docs/stages/stage-0-baseline.md
docs/stages/stage-1-<slice>-brief.md
docs/stages/stage-1-<slice>-change-map.md  # when the Stage plans two or more changes
openspec/config.yaml
openspec/changes/<first-change>/
  proposal.md
  specs/<capability>/spec.md
  design.md               # only when needed
  tasks.md
  traceability.md
```

`light` skips the Stage layer; `heavy` adds stricter evidence and resource-approval expectations. See [`references/profiles.md`](skills/stage-openspec-init/references/profiles.md).

Templates are Chinese-first examples. The skill writes generated documents in the project's primary language; translate the template content or let the agent do it. OpenSpec structural headings and `SHALL`/`MUST` stay in English.

## Safety invariants

- No silent global install, upgrade, `sudo`, or `latest`.
- No automatic approval, archive, commit, Stage exit, or production claim.
- No fake authentication, real-data evidence, thresholds, test results, or upstream success.
- No `openspec/templates/` copy flow and no local wrapper script; use the official CLI.
- No reading `.env` values, tokens, customer data, or unredacted samples.
- Unknowns become explicit open decisions, not invented facts.

## Repository layout

```text
skills/
  stage-openspec-init/
    SKILL.md
    assets/            # template files copied into the target repo
    references/        # toolchain and profile details
  stage-project-bootstrap/
    SKILL.md
  stage-change-workflow/
    SKILL.md
docs/
  DESIGN.md
  GLOSSARY.zh-CN.md
  WALKTHROUGH.md
  installation.md
scripts/
  check-skills.mjs
.github/workflows/check.yml
```

## Development

```bash
node scripts/check-skills.mjs
```

The check validates frontmatter, skill names, required assets, local links, and accidental absolute paths. It has no dependencies.

## Compatibility

- OpenSpec CLI: **2.1.0**
- Node.js: **>= 22.20.0**
- Agent: Claude Code, Codex, or any agent that can read `SKILL.md` and run shell commands
- Versioning: `0.x` until the skill contract stabilizes; pin the repository revision you use in a project

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). Changes to the workflow model should be discussed in an issue before editing the skills.

## License

MIT. See [`LICENSE`](LICENSE).
