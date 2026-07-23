---
schemaVersion: 1
kind: procedure
id: codebase-make-decision
title: Tell the client what the evidence lets them do next
version: 0.1.0
status: draft
summary: Convert the investigation and proven gate into a bounded decision without erasing failed blocked or unproven expectations.
playbook: codebase-assurance
phase: make-decision
purpose: Give the client an explicit usable decision and preserve exactly where confidence ends.
inputs: [Original client decision, Product expectation worksheet, Baseline record, Assurance investigation, Findings, Intervention record]
outputs: [Assurance sign-off, Conditions, Residual-risk ownership, Follow-on evidence]
---
# Tell the client what the evidence lets them do next

The final question is not “Did the project pass assurance?” It is:

> What does the evidence let the client do next?

A client may be deciding whether to launch, acquire, continue investing,
replace a developer, trust an AI-built subsystem, onboard a first customer, or
make a technical claim publicly. The answer must address that decision at the
boundary actually examined.

Use the shared [assurance sign-off](../../shared/sign-off.md). It is a decision
record, not a certificate and not a scorecard.

## Inputs

Bring the original client decision, expectation worksheet, design review,
baseline record, assurance investigation, material findings and blocked
records, gate intervention proof, exclusions, and named decision owner.

## Human procedure

### 1. Revisit the client’s original decision

Read the opening of the expectation worksheet aloud:

- What was the client trying to decide?
- What did they expect the product to do?
- Which doubts made the codebase consequential?
- Has the decision itself changed during the engagement?

If the client now wants a materially different decision, record it as new scope
or a follow-on decision. Do not quietly rewrite the original question to match
the evidence collected.

### 2. Give each expectation its own result

For every in-scope client expectation, choose one:

- **Supported:** sufficient evidence supports the bounded expectation.
- **Failed:** observed evidence contradicts it.
- **Blocked:** a required observation could not be reached after the agreed
  escalation.
- **Unproven:** the work did not establish it, even though it was not formally
  blocked.
- **Not applicable:** the expectation does not govern this decision, with a
  reason.

No claim inherits another claim’s pass. A successful demo does not pass an
architecture expectation. A public-consumer gate does not pass a performance
claim. A report does not pass a quality it measures only by proxy.

For each result, state the evidence and the consequence for the client's
decision.

### 3. Separate completion from success

Confirm whether the agreed assurance work is complete:

- the expected product was reconstructed;
- selected demonstrations received honest statuses;
- high-consequence expectations were challenged;
- real boundaries and relevant failure were exercised or bounded;
- material findings and blockage have owners;
- one gate was proven before and after, or an agreed blocked outcome explains
  why it could not be; and
- residual risk is explicit.

The engagement can be complete while the correct client decision is not to
proceed. Conversely, a promising product does not make incomplete evidence
complete.

### 4. State the installed authority precisely

Explain the proven gate in one paragraph:

- the wrong result it now rejects;
- the ordinary route it controls;
- the valid behavior preserved;
- the bypasses attempted;
- who owns and may waive it; and
- what it does not cover.

Do not turn “one gate was installed” into “the codebase is assured.”

### 5. Draft the actual decision

Choose one decision:

- **Proceed:** the evidence supports the proposed action within the named
  boundary.
- **Proceed with conditions:** the action is reasonable only while named
  conditions, owners, and review triggers hold.
- **Do not proceed:** failed or missing evidence makes the proposed action
  unjustified.
- **Defer:** a named observation or decision is required before choosing.

Write the decision in the client's language. Examples:

- “Use the library for the next internal prototype, provided the public
  consumer gate remains mandatory; do not yet make the GPU-resident claim.”
- “Onboard the first bounded customer workload, but do not migrate existing
  state until restart recovery is demonstrated.”
- “Do not treat the generated reports as release evidence until their artifact
  identity is independently enforced.”

### 6. Attach conditions that can actually be owned

Each condition needs:

- an owner;
- the action or boundary required;
- the evidence that shows it remains satisfied;
- an expiry or review trigger; and
- the consequence of violation.

“Improve observability” is not a condition. “The release owner must retain the
failed report and the deployment remains blocked until the named state check
passes” can be.

### 7. Say what would change the decision

For every failed, blocked, or important unproven expectation, state:

- the missing observation or repair;
- the accountable owner;
- the procedure to rerun;
- which existing evidence may become stale; and
- how the decision could change if the result is favorable or unfavorable.

This gives the client a usable path forward without turning the engagement into
an unlimited list of recommendations.

### 8. Obtain separate approvals

The operator signs for evidence sufficiency and its limits. The decision owner
accepts or rejects the resulting risk. The implementer of the gate cannot be
the sole approver of its proof.

Record disagreement. Do not rewrite the evidence summary merely to obtain a
comfortable signature.

## A Moria-shaped example

Suppose the external-consumer gate is proven but the GPU-authority
contradiction remains unresolved and the named performance demonstrations have
not been run.

A bounded decision could support using Moria's public API for further
development because a representative consumer is now protected by an ordinary
gate. It could not support claiming that the implementation is GPU-resident,
meets the named performance targets, or is ready for a public benchmark
release. Those are separate expectations with separate evidence.

That mixed answer is more useful than calling Moria “mostly assured.” It tells
the client what they can do, which claim they must not make, and exactly what
evidence could expand the decision later.

## Copyable agent prompt

> Draft a bounded client decision from the original decision, expectation
> worksheet, baseline record, assurance investigation, findings, blocked
> records, and intervention proof. Reproduce the original decision without
> weakening it. Give every in-scope expectation one independent status:
> supported, failed, blocked, unproven, or not applicable. Cite the evidence and
> state the decision consequence of each. Distinguish completion of the agreed
> assurance work from success of the product. Describe the installed gate only
> within the authority its before-and-after evidence earned. Draft proceed,
> proceed with conditions, do not proceed, or defer in the client's language.
> Give every condition and residual risk an owner and review trigger. For each
> material non-pass, say what evidence would change the decision. Leave the
> independent operator and decision-owner approvals blank for the humans; do
> not impersonate them or average claim statuses into a score.

## Required output

A completed [assurance sign-off](../../shared/sign-off.md) with the client
decision, expectation-by-expectation status, gate authority, conditions,
residual risk, follow-on evidence, and separate approvals.

## Preserve as evidence

Preserve the original decision, every expectation status and citation,
conditions, objections, gate boundary, approval identities, decision timestamp,
expiry or review triggers, and the evidence required to reconsider the result.

## Stop and escalate

Stop when the original decision is missing, a material expectation has no
status, a supported result lacks sufficient evidence, the decision owner is
absent, conditions have no owner, or the implementer would be the sole approver
of the gate evidence.

## Review test

A client can answer: what may I do now, what must I not assume, what conditions
must remain true, who owns the remaining risk, and what evidence would change
the decision. A skeptical reviewer can reconstruct every material conclusion
without inheriting confidence from an unrelated passing claim.
