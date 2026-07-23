---
schemaVersion: 1
kind: control
id: agentic-release-integrity
title: Preserve release identity and rollback
version: 0.1.0
status: draft
summary: Prove that the verified composition becomes the deployed artifact and can return to a captured known-good state.
playbook: agentic-delivery-assurance
objective: Establish immutable identity health evidence and recovery from verified target through production release.
required: true
evidence:
  - Final target commit and immutable artifact identity
  - Deployment health and live behavior receipts
  - Captured rollback identity and exercised failure path
acceptance:
  - The deployed artifact is immutably linked to the verified composition
  - Health checks exercise the consequential live path rather than container existence alone
  - A failed deployment automatically or explicitly returns to the captured known-good artifact
outputs:
  - release-identity-trace
  - deployment-and-rollback-receipts
tags: [release, artifacts, deployment, rollback]
---
# Preserve release identity and rollback

Trace the final integrated revision into the built artifact, registry identity,
deployment configuration, running service, and health evidence. Prefer an
immutable digest or commit-derived artifact identity. A mutable tag such as
`latest` may be a convenience pointer; it cannot be the release truth.

Capture the currently running known-good artifact before rollout. Exercise a
failed deployment or safe equivalent and prove that rollback restores the
captured identity. Verify the live consequential path after deployment and
rollback, not merely that a process or container exists.

Look for target movement between verification and build, images rebuilt under
the same label, release configuration that rewrites a pinned artifact to a
mutable tag, partial multi-service promotion, health checks disconnected from
user behavior, and rollback instructions whose target cannot be resolved.
