---
"vibe-devtools": patch
---

Fix GitHub Copilot adapter to use correct instructions structure

- Change from `.github/copilot-instructions.md` to `.github/instructions/*.instructions.md`
- Generate multiple instruction files (project, commands, rules) for better organization
- Add frontmatter with `applyTo` directives for path-specific instructions
- Support GitHub Copilot's official custom instructions format
- Each command now gets its own `.instructions.md` file
- Rules are consolidated into `rules.instructions.md` with global scope

