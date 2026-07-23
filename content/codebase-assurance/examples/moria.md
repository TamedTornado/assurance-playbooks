---
schemaVersion: 1
kind: example
id: codebase-assurance-moria-example
title: Codebase Assurance worked example — Moria
version: 1.0.0
status: stable
summary: A public application of the method to Moria with evidence limits preserved instead of converted into a blanket pass.
playbook: codebase-assurance
target:
  repository: https://github.com/TamedTornado/moria
  commit: 6542cb53a636f191d9a4de72d476c3c4f06e3fe4
verdict: mixed
controls:
  - codebase-claim-map
  - codebase-reproducible-baseline
  - codebase-invariant-pressure
  - codebase-verification-strength
  - codebase-dependency-boundaries
  - codebase-operational-failure
  - codebase-proven-gate
---
# Moria: worked Codebase Assurance record

## Scope and claim

Moria is a public Rust validation consumer for a reusable GPU-resident voxel
world substrate. The examined claim is narrower than “the engine is complete”:
the repository provides inspectable verification of terrain generation,
streaming, meshing, editing, collision, persistence, and bounded performance
behavior at the pinned revision.

The five-day public history contains 200 commits and 103 merges across 307
tracked files and more than 18,000 lines of Rust. Those numbers describe
delivery scale; they are not assurance evidence by themselves.

## Control record

| Control | Status | Public evidence and limit |
| --- | --- | --- |
| Claim map | Pass | The README and validation-consumer boundary distinguish the reusable substrate from an absent game layer. |
| Reproducible baseline | Pass | Pinned Rust tooling, deterministic gates, and repository-visible conformance commands establish a repeatable public baseline. |
| Invariant pressure | Pass | Dense conformance oracles exercise terrain, streaming, editing, collision, persistence, and bounded query behavior across subsystem boundaries. |
| Verification strength | Mixed | Repair branches and deterministic gates show rejection behavior, but this record does not claim exhaustive mutation coverage for every oracle. |
| Dependency boundaries | Mixed | Native graphics and platform dependencies are exercised publicly; full driver and hardware diversity remains outside this example. |
| Operational failure | Unproven | The repository demonstrates bounded performance and repair behavior but is not evidence of production incident recovery. |
| Proven gate | Pass | The validation consumer and deterministic conformance gates are executable boundaries used to reject and repair changes before integration. |

## Installed assurance gate

The gate is the repository’s validation-consumer contract: changes to the
substrate must satisfy deterministic conformance oracles and bounded query-cost
probes in the composed target, not merely unit tests on an agent branch.
Failed verification produces visible repair work before integration.

The before state is agent-produced subsystem work that is not yet qualified for
integration. The after state is the same work merged only after the composed
validation consumer and conformance gates pass. Public branch and merge history
preserve that distinction.

## Residual risk and verdict

**Mixed.** Moria is strong evidence that a large parallel Rust build can remain
legible and gated. This example does not establish production operations,
exhaustive hardware coverage, or a guarantee that every domain invariant is
represented. Those claims remain unproven rather than being smuggled into the
passing controls.
