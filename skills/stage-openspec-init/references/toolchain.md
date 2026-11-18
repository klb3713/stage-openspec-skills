# OpenSpec toolchain bootstrap

Use this before `openspec init` and whenever `openspec` is missing, broken, or not the expected version. The target toolchain is:

- OpenSpec **2.1.0** with the `spec-driven` schema.
- Node.js **>=22.20.0** (the CLI's own engine requirement).
- npm or pnpm available.
- The current directory is the target git repository.

The skill does not silently install, upgrade, or reconfigure Node/npm. Ask before any machine-wide change; prefer project-local when global installation is not permitted.

## 1. Detect (read-only)

Run:

```bash
pwd
git rev-parse --is-inside-work-tree
git status --short --branch
git --version
node --version
npm --version
openspec --version
```

A missing command or `not a git repository` is a finding, not a reason to guess. If the directory is not a git repository, stop and ask whether to run `git init`; do not commit or create a remote automatically.

Also check:

```bash
npm config get registry
openspec doctor
```

Detect the package manager before choosing a project-local install:

```bash
ls package-lock.json pnpm-lock.yaml yarn.lock 2>/dev/null || true
```

`openspec doctor` before init may report that there is no OpenSpec root; that is expected. After init it should report the root as ok.

## 2. Choose the installation path

| State | Action |
|---|---|
| Not a git repository | Stop; ask whether to run `git init`. Do not create commits, remotes, or ignore rules automatically. |
| OpenSpec 2.1.0 is available | Record the version and continue. |
| OpenSpec is missing, Node >=22.20.0 is available | Choose one installation path below; ask before running it. |
| OpenSpec is installed but not 2.1.0 | Stop. Do not auto-upgrade. Record the version, explain the mismatch, and ask whether to upgrade or use the existing version. |
| Node is missing or older than 22.20.0 | Stop. Guide the user to install Node 22 LTS (official installer, nvm, or the team's package manager). Do not install Node unprompted. |
| `openspec` was just installed but is not on `PATH` | Check `npm prefix -g`, restart the shell, or use the project-local command. Do not use `sudo` to work around PATH. |
| Global install is denied (`EACCES`, sandbox, policy) | Use project-local installation; do not escalate with `sudo`. |
| No network or restricted registry | Use the team's mirror and verify the package name/version; otherwise hand off and stop. |
| No package manager / no lockfile | Use the global path, or ask before creating `package.json`; do not pick a manager silently. |
| The agent cannot run shell commands | Give the user the exact commands below and pause until they confirm the result. |

### Option A: global install (machine-wide)

```bash
npm install -g @fission-ai/openspec@2.1.0
openspec --version
```

Use only with explicit approval. Do not use `sudo` by default. Document that every machine and CI runner needs this install.

### Option B: project-local install (recommended for teams)

```bash
# npm
npm install --save-dev @fission-ai/openspec@2.1.0
npx openspec --version

# or pnpm
pnpm add -D @fission-ai/openspec@2.1.0
pnpm exec openspec --version

# or yarn
yarn add -D @fission-ai/openspec@2.1.0
yarn openspec --version
```

This changes `package.json`/lockfile; ask first. If the repository has no package manager setup, do not create one just for OpenSpec without approval — use the global path or ask.

When using project-local mode, prefix every OpenSpec command in the runbook with `npx`/`pnpm exec`, or record the exact invocation. Do not mix a global 2.1.0 with a local different version.

### Option C: ephemeral (not recommended for regular work)

```bash
npx --yes @fission-ai/openspec@2.1.0 --version
```

This downloads on demand and is not reproducible for a team. Use only for a one-off check when installation is not possible.

## 3. Verify and record

```bash
openspec --version      # must print 2.1.0
openspec doctor         # root status; after init: ok
```

After initialization:

```bash
openspec list
openspec list --specs
openspec status --change <change-name>
openspec validate --all --strict
```

Record in the generated `AGENTS.md`/`RUNBOOK.md`/`README.md`:

- OpenSpec 2.1.0;
- global or project-local installation;
- the exact command prefix (`openspec`, `npx openspec`, or `pnpm exec openspec`);
- the validation command `openspec validate --all --strict`.

Do not create a local wrapper script or `openspec/templates/`.

### CI / reproducibility

If the repository has CI, recommend adding one validation step and ask before editing CI:

```bash
# project-local install: install from the committed lockfile first
npm ci
# or: pnpm install --frozen-lockfile
# or: yarn install --immutable
npx openspec validate --all --strict

# global install
npm install -g @fission-ai/openspec@2.1.0
openspec validate --all --strict
```

For project-local installs, CI must install from the committed lockfile first. For global installs, pin the exact version in the CI image/script. Do not add secrets or a private registry token to the repository just for OpenSpec.

Commit `openspec/config.yaml`, `openspec/specs/`, and `openspec/changes/`; do not add them to `.gitignore`.

## 4. Troubleshooting

| Symptom | Check | Action |
|---|---|---|
| `openspec: command not found` | `command -v openspec`, `npm prefix -g`, `echo "$PATH"` | Refresh PATH, or use `npx`/`pnpm exec`; do not assume installation succeeded. |
| `EACCES` during global install | `npm prefix -g` | Use project-local install; do not use `sudo` unless the user explicitly accepts the risk. |
| Wrong version | `openspec --version` | Stop; ask before upgrading. Pin `@fission-ai/openspec@2.1.0`. |
| Node engine error | `node --version` | Install Node >=22.20.0; re-run detection. |
| `init` would overwrite files | `git status`, `openspec/` contents | Do not overwrite; use `adopt` mode and inspect existing config. |
| Registry/proxy failure | `npm config get registry` | Use the team's registry; do not switch to an untrusted mirror. |
| CLI works in one shell but not another | `which openspec`, `npm prefix -g` | Fix PATH or standardize on project-local commands. |

## 5. Closed-loop checklist

- [ ] Current directory is a git repository; if not, `git init` was explicitly approved and no commit was made.
- [ ] Node and npm versions detected and recorded.
- [ ] OpenSpec 2.1.0 available and verified with `openspec --version`.
- [ ] `openspec doctor` checked.
- [ ] Installation method and command prefix recorded.
- [ ] `openspec init` completed, or existing `openspec/` inspected without overwrite.
- [ ] `openspec doctor` reports the root as ok.
- [ ] `openspec list`, `list --specs`, and `status --change` work.
- [ ] `openspec validate --all --strict` passes.
- [ ] CI/pre-commit validation was proposed as applicable; it was not edited without approval.
- [ ] No `openspec/templates/` or local wrapper script was created.
- [ ] Handoff names the toolchain, version, and any remaining install/approval action.
