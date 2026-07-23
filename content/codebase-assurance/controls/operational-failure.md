---
schemaVersion: 1
kind: control
id: codebase-operational-failure
title: Exercise operational failure
version: 1.0.0
status: stable
summary: Establish whether the system fails observably and recoverably under realistic operational stress.
playbook: codebase-assurance
objective: Test startup shutdown overload degradation recovery and operator visibility on the agreed path.
required: true
evidence:
  - Failure-injection and recovery transcripts
  - Logs metrics traces or operator-visible artifacts
  - Resource and rollback observations
acceptance:
  - Material failure is visible before consequential corruption spreads
  - Recovery and rollback behavior are demonstrated or marked unproven
  - Diagnostic evidence identifies the failed boundary
outputs:
  - failure-matrix
  - recovery-receipts
tags: [operations, recovery, observability]
---
# Procedure

Exercise startup with missing or malformed dependencies, shutdown during work,
resource exhaustion, delayed responses, and recovery from the most plausible
partial state. Observe the system through the interfaces an operator actually
has.

Record whether failure is contained, diagnosable, and reversible. An exception
that reaches a log is not sufficient if the business state is already corrupt
or the operator cannot identify the affected scope.
