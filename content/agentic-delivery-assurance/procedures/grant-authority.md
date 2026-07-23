---
schemaVersion: 1
kind: procedure
id: agentic-grant-authority
title: Grant only the agent authority earned
version: 0.1.0
status: draft
summary: Convert bounded delivery evidence into explicit agent authority conditions residual risk and human ownership.
playbook: agentic-delivery-assurance
phase: grant-authority
purpose: Decide what work may proceed with greater autonomy without generalizing beyond demonstrated evidence.
inputs: [Acceptance criteria, Task results, Gate proof, Failed blocked and unproven boundaries]
outputs: [Authority decision, Assurance sign-off, Additional evidence plan]
---
# Grant only the agent authority earned

## Inputs

Original authority decision, representative tasks, claim statuses, findings,
blocked records, context/authority map, gate proof, release evidence, and risks.

## Human procedure

1. Re-read the authority the organization wanted agents to earn.
2. Classify every claim and representative task result.
3. Define the exact task classes, repositories, tools, environments, and
   release paths supported by evidence.
4. State required human approvals, prohibited actions, expiry, and monitoring.
5. Record failed, blocked, excluded, and unproven boundaries.
6. Describe evidence needed for the next authority increase.
7. Decide grant, grant with conditions, do not grant, or defer.
8. Obtain separate operator and engineering-owner approval.

## Copyable agent prompt

> Draft a bounded authority decision from the supplied acceptance criteria and
> evidence. Identify the exact task classes, repositories, tools, models,
> environments, release paths, and failure modes demonstrated. For every claim
> assign one allowed status and cite its evidence or record. State required
> human approvals, prohibited actions, monitoring, conditions, expiry, and
> evidence required for greater authority. Preserve all failed, blocked,
> excluded, and unproven boundaries. Draft but do not impersonate the separate
> operator and engineering-owner approvals. Do not generalize one successful
> qualification to arbitrary future agent work.

## Required output

Completed [assurance sign-off](../../shared/sign-off.md), machine- and
human-readable authority boundary, conditions, and next-evidence plan.

## Preserve as evidence

Original requested authority, status table, citations, gate identity,
conditions, approvals, objections, owner, and review date.

## Stop and escalate

Stop when a material claim lacks status, the running artifact is unbound, or
the person granting authority cannot accept the residual risk.

## Review test

A new operator can tell exactly what agents may do, what still requires a
human, when authority expires, and which evidence would justify expansion.
