---
schemaVersion: 1
kind: template
id: assurance-sign-off
title: Assurance sign-off
version: 0.1.0
status: draft
summary: The human completion decision and explicit residual-risk statement.
for: sign-off
---
# Assurance sign-off

List the agreed scope, method version, target revisions, control statuses,
material findings, installed assurance gate, and acceptance evidence. Include
every blocked, unproven, and not-applicable claim with its consequence.

Use the pre-agreed [acceptance criteria](acceptance-criteria.md) rather than a
retrospective account of what was convenient to complete. Link every blocked
status to its [blocked-finding record](blocked-finding.md).

The operator and decision owner sign separately. Completion means the agreed
evidence and gate criteria were met; it does not mean the system is bug-free
or safe outside the stated scope. A completed assurance record may contain
failed or blocked claims. It must not describe those claims as passed.
