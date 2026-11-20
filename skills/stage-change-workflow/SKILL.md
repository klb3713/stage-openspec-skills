---
name: stage-change-workflow
description: Guide repository work through the Stage/OpenSpec process and produce the required planning artifacts. Use when starting or continuing a feature, behavior-changing bug fix, Stage slice, OpenSpec change, traceability update, archive preparation, or Stage exit review. Also use when the user asks whether work should be a Stage, a change, or Fast Track. Never approves, archives or declares Stage exit without explicit user confirmation. 中文触发：判断 Stage/change/Fast Track、创建或继续 change、更新追溯矩阵、准备归档或阶段退出。
---

# Stage Change Workflow

## Overview

Decide the correct lane, create the required artifacts, enforce the two-level gates, and stop before unauthorized implementation or archive. Read repository rules first; this skill does not replace them.

## Language policy

- Reply in the language the user writes in. If the user writes Chinese, reply in Chinese.
- Write generated repository documents in the project's primary language (see `openspec/config.yaml`). For a Chinese project, change proposals, task notes, reports, and traceability prose are normally Chinese.
- Keep OpenSpec structural headings, `SHALL`/`MUST`, CLI commands, file paths, and code identifiers in English.
- Do not translate skill names, command names, or file paths.

## Guardrails

- Read `AGENTS.md`, `doc/workflow/RUNBOOK.md`, `doc/architecture.md`, the current Stage brief and `openspec/config.yaml` before acting.
- Use the official CLI: `openspec new change`, `openspec instructions`, `openspec validate`, `openspec archive`.
- For Stage/change lanes, verify `openspec --version` is 2.1.0 before planning. If it is missing or different, stop and point to `../stage-openspec-init/references/toolchain.md`; do not install or upgrade it from this skill.
- Never recreate `openspec/templates/` or use the removed `scripts/openspec.sh`.
- Never auto-approve a design, archive a change, mark a Stage complete, or claim production readiness.
- Never fake auth, coordinates, thresholds, upstream success, test results or real-data evidence.
- Do not start services, Docker, databases or production operations without explicit confirmation.
- Do not edit code while the change is still in planning unless the user separately authorizes implementation.

## Workflow

### 1. Classify the request

| Lane | Use when | Output |
|---|---|---|
| Stage | New module/capability, cross-domain work, new security/data boundary, multi-change delivery, resource/environment approval | Stage brief + change map |
| OpenSpec change | Behavior change within an existing capability; new feature slice; behavior-changing bug | proposal + delta specs + design/tasks |
| Fast Track | Behavior-preserving bug, style, config or docs; no API/permission/data semantics change | normal commit + verification |

If the request touches auth, authorization, public API, data semantics, schema migration, security boundary or an approved Stage contract, prefer a change and request review. Do not silently expand scope.

#### Cross-Stage corrections

When a later Stage finds a defect in an earlier, already-exited Stage, classify it before editing anything:

| Situation | Route | Reopen the old Stage? |
|---|---|---|
| The original AC is still correct; the implementation is wrong | Correction change; use `skip_specs: true` when the capability spec already states the behavior | No |
| The original AC is wrong, incomplete, or unsafe | Stage amendment/correction brief with explicit owner approval, then a change with delta specs | Yes, or mark it corrective |
| The request is new behavior | Ordinary change under the current/next Stage | No |
| Only docs, commands, or status drifted | `stage-project-bootstrap` repair or Fast Track | No |
| The old exit evidence is invalid | Downgrade the Stage status, create a corrective plan, and re-run the exit gate | Yes |

Correction rules:

- Record `Origin: Stage X / AC / change / commit` in `proposal.md`.
- Analyze impact on the current and later Stages; block dependent work if the defect invalidates its assumptions.
- Add a failing regression test before the fix; verify the old AC plus the regression.
- Do not rewrite archived change artifacts or make the old Stage report look correct in hindsight.
- Keep `exited` only when the original exit evidence remains valid; otherwise update the roadmap and report the downgrade.
- If the original AC is invalid, stop and get explicit owner/user approval before changing the contract.

Correction checklist:

- [ ] Origin Stage/AC/change/commit recorded.
- [ ] Impact on current and later Stages analyzed.
- [ ] Correction change vs Stage amendment chosen and approved.
- [ ] Regression test failed before the fix.
- [ ] Delta spec or `skip_specs: true` justified.
- [ ] Traceability maps the origin AC to new evidence.
- [ ] Correction report and roadmap post-exit note prepared.
- [ ] Old exit evidence revalidated, or Stage status downgraded.

### 2. Preflight

Run and read:

```bash
git status --short --branch
openspec --version
openspec list
openspec list --specs
```

Read the relevant Stage brief, architecture section, current specs and any active change. Identify:

- the Stage AC this work contributes to;
- the capability that owns the behavior;
- what is explicitly out of scope;
- unresolved decisions that block implementation.

If the request conflicts with an approved Stage/AC, stop and surface the conflict before writing artifacts.

If `openspec --version` is missing or not 2.1.0, stop before `openspec list` and point to `../stage-openspec-init/references/toolchain.md`; do not install or upgrade from this skill.

### 3. Create the change

```bash
openspec new change <change-name>
openspec instructions proposal --change <change-name>
```

Complete artifacts in order:

1. `proposal.md`: why now, what changes, out of scope, capabilities, impact. For a correction, include the origin Stage/AC/change/commit.
2. `specs/<capability>/spec.md`: `## ADDED/MODIFIED/REMOVED Requirements`; each requirement uses SHALL/MUST and has at least one WHEN/THEN scenario.
3. `design.md`: only when there are cross-cutting, data, interface, dependency or migration decisions. Record alternatives, trade-offs, risks, migration/rollback.
4. `tasks.md`: grouped, independently verifiable tasks; each states its verification.
5. `traceability.md`: Stage AC → requirement/scenario → planned evidence; mark everything unverified until evidence exists.

Keep requirements behavioral. Do not put class names, file paths, internal algorithms or Stage AC IDs into permanent capability names.

### 4. Review gate

Before implementation, present:

- lane decision and rationale;
- Stage AC covered;
- artifacts created;
- open questions/decisions;
- what is not included;
- validation results.

Wait for explicit authorization. “Artifacts exist” is not authorization to implement.

### 5. Implementation gate

When authorized:

- implement in task dependency order;
- update task checkboxes only after verification;
- cover success, invalid input and key rejection paths;
- keep real data, synthetic fixtures and local tests separate;
- do not delete assertions or broaden skips to pass a gate.

If implementation reveals a spec conflict, stop the affected part and revise the spec before continuing.

### 6. Archive gate

Before archiving:

```bash
openspec validate --all --strict
openspec status --change <change-name>
```

Check:

- every task is complete or explicitly deferred with a reason;
- traceability has evidence, not just links;
- real-data ACs are either evidenced or marked not passed;
- deviations and residual risks are recorded;
- for a correction, the correction report and roadmap post-exit note are ready;
- main spec updates and document links are ready.

Then ask for confirmation before:

```bash
openspec archive <change-name>
```

Archiving a change is not Stage exit. Stage exit still needs all required changes archived, Stage AC evidence, the Stage report, document sync and user confirmation.

### 7. Output format

Return:

```text
Lane: Stage | Change | Fast Track
Why: ...
Stage AC: ...
Artifacts: ...
Validation: ...
Open decisions: ...
Next action: ...
```

Be explicit about what is not verified. Never turn a plan, a passing unit test or a synthetic fixture into a production claim.
