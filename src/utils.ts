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

export function toFormData(data: Record<string, unknown>): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === "boolean") {
        formData.append(key, String(value));
      } else if (value instanceof Blob || value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "string" || typeof value === "number") {
        formData.append(key, String(value));
      } else {
        formData.append(key, JSON.stringify(value));
      }
    }
  });

  return formData;
}
