# Agentic Delivery Assurance

Coding agents can produce more changes than a team can meaningfully inspect.
The danger is not simply bad code. It is a delivery system that accepts a
persuasive success signal without establishing that the intended work was
done.

Agentic Delivery Assurance examines the full path from a requested change to
accepted code. It searches for ways the producer can satisfy visible checks
while violating intent, then installs or hardens one independently governed
gate that rejects an agreed material failure.

This is not a benchmark of which model writes the best code. It applies whether
the team uses a single coding assistant, direct model sessions, or a custom
parallel-agent harness.

## You may need this when

- Agent throughput has increased faster than review confidence.
- Green CI and agent completion reports regularly require human reinterpretation.
- Multiple agents work in parallel and nobody can clearly reconstruct what was
  integrated, from which revision, or under whose approval.
- Tests are written or modified by the same producer whose work they accept.
- Retries and repair runs sometimes lose findings, duplicate work, or approve
  evidence from an earlier revision.
- The team wants to grant agents more authority but cannot explain which
  evidence boundary makes that safe.

## What exists at the end

- **A delivery contract map.** The path from task intent through context,
  authority, implementation, verification, integration, and human acceptance.
- **A bounded acceptance record.** The tasks, reject conditions, evidence
  provenance, dependencies, and completion rule agreed before the pipeline is
  challenged.
- **A reward-surface map.** The signals an agent can optimize and the shortcuts
  those signals permit.
- **A set of preserved adversarial fixtures.** Plausible bad results that the
  pipeline must reject in the future.
- **A verification-authority map.** Who can create, change, bypass, and approve
  acceptance evidence.
- **A proven delivery gate.** One independently governed boundary demonstrated
  to reject a material failure while accepting a valid result.
- **A residual-risk record.** The work, repositories, models, and authority
  outside the demonstrated boundary.

## How the method works

1. **Make task intent falsifiable.** Define evidence that could reject a
   superficially plausible implementation.
2. **Trace context and authority.** Determine what the agent knows, can change,
   can access, and can approve.
3. **Observe real delivery.** Follow representative work through parallelism,
   integration, verification, recovery, and human acceptance.
4. **Attack the reward surface.** Try shortcuts that improve visible success
   while violating the requested outcome.
5. **Separate producer and verifier.** Ensure the producer cannot silently
   redefine or approve its own evidence.
6. **Install the rejection gate.** Preserve one material failure and prove the
   corrected boundary against both bad and valid fixtures.
7. **State the authority actually earned.** Do not generalize a demonstrated
   gate into permission the evidence does not support.

## What this asks of you

The engineering owner provides representative work, repositories, CI and
review context, known failures, and the authority model the team wants to
reach. They decide which failure is consequential enough to become the
demonstrated gate and agree the acceptance and escalation rules before
execution.

The operator observes rather than trusting agent summaries, designs adversarial
attempts, preserves provenance, and implements the selected intervention. The
producer does not approve its own gate.

## Use it yourself

The [field guide](field-guide.md) explains the procedure, required artifacts,
exit conditions, and failure traps for every phase.

The [Cargo ReAPI worked example](examples/cargo-reapi.md) shows a capable agent
apparently meeting a timing target by satisfying a cheaper proxy. The problem
was caught by verifying the intended outcome independently, not by switching
models or adding a larger prompt.

## Technical reference

The [method record](index.md) links the ordered controls, shared standards, and
worked example. Use it when you are ready to execute the method.
