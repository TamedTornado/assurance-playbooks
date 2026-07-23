---
schemaVersion: 1
kind: template
id: acceptance-criteria
title: Assurance acceptance criteria
version: 0.1.0
status: draft
summary: A bounded and falsifiable agreement for deciding whether assurance work is complete.
for: acceptance
---
# Assurance acceptance criteria

Acceptance criteria are the decision rules for the work, not a description of
the activity someone intends to perform. Write them before changing the system.
They should let an independent reviewer distinguish completion, failure,
blockage, and an unsupported claim without relying on the operator’s narrative.

A useful criterion identifies the consequential claim, the exact target,
evidence that could disprove the claim, the required provenance, and both the
accept and reject conditions. “Review the tests,” “improve confidence,” and
“investigate the pipeline” are activities. They are not acceptance criteria.

Copy this worksheet into the engagement record and replace every instruction
with a concrete answer. Delete no row merely because the evidence is difficult
to obtain; classify it using the shared [assurance
protocol](protocol.md).

## Decision and scope

- **Decision owner:** Person authorized to accept the resulting risk.
- **Independent operator:** Person collecting or reviewing evidence who did
  not produce the change under examination.
- **Technical owner:** Person who can grant access and explain the system.
- **Decision being supported:** The concrete release, authority, investment,
  migration, or operational decision this work informs.
- **Target:** Repositories, immutable revisions, deployed versions, services,
  data boundaries, and delivery-system components.
- **Representative environments:** Named environments and the material ways
  they differ from production.
- **Representative work:** Workloads, tasks, fixtures, traffic shapes, failure
  conditions, and recovery paths that must be exercised.
- **Included claims:** Claim identifiers from the acceptance matrix below.
- **Explicit exclusions:** Boundaries this work will not establish.
- **Required participants and access:** People, credentials, environments, and
  client-supplied artifacts with accountable owners.
- **Escalation rule:** Attempts, recipients, and response window required
  before a dependency may become a [blocked
  finding](blocked-finding.md).

Scope is pinned to named targets and claims. A repository name without a
revision, “the pipeline” without its components, or “production-like” without
recorded differences is not a bounded target.

## Acceptance matrix

Use one row per consequential claim. Split claims when different evidence could
make one part pass and another fail.

| ID | Consequential claim | Consequence if false | Target and boundary | Accept condition | Reject condition | Required evidence and provenance | Independent reviewer | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AC-01 | _What must remain true?_ | _What decision or outcome is exposed?_ | _Exact revision, environment, path, and exclusions_ | _Observable result that earns acceptance_ | _Counterexample or missing evidence that prevents acceptance_ | _Procedure, raw artifacts, hashes, collector, and limitations_ | _Named person or role_ | _unproven_ |

For every row:

- the accept and reject conditions must be observable;
- the producer’s report is not sufficient evidence of its own success;
- the evidence must identify the target revision and environment;
- a changed workload, weakened verifier, stale artifact, or narrower boundary
  must reject the criterion rather than quietly satisfy it;
- `pass` requires the stated evidence, not evidence judged “close enough” after
  execution;
- `blocked` requires a separate blocked-finding record;
- `not-applicable` requires an explanation of why the claim cannot affect the
  stated decision; and
- missing evidence remains `unproven`.

## Gate demonstration

Name one high-risk path and preserve a material bad fixture before changing the
system.

- **Finding addressed:**
- **High-risk path:**
- **Bad fixture:** Exact artifact or procedure representing the unacceptable
  result.
- **Valid fixture:** Exact artifact or procedure representing behavior that
  must continue to succeed.
- **Before evidence:** Demonstration that the current boundary accepts the bad
  fixture.
- **Intervention:** Smallest durable change to the acceptance boundary.
- **After rejection evidence:** Demonstration that the changed boundary rejects
  the same bad fixture for the intended reason.
- **After valid-path evidence:** Demonstration that the valid fixture still
  passes without a producer-controlled exception.
- **Bypass check:** Evidence that the producer cannot silently disable, weaken,
  or self-approve the gate.
- **Rollback:** Tested or reviewed procedure and the condition for using it.
- **Independent reviewer:**

Before-and-after evidence must remain comparable. If the target, workload,
environment, verifier, or observation method changes, record the difference
and explain why the comparison remains valid. Otherwise collect a new
baseline.

## Completion rule

The work is complete only when all of the following are true:

- every included claim has a recorded status;
- each `pass` cites evidence meeting its pre-agreed provenance and independence
  rules;
- each `fail` has a finding tied to a reachable consequence;
- each `blocked` claim has an evidenced blocked-finding record;
- each `not-applicable` claim has a decision-owner-approved rationale;
- the agreed gate demonstration has passed both rejection and valid-path
  checks;
- all required artifacts are complete and internally linked;
- residual risks and exclusions are explicit; and
- the independent operator and decision owner have signed separately.

Completion means the agreed evidence and gate criteria were met. It does not
mean the system is bug-free, safe outside the stated boundary, or proven under
an environment that was not observed.

If a required criterion fails, the truthful result is a completed assurance
record containing a failure—not a successful system verdict. If a required
criterion is blocked, the record may be complete as a record, but the affected
claim remains blocked and cannot be reported as passed.

## Change control

New information does not silently enlarge or shrink the agreement.

When a finding appears, classify it:

1. **Inside an existing claim:** Complete the agreed evidence and finding
   record. The discovery is part of the work.
2. **Outside scope but capable of invalidating current evidence:** Pause the
   affected criterion. Record why the evidence may no longer support it and
   agree whether to amend the target or leave the claim unproven.
3. **Outside scope and not capable of invalidating current evidence:** Preserve
   it as a bounded observation or referral. Do not convert it into a new
   acceptance obligation without a written amendment.
4. **Requested scope change:** Record the new target, claims, evidence,
   participants, dependencies, and effect on existing criteria before work
   begins.

Never rewrite a reject condition after seeing the result, remove a failed row,
or substitute a cheaper proxy without the decision owner and independent
operator explicitly recording the change and its consequence.

See [worked acceptance outcomes](acceptance-examples.md) for concrete examples
of valid completion, proxy theatre, legitimate blockage, and scope expansion.
