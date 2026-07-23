# Assurance Playbooks

Software is now easier to produce than it is to trust.

A founder can turn an idea into a working application without first building
an engineering organization. A team can run several coding agents at once and
merge changes faster than anyone can read them. A mature codebase can acquire
new features, tests, and confident explanations while the people accountable
for it become less certain what the system will do under pressure.

The answer is not to distrust AI-generated software. It is to stop treating
successful production as evidence of successful verification.

These playbooks are practical methods for answering two questions:

- **What does this software actually deserve to be trusted to do?**
- **What does our delivery system actually prove before it accepts agent-made
  work?**

They are open for teams to use without us. The method is public because an
assurance method that cannot be inspected would contradict its own purpose.

## Start with the situation

Choose [Codebase Assurance](content/codebase-assurance/) when the concern is the
software itself:

- a product created or heavily extended with AI is now handling customers,
  revenue, sensitive data, or consequential operations;
- the tests pass, but failures keep appearing in behavior the tests seemed to
  cover;
- an acquisition, enterprise customer, migration, launch, or reliability
  decision needs evidence rather than reassurance;
- the implementation is large enough that nobody can confidently explain all
  of it; or
- the team cannot distinguish material risk from accumulated technical
  ugliness.

Choose [Agentic Delivery Assurance](content/agentic-delivery-assurance/) when
the concern is how new software gets accepted:

- agent throughput has outrun meaningful review;
- implementation, tests, evidence, and completion summaries are controlled by
  the same producer;
- parallel branches or worktrees are individually green, but the integrated
  result is difficult to reconstruct;
- repair runs, retries, or handoffs lose findings and prior state;
- a passing artifact may not belong to the revision that is deployed; or
- the organization wants to grant agents more authority but cannot name the
  boundary that makes that safe.

Some organizations need both. A sound pipeline does not prove an inherited
codebase is correct. A strong codebase does not prove that tomorrow’s
agent-written change will be specified, composed, verified, released, and
recovered safely.

## What assurance changes

Ordinary engineering asks, “Did the implementation pass the available checks?”

Assurance asks:

1. **What consequential result are we relying on?**
2. **What cheaper result could look successful while that result is false?**
3. **Who controls the evidence used to tell the difference?**
4. **Can another person reproduce the observation against the same target?**
5. **What happens when the check, agent, dependency, integration, or deployment
   fails?**
6. **Which bad result will the system reject after this work that it accepted
   before?**

This produces a different kind of engagement and a different kind of internal
review. The work begins with a decision, not a repository scan. It follows a
claim through design, implementation, tests, real boundaries, integration,
deployment, and recovery. It actively looks for ways a polished result could
be wrong. It leaves behind one demonstrated rejection boundary rather than
only a report.

The result is bounded. Assurance does not certify an entire company, assign a
magic safety score, or promise that unknown software is bug-free. It states
what the evidence supports, what it contradicts, what could not be observed,
and what remains outside the claim.

## Three lessons from real systems

These methods were extracted from work we actually performed, not designed as
a greenfield compliance framework.

### Moria: contradictions are cheaper to find before code

[Moria](https://github.com/TamedTornado/moria) is a Rust/Bevy voxel-world
substrate built through a highly parallel agent pipeline. Its product interview
established a hard boundary: the reusable substrate was the product; the
walkable executable was a public-interface validation consumer, not a
privileged demo.

Before implementation, a hostile review of the technical design found
contradictions that locally plausible code would have preserved:

- water was represented as occupied while movement treated water as non-solid;
- required visual diagnostics could not be built through the public observation
  interface;
- the reusable library’s load protocol depended on a state owned by the demo;
- a two-frame visible-edit promise was measured from a later internal event
  rather than the user action; and
- a declared graphics-memory target had no measurement capable of proving it.

The valuable artifact was not a count of findings. It was a corrected,
traceable contract that stopped several teams of agents from implementing
different reasonable interpretations.

### Cargo ReAPI: a real pass can still prove the wrong thing

[Cargo ReAPI](https://github.com/TamedTornado/cargo-reapi) was built to make
massively parallel Rust agents practical. An early proof appeared to meet the
headline five-worktree timing target. The timings were real and the producing
agent had been given careful instructions.

The proof was still wrong. Five logical gates ran in three serialized waves
behind a two-process cap. The workload was narrower than the required quality
gate, and cacheable compiler work still occurred. The run optimized the visible
proxy rather than the intended result.

The corrected qualification fixed the workload identity, prohibited hidden
serialization, required every consumer to overlap, deleted producer state,
started consumers empty, observed compiler and linker activity outside the
system under test, and failed closed on missing or mismatched receipts. When a
verifier defect was later found, the verifier was repaired and the
qualification rerun. Old evidence was not relabelled.

### Bro: delivery continues after an agent says “done”

[Bro](https://github.com/TamedTornado/Bro) runs supervised agent workflows
through planning, implementation, verification, repair, integration, and
release. Its harder assurance problems are not model benchmarks. They are
state and identity problems:

- Does a rejected verification enter an editing repair path rather than merely
  rerun the verifier?
- Does a second repair retain the first repair’s branch ancestry and findings?
- Does a resumed DAG preserve attempts, context, sessions, and completed work?
- Does the final verification exercise the composed target rather than green
  component branches?
- Is the deployed image identified by service and commit rather than `latest`?
- Can a failed rollout return to a captured known-good image?

This extends Agentic Delivery Assurance beyond prompts and CI. The system under
review runs from intent to the artifact in production and through recovery.

## Choose a playbook

| | Codebase Assurance | Agentic Delivery Assurance |
| --- | --- | --- |
| **Object under review** | A consequential product or system | The machinery that turns agent tasks into released software |
| **Decision supported** | What can we rely on this software to do, and what must change before a specific decision? | What agent-produced work can this pipeline accept, release, and recover without unsupported trust? |
| **Starting point** | User/business consequence, product boundary, and explicit non-goals | Representative tasks, authority, state transitions, evidence, and release path |
| **Typical counterexample** | A plausible implementation or mock passes the suite while violating the real product claim | The producer satisfies visible checks with narrowed work, stale evidence, lost state, or the wrong artifact |
| **Durable change** | A demonstrated gate on a high-risk product path | An independently governed gate on a high-risk delivery path |
| **Detailed example** | [Moria](content/codebase-assurance/examples/moria.md) | [Cargo ReAPI](content/agentic-delivery-assurance/examples/cargo-reapi.md) |

Start with the playbook overview. It is written for the engineering leader who
owns the decision. Open the field guide when someone is ready to perform the
work. The controls and record templates are reference material, not required
vocabulary for understanding the offer.

## The shared method

Both playbooks use the same seven moves:

1. **Name the decision.** State what someone needs to decide and which failure
   would change that decision.
2. **Define “done” before seeing the result.** Pin the target, claims,
   evidence, reject conditions, dependencies, and completion rule.
3. **Follow the real path.** Observe the actual product or delivery system from
   input to consequence, including composition and recovery.
4. **Search for the cheaper imitation.** Construct a plausible result that
   passes visible checks while the important claim is false.
5. **Preserve what happened.** Keep failed and superseded evidence, separate
   observation from inference, and bind evidence to its target.
6. **Change one acceptance boundary.** Install or harden a gate that rejects a
   material preserved failure.
7. **Prove and bound the result.** Show the bad fixture now fails, a valid
   fixture still passes, bypasses are controlled, and residual risk is owned.

This is not a linear checklist in which activity earns a pass. A failed result
remains failed. A missing required observation remains unproven or becomes an
evidenced blocked finding. `Not applicable` needs a rationale tied to the
decision. Silence never becomes confidence.

## What you can expect to have

The exact artifacts vary with the system, but a complete application of either
method produces:

- a decision and scope record written before execution;
- a map from consequential claims to possible counterexamples;
- a reproducible baseline tied to immutable targets and environments;
- evidence that distinguishes observed fact, interpretation, and limitation;
- findings tied to reachable technical and organizational consequences;
- an explicit account of failed, blocked, excluded, and unproven claims;
- one installed or materially hardened gate;
- comparable before-and-after proof using bad and valid fixtures; and
- a human sign-off that states what authority the evidence actually earned.

## Use the methods yourself

For a leader deciding where to begin:

- [Codebase Assurance overview](content/codebase-assurance/)
- [Agentic Delivery Assurance overview](content/agentic-delivery-assurance/)

For an operator performing the work:

- [Codebase Assurance field guide](content/codebase-assurance/field-guide.md)
- [Agentic Delivery Assurance field guide](content/agentic-delivery-assurance/field-guide.md)

For copyable engagement records:

- [Acceptance criteria](content/shared/acceptance-criteria.md)
- [Evidence record](content/shared/evidence-record.md)
- [Finding record](content/shared/finding.md)
- [Blocked-finding record](content/shared/blocked-finding.md)
- [Intervention record](content/shared/intervention.md)
- [Assurance sign-off](content/shared/sign-off.md)
- [Worked acceptance outcomes](content/shared/acceptance-examples.md)

For reviewers extending the standard:

- [Shared assurance protocol](content/shared/protocol.md)
- [Codebase Assurance controls](content/codebase-assurance/index.md)
- [Agentic Delivery Assurance controls](content/agentic-delivery-assurance/index.md)

## What “open” means

The public method is intended to be sufficient for a capable team to apply.
There is no hidden set of acceptance rules. If a required step is missing, the
correct response is to improve the public playbook.

The hard part is not access to the checklist. It is judgment: choosing claims
that matter, understanding where a system can imitate success, designing
representative experiments, interpreting conflicting evidence, making a safe
intervention, and accepting residual risk on behalf of an organization.

The Markdown is the product. TypeScript validates metadata, relationships,
links, and the public commercial-content boundary; it does not run an
engagement or declare a system safe.

This repository is a working draft at `0.1.0`. TypeScript code is Apache-2.0.
Method prose, templates, and examples are CC BY 4.0. See `LICENSE-CODE` and
`LICENSE-CONTENT`.
