---
schemaVersion: 1
kind: control
id: agentic-proven-gate
title: Install and prove the delivery gate
version: 0.1.0
status: draft
summary: Harden one material agent-delivery boundary and demonstrate rejection of the preserved failure mode.
playbook: agentic-delivery-assurance
objective: Leave an executable independently governed gate that changes which agent work can enter the trusted system.
required: true
evidence:
  - Approved baseline failure and acceptance contract
  - Reviewed verifier or workflow intervention
  - Comparable before and after delivery receipts
acceptance:
  - The preserved bad result passes before and fails after the intervention
  - A valid result still passes without producer-controlled exceptions
  - An independent human approves the gate and residual authority
outputs:
  - delivery-assurance-gate
  - intervention-record
  - sign-off
tags: [gate, intervention, sign-off]
---
# Procedure

Select a material observed failure: reward hacking, stale evidence, unsafe
authority, lost integration, or unverifiable recovery. Agree the rejection and
valid-success fixtures before changing the pipeline.

Implement the smallest durable gate with independent ownership. Repeat both
fixtures, inspect the final target and evidence provenance, test bypasses, and
record rollback. State what the gate does not cover.
