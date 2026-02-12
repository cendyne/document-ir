import { test, expect, describe } from 'bun:test';
import { ExampleDocument } from "../ExampleDocument.ts";
import { ArrayCollapseTransformer } from "../ArrayCollapseTransformer.ts";
import type { DocumentNode } from "../types.ts";

describe('ArrayCollapseTransformer', () => {
  test('changes something', async () => {
    expect(
      await new ArrayCollapseTransformer().transform(ExampleDocument),
    ).not.toEqual(ExampleDocument);
  });

  test('works as expected', async () => {
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

    expect(
      await new ArrayCollapseTransformer().transform(ArrayCollapsingDocument),
    ).toEqual(ExpectedDocument);

    expect(
      await new ArrayCollapseTransformer().transform(ExpectedDocument),
    ).toEqual(ExpectedDocument);
  });
});
