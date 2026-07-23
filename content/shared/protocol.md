---
schemaVersion: 1
kind: template
id: assurance-protocol
title: Shared assurance protocol
version: 1.0.0
status: stable
summary: The evidence and decision protocol shared by every assurance engagement.
for: scope
---
# Shared assurance protocol

Assurance is a claim-evidence discipline, not a volume of tests. Begin with the
consequential claims the system is expected to support and the ways those
claims could be false.

Every control receives one status: **pass**, **fail**, **blocked**,
**not-applicable**, or **unproven**. Pass requires cited evidence that another
engineer can inspect. Not-applicable and blocked require a rationale, owner,
and consequence. Silence is never a passing result.

Evidence records identify their source, target revision, environment,
collection command or procedure, timestamp, collector, and content hash.
Findings distinguish observed fact from inference and record severity,
confidence, blast radius, and the evidence that could falsify the conclusion.

An intervention requires a before state, the change, an after state measured
under comparable conditions, and a human decision. The final sign-off names
every residual risk and cannot be issued by the agent or person who made the
change without independent review.
