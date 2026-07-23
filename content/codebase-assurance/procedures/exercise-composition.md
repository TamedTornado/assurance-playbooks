---
schemaVersion: 1
kind: procedure
id: codebase-exercise-composition
title: Exercise composition and dependency reality
version: 0.1.0
status: draft
summary: Challenge the selected claim where locally correct components meet real dependencies artifacts and state.
playbook: codebase-assurance
phase: exercise-composition
purpose: Establish whether the claim survives real composition versioning retries and partial dependency failure.
inputs: [Invariant matrix, Dependency map, Baseline, Counterexamples]
outputs: [Dependency boundary matrix, Composition evidence, Boundary findings]
---
# Exercise composition and dependency reality

## Inputs

Invariant matrix, service and data flows, resolved dependencies, mocks,
generated artifacts, caches, queues, external providers, and baseline fixtures.

## Human procedure

1. Map the selected claim across every process, store, queue, artifact, and
   external protocol.
2. Identify which test substitutes remove behavior owned by a dependency.
3. Exercise duplicate delivery, timeout, version skew, stale state, corruption,
   relocation, partial availability, and restart where material.
4. Track identity across generated and deployed artifacts.
5. Compare safe refusal, extra work, visible outage, stale success, silent
   corruption, and excess authority.
6. Repeat the high-value cases against the closest safe real interface.
7. Record unsupported boundaries rather than generalizing local success.

## Copyable agent prompt

> Trace each selected invariant through the actual composed system, including
> stores, queues, services, generated code, native libraries, model APIs,
> caches, build artifacts, and external providers. Compare mocks and fixtures
> with the protocol behavior they omit. Design safe exercises for duplicate
> delivery, timeout, version skew, stale inputs, corruption, relocation,
> partial availability, restart, and recovery. For every outcome classify the
> failure direction and affected claim. Do not treat local component success as
> evidence of the composed invariant.

## Required output

Dependency boundary matrix, executed scenarios and evidence, failure-direction
classification, and findings tied to consequences.

## Preserve as evidence

Resolved versions, protocol inputs and outputs, artifact identities, raw
failure receipts, substitute limitations, and recovery state.

## Stop and escalate

Stop when the real interface cannot be exercised safely, contractual access is
missing, or a substitute removes the behavior the claim depends on.

## Review test

The evidence reaches the real ownership boundary and distinguishes safe
unavailability from a false successful result.
