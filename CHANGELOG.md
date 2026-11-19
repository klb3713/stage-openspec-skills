# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
semantic versioning for skill contracts.

## [Unreleased]

### Changed

- Renamed `project-bootstrap` to `stage-project-bootstrap` to make its Stage
  layer role explicit. The skill contract is unchanged.

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
