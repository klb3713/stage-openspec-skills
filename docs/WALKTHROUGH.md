# Walkthrough

Two scenarios: a new repository and an existing repository with drift. The
prompts are intentionally short; the skills ask for the rest.

## Scenario A: a new repository

Assume a new repository with a README and a scaffold, but no Stage/OpenSpec
layer.

### 1. Ask for a dry-run

```text
Use stage-openspec-init for this repository.
Mode: new. Profile: standard.
First do a read-only audit of the repo, git status, AGENTS/CLAUDE/RUNBOOK,
architecture docs, and openspec/. Then show me:
- files you will create or modify,
- placeholders you will replace,
- open decisions,
- toolchain status and install plan,
- validation commands.
Do not write any file until I confirm.
```

A good response includes:

- whether OpenSpec 2.1.0 and Node.js >= 22.20.0 are present;
- whether the directory is a git repository;
- the exact files it will create;
- which facts are unknown and will remain open decisions;
- a statement that no product code will be written.

If the response starts creating files immediately, stop it and ask for the
dry-run again.

### 2. Confirm the plan

Review the file list. For a `standard` profile, expect roughly:

```text
AGENTS.md
CLAUDE.md
docs/architecture.md            # draft, not approved
docs/workflow/RUNBOOK.md
docs/workflow/templates/stage-brief.md
docs/workflow/templates/traceability.md
docs/workflow/templates/change-map.md
docs/stages/stage-0-baseline.md
docs/stages/stage-1-<slice>-brief.md
docs/stages/stage-1-<slice>-change-map.md  # only when the Stage plans two or more changes
openspec/config.yaml
openspec/changes/<change>/
  proposal.md
  specs/<capability>/spec.md
  tasks.md
  traceability.md
```

`light` skips the Stage files; `heavy` adds stricter evidence expectations.

The change map is the Stage's planning layer, not an OpenSpec artifact: it
records `depends_on`, wave membership with its rationale, directory and
capability owners, and one gate row per wave. A single-change Stage keeps those
facts in brief §4 instead; two or more changes get the map.

### 3. Check the generated skeleton

The skill should run and report:

```bash
openspec doctor
openspec list
openspec list --specs
openspec validate --all --strict
openspec status --change <change>
git diff --check
```

It should also check that no `{{...}}` placeholder remains in generated files,
no `openspec/templates/` directory was created, links resolve, every
requirement has a scenario, and the docs do not claim implementation or
approval.

### 4. Start the first change

```text
Use stage-change-workflow to review the first change.
Show me the lane decision, Stage AC coverage, artifacts, open questions,
and validation results. Do not implement until I explicitly authorize it.
```

Only after the review gate should implementation begin. A passing unit test is
not Stage acceptance; a real-data AC is not passed until it has real evidence.

### 5. Archive, then exit

When the change is complete:

```text
Check the archive gate for change <name>.
Report missing tasks, traceability evidence, validation, and document sync.
Do not run openspec archive until I confirm.
```

After archiving, the Stage still needs its own exit review: all required
changes archived, Stage AC evidence, report, document sync, and owner
confirmation.

## Scenario B: an existing repository with drift

Assume a repository already has `AGENTS.md`, a Stage brief, and OpenSpec, but
the README says the backend is a placeholder while code exists, and an old
script still references `openspec/templates/`.

### 1. Ask for an audit

```text
Use stage-project-bootstrap to audit this repository's Stage/OpenSpec governance.
Do not create missing files. Report:
area | finding | severity | proposed action
Check links, commands, Stage/OpenSpec status, deprecated template-copy flows,
and whether docs claim capabilities that are not implemented.
```

### 2. Expect a minimal repair plan

A good response separates:

- stale links/commands that can be fixed directly;
- status drift that needs evidence;
- missing governance files (hand off to `stage-openspec-init`);
- changes that need a new OpenSpec change rather than a doc edit.

It should not rewrite history, bulk-create Stages, or silently delete old
scripts.

### 3. Confirm and verify

```text
Apply only the minimal repair plan. Show the diff before deleting anything.
After the edits, run openspec validate --all --strict and git diff --check.
```

If the governance layer is missing entirely, `stage-project-bootstrap` should stop
and hand off to `stage-openspec-init` rather than creating a new layer.

## What good looks like

- The agent knows which lane it is in: Stage, change, or Fast Track.
- The Stage brief names ACs and changes; it does not restate behavior.
- The change has one vertical slice, not a program-sized bundle.
- Traceability starts unverified and becomes evidence-backed only when evidence
  exists.
- Archive and Stage exit are separate decisions.
- Every unknown is written down; nothing is invented.

## Common mistakes

| Mistake | Correction |
|---|---|
| Creating a change with no Stage/AC link | Read the Stage brief and map the AC, or record why it is standalone |
| Using `Fast Track` for a behavior change | If behavior or contract changes, use a change |
| Treating `openspec status` as approval | It reports artifacts/tasks, not review or acceptance |
| Bulk-creating Stage 2–10 | Create only the current Stage and one first change |
| Copying a historical template tree | Use `openspec new change` + `openspec instructions` |
| Marking real-data ACs passed from a unit test | Mark them not passed until real evidence exists |
