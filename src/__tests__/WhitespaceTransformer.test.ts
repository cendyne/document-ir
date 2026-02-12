import { test, expect, describe } from 'bun:test';
import { ExampleDocument } from "../ExampleDocument.ts";
import type { DocumentNode } from "../types.ts";
import { WhitespaceTransformer } from "../WhitespaceTransformer.ts";

describe('WhitespaceTransformer', () => {
  test('changes something', async () => {
    expect(
      await new WhitespaceTransformer().transform(ExampleDocument),
    ).not.toEqual(ExampleDocument);
  });

  test('works as expected', async () => {
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

    expect(
      await new WhitespaceTransformer().transform(InputDocument),
    ).toEqual(ExpectedDocument);

    expect(
      await new WhitespaceTransformer().transform(ExpectedDocument),
    ).toEqual(ExpectedDocument);
  });
});
