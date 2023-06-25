// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt@0.37.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./index.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  test: false,
  package: {
    // package.json properties
    name: "document-ir",
    version: Deno.args[0],
    description: "Intermediate representation and transformers for documents",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/cendyne/document-ir.git",
    },
    bugs: {
      url: "https://github.com/cendyne/document-ir/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
