---
schemaVersion: 1
kind: template
id: codebase-product-expectation-worksheet
title: Product expectation worksheet
version: 0.1.0
status: draft
summary: A single low-friction Markdown document for client expectations and the technical questions nested beneath them.
for: product-expectation
---
# Product expectation worksheet

Use one copy of this document for the engagement. Write each expectation once
and keep its investigation questions underneath it.

Do not assign IDs manually. Do not create one file per expectation or question.
Delete optional prompts that add no information instead of filling them with
“not applicable.”

## What the client told us

### What they commissioned

[Describe the intended product in the client’s language.]

### What they believe they received

[Describe what appears to have been delivered and completed.]

### What they have seen

[Record demonstrations, reports, tests, deployments, and visible behavior.]

### What they cannot independently verify

[Record the important implementation, quality, architecture, dependency, and
operational expectations that remain opaque.]

### What they expect to do next

[Record the planned use, extension, release, or increase in responsibility.]

### What the available accounts agree and disagree about

[Summarize important alignments, missing sources, gaps, and contradictions.]

### What we will investigate

[Explain the coverage in ordinary language. The client should be able to
correct this without reading the implementation.]

## Expectations and investigation

Copy the following block once for each material expectation.

### [Expectation in the client’s words]

- **What they meant:**
- **Why it mattered:**
- **Source:**
- **What they were shown:**
- **What the project material says:**
- **Unknown or conflict:**

#### Questions to investigate

- [ ] [Write one question.]
  - **Evidence to seek:**
  - **Could look successful because:**
  - **Conditions or limitations:**
- [ ] [Add another question when needed.]

#### Coverage

- **Priority:** [Why this deserves the chosen depth.]
- **Included or deferred:** [State which, without calling deferred work safe.]
- **Result the client needs explained:** [Describe the eventual answer in
  ordinary language.]

## Client confirmation

> This is our account of what you expected, what you believe was delivered,
> what you have actually seen, and what remains opaque to you. Have we
> misunderstood anything important? Is there an expectation here that was only
> a future idea, or a critical promise we have omitted?

- **Confirmed or corrected by:**
- **Date:**
- **Corrections or unresolved disagreement:**
