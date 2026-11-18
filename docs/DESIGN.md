# Design

## Problem

Agent-assisted delivery tends to collapse into one of two patterns:

- **Every feature is a small change.** The main specs stay current, but no one
  owns the larger delivery, its acceptance criteria, or its evidence.
- **Every delivery is one large change.** The program is visible, but behavior
  contracts stay stale until the end, review is all-or-nothing, and archive is
  mistaken for completion.

The missing distinction is between **program governance** and **behavior
change**. OpenSpec is good at the second. The Stage layer supplies the first
without duplicating OpenSpec's behavior requirements.

## Two levels

```text
Stage (program)
├── change A (behavior delta)
├── change B (behavior delta)
└── change C (behavior delta)
```

- A **Stage** is a delivery container. It defines scope, non-goals, acceptance
  criteria, resource/security preconditions, evidence expectations, and exit.
- An **OpenSpec change** is a behavior delta. It defines why the change is
  needed, the requirements/scenarios, design decisions when necessary, tasks,
  and traceability to Stage ACs.
- A **capability spec** is the current behavior contract. It is created and
  updated by archived changes, not by the Stage brief.

A Stage may contain one or several changes. A change may exist without a new
Stage when it does not change the program. A change is archived when its
behavior and evidence are complete; a Stage exits only after all required
changes are archived, the Stage ACs have evidence, the delivery report exists,
the documents are synchronized, and the owner confirms exit.

## Source of truth

| Question | Source |
|---|---|
| Why does this project exist and how is it structured? | `doc/architecture.md` |
| What is the current program scope and exit condition? | current Stage brief |
| What behavior is true now? | archived OpenSpec capability specs |
| What behavior is changing? | active OpenSpec change |
| What is the status of the program? | roadmap or Stage index |
| What evidence was actually produced? | delivery report and change traceability |
| How should an agent behave? | `AGENTS.md`, `CLAUDE.md`, `RUNBOOK.md` |

A Stage brief must not restate behavior requirements. If it does, the project
has two competing specs. The brief names the changes and the ACs; the delta
spec owns the behavior text.

## Two gates

| Gate | Passes when | Does not mean |
|---|---|---|
| Change archive | Tasks complete or explicitly deferred; traceability has evidence; `openspec validate --all --strict` passes; reviewer confirms | Stage exit, production readiness, or that all ACs are proven |
| Stage exit | Required changes archived; every Stage AC evidenced or explicitly not passed; report written; docs synchronized; owner confirms | That future changes are approved |

The skills enforce these gates by stopping and asking, not by a runtime
permission system. They are instructions for an agent; repository rules and
human review remain authoritative.

## Skill roles

| Skill | Responsibility | Boundary |
|---|---|---|
| `stage-openspec-init` | Detect the toolchain; create a minimal governance skeleton and one first change; validate it | No product code; no Stage approval; no archive |
| `project-bootstrap` | Audit an existing governance layer; make the smallest repair to stale links, commands, or status | No new governance layer; no history rewrite; no bulk Stages |
| `stage-change-workflow` | Classify work; create/continue/archive a change; prepare a Stage exit | No automatic approval, archive, or exit; no fake evidence |

The handoffs are deliberate:

```text
new/ungoverned repo        -> stage-openspec-init
governed but drifted repo  -> project-bootstrap
daily work                 -> stage-change-workflow
```

## Profiles

| Profile | Use when | Governance |
|---|---|---|
| `light` | Prototype, internal tool, single owner | Rules + OpenSpec; no Stage layer |
| `standard` | Normal product, 2–5 people | Stage 0 baseline + current Stage brief + one change |
| `heavy` | Security/compliance, multiple teams, production gates | Standard + stricter evidence and resource approvals |

The default is `standard`. A new project should not copy a large historical
Stage backlog. Start with one Stage and one vertical slice; add Stages when the
program actually needs them.

## Design decisions

- **Repo-local, not a global framework.** The generated files are reviewable and
  versioned with the project. There is no hidden runtime.
- **Official OpenSpec CLI.** `openspec new change`, `openspec instructions`,
  `openspec validate`, and `openspec archive` are the only supported path. No
  `openspec/templates/` copy flow and no local wrapper.
- **Exact toolchain.** OpenSpec 2.1.0 and Node.js >= 22.20.0 are pinned because
  skill instructions depend on specific CLI behavior. Missing or mismatched
  toolchains stop the flow.
- **Approval-gated installation.** A skill may guide installation, but it must
  show the command and scope and wait. No silent global install, `sudo`, or
  `latest`.
- **Traceability without permanent AC IDs in capabilities.** Stage AC IDs live
  in the brief, traceability file, and report. Capability names describe
  behavior, not program history.
- **No fake completion.** A scaffold, a passing unit test, or an existing
  directory is not production evidence. Unknowns become open decisions.

## Non-goals

- A project management system, scheduler, or approval database.
- A replacement for OpenSpec, Jira, GitHub Issues, or a CI system.
- A code generator for product features.
- A guarantee that an agent followed the process. The skills reduce ambiguity;
  they do not enforce policy at runtime.
- A universal install format for every agent. Claude Code auto-discovers
  `.claude/skills`; other agents read `SKILL.md` directly.

## Failure modes

| Failure | Symptom | Mitigation |
|---|---|---|
| Two sources of truth | Stage brief and capability spec both define behavior | Brief references change/capability paths; delta spec owns behavior |
| Mega-change | One change covers a whole program and never archives | Stage container + several focused changes |
| Change inflation | Dozens of tiny changes with no program owner | Stage brief + AC traceability + WIP limit |
| Archive mistaken for exit | Change archived, Stage marked done without evidence | Separate gates and explicit exit checklist |
| Skill becomes the rule source | Generated `AGENTS.md` is stale; agents follow the skill | Skill reads repository rules; generated files are authoritative |
| Toolchain drift | Old/new OpenSpec CLI behaves differently | Exact version check; stop and ask |
| Silent install | Agent changes the machine or global prefix | Show command/scope; require approval; re-check |
| Fake evidence | Scaffold or synthetic fixture presented as production proof | Evidence layers; unknown = not passed |

## Compatibility

The instructions target OpenSpec 2.1.0 and Node.js 22.20.0 or newer. When
upgrading either, update:

- `skills/stage-openspec-init/references/toolchain.md`;
- the generated `AGENTS.md`/`RUNBOOK.md` guidance in `assets/`;
- README, README.zh-CN, and the validation workflow;
- the `CHANGELOG.md` entry.

Because the skills are instructions rather than code, they cannot detect every
future CLI change. Treat the pinned version as part of the contract.
