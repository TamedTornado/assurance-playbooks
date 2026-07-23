---
schemaVersion: 1
kind: example
id: codebase-assurance-moria-example
title: Codebase Assurance worked example — Moria
version: 0.1.0
status: draft
summary: A public example of product-boundary design and verification assurance on a complex parallel-built Rust system.
playbook: codebase-assurance
target:
  repository: https://github.com/TamedTornado/moria
  commit: 6542cb53a636f191d9a4de72d476c3c4f06e3fe4
verdict: mixed
controls:
  - codebase-claim-map
  - codebase-design-coherence
  - codebase-reproducible-baseline
  - codebase-invariant-pressure
  - codebase-verification-strength
  - codebase-dependency-boundaries
  - codebase-operational-failure
  - codebase-proven-gate
---
# Moria: assurance before and during a parallel build

Moria is a public Rust/Bevy voxel-world substrate. It was designed and built
through a highly parallel agent pipeline, which makes it a useful example of a
codebase that can acquire enormous apparent completeness quickly.

The assurance question was not “Is this a lot of Rust?” It was:

> Does this repository define and verify a reusable voxel-world substrate
> through the same public boundary a future game would use?

That narrower question changed the work.

## The first gate was the product boundary

The source material contained both a rich future game and a first product. The
requirements interview separated them.

Moria was defined as the reusable substrate. The included walkable-world
executable was only a validation consumer. It had to use the same public
queries and commands available to an external game; it could not reach into
private storage, inject rendered meshes as truth, or depend on game-specific
state.

Combat, AI, spells, dynamic fluids, granular simulation, building systems, and
the future game were explicit non-goals. Compatibility seams were allowed only
when required by the substrate.

This was assurance work because it made a common shortcut rejectable. A
beautiful demo using privileged implementation paths would not prove a usable
substrate.

## The design looked detailed and still contradicted itself

The technical design was extensive. A hostile audit did not ask whether it
looked professional. It traced the same product claim through data definitions,
public APIs, systems, states, rendering, benchmarks, and tests.

That exposed several blocking contradictions.

### Water had two incompatible meanings

One data contract treated every non-air voxel above a density threshold as
occupied. The movement contract prohibited the player capsule from overlapping
occupied voxels. A separate water contract said water was non-solid and the
player could paddle through it.

Each statement was locally reasonable. Together they made the required
behavior impossible. The repair was to define separate predicates for material
presence, water volume, and solid collision occupancy and use them consistently.

### The public consumer could not build the required diagnostics

The demo was required to display active bricks, dirty state, streaming rings,
and raw voxels using only public interfaces. The proposed API could answer
questions about a caller-supplied brick and return aggregate counts, but it
could not enumerate the bounded state needed by the visualizers.

Without repair, the implementation would have faced two bad choices: privileged
access that invalidated the consumer proof, or an unbounded scan that violated
the performance design. The public diagnostic boundary had to be specified.

### The reusable library depended on the demo

The load protocol permitted work only while the downstream demo was in a
particular `DemoState`. That inverted the package boundary: a reusable library
could not test whether an arbitrary external consumer had entered a
demo-specific state.

The resolution required a library-owned suspension/load transaction or an
internally safe load protocol—not a promise that future consumers would copy
the demo.

### A performance promise started its clock too late

The product promised that a user’s dig or place action would become visible
within two rendered frames. The technical test started the deadline when an
internal system eventually drained the request. Under a zero-fixed-tick frame
or cutoff, the user could wait an additional frame while the test still passed.

The corrected criterion had to start from publication of the user action. This
is a classic assurance distinction: the metric was precise, repeatable, and
attached to the wrong event.

### A weaker measurement had replaced the product target

The product named a resident graphics-memory target. The design could only
measure application-requested buffers and textures, excluding driver and
backend overhead, but initially treated that ledger as equivalent.

The audit turned this into an explicit design divergence. A ledger-passing run
could not claim the original target was proven. Product approval or a real
resident-memory measurement was required.

## The implementation gates were designed to reject theatre

The resulting TDD did more than list unit tests.

- Consumers mutate and inspect world truth only through public interfaces.
- Deterministic logic advances controlled ticks rather than sleeping or
  assuming one application update equals one simulation step.
- Headed GPU and performance claims use named acceptance machines and
  machine-readable reports.
- Platform claims that could not yet be measured remain provisional.
- Blocking feasibility gates run before broad downstream implementation; their
  thresholds cannot be weakened after failure without a reviewed design change.
- Test specifications require deliberately invalid fixtures to fail through
  the ordinary repository test command. A validator that exists but is not
  registered in the normal test graph is itself a failure.

That final rule matters. An agent can implement an excellent validation helper
and never invoke it. Inspecting the helper proves code exists; running a
deliberately bad fixture through the normal command proves the gate is alive.

## What the example establishes

At the pinned revision, Moria provides strong public evidence of:

- a clear reusable-substrate boundary and explicit non-goals;
- a reviewed design with contradictions repaired or retained as explicit
  divergences;
- deterministic public-interface conformance tests across terrain, streaming,
  mutation, collision, persistence, and bounded queries;
- test specifications designed to prove registration and failure direction;
  and
- an integration discipline in which composed work must satisfy the repository
  gate rather than relying on branch-local agent confidence.

It does not establish production incident recovery, exhaustive GPU and driver
coverage, or universal correctness of every voxel-world invariant. The
resident graphics-memory product target remained dependent on evidence or
approval beyond the portable allocation ledger.

## Control appendix

| Area | Result | Why |
| --- | --- | --- |
| Product claims | Supported | The interview and project boundary distinguish substrate, validation consumer, and excluded game systems. |
| Design coherence | Mixed | Material contradictions were found and repaired; the resident-memory divergence remained explicitly unresolved without evidence or approval. |
| Reproducible baseline | Supported | Pinned tooling, deterministic commands, fixtures, and machine-profiled acceptance paths are documented. |
| Invariant pressure | Supported | Tests exercise transitions and composition across terrain, streaming, mutation, collision, persistence, and public APIs. |
| Verification strength | Mixed | Deliberate failure and registration rules are strong; this example does not claim exhaustive semantic mutation of every invariant. |
| Dependency boundaries | Mixed | Real Bevy/native and platform paths are represented, while full hardware and driver diversity is not. |
| Operational failure | Unproven | Test and benchmark failure behavior is covered; production incident operation is not. |
| Proven gate | Supported | Ordinary conformance commands and public validation consumers reject invalid composed work before acceptance. |

**Overall result: mixed, useful evidence.** The system has a strong product
contract and verification boundary. Claims outside the observed machines,
dependencies, and operational setting remain bounded rather than smuggled into
the passing result.
