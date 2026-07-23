---
schemaVersion: 1
kind: template
id: evidence-record
title: Evidence record
version: 0.1.0
status: draft
summary: A provenance-preserving record for one assurance observation.
for: evidence
---
# Evidence record

Use one record for one coherent observation. State what happened here; put the
interpretation and consequence in a [finding](finding.md).

## Identity

- **Evidence ID:**
- **Claim or acceptance criterion:**
- **Target repository, revision, artifact, or service:**
- **Environment and relevant configuration:**
- **Method and contract version:**
- **Run or batch ID:**
- **Collected at:** UTC timestamp
- **Collector:**
- **Independent reviewer:**

The target must be immutable or content-identified. A branch name, mutable
image tag, or “current production” is not sufficient by itself.

## Collection

- **Question this collection answers:**
- **Exact command or procedure:**
- **Inputs and fixtures:**
- **Starting state:** Include cache, data, producer, deployment, and recovery
  state where material.
- **Observer:** Name the process or person producing the observation and whether
  it is outside the system under test.
- **Raw artifact locations:**
- **Content hashes:**
- **Exit status and completion state:**

Record enough detail for another operator to repeat the collection. If
credentials or customer data cannot be copied, use a stable private reference
and explain what a reviewer can inspect.

## Observation

Describe only what was directly observed:

- events, outputs, state transitions, timings, identities, and counts;
- the expected reject or accept condition;
- whether that condition occurred; and
- unexpected behavior retained in the raw artifacts.

Avoid “therefore safe,” “root cause,” or business impact here. Those are
inferences for the finding record.

## Limitations and review

- **Sampling and coverage limit:**
- **Environment difference from the consequential target:**
- **Nondeterminism or timing sensitivity:**
- **Redaction or missing raw material:**
- **Producer-controlled evidence involved:**
- **Conflicting or counterevidence:**
- **What would invalidate this record:**
- **Review decision:** accepted, rejected, superseded, or pending
- **Supersedes / superseded by:**

After review, preserve this record immutably. A corrected collection creates a
new record and links both. Do not edit failed or inconvenient evidence into a
passing form.
