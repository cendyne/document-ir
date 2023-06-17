import { expect, test } from "bun:test";
import { IdentityTransformer } from "./IdentityTransformer.ts";
import { ExampleDocument } from "./ExampleDocument.ts";

test("Identity transformation changes nothing", async () => {
  expect(await new IdentityTransformer().transform(ExampleDocument)).toEqual(ExampleDocument);
});