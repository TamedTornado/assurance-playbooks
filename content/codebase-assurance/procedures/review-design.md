---
schemaVersion: 1
kind: procedure
id: codebase-review-design
title: Check whether the project tells one consistent story
version: 0.1.0
status: draft
summary: Follow important client expectations through the project material and expose incompatible designs, missing contracts, and weaker substitutes.
playbook: codebase-assurance
phase: review-design
purpose: Determine whether the available technical material describes one product that could actually deliver what the client expected.
inputs: [Product expectation worksheet, Project material, Repository interfaces and definitions, Technical contributors]
outputs: [Design consistency review, Plain-language consistency summary]
---
# Check whether the project tells one consistent story

The product expectation worksheet tells us what the client thought they were
getting and what remains opaque. This procedure asks whether the project's own
technical material agrees about how those expectations are delivered.

It does not require perfect documentation. Requirements, design documents,
public interfaces, state definitions, test plans, demonstrations, agent
reports, and implemented package boundaries may each contain part of the
story. The operator reads those sources against one another instead of
reviewing each one in isolation.

The practical question is:

> If two competent engineers followed the available material, could they build
> materially different products while each believing they followed the plan?

The operator does not answer that by documenting the entire architecture.
They choose a concrete behavior behind an important expectation, follow it
through the sources that govern it, and preserve conflicts that could change
what the client actually receives.

## Required output

Use one copy of the [design consistency review](../templates/design-consistency-review.md)
for the engagement.

It contains:

- a plain-language summary for the client;
- one section for each expectation examined;
- the concrete behavior followed for that expectation;
- only the sources needed to understand that behavior;
- conflicts, ambiguities, missing contracts, and deliberate divergences;
- the consequence of each issue;
- its resolution, owner, or unresolved status; and
- expectations deliberately deferred or blocked.

Write an expectation once and keep its behavior traces and conflicts
underneath it. Do not create a glossary for the whole codebase, an exhaustive
requirements matrix, or a separate file for every contradiction.

This review is not the final verdict on the implementation. It establishes
whether the available contract is coherent enough to guide implementation and
verification. Later phases reproduce and challenge the running system.

## Roles

**Operator:** chooses representative behavior, locates the governing sources,
cross-reads them, explains conflicts, proposes the smallest honest
clarification, and preserves unresolved weakness. The operator owns the
technical analysis.

**Client representative:** confirms when a conflict changes the product they
expected or when a proposed substitute is materially weaker. They are not
asked to resolve Rust types, state machines, or measurement design.

**Technical contributor:** explains why a source says what it says and whether
a proposed clarification is implementable. Their preferred interpretation
does not erase another plausible written interpretation.

**Accountable sponsor:** accepts a deliberately weaker product promise, changes
scope, or supplies authority when contributors disagree about intended
behavior.

## Inputs

Start with:

- the confirmed product expectation worksheet;
- the requirements, design, README, diagrams, and architecture records that
  bear on its important expectations;
- public interfaces, schemas, state definitions, package boundaries, and
  configuration contracts visible in the repository;
- test specifications, benchmark plans, and completion evidence;
- relevant agent transcripts or implementation summaries; and
- access to people who can explain disputed sources.

Do not wait for a complete documentation set. If an expectation is governed
only by a conversation, a demo, and implemented interfaces, preserve that
fact. Missing design authority is often part of the result.

## Human procedure

### 1. Choose one expectation and one behavior

Open the product expectation worksheet. Start with an expectation that is
important, disputed, or supported by evidence the client cannot evaluate.

Do not attempt to trace “reusability,” “performance,” or “reliability” in the
abstract. Choose a behavior that should make part of that expectation real.

Examples:

| Expectation | Behavior to follow |
| --- | --- |
| Moria is reusable | An independent game queries the world, requests a mutation, and observes the result through supported interfaces. |
| Voxels live only on the GPU | A voxel is generated, mutated, rendered, saved, and reloaded without creating a competing authoritative CPU copy. |
| Mutation feels immediate | A user action is accepted, processed, meshed, and becomes visible within the promised rendered-frame limit. |
| Billing is safe to retry | The same confirmed charge request is delivered twice while the provider response is delayed. |
| Recovery is dependable | An interrupted operation resumes or rolls back without losing authoritative state. |

Record why this behavior represents the expectation. One expectation may need
several behaviors. Add them under the same expectation rather than duplicating
the expectation.

### 2. Gather only the sources that govern that behavior

For the chosen behavior, locate:

- the preserved client/product source and current public description;
- where the product promise is stated;
- where input enters the system;
- which interface a real consumer uses;
- where authoritative state is defined;
- who owns each transition;
- what output or effect the consumer observes;
- how failure and recovery are described;
- how the promised result is measured; and
- which test or gate should reject an incorrect version.

Stop gathering when new material merely repeats an existing definition. Start
with likely load-bearing sources; do not read every document before forming a
question. Do not begin and end with the current TDD: an internally coherent
technical design can still implement a different product from the preserved
expectation or public description.

Under the expectation, record a short source list:

```markdown
#### Sources consulted

- Product requirement: “The reference game is an external validation
  consumer.”
- Public API: `WorldQuery` and `MutationCommands`.
- Diagnostic requirement: active bricks, dirty state, and streaming rings.
- Test plan: external-consumer conformance suite.
```

Use a path, section, symbol, quotation, or other locator precise enough for
another person to find the same statement.

### 3. Tell the behavior as a sequence

Write the expected path in ordinary language:

```text
Consumer action
→ supported interface
→ authoritative state
→ owned transitions
→ observable result
→ measurement
→ rejecting test
```

Not every behavior uses every step. Keep only the steps that matter.

For each arrow, ask:

- Does the next source use the same meaning?
- Is the owner of the transition clear?
- Can the named consumer actually invoke or observe it?
- Could a private path bypass the stated boundary?
- Does the measurement begin where the client begins waiting?
- Does the proposed test reject the wrong behavior or merely execute the path?

This short narrative is the trace. Do not make a human maintain a giant matrix
unless the system genuinely requires one.

### 4. Compare sources at their joins

Most consequential contradictions occur where one part of the story hands off
to another:

- product promise to technical requirement;
- public interface to internal state;
- storage meaning to movement or business rules;
- reusable package to downstream application;
- user action to scheduling;
- runtime behavior to measurement;
- measurement to acceptance test; or
- failure state to recovery owner.

Read both sides of each join. Ask:

> Could both statements be implemented literally at the same time?

If yes, continue. If no, or if material behavior is left undecided, record the
issue underneath the expectation immediately. Do not hold conflicts in notes
until the end.

### 5. Classify the issue

Use one of four labels. The label matters less than the explanation, but it
helps prevent different problems being waved away as “documentation.”

**Ambiguity**

The available language permits materially different interpretations but does
not explicitly require both.

Example: “visible within two frames” does not say whether the clock begins at
the user's action, command publication, queue drain, or mesh submission.

**Contradiction**

Two sources require states or behaviors that cannot both be true.

Example: water counts as occupied; the player may never overlap an occupied
voxel; the player must enter water and swim.

**Missing contract**

A required behavior has no supported interface, owner, state transition,
measurement, or rejection rule.

Example: the reference game must display all active streaming regions, but the
public interface can inspect only a region the consumer already knows.

**Design divergence**

The proposed design deliberately implements or measures something weaker or
different from the client expectation.

Example: application-requested graphics allocations are measured in place of
total resident graphics memory, even though driver and backend overhead are
outside that ledger.

Do not use “divergence” as a polite label for an accidental contradiction. A
divergence names the original expectation, the substitute, why it is weaker,
and who is authorized to accept it.

An unrecorded change to a load-bearing architecture is also a divergence even
when the replacement design is coherent. Compare the current design with
preserved source expectations and public descriptions; do not assume the
newest technical document automatically has product authority.

An observed mismatch between code and a coherent design may become an
implementation finding in later phases. Record it here only if the implemented
interface or state definition is itself being used as part of the available
contract.

### 6. Write one useful conflict block

Use this format:

```markdown
##### Required diagnostics have no public discovery path

- **Type:** Missing contract.
- **Source A says:** The reference game must display active bricks, dirty
  state, streaming rings, and pending work.
- **Source B says:** A consumer may inspect only a brick whose identity it
  already knows.
- **Why they do not form one story:** The consumer cannot discover the state
  it is required to display through the supported interface.
- **Why the client should care:** A successful demo may rely on private access
  and therefore fail to demonstrate a reusable substrate.
- **Smallest honest clarification:** Add a bounded public diagnostic snapshot
  or make diagnostic rendering a library-owned capability.
- **Status:** Unresolved.
- **Authority needed:** Product and library owner.
```

Quote or cite the actual sources. Explain the incompatible products they
permit. Avoid labels such as “architectural concern” that do not tell the
client what could go wrong.

Do not assign a contradiction ID manually. Keep the issue under the
expectation and behavior it affects. If tooling later needs identifiers, it
can generate them.

When a preserved review record already contains the complete history of a
resolved issue, use a shorter block containing the type, conflict and
consequence, status and resolution, link to the full record, and remaining
implementation test. Do not duplicate history merely to satisfy the template.
Keep the full form for unresolved issues, changed product meaning, and weaker
substitutes.

### 7. Decide who can resolve it

Use the narrowest appropriate authority:

- A typographical or purely local clarification can be corrected by the
  technical owner, with the before-and-after text preserved.
- A conflict about what the product should do requires the client or product
  authority.
- A change to public behavior, supported environment, performance promise, or
  architectural constraint requires accountable approval.
- A weaker substitute must be described in client language and accepted as a
  divergence.
- A conflict nobody can resolve remains unresolved or blocked.

The operator may recommend a clarification. They must not silently choose the
interpretation that best matches the current code.

For each resolution, record:

- the changed source;
- why the new language resolves the conflict;
- who approved it;
- which other sources must change;
- which test or gate should preserve the resolved meaning; and
- whether the client expectation is now supported, narrowed, or still
  unproven.

### 8. Re-read the behavior after resolution

Follow the same sequence again using the revised sources.

Check that:

- one fix did not create a new conflict at the next join;
- all sources now use the same state meaning and owner;
- the public consumer can perform the required behavior;
- measurement establishes the original promise rather than a proxy;
- the test plan can distinguish the promised design from a plausible shortcut;
  and
- deliberately weaker claims remain visibly weaker.

“Resolved” means the written story is coherent enough to implement and test.
It does not mean the running implementation has been proven correct.

### 9. Repeat without pretending to be exhaustive

Return to the expectation worksheet and cover the remaining high-priority
expectations. Under each expectation, state one of:

- reviewed through the named behaviors;
- partially reviewed, with named gaps;
- deferred, with the reason and consequence;
- blocked by missing material or authority; or
- not applicable after a confirmed correction to the expectation.

Do not convert limited coverage into a statement that the whole design is
coherent.

### 10. Write the client summary

Open with what the review actually established:

> We followed the expectations that Moria be reusable, GPU-authoritative, and
> visibly responsive through the requirements, public interfaces, state
> ownership, measurements, and proposed tests. The material does not yet
> describe one implementation-ready product. We found two direct
> contradictions, two missing contracts, and one proposed measurement that is
> weaker than the client expectation.

For each material issue, explain:

- what the client expected;
- which parts of the project disagree or leave it unsupported;
- what failure that could produce;
- whether it was resolved;
- whether the expectation was narrowed; and
- what remains to be tested in the implementation.

Avoid reporting document counts, glossary size, or review activity as value.
The value is visibility into where locally reasonable work could produce the
wrong product.

## Worked Moria review

### Expectation: Moria is a reusable substrate

The client had seen a convincing reference game but could not determine
whether another game could use the same engine boundary.

The operator chose this behavior:

```text
Reference game requests nearby world state
→ public query interface
→ authoritative voxel state
→ public mutation command
→ visible result
→ public diagnostics and conformance tests
```

The requirements said the executable was a validation consumer and could not
read private world state. That appeared consistent with the package direction
and public query and mutation commands.

The diagnostic requirement then demanded active bricks, dirty and pinned
state, pending work, streaming rings, chunk boundaries, and raw voxel views.
The public interface could inspect a brick only when the consumer already knew
its identity. Aggregate telemetry supplied counts but no bounded way to
discover the entities the display needed.

The two sources did not form a complete story. Either the reference game would
reach into private state, invalidating it as an external consumer, or it would
scan an unbounded region, invalidating the streaming design.

The review recorded a missing contract rather than asking an implementer to
pick a convenient shortcut. The smallest honest options were a bounded public
diagnostic snapshot or a library-owned visualization capability.

The load protocol exposed a second conflict. The reusable library would accept
a load only while the reference game was in a particular `DemoState`. A future
game would own a different state machine, so the library could neither enforce
nor test that condition for its claimed consumers.

The resolution moved suspension ownership into the library: request,
acknowledgement, legal transition, completion, and resume became a
library-owned transaction. The downstream game could coordinate with that
transaction without becoming part of the reusable library's contract.

### Expectation: the world behaves consistently

The operator followed a player moving from land into water.

The storage definition treated a voxel as occupied when it had sufficient
density and was not air. Water therefore counted as occupied. The movement
contract prohibited the player capsule from overlapping occupied voxels. The
water contract required the player to enter water and paddle at its surface.

All three statements were plausible alone. They could not all be implemented
literally.

The review classified this as a contradiction and separated three concepts:
material presence, water volume, and solid collision occupancy. Queries,
movement, diagnostics, and tests then had to use the appropriate predicate
instead of an overloaded idea of “occupied.”

### Expectation: mutations are visibly responsive

The product material promised that digging or placing material would become
visible within a small number of rendered frames.

The proposed test began timing only when an internal fixed-update system
drained and stamped the request. A rendered frame could occur before that
drain. The user could therefore wait an extra frame while the test still
passed.

The review classified the start event as ambiguous in the promise and
incorrectly narrowed in the test plan. The clarification started the clock
when the consumer published the action, because that is when the user begins
waiting.

### Expectation: the resource design supports the promised scale

The product carried a bound on resident graphics memory. The proposed
measurement counted buffers and textures requested by the application.

That ledger was useful, but it could not observe driver and backend overhead.
A successful report could therefore coexist with resident use above the
original target.

The review did not rename the partial metric “resident memory.” It recorded a
design divergence: application-accounted allocation was a portable but weaker
substitute. The original claim remained unproven until an appropriate platform
measurement or an explicit narrowing of the promise existed.

### Plain-language result

The client did not receive “the design is complicated.” They received:

> The project material contained several individually reasonable descriptions
> of Moria that did not yet describe one buildable product. A polished
> reference game could have used private diagnostics, the reusable library
> depended on demo-owned state, swimming conflicted with the storage definition,
> the latency test could pass after a longer user wait, and the memory metric
> could not establish the stated resource claim. These issues were converted
> into explicit contract changes, gates, or visible unproven claims before
> parallel implementation buried them in code.

## Copyable agent prompt

> Using the confirmed product expectation worksheet and supplied project
> material, draft one design consistency review. Work expectation by
> expectation. For each important expectation, choose one or more concrete
> consumer or operator behaviors that should make it real. Locate the preserved
> source expectation, current public description, and only the sources
> governing input, public interface, authoritative state, transition ownership,
> observable result, failure, measurement, and rejecting test.
>
> Tell each behavior as a short sequence. Compare the sources at their joins.
> Record every material ambiguity, contradiction, missing contract, or
> deliberate divergence underneath the expectation it affects. Quote or cite
> both sides, explain why they permit incompatible products or leave behavior
> undefined, describe why the client should care, and propose the smallest
> honest clarification. Do not infer product intent from current code, silently
> pick a preferred interpretation, or call a weaker substitute equivalent to
> the original expectation.
>
> Preserve unresolved disagreement and missing authority. Do not create an
> exhaustive glossary, traceability matrix, or manual IDs. End with a
> plain-language summary of what is consistent, what conflicts, what was
> narrowed, what remains unproven, and what the implementation phases must
> still test. Treat generated analysis as a draft for operator review, not as
> evidence that the design is coherent. Treat a coherent but unapproved change
> to a load-bearing architecture as a divergence rather than allowing the
> newest document to redefine the product silently.

## Preserve as evidence

Keep:

- the expectation worksheet revision used;
- exact source text or precise locators;
- the behavior sequence followed;
- original conflicting or missing definitions;
- operator explanations and proposed clarifications;
- rejected interpretations;
- before-and-after contract text;
- approval for product changes and weaker substitutes;
- unresolved and blocked issues; and
- the final plain-language consistency summary.

Do not edit an earlier conflict out of history merely because it was resolved.
The repair and the reason for it are part of the assurance evidence.

## Stop and escalate

Stop or mark the affected expectation blocked when:

- the sources describe incompatible products and nobody has product authority;
- a required public behavior has no interface or owner;
- the original promise cannot be measured and a weaker substitute has not been
  accepted;
- resolving the issue would add functionality outside the confirmed
  expectation;
- the current implementation is being used to rewrite what the client was
  promised;
- a material source cannot be obtained;
- specialist domain authority is required; or
- the requested breadth would reduce the review to an undocumented sample.

Continue with unaffected expectations when useful. Do not turn one blocked
area into a blanket stop, and do not turn progress elsewhere into evidence for
the blocked area.

## Review test

Give the review to a technical reader who did not perform it. For each
high-priority expectation they should be able to:

1. find the exact sources consulted;
2. follow the chosen behavior in ordinary language;
3. reproduce why each recorded conflict permits incompatible products or
   leaves important behavior undefined;
4. see who resolved or accepted it;
5. distinguish the original expectation from a weaker substitute; and
6. identify what still requires implementation evidence.

Give the plain-language summary to the client. They should understand what
parts of the project tell conflicting stories, why that matters to what they
commissioned, what changed, and what remains unknown.

The procedure is complete when high-priority expectations have representative
behavior coverage or an explicit deferred or blocked status, every material
conflict found has a preserved disposition, and the next phases have concrete
implementation questions to reproduce and challenge. It does not require a
claim that no alternative interpretation could ever be invented.
