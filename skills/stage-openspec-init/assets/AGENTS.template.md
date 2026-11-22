# {{PROJECT_NAME}} 协作规则

> 本文件由 `stage-openspec-init` 生成，状态：draft。项目负责人评审后才能视为已批准规则。
>
> 项目领域：{{PROJECT_DOMAIN}}
> 当前阶段：{{CURRENT_STAGE}}
> 负责人：{{OWNER}}
> 最后更新：{{DATE}}

## 1. 真源与读取顺序

开始工作前按顺序读取：

1. 本文件：硬约束、命令、安全边界。
2. `docs/workflow/RUNBOOK.md`：Stage/change 操作流程、门禁和常见错误。
3. `docs/architecture.md`：目标设计；目标设计不等于已实现。
4. 当前 Stage brief：从 `docs/stages/` 进入。
5. OpenSpec：`openspec/config.yaml`、`openspec/specs/`、`openspec/changes/`。

| 主题 | 真源 |
| --- | --- |
| 目标架构与职责边界 | `docs/architecture.md` |
| 当前阶段范围/AC/退出条件 | `docs/stages/stage-<N>-*-brief.md` |
| 当前行为契约 | `openspec/specs/`（归档后） |
| 在途行为变更 | `openspec/changes/` |
| 工作流与门禁 | `docs/workflow/RUNBOOK.md` |
| 阶段状态 | `docs/stages/` + 项目看板/路线图（如已有） |
| 验证证据 | 报告、测试输出、运行记录；不写进规格冒充事实 |

## 2. Stage 与 OpenSpec 的分工

- **Stage**：交付程序/治理单元，管范围、授权、跨域、资源/环境准入、AC、证据和退出。
- **OpenSpec change**：行为变更单元，管一次可观察行为的变化。
- **Fast Track**：行为不变的小修、样式、配置、文档；保留测试和清晰提交说明。
- 一个 Stage 可以包含多个 change；change 归档不等于 Stage 退出。
- Stage brief 不复制行为需求；行为需求放 delta specs。

两级门禁：

1. **change archive**：tasks 完成、证据可复核、traceability 一致、validate 通过、评审确认。
2. **Stage exit**：所有必需 changes 归档、Stage AC 有证据、报告完成、文档同步、负责人确认。

## 3. 标准流程

1. 读架构、RUNBOOK、当前 Stage brief、现有 specs/changes。
2. 判断走 Stage、change 还是 Fast Track。
3. 行为变化：创建/继续 change，先写 proposal 和 delta specs，再写 design/tasks。
4. 评审通过后才实施；按 tasks 依赖顺序推进。
5. 只有证据存在才勾选 task；测试成功、无效输入和关键拒绝路径都要覆盖。
6. 归档前跑 `openspec validate --all --strict`，检查 tasks/traceability/证据。
7. Stage 退出前写报告、同步文档，由负责人确认。

工具链：OpenSpec 2.1.0（{{OPENSPEC_INSTALL}}）；Node.js >=22.20.0。项目内安装时，所有 OpenSpec 命令前加 `npx` 或 `pnpm exec`。

OpenSpec 命令：

```bash
openspec new change <change-name>
openspec instructions proposal --change <change-name>
openspec instructions specs --change <change-name>
openspec instructions design --change <change-name>
openspec instructions tasks --change <change-name>
openspec validate --all --strict
openspec status --change <change-name>
openspec archive <change-name>
```

不要创建 `openspec/templates/`，不要使用本地复制脚本。

## 4. Fast Track

仅用于行为不变、无 API/权限/数据语义变化的小修。要求：

- 有明确的最小 diff；
- 有测试或可复核的验证；
- 提交说明写清目的、范围、验证和剩余风险；
- 不借 Fast Track 绕过 review、迁移、安全边界或 Stage 范围。

## 5. 常用命令

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
```

命令必须来自仓库真实配置；不要写未验证的命令。

## 6. 安全与数据

- 认证/授权默认 fail-closed；不引入默认 Principal、`AUTH_DISABLED` 或伪造身份。
- 未注册业务路由保持 `404`；健康端点不是匿名业务入口。
- 真实数据只在授权环境使用；记录来源、用途、范围和清理方式。
- 合成夹具、模板页、本地测试通过不得写成真实数据/生产验收。
- 不提交 `.env`、token、数据库口令、客户数据或生产连接信息。
- 不擅自启动服务、Docker、数据库、Worker 或生产操作；需要时先请求确认。

## 7. 代码风格

- 遵循仓库现有语言/框架规范；新增依赖先说明用途和替代方案。
- 类型、错误和边界要显式；不吞异常，不伪造成功。
- 新增功能与缺陷修复带测试，覆盖成功、无效输入和关键拒绝路径。
- 不通过删除断言、扩大 skip 或默认放行来修复门禁。

## 8. 技能

技能是操作助手，不是规则、授权或状态真源：

- `stage-openspec-init`：从零/治理不完整项目建立 Stage + OpenSpec 骨架。
- `stage-project-bootstrap`：审计/修复已有治理，不负责从零初始化。
- `stage-change-workflow`：判断 Stage/change/Fast Track，生成 artifacts，执行门禁。

其他技能按需加载；不得用技能输出替代本文件或 OpenSpec 规格。

## 9. 禁止

- 不自动批准 Stage、自动归档 change、自动 commit 或自动宣布完成。
- 不伪造 AC、证据、测试结果、认证、坐标、阈值或上游成功。
- 不覆盖用户改动；不把模板、草案或目录存在当成已实现。
- 不把 Stage AC 编号写进长期 capability 名称。
