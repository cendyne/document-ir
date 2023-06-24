import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { ExampleDocument } from "./ExampleDocument.ts";
import { DocumentNode } from "./types.ts";
import { WhitespaceTransformer } from "./WhitespaceTransformer.ts";

Deno.test({
  name: "Whitespace transformer changes something",
  async fn() {
    assertNotEquals(
      await new WhitespaceTransformer().transform(ExampleDocument),
      ExampleDocument,
    );
  },
});

const InputDocument: DocumentNode = {
  ...ExampleDocument,
  content: [
    {
      type: "text",
      text: " hello ",
    },
    {
      type: "bold",
      content: [
        {
          type: "text",
          text: " \uD83C\uDF4A world! ",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: " hello ",
        },
        {
          type: "bold",
          content: [
            {
              type: "text",
              text: " world! ",
            },
            {
              type: "text",
              text: "",
            },
          ],
        },
        {
          type: "italic",
          content: [
            {
              type: "text",
              text: " hi! ",
            },
          ],
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
      text: "hello ",
    },
    {
      type: "bold",
      content: [
        {
          type: "text",
          text: "\uD83C\uDF4A world!",
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          type: "text",
          text: "hello ",
        },
        {
          type: "bold",
          content: [
            {
              type: "text",
              text: "world! ",
            },
          ],
        },
        {
          type: "italic",
          content: [
            {
              type: "text",
              text: "hi!",
            },
          ],
        },
      ],
    },
  ],
};

Deno.test({
  name: "Whitespace transformer works as expected",
  async fn() {
    assertEquals(
      await new WhitespaceTransformer().transform(InputDocument),
      ExpectedDocument,
    );
    assertEquals(
      await new WhitespaceTransformer().transform(ExpectedDocument),
      ExpectedDocument,
    );
  },
});
