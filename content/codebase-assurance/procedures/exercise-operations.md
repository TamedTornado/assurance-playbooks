---
schemaVersion: 1
kind: procedure
id: codebase-exercise-operations
title: Exercise operational failure and recovery
version: 0.1.0
status: draft
summary: Determine whether material failure is visible contained reversible and understandable to a real operator.
playbook: codebase-assurance
phase: exercise-operations
purpose: Establish operational behavior and business-state consequences under realistic failure and recovery.
inputs: [High-risk path, Operational interfaces, Recovery procedures, Composition findings]
outputs: [Failure matrix, Operator timeline, Recovery and rollback receipts]
---
# Exercise operational failure and recovery

## Inputs

High-risk path, architecture, runbooks, observability, alerts, data and business
state, rollback targets, access controls, and safe failure environment.

## Human procedure

1. Select failures capable of changing the decision.
2. Define expected visibility, containment, state, recovery, and time boundary.
3. Exercise missing dependency, delay, interruption, partial write, overload,
   restart, and rollback as applicable.
4. Observe only through interfaces available to the real operator.
5. Record when the operator first knows, what they can localize, and what state
   has already changed.
6. Perform recovery or rollback and verify business state, not process health
   alone.
7. Compare the result with runbooks and stated guarantees.

## Copyable agent prompt

> Using the selected high-risk path and safe environment, construct an
> operational failure matrix covering the material dependency, interruption,
> partial-state, overload, restart, and rollback cases. For each, state expected
> visibility, containment, business-state effect, recovery action, and proof of
> recovery. Execute only authorized cases through the interfaces a real
> operator has. Produce a timeline from fault injection to detection,
> localization, containment, recovery, and verified business state. Do not
> infer recovery from exception handling or treat container health as product
> health.

## Required output

Failure matrix, operator timeline, raw observability references, recovery or
rollback receipts, and unresolved operational findings.

## Preserve as evidence

Fault identity, timestamps, logs/metrics/traces, business-state snapshots,
operator actions, artifact identities, and after-recovery verification.

## Stop and escalate

Stop when blast radius, customer effect, data handling, rollback target, or
authorization is not controlled.

## Review test

A reviewer can determine whether failure became visible before unacceptable
state spread and whether recovery restored the consequential behavior.
