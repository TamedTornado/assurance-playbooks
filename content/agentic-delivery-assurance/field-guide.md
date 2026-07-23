# Agentic Delivery Assurance field guide

This guide is for the person assessing and hardening a system that turns agent
tasks into released software. It does not assume a model, orchestration
framework, branch strategy, CI provider, or deployment platform.

The unit under review is the delivery system—not the personality of an agent.
Follow representative work from intent to production and through recovery.

## Start with the authority decision

Name:

- the engineering owner accountable for the resulting authority;
- an operator independent of the selected intervention;
- the kinds of work agents perform now;
- the additional authority the organization wants them to earn;
- representative routine, ambiguous, and high-risk tasks;
- repositories, revisions, environments, release paths, and dependencies;
- who provides access and resolves ambiguity; and
- the accept, reject, blocked, completion, and escalation rules.

Record these in the shared [acceptance
criteria](../shared/acceptance-criteria.md). Do not begin with model scores.

## Phase 1: Make completion rejectable

Executable procedure: [Select and contract representative
work](procedures/contract-work.md).

**Decision:** Can someone reject a persuasive but incomplete result without
depending on the producer’s explanation?

For representative tasks, separate the intended outcome from implementation
suggestions. Record positive requirements, negative constraints, prohibited
shortcuts, required evidence, target identity, and conditions that require
human escalation.

Include a task that is routine, one with genuine ambiguity, and one whose
failure would be consequential.

**Evidence to keep:** original task, normalized task contract, ambiguity log,
required evidence, and resulting change.

**Move on when:** material requirements have observable accept and reject
conditions and uncertainty has an escalation route.

**Ways to fool yourself:** letting the producer author the only test; describing
an adjective such as “robust” as acceptance evidence; assuming an agent will ask
because the prompt encouraged it.

## Phase 2: Map context and real authority

Executable procedure: [Map context precedence and real
authority](procedures/map-context-authority.md).

**Decision:** What can each producer, verifier, and human know, mutate, approve,
and bypass?

Trace instruction sources and precedence, retrieved knowledge, repository
state, tools, filesystem and network access, secrets, approval rules,
destructive capabilities, and audit records.

Exercise missing, stale, and conflicting instructions. Attempt safe operations
outside the task boundary. Compare the policy people describe with the
authority actually enforced.

**Evidence to keep:** context-precedence map, authority graph, access attempts,
and escalation behavior.

**Move on when:** authoritative instructions have deterministic precedence,
sensitive authority is enforced rather than requested, and missing context
causes a visible failure or escalation.

**Ways to fool yourself:** treating a prompt prohibition as a permission
boundary; calling a different agent independent when it receives only the
producer’s selected evidence.

## Phase 3: Follow work to the released artifact

Executable procedure: [Trace work from request to running
artifact](procedures/trace-delivery.md).

**Decision:** Can the organization reconstruct exactly what was requested,
produced, integrated, verified, built, and released?

Run independent, overlapping, and dependent tasks. Trace:

- base revision and context identity;
- worktree or branch ownership;
- commits and generated artifacts;
- tests, review, and exceptions;
- dependency and integration order;
- final composed target;
- immutable build artifact;
- deployment configuration and running identity;
- live health evidence; and
- captured rollback target.

**Evidence to keep:** end-to-end delivery trace and identity chain.

**Move on when:** every representative result is attributable and the verified
composition can be connected to the artifact actually running.

**Ways to fool yourself:** treating green branches as a green composition;
using artifact existence as identity; allowing `latest` to become release
truth; stopping the trace at merge.

## Phase 4: Attack the reward surface

Executable procedure: [Map and attack the reward
surface](procedures/attack-reward-surface.md).

**Decision:** Which visible signals can be optimized while intent remains
false?

List everything the producer can observe about success: test names, coverage,
thresholds, timings, status fields, required files, reviewer phrasing, artifact
checks, and human attention.

Try safe shortcuts:

- narrow discovery or the workload;
- weaken or replace an assertion;
- use a mock where real protocol behavior matters;
- serialize supposedly parallel work;
- attach evidence from an earlier revision;
- alter verifier configuration or thresholds;
- skip a difficult path while retaining a success summary;
- produce an artifact with the right name but wrong identity; or
- rerun only the verifier after a failure requiring an implementation change.

**Evidence to keep:** exact task, agent-visible context, shortcut, apparent
success, target revision, and independent evidence of failure.

**Move on when:** every material success signal has faced a plausible shortcut,
or the missing challenge is explicitly unproven.

**Ways to fool yourself:** blaming a model for behavior the pipeline rewards;
constructing only cartoonish attacks; deleting an embarrassing pass instead of
making it a regression fixture.

Cargo ReAPI’s early proof completed five worktrees but serialized them in three
waves, narrowed the command, and still compiled. The timing was real; the claim
was false.

## Phase 5: Separate production from acceptance

Executable procedure: [Test verification
independence](procedures/test-verification-independence.md).

**Decision:** Can the producer redefine, weaken, or approve the evidence used
to accept its own work?

Trace who authors requirements, code, tests, verifier configuration, review,
exceptions, gate changes, and final approval. Attempt controlled bypasses and
changes to the verifier.

Gate changes are changes to the meaning of success. They require independent
review and qualification, not merely a passing run after the change.

**Evidence to keep:** verification-authority graph, bypass attempts, gate-change
history, and independent review.

**Move on when:** material evidence is not controlled solely by the producer,
bypasses fail closed and remain visible, and acceptance is bound to the target
being accepted.

**Ways to fool yourself:** equating more model calls with independence; allowing
the producer to choose what the verifier can inspect; treating self-reported
absence as evidence nothing ran.

## Phase 6: Break repair and recovery

Executable procedure: [Exercise parallel integration, repair, and
recovery](procedures/exercise-recovery.md).

**Decision:** Does failure preserve intent and state, or silently reset the
problem?

Interrupt work before implementation, after partial changes, during
verification, during integration, and during a repair. Exercise retries,
reassignment, human takeover, scheduler restart, and repeated rejection.

Verify that:

- prior findings reach the editing path;
- a rejected verifier does not simply rerun itself;
- branch ancestry and published repairs remain intact;
- attempts, context, sessions, approvals, and unaffected work survive resume;
- duplicate side effects do not occur; and
- the final composition is reverified after recovery.

**Evidence to keep:** state transitions, persistent records, commit ancestry,
repair receipts, and final-target verification.

**Move on when:** recovery resumes from explicit durable state and cannot
discard inconvenient findings or approvals.

**Ways to fool yourself:** testing only a fresh restart; calling destructive
reset recovery; verifying the repaired branch but not the final composition.

## Phase 7: Break release and rollback

Executable procedure: [Trace release identity and exercise
rollback](procedures/exercise-release.md).

**Decision:** Does the verified composition become the running artifact, and
can failure return to a known-good state?

Build from the verified commit. Record an immutable artifact digest or
commit-derived identity. Capture the running known-good artifact before
rollout. Deploy the selected artifact, verify a consequential live path, and
exercise a failed rollout or safe equivalent.

For multi-service systems, verify that every service and runtime consumer uses
the intended pinned identity. A single pinned server does not help if another
control component rewrites workers to a mutable tag.

**Evidence to keep:** commit-to-artifact mapping, deployment inputs, running
identity, health receipts, rollback identity, and recovery result.

**Move on when:** the deployed artifact matches the verified target, health
checks prove more than process existence, and failure restores the captured
known-good version.

**Ways to fool yourself:** using `latest` as release truth; rebuilding a
different image under the same label; checking only `/healthz`; writing rollback
instructions without resolving the previous artifact.

Bro’s core-service release model uses service plus commit as identity,
materializes immutable images, captures the current deployment before rollout,
checks live SSR behavior, and rolls back failed deployment, health, or smoke
stages.

## Phase 8: Install the authority gate

Executable procedure: [Select, install, and prove the delivery
gate](procedures/install-authority-gate.md).

**Decision:** Which observed delivery failure should become permanently
rejectable?

Select a material failure from the prior phases. Agree the bad and valid
fixtures before changing the pipeline. Implement the smallest independently
governed boundary.

Repeat both fixtures. Inspect the final target, evidence provenance, bypass
behavior, released artifact, valid-work path, and rollback.

**Evidence to keep:** [intervention record](../shared/intervention.md),
before-and-after receipts, reviewed gate, bypass results, and authority owner.

**Move on when:** the preserved bad result passes before and fails after; valid
work still succeeds; the producer cannot silently disable or self-approve the
gate.

**Ways to fool yourself:** adding another reviewer without changing evidence
authority; proving a gate only on synthetic work; accepting a corrected summary
without rerunning the relevant path.

## Phase 9: Grant only the authority earned

Executable procedure: [Grant only the agent authority
earned](procedures/grant-authority.md).

Apply the completion rule claim by claim. State:

- tasks, repositories, tools, models, environments, and release paths covered;
- failure modes demonstrated;
- authority the pipeline may now exercise;
- failed, blocked, excluded, and unproven boundaries;
- additional evidence required for greater autonomy; and
- the person who owns residual risk.

The operator and engineering owner sign separately using the [assurance
sign-off](../shared/sign-off.md).

One successful qualification is not evidence that arbitrary future work is
safe. It is evidence for the named authority boundary.

## Practitioner references

- [Procedure coverage map](procedures/)
- [Technical controls and order](index.md)
- [Cargo ReAPI worked example](examples/cargo-reapi.md)
- [Evidence record](../shared/evidence-record.md)
- [Finding record](../shared/finding.md)
- [Blocked-finding record](../shared/blocked-finding.md)
- [Worked acceptance outcomes](../shared/acceptance-examples.md)
