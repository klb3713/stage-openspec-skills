# {{PROJECT_NAME}} 架构（draft）

> 状态：draft，未评审。本文只记录访谈中已知的事实和未决问题；不要把它当成已批准设计。
> 最后更新：{{DATE}}
> 负责人：{{OWNER}}

## 1. 目的与范围

{{PROJECT_DOMAIN}}

首个纵向切片：{{FIRST_SLICE}}

明确不交付：{{NON_GOALS}}

## 2. 已知事实

| 项 | 当前事实 | 来源 |
| --- | --- | --- |
| 技术栈 | {{STACK}} | 仓库/访谈 |
| 运行入口 | {{RUNTIME_ENTRY}} | 仓库 |
| 数据存储 | {{STORAGE}} | 仓库/访谈 |
| 身份/权限 | {{AUTH}} | 访谈 |
| 外部依赖 | {{EXTERNAL_DEPS}} | 仓库/访谈 |

## 3. 目标组件（待评审）

```text
{{COMPONENT_DIAGRAM}}
```

职责边界：

- {{COMPONENT_1}}：{{RESPONSIBILITY_1}}
- {{COMPONENT_2}}：{{RESPONSIBILITY_2}}
- {{COMPONENT_3}}：{{RESPONSIBILITY_3}}

## 4. 约束

- 安全：{{SECURITY_CONSTRAINTS}}
- 数据：{{DATA_CONSTRAINTS}}
- 兼容/版本：{{COMPATIBILITY_CONSTRAINTS}}
- 运维/环境：{{OPS_CONSTRAINTS}}
- 不引入：{{FORBIDDEN_TECH}}

## 5. 关键决策

| 编号 | 决策 | 备选 | 理由 | 状态 |
| --- | --- | --- | --- | --- |
| D1 | {{DECISION_1}} | {{ALTERNATIVE_1}} | {{RATIONALE_1}} | proposed |

## 6. 开放问题

| 编号 | 问题 | 影响 | 谁裁决 | 何时 |
| --- | --- | --- | --- | --- |
| Q1 | {{OPEN_QUESTION_1}} | {{IMPACT_1}} | {{DECIDER_1}} | {{WHEN_1}} |

## 7. 非目标

- {{NON_GOAL_1}}
- {{NON_GOAL_2}}
