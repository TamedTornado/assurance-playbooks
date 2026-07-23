---
schemaVersion: 1
kind: procedure
id: agentic-test-verification-independence
title: Test verification independence
version: 0.1.0
status: draft
summary: Determine whether the producer can define weaken select or approve the evidence accepting its work.
playbook: agentic-delivery-assurance
phase: test-verification-independence
purpose: Establish evidence and authority separation at each material acceptance boundary.
inputs: [Authority graph, Gates and verifier configuration, Adversarial fixtures]
outputs: [Verification authority graph, Bypass results, Gate change policy]
---
# Test verification independence

## Inputs

Original source intent, derived requirements and contracts, implementation,
tests, verifier configuration, evidence selection, review, exceptions,
approvals, and audit trail.

## Human procedure

1. Assign authorship and change authority for every acceptance input.
2. Identify evidence selected or summarized by the producer.
3. Determine what the verifier can inspect independently.
4. Confirm that the verifier receives original source intent and visible
   divergences, not only the producer's derived contract.
5. Attempt safe test deletion, discovery narrowing, threshold change, stale
   evidence, wrong target, skip, exception, and verifier modification.
6. Attempt an internally coherent implementation of an unauthorized derived
   contract.
7. Observe whether changes fail closed, require independent approval, and remain
   visible.
8. Treat verifier changes as contract changes and qualify them with preserved
   fixtures.
9. Separate second invocation from genuine independence.

## Copyable agent prompt

> Build an authority graph for original source intent, derived requirements,
> implementation, tests, verifier
> code/configuration, evidence selection, review, exceptions, and final
> approval. Identify every point where the producer can control the meaning or
> visibility of success. Design safe bypass attempts covering deleted or
> narrowed tests, changed thresholds, stale or wrong-target evidence, skips,
> exceptions, and verifier modification. Require observed fail-closed behavior,
> independent approval, and audit visibility. Include a coherent implementation
> of an unauthorized derived contract. Do not call a second model
> independent when it receives producer-selected evidence or shares the same
> incomplete contract.

## Required output

Verification-authority graph, bypass matrix, gate-change qualification rule,
findings, and unproven independence claims.

## Preserve as evidence

Configuration identities, attempted changes, approval paths, audit events,
verifier outputs, target/evidence binding, and preserved fixtures.

## Stop and escalate

Stop when bypass exercises could alter live acceptance without containment or
when no independent authority exists to review the verifier.

## Review test

The producer cannot silently make a material bad fixture acceptable by changing
the evidence, verifier, target, exception path, or meaning inherited from
original source intent.
