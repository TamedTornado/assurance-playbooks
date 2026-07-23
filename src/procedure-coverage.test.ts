import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { loadCatalog } from "./loader.js";

const contentRoot = resolve(import.meta.dirname, "../content");

describe("executable playbook procedure coverage", () => {
  it.each([
    ["codebase-assurance", 8],
    ["agentic-delivery-assurance", 9],
  ])("gives every %s phase an owned procedure card", async (playbookId, expectedCount) => {
    const catalog = await loadCatalog(contentRoot);
    const playbook = catalog.documents.find((item) => item.data.id === playbookId);
    expect(playbook?.data.kind).toBe("playbook");
    if (!playbook || playbook.data.kind !== "playbook") return;

    expect(playbook.data.procedures).toHaveLength(expectedCount);
    const procedures = catalog.documents.filter(
      (item) => item.data.kind === "procedure" && item.data.playbook === playbookId,
    );
    expect(procedures).toHaveLength(expectedCount);

    for (const procedure of procedures) {
      for (const heading of [
        "## Inputs",
        "## Human procedure",
        "## Copyable agent prompt",
        "## Required output",
        "## Preserve as evidence",
        "## Stop and escalate",
        "## Review test",
      ]) {
        expect(procedure.body).toContain(heading);
      }
    }
  });
});
