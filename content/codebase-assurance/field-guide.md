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

## Phase 4: Ask what convincing wrong version might still pass

Executable procedure: [Challenge the existing
evidence](procedures/design-counterexamples.md).

**Decision:** Can the ordinary acceptance route reject a plausible shortcut
that preserves the visible result while violating the client expectation?

Choose one to three consequential expectations. Name the ordinary route that
currently gives the team confidence. Describe the easiest convincing wrong
version, predict the intended rejection, then execute a controlled semantic
fixture or mutation through that same route.

**Evidence to keep:** target, exact wrong version, prediction, ordinary route,
raw result, valid-path result, and restoration.

**Move on when:** each selected expectation has survived a meaningful
challenge, produced a finding, or remains explicitly unproven.

**Ways to fool yourself:** counting coverage; accepting an unregistered helper;
using an absurd mutation; treating any red output as the intended rejection;
changing the expectation beside the implementation.

## Phase 5: Follow the promise across real boundaries

Executable procedure: [Exercise real
boundaries](procedures/exercise-composition.md).

**Decision:** Does the expectation survive the material handoffs between the
caller and visible result?

Draw one line from person or caller to visible result. Keep only boundaries
that own material identity, state, ordering, authority, or dependency behavior.
Exercise the most realistic stale, duplicate, delayed, mismatched, partial, or
unavailable case through the closest safe real interface.

**Evidence to keep:** both sides of the handoff, identities, state and ordering,
raw result, failure direction, substitute limits, and repeated valid route.

**Move on when:** every material boundary on the selected route is exercised,
supported only by a narrower named result, or retained as unproven.

**Ways to fool yourself:** inventorying dependencies instead of following the
promise; treating a unit test as composed evidence; using a mock that removes
the relevant behavior; calling a loud error safe after state diverged.

## Phase 6: See what the real operator sees

Executable procedure: [Exercise failure and
recovery](procedures/exercise-operations.md).

**Decision:** Can the actual responsible person notice, contain, and recover
the selected failure while preserving consequential product state?

Write the expected operator story before the exercise: first signal, location,
protected state, action, recovery, and proof of health. Then record the actual
timeline through the interfaces that person really has.

**Evidence to keep:** failure identity, operator-visible signals, state before
and after, actions, recovery or rollback target, and repeated baseline receipt.

**Move on when:** the selected failure has a bounded operator story, a material
finding, or an explicit statement that operation is outside the evidence.

**Ways to fool yourself:** inventing an operations team; equating a log line
with useful visibility; using private diagnostics as operator evidence;
checking process health instead of product state.

## Phase 7: Make one important wrong result permanently rejectable

Executable procedure: [Install and prove the
gate](procedures/install-gate.md).

**Decision:** Which observed false success should the product refuse to accept
in the future?

Choose a demonstrated weakness with consequence, leverage, a safe fixture, and
a durable owner. Freeze the bad and valid fixtures, route, target, predicted
reason, and rollback. Show the weakness before implementation. Install the
smallest authoritative gate, repeat the identical comparison, rerun the
baseline, and try realistic bypasses.

**Evidence to keep:** [intervention record](../shared/intervention.md), frozen
comparison, before and after receipts, valid-path and baseline proof, bypass
attempts, owner, exception authority, and rollback.

**Move on when:** the same wrong result escapes before and is rejected
afterward for the intended reason, valid behavior remains, and the real
acceptance route cannot silently omit the gate.

**Ways to fool yourself:** choosing an easy but irrelevant check; rewriting the
fixture; accepting an unrelated failure; installing an optional command;
leaving the producer as sole exception authority.

## Phase 8: Tell the client what the evidence permits

Executable procedure: [Make the bounded
decision](procedures/make-decision.md).

Return to the client's original decision. Give every expectation an independent
supported, failed, blocked, unproven, or not-applicable result with its evidence
and decision consequence. Then state proceed, proceed with conditions, do not
proceed, or defer in the client's language.

Name the gate's exact authority, conditions and their owners, review triggers,
residual risk, and the evidence that would change each important non-pass.
The independent operator and decision owner sign separately using the
[assurance sign-off](../shared/sign-off.md).

A complete engagement may support a decision not to proceed. No score and no
unrelated pass can erase that result.

## Practitioner references

- [Procedure coverage map](procedures/)
- [Technical controls and order](index.md)
- [Moria worked example](examples/moria.md)
- [Evidence record](../shared/evidence-record.md)
- [Finding record](../shared/finding.md)
- [Blocked-finding record](../shared/blocked-finding.md)
- [Worked acceptance outcomes](../shared/acceptance-examples.md)
