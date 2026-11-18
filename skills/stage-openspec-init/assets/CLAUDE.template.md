# Claude Code 项目入口

> 本文件只做入口，不复制规则。开始工作前按顺序读取：
>
> 1. [`AGENTS.md`](AGENTS.md)：项目硬约束、命令、代码规范。
> 2. [`doc/workflow/RUNBOOK.md`](doc/workflow/RUNBOOK.md)：Stage 与 OpenSpec 的操作流程、门禁和命令。
> 3. [`doc/architecture.md`](doc/architecture.md)：目标设计；目标设计不等于已实现。
> 4. 当前 Stage brief（如有）：`doc/stages/`；light profile 可能没有 Stage 层。
> 5. OpenSpec：`openspec/config.yaml`、`openspec/specs/`、`openspec/changes/`。

## 工作规则

- 新功能、行为变化、接口/权限/数据语义变化：走 OpenSpec change，先规划后实施。
- 行为不变的 bug/样式/配置：可走 Fast Track，但保留测试和清晰提交说明。
- 不复制 `openspec/templates/`，不使用本地 OpenSpec 包装脚本；使用 `openspec new change` 和 `openspec instructions`。
- 不自动批准、不自动归档、不自动宣布 Stage 退出。
- 不伪造认证、坐标、上游成功或真实数据证据；未签核阈值不得判定“合格”。
- 需要真实数据、基础设施、生产操作或权限变更时，先停止并请求确认。

## 可用技能

- `stage-openspec-init`：从零/治理不完整项目建立 Stage + OpenSpec 骨架。
- `project-bootstrap`：审计/修复已有治理。
- `stage-change-workflow`：判断 Stage/change/Fast Track，生成 artifacts，执行门禁。

技能只是操作助手；规则真源仍是 `AGENTS.md`、`openspec/config.yaml` 和已归档的 `openspec/specs/`。
