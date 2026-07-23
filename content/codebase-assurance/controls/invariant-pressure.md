---
schemaVersion: 1
kind: control
id: codebase-invariant-pressure
title: Pressure architectural invariants
version: 1.0.0
status: stable
summary: Test whether important invariants survive state transitions, concurrency, malformed inputs, and partial failure.
playbook: codebase-assurance
objective: Challenge system invariants at boundaries where locally correct code can still produce globally incorrect behavior.
required: true
evidence:
  - Invariant inventory traced to code and runtime boundaries
  - Adversarial executions covering state and failure transitions
  - Counterexamples or independently reproducible passing artifacts
acceptance:
  - Material invariants are expressed as observable conditions
  - Tests exercise transitions and composition rather than isolated happy paths
  - Any sampling limitations are reflected in confidence
outputs:
  - invariant-matrix
  - counterexample-set
tags: [architecture, invariants, adversarial]
---
# Procedure

Identify where ownership, ordering, idempotency, authorization, durability, or
resource limits cross module and service boundaries. Generate counterexamples
that are plausible under retries, races, partial writes, stale data, malformed
inputs, and process loss.

Do not infer a global guarantee from a unit test. Prefer tests that traverse
the real composition and preserve the input, environment, and observed output.
