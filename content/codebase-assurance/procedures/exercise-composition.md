---
schemaVersion: 1
kind: procedure
id: codebase-exercise-composition
title: Follow the promise across real boundaries
version: 0.1.0
status: draft
summary: Check whether evidence earned inside one component survives the dependencies artifacts and state that produce the real result.
playbook: codebase-assurance
phase: exercise-composition
purpose: Establish whether the selected client expectation still holds where ownership passes between real parts of the product.
inputs: [Assurance investigation, Baseline record, Selected challenges, Real dependencies and artifacts]
outputs: [Updated assurance investigation, Boundary receipts, Findings or blocked records]
---
# Follow the promise across real boundaries

A local component can be entirely correct while the product result is wrong.
The next question is:

> Where does the demonstration leave the code we control?

Follow only the boundaries that can change the selected client expectation.
Do not inventory every library, service, queue, or build tool. Continue using
the same [assurance
investigation](../templates/assurance-investigation.md) from the challenge
phase.

## Inputs

Bring the selected expectations, baseline routes, challenge results, real
artifact identities, and safe access to the material dependencies.

## Human procedure

### 1. Draw the real route in one line

Take one baseline demonstration and write:

```text
person or caller
→ supported product boundary
→ material state or work
→ dependency or artifact handoff
→ visible result
```

Add a boundary only if it owns behavior necessary to the expectation.

For Moria, a visible edit might cross the public command boundary, authoritative
world state, presentation work, GPU upload, render acknowledgement, and
benchmark report. A formatting library is not material merely because it
appears in the dependency tree.

### 2. Ask what each handoff can lose or substitute

At each material boundary ask:

- What identity must remain the same?
- What state or ordering must survive?
- What does the receiving side trust without checking?
- What can be duplicated, delayed, stale, partial, or mismatched?
- Does a test substitute remove the very behavior we need evidence about?

Write only the risks that could make the expectation falsely appear satisfied
or materially fail.

### 3. Choose one realistic boundary exercise

Use the challenge already selected where possible. Good exercises include:

- send the same request twice;
- delay or reorder one completion;
- provide a stale but structurally valid artifact;
- mismatch source revision and generated output;
- relocate the product to a clean consumer;
- restart between accepted work and visible completion;
- make one real dependency unavailable;
- corrupt or truncate a material file; or
- run against the nearest safe real provider instead of a behaviorless mock.

State the expected safe behavior first. “It errors” is insufficient when the
product may already have committed partial or stale business state.

### 4. Run through the composed product

Use the real safe boundary and ordinary product route. Record:

- exact inputs and identities on both sides of the handoff;
- the action;
- what each observer saw;
- resulting product or business state;
- whether the result was safe refusal, visible unavailability, extra work,
  stale success, silent corruption, or excess authority; and
- what a mock or local test would have missed.

Do not generalize from a local unit test to the composed expectation.

### 5. Compare with the baseline and valid path

After the boundary exercise, repeat the relevant valid route. Explain whether
the experiment:

- preserved the expected result;
- failed visibly before consequential state changed;
- left partial or stale state;
- recovered only with unstated action; or
- cannot be concluded because the real boundary was unavailable.

### 6. Record the narrow conclusion

Append the result under the same challenge in the assurance investigation.
Create a finding or blocked record when the result changes the client decision
or requires an owner.

Move on when every material boundary on the selected high-risk route is either
exercised, explicitly supported by narrower evidence, or retained as unproven.
Do not claim the whole dependency graph was verified.

## A Moria-shaped example

The visible edit route ends not when an edit request is accepted, but when the
current revision is actually presented. A meaningful boundary exercise can
delay or stale one presentation result while a newer edit is authoritative.
The expected behavior is not merely “no crash.” Stale work must be refused, the
newer state must remain authoritative, and the product must eventually present
that state or expose a failure.

An external-consumer compile test covers a different boundary: package
visibility. It does not prove the render handoff. A headless mock of GPU
acknowledgement likewise cannot establish the real frame-latency claim. Each
piece of evidence keeps its actual reach.

## Copyable agent prompt

> Continue the supplied assurance investigation. For each selected baseline
> demonstration, draw one plain route from the person or caller to the visible
> result. Include only handoffs that own behavior necessary to the client
> expectation. At each handoff, identify identity, state, ordering, or authority
> that can be lost, duplicated, delayed, made stale, partially applied, or
> substituted. Propose the smallest safe exercise most likely to distinguish
> correct composition from locally correct parts. State expected safe behavior
> before execution. Use the closest safe real boundary, preserve identities and
> raw receipts, repeat the valid route afterward, and record failure direction
> and the limits of the conclusion. Do not infer composed behavior from a unit
> test or a mock that removes the relevant dependency.

## Required output

Update the [assurance investigation](../templates/assurance-investigation.md)
with the real route, boundary exercised, expected safe behavior, observed
state, failure direction, valid-path check, and conclusion. Link separate
finding or blocked records where ownership or access requires them.

## Preserve as evidence

Preserve both sides of the handoff: versions, inputs, outputs, timestamps or
ordering, product state, raw receipts, substitute limitations, and the repeated
valid result.

## Stop and escalate

Stop when the real interface cannot be exercised safely, data handling or
customer effects are uncontrolled, contractual access is missing, or the only
available substitute removes the behavior under investigation.

## Review test

A reviewer can see the complete material handoff, what could have gone wrong
between locally correct parts, the actual resulting state, and why the evidence
supports only the stated boundary.
