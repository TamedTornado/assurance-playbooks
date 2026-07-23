# Codebase Assurance field guide

This is the working guide for an operator examining a consequential product.
It is intentionally usable without Tamed Tornado and without the technical
control vocabulary elsewhere in this repository.

The method is not a repository checklist. Each phase resolves a decision and
produces evidence for the next one. If the evidence says the product claim is
false, preserve that result. The purpose is not to shepherd every row toward
green.

## Start with the client's account, not the repository

Before opening the code, name:

- the trigger or concern that made assurance necessary;
- what the client believed they commissioned;
- what they believe has been delivered;
- what they have observed and what remains opaque;
- important quality, architectural, and prohibited-shortcut expectations;
- what they plan to do with the product next;
- the person authorized to act on the eventual result;
- the users, money, data, safety, or authority exposed if the claim is false;
- the exact repositories, revisions, services, environments, and workloads in
  scope;
- what is deliberately outside scope;
- the people and access required;
- an operator who is independent of the selected intervention; and
- the evidence, reject conditions, completion rule, and escalation path.

Record these in the shared [acceptance
criteria](../shared/acceptance-criteria.md). The client need not arrive with a
formal decision or technical claim. “Agents built this in a language I cannot
read, and I do not know what to trust” is a sufficient starting point.

## Phase 1: Understand what was supposed to be built

Executable procedure: [Reconstruct the expected
product](procedures/understand-expected-product.md).

**Question:** What did the client reasonably expect, and what remains opaque
to them?

Begin with the client's account in ordinary language:

- What did they ask to have built?
- What were they told was complete?
- What have they personally seen working?
- What performance, scale, reliability, architecture, or forbidden shortcuts
  mattered?
- What can they not independently verify?
- What do they expect to do with it next?

Compare that account with requirements, designs, demonstrations, reports, and
technical accounts without silently forcing them to agree. Confirm a
plain-language product expectation brief with the client. Then, as operator
work, translate consequential expectations into technical questions, evidence
needs, and false-success paths.

**Evidence to keep:** client account, expectation sources, demonstrations,
product material, conflicts, confirmed expectation brief, technical questions,
false-success paths, coverage statement, and investigation plan.

**Move on when:** the client confirms that the expectation brief faithfully
describes what they expected and could not verify, and an independent reviewer
can trace the planned technical investigation back to it.

**Ways to fool yourself:** deriving importance from whichever tests already
exist; treating the implementation as the source of intent; asking the client
to design the investigation; treating a polished demo as the product contract.

For Moria, the client could see an attractive editable world but could not read
the Rust. The expectation brief connected “reusable,” “only the voxels on the
GPU,” and “super performant” to the reasons those promises mattered. The
operator then translated them into investigations of public-consumer access,
state authority, memory scaling, workload, and user-visible latency.

## Phase 2: Check whether the project tells one consistent story

Executable procedure: [Follow expectations through the project
material](procedures/review-design.md).

**Question:** Could two competent implementers follow the available material
and build materially different products?

Open the product expectation worksheet. For each high-priority expectation,
choose a representative consumer or operator behavior. Follow it through only
the requirements, design, public interfaces, state definitions, measurements,
and tests that govern it. Compare sources where one part of the behavior hands
off to another.

Look for:

- the same term having incompatible meanings;
- a reusable component depending on a downstream application;
- required behavior no public interface can express;
- lifecycle or error states with no owner;
- a deadline measured from an internal event rather than the user event;
- a target replaced by a cheaper metric that cannot prove it;
- excluded functionality reappearing as placeholder types or hidden paths; and
- a test plan unable to distinguish the promised result from a plausible
  shortcut.

**Evidence to keep:** expectation and behavior followed, precise source
locators, conflicts and missing contracts, before-and-after resolutions,
explicit design divergences, approval state, and the client summary.

**Move on when:** high-priority expectations have representative behavior
coverage or an explicit deferred or blocked status, and every material conflict
found has a preserved disposition.

**Ways to fool yourself:** rewarding document volume; calling ambiguity
“implementation detail”; silently choosing the interpretation that matches the
current code; weakening the original expectation without recording that the
evidence will support less.

The Moria audit found water that was simultaneously occupied and non-solid,
required diagnostics without a usable public API, and a library load protocol
that depended on a demo state. Each statement was plausible alone.

Technical reference: [Resolve design
contradictions](controls/design-coherence.md).

## Phase 3: Get the real product running

Executable procedure: [Get the real product running and preserve what
happens](procedures/reproduce-path.md).

**Decision:** Can someone who was not the original developer make the important
promised behavior happen again from a known version?

Choose two to five demonstrations from the expectation worksheet: something
the client was shown, a real consumer must be able to do, or a quality claim
that would change the client's decision. For each, state what a successful run
would and would not establish.

Pin the target and follow the route the project gives a newcomer. Preserve the
first attempt before fixing anything. Classify every proposed repair as an
environment repair, instruction repair, or product change. A product change is
a finding, not baseline setup.

After permitted repairs, write the exact successful route and ask a second
operator or genuinely clean environment to repeat it without oral history.

**Evidence to keep:** pinned target, first attempt, repair classification,
repeatable route, raw receipts, independent attempt, and the boundary of the
conclusion.

**Move on when:** each selected demonstration is reproduced, failed, blocked,
observed once, or explicitly supported only by a substitute, and every result
has a stated decision consequence.

**Ways to fool yourself:** choosing subsystem commands instead of visible
behavior; treating a developer-only file as newcomer instructions; changing
the product to obtain a green baseline; substituting a mock without naming the
behavior it removes; rerunning in the same warmed environment and calling that
independent reproduction.

## Phase 4: Find the cheaper implementation

Executable procedure: [Discover invariants and design
counterexamples](procedures/design-counterexamples.md).

**Decision:** Can the current evidence reject a plausible system in which the
important claim is false?

Map each claim to the test or operational check expected to reject a violation.
Then create safe counterexamples:

- reverse or omit an important state transition;
- duplicate a request or replay stale data;
- weaken authorization or ownership;
- mutate a leaf behavior while leaving unrelated behavior intact;
- replace a real boundary with an inert mock;
- skip or narrow test discovery;
- corrupt, truncate, relocate, or mismatch an artifact;
- introduce partial failure, timeout, restart, or concurrency; or
- deliberately register a bad fixture and run the ordinary command.

Do not merely inspect the test implementation. Execute the counterexample
through the same route that accepts real work.

**Evidence to keep:** exact mutation or fixture, target identity, expected
rejection, observed result, raw receipts, and the claim affected.

**Move on when:** every high-risk claim has survived at least one credible
falsification attempt, failed with a finding, or remains explicitly unproven.

**Ways to fool yourself:** counting coverage; accepting a helper test nobody
runs; changing both implementation and expected output; using a mutation too
absurd to represent a real failure.

## Phase 5: Exercise composition and dependency reality

Executable procedure: [Exercise composition and dependency
reality](procedures/exercise-composition.md).

**Decision:** Do locally correct parts preserve the claim when composed with
real dependencies?

Follow the selected path across stores, queues, services, generated code,
native libraries, model APIs, build artifacts, caches, and external providers.
Exercise version skew, duplicate delivery, timeout, partial availability,
corruption, relocation, restart, and recovery where relevant.

Compare test substitutes with the behavior the real dependency owns. Use
production-like interfaces where the protocol itself matters.

**Evidence to keep:** dependency and data-flow map, composed execution receipts,
failure-direction notes, and artifact provenance.

**Move on when:** material dependencies either support the claim under the
observed conditions, contradict it, fail closed with a known consequence, or
remain bounded as unproven.

**Ways to fool yourself:** treating a unit test as a global invariant; calling
a loud exception safe after business state has diverged; treating extra
failures and stale success as equally bad.

## Phase 6: Make operations part of the claim

Executable procedure: [Exercise operational failure and
recovery](procedures/exercise-operations.md).

**Decision:** Can the organization detect, contain, and recover from the
selected failure?

Exercise startup with missing or malformed dependencies, interruption during
work, resource exhaustion, delayed responses, partial writes, rollback, and
recovery. Observe the system through the logs, metrics, traces, controls, and
business records a real operator has.

**Evidence to keep:** failure matrix, operator timeline, affected business
state, recovery or rollback receipts, and unresolved exposure.

**Move on when:** the failure is demonstrably visible, contained, and
recoverable—or the missing operational capability is an explicit finding.

**Ways to fool yourself:** equating “an exception was logged” with
observability; inferring recovery from code inspection; testing a reset that
destroys the state whose recovery mattered.

## Phase 7: Install a gate that changes acceptance

Executable procedure: [Select, install, and prove the product
gate](procedures/install-gate.md).

**Decision:** Which observed failure is valuable enough to become permanently
rejectable?

Choose one material high-risk path. Before implementing the gate, agree:

- the preserved bad fixture;
- a valid-success fixture;
- the exact before behavior;
- the reject and accept conditions;
- who owns the gate and who may change or bypass it;
- how the comparison remains like-for-like; and
- rollback.

Implement the smallest durable boundary: an integration test, invariant
checker, replay harness, artifact validator, deployment check, or operational
sentinel.

**Evidence to keep:** [intervention record](../shared/intervention.md), reviewed
change, before-and-after receipts, bypass attempts, valid-path proof, and
rollback.

**Move on when:** the same bad result passes before and fails after for the
intended reason; valid behavior still passes; the producer cannot silently
approve an exception.

**Ways to fool yourself:** rewriting the fixture after the change; fixing only
the demo path; adding a test stage without changing what evidence it controls.

## Phase 8: Make the decision honestly

Executable procedure: [Make the bounded product
decision](procedures/make-decision.md).

Apply the pre-agreed completion rule to every claim. Summarize:

- what is supported and by which evidence;
- what is contradicted;
- what is blocked and what would unblock it;
- what is excluded or not applicable and why;
- what remains unproven;
- what the installed gate rejects;
- what the gate does not cover; and
- who owns the residual risk.

The independent operator and decision owner sign separately using the
[assurance sign-off](../shared/sign-off.md).

A complete record may contain failures. Do not average statuses into a score or
translate “the agreed work is finished” into “the whole system is safe.”

## Practitioner references

- [Procedure coverage map](procedures/)
- [Technical controls and order](index.md)
- [Moria worked example](examples/moria.md)
- [Evidence record](../shared/evidence-record.md)
- [Finding record](../shared/finding.md)
- [Blocked-finding record](../shared/blocked-finding.md)
- [Worked acceptance outcomes](../shared/acceptance-examples.md)
