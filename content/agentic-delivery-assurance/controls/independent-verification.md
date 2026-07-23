---
schemaVersion: 1
kind: control
id: agentic-independent-verification
title: Enforce independent verification
version: 1.0.0
status: stable
summary: Establish that the producer cannot define, weaken, or approve the evidence used to accept its own work.
playbook: agentic-delivery-assurance
objective: Separate implementation authority from acceptance authority at every material delivery boundary.
required: true
evidence:
  - Producer verifier and human authority graph
  - Controlled attempts to weaken or bypass verification
  - Review and gate provenance for representative work
acceptance:
  - Material acceptance evidence is not controlled solely by the producer
  - Gate changes receive independent review and qualification
  - Bypasses fail closed and remain visible
outputs:
  - verification-authority-map
  - bypass-findings
tags: [verification, independence, review]
---
# Procedure

Trace who authors requirements, implementation, tests, verifier configuration,
review, and final acceptance. Independence is about authority and evidence,
not merely using a second model invocation.

Attempt safe bypasses: deleting assertions, narrowing discovery, replacing a
real dependency, marking work skipped, changing thresholds, and presenting a
different revision. Preserve whether the system rejects, exposes, or silently
accepts each attempt.
