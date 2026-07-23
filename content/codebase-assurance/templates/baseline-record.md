---
schemaVersion: 1
kind: template
id: codebase-baseline-record
title: Baseline record
version: 0.1.0
status: draft
summary: One client-readable record of the important product demonstrations another operator can and cannot repeat.
for: reproducible-baseline
---
# Baseline record

Use one copy for the engagement. Keep the client summary short. Copy the
demonstration section for each selected behavior and link raw receipts rather
than pasting long logs into this document. Delete prompts that add no useful
information. Do not assign IDs manually.

## What we tried to reproduce

[Name the product version and the two to five important behaviors selected from
the product expectation worksheet.]

## What we were able to reproduce

[Explain in plain language what another operator can make the product do now.]

## What failed, required repair, or remains blocked

[Explain failures, missing or incorrect instructions, unavailable
environments, substitutes, and demonstrations that have not been independently
repeated.]

## What this means for the client

[State how the baseline changes what the client can rely on and what remains to
be investigated. Do not turn mixed results into a project score.]

## Pinned target and shared starting conditions

- **Product or repository:**
- **Revision or artifact identity:**
- **Local changes at start:** [None, or describe them.]
- **Relevant configuration and inputs:**
- **Named environment or machine, when material:**
- **Shared receipts:**

Record other technical details only where they affect a demonstration below.

## Demonstrations

Copy this section for each selected behavior.

### [What the client expects to see happen]

- **Why this matters:**
- **Expectation investigated:**
- **Person, action, and expected visible result:**

#### What success would establish

[State the narrow conclusion supported by a successful run.]

#### What success would not establish

[Name the important conclusion that would still require different evidence.]

#### Route supplied by the project

[Record the instructions, command, interface, or demonstration a newcomer is
given.]

#### First attempt

- **Starting state:**
- **Exact command or action:**
- **Observed result:**
- **Raw receipt:**

#### Repairs

Delete this section when none were required. Copy the block for each repair.

##### [Short description]

- **Classification:** [Environment repair, instruction repair, or product
  change.]
- **Why:**
- **Action taken:** [For a product change, write “none” and preserve the
  failure as a finding.]
- **Finding or receipt:**

#### Repeatable route

- **Starting state:**
- **Exact commands or actions:**
- **Expected observable result:**
- **Actual observable result:**
- **Raw receipts and material artifacts:**
- **Environment details that affect this result:**

#### Independent attempt

- **Operator or clean environment:**
- **Result:** [Comparable, materially different, not attempted, or blocked.]
- **Extra knowledge required:**
- **Differences and receipts:**

#### What this does and does not prove

- **Supported conclusion:**
- **Unsupported or narrower conclusion:**
- **Limitations:**

#### Result

- **Status:** [Not run, reproduced, observed once, failed, blocked, or
  substitute only.]
- **Decision consequence:**
- **Related finding or blocked record:**

## Follow-on demonstrations

[List only decision-relevant runs that should be added later, with the reason
each one matters.]
