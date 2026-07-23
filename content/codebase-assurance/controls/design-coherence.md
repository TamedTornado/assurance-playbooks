---
schemaVersion: 1
kind: control
id: codebase-design-coherence
title: Resolve design contradictions
version: 0.1.0
status: draft
summary: Find incompatible meanings, ownership boundaries, and unprovable promises before they become locally plausible code.
playbook: codebase-assurance
objective: Establish that consequential product claims have one coherent interpretation across requirements design interfaces states and tests.
required: true
evidence:
  - Requirement-to-design-to-test trace for consequential claims
  - Contradiction and ambiguity review with explicit resolutions
  - Recorded design divergences and approval state
acceptance:
  - Material terms and states have one compatible meaning across documents
  - Public consumers can satisfy requirements without privileged implementation access
  - Unmeasurable or intentionally weakened claims remain explicit divergences
outputs:
  - design-coherence-review
  - divergence-register
tags: [design, traceability, boundaries]
---
# Resolve design contradictions

Read requirements, design, public interfaces, state transitions, and test plans
as competing implementations of the same product contract.

Look for one concept with incompatible meanings, a reusable component depending
on a downstream consumer, a required behavior that no public interface can
express, a performance promise measured from the wrong event, and a target
whose proposed measurement cannot establish the original claim.

Ask two competent implementers to explain the behavior independently. If both
interpretations are plausible and materially different, the contract is not
ready.

Resolve contradictions before implementation where possible. When the original
claim cannot be established, record a design divergence: the requirement, the
proposed substitute, why the substitute is weaker, its decision impact, and
the person authorized to accept it. Do not describe an unapproved divergence as
coverage.
