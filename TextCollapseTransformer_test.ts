import { ExampleDocument } from "./ExampleDocument.ts";
import { DocumentNode } from "./types.ts";
import { TextCollapseTransformer } from "./TextCollapseTransformer.ts";
import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { assertNotEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";

Deno.test({
  name: "Text collapse transformer changes something",
  async fn() {
    assertNotEquals(
      await new TextCollapseTransformer().transform(ExampleDocument),
      ExampleDocument,
    );
  },
});

const InputDocument: DocumentNode = {
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
    {
      type: "bold",
      content: [
        {
          type: "text",
          text: "A",
        },
        {
          type: "text",
          text: "B",
        },
        {
          type: "text",
          text: "\uD83C\uDF4A",
        },
      ],
    },
  ],
};

const ExpectedDocument: DocumentNode = {
  ...ExampleDocument,
  content: [
    {
      type: "text",
      text: "1234",
    },
    {
      type: "bold",
      content: [
        {
          type: "text",
          text: "AB\uD83C\uDF4A",
        },
      ],
    },
  ],
};
Deno.test({
  name: "Text collapse transformer works as expected",
  async fn() {
    assertEquals(
      await new TextCollapseTransformer().transform(InputDocument),
      ExpectedDocument,
    );
    assertEquals(
      await new TextCollapseTransformer().transform(ExpectedDocument),
      ExpectedDocument,
    );
  },
});
