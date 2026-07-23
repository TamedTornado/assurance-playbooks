---
schemaVersion: 1
kind: control
id: agentic-task-contract
title: Make the task contract falsifiable
version: 0.1.0
status: draft
summary: Establish whether agent tasks preserve governing source intent and carry observable constraints acceptance evidence and escalation boundaries.
playbook: agentic-delivery-assurance
objective: Ensure task completion can be judged against intent independently of the agent narrative.
required: true
evidence:
  - Preserved source intent and derived-artifact lineage
  - Representative task specifications and resulting changes
  - Requirement-to-acceptance traceability
  - Ambiguity and escalation observations
acceptance:
  - Load-bearing source intent survives derivation or has an approved visible divergence
  - Material requirements have observable acceptance evidence
  - Constraints and prohibited shortcuts are explicit
  - Unknowns have a human escalation path
outputs:
  - intent-lineage-worksheet
  - task-contract-matrix
  - ambiguity-findings
tags: [tasks, requirements, acceptance]
---
# Procedure

Preserve original requests, architectural constraints, negative requirements,
and public commitments before reviewing their derived designs, TDDs, tasks,
and tests. Sample real work across routine, ambiguous, and high-risk changes.
Separate the requested outcome from implementation hints and determine whether
a reviewer could reject a superficially plausible result.

Look for missing negative requirements, unverifiable adjectives, tests derived
from the proposed code, and an internally coherent downstream contract that
has silently replaced governing intent. Record when the system asks rather
than guesses and when a divergence has actual product authority.
