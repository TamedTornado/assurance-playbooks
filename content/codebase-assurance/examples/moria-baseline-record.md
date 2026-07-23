---
schemaVersion: 1
kind: example
id: codebase-assurance-moria-baseline
title: Moria baseline record
version: 0.1.0
status: draft
summary: A dogfood baseline plan that separates documented routes from behavior actually reproduced by the assurance example.
playbook: codebase-assurance
target:
  repository: https://github.com/TamedTornado/moria
  commit: 6542cb53a636f191d9a4de72d476c3c4f06e3fe4
verdict: unproven
controls:
  - codebase-reproducible-baseline
---
# Moria baseline record

This record applies the baseline procedure to Moria's preserved product
expectations and pinned repository. It deliberately does not claim runtime
results: no Moria command was executed as part of this public playbook
dogfood. Its purpose is to select the right demonstrations, identify the route
a newcomer actually receives, and show exactly what would have to be run before
the example could claim a reproducible baseline.

## What we tried to reproduce

The selected demonstrations cover the promises most likely to change whether
the client can trust Moria as a reusable substrate:

1. a clean consumer can obtain and use Moria through its public crate boundary;
2. the walkable consumer produces the promised world and a visible edit;
3. the headed benchmark records mutation and performance evidence through the
   same supported product boundary; and
4. the named acceptance environments produce comparable, machine-identified
   results.

## What we were able to reproduce

Nothing in this record has been reproduced. The repository contains candidate
commands and detailed acceptance contracts, but written commands are not run
receipts.

## What failed, required repair, or remains blocked

The public README identifies Moria and links its source inputs, but gives a new
consumer no build, demo, benchmark, prerequisite, control, or expected-result
route. The commands exist in `AGENTS.md`, a contributor instruction file. That
is enough to plan the attempts, but it is not a newcomer-facing reproduction
procedure.

This is an instruction gap to preserve if a clean operator cannot discover the
route from the public entry point. It is not evidence that the product itself
fails.

The headed and machine-specific demonstrations also require suitable graphics
environments. Their availability was not assessed by this documentation-only
exercise.

## What this means for the client

The source material provides unusually specific candidate routes and report
contracts. That lowers the cost of reproduction, but does not establish that
the pinned implementation performs them. Until the attempts below are run,
their statuses remain **not run**, not supported.

The design-consistency finding also limits interpretation. A successful demo
or benchmark would show observable behavior in the current implementation; it
would not resolve whether that implementation satisfies the preserved
GPU-resident product expectation.

## Pinned target and shared starting conditions

- **Product or repository:** `TamedTornado/moria`
- **Revision or artifact identity:**
  `6542cb53a636f191d9a4de72d476c3c4f06e3fe4`
- **Local changes at start:** The pinned revision was read without changing the
  Moria working tree.
- **Relevant configuration and inputs:** Repository-provided curated inputs
  and defaults; exact identities must be captured by each run.
- **Named environment or machine, when material:** The design names a 32 GB M4
  acceptance machine and a Linux discrete-graphics machine. A general build
  does not inherit their performance authority.
- **Shared receipts:** None. This record contains source references only.

## Demonstrations

### A clean downstream project can use Moria through its supported public boundary

- **Why this matters:** A reusable substrate is not established by its own demo
  alone.
- **Expectation investigated:** Another game can consume Moria as a Rust crate
  without privileged access to world truth.
- **Person, action, and expected visible result:** A new Rust/Bevy consumer pins
  the Moria revision, imports the public facade, creates a minimal world, reads
  supported state, and submits one supported edit.

#### What success would establish

The pinned crate can be built and exercised by an external consumer using the
chosen public operations.

#### What success would not establish

It would not show that every capability needed by a real game is public, that
the public facade is the only route used by Moria's own consumers, or that the
implementation retains authoritative state on the GPU.

#### Route supplied by the project

The README supplies no external-consumer tutorial or command. `AGENTS.md`
requires other workspace packages to import through `moria_world::{...}` and
forbids privileged store access. Test specifications refer to external
consumer coverage, but those references are not a user route.

#### First attempt

- **Starting state:** Not created.
- **Exact command or action:** Not run.
- **Observed result:** None.
- **Raw receipt:** None.

#### Repairs

##### Supply a newcomer-facing consumer route

- **Classification:** Instruction repair.
- **Why:** The supported boundary is described, but a consumer cannot follow a
  complete route from the public README.
- **Action taken:** None in this example.
- **Finding or receipt:** Preserve the missing entry route if the clean attempt
  confirms it.

#### Repeatable route

- **Starting state:** To be established from a clean directory and pinned
  dependency.
- **Exact commands or actions:** To be written from the actual successful
  consumer attempt, not inferred from test names.
- **Expected observable result:** The consumer builds and obtains a meaningful
  world observation and edit result through the public facade.
- **Actual observable result:** Not observed.
- **Raw receipts and material artifacts:** None.
- **Environment details that affect this result:** Rust and native dependency
  versions encountered by the clean attempt.

#### Independent attempt

- **Operator or clean environment:** Not attempted.
- **Result:** Not attempted.
- **Extra knowledge required:** Unknown until the first route exists.
- **Differences and receipts:** None.

#### What this does and does not prove

- **Supported conclusion:** None yet.
- **Unsupported or narrower conclusion:** Repository contracts show intended
  package discipline; they do not prove a consumer can use it.
- **Limitations:** No execution evidence.

#### Result

- **Status:** Not run.
- **Decision consequence:** Reusability remains a design claim awaiting
  consumer evidence.
- **Related finding or blocked record:** Candidate instruction finding.

### A player can enter the real world and make a visible edit

- **Why this matters:** This is the client-visible center of the product.
- **Expectation investigated:** Moria produces a continuous editable world,
  and its validation consumer demonstrates supported behavior rather than a
  privileged imitation.
- **Person, action, and expected visible result:** Start the walkable consumer,
  reach the curated world, travel to a solid surface, perform a dig or place
  action, and see the affected surface change.

#### What success would establish

The pinned visual consumer can produce the selected world and visible edit on
the tested machine.

#### What success would not establish

Appearance alone would not show that the consumer uses only public APIs, that
GPU state is authoritative, that the change meets its latency target, or that
save and reload restore it.

#### Route supplied by the project

`AGENTS.md` supplies:

```sh
cargo run -p moria-demo
```

The README does not state prerequisites, controls, expected startup behavior,
how to reach the signature edit, or what evidence to retain.

#### First attempt

- **Starting state:** Not run.
- **Exact command or action:** `cargo run -p moria-demo`
- **Observed result:** None.
- **Raw receipt:** None.

#### Repeatable route

- **Starting state:** To be established.
- **Exact commands or actions:** Candidate command above; interaction steps
  must come from the real first attempt.
- **Expected observable result:** A walkable curated world and visible surface
  change after a supported edit.
- **Actual observable result:** Not observed.
- **Raw receipts and material artifacts:** None.
- **Environment details that affect this result:** Graphics adapter, backend,
  window environment, build identity, configuration, and asset identity.

#### Independent attempt

- **Operator or clean environment:** Not attempted.
- **Result:** Not attempted.
- **Extra knowledge required:** Unknown.
- **Differences and receipts:** None.

#### What this does and does not prove

- **Supported conclusion:** None yet.
- **Unsupported or narrower conclusion:** A successful visual run alone would
  not establish architecture or performance.
- **Limitations:** No headed execution or independent repetition.

#### Result

- **Status:** Not run.
- **Decision consequence:** The central user-visible behavior remains
  unobserved by this example.
- **Related finding or blocked record:** None yet.

### The benchmark records mutation and performance through the supported boundary

- **Why this matters:** The client expects more than an attractive demo; the
  qualities attached to it need comparable evidence.
- **Expectation investigated:** The benchmark uses the public product boundary
  and records identity, visible mutation, latency, workload, and machine
  context.
- **Person, action, and expected visible result:** Run the release benchmark,
  retain its report, and inspect its declared pass, failure, identity, coverage,
  and limitation fields.

#### What success would establish

The selected scenario completes on the tested machine and emits a report that
can be tied to the pinned product, workload, and environment.

#### What success would not establish

A report cannot prove a field it measures through a weaker proxy. It also
cannot establish results on another hardware profile or resolve the
CPU-authority design divergence.

#### Route supplied by the project

`AGENTS.md` supplies:

```sh
cargo run --release -p moria-bench -- --scenario flythrough --output target/bench/flythrough.json
cargo run --release -p moria-bench -- --scenario mutation-workloads --output target/bench/mutation-workloads.json
```

The benchmark design requires a fresh process, machine profile, build and world
identity, artifact digests, explicit failure reasons, and no silent merging of
different machines.

#### First attempt

- **Starting state:** Not run.
- **Exact command or action:** Candidate commands above.
- **Observed result:** None.
- **Raw receipt:** None.

#### Repeatable route

- **Starting state:** Fresh process and isolated output as required by the
  benchmark contract.
- **Exact commands or actions:** Candidate commands above, amended only by
  details learned during the first attempt.
- **Expected observable result:** Immutable machine-identified reports with
  explicit pass or failure reasons.
- **Actual observable result:** Not observed.
- **Raw receipts and material artifacts:** None.
- **Environment details that affect this result:** Complete machine profile,
  backend, resolution, build profile, commit, world/config digest, and asset
  identity.

#### Independent attempt

- **Operator or clean environment:** Not attempted.
- **Result:** Not attempted.
- **Extra knowledge required:** Unknown.
- **Differences and receipts:** None.

#### What this does and does not prove

- **Supported conclusion:** None yet.
- **Unsupported or narrower conclusion:** Detailed report contracts are not
  report evidence.
- **Limitations:** No benchmark was executed.

#### Result

- **Status:** Not run.
- **Decision consequence:** Performance and mutation evidence remains
  unestablished by this example.
- **Related finding or blocked record:** None yet.

### Named acceptance machines produce bounded, comparable results

- **Why this matters:** Hardware-sensitive claims cannot borrow authority from
  a different machine.
- **Expectation investigated:** Moria meets its named quality targets on the
  environments to which those targets apply.
- **Person, action, and expected visible result:** Run the required feasibility
  and final scenarios on each named configuration and compare only reports with
  complete machine identity.

#### What success would establish

The measured claims pass for the named product, workload, and hardware
configuration represented by each valid report.

#### What success would not establish

It would not establish universal GPU or driver behavior. The portable
application allocation ledger would not prove actual resident graphics memory
without the separately required measurement.

#### Route supplied by the project

`AGENTS.md` supplies the M4 feasibility commands and separates GPU/platform
acceptance into headed jobs on named machines. The detailed design requires
explicit resident-measurement evidence or an approved divergence before final
acceptance.

#### First attempt

- **Starting state:** Named environments not assessed.
- **Exact command or action:** Not run.
- **Observed result:** None.
- **Raw receipt:** None.

#### Repeatable route

- **Starting state:** Must be established independently for each named
  configuration.
- **Exact commands or actions:** Must include the repository commands and any
  external resident-measurement harness actually used.
- **Expected observable result:** Valid, machine-identified reports and raw
  resident-measurement evidence where required.
- **Actual observable result:** Not observed.
- **Raw receipts and material artifacts:** None.
- **Environment details that affect this result:** All machine identity fields
  required by the report contract.

#### Independent attempt

- **Operator or clean environment:** Not attempted.
- **Result:** Not attempted.
- **Extra knowledge required:** Unknown.
- **Differences and receipts:** None.

#### What this does and does not prove

- **Supported conclusion:** None yet.
- **Unsupported or narrower conclusion:** Documentation of named machines is
  not evidence that a run occurred on them.
- **Limitations:** Environment availability and evidence harnesses were not
  assessed.

#### Result

- **Status:** Not run.
- **Decision consequence:** Machine-specific claims remain pending evidence.
- **Related finding or blocked record:** Create a blocked record only if the
  engagement attempts and cannot obtain a required environment.

## Follow-on demonstrations

- Save, restart, and load an edited world through a second public consumer;
  this matters because visible mutation alone does not establish persistence.
- Repeat an edit near a streaming or representation boundary; this matters
  because one convenient location does not exercise composed world behavior.
- Run the current-TDD implementation while directly investigating the
  GPU-resident expectation; this requires evidence beyond a successful visible
  demo and belongs to the later falsification phases.
