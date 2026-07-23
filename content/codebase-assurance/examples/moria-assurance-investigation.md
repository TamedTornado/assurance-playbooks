---
schemaVersion: 1
kind: example
id: codebase-assurance-moria-investigation
title: Moria assurance investigation
version: 0.1.0
status: draft
summary: A dogfood investigation showing how preserved product intent becomes concrete false-success challenges and a candidate gate.
playbook: codebase-assurance
target:
  repository: https://github.com/TamedTornado/moria
  commit: 6542cb53a636f191d9a4de72d476c3c4f06e3fe4
verdict: unproven
controls:
  - codebase-invariant-pressure
  - codebase-verification-strength
  - codebase-dependency-boundaries
  - codebase-operational-failure
  - codebase-proven-gate
---
# Moria assurance investigation

This document dogfoods the investigation format against Moria's pinned source
material. It selects challenges and makes their logic concrete. It does not
claim execution: the public playbook exercise did not mutate Moria, run its
acceptance routes, exercise failure, or install a gate. Every proposed
challenge therefore remains **not exercised**.

That limit is intentional. A detailed test specification is still only a plan
until a wrong result is sent through the route that accepts real work.

## What we challenged

Three Moria expectations are unusually exposed to convincing false success:

1. A future game can use Moria as a reusable substrate rather than relying on
   privileges available only to the included demo.
2. Moria is the GPU-resident substrate the client commissioned, not a
   CPU-authoritative implementation that produces a similar picture.
3. Performance and feasibility reports describe the exact code, workload,
   assets, and machine they appear to certify.

False success on any of these could leave the client with an impressive demo
and large green repository while the underlying product is not the one they
asked for.

## What the existing evidence can catch

The pinned design and test specifications describe strong intended checks:

- consumers import through the public `moria_world` facade;
- the demo and benchmark may not read private world storage;
- external-consumer tests compare supported behavior;
- benchmark reports carry build, world, asset, workload, machine, backend, and
  resolution identity; and
- report validators are intended to reject stale or mismatched evidence.

This is useful design evidence. It tells an implementer what the checks should
do. It does not show that the checks exist in the pinned implementation, are
registered in the ordinary command, or reject the wrong versions below.

## What can still pass or remains unproven

All three challenges remain unproven by this example because none was executed.

The design-consistency review adds a more serious concern to the second
challenge. Preserved product sources say GPU-resident; the current TDD describes
CPU-authoritative generation, mutation, collision, and meshing. A current-TDD
implementation could therefore be coherent and well tested while proving the
wrong product. Tests derived only from that TDD would reward the divergence
rather than detect it.

## What happens at real boundaries and during failure

No boundary or failure exercise was run. The material boundaries selected for
future execution are:

- external consumer to public crate facade;
- public edit command to authoritative state and visible presentation;
- source and workload identity to benchmark report and review decision; and
- interrupted save or load to downstream developer visibility and restored
  world state.

Production operation is outside this example. Moria may support a bounded
developer-operator conclusion for failed commands, immutable reports, and
state-preserving recovery; it cannot inherit production incident readiness.

## Best candidate for a durable gate

The public-consumer boundary is the strongest first candidate because it is
central to the reusable-substrate promise, can be exercised without subjective
visual judgment, and can govern the ordinary repository test route.

The proposed gate would require a representative external consumer to compile
and perform meaningful observation and mutation through the public facade,
while a controlled private-access version is rejected. It must also prove that
the conformance case is discovered by the ordinary command.

This gate would not resolve GPU authority. That requires a separate
decision-relevant challenge capable of distinguishing a GPU-authoritative
substrate from the easier CPU-authoritative product described by the current
TDD.

## Challenges

### “Another game can use Moria as a reusable substrate”

#### Ordinary acceptance route

- **What currently gives the team confidence:** Package rules, external
  consumer test specifications, and the workspace's ordinary Rust test route.
- **Exact command or decision route:** `cargo test`, with the specific
  conformance target discoverable without an opt-in command.
- **Valid behavior that must continue to pass:** A clean representative
  downstream consumer can observe the world and submit one edit through the
  public facade.

#### Convincing wrong version

- **The plausible shortcut or false success:** The included demo reads private
  world state or obtains workspace-only privileges, while an actual downstream
  crate cannot perform the same representative behavior.
- **Why a reasonable reviewer could believe it:** The demo can look and behave
  correctly, and repository-local tests may never attempt a truly external
  consumer.
- **Why the client would care:** The deliverable would be a bespoke demo rather
  than the reusable substrate commissioned.

#### Predicted rejection

- **Safe mutation or fixture:** Compile a controlled demo adapter that imports
  one private implementation path, and a separate clean consumer that attempts
  the supported observation and edit.
- **Expected result:** The privileged adapter is rejected; the valid consumer
  succeeds; both cases are reached by the ordinary test route.
- **Intended reason:** Package visibility and public capability, not unrelated
  syntax or dependency failure.
- **Experiment boundary and restoration:** Isolated test fixtures reverted
  after preserving receipts.

#### Challenge result

- **Target and exact change:** Not applied.
- **Observed result:** Not exercised.
- **Raw receipt:** None.
- **Valid-path result afterward:** Not run.
- **What this supports:** The challenge is executable and tied to a client
  expectation.
- **What remains unsupported:** Whether the present repository actually
  rejects privileged consumption and supports the clean consumer.
- **Finding, when material:** Create one if the ordinary route misses either
  side.

#### Real boundary exercised

```text
downstream game
→ public moria_world facade
→ authoritative world observation and edit
→ presentation acknowledgement
→ consumer-visible result
```

- **Boundary and risk selected:** External package to supported facade.
- **Identity, state, ordering, or authority that could be lost:** Workspace
  privilege could substitute for public capability.
- **Expected safe behavior:** A clean consumer succeeds without private access;
  private access cannot compile.
- **Exercise performed:** None.
- **Observed product state and result:** None.
- **Failure direction:** Excess authority if the demo receives private access;
  visible unavailability if the clean consumer lacks required capability.
- **What a local test or substitute would have missed:** A test inside
  `moria-world` does not reproduce downstream package visibility.
- **Valid-path result afterward:** Not run.
- **Evidence and limitation:** Design sources only.

#### Candidate durable gate

- **Wrong result the gate should reject:** A change that preserves the demo by
  using privileges unavailable to real consumers.
- **Ordinary route it should control:** Repository `cargo test`.
- **Valid result it must preserve:** Representative external consumer behavior.
- **Why this boundary has leverage:** It protects the product boundary across
  future implementation changes.
- **Who should own it:** Product repository with independent review of fixture
  meaning and registration.
- **Known bypass or limitation:** It protects only the representative public
  behavior encoded in the fixture.

### “Moria is GPU-resident rather than an easier CPU-authoritative imitation”

#### Ordinary acceptance route

- **What currently gives the team confidence:** Headed demo and benchmark
  plans, architectural rules, and current TDD tests.
- **Exact command or decision route:** No demonstrated ordinary route currently
  distinguishes the preserved expectation from the current CPU-authoritative
  TDD.
- **Valid behavior that must continue to pass:** A supported edit changes the
  visible world and exposes the required bounded observations.

#### Convincing wrong version

- **The plausible shortcut or false success:** Keep generation, mutation,
  collision, and meshing authoritative on the CPU, upload derived results to
  the GPU, and produce the same visible demo.
- **Why a reasonable reviewer could believe it:** The picture, controls, and
  even many timing reports can remain convincing.
- **Why the client would care:** The implementation loses the architecture
  chosen for scale and for the intended agent pipeline, while appearing to
  complete the same product.

#### Predicted rejection

- **Safe mutation or fixture:** First define an observable authority-boundary
  challenge that the preserved GPU design must satisfy and a CPU-authoritative
  implementation cannot satisfy merely by producing the same pixels.
- **Expected result:** The current CPU-authoritative design or implementation
  is rejected or presented for explicit product approval as a divergence.
- **Intended reason:** Wrong state and computation authority, not visual
  difference.
- **Experiment boundary and restoration:** Requires design authority before an
  implementation mutation is meaningful.

#### Challenge result

- **Target and exact change:** None.
- **Observed result:** Not exercised.
- **Raw receipt:** Design consistency review only.
- **Valid-path result afterward:** Not run.
- **What this supports:** The current project sources describe incompatible
  products.
- **What remains unsupported:** Whether the implementation matches either
  architecture and what evidence can distinguish them at runtime.
- **Finding, when material:** The unresolved design divergence already requires
  product decision.

#### Candidate durable gate

- **Wrong result the gate should reject:** A CPU-authoritative substrate being
  accepted as proof of the GPU-resident product.
- **Ordinary route it should control:** Product architecture approval and the
  acceptance path that claims GPU residency.
- **Valid result it must preserve:** The visible world and edit behavior under
  the approved authority model.
- **Why this boundary has leverage:** It prevents a coherent downstream plan
  from silently redefining the product.
- **Who should own it:** Product decision owner with independent technical
  evidence.
- **Known bypass or limitation:** No runtime gate should be invented until the
  authority claim has an observable rejecting rule.

### “The benchmark report belongs to the exact product and run it claims”

#### Ordinary acceptance route

- **What currently gives the team confidence:** Report schemas and validators
  described in the benchmark TDD.
- **Exact command or decision route:** Release benchmark command followed by
  the report validator used for acceptance.
- **Valid behavior that must continue to pass:** A fresh report with matching
  commit, world, assets, scenario, machine, backend, resolution, and supporting
  artifact identities.

#### Convincing wrong version

- **The plausible shortcut or false success:** Reuse a structurally valid
  passing report from another commit, asset set, workload, or machine.
- **Why a reasonable reviewer could believe it:** The report looks complete and
  contains plausible measurements.
- **Why the client would care:** The project could appear to meet performance
  targets using evidence produced by a different product.

#### Predicted rejection

- **Safe mutation or fixture:** Change one identity field or supply a stale
  report while retaining valid structure and plausible values.
- **Expected result:** The ordinary acceptance route rejects the report and
  names the identity mismatch.
- **Intended reason:** Evidence does not belong to the target under decision.
- **Experiment boundary and restoration:** Immutable copied report fixture; no
  acceptance artifact rewritten in place.

#### Challenge result

- **Target and exact change:** Not applied.
- **Observed result:** Not exercised.
- **Raw receipt:** None.
- **Valid-path result afterward:** Not run.
- **What this supports:** The challenge can distinguish provenance validation
  from schema validation.
- **What remains unsupported:** Whether the current validator exists, runs in
  the ordinary route, and rejects each material mismatch.
- **Finding, when material:** Create one if stale evidence is accepted or the
  validator can be omitted.

#### Real boundary exercised

```text
benchmark run
→ raw measurements and identities
→ immutable report
→ report validator
→ product acceptance decision
```

- **Boundary and risk selected:** Produced report to independent acceptance.
- **Identity, state, ordering, or authority that could be lost:** The producer
  could attach plausible values to a different target or approve its own stale
  evidence.
- **Expected safe behavior:** Identity mismatch prevents acceptance before
  measurements influence the decision.
- **Exercise performed:** None.
- **Observed product state and result:** None.
- **Failure direction:** Stale success if mismatched evidence is accepted.
- **What a local test or substitute would have missed:** Parsing a report says
  nothing about whether its evidence belongs to the target.
- **Valid-path result afterward:** Not run.
- **Evidence and limitation:** TDD contracts only.

#### What the operator saw and did

- **Actual person responsible:** Release reviewer or downstream developer
  consuming the report.
- **What they needed to protect or restore:** A decision tied to the actual
  build and machine.
- **Expected first signal and location:** Validator refusal naming the
  mismatched identity before acceptance.
- **Expected action and recovery proof:** Run the pinned workload again and
  obtain a fresh matching report.

| Moment | What the product did | What the operator could see | Action |
| --- | --- | --- | --- |
| Failure introduced | Not exercised | Nothing | None |
| First awareness | Not exercised | Nothing | None |
| Containment | Not exercised | Nothing | None |
| Recovery or rollback | Not exercised | Nothing | None |
| Product behavior verified | Not exercised | Nothing | None |

- **State before, during, and after:** No execution evidence.
- **Unstated knowledge or private diagnostics required:** Unknown.
- **Baseline demonstration repeated:** No.
- **Residual exposure:** Report integrity remains unproven by this example.
- **Operational conclusion and boundary:** The desired developer-operator story
  is concrete, but no operational conclusion has been earned.

#### Candidate durable gate

- **Wrong result the gate should reject:** Stale or mismatched evidence
  influencing product acceptance.
- **Ordinary route it should control:** The only acceptance entry point for
  benchmark reports.
- **Valid result it must preserve:** Fresh matching reports.
- **Why this boundary has leverage:** It protects every metric carried by the
  report from identity substitution.
- **Who should own it:** An acceptance authority independent of report
  production.
- **Known bypass or limitation:** Identity integrity does not prove that each
  metric measures the product quality it names.
