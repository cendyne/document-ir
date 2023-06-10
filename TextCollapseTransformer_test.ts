import { expect, test } from "bun:test";
import { ExampleDocument } from "./ExampleDocument";
import { DocumentNode } from "./types";
import { TextCollapseTransformer } from "./TextCollapseTransformer";

test("Text collapse transformer changes something", async () => {
  expect(await new TextCollapseTransformer().transform(ExampleDocument)).not.toEqual(ExampleDocument);
});

const InputDocument : DocumentNode = {
  ...ExampleDocument,
  content: [
    {
      type: 'text',
      text: '1'
    },
    {
      type: 'text',
      text: '2'
    },
    {
      type: 'text',
      text: '3'
    },
    {
      type: 'text',
      text: '4'
    },
    {
      type: 'bold',
      content: [
        {
          type: 'text',
          text: 'A'
        },
        {
          type: 'text',
          text: 'B'
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
      text: '1234'
    },
    {
      type: 'bold',
      content: [
        {
          type: 'text',
          text: 'AB'
        }
      ]
    }
  ]
}

test("Text collapse transformer works as expected", async () => {
  expect(await new TextCollapseTransformer().transform(InputDocument)).toEqual(ExpectedDocument);
  expect(await new TextCollapseTransformer().transform(ExpectedDocument)).toEqual(ExpectedDocument);
});
