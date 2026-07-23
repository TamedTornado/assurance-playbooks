---
schemaVersion: 1
kind: control
id: codebase-proven-gate
title: Install and prove the assurance gate
version: 1.0.0
status: stable
summary: Harden one agreed high-risk verification path and demonstrate that it rejects the preserved failure.
playbook: codebase-assurance
objective: Leave behind an executable assurance boundary that distinguishes required behavior from a material counterexample.
required: true
evidence:
  - Approved baseline and selected finding
  - Reviewed intervention diff and rollback instructions
  - Comparable before and after execution receipts
acceptance:
  - The pre-intervention failure or controlled equivalent is preserved
  - The gate rejects the failure and accepts required behavior
  - An independent human reviewer approves the evidence and residual risk
outputs:
  - assurance-gate
  - intervention-record
  - sign-off
tags: [gate, intervention, sign-off]
---
# Procedure

Agree the selected path and acceptance criteria before implementation. Choose
the smallest gate that materially changes what can be trusted: an integration
test, invariant checker, replay harness, deployment check, or operational
sentinel.

Run the preserved counterexample before and after the intervention under
comparable conditions. Review the implementation independently, record
rollback, and state exactly which claims remain outside the gate.
