# Codebase Assurance

Your product works. The question is whether it works for reasons your
organization understands—and whether the available evidence will survive the
next consequential change.

Codebase Assurance is a method for examining a product that has become too
important to trust on appearance alone. It begins by reconstructing what the
client believed they commissioned, what they were told was complete, and what
they cannot independently verify. It then follows the important expectations
through the product boundary, design, implementation, tests, dependencies,
runtime behavior, and failure handling.

The purpose is not to inventory every imperfection. It is to establish what the
software deserves to be trusted to do, expose the most important unsupported
assumptions, and leave behind a gate that rejects one material failure the
system previously accepted.

## Why clients use this method

Use this method when a client needs independent visibility into:

- whether an AI-built product is actually the product they commissioned;
- whether its architecture supports the future work it was meant to enable;
- whether performance, scale, reliability, and resource claims measure the
  behavior the client was promised;
- whether a green test suite actually supports a consequential product claim;
- whether a demonstration uses the real product or privileged shortcuts;
- whether an inherited system can be operated and changed safely;
- where remediation will buy the largest increase in justified confidence; and
- what is trustworthy, contradicted, fragile, or still unknown.

The client does not need to arrive with a formal decision or read the
implementation language. “Agents built this, the demonstration works, and I
cannot tell what I really own” is a sufficient starting point.

## When this is the wrong method

This is not the first response to a known, isolated bug with a clear
reproduction. Fix the bug.

It is not a style review, architecture makeover, vulnerability scan, or
substitute for a specialist regulatory or penetration assessment. Those may
be inputs or follow-on work.

It is also not a promise to prove every behavior of a large system. The method
selects consequential claims, challenges them deeply enough to support a real
decision, and states the edge of the evidence.

## What happens in practice

### 1. Understand what was supposed to be built

The client explains what they asked for, what they believe was delivered, what
they have seen working, and what remains opaque. The conversation includes
visible behavior, performance and scale, architectural promises, prohibited
shortcuts, completion evidence, and what they expect to do next.

The operator compares that account with project material and returns a
plain-language product expectation brief for correction. Only after that is
confirmed does the operator translate it into technical questions, evidence
needs, and ways the implementation could look successful while violating an
important expectation. The client is not asked to design the investigation.

### 2. Check whether the project tells one consistent story

For each important expectation, the operator chooses a representative
consumer or operator behavior and follows it through the project material.
The question is not whether the documents look thorough. It is whether two
competent implementers could follow them and produce incompatible products.

Contradictions, undefined ownership, circular dependencies, unmeasurable
targets, and hidden privileged paths are preserved in one design consistency
review. The client receives a plain-language explanation of what conflicts,
what changed, and what remains unproven.

### 3. Reproduce the real path

The selected revision is built and exercised from documented inputs. Tooling,
configuration, generated assets, external services, cache state, and
environment differences are recorded.

A mock or reduced local command may be useful, but it cannot stand in for a
production boundary without stating what behavior it removes. If required
access cannot be obtained, the claim remains unproven or becomes an evidenced
blocked finding.

### 4. Ask the existing evidence to say “no”

Each material claim is mapped to the check that should reject a violation. The
operator introduces safe semantic mutations, malformed inputs, races, stale
state, partial failures, dependency changes, or other plausible bad
implementations.

A test that executes code but accepts the changed behavior is not evidence of
the claim. A green suite can be useful and still be incapable of detecting the
failure the decision owner cares about.

### 5. Exercise composition and operations

Important failures often live between locally correct components: retries,
duplicate delivery, authorization boundaries, generated artifacts, caches,
startup and shutdown, rollback, recovery, resource limits, and observable
business state.

The operator follows the composed system through those transitions using the
interfaces available to a real consumer or operator.

### 6. Install one useful rejection boundary

The team selects a high-value observed failure. The exact bad fixture and a
valid-success fixture are agreed before the change.

The smallest durable gate is installed or hardened: perhaps an integration
test, invariant checker, replay harness, deployment check, artifact validator,
or operational sentinel. The same bad fixture must pass before and fail after;
the valid path must continue to succeed.

### 7. Make the decision without erasing uncertainty

The final record states which claims are supported, contradicted, blocked,
excluded, or unproven. It explains what the new gate covers and what it does
not. The independent operator and decision owner sign separately.

Completion of the work does not mean the system received a blanket pass. A
completed assurance record may contain a failed or blocked claim. That is
useful information, not an engagement failure.

## A real example

[Moria](https://github.com/TamedTornado/moria) is a reusable Rust/Bevy
voxel-world substrate built through a parallel agent pipeline.

The initial product interview did something crucial: it separated the reusable
substrate from the future game. The included walkable executable was defined as
a validation consumer that had to use the same public interfaces available to
an external game. It could not own privileged world mutation or observation.
Combat, AI, dynamic fluids, and the future game layer were explicit non-goals.

A hostile review of the technical design then found contradictions that would
have produced plausible but incompatible implementations:

- water counted as occupied in one contract while movement treated it as
  non-solid;
- the demo was required to show brick and streaming diagnostics that the public
  API could not enumerate;
- the reusable library’s load operation depended on a state owned by the demo;
- the two-frame visible-edit promise was measured from an internal drain point
  rather than the user action; and
- the graphics-memory target had been replaced by a partial allocation ledger
  that could not establish the original claim.

The response was not to declare the design “mostly sound.” The contracts were
revised, unsupported claims remained visible, and a genuine design divergence
required explicit product approval. Later test specifications required
deliberately bad fixtures to fail through the ordinary test command, preventing
an unused validator from masquerading as a gate.

Read the full [Moria worked example](examples/moria.md).

## What you leave with

- **A product expectation brief.** What the client commissioned, what they were
  shown, what remains opaque, and how the project material agrees or conflicts.
- **A claim and contradiction map.** Consequential expectations, design
  conflicts, assumptions, owners, and plausible counterexamples.
- **A reproducible baseline.** The inputs, environment, commands, artifacts,
  and limitations needed to observe the important behavior again.
- **A claim-to-evidence map.** Which tests and operational checks can actually
  reject which violations.
- **An evidence and findings record.** Observations separated from inference,
  with reachability, consequence, confidence, and counterevidence.
- **A proven assurance gate.** One executable boundary demonstrated against a
  preserved bad result and a valid result.
- **A residual-risk decision.** Failed, blocked, excluded, and unproven claims
  retained rather than averaged into a score.

## What this method asks of your team

The client must explain what they expected, what they were shown, and what they
cannot verify. The operator reconstructs that account and owns its translation
into a technical investigation. A technical owner must provide the real
system, people, environments, and dependencies—or own the consequence when
those are blocked.

The operator needs freedom to preserve failed evidence, challenge existing
tests, and distinguish an uncomfortable result from incomplete work. The
person responsible for a change does not independently approve the evidence
that accepts it.

## What this method cannot tell you

It cannot establish behavior outside the named target, environment, workload,
and claim set. It cannot infer production behavior from a mock that removes the
relevant dependency. It cannot turn unavailable access into confidence. It
cannot guarantee that no undiscovered bug exists.

It also cannot make the organization’s risk decision. It can make that decision
far more explicit and defensible.

## Run it yourself

Use the [Codebase Assurance field guide](field-guide.md) to perform the method.
It is written as a sequence of questions and exercises, with practical
questions, evidence, stop conditions, and examples.

Every phase links to an [executable procedure card](procedures/) containing the
same instructions for a human operator and a copyable prompt for a supervised
agent.

Begin with the shared [acceptance criteria](../shared/acceptance-criteria.md).
Use the [Moria example](examples/moria.md) as a model for preserving
contradictions and unknowns without turning the whole project into a failure.

The [technical method record](index.md) links the detailed controls and shared
record formats. Open it when you need precision, not as a prerequisite for
understanding the method.
