---
name: stage-openspec-init
description: Establish a minimal Stage + OpenSpec governance skeleton for a new or ungoverned repository. Use when the user asks to initialize Stage/OpenSpec governance, create AGENTS/CLAUDE/RUNBOOK/Stage 0/Stage 1 from scratch, or adopt governance in a repository that has no coherent Stage/OpenSpec layer. Do not use for ordinary feature implementation, daily change work, or repairing an already-governed repository (use stage-project-bootstrap). 中文触发：建立或初始化 Stage 与 OpenSpec 治理、从零生成 AGENTS/RUNBOOK/Stage 0/Stage 1、检测并安装 OpenSpec。
---

# Stage OpenSpec Init

## Overview

Install the operating system for a repository, not product code. The output is a small, reviewable governance skeleton: agent rules, one workflow runbook, one current Stage, and one OpenSpec change. It must be honest about what is known, what is draft, and what is not delivered.

This skill is an operator. The generated repository files become the rule source; the skill itself is not a second source of truth.

## Language policy

- Reply in the language the user writes in. If the user writes Chinese, reply in Chinese.
- Write generated repository documents in the project's primary language (see `openspec/config.yaml`). For a Chinese project, Stage briefs, reports, `AGENTS.md`, and `RUNBOOK.md` are normally Chinese.
- Keep OpenSpec structural headings, `SHALL`/`MUST`, CLI commands, file paths, and code identifiers in English.
- Do not translate skill names, command names, or file paths.

## When to use

Use for:

- a new repository created from a scaffold, with no Stage/OpenSpec layer;
- a repository with code but no `AGENTS.md`, `RUNBOOK.md`, Stage briefs, or OpenSpec specs;
- a repository where old template-copy scripts and partial docs make the flow incoherent;
- the machine has no OpenSpec CLI, or the installed version is not 2.1.0;
- the user explicitly asks to "建立 Stage/OpenSpec 治理", "初始化流程", or "接入 OpenSpec".

Do not use for:

- adding a feature or fixing a bug (use `stage-change-workflow`);
- auditing or repairing a repository that already has a coherent governance layer (use `stage-project-bootstrap`);
- copying an existing scaffold (use `fullstack-project-init` first);
- approving a Stage, archiving a change, or claiming production readiness.

## Guardrails

- Read before writing: `AGENTS.md`, `CLAUDE.md`, `docs/workflow/RUNBOOK.md`, `docs/architecture.md`, `README.md`, `openspec/config.yaml`, existing Stage/change files, and `git status --short --branch`.
- Never overwrite user work. If unrelated changes exist, report them and ask before touching the tree.
- Never invent architecture, acceptance evidence, real data, credentials, thresholds, or test results. Unknowns become explicit open decisions.
- Never create `openspec/templates/`, a local wrapper script, or a copy-paste change-template flow. Use the official CLI only.
- Check the toolchain before initialization: use `references/toolchain.md`. Do not install or upgrade Node.js/OpenSpec, run `sudo`, use `latest`, or change the global npm prefix without explicit approval.
- If `openspec` is missing or not 2.1.0, pause and guide installation using the exact commands in `references/toolchain.md`; after installation, re-run detection before continuing.
- Never auto-approve a Stage, auto-archive a change, auto-commit, start services, run Docker/databases, or touch production systems.
- Never read or write `.env` values, tokens, customer data, or unredacted samples.
- Generate only the current Stage and one first change. Do not bulk-create future Stages.
- Write repository documents in the project's primary language. Keep OpenSpec structural headings and SHALL/MUST in English.
- Prefer additive edits. Deleting or replacing existing files requires explicit confirmation and a diff summary.

## Modes

| Mode | Use when | Default profile |
|---|---|---|
| `new` | Empty repository or fresh scaffold; no coherent Stage/OpenSpec layer | standard |
| `adopt` | Existing code and partial docs; governance missing or contradictory | standard |

If the repository already has a coherent Stage/OpenSpec layer, stop and hand off to `stage-project-bootstrap` for audit/repair.

## Workflow

### 1. Preflight

Read `references/toolchain.md` first, then run its detection block. Do not continue until OpenSpec 2.1.0 is available, or the user explicitly accepts a documented fallback. If installation is needed, show the exact command and scope (global vs project-local), ask before running it, and re-check the version afterwards.

Run and read:

```bash
pwd
git status --short --branch
ls
node --version
npm --version
openspec --version
```

Check whether these exist and are coherent:

- `AGENTS.md`, `CLAUDE.md`, `README.md`;
- `docs/workflow/RUNBOOK.md` and `docs/workflow/templates/`;
- `docs/architecture.md`;
- `docs/stages/` and any Stage briefs;
- `openspec/config.yaml`, `openspec/specs/`, `openspec/changes/`;
- build/test/lint configuration and the real commands.

If `openspec/` is absent, initialize it with the official CLI. Choose tool integration deliberately; `--tools none` is the safe default when the repository already has its own `AGENTS.md`/`CLAUDE.md`:

```bash
# Use the project's primary language code, such as en, zh, or ja.
openspec init --tools none --language <language-code>
```

If `openspec` was just initialized, its starter `config.yaml` may already exist. Replace or merge it with the template, preserving project-specific values. Do not pass an unsupported `--schema` flag; the schema is set in `openspec/config.yaml` and per change.

### 2. Interview

Ask in batches, not as an interrogation. Prefer concrete choices and sensible defaults. Stop if a high-risk decision is unknown; record it instead of guessing.

1. **Identity**: project name, one-sentence domain, primary users, owner/reviewer.
2. **Truth sources**: existing architecture/design docs; if none, the 3–5 components and constraints the user already knows.
3. **Stack and commands**: install, dev, test, lint, build; what is real today.
4. **Risk profile**: prototype/internal tool, normal product, or security/compliance-heavy.
5. **First vertical slice**: one user-visible outcome that can be demonstrated end to end; explicit non-goals.
6. **Constraints**: auth/authorization, data classification, environments, forbidden operations, real-data policy.
7. **Language and team**: document language, who approves, who reviews, maximum active changes (default 1–3).

### 3. Choose a profile

| Profile | Use when | Generated governance |
|---|---|---|
| `light` | Prototype, internal tool, single owner | `AGENTS.md`, `CLAUDE.md`, `RUNBOOK.md`, `config.yaml`, one change; no Stage docs |
| `standard` | Normal product, 2–5 people | light + Stage 0 baseline + current Stage brief + traceability |
| `heavy` | Security/compliance, multiple teams, production gates | standard + stricter evidence/report templates and explicit resource approvals |

Default to `standard` unless the interview clearly points elsewhere. Do not copy a large historical Stage backlog into a new project.

### 4. Plan and dry-run

Before writing, output:

- mode and profile;
- files to create, modify, or skip;
- placeholders that will be replaced;
- open decisions and their impact;
- validation commands;
- what will not change.

Wait for confirmation. Do not write files during the dry-run.

### 5. Generate in dependency order

Use templates from `assets/` and replace every `{{PLACEHOLDER}}`. Do not leave angle-bracket or double-brace placeholders in generated files unless they are intentional documentation examples.

1. `openspec/config.yaml` — schema, project context, artifact rules, apply/archive guidance.
2. `AGENTS.md` — project identity, truth-source table, hard constraints, safety rules, prohibitions, skills, and pointers to the RUNBOOK for workflow and commands. Replace `{{OPENSPEC_INSTALL}}` with the verified install method (for example `global npm` or `project-local pnpm`); keep the exact command prefix and the command list only in `RUNBOOK.md` §8.
3. `CLAUDE.md` — create it as a relative symlink to `AGENTS.md` (`ln -s AGENTS.md CLAUDE.md`, run from the project root) so Claude Code reads the single source of truth and other agents keep reading `AGENTS.md` directly. Do not write a full copy. If symlink creation fails (e.g. Windows without developer/admin mode, or a filesystem that does not support symlinks), fall back to `assets/CLAUDE.template.md`: copy it to `CLAUDE.md` (it is a thin `@AGENTS.md` import shim). Never duplicate rules in `CLAUDE.md`.
4. `docs/workflow/RUNBOOK.md` — two-level model, profiles, lifecycles, gates, service start/stop grading (§7.1), commands, common errors.
5. `docs/workflow/templates/stage-brief.md`, `traceability.md`, and `change-map.md` — project-local templates.
6. `docs/architecture.md` — if missing, create a clearly marked draft from the interview; list unknowns as open questions. Never present it as approved.
7. `docs/stages/stage-0-baseline.md` — standard/heavy only; current facts, what is missing, Stage 0 acceptance and exit conditions.
8. `docs/stages/stage-1-<slice>-brief.md` — standard/heavy only; behavior-free scope, AC, non-goals, exit conditions.
9. `docs/stages/stage-1-<slice>-change-map.md` — only when the Stage plans two or more changes; otherwise the brief change list is enough and the map is created when a second change is proposed. Record `depends_on`, wave membership, owned directories, shared-file owners, per-wave gates and the archive mode. It is a plan, not an OpenSpec artifact: never put it under `openspec/`.
10. `README.md` — add a short "开发流程" section linking AGENTS/RUNBOOK/Stage/OpenSpec. Do not rewrite the whole README.
11. First OpenSpec change:

```bash
openspec new change <change-name>
openspec instructions proposal --change <change-name>
openspec instructions specs --change <change-name>
openspec instructions design --change <change-name>
openspec instructions tasks --change <change-name>
```

Write `proposal.md`, delta specs, `design.md` only if needed, `tasks.md`, and `traceability.md`. Keep the first change to one vertical slice.

### 6. Validate

Run and record:

```bash
openspec doctor
openspec list
openspec list --specs
openspec validate --all --strict
openspec status --change <change-name>
git diff --check
```

Also check:

```bash
grep -RIn --exclude-dir=.git --exclude-dir=node_modules '{{' AGENTS.md CLAUDE.md README.md docs openspec 2>/dev/null || true
```

- no `{{` placeholders remain in generated files;
- no `openspec/templates/` directory, no local OpenSpec wrapper script;
- links resolve;
- Stage ACs map to change requirements/scenarios or are explicitly deferred;
- when generated, the change map lists every planned change exactly once, gives each a wave, and its graph matches `depends_on`; no change depends on another change in the same wave;
- every requirement has at least one scenario;
- no secrets, real customer data, fake evidence, or fake test results;
- generated docs do not claim implementation or approval.

If validation fails, report the exact failure. Do not call the initialization complete.

### 7. Hand off

Return:

```text
Mode: new | adopt
Profile: light | standard | heavy
Toolchain: OpenSpec 2.1.0; Node <version>; global | project-local
Created/modified: ...
Validation: ...
Open decisions: ...
Next action: ...
```

State clearly:

- what is draft vs approved;
- what is not implemented;
- who must review the Stage/change;
- that Stage 1 implementation needs separate authorization.

## Definition of done (closed loop)

Initialization is complete only when all of these are true:

- Node and npm were detected and recorded; OpenSpec reports exactly 2.1.0;
- the directory is a git repository, or `git init` was explicitly approved and no commit was made;
- the install method (global/project-local) and command prefix are recorded in the generated docs;
- `openspec doctor`, `openspec list`, `openspec list --specs`, and `openspec status --change` run without unexpected errors;
- `openspec validate --all --strict` passes;
- generated docs have no unresolved placeholders, broken local links, fake evidence, or claims of implementation/approval;
- the change map, when generated, covers every planned change with `depends_on`, wave, owned directories, a gate per wave with an evidence location, and an archive mode;
- `git diff --check` passes, and the user has seen the file list and validation results;
- remaining install/approval actions are explicitly listed in the handoff.

If any item is missing, report the initialization as incomplete, not as done.

This definition closes the **governance/planning skeleton**, not product delivery. Implementing the first change, archiving it, and exiting a Stage are separate gates handled by `stage-change-workflow`.

## Artifact rules

- Stage brief: scope, AC, non-goals, constraints, change list, exit conditions. No behavior requirements.
- Change map: `depends_on` edges, wave membership with the batching rationale, directory and capability owners, one gate per wave with evidence, merge/archive order. No behavior requirements either.
- Change proposal: why now, what changes, out of scope, capabilities, impact.
- Delta specs: `## ADDED/MODIFIED/REMOVED Requirements`; one observable behavior per requirement; SHALL/MUST; at least one `#### Scenario` with WHEN/THEN.
- `tasks.md`: grouped, independently verifiable tasks; each states its verification.
- `traceability.md`: Stage AC → requirement/scenario → planned evidence; everything starts unverified.
- Do not put Stage AC IDs into long-lived capability names or requirement headings.
- New capabilities need a `## Purpose` of at least 50 characters.
- Zero delta is allowed only for behavior-preserving work, with `skip_specs: true` and a reason.

## Stop conditions

Stop and ask before continuing when:

- the repository has unrelated uncommitted changes;
- the owner/reviewer is unknown;
- auth, data classification, or production boundary is unknown for a slice that needs it;
- the first slice is too large to demonstrate end to end;
- an existing open change conflicts with the proposed Stage;
- OpenSpec is missing, the Node version is below 22.20.0, or the installed version is not 2.1.0;
- the directory is not a git repository and the user has not approved `git init`;
- the agent cannot run shell commands and cannot hand off the exact commands;
- an install/upgrade would be global, require `sudo`, change the registry, or write outside the repository;
- the user asks to skip validation, fabricate evidence, or auto-approve.

## Assets

- `assets/AGENTS.template.md`
- `assets/CLAUDE.template.md`
- `assets/RUNBOOK.template.md`
- `assets/openspec.config.yaml`
- `assets/architecture.template.md`
- `assets/stage-0-baseline.template.md`
- `assets/stage-brief.template.md`
- `assets/change-map.template.md`
- `assets/traceability.template.md`
- `references/profiles.md`
- `references/toolchain.md`
