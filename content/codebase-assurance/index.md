---
schemaVersion: 1
kind: playbook
id: codebase-assurance
title: Codebase Assurance
version: 0.1.0
status: draft
summary: Establish what a consequential AI-built codebase can support and prove one high-risk assurance gate.
audience: Founders and technical owners whose AI-built product now has consequential users or revenue.
outcome: A defensible evidence package and one installed or hardened gate demonstrated on an agreed high-risk path.
controls:
  - codebase-claim-map
  - codebase-design-coherence
  - codebase-reproducible-baseline
  - codebase-invariant-pressure
  - codebase-verification-strength
  - codebase-dependency-boundaries
  - codebase-operational-failure
  - codebase-proven-gate
procedures:
  - codebase-define-assurance-case
  - codebase-review-design
  - codebase-reproduce-path
  - codebase-design-counterexamples
  - codebase-exercise-composition
  - codebase-exercise-operations
  - codebase-install-gate
  - codebase-make-decision
---
# Codebase Assurance

Passing tests do not establish that a codebase is understandable, reproducible,
or dependable. This method starts from the business and technical claims that
matter, then searches for evidence capable of disproving them.

The engagement reviews the agreed scope broadly and goes deep on one selected
high-risk path. Completion requires a repeatable evidence trail, explicit
residual risk, and an installed or materially hardened assurance gate
demonstrated against the real system.

The result is not a generic code review or an assertion that the whole product
is safe. It is a bounded, inspectable basis for deciding what the software
deserves to be trusted to do next.

## Start here

Read the [shared assurance protocol](../shared/protocol.md) first. It defines
control statuses, evidence provenance, findings, interventions, blocked work,
and human sign-off for both methods.

## Ordered controls

1. [Map consequential claims](controls/claim-map.md) — turn expectations into
   bounded claims and falsification strategies.
2. [Resolve design contradictions](controls/design-coherence.md) — align
   requirements, interfaces, states, measurements, and test contracts before
   locally plausible implementations diverge.
3. [Establish a reproducible baseline](controls/reproducible-baseline.md) —
   preserve observable behavior before drawing conclusions.
4. [Pressure architectural invariants](controls/invariant-pressure.md) —
   challenge state, concurrency, malformed-input, and partial-failure
   boundaries.
5. [Measure verification strength](controls/verification-strength.md) —
   determine whether existing gates reject plausible bad implementations.
6. [Verify dependency boundaries](controls/dependency-boundaries.md) — test the
   external services, artifacts, and supply-chain assumptions behind local
   confidence.
7. [Exercise operational failure](controls/operational-failure.md) — establish
   whether failure is visible, contained, and recoverable.
8. [Install and prove the assurance gate](controls/proven-gate.md) — leave an
   executable boundary that rejects the selected counterexample.

## Required records

- [Acceptance criteria](../shared/acceptance-criteria.md)
- [Evidence record](../shared/evidence-record.md)
- [Finding record](../shared/finding.md)
- [Blocked-finding record](../shared/blocked-finding.md)
- [Intervention record](../shared/intervention.md)
- [Assurance sign-off](../shared/sign-off.md)

The [worked acceptance outcomes](../shared/acceptance-examples.md) show how to
distinguish completion, proxy theatre, blockage, and scope expansion.

## Executable procedures

The [procedure coverage map](procedures/) links every field-guide phase to a
human sequence, copyable agent prompt, required output, evidence, stop
conditions, and review test.

## Worked example

[Moria](examples/moria.md) applies every control to a public Rust voxel-world
substrate. The example deliberately retains mixed and unproven results rather
than turning repository scale or test volume into a blanket pass.
