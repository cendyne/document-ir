import { test, expect, describe } from 'bun:test';
import { ExampleDocument } from "../ExampleDocument.ts";
import type { DocumentNode } from "../types.ts";
import { WhitespaceStretchingTransformer } from "../WhitespaceStretchingTransformer.ts";

describe('WhitespaceStretchingTransformer', () => {
  test('changes something', async () => {
    expect(
      await new WhitespaceStretchingTransformer().transform(ExampleDocument),
    ).not.toEqual(ExampleDocument);
  });

  test('works as expected', async () => {
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

    expect(
      await new WhitespaceStretchingTransformer().transform(InputDocument),
    ).toEqual(ExpectedDocument);

    expect(
      await new WhitespaceStretchingTransformer().transform(ExpectedDocument),
    ).toEqual(ExpectedDocument);
  });
});
