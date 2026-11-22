# Stage + OpenSpec Skills

三个 repo-local skill，帮助 coding agent 使用**两层交付模型**：

- **Stage** 管交付程序：范围、授权、验收条件、证据、退出；
- **OpenSpec change** 管一个行为增量：proposal、delta specs、design/tasks、archive。

它们只是操作说明，不是框架，不引入运行时依赖、服务或第二套真源。生成到仓库里的文件才是规则；skill 只帮助 agent 按规则执行。

[English README](README.md)

## 为什么需要

只做“写个规格”的流程通常有两种失败：

1. 每个功能都变成孤立的小 change，没人对更大的交付和证据负责；
2. 整个交付变成一个巨型 change，主规格直到最后才更新。

这个项目把两件事分开：

| 层 | 回答的问题 | 产物 |
|---|---|---|
| Stage | 交付什么、给谁、要什么证据、谁批准退出？ | `docs/stages/stage-N-*-brief.md` + report |
| OpenSpec change | 哪个行为变了、怎么验证？ | `openspec/changes/<change>/` |
| Capability spec | 现在什么是真的？ | `openspec/specs/<capability>/spec.md` |

一个 Stage 可以包含多个 change；不需要新程序的改动可以独立成一个 change。**change archive 不等于 Stage exit。**

包含两个及以上 change 的 Stage 还会维护一份 change map：依赖关系、wave 分批及分批依据、目录与能力归属、以及每个 wave 的门记录。OpenSpec 没有跨 change 依赖模型，所以 map 只是仓库自己的计划文档，不是 OpenSpec artifact，也不复制行为需求。

## 包含的 skill

| Skill | 用途 | 不会做 |
|---|---|---|
| [`stage-openspec-init`](skills/stage-openspec-init/SKILL.md) | 为新仓库/治理不完整仓库建立 Stage + OpenSpec 骨架；检测并引导安装 OpenSpec | 写业务代码、批准 Stage、自动 archive 或 commit |
| [`stage-project-bootstrap`](skills/stage-project-bootstrap/SKILL.md) | 审计并最小修复已有治理层的文档/命令/状态漂移 | 新建治理层、批量建 Stage、实现功能 |
| [`stage-change-workflow`](skills/stage-change-workflow/SKILL.md) | 判断 Stage/change/Fast Track；生成 artifacts；按 change map 的 wave 准入；执行评审、实施、归档门禁 | 自动批准、自动归档、自动 Stage 退出、伪造证据 |

`stage-openspec-init` 是入口，另外两个负责日常操作和修复。

## 要求

- **Node.js >= 22.20.0**（OpenSpec CLI 的 engine 要求）。
- **OpenSpec 2.1.0**。skill 使用 `openspec new change`、`openspec instructions`、`openspec validate --all --strict`、`openspec archive`；其他版本行为可能不同。
- **git**。skill 会读 `git status`，不自动提交。
- 能读文件并运行 shell 的 agent（Claude Code、Codex 或其他 coding agent）。

init skill 会先检测工具链。缺少 OpenSpec 时给出精确安装命令并等待确认；不会静默安装、升级，也不会用 `sudo`/`latest`。

## 语言策略

skill 用英文编写，英文是唯一权威指令，不维护第二份全文翻译，避免规则漂移。

- **回复跟随用户。** 中文请求用中文回复。
- **生成文档跟随项目。** `stage-openspec-init` 按项目主语言生成 `AGENTS.md`、`RUNBOOK.md`、Stage brief 和 change 正文；中文项目通常使用中文。
- **OpenSpec 结构保持英文。** `## ADDED Requirements`、`SHALL`/`MUST`、CLI 命令、文件路径和代码标识符不翻译。
- **已加入中文触发词。** 每个 skill 的 `description` 末尾都有中文触发语，例如“建立 Stage/OpenSpec 治理”“准备归档”，中文请求不需要全文翻译也能正确路由。

术语统一见 [中文术语表](docs/GLOSSARY.zh-CN.md)。

## 安装

这些 skill 是 **repo-local** 的，没有全局安装包。

### Claude Code

```bash
git clone https://github.com/klb3713/stage-openspec-skills.git
cd /path/to/your-project
mkdir -p .claude/skills
cp -R /path/to/stage-openspec-skills/skills/* .claude/skills/
```

Claude Code 会自动发现 `.claude/skills/<name>/SKILL.md`。如果希望跟随上游更新，也可以对每个 skill 建 symlink。

### Codex / 其他 agent

没有统一的 skill 安装器。克隆仓库后任选一种：

- 让 agent 直接读 `skills/<name>/SKILL.md` 及其引用的文件；
- 把 skill 目录复制到 agent 的项目级技能目录；
- 在项目 `AGENTS.md` 加一行：

```text
Stage/OpenSpec 相关任务先读 skills/stage-openspec-init/SKILL.md 及其 references/assets。
```

不要只复制 `SKILL.md`：`stage-openspec-init` 还需要 `assets/` 和 `references/`。

### 验证

在本仓库运行：

```bash
node scripts/check-skills.mjs
```

在目标项目中，确认工具链可用后运行：

```bash
openspec --version   # 必须是 2.1.0
openspec doctor
```

## 快速开始

### 新仓库

```text
使用 stage-openspec-init 为这个仓库建立治理。
模式：new；档位：standard。
先做只读体检，然后给我：
- 要创建的文件，
- 占位符和开放决策，
- 工具链方案，
- 验证命令。
我确认前不要写文件。
```

确认后，skill 生成最小治理骨架和一个 OpenSpec change，并在实施前停下。

之后用日常流程：

```text
使用 stage-change-workflow 判断并规划下一个切片。
先读当前 Stage brief 和 OpenSpec specs。
我批准计划前不要写代码。
```

### 已有仓库

```text
使用 stage-project-bootstrap 审计这个仓库的 Stage/OpenSpec 治理。
用表格报告：area | finding | severity | proposed action。
不要创建缺失的治理文件；治理层不存在时交给 stage-openspec-init。
不要重写历史或批量建 Stage。
```

## `stage-openspec-init` 生成什么

`standard` 档位：

```text
AGENTS.md
CLAUDE.md
README.md                 # 只加一段工作流入口
docs/architecture.md       # draft，明确未评审
docs/workflow/RUNBOOK.md
docs/workflow/templates/stage-brief.md
docs/workflow/templates/traceability.md
docs/workflow/templates/change-map.md
docs/stages/stage-0-baseline.md
docs/stages/stage-1-<slice>-brief.md
docs/stages/stage-1-<slice>-change-map.md  # Stage 计划两个及以上 change 时
openspec/config.yaml
openspec/changes/<first-change>/
  proposal.md
  specs/<capability>/spec.md
  design.md               # 按需
  tasks.md
  traceability.md
```

`light` 不建 Stage 层；`heavy` 增加更严的证据和资源批准要求。见 [`references/profiles.md`](skills/stage-openspec-init/references/profiles.md)。

模板是中文优先的示例；生成文档使用项目主语言，模板内容可翻译。OpenSpec 结构标题和 `SHALL`/`MUST` 保持英文。

## 安全约束

- 不静默全局安装、升级、`sudo` 或 `latest`；
- 不自动批准、archive、commit、Stage 退出或宣称生产可用；
- 不伪造认证、真实数据证据、阈值、测试结果或上游成功；
- 不用 `openspec/templates/` 复制流程，不建本地 wrapper；
- 不读取 `.env` 值、token、客户数据或未脱敏样本；
- 未知信息写成开放决策，不编造事实。

## 仓库结构

```text
skills/
  stage-openspec-init/
    SKILL.md
    assets/            # 复制到目标仓库的模板
    references/        # 工具链与档位说明
  stage-project-bootstrap/
    SKILL.md
  stage-change-workflow/
    SKILL.md
docs/
  DESIGN.md
  GLOSSARY.zh-CN.md
  WALKTHROUGH.md
  installation.md
scripts/
  check-skills.mjs
.github/workflows/check.yml
```

## 开发

```bash
node scripts/check-skills.mjs
```

检查 frontmatter、skill 名称、必需资产、本地链接和误入的绝对路径；无第三方依赖。

## 兼容性

- OpenSpec CLI：**2.1.0**
- Node.js：**>= 22.20.0**
- Agent：Claude Code、Codex，或其他能读 `SKILL.md`、能运行 shell 的 agent
- 版本：skill 契约稳定前保持 `0.x`；项目里使用时固定仓库 revision

## 贡献

见 [`CONTRIBUTING.md`](CONTRIBUTING.md)。修改工作流模型前先开 issue 讨论。

## 许可证

MIT，见 [`LICENSE`](LICENSE)。
