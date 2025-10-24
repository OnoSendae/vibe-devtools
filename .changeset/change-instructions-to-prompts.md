---
"vibe-devtools": patch
---

Change GitHub Copilot adapter from instructions to prompts structure

- Change from `.github/instructions/*.instructions.md` to `.github/prompts/*.prompt.md`
- Update path in getTargetPaths() from 'instructions' to 'prompts'
- Rename files: `project.instructions.md` → `project.prompt.md`
- Rename files: `command-*.instructions.md` → `*.prompt.md` (without command- prefix)
- Rename files: `rules.instructions.md` → `rules.prompt.md`
- Update command references from @ to / (e.g., "@research.deep" → "/research.deep")
- Maintain frontmatter with applyTo directives
- Keep modular structure with separate files for project, commands, and rules

