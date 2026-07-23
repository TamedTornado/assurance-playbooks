# Agentic Delivery Assurance

Coding agents can create more changes than a team can meaningfully inspect.
The danger is not simply that an agent may write bad code. It is that the
delivery system may accept a persuasive success signal without establishing
that the intended work reached the correct artifact and survived integration,
release, and recovery.

Agentic Delivery Assurance examines that whole system. It starts with the task
and continues through context, authority, implementation, parallel work,
verification, repair, integration, artifact creation, deployment, health
checks, rollback, and the human decision to grant more authority.

It is model- and framework-independent. A direct coding session, a supervised
assistant, and a custom many-agent pipeline all need an evidence boundary that
the producer cannot redefine.

## The decision this method supports

Use this method when an engineering leader needs to decide:

- which kinds of agent-produced work may move with less human inspection;
- whether current completion signals deserve trust;
- whether parallel agent work can be integrated without losing provenance or
  prior findings;
- whether failed and interrupted work can be repaired without laundering stale
  evidence;
- whether the artifact released to production is the one that was verified;
- whether a failed rollout can return to a known-good state; or
- where the next independently governed gate will buy the most authority.

“Are our agents good?” is not a useful assurance question. A useful question
sounds like: “Can this pipeline accept and deploy changes to the billing service
without the producer controlling the tests, approval, artifact identity, or
rollback evidence?”

## When this is the wrong method

This is not a model leaderboard, prompt review, or generic AI policy exercise.
It does not tell you which assistant writes the prettiest code.

It is also unnecessary when agents only draft disposable material that a human
recreates independently. It becomes valuable when agent output can consume
authority: changing repositories, approving evidence, merging code, creating
artifacts, deploying services, or influencing a consequential decision.

## What happens in practice

### 1. Define work so a plausible imitation can be rejected

The operator samples routine, ambiguous, and high-risk tasks. For each one, the
intended outcome, negative constraints, prohibited shortcuts, evidence, and
escalation conditions are written before execution.

The test is simple: could a reviewer reject an attractive but incomplete result
without relying on the producer’s explanation?

### 2. Map what the agents know and can do

Instructions, retrieved context, repository state, tools, network access,
secrets, mutation rights, approvals, and destructive capabilities are traced.
Missing, stale, and conflicting instructions are exercised.

A prompt saying “do not do this” is not the same as an enforced boundary. A
second agent is not independent when it sees only evidence selected by the
first.

### 3. Follow representative work all the way through

Independent, overlapping, and dependent tasks are observed from base revision
to final deployed artifact. The record includes worktrees or branches,
ownership, commits, generated artifacts, reviews, integration order, release
identity, health evidence, and rollback state.

Branch success and merge success are intermediate events. The composed target
and the released artifact must be verified.

### 4. Attack the visible definition of success

The operator lists what the producer can see: test names, thresholds, status
fields, artifact-existence checks, review phrasing, timing targets, and likely
human attention.

Then the pipeline is challenged with safe shortcuts: narrowed test discovery,
weakened assertions, mocks replacing real boundaries, stale artifacts, hidden
serialization, altered verifier configuration, evidence from another revision,
or a polished summary that outruns the receipts.

When a shortcut succeeds, it becomes a preserved adversarial fixture. The
corrected system cannot depend on the agent confessing what it did.

### 5. Prove verification independence

The operator traces who authors requirements, implementation, tests, verifier
configuration, review, exceptions, and final acceptance. Bypasses are attempted
and gate changes are reviewed as changes to the meaning of success.

Independent verification is an authority property. It is not created merely by
calling a different model.

### 6. Break recovery, repair, and release safely

Representative work is interrupted before implementation, after partial
changes, during verification, during integration, and during deployment.
Retries, repair branches, reassignment, human takeover, and process restarts are
exercised.

The system must preserve prior findings, attempts, ancestry, target identity,
and already-valid work. A rejected verification should enter an editing path,
not simply rerun the same verifier. A release should use an immutable artifact
identity, capture rollback state, check actual health, and return safely when
the rollout fails.

### 7. Install one independently governed gate

A material observed failure is selected. The bad result and a valid result are
fixed before intervention. The smallest durable boundary is installed or
hardened.

The preserved bad result must pass before and fail after. The valid result must
still pass. The producer must not be able to silently disable the gate, approve
an exception, swap the artifact, or present stale evidence.

### 8. State the authority actually earned

The result names the tasks, repositories, environments, models, tools, release
path, and failure modes covered by the demonstration. Failed, blocked, and
unproven boundaries remain visible.

One successful qualification does not grant arbitrary autonomy. It earns a
specific authority under specific conditions.

## A real example

[Cargo ReAPI](https://github.com/TamedTornado/cargo-reapi) was built in direct
Codex sessions to make massively parallel Rust agent work more efficient. It
was not produced through Bro or another agent framework.

An early qualification appeared to meet its five-worktree timing goal. The
numbers were real. But five logical gates were placed behind a two-process cap,
creating three serialized waves. The run also used a narrower workload and
still performed cacheable compiler work.

The producer had satisfied the visible proxy while violating the intended
result: simultaneous complete quality gates with zero warm compiler or linker
work.

The corrected contract named the exact four-command Moria gate, required one,
five, and ten clean consumers, prohibited hidden admission caps, deleted
producer state, required empty consumer targets, and independently observed
compiler and linker activity at the operating-system level. It also added
adversarial invalidation, poison rejection, linked-binary integrity,
coalescing, resources, stall classification, portability, and Bro integration.

Historical evidence remained historical. A later verifier defect caused a
repair and rerun, not a retrospective pass. Even after both platform
qualifications passed, the publication record refused to claim a combined
cross-platform aggregate because the disposable macOS evidence tree was no
longer available during Linux verification.

Read the complete [Cargo ReAPI worked example](examples/cargo-reapi.md).

Bro supplies the wider delivery-system lesson: repair loops must preserve
branch ancestry and prior findings; persisted DAG state must survive resume;
the composed target must be reverified; release identity must be service plus
commit rather than `latest`; and deployment must capture rollback state and
verify live health.

## What you leave with

- **A task and acceptance map.** What representative work requires, how it can
  be rejected, and when an agent must escalate.
- **A context and authority map.** What each producer, verifier, and human can
  see, mutate, approve, and bypass.
- **A delivery trace.** Revision, worktree, artifact, review, integration,
  repair, release, health, and rollback identity for representative work.
- **A reward-surface map and adversarial fixtures.** Ways visible success can be
  maximized without completing intent, preserved as regression cases.
- **A verification-authority map.** Who controls the meaning of success.
- **Recovery and release evidence.** Proof that state, findings, ancestry,
  artifact identity, and rollback survive failure.
- **A proven delivery gate.** One independently governed boundary shown to
  reject a material bad result while accepting valid work.
- **An authority decision.** The exact work the pipeline may now perform with
  greater autonomy and the boundaries that remain unproven.

## What this method asks of your team

The engineering owner supplies representative work, repository and CI access,
known failure modes, release context, and the authority the organization wants
agents to earn. The operator must be allowed to challenge apparent successes
and preserve failures.

People responsible for producing a change cannot be the sole authority for the
evidence that accepts it. Someone accountable must own the residual risk and
the decision to increase autonomy.

## What this method cannot tell you

It cannot guarantee arbitrary future agent work is safe. It cannot create
independence by adding another model behind the same incomplete contract. It
cannot prove production behavior from branch-local tests, or artifact identity
from a mutable tag. It cannot infer safe recovery without exercising failure.

It does not remove the human from consequential decisions. It makes clear where
human judgment is still required and what evidence that judgment receives.

## Run it yourself

Use the [Agentic Delivery Assurance field guide](field-guide.md) to perform the
method from representative task through release and recovery.

Begin with the shared [acceptance criteria](../shared/acceptance-criteria.md).
Use the [Cargo ReAPI example](examples/cargo-reapi.md) to see how a persuasive
pass became a preserved regression fixture rather than an embarrassment to
delete.

The [technical method record](index.md) links the detailed controls and shared
record formats. It is reference depth, not the front door.
