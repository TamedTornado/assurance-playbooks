# Codebase Assurance field guide

This guide is for the person performing the work. It is intentionally usable
without Tamed Tornado. The hard parts are left visible rather than hidden
behind an automated score.

## Before you begin

Choose one accountable decision owner and one technical operator. Pin the
target revision. Agree where evidence may be stored and who can see it. Do not
begin by running every available scanner: that produces activity before the
engagement has decided what matters.

Create an engagement record using the shared [assurance
protocol](../shared/protocol.md). Every claim and control will eventually be
marked pass, fail, blocked, not applicable, or unproven.

Before collecting evidence, complete the shared [acceptance
criteria](../shared/acceptance-criteria.md) with the decision owner. Pin the
decision, scope, target, participants, required evidence, accept and reject
conditions, gate demonstration, completion rule, and escalation rule. This is
what prevents the meaning of completion from changing after the results are
known.

## Phase 1: Frame the stakes

**Purpose:** Decide which system claims are consequential enough to test.

Ask the decision owner what failure would change a business decision. Trace
each answer to an observable technical claim. “Reliable payments” is not yet a
claim; “a retried confirmation cannot charge the same order twice” is.

For each claim, record the owner, affected users or operations, plausible
failure, boundary, assumptions, and evidence that could falsify it. Rank claims
by consequence, reachability, uncertainty, and evidence cost.

**Artifacts:** Claim map and agreed acceptance criteria.

**Exit condition:** The decision owner agrees that the selected claims express
the important consequences and that exclusions are explicit.

**Common self-deception:** Deriving the scope from tests that already exist.
Existing tests reveal what previous engineers measured, not what the business
currently needs to know.

Technical control: [Map consequential claims](controls/claim-map.md).

## Phase 2: Establish the baseline

**Purpose:** Make the relevant behavior independently observable before making
claims about it.

Start from a clean checkout at the pinned revision. Record toolchains,
generated inputs, external services, feature flags, configuration interfaces,
cache state, and commands. Exercise the smallest real path that reaches each
selected claim.

Preserve failures. Do not repair the environment until the original state has
been recorded. Distinguish a product failure from missing access or an
unavailable dependency. When the pre-agreed escalation attempts are exhausted,
use a [blocked-finding record](../shared/blocked-finding.md); do not substitute
a mock and call the original claim passed.

**Artifact:** Reproduction receipt and baseline evidence records.

**Exit condition:** Another engineer can repeat the agreed path, or the exact
blocker and its consequence are documented.

**Common self-deception:** Calling a development mock or reduced local command
“representative” without identifying which production behavior it removes.

Technical control: [Establish a reproducible
baseline](controls/reproducible-baseline.md).

## Phase 3: Search for counterexamples

**Purpose:** Find evidence that can distinguish the required system from a
plausible but incorrect one.

Pressure state transitions, retries, concurrency, malformed inputs, stale
data, partial writes, dependency failure, startup, shutdown, recovery, and
resource limits where they touch the selected claims. Use the real composition
when a claim crosses modules or services.

Introduce controlled defects or semantic mutations where safe. Observe whether
the current tests and gates reject them. A test that executes changed code but
cannot distinguish correct from incorrect behavior is coverage, not assurance.

**Artifacts:** Counterexample set, claim-to-test matrix, and immutable evidence
records.

**Exit condition:** Each selected claim has been challenged by at least one
credible falsification attempt, or is explicitly unproven.

**Common self-deception:** Treating test volume, snapshot churn, or an
architecturally plausible implementation as evidence of the claim.

Technical controls: [Pressure architectural
invariants](controls/invariant-pressure.md), [Measure verification
strength](controls/verification-strength.md), and [Verify dependency
boundaries](controls/dependency-boundaries.md).

## Phase 4: Exercise operational reality

**Purpose:** Determine whether important failures are visible, contained, and
recoverable through the interfaces an operator actually has.

Exercise the relevant dependency loss, timeout, corruption, overload, process
interruption, or partial state. Observe logs, metrics, traces, alerts, rollback,
and business-state consequences. Recovery must be demonstrated; it cannot be
inferred from a catch block.

**Artifacts:** Failure matrix and recovery receipts.

**Exit condition:** Material failure behavior is demonstrated or recorded as
unproven with its operational consequence.

**Common self-deception:** Calling an error observable because it appears in a
developer log after the consequential state has already diverged.

Technical control: [Exercise operational
failure](controls/operational-failure.md).

## Phase 5: Converge on findings

**Purpose:** Turn observations into decisions without overstating the evidence.

For every failed control, create a [finding
record](../shared/finding.md). Separate the observed fact from the inferred
cause and business consequence. Assign severity from impact and reachability;
assign confidence from evidence quality.

Actively search for counterevidence. Record what new observation would change
the conclusion. A finding that cannot be falsified is a position, not an
assurance result.

**Artifacts:** Findings register and control-status matrix.

**Exit condition:** Every failed, blocked, and unproven control has an explicit
consequence and owner.

**Common self-deception:** Using severe language to compensate for weak
reproduction or incomplete access.

## Phase 6: Install the assurance gate

**Purpose:** Leave behind a durable capability rather than only a report.

Select one agreed high-risk path where better evidence changes a real decision.
Preserve the failing example or construct a controlled equivalent. Define both
the rejection fixture and a valid-success fixture before changing the system.

Implement the smallest useful gate: an integration test, invariant checker,
replay harness, deployment check, or operational sentinel. Run the same
comparison before and after. Test that the failure is rejected and required
behavior still passes.

**Artifacts:** [Intervention record](../shared/intervention.md), reviewed gate,
execution receipts, and rollback instructions.

**Exit condition:** An independent human approves the comparable before-and-
after evidence and the stated boundary of the gate.

**Common self-deception:** Rewriting the test so the new implementation passes
without preserving the failure that justified the intervention.

Technical control: [Install and prove the assurance
gate](controls/proven-gate.md).

## Phase 7: Sign off without erasing uncertainty

**Purpose:** Give the decision owner an honest basis for action.

Summarize supported, contradicted, blocked, excluded, and unproven claims.
Identify the installed gate, its owner, and what it does not cover. State the
next most valuable interventions without pretending they were completed.
Apply the pre-agreed completion rule row by row. A completed engagement record
may contain failed or blocked claims; those statuses cannot be averaged into a
passing system verdict.

**Artifact:** [Human assurance sign-off](../shared/sign-off.md).

**Exit condition:** The operator and decision owner separately accept the
evidence record and residual risk.

**Common self-deception:** Translating “the agreed work is complete” into “the
system is safe.”
