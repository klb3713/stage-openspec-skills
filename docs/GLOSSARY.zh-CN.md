# 中文术语表

本表只统一本仓库文档和对话中的中文译法，不改变规则。规则以英文 `SKILL.md`、项目内的 `AGENTS.md` 和 OpenSpec 规格为准。

| English | 建议中文 | 说明 |
|---|---|---|
| Stage | 阶段 / 交付阶段 | 一次较大的交付程序，包含范围、授权、验收条件和退出条件。 |
| Stage brief | 阶段说明 / Stage brief | 只写范围、AC、依赖、退出条件，不复制行为需求。 |
| Stage exit | 阶段退出 | 所有必需 change 归档、AC 有证据、报告和文档同步完成后，由负责人确认。 |
| change | 行为变更 | 一个可独立评审、实现、验证和归档的行为变更。 |
| OpenSpec change | OpenSpec 变更 | 放在 `openspec/changes/<name>/` 下的变更包。 |
| capability spec | 能力规格 | 描述系统当前行为的长期规格，位于 `openspec/specs/`。 |
| spec delta | 规格增量 | change 中对能力规格的 `ADDED`/`MODIFIED`/`REMOVED` 变更。 |
| archive | 归档 | 把已完成的 change 合并进主规格并移入归档目录。 |
| traceability | 追溯矩阵 | 把 Stage AC 映射到 capability、requirement、scenario 和证据。 |
| Fast Track | 快速通道 | 不改变行为的小修，不经完整 change 流程。 |
| lane | 工作通道 | 判断当前工作走 Stage、change 还是 Fast Track。 |
| gate | 门禁 | 进入下一阶段前必须满足的检查条件。 |
| evidence | 证据 | 证明 AC 已满足的静态、单元、集成、真实数据或文档记录。 |
| AC | 验收条件 | 可编号、可验证的验收标准。 |
