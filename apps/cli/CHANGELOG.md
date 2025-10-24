# Changelog

## 0.7.1

### Patch Changes

- 91aa1ce: Fix GitHub Copilot adapter to use correct instructions structure
  - Change from `.github/copilot-instructions.md` to `.github/instructions/*.instructions.md`
  - Generate multiple instruction files (project, commands, rules) for better organization
  - Add frontmatter with `applyTo` directives for path-specific instructions
  - Support GitHub Copilot's official custom instructions format
  - Each command now gets its own `.instructions.md` file
  - Rules are consolidated into `rules.instructions.md` with global scope

## 0.7.0

### Minor Changes

- dc5f6e5: Add GitHub Copilot adapter support
  - Implement CopilotAdapter for GitHub Copilot integration
  - Auto-detect GitHub Copilot installation via VSCode extensions
  - Generate `.github/copilot-instructions.md` with vibe commands and rules
  - Enable Copilot to understand and use vibe commands in projects
  - Full compatibility with existing Cursor, Gemini, and Claude adapters

## 0.6.0

### Minor Changes

- 4eefef7: Add support for installing vibes directly from npm registry
  - Implement npm-installer.ts for downloading and extracting npm packages
  - Support installation via package names: @vibe-devtools/basic
  - Support version pinning: @vibe-devtools/basic@1.0.1
  - Automatic extraction and validation of vibe.json
  - Update documentation with npx usage examples
  - Enable zero-installation workflow via npx vibe-devtools

  This is a major usability improvement - users can now install official vibes directly from npm without needing GitHub URLs.

## 0.5.0

### Minor Changes

- 0b7b6e8: Reescrever README completo da CLI em português brasileiro com narrativa inspiradora sobre IA agêntica, vibe coding e ferramentas inteligentes

## 0.4.1

### Patch Changes

- 9477b16: Rename package from vibes-cli to vibe-devtools to match existing npm package and branding

All notable changes to Vibe DevTools will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.4.0] - 2025-10-22

### 🎉 Major Features

#### Multi-Agent Support

**Breaking**: None (100% backward compatible)

**Added**:

- ✅ Multi-agent architecture with Adapter Pattern
- ✅ Support for Cursor, Gemini CLI, Claude Code
- ✅ Auto-detection of installed agents
- ✅ `vdt agents` command (list, detect)
- ✅ `--agent` flag for selective installation
- ✅ Intelligent merge across multiple agents
- ✅ Graceful degradation if agents not installed

**Implementation**:

- New `src/adapters/` directory with BaseAdapter system
- AgentDetector for auto-detection
- AdapterRegistry for adapter management
- CursorAdapter, GeminiAdapter, ClaudeAdapter

**Documentation**:

- TESTING.md - Complete test plan
- CREATING-ADAPTERS.md - Developer guide for new adapters
- README updated with multi-agent examples

**Behavior**:

```bash
# Before v0.4.0
vdt install @vibe-devtools/basic
# → Installed only for Cursor

# After v0.4.0
vdt install @vibe-devtools/basic
# → Detected: cursor, gemini, claude
# → Installed for all 3 automatically
```

---

### Changed

- **install command**: Now detects and installs for all agents automatically
- **version**: 0.3.4 → 0.4.0
- **README**: Added Multi-Agent Support section

---

### Added

- **agents command**: `vdt agents list` and `vdt agents detect`
- **--agent flag**: Selective agent installation (`--agent=cursor,gemini`)
- **Adapters**: BaseAdapter, CursorAdapter, GeminiAdapter, ClaudeAdapter
- **Detection**: AgentDetector with auto-detection
- **Registry**: AdapterRegistry for adapter management

---

### Fixed

- TypeScript strict mode compliance
- Unused variable warnings
- Type safety improvements

---

## [0.3.4] - 2025-10-21

### Fixed

- Corrected `bin` paths in package.json (`.dist/index.js` → `./dist/index.js`)
- Fixed `npx` functionality

---

## [0.3.3] - 2025-10-21

### Added

- NPM installer support
- Install from `@org/package` or package names

---

## [0.3.2] - 2025-10-21

### Added

- Automatic backup of existing files during installation
- Backup files created with `.backup-[timestamp]` suffix

---

## [0.3.1] - 2025-10-21

### Added

- Intelligent merge of directories
- Multiple vibe packages can coexist
- File-by-file merging with backup support

---

## [0.2.0] - 2025-10-21

### Added

- Real implementation migrated from monorepo
- GitHub installer
- Local path installer
- Symlink manager with intelligent merge

---

## [0.1.0] - 2025-10-21

### Added

- Initial release (placeholder)
- Basic CLI structure
- install, list, uninstall commands

---

## Roadmap

### v0.5.0 (Planned)

- Continue.dev adapter
- Cody (Sourcegraph) adapter
- Markdown → JSON transpiler
- GitHub Copilot adapter (limited)

### v0.6.0 (Planned)

- Aider adapter
- JetBrains AI Assistant adapter
- Community-contributed adapters
- Performance improvements

### v1.0.0 (Future)

- Stable API
- 6+ agents supported
- Production-ready
- Comprehensive test suite

---

[0.4.0]: https://github.com/onosendae/vibe-devtools/compare/v0.3.4...v0.4.0
[0.3.4]: https://github.com/onosendae/vibe-devtools/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/onosendae/vibe-devtools/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/onosendae/vibe-devtools/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/onosendae/vibe-devtools/compare/v0.2.0...v0.3.1
[0.2.0]: https://github.com/onosendae/vibe-devtools/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/onosendae/vibe-devtools/releases/tag/v0.1.0
