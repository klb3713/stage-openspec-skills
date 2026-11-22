# 变更 Traceability：{{CHANGE_NAME}}

> 所属 Stage：`docs/stages/{{STAGE_FILE}}`
> 状态：draft
> 说明：Stage AC 编号只用于本 Stage 追溯，不写进长期 capability 的 requirement 名称。

## 1. Stage AC 映射

| Stage AC | Capability / Requirement | Scenario | 证据 | 状态 |
| --- | --- | --- | --- | --- |
| S{{STAGE_NUMBER}}-AC-01 | `{{CAPABILITY_1}}` / {{REQUIREMENT_1}} | {{SCENARIO_1}} | {{EVIDENCE_1}} | planned |
| S{{STAGE_NUMBER}}-AC-02 | `{{CAPABILITY_2}}` / {{REQUIREMENT_2}} | {{SCENARIO_2}} | {{EVIDENCE_2}} | planned |

## 2. 未覆盖与偏差

| 项 | 原因 | 处理 | 负责人 |
| --- | --- | --- | --- |
| {{GAP_1}} | {{GAP_REASON_1}} | {{GAP_ACTION_1}} | {{GAP_OWNER_1}} |

## 3. 证据索引

| 证据 | 位置 | 生成方式 | 备注 |
| --- | --- | --- | --- |
| {{EVIDENCE_ITEM_1}} | {{EVIDENCE_LOCATION_1}} | {{EVIDENCE_COMMAND_1}} | {{EVIDENCE_NOTE_1}} |

## 4. 归档检查

- [ ] 所有 requirement 至少有一个 scenario；
- [ ] 所有 Stage AC 有映射或明确偏差；
- [ ] 证据可复核，真实/合成数据分开；
- [ ] `openspec validate --all --strict` 通过；
- [ ] 主规格归档后已核对。
