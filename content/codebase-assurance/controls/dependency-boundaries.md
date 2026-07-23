---
schemaVersion: 1
kind: control
id: codebase-dependency-boundaries
title: Verify dependency boundaries
version: 1.0.0
status: stable
summary: Examine external services, artifacts, generated code, and supply-chain assumptions that can invalidate local confidence.
playbook: codebase-assurance
objective: Establish how dependencies and build inputs affect the claims under review and how failures are contained.
required: true
evidence:
  - Runtime and build dependency inventory
  - Failure and incompatibility exercises at material boundaries
  - Artifact provenance and configuration review
acceptance:
  - Material dependencies have explicit failure behavior and ownership
  - Production-like paths are not silently replaced by inert mocks
  - Unverified artifacts and mutable inputs are identified
outputs:
  - dependency-map
  - boundary-findings
tags: [dependencies, supply-chain, boundaries]
---
# Procedure

Trace resolved dependencies, generated artifacts, storage, queues, model APIs,
and service contracts used by the high-risk path. Compare test substitutes to
the actual protocol behavior that matters.

Exercise timeout, corruption, version skew, duplicate delivery, and partial
availability where applicable. Preserve provenance for build and deployment
artifacts and state when provenance cannot be established.
