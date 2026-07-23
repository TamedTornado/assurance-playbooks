---
schemaVersion: 1
kind: procedure
id: codebase-reproduce-path
title: Reproduce the consequential path
version: 0.1.0
status: draft
summary: Establish a pinned repeatable observation of the real path before drawing findings.
playbook: codebase-assurance
phase: reproduce-path
purpose: Give another operator enough identity inputs and procedure to observe the selected behavior again.
inputs: [Selected claims, Target revisions, Environment access, Existing run instructions]
outputs: [Reproduction receipt, Baseline evidence, Blocked finding when required]
---
# Reproduce the consequential path

## Inputs

Claims, exact repositories and revisions, environment, dependencies, data,
toolchains, configuration, secrets interface, and existing commands.

## Human procedure

1. Start from a clean pinned target and record dirty or untracked state.
2. Record toolchain, platform, configuration, generated inputs, services, data,
   feature flags, cache state, and artifact identities.
3. Run the smallest real composition that reaches the consequence.
4. Preserve the first result before repairing anything.
5. Repeat from the documented procedure with a second operator or clean
   environment where practical.
6. Compare differences and classify product failure, environment failure,
   dependency failure, or nondeterminism.
7. Hash raw outputs and record limitations.

## Copyable agent prompt

> Reproduce the selected consequential path from the pinned target. Record all
> material identity before execution: repository and revision, dirty state,
> toolchain, platform, configuration, generated inputs, dependencies, data,
> cache, and artifacts. Execute the real composition rather than a reduced
> substitute unless the difference is explicit. Preserve the first failure.
> Produce exact commands, raw artifact references, hashes, observed results,
> differences from the consequential environment, and repetition limits. Do not
> repair the baseline before recording it or convert missing access into a pass.

## Required output

A complete [evidence record](../../shared/evidence-record.md) and reproducible
procedure, or a [blocked-finding record](../../shared/blocked-finding.md).

## Preserve as evidence

Run-start identity, terminal or system output, raw artifacts, hashes, observer
identity, environmental differences, and failed attempts.

## Stop and escalate

Stop when access is missing after agreed escalation, the target cannot be
identified, required data cannot be handled safely, or repetition would cause
an uncontrolled side effect.

## Review test

Another operator can follow the record without oral history and either obtain
comparable behavior or explain the bounded difference.
