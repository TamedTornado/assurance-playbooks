---
schemaVersion: 1
kind: template
id: evidence-record
title: Evidence record
version: 0.1.0
status: draft
summary: A provenance-preserving record for one piece of assurance evidence.
for: evidence
---
# Evidence record

Record the claim being tested, control identifier, target repository and
revision, environment, exact collection procedure, raw artifact locations,
cryptographic hashes, collector, reviewer, and collection time.

Then state what was observed without interpretation. Put interpretation in a
finding and cite this evidence record. Note any sampling, nondeterminism,
redaction, missing access, or environmental difference that limits repetition.

Evidence is immutable after review. A corrected collection produces a new
record that supersedes the old one while preserving both.
