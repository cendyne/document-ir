import { IdentityTransformer } from "./IdentityTransformer.ts";
import { ExampleDocument } from "./ExampleDocument.ts";
import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";

Deno.test({
  name: "Identity transformation changes nothing",
  async fn() {
    assertEquals(
      await new IdentityTransformer().transform(ExampleDocument),
      ExampleDocument,
    );
  },
});
