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
  it("ignores human-facing Markdown that has no machine front matter", async () => {
    const root = await fixture({
      "README.md": "# Human guide\n\nThis document is intentionally written for people rather than the catalog.",
    });
    await expect(loadCatalog(root)).resolves.toEqual({ schemaVersion: 1, documents: [] });
  });

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
procedures: [method-frame-decision]
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
      "procedures/frame.md": `---
schemaVersion: 1
kind: procedure
id: method-frame-decision
title: Frame the decision
version: 1.0.0
status: stable
summary: A sufficiently descriptive executable operator procedure.
playbook: method
phase: frame
purpose: Turn a broad concern into a bounded decision and evidence question.
inputs: [Decision owner, System context]
outputs: [Decision record]
---
${body}`,
    });
    const catalog = await loadCatalog(root);
    expect(catalog.documents.map((item) => item.data.id)).toEqual([
      "method",
      "method-baseline",
      "method-frame-decision",
    ]);
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
procedures: [missing-procedure]
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

  it.each(["acceptance", "blocked-finding"])(
    "loads a %s template as a first-class shared record",
    async (templateFor) => {
      const root = await fixture({
        "template.md": `---
schemaVersion: 1
kind: template
id: example-${templateFor}
title: Example ${templateFor} template
version: 1.0.0
status: stable
summary: A sufficiently descriptive shared assurance template for testing.
for: ${templateFor}
---
${body}`,
      });
      const catalog = await loadCatalog(root);
      expect(catalog.documents[0]?.data).toMatchObject({
        kind: "template",
        for: templateFor,
      });
    },
  );

  it("loads a playbook-owned executable procedure", async () => {
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
procedures: [method-frame-decision]
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
      "procedures/frame.md": `---
schemaVersion: 1
kind: procedure
id: method-frame-decision
title: Frame the decision
version: 1.0.0
status: stable
summary: A sufficiently descriptive executable operator procedure.
playbook: method
phase: frame
purpose: Turn a broad concern into a bounded decision and evidence question.
inputs: [Decision owner, System context]
outputs: [Decision record]
---
${body}`,
    });
    const catalog = await loadCatalog(root);
    expect(catalog.documents.find((item) => item.data.id === "method-frame-decision")?.data).toMatchObject({
      kind: "procedure",
      playbook: "method",
      phase: "frame",
    });
  });
});
