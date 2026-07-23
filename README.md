# Assurance Playbooks

Software can look finished long before it deserves to be trusted.

A product runs in a demo. The test suite is green. The architecture is
plausible. An agent reports that every requirement has been implemented.
Perhaps all of those statements are true. None of them, by itself, establishes
that the system will preserve the outcome its users and owners depend on.

Assurance is the work of closing that gap. It starts by identifying the claims
that matter, then collecting evidence capable of showing those claims are
false. It preserves counterexamples instead of explaining them away, separates
observation from inference, and turns the most valuable discovery into a
durable gate.

This repository contains two open methods for doing that work:

- [Codebase Assurance](content/codebase-assurance/) examines a consequential
  product and establishes what its implementation and evidence actually
  support.
- [Agentic Delivery Assurance](content/agentic-delivery-assurance/) examines
  the system that turns agent tasks into accepted software and establishes
  whether its completion signals deserve confidence.

They address different objects, but use the same discipline: define the
intended result, search for cheaper imitations, observe the real system, and
make acceptance depend on evidence the producer does not control.

## Why these playbooks exist

AI has made producing software much cheaper. It has not made understanding the
result proportionally cheaper.

A founder can now build a useful application before acquiring the engineering
organization that would traditionally have designed, reviewed, and operated
it. An established team can run several coding agents in parallel and produce
changes faster than its existing review process can absorb. In both cases,
output grows faster than confidence.

The usual response is to add more tests, another reviewer, a larger model, or a
longer prompt. Those may help, but they do not answer the central question:
**what evidence distinguishes the result we need from a result that merely
satisfies the visible checks?**

That distinction matters because both people and agents optimize the acceptance
surface they are given. A system can pass every test while exercising the
wrong workload. It can produce five apparently parallel results by quietly
serializing the work. It can replace a difficult integration with a mock,
weaken an assertion, accept an artifact from the wrong revision, or recover
from an interrupted task while losing the finding that caused the repair.

These playbooks provide a repeatable way to find those gaps without treating
test volume, agent confidence, or architectural taste as proof.

## The common assurance model

Both playbooks move through the same chain:

1. **Claim** — State something consequential that the product or delivery
   system is expected to preserve.
2. **Counterexample** — Describe a plausible way the visible success signal
   could be satisfied while the claim is false.
3. **Evidence** — Observe the real system under a pinned revision and recorded
   environment. Preserve provenance and limitations.
4. **Finding** — Separate what was observed from what is inferred. Connect the
   result to a reachable consequence.
5. **Intervention** — Select one high-value boundary and change what the system
   is capable of accepting.
6. **Gate** — Demonstrate that the preserved failure is now rejected while
   required behavior still succeeds.
7. **Sign-off** — State what the evidence supports, what remains unknown, and
   which authority the result has actually earned.

The method does not produce a universal safety score. Every conclusion is
bounded by its target revision, environment, scope, evidence, and explicitly
recorded residual risk.

## Choose the playbook

| | Codebase Assurance | Agentic Delivery Assurance |
| --- | --- | --- |
| **Object under review** | The product and the claims its users or owners depend on | The delivery system that turns agent tasks into accepted changes |
| **Typical concern** | “This works, but we do not know where it is fragile or what the tests really establish.” | “We are producing agent-written work faster than we can confidently verify it.” |
| **Starting point** | Business consequences, product boundaries, runtime behavior, and existing verification | Task contracts, context, authority, parallel work, integration, verification, recovery, and human acceptance |
| **Adversarial question** | “What plausible implementation would pass the current checks while violating the product claim?” | “How can the producer maximize visible success without completing the intended work?” |
| **Durable result** | A gate on an agreed high-risk product path | An independently governed rejection gate in the delivery pipeline |
| **Worked example** | [Moria](content/codebase-assurance/examples/moria.md) | [Cargo ReAPI](content/agentic-delivery-assurance/examples/cargo-reapi.md) |

Some organizations need both. A strong delivery pipeline cannot establish that
an inherited product already behaves correctly. A well-tested codebase cannot
establish that new agent-written changes are being specified, integrated, and
accepted safely.

## Codebase Assurance

[Codebase Assurance](content/codebase-assurance/) is for a product that has
become too consequential to trust on appearance alone.

It begins with the things that must be true for customers, operations, revenue,
security, or a pending decision. Those expectations are translated into
observable claims. The relevant system is reproduced at a pinned revision, and
the claims are challenged through real boundaries: state transitions, retries,
concurrency, malformed inputs, external dependencies, partial failure,
recovery, and plausible incorrect implementations.

The result is not a list of everything an engineer might prefer to change. It
is a claim map, reproducible evidence, findings tied to consequences, explicit
unknowns, and one installed or materially hardened assurance gate demonstrated
against comparable before-and-after evidence.

Start with the [human overview](content/codebase-assurance/). To perform the
method, use the [Codebase Assurance field
guide](content/codebase-assurance/field-guide.md). The detailed control records
sit underneath it as technical reference.

## Agentic Delivery Assurance

[Agentic Delivery Assurance](content/agentic-delivery-assurance/) is for a team
whose ability to produce agent-written changes is beginning to exceed its
ability to verify them.

It treats the whole delivery path as the system under review. That includes the
task contract, instructions and retrieved context, tool and secret authority,
worktree or branch isolation, parallel dependencies, tests, verifier
governance, integration, retries, repairs, and the human acceptance decision.

The operator maps the signals an agent can observe about success and then tries
to satisfy those signals without satisfying intent. A useful result does not
merely identify the weakness. It preserves a material failure as an adversarial
fixture, changes the acceptance boundary, and demonstrates that the bad result
is rejected while valid work continues to pass.

Start with the [human overview](content/agentic-delivery-assurance/). To perform
the method, use the [Agentic Delivery Assurance field
guide](content/agentic-delivery-assurance/field-guide.md).

## A concrete example: the proof that was not proof

Cargo ReAPI was built to make massively parallel Rust agent work more
efficient. An early agent-produced qualification appeared to meet the headline
five-worktree timing target. The numbers were real, and the agent had been
given detailed, deliberate instructions.

The proof was still wrong.

Five logical gates had been placed behind a two-process admission cap,
producing three serialized waves. The run also exercised a narrower workload
and continued to perform cacheable compiler actions. It optimized the measured
proxy while violating the intended requirement: simultaneous complete quality
gates with zero warm compiler or linker work.

The failure was caught because the agent’s `PASS`, timing, and self-reported
action count were not treated as the evidence. The corrected qualification
required the intended command, all members to overlap, empty consumer targets,
no admission caps, and independent operating-system observation of compiler
and linker activity. A verifier defect discovered later caused the
qualification to be repaired and rerun rather than retroactively accepted.

The lesson is not that a particular model or prompt was weak. It is that strong
agents and good prompts still require a verification boundary that measures
the intended outcome rather than the cheapest visible proxy.

Read the complete [Cargo ReAPI worked
example](content/agentic-delivery-assurance/examples/cargo-reapi.md).

## What “open” means here

These playbooks are not promotional summaries or a funnel leading to a hidden
method. The procedures, evidence standards, acceptance rules, templates,
control definitions, and public examples are intended to be sufficient for a
capable team to use on its own.

You may copy the templates, adapt the controls, apply the field guides, and
challenge the methods. If an important step is missing, the correct response is
to improve the public playbook rather than reserve it as consulting secret
sauce.

What remains irreducibly difficult is judgment:

- identifying which claims are consequential rather than merely measurable;
- designing adversarial experiments for the actual system;
- deciding whether evidence is representative and independently repeatable;
- distinguishing a material finding from noise;
- implementing an intervention without invalidating the comparison;
- and accepting the residual risk on behalf of the organization.

The lightweight validation code in this repository checks structure,
relationships, and links. It does not choose controls, run an engagement,
assign severity, produce findings, or declare a system safe.

## How to use this repository

### If you are deciding whether the methods apply

Read the two human overviews:

- [Codebase Assurance](content/codebase-assurance/)
- [Agentic Delivery Assurance](content/agentic-delivery-assurance/)

Each explains the symptoms, process, participation, and durable result without
requiring the technical control vocabulary.

### If you want to perform the work

Use the field guides:

- [Codebase Assurance field guide](content/codebase-assurance/field-guide.md)
- [Agentic Delivery Assurance field guide](content/agentic-delivery-assurance/field-guide.md)

Each phase describes its purpose, procedure, artifact, exit condition, and
common forms of self-deception. The guides link to the detailed controls only
where that precision becomes useful.

### If you are reviewing or extending the standard

Read the shared [assurance protocol](content/shared/protocol.md) and the
technical method records:

- [Codebase Assurance controls](content/codebase-assurance/index.md)
- [Agentic Delivery Assurance controls](content/agentic-delivery-assurance/index.md)

Changes to the method should preserve stable relationships between claims,
evidence, findings, interventions, and sign-off. Adding activity without
changing what can be established is not an improvement.

### If you are an agent

Begin with this overview and the relevant field guide. Use the linked controls
as bounded reference material. Do not infer a passing conclusion from missing
records, silently convert blocked work into not applicable, or approve evidence
produced under your own authority.

## Shared records

Both methods use the same public standards:

- [Assurance protocol](content/shared/protocol.md) — statuses, provenance,
  independence, interventions, and completion.
- [Evidence record](content/shared/evidence-record.md) — how observations are
  collected, identified, limited, and preserved.
- [Finding record](content/shared/finding.md) — how observed fact is separated
  from inference, severity, and confidence.
- [Intervention record](content/shared/intervention.md) — how before and after
  evidence is kept comparable.
- [Human sign-off](content/shared/sign-off.md) — how completion and residual
  risk are accepted without claiming universal safety.

## Repository status

This is a working draft, currently marked `0.1.0`. The human overviews and
field guides are being reviewed before the technical control shape is treated
as stable.

The Markdown is the product. TypeScript currently exists only to reject broken
metadata and links and to produce deterministic machine-readable exports.

TypeScript code is Apache-2.0. Method prose, templates, and examples are
CC BY 4.0. See `LICENSE-CODE` and `LICENSE-CONTENT`.
