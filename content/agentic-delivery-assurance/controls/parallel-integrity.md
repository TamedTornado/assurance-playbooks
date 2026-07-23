---
schemaVersion: 1
kind: control
id: agentic-parallel-integrity
title: Preserve parallel-work integrity
version: 1.0.0
status: stable
summary: Test whether concurrent agent work remains isolated, composable, attributable, and safe to integrate.
playbook: agentic-delivery-assurance
objective: Establish that throughput from parallelism does not hide interference stale assumptions or unreviewed integration.
required: true
evidence:
  - Worktree branch artifact and ownership trace
  - Conflicting and dependent task exercises
  - Integration and merge receipts
acceptance:
  - Concurrent changes have isolated state and attributable provenance
  - Dependency and conflict handling is explicit
  - The integrated result is verified rather than inferred from branch success
outputs:
  - parallelism-map
  - integration-findings
tags: [parallelism, isolation, integration]
---
# Procedure

Run representative independent, overlapping, and dependent tasks. Trace the
base revision, context, produced commits, artifacts, review state, integration
order, and final verification for each.

Search for shared mutable worktrees, stale generated files, lost fixes,
duplicate ownership, and merge success treated as product correctness. Verify
the composed target revision, not only its constituent branches.
