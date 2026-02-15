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

  test('preserves whitespace in inline code', async () => {
    const InputDocument: DocumentNode = {
      ...ExampleDocument,
      content: [
        {
          type: "text",
          text: " see ",
        },
        {
          type: "code",
          content: [
            {
              type: "text",
              text: "  foo  bar  ",
            },
          ],
        },
        {
          type: "text",
          text: " for details ",
        },
      ],
    };

    const ExpectedDocument: DocumentNode = {
      ...ExampleDocument,
      content: [
        {
          type: "text",
          text: "see ",
        },
        {
          type: "code",
          content: [
            {
              type: "text",
              text: "  foo  bar  ",
            },
          ],
        },
        {
          type: "text",
          text: "for details",
        },
      ],
    };

    expect(
      await new WhitespaceTransformer().transform(InputDocument),
    ).toEqual(ExpectedDocument);
  });

  test('preserves whitespace in code block', async () => {
    const InputDocument: DocumentNode = {
      ...ExampleDocument,
      content: [
        {
          type: "code-block",
          fileName: "test.js",
          content: {
            type: "code",
            content: [
              {
                type: "text",
                text: "function foo() {\n  return  bar;\n}",
              },
            ],
          },
        },
      ],
    };

    const result = await new WhitespaceTransformer().transform(InputDocument);
    expect(result).toEqual(InputDocument);
  });

  test('preserves whitespace in code group', async () => {
    const InputDocument: DocumentNode = {
      ...ExampleDocument,
      content: [
        {
          type: "code-group",
          tabs: [
            {
              type: "code-group-tab",
              header: [{ type: "text", text: "JS" }],
              content: {
                type: "code",
                content: [
                  {
                    type: "text",
                    text: "const  x\n\t= 1;",
                  },
                ],
              },
            },
          ],
        },
      ],
    };

    const result = await new WhitespaceTransformer().transform(InputDocument);
    const tab = (result.content[0] as any).tabs[0];
    expect(tab.content.content[0].text).toEqual("const  x\n\t= 1;");
  });
});
