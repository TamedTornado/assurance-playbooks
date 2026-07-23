import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const shared = resolve(import.meta.dirname, "../content/shared");

async function record(name: string): Promise<string> {
  return readFile(resolve(shared, name), "utf8");
}

describe("copyable operational records", () => {
  it.each([
    ["evidence-record.md", ["## Identity", "## Collection", "## Observation", "## Limitations and review"]],
    ["finding.md", ["## Claim and consequence", "## Observation and inference", "## Reachability and confidence", "## Decision and next action"]],
    ["intervention.md", ["## Finding and fixtures", "## Before", "## Change", "## After and rollback"]],
    ["sign-off.md", ["## Decision", "## Claim status", "## Gate and residual risk", "## Separate approvals"]],
  ])("keeps %s usable as a complete record", async (name, headings) => {
    const source = await record(name);
    for (const heading of headings) expect(source).toContain(heading);
  });
});
