# Profiles

`stage-openspec-init` uses three profiles. Pick the smallest one that matches the real risk; do not default to heavy.

## Light

Use when:

- prototype, internal tool, hackathon, single owner;
- no production data, no external users, no regulated boundary;
- the main need is a repeatable change workflow.

Generate:

```text
AGENTS.md
CLAUDE.md
docs/workflow/RUNBOOK.md
openspec/config.yaml
openspec/changes/<first-change>/
README.md (short workflow section)
```

Do not generate Stage 0/Stage 1 briefs. The first change can reference a short "current goal" in the proposal.

## Standard

Use when:

- normal product, 2–5 people;
- multiple changes likely over several weeks;
- real users or real data will appear soon.

Generate light plus:

```text
docs/architecture.md (draft if missing)
docs/stages/stage-0-baseline.md
docs/stages/stage-1-<slice>-brief.md
docs/workflow/templates/stage-brief.md
docs/workflow/templates/traceability.md
openspec/changes/<first-change>/traceability.md
```

The Stage brief defines scope/AC/exit; the change defines behavior. Do not duplicate requirements.

## Heavy

Use when:

- security, compliance, payments, healthcare, government data, or production infrastructure;
- multiple teams or external reviewers;
- evidence, audit trails, or resource approvals are required.

Generate standard plus:

- explicit environment/data authorization table in Stage 0 and the Stage brief;
- stricter evidence layers (static/contract, unit, integration, real-data, manual review);
- report template or report path;
- explicit approver/reviewer roles;
- rollback/incident/unknown-result handling in design when relevant.

Do not generate a fake report before evidence exists. Leave the report path as a planned artifact.

## Rule of thumb

If you cannot explain why heavy is needed in one sentence, use standard. If the project has no users and no production data, use light.
