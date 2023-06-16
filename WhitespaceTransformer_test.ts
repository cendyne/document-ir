import { expect, test } from "bun:test";
import { ExampleDocument } from "./ExampleDocument";
import { DocumentNode } from "./types";
import { WhitespaceTransformer } from "./WhitespaceTransformer";

test("Whitespace transformer changes something", async () => {
  expect(await new WhitespaceTransformer().transform(ExampleDocument)).not.toEqual(ExampleDocument);
});

const InputDocument : DocumentNode = {
  ...ExampleDocument,
  content: [
    {
      type: 'text',
      text: ' hello '
    },
    {
      type: 'bold',
      content: [
        {
          type: 'text',
          text: ' \uD83C\uDF4A world! '
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: ' hello '
        },
        {
          type: 'bold',
          content: [
            {
              type: 'text',
              text: ' world! '
            },
            {
              type: 'text',
              text: ''
            }
          ]
        },
        {
          type: 'italic',
          content: [
            {
              type: 'text',
              text: ' hi! '
            }
          ]
        },
      ]
    }
  ]
}

const ExpectedDocument : DocumentNode = {
  ...ExampleDocument,
  content: [
    {
      type: 'text',
      text: 'hello '
    },
    {
      type: 'bold',
      content: [
        {
          type: 'text',
          text: '\uD83C\uDF4A world!'
        }
      ]
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'hello '
        },
        {
          type: 'bold',
          content: [
            {
              type: 'text',
              text: 'world! '
            }
          ]
        },
        {
          type: 'italic',
          content: [
            {
              type: 'text',
              text: 'hi!'
            }
          ]
        },
      ]
    }
  ]
}

test("Whitespace transformer works as expected", async () => {
  expect(await new WhitespaceTransformer().transform(InputDocument)).toEqual(ExpectedDocument);
  expect(await new WhitespaceTransformer().transform(ExpectedDocument)).toEqual(ExpectedDocument);
});
