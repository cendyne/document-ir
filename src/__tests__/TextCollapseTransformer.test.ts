import { test, expect, describe } from 'bun:test';
import { ExampleDocument } from "../ExampleDocument.ts";
import type { DocumentNode } from "../types.ts";
import { TextCollapseTransformer } from "../TextCollapseTransformer.ts";

describe('TextCollapseTransformer', () => {
  test('changes something', async () => {
    expect(
      await new TextCollapseTransformer().transform(ExampleDocument),
    ).not.toEqual(ExampleDocument);
  });

  test('works as expected', async () => {
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

    expect(
      await new TextCollapseTransformer().transform(InputDocument),
    ).toEqual(ExpectedDocument);

    expect(
      await new TextCollapseTransformer().transform(ExpectedDocument),
    ).toEqual(ExpectedDocument);
  });
});
