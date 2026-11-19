# {{PROJECT_NAME}} 工作流 RUNBOOK

> 状态：draft，待项目负责人评审。
> 本文件说明 Stage 与 OpenSpec 怎么配合；规则真源是 `AGENTS.md` 和 `openspec/config.yaml`。
> 最后更新：{{DATE}}

## 1. 真源与文档职责

| 文档 | 负责 | 不负责 |
| --- | --- | --- |
| `AGENTS.md` | 硬约束、命令、安全边界 | 具体行为需求 |
| `doc/architecture.md` | 目标设计、职责边界、关键决策 | 实施状态、验收证据 |
| `doc/stages/stage-<N>-*-brief.md` | 范围、AC、非目标、退出条件 | 行为细节 |
| `openspec/specs/<capability>/spec.md` | 当前行为契约 | 阶段状态、路线图 |
| `openspec/changes/<change>/` | 在途行为变更 | 阶段验收结论 |
| `doc/workflow/RUNBOOK.md` | 操作步骤、门禁、常见错误 | 总体设计 |
| 报告/测试输出/运行记录 | 证据 | 需求定义 |

一份事实只维护一个地方；其他文档用链接引用。

## 2. 两级模型

```text
Stage（治理单元）
├── change A（行为单元） → archive → openspec/specs/
├── change B（行为单元）
└── Stage 报告 / AC 证据 / 文档同步 / 负责人确认
```

- **Stage**：一段时间内的交付范围、授权、跨域协调、资源/环境准入、AC、证据和退出。
- **change**：一次可观察行为变化；归档后更新主规格。
- **Fast Track**：行为不变的小修；不建 change。

两级门禁不能合并：

1. change archive：tasks 完成、证据可复核、traceability 一致、validate 通过。
2. Stage exit：所有必需 changes 归档、Stage AC 有证据、报告完成、文档同步、负责人确认。

## 3. 流程档位

| 档位 | 适用 | 最小治理 |
| --- | --- | --- |
| 轻 | 原型、内部工具、单人 | `AGENTS.md` + `openspec/config.yaml` + change；不建 Stage |
| 中 | 正常产品、2–5 人 | 轻 + Stage 0 基线 + 当前 Stage brief + traceability |
| 重 | 安全/合规、多团队、生产门禁 | 中 + 更严格的证据/报告/资源批准 |

默认中档。不要一开始复制大型项目的全部 Stage。

## 4. Stage 生命周期

`draft → approved → in_progress → partial → exited`

- **draft**：范围/AC 可讨论，不能据此实施。
- **approved**：负责人确认范围、AC、非目标、资源和退出条件。
- **in_progress**：按 change 推进；未完成项保留。
- **partial**：部分交付，必须写清未完成项和影响。
- **exited**：退出条件有证据满足；不是“目录存在”或“代码写完”。

Stage brief 必须写：

- 目的、交付、明确不交付；
- 前置条件和未满足时的处理；
- 可编号 AC（如 `S1-AC-01`）；
- change 清单；
- 安全/数据/证据要求；
- 退出条件和开放决策。

Stage brief 不写行为细节；行为放 change 的 delta specs。

## 5. OpenSpec change 生命周期

1. **分类**：行为变化走 change；行为不变走 Fast Track；新模块/跨域/新边界走 Stage。
2. **创建**：

```bash
openspec new change <change-name>
openspec instructions proposal --change <change-name>
openspec instructions specs --change <change-name>
openspec instructions design --change <change-name>
openspec instructions tasks --change <change-name>
```

3. **写 artifacts**：

- `proposal.md`：为什么现在做、改什么、不做什么、capabilities、影响；
- `specs/<capability>/spec.md`：ADDED/MODIFIED/REMOVED Requirements；每条 requirement 至少一个 WHEN/THEN scenario；
- `design.md`：只在有跨切面/数据/接口/迁移决策时写；
- `tasks.md`：可独立验证的任务，每条写验证方式；
- `traceability.md`：Stage AC → requirement/scenario → 计划证据。

4. **评审**：用户/负责人确认后才能实施；“artifacts 存在”不是实施授权。
5. **实施**：按依赖顺序；只有验证通过才勾选 task。
6. **归档**：

```bash
openspec validate --all --strict
openspec status --change <change-name>
openspec archive <change-name>
```

归档前确认 tasks、证据、traceability、真实/合成数据边界；归档不等于 Stage 退出。

## 6. AC 追溯

- Stage AC 编号只在本 Stage 使用，不写进长期 capability 名称。
- 每条 AC 至少映射到一个 requirement/scenario，或明确标记“未覆盖/延后”。
- 证据分层：静态/契约、单元、集成、真实数据、文档。
- 没有证据的 AC 只能标 `planned` 或 `not passed`，不能标 `verified`。
- 归档时 traceability 必须能回答：哪条 AC、哪个行为、哪次验证、什么环境。

## 7. 安全与数据门禁

- 认证/授权 fail-closed；不引入默认 Principal、`AUTH_DISABLED` 或伪造身份。
- 未注册路由 `404`；健康端点不是匿名业务入口。
- 真实数据只在授权环境使用；记录来源、用途、哈希/范围（如适用）和清理方式。
- 合成夹具只能证明流程，不能证明真实数据验收。
- 未签核阈值/规则只能输出技术结果，不能判定业务“合格”。
- 不提交秘密；日志/错误详情不泄露秘密。
- 不擅自启动服务、Docker、数据库、Worker 或生产操作。

## 8. 常用命令

工具链：OpenSpec 2.1.0、Node.js >=22.20.0；项目内安装时，下面所有 OpenSpec 命令前加 `npx` 或 `pnpm exec`。

```bash
# 安装/同步依赖
{{INSTALL_CMD}}

# 开发
{{DEV_CMD}}

# 测试
{{TEST_CMD}}

# 静态检查/格式
{{LINT_CMD}}

# 构建
{{BUILD_CMD}}

# OpenSpec
openspec list
openspec list --specs
openspec validate --all --strict
openspec status --change <change-name>
```

## 9. 常见错误

| 错误 | 后果 | 正确做法 |
| --- | --- | --- |
| 把 Stage brief 写成行为规格 | 与 capability spec 双真源 | Stage 只写范围/AC/退出；行为放 change |
| 用 `openspec archive` 代替 Stage 退出 | 把变更完成误读为阶段验收 | 两级门禁分开 |
| 用 `openspec status` 判断已评审 | 未评审的变更被当成批准 | 审批记录放 Stage/报告 |
| 复制旧模板或旧脚本 | 产生第二套流程 | 用 `openspec new change` + `instructions` |
| 一个 change 塞整个 Stage | 无法独立评审/归档 | 按行为边界拆 change |
| 用合成数据证明真实数据 | 证据造假 | 合成夹具只做自动化；真实验收另记 |
| 未签核阈值直接判定合格 | 业务结论无依据 | 只输出技术结果或 `NOT_EVALUATED` |
| 为了本地演示关闭鉴权 | 安全边界失效 | 用受控测试上下文，不对外暴露 |

## 10. 当前状态

- 当前 Stage：{{CURRENT_STAGE}}
- 当前 change：{{FIRST_CHANGE}}
- 主规格：{{SPECS_STATUS}}
- 未决事项：{{OPEN_DECISIONS}}

## 11. 技能分工

- `stage-openspec-init`：从零建立治理（本文件就是它生成的）。
- `stage-project-bootstrap`：审计/修复已有治理。
- `stage-change-workflow`：日常分类、artifacts、门禁。

技能只是操作助手；规则以仓库文件为准。
