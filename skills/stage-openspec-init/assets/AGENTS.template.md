# {{PROJECT_NAME}} 协作规则

> 本文件由 `stage-openspec-init` 生成，状态：draft。项目负责人评审后才能视为已批准规则。
>
> 项目领域：{{PROJECT_DOMAIN}}
> 当前阶段：{{CURRENT_STAGE}}
> 负责人：{{OWNER}}
> 最后更新：{{DATE}}

## 1. 真源与读取顺序

开始工作前按顺序读取：

1. 本文件：硬约束、安全边界、禁止项。
2. `docs/workflow/RUNBOOK.md`：Stage/change 操作流程、门禁、命令和常见错误。
3. `docs/architecture.md`：目标设计；目标设计不等于已实现。
4. 当前 Stage brief 与 change map：从 `docs/stages/` 进入。
5. OpenSpec：`openspec/config.yaml`、`openspec/specs/`、`openspec/changes/`。

| 主题 | 真源 |
| --- | --- |
| 目标架构与职责边界 | `docs/architecture.md` |
| 当前阶段范围/AC/退出条件 | `docs/stages/stage-<N>-*-brief.md` |
| 并行拆解、依赖、wave、共享资源归属 | `docs/stages/stage-<N>-*-change-map.md`（两个以上 change 时） |
| 当前行为契约 | `openspec/specs/`（归档后） |
| 在途行为变更 | `openspec/changes/` |
| 工作流、门禁与命令 | `docs/workflow/RUNBOOK.md` |
| 阶段状态 | `docs/stages/` + 项目看板/路线图（如已有） |
| 验证证据 | 报告、测试输出、运行记录；不写进规格冒充事实 |

## 2. Stage 与 OpenSpec 的分工

Stage/change/Fast Track 的定义、两级门禁、change map 的 wave 门规则见 `docs/workflow/RUNBOOK.md` §2、§3；change 归档不等于 Stage 退出。

## 3. 标准流程

走 Stage、change 还是 Fast Track，以及 Stage/change 生命周期、artifacts、评审、实施与归档步骤见 `docs/workflow/RUNBOOK.md` §3–§5；工具链与命令见其 §8。

## 4. Fast Track

仅用于行为不变、无 API/权限/数据语义变化的小修。要求：

- 有明确的最小 diff；
- 有测试或可复核的验证；
- 提交说明写清目的、范围、验证和剩余风险；
- 不借 Fast Track 绕过 review、迁移、安全边界或 Stage 范围。

## 5. 常用命令

OpenSpec 安装方式：`{{OPENSPEC_INSTALL}}`。安装/开发/测试/检查/构建与 OpenSpec 的命令清单、命令前缀只维护在 `docs/workflow/RUNBOOK.md` §8；命令必须来自仓库真实配置。

## 6. 安全与数据

- 认证/授权默认 fail-closed；不引入默认 Principal、`AUTH_DISABLED` 或伪造身份。
- 未注册业务路由保持 `404`；健康端点不是匿名业务入口。
- 真实数据只在授权环境使用；记录来源、用途、哈希/范围（如适用）和清理方式。
- 合成夹具、模板页、本地测试通过不得写成真实数据/生产验收。
- 未签核阈值/规则只能输出技术结果，不能判定业务“合格”。
- 不提交 `.env`、token、数据库口令、客户数据或生产连接信息；日志/错误详情不泄露秘密。
- 启停服务/容器/数据库/Worker 前先判级 L0–L2（规则见 `docs/workflow/RUNBOOK.md` §7.1）；命中 L2（生产、真实数据/凭据、权限或基础设施变更、不可逆、公网暴露、关闭鉴权）即停并逐次确认。先判级后执行，不留“先启动后补确认”。

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

- 不创建 `openspec/templates/`，不使用本地 OpenSpec 复制/包装脚本。
- 不自动批准 Stage、自动归档 change、自动 commit 或自动宣布完成。
- 不伪造 AC、证据、测试结果、认证、坐标、阈值或上游成功。
- 不覆盖用户改动；不把模板、草案或目录存在当成已实现。
- 不把 Stage AC 编号写进长期 capability 名称。
