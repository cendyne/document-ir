import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { ExampleDocument } from "./ExampleDocument.ts";
import { DocumentNode } from "./types.ts";
import { WhitespaceStretchingTransformer } from "./WhitespaceStretchingTransformer.ts";

Deno.test({
  name: "Whitespace stretching transformer changes something",
  async fn() {
    assertNotEquals(
      await new WhitespaceStretchingTransformer().transform(ExampleDocument),
      ExampleDocument,
    );
  },
});

const InputDocument: DocumentNode = {
  ...ExampleDocument,
  content: [
    {
      type: "text",
      text: "hello",
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
      type: "text",
      text: "What's up?",
    },
    {
      type: "paragraph",
      content: [
        {
          type: "bold",
          content: [
            {
              type: "italic",
              content: [
                {
                  type: "text",
                  text: "Henlo ",
                },
              ],
            },
            {
              type: "text",
              text: "world",
            },
          ],
        },
        {
          type: "text",
          text: ".",
        },
      ],
    },
    {
      type: "text",
      text: " Aha! ",
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
      type: "text",
      text: " What's up?",
    },
    {
      type: "paragraph",
      content: [
        {
          type: "bold",
          content: [
            {
              type: "italic",
              content: [
                {
                  type: "text",
                  text: "Henlo",
                },
              ],
            },
            {
              type: "text",
              text: " world",
            },
          ],
        },
        {
          type: "text",
          text: ".",
        },
      ],
    },
    {
      type: "text",
      text: " Aha! ",
    },
  ],
};

Deno.test({
  name: "Whitespace stretching transformer works as expected",
  async fn() {
    assertEquals(
      await new WhitespaceStretchingTransformer().transform(InputDocument),
      ExpectedDocument,
    );
    assertEquals(
      await new WhitespaceStretchingTransformer().transform(ExpectedDocument),
      ExpectedDocument,
    );
  },
});
