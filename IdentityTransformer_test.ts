import { expect, test } from "bun:test";
import { IdentityTransformer } from "./IdentityTransformer";
import { ExampleDocument } from "./ExampleDocument";

test("Identity transformation changes nothing", async () => {
  expect(await new IdentityTransformer().transform(ExampleDocument)).toEqual(ExampleDocument);
});