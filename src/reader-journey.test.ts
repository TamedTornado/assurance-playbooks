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

  it("dogfoods both codebase worksheets against Moria", async () => {
    const expectations = await document(
      "content/codebase-assurance/examples/moria-product-expectations.md",
    );
    const consistency = await document(
      "content/codebase-assurance/examples/moria-design-consistency.md",
    );

    expect(expectations).toContain("## What the client told us");
    expect(expectations).toContain("## Expectations and investigation");
    expect(expectations).toContain("GPU-resident");
    expect(consistency).toContain("## Plain-language summary");
    expect(consistency).toContain("CPU-authoritative");
    expect(consistency).toContain("## Usability observations");
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
