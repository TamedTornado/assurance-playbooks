import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");

async function document(path: string): Promise<string> {
  return readFile(resolve(root, path), "utf8");
}

describe("reader-first assurance journeys", () => {
  it("gives an engineering leader a complete front door before technical reference", async () => {
    const source = await document("README.md");
    for (const heading of [
      "## Start with the situation",
      "## What assurance changes",
      "## Three lessons from real systems",
      "## Choose a playbook",
      "## Use the methods yourself",
    ]) {
      expect(source).toContain(heading);
    }
  });

  it("explains codebase assurance from the client's need for visibility", async () => {
    const source = await document("content/codebase-assurance/README.md");
    for (const heading of [
      "## Why clients use this method",
      "## What happens in practice",
      "### 1. Understand what was supposed to be built",
      "## A real example",
      "## What you leave with",
      "## What this method cannot tell you",
      "## Run it yourself",
    ]) {
      expect(source).toContain(heading);
    }
  });

  it("explains agentic delivery assurance as a decision journey", async () => {
    const source = await document("content/agentic-delivery-assurance/README.md");
    for (const heading of [
      "## The decision this method supports",
      "## What happens in practice",
      "## A real example",
      "## What you leave with",
      "## What this method cannot tell you",
      "## Run it yourself",
    ]) {
      expect(source).toContain(heading);
    }
  });

  it("covers design coherence in codebase assurance", async () => {
    const index = await document("content/codebase-assurance/index.md");
    expect(index).toContain("codebase-design-coherence");
  });

  it("provides one lazy-authoring worksheet for expectations and their questions", async () => {
    const procedure = await document(
      "content/codebase-assurance/procedures/understand-expected-product.md",
    );
    const worksheet = await document(
      "content/codebase-assurance/templates/product-expectation-worksheet.md",
    );

    expect(procedure).toContain(
      "[product expectation worksheet](../templates/product-expectation-worksheet.md)",
    );
    expect(worksheet).toContain("## What the client told us");
    expect(worksheet).toContain("## Expectations and investigation");
    expect(worksheet).toContain("### [Expectation in the client’s words]");
    expect(worksheet).toContain("#### Questions to investigate");
    expect(worksheet).toContain("- [ ]");
    expect(worksheet).not.toContain("| Expectation | Technical question");
  });

  it("provides one lazy-authoring design consistency review", async () => {
    const procedure = await document("content/codebase-assurance/procedures/review-design.md");
    const review = await document(
      "content/codebase-assurance/templates/design-consistency-review.md",
    );

    expect(procedure).toContain(
      "[design consistency review](../templates/design-consistency-review.md)",
    );
    expect(review).toContain("## Plain-language summary");
    expect(review).toContain("## Reviews by expectation");
    expect(review).toContain("### [Expectation from the product expectation worksheet]");
    expect(review).toContain("#### Behavior followed");
    expect(review).toContain("#### Conflicts, gaps, and divergences");
    expect(review).not.toContain("Contradiction ID");
  });

  it("dogfoods the first three codebase artifacts against Moria", async () => {
    const expectations = await document(
      "content/codebase-assurance/examples/moria-product-expectations.md",
    );
    const consistency = await document(
      "content/codebase-assurance/examples/moria-design-consistency.md",
    );
    const baseline = await document(
      "content/codebase-assurance/examples/moria-baseline-record.md",
    );
    const investigation = await document(
      "content/codebase-assurance/examples/moria-assurance-investigation.md",
    );

    expect(expectations).toContain("## What the client told us");
    expect(expectations).toContain("## Expectations and investigation");
    expect(expectations).toContain("GPU-resident");
    expect(consistency).toContain("## Plain-language summary");
    expect(consistency).toContain("CPU-authoritative");
    expect(consistency).toContain("## Usability observations");
    expect(baseline).toContain("## What we tried to reproduce");
    expect(baseline).toContain("Nothing in this record has been reproduced");
    expect(baseline).toContain("Instruction repair");
    expect(baseline).toContain("Status:** Not run");
    expect(investigation).toContain("## What we challenged");
    expect(investigation).toContain("CPU-authoritative");
    expect(investigation).toContain("Not exercised");
    expect(investigation).toContain("## Best candidate for a durable gate");
  });

  it("audits whether the delivered product actually works", async () => {
    const procedure = await document(
      "content/codebase-assurance/procedures/reproduce-path.md",
    );

    expect(procedure).toContain("# Test whether the product actually works");
    expect(procedure).toContain(
      "Does the delivered product perform its important functions correctly",
    );
    expect(procedure).toContain("### 1. Choose what defines the product");
    expect(procedure).toContain("### 2. Test the product as delivered");
    expect(procedure).toContain(
      "### 3. Test the conditions the product claims to support",
    );
    expect(procedure).toContain("### 4. Report what actually works");
    expect(procedure).toContain("Environment repair");
    expect(procedure).toContain("Instruction repair");
    expect(procedure).toContain("Product repair");
    expect(procedure).toContain("Working with limitations");
    expect(procedure).toContain("Not working");
    expect(procedure).not.toContain("### 5.");
    expect(procedure).not.toContain("client’s decision");
  });

  it("maps product capabilities against what existing verification establishes", async () => {
    const verification = await document(
      "content/codebase-assurance/procedures/design-counterexamples.md",
    );

    expect(verification).toContain(
      "# Map what the product does against what its tests verify",
    );
    expect(verification).toContain("### 1. Inventory the application surface");
    expect(verification).toContain(
      "### 2. Organize the surface into product capabilities",
    );
    expect(verification).toContain(
      "### 3. Inventory what the existing verification establishes",
    );
    expect(verification).toContain("### 4. Join the inventories and report the gaps");
    expect(verification).toContain("Declared");
    expect(verification).toContain("Wired");
    expect(verification).toContain("Reachable");
    expect(verification).toContain("Observed");
    expect(verification).toContain("Tested");
    expect(verification).toContain("Do not enumerate the full cross-product");
    expect(verification).toContain("capability-to-verification map");
    expect(verification).not.toContain("### 5.");
    expect(verification).not.toContain("semantic mutation");
    expect(verification).not.toContain("mutation count");
  });

  it("uses one working investigation record across boundaries and failure", async () => {
    const composition = await document(
      "content/codebase-assurance/procedures/exercise-composition.md",
    );
    const operations = await document(
      "content/codebase-assurance/procedures/exercise-operations.md",
    );
    const investigation = await document(
      "content/codebase-assurance/templates/assurance-investigation.md",
    );

    for (const procedure of [composition, operations]) {
      expect(procedure).toContain(
        "[assurance investigation](../templates/assurance-investigation.md)",
      );
    }
    expect(composition).toContain("Where does the demonstration leave the code we control?");
    expect(operations).toContain("What would the person responsible for this product actually see?");
    expect(investigation).toContain("## What we challenged");
    expect(investigation).toContain("## Challenges");
    expect(investigation).toContain("#### Convincing wrong version");
    expect(investigation).toContain("#### Real boundary exercised");
    expect(investigation).toContain("#### What the operator saw and did");
    expect(investigation).not.toContain("Challenge ID");
  });

  it("turns one observed weakness into a proven gate and bounded client decision", async () => {
    const gate = await document(
      "content/codebase-assurance/procedures/install-gate.md",
    );
    const decision = await document(
      "content/codebase-assurance/procedures/make-decision.md",
    );

    expect(gate).toContain("Which wrong result do we refuse to accept again?");
    expect(gate).toContain("Show the weakness before changing it");
    expect(gate).toContain("Freeze the comparison");
    expect(gate).toContain("Try to bypass the gate");
    expect(decision).toContain("What does the evidence let the client do next?");
    expect(decision).toContain("Revisit the client’s original decision");
    expect(decision).toContain("No claim inherits another claim’s pass");
    expect(decision).toContain("Say what would change the decision");
  });

  it("preserves source intent through the agentic delivery playbook", async () => {
    const contract = await document(
      "content/agentic-delivery-assurance/procedures/contract-work.md",
    );
    const context = await document(
      "content/agentic-delivery-assurance/procedures/map-context-authority.md",
    );
    const reward = await document(
      "content/agentic-delivery-assurance/procedures/attack-reward-surface.md",
    );
    const verification = await document(
      "content/agentic-delivery-assurance/procedures/test-verification-independence.md",
    );
    const lineage = await document(
      "content/agentic-delivery-assurance/templates/intent-lineage-worksheet.md",
    );

    expect(contract).toContain("preserved source intent");
    expect(context).toContain("derived contract");
    expect(reward).toContain("internally coherent");
    expect(verification).toContain("original source intent");
    expect(lineage).toContain("## Original request and governing sources");
    expect(lineage).toContain("## Derived artifacts and changes");
    expect(lineage).toContain("### Unapproved changes");
  });

  it("covers artifact identity, deployment, and rollback in agentic delivery assurance", async () => {
    const index = await document("content/agentic-delivery-assurance/index.md");
    expect(index).toContain("agentic-release-integrity");
  });
});
