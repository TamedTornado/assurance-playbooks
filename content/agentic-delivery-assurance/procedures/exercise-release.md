---
schemaVersion: 1
kind: procedure
id: agentic-exercise-release
title: Trace release identity and exercise rollback
version: 0.1.0
status: draft
summary: Prove that the verified commit becomes the running artifact and failed rollout restores a captured known-good identity.
playbook: agentic-delivery-assurance
phase: exercise-release
purpose: Establish immutable build deployment health and rollback evidence through production release.
inputs: [Verified target, Build system, Artifact registry, Deployment workflow, Health path]
outputs: [Release identity chain, Deployment receipt, Rollback proof]
---
# Trace release identity and exercise rollback

## Inputs

Verified commit, build workflow, artifact registry, deployment configuration,
running service, consequential health path, and current rollback target.

## Human procedure

1. Build from the exact verified target and record source identity at build
   start.
2. Record immutable artifact digest or commit-derived identity.
3. Capture the current running known-good artifact before deployment.
4. Verify every control service and runtime consumer receives pinned identities.
5. Deploy the selected artifact and inspect running identity.
6. Exercise health that reaches a consequential live behavior.
7. Trigger a safe deployment, health, or smoke failure and perform rollback.
8. Verify restored identity and behavior.

## Copyable agent prompt

> Trace the verified target through build, registry, deployment configuration,
> running process, live health, and rollback. Require an immutable artifact
> digest or commit-derived identity; treat mutable tags only as pointers. Before
> rollout capture the exact known-good running artifact. Verify every service
> that propagates runtime image configuration uses the intended pin. Design a
> safe failure exercise, execute rollback, and verify both restored identity and
> consequential behavior. Do not accept process/container existence as product
> health or rollback instructions whose previous target cannot be resolved.

## Required output

Commit-to-artifact-to-runtime chain, deployment and health receipt, failure
exercise, rollback identity, and restored behavior evidence.

## Preserve as evidence

Build inputs, source commit, artifact digest, registry reference, deployment
configuration, previous artifact, live headers/behavior, rollback actions.

## Stop and escalate

Stop when no known-good rollback target exists, multi-service pinning is
unknown, or failure injection risks uncontrolled production impact.

## Review test

A reviewer can prove the running artifact came from the verified commit and
that the exercised failure restored the captured known-good artifact.
