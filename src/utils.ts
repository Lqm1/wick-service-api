export function detectRuntime(): "node" | "deno" | "bun" | "unknown" {
  // deno-lint-ignore no-explicit-any
  if (typeof (globalThis as any).Deno !== "undefined") {
    return "deno";
  }

  // deno-lint-ignore no-explicit-any
  if (typeof (globalThis as any).Bun !== "undefined") {
    return "bun";
  }

  if (
    // deno-lint-ignore no-explicit-any
    typeof (globalThis as any).process !== "undefined" &&
    // deno-lint-ignore no-explicit-any
    typeof (globalThis as any).process.versions === "object" &&
    // deno-lint-ignore no-explicit-any
    typeof (globalThis as any).process.versions.node === "string"
  ) {
    return "node";
  }

  return "unknown";
}
