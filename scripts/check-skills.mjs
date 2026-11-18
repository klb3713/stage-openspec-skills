#!/usr/bin/env node

import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = path.join(root, "skills");
const errors = [];
const checkedLinks = new Set();

const requiredFiles = {
  "stage-openspec-init": [
    "assets/AGENTS.template.md",
    "assets/CLAUDE.template.md",
    "assets/RUNBOOK.template.md",
    "assets/openspec.config.yaml",
    "assets/architecture.template.md",
    "assets/stage-0-baseline.template.md",
    "assets/stage-brief.template.md",
    "assets/traceability.template.md",
    "references/profiles.md",
    "references/toolchain.md",
  ],
  "project-bootstrap": [],
  "stage-change-workflow": [],
};

const textExtensions = new Set([
  ".md",
  ".yaml",
  ".yml",
  ".json",
  ".mjs",
  ".js",
  ".ts",
  ".txt",
]);

const forbiddenStrings = [
  { value: "/Users/klb3713", label: "machine-specific absolute path" },
  { value: "/Applications/", label: "machine-specific absolute path" },
  { value: "C:\\Users\\", label: "machine-specific absolute path" },
  { value: "openfoundry", label: "OpenFoundry-specific reference" },
  { value: "tudou-geoqc", label: "project-specific reference" },
  { value: "GeoQC", label: "project-specific reference" },
];

function fail(message) {
  errors.push(message);
}

async function exists(target) {
  try {
    await stat(target);
    return true;
  } catch {
    return false;
  }
}

async function readFrontmatter(file) {
  const text = await readFile(file, "utf8");
  if (!text.startsWith("---\n")) {
    return { text, data: null, error: "missing frontmatter" };
  }

  const end = text.indexOf("\n---", 4);
  if (end === -1) {
    return { text, data: null, error: "unterminated frontmatter" };
  }

  const block = text.slice(4, end);
  const data = {};
  for (const line of block.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    data[match[1]] = match[2].replace(/^["']|["']$/g, "").trim();
  }

  return { text, data, error: null };
}

function isExternal(target) {
  return (
    target.startsWith("http://") ||
    target.startsWith("https://") ||
    target.startsWith("mailto:") ||
    target.startsWith("#")
  );
}

function stripAnchor(target) {
  return target.split("#")[0].split("?")[0];
}

function normalizeLinkTarget(raw) {
  return raw.trim().replace(/^<|>$/g, "");
}

async function checkMarkdownLinks(file, text) {
  const dir = path.dirname(file);
  const linkPattern = /!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let match;
  while ((match = linkPattern.exec(text)) !== null) {
    const raw = normalizeLinkTarget(match[1]);
    if (!raw || isExternal(raw)) continue;

    const targetPart = stripAnchor(raw);
    if (!targetPart) continue;

    const target = path.resolve(dir, targetPart);
    const key = `${file}\u0000${target}`;
    if (checkedLinks.has(key)) continue;
    checkedLinks.add(key);

    if (!(await exists(target))) {
      fail(`${path.relative(root, file)}: broken link -> ${raw}`);
    }
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === ".git" || entry.name === "node_modules" || entry.name === ".venv") {
      continue;
    }
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(target);
    } else if (entry.isFile() && textExtensions.has(path.extname(entry.name))) {
      await checkTextFile(target);
    }
  }
}

async function checkTextFile(file) {
  if (path.resolve(file) === fileURLToPath(import.meta.url)) return;

  const text = await readFile(file, "utf8");
  for (const rule of forbiddenStrings) {
    if (text.toLowerCase().includes(rule.value.toLowerCase())) {
      fail(`${path.relative(root, file)}: ${rule.label} (${rule.value})`);
    }
  }
}

async function main() {
  const entries = await readdir(skillsDir, { withFileTypes: true });
  const skillNames = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  if (skillNames.length === 0) {
    fail("skills/: no skill directories found");
  }

  for (const name of skillNames) {
    const skillDir = path.join(skillsDir, name);
    const skillFile = path.join(skillDir, "SKILL.md");

    if (!(await exists(skillFile))) {
      fail(`skills/${name}: missing SKILL.md`);
      continue;
    }

    const { data, error } = await readFrontmatter(skillFile);
    if (error) {
      fail(`skills/${name}/SKILL.md: ${error}`);
    } else {
      if (!data.name) {
        fail(`skills/${name}/SKILL.md: frontmatter is missing name`);
      } else if (data.name !== name) {
        fail(`skills/${name}/SKILL.md: frontmatter name "${data.name}" does not match directory`);
      }
      if (!data.description) {
        fail(`skills/${name}/SKILL.md: frontmatter is missing description`);
      }
    }

    for (const required of requiredFiles[name] ?? []) {
      if (!(await exists(path.join(skillDir, required)))) {
        fail(`skills/${name}: missing required file ${required}`);
      }
    }

    // Check links only in the instruction files, not in templates: templates
    // contain placeholders that are resolved by the init skill.
    const instructionFiles = [skillFile];
    const referencesDir = path.join(skillDir, "references");
    if (await exists(referencesDir)) {
      for (const entry of await readdir(referencesDir, { withFileTypes: true })) {
        if (entry.isFile() && entry.name.endsWith(".md")) {
          instructionFiles.push(path.join(referencesDir, entry.name));
        }
      }
    }

    for (const file of instructionFiles) {
      await checkMarkdownLinks(file, await readFile(file, "utf8"));
    }
  }

  const docs = [
    "README.md",
    "README.zh-CN.md",
    "CONTRIBUTING.md",
    "CHANGELOG.md",
    "docs/DESIGN.md",
    "docs/installation.md",
    "docs/WALKTHROUGH.md",
  ];

  for (const relative of docs) {
    const file = path.join(root, relative);
    if (!(await exists(file))) {
      fail(`${relative}: missing`);
      continue;
    }
    await checkMarkdownLinks(file, await readFile(file, "utf8"));
  }

  await walk(root);

  if (errors.length > 0) {
    console.error(`check-skills: ${errors.length} problem(s)\n`);
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log(
    `check-skills: ${skillNames.length} skills, ${checkedLinks.size} local links checked, no problems`,
  );
}

main().catch((error) => {
  console.error(`check-skills: unexpected failure: ${error.message}`);
  process.exitCode = 1;
});
