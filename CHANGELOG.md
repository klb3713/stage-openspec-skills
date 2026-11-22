# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
semantic versioning for skill contracts.

## [Unreleased]

### Changed

- Changed the generated documentation directory from `doc/` to `docs/` across
  `stage-openspec-init` templates, skill instructions, and reference docs.
- Renamed `project-bootstrap` to `stage-project-bootstrap` to make its Stage
  layer role explicit. The skill contract is unchanged.
- Added a shared language policy and Chinese trigger phrases to all three
  skills, plus a Chinese glossary, so Chinese requests route correctly while
  generated project documents follow the project language.
- Added cross-Stage correction routing and a checklist to
  `stage-change-workflow`, so defects in an exited Stage are handled as a
  correction change or a Stage amendment instead of rewriting history.
- Added a change directory naming convention to `stage-change-workflow` and
  the RUNBOOK template: behavior/capability changes use a behavior name with
  no Stage prefix; Stage ownership stays in the brief/traceability/roadmap.

## [0.1.0] - 2026-11-19

### Added

- `stage-openspec-init`: create a minimal Stage + OpenSpec governance skeleton
  for new or ungoverned repositories.
- `project-bootstrap`: audit and minimally repair an existing governance layer.
- `stage-change-workflow`: classify Stage/change/Fast Track work and run the
  planning, implementation, and archive gates.
- Toolchain detection and approval-gated OpenSpec installation guidance
  (OpenSpec 2.1.0, Node.js >= 22.20.0).
- Stage, change, traceability, and OpenSpec configuration templates.
- Dependency-free skill validation script and GitHub Actions workflow.
- English and Chinese READMEs, design notes, walkthrough, and MIT license.
