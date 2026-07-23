---
schemaVersion: 1
kind: procedure
id: codebase-reproduce-path
title: Get the real product running and preserve what happens
version: 0.1.0
status: draft
summary: Turn important client-visible behavior into repeatable demonstrations before judging or changing the product.
playbook: codebase-assurance
phase: reproduce-path
purpose: Establish what another operator can actually make the pinned product do without relying on the original developer's memory.
inputs: [Product expectation worksheet, Design consistency review, Target repositories and revisions, Existing run instructions, Required access]
outputs: [Baseline record, Raw run receipts, Findings or blocked records when required]
---
# Get the real product running and preserve what happens

The client may not be able to read the implementation. They still need an
answer to a much more useful question:

> Can you make the thing I was promised happen again, from a known version,
> without relying on the original developer's memory?

This phase turns a few important expectations into real demonstrations. It
does not attempt to run every command, catalogue the whole environment, or
prove every technical question from the expectation worksheet.

The output is one [baseline record](../templates/baseline-record.md). It starts
with a client-readable answer, then preserves enough detail for another
operator to repeat each demonstration. Commands, logs, reports, screenshots,
and hashes may be attached or linked; the operator should not paste every raw
receipt into the main document.

## What this phase establishes

A baseline establishes:

- the exact version examined;
- which important behaviors can be observed now;
- the real route used to observe them;
- what had to be repaired before that route worked;
- whether another operator can repeat it; and
- which expectations remain blocked or outside the evidence.

It does not establish that the behavior is correct under every condition. It
does not yet show that the tests can reject a plausible wrong implementation.
Those questions belong to later phases.

## Inputs

Bring:

- the completed product expectation worksheet;
- the design consistency review;
- the repository, build, package, image, model, or deployed version to examine;
- the instructions a new developer or customer would receive;
- the access and data required for the important behavior; and
- any demonstration, report, recording, or claim the client has already seen.

Do not begin with a generic toolchain inventory. Record technical detail when
it becomes necessary to repeat a selected demonstration.

## Human procedure

The operator can run this in one session with a product owner and, where
necessary, a technical contributor.

### 1. Ask what should happen in front of us

Start with:

> What should we be able to see happen?

Choose two to five demonstrations that matter to the client's decision. Draw
them from the expectation worksheet:

- something the client was shown;
- something a real consumer must be able to do;
- something whose failure would change whether the product can be used; or
- something offered as evidence for an important quality or architectural
  claim.

Prefer a visible behavior over an internal subsystem. “An external project can
add the library and create a world” is a demonstration. “Exercise the package
boundary” is not.

For each demonstration, record:

- what the person does;
- what they expect to see;
- why it matters; and
- which expectation it helps investigate.

One demonstration may help investigate several technical questions. Do not
create a separate run merely to make the worksheet look complete.

### 2. Agree what this run can prove

Before touching the system, say what a successful run would and would not
establish.

For example:

- A clean external consumer build can show that the public package is usable.
  It cannot show that every useful operation is available through that public
  boundary.
- A visible edit can show that a user action changes the rendered world. It
  cannot by itself establish where authoritative state lives.
- A generated performance report can show the observed result on one named
  machine and workload. It cannot establish the same result on every machine.

This prevents a compelling demonstration from silently earning a broader
conclusion than it supports.

### 3. Pin the thing being demonstrated

Record the identity a second operator needs:

- repository and revision, or deployed artifact identity;
- whether the starting tree contains local changes;
- selected configuration and feature flags;
- necessary data or generated inputs; and
- named machine or environment when the claim depends on it.

Record tool versions, services, caches, credentials interfaces, drivers, or
hardware only when they materially affect the route. Prefer commands that
capture them automatically.

If the target cannot be identified, stop. An unidentifiable build cannot become
a trustworthy baseline.

### 4. Use the route the project gives a newcomer

Start from a clean checkout, machine, account, or workspace where practical.
Follow the project's public instructions before using private knowledge.

Execute the real composition needed for the behavior:

- use the public package as a consumer would;
- run the actual application rather than a mock of it;
- use the ordinary data and artifact pipeline;
- call the real safe dependency boundary; and
- use the named acceptance machine when the claim depends on its hardware.

A reduced route is allowed when the real route is unsafe or unavailable, but
the baseline must name what the substitute removes. A substitute cannot prove
behavior owned by the omitted part.

### 5. Preserve the first attempt

Record the exact command or action and the first observed result before fixing
anything. Keep the useful output as a linked receipt.

The first attempt answers a product question too: can someone who is not the
original developer get the promised behavior from what the project currently
provides?

Do not quietly clean up instructions, install a forgotten dependency, supply a
missing asset, warm a cache, or change configuration and then describe the
repaired run as the baseline.

### 6. Classify every repair before making it

Use one of these three labels:

- **Environment repair:** our machine or access was not in the required state.
  Examples include installing a documented toolchain or obtaining an agreed
  credential.
- **Instruction repair:** the product can perform the behavior, but the route
  given to a newcomer is missing, stale, or wrong. Preserve this as a finding
  even if the corrected command is simple.
- **Product change:** code, configuration shipped as part of the product, data
  contract, or supported behavior must change. Stop treating this as baseline
  setup. Preserve the failure as a finding and do not alter the target being
  assessed.

When the classification is disputed, record both interpretations and the
decision owner. Do not make a product change merely to obtain a green baseline.

### 7. Establish the repeatable route

After permitted environment and instruction repairs:

1. return to a clean starting state;
2. run the corrected route exactly;
3. record the observable result;
4. preserve the smallest useful set of raw receipts; and
5. write the route so it can be copied without oral explanation.

The record should contain exact commands where commands exist. For interactive
behavior, describe the starting state, action, visible result, and receipt.

Do not make the main record an unfiltered terminal transcript. Link the raw
transcript and summarize the result a client can understand.

### 8. Ask someone else to repeat it

Give the written route to a second operator who did not create it, or run it in
a genuinely clean environment without relying on shell history or unstated
local state.

Record:

- whether the same material behavior appeared;
- any extra knowledge the second attempt required;
- meaningful differences in result or timing; and
- the boundary of the repeatability claim.

If independent repetition is impractical, say why and mark repeatability
unproven. The original operator running the same warmed command twice is useful
diagnostic evidence, but it is not independent reproduction.

### 9. Close every selected demonstration honestly

Give each demonstration one plain-language result:

- **Not run:** the demonstration has been selected, but no attempt has been
  made. This is a planning state, not evidence about the product.
- **Reproduced:** another operator can obtain comparable behavior from the
  recorded route.
- **Observed once:** the behavior occurred, but independent repeatability has
  not been established.
- **Failed:** the pinned product did not produce the expected behavior.
- **Blocked:** a named missing capability prevents the run.
- **Substitute only:** a reduced route ran, but it removes part of the behavior
  the expectation depends on.

Explain what each result means for the client's decision. Do not average the
results into a project score.

## A Moria-shaped example

Suppose the client says:

> I expected another game to be able to use Moria as a library, and I expected
> a player edit to appear quickly without the demo cheating through private
> state.

Reasonable baseline demonstrations would be:

1. Create or use a clean external consumer, depend on the pinned Moria
   revision, and reach a small world through the supported public interface.
2. Run the actual visual consumer, perform one edit, and preserve the visible
   result and any machine-readable latency report.
3. Inspect the demonstrated route only far enough to state whether it used the
   supported public interface. The deeper question of whether CPU or GPU owns
   world truth is not proved merely because the edit appeared.

If the external consumer builds only after discovering an undocumented native
dependency, that is an instruction repair. If the consumer requires access to
a private crate, that is a product failure against the reusable-substrate
expectation. If no suitable graphics machine is available, the headed result
is blocked; a headless substitute may support logic conclusions but cannot be
presented as graphics or frame-latency evidence.

## Copyable agent prompt

> Help me establish a repeatable baseline for the supplied product expectation
> worksheet and design consistency review. Begin by proposing two to five
> client-visible demonstrations drawn from what the client was shown, what a
> real consumer must do, and what would change the client's decision. For each,
> state what success would and would not prove. Wait for operator confirmation
> of the demonstrations, then identify the pinned target and execute the
> project's documented real route from a clean state. Preserve the first
> attempt before suggesting repairs. Classify every proposed repair as an
> environment repair, instruction repair, or product change; do not make a
> product change to obtain a successful baseline. Draft one baseline record
> with a client summary, exact repeatable routes, linked raw receipts,
> independent repetition result, limitations, and not-run, failed, blocked, or
> substitute-only demonstrations. Do not invent missing observations or turn a
> reduced route into evidence for the omitted behavior.

## Required output

One completed [baseline record](../templates/baseline-record.md), with linked
raw receipts. Use a [finding record](../../shared/finding.md) for a material
product or instruction failure and a
[blocked-finding record](../../shared/blocked-finding.md) when access or a
required environment prevents a decision-relevant run.

## Preserve as evidence

Preserve the pinned target, starting state, first attempt, repair
classification, final route, raw result, artifact identity, independent
attempt, and stated limits. Hash material files where identity matters; do not
hash screenshots or transcripts merely to create ceremony.

## Stop and escalate

Stop when:

- the target cannot be identified;
- a proposed “setup fix” would change the product under assessment;
- required data cannot be handled safely;
- the run could create an uncontrolled customer or production effect;
- access remains unavailable after the agreed escalation; or
- the only available substitute removes the behavior the selected expectation
  depends on.

## Review test

A client can understand what was and was not reproduced. A second operator can
follow each successful route without oral history and obtain comparable
behavior. Every repair and substitute remains visible, and no failed or blocked
demonstration has been converted into a pass.
