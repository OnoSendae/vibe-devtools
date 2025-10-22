---
"vibe-devtools": minor
---

Add support for installing vibes directly from npm registry

- Implement npm-installer.ts for downloading and extracting npm packages
- Support installation via package names: @vibe-devtools/basic
- Support version pinning: @vibe-devtools/basic@1.0.1
- Automatic extraction and validation of vibe.json
- Update documentation with npx usage examples
- Enable zero-installation workflow via npx vibe-devtools

This is a major usability improvement - users can now install official vibes directly from npm without needing GitHub URLs.

