---
schemaVersion: 1
kind: procedure
id: agentic-trace-delivery
title: Trace work from request to running artifact
version: 0.1.0
status: draft
summary: Reconstruct representative agent work through revisions integration build deployment and health.
playbook: agentic-delivery-assurance
phase: trace-delivery
purpose: Establish end-to-end identity and state for what was requested produced accepted and released.
inputs: [Task contracts, Pipeline graph, Repositories, Build and deployment systems]
outputs: [Delivery trace, Identity chain, Missing provenance findings]
---
# Trace work from request to running artifact

## Inputs

Task, prompt/context identity, sessions, worktrees or branches, commits, tests,
reviews, integration, artifacts, deployment, running services, and rollback.

## Human procedure

1. Select independent, overlapping, and dependent representative tasks.
2. Record base revision, session, context, work location, owner, and permissions.
3. Follow produced changes, generated artifacts, reviews, exceptions, and
   repairs.
4. Record integration order and verify the composed target.
5. Bind the build to the verified commit and immutable artifact.
6. Bind deployment configuration and running process to that artifact.
7. Record live consequential health evidence and rollback identity.
8. Mark every identity gap and mutable handoff.

## Copyable agent prompt

> Reconstruct each representative task from request to running artifact. Produce
> an identity chain covering task contract, context, session, base revision,
> worktree/branch, commits, generated artifacts, review, exceptions, repair,
> integration order, final composed target, build, immutable artifact,
> deployment configuration, running identity, live health, and rollback target.
> Cite the source for every edge. Do not equate branch success with composed
> success, artifact name with artifact identity, merge with deployment, or
> process health with product health. Mark unsupported links unproven.

## Required output

Per-task delivery timeline, identity graph, state transitions, missing links,
and final-target evidence.

## Preserve as evidence

Task and context identities, session logs, commits, review decisions, build
provenance, artifact digests, deployment inputs, live receipts, rollback target.

## Stop and escalate

Stop when audit collection would expose secrets or customer data, or when a
material identity cannot be resolved without owner access.

## Review test

A skeptical reviewer can start with the task and identify the exact verified
commit and exact running artifact without trusting a mutable name or summary.
