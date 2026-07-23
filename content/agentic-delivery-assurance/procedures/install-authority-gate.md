---
schemaVersion: 1
kind: procedure
id: agentic-install-authority-gate
title: Select install and prove the delivery gate
version: 0.1.0
status: draft
summary: Convert one observed delivery failure into an independently governed permanent rejection boundary.
playbook: agentic-delivery-assurance
phase: install-authority-gate
purpose: Change which agent-produced work can enter the trusted system and prove it with preserved fixtures.
inputs: [Adversarial fixtures, Recovery and release findings, Authority graph]
outputs: [Gate selection, Intervention record, Before and after delivery proof]
---
# Select, install, and prove the delivery gate

## Inputs

Reward-hack fixtures, verification bypasses, integration/recovery/release
findings, authority graph, valid work fixture, and decision priorities.

## Human procedure

1. Rank candidate gates by consequence, reachability, recurrence, authority
   leverage, and demonstrability.
2. Select one and freeze the bad fixture, valid fixture, target, and rules.
3. Prove the current pipeline accepts or misses the bad result.
4. Implement the smallest gate with authority independent of the producer.
5. Replay bad and valid fixtures through the complete route.
6. Attempt disablement, verifier change, stale evidence, wrong artifact,
   producer exception, and recovery bypass.
7. Verify release and rollback effects where the gate reaches production.

## Copyable agent prompt

> Rank the supplied delivery failures as gate candidates using consequence,
> reachability, recurrence, future authority leverage, and ability to prove a
> like-for-like result. Select one and freeze the bad fixture, valid fixture,
> target identity, accept/reject rule, evidence source, owner, and rollback
> before implementation. Design the smallest independently governed boundary.
> Specify before acceptance, after rejection, valid-path success, bypass
> attempts, recovery behavior, artifact identity, and residual authority. Do
> not add another prompt or reviewer unless it changes who controls acceptance.

## Required output

Selection rationale and completed [intervention
record](../../shared/intervention.md) with full-route before/after evidence.

## Preserve as evidence

Candidate ranking, frozen fixtures, current false pass, gate change and review,
bypass attempts, valid result, released identity, and rollback.

## Stop and escalate

Stop when the fixture is not safely replayable, no independent gate owner
exists, or implementation expands the agreed authority.

## Review test

The same bad delivery passes before and fails after while valid work continues,
and the producer cannot silently alter the result.
