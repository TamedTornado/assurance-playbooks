import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export { compileCatalog, loadCatalog, validateCatalog } from "./loader.js";
export * from "./schemas.js";

export const bundledContentPath = resolve(dirname(fileURLToPath(import.meta.url)), "../content");
