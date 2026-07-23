---
schemaVersion: 1
kind: control
id: codebase-reproducible-baseline
title: Get the real product running
version: 0.1.0
status: draft
summary: Show which important client-visible behaviors another operator can obtain from a pinned product and the real route required.
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

Choose a few demonstrations from the product expectation worksheet. Pin the
target, follow the route supplied to a newcomer, preserve the first attempt,
and classify every repair as environment, instructions, or product.

After permitted repairs, have another operator or clean environment repeat the
written route. Keep the client-readable result in one baseline record and link
the raw receipts. If a run fails or is blocked, preserve the consequence rather
than changing the product or substituting a narrower path and calling it
reproduced.
