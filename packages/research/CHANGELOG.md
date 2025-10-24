# Changelog

## 1.0.2

### Patch Changes

- 7c755ca: Release updates with new features and improvements
  - Add new templates for assistant architecture, conversation, metadata, synthesis, character evolution, and memory
  - Update research.validate command
  - Introduce stash system for conflict management and backups in CLI
  - Add git synchronization scripts
  - Update contributing documentation

## 1.0.1

### Patch Changes

- 356b559: Update installation documentation to include npx examples
  - Add npx installation method alongside global CLI
  - Provide clear comparison: global vs npx
  - Show both methods in installation section
  - Add pro tips for choosing best method
  - Consistent with CLI and monorepo README updates

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-10-21

### Added

**Commands** (12 total):

- `research.pipeline.md` - Unified pipeline with 3 modes (simple/deep/expert)
- `research.initialize.md` - Initialize research with structured metadata
- `research.search.md` - Search and collect references
- `research.score.md` - Score references with multi-dimensional criteria
- `research.analyze.md` - Deep analysis of top references
- `research.synthesize.md` - Synthesize findings progressively
- `research.validate.md` - Cross-validation and final report
- `research.github.md` - Analyze GitHub projects
- `research.integration.md` - Integration guide
- `research.simple.pipeline.md` - Simple mode pipeline (deprecated)
- `research.deep.pipeline.md` - Deep mode pipeline (deprecated)
- `research.expert.pipeline.md` - Expert mode pipeline (deprecated)

**Rules** (4 total):

- `research.mdc` - Core research governance
- `analysis.mdc` - Analysis patterns and best practices
- `search.mdc` - Search strategies and quality criteria
- `synthesis.mdc` - Synthesis methodologies

**Templates** (4 total):

- `template.research-metadata.json` - Metadata schema with validation
- `template.research-synthesis.md` - Synthesis structure
- `template.research-reference-analysis.md` - Reference analysis template
- `template.research-report.md` - Final report structure

**Documentation**:

- `README.md` - Complete documentation with quick start
- `constitution.md` - Research principles and rules
- `IMPLEMENTACAO-COMPLETA.md` - Implementation history
- `ANALISE-COMMANDS-MELHORIAS.md` - Commands analysis
- `GUIA-MIGRACAO.md` - Migration guide
- `PLANEJAMENTO-REORGANIZACAO.md` - Reorganization planning
- `examples/basic-research-example.md` - Beginner tutorial

**Distribution**:

- `vibe.json` - Vibe manifest for CLI installation
- `package.json` - NPM manifest for registry publication

### Changed

- Unified pipeline commands into single configurable command
- Improved scoring methodology with 5-dimensional evaluation
- Enhanced cross-validation with consensus/divergence mapping
- Restructured output directories for better organization

### Deprecated

- `research.simple.pipeline.md` - Use `/research.pipeline [topic] simple` instead
- `research.deep.pipeline.md` - Use `/research.pipeline [topic] deep` instead
- `research.expert.pipeline.md` - Use `/research.pipeline [topic] expert` instead

**Note**: Deprecated commands will be removed in version 3.0.0 (estimated 2025-04-21)

### Fixed

- Code duplication eliminated across pipeline commands
- Maintenance reduced by 75% with centralized logic
- Improved clarity with transparent orchestration

---

## [1.0.0] - 2025-01-16

### Added

- Initial release with core research functionality
- Basic commands for initialize, search, score, analyze
- Templates for metadata and reports
- Constitution with research principles

---

[2.0.0]: https://github.com/vibes-org/research/releases/tag/v2.0.0
[1.0.0]: https://github.com/vibes-org/research/releases/tag/v1.0.0
