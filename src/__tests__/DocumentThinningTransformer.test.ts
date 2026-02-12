import { test, expect, describe } from 'bun:test';
import { DocumentThinningTransformer } from "../DocumentThinningTransformer.ts";
import { ExampleDocument } from "../ExampleDocument.ts";
import type { DocumentNode } from "../types.ts";

describe('DocumentThinningTransformer', () => {
  test('changes something', async () => {
    expect(
      await new DocumentThinningTransformer().transform(ExampleDocument),
    ).not.toEqual(ExampleDocument);
  });

  test('works as expected', async () => {
    const InputDocument: DocumentNode = {
      ...ExampleDocument,
      content: [
        {
          type: "text",
          text: "hello ",
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "hello world",
            },
          ],
        },
        {
          type: "sticker",
          orientation: "left",
          character: "c",
          name: "n",
          content: [
            {
              type: "text",
              text: "sticker world",
            },
          ],
        },
        {
          type: "quote",
          orientation: "left",
          name: "name",
          icon: "",
          content: [
            {
              type: "text",
              text: "quote world",
            },
          ],
        },
        {
          type: "bubble",
          orientation: "left",
          content: [
            {
              type: "text",
              text: "bubble world",
            },
          ],
        },
        {
          type: "high-tech-alert",
          warning: [],
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "high tech world",
                },
              ],
            },
          ],
        },
        {
          type: "columns",
          "column-count": 2,
          columns: [
            [{
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "column 1 world",
                },
              ],
            }],
            [{
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: "column 2 world",
                },
              ],
            }],
          ],
        },
        {
          type: "image",
          alt: "image alt",
          url: "",
        },
        {
          type: "figure-image",
          alt: "image alt",
          url: "",
          content: [
            {
              type: "text",
              text: "Figure text",
            },
          ],
        },
        {
          type: "video",
          alt: "video alt",
          mp4: "",
          poster: "",
        },
        {
          type: "definition-list",
          content: [
            {
              type: "definition",
              abbreviation: [{ type: "text", text: "ABCD" }],
              key: "",
              title: [{ type: "text", text: "The Alphabet" }],
              content: [{ type: "text", text: "A B C D E F G" }],
            },
          ],
        },
        {
          type: "note",
          content: [{ type: "text", text: "A note here" }],
        },
        {
          type: "redacted",
          style: "block",
          content: [{ type: "text", text: "This should go away" }],
        },
        {
          type: "card",
          header: {
            type: "card-header",
            title: [{ type: "text", text: "Title" }],
          },
          content: {
            type: "card-content",
            content: [{ type: "text", text: "Content" }],
          },
          attribution: {
            type: "card-attribution",
            date: "2023-02-01",
            title: [{ type: "text", text: "Attribution" }],
          },
          media: {
            type: "card-media",
            content: [
              { type: "image", alt: "image alt", url: "" },
            ],
          },
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
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "hello world",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "sticker world",
            },
          ],
        },
        {
          type: "text",
          text: "quote world",
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "bubble world",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "high tech world",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "column 1 world",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "column 2 world",
            },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "inline image: " },
            { type: "text", text: "image alt" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "inline image: " },
            { type: "text", text: "image alt" },
          ],
        },
        {
          type: "text",
          text: "Figure text",
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "inline video: " },
            { type: "text", text: "video alt" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "The Alphabet" },
            { type: "text", text: " " },
            { type: "text", text: "ABCD" },
            { type: "text", text: " " },
            { type: "text", text: "A B C D E F G" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Note: " },
            { type: "text", text: "A note here" },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Title" },
          ],
        },
        { type: "text", text: "Content" },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "inline image: " },
            { type: "text", text: "image alt" },
          ],
        },
        { type: "text", text: "Attribution" },
        { type: "text", text: " " },
        { type: "text", text: "2023-02-01" },
      ],
    };

    expect(
      await new DocumentThinningTransformer().transform(InputDocument),
    ).toEqual(ExpectedDocument);

    expect(
      await new DocumentThinningTransformer().transform(ExpectedDocument),
    ).toEqual(ExpectedDocument);
  });
});
