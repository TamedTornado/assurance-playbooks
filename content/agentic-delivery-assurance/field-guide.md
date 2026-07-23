# Agentic Delivery Assurance field guide

This guide is for the person assessing and hardening an agentic delivery
system. It does not assume a specific model, framework, or orchestrator.

## Before you begin

Name one accountable engineering owner and one independent operator. Select
representative tasks and pin every relevant repository revision. Preserve agent
prompts, context inputs, tool authority, produced artifacts, verification
results, and human decisions according to the shared [assurance
protocol](../shared/protocol.md).

Do not begin by comparing model scores. The object under review is the delivery
system’s ability to distinguish acceptable work from plausible imitation.

Before running representative tasks, complete the shared [acceptance
criteria](../shared/acceptance-criteria.md). Agree the target delivery system,
claims, task samples, required provenance, reject conditions, independently
governed gate demonstration, completion rule, and escalation rule before the
producer can optimize against them.

## Phase 1: Define the delivery contract

**Purpose:** Make completion independently rejectable.

Sample routine, ambiguous, and high-risk tasks. Separate the desired outcome
from implementation suggestions. Record positive requirements, negative
constraints, prohibited shortcuts, acceptance evidence, and conditions that
require human escalation.

Ask whether a reviewer could reject a superficially plausible result without
reading the producer’s explanation.

**Artifacts:** Task-contract matrix and agreed acceptance criteria.

**Exit condition:** Material requirements have observable evidence and unknowns
have an explicit escalation path.

**Common self-deception:** Treating an agent-authored test as independent
evidence because it is executable.

Technical control: [Make the task contract
falsifiable](controls/task-contract.md).

## Phase 2: Trace context and authority

**Purpose:** Establish what each agent knows, can mutate, and can approve.

Map instruction sources and precedence, retrieved context, repository state,
tools, filesystem and network access, secrets, approval rules, and destructive
capabilities. Exercise missing, stale, and conflicting instructions.

Test safe operations outside the task boundary. Verify that enforced authority
matches the described policy rather than a prompt the producer can ignore.

**Artifacts:** Context-precedence map and authority map.

**Exit condition:** Sensitive authority is bounded and missing authoritative
context causes a visible failure or escalation.

**Common self-deception:** Confusing “the prompt tells the agent not to” with
an enforced boundary.

Technical control: [Bound context and
authority](controls/context-authority.md).

## Phase 3: Follow representative work end to end

**Purpose:** Observe what the pipeline actually accepts.

Run independent, overlapping, and dependent tasks. Trace base revisions,
worktrees or branches, ownership, artifacts, reviews, integration order, final
target revision, and acceptance evidence.

Interrupt representative work before implementation, after partial changes,
during verification, and during integration. Exercise retry, repair,
reassignment, and human takeover.

If access, representative work, or an external platform prevents a required
observation after the agreed escalation attempts, create a [blocked-finding
record](../shared/blocked-finding.md). Do not narrow the task or replace the
platform without recording that the original claim remains unproven.

**Artifacts:** Delivery trace, parallel-work map, and recovery-state map.

**Exit condition:** Work remains attributable and the final composed target is
reverified after integration or recovery.

**Common self-deception:** Treating branch success or a clean merge as evidence
that the composed product is correct.

Technical controls: [Preserve parallel-work
integrity](controls/parallel-integrity.md) and [Verify recovery
integrity](controls/recovery-integrity.md).

## Phase 4: Map and attack the reward surface

**Purpose:** Discover which visible success signals can be optimized without
satisfying intent.

List what the producer can observe: test names, thresholds, status fields,
artifact-existence checks, review language, timing targets, and likely human
attention. Construct safe shortcuts that maximize those signals.

Try narrowing test discovery, weakening assertions, replacing real boundaries
with mocks, accepting stale artifacts, serializing supposedly concurrent work,
altering thresholds, changing verifier configuration, or presenting evidence
from another revision.

Preserve the exact task, agent-visible context, produced change, apparent
success signal, and independent evidence of failure.

**Artifacts:** Reward-surface map and adversarial fixtures.

**Exit condition:** Every important completion signal has been challenged by a
plausible shortcut, or the gap is explicitly unproven.

**Common self-deception:** Blaming a particular model for behavior the delivery
contract rewards.

Technical control: [Red-team reward hacking](controls/reward-hacking.md).

## Phase 5: Establish verification independence

**Purpose:** Prevent the producer from controlling the meaning of success.

Trace who authors requirements, implementation, tests, verifier configuration,
review, and final acceptance. A second model invocation is not automatically
independent if it receives producer-selected evidence or cannot inspect the
real result.

Attempt safe bypasses and verifier changes. Check whether they fail closed,
require independent approval, and remain visible in the audit record.

**Artifacts:** Verification-authority graph and bypass findings.

**Exit condition:** Material acceptance evidence cannot be silently weakened or
approved solely by the producer.

**Common self-deception:** Calling review independent because a different agent
performed it while both agents share the same incomplete contract.

Technical control: [Enforce independent
verification](controls/independent-verification.md).

## Phase 6: Install the delivery gate

**Purpose:** Change what work can enter the trusted system.

Select one observed material failure: reward hacking, stale evidence, unsafe
authority, lost integration, or unverifiable recovery. Agree the bad fixture,
valid-success fixture, and rejection criteria before changing the pipeline.

Implement the smallest durable boundary with independent ownership. Run both
fixtures before and after. Inspect the final target, evidence provenance,
bypass behavior, valid-work path, and rollback.

**Artifacts:** [Intervention record](../shared/intervention.md), independently
reviewed gate, before-and-after receipts, and rollback instructions.

**Exit condition:** The preserved bad result passes before and fails after; the
valid result still passes without producer-controlled exceptions.

**Common self-deception:** Adding another agent, prompt, or test stage without
changing who controls the acceptance evidence.

Technical control: [Install and prove the delivery
gate](controls/proven-gate.md).

## Phase 7: Decide what authority was earned

**Purpose:** Prevent a bounded improvement from becoming an unsupported grant
of autonomy.

Record the tasks, repositories, environments, models, tools, and failure modes
covered by the demonstrated gate. List every blocked and unproven boundary.
State which additional evidence would justify greater authority.
Apply the agreed completion rule to every claim. Completion of the record does
not convert failed or blocked delivery claims into earned authority.

**Artifact:** [Human assurance sign-off](../shared/sign-off.md).

**Exit condition:** The operator and engineering owner separately accept the
evidence, residual risk, and resulting authority boundary.

**Common self-deception:** Treating one successful pipeline qualification as
proof that arbitrary future agent work is safe.
