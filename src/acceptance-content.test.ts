import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const contentRoot = resolve(import.meta.dirname, "../content/shared");

async function sharedDocument(name: string): Promise<string> {
  return readFile(resolve(contentRoot, name), "utf8");
}

describe("shared acceptance records", () => {
  it("keeps the acceptance worksheet usable as an engagement contract", async () => {
    const source = await sharedDocument("acceptance-criteria.md");
    for (const heading of [
      "## Decision and scope",
      "## Acceptance matrix",
      "## Gate demonstration",
      "## Completion rule",
      "## Change control",
    ]) {
      expect(source).toContain(heading);
    }
  });

  it("requires an evidenced escalation trail before work is called blocked", async () => {
    const source = await sharedDocument("blocked-finding.md");
    for (const heading of [
      "## What is blocked",
      "## Escalation record",
      "## Consequence",
      "## What would unblock the work",
    ]) {
      expect(source).toContain(heading);
    }
  });

  it("shows the four acceptance outcomes most likely to be confused", async () => {
    const source = await sharedDocument("acceptance-examples.md");
    for (const heading of [
      "## Valid completion",
      "## Invalid proxy completion",
      "## Legitimate blockage",
      "## Attempted scope expansion",
    ]) {
      expect(source).toContain(heading);
    }
  });
});
