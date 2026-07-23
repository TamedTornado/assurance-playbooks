---
schemaVersion: 1
kind: procedure
id: codebase-design-counterexamples
title: Map what the product does against what its tests verify
version: 0.1.0
status: draft
summary: Independently inventory product capabilities and existing verification then expose the gaps between them.
playbook: codebase-assurance
phase: design-counterexamples
purpose: Determine which product capabilities the existing verification meaningfully protects and which remain weak falsely protected or untested.
inputs: [Product expectation worksheet, Design consistency review, Product audit record, Application source, Existing tests and CI configuration]
outputs: [Application capability inventory, Verification inventory, Production-system participation map, Capability-to-verification map, Verification findings]
---
# Map what the product does against what its tests verify

The functional audit established what the delivered product can and cannot do
now. This phase asks a different question:

> What does the existing test and acceptance system actually protect?

That cannot be answered by reading test names, counting tests, or looking at
coverage alone. It requires two independently constructed inventories:

```text
What the product does
            compared with
What the existing verification establishes
            reveals
Verification gaps
```

If the audit begins from the tests, it inherits the test authors' view of the
product. Anything they forgot remains invisible. If it inventories only the
application, it cannot distinguish missing protection from protection that
already exists.

This phase evaluates the existing verification. It does not require the
consultant to write replacement integration tests.

## Inputs

Bring:

- the product expectation worksheet;
- the design consistency review;
- the product audit record;
- the application source and runnable product;
- repository test configuration and ordinary test commands;
- continuous-integration configuration;
- test reports and coverage data where available; and
- access to the environment needed to discover and run the existing suite.

## Human procedure

### 1. Inventory the application surface

Build the application inventory independently of the tests.

Use static structure and runtime inspection to discover the supported ways a
person or another system can cause the product to do something:

- user-interface routes, views, forms, controls, and navigation;
- API, RPC, webhook, command-line, and event entry points;
- background jobs, scheduled work, queues, and event consumers;
- roles, permissions, tenancy boundaries, and guards;
- state transitions, durable writes, and generated artifacts;
- external integrations and provider callbacks;
- feature flags, configuration-dependent behavior, and deployment modes; and
- operator actions such as import, migration, backup, restore, and recovery.

For each discovered surface, record:

- where it enters the product;
- who or what can reach it;
- the guard or precondition;
- the implementation path it is wired to;
- its consequential state or output;
- downstream work or integration it triggers;
- material configuration or feature flags; and
- evidence supporting the description.

Preserve different levels of certainty:

- **Declared:** Documentation, UI text, schema, or configuration says it
  exists.
- **Wired:** Static structure connects the entry point to an implementation.
- **Reachable:** The entry point can actually be reached in the running
  product.
- **Observed:** Executing it produced the recorded product behavior and state.
- **Tested:** Existing verification exercises and meaningfully asserts some
  part of it.

Do not promote one level into another. A route in source is not necessarily
reachable. A reachable form is not necessarily functional. Code executed by a
test is not necessarily meaningfully asserted.

Agents can deterministically collect much of this inventory: routes, handlers,
call edges, guards, jobs, schema effects, registrations, feature flags, test
targets, and runtime traces. The operator reviews ambiguous reachability and
product meaning rather than manually discovering every file.

### 2. Organize the surface into product capabilities

A flat list of routes and handlers is not yet a description of the product.
Group related surfaces into capabilities:

> An actor enters through a supported surface, performs an action, and expects
> a consequential product result.

Use a hierarchy that a product owner can recognize:

```text
[Product area]
└── [Capability]
    ├── Entry points
    ├── Preconditions and roles
    ├── Consequential results
    ├── Downstream work
    └── Important dimensions
```

For a CRM, one capability might look like:

```text
Sales
└── Convert a lead
    ├── Entry points
    │   ├── Lead detail interface
    │   └── POST /leads/{id}/convert
    ├── Preconditions
    │   ├── Lead is open
    │   └── User has conversion permission
    ├── Consequential results
    │   ├── Account resolved or created
    │   ├── Contact resolved or created
    │   ├── Opportunity created
    │   ├── Lead marked converted
    │   └── Reporting and background work updated
    └── Important dimensions
        ├── Existing or new account
        ├── Duplicate contact
        ├── Missing permission
        ├── Retry
        └── Background-job failure
```

Record the base capability once. Treat roles, lifecycle states, data shapes,
volumes, dependency modes, and failure cases as dimensions underneath it.

Do not enumerate the full cross-product. Expand a dimension into a separate
scenario only when it changes the product's behavior, risk, or verification.
For example, “existing account plus duplicate contact” needs its own scenario
only if that combination has a distinct consequential result or code path.

Keep traceability back to the discovered surfaces so an operator can inspect
the routes, handlers, transitions, and effects behind the human-readable
capability. Tooling should generate identifiers and relationships; the human
should not maintain joins by hand.

The product expectation worksheet and functional audit help determine whether
the grouping is complete. The application inventory may also reveal
undocumented capabilities, dead surfaces, or implemented scope that was never
authorized. Preserve those rather than silently treating their existence as
product approval.

### 3. Inventory what the existing verification establishes

Construct the verification inventory independently from the application
capability grouping.

#### Establish that the tests are safe to run

Do not begin by executing the project's test command. Existing verification is
part of the codebase being audited and may itself be dangerously configured.
Test discovery can also execute setup modules, framework hooks, application
bootstrap code, or provider initialization.

Before running discovery or tests, resolve:

- configuration precedence and the environment selected by the test command;
- database hosts, names, users, schemas, and reset or migration behavior;
- queue brokers, topics, namespaces, consumers, and purge behavior;
- object stores, buckets, prefixes, filesystems, and cleanup behavior;
- service, webhook, email, SMS, payment, analytics, and model endpoints;
- credential sources and which accounts they authorize;
- customer or production data that could be read, changed, copied, or exposed;
- background workers, schedulers, and processes started by the suite;
- external side effects the suite can create;
- destructive setup and teardown behavior; and
- whether parallel runs can collide with shared state.

Inspect configuration, scripts, composition roots, CI variables, fixtures,
setup hooks, and provider initialization without printing or copying secret
values. Resolve where credentials and endpoints lead, not merely whether an
environment variable has a test-looking name.

Classify the suite or test group:

- **Safe to run:** It uses isolated resources and cannot affect live customers,
  production state, or uncontrolled external systems.
- **Conditionally safe:** It becomes isolated only after explicit setup such as
  provisioning an ephemeral database, selecting a provider sandbox, disabling
  outbound delivery, or assigning a unique namespace.
- **Unsafe to run:** It resolves to live production, customer data, shared
  consequential state, real delivery endpoints, or destructive operations that
  cannot be safely contained.
- **Indeterminate:** The audit cannot establish the actual targets or side
  effects from the available configuration and access.

Do not run test discovery until this preflight is complete. For a conditionally
safe suite, record and apply the isolation conditions before execution. Do not
run an unsafe or indeterminate suite. Preserve its configuration and resolved
targets as evidence without exposing secrets, and report why the verification
could not be executed safely.

An unsafe suite is itself a verification finding. Do not repair its
configuration silently and then describe the existing suite as safe. A
separately isolated audit run may still establish what the tests do, but the
original unsafe behavior remains part of the audit result.

First determine what the project actually runs:

- ordinary local test commands;
- continuous-integration jobs;
- package- or service-specific suites;
- browser or system suites;
- deployment and artifact checks;
- benchmark validators;
- manual acceptance procedures; and
- tests present in the repository but absent from normal execution.

Run the existing verification where safe and collect machine-readable discovery
and results where available. A test file that exists but is never discovered
does not protect the product.

For each existing test or coherent test group, record:

- how it is discovered and invoked;
- its setup, actor, data, and starting state;
- the product entry point it exercises;
- how far through the product the execution travels;
- which components and dependencies are real;
- which components are replaced, mocked, or bypassed;
- the resulting behavior or state it observes;
- the assertions that determine pass or failure;
- the roles, lifecycle states, data shapes, loads, and failure conditions it
  represents; and
- whether the ordinary repository or CI route runs it.

#### Map production-system participation

An integration test earns confidence from the production machinery it actually
exercises, not from its name or the number of components started around it.

For every capability that claims integration or system-level protection, first
reconstruct the relevant production path:

```text
[product entry point]
→ [application components]
→ [state, work, and integration boundaries]
→ [consequential product result]
```

Then reconstruct the path the test actually uses. Use composition roots,
dependency-injection registrations, test overrides, factories, patches,
containers, process boundaries, and runtime traces. Compare the two paths in a
production-system participation map.

Classify each material component:

- **Production implementation exercised:** The real implementation received
  consequential calls during the test.
- **Production implementation present but not exercised:** The component was
  constructed or registered, but the tested flow never reached it.
- **Production implementation with test configuration:** The same production
  code ran with a controlled database, account, endpoint, clock, filesystem, or
  environment.
- **Boundary simulator:** An external dependency was deliberately replaced at
  an approved seam by a controlled equivalent.
- **Test-only substitute:** A fake, mock, stub, in-memory implementation, or
  alternate runner replaced production behavior.
- **Bypassed:** The test entered below the production component.
- **Reimplemented by the test:** Test helpers duplicated production behavior
  instead of invoking the production implementation.
- **Indeterminate:** Available static or runtime evidence cannot establish
  participation.

The map must distinguish a real component being available from it being
exercised. Booting the application does not prove that a scenario reached its
queue, worker, transaction manager, authorization policy, retry handler, or
artifact writer.

Record the approved replacement boundary for each integration suite:

> What is the outermost component deliberately replaced, and why?

Everything before that boundary should use the production implementation or be
reported as a limitation. Everything beyond it remains outside what the test
can establish.

This boundary is especially important when the external component is expensive,
nondeterministic, unsafe, or unavailable. An agentic system may reasonably
replace the actual model call while retaining its production scheduler, state,
queue, worker, runner, prompt construction, response handling, artifacts,
approvals, retries, and budgets. Replacing the production runner with a fake
runner moves the seam inward and removes all of that behavior from the
integration evidence.

For each substitution or bypass, record the behavior it removes:

- serialization and protocol handling;
- authentication and authorization;
- transaction and persistence semantics;
- retries, idempotency, timeouts, and cancellation;
- concurrency and ordering;
- middleware and validation;
- artifact identity and routing;
- failure translation and recovery; or
- another product-owned responsibility.

Do not assume an in-memory implementation is equivalent merely because it
implements the same interface.

Separate four facts that are often collapsed into “covered”:

1. code belonging to the capability executed;
2. a product entry point was exercised;
3. the test reached the consequential result;
4. the test asserted that the consequential result was correct.

Coverage can support the first fact. It does not establish the other three.
Likewise, a test named “lead conversion integration” may call a service
directly, replace the database and queue, and assert only a returned object
shape.

Use execution traces, coverage, framework discovery, assertions, fixture
construction, database effects, network boundaries, and CI configuration as
evidence. Agent summaries may organize these facts, but do not accept an
agent's judgment that a test “looks comprehensive” as evidence.

### 4. Join the inventories and report the gaps

Map existing verification onto the product capability hierarchy.

Attach a test to a capability only at the level its executed route and
assertions support. A test may protect the base happy path while leaving
particular roles, data shapes, transitions, integrations, or failure conditions
unprotected.

For integration claims, compare three things:

1. the production systems required by the capability;
2. the systems the existing test actually exercises; and
3. the consequential behavior and state the test asserts.

A production component absent from one test is not automatically a gap. It is a
gap when that component participates in the production path for the capability
the test claims to protect and the missing participation removes material
behavior.

For each capability and important dimension, classify the existing
verification:

- **Meaningfully protected:** Existing verification reaches and asserts the
  consequential behavior through a representative product path.
- **Touched but not established:** Relevant code executes, but the important
  result or state is not asserted.
- **Isolated only:** A component is tested without the composition required by
  the capability.
- **Reduced path:** A mock, fake, bypass, or smaller environment removes
  behavior material to the capability.
- **Happy path only:** The base behavior is protected but important roles,
  states, data shapes, or failure conditions are absent.
- **Not in the ordinary route:** Relevant tests exist but normal repository or
  CI execution does not run them.
- **Unprotected:** No meaningful existing verification was found.
- **Indeterminate:** Available evidence is insufficient to determine what the
  test establishes.

Also perform the comparison in the opposite direction. Identify tests that:

- protect obsolete behavior;
- describe capabilities absent from the product expectations;
- exercise dead or unreachable surfaces;
- duplicate large amounts of low-value implementation detail; or
- give apparent verification weight to unauthorized scope.

Tests for an invented subsystem do not legitimize the subsystem. They may
instead be evidence that scope drift became embedded in the repository.

Present the result as a capability-to-verification map organized for progressive
disclosure:

```text
[Capability]
├── What the product does
├── Entry points and consequential effects
├── Important dimensions
├── Existing verification
├── What that verification actually asserts
├── Production-system participation
├── Approved replacement boundary
└── Gaps and limits
```

The summary should make the consequential gaps visible without flattening the
application into an enormous spreadsheet. Detailed route, test, trace, and
assertion evidence can remain linked underneath each capability.

Do not produce a single coverage or test-quality score. State what the existing
verification does and does not earn.

## A Moria-shaped example

For Moria, the application inventory would include:

- the public Rust crate facade;
- the walkable validation consumer;
- world observation and edit commands;
- save and load;
- benchmark and report entry points;
- curator and asset-validation commands;
- background generation, streaming, presentation, and persistence work; and
- the named platform acceptance routes.

Those surfaces can be grouped into recognizable capabilities:

- external consumption as a reusable substrate;
- generation and observation of a continuous material world;
- editing and visible reconciliation;
- exact save and restore;
- bounded streaming and responsiveness;
- comparable acceptance evidence; and
- the commissioned state and computation authority.

The verification inventory would then determine, for example, whether tests
described as external-consumer coverage:

- actually compile outside the implementation package;
- enter through the public facade;
- perform meaningful observation and mutation;
- assert the resulting state;
- retain or replace Bevy, storage, presentation, and GPU boundaries; and
- run in the ordinary `cargo test` route.

A test that imports the public facade but asserts only that a type can be
constructed touches external consumption. It does not establish that a
downstream game can perform the representative product workflow.

For a Moria edit-and-present integration test, the participation map might
look like:

| Production system | Test participation |
| --- | --- |
| Public edit facade | Production implementation exercised |
| Authoritative world state | Production implementation exercised |
| Work scheduler | Production implementation exercised |
| Presentation preparation | Production implementation present but not exercised |
| GPU upload and acknowledgement | Boundary simulator |
| Save and restore | Not part of this scenario |

That test may meaningfully protect command admission and world-state mutation.
It cannot establish visible presentation latency merely because the graphics
types were registered. The GPU seam and missing presentation execution remain
visible in the map.

Similarly, a headed benchmark test may protect report generation while
replacing the real graphics boundary or using a smaller workload. The map must
retain that reduced boundary rather than marking performance “covered.”

If the repository contains extensive tests for forest simulation, skeletal
animation, third-person controllers, or physics that have no support in the
approved product expectations, the inverse comparison exposes them as
verification attached to unauthorized scope. Test volume cannot turn those
systems into product requirements.

## Copyable agent prompt

> Audit the supplied application's existing verification without writing new
> tests. First inventory the application independently of its tests: user
> interfaces, APIs, commands, events, jobs, roles, guards, state transitions,
> durable effects, integrations, feature flags, operator actions, and
> reachability. Preserve whether each surface is declared, wired, reachable,
> observed, or tested. Group the surfaces into product capabilities expressed
> as actor, supported entry, action, and consequential result. Record important
> roles, states, data shapes, loads, dependencies, and failure conditions as
> dimensions; do not enumerate their full cross-product. Before running test
> discovery, resolve the suite's selected environment, databases, queues,
> storage, endpoints, credential accounts, workers, external side effects, and
> destructive setup or teardown. Classify it safe, conditionally safe, unsafe,
> or indeterminate. Apply and record required isolation for conditionally safe
> tests; do not execute unsafe or indeterminate tests. Separately discover and
> run safe existing verification through the project's ordinary and CI routes.
> For each test or coherent group, record its invocation, setup, entry point,
> execution depth, real and replaced components, asserted result, covered
> dimensions, and whether it actually runs normally. For every integration or
> system claim, reconstruct the required production path and the path actually
> taken by the test. Classify each material component as production
> implementation exercised, production implementation present but not
> exercised, production implementation with test configuration, boundary
> simulator, test-only substitute, bypassed, reimplemented by the test, or
> indeterminate. Record the approved replacement boundary and the production
> behavior removed by each substitution. Map tests to capabilities only at the
> level supported by executed routes and assertions. Classify each capability
> as meaningfully protected, touched but not established, isolated only,
> reduced path, happy path only, absent from the ordinary route, unprotected,
> or indeterminate. Also identify tests for obsolete, unreachable, or
> unauthorized product behavior. Produce a capability-to-verification map with
> linked evidence. Do not treat names, counts, coverage, or visual inspection
> as proof that consequential behavior is verified.

## Required output

Produce:

- an application surface inventory with certainty and evidence;
- a hierarchical product capability inventory with important dimensions;
- a verification safety preflight with resolved targets, side effects, and
  isolation conditions;
- an existing-verification inventory describing execution and assertions;
- a production-system participation map for integration and system tests;
- approved replacement boundaries and the behavior each replacement removes;
- a capability-to-verification map;
- consequential verification gaps and limitations;
- tests absent from ordinary execution; and
- verification attached to obsolete, unreachable, or unauthorized behavior.

Keep the human report organized by product capability. Preserve detailed
machine-generated inventories and relationships as linked evidence rather than
asking the operator to maintain them manually.

## Preserve as evidence

Preserve application and test target identity, inventory tool versions,
configuration precedence, resolved resource and provider targets, credential
account identity without secret values, side-effect analysis, isolation
conditions, safety classification, ordinary and CI commands, test discovery
and results, coverage or execution traces where used, assertions inspected,
production composition, test composition, runtime participation, approved
replacement boundaries, substitution behavior, capability mappings,
uncertainty, and review corrections.

## Stop and escalate

Stop or bound the inventory when:

- the safety preflight cannot establish where tests connect or what side
  effects they can produce;
- existing verification resolves to live production, customer data, shared
  consequential state, or uncontrolled external systems;
- required source, test configuration, or test environments are unavailable;
- application generation prevents stable surface enumeration;
- test discovery is materially incomplete;
- a capability grouping requires product authority not present in the supplied
  sources; or
- the application is too large to inventory safely without agreed
  prioritization.

Record the resulting areas as incomplete or indeterminate. Do not silently
generalize from the visible subset.

## Review test

A product owner can see what the application does and which important behavior
has weak or absent protection. A technical reviewer can trace every mapping to
the actual application surface, existing test route, participating production
systems, approved replacement boundary, substitutions, and consequential
assertion. Coverage, test volume, and agent opinion cannot create a stronger
conclusion than that evidence supports.
