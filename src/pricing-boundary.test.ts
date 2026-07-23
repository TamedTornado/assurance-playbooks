import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

async function textFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return textFiles(path);
      return entry.isFile() && entry.name.endsWith(".md") ? [path] : [];
    }),
  );
  return nested.flat();
}

describe("public method commercial boundary", () => {
  it("keeps pricing and currency out of public playbook content", async () => {
    const root = resolve(import.meta.dirname, "..");
    const files = [resolve(root, "README.md"), ...(await textFiles(resolve(root, "content")))];
    const source = (await Promise.all(files.map((file) => readFile(file, "utf8")))).join("\n");

    expect(source).not.toMatch(/[€$£¥]\s?\d|\b(?:price|pricing|day rate)\b/i);
  });
});
