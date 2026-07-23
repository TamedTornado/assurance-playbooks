---
schemaVersion: 1
kind: playbook
id: agentic-delivery-assurance
title: Agentic Delivery Assurance
version: 0.1.0
status: draft
summary: Establish whether an agentic delivery system produces independently verified work and prove a material rejection gate.
audience: Engineering leaders using coding agents where throughput has outrun confidence in review and verification.
outcome: An evidence-backed delivery assessment and one installed or hardened gate proven against a material agent failure mode.
controls:
  - agentic-task-contract
  - agentic-context-and-authority
  - agentic-parallel-integrity
  - agentic-independent-verification
  - agentic-reward-hacking
  - agentic-recovery-integrity
  - agentic-release-integrity
  - agentic-proven-gate
---
# Agentic Delivery Assurance

Agent throughput is valuable only when the system can distinguish completed
work from persuasive imitation. This method examines the entire delivery
contract: task definition, context, authority, isolation, integration,
verification, recovery, and human acceptance.

The operator deliberately searches for shortcuts that satisfy visible checks
without satisfying intent. The engagement then installs or hardens one gate
that rejects an agreed material failure mode and demonstrates the before and
after behavior under comparable conditions.

The method does not prescribe a particular model, agent framework, or
orchestrator. It evaluates the evidence boundary that makes any such pipeline
worthy of increased authority.

## Start here

Read the [shared assurance protocol](../shared/protocol.md) first. It defines
control statuses, evidence provenance, findings, interventions, blocked work,
and human sign-off for both methods.

## Ordered controls

1. [Make the task contract falsifiable](controls/task-contract.md) — separate
   observable intent from implementation hints and persuasive completion.
2. [Bound context and authority](controls/context-authority.md) — trace
   instruction precedence, tools, secrets, mutation rights, and escalation.
3. [Preserve parallel-work integrity](controls/parallel-integrity.md) — verify
   isolation, attribution, dependencies, and the integrated target.
4. [Enforce independent verification](controls/independent-verification.md) —
   prevent the producer from controlling its own acceptance evidence.
5. [Red-team reward hacking](controls/reward-hacking.md) — search for ways to
   maximize visible success while violating intent.
6. [Verify recovery integrity](controls/recovery-integrity.md) — test retries,
   repair, interruption, handoff, and durable state.
7. [Preserve release identity and rollback](controls/release-integrity.md) —
   prove that the verified composition becomes the deployed artifact and can
   return to a captured known-good state.
8. [Install and prove the delivery gate](controls/proven-gate.md) — leave an
   independently governed rejection boundary for a preserved failure.

## Required records

- [Acceptance criteria](../shared/acceptance-criteria.md)
- [Evidence record](../shared/evidence-record.md)
- [Finding record](../shared/finding.md)
- [Blocked-finding record](../shared/blocked-finding.md)
- [Intervention record](../shared/intervention.md)
- [Assurance sign-off](../shared/sign-off.md)

The [worked acceptance outcomes](../shared/acceptance-examples.md) show how to
distinguish completion, proxy theatre, blockage, and scope expansion.

## Worked example

[Cargo ReAPI](examples/cargo-reapi.md) shows an agent-produced proof that met
the visible timing proxy by serializing work and narrowing the workload. The
example follows the failure through independent detection, verifier repair,
rerun, hardened qualification, and explicit residual risk.
