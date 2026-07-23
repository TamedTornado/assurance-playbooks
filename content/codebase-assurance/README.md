# Codebase Assurance

Your product works. The harder question is whether it works for reasons you
understand—and whether the evidence will survive the next change.

Codebase Assurance starts with the claims your product and business actually
depend on. It tests the most consequential claims against the real system,
records what the available evidence can and cannot establish, and leaves
behind a verification gate on one agreed high-risk path.

This is not a generic code review, a test-counting exercise, or a declaration
that the entire product is safe.

## You may need this when

- AI produced a meaningful part of the codebase, but nobody can explain all of
  the decisions it contains.
- The tests are green, while releases still produce failures that the tests
  appeared to cover.
- A due-diligence, enterprise, security, or reliability question cannot be
  answered with evidence.
- The product has acquired users, revenue, sensitive data, or operational
  consequences faster than its engineering controls matured.
- You know the system is fragile but cannot distinguish urgent risk from
  accumulated ugliness.

## What exists at the end

- **A claim map.** The important things the system is expected to do, who
  depends on them, and what evidence could show they are false.
- **A reproducible baseline.** The target revision, environment, procedures,
  and artifacts needed to observe the important behavior again.
- **An evidence ledger.** Support, contradiction, uncertainty, and provenance
  kept separate from opinion.
- **A findings register.** Material problems tied to reachable consequences,
  not a bag of stylistic complaints.
- **A proven assurance gate.** One executable boundary installed or hardened
  on an agreed high-risk path and demonstrated against preserved before-and-
  after evidence.
- **A residual-risk record.** What remains blocked, unproven, excluded, or
  dependent on assumptions.

## How the method works

1. **Name what must be true.** Begin with product and business consequences,
   not with the repository’s existing tests.
2. **Make the system observable.** Pin the revision and reproduce the relevant
   path before attributing anything to the code.
3. **Try to make the claims false.** Exercise boundaries, transitions,
   dependencies, partial failure, and plausible incorrect implementations.
4. **Separate evidence from confidence theatre.** Passing counts, plausible
   architecture, and polished explanations are not treated as proof.
5. **Choose the assurance boundary.** Select the highest-value failure that can
   be turned into a durable rejection gate.
6. **Prove the intervention.** Preserve the failure, implement the gate, repeat
   the comparison, and have another human review the conclusion.
7. **State what remains unknown.** Completion does not convert missing access
   or out-of-scope behavior into confidence.

## What this asks of you

The decision owner identifies the consequences that matter, supplies access to
the real system and knowledgeable people, resolves scope decisions, and
accepts the residual risk. The method cannot infer business stakes from source
code.

The technical operator designs and runs the experiments, preserves evidence,
implements the selected gate, and distinguishes observation from inference.
The person producing a change does not approve their own assurance result.

## Use it yourself

The [field guide](field-guide.md) walks through the method phase by phase,
including the artifact created at each stage, the exit condition, and common
ways to fool yourself.

The [Moria worked example](examples/moria.md) demonstrates why some controls
can pass while the overall result remains mixed. Repository size and a strong
test history do not establish production operations or exhaustive coverage.

## Technical reference

The [method record](index.md) links the ordered controls, shared evidence
standards, templates, and example. Start there when you are ready to execute
the method rather than evaluate whether it applies.
