# Installation

These are **repo-local skills**, not an npm package. Installation means making
the skill directories available to an agent in a project.

## Requirements

| Requirement | Version | Why |
|---|---|---|
| Node.js | >= 22.20.0 | OpenSpec CLI engine requirement |
| OpenSpec CLI | 2.1.0 | `new change`, `instructions`, `validate`, `archive` behavior |
| git | any recent version | Preflight, drift checks, and diff review |
| Agent | Claude Code, Codex, or similar | Reads `SKILL.md` and runs shell commands |

The init skill checks these before writing. It does not install Node.js, and it
does not install OpenSpec without approval.

## Claude Code

### Per project (recommended)

```bash
git clone https://github.com/klb3713/stage-openspec-skills.git
cd /path/to/your-project
mkdir -p .claude/skills
cp -R /path/to/stage-openspec-skills/skills/* .claude/skills/
```

Claude Code discovers `.claude/skills/<name>/SKILL.md`. Keep the whole
directory: `stage-openspec-init` needs `assets/` and `references/`.

For a live checkout instead of a copy:

```bash
ln -s /path/to/stage-openspec-skills/skills/stage-openspec-init .claude/skills/stage-openspec-init
ln -s /path/to/stage-openspec-skills/skills/stage-project-bootstrap .claude/skills/stage-project-bootstrap
ln -s /path/to/stage-openspec-skills/skills/stage-change-workflow .claude/skills/stage-change-workflow
```

Commit `.claude/skills/` if the team wants the same instructions in every
checkout. Do not commit a symlink to a path outside the repository; use a
copy or a submodule instead.

### Personal (across projects)

If your agent supports a personal skills directory, copy the three directories
there. The exact path is agent-specific; do not assume a global path works for
every tool. This project does not ship a global installer.

## Codex and other agents

There is no standard cross-agent skill installer. Use one of these patterns:

1. **Direct reference.** Keep this repository checked out and tell the agent to
   read `skills/<name>/SKILL.md` plus the files it references.
2. **Project copy.** Copy the skill directories into the project's agent
   instructions/skills location.
3. **AGENTS.md pointer.** Add a short line to the project's `AGENTS.md`:

   ```text
   For Stage/OpenSpec governance, read skills/stage-openspec-init/SKILL.md
   and its references/assets before acting. For daily changes, use
   skills/stage-change-workflow/SKILL.md.
   ```

Do not copy only `SKILL.md`. `stage-openspec-init` uses `assets/` for templates
and `references/` for toolchain/profile details.

## Verify

```bash
node scripts/check-skills.mjs
```

In the target project:

```bash
openspec --version
openspec doctor
```

Expected: OpenSpec prints `2.1.0`; `doctor` reports the OpenSpec root. If the
target project has no `openspec/` yet, that is expected before initialization.

## First use

See [`WALKTHROUGH.md`](WALKTHROUGH.md) for a full new-repository and
existing-repository walkthrough.

Minimal new-repository prompt:

```text
Use stage-openspec-init for this repository.
Mode: new. Profile: standard.
Do a read-only audit first and show me the files, placeholders, open decisions,
and validation commands. Do not write until I confirm.
```

## Upgrade

```bash
cd /path/to/stage-openspec-skills
git pull
# If you copied the skills, replace the copies:
rm -rf /path/to/your-project/.claude/skills/stage-openspec-init
cp -R skills/stage-openspec-init /path/to/your-project/.claude/skills/
```

Review the diff before replacing a copied skill. Generated project files are
not overwritten by an upgrade; they are owned by the target repository.

## Uninstall

Remove the copied skill directories:

```bash
rm -rf .claude/skills/stage-openspec-init
rm -rf .claude/skills/stage-project-bootstrap
rm -rf .claude/skills/stage-change-workflow
```

This does not remove the governance files the skills generated. Remove those
deliberately, with review; they are part of the project's history.

## Troubleshooting

| Symptom | Check | Action |
|---|---|---|
| Agent cannot find a skill | `ls .claude/skills/<name>/SKILL.md` | Copy the whole directory, not only the Markdown file |
| `openspec: command not found` | `command -v openspec`, `node --version` | Follow the toolchain guidance in the init skill; install with approval |
| Wrong OpenSpec version | `openspec --version` | Stop; pin `@fission-ai/openspec@2.1.0`; do not auto-upgrade |
| `EACCES` on global install | `npm prefix -g` | Prefer project-local install; do not use `sudo` by default |
| Skill starts writing without a dry-run | Read `SKILL.md` guardrails | Stop the agent; require a file list and confirmation first |
| Generated docs contain `{{...}}` | Run the placeholder check from the skill | Replace all placeholders; do not ship template text |
