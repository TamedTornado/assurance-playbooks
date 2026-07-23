import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { loadCatalog } from "./loader.js";

const body = "This body is deliberately long enough to represent useful method content.";

async function fixture(files: Record<string, string>): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "assurance-playbooks-"));
  for (const [name, source] of Object.entries(files)) {
    const path = join(root, name);
    await mkdir(join(path, ".."), { recursive: true });
    await writeFile(path, source);
  }
  return root;
}

describe("loadCatalog", () => {
  it("loads, cross-validates, and deterministically sorts method documents", async () => {
    const root = await fixture({
      "playbook.md": `---
schemaVersion: 1
kind: playbook
id: method
title: Example method
version: 1.0.0
status: stable
summary: A sufficiently descriptive example method summary.
audience: Teams operating consequential software
outcome: A defensible evidence-backed assurance result.
controls: [method-baseline]
---
${body}`,
      "controls/baseline.md": `---
schemaVersion: 1
kind: control
id: method-baseline
title: Establish the baseline
version: 1.0.0
status: stable
summary: A sufficiently descriptive baseline control summary.
playbook: method
objective: Establish observable behavior before intervention.
required: true
evidence: [Recorded baseline execution]
acceptance: [The baseline can be independently repeated]
outputs: [baseline]
tags: [baseline]
---
${body}`,
    });
    const catalog = await loadCatalog(root);
    expect(catalog.documents.map((item) => item.data.id)).toEqual(["method", "method-baseline"]);
  });

  it("rejects a playbook that references an absent control", async () => {
    const root = await fixture({
      "playbook.md": `---
schemaVersion: 1
kind: playbook
id: method
title: Example method
version: 1.0.0
status: stable
summary: A sufficiently descriptive example method summary.
audience: Teams operating consequential software
outcome: A defensible evidence-backed assurance result.
controls: [missing-control]
---
${body}`,
    });
    await expect(loadCatalog(root)).rejects.toThrow('unknown control "missing-control"');
  });

  it("rejects duplicate stable identifiers", async () => {
    const source = `---
schemaVersion: 1
kind: template
id: repeated
title: Repeated template
version: 1.0.0
status: stable
summary: A sufficiently descriptive template summary for testing.
for: evidence
---
${body}`;
    const root = await fixture({ "one.md": source, "two.md": source });
    await expect(loadCatalog(root)).rejects.toThrow("Duplicate document id");
  });
});
