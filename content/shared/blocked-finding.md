---
schemaVersion: 1
kind: template
id: blocked-finding
title: Blocked finding record
version: 0.1.0
status: draft
summary: An evidenced record for assurance work that cannot reach a required observation.
for: blocked-finding
---
# Blocked finding record

Blocked is an assurance outcome, not a euphemism for delayed, inconvenient, or
not applicable. Use this record when a required observation cannot be reached
because an access, environment, client, or external dependency remains
unavailable after the agreed escalation attempts.

The purpose is to preserve the claim, the attempted work, and the consequence
of missing evidence. A blocked record never turns the affected criterion into
a pass. It also prevents an unresolved dependency from becoming an unlimited
obligation to improvise outside the agreed boundary.

## What is blocked

- **Record ID:**
- **Acceptance criterion or control:**
- **Claim that remains unproven:**
- **Exact target and revision:**
- **Required observation:**
- **Blocking dependency:**
- **Dependency owner:**
- **First observed:**
- **Last confirmed:**
- **Exact command or procedure attempted:**
- **Observed result:** Include error output or another immutable evidence
  reference.
- **Why an alternative would not be equivalent:** Explain why a mock, local
  substitute, stale artifact, narrower workload, or different environment
  would not establish the same claim.

Do not call work blocked merely because the result failed, the implementation
is difficult, or the operator would prefer a different approach. A reachable
negative result is a failure or finding. Blocked means the required observation
cannot presently be reached.

## Escalation record

Copy one row for each attempt required by the pre-agreed escalation rule.

| Time | Attempt and evidence | Recipient or system | Requested action | Response | Next agreed step |
| --- | --- | --- | --- | --- | --- |
| _UTC timestamp_ | _Message, ticket, command, or incident reference_ | _Accountable owner_ | _Specific access, repair, artifact, or decision needed_ | _Response or no response_ | _Action and deadline_ |

- **Pre-agreed escalation rule:**
- **Rule satisfied at:**
- **Independent reviewer of blocked status:**

An operator cannot create blockage by waiting silently. The record must show
the agreed attempts, recipients, elapsed windows, and responses. Sensitive
evidence may be referenced by immutable private identifier rather than copied
into a public report.

## Consequence

- **Status assigned:** `blocked`
- **Decision affected:**
- **What cannot be claimed:**
- **Nearest narrower conclusion still supported:**
- **Downstream criteria or artifacts affected:**
- **Operational or business exposure while blocked:**
- **Temporary containment, if any:**
- **Residual risk owner:**

State the consequence in decision language. “Production traffic could not be
observed” is the condition; “therefore the retry-safety claim is unproven for
production and cannot support the migration decision” is the consequence.

No summary, score, or sign-off may aggregate a blocked material claim into a
passing result. A narrower conclusion is allowed only when its own evidence and
boundary are explicit.

## What would unblock the work

- **Required action or evidence:**
- **Accountable owner:**
- **How readiness will be demonstrated:**
- **Procedure to rerun:**
- **Evidence that must be recollected because it may become stale:**
- **Criteria whose status will be reconsidered:**

When the dependency becomes available, reopen the affected criteria and run
the recorded procedure. Do not edit the blocked record into a pass. Preserve
it, create the new evidence, and link the superseding status so the decision
history remains inspectable.

For examples of valid and invalid use, see the [worked acceptance
outcomes](acceptance-examples.md).
