---
schemaVersion: 1
kind: procedure
id: codebase-design-counterexamples
title: See whether the evidence can catch a convincing wrong product
version: 0.1.0
status: draft
summary: Challenge important expectations with plausible wrong versions that can still look finished.
playbook: codebase-assurance
phase: design-counterexamples
purpose: Determine whether the existing checks distinguish the promised product from a cheaper convincing imitation.
inputs: [Product expectation worksheet, Design consistency review, Baseline record, Existing tests and acceptance routes]
outputs: [Assurance investigation, Preserved challenge receipts, Findings]
---
# See whether the evidence can catch a convincing wrong product

A product can build, run, and look right while still violating the reason the
client commissioned it. The useful question is:

> What convincing wrong version might still pass?

This is not a hunt for bizarre edge cases. It is an attempt to build or expose
the shortcuts a rushed developer or optimizing agent might plausibly take:
hard-code the demonstration, use a stale artifact, move authority to an easier
layer, test a helper that the product never calls, weaken a workload, or report
a convenient proxy as though it were the promised result.

Record the work in the same [assurance
investigation](../templates/assurance-investigation.md) used by the next two
phases. Keep each challenge under the client expectation it affects. Do not
create a separate matrix, catalogue, and evidence document unless the volume
genuinely requires it.

## Inputs

Bring:

- the client's expectation worksheet;
- the design conflicts and unresolved questions;
- the baseline demonstrations and their limits;
- the ordinary test, build, benchmark, deployment, or review route that
  currently accepts the product; and
- any suspiciously convenient implementation choice already encountered.

Start with the high-consequence expectations. Do not attempt to mutate the
whole repository.

## Human procedure

### 1. Choose the promise worth challenging

Ask the client:

> If this looked right in a demonstration but was secretly false, which version
> would make you feel most misled?

Choose one to three expectations whose false success would change the client's
decision. Use the expectation in their language.

For Moria, examples include:

- another game can use it as a reusable substrate;
- edits remain responsive under the intended workload;
- the voxels remain authoritative where promised; and
- the acceptance report measures the quality it names.

### 2. Name the ordinary acceptance route

For each expectation, identify the check that currently gives the team
confidence:

- a repository test command;
- a consumer build;
- a demo;
- a benchmark or generated report;
- a pull-request check;
- a deployment rule; or
- a human review.

Run or cite the exact route. A test helper, validator function, or fixture that
exists but is not reached by the ordinary route is not a gate.

If nobody can say what is supposed to reject a wrong result, record that
directly. The expectation is presently supported by belief or inspection, not
an acceptance boundary.

### 3. Describe a convincing wrong version

Ask:

> What is the easiest way to make the visible result pass without delivering
> the underlying promise?

The wrong version should be plausible enough that someone could create it
accidentally or under delivery pressure. Useful patterns include:

- hard-code the expected demonstration or test fixture;
- keep the visible output but move authoritative state to the wrong layer;
- make the public consumer a privileged friend of the implementation;
- skip registering the rejecting test in the ordinary command;
- validate a manifest but deploy or load a different artifact;
- replay an old passing report;
- lower, narrow, or move the measurement after seeing the result;
- mock the dependency that owns the behavior;
- ignore one state transition, retry, restart, or boundary case;
- treat missing evidence as success; or
- emit the right shape with invented or self-reported values.

Write the wrong version in one or two sentences. Then explain why it could fool
a reasonable reviewer. If it is absurd, harmless, or unrelated to the client's
decision, choose a better challenge.

### 4. Predict what should reject it

Before changing anything, record:

- the exact ordinary command or decision route;
- the expected failure;
- the message, field, or observable result that should identify the reason;
- what valid behavior must continue to pass; and
- the safe boundary for the experiment.

This prediction prevents the operator from accepting any red output as proof.
A compilation error caused by malformed syntax does not show that a semantic
gate rejected the wrong product.

### 5. Create the smallest safe challenge

Prefer a controlled fixture or semantic mutation that preserves everything
except the promise being tested.

Examples:

- register an invalid asset with the right filename and ask the ordinary test
  command to reject its content;
- make an external consumer attempt the same behavior without private access;
- keep a benchmark report structurally valid but mismatch its commit or
  workload identity;
- replace one authoritative read with a stale mirror while leaving the visible
  happy path intact;
- bypass one required registration step and run the normal acceptance command;
- replay a duplicate request or load an older state after a newer one; or
- produce a report under a different machine profile and ask the comparison
  tool to refuse equivalence.

Do not change both the implementation and the expected result. Do not weaken a
real fixture merely to make the challenge convenient.

### 6. Run it through the ordinary route

Execute the same route that accepts real work. Preserve:

- the pinned target and exact mutation or fixture;
- the prediction;
- the command or human decision route;
- the raw result; and
- the unchanged valid-path result.

Classify the outcome:

- **Rejected for the intended reason:** the existing boundary noticed the
  violated promise.
- **Rejected for an unrelated reason:** the experiment did not reach the
  intended boundary.
- **Accepted:** the convincing wrong version passed.
- **Not exercised:** the route could not safely or meaningfully test it.
- **Inconclusive:** the result cannot distinguish the wrong version from a
  valid one.

An accepted challenge is not an embarrassing test failure to clean up. It is
the evidence that identifies a valuable assurance gap.

### 7. Explain the consequence without inflating it

For every accepted or inconclusive challenge, state:

- which client expectation remains unsupported;
- how the wrong version could occur in normal delivery;
- what a user, operator, or owner would experience;
- whether the failure is visible or silently successful;
- the narrowest gate that could reject it; and
- what evidence would change the conclusion.

Promote a material result to a shared finding record only when it needs its own
owner or decision. The working investigation can retain smaller observations
without making the operator maintain a file per thought.

### 8. Select the next boundary, not every possible mutation

Stop when each selected high-consequence expectation has:

- survived at least one convincing challenge;
- produced a finding;
- been marked unproven because no meaningful rejecting route exists; or
- been deferred with a stated decision consequence.

The aim is evidence about the strength of the current checks, not a mutation
count.

## A Moria-shaped example

Expectation:

> A future game can rely on Moria as a reusable substrate.

Convincing wrong version:

> The demo looks correct because it reads private world storage, while an
> external consumer cannot obtain the same information through the public
> crate.

The challenge is not “delete a random public method.” Build the smallest
external consumer that performs the representative observation and edit from
the baseline. Separately ensure the demo cannot import private source modules.
Run both checks through the repository's ordinary test route.

If the external consumer fails but the demo passes, the reusable-substrate
expectation has not survived. If a private import compiles because the boundary
test is never registered in `cargo test`, the repository has a validator-shaped
object rather than a gate. If both wrong cases are rejected for their intended
reasons and the valid consumer still passes, that specific boundary has earned
evidence.

The same reasoning applies to the GPU-resident expectation. A beautiful edit
does not distinguish GPU-authoritative state from a CPU-authoritative
implementation. The challenge must vary or inspect the authority boundary in a
way that the promised architecture requires and the easier substitute cannot
satisfy. If no current acceptance route can do that, the correct result is
unproven—not a creative inference from the demo.

## Copyable agent prompt

> Using the supplied expectation worksheet, design review, and baseline record,
> choose one to three client expectations whose false success would change the
> decision. For each, identify the ordinary route that currently accepts the
> product and ask: “What convincing wrong version might still pass?” Propose a
> small plausible semantic mutation or fixture that preserves the visible
> happy path while violating the underlying promise. Before execution, state
> the expected rejection, intended reason, safe boundary, and valid behavior
> that must remain green. Wait for operator authorization before applying a
> mutation. Execute through the ordinary acceptance route, preserve the exact
> change and raw result, and classify it as rejected for the intended reason,
> rejected for an unrelated reason, accepted, not exercised, or inconclusive.
> Draft the result into the shared assurance investigation. Do not treat code
> inspection, coverage, an unregistered helper, or arbitrary red output as
> rejection evidence.

## Required output

Update the [assurance investigation](../templates/assurance-investigation.md)
with the selected promises, convincing wrong versions, predictions, executed
results, valid-path checks, consequences, and candidate gates. Create separate
[finding records](../../shared/finding.md) only for material issues that need
individual ownership or decision.

## Preserve as evidence

Preserve the exact target, mutation or fixture, ordinary route, predicted
failure, raw result, valid-path result, and restoration or isolation method.

## Stop and escalate

Stop before an experiment can affect production, customer data, uncontrolled
infrastructure, or an irreversible artifact. Stop when the proposed mutation
is too broad to attribute its result, or when running it would require changing
the acceptance rule being evaluated.

## Review test

A skeptical reviewer can explain why the wrong version is plausible, why it
would matter to the client, whether the ordinary route reached it, and exactly
what distinguished—or failed to distinguish—it from the promised product.
