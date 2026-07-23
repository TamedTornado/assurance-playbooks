---
schemaVersion: 1
kind: example
id: codebase-assurance-moria-product-expectations
title: Moria completed product expectation worksheet
version: 0.1.0
status: draft
summary: A completed intake worksheet reconstructing what a non-Rust-reading Moria owner expected and what requires independent investigation.
playbook: codebase-assurance
target:
  repository: https://github.com/TamedTornado/moria
  commit: 6542cb53a636f191d9a4de72d476c3c4f06e3fe4
verdict: mixed
controls:
  - codebase-claim-map
---
# Moria product expectation worksheet

This is a dogfood execution of the [product expectation
worksheet](../templates/product-expectation-worksheet.md), not a transcript of
a separate client engagement. It reconstructs the client account from the
repository's preserved interview and seed documents together with the
owner-provided scenario: the owner can evaluate the visible product but cannot
independently read the Rust implementation.

The exercise intentionally preserves the owner's phrase “only the voxels on
the GPU.” The source material gives that phrase a more precise and potentially
conflicting meaning; the worksheet does not resolve it on the client's behalf.

## What the client told us

### What they commissioned

A reusable voxel-world substrate for future games, delivered as a Rust crate or
small family of crates. It should support a large, continuous, editable
three-dimensional material world whose ordinary presentation does not look
like Minecraft.

The walkable world is a validation consumer, not the product itself. It should
prove that another game can query and mutate the substrate through the same
supported boundary.

The substrate was expected to be unusually performant. Authoritative voxel
work was expected to be GPU-resident, using commands in and a limited stale
mirror plus events out, while sparsity and streaming avoided expanding the
whole region into raw voxels.

### What they believe they received

A Rust/Bevy workspace containing a reusable `moria-world` library, a walkable
reference application, a benchmark consumer, generation tooling, extensive
technical design, test specifications, and implemented conformance and
benchmark machinery.

The public repository describes Moria as a “reusable, GPU-resident voxel-world
substrate.” The owner can inspect that description and the visible
demonstration, but cannot independently determine whether the Rust implements
those words.

### What they have seen

- A reference world that renders a natural environment and supports world
  interaction.
- A public repository with requirements, technical design, review history,
  tests, and benchmark contracts.
- A crate split that appears to separate the reusable library from the demo
  and benchmark consumers.
- Completion evidence produced by the implementation and review pipeline.

These observations show that substantial product-shaped work exists. They do
not by themselves establish GPU authority, external-consumer parity,
representative performance, or the strength of the verification.

### What they cannot independently verify

- Whether the reference application uses only capabilities available to a
  future game.
- Whether authoritative voxel state and load-bearing mutation or meshing work
  are actually GPU-resident.
- Whether CPU-side data is a bounded stale mirror or a competing authoritative
  world.
- Whether the implementation can meet the intended world scale without
  expanding or retaining a world-sized detailed representation.
- Whether user-visible mutation and frame-rate measurements cover the behavior
  the owner experiences.
- Whether the graphics-memory evidence establishes actual resident use.
- Whether the tests reject plausible shortcuts instead of merely exercising a
  successful path.

### What they expect to do next

Use Moria as the substrate for a much larger game and continue development with
massively parallel agents. The architecture therefore needs to be reusable,
clear enough for parallel work, and protected by executable boundaries that
prevent locally plausible shortcuts from changing the product.

### What the available accounts agree and disagree about

The sources agree that:

- Moria is the reusable substrate and the future game is a downstream
  consumer.
- The demo must not have privileged access.
- the whole region must not be expanded into raw voxels;
- performance and machine identity are product evidence, not optional
  diagnostics; and
- visible surfaces are derived from voxel truth.

The sources do not currently tell one unqualified story about GPU residency.
The preserved substrate specification makes the brick pool, simulation, and
meshing GPU-resident, with commands in and a stale CPU mirror plus events out.
The implemented technical design instead declares CPU generation, mutation,
collision, and meshing authoritative. The public README still calls the
substrate GPU-resident.

The project also preserves earlier conflicts around public diagnostics, load
ownership, water semantics, mutation timing, and resident-memory evidence.
Most were repaired in the technical contract. The GPU/CPU architectural change
is not listed among the current design divergences.

### What we will investigate

We will establish:

- whether the demo and benchmark are honest external consumers;
- where authoritative voxel state and mutation work actually live;
- whether the CPU-authoritative technical design is an approved change to the
  commissioned GPU-resident substrate;
- whether sparsity and memory behavior still support the intended scale;
- whether latency and frame-rate evidence begins at the user-visible event and
  runs through the real presentation path;
- whether actual resident graphics memory is proven or explicitly unproven;
  and
- whether ordinary repository gates reject violations of these properties.

## Expectations and investigation

### Moria is a reusable substrate, not a privileged demonstration

- **What they meant:** A future game can consume Moria through the same public
  Rust interfaces used by the reference application. Game rules remain above
  the substrate, and the demo cannot obtain special access to world truth.
- **Why it mattered:** The owner intends to build a larger game on Moria. A
  convincing demo with private access would not be the commissioned product.
- **Source:** [Project
  boundary](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/seeds/project-boundary.md)
  and [design document, product
  statement](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/design-document.md#L3-L13).
- **What they were shown:** A separate `moria-world` crate, demo, benchmark,
  public API, and reference application.
- **What the project material says:** The current TDD makes `WorldStore`
  private; consumers use `WorldRead`, `WorldEditWrite`, messages, and bounded
  diagnostic pages.
- **Unknown or conflict:** Earlier TDD versions required diagnostics the
  public API could not express and made library loading depend on demo-owned
  state. The review history says both were repaired. Implementation parity and
  rejection by ordinary gates still require evidence.

#### Questions to investigate

- [ ] Can the demo compile and exercise its required behavior using only the
  public `moria-world` facade?
  - **Evidence to seek:** Dependency inspection and external-consumer
    conformance build.
  - **Could look successful because:** Workspace membership or private module
    paths give the demo privileges another repository would not have.
  - **Conditions or limitations:** Pinned public facade and supported
    toolchain.
- [ ] Can an independent consumer query, mutate, diagnose, save, and load
  without demo-owned state?
  - **Evidence to seek:** Minimal external consumer exercising each supported
    path.
  - **Could look successful because:** The reference demo coordinates through
    undocumented state or configuration.
  - **Conditions or limitations:** Product One operations, not future game
    systems.
- [ ] Do repository gates reject a consumer that imports private state or
  introduces a reverse dependency?
  - **Evidence to seek:** A deliberately invalid consumer or dependency
    mutation failing through the ordinary test command.
  - **Could look successful because:** A conformance test exists but is not
    registered in the normal graph.

#### Coverage

- **Priority:** Highest. It determines whether the delivered code is the
  reusable product the owner commissioned.
- **Included or deferred:** Included deeply.
- **Result the client needs explained:** Whether another game can rely on the
  same boundary the demo uses.

### Authoritative voxel work is GPU-resident

- **What they meant:** The load-bearing brick pool and voxel simulation live on
  the GPU. Consumers submit commands and receive events or a bounded stale
  mirror; the CPU does not own a second authoritative voxel world.
- **Why it mattered:** This was the intended performance architecture and a
  boundary for future sandbox, multiplayer, and agent-driven consumers.
- **Source:** [Voxel substrate design
  goal](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/seeds/voxel-world-substrate.md#L7-L15),
  [GPU meshing
  design](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/seeds/voxel-world-substrate.md#L24-L29),
  and the repository README.
- **What they were shown:** A project publicly described as GPU-resident.
- **What the project material says:** The current technical overview chooses
  CPU-authoritative generation, mutation, collision, and meshing using Bevy
  task pools. The private authoritative `WorldStore` is a Rust CPU data
  structure; the GPU receives derived render resources.
- **Unknown or conflict:** This is a direct architectural divergence from the
  preserved source expectation and public description. The TDD calls the
  resident-memory evidence substitution its only known design divergence, so
  no approval for CPU authority is visible.

#### Questions to investigate

- [ ] Is CPU-authoritative voxel work an explicitly approved product change?
  - **Evidence to seek:** Product decision, amendment, or preserved approval.
  - **Could look successful because:** A coherent TDD can make an unapproved
    architectural substitution appear settled.
- [ ] Which voxel representations are authoritative on CPU and GPU?
  - **Evidence to seek:** State ownership trace through generation, mutation,
    queries, meshing, persistence, and rendering.
  - **Could look successful because:** GPU buffers exist while all load-bearing
    world work remains CPU-owned.
- [ ] Does the public README accurately describe the delivered architecture?
  - **Evidence to seek:** Comparison of public description, TDD, and actual
    execution.
- [ ] If CPU authority is accepted, does it still deliver the scale,
  responsiveness, portability, and consumer boundary that motivated GPU
  residency?
  - **Evidence to seek:** Representative workload and memory-traffic evidence
    on named machines.
  - **Could look successful because:** A small reference workload does not
    pressure CPU storage, bandwidth, or meshing.

#### Coverage

- **Priority:** Blocking until product authority resolves whether this is a
  defect, an accepted redesign, or a misleading public claim.
- **Included or deferred:** Included deeply.
- **Result the client needs explained:** Whether Moria is actually
  GPU-resident in the sense commissioned, and what accepting the CPU design
  would change.

### The large editable world remains sparse

- **What they meant:** A 1 km × 1 km × 256 m region does not exist as a full raw
  voxel array. Untouched wilderness remains procedural or compact; detailed
  bricks materialize only when required and can be evicted without losing
  edits.
- **Why it mattered:** The region is deliberately large enough that sparsity
  and streaming must be real rather than decorative.
- **Source:** [Product One seed, region
  requirement](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/seeds/product-one-seed.md#L25-L32)
  and [design document, active
  detail](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/design-document.md#L34-L43).
- **What they were shown:** Streaming bands, compact brick descriptions,
  generated terrain, and benchmark contracts.
- **What the project material says:** The TDD uses procedural, uniform, and
  detailed active bricks plus retained deltas, with no whole-region expansion.
- **Unknown or conflict:** A previous object-dependency design accidentally
  retained region-wide coordinate sets and was repaired. Runtime proof must
  still show that other indexes, caches, and derived resources do not recreate
  the same scaling failure.

#### Questions to investigate

- [ ] Can the complete region be represented without allocating all raw
  voxels?
- [ ] Does activation and eviction bound detailed CPU and GPU resources?
- [ ] Are edits retained sparsely and reconstructed exactly after eviction and
  load?
- [ ] Do forest/object indexes include every retained allocation in their
  stated bound?
- [ ] Does a representative full-manifest run detect accidental region-wide
  materialization?

#### Coverage

- **Priority:** High because it is the main scaling property behind the
  product.
- **Included or deferred:** Included through representation, activation, and
  full-manifest evidence.
- **Result the client needs explained:** Whether the large world is genuinely
  sparse in the delivered implementation.

### Interaction and presentation meet the promised performance

- **What they meant:** The reference world reaches the named frame-rate targets,
  becomes walkable quickly, and displays a representative mutation within the
  promised user-visible latency without a hitch.
- **Why it mattered:** Performance is part of the product, not a future
  optimization.
- **Source:** [Preserved performance
  targets](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/seeds/product-one-seed.md#L77-L96)
  and [design acceptance
  table](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/design-document.md#L225-L245).
- **What they were shown:** Benchmark binaries, report schemas, and reference
  interaction.
- **What the project material says:** The TDD separates admission, first truth,
  primary presentation, throughput, fairness, and reconciliation. It uses
  headed production workloads and named machine profiles.
- **Unknown or conflict:** An earlier plan timed mutation from an internal
  drain rather than consumer publication. The current TDD records an approved
  clarification that broad progressive work is not subject to a two-frame
  whole-operation limit. Evidence must show that the original interactive
  carve remains protected rather than silently absorbed into the broader
  protocol.

#### Questions to investigate

- [ ] Does the latency clock begin when the consumer publishes the action?
- [ ] Does the two-frame interactive path include render extraction and
  presentation readiness?
- [ ] Can zero-fixed-tick and cutoff timing create a longer user wait while the
  report passes?
- [ ] Do frame-rate runs exercise the real world, assets, streaming, and
  mutation path on named machines?
- [ ] Do invalid or incomplete reports fail rather than fabricate zeroes or
  omit fields?

#### Coverage

- **Priority:** High because the expected product was explicitly sold to its
  owner through performance numbers.
- **Included or deferred:** Interactive M4 evidence included; unavailable
  machine configurations remain provisional.
- **Result the client needs explained:** Which performance promises have
  representative evidence and which remain provisional.

### Resident graphics memory remains below the product target

- **What they meant:** The complete active product workload remains below
  approximately 2 GB of resident graphics memory, with untouched wilderness
  near-zero in detailed cost.
- **Why it mattered:** Memory traffic was identified as a primary limit, and
  the large-world architecture depends on bounded active detail.
- **Source:** [Product One memory
  target](https://github.com/TamedTornado/moria/blob/6542cb53a636f191d9a4de72d476c3c4f06e3fe4/docs/seeds/product-one-seed.md#L77-L96).
- **What they were shown:** An application allocation ledger and benchmark
  report fields.
- **What the project material says:** The portable ledger excludes
  driver/backend overhead and explicitly cannot prove resident graphics
  memory. Overall acceptance remains false without qualifying evidence or a
  product-approved substitution.
- **Unknown or conflict:** No qualifying resident measurement or substitution
  approval is recorded.

#### Questions to investigate

- [ ] Is a reviewed resident-memory provider available on each named
  acceptance configuration?
- [ ] Does it cover the game process and relevant graphics allocations?
- [ ] Does the report remain failed when only the application ledger passes?
- [ ] Can the ledger detect monotonic growth and failure to evict even when it
  cannot prove residency?

#### Coverage

- **Priority:** High, but currently blocked as a final product claim.
- **Included or deferred:** Ledger behavior included; the resident claim
  remains unproven without external measurement.
- **Result the client needs explained:** The useful proxy evidence and the
  exact limit of what it proves.

## Client confirmation

For this dogfood run, the reconstructed account should be returned to the
Moria owner with two explicit questions:

1. Does “GPU-resident” mean the GPU-authoritative architecture in the preserved
   substrate design, including GPU meshing and only a stale CPU mirror?
2. Was the CPU-authoritative TDD an approved redesign, or is it an unapproved
   departure from the product commissioned and publicly described?

Until those are answered, the worksheet preserves the expectation and conflict
rather than choosing the current implementation as truth.
