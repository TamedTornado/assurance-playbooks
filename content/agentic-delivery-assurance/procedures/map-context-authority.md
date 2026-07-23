---
schemaVersion: 1
kind: procedure
id: agentic-map-context-authority
title: Map context precedence and real authority
version: 0.1.0
status: draft
summary: Establish what each producer verifier and human can know mutate approve and bypass.
playbook: agentic-delivery-assurance
phase: map-context-authority
purpose: Compare described agent policy with enforced instructions tools secrets and approval boundaries.
inputs: [Representative tasks, Prompt assembly, Retrieved context, Tool policy, Runtime access]
outputs: [Context precedence map, Authority graph, Boundary exercise results]
---
# Map context precedence and real authority

## Inputs

Prompts, system and repository instructions, retrieval inputs, tool rules,
filesystem/network boundaries, secrets, approvals, logs, and representative
agent runtime.

## Human procedure

1. Enumerate every instruction source and define precedence.
2. Trace how context is selected, truncated, refreshed, and attributed.
3. Map tools, paths, hosts, secrets, mutation rights, approvals, and bypasses by
   role.
4. Compare prompt-requested restrictions with enforced runtime restrictions.
5. Exercise missing, stale, conflicting, and maliciously irrelevant context.
6. Attempt safe out-of-scope read, mutation, network, secret, and approval
   actions.
7. Record whether failure is denied, escalated, invisible, or accepted.

## Copyable agent prompt

> Produce a context-precedence and authority map for the representative agent
> path. Enumerate system, organization, repository, retrieved, task, and runtime
> instructions; show selection, precedence, freshness, and attribution. For
> every producer, verifier, and human role, list tools, filesystem, network,
> secrets, mutation, approval, exception, and destructive authority. Distinguish
> enforced controls from prompt requests. Design safe exercises for missing,
> stale, conflicting context and out-of-scope authority. Do not infer denial
> from policy text; require observed enforcement or mark it unproven.

## Required output

Context-precedence map, role/authority graph, boundary exercises, findings, and
unproven enforcement claims.

## Preserve as evidence

Exact prompt/context identities, runtime policy, tool calls, approvals,
denials, audit events, and observed side effects.

## Stop and escalate

Stop before uncontrolled destructive actions, live secret disclosure, customer
data access, or tests whose authority cannot be safely contained.

## Review test

Another operator can identify which role can change the result, the evidence,
the verifier, and the final approval—and which boundaries are actually enforced.
