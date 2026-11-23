# {{PROJECT_NAME}} 工作流 RUNBOOK

> 状态：draft，待项目负责人评审。
> 本文件说明 Stage 与 OpenSpec 怎么配合；规则真源是 `AGENTS.md` 和 `openspec/config.yaml`。
> 最后更新：{{DATE}}

## 1. 文档职责

职责划分与真源表见 `AGENTS.md` §1。本文件只写操作步骤、门禁与常见错误；一份事实只维护一个地方，其他文档用链接引用。

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

一个 Stage 有两个以上 change 时，change map 决定“什么时候做、能并行到什么程度”：

- 依赖边只表示可以开始；wave 是人工分批，分批依据（环境、评审带宽、合并冲突）写在 map 里；
- 每个 wave 有一道门；门在 map 的 §10 有 pass 记录才算通过，没记录就是没通过；
- 共享目录、共享清单和 capability 各有唯一 owner，非 owner 只提补丁；
- 归档顺序由 map 决定，同一 capability 串行归档。

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
- change 清单（依赖、wave 与归属见 change map）；
- 安全/数据/证据要求；
- 退出条件和开放决策。

Stage brief 不写行为细节；行为放 change 的 delta specs。

## 5. OpenSpec change 生命周期

1. **分类**：行为变化走 change；行为不变走 Fast Track；新模块/跨域/新边界走 Stage。
2. **命名**：OpenSpec 不校验 change 目录名，创建前先按约定命名：

   | 类型 | 目录名 | 例子 |
   | --- | --- | --- |
   | 能力/行为 change | `<领域>-<对象>`，kebab-case，**不带 Stage 前缀** | `quality-item-catalog`、`remote-quality-execution` |
   | 只属于某个 Stage、不产生 capability 的支撑 change（环境、工具、纯治理） | `stage-<n>-<用途>` | `stage-1-dev-environment` |

   名字描述行为边界，不写类名、文件路径、AC 编号；Stage 归属写在 Stage brief 变更清单、traceability 和路线图里，不编码进目录名，否则跨 Stage 修复后名字会说谎。change 名与 capability 名可以相同或不同，但要在 `proposal.md`/`traceability.md` 说明映射。已存在的 change 不为了统一而重命名，会断掉引用；新约定只用于新建 change。

3. **创建**：

```bash
openspec new change <change-name>
openspec instructions proposal --change <change-name>
openspec instructions specs --change <change-name>
openspec instructions design --change <change-name>
openspec instructions tasks --change <change-name>
```

4. **写 artifacts**：

- `proposal.md`：为什么现在做、改什么、不做什么、capabilities、影响；
- `specs/<capability>/spec.md`：ADDED/MODIFIED/REMOVED Requirements；每条 requirement 至少一个 WHEN/THEN scenario；
- `design.md`：只在有跨切面/数据/接口/迁移决策时写；
- `tasks.md`：可独立验证的任务，每条写验证方式；
- `traceability.md`：Stage AC → requirement/scenario → 计划证据。

5. **评审**：用户/负责人确认后才能实施；“artifacts 存在”不是实施授权。
6. **实施**：按 tasks 依赖顺序，并遵守 change map 的 wave 门；上一 wave 的门没有 pass 记录时不开始下一批。只有验证通过才勾选 task。
7. **归档**：

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

认证/授权、真实数据、秘密、未签核阈值与生产操作的硬约束见 `AGENTS.md` §6，这里不重复。证据分层与“无证据不得标 verified”见本文件 §6。

### 7.1 服务启停分级（唯一真源）

先判级再执行；命中更高一级条件即按更高一级处理，禁止“先启动后补确认”。

| 级别 | 适用 | 前置条件 | 确认与事后 |
| --- | --- | --- | --- |
| L0 本地自决 | 本地进程/容器，合成数据，无真实凭据，不对外暴露 | 只绑 localhost；合成数据；用完即拆；不得作为真实数据验收证据 | 直接执行，无需确认，无需落盘证据 |
| L1 change 内已授权 | 已评审 change 的 `tasks.md` 明确写了启停命令、环境和验证方式 | 仍限本地+合成数据；不得超出 task 写明的命令/环境 | 按 task 执行；在 task 备注记命令、时间、退出码、输出摘要 |
| L2 逐次确认 | 生产/预发、真实数据或真实凭据、权限或基础设施变更、不可逆操作、公网暴露、关闭鉴权 | 先停止并说明目的/环境/数据/影响面 | 每次重新请求确认；按批准范围执行；证据落 change 的 `evidence/` |

判定顺序：先查 L2，命中即停；再查 L1（change 已评审且 task 明确）；否则 L0。§8 的命令白名单只表示命令形态，**不等于自动 L0**——命中 L2 任一条件就升级。

L2 证据含命令、时间、退出码、输出摘要（先脱敏），与 `traceability.md` 的证据索引保持可追溯。分级只放宽本地启停，不放宽 change 实施授权、归档、Stage 退出或真实数据验收。

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
| 把拓扑层当 wave | 并行度与真实约束不符，关键路径失控 | wave 由人按环境/评审带宽分批，并写分批依据 |
| 并行 change 各自改 lockfile/聚合配置 | 合并冲突，构建长期红 | 共享清单由 change map 指定 owner 在门内统一更新 |
| 跳过 wave 门直接开下一个 change | 下游基于未稳定接口返工 | map 的 §10 没有 pass 记录就不开始下一批 |
| 用合成数据证明真实数据 | 证据造假 | 合成夹具只做自动化；真实验收另记 |
| 未签核阈值直接判定合格 | 业务结论无依据 | 只输出技术结果或 `NOT_EVALUATED` |
| 为了本地演示关闭鉴权 | 安全边界失效 | 用受控测试上下文，不对外暴露 |
