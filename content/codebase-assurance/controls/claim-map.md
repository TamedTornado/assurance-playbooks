---
schemaVersion: 1
kind: control
id: codebase-claim-map
title: Map consequential claims
version: 1.0.0
status: stable
summary: Turn product expectations into bounded claims with owners, consequences, and falsification strategies.
playbook: codebase-assurance
objective: Establish the claims that matter and the evidence capable of showing each claim is false.
required: true
evidence:
  - Stakeholder claim inventory with named owners
  - System boundary and data-flow map at the target revision
  - Ranked failure hypotheses tied to business consequence
acceptance:
  - Every in-scope claim has an owner and observable consequence
  - Each material claim has at least one plausible falsification strategy
  - Excluded boundaries and assumptions are explicit
outputs:
  - claim-inventory
  - scope-map
  - risk-ranked-test-plan
tags: [scope, claims, risk]
---
# Procedure

Interview the decision owners and trace the actual entry points, stores,
services, and operational dependencies behind their expectations. Phrase each
claim so contrary evidence could exist: not “payments are robust,” but “a
retried confirmation cannot charge twice.”

Rank hypotheses using consequence, reachability, uncertainty, and evidence
cost. Preserve disagreements. The map guides sampling; it must not be reverse
engineered from the tests the repository already happens to contain.
