import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import matter from "gray-matter";
import {
  type AssuranceCatalog,
  type AssuranceDocument,
  type Control,
  type Example,
  type Playbook,
  type Procedure,
  documentDataSchema,
} from "./schemas.js";

async function markdownFiles(root: string, directory = root): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return markdownFiles(root, path);
      return entry.isFile() && entry.name.endsWith(".md") ? [path] : [];
    }),
  );
  return files.flat().sort();
}

export async function loadCatalog(contentRoot: string): Promise<AssuranceCatalog> {
  const root = resolve(contentRoot);
  const documents: AssuranceDocument[] = [];
  for (const file of await markdownFiles(root)) {
    const source = await readFile(file, "utf8");
    for (const match of source.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
      const target = match[1];
      if (!target || /^(?:https?:|mailto:|#)/.test(target)) continue;
      const localTarget = decodeURIComponent(target.split(/[?#]/, 1)[0] ?? "");
      if (!localTarget || existsSync(resolve(dirname(file), localTarget))) continue;
      throw new Error(`${relative(root, file)}: broken Markdown link "${target}"`);
    }
    const parsed = matter(source);
    if (Object.keys(parsed.data).length === 0) continue;
    const result = documentDataSchema.safeParse(parsed.data);
    if (!result.success) {
      const details = result.error.issues
        .map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`)
        .join("; ");
      throw new Error(`${relative(root, file)}: ${details}`);
    }
    const body = parsed.content.trim();
    if (body.length < 40) throw new Error(`${relative(root, file)}: Markdown body is too short`);
    documents.push({
      data: result.data,
      body,
      relativePath: relative(root, file),
    });
  }
  return validateCatalog({ schemaVersion: 1, documents });
}

export function validateCatalog(catalog: AssuranceCatalog): AssuranceCatalog {
  const ids = new Map<string, AssuranceDocument>();
  for (const document of catalog.documents) {
    const previous = ids.get(document.data.id);
    if (previous) {
      throw new Error(
        `Duplicate document id "${document.data.id}" in ${previous.relativePath} and ${document.relativePath}`,
      );
    }
    ids.set(document.data.id, document);
  }

  const playbooks = new Map(
    catalog.documents
      .filter((document): document is AssuranceDocument & { data: Playbook } => document.data.kind === "playbook")
      .map((document) => [document.data.id, document]),
  );
  const controls = new Map(
    catalog.documents
      .filter((document): document is AssuranceDocument & { data: Control } => document.data.kind === "control")
      .map((document) => [document.data.id, document]),
  );
  const procedures = new Map(
    catalog.documents
      .filter(
        (document): document is AssuranceDocument & { data: Procedure } => document.data.kind === "procedure",
      )
      .map((document) => [document.data.id, document]),
  );

  for (const playbook of playbooks.values()) {
    for (const controlId of playbook.data.controls) {
      const control = controls.get(controlId);
      if (!control) throw new Error(`${playbook.relativePath}: unknown control "${controlId}"`);
      if (control.data.playbook !== playbook.data.id) {
        throw new Error(`${control.relativePath}: belongs to ${control.data.playbook}, not ${playbook.data.id}`);
      }
    }
    for (const procedureId of playbook.data.procedures) {
      const procedure = procedures.get(procedureId);
      if (!procedure) throw new Error(`${playbook.relativePath}: unknown procedure "${procedureId}"`);
      if (procedure.data.playbook !== playbook.data.id) {
        throw new Error(`${procedure.relativePath}: belongs to ${procedure.data.playbook}, not ${playbook.data.id}`);
      }
    }
  }

  for (const document of controls.values()) {
    const playbook = playbooks.get(document.data.playbook);
    if (!playbook) throw new Error(`${document.relativePath}: unknown playbook "${document.data.playbook}"`);
    if (!playbook.data.controls.includes(document.data.id)) {
      throw new Error(`${document.relativePath}: is not listed by playbook "${document.data.playbook}"`);
    }
  }

  for (const document of procedures.values()) {
    const playbook = playbooks.get(document.data.playbook);
    if (!playbook) throw new Error(`${document.relativePath}: unknown playbook "${document.data.playbook}"`);
    if (!playbook.data.procedures.includes(document.data.id)) {
      throw new Error(`${document.relativePath}: is not listed by playbook "${document.data.playbook}"`);
    }
  }

  for (const document of catalog.documents.filter(
    (item): item is AssuranceDocument & { data: Example } => item.data.kind === "example",
  )) {
    if (!playbooks.has(document.data.playbook)) {
      throw new Error(`${document.relativePath}: unknown playbook "${document.data.playbook}"`);
    }
    for (const controlId of document.data.controls) {
      if (!controls.has(controlId)) throw new Error(`${document.relativePath}: unknown control "${controlId}"`);
    }
  }

  return compileCatalog(catalog);
}

export function compileCatalog(catalog: AssuranceCatalog): AssuranceCatalog {
  return {
    schemaVersion: 1,
    documents: [...catalog.documents].sort(
      (a, b) => a.data.id.localeCompare(b.data.id) || a.relativePath.localeCompare(b.relativePath),
    ),
  };
}
