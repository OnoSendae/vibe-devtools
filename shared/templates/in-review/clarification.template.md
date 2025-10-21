---
type: clarification-document
version: 1.0
feature_id: [FEATURE_ID]
feature_name: [FEATURE_NAME]
source_spec: [SPEC_PATH]
analyzed_at: [TIMESTAMP]
status: pending-review
completeness_score: [0-100]%
blocker_issues: [N]
critical_issues: [N]
important_issues: [N]
---

# Clarifications: [FEATURE_NAME]

## 📊 Analysis Summary

**Source Document**: [SPEC_PATH]  
**Analysis Date**: [TIMESTAMP]  
**Overall Completeness**: [X]%  
**Analyzer**: AI Agent (Cursor)

**Issue Breakdown**:
- 🚨 Blocker Issues: [N]
- 🔴 Critical Issues: [N]
- 🟡 Important Issues: [N]
- 🟢 Minor Issues: [N]
- **Total**: [N] issues identified

**Completeness by Section**:

| Section | Present | Complete | Clear | Score | Issues |
|---------|---------|----------|-------|-------|--------|
| Overview | [✅/❌] | [✅/⚠️/❌] | [✅/⚠️/❌] | [%] | [N] |
| Problem Statement | [✅/❌] | [✅/⚠️/❌] | [✅/⚠️/❌] | [%] | [N] |
| User Stories | [✅/❌] | [✅/⚠️/❌] | [✅/⚠️/❌] | [%] | [N] |
| Acceptance Criteria | [✅/❌] | [✅/⚠️/❌] | [✅/⚠️/❌] | [%] | [N] |
| Functional Req | [✅/❌] | [✅/⚠️/❌] | [✅/⚠️/❌] | [%] | [N] |
| Non-Functional Req | [✅/❌] | [✅/⚠️/❌] | [✅/⚠️/❌] | [%] | [N] |
| Technical Considerations | [✅/❌] | [✅/⚠️/❌] | [✅/⚠️/❌] | [%] | [N] |
| Dependencies | [✅/❌] | [✅/⚠️/❌] | [✅/⚠️/❌] | [%] | [N] |
| Risks & Mitigation | [✅/❌] | [✅/⚠️/❌] | [✅/⚠️/❌] | [%] | [N] |
| Success Metrics | [✅/❌] | [✅/⚠️/❌] | [✅/⚠️/❌] | [%] | [N] |
| **OVERALL** | - | - | - | **[%]** | **[N]** |

---

## 🚨 Critical Issues (Blockers)

_Issues that MUST be resolved before proceeding to planning/implementation_

### Issue #1: [Issue Title]

**Section**: [Section Name]  
**Type**: Gap / Ambiguity / Inconsistency / Missing  
**Impact**: Blocks [what it blocks]  
**Severity**: Blocker

**Description**:  
[Detailed description of the issue]

**Questions to Answer**:
1. [Specific question 1]
2. [Specific question 2]
3. [Specific question 3]

**Suggested Resolution**:  
[Specific recommendation on how to resolve this]

**Where to Update**:  
[Exact section and location in spec to update]

---

### Issue #2: [Issue Title]

[Same structure as Issue #1]

---

## 🔴 Critical Issues (High Priority)

_Issues that significantly impact quality but don't block proceeding_

### Issue #3: [Issue Title]

**Section**: [Section Name]  
**Type**: Gap / Ambiguity / Inconsistency / Missing  
**Impact**: [Description]  
**Severity**: Critical

**Description**:  
[Detailed description]

**Questions to Answer**:
1. [Question]

**Suggested Resolution**:  
[Recommendation]

---

## 🟡 Important Issues (Medium Priority)

_Issues that should be addressed for completeness_

### Issue #N: [Issue Title]

[Same structure]

---

## 🔍 Gaps Identified

### Missing Information

- [ ] **[Gap 1]**: [Description - where and what is missing]
- [ ] **[Gap 2]**: [Description]
- [ ] **[Gap 3]**: [Description]

### Vague Statements

- [ ] **[Vague 1]**: [Quote from spec] - Needs: [What needs to be clarified]
- [ ] **[Vague 2]**: [Quote from spec] - Needs: [What needs to be clarified]

### Undocumented Assumptions

- [ ] **[Assumption 1]**: [Implicit assumption that should be made explicit]
- [ ] **[Assumption 2]**: [Implicit assumption]

### Missing Edge Cases

- [ ] **[Edge Case 1]**: [Scenario not covered]
- [ ] **[Edge Case 2]**: [Scenario not covered]

### Missing Error Handling

- [ ] **[Error Scenario 1]**: [How to handle this error?]
- [ ] **[Error Scenario 2]**: [How to handle this error?]

---

## ❓ Questions to Answer

### 🚨 Blocker Questions (Must answer NOW)

#### Q1: [Question]
- **Category**: Clarification / Decision / Technical / Validation
- **Impact**: [What happens if not answered]
- **Suggested by**: [Section that generated this question]
- **Priority**: Blocker
- **Answer**: _[To be filled]_

---

### 🔴 Critical Questions (High Priority)

#### Q2: [Question]
- **Category**: [Category]
- **Impact**: [Impact]
- **Suggested by**: [Section]
- **Priority**: Critical
- **Answer**: _[To be filled]_

---

### 🟡 Important Questions (Medium Priority)

#### Q3: [Question]
- **Category**: [Category]
- **Impact**: [Impact]
- **Suggested by**: [Section]
- **Priority**: Important
- **Answer**: _[To be filled]_

---

## 🎯 Ambiguities Detected

### Ambiguity #1: [Title]

**Location**: [Section and line]  
**Statement**: "[Quote from spec]"  
**Issue**: [Why this is ambiguous]  
**Possible Interpretations**:
1. [Interpretation A]
2. [Interpretation B]

**Clarification Needed**: [What exactly needs to be defined]

---

## ⚠️ Inconsistencies Found

### Inconsistency #1: [Title]

**Locations**: [Sections involved]  
**Issue**: [Description of inconsistency]  
**Impact**: [What this breaks or confuses]  
**Resolution**: [How to make consistent]

---

## ✅ Recommendations

### Immediate Actions (Do First)

1. **[Action 1]**: [Specific action to take]
   - **Section**: [Where to update]
   - **What to add/change**: [Specific change]
   - **Why**: [Rationale]

2. **[Action 2]**: [Specific action]
   - **Section**: [Where]
   - **What**: [Change]
   - **Why**: [Rationale]

### Updates Needed by Section

#### Section: [Section Name]
- **Issue**: [Problem identified]
- **Current**: [What exists now]
- **Recommended**: [What should exist]
- **Priority**: Blocker / Critical / Important

---

## 📋 Checklist for Spec Update

Use this checklist when updating the spec based on these clarifications:

### Blockers (Must Fix)
- [ ] [Fix blocker issue 1]
- [ ] [Fix blocker issue 2]

### Critical (Should Fix)
- [ ] [Fix critical issue 1]
- [ ] [Fix critical issue 2]

### Important (Could Fix)
- [ ] [Fix important issue 1]
- [ ] [Fix important issue 2]

### Validation
- [ ] All blocker questions answered
- [ ] All critical ambiguities resolved
- [ ] User stories have acceptance criteria
- [ ] Requirements are testable
- [ ] Success metrics are measurable
- [ ] Dependencies are documented
- [ ] Risks have mitigation strategies

---

## 🔄 Iterative Refinement

**Current Iteration**: 1  
**Completeness Progress**: [X]% → [Target: >90%]

**Recommended Next Steps**:

1. **Answer Blocker Questions**:
   - [List blocker questions from above]

2. **Update Spec**:
   - Edit: `vibes/specs/[FEATURE_ID]/spec.md`
   - Address blocker and critical issues
   - Add missing information
   - Clarify vague statements
   - Resolve inconsistencies

3. **Re-run Clarification**:
   - Command: `/clarify vibes/specs/[FEATURE_ID]/spec.md`
   - Validate improvements
   - Check new completeness score
   - Repeat until >90%

4. **Proceed to Planning** (when ready):
   - Command: `/planner.project vibes/specs/[FEATURE_ID]/spec.md`
   - Planner will use clarified requirements
   - Implementation will be guided by clear acceptance criteria

---

## 📝 Notes & Comments

_Use this section for additional observations, stakeholder feedback, or discussion notes_

[Free-form notes area]

---

## 📚 References

- **Source Spec**: [SPEC_PATH]
- **Related Specs**: [LIST if any]
- **Related Documents**: [LIST if any]

---

## 🎯 Success Criteria for This Clarification

- [ ] All blocker issues identified and documented
- [ ] Questions are specific and actionable
- [ ] Recommendations are practical
- [ ] Completeness score calculated for each section
- [ ] Next steps are clear
- [ ] Document is ready for stakeholder review

---

**Clarification Version**: 1.0  
**Next Review**: After spec update  
**Status**: 
- [ ] Blockers resolved
- [ ] Critical questions answered  
- [ ] Spec updated
- [ ] Ready for planning (>90% complete)

---

**Template Version**: 1.0  
**Last Updated**: 2025-10-13

