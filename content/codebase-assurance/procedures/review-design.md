---
schemaVersion: 1
kind: procedure
id: codebase-review-design
title: Review the design for incompatible meanings
version: 0.1.0
status: draft
summary: Trace product claims across requirements interfaces states measurements and tests to expose contradictions.
playbook: codebase-assurance
phase: review-design
purpose: Determine whether competent implementers could follow the available contract and build materially different systems.
inputs: [Selected claims, Requirements, Technical design, Public interfaces, Test plans]
outputs: [Claim trace, Contradiction register, Design divergence register]
---
# Review the design for incompatible meanings

## Inputs

Selected claims, requirements, diagrams, data definitions, public APIs, state
machines, ownership rules, test specifications, and measurement plans.

## Human procedure

1. Trace each claim across every document that defines or verifies it.
2. Build a glossary of load-bearing terms and compare their meanings.
3. Identify state owners, legal transitions, public consumers, and dependency
   direction.
4. Ask two plausible implementers what they would build from the contract.
5. Search for required behavior with no public interface or observable test.
6. Verify that deadlines start at the user-visible event and measurements can
   establish the original target.
7. Classify each mismatch as ambiguity, contradiction, missing contract, or
   deliberate divergence.
8. Resolve it or record the weaker substitute, impact, and required approval.

## Copyable agent prompt

> Cross-read the supplied requirements, design, interfaces, states, and tests as
> competing definitions of one product. For each selected claim, trace the
> initiating input, authoritative state, transitions, public interface,
> measurement, and rejecting test. Find overloaded terms, circular ownership,
> inverted dependencies, behavior no public consumer can express, measurements
> attached to the wrong event, and substitutes weaker than the original claim.
> Quote the conflicting clauses, explain the incompatible implementations they
> permit, and propose the smallest contract clarification. Do not silently pick
> a preferred interpretation. Record unresolved weakness as a design divergence
> with decision impact and approval required.

## Required output

Claim-to-contract trace, contradiction register with citations and resolutions,
and divergence register with approval state.

## Preserve as evidence

Original conflicting text, review questions, resolutions, rejected
interpretations, and approval references.

## Stop and escalate

Stop when a material contradiction needs product authority, the original
measurement is unavailable, or resolving the conflict changes scope.

## Review test

An independent reviewer should be unable to construct two materially different
implementations that both satisfy the revised written contract.
