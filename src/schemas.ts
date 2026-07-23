import { z } from "zod";

const idSchema = z.string().regex(/^[a-z][a-z0-9-]*$/);
const versionSchema = z.string().regex(/^\d+\.\d+\.\d+$/);
const commonSchema = z.object({
  schemaVersion: z.literal(1),
  id: idSchema,
  title: z.string().min(3),
  version: versionSchema,
  status: z.enum(["draft", "stable", "retired"]),
  summary: z.string().min(20),
});

export const playbookSchema = commonSchema.extend({
  kind: z.literal("playbook"),
  audience: z.string().min(10),
  outcome: z.string().min(20),
  controls: z.array(idSchema).min(1),
  procedures: z.array(idSchema).min(1),
});

export const controlSchema = commonSchema.extend({
  kind: z.literal("control"),
  playbook: idSchema,
  objective: z.string().min(20),
  required: z.boolean(),
  evidence: z.array(z.string().min(5)).min(1),
  acceptance: z.array(z.string().min(5)).min(1),
  outputs: z.array(z.string().min(3)).min(1),
  tags: z.array(idSchema).default([]),
});

export const exampleSchema = commonSchema.extend({
  kind: z.literal("example"),
  playbook: idSchema,
  target: z.object({
    repository: z.string().url(),
    commit: z.string().min(7),
  }),
  verdict: z.enum(["pass", "fail", "mixed", "blocked", "unproven"]),
  controls: z.array(idSchema).min(1),
});

export const templateSchema = commonSchema.extend({
  kind: z.literal("template"),
  for: z.enum([
    "scope",
    "evidence",
    "finding",
    "intervention",
    "acceptance",
    "blocked-finding",
    "sign-off",
    "product-expectation",
    "design-consistency",
    "intent-lineage",
  ]),
});

export const procedureSchema = commonSchema.extend({
  kind: z.literal("procedure"),
  playbook: idSchema,
  phase: idSchema,
  purpose: z.string().min(20),
  inputs: z.array(z.string().min(3)).min(1),
  outputs: z.array(z.string().min(3)).min(1),
});

export const documentDataSchema = z.discriminatedUnion("kind", [
  playbookSchema,
  controlSchema,
  exampleSchema,
  templateSchema,
  procedureSchema,
]);

export type Playbook = z.infer<typeof playbookSchema>;
export type Control = z.infer<typeof controlSchema>;
export type Example = z.infer<typeof exampleSchema>;
export type Template = z.infer<typeof templateSchema>;
export type Procedure = z.infer<typeof procedureSchema>;
export type AssuranceDocumentData = z.infer<typeof documentDataSchema>;

export interface AssuranceDocument {
  data: AssuranceDocumentData;
  body: string;
  relativePath: string;
}

export interface AssuranceCatalog {
  schemaVersion: 1;
  documents: AssuranceDocument[];
}
