---
schemaVersion: 1
kind: template
id: finding-record
title: Finding record
version: 0.1.0
status: draft
summary: A structured distinction between observation inference consequence and action.
for: finding
---
# Finding record

A finding explains why evidence matters. Keep observed fact, interpretation,
and consequence separate so a reviewer can disagree with one without losing
the others.

## Claim and consequence

- **Finding ID and title:**
- **Claim or acceptance criterion:**
- **Expected behavior:**
- **Decision affected:**
- **Consequence if reachable:** Describe the user, operational, financial,
  security, delivery, or authority outcome.
- **Affected boundary and scope:**
- **Owner:**

## Observation and inference

- **Observed fact:** Cite immutable [evidence records](evidence-record.md).
- **Minimal reproduction:**
- **Inference:** The explanation supported by the observation.
- **Alternative explanations considered:**
- **Counterevidence:**
- **What new evidence would change the conclusion:**

Do not write the inference as though it were observed. “The duplicate charge
occurred after retry” is an observation. “The idempotency key is applied after
the side effect” is an inferred cause until separately observed.

## Reachability and confidence

- **Preconditions:**
- **Path from input to consequence:**
- **Frequency or exposure:**
- **Blast radius:**
- **Existing containment:**
- **Severity:** Derived from consequence and reachability, not rhetorical force.
- **Confidence:** Derived from evidence quality and repeatability.
- **Failure direction:** Does uncertainty tend toward safe refusal, extra work,
  visible unavailability, stale success, silent corruption, or excess authority?

Failure direction prevents all defects from being treated equally. A safe miss
that causes extra work is materially different from a false hit that serves
stale output.

## Decision and next action

- **Status:** open, accepted risk, remediated, blocked, or superseded
- **Recommended decision:**
- **One implementation-ready next action:**
- **Evidence required to close or downgrade:**
- **Related gate or intervention:**
- **Residual risk after the action:**
- **Decision owner and date:**

A failed control without a finding is incomplete. A finding without a decision
owner is an observation waiting to be acted upon.
