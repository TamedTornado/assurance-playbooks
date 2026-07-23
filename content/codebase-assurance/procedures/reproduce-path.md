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

Now audit the delivered application itself.

The question is:

> Does the delivered product perform its important functions correctly under
> the conditions it claims to support?

This is not an exhaustive regression test of every feature. It is an
independent assessment of the capabilities, qualities, and operating boundaries
that define whether the product is genuinely usable.

## What this phase establishes

For each important product capability, establish:

- whether the complete behavior can actually be performed;
- whether the resulting state is correct;
- whether it works through the supported interface;
- whether it works from a clean and documented starting point;
- whether the result is repeatable;
- whether stated performance or scale requirements are met where relevant; and
- what remains broken, partial, blocked, or untested.

A product does not pass merely because it compiles, opens, or presents an
attractive demonstration.

For example:

- Compiling a library does not establish that another application can use it.
- Accepting a request does not establish that the requested work completed.
- Displaying an edit does not establish that it was saved correctly.
- Producing a report does not establish that the reported threshold was met.
- Passing a small workload does not establish the claimed production capacity.
- A healthy process does not establish correct product state.
- A convincing demo does not establish that the supported product interface
  was used.

## Inputs

Bring:

- the product expectation worksheet;
- the design consistency review;
- the delivered repository, artifact, or deployment;
- the exact version under audit;
- installation, build, deployment, and operating instructions;
- representative accounts, data, assets, and integrations;
- stated performance, scale, and reliability requirements;
- any demonstrations or acceptance evidence already supplied; and
- access to the environments required by the product's claims.

## Human procedure

### 1. Identify the functions that define the product

Return to the product expectation worksheet.

Ask:

> If these things do not work, is this still the product it claims to be?

Select the important capabilities that define the delivered product. Include:

- its central user workflows;
- the supported interfaces used by customers or downstream systems;
- important state changes and persistence;
- consequential calculations or transformations;
- required integrations;
- stated performance or scale characteristics; and
- architectural constraints whose violation would materially change the
  product.

Do not choose functions merely because they are easy to demonstrate. Do not
attempt to test every button, endpoint, or helper.

A typical audit might select five to ten capabilities. A small product may
require fewer. A larger product may require representative scenarios grouped
by capability.

### 2. Record the claimed operating conditions

For each capability, record the conditions under which it is supposed to work:

- intended user or consumer;
- supported environment;
- relevant data shape and volume;
- expected concurrency or workload;
- required dependencies;
- performance boundary;
- persistence and recovery expectations; and
- explicitly unsupported conditions.

This defines the audit boundary.

“Works on the developer's machine with sample data” cannot establish a claim
about production load. Conversely, an internal prototype should not be failed
against operating conditions it never claimed to support.

### 3. Define a complete audit scenario

Write a concrete scenario for each selected capability:

- **Starting state:** What product, account, data, and environment exist before
  the test?
- **Action:** What does the user, consumer, or operator do?
- **Expected result:** What should visibly happen?
- **Expected state:** What should be true after the action?
- **Failure condition:** What result would show that the capability is broken?
- **Evidence:** What observation or artifact can establish the result?
- **Limit:** What does this scenario not prove?

Prefer complete product behavior over internal milestones.

For example:

> Starting from an unmodified saved world, a player removes material from a
> solid hillside, sees the surface update, saves the world, terminates the
> process, reloads the save, and observes the same removed material.

This is stronger than separate checks that an edit command was accepted and a
save file was written.

### 4. Pin the delivered product

Record the identity of what is being audited:

- repository and commit;
- release or deployment artifact;
- local modifications;
- configuration and feature flags;
- data and asset versions;
- external dependency versions where material; and
- named hardware when the claim depends on it.

Do not audit an unidentified branch, mutable image tag, unexplained local
build, or convenient replacement revision.

If the team cannot identify the delivered product, record that as an audit
finding.

### 5. Approach the product through its supported route

Use the route available to the intended user or consumer:

- public installation instructions;
- supported package or API;
- ordinary user interface;
- documented deployment;
- normal operator controls; or
- named acceptance harness.

Do not begin with private implementation knowledge.

The original developer may explain the product, but the audit must distinguish
between:

- what the delivered product supports;
- what works only through undocumented knowledge; and
- what can be made to work only by modifying the product.

### 6. Preserve the first attempt

Run the scenario as supplied and preserve:

- the exact commands or actions;
- the starting conditions;
- the observed behavior;
- resulting state;
- errors and warnings;
- produced artifacts;
- measurements where relevant; and
- anything the operator had to infer.

Do not silently repair the environment, instructions, data, or product before
recording the first result.

The first attempt establishes whether the delivered product can be used as
delivered.

### 7. Classify every required repair

Before changing anything, classify the proposed repair.

#### Environment repair

The audit environment lacks a documented prerequisite or required access.

Examples include installing the documented toolchain, obtaining a required
test credential, or using the named hardware profile.

#### Instruction repair

The product can perform the behavior, but its supplied instructions are
missing, stale, ambiguous, or incorrect.

Examples include an undocumented startup command, a missing migration step,
controls absent from the user documentation, or a required environment
variable described under the wrong name.

#### Product repair

The delivered code, shipped configuration, data, assets, supported interface,
or product behavior must change.

Examples include implementing a missing API, correcting corrupted state,
changing a workload threshold, modifying the application so the scenario can
complete, or granting the demo access unavailable to real consumers.

A product repair means the delivered product did not pass that scenario. A
later repaired version may be audited separately, but it does not erase the
original result.

### 8. Execute the complete scenario

Run through to the actual product consequence.

Check both the visible behavior and resulting state.

Depending on the capability, this may require inspecting:

- persisted data;
- downstream effects;
- generated artifacts;
- external-system state;
- authorization boundaries;
- timing and resource measurements;
- behavior after restart; or
- results observed by another consumer.

Do not stop at the first green intermediate result.

### 9. Exercise the stated operating boundary

Where the capability includes a stated workload, scale, latency, or resource
expectation, repeat the scenario under that condition.

Use the workload the product claims to support—not an arbitrary stress test and
not a smaller convenient proxy.

Record:

- workload identity;
- data volume;
- concurrency;
- duration;
- machine and environment;
- warm or cold state;
- observed latency and throughput;
- resource consumption;
- errors and degraded behavior; and
- resulting product state.

A threshold measured on another machine or with another workload remains
evidence for that narrower condition only.

This phase establishes whether the claimed operating case works. Later phases
deliberately challenge dependency failure, recovery, and deceptive evidence.

### 10. Repeat successful scenarios from a clean state

For any scenario considered successful:

- restore the documented starting state;
- repeat the procedure without relying on shell history or unstated setup;
- use a second operator or clean environment where practical; and
- compare the material result.

A single successful run is an observation. A repeatable run supports a stronger
audit conclusion.

### 11. Assign an audit result

Give every selected capability one result.

#### Working

The complete expected behavior and resulting state were obtained and repeated
under the claimed conditions.

#### Working with limitations

The central behavior works, but a material limitation remains, such as a
narrower workload, one supported environment, undocumented setup, incomplete
persistence, weaker measurement, or lack of independent repetition.

#### Not working

The delivered product did not produce the expected behavior or correct
resulting state.

#### Blocked

A required environment, dependency, credential, dataset, hardware target, or
external system could not be obtained after the agreed attempts.

#### Not tested

The capability was deliberately left outside the performed audit.

For every result, state:

- what was observed;
- the evidence;
- the exact conditions;
- the limitation of the conclusion; and
- any resulting finding.

Do not average the results into a score.

## A Moria-shaped example

Moria claims to be a reusable voxel-world substrate, not merely a
demonstration application.

The functional audit should therefore cover capabilities such as these.

### External consumption

A clean downstream Rust/Bevy project pins the audited Moria revision and uses
only the supported public facade to configure a world, obtain a meaningful
world observation, submit an edit, and observe completion.

If the included demo works but the external consumer cannot perform the same
representative behavior, the reusable-substrate capability is not working.

### Continuous editable world

Run the actual visual consumer and verify that a user can enter the generated
world, travel through representative terrain, identify a solid hillside,
remove or place material, and observe the correct surface change.

The resulting world state must agree with the visible result.

### Persistence

After an edit, save through the supported interface, terminate the process,
start from a clean process, reload the save, and verify the edited world through
supported queries and presentation.

Successful file creation is not sufficient if the restored world is wrong.

### Responsiveness

Run the agreed edit workload on the named machine and measure from the user or
consumer action to the promised visible consequence.

An internal measurement beginning after the request has already waited cannot
establish the user-facing latency requirement.

### Intended workload and scale

Run the agreed representative world, streaming, mutation, and presentation
workload with its required data and machine profile.

Record whether the product remains correct while meeting the claimed latency,
throughput, and resource boundaries.

### Architectural expectations

A successful functional demonstration does not automatically establish that
the product uses the commissioned architecture.

The visual world may work while CPU-authoritative state has replaced the
promised GPU-resident substrate. Functional evidence should record that
limitation. The later adversarial phase must use evidence capable of
distinguishing the promised architecture from a convincing substitute.

## Copyable agent prompt

> Independently audit whether the supplied delivered product performs the
> important functions defined by its product expectation worksheet under the
> conditions it claims to support. Select the capabilities that define the
> product rather than every feature. For each capability, draft a complete
> scenario containing starting state, user or consumer action, visible result,
> resulting state, failure condition, evidence, claimed workload, and the limit
> of the conclusion. Pin the exact product and use its supported route.
> Preserve the first attempt before suggesting changes. Classify every proposed
> change as an environment repair, instruction repair, or product repair; a
> product repair means the delivered target did not pass. Execute through the
> complete product consequence, exercise stated operating boundaries where
> relevant, and repeat successful scenarios cleanly. Assign working, working
> with limitations, not working, blocked, or not tested to every selected
> capability. Do not infer success from compilation, intermediate events,
> process health, generated reports, reduced workloads, or private developer
> routes.

## Required output

Produce one product audit record containing:

- the exact product audited;
- its claimed operating conditions;
- the defining capabilities selected;
- the scenario for each capability;
- first attempts;
- environment, instruction, and product repairs;
- observed behavior and resulting state;
- workload and performance evidence where applicable;
- repeatability;
- audit result for every capability;
- findings; and
- explicit untested or unsupported areas.

Create separate [finding records](../../shared/finding.md) only for material
issues requiring their own owner or remediation. Use a
[blocked-finding record](../../shared/blocked-finding.md) when a required
observation cannot be reached after the agreed attempts.

## Preserve as evidence

Preserve target identity, scenario, starting state, first attempt, repair
classification, exact route, resulting product state, raw receipts, workload
identity, environment, repetition result, and limitations.

## Stop and escalate

Stop a scenario when:

- the target cannot be identified;
- continuing could affect real customers or uncontrolled production state;
- required data cannot be handled safely;
- the proposed setup action is actually a product modification;
- the required environment remains unavailable; or
- the available substitute removes the behavior being audited.

Record the scenario as not working, blocked, or not tested as appropriate. Do
not improvise a passing result.

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
