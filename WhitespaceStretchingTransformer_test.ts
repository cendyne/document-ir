import { expect, test } from "bun:test";
import { ExampleDocument } from "./ExampleDocument";
import { DocumentNode } from "./types";
import { WhitespaceStretchingTransformer } from "./WhitespaceStretchingTransformer";

test("Whitespace stretching transformer changes something", async () => {
  expect(await new WhitespaceStretchingTransformer().transform(ExampleDocument)).not.toEqual(ExampleDocument);
});

const InputDocument : DocumentNode = {
  ...ExampleDocument,
  content: [
    {
      type: 'text',
      text: 'hello'
    },
    {
      type: 'bold',
      content: [
        {
          type: 'text',
          text: ' world! '
        }
      ]
    },
    {
      type: 'text',
      text: 'What\'s up?'
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'bold',
          content: [
            {
              type: 'italic',
              content: [
                {
                  type: 'text',
                  text: 'Henlo '
                }
              ]
            },
            {
              type: 'text',
              text: 'world'
            }
          ]
        },
        {
          type: 'text',
          text: '.'
        }
      ]
    },
    {
      type: 'text',
      text: ' Aha! '
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
          text: 'world!'
        }
      ]
    },
    {
      type: 'text',
      text: ' What\'s up?'
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'bold',
          content: [
            {
              type: 'italic',
              content: [
                {
                  type: 'text',
                  text: 'Henlo'
                }
              ]
            },
            {
              type: 'text',
              text: ' world'
            }
          ]
        },
        {
          type: 'text',
          text: '.'
        }
      ]
    },
    {
      type: 'text',
      text: ' Aha! '
    }
  ]
}

test("Whitespace stretching transformer works as expected", async () => {
  expect(await new WhitespaceStretchingTransformer().transform(InputDocument)).toEqual(ExpectedDocument);
  expect(await new WhitespaceStretchingTransformer().transform(ExpectedDocument)).toEqual(ExpectedDocument);
});
