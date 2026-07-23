---
schemaVersion: 1
kind: control
id: agentic-task-contract
title: Make the task contract falsifiable
version: 1.0.0
status: stable
summary: Establish whether agent tasks carry observable intent, constraints, acceptance evidence, and escalation boundaries.
playbook: agentic-delivery-assurance
objective: Ensure task completion can be judged against intent independently of the agent narrative.
required: true
evidence:
  - Representative task specifications and resulting changes
  - Requirement-to-acceptance traceability
  - Ambiguity and escalation observations
acceptance:
  - Material requirements have observable acceptance evidence
  - Constraints and prohibited shortcuts are explicit
  - Unknowns have a human escalation path
outputs:
  - task-contract-matrix
  - ambiguity-findings
tags: [tasks, requirements, acceptance]
---
# Procedure

Sample real work across routine, ambiguous, and high-risk changes. Separate the
requested outcome from implementation hints and determine whether a reviewer
could reject a superficially plausible result.

Look for missing negative requirements, unverifiable adjectives, tests derived
from the proposed code, and incentives to minimize scope without preserving
intent. Record when the system asks rather than guesses.
