---
schemaVersion: 1
kind: control
id: codebase-reproducible-baseline
title: Establish a reproducible baseline
version: 1.0.0
status: stable
summary: Prove that another engineer can obtain and explain the relevant build and runtime behavior.
playbook: codebase-assurance
objective: Establish a repeatable baseline before findings or interventions are attributed to the product.
required: true
evidence:
  - Clean-environment build and startup transcript
  - Toolchain dependency and configuration inventory
  - Baseline test and runtime artifacts with hashes
acceptance:
  - The agreed high-risk path can be repeated from documented inputs
  - Environmental assumptions and unavailable dependencies are explicit
  - Baseline failures are preserved rather than normalized away
outputs:
  - reproducibility-receipt
  - baseline-observations
tags: [baseline, reproducibility, build]
---
# Procedure

Start from a clean checkout at the pinned revision. Record tool versions,
external services, generated inputs, secrets interfaces, and cache state.
Exercise the smallest real path that reaches the consequential behavior.

Distinguish repository failure from environment failure. If reproduction is
blocked, record the missing capability, attempted escalations, consequence,
and the claims that therefore remain unproven.
