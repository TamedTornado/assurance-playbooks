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

  it.each(["codebase-assurance", "agentic-delivery-assurance"])(
    "explains the %s method as a decision journey",
    async (playbook) => {
      const source = await document(`content/${playbook}/README.md`);
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
    },
  );

  it("covers design coherence in codebase assurance", async () => {
    const index = await document("content/codebase-assurance/index.md");
    expect(index).toContain("codebase-design-coherence");
  });

  it("covers artifact identity, deployment, and rollback in agentic delivery assurance", async () => {
    const index = await document("content/agentic-delivery-assurance/index.md");
    expect(index).toContain("agentic-release-integrity");
  });
});
