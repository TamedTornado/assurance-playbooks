#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { loadCatalog } from "./loader.js";

interface Arguments {
  command: "validate" | "export";
  root: string;
  format: "json" | "markdown";
  out?: string;
}

function usage(): never {
  process.stderr.write(
    "Usage: assurance-playbooks <validate|export> [content-root] [--format json|markdown] [--out file]\n",
  );
  process.exit(2);
}

function parseArguments(argv: string[]): Arguments {
  const command = argv[0];
  if (command !== "validate" && command !== "export") usage();
  const root = argv[1]?.startsWith("--") || !argv[1] ? "content" : argv[1];
  const formatIndex = argv.indexOf("--format");
  const outIndex = argv.indexOf("--out");
  const format = formatIndex >= 0 ? argv[formatIndex + 1] : "json";
  if (format !== "json" && format !== "markdown") usage();
  const out = outIndex >= 0 ? argv[outIndex + 1] : undefined;
  if (outIndex >= 0 && !out) usage();
  return { command, root, format, ...(out ? { out } : {}) };
}

function toMarkdown(catalog: Awaited<ReturnType<typeof loadCatalog>>): string {
  return catalog.documents
    .map((document) => `# ${document.data.title}\n\n${document.data.summary}\n\n${document.body}`)
    .join("\n\n---\n\n");
}

export async function run(argv = process.argv.slice(2)): Promise<void> {
  const args = parseArguments(argv);
  const catalog = await loadCatalog(resolve(args.root));
  if (args.command === "validate") {
    process.stdout.write(`Validated ${catalog.documents.length} assurance documents.\n`);
    return;
  }
  const output =
    args.format === "json" ? `${JSON.stringify(catalog, null, 2)}\n` : `${toMarkdown(catalog)}\n`;
  if (args.out) {
    const path = resolve(args.out);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, output, "utf8");
  } else {
    process.stdout.write(output);
  }
}

run().catch((error: unknown) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
