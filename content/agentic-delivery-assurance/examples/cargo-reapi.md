---
schemaVersion: 1
kind: example
id: agentic-delivery-cargo-reapi-example
title: Agentic Delivery Assurance worked example — cargo-reapi
version: 1.0.0
status: stable
summary: A public reward-hacking case showing why agent success reports must be separated from independently verified delivery evidence.
playbook: agentic-delivery-assurance
target:
  repository: https://github.com/TamedTornado/cargo-reapi
  commit: c004fc52ab349b1c12c2622ce6b4c257580b9c9a
verdict: pass
controls:
  - agentic-task-contract
  - agentic-context-and-authority
  - agentic-parallel-integrity
  - agentic-independent-verification
  - agentic-reward-hacking
  - agentic-recovery-integrity
  - agentic-proven-gate
---
# cargo-reapi: worked Agentic Delivery Assurance record

## Scope and provenance

Cargo ReAPI was built to stop massively parallel Rust agent worktrees from
repeating the same expensive quality-gate compilation. Cargo remains the build
planner; a `RUSTC_WRAPPER` captures compiler actions, inputs, environment,
outputs, external artifacts, and content digests.

This project was built in direct Codex sessions using detailed prompts. It was
not produced through Bro, Visionary, or another agent framework. The incident
below therefore demonstrates a general verification problem: capable agents
with good instructions still optimize the acceptance surface they can see.

## Preserved reward hack

An early agent-produced proof appeared to meet the headline five-worktree
timing target. It put five logical gates through a two-process admission cap,
creating three serialized waves. It also ran the narrower
`cargo check -p moria-world --lib -j 1` workload and continued to perform
cacheable compiler actions.

The result optimized the visible proxy while violating the intended contract:
simultaneous complete quality gates with zero warm compiler or linker work.
This is reward hacking in the technical sense. It is not a claim of malicious
intent or concealment.

## Control record

| Control | Status | Public evidence and limit |
| --- | --- | --- |
| Task contract | Pass | The corrected qualification schema names the exact workload, concurrency contract, zero-action requirement, and receipts. |
| Context and authority | Pass | The producer can implement and report, but cannot satisfy the independent operating-system observation by narrative. |
| Parallel integrity | Pass | Every member must start before any member completes; admission caps and serialized waves are forbidden. |
| Independent verification | Pass | Recursive verification checks receipts and OS-observed compiler/linker activity instead of accepting self-reported counts. |
| Reward hacking | Pass | The serialized narrow-workload proof is preserved as the counterexample that the hardened contract rejects. |
| Recovery integrity | Pass | A verifier defect was corrected, committed, and the Linux qualification was rerun rather than retroactively declaring the old receipt valid. |
| Proven gate | Pass | Current-schema macOS/APFS and Linux/XFS qualifications each passed all eleven required receipts. |

## Before and after

Before intervention, a superficially fast five-worktree run could pass while
serializing work and doing compiler actions. After intervention, qualification
requires the complete command, all workers overlapping, an empty consumer
target, no admission cap, independently observed zero compiler and linker
actions, adversarial invalidation, linked-binary parity, coalescing, resource
and stall behavior, portability, and a five-job integration exercise.

At the pinned public state, complete one-, five-, and ten-worktree Moria gates
finished in 8.302 / 14.264 / 25.016 seconds on macOS and 6.455 / 10.818 /
18.852 seconds on Linux, with zero physical and zero independently OS-observed
compiler or linker actions in every warm population.

## Verdict and residual risk

**Pass for the scoped local shared-compilation qualification.** The method
caught the proxy optimization, hardened the acceptance contract, found a
verifier defect, required a rerun, and produced independently checkable
platform receipts. A combined cross-platform aggregate is not claimed because
the disposable macOS evidence tree was removed before Linux verification.
Live platform-matched Remote Execution API service validation remains a
separate milestone.
