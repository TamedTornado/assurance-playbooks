---
schemaVersion: 1
kind: procedure
id: agentic-contract-work
title: Select and contract representative agent work
version: 0.1.0
status: draft
summary: Choose representative tasks and make completion independently rejectable before agents execute them.
playbook: agentic-delivery-assurance
phase: contract-work
purpose: Establish a task sample and acceptance contract capable of rejecting persuasive incomplete work.
inputs: [Real task history, Intended authority, Known failures, Engineering owner]
outputs: [Task sample, Task contracts, Ambiguity and escalation log]
---
# Select and contract representative agent work

## Inputs

Real completed and failed tasks, issue or request format, intended agent
authority, known incidents, repositories, and engineering owner.

## Human procedure

1. Sample routine, ambiguous, high-risk, overlapping, dependent, and failure
   recovery work.
2. State the intended outcome separately from implementation suggestions.
3. Add negative constraints and prohibited shortcuts.
4. Name target revisions, real boundaries, required evidence, and reject cases.
5. Identify ambiguity requiring human decision rather than agent inference.
6. Run the contract past a reviewer who did not author the implementation.
7. Confirm that an attractive incomplete result can be rejected from the
   contract alone.

## Copyable agent prompt

> From the supplied task history and intended authority, select a representative
> sample covering routine, ambiguous, high-risk, overlapping, dependent, and
> recovery work. Rewrite each task as an independently rejectable contract:
> intended outcome, target, positive requirements, negative constraints,
> prohibited shortcuts, required evidence, reject conditions, and escalation
> questions. Separate outcome from implementation hints. Identify any term a
> competent producer and reviewer could interpret differently. Do not derive
> acceptance solely from tests the producer is expected to write.

## Required output

Task-sampling rationale, task-contract matrix, ambiguity log, and owner-approved
accept/reject conditions.

## Preserve as evidence

Original task, normalized contract, review comments, unresolved questions,
agent-visible version, and resulting work identity.

## Stop and escalate

Stop when consequential intent cannot be made observable, target identity is
unknown, or the owner will not decide a material ambiguity.

## Review test

A reviewer can reject a superficially plausible result without relying on the
producer’s explanation or inventing new requirements afterward.
