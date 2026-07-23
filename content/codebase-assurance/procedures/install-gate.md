---
schemaVersion: 1
kind: procedure
id: codebase-install-gate
title: Select install and prove the product gate
version: 0.1.0
status: draft
summary: Choose one high-value preserved failure and change what the product can accept.
playbook: codebase-assurance
phase: install-gate
purpose: Leave a durable independently reviewed boundary proven against bad and valid fixtures.
inputs: [Findings, Counterexamples, Decision priorities, Baseline evidence]
outputs: [Gate selection decision, Intervention record, Before and after proof]
---
# Select, install, and prove the product gate

## Inputs

Ranked findings, preserved counterexamples, decision priorities, implementation
constraints, baseline, owners, and rollback capability.

## Human procedure

1. Rank candidates by consequence, reachability, repeatability, gate leverage,
   ownership, and ability to demonstrate before and after.
2. Select one boundary; record why higher-severity findings were not selected.
3. Freeze the bad fixture, valid fixture, accept/reject rule, observer, and
   target before implementation.
4. Demonstrate the bad fixture passes or escapes the current boundary.
5. Implement the smallest durable independently owned gate.
6. Repeat the same bad fixture and valid fixture.
7. Attempt bypass, disablement, stale evidence, and producer-approved exception.
8. Verify rollback and record residual risk.

## Copyable agent prompt

> From the supplied findings, rank candidate gates by consequence,
> reachability, repeatability, leverage across future changes, ownership, and
> ability to prove a like-for-like before/after result. Recommend one and state
> the tradeoff. Freeze a preserved bad fixture, valid fixture, target, observer,
> reject condition, and accept condition before proposing implementation.
> Design the smallest durable gate that changes acceptance authority. Specify
> before proof, after rejection, valid-path proof, bypass attempts, ownership,
> change control, and rollback. Do not select a gate merely because it is easy
> or rewrite the fixture after seeing the intervention.

## Required output

Selection rationale and completed [intervention
record](../../shared/intervention.md) with comparable before/after evidence.

## Preserve as evidence

Candidate ranking, frozen fixtures, pre-change result, reviewed change, after
receipts, bypass attempts, valid-path result, and rollback.

## Stop and escalate

Stop when no candidate has a safe reproducible fixture, implementation changes
the agreed scope, or the gate owner and independent reviewer are the same sole
authority.

## Review test

The identical material bad result passes before and fails after for the
intended reason, while valid behavior still passes.
