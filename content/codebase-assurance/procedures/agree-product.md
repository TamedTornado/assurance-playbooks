---
schemaVersion: 1
kind: procedure
id: codebase-agree-product
title: Agree what the product must prove
version: 0.1.0
status: draft
summary: Turn a broad codebase concern into consequential claims boundaries and explicit non-goals.
playbook: codebase-assurance
phase: agree-product
purpose: Establish the decision product boundary and falsifiable claims before repository analysis begins.
inputs: [Decision owner, Product context, Known incidents, Pending decision]
outputs: [Decision statement, Product boundary, Consequential claim inventory]
---
# Agree what the product must prove

## Inputs

Decision owner, pending decision, product description, users and operators,
known failures, repositories and services, and any claimed non-goals.

## Human procedure

1. Ask what decision will be made with the result and what failure would change
   it.
2. Identify the users, money, data, operations, or authority exposed.
3. Draw the product boundary: inputs, outputs, public consumers, authoritative
   state, dependencies, and privileged paths.
4. Separate the current product from future intent and demonstration-only code.
5. Rewrite expectations as observable claims with named consequences.
6. For each claim, describe one plausible state in which it is false.
7. Rank claims by consequence, reachability, uncertainty, and decision value.
8. Obtain the decision owner’s agreement on selected claims and exclusions.

## Copyable agent prompt

> Using the supplied decision context and system material, produce a bounded
> product and claim record. Begin with the decision being supported. Identify
> users and consequences, authoritative state, public consumers, dependencies,
> privileged paths, explicit non-goals, and future intent that must not leak
> into the current product. Rewrite each important expectation as an observable
> falsifiable claim. For every claim, give a plausible counterexample and the
> decision consequence if false. Rank claims by consequence, reachability,
> uncertainty, and decision value. Do not derive importance from existing tests
> or infer missing product intent. Mark unresolved intent for decision-owner
> review.

## Required output

A decision statement, boundary diagram or table, non-goals, and a ranked claim
inventory containing owner, consequence, target, counterexample, and status.

## Preserve as evidence

Source interviews or documents, disagreements, boundary revisions, owner
approvals, and the exact claim text accepted before testing.

## Stop and escalate

Stop when no authorized person can name the decision, incompatible product
boundaries remain, or required claims depend on unstated future functionality.

## Review test

A reviewer should be able to explain why each selected claim changes the named
decision and reject an attractive demo that crosses the agreed boundary.
