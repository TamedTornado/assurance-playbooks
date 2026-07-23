# Assurance Playbooks

The public methods Tamed Tornado uses to establish whether an AI-built
codebase or an agentic delivery system deserves trust.

This repository publishes the controls, evidence standards, acceptance
criteria, templates, and worked examples behind two assurance methods:

- [Codebase Assurance](content/codebase-assurance/index.md) — establish the
  claims a consequential codebase can actually support, then install and
  demonstrate an assurance gate on an agreed high-risk path.
- [Agentic Delivery Assurance](content/agentic-delivery-assurance/index.md) —
  establish whether an agent pipeline produces independently verified work,
  then install and demonstrate a gate that rejects a material failure mode.

Both methods use the [shared assurance
protocol](content/shared/protocol.md), [evidence
record](content/shared/evidence-record.md), [finding
record](content/shared/finding.md), [intervention
record](content/shared/intervention.md), and [human
sign-off](content/shared/sign-off.md).

The methods are deliberately useful without Tamed Tornado. They are not an
autonomous consulting product. Selecting the right claims, designing
system-specific adversarial experiments, judging evidence, making changes,
and accepting the resulting risk remain human work.

## Repository contract

Markdown with YAML front matter is the canonical source. The TypeScript
package supplies schemas, loaders, cross-reference validation, and
deterministic exports. It does **not** initialize or run engagements, launch
agents, choose controls, assign findings, or produce a consulting verdict.

```sh
pnpm install
pnpm check
pnpm assurance-playbooks validate content
pnpm assurance-playbooks export content --format json
```

## Licensing

TypeScript code is Apache-2.0. Method prose, templates, and examples are
CC BY 4.0. See `LICENSE-CODE` and `LICENSE-CONTENT`.
