// ex. scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

await build({
  compilerOptions: {
    lib: ["ESNext", "DOM"],
  },
  importMap: "deno.json",
  entryPoints: ["./src/main.ts"],
  outDir: "./npm",
  scriptModule: false,
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  test: false,
  package: {
    // package.json properties
    name: "wick-service-api",
    version: Deno.args[0],
    description:
      "Unofficial Wick Service API client library for Deno/TypeScript with authentication, user management, and SNS features",
    license: "GPL-3.0",
    repository: {
      type: "git",
      url: "git+https://github.com/Lqm1/wick-service-api.git",
    },
    bugs: {
      url: "https://github.com/Lqm1/wick-service-api/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
