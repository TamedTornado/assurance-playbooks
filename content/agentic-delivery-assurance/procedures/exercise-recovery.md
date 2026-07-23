---
schemaVersion: 1
kind: procedure
id: agentic-exercise-recovery
title: Exercise parallel integration repair and recovery
version: 0.1.0
status: draft
summary: Break agent work at revision frontiers and prove that intent findings ancestry and valid state survive.
playbook: agentic-delivery-assurance
phase: exercise-recovery
purpose: Establish safe composition and durable recovery across interruption rejection retry reassignment and restart.
inputs: [Pipeline state model, Representative tasks, Persistent records, Integration path]
outputs: [Recovery state map, Fault-injection receipts, Reverified composition]
---
# Exercise parallel integration, repair, and recovery

## Inputs

Pipeline graph, persisted state, sessions, worktrees/branches, review findings,
repair routing, integration, leases, retries, and operator controls.

## Human procedure

1. Run independent, overlapping, and dependent tasks concurrently.
2. Interrupt before implementation, after partial work, after publication,
   during verification, repair, integration, and scheduler restart.
3. Reject verification and confirm an editing repair receives the finding.
4. Reject repeatedly and verify ancestry, previous repairs, attempts, context,
   and unaffected state survive.
5. Exercise reassignment, human takeover, duplicate tick/work prevention, and
   resume.
6. Verify the final composition after recovery, not only repaired branches.
7. Record any destructive reset or lost state.

## Copyable agent prompt

> Design a contained recovery matrix for representative independent,
> overlapping, and dependent agent tasks. Interrupt at each durable frontier:
> before work, partial work, published commit, verification, repair,
> integration, and scheduler restart. Exercise rejection, repeated repair,
> retry, reassignment, human takeover, duplicate execution prevention, and
> resume. For each case trace task intent, findings, attempt count, context,
> session, commit ancestry, artifacts, approvals, and unaffected node state.
> Reverify the final composition. Do not call destructive reset recovery or
> rerun a verifier when the rejection requires editing.

## Required output

Recovery-state map, interruption matrix, ancestry and persistence evidence,
duplicate-side-effect results, and final composed verification.

## Preserve as evidence

State snapshots, session and attempt IDs, commits, findings, repair inputs,
leases, operator actions, final target, and verification receipts.

## Stop and escalate

Stop before destructive tests on irreplaceable state or when recovery cannot be
isolated from live work.

## Review test

After every recovery, the reviewer can account for prior findings and valid
work, prove no duplicate owner executed, and identify a reverified final target.
