---
schemaVersion: 1
kind: procedure
id: codebase-understand-expected-product
title: Understand what was supposed to be built
version: 0.1.0
status: draft
summary: Reconstruct what the client expected, confirm it in plain language, and translate it into an independent technical investigation.
playbook: codebase-assurance
phase: understand-expected-product
purpose: Give a client who cannot independently inspect the implementation a faithful account of what will be investigated and why.
inputs: [Client account, Repository, Available product material, Demonstrations and completion evidence, Access]
outputs: [Product expectation brief, Source comparison, Investigation plan]
---
# Understand what was supposed to be built

A client may be able to use the product without being able to inspect it.

They may have commissioned a Rust system they cannot read, received a polished
demonstration from an agent pipeline, and been told that the tests pass. Their
question is not yet an assurance proposition or a formal decision. It is
usually much more direct:

> Is this actually what I asked for, and what can I trust?

This procedure begins there. The operator reconstructs what the client
reasonably expected, compares that account with the available project
material, and confirms the result in ordinary language. Only then does the
operator translate those expectations into technical questions, evidence
needs, and falsification strategies.

The client is not expected to read the implementation, define proof
obligations, or design the investigation. That is the work they are engaging
the operator to do.

## Required output

This procedure produces two connected artifacts.

### Product expectation brief

This is written for the client. It records:

- what they believed they commissioned;
- what they believe has been delivered;
- the visible behavior they expected;
- expected performance, scale, reliability, and resource use;
- architectural promises and prohibited shortcuts that mattered to them;
- demonstrations, reports, tests, or other evidence they were shown;
- what they cannot independently verify;
- what they expect to do with the product next; and
- conflicts or omissions in the available accounts.

The client confirms that this is a faithful description of their expectations
and concerns. They do not confirm that the implementation satisfies it.

### Investigation plan

This is owned by the operator. It translates the expectation brief into:

- the technical questions that must be answered;
- the relevant repositories, revisions, interfaces, workflows, environments,
  measurements, and dependencies;
- the ways an implementation could appear correct while violating an
  important expectation;
- the evidence that would increase or reduce confidence;
- priorities, access requirements, and limitations; and
- the plain-language conclusions the investigation must eventually provide.

This is not the final assurance result. It is the reasoned plan for obtaining
one.

## Roles

**Client representative:** explains what they were trying to obtain, what they
were told, what they have seen, what they cannot verify, and what they expect
to do next. They may be nontechnical. Their lack of implementation knowledge
is not a deficiency to work around; it is one reason independent assurance is
valuable.

**Operator:** leads the conversation, preserves the client's language,
compares it with project material, identifies ambiguity and disagreement, and
turns the result into an independent technical investigation. The operator
does not make the client invent tests or translate their concern into
engineering terminology.

**Technical contributors:** explain source material, implementation intent,
and operational behavior. Their account is evidence, not the automatic truth.
It may conflict with the client's account, written requirements, or observed
system.

**Accountable sponsor:** can grant access, choose priorities when the possible
scope is too large, and act on the final results. This may be the client
representative or another person.

## Inputs

Begin with whatever the client actually has:

- their own account of what they commissioned;
- the source repository and available revision history;
- requirements, design documents, architecture records, and plans;
- demonstrations, screenshots, videos, deployed environments, or prototypes;
- test reports, benchmarks, completion summaries, and agent reports;
- statements from developers, vendors, or technical partners;
- incident reports and known concerns; and
- access to people and environments needed to understand the product.

A formal specification is useful but not required. Missing, conflicting, or
retrospectively altered documentation is itself relevant.

Do not require a pending decision, a product boundary, or a prepared list of
claims. The operator may learn about an approaching launch, a planned
extension, or a desired increase in agent authority during the conversation.
Those plans help prioritize the work; they are not admission requirements.

## Human procedure

### 1. Let the client tell the story

Begin without technical categories:

> Tell me what you were trying to have built, how the work unfolded, what you
> believe you have now, and what has made you uncertain about it.

Let the client complete the account before turning it into a checklist.
Capture their phrases verbatim when they describe a promise, constraint, or
concern.

Then ask:

- What did you originally ask for?
- What were you told had been completed?
- What have you personally seen working?
- What are you taking on trust?
- What do you most want an independent person to tell you?
- Is there anything you expected that now seems absent, different, or hard to
  demonstrate?

Do not correct technical language during this first account. If a client says
"the voxels were supposed to be only on the GPU," preserve that statement
before trying to interpret it.

### 2. Walk through expectations people forget to mention

Use these prompts to help the client remember material expectations. This is
not a demand that they specify the product again.

| Area | Questions to ask |
| --- | --- |
| Product behavior | What was a user or operator supposed to be able to do? What was the demonstration meant to establish? |
| Quality | How fast, large, responsive, accurate, dependable, or recoverable was it supposed to be? |
| Technical approach | Were you promised anything about how it would be built, where data would live, or which interfaces and dependencies it would use? |
| Forbidden shortcuts | Was it important that the result not depend on a private path, manual step, duplicated authority, mock, proprietary service, or demonstration-only exception? |
| Completion evidence | What were you told would demonstrate completion: tests, benchmarks, a working example, an external consumer, a deployment, or an operational exercise? |
| Future use | What did you expect to build on top of this? Which changes was the architecture supposed to make possible? |
| Failure | What would be a particularly expensive, embarrassing, or dangerous surprise later? |

The client may know an architectural phrase without knowing its implementation
details. Treat it as a meaningful expectation to clarify, not as proof that
the phrase is technically precise.

### 3. Ask where each important expectation came from and why it mattered

For every material expectation, ask:

1. Where did this expectation come from?
2. Was it written down, demonstrated, or explained verbally?
3. Who presented it as part of the product?
4. Why did it matter to you?
5. Was the technical approach itself required, or was it shorthand for an
   outcome such as scale, latency, portability, or control?
6. What would make you say that the delivered result missed the expectation?

The "why" prevents a literal implementation detail from hiding the real
product need.

For example:

> **Client:** The voxels were supposed to live only on the GPU.
>
> **Operator:** What was important about that?
>
> **Client:** I was told that was how we could keep a huge editable world
> without a world-sized copy in ordinary memory.

The investigation must now examine both the architectural expectation and the
scaling reason behind it. A technically GPU-resident design that still fails
the promised workload would not satisfy the underlying expectation. A small
CPU-side index may be compatible with it; a second authoritative voxel copy
may not be.

### 4. Examine what the client was shown

Ask the client or technical contributor to reproduce the demonstration,
benchmark, test report, or completion path they relied upon.

Record:

- what was run or shown;
- which product behavior it appeared to demonstrate;
- the environment and data used;
- what the client inferred from it;
- which parts were not visible;
- whether the evidence can be reproduced now; and
- who created or selected it.

Do not yet decide that the evidence is valid. The purpose is to understand what
confidence it created.

A beautiful reference application might establish that the rendering path can
produce an attractive scene. It does not automatically establish that another
consumer can use the engine, that the demo avoids private interfaces, or that
the tested workload represents the promised scale.

### 5. Compare the available accounts

Create an expectation record:

| ID | Client expectation | What they meant and why it mattered | Source | What they were shown | Project material says | Unknown or conflict |
| --- | --- | --- | --- | --- | --- | --- |
| E-01 |  |  |  |  |  |  |

Compare four things without silently forcing them to agree:

1. what the client expected;
2. what the written material promised;
3. what developers or agents say they built; and
4. what the demonstration or completion evidence appears to show.

At this stage, do not use repository inspection to declare which account is
correct. Record the conflict for investigation.

Useful results from this comparison include:

- the client's expectation is clearly supported by the written product
  contract;
- the written contract is materially narrower than what the client was led to
  expect;
- different documents describe incompatible products;
- completion evidence demonstrates a proxy rather than the promised result;
- an architectural constraint is recorded without the reason it exists;
- a nonfunctional expectation has no workload or measurement;
- a future aspiration has been presented as current capability; and
- nobody can locate the source of a consequential promise.

### 6. Draft the product expectation brief

Write a short narrative before producing technical tables. Use this structure:

> **You commissioned:** [plain-language description of the intended product].
>
> **You believe you received:** [what appears to have been delivered and
> completed].
>
> **You have seen:** [demonstrations, reports, tests, deployments, or visible
> behavior].
>
> **You cannot independently verify:** [important implementation, quality,
> architecture, dependency, and operational expectations].
>
> **The available material currently agrees or conflicts as follows:**
> [important alignments, gaps, and disagreements].
>
> **You expect to use it next for:** [planned use, extension, release, or
> increase in responsibility].
>
> **Our investigation therefore needs to establish:** [plain-language list of
> the important unknowns].

Follow the narrative with the expectation record. A nontechnical reader should
be able to correct the narrative without understanding the repository.

### 7. Confirm the account with the client

Read the brief back:

> This is our account of what you expected, what you believe was delivered,
> what you have actually seen, and what remains opaque to you. Have we
> misunderstood anything important? Is there an expectation here that was only
> a future idea, or a critical promise we have omitted?

Confirmation establishes that the operator heard the client correctly. It
does not establish that every expectation was guaranteed, technically
sensible, or satisfied.

If the client and a technical contributor disagree, preserve both accounts and
their sources. Do not negotiate a more convenient shared memory.

### 8. Translate expectations into an investigation

This is operator work performed after the plain-language account is stable.

For each consequential expectation, determine:

- what technical facts would need to be true;
- where those facts should be visible;
- what evidence could support them;
- how the implementation could look successful while they were false;
- what safe counterexample, alternate consumer, mutation, trace, measurement,
  or failure exercise could expose that;
- which conditions limit the conclusion; and
- what result the client needs explained in plain language.

Use this table:

| Expectation | Technical question | Evidence to seek | How it could be falsely satisfied | Conditions or limitations | Result to explain |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |

Do not turn the expectations into user stories. A user story describes desired
functionality. The investigation tests whether an existing promise, property,
or implementation is real.

Do not mechanically convert every sentence into one formal claim. Several
expectations may belong to one investigation path, and one broad expectation
may require several technical questions.

Example:

> **Expectation:** Moria is a reusable substrate rather than the engine behind
> one privileged demonstration.
>
> **Technical questions:** Does the reference application use only supported
> public interfaces? Do game-specific state and rules control the library?
> Can an independent consumer perform the promised queries and mutations?
>
> **False-success path:** The demonstration looks complete because it imports
> private world state or uses workspace-only configuration unavailable to
> another consumer.

### 9. Prioritize the investigation

Give priority to an expectation when:

- the client considers it central to what they commissioned;
- its failure would materially affect their planned use;
- the available accounts disagree;
- the client has been given confidence by evidence that may prove only a
  proxy;
- an implementation shortcut could remain hidden behind a successful demo or
  green test suite; or
- it affects authority, data, money, operations, safety, or the ability to
  recover.

Ease of testing is not importance. Difficulty of testing is not permission to
omit a consequential expectation.

If the possible investigation is larger than the engagement can support, show
the client the tradeoff in ordinary language:

> We can investigate the reusable-consumer boundary and mutation path deeply,
> or spread the same effort across every subsystem and reach much weaker
> conclusions. Based on your planned use, we recommend going deep here and
> recording the remaining areas as unverified.

Record what is included, what is deferred, and why. Do not describe an
unexamined expectation as low risk merely because it was deferred.

### 10. Return the plan in client language

The operator may maintain detailed technical questions internally, but the
client-facing coverage statement should remain understandable:

> We will determine whether the reference game is an honest external consumer,
> whether authoritative voxel data is duplicated on the CPU, whether the
> performance evidence represents the promised world and mutation workload,
> whether important failures are detectable, and whether the existing tests
> reject plausible shortcuts. We will report what is supported, contradicted,
> or still unknown and install or harden an executable gate on the selected
> high-risk path.

The client confirms that this addresses the important opacity. They are not
being asked to approve the exact test implementation.

## Worked Moria intake

### The client account

The client can run Moria's reference game but cannot read its Rust
implementation. They explain:

> I commissioned a reusable voxel-world substrate. It was supposed to support
> an enormous editable world, feel extremely responsive, and keep the voxels
> only on the GPU. The reference world looks good and I can dig into it, but I
> cannot tell whether that proves the engine is reusable or performant. I also
> intend to build a much larger game on it with parallel agents.

That account contains several different kinds of expectation:

- a product identity: reusable substrate;
- visible behavior: a large editable world;
- quality: responsive mutation;
- architecture: voxel data resident on the GPU;
- evidence: the reference application;
- future use: a larger game implemented through parallel work.

The operator does not ask the client to convert these into proof obligations.

### Clarifying the GPU expectation

**Operator:** When you say the voxels should be only on the GPU, what were you
told that would accomplish?

**Client:** That we could represent a huge world without holding a giant second
copy in normal memory.

**Operator:** Would CPU-side indexes, streaming queues, or dirty-region records
violate what you understood?

**Client:** I do not know. My concern is that we were not supposed to have
another authoritative copy of the world consuming memory and getting out of
sync.

The brief preserves both levels:

> The client expected authoritative voxel payloads to reside on the GPU,
> without an equivalent authoritative CPU copy. The reason was to support a
> large world without world-sized CPU memory or competing state authorities.
> The client did not intend to forbid bounded CPU metadata required for
> streaming and coordination.

The operator can now investigate where voxel payload, indexes, mutations,
persistence state, derived meshes, and caches actually live; whether any CPU
representation is authoritative; whether the authorities can disagree; and
whether memory scales as promised.

### Clarifying “super performant”

**Operator:** What did extremely responsive mean in the product you were
shown?

**Client:** Digging or placing material should appear immediate while moving
through the world. The project material mentioned a small number of rendered
frames.

**Operator:** Was the demonstration using the world size and machine that the
claim was meant to cover?

**Client:** I cannot tell.

The operator records the visible expectation without asking the client to
invent a benchmark threshold. The project material supplies the proposed
frame limit, workload, and target environment. The investigation then asks
whether measurement begins at the user's action or at a later internal event,
whether the demonstration workload is representative, and whether the
reported metric can pass while the user waits longer than promised.

### Clarifying reusability

The client expects the reference game to demonstrate the reusable product.
They cannot see whether it uses private storage, demonstration-only lifecycle
state, or workspace access unavailable to another game.

The investigation therefore asks whether:

- the reference game queries and mutates the world only through public
  interfaces;
- required diagnostics are possible through those interfaces;
- the reusable package depends on downstream game state;
- an independent consumer can build and exercise the supported path; and
- tests reject a consumer that reaches through the intended boundary.

These are not additional features requested from the client. They are ways the
delivered system could look like a reusable engine without actually being one.

### The confirmed brief

The client receives:

> You commissioned a reusable Rust/Bevy voxel-world substrate for a very large
> editable world. You expected the reference application to prove that an
> ordinary downstream game could use it, authoritative voxel payloads to
> remain on the GPU without a world-sized CPU duplicate, and user mutations to
> become visible within the responsiveness described in the project material.
>
> You have seen an attractive walkable world whose terrain can be changed. You
> cannot independently verify whether the demonstration has privileged access,
> whether the implementation follows the promised data ownership, whether the
> measurements represent the user-visible behavior and target workload, or
> whether the tests can detect violations of those properties.
>
> We will compare those expectations with the written contract and actual
> implementation, reproduce the important paths, challenge the existing
> evidence with plausible shortcuts, and report what is supported,
> contradicted, qualified, or still unknown.

The client can approve or correct that account without reading Rust. The
operator then owns the technical investigation.

## Copyable agent prompt

Use an agent to organize source material and challenge the operator's draft,
not to replace the client conversation or declare intent.

> Prepare a product expectation brief and a separate operator investigation
> plan from the supplied client account and project material.
>
> First, preserve the client's important words. Extract what they believed
> they commissioned, what they believe was delivered, what they have directly
> observed, what they cannot verify, how they plan to use the product next, and
> what failure would be consequential. Cover visible behavior, quality,
> performance, scale, reliability, resource use, architectural promises,
> prohibited shortcuts, completion evidence, and future use. For every
> expectation, record its source, why it mattered, what the client was shown,
> what the project material says, and any conflict or missing source. Do not
> resolve conflicting accounts or infer intent from the implementation.
>
> Write a short plain-language narrative that the client could correct without
> reading the source code. Do not use assurance jargon in that narrative.
>
> Second, create an operator investigation plan. Translate each consequential
> expectation into technical questions, evidence to seek, plausible
> false-success paths, conditions, limitations, and the result that must
> eventually be explained to the client. Do not write user stories or desired
> features. Do not treat current tests, demonstrations, developer reports, or
> agent summaries as proof. Mark interpretations as interpretations and list
> the exact questions that require client or contributor confirmation.

## Preserve as evidence

Keep:

- the client's original account and important exact wording;
- sources for each expectation;
- demonstrations, reports, and completion evidence the client relied upon;
- conflicting versions of the product promise;
- operator interpretations and who confirmed or disputed them;
- each confirmed revision of the product expectation brief;
- additions made after technical orientation;
- the client-facing coverage statement; and
- the operator's investigation plan.

The record must distinguish what the client expected before the investigation
from interpretations introduced by the operator.

## Stop and escalate

Stop rather than manufacture certainty when:

- nobody can provide access to the product or material needed to investigate;
- the client and project material describe incompatible products and nobody
  can authorize which account should govern;
- a consequential expectation has been rewritten after delivery with no
  preserved source;
- a demonstration or report the client relied upon cannot be located or
  reproduced;
- the requested breadth permits only a superficial scan and the client will
  not choose a meaningful priority;
- a technical expectation has no recoverable meaning or reason;
- specialist regulatory, safety, or security work is required beyond this
  method; or
- the client expects a universal guarantee that no bounded investigation can
  provide.

An unresolved conflict may itself become a finding. Missing access may become
an evidenced blocked finding. Neither should be rounded into confidence.

## Review test

Give the expectation brief to a representative client who cannot read the
implementation. They should be able to say whether it faithfully describes:

1. what they expected;
2. what they were told was complete;
3. what they have actually observed;
4. what remains opaque;
5. why the important expectations mattered; and
6. what the operator will investigate.

Then give the expectation brief and investigation plan to an independent
technical reviewer. They should be able to trace every high-priority technical
question to a client expectation or project source, identify at least one
false-success path for each consequential area, and explain what evidence
would change confidence.

The procedure is incomplete if it produces only a feature list, asks the
client to design the tests, treats the current implementation as the source of
intent, or presents internal assurance machinery as the client-facing result.
