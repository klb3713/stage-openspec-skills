# Contributing

Thanks for improving the Stage + OpenSpec skills.

## Ground rules

- The skill instructions are the product. Keep them concrete, trigger-oriented, and honest about what is not verified.
- The generated repository files are the rule source. A skill must not claim to be a second source of truth.
- Never add automatic approval, archive, commit, Stage exit, or production claims.
- Never add fake evidence, credentials, customer data, or project-specific absolute paths.
- Keep OpenSpec compatibility at **2.1.0** and Node.js at **>= 22.20.0** unless the change explicitly raises the requirement and updates all docs.

## Add or change a skill

Each skill lives in `skills/<name>/` with a `SKILL.md` that starts with:

```yaml
---
name: <name>
description: <when to use, and when not to>
---
```

Optional supporting files:

```text
references/   # background, toolchain details, profiles
assets/       # templates copied or adapted into a target repository
```

Rules:

1. The directory name and frontmatter `name` must match.
2. The description must say both when to use the skill and when to hand off to another skill.
3. Local links in `SKILL.md` and `references/` must resolve from that file.
4. `assets/` may contain destination-relative links and `{{PLACEHOLDER}}` values; that is intentional.
5. Do not add a `scripts/` wrapper for OpenSpec. Use the official CLI.
6. Do not add project names, company names, or `/Users/...` paths to a reusable skill.

## Validate

```bash
node scripts/check-skills.mjs
```

The check is dependency-free. It validates:

- frontmatter and name/directory agreement;
- required assets for `stage-openspec-init`;
- local links in skill instructions and references;
- accidental absolute paths or project-specific references.

Run it before opening a pull request. CI runs the same command on Node 22.

## Pull request checklist

- [ ] The change explains the user problem, not only the edited text.
- [ ] Skill descriptions still trigger at the right moment.
- [ ] Handoffs between `stage-openspec-init`, `stage-project-bootstrap`, and `stage-change-workflow` remain unambiguous.
- [ ] No secret, real customer data, absolute path, or fake evidence was added.
- [ ] `node scripts/check-skills.mjs` passes.
- [ ] README / README.zh-CN / docs are updated when behavior changes.
- [ ] `CHANGELOG.md` has an entry for user-visible changes.

## Compatibility and versioning

- Keep the three skills usable together. A change to one may require a matching change to another.
- `0.x` releases may change skill instructions; pin a repository revision in projects that need stability.
- When raising the OpenSpec or Node requirement, update README, README.zh-CN, the toolchain reference, and CI in the same pull request.

## License

By contributing, you agree that your contribution is licensed under the MIT License in [`LICENSE`](LICENSE).
