---
schemaVersion: 1
kind: procedure
id: agentic-contract-work
title: Preserve intent and contract representative agent work
version: 0.1.0
status: draft
summary: Preserve source intent across derived artifacts and make representative agent work independently rejectable before execution.
playbook: agentic-delivery-assurance
phase: contract-work
purpose: Prevent an internally coherent downstream contract from silently replacing the product or engineering outcome agents were asked to deliver.
inputs: [Original requests and governing sources, Public commitments, Real task history, Intended authority, Known failures, Engineering owner]
outputs: [Intent lineage worksheet, Representative task contracts, Divergence and escalation record]
---
# Preserve intent and contract representative agent work

An agent pipeline can produce a good implementation of the wrong product.

This happens when an original request is converted into an interview record,
design, TDD, issue decomposition, task prompt, tests, and completion summary.
Each derived artifact may be internally coherent while a load-bearing
expectation disappears or changes along the way.

The first job is therefore not merely to make the latest task precise. It is to
preserve the source intent and prove that every derived contract still serves
it—or makes any change visible to the person authorized to accept it.

The Moria dogfood case demonstrates the failure:

- the preserved source and public description required a GPU-resident
  substrate;
- the later TDD coherently specified CPU-authoritative generation, mutation,
  collision, and meshing;
- subsequent implementation could satisfy that TDD while delivering a
  different architecture; and
- the architecture change was not recorded among the design divergences.

No amount of faithful task execution repairs an unapproved change that entered
before task decomposition.

## Inputs

Start with:

- the original client or engineering request;
- preserved interviews, source specifications, architecture constraints, and
  negative requirements;
- current public or organizational commitments;
- every derived artifact that agents treat as authority;
- representative completed, failed, ambiguous, overlapping, dependent, and
  recovery tasks;
- known incidents and reward hacks;
- intended agent authority; and
- the human authorized to approve changed product meaning.

Do not begin only from the newest TDD or issue tracker. The newest document may
be the artifact whose fidelity needs testing.

## Human procedure

### 1. Preserve the governing sources

Use one [intent lineage
worksheet](../templates/intent-lineage-worksheet.md) for the representative
work.

Record the original request and every source whose meaning downstream work is
not allowed to change silently:

- client or product expectation;
- architectural constraint and the reason it matters;
- prohibited shortcut;
- performance or operating promise;
- public description;
- safety, data, or authority boundary; and
- explicit non-goal.

Use exact quotations or stable source locators where possible. Do not rewrite
the source into cleaner technical language before preserving it.

### 2. List the derivation chain

Write the actual sequence through which intent becomes agent work:

```text
Original request
→ interview or requirements
→ architecture or design
→ TDD and acceptance plan
→ issue decomposition
→ task prompt and retrieved context
→ implementation and producer-written tests
→ verifier and completion summary
```

Real pipelines may omit or add stages. Record the artifacts and identities
that actually exist.

### 3. Compare every handoff with its parent

At each arrow, ask:

- Which source expectations are carried forward?
- Which are narrowed, strengthened, replaced, or omitted?
- Did an architectural suggestion become an unchangeable requirement?
- Did a load-bearing requirement become “implementation detail”?
- Did a proxy measurement replace the promised outcome?
- Did a future idea become current scope?
- Did the derived artifact add a shortcut the source prohibited?
- Can a reviewer trace the change to an authorized decision?

An internally coherent child does not pass this check merely because its own
sections agree.

Under **Derived artifacts and changes**, record each material change as:

```markdown
### [Derived artifact]

- **Derived from:**
- **What it preserves:**
- **What it changes or omits:**
- **Why the change was introduced:**
- **Authority required:**
- **Approval or unresolved status:**
- **Downstream artifacts affected:**
```

Do not assign manual IDs. Preserve links or revision identities so tooling can
generate relationships later if needed.

### 4. Separate approved clarifications from unapproved changes

An approved clarification makes ambiguous source intent more precise without
quietly weakening it.

A divergence changes the promised outcome, architecture, operating envelope,
or negative constraint. It must name:

- the original intent;
- the proposed substitute;
- why the substitute is different or weaker;
- the consequences;
- who may accept it; and
- which downstream artifacts must be invalidated or regenerated.

If no approval is visible, place it under **Unapproved changes**. Do not infer
approval from the age, completeness, or implementation status of the derived
artifact.

### 5. Select representative tasks

Choose a small set that exercises the real pipeline:

- routine work;
- genuinely ambiguous work;
- a high-consequence change;
- overlapping parallel work;
- a dependency or integration task;
- recovery after interruption or failure; and
- a task derived several stages away from original intent.

The last category is mandatory. It tests whether the pipeline can remain
faithful through decomposition rather than only whether one prompt is clear.

Explain why each task represents an important part of the authority being
assessed. Do not choose only tasks with unusually complete specifications.

### 6. Write each task contract underneath its lineage

For each task, record:

- original task wording;
- governing source expectations;
- target repository and base revision;
- intended observable result;
- positive requirements;
- negative constraints and prohibited shortcuts;
- allowed implementation freedom;
- evidence required from independent observation;
- reject conditions;
- ambiguity that requires human escalation; and
- the identity of the derived artifact or approval it relies upon.

Separate outcome from implementation suggestions, but do not discard a
load-bearing architecture merely because it sounds like an implementation
choice. The source and its reason determine whether it is negotiable.

### 7. Give the reviewer both source and derived contract

A reviewer who receives only the normalized task can verify it perfectly while
missing that normalization already changed the product.

For representative work, the independent reviewer must receive:

- the original source or faithful preserved excerpt;
- current public commitments when relevant;
- the derivation and divergence record;
- the task contract;
- implementation and evidence; and
- unresolved questions.

Ask the reviewer:

> Could this task and its tests pass while the original source expectation is
> false?

If yes, the task contract is not ready.

### 8. Test an intent-substitution fixture

Create a contained fixture in which:

1. the source requires a load-bearing property;
2. a derived design replaces it with a coherent alternative;
3. downstream tasks and tests faithfully implement the alternative; and
4. the completion summary is persuasive.

The pipeline should reject or escalate the changed intent even though the
implementation matches the derived contract.

The Moria GPU-to-CPU authority change is the shape of this fixture. Use a safe
synthetic or preserved case rather than altering a live product merely to
exercise the gate.

### 9. Confirm agent-visible context

Determine which governing source, excerpt, digest, or lineage record each agent
and verifier receives. The context does not need to contain every historical
document, but it must preserve load-bearing intent and provide a visible path
to authority when derived sources disagree.

Missing or truncated source intent must cause an explicit limitation or
escalation. It must not make the newest retrieved document silently win.

### 10. Confirm accept and reject conditions

Before execution, a reviewer who did not author the implementation should be
able to reject:

- a persuasive but incomplete result;
- a result that satisfies producer-written tests only;
- a result aimed at the wrong revision or boundary;
- a result using a prohibited shortcut;
- a result that matches an internally coherent derived artifact while
  violating preserved source intent; and
- a result relying on an unapproved divergence.

If the reviewer must invent a requirement after seeing the implementation,
the contract was not ready.

## Copyable agent prompt

> Build one intent lineage worksheet for the supplied representative agent
> work. Preserve exact original requests, architectural constraints, negative
> requirements, public commitments, and the reasons they matter. List the real
> derived artifacts from source through requirements, design, TDD, issue,
> prompt, tests, verifier, and completion summary.
>
> At every handoff, compare child with parent. Record what is preserved,
> narrowed, strengthened, replaced, or omitted. Treat a coherent change to a
> load-bearing outcome or architecture as a divergence requiring authority; do
> not assume the newest or most detailed artifact automatically governs.
> Separate approved clarifications from unapproved changes and name every
> downstream artifact affected by a change.
>
> Select representative routine, ambiguous, high-risk, parallel, dependent,
> recovery, and deeply derived tasks. For each, draft an independently
> rejectable contract containing governing source intent, target identity,
> observable outcome, positive requirements, negative constraints, prohibited
> shortcuts, allowed freedom, independent evidence, reject conditions, and
> escalation questions. Design one safe intent-substitution fixture in which
> downstream work faithfully implements a coherent but unauthorized derived
> contract. Do not derive acceptance solely from producer-written tests or
> producer-selected context. Mark missing source, authority, and approval for
> human resolution.

## Required output

One intent lineage worksheet containing:

- governing sources and public commitments;
- derived artifacts and material changes;
- approved clarifications and unapproved divergences;
- representative task contracts;
- the intent-substitution fixture;
- reviewer-visible source and context;
- accept, reject, and escalation conditions; and
- affected downstream artifacts.

## Preserve as evidence

Keep:

- original source identities and exact material wording;
- every derived artifact revision;
- comparisons at each handoff;
- approval and rejected interpretations;
- original and normalized task text;
- agent-visible and reviewer-visible context identities;
- the intent-substitution fixture and result;
- resulting implementation and evidence; and
- artifacts invalidated or regenerated after a corrected divergence.

## Stop and escalate

Stop or block affected work when:

- governing source intent cannot be recovered;
- public and internal commitments conflict without authority;
- a derived artifact changes load-bearing intent without approval;
- the latest contract is being treated as authority merely because work has
  already implemented it;
- a reviewer cannot access source intent independently of the producer;
- task scope depends on unresolved product meaning; or
- correcting the lineage invalidates downstream work whose owner is unknown.

Unaffected tasks may continue when their lineage is intact. Do not let progress
elsewhere make a broken lineage appear safe.

## Review test

A reviewer who receives both the preserved source intent and derived contract
can:

1. trace every load-bearing task requirement back to a governing source or
   approved change;
2. identify omitted, narrowed, or substituted intent;
3. reject an internally coherent implementation of an unapproved divergence;
4. distinguish implementation freedom from a required architecture;
5. identify which downstream artifacts become stale after a correction; and
6. reject a persuasive incomplete result without relying on the producer's
   explanation or inventing requirements afterward.
