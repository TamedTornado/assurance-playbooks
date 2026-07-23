---
schemaVersion: 1
kind: example
id: codebase-assurance-moria-design-consistency
title: Moria completed design consistency review
version: 0.1.0
status: draft
summary: A dogfood execution tracing Moria expectations through its source design, technical contract, public description, and preserved review history.
playbook: codebase-assurance
target:
  repository: https://github.com/TamedTornado/moria
  commit: 6542cb53a636f191d9a4de72d476c3c4f06e3fe4
verdict: mixed
controls:
  - codebase-design-coherence
---
# Moria design consistency review

This is a dogfood execution of the [design consistency
review](../templates/design-consistency-review.md) using the completed [Moria
product expectation worksheet](moria-product-expectations.md).

The review uses the public repository at commit
`6542cb53a636f191d9a4de72d476c3c4f06e3fe4`. It includes resolved conflicts
from the preserved TDD audit because those records show how the contract
changed. It does not claim to reproduce runtime behavior; that belongs to later
phases.

## Plain-language summary

### What we examined

We followed four connected expectations:

- Moria is a reusable substrate rather than a privileged demo.
- Authoritative voxel work is GPU-resident.
- The large editable world remains sparse.
- Interaction, frame pacing, and memory meet the promised operating envelope.

For each, we compared the preserved product boundary and seed specification
with the design document, current TDD, public README, and TDD review history.

### What tells a consistent story

The current technical contract consistently separates `moria-world` from the
demo and benchmark consumers. World storage is private, consumer reads and
mutations go through public APIs, diagnostics use bounded public pages, and
load safety is owned by the reusable library rather than the demo state
machine.

The current material also tells a substantially consistent story about sparse
CPU world representation: the whole region is not expanded, active bricks may
be procedural, uniform, or detailed, edits survive as sparse deltas, and
derived detail can be evicted and rebuilt.

The performance contract now distinguishes consumer publication, truth commit,
primary presentation, progressive throughput, full reconciliation, and
rendered-frame intervals. The resident-memory limitation is explicit rather
than presented as a pass.

### What conflicts or remains unsupported

The largest unresolved conflict is architectural:

- The public README calls Moria GPU-resident.
- The preserved substrate specification makes the brick pool, simulation, and
  meshing GPU-resident, with commands in and a stale CPU mirror plus events
  out.
- The implemented technical design makes generation, mutation, collision, and
  meshing CPU-authoritative.
- The TDD says the resident-memory evidence substitution is its only known
  design divergence.

Those statements do not describe one architecture. No product approval for
the CPU-authoritative redesign is visible in the reviewed material.

The approximately 2 GB resident graphics-memory target also remains unproven.
The application allocation ledger is useful but explicitly excludes driver
and backend overhead.

### What changed

The preserved TDD review corrected several earlier conflicts:

- material presence, water volume, and solid collision became separate
  predicates;
- bounded public diagnostic pages replaced a path that required private access
  or an unbounded scan;
- load became a library-owned transaction independent of `DemoState`;
- interactive mutation timing moved to consumer publication;
- benchmark reporting received one exact schema; and
- application allocation accounting was recorded as a weaker substitute
  rather than proof of resident graphics memory.

These changes improved the contract. They do not resolve the GPU/CPU authority
conflict.

### What remains to be tested

- Whether the demo and benchmark truly compile and operate as external
  consumers.
- Whether ordinary repository gates reject private access and dependency
  inversion.
- Where voxel authority and load-bearing work reside in the implemented
  system.
- Whether sparse representation remains bounded under the full product
  workload.
- Whether interactive and progressive performance gates use the real headed
  path.
- Whether qualifying resident graphics-memory evidence can be collected.

## Reviews by expectation

### Moria is a reusable substrate, not a privileged demonstration

#### Behavior followed

An ordinary game reads nearby world state, submits a mutation, observes the
updated world, displays diagnostics, and performs save/load without access
unavailable to another consumer.

```text
External consumer
→ public WorldRead and WorldEditWrite
→ private authoritative WorldStore
→ revisioned mutation and derived presentation
→ bounded public diagnostics
→ library-owned save/load transaction
→ conformance and dependency gates
```

#### Sources consulted

- [Project
  boundary](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/seeds/project-boundary.md):
  the consumer boundary is not optional.
- [Design
  statement](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/design-document.md#L3-L13):
  the demo uses only supported external-consumer operations.
- [Technical
  overview](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/tdd/overview.md#L1-L6):
  library authority and equivalent consumers.
- [Public API
  contract](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/tdd/api.md#L1-L18):
  exported values, read-only access, and hidden storage.
- [Preserved TDD
  review](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/tdd-review.md#L11-L30):
  original diagnostic and load-boundary failures.

#### Conflicts, gaps, and divergences

##### Required diagnostics originally had no public discovery path

- **Type:** Missing contract.
- **Source A said:** The demo must display active bricks, dirty and pinned
  state, pending work, streaming rings, chunk bounds, focus markers, and raw
  voxels.
- **Source B said or omitted:** The public API could inspect only a brick the
  caller already knew and otherwise exposed aggregate counts.
- **Why they did not form one story:** The demo could not discover the state it
  was required to display without private access or an unbounded region scan.
- **Why the client should care:** A successful demo would not prove that
  another game could consume Moria.
- **Smallest honest clarification:** Provide bounded immutable diagnostic
  pages or make the diagnostic renderer a public library capability.
- **Status:** Resolved in the TDD.
- **Authority needed or approval received:** Technical contract correction
  consistent with the existing product boundary.
- **Sources changed:** `api.md` and `systems.md`.
- **What remains to be tested:** The demo, benchmark, and external consumer use
  exactly this public path; private paths fail the ordinary gate.

##### Library loading originally depended on demo-owned state

- **Type:** Contradiction.
- **Source A said:** `moria-world` is reusable and downstream state machines
  may differ.
- **Source B said:** Load acceptance depended on `DemoState::LoadingWorld` or
  an undefined suspension message.
- **Why they did not form one story:** A reusable library could not enforce or
  test a condition owned by one particular demo.
- **Why the client should care:** Save/load could work only inside the
  reference application.
- **Smallest honest clarification:** Make load an internally safe,
  library-owned transaction with public phases and terminal results.
- **Status:** Resolved in the TDD.
- **Authority needed or approval received:** Technical correction preserving
  the confirmed product boundary.
- **Sources changed:** `api.md`, `states.md`, and supporting tests.
- **What remains to be tested:** A headless external consumer can exercise
  load while continuing its own unrelated state machine.

#### Coverage

- **Reviewed through:** Queries, mutation, diagnostics, package direction, and
  save/load ownership.
- **Partially reviewed or deferred:** Runtime dependency inspection and
  deliberate invalid-consumer test.
- **Blocked by:** Nothing at the contract level.
- **Limit of this conclusion:** The current documents are coherent; the running
  implementation is not proven by this review.

### Authoritative voxel work is GPU-resident

#### Behavior followed

A command mutates authoritative voxel truth, updates collision and queries,
produces a derived mesh, and exposes bounded observations to the CPU and
consumer.

```text
Consumer command
→ authority receives mutation
→ voxel truth changes
→ collision and query truth advance
→ dirty bricks are meshed
→ GPU presentation updates
→ bounded mirror or events reach consumers
```

#### Sources consulted

- [Public
  README](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/README.md):
  “reusable, GPU-resident voxel-world substrate.”
- [Substrate design
  goals](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/seeds/voxel-world-substrate.md#L7-L15):
  GPU-resident brick pool and simulation, commands in, stale mirror and events
  out.
- [Substrate meshing
  design](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/seeds/voxel-world-substrate.md#L24-L29):
  GPU compute meshing over dirty bricks.
- [Product performance
  interview](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/interview-record.md#L150-L175):
  preserve the command/mirror architecture despite unified memory.
- [Current technical
  overview](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/tdd/overview.md#L22-L28):
  CPU-authoritative generation, mutation, collision, and meshing.
- [Current world
  model](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/tdd/data-model.md#L198-L225):
  private Rust `WorldStore` with active bricks and deltas.

#### Conflicts, gaps, and divergences

##### The TDD replaces the GPU-authoritative architecture with a CPU-authoritative one

- **Type:** Design divergence.
- **Source A says:** Brick storage, simulation, and meshing are GPU-resident;
  the CPU receives a stale mirror and events.
- **Source B says:** Portable CPU code and Bevy task pools perform authoritative
  generation, mutation, collision, and meshing; the renderer consumes ordinary
  derived meshes.
- **Why they do not form one story:** They place truth and the load-bearing work
  on different processors and imply different synchronization, bandwidth,
  performance, and consumer boundaries.
- **Why the client should care:** GPU residency was part of the commissioned
  architecture and public description, not a hidden implementation detail.
  The CPU design may still be good, but it is a different product decision.
- **Smallest honest clarification:** Product authority must either approve the
  CPU redesign and update the public/product documents, or restore a technical
  plan that implements the GPU-authoritative architecture.
- **Status:** Unresolved.
- **Authority needed or approval received:** Product owner; no approval located.
- **Sources changed:** None yet.
- **What remains to be tested:** If the CPU design is accepted, it requires
  fresh evidence for scale, memory traffic, latency, and the intended
  command/mirror boundary.

##### The current divergence register claims this conflict does not exist

- **Type:** Contradiction.
- **Source A says:** CPU authority deliberately replaces the GPU design.
- **Source B says:** The resident-memory evidence issue is the only known
  design divergence.
- **Why they do not form one story:** A load-bearing architecture changed
  without appearing in the section intended to preserve changed product
  meaning.
- **Why the client should care:** The apparent completeness of the TDD can hide
  an unapproved change from a client who cannot read the Rust.
- **Smallest honest clarification:** Add the authority change as a pending
  divergence with source expectation, substitute, consequence, and approval
  status.
- **Status:** Unresolved.
- **Authority needed or approval received:** Product owner.
- **Sources changed:** None yet.
- **What remains to be tested:** Whether any other source or approval record
  authorizes the change.

#### Coverage

- **Reviewed through:** Product source, public description, technical
  architecture, and authoritative store definition.
- **Partially reviewed or deferred:** Runtime trace of CPU/GPU resources.
- **Blocked by:** Missing product decision.
- **Limit of this conclusion:** The documents establish a conflict, not whether
  the CPU redesign is technically inferior.

### The large editable world remains sparse

#### Behavior followed

An untouched location remains compact, becomes detailed near a consumer or
mutation, produces query and presentation data, then evicts derived detail
without losing edits.

```text
Seed and compact descriptors
→ activation request
→ procedural or uniform classification
→ bounded detailed brick
→ mutation delta and derived resources
→ eviction
→ regeneration plus exact delta replay
```

#### Sources consulted

- [Product region and sparsity
  requirement](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/seeds/product-one-seed.md#L25-L32).
- [Design active-detail
  rule](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/design-document.md#L34-L43).
- [Technical overview of sparse
  representation](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/tdd/overview.md#L52-L57).
- [Current sparse brick
  store](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/tdd/data-model.md#L198-L235).
- [Preserved object-dependency
  finding](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/tdd-review.md#L447-L454).

#### Conflicts, gaps, and divergences

##### Object dependency metadata temporarily recreated region-wide detailed cost

- **Type:** Contradiction.
- **Source A said:** Untouched matter and inactive objects remain sparse; memory
  traffic is load-bearing.
- **Source B said:** Every object retained an explicit sorted set of all raw and
  derived dependency voxel coordinates across the region.
- **Why they did not form one story:** Thousands of inactive forest objects
  could retain millions of detailed coordinates before world readiness.
- **Why the client should care:** The system could satisfy the brick-storage
  story while losing the intended scaling through a secondary index.
- **Smallest honest clarification:** Keep bounded placement footprints and a
  lazy analytic membership predicate; account for all retained index memory.
- **Status:** Resolved in the current TDD.
- **Authority needed or approval received:** Technical correction preserving
  the existing sparsity requirement.
- **Sources changed:** Data model, systems, benchmark, and acceptance contracts.
- **What remains to be tested:** Full checked-in manifest construction,
  retained-memory accounting, and equivalence to an explicit-set oracle on
  small fixtures.

#### Coverage

- **Reviewed through:** Brick representation, delta retention, active detail,
  and object dependency metadata.
- **Partially reviewed or deferred:** Other caches and actual resident CPU/GPU
  resources under a full headed run.
- **Blocked by:** Runtime evidence.
- **Limit of this conclusion:** The current contract is sparse by design; only
  execution can establish the bound.

### Interaction and presentation meet the promised performance

#### Behavior followed

A user submits a representative dig action and waits for changed truth,
collision, and visible terrain while the system preserves frame pacing.

```text
User input in rendered frame
→ public command publication
→ admission and truth commit
→ collision/query revision
→ mesh production
→ render extraction and queue acknowledgement
→ visible result and report validation
```

#### Sources consulted

- [Performance targets in the preserved
  seed](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/seeds/product-one-seed.md#L77-L96).
- [Two-frame design
  path](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/design-document.md#L168-L177).
- [Current requirement
  translation](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/tdd/overview.md#L7-L22).
- [Current benchmark measurement
  contract](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/tdd/benchmarks.md).
- [Original timing
  finding](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/tdd-review.md#L31-L47).

#### Conflicts, gaps, and divergences

##### Mutation timing originally began after the user had already started waiting

- **Type:** Contradiction.
- **Source A said:** A representative carve becomes visible within two rendered
  frames.
- **Source B said:** The deadline began when an internal fixed-update drain
  observed and stamped the request.
- **Why they did not form one story:** A rendered frame could pass before the
  drain, allowing a longer user-visible wait while the internal metric passed.
- **Why the client should care:** A green report could coexist with a visibly
  slower product.
- **Smallest honest clarification:** Stamp publication in the consumer-facing
  API and assert the deadline from that rendered frame.
- **Status:** Resolved in the current TDD for the interactive carve.
- **Authority needed or approval received:** Technical correction preserving
  the original user-visible expectation.
- **Sources changed:** API, systems, benchmark, and tests.
- **What remains to be tested:** Zero-fixed-tick, cutoff, production render
  extraction, and headed presentation cases.

##### Broad mutations use a different performance contract

- **Type:** Design divergence recorded as an approved clarification.
- **Source A says:** The original 3 m debug carve completes within two rendered
  frames.
- **Source B says:** Colony and catastrophic operations are progressive and
  cannot complete wholly within an arbitrary rendered-frame count.
- **Why they do not form one story without qualification:** Applying the
  two-frame sentence to every possible mutation would make the larger product
  workloads impossible; applying only progressive metrics to the interactive
  carve would weaken its visible promise.
- **Why the client should care:** The system must preserve the immediate
  interaction while defining honest progress for much larger operations.
- **Smallest honest clarification:** Retain the two-frame interactive case and
  separately specify admission, first progress, throughput, fairness, primary
  presentation, and full reconciliation for broader workloads.
- **Status:** Resolved in the current TDD, subject to implementation evidence.
- **Authority needed or approval received:** The TDD records a product
  clarification dated 2026-07-14.
- **Sources changed:** Overview, API, systems, benchmarks, and implementation
  gates.
- **What remains to be tested:** All named workloads on the production path and
  acceptance machines.

##### The graphics-memory proxy cannot prove the resident target

- **Type:** Design divergence.
- **Source A says:** Active Product One remains below approximately 2 GB
  resident graphics memory.
- **Source B says:** The portable ledger counts application-requested resources
  and excludes driver/backend overhead.
- **Why they do not form one story:** The ledger can pass while actual resident
  graphics memory exceeds the target.
- **Why the client should care:** The client was promised a product resource
  bound, not merely an accounting subtotal.
- **Smallest honest clarification:** Collect a reviewed resident measurement or
  preserve the claim as unproven; a product-approved proxy may permit a limited
  gate but cannot be called proof of residency.
- **Status:** Explicitly unresolved and correctly blocks overall acceptance.
- **Authority needed or approval received:** Product approval or qualifying
  external measurement; neither is recorded.
- **Sources changed:** Current TDD already preserves the limitation.
- **What remains to be tested:** Resident measurement on named Metal and
  NVIDIA/Vulkan configurations.

#### Coverage

- **Reviewed through:** Interactive mutation timing, progressive workload
  semantics, rendered-frame measurement, and graphics-memory evidence.
- **Partially reviewed or deferred:** Actual benchmark receipts.
- **Blocked by:** Named runtime evidence and resident-memory provider.
- **Limit of this conclusion:** The measurement contract is substantially
  coherent; no performance result is established here.

## Usability observations

Executing the two procedures against Moria exposed several practical facts.

### What helped

- Starting from the client's language surfaced the GPU/CPU authority conflict
  immediately. Beginning from the current TDD would have missed it because the
  TDD is internally coherent.
- Nesting questions and conflicts under each expectation avoided a separate
  traceability matrix.
- Choosing a behavior made “reusable” and “performant” tractable without
  pretending to review the whole repository.
- The preserved TDD review provided unusually good before-and-after evidence
  for resolved conflicts.

### What was burdensome

- The source list and conflict block repeat some information. The repetition
  was useful for the unresolved GPU issue but felt heavy for already resolved
  findings.
- “Authority needed,” “sources changed,” and “what remains to be tested” were
  valuable for unresolved issues; forcing them for every small clarification
  would become clerical.
- One expectation can produce several behaviors and several conflicts. The
  nested document remains readable, but a long engagement will need a short
  summary at the top exactly as the template provides.

### Changes the dogfood suggests

- Keep all conflict fields available, but explicitly permit deleting fields
  that add no information.
- Allow a resolved issue to use a shortened form when the review record already
  preserves the full before-and-after evidence.
- Add a specific prompt to compare preserved source expectations and public
  descriptions with the current technical design. Internal TDD consistency is
  not enough.
- Treat an unrecorded architecture change as a first-class design divergence,
  even when the replacement is technically coherent.

These are refinements, not reasons to return to spreadsheets or record-per-file
data. The single nested Markdown review remained usable for this source-rich
case.
