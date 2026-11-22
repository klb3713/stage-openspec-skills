# Stage {{STAGE_NUMBER}} Brief：{{STAGE_TITLE}}

> 状态：draft
> 日期：{{DATE}}
> 设计依据：`docs/architecture.md`（draft）
> 首个变更：`openspec/changes/{{FIRST_CHANGE}}/proposal.md`
> 负责人：{{OWNER}}

## 1. 目的

{{PURPOSE}}

## 2. 范围

### 2.1 本 Stage 交付

- {{DELIVERABLE_1}}
- {{DELIVERABLE_2}}

### 2.2 明确不交付

- {{NON_DELIVERY_1}}
- {{NON_DELIVERY_2}}

### 2.3 前置条件

| 条件 | 说明 | 未满足时 |
| --- | --- | --- |
| {{PRECONDITION_1}} | {{PRECONDITION_DETAIL_1}} | {{PRECONDITION_FALLBACK_1}} |
| {{PRECONDITION_2}} | {{PRECONDITION_DETAIL_2}} | {{PRECONDITION_FALLBACK_2}} |

## 3. 领域与架构约束

- {{CONSTRAINT_1}}
- {{CONSTRAINT_2}}
- 不伪造认证、坐标、阈值、上游成功或真实数据证据。

## 4. 变更清单

| 变更 | 能力 | 状态 | 说明 |
| --- | --- | --- | --- |
| `{{FIRST_CHANGE}}` | `{{CAPABILITY_1}}` | proposed | {{CHANGE_DESCRIPTION_1}} |

## 5. 验收条件

| 编号 | 验收条件 | 主要证据 |
| --- | --- | --- |
| S{{STAGE_NUMBER}}-AC-01 | {{AC_1}} | {{EVIDENCE_1}} |
| S{{STAGE_NUMBER}}-AC-02 | {{AC_2}} | {{EVIDENCE_2}} |
| S{{STAGE_NUMBER}}-AC-03 | {{AC_3}} | {{EVIDENCE_3}} |

## 6. 安全、数据与证据

- {{SECURITY_DATA_1}}
- {{SECURITY_DATA_2}}
- 未签核规则/阈值只能输出技术结果，不能判定业务合格。

## 7. 退出条件

1. 所有必需 changes 已归档；
2. 所有 AC 有可复核证据；
3. `openspec validate --all --strict` 通过；
4. Stage 报告记录环境、命令、偏差、遗留；
5. 文档同步完成；
6. 负责人确认退出。

## 8. 开放决策

| 编号 | 问题 | 影响 | 处理 |
| --- | --- | --- | --- |
| S{{STAGE_NUMBER}}-D1 | {{OPEN_DECISION_1}} | {{DECISION_IMPACT_1}} | {{DECISION_HANDLING_1}} |

## 9. 参考

- `docs/architecture.md`
- `docs/workflow/RUNBOOK.md`
- `openspec/changes/{{FIRST_CHANGE}}/proposal.md`
