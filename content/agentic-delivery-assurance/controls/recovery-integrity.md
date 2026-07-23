---
schemaVersion: 1
kind: control
id: agentic-recovery-integrity
title: Verify recovery integrity
version: 1.0.0
status: stable
summary: Establish that retries repairs interruptions and handoffs preserve intent provenance and already-valid work.
playbook: agentic-delivery-assurance
objective: Test whether the pipeline can recover from failure without hiding state loss duplicating work or laundering evidence.
required: true
evidence:
  - Interrupted retry and repair execution traces
  - State transition and artifact provenance records
  - Final-target verification after recovery
acceptance:
  - Recovery resumes from explicit durable state
  - Prior findings and approvals cannot be silently discarded
  - The integrated target is reverified after repair
outputs:
  - recovery-state-map
  - repair-receipts
tags: [recovery, retries, provenance]
---
# Procedure

Interrupt work before implementation, after partial changes, during
verification, and during integration. Exercise retry, reassignment, repair,
and human takeover while tracing durable state.

Look for duplicated side effects, abandoned branches, lost review findings,
stale approvals, and regenerated evidence that no longer matches the target.
Success requires verification of the recovered composition.
