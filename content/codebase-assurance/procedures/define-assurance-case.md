---
schemaVersion: 1
kind: procedure
id: codebase-define-assurance-case
title: Define the decision and assurance case
version: 0.1.0
status: draft
summary: Identify the claims a real decision relies on and define how each claim could be supported, qualified, or defeated.
playbook: codebase-assurance
phase: define-assurance-case
purpose: Give the assurance work a finite set of consequential propositions to investigate without turning the engagement into product discovery or backlog writing.
inputs: [Accountable sponsor, Engagement trigger, Consequential concern, Product promises, Available product material]
outputs: [Decision statement, Claim map, Selected assurance case, Conditions and exclusions]
---
# Define the decision and assurance case

This procedure establishes what the assurance work will investigate.

It does not require the client to arrive with a neatly formulated decision. A
client usually arrives with a trigger: an approaching launch, an AI-built
system they no longer understand, a proposed increase in agent authority, or a
claim they are becoming nervous about. The operator turns that trigger into
the specific action or trust decision the evidence must inform.

The procedure does not ask the product owner to design a proof, and it does not
ask the operator to define the whole product. It identifies claims already
being made, formulates the consequential decision that relies on them, and
turns the important claims into propositions that evidence can support or
defeat.

A user story describes something somebody wants a product to do. An assurance
proposition describes something people already believe, promise, or rely upon
as true.

> User story: As a developer, I want to build a game with Moria.
>
> Assurance proposition: Moria's reference game uses no engine capability that
> is unavailable to an independent consumer.

The first belongs in a backlog. The second can be investigated.

## Required output

At the end, the decision owner and operator should have:

1. one decision statement;
2. the product promises and assumptions on which that decision relies;
3. a claim map that decomposes broad promises into investigable propositions;
4. an evidence question and a falsification question for every selected
   proposition;
5. conditions and exclusions attached to individual claims; and
6. an agreed list of claims this assurance engagement will investigate.

Agreement means that the decision statement captures what the sponsor may do
and that the claims accurately represent what the action relies upon. It does
not mean that the sponsor has declared the claims true.

## Roles

**Sponsor and eventual decision owner:** the person authorized to act on the
result. They explain why the work is happening now, what concerns them, what
actions are available, and the consequences of error. They are not expected to
arrive with a formal decision statement. They confirm the one developed with
the operator and confirm the final assurance case.

**Operator:** the person running this procedure. They extract claims, expose
assumptions, decompose broad language, propose falsification strategies, and
write the record. This is the consultant's work; do not delegate it to the
decision owner.

**Product and operational contributors:** people who can explain what is
promised, how the product is used, and what happens when it fails. They provide
source material and correct factual misunderstandings. They do not get to
silently weaken a claim after an uncomfortable challenge appears.

## Inputs

The minimum inputs are:

- an accountable sponsor who can act on the result;
- a concrete trigger or consequential concern;
- the product, release, migration, or operating change under consideration;
- the material used to describe or justify it; and
- access to at least one person who understands how it is used or operated.

A trigger explains why the assurance work is being considered. A decision
states what somebody may do differently after seeing the evidence. The trigger
is an input; formulating the decision is part of this procedure.

| Client arrives with this trigger | Operator helps formulate this assurance decision |
| --- | --- |
| “Agents built most of this and I no longer know what I can trust.” | Which capabilities may remain under agent delivery authority, and which require a human or executable gate before release? |
| “We are about to put our first enterprise customer on the service.” | Can we place that customer on this release under the promised isolation, recovery, and data-handling conditions? |
| “The tests pass, but retries have caused incidents before.” | Can recurring billing move to this service without duplicate charges or false success under the named retry and provider-failure paths? |
| “We are about to implement Moria with many parallel agents.” | Is Moria’s product and design contract coherent enough to authorize parallel implementation, and which propositions must become executable gates? |
| “We want to describe this repository as a reusable platform.” | Does the current evidence justify that public claim, or only a narrower claim about its reference application? |

The right-hand column is not boilerplate to accept immediately. It illustrates
the more precise action the operator must develop and confirm with the sponsor.

Useful source material includes:

- the website, proposal, release announcement, or sales demonstration;
- README, product brief, requirements, and architecture decisions;
- public interfaces and documented workflows;
- test names, dashboards, service objectives, and release gates;
- incident reports and known failure modes; and
- statements such as "production-ready," "reusable," "safe to retry,"
  "isolated," "recoverable," or "the same artifact we tested."

Do not postpone the exercise until the documentation is tidy. Conflict between
the sources is useful evidence.

## Prepare the working record

Before the discussion, create these four empty tables.

### Engagement trigger

| Field | Record |
| --- | --- |
| Accountable sponsor | Who can act on the result? |
| Why now? | What launch, incident, claim, authority change, investment, or uncertainty triggered the work? |
| Consequential concern | What might be wrongly trusted? |
| Product or change | What is creating the concern? |
| Exposure | Which users, money, data, operations, reputation, safety, or authority could be affected? |

### Decision to formulate

| Field | Record |
| --- | --- |
| Action the evidence could change | What might be launched, adopted, trusted, migrated, narrowed, delayed, or given more authority? |
| Decision owner | Who has authority over that action? |
| Decision date or trigger | When will the action be taken or reconsidered? |
| Consequence of a false positive | What happens if assurance says yes when it should not? |
| Consequence of a false negative | What happens if assurance says no when the product was adequate? |

### Candidate claims

| ID | Exact claim or implication | Source | Who relies on it | Consequence if false |
| --- | --- | --- | --- | --- |
| C-01 |  |  |  |  |

Preserve the source language before improving it. "Production-ready" may be
vague, but its vagueness and source still matter.

### Selected propositions

| ID | Proposition | Supports | Evidence question | Falsification question | Conditions and exclusions | State |
| --- | --- | --- | --- | --- | --- | --- |
| P-01 |  |  |  |  |  | proposed |

## Human procedure

### 1. Turn the trigger into a decision

Open with:

> We are not going to define every feature or review the whole repository in
> this session. Let us start with why you called us. Then we will identify what
> you might do differently depending on the evidence and which claims that
> action would rely upon.

Ask:

- Why is this work being considered now?
- What are you worried may not be true?
- What is currently blocked, approaching, or becoming more consequential?
- If the evidence increases your confidence, what action becomes possible?
- If it weakens your confidence, what would you stop, narrow, delay, or put
  behind a stronger gate?
- What exactly might be released, adopted, sold, migrated, or given more
  authority?
- Who can approve that action?
- What would make that person stop, narrow, or delay it?
- What would a mistaken approval expose: users, money, data, operations,
  reputation, safety, or authority?

Write one sentence:

> **[Decision owner] must decide whether to [action] [named product or change]
> for [named use or environment], knowing that an incorrect approval could
> [consequence].**

If the sponsor begins with "understand the codebase," "improve quality," or
"make it safe," do not simply reject the answer. Ask what new action that
understanding or confidence would enable, and what action a bad result would
prevent. The consultant is responsible for helping convert the concern into a
decision.

If there are several independent decisions, record them separately. Do not
hide a programme of work inside one sentence.

### 2. Inventory claims already in circulation

Do not ask, "What should the product be able to do?" That produces
requirements and user stories.

Instead, inspect each source and ask:

- What does this material say is true now?
- What does the demonstration invite an observer to conclude?
- Which claims are repeated in customer, investor, release, or internal
  language?
- What must engineers and operators assume in order to use it as intended?
- What does the current gate claim when it turns green?
- Which adjectives carry an unstated guarantee: reusable, reliable, isolated,
  deterministic, secure, scalable, recoverable, production-ready?
- Which previous failure would be costly to repeat?

Enter the words actually used in the candidate-claims table, with their source
and consequence. An implication belongs in the table too, but label it as the
operator's interpretation until the decision owner confirms it.

The purpose is not to list every behavior. Prefer claims that somebody would
rely upon when taking the newly formulated action and whose failure would
change it.

### 3. Choose the top-level proposition

Ask:

> What is the shortest factual statement that would justify this decision if
> it were well supported?

For Moria, the answer was not "users can make games." It was:

> Moria is a reusable voxel-world substrate rather than an
> application-specific engine disguised by a convincing reference game.

This is the top-level proposition. It may still be too broad to test directly.
Its job is to explain why the more specific propositions belong together.

Avoid:

- desires: "developers want...";
- plans: "the team will...";
- activities: "the repository has been reviewed...";
- universal claims: "the system is safe";
- feature inventories; and
- conclusions defined by the existing tests: "all supported behavior passes
  the suite."

### 4. Decompose the proposition

Ask repeatedly:

> What facts would have to be true for a skeptical reviewer to accept this
> proposition?

Write the answers as present-tense factual statements. Do not use the
"as a...I want..." form.

For the Moria proposition, a first decomposition is:

1. The reference game obtains world state and requests mutations only through
   interfaces available to an independent consumer.
2. Game-specific rules and lifecycle state do not control the reusable
   substrate from inside its package boundary.
3. The public interface exposes the information required to implement the
   reference game's promised diagnostics.
4. User-visible mutation latency is measured from the consumer action rather
   than from a later internal processing event.
5. Resource claims distinguish portable application accounting from memory
   that the available measurement cannot observe.

For each proposed statement, ask:

- Is this an assertion about the current product rather than a desired
  feature?
- Could a competent investigator gather evidence for or against it?
- Could it be false while the demonstration and current test suite remain
  green?
- Does its failure materially weaken the parent proposition?
- Is it distinct from the other propositions?

Continue decomposing when a statement is still an adjective or bundles several
independent facts. Stop when the statement can be investigated through
specific observations without inventing a new product.

The child propositions do not need to prove the parent with mathematical
completeness. They must expose the material ways the parent could be
undeserved. Record important uncovered assumptions rather than pretending the
map is exhaustive.

### 5. Give each proposition an evidence question

Do not decide the exact test yet. State what needs to be learned.

Ask:

> What would we need to observe to have a defensible reason to rely on this
> proposition?

Example:

> Can the reference game be built and exercised as an ordinary external
> consumer using only the documented public package surface?

Evidence questions should point toward observable behavior, dependency
direction, state, artifacts, or operating results. "Does the code look good?"
and "Are there tests?" are not evidence questions.

### 6. Give each proposition a falsification question

Ask:

> How could the product appear to satisfy this proposition while the
> proposition was actually false?

Then:

> What safe observation, counterexample, mutation, alternate consumer, failure
> injection, or dependency trace would expose that cheaper implementation?

For the public-consumer proposition:

> Does the reference game import private modules, receive friend access, read
> derived render state as authority, depend on workspace-only configuration,
> or use a mutation path unavailable to an external consumer?

This question is mandatory. If the group can describe only confirming
evidence, the proposition is not ready for assurance.

Do not ask the decision owner to design the technical challenge. The operator
drafts it, checks feasibility with relevant contributors, and retains
responsibility for its independence.

### 7. Attach conditions and exclusions to the claim

Do not "draw the product boundary." Record only the boundary required to
interpret each proposition:

- the revision or release;
- supported public surface;
- consumer or operator;
- environment and configuration;
- workload or failure conditions;
- external dependencies;
- explicitly excluded behavior; and
- any measurement limitation.

An exclusion narrows what the proposition says. It must not quietly remove the
failure mode that made the proposition important.

Bad:

> Reusable, excluding consumers outside the repository.

That exclusion destroys the meaning of reusable.

Useful:

> Evaluated for a Rust consumer using the documented package interface on the
> supported toolchain; editor tooling and the future game are outside this
> claim.

If the proposition needs an enormous boundary description, it is probably
still several propositions.

### 8. Select the assurance case

Select a proposition when:

- the newly formulated decision relies on it;
- its failure has a material consequence;
- there is meaningful uncertainty or a plausible cheaper implementation; and
- the engagement can obtain evidence that changes confidence in it.

Do not select a claim merely because it is easy to test. Do not omit a
consequential claim merely because access is missing; record it as proposed and
surface the access problem in the acceptance contract.

There is no required number. A narrow release decision may depend on two
propositions. A broad platform claim may require several. If the list is too
large to investigate honestly, narrow the decision or split the work. Do not
pretend sampling the easy claims supports the whole proposition.

### 9. Read the case back for confirmation

Use this language:

> You are deciding **[decision]**. The decision currently relies on
> **[top-level proposition]**. We propose investigating propositions
> **[IDs and short names]** because their failure would **[consequences]**.
> We will investigate them under **[important conditions]** and will not make
> claims about **[exclusions]**. A proposition may finish supported, qualified,
> unsupported, or blocked. Are these the claims your decision actually relies
> on, and have we omitted a failure that would change it?

Ask the decision owner to confirm the wording and relevance of the case, not
its truth.

Record disagreements. If one person says "reusable library" and another says
"the demo is the only supported consumer," that disagreement is not a workshop
detail to smooth over. It is evidence that the product claim is unresolved.

## After the session

The operator must:

1. trace each selected proposition back to its source material;
2. check that the proposition does not promise more than the source or remove
   the consequence that made the source important;
3. perform a brief repository and system orientation to find obvious hidden
   dependencies or missing claims;
4. update the map with any newly exposed assumption, visibly marked as an
   operator addition;
5. return material additions or changed wording to the decision owner; and
6. copy the selected case into the engagement's acceptance criteria.

Repository inspection may reveal a claim the discussion missed. Add it
explicitly. Never expand the case silently.

## Worked Moria session

The following is abbreviated, but it shows who does the reasoning.

**Operator:** Why are you asking for assurance now?

**Decision owner:** We are preparing to implement Moria with many parallel
agents. A contradiction could produce a great deal of plausible but
incompatible code before we see it.

**Operator:** If the contract is coherent, what will you authorize? If it is
not, what changes?

**Decision owner:** We will release the decomposed implementation work to the
agents only when the design supports one product and the important claims have
gates. Otherwise we will stop and repair the contract first.

The operator records:

> The decision owner must decide whether to authorize parallel implementation
> of Moria under the reviewed product contract, knowing that an incorrect
> approval could multiply contradictory implementations across the codebase.

**Operator:** What are you asking somebody adopting it to believe?

**Decision owner:** That it is an engine, not just the code behind one nice
demo.

**Operator:** Where do they encounter that promise?

**Decision owner:** The project description, package structure, public API,
reference executable, and roadmap all imply it.

The operator records the source language and proposes:

> Moria is a reusable voxel-world substrate rather than an
> application-specific engine disguised by a convincing reference game.

**Operator:** Suppose the reference game looks correct but imports private
world storage. Would it still demonstrate reusability?

**Decision owner:** No. A downstream game would not have that access.

The operator adds:

> The reference game obtains world state and requests mutations only through
> interfaces available to an independent consumer.

**Operator:** Suppose the public API permits ordinary play but cannot implement
the diagnostics the reference game promises without scanning the whole world
or reading internal state.

**Decision owner:** Then either the diagnostics are not evidence of the public
product or the public API is incomplete.

The operator adds the diagnostic proposition and records two falsification
paths: privileged access and an unbounded scan.

The discussion continues through lifecycle ownership, latency measurement, and
resource accounting. These are not five requested features. They are five
ways the existing "reusable substrate" claim could be undeserved while the
implementation remained locally plausible.

The decision owner confirms that failure of any of the selected propositions
would narrow or delay the release claim. They do not confirm that the
propositions are true. The remaining phases investigate that.

## Copyable agent prompt

> Act as an assurance operator preparing a claim-mapping session. Do not write
> user stories, invent desired features, or infer product intent from the test
> suite. From the supplied material, extract exact statements and implications
> that people currently rely upon. Preserve each statement's source and label
> your own interpretations. Begin with the engagement trigger and consequential
> concern. Propose the specific action the evidence could enable, narrow,
> delay, or prevent; name who has authority over it; and state the consequence
> of incorrect approval. Do not assume the client has already formulated this
> decision. Propose one factual top-level proposition
> that explains what must be credible for that decision. Decompose it into
> present-tense propositions whose failure would materially weaken it. For each
> proposition, supply: its parent claim, source, consequence, evidence
> question, falsification question, conditions, exclusions, and unresolved
> ambiguity. Prefer claims that could remain false while the demonstration and
> current tests look successful. Do not claim that the child propositions are
> exhaustive. Mark missing authority, conflicting intent, and unavailable
> evidence for human resolution. Finish with the exact questions the operator
> must ask the decision owner; do not represent the case as agreed until that
> confirmation occurs.

## Preserve as evidence

Keep:

- source material and exact original wording;
- interview notes or an approved written record;
- operator interpretations and who confirmed them;
- every revision of selected proposition text;
- disagreements and unresolved assumptions;
- additions made after repository orientation;
- the decision owner's confirmation; and
- the final claim map used by the remaining assurance work.

The record should distinguish what the product claimed before assurance from
language introduced during assurance.

## Stop and escalate

Do not proceed as though the case were agreed when:

- nobody is authorized to make the resulting decision;
- no concrete decision depends on the work;
- stakeholders rely on incompatible versions of the product;
- the top-level proposition is actually an unbounded aspiration;
- a selected proposition describes future functionality rather than the
  current product;
- a material proposition has no conceivable falsification question;
- the proposed exclusions destroy the meaning of the claim; or
- the available access cannot produce evidence relevant to the decision.

These outcomes may justify a product-definition exercise, a narrower decision,
changed access, or an evidenced blocked finding. They are not permission to
invent intent.

## Review test

Give the claim map and source material to a reviewer who did not attend the
session. They should be able to answer:

1. What decision will this work change?
2. What is the product already claiming?
3. Why does each selected proposition matter to that decision?
4. What could make each proposition appear true when it is false?
5. What evidence would change confidence?
6. Under what conditions will the conclusion apply?
7. What has deliberately not been claimed?

The procedure is incomplete if the reviewer receives a feature backlog, a
generic product diagram, a promise to review the whole repository, or a list
of claims defined only by the tests that already pass.
