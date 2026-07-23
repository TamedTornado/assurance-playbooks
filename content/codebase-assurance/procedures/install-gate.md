---
schemaVersion: 1
kind: procedure
id: codebase-install-gate
title: Make one important wrong result permanently rejectable
version: 0.1.0
status: draft
summary: Turn one observed assurance weakness into a durable boundary proven with the same bad and valid examples before and after.
playbook: codebase-assurance
phase: install-gate
purpose: Leave the client with one acceptance boundary that demonstrably refuses an important wrong result.
inputs: [Assurance investigation, Material findings, Baseline record, Client decision priorities]
outputs: [Gate selection, Intervention record, Before and after proof]
---
# Make one important wrong result permanently rejectable

The investigation will usually find more than can or should be changed at once.
This phase asks:

> Which wrong result do we refuse to accept again?

The engagement installs or materially hardens one gate. A gate is not merely a
test file, validator, dashboard, or policy. It is a boundary in the ordinary
delivery or operating route that has authority to reject an unacceptable
result.

Examples include:

- a consumer conformance test in the normal repository command;
- an artifact identity check that blocks stale output;
- a semantic fixture validator that fails the build;
- a deployment condition tied to independent evidence;
- an invariant check at a real state boundary; or
- an operational sentinel that prevents unsafe success.

Use the shared [intervention record](../../shared/intervention.md) for the final
before-and-after proof. The consultant may draft it; the gate owner and
independent reviewer own their decisions.

## Inputs

Bring the assurance investigation, material findings, preserved challenge
fixtures, baseline record, implementation constraints, candidate owners, and
the client's decision priorities.

## Human procedure

### 1. Ask which observed weakness deserves permanence

Review only challenges that produced meaningful evidence. Ask:

- If this wrong result returned next month, which one would matter most?
- Which boundary sees the result before it becomes consequential?
- Can that boundary actually refuse it?
- Will the same gate protect future changes, or only today's example?
- Can we demonstrate the weakness and the improvement safely?
- Who can own the gate after the engagement?

Choose based on consequence and leverage, not dramatic wording. A severe
finding with no safe reproducible fixture may remain a priority finding while a
different, well-evidenced boundary becomes the installed gate.

State why this gate was selected and why other material findings were not.

### 2. Write one plain refusal rule

Complete this sentence:

> The product must refuse to accept __________ when __________.

Then state:

- the client expectation protected;
- where the refusal occurs;
- what the user or team sees;
- what valid result must continue to pass; and
- who may approve an exception.

If the rule needs several paragraphs of implementation detail, it is not yet a
clear acceptance rule.

### 3. Freeze the comparison

Before implementation, preserve:

- one bad fixture or controlled wrong result;
- one valid fixture;
- the pinned target;
- the ordinary command or route;
- the expected rejection and intended reason;
- the observer;
- the relevant environment; and
- the rollback target.

These remain fixed through the comparison. If any must change, explain why the
before and after remain comparable or collect a new baseline.

### 4. Show the weakness before changing it

Run the bad fixture through the existing ordinary route. It must pass, escape,
or fail to be noticed in the precise way the proposed gate is meant to change.
Also run the valid fixture.

If the bad fixture is already rejected for the intended reason, this is not the
right intervention. The gap may be elsewhere: the gate may be bypassable,
unregistered, unauthoritative, or absent from the route used for real work.

Do not accept an unrelated crash, syntax error, or test failure as before
evidence.

### 5. Put the gate at the boundary with authority

Implement the smallest durable change that can prevent acceptance:

- use the ordinary route, not an optional specialist command;
- make the rejecting rule independently inspectable;
- keep the fixture outside the producer's ability to rewrite silently;
- give failure a clear reason;
- preserve a documented exception path when exceptions are legitimate; and
- assign an owner who can maintain the gate.

The implementation may be small. The value comes from choosing the right
boundary and proving that it governs acceptance.

### 6. Repeat the exact comparison

Against the changed target:

1. run the same bad fixture through the same material route;
2. confirm rejection for the predicted reason;
3. run the same valid fixture;
4. repeat the relevant baseline demonstration; and
5. preserve the complete before-and-after receipts.

If valid behavior fails, the gate is not complete. If the bad fixture fails for
a different reason, the intended rule remains unproved.

### 7. Try to bypass the gate

Attempt the realistic evasions exposed by the investigation:

- omit the optional test or job;
- call the underlying producer directly;
- reuse old evidence or a stale artifact;
- change an expected file beside the implementation;
- disable the check;
- request an exception;
- alter only metadata or naming; or
- let the producer approve its own result.

Record who has authority to change, bypass, or waive the gate. A technically
correct check controlled entirely by the producer may still be weak assurance.

### 8. Prove rollback and hand over ownership

Record:

- how to remove or revert the gate safely;
- the known-good target;
- whether rollback was actually exercised;
- what evidence becomes stale after rollback;
- the owner and review trigger; and
- the claims the gate does not cover.

The gate is an earned narrow boundary, not a general certificate for the
product.

## A Moria-shaped example

Suppose the investigation shows that an external-consumer conformance fixture
exists but can be skipped by the ordinary repository command. The wrong result
is a demo that uses privileged internals while the public crate cannot perform
the same operation.

The refusal rule could be:

> The repository must refuse a change when the representative external
> consumer cannot compile and perform its supported observation and edit
> through the public facade.

Before the change, preserve a fixture that violates the facade and show that
the ordinary command misses it. Install the conformance case in the ordinary
test graph. Afterward, the identical violation must be rejected for private
access or missing public capability, while the valid consumer and baseline
demo still pass. Then try to bypass it with a workspace-only privilege, an
unregistered test target, and a stale generated fixture.

That gate would strengthen the reusable-substrate claim. It would not prove the
GPU-resident claim; the final decision must keep that separate.

## Copyable agent prompt

> Using the assurance investigation, recommend one observed wrong result that
> should become permanently rejectable. Compare candidates by client
> consequence, location of an authoritative boundary, leverage across future
> changes, safe reproducibility, and durable ownership. Draft one plain refusal
> rule and explain the selection. Before implementation, freeze the bad fixture,
> valid fixture, target, ordinary route, predicted reason, observer,
> environment, and rollback target. Require a before run showing the exact
> weakness. Then propose the smallest gate at a boundary that can actually
> refuse acceptance. After authorization and implementation, repeat the
> identical bad and valid fixtures, repeat the relevant baseline demonstration,
> attempt realistic bypasses, and draft the intervention record. Do not rewrite
> the fixture or acceptance rule after seeing the result, and do not claim
> broader authority than the gate earned.

## Required output

A completed [intervention record](../../shared/intervention.md) containing the
selection rationale, frozen comparison, before evidence, implemented boundary,
after evidence, valid-path result, bypass attempts, ownership, rollback, and
residual limits.

## Preserve as evidence

Preserve candidate selection, refusal rule, unchanged bad and valid fixtures,
before and after targets, ordinary-route receipts, baseline rerun, bypass
attempts, reviewed change, owner approval, and rollback proof.

## Stop and escalate

Stop when no candidate has a safe reproducible fixture, the change would expand
the agreed product scope, the gate has no durable owner, the comparison cannot
remain like-for-like, or the implementer would be the sole authority approving
the evidence.

## Review test

The identical meaningful wrong result escapes before and is rejected afterward
for the intended reason. The valid result and baseline behavior still work.
The gate sits in the real acceptance route, realistic bypasses were attempted,
and its owner and limits are explicit.
