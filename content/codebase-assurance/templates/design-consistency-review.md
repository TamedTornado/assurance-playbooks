---
schemaVersion: 1
kind: template
id: codebase-design-consistency-review
title: Design consistency review
version: 0.1.0
status: draft
summary: One low-friction Markdown document for tracing expectations through project material and preserving conflicts and resolutions.
for: design-consistency
---
# Design consistency review

Use one copy for the engagement. Keep behavior traces and conflicts underneath
the expectation they affect. Do not assign IDs manually or attempt to document
the whole architecture.

## Plain-language summary

### What we examined

[Name the expectations and representative behaviors reviewed.]

### What tells a consistent story

[Explain the important areas where the sources agree.]

### What conflicts or remains unsupported

[Explain material contradictions, ambiguities, missing contracts, and weaker
substitutes in language the client can understand.]

### What changed

[Record resolved contracts and deliberately narrowed expectations.]

### What remains to be tested

[Explain what requires implementation and runtime evidence.]

## Reviews by expectation

Copy this section for each expectation examined.

### [Expectation from the product expectation worksheet]

#### Behavior followed

[Describe one concrete consumer or operator path.]

```text
[Input or action]
→ [supported interface]
→ [authoritative state and transitions]
→ [observable result]
→ [measurement]
→ [rejecting test]
```

#### Sources consulted

- [Requirement, design section, interface, state definition, measurement, or
  test plan with a precise locator.]

#### Conflicts, gaps, and divergences

Copy this block for each material issue.

##### [Plain-language issue title]

- **Type:** [Ambiguity, contradiction, missing contract, or design divergence.]
- **Source A says:**
- **Source B says or omits:**
- **Why they do not form one story:**
- **Why the client should care:**
- **Smallest honest clarification:**
- **Status:** [Unresolved, resolved, accepted divergence, or blocked.]
- **Authority needed or approval received:**
- **Sources changed:**
- **What remains to be tested:**

#### Coverage

- **Reviewed through:**
- **Partially reviewed or deferred:**
- **Blocked by:**
- **Limit of this conclusion:**
