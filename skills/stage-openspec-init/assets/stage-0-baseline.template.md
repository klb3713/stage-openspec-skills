# Stage 0 基线：{{PROJECT_NAME}}

> 状态：draft，待评审。Stage 0 只记录真实起点和约束，不交付业务能力。
> 基线日期：{{DATE}}
> 代码基线：{{COMMIT}}
> 设计基线：`docs/architecture.md`（draft）

## 1. 目的

在开始 Stage 1 之前，把“仓库里已经有什么、没有什么、哪些只是目标设计”记录清楚，避免把脚手架、模板页或文档描述当成已实现能力。

## 2. 当前事实

### 2.1 代码与运行入口

| 区域 | 当前事实 | 结论 |
| --- | --- | --- |
| {{AREA_1}} | {{FACT_1}} | {{CONCLUSION_1}} |
| {{AREA_2}} | {{FACT_2}} | {{CONCLUSION_2}} |
| {{AREA_3}} | {{FACT_3}} | {{CONCLUSION_3}} |

### 2.2 文档与规格

| 文档 | 当前事实 |
| --- | --- |
| `AGENTS.md` | {{AGENTS_STATUS}} |
| `README.md` | {{README_STATUS}} |
| `docs/architecture.md` | draft；目标设计不等于已实现 |
| `openspec/config.yaml` | schema `spec-driven`；{{PROJECT_LANGUAGE}} artifacts，结构标题/SHALL/MUST 英文 |
| `openspec/specs/` | {{SPECS_STATUS}} |
| `openspec/changes/` | {{CHANGES_STATUS}} |

### 2.3 已确认的工程方向

- {{DIRECTION_1}}
- {{DIRECTION_2}}
- {{DIRECTION_3}}

### 2.4 尚未决定或尚未具备

| 事项 | 状态 | 影响 |
| --- | --- | --- |
| {{UNKNOWN_1}} | {{UNKNOWN_STATUS_1}} | {{UNKNOWN_IMPACT_1}} |
| {{UNKNOWN_2}} | {{UNKNOWN_STATUS_2}} | {{UNKNOWN_IMPACT_2}} |

## 3. 风险与约束

1. **把目标设计当已实现**：架构中的目录、对象和接口多数是目标态。
2. **用脚手架冒充业务环境**：模板代码、演示数据、本地 Compose 不是生产证据。
3. **用合成数据冒充真实数据**：合成夹具只能验证流程。
4. **绕过认证**：不得增加默认 Principal、`AUTH_DISABLED` 或伪造身份。

## 4. Stage 0 验收条件

| 编号 | 验收条件 | 证据 |
| --- | --- | --- |
| S0-AC-01 | `AGENTS.md`/`README.md`/`CLAUDE.md` 指向真实架构、工作流和当前 Stage，无模板占位符 | 链接/占位符检查 |
| S0-AC-02 | `openspec/config.yaml` 含项目约束，`openspec validate --all --strict` 可执行 | 命令输出 |
| S0-AC-03 | 当前 Stage brief 已起草，至少一个 change 已提案；提案不等于实施授权 | 文件 |
| S0-AC-04 | 不再有 `openspec/templates/` 复制流程或本地 OpenSpec 包装脚本 | `git grep` |
| S0-AC-05 | 文档链接可解析 | 链接检查 |
| S0-AC-06 | 本轮不新增业务代码、不启动服务、不改真实数据 | `git diff` |

## 5. 退出条件

- S0-AC-01 至 S0-AC-06 有证据；
- 当前 Stage brief 经负责人评审；
- 至少一个 change 通过 `openspec validate --all --strict`；
- 文档同步清单已核对；
- 负责人确认 Stage 0 退出。

Stage 0 退出不等于 Stage 1 实施授权；代码、环境、真实数据和服务启动仍需单独确认。

## 6. 后续入口

- 工作流：`docs/workflow/RUNBOOK.md`
- 当前 Stage：`docs/stages/{{CURRENT_STAGE_FILE}}`
- 首个变更：`openspec/changes/{{FIRST_CHANGE}}/proposal.md`
- 目标架构：`docs/architecture.md`
