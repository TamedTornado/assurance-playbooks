# Assurance Playbooks

Good software work is not established by a green checkmark or an agent saying
it is finished. It is established by evidence that distinguishes the result
you need from a plausible result that only looks right.

This repository publishes two methods for building that evidence:

## [Codebase Assurance](content/codebase-assurance/)

For a product that works today but has become too consequential to trust on
appearance alone.

Start with the claims the product depends on, try to disprove the important
ones against the real system, and leave behind a gate that rejects one material
failure.

[Understand the method](content/codebase-assurance/) ·
[Use the field guide](content/codebase-assurance/field-guide.md) ·
[Read the Moria example](content/codebase-assurance/examples/moria.md)

## [Agentic Delivery Assurance](content/agentic-delivery-assurance/)

For an engineering organization producing agent-written changes faster than
people can confidently review them.

Examine the complete path from task definition to accepted code, search for
ways agents can satisfy visible checks without satisfying intent, and leave
behind an independently governed rejection gate.

[Understand the method](content/agentic-delivery-assurance/) ·
[Use the field guide](content/agentic-delivery-assurance/field-guide.md) ·
[Read the Cargo ReAPI example](content/agentic-delivery-assurance/examples/cargo-reapi.md)

## What “open” means here

The method is not a teaser. The questions, procedures, evidence standards,
acceptance rules, templates, and examples are public so that you can use them
without hiring Tamed Tornado.

What is not automated is the judgment: deciding which claims matter, designing
experiments the actual system cannot bluff, interpreting incomplete evidence,
making the intervention, and accepting the residual risk.

## Shared standards

Both methods use the same [assurance
protocol](content/shared/protocol.md), [evidence
record](content/shared/evidence-record.md), [finding
record](content/shared/finding.md), [intervention
record](content/shared/intervention.md), and [human
sign-off](content/shared/sign-off.md).

## Repository status

This is a working draft. The Markdown is the product. The small TypeScript
package currently exists only to reject broken metadata and links and to
produce deterministic machine-readable exports.

TypeScript code is Apache-2.0. Method prose, templates, and examples are
CC BY 4.0. See `LICENSE-CODE` and `LICENSE-CONTENT`.
