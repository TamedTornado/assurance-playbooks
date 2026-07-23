---
schemaVersion: 1
kind: control
id: codebase-verification-strength
title: Measure verification strength
version: 1.0.0
status: stable
summary: Determine which product claims the existing tests and gates actually distinguish from plausible bad implementations.
playbook: codebase-assurance
objective: Establish whether existing verification rejects incorrect behavior rather than merely exercising the implementation.
required: true
evidence:
  - Claim-to-test traceability matrix
  - Mutations or controlled defects tested against existing gates
  - Review of assertions fixtures mocks and skipped paths
acceptance:
  - Critical claims have independent observable assertions
  - At least one plausible bad implementation is challenged per high-risk claim
  - False confidence from mocks snapshots and test counts is identified
outputs:
  - verification-matrix
  - mutation-receipts
tags: [tests, verification, mutations]
---
# Procedure

Trace each material claim to the test or operational gate that would reject a
violation. Introduce controlled defects or semantic mutations where safe and
observe whether the current suite detects them.

Inspect fixtures, mocks, snapshots, retries, quarantines, and skipped tests for
ways the test contract can collapse into the implementation contract. Test
volume is recorded only as context, never as assurance evidence.
