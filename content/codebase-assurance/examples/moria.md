---
schemaVersion: 1
kind: example
id: codebase-assurance-moria-example
title: Codebase Assurance worked example — Moria
version: 0.1.0
status: draft
summary: How assurance kept a fast parallel Rust build from confidently producing the wrong product.
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
# Moria: keeping a fast build pointed at the right product

The completed playbook dogfood artifacts are available as a [product
expectation worksheet](moria-product-expectations.md), [design consistency
review](moria-design-consistency.md), and [baseline
record](moria-baseline-record.md). They apply the public procedures to Moria's
actual source material and preserve an unresolved GPU/CPU authority conflict
that this earlier narrative did not surface. The baseline record also makes
clear which runtime demonstrations this documentation exercise did not execute;
the narrative cannot turn planned commands into reproduced behavior.

## Moria was designed to move fast

Moria began with an unusually ambitious first product: a reusable Rust/Bevy
substrate for a fully material voxel world.

The proposed demonstration was deliberately product-shaped. A player would run
through a generated kilometre-wide landscape containing hills, forest, water,
cliffs, caves, geology, vegetation, and a ruin. The world would look like an
ordinary attractive game environment until the player stopped, carved into a
hillside, and walked through the opening. That moment was intended to make the
central claim undeniable: this was not a heightmap decorated with props. It was
a continuous, editable volume.

The product also carried hard technical promises. The world could not be
expanded into a giant raw voxel array. Mutation had to become visible within a
small number of rendered frames. Save data had to remain compact. The same
substrate would eventually need to support a much larger game without being
rewritten around the demonstration.

It was exactly the kind of project that could benefit from many coding agents.
Generation, storage, meshing, streaming, presentation, player movement,
persistence, and benchmarks offered substantial parallel work.

That opportunity created the main risk.

The danger was not that the agents would fail to produce code. They could
produce a great deal of locally convincing code very quickly. If the product
contract contained ambiguity or contradiction, several agents could implement
different reasonable interpretations at the same time. A large green
repository could arrive before anyone noticed that its parts proved different
products.

For Moria, assurance therefore began before implementation. The first task was
not to inspect code. It was to decide what the project actually had to prove.

## The first assurance decision changed the product

The source material described both the voxel technology and the much larger
game it might eventually support. Those ideas were related, but they were not
one deliverable.

The requirements interview established a hard boundary: Moria was the reusable
voxel-world substrate. The future game was a separate downstream consumer.
Combat, AI, spells, dynamic fluids, granular simulation, building systems, and
the wider game loop were explicitly out of scope.

The included walkable-world executable remained important, but its role
changed. It was not the product and it was not allowed to be a privileged demo.
It was a validation consumer.

That distinction created a concrete proof obligation. The executable had to
use the same public queries and mutation commands available to a future game.
It could not reach into private world storage, inject a render mesh as
authoritative state, or rely on a game-specific escape hatch. If the demo
looked wonderful but required privileged access, it would prove only that a
demo could be built—not that Moria was a reusable substrate.

This was more than scope management. It changed the architecture, package
direction, API requirements, test strategy, and meaning of success. It also
gave reviewers a powerful question to apply throughout the design:

> Could an external consumer establish this behavior through the supported
> boundary?

With that question fixed, the project moved into technical design. The result
was extensive and apparently precise: data representations, coordinate
conventions, public APIs, system schedules, application states, rendering,
assets, benchmarks, persistence, package ownership, and hundreds of planned
tests.

It looked ready for implementation.

Then the hostile design review tried to read it as one system.

## A detailed design turned out to contain several products

The review did not ask whether each document sounded plausible. It followed
the same user-visible claims across documents and asked whether all of them
could be true simultaneously.

The first blocking contradiction appeared in the definition of matter.

The data model classified a voxel as occupied when it contained sufficient
density and was not air. Water therefore counted as occupied. The movement
contract, meanwhile, said the player capsule could not overlap occupied
voxels. A separate water contract said water was non-solid and the player could
enter it and paddle at the surface.

Each statement made sense in isolation. Together they made swimming
impossible.

This was not a minor naming issue. Different agents could faithfully implement
the storage rule, collision rule, and water rule and still create a broken
composition. The repair was to stop using one overloaded idea of “occupied.”
Material presence, water volume, and solid collision occupancy needed distinct
predicates that every query, collision system, diagnostic, and test used
consistently.

The public-consumer requirement exposed the next contradiction.

The demonstration was required to visualize active bricks, dirty and pinned
state, pending work, streaming rings, chunk boundaries, and raw voxels. It was
also forbidden from reading private world state. But the proposed public API
could only answer questions about a brick the caller already knew to ask for,
while its telemetry exposed aggregate counts. It provided no bounded way to
discover the state the required diagnostics needed to display.

That left implementers with two plausible violations. They could give the demo
privileged access, invalidating its role as an external consumer, or scan the
entire region, invalidating the bounded streaming design. The contract had to
grow a bounded public diagnostic snapshot or a library-owned visualization
interface. Otherwise the product was asking the demo to prove something the
public substrate could not express.

The load protocol revealed the same boundary failure from another direction.
The reusable library would accept a load only while the downstream demo was in
a particular `DemoState`. A library could not enforce or test that contract for
an arbitrary future game whose state machine would be different. The dependency
pointed the wrong way. Loading needed a library-owned suspension transaction,
with explicit request, acknowledgement, legal transitions, completion, and
resume—or it needed to be internally safe without inspecting consumer state.

The review then reached the performance requirements and found a subtler form
of contradiction: precise measurements that did not measure the product’s
promise.

Moria promised that a user’s dig or place action would become visible within
two rendered frames. The proposed acceptance test started its clock only when
an internal fixed-update system eventually drained and stamped the request.
Because a rendered frame could contain no fixed update, and because requests
arriving after a cutoff could move to the next frame, the user could wait an
extra frame while the test still passed.

Nothing about the proposed metric was vague. It was simply attached to the
wrong event. The clock had to begin when the consumer published the action,
because that was when the user began waiting.

Finally, the design claimed a bound on resident graphics memory but proposed to
verify only the buffers and textures requested directly by the application.
Driver and backend overhead were not observable through that ledger. A build
could therefore pass the proposed check while exceeding the original product
target.

The honest response was not to rename the ledger “resident memory.” The design
recorded a divergence: the portable measurement was useful but weaker than the
product claim. Until a suitable platform measurement or explicit product
approval existed, the report had to state that the original target remained
unproven.

Taken separately, these could be presented as five technical findings. Taken
together, they told a more important story.

Moria did not yet have one implementation-ready product contract. It contained
several locally coherent versions of the product: one in storage, another in
movement, another in the demo, another in the library lifecycle, and another
in the benchmark suite. Parallel implementation would not have resolved those
differences. It would have buried them in code.

## The contradictions became gates—and the unknowns stayed visible

The design audit changed what the implementation agents received.

The product boundary became an enforceable package rule. Consumers could
inspect and mutate world truth only through supported public interfaces.
Private storage and derived render state could not become convenient alternate
authorities.

Ambiguous concepts were separated into explicit data and API contracts.
Lifecycle ownership was moved to the layer capable of enforcing it.
User-visible deadlines were measured from user-visible events. Claims that
could not be established on the available machines remained provisional or
became explicit design divergences rather than being rounded up to passes.

The test strategy also changed. It was not enough to show that a validator
function existed or that a synthetic happy path passed. Test specifications
required invalid fixtures to fail through the ordinary repository test
command. If a tree-horizon asset validator was correct but never registered in
the normal test graph, the deliberately bad asset would pass and the gate would
fail its own test. Existence was not acceptance; execution in the real path
was.

Deterministic logic tests advanced controlled simulation ticks instead of
sleeping or assuming one application update equalled one fixed step. The demo
and benchmark programs consumed the substrate through public interfaces.
Headed GPU and performance claims were separated from headless logic tests and
tied to named machines and machine-readable reports. Blocking feasibility
tests ran before broad feature implementation, with the rule that a failure
required reviewed redesign rather than a quieter workload or weakened
threshold.

This did not turn Moria into a universally proven engine. That was never the
honest result.

At the pinned revision, Moria offers strong public evidence that its reusable
substrate boundary is real, its major contracts have been read against one
another, and its composed behavior is exercised through deterministic
public-interface gates. It also retains the limits of that evidence. The
example does not establish production incident recovery, exhaustive mutation
coverage, or behavior across every GPU, driver, and operating system. The
resident-memory product target could not be inferred from the portable
allocation ledger.

The overall result is therefore mixed, and usefully so.

The important outcome was not that assurance assigned Moria a status. It was
that assurance acted while the product was still being defined and built. It
prevented a fast parallel pipeline from confidently implementing several
different products, converted discovered contradictions into executable
boundaries, and kept the claims that could not yet be proved visible.

## Technical appendix

| Assurance area | Result | What the evidence supports |
| --- | --- | --- |
| Product boundary | Supported | The substrate, public validation consumer, and excluded future game systems are distinguished explicitly. |
| Design coherence | Mixed | Blocking contradictions were found and repaired; the resident-memory divergence remained dependent on stronger evidence or approval. |
| Reproducible baseline | Not established by this example | Candidate commands and acceptance paths exist, but this public documentation exercise did not execute and independently repeat the selected demonstrations. |
| Invariant pressure | Supported | Tests exercise composition across terrain, streaming, mutation, collision, persistence, and public interfaces. |
| Verification strength | Mixed | Deliberate failure and ordinary-command registration rules are strong; exhaustive semantic mutation of every invariant is not claimed. |
| Dependencies and platforms | Mixed | Real Bevy/native paths and named platform acceptance are represented; universal hardware and driver coverage is not. |
| Production operations | Unproven | Test and benchmark failure behavior is covered; production incident operation is outside this example. |
| Durable gate | Supported | Composed work must pass deterministic public-interface conformance gates rather than relying on branch-local agent confidence. |
