---
schemaVersion: 1
kind: procedure
id: codebase-make-decision
title: Make the bounded product decision
version: 0.1.0
status: draft
summary: Convert the completed evidence and proven gate into an explicit owned decision without erasing uncertainty.
playbook: codebase-assurance
phase: make-decision
purpose: Close every claim with evidence consequence residual risk and separate human approval.
inputs: [Acceptance criteria, Claim statuses, Findings, Gate proof, Residual risks]
outputs: [Assurance sign-off, Authority or product decision, Follow-on evidence plan]
---
# Make the bounded product decision

## Inputs

Original acceptance criteria, every claim status, evidence and findings,
blocked records, intervention proof, exclusions, and decision owner.

## Human procedure

1. Re-read the original decision and criteria without rewriting them.
2. Assign every claim pass, fail, blocked, not-applicable, or unproven.
3. Verify each status has the required evidence or rationale.
4. State how each non-pass affects the decision.
5. Describe the installed gate and exact boundary it earned.
6. List residual risk, assumptions, owners, expiry, and review triggers.
7. Decide proceed, proceed with conditions, do not proceed, or defer.
8. Obtain separate operator and decision-owner approval.

## Copyable agent prompt

> Assemble a decision record from the supplied acceptance criteria and evidence.
> Do not change the original claim meaning. For every claim, assign one allowed
> status and cite the evidence, finding, blocked record, or not-applicable
> rationale required by that status. State the decision consequence of every
> fail, blocked, excluded, and unproven claim. Describe what the installed gate
> rejects, what it does not cover, residual risks, owners, conditions, expiry,
> and evidence required for greater trust. Draft but do not impersonate the
> separate operator and decision-owner approvals. Do not average statuses or
> translate completion into a blanket pass.

## Required output

Completed [assurance sign-off](../../shared/sign-off.md), decision conditions,
and prioritized follow-on evidence—not an undifferentiated recommendation list.

## Preserve as evidence

Original criteria, status table, citations, approval identities, objections,
conditions, and decision timestamp.

## Stop and escalate

Stop when a material claim lacks a status, pass lacks sufficient evidence, the
decision owner is absent, or the implementer is the sole approver.

## Review test

A skeptical reader can reconstruct the decision from cited evidence and can
see every boundary that did not earn confidence.
