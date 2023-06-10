import { expect, test } from "bun:test";
import { ExampleDocument } from "./ExampleDocument";
import { ArrayCollapseTransformer } from "./ArrayCollapseTransformer";
import { DocumentNode } from "./types";

test("Array collapse transformer changes something", async () => {
  expect(await new ArrayCollapseTransformer().transform(ExampleDocument)).not.toEqual(ExampleDocument);
});

const ArrayCollapsingDocument : DocumentNode = {
  ...ExampleDocument,
  content: [
    {
      type: 'text',
      text: '1'
    },
    {
      type: 'array',
      content: [
        {
          type: 'text',
          text: '2'
        },
        {
          type: 'text',
          text: '3'
        },
      ]
    },
    {
      type: 'text',
      text: '4'
    },
  ]
}
const ExpectedDocument : DocumentNode = {
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
  ]
}

test("Array collapse transformer works as expected", async () => {
  expect(await new ArrayCollapseTransformer().transform(ArrayCollapsingDocument)).toEqual(ExpectedDocument);
  expect(await new ArrayCollapseTransformer().transform(ExpectedDocument)).toEqual(ExpectedDocument);
});