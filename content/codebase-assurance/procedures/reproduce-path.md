---
schemaVersion: 1
kind: procedure
id: codebase-reproduce-path
title: Test whether the product actually works
version: 0.1.0
status: draft
summary: Independently test whether the delivered product performs its important functions correctly under the conditions it claims to support.
playbook: codebase-assurance
phase: reproduce-path
purpose: Establish what the delivered product can actually do, where it fails, and the exact boundary of the audit evidence.
inputs: [Product expectation worksheet, Design consistency review, Delivered product, Product instructions, Claimed operating conditions]
outputs: [Product audit record, Raw evidence, Findings or blocked records]
---
# Test whether the product actually works

The previous phases established what the product claims to be and whether its
design describes that product consistently.

Now audit the delivered application itself:

> Does the delivered product perform its important functions correctly under
> the conditions it claims to support?

This is not an exhaustive regression test. It is an independent assessment of
the capabilities and operating boundaries that determine whether the delivered
product is genuinely usable.

A product does not pass merely because it compiles, opens, or presents an
attractive demonstration:

- compiling a library does not establish that another application can use it;
- accepting a request does not establish that the work completed;
- displaying a change does not establish that the correct state was saved;
- producing a report does not establish that the reported target was met;
- surviving a sample workload does not establish the claimed operating
  capacity; and
- a healthy process does not establish healthy product state.

## Inputs

Bring the product expectation worksheet, design consistency review, delivered
repository or artifact, product instructions, representative data and
integrations, and access to the environments required by the product's claims.

## Human procedure

### 1. Choose what defines the product

Return to the expectation worksheet and ask:

> If these things do not work, is this still the product it claims to be?

Select the capabilities that define the product rather than every feature it
contains. Cover the central user or consumer workflows, important state
changes, required integrations, and any performance, scale, or architectural
promise whose failure would materially change what was delivered.

For each capability, write one complete audit scenario:

- who or what uses the product;
- the starting state;
- the action performed;
- the visible result;
- the resulting product state;
- the conditions it is supposed to support;
- what would clearly mean it did not work; and
- what a successful run would still not prove.

Prefer one complete scenario over several internal checks. For example:

> Starting from an unmodified saved world, a player removes material from a
> solid hillside, sees the surface update, saves the world, terminates the
> process, reloads the save, and observes the same removed material.

That scenario tests more of the delivered product than separate observations
that an edit command was accepted and a file was written.

Do not choose scenarios merely because they are easy to demonstrate. A typical
audit may cover five to ten defining capabilities, grouped into fewer complete
scenarios where that keeps the work understandable.

### 2. Test the product as delivered

Pin the exact target: repository and commit, release or deployment artifact,
local modifications, material configuration, data and asset versions, and
named hardware where relevant.

Approach it through the route supplied to its intended user or consumer:

- public installation instructions;
- supported package or API;
- ordinary user interface;
- documented deployment;
- normal operator controls; or
- named acceptance harness.

Run each scenario through to its actual product consequence. Preserve the first
attempt before repairing anything: starting conditions, exact actions,
observed behavior, resulting state, errors, artifacts, measurements, and
anything the operator had to infer.

When something must change before the scenario can run, classify it:

- **Environment repair:** the audit environment lacks a documented
  prerequisite or required access.
- **Instruction repair:** the product can perform the behavior, but its
  supplied route is missing, stale, ambiguous, or wrong.
- **Product repair:** delivered code, shipped configuration, data, assets,
  supported interface, or behavior must change.

Environment and instruction repairs remain visible in the audit. A product
repair means the delivered target did not pass. A repaired version can be
audited as a new target, but it does not erase the original result.

Check the resulting state, not only the visible intermediate event. Depending
on the scenario, that may require inspecting persisted data, downstream
effects, generated artifacts, external-system state, authorization boundaries,
or behavior after restart.

Do not replace a failed supported route with private developer knowledge and
then call the product working.

### 3. Test the conditions the product claims to support

Where the product claims a workload, scale, latency, resource, environment, or
repeatability boundary, run the relevant complete scenario under that
condition.

Use the workload the product claims to support—not an arbitrary torture test
and not a smaller convenient proxy. Record the material conditions:

- data and workload identity;
- concurrency and duration;
- machine and environment;
- warm or cold state;
- latency and throughput;
- resource use;
- errors or degraded behavior; and
- resulting product state.

If the claimed environment is unavailable, record the capability as blocked
or untested. A result from a different machine or workload supports only that
narrower condition.

Repeat successful scenarios from the documented starting state. Use a second
operator or clean environment where practical. A single successful run is an
observation; a clean repeat supports a stronger audit conclusion.

This phase establishes whether the normal product works under its claimed
conditions. Later phases deliberately test convincing wrong implementations,
dependency failures, and recovery.

### 4. Report what actually works

Give every selected capability one result:

- **Working:** The complete expected behavior and resulting state were obtained
  and repeated under the claimed conditions.
- **Working with limitations:** The central behavior works, but the evidence
  covers a narrower workload, environment, interface, state transition, or
  degree of repeatability than the product claims.
- **Not working:** The delivered product did not produce the expected behavior
  or correct resulting state.
- **Blocked:** A required dependency, credential, dataset, environment, or
  hardware target could not be obtained after the agreed attempts.
- **Not tested:** The capability was deliberately left outside the performed
  audit.

For each result, state:

- what was tested;
- what happened;
- the evidence;
- the exact conditions;
- any repairs required;
- what the result establishes;
- what it does not establish; and
- any resulting finding.

Do not average the results into a score. The audit should make mixed results
easy to see rather than hiding them behind “mostly working.”

## A Moria-shaped example

Moria claims to be a reusable voxel-world substrate, not merely a
demonstration application. A functional audit could cover these defining
capabilities.

### External consumption

A clean downstream Rust/Bevy project pins the audited Moria revision and uses
only the public facade to configure a world, obtain a meaningful observation,
submit an edit, and observe completion.

If the included demo works but the external consumer cannot perform the same
representative behavior, the reusable-substrate capability is not working.

### Editable and persistent world

Run the visual consumer, enter the generated world, remove or place material,
and verify the resulting world state. Save through the supported interface,
terminate the process, reload from a clean process, and verify that the same
change remains visible and queryable.

Successful file creation is not sufficient if the restored world is wrong.

### Responsiveness and intended workload

Run the agreed edit and streaming workload on the named machine. Measure from
the user or consumer action to the promised visible consequence, while
checking that the resulting world remains correct.

An internal timer beginning after the request has already waited cannot
establish the user-facing latency claim. A reduced world or different machine
supports only a narrower conclusion.

### Architectural expectation

A successful world demonstration cannot establish that Moria is the
GPU-resident substrate the client commissioned. The same visible behavior may
be produced by a CPU-authoritative implementation.

Record the functional result and its architectural limitation separately. The
later adversarial phase must use evidence capable of distinguishing the
promised architecture from the convincing substitute.

## Copyable agent prompt

> Independently audit whether the delivered product performs the defining
> capabilities in its product expectation worksheet under the conditions it
> claims to support. Group related requirements into complete product scenarios
> rather than creating a test for every internal feature. For each scenario,
> state the user or consumer, starting state, action, visible result, resulting
> state, claimed conditions, failure condition, and evidence limit. Pin the
> exact product and use its supported route. Preserve the first attempt.
> Classify required changes as environment repair, instruction repair, or
> product repair; a product repair means the delivered target did not pass.
> Exercise the stated workload or environment where relevant, inspect final
> product state, and repeat successful scenarios cleanly. Assign working,
> working with limitations, not working, blocked, or not tested to every
> selected capability. Do not infer success from compilation, intermediate
> events, process health, generated reports, reduced workloads, or private
> developer routes.

## Required output

Produce one product audit record containing:

- the exact product audited;
- the defining capabilities and complete scenarios selected;
- the claimed operating conditions;
- first attempts and repairs;
- observed behavior and resulting state;
- workload evidence where applicable;
- repeatability;
- the audit result for every capability;
- material findings; and
- explicit blocked, untested, and unsupported areas.

Create separate [finding records](../../shared/finding.md) only for material
issues requiring their own owner or remediation. Use a
[blocked-finding record](../../shared/blocked-finding.md) when a required
observation cannot be reached after the agreed attempts.

## Preserve as evidence

Preserve target identity, scenario, starting state, first attempt, repair
classification, supported route, resulting product state, raw receipts,
workload and environment identity, repetition result, and limitations.

## Stop and escalate

Stop a scenario when:

- the target cannot be identified;
- continuing could affect real customers or uncontrolled production state;
- required data cannot be handled safely;
- the proposed setup action is actually a product modification;
- the required environment remains unavailable; or
- the available substitute removes the behavior being audited.

Record the result as not working, blocked, or not tested as appropriate. Do not
improvise a passing result.

## Review test

A nontechnical owner can answer:

- Does the application's important functionality actually work?
- Does it produce the correct resulting state?
- Under what workload and conditions was it tested?
- What works only with limitations or undocumented help?
- What is broken?
- What could not be tested?
- Which product claims remain unsupported?

A technical reviewer can identify the exact product, reproduce the successful
scenarios, inspect the evidence, and see where each conclusion ends.
