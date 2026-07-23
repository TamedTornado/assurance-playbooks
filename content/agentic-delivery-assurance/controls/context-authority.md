---
schemaVersion: 1
kind: control
id: agentic-context-and-authority
title: Bound context and authority
version: 1.0.0
status: stable
summary: Verify that agents receive sufficient context and only the tools, secrets, and mutation authority their task requires.
playbook: agentic-delivery-assurance
objective: Establish that missing context and excessive authority cannot silently turn uncertainty into consequential changes.
required: true
evidence:
  - Context source and precedence inventory
  - Tool secret network and filesystem authority map
  - Exercises of missing stale and conflicting instructions
acceptance:
  - Authoritative instructions have deterministic precedence
  - Sensitive or destructive authority is bounded and reviewable
  - Missing context causes escalation or a visible failure
outputs:
  - authority-map
  - context-findings
tags: [context, authority, secrets]
---
# Procedure

Trace the instructions, repository state, retrieved knowledge, tools, secrets,
network access, and approval rules visible to representative agents. Test stale
and conflicting sources and observe which instruction wins.

Attempt operations outside the task boundary in a safe fixture. Verify that
approval and audit records correspond to actual authority rather than a prompt
request the agent can ignore.
