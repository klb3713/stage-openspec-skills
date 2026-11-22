# 中文术语表

本表只统一本仓库文档和对话中的中文译法，不改变规则。规则以英文 `SKILL.md`、项目内的 `AGENTS.md` 和 OpenSpec 规格为准。

| English | 建议中文 | 说明 |
|---|---|---|
| Stage | 阶段 / 交付阶段 | 一次较大的交付程序，包含范围、授权、验收条件和退出条件。 |
| Stage brief | 阶段说明 / Stage brief | 只写范围、AC、依赖、退出条件，不复制行为需求。 |
| change map | 变更地图 | 包含多个 change 的 Stage 的并行计划：依赖、wave、目录与能力归属、门记录、归档顺序；不是 OpenSpec artifact。 |
| wave | 波次 | 一批可以同时推进的 change。按评审能力、环境和冲突人工分批，并写明分批依据。 |
| depends_on | 前置依赖 | 允许开始前必须归档或所在 wave 已有门通过记录的前置 change；是使能条件，不是串行要求。 |
| Stage exit | 阶段退出 | 所有必需 change 归档、AC 有证据、报告和文档同步完成后，由负责人确认。 |
| change | 行为变更 | 一个可独立评审、实现、验证和归档的行为变更。 |
| OpenSpec change | OpenSpec 变更 | 放在 `openspec/changes/<name>/` 下的变更包。 |
| capability spec | 能力规格 | 描述系统当前行为的长期规格，位于 `openspec/specs/`。 |
| capability owner | 能力归属 | 某个 capability 的主写 change；同一 capability 同一时刻只有一个，归档按顺序串行。 |
| spec delta | 规格增量 | change 中对能力规格的 `ADDED`/`MODIFIED`/`REMOVED` 变更。 |
| archive | 归档 | 把已完成的 change 合并进主规格并移入归档目录。 |
| traceability | 追溯矩阵 | 把 Stage AC 映射到 capability、requirement、scenario 和证据。 |
| Fast Track | 快速通道 | 不改变行为的小修，不经完整 change 流程。 |
| lane | 工作通道 | 判断当前工作走 Stage、change 还是 Fast Track。 |
| gate | 门禁 | 进入下一阶段前必须满足的检查条件。 |
| gate record | 门记录 | 某个 wave 门的日期、命令、结果和确认人；没有记录即未通过。 |
| evidence | 证据 | 证明 AC 已满足的静态、单元、集成、真实数据或文档记录。 |
| AC | 验收条件 | 可编号、可验证的验收标准。 |
