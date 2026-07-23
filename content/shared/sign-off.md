---
schemaVersion: 1
kind: template
id: assurance-sign-off
title: Assurance sign-off
version: 0.1.0
status: draft
summary: The human decision and explicit residual-risk statement at completion.
for: sign-off
---
# Assurance sign-off

Sign-off records the authority earned by the evidence. It is not a certificate
that the system is generally safe.

## Decision

- **Decision being made:**
- **Decision owner:**
- **Independent operator:**
- **Method and version:**
- **Target repositories, revisions, artifacts, and environments:**
- **Representative workloads or tasks:**
- **Included claims:**
- **Explicit exclusions:**
- **Decision:** proceed, proceed with conditions, do not proceed, or deferred
- **Conditions and expiry or review trigger:**

Use the pre-agreed [acceptance criteria](acceptance-criteria.md), not a
retrospective description of what proved convenient.

## Claim status

List every in-scope claim:

| Claim | Status | Evidence or record | Decision consequence | Owner |
| --- | --- | --- | --- | --- |
| _Claim ID_ | _pass, fail, blocked, not-applicable, or unproven_ | _Stable links_ | _What this changes_ | _Named owner_ |

Every pass cites sufficient evidence. Every fail cites a finding. Every blocked
status links a [blocked-finding record](blocked-finding.md). Not-applicable and
unproven claims state their consequence. Do not average the table into a score.

## Gate and residual risk

- **Installed or hardened gate:**
- **Preserved bad fixture:**
- **Valid fixture:**
- **Before-and-after evidence:**
- **Who owns and may change the gate:**
- **Bypass and exception authority:**
- **Rollback:**
- **What the gate does not cover:**
- **Residual risks and assumptions:**
- **Additional evidence required for greater trust or authority:**

Completion means the agreed work and records are complete. It does not mean
every claim passed. A complete record can support a decision not to proceed.

## Separate approvals

**Independent operator**

- Name:
- Decision on evidence sufficiency:
- Qualifications or objections:
- Date:
- Signature or immutable approval reference:

**Decision owner**

- Name:
- Risk decision:
- Conditions accepted:
- Residual risk owner:
- Date:
- Signature or immutable approval reference:

The person who implemented the selected intervention cannot be the sole
approver of its evidence.
