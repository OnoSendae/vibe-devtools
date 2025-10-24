# Testing Guide: Multi-Agent Support

**Version**: v0.4.0  
**Date**: 2025-10-22  
**Status**: Ready for Testing

---

## 🎯 Test Coverage

- ✅ TASK-014: Gemini CLI Integration
- ✅ TASK-015: Claude Code Integration
- ✅ TASK-016: Multi-Agent Coexistence

---

## 📋 Test Plan

### Test 1: Gemini CLI Detection & Installation

**Objective**: Verify Gemini CLI is detected and vibe packages install correctly

**Prerequisites**:
- Gemini CLI installed (`gemini --version` works)

**Steps**:
1. Create test project: `mkdir test-gemini && cd test-gemini`
2. Detect agents: `npx vibe-devtools agents detect`
3. Verify Gemini appears in output
4. Install basic: `npx vibe-devtools install @vibe-devtools/basic`
5. Verify `.gemini/prompts/` directory created
6. Verify commands copied to `.gemini/prompts/`
7. List commands: `ls -la .gemini/prompts/`

**Expected Result**:
```
✓ Gemini CLI detectado
📦 Instalado para: cursor, gemini
✓ .gemini/prompts/ criado com arquivos .md
```

**Actual Result**: To be tested

---

### Test 2: Claude Code Detection & Installation

**Objective**: Verify Claude Code is detected and vibe packages install correctly

**Prerequisites**:
- Claude Code installed

**Steps**:
1. Create test project: `mkdir test-claude && cd test-claude`
2. Detect agents: `npx vibe-devtools agents detect`
3. Verify Claude appears in output
4. Install research: `npx vibe-devtools install @vibe-devtools/research`
5. Verify `.claude/commands/` directory created
6. Verify commands copied to `.claude/commands/`
7. Open Claude Code and verify commands appear

**Expected Result**:
```
✓ Claude Code detectado
📦 Instalado para: cursor, claude
✓ .claude/commands/ criado com arquivos .md
✓ Commands aparecem no Claude Code
```

**Actual Result**: To be tested

---

### Test 3: Multi-Agent Coexistence

**Objective**: Verify multiple agents can coexist in same project

**Prerequisites**:
- Cursor, Gemini CLI, Claude Code all installed

**Steps**:
1. Create test project: `mkdir test-multi && cd test-multi`
2. Detect all: `npx vibe-devtools agents detect`
3. Verify all 3 detected
4. Install basic: `npx vibe-devtools install @vibe-devtools/basic`
5. Verify directories created:
   - `.cursor/commands/`
   - `.cursor/rules/`
   - `.gemini/prompts/`
   - `.claude/commands/`
   - `.claude/rules/`
6. Verify no file conflicts
7. Verify no over-writes
8. Count files in each: should be equal or similar
9. Open each agent and verify commands work

**Expected Result**:
```
🔍 Detectados: cursor, gemini, claude
📦 Instalado para: cursor, gemini, claude
✓ Todos diretórios criados
✓ Sem conflitos
✓ Commands funcionam em todos agentes
```

**Actual Result**: To be tested

---

### Test 4: Selective Installation (--agent flag)

**Objective**: Verify --agent flag works for selective installation

**Steps**:
1. Create project: `mkdir test-selective && cd test-selective`
2. Install for Cursor only: `npx vibe-devtools install @vibe-devtools/basic --agent=cursor`
3. Verify only `.cursor/` created
4. Verify `.gemini/` NOT created
5. Verify `.claude/` NOT created
6. Install for Gemini only: `npx vibe-devtools install @vibe-devtools/research --agent=gemini`
7. Verify `.gemini/` NOW created
8. Verify basic NOT in `.gemini/` (only research)

**Expected Result**:
```
--agent=cursor → apenas .cursor/
--agent=gemini → apenas .gemini/
Selective installation works
```

**Actual Result**: To be tested

---

### Test 5: Agent Not Installed (Graceful Degradation)

**Objective**: Verify graceful handling when agent not installed

**Prerequisites**:
- Gemini CLI NOT installed

**Steps**:
1. Create project
2. Detect: `npx vibe-devtools agents detect`
3. Verify Gemini NOT in list
4. Install basic: `npx vibe-devtools install @vibe-devtools/basic`
5. Verify installs for detected agents only
6. Verify no error, just warning
7. Verify Cursor still works

**Expected Result**:
```
⚠️ Gemini not detected (expected)
✓ Installed for: cursor (fallback)
✓ No errors
```

**Actual Result**: To be tested

---

### Test 6: Backward Compatibility

**Objective**: Verify v1.0 packages still work

**Steps**:
1. Use package with old vibe.json (symlinks only, no agentTargets)
2. Install: `npx vibe-devtools install ./old-package`
3. Verify installs for Cursor (fallback)
4. Verify no errors
5. Verify commands work

**Expected Result**:
```
⚠️ Package uses v1.0 format (Cursor only)
✓ Installed successfully
✓ Backward compatible
```

**Actual Result**: To be tested

---

## 🔧 Manual Testing Checklist

### Agent Detection
- [ ] `vdt agents list` shows all supported agents
- [ ] `vdt agents detect` identifies installed agents correctly
- [ ] Detection works on macOS, Linux, Windows (if applicable)
- [ ] False positives handled (dir exists but app not installed)

### Installation
- [ ] Install for all detected agents works
- [ ] Install with --agent flag works
- [ ] Intelligent merge works (no overwrites without backup)
- [ ] Backups created when files exist
- [ ] Symlinks vs copy fallback works

### Multi-Agent
- [ ] Multiple agents coexist without conflicts
- [ ] Each agent sees correct commands
- [ ] Commands work in each agent
- [ ] Uninstall removes from all agents

### Error Handling
- [ ] No agent detected → graceful fallback to Cursor
- [ ] Invalid --agent → clear error message
- [ ] Agent not installed → warning but continues
- [ ] Network errors → retry or fail gracefully

---

## 📊 Test Matrix

| Test | Cursor | Gemini | Claude | Multi | Pass |
|------|--------|--------|--------|-------|------|
| Detection | ✓ | ? | ? | ? | ? |
| Installation | ✓ | ? | ? | ? | ? |
| Commands Work | ✓ | ? | ? | ? | ? |
| Coexistence | N/A | N/A | N/A | ? | ? |
| --agent Flag | ✓ | ? | ? | ? | ? |
| Graceful Fail | ✓ | ? | ? | ? | ? |

**Legend**: ✓ Passed | ❌ Failed | ? Not tested yet

---

## 🚀 How to Run Tests

### Quick Test (Cursor Only)
```bash
mkdir test-vdt && cd test-vdt
npx vibe-devtools agents detect
npx vibe-devtools install @vibe-devtools/basic
ls -la .cursor/commands/
```

### Full Multi-Agent Test
```bash
mkdir test-multi && cd test-multi
npx vibe-devtools agents detect
npx vibe-devtools install @vibe-devtools/basic
npx vibe-devtools install @vibe-devtools/research

find . -name "*.md" -path "*/.cursor/*" | wc -l
find . -name "*.md" -path "*/.gemini/*" | wc -l
find . -name "*.md" -path "*/.claude/*" | wc -l
```

### Automated Test Script
```bash
#!/bin/bash
echo "Testing Vibe DevTools v0.4.0"

echo "\n1. Detecting agents..."
npx vibe-devtools agents detect

echo "\n2. Installing basic..."
npx vibe-devtools install @vibe-devtools/basic

echo "\n3. Checking directories..."
for dir in .cursor .gemini .claude; do
  if [ -d "$dir" ]; then
    echo "✓ $dir exists"
    find "$dir" -name "*.md" | wc -l | xargs echo "  Commands:"
  fi
done

echo "\n4. Testing selective install..."
npx vibe-devtools install @vibe-devtools/research --agent=cursor

echo "\nTests complete!"
```

---

## 📝 Test Results (To be filled)

**Tester**: _______________  
**Date**: _______________  
**Version**: v0.4.0

### Environment
- OS: _______________
- Node: _______________
- Cursor: _______________
- Gemini CLI: _______________
- Claude Code: _______________

### Results
- [ ] All tests passed
- [ ] Some tests failed (see notes)
- [ ] Blocked (missing prerequisites)

### Notes
_______________________________________________
_______________________________________________
_______________________________________________

---

**Status**: 📋 Ready for Testing  
**Next**: Execute tests and fill results

