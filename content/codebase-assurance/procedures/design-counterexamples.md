---
schemaVersion: 1
kind: procedure
id: codebase-design-counterexamples
title: Discover invariants and design counterexamples
version: 0.1.0
status: draft
summary: Turn consequential claims into observable invariants and plausible bad implementations that existing gates must reject.
playbook: codebase-assurance
phase: design-counterexamples
purpose: Determine whether current evidence distinguishes the required system from a cheaper incorrect one.
inputs: [Claim inventory, System boundary, State and data flows, Baseline evidence, Existing tests]
outputs: [Invariant matrix, Counterexample catalogue, Adversarial execution plan]
---
# Discover invariants and design counterexamples

## Inputs

Selected claims, boundary and data flow, state transitions, ownership,
retries, persistence, baseline, incidents, tests, and operational gates.

## Human procedure

1. Trace each claim from initiating input to externally visible consequence.
2. Name every component that reads, writes, transfers, caches, or authorizes
   the relevant state.
3. Enumerate normal, duplicate, delayed, reordered, interrupted, retried, and
   recovered transitions.
4. Express candidate invariants with observable terms: always, never, at most
   once, exactly once, eventually, only after, or same identity.
5. Design the cheapest plausible implementation that violates each invariant
   while passing visible checks.
6. Map each counterexample to the gate expected to reject it.
7. Select safe semantic mutations or fixtures and predict the failure.
8. Execute through the ordinary acceptance route and record the result.

## Copyable agent prompt

> For each consequential claim, trace the path from input to visible consequence
> and identify all state owners, transfers, caches, authorization decisions,
> retries, and recovery transitions. Express observable invariants using
> precise temporal or cardinal language. For each invariant, construct the
> cheapest plausible implementation or state that violates it while satisfying
> current visible checks. Identify the existing gate that should reject it,
> then propose a safe mutation or fixture executed through the ordinary route.
> Output expected and observed failure direction. Do not infer a global
> invariant from a unit test, type signature, comment, or architecture diagram.

## Required output

Invariant matrix with consequence and state owners; counterexample catalogue
with current gate; prioritized adversarial execution plan and results.

## Preserve as evidence

Exact mutations or fixtures, target identity, expected rejection, raw results,
and any attractive false pass.

## Stop and escalate

Stop before destructive production experiments, uncontrolled customer effects,
or mutations whose blast radius cannot be contained. Mark inaccessible claims
unproven.

## Review test

A reviewer can explain why each counterexample is plausible, why its current
success would matter, and which evidence distinguishes it from valid behavior.
