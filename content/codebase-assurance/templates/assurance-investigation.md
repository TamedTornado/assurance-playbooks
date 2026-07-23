---
schemaVersion: 1
kind: template
id: codebase-assurance-investigation
title: Assurance investigation
version: 0.1.0
status: draft
summary: One working record for challenging important promises across checks real boundaries and operational failure.
for: investigation
---
# Assurance investigation

Use one copy for the engagement. Organize it by client expectation, not by
repository subsystem. Copy a challenge section only when it can change the
client's decision. Delete unused prompts. Link raw receipts and separate
material findings rather than pasting every log or creating a file per
observation. Do not assign IDs manually.

## What we challenged

[Name the one to three client expectations selected and why false success would
matter.]

## What the existing evidence can catch

[Explain in ordinary language which convincing wrong versions were rejected,
through which normal route.]

## What can still pass or remains unproven

[Explain accepted, unrelated, inconclusive, not-exercised, and blocked
challenges and their decision consequences.]

## What happens at real boundaries and during failure

[Summarize the composed and operator-visible results without claiming broader
coverage.]

## Best candidate for a durable gate

[Name the observed weakness whose permanent rejection would create the most
useful future confidence. This is a candidate, not yet proof of an
intervention.]

## Challenges

Keep related boundary and operational work underneath the challenge that made
it necessary.

### [Expectation in the client’s words]

#### Ordinary acceptance route

- **What currently gives the team confidence:**
- **Exact command or decision route:**
- **Valid behavior that must continue to pass:**

#### Convincing wrong version

- **The plausible shortcut or false success:**
- **Why a reasonable reviewer could believe it:**
- **Why the client would care:**

#### Predicted rejection

- **Safe mutation or fixture:**
- **Expected result:**
- **Intended reason:**
- **Experiment boundary and restoration:**

#### Challenge result

- **Target and exact change:**
- **Observed result:** [Rejected for the intended reason, rejected for an
  unrelated reason, accepted, not exercised, or inconclusive.]
- **Raw receipt:**
- **Valid-path result afterward:**
- **What this supports:**
- **What remains unsupported:**
- **Finding, when material:**

Delete the following boundary section when the challenge does not depend on a
real handoff.

#### Real boundary exercised

```text
[person or caller]
→ [supported boundary]
→ [material state or work]
→ [dependency or artifact handoff]
→ [visible result]
```

- **Boundary and risk selected:**
- **Identity, state, ordering, or authority that could be lost:**
- **Expected safe behavior:**
- **Exercise performed:**
- **Observed product state and result:**
- **Failure direction:** [Safe refusal, visible unavailability, extra work,
  stale success, silent corruption, or excess authority.]
- **What a local test or substitute would have missed:**
- **Valid-path result afterward:**
- **Evidence and limitation:**

Delete the following operator section when operational behavior is outside the
bounded decision.

#### What the operator saw and did

- **Actual person responsible:**
- **What they needed to protect or restore:**
- **Expected first signal and location:**
- **Expected action and recovery proof:**

| Moment | What the product did | What the operator could see | Action |
| --- | --- | --- | --- |
| Failure introduced |  |  |  |
| First awareness |  |  |  |
| Containment |  |  |  |
| Recovery or rollback |  |  |  |
| Product behavior verified |  |  |  |

- **State before, during, and after:**
- **Unstated knowledge or private diagnostics required:**
- **Baseline demonstration repeated:**
- **Residual exposure:**
- **Operational conclusion and boundary:**

#### Candidate durable gate

- **Wrong result the gate should reject:**
- **Ordinary route it should control:**
- **Valid result it must preserve:**
- **Why this boundary has leverage:**
- **Who should own it:**
- **Known bypass or limitation:**
