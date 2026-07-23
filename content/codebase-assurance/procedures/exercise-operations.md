---
schemaVersion: 1
kind: procedure
id: codebase-exercise-operations
title: See what happens when the product fails
version: 0.1.0
status: draft
summary: Determine whether a real operator can notice contain and recover a failure without losing the product state that matters.
playbook: codebase-assurance
phase: exercise-operations
purpose: Establish the human and product consequences of one realistic failure on the selected high-risk route.
inputs: [Assurance investigation, High-risk route, Operator interfaces, Recovery or rollback route]
outputs: [Updated assurance investigation, Operator timeline, Recovery receipts, Findings]
---
# See what happens when the product fails

Code can return an error while the person responsible for the product remains
blind, the data remains half-changed, or recovery quietly discards the thing
the client cared about. Ask:

> What would the person responsible for this product actually see?

Use the same [assurance
investigation](../templates/assurance-investigation.md). This phase is small
when the product has little operational surface. Do not invent a production
incident exercise for a local library; state that production operation is
outside the evidence.

## Inputs

Bring one decision-relevant failure from the challenge or boundary work, the
interfaces available to the actual operator, the consequential product state,
and a safe environment with an agreed recovery or rollback target.

## Human procedure

### 1. Name the person and the moment

Do not begin with logs. Ask:

- Who is responsible when this behavior fails?
- What are they trying to protect or restore?
- How should they first learn about the failure?
- How quickly does knowing matter?
- What must remain true while they investigate?

For a founder-operated application, the operator may be the founder looking at
a customer report and hosting dashboard. For a library such as Moria, the
relevant operator may be a downstream game developer running a build or
benchmark. Use the real person, not an imaginary operations center.

### 2. Choose one failure that changes the decision

Prefer a failure already revealed by the investigation:

- missing or malformed dependency;
- interruption after work is accepted;
- partial write or artifact publication;
- stale result arriving after newer work;
- resource exhaustion or overload;
- process restart during consequential state change; or
- rollback to an incompatible artifact or state.

Define the safe expected result in ordinary language, including what happens
to the user's or business state.

### 3. Write the expected operator story

Before the exercise, write:

1. what the operator should notice;
2. where they should see it;
3. what they should be able to rule in or out;
4. what action they should take;
5. what recovery or rollback should preserve; and
6. how they know the product—not merely the process—is healthy again.

This becomes the comparison, not an idealized runbook written afterward.

### 4. Exercise the failure safely

Use only authorized controls. Record a simple timeline:

- failure introduced;
- product behavior changed;
- operator first became aware;
- operator localized the problem;
- containment began;
- recovery or rollback began;
- consequential behavior was verified again.

Observe through the same interfaces the real operator has. Private debug output
may help explain a finding, but it cannot prove that the operator would have
known.

### 5. Inspect the state that matters

Check the client's state before, during, and after recovery:

- Was accepted work lost, duplicated, or partially applied?
- Did the product serve stale success?
- Did rollback restore compatible state?
- Did recovery require an undocumented destructive reset?
- Can the baseline demonstration be repeated afterward?

A healthy process, container, or test runner is not proof that the product
state recovered.

### 6. Compare reality with the expected story

Record:

- what was visible and what remained hidden;
- which action worked and what knowledge it required;
- elapsed boundaries where relevant;
- the recovered product behavior and state;
- residual exposure; and
- the smallest durable improvement that would change the result.

If there is no meaningful operator surface in scope, say so and retain
operations as unproven or not applicable to the bounded decision. Do not award
confidence for hypothetical observability.

## A Moria-shaped example

Moria is a library and headed application, not a production service in this
example. A useful operational exercise could interrupt a save or load and ask
what the downstream developer sees, whether the previous world remains intact,
and whether the baseline edit-and-reload behavior can be repeated afterward.

The public example cannot claim production incident readiness. It can establish
a narrower developer-operator story for command failure, immutable failed
reports, and state-preserving recovery. Those boundaries must remain explicit
in the final decision.

## Copyable agent prompt

> Continue the supplied assurance investigation using one decision-relevant
> failure and the actual person responsible for the product. Ask what that
> person is protecting, how they should first learn of the failure, what action
> they can take, and how they know consequential product state has recovered.
> Draft the expected operator story before execution. With authorization,
> exercise the failure in a safe environment and record a timeline from
> introduction through visibility, localization, containment, recovery, and
> repetition of the relevant baseline demonstration. Observe through the
> interfaces available to the real operator and inspect product or business
> state, not process health alone. Record gaps, unstated knowledge, destructive
> recovery, residual exposure, and the limits of the operational conclusion.

## Required output

Update the [assurance investigation](../templates/assurance-investigation.md)
with the expected operator story, actual timeline, state before and after,
recovery proof, and narrow conclusion. Create a finding when missing visibility
or unsafe recovery changes the client decision.

## Preserve as evidence

Preserve the failure identity, timestamps, operator-visible signals, private
diagnostics used only for explanation, state snapshots, operator actions,
recovery or rollback target, and repeated baseline receipt.

## Stop and escalate

Stop when authorization, blast radius, customer effect, data handling,
rollback target, or recovery safety is not controlled.

## Review test

A reviewer can tell when the real operator would know, what state had already
changed, what they could do without private knowledge, and whether recovery
restored the consequential product behavior.
