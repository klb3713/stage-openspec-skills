---
name: project-bootstrap
description: Audit and repair an existing, already-governed Stage + OpenSpec repository so Stage documents, OpenSpec, agent rules and commands agree. Use when governance exists but is stale or inconsistent, deprecated OpenSpec workflows are still referenced, or docs/commands have drifted. Do not use to create a new governance layer (use stage-openspec-init) or for ordinary feature implementation.
---

# Project Bootstrap

## Overview

Audit the repository first, then propose a minimal repair diff. This skill repairs an existing governance layer; it does not create a new Stage/OpenSpec skeleton, implement business features, approve a Stage, or replace repository rules. If the repository has no coherent governance layer, stop and hand off to `stage-openspec-init`.

## Guardrails

- Read the repository rules before changing anything: `AGENTS.md`, `CLAUDE.md`, `doc/workflow/RUNBOOK.md`, `doc/architecture.md`, Stage briefs, `openspec/config.yaml`.
- Treat `AGENTS.md` and archived OpenSpec specs as the rule source. This skill is an operator, not a second source of truth.
- If `AGENTS.md`, `doc/workflow/RUNBOOK.md`, or `openspec/config.yaml` are absent, do not create them here; hand off to `stage-openspec-init`. A light profile that intentionally has no Stage briefs is not a missing governance layer.
- Do not overwrite existing user work. Check `git status`; if unrelated changes exist, stop and report them.
- Do not read, copy or write secrets, `.env` values, tokens, real customer data or unredacted samples.
- Do not run Docker, databases, Workers, deployments or production commands.
- Do not auto-commit, auto-archive, auto-approve a Stage, or claim production readiness.
- Use the official OpenSpec CLI; never recreate `openspec/templates/` or a local wrapper script.
- Do not install or upgrade Node.js/OpenSpec. If `openspec` is missing or not 2.1.0, stop and point to `../stage-openspec-init/references/toolchain.md`.

## Workflow

### 1. Read the current state

Read, in order:

1. `AGENTS.md` and `CLAUDE.md`
2. `doc/workflow/RUNBOOK.md`
3. `doc/architecture.md` (target design, not implemented state)
4. `doc/stages/*.md`
5. `openspec/config.yaml`, `openspec/specs/`, `openspec/changes/`
6. `README.md`, build/test configuration, `git status --short --branch`, and `openspec --version`.

### 2. Audit

Check and report:

- Project identity: real project name, domain, current implementation state, and target design path.
- Rule consistency: AGENTS/CLAUDE/RUNBOOK/README links and commands agree; no `{project-name}` placeholders.
- OpenSpec: `openspec --version` is 2.1.0; config schema and context exist; `openspec list --specs` and `openspec status --change` are coherent; no deprecated template-copy flow.
- Stage coverage: if the project uses the Stage layer, a Stage 0 baseline and current Stage brief exist with scope, AC, out-of-scope, exit conditions and open decisions; a light profile may intentionally omit Stage docs.
- Traceability: Stage AC map to change requirements/scenarios or are explicitly deferred.
- Safety: no default Principal, `AUTH_DISABLED`, fake health/ready, synthetic data presented as real, or secret material.
- Repository hygiene: no stale paths, dead scripts, duplicate workflow documents, or undocumented generated files.

Output a compact table: `area | finding | severity | proposed action`.

### 3. Choose the smallest intervention

- If the repository already has a coherent workflow, do not rewrite it; report “no change” and list residual gaps.
- If the governance layer is missing (`AGENTS.md`, `RUNBOOK.md`, or `openspec/config.yaml`), stop and recommend `stage-openspec-init`; do not create it here. Missing Stage 0 alone is not a defect in a light-profile project.
- If `openspec` is missing or not 2.1.0, stop and hand off to `../stage-openspec-init/references/toolchain.md`; do not install it from this skill.
- If only links/commands are stale, fix those first.
- If Stage 0 or the current Stage brief exists but is stale, update it with evidence; do not rewrite history.
- If OpenSpec has an active change, do not create another just to fill the folder.
- Do not create future Stage documents in bulk.

### 4. Propose before writing

Present:

- the audit table;
- the exact files to modify/delete (never a new governance layer);
- what will not change;
- risks and open decisions;
- a dry-run summary.

Ask for confirmation before deleting files or overwriting non-generated content. Prefer additive edits.

### 5. Repair in dependency order

Repair only artifacts that already exist; if an item is missing, do not create it here — hand off to `stage-openspec-init`.

1. `AGENTS.md`: stale identity, current state, links, Stage/change rules or commands.
2. `CLAUDE.md`: stale pointer; keep it thin and do not duplicate rules.
3. `doc/workflow/RUNBOOK.md` and templates: stale lifecycle, gates, commands or links.
4. `doc/stages/stage-0-baseline.md`: stale facts or status drift.
5. Current Stage brief: stale scope, AC, evidence or open decisions.
6. `openspec/config.yaml`: stale artifact rules or guidance.
7. Existing active change: missing/stale `traceability.md`, task status or artifact links; do not create a new change just to fill the folder.

### 6. Verify

Run and record:

```bash
openspec validate --all --strict
openspec status --change <change-name>
git diff --check
```

Also check links, placeholders, deprecated references and leftover scripts. Do not report success if validation fails; report the exact failure.

### 7. Hand off

Return:

- what changed and why;
- evidence (commands/results);
- what remains open;
- the next decision the user must make;
- if the governance layer is missing, the handoff to `stage-openspec-init`.

Stop before implementation unless the user explicitly authorizes it.
