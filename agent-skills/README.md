# Repo-Local Agent Skills

These are repo-local, reusable "skills" for agentic workflows.

How to use:
- Tell the agent: "Use skill `<skill-name>`".
- Provide the required inputs listed in the skill doc.

## Available Skills

- `publication-import`
  - Doc: `agent-skills/publication-import.md`
  - Use when adding a new paper (PDF+PNG) into the Publications list.
  - Includes a strict rule: `tags` must come only from the paper's printed Keywords/Index Terms.

## Helper Scripts

- Validate publication entries (assets + frontmatter):
  - `npm run validate:publications` (or `node scripts/validate-publications.js`)
