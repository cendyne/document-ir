import { assertEquals } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { ExampleDocument } from "./ExampleDocument.ts";
import { WordCounterTransformer } from "./WordCountTransformer.ts";
import { DocumentNode } from "./types.ts";

const InputDocument: DocumentNode = {
  ...ExampleDocument,
  definitions: [],
  content: [
    {
      type: "header",
      level: 1,
      htmlId: "h-100",
      content: [{ type: "text", text: "Title" }],
    },
    { type: "paragraph", content: [{ type: "text", text: "The words" }] },
    {
      type: "header",
      level: 2,
      htmlId: "h-200",
      content: [{ type: "text", text: "Sub 1" }],
    },
    {
      type: "paragraph",
      content: [{ type: "text", text: "more words and such" }],
    },
    { type: "paragraph", content: [{ type: "text", text: "and a few more" }] },
    {
      type: "header",
      level: 2,
      htmlId: "h-201",
      content: [{ type: "text", text: "Sub 2" }],
    },
    {
      type: "paragraph",
      content: [{ type: "text", text: "Lots of words and such" }],
    },
    {
      type: "header",
      level: 3,
      htmlId: "h-300",
      content: [{ type: "text", text: "Sub 2.1" }],
    },
    { type: "paragraph", content: [{ type: "text", text: "Extra words" }] },
  ],
};
const ExpectedDocument: DocumentNode = {
  ...InputDocument,
  hierarchy: {
    headerId: "title",
    headerText: InputDocument.title,
    totalWords: 17,
    words: 2,
    children: [
      {
        headerId: "h-200",
        headerText: "Sub 1",
        totalWords: 8,
        words: 8,
        children: [],
      },
      {
        headerId: "h-201",
        headerText: "Sub 2",
        totalWords: 7,
        words: 5,
        children: [{
          headerId: "h-300",
          headerText: "Sub 2.1",
          totalWords: 2,
          words: 2,
          children: [],
        }],
      },
    ],
  },
};

Deno.test({
  name: "Word count transformer counts words",
  async fn() {
    assertEquals(
      await new WordCounterTransformer().transform(ExpectedDocument),
      ExpectedDocument,
    );
  },
});
