import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { ExampleDocument } from "./ExampleDocument.ts";
import { ArrayCollapseTransformer } from "./ArrayCollapseTransformer.ts";
import { DocumentNode } from "./types.ts";

Deno.test({
  name: "Array collapse transformer changes something",
  async fn() {
    assertNotEquals(
      await new ArrayCollapseTransformer().transform(ExampleDocument),
      ExampleDocument,
    );
  },
});

const ArrayCollapsingDocument: DocumentNode = {
  ...ExampleDocument,
  content: [
    {
      type: "text",
      text: "1",
    },
    {
      type: "array",
      content: [
        {
          type: "text",
          text: "2",
        },
        {
          type: "text",
          text: "3",
        },
      ],
    },
    {
      type: "text",
      text: "4",
    },
  ],
};
const ExpectedDocument: DocumentNode = {
  ...ExampleDocument,
  content: [
    {
      type: "text",
      text: "1",
    },
    {
      type: "text",
      text: "2",
    },
    {
      type: "text",
      text: "3",
    },
    {
      type: "text",
      text: "4",
    },
  ],
};

Deno.test({
  name: "Array collapse transformer works as expected",
  async fn() {
    assertEquals(
      await new ArrayCollapseTransformer().transform(ArrayCollapsingDocument),
      ExpectedDocument,
    );
    assertEquals(
      await new ArrayCollapseTransformer().transform(ExpectedDocument),
      ExpectedDocument,
    );
  },
});
