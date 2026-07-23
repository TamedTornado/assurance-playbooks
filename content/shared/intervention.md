---
schemaVersion: 1
kind: template
id: intervention-record
title: Intervention record
version: 0.1.0
status: draft
summary: A before-and-after record proving what an assurance intervention changed.
for: intervention
---
# Intervention record

Use this record for the one boundary being installed or materially hardened.
Agree the fixtures and decision rule before implementation.

## Finding and fixtures

- **Intervention ID:**
- **Finding addressed:**
- **High-risk path and target:**
- **Bad fixture:** Preserved unacceptable result or controlled equivalent.
- **Valid fixture:** Required behavior that must continue to succeed.
- **Reject condition:**
- **Accept condition:**
- **Gate owner:**
- **Independent reviewer:**

## Before

- **Target revision and environment:**
- **Exact procedure:**
- **Bad-fixture result:** The existing boundary must accept or fail to detect it.
- **Valid-fixture result:**
- **Evidence records:**
- **Known limitations:**

If the bad fixture does not demonstrate the weakness before the change, it
cannot prove the intervention fixed that weakness afterward.

## Change

- **Smallest durable change:**
- **Code, configuration, workflow, or authority modified:**
- **Who can change, disable, bypass, or approve exceptions:**
- **Independent review:**
- **Expected secondary effects:**
- **Unexpected differences from the baseline:**

A changed test that merely agrees with the new implementation is not proof. The
change must alter what the acceptance boundary can reject.

## After and rollback

- **Comparable procedure and target:**
- **Bad-fixture rejection evidence:**
- **Valid-fixture success evidence:**
- **Bypass attempts and results:**
- **Regression observations:**
- **Running or released artifact identity, where applicable:**
- **Rollback procedure and captured target:**
- **Rollback verification:**
- **Residual risk and excluded behavior:**
- **Decision owner approval:**

If the workload, environment, observer, verifier, or target changed, explain
why the comparison remains valid or collect a new baseline. Preserve both
before and after evidence.
